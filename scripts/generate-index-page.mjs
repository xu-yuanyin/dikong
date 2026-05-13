#!/usr/bin/env node

/**
 * 自动扫描 dist/prototypes 目录，生成带侧边栏导航的索引页
 * 用于 GitHub Pages 部署后提供完整的原型浏览体验
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.resolve(__dirname, '..', 'dist');
const prototypesDir = path.join(distDir, 'prototypes');

// ── 原型分类配置 ──
const CATEGORIES = [
  {
    key: 'portal',
    label: '🏠 前台门户',
    icon: '🏠',
    match: (name) => ['home', 'login', 'forgot-password', 'register', 'sitemap'].includes(name),
  },
  {
    key: 'news',
    label: '📰 资讯公告',
    icon: '📰',
    match: (name) => ['news', 'news-detail', 'notice-detail'].includes(name),
  },
  {
    key: 'policy',
    label: '📜 政策法规',
    icon: '📜',
    match: (name) => name.startsWith('policy-'),
  },
  {
    key: 'flight',
    label: '✈️ 飞行服务',
    icon: '✈️',
    match: (name) => name.startsWith('flight-'),
  },
  {
    key: 'service',
    label: '🛠️ 低空服务',
    icon: '🛠️',
    match: (name) => name.startsWith('service-'),
  },
  {
    key: 'mall',
    label: '🛒 低空商城',
    icon: '🛒',
    match: (name) => name.startsWith('mall-') || name === 'demand-publish',
  },
  {
    key: 'my',
    label: '👤 个人中心',
    icon: '👤',
    match: (name) => name.startsWith('my-') || name.startsWith('profile') || name.startsWith('message'),
  },
  {
    key: 'provider',
    label: '💼 服务商后台',
    icon: '💼',
    match: (name) => name.startsWith('provider-'),
  },
  {
    key: 'register',
    label: '📝 登记注册',
    icon: '📝',
    match: (name) => name.startsWith('register-'),
  },
  {
    key: 'admin',
    label: '⚙️ 运营后台',
    icon: '⚙️',
    match: (name) => name.startsWith('admin-'),
  },
  {
    key: 'system',
    label: '🔧 系统管理',
    icon: '🔧',
    match: (name) => ['role-management', 'standard-list', 'standard-detail'].includes(name),
  },
];

// ── 原型中文名称映射 ──
const NAME_MAP = {
  'home': '首页',
  'login': '登录',
  'forgot-password': '忘记密码',
  'sitemap': '站点地图',
  'news': '资讯列表',
  'news-detail': '资讯详情',
  'notice-detail': '公告详情',
  'policy-national': '国家政策',
  'policy-national-detail': '国家政策详情',
  'policy-local': '地方政策',
  'policy-local-detail': '地方政策详情',
  'policy-interpretation': '政策解读',
  'policy-interpretation-detail': '政策解读详情',
  'flight-airspace': '空域地图',
  'flight-airspace-detail': '空域详情',
  'flight-airspace-detail-2': '空域详情(二)',
  'flight-airspace-detail-3': '空域详情(三)',
  'flight-dynamic': '飞行动态',
  'flight-plan': '飞行计划',
  'flight-weather': '气象信息',
  'service-list': '服务列表',
  'service-detail': '服务详情',
  'service-show': '服务展示',
  'service-publish': '服务发布',
  'service-review': '服务审核',
  'service-demand': '服务需求',
  'service-category-detail': '服务分类详情',
  'mall-list': '商城列表',
  'mall-detail': '商品详情',
  'mall-demand': '商城需求',
  'mall-demand-detail': '需求详情',
  'mall-intention': '意向管理',
  'mall-publish': '商品发布',
  'demand-publish': '需求发布',
  'my-service': '我的服务',
  'my-service-demand': '我的服务需求',
  'my-demand': '我的需求',
  'my-aircraft': '我的飞行器',
  'my-flight-plan': '我的飞行计划',
  'my-goods': '我的商品',
  'my-intention': '我的意向',
  'my-orders': '我的订单',
  'profile': '个人资料',
  'profile-certified': '已认证',
  'profile-pending': '审核中',
  'profile-rejected': '已驳回',
  'profile-uncertified': '未认证',
  'message-center': '消息中心',
  'message-detail': '消息详情',
  'provider-intentions': '服务商意向',
  'provider-orders': '服务商订单',
  'register-aircraft': '飞行器登记',
  'register-aircraft-copy': '飞行器登记(副本)',
  'register-flight-plan': '飞行计划登记',
  'register-flight-plan-copy': '飞行计划登记(副本)',
  'admin-aircraft': '飞行器管理',
  'admin-airspace': '空域管理',
  'admin-carousel': '轮播图管理',
  'admin-cert': '认证管理',
  'admin-demand': '需求管理',
  'admin-flight-plan': '飞行计划管理',
  'admin-mall': '商城管理',
  'admin-news': '资讯管理',
  'admin-pilot': '飞手管理',
  'admin-policy': '政策管理',
  'admin-role': '角色管理',
  'admin-service': '服务管理',
  'admin-standard': '规范标准管理',
  'admin-system-user': '系统用户管理',
  'admin-user': '用户管理',
  'role-management': '角色权限管理',
  'standard-list': '规范标准列表',
  'standard-detail': '规范标准详情',
};

/**
 * 将原型名转为显示名称
 */
