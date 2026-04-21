# 低空服务原型部署指南

本文档提供多种部署方案，选择最适合你的方式。

---

## 方案一：GitHub + Vercel 部署（推荐）

### 步骤 1：上传代码到 GitHub

1. 在 GitHub 创建新仓库（如 `low-altitude-service`）
2. 在本地执行以下命令：

```bash
cd /Users/xu/Desktop/xu/Axhub-Make-main

# 初始化 git（如果还没有）
git init

# 添加远程仓库
git remote add origin https://github.com/你的用户名/low-altitude-service.git

# 添加所有文件
git add .

# 提交
git commit -m "初始化低空服务原型项目"

# 推送到 GitHub
git branch -M main
git push -u origin main
```

### 步骤 2：连接 Vercel

1. 访问 [vercel.com](https://vercel.com)
2. 使用 GitHub 账号登录
3. 点击 "Add New..." → "Project"
4. 选择你的 GitHub 仓库
5. 配置项目：
   - **Framework Preset**: Other
   - **Root Directory**: `admin`
   - **Build Command**: 留空
   - **Output Directory**: `.`
6. 点击 "Deploy"

### 步骤 3：获取链接

部署完成后，Vercel 会提供一个永久链接，如：
- `https://low-altitude-service.vercel.app`

---

## 方案二：GitHub + Netlify 部署

### 步骤 1：上传代码到 GitHub（同上）

### 步骤 2：连接 Netlify

1. 访问 [netlify.com](https://netlify.com)
2. 使用 GitHub 账号登录
3. 点击 "Add new site" → "Import an existing project"
4. 选择你的 GitHub 仓库
5. 配置项目：
   - **Base directory**: `admin`
   - **Build command**: 留空
   - **Publish directory**: `.`
6. 点击 "Deploy site"

### 步骤 3：获取链接

部署完成后，Netlify 会提供一个链接，如：
- `https://random-name.netlify.app`

---

## 方案三：GitHub Pages 部署（免费）

### 步骤 1：上传代码到 GitHub（同上）

### 步骤 2：启用 GitHub Pages

1. 进入 GitHub 仓库页面
2. 点击 "Settings" → "Pages"
3. Source 选择 "Deploy from a branch"
4. Branch 选择 "main"，目录选择 "/admin"
5. 点击 "Save"

### 步骤 3：获取链接

几分钟后，访问：
- `https://你的用户名.github.io/low-altitude-service/`

---

## 方案四：自有云服务器部署

如果你有云服务器（阿里云/腾讯云等）：

### 使用 SCP 上传

```bash
# 上传 admin 目录到服务器
scp -r /Users/xu/Desktop/xu/Axhub-Make-main/admin root@你的服务器IP:/var/www/prototype

# 在服务器上配置 Nginx
# /etc/nginx/sites-available/prototype.conf
server {
    listen 80;
    server_name 你的域名;
    root /var/www/prototype;
    index index.html;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

---

## 推荐方案对比

| 方案 | 费用 | 速度 | 自定义域名 | 推荐指数 |
|------|------|------|-----------|---------|
| Vercel | 免费 | 快 | 支持 | ⭐⭐⭐⭐⭐ |
| Netlify | 免费 | 快 | 支持 | ⭐⭐⭐⭐⭐ |
| GitHub Pages | 免费 | 中 | 支持 | ⭐⭐⭐⭐ |
| 自有服务器 | 付费 | 快 | 支持 | ⭐⭐⭐ |

---

## 需要帮助？

如果遇到问题，请提供：
1. 选择的部署方案
2. 具体的错误信息