function getDisplayName(name) {
  if (NAME_MAP[name]) return NAME_MAP[name];
  // 如果没有映射，将连字符替换为空格并首字母大写
  return name.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

/**
 * 扫描目录获取所有 HTML 文件
 */
function scanPrototypes(dir) {
  if (!fs.existsSync(dir)) {
    console.warn('prototypes 目录不存在:', dir);
    return [];
  }
  return fs.readdirSync(dir)
    .filter((f) => f.endsWith('.html'))
    .map((f) => f.replace('.html', ''))
    .sort();
}

/**
 * 将原型分配到分类
 */
function categorize(names) {
  const categorized = CATEGORIES.map((cat) => ({
    ...cat,
    items: [],
  }));
  const uncategorized = [];

  for (const name of names) {
    let matched = false;
    for (const cat of categorized) {
      if (cat.match(name)) {
        cat.items.push(name);
        matched = true;
        break;
      }
    }
    if (!matched) {
      uncategorized.push(name);
    }
  }

  // 把未分类的放到一个"其他"分类
  if (uncategorized.length > 0) {
    categorized.push({
      key: 'other',
      label: '📦 其他',
      icon: '📦',
      items: uncategorized,
    });
  }

  // 过滤掉没有内容的分类
  return categorized.filter((cat) => cat.items.length > 0);
}

/**
 * 生成侧边栏菜单项 HTML
 */
function renderMenuItems(categories) {
  return categories.map((cat) => {
    const items = cat.items.map((name) => {
      const display = getDisplayName(name);
      return `          <a class="menu-item" href="./prototypes/${name}.html" target="preview-frame" data-page="${name}" onclick="setActive(this)">${display}</a>`;
    }).join('\n');

    return `        <div class="menu-group">
          <div class="menu-group-title">${cat.label}</div>
${items}
        </div>`;
  }).join('\n');
}

/**
 * 生成完整的 index.html
 */
function generateIndexHtml(categories, totalCount) {
  // 优先使用 home 作为默认页面
  const allItems = categories.flatMap((cat) => cat.items);
  const firstItem = allItems.includes('home') ? 'home' : (categories[0]?.items[0] || 'home');
  const firstItemName = getDisplayName(firstItem);
  const menuHtml = renderMenuItems(categories);

  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>低空公共服务平台 - 原型预览</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }

    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif;
      height: 100vh;
      overflow: hidden;
      background: #f0f2f5;
    }

    /* ── 顶部导航栏 ── */
    .top-bar {
      height: 56px;
      background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
      display: flex;
      align-items: center;
      padding: 0 24px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
      z-index: 100;
      position: relative;
    }

    .top-bar-logo {
      display: flex;
      align-items: center;
      gap: 10px;
      color: white;
    }

    .top-bar-logo svg {
      width: 28px;
      height: 28px;
    }

    .top-bar-title {
      font-size: 18px;
      font-weight: 600;
      letter-spacing: 1px;
    }

    .top-bar-badge {
      margin-left: 16px;
      background: rgba(255, 255, 255, 0.15);
      color: rgba(255, 255, 255, 0.85);
      padding: 2px 10px;
      border-radius: 10px;
      font-size: 12px;
      backdrop-filter: blur(4px);
    }

    .top-bar-actions {
      margin-left: auto;
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .top-bar-actions a {
      color: rgba(255, 255, 255, 0.7);
      text-decoration: none;
      font-size: 13px;
      padding: 6px 12px;
      border-radius: 6px;
      transition: all 0.2s;
    }

    .top-bar-actions a:hover {
      color: white;
      background: rgba(255, 255, 255, 0.1);
    }

    /* ── 主体布局 ── */
    .main-layout {
      display: flex;
      height: calc(100vh - 56px);
    }

    /* ── 侧边栏 ── */
    .sidebar {
      width: 240px;
      min-width: 240px;
      background: white;
      border-right: 1px solid #e8e8e8;
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }

    .sidebar-search {
      padding: 12px 16px;
      border-bottom: 1px solid #f0f0f0;
    }

    .sidebar-search input {
      width: 100%;
      height: 32px;
      border: 1px solid #d9d9d9;
      border-radius: 6px;
      padding: 0 12px;
      font-size: 13px;
      outline: none;
      transition: border-color 0.2s;
    }

    .sidebar-search input:focus {
      border-color: #1890ff;
      box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.1);
    }

    .sidebar-menu {
      flex: 1;
      overflow-y: auto;
      padding: 8px 0;
    }

    .sidebar-menu::-webkit-scrollbar {
      width: 4px;
    }

    .sidebar-menu::-webkit-scrollbar-thumb {
      background: #d9d9d9;
      border-radius: 2px;
    }

    .menu-group {
      margin-bottom: 4px;
    }

    .menu-group-title {
      padding: 8px 16px 4px;
      font-size: 12px;
      color: #8c8c8c;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      user-select: none;
    }

    .menu-item {
      display: block;
      padding: 7px 16px 7px 28px;
      font-size: 13px;
      color: #595959;
      text-decoration: none;
      transition: all 0.15s;
      border-left: 3px solid transparent;
      cursor: pointer;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .menu-item:hover {
      color: #1890ff;
      background: #e6f7ff;
    }

    .menu-item.active {
      color: #1890ff;
      background: #e6f7ff;
      border-left-color: #1890ff;
      font-weight: 500;
    }

    .menu-item.hidden {
      display: none;
    }

    .menu-group.hidden {
      display: none;
    }

    /* ── 预览区 ── */
    .preview-area {
      flex: 1;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      background: #f5f5f5;
    }

    .preview-toolbar {
      height: 40px;
      background: white;
      border-bottom: 1px solid #e8e8e8;
      display: flex;
      align-items: center;
      padding: 0 16px;
      gap: 8px;
      flex-shrink: 0;
    }

    .preview-toolbar .current-path {
      font-size: 13px;
      color: #8c8c8c;
    }

    .preview-toolbar .current-path span {
      color: #262626;
      font-weight: 500;
    }

    .btn-open {
      margin-left: auto;
      padding: 4px 12px;
      font-size: 12px;
      color: #1890ff;
      background: white;
      border: 1px solid #1890ff;
      border-radius: 4px;
      cursor: pointer;
      text-decoration: none;
      transition: all 0.2s;
    }

    .btn-open:hover {
      color: white;
      background: #1890ff;
    }

    .preview-frame {
      flex: 1;
      border: none;
      background: white;
    }

    /* ── 空状态 ── */
    .empty-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100%;
      color: #bfbfbf;
    }

    .empty-state svg {
      width: 80px;
      height: 80px;
      margin-bottom: 16px;
      opacity: 0.4;
    }

    .empty-state p {
      font-size: 14px;
    }

    /* ── 搜索无结果 ── */
    .no-results {
      padding: 24px 16px;
      text-align: center;
      color: #bfbfbf;
      font-size: 13px;
      display: none;
    }

    /* ── 响应式 ── */
    @media (max-width: 768px) {
      .sidebar {
        width: 200px;
        min-width: 200px;
      }
      .top-bar-badge,
      .top-bar-actions {
        display: none;
      }
    }
  </style>
</head>
<body>

  <!-- 顶部导航 -->
  <div class="top-bar">
    <div class="top-bar-logo">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
        <path d="M14.05 2a9 9 0 0 1 8 7.94"/>
        <path d="M14.05 6A5 5 0 0 1 18 10"/>
      </svg>
      <span class="top-bar-title">低空公共服务平台</span>
    </div>
    <span class="top-bar-badge">原型预览 · 共 ${totalCount} 个页面</span>
    <div class="top-bar-actions">
      <a href="https://github.com/xu-yuanyin/dikong" target="_blank">📦 GitHub</a>
    </div>
  </div>

  <!-- 主体 -->
  <div class="main-layout">

    <!-- 侧边栏 -->
    <div class="sidebar">
      <div class="sidebar-search">
        <input type="text" id="searchInput" placeholder="搜索页面..." oninput="filterMenu(this.value)">
      </div>
      <div class="sidebar-menu" id="sidebarMenu">
${menuHtml}
        <div class="no-results" id="noResults">没有找到匹配的页面</div>
      </div>
    </div>

    <!-- 预览区 -->
    <div class="preview-area">
      <div class="preview-toolbar">
        <div class="current-path">当前页面：<span id="currentPageName">${firstItemName}</span></div>
        <a class="btn-open" id="btnOpen" href="./prototypes/${firstItem}.html" target="_blank">在新窗口打开 ↗</a>
      </div>
      <iframe
        class="preview-frame"
        id="previewFrame"
        name="preview-frame"
        src="./prototypes/${firstItem}.html"
      ></iframe>
    </div>

  </div>

  <script>
    // ── 页面名称映射（内联） ──
    var nameMap = ${JSON.stringify(NAME_MAP, null, 2)};

    // ── 激活菜单项 ──
    function setActive(el) {
      // 移除所有 active
      document.querySelectorAll('.menu-item').forEach(function(item) {
        item.classList.remove('active');
      });
      el.classList.add('active');

      // 更新工具栏
      var pageName = el.dataset.page;
      var displayName = nameMap[pageName] || pageName;
      document.getElementById('currentPageName').textContent = displayName;
      document.getElementById('btnOpen').href = './prototypes/' + pageName + '.html';
    }

    // ── 搜索过滤 ──
    function filterMenu(keyword) {
      var kw = keyword.trim().toLowerCase();
      var items = document.querySelectorAll('.menu-item');
      var groups = document.querySelectorAll('.menu-group');
      var hasResult = false;

      items.forEach(function(item) {
        var text = item.textContent.toLowerCase();
        var page = (item.dataset.page || '').toLowerCase();
        var match = !kw || text.includes(kw) || page.includes(kw);
        item.classList.toggle('hidden', !match);
        if (match) hasResult = true;
      });

      // 隐藏空分类
      groups.forEach(function(group) {
        var visibleItems = group.querySelectorAll('.menu-item:not(.hidden)');
        group.classList.toggle('hidden', visibleItems.length === 0);
      });

      document.getElementById('noResults').style.display = hasResult ? 'none' : 'block';
    }

    // ── 初始化：激活默认页面对应的菜单项 ──
    (function() {
      var defaultItem = document.querySelector('.menu-item[data-page="${firstItem}"]')
        || document.querySelector('.menu-item');
      if (defaultItem) defaultItem.classList.add('active');
    })();
  </script>

</body>
</html>`;
}

// ── 主流程 ──
function main() {
  console.log('\\n🔍 扫描 dist/prototypes 目录...');

  const names = scanPrototypes(prototypesDir);
  if (names.length === 0) {
    console.warn('⚠️ 未找到任何原型 HTML 文件');
    process.exit(0);
  }

  console.log(`   找到 ${names.length} 个原型页面`);

  const categories = categorize(names);
  console.log(`   分为 ${categories.length} 个分类：`);
  categories.forEach((cat) => {
    console.log(`     ${cat.label} (${cat.items.length})`);
  });

  const html = generateIndexHtml(categories, names.length);
  const outputPath = path.join(distDir, 'index.html');
  fs.writeFileSync(outputPath, html, 'utf8');

  console.log(`\\n✅ 索引页已生成: dist/index.html`);
  console.log(`   包含 ${names.length} 个原型，${categories.length} 个分类\\n`);
}

main();
