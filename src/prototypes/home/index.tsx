/**
 * @name 首页（待调整）
 *
 * 参考资料：
 * - /rules/development-guide.md
 * - /skills/default-resource-recommendations/SKILL.md
 */

import './style.css';

import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Button, Card, Tag, Row, Col, Modal, Avatar, Dropdown, message, Badge } from 'antd';
import {
  RocketOutlined,
  LoginOutlined,
  FormOutlined,
  RightOutlined,
  SafetyCertificateOutlined,
  IdcardOutlined,
  TeamOutlined,
  FileProtectOutlined,
  ArrowRightOutlined,
  ThunderboltOutlined,
  EnvironmentOutlined,
  CompassOutlined,
  ExclamationCircleOutlined,
  UserOutlined,
  LogoutOutlined,
  ReadOutlined,
  ToolOutlined,
  BulbOutlined,
  MessageOutlined,
  ShoppingOutlined,
  UpOutlined,
  DownOutlined,
  LeftOutlined,
  AlertOutlined,
  BellOutlined,
  CheckCircleFilled,
  CloseCircleFilled,
  WarningOutlined,
  SwapOutlined
} from '@ant-design/icons';

var NAV_ITEMS = [
  { key: 'home', label: '首页' },
  { key: 'news', label: '资讯公告' },
  { key: 'policy-national', label: '政策法规' },
  { key: 'service-list', label: '低空服务' },
  { key: 'mall-list', label: '低空商城' },
  { key: 'flight-airspace', label: '飞行服务' }
];

var FLOW_STEPS = [
  { key: 'aircraft', title: '飞行器备案', desc: '登记飞行器信息，完成飞行器备案手续', icon: <RocketOutlined />, color: '#722ed1', bg: '#f9f0ff', route: 'register-aircraft', step: 1 },
  { key: 'plan', title: '飞行计划备案', desc: '提交飞行计划，获取飞行许可与空域使用授权', icon: <FileProtectOutlined />, color: '#13c2c2', bg: '#e6fffb', route: 'register-flight-plan', step: 2 }
];

var SERVICE_MODULES = [
  { key: 'tourism', icon: <CompassOutlined />, title: '低空旅游', color: '#1677ff', bg: '#e6f4ff' },
  { key: 'training', icon: <ReadOutlined />, title: '飞行培训', color: '#52c41a', bg: '#f6ffed' },
  { key: 'qualification', icon: <SafetyCertificateOutlined />, title: '资质查询', color: '#fa8c16', bg: '#fff7e6' },
  { key: 'aircraft', icon: <ToolOutlined />, title: '飞行器服务', color: '#722ed1', bg: '#f9f0ff' },
  { key: 'feedback', icon: <MessageOutlined />, title: '意见反馈', color: '#eb2f96', bg: '#fff0f6' }
];

var MALL_PRODUCTS = [
  { id: 1, name: '工业级无人机 DJI Matrice 350 RTK', price: '¥68,800', tag: '热销', tagColor: '#f5222d' },
  { id: 2, name: 'eVTOL载人飞行器 EH216-S', price: '¥2,380,000', tag: '新品', tagColor: '#1677ff' },
  { id: 3, name: '飞行模拟训练系统 FS-Pro', price: '¥86,000', tag: '推荐', tagColor: '#722ed1' },
  { id: 4, name: '植保无人机 AGRAS T40', price: '¥52,000', tag: '热销', tagColor: '#f5222d' },
  { id: 5, name: '航测无人机 Phantom 4 RTK', price: '¥38,800', tag: '新品', tagColor: '#1677ff' },
  { id: 6, name: '无人机载荷云台 Zenmuse H20T', price: '¥126,000', tag: '推荐', tagColor: '#722ed1' }
];

var NEWS_LIST = [
  { id: 1, title: '低空经济示范区建设方案正式发布', date: '2026-04-20', tag: '政策动态', tagColor: '#0958d9', tagBg: '#e6f4ff' },
  { id: 2, title: '全国首条城市低空物流航线开通运营', date: '2026-04-19', tag: '行业新闻', tagColor: '#0958d9', tagBg: '#e6f4ff' },
  { id: 3, title: '无人机驾驶员培训标准体系升级', date: '2026-04-18', tag: '培训认证', tagColor: '#d46b08', tagBg: '#fff7e6' },
  { id: 4, title: '低空智联网平台建设技术规范出台', date: '2026-04-17', tag: '政策动态', tagColor: '#0958d9', tagBg: '#e6f4ff' },
  { id: 5, title: '多旋翼无人机续航技术取得重大突破', date: '2026-04-16', tag: '行业新闻', tagColor: '#0958d9', tagBg: '#e6f4ff' },
  { id: 6, title: '城市空中交通管理试点项目启动', date: '2026-04-15', tag: '行业新闻', tagColor: '#0958d9', tagBg: '#e6f4ff' }
];

var POLICY_LIST = [
  { id: 1, title: '关于促进低空经济发展的若干意见', date: '2026-04-15', tag: '国家政策', tagColor: '#d46b08', tagBg: '#fff7e6' },
  { id: 2, title: '本市民用无人驾驶航空器管理办法', date: '2026-04-12', tag: '本地政策', tagColor: '#389e0d', tagBg: '#f6ffed' },
  { id: 3, title: '低空飞行服务保障体系建设指南', date: '2026-04-10', tag: '国家政策', tagColor: '#d46b08', tagBg: '#fff7e6' },
  { id: 4, title: '无人驾驶航空器飞行管理暂行条例', date: '2026-04-08', tag: '国家政策', tagColor: '#d46b08', tagBg: '#fff7e6' },
  { id: 5, title: '关于规范城市低空物流配送的指导意见', date: '2026-04-05', tag: '本地政策', tagColor: '#389e0d', tagBg: '#f6ffed' }
];

var NOTICE_LIST = [
  { id: 1, title: '关于开展低空飞行安全专项检查的通知', date: '2026-04-21', tag: '安全通知', tagColor: '#cf1322', tagBg: '#fff1f0' },
  { id: 2, title: '2026年度无人机驾驶员资格考试安排', date: '2026-04-20', tag: '考试通知', tagColor: '#0958d9', tagBg: '#e6f4ff' },
  { id: 3, title: '低空空域使用申请系统升级维护公告', date: '2026-04-18', tag: '系统公告', tagColor: '#722ed1', tagBg: '#f9f0ff' },
  { id: 4, title: '关于调整临时管制空域范围的通告', date: '2026-04-16', tag: '空域通告', tagColor: '#d46b08', tagBg: '#fff7e6' },
  { id: 5, title: '低空公共服务平台功能更新说明', date: '2026-04-14', tag: '系统公告', tagColor: '#722ed1', tagBg: '#f9f0ff' }
];

var STATS = [
  { label: '注册用户', value: '12,856', unit: '人', icon: <TeamOutlined /> },
  { label: '飞行计划', value: '3,420', unit: '次', icon: <RocketOutlined /> },
  { label: '服务企业', value: '856', unit: '家', icon: <ThunderboltOutlined /> }
];

var NOTIFICATION_LIST = [
  { id: 1, type: 'approval', title: '飞行主体审批已通过', desc: '您提交的飞行主体审批申请已通过审核，可进行下一步飞行器备案。', time: '10分钟前', read: false },
  { id: 2, type: 'reject', title: '飞行器备案被驳回', desc: '您提交的飞行器备案申请被驳回，原因：飞行器型号信息不完整，请补充后重新提交。', time: '2小时前', read: false },
  { id: 3, type: 'control', title: '临时管制通知', desc: '4月30日08:00-18:00，部分空域实施临时管制，请注意调整飞行计划。', time: '3小时前', read: false },
  { id: 4, type: 'approval', title: '飞行计划备案已通过', desc: '您提交的4月28日飞行计划已通过审核，请按时执行。', time: '昨天 16:20', read: true },
  { id: 5, type: 'system', title: '系统维护通知', desc: '低空公共服务平台将于5月1日凌晨2:00-4:00进行系统维护，届时部分功能暂不可用。', time: '昨天 09:00', read: true },
  { id: 6, type: 'reject', title: '飞行主体审批被驳回', desc: '您提交的企业飞行主体审批被驳回，原因：营业执照扫描件不清晰，请重新上传。', time: '前天 14:30', read: true }
];

var Component = function HomePage() {
  var [warningOpen, setWarningOpen] = useState(false);
  var [warningMsg, setWarningMsg] = useState('');
  var [isLoggedIn, setIsLoggedIn] = useState(false);
  var [currentRole, setCurrentRole] = useState('pilot');
  var USER_ROLES = [
    { key: 'pilot', label: '飞手', color: 'green', icon: <RocketOutlined /> },
    { key: 'personal', label: '个人用户', color: 'blue', icon: <UserOutlined /> }
  ];
  var [notifications, setNotifications] = useState(NOTIFICATION_LIST);
  var [newsIndex, setNewsIndex] = useState(0);
  var [policyIndex, setPolicyIndex] = useState(0);
  var [mallIndex, setMallIndex] = useState(0);
  var [noticeIndex, setNoticeIndex] = useState(0);
  var newsTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  var policyTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  var mallTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  var noticeTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  var NEWS_PAGE_SIZE = 3;
  var POLICY_PAGE_SIZE = 3;
  var MALL_PAGE_SIZE = 3;
  var NOTICE_PAGE_SIZE = 3;

  var handleNavigate = useCallback(function (key: string) {
    window.location.href = '/prototypes/' + key;
  }, []);

  var handleLogin = useCallback(function () {
    setIsLoggedIn(true);
  }, []);

  var handleLogout = useCallback(function () {
    setIsLoggedIn(false);
  }, []);

  var requireLogin = useCallback(function (callback: () => void) {
    if (!isLoggedIn) {
      message.warning('请先登录');
      return;
    }
    callback();
  }, [isLoggedIn]);

  var unreadCount = notifications.filter(function (n) { return !n.read; }).length;

  var markAllRead = useCallback(function () {
    setNotifications(function (prev) {
      return prev.map(function (n) { return Object.assign({}, n, { read: true }); });
    });
  }, []);

  var markOneRead = useCallback(function (id: number) {
    setNotifications(function (prev) {
      return prev.map(function (n) { return n.id === id ? Object.assign({}, n, { read: true }) : n; });
    });
  }, []);

  var getNotifIcon = useCallback(function (type: string) {
    if (type === 'approval') return <CheckCircleFilled style={{ color: '#52c41a', fontSize: 16 }} />;
    if (type === 'reject') return <CloseCircleFilled style={{ color: '#ff4d4f', fontSize: 16 }} />;
    if (type === 'control') return <WarningOutlined style={{ color: '#fa8c16', fontSize: 16 }} />;
    return <BellOutlined style={{ color: '#1677ff', fontSize: 16 }} />;
  }, []);

  var notificationDropdownItems = {
    items: [
      { key: 'content', label: (
        <div style={{ width: 320, maxHeight: 400, overflow: 'auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '4px 0 12px', borderBottom: '1px solid #f0f0f0', marginBottom: 8 }}>
            <span style={{ fontSize: 15, fontWeight: 600, color: 'rgba(0,0,0,0.88)' }}>消息通知</span>
            {unreadCount > 0 && <a style={{ fontSize: 12, color: '#1677ff' }} onClick={function (e) { e.stopPropagation(); markAllRead(); }}>全部已读</a>}
          </div>
          {notifications.slice(0, 5).map(function (n) {
            return (
              <div
                key={n.id}
                onClick={function () { markOneRead(n.id); window.location.href = '/prototypes/message-detail?type=' + n.type; }}
                style={{ padding: '10px 0', borderBottom: '1px solid #f5f5f5', cursor: 'pointer', opacity: n.read ? 0.6 : 1 }}
              >
                <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <div style={{ marginTop: 2 }}>{getNotifIcon(n.type)}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
                      <span style={{ fontSize: 13, fontWeight: n.read ? 400 : 600, color: 'rgba(0,0,0,0.88)' }}>{n.title}</span>
                      {!n.read && <div style={{ width: 6, height: 6, borderRadius: 3, background: '#ff4d4f', flexShrink: 0, marginLeft: 6 }} />}
                    </div>
                    <div style={{ fontSize: 12, color: '#8c8c8c', lineHeight: 1.5, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{n.desc}</div>
                    <div style={{ fontSize: 11, color: '#bfbfbf', marginTop: 2 }}>{n.time}</div>
                  </div>
                </div>
              </div>
            );
          })}
          <div
            onClick={function () { handleNavigate('message-center'); }}
            style={{ textAlign: 'center', padding: '12px 0 4px', cursor: 'pointer', color: '#1677ff', fontSize: 13, fontWeight: 500 }}
          >
            查看全部
          </div>
        </div>
      ) }
    ]
  };

  useEffect(function () {
    newsTimerRef.current = setInterval(function () {
      setNewsIndex(function (prev) { return (prev + 1) % NEWS_LIST.length; });
    }, 3000);
    return function () { if (newsTimerRef.current) clearInterval(newsTimerRef.current); };
  }, []);

  useEffect(function () {
    policyTimerRef.current = setInterval(function () {
      setPolicyIndex(function (prev) { return (prev + 1) % POLICY_LIST.length; });
    }, 3500);
    return function () { if (policyTimerRef.current) clearInterval(policyTimerRef.current); };
  }, []);

  useEffect(function () {
    mallTimerRef.current = setInterval(function () {
      setMallIndex(function (prev) { return (prev + 1) % MALL_PRODUCTS.length; });
    }, 4000);
    return function () { if (mallTimerRef.current) clearInterval(mallTimerRef.current); };
  }, []);

  useEffect(function () {
    noticeTimerRef.current = setInterval(function () {
      setNoticeIndex(function (prev) { return (prev + 1) % NOTICE_LIST.length; });
    }, 3500);
    return function () { if (noticeTimerRef.current) clearInterval(noticeTimerRef.current); };
  }, []);

  var getVisibleNews = useCallback(function () {
    var items = [];
    for (var i = 0; i < NEWS_PAGE_SIZE; i++) {
      items.push(NEWS_LIST[(newsIndex + i) % NEWS_LIST.length]);
    }
    return items;
  }, [newsIndex]);

  var getVisiblePolicies = useCallback(function () {
    var items = [];
    for (var i = 0; i < POLICY_PAGE_SIZE; i++) {
      items.push(POLICY_LIST[(policyIndex + i) % POLICY_LIST.length]);
    }
    return items;
  }, [policyIndex]);

  var getVisibleMallProducts = useCallback(function () {
    var items = [];
    for (var i = 0; i < MALL_PAGE_SIZE; i++) {
      items.push(MALL_PRODUCTS[(mallIndex + i) % MALL_PRODUCTS.length]);
    }
    return items;
  }, [mallIndex]);

  var getVisibleNotices = useCallback(function () {
    var items = [];
    for (var i = 0; i < NOTICE_PAGE_SIZE; i++) {
      items.push(NOTICE_LIST[(noticeIndex + i) % NOTICE_LIST.length]);
    }
    return items;
  }, [noticeIndex]);

  var handleNewsPrev = useCallback(function () {
    setNewsIndex(function (prev) { return (prev - 1 + NEWS_LIST.length) % NEWS_LIST.length; });
  }, []);

  var handleNewsNext = useCallback(function () {
    setNewsIndex(function (prev) { return (prev + 1) % NEWS_LIST.length; });
  }, []);

  var handlePolicyPrev = useCallback(function () {
    setPolicyIndex(function (prev) { return (prev - 1 + POLICY_LIST.length) % POLICY_LIST.length; });
  }, []);

  var handlePolicyNext = useCallback(function () {
    setPolicyIndex(function (prev) { return (prev + 1) % POLICY_LIST.length; });
  }, []);

  var handleMallPrev = useCallback(function () {
    setMallIndex(function (prev) { return (prev - 1 + MALL_PRODUCTS.length) % MALL_PRODUCTS.length; });
  }, []);

  var handleMallNext = useCallback(function () {
    setMallIndex(function (prev) { return (prev + 1) % MALL_PRODUCTS.length; });
  }, []);

  var handleFlowStepClick = useCallback(function (step: number) {
    if (step === 2) {
      setWarningMsg('请先完成飞行器备案后，再进行飞行计划备案。');
      setWarningOpen(true);
    } else {
      handleNavigate('register-aircraft');
    }
  }, [handleNavigate]);

  return (
    <div style={{ minHeight: '100vh', background: '#f5f7fa' }}>
      <header style={{ background: 'linear-gradient(135deg, #0c4a6e 0%, #1677ff 100%)', padding: '0 24px', boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 56 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }} onClick={function () { handleNavigate('home'); }}>
              <RocketOutlined style={{ fontSize: 20, color: '#fff' }} />
              <span style={{ fontSize: 16, fontWeight: 600, color: '#fff', letterSpacing: 1 }}>区域低空公共服务平台</span>
            </div>
            <nav style={{ display: 'flex', gap: 2 }}>
              {NAV_ITEMS.map(function (item) {
                var isHome = item.key === 'home';
                return (
                  <a
                    key={item.key}
                    onClick={function () { if (!isHome) handleNavigate(item.key); }}
                    style={{
                      color: isHome ? '#fff' : 'rgba(255,255,255,0.8)',
                      fontWeight: isHome ? 600 : 400,
                      cursor: 'pointer',
                      fontSize: 14,
                      padding: '6px 14px',
                      borderRadius: 6,
                      transition: '0.2s',
                      background: isHome ? 'rgba(255,255,255,0.15)' : 'transparent'
                    }}
                  >
                    {item.label}
                  </a>
                );
              })}
            </nav>
          </div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <a
              onClick={function () { handleNavigate('profile-uncertified'); }}
              style={{ color: 'rgba(255,255,255,0.85)', cursor: 'pointer', fontSize: 14, padding: '6px 12px', borderRadius: 6 }}
            >
              个人中心
            </a>
            {isLoggedIn && (
              <Dropdown menu={notificationDropdownItems} placement="bottomRight" trigger={['click']}>
                <Badge count={unreadCount} size="small" offset={[-2, 2]}>
                  <BellOutlined style={{ fontSize: 18, color: '#fff', cursor: 'pointer', padding: '4px 8px' }} />
                </Badge>
              </Dropdown>
            )}
            {isLoggedIn ? (
              <Dropdown
                menu={{
                  items: [
                    { type: 'group', label: '切换角色', children: USER_ROLES.map(function (r) {
                      var roleLabel = (
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          {r.icon}<span>{r.label}</span>{currentRole === r.key && <CheckCircleFilled style={{ color: '#52c41a', fontSize: 12 }} />}
                        </div>
                      );
                      return { key: 'role-' + r.key, label: roleLabel, onClick: function () { setCurrentRole(r.key); message.success('已切换至「' + r.label + '」角色'); } };
                    }) },
                    { type: 'divider' },
                    { key: 'role-mgmt', icon: <SwapOutlined />, label: '角色管理', onClick: function () { handleNavigate('role-management'); } },
                    { type: 'divider' },
                    { key: 'logout', icon: <LogoutOutlined />, label: '退出登录', onClick: handleLogout }
                  ]
                }}
                placement="bottomRight"
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer', padding: '2px 8px', borderRadius: 6 }}>
                  <Avatar size={26} icon={<UserOutlined />} style={{ background: '#1677ff' }} />
                  <span style={{ color: '#fff', fontSize: 14 }}>张三</span>
                  <Tag color={USER_ROLES.find(function (r) { return r.key === currentRole; })?.color || 'green'} style={{ margin: 0, fontSize: 11, lineHeight: '18px', padding: '0 4px' }}>{USER_ROLES.find(function (r) { return r.key === currentRole; })?.label || '飞手'}</Tag>
                </div>
              </Dropdown>
            ) : (
              <>
                <Button type="text" style={{ color: '#fff', border: '1px solid rgba(255,255,255,0.5)', borderRadius: 6, fontSize: 13, height: 32 }} onClick={handleLogin}>登录</Button>
              </>
            )}
          </div>
        </div>
      </header>

      <section style={{ background: 'linear-gradient(135deg, #0c4a6e 0%, #1677ff 50%, #69b1ff 100%)', padding: '56px 24px 72px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'radial-gradient(circle at 30% 40%, rgba(255,255,255,0.06) 0%, transparent 50%), radial-gradient(circle at 70% 60%, rgba(255,255,255,0.06) 0%, transparent 50%)' }} />
        <div style={{ position: 'relative', zIndex: 1, maxWidth: 720, margin: '0 auto' }}>
          <h1 style={{ color: '#fff', fontSize: 36, fontWeight: 700, letterSpacing: 1, marginBottom: 12, lineHeight: 1.4 }}>
            区域低空公共服务管理体系
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 16, lineHeight: 1.8, marginBottom: 0 }}>
            以便民利企、普惠高效为核心，为政府部门、企业、飞手、公众提供全场景、一站式、便捷化低空公共服务
          </p>
        </div>
      </section>

      <section style={{ maxWidth: 1200, margin: '-36px auto 0', padding: '0 24px', position: 'relative', zIndex: 2 }}>
        <Card style={{ borderRadius: 10, boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }} styles={{ body: { padding: '20px 32px' } }}>
          <Row gutter={0}>
            {STATS.map(function (stat, idx) {
              return (
                <Col key={stat.label} span={8} style={{ textAlign: 'center', padding: '12px 0', borderRight: idx < STATS.length - 1 ? '1px solid #f0f0f0' : 'none' }}>
                  <div style={{ fontSize: 22, color: '#1677ff', marginBottom: 4 }}>{stat.icon}</div>
                  <div style={{ fontSize: 28, fontWeight: 700, color: '#0c4a6e', lineHeight: 1.3 }}>
                    {stat.value}<span style={{ fontSize: 13, fontWeight: 400, color: '#8c8c8c', marginLeft: 2 }}>{stat.unit}</span>
                  </div>
                  <div style={{ fontSize: 13, color: '#8c8c8c', marginTop: 2 }}>{stat.label}</div>
                </Col>
              );
            })}
          </Row>
        </Card>
      </section>

      {false && (
        <section style={{ maxWidth: 1200, margin: '20px auto 0', padding: '0 24px', position: 'relative', zIndex: 2 }}>
          <Card style={{ borderRadius: 10, boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }} styles={{ body: { padding: '16px 20px' } }}>
            <div style={{ marginBottom: 12 }}>
              <h2 style={{ fontSize: 15, fontWeight: 600, color: 'rgba(0,0,0,0.88)', margin: 0 }}>
                <SafetyCertificateOutlined style={{ color: '#1677ff', marginRight: 6 }} />飞行业务流程
              </h2>
              <p style={{ fontSize: 12, color: '#8c8c8c', margin: '2px 0 0' }}>请依次完成以下认证流程，前置步骤未完成时无法进行后续操作</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'stretch', gap: 12 }}>
              {FLOW_STEPS.map(function (step, index) {
                return (
                  <React.Fragment key={step.key}>
                    <div
                      onClick={function () { handleFlowStepClick(step.step); }}
                      style={{
                        flex: 1,
                        padding: '12px 14px',
                        borderRadius: 8,
                        background: step.bg,
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        border: '1px solid transparent'
                      }}
                      onMouseEnter={function (e) {
                        (e.currentTarget as HTMLDivElement).style.borderColor = step.color;
                        (e.currentTarget as HTMLDivElement).style.boxShadow = '0 2px 8px rgba(0,0,0,0.06)';
                      }}
                      onMouseLeave={function (e) {
                        (e.currentTarget as HTMLDivElement).style.borderColor = 'transparent';
                        (e.currentTarget as HTMLDivElement).style.boxShadow = 'none';
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                        <div style={{ width: 28, height: 28, borderRadius: 8, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, color: step.color, boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
                          {step.icon}
                        </div>
                        <div>
                          <div style={{ fontSize: 10, color: step.color, fontWeight: 600, lineHeight: 1 }}>STEP {step.step}</div>
                          <div style={{ fontSize: 13, fontWeight: 600, color: 'rgba(0,0,0,0.88)', lineHeight: 1.4 }}>{step.title}</div>
                        </div>
                      </div>
                      <div style={{ fontSize: 11, color: '#8c8c8c', lineHeight: 1.4, paddingLeft: 36 }}>{step.desc}</div>
                    </div>
                  </React.Fragment>
                );
              })}
            </div>
          </Card>
        </section>
      )}

      <section style={{ maxWidth: 1200, margin: '20px auto 0', padding: '0 24px' }}>
        <Row gutter={20}>
          <Col span={16}>
            <Row gutter={20}>
              <Col span={8}>
                <Card style={{ borderRadius: 10, height: '100%' }} styles={{ body: { padding: 0 } }}>
                  <div style={{ padding: '14px 20px', borderBottom: '1px solid #f0f0f0' }}>
                    <span style={{ fontSize: 15, fontWeight: 600 }}>📰 新闻动态</span>
                  </div>
                  <div style={{ padding: '6px 20px 16px' }}>
                    {getVisibleNews().map(function (news, index) {
                      return (
                        <div
                          key={news.id + '-' + index}
                          onClick={function () { handleNavigate('news'); }}
                          style={{ padding: '10px 0', borderBottom: index < NEWS_PAGE_SIZE - 1 ? '1px solid #f5f5f5' : 'none', cursor: 'pointer', transition: 'all 0.3s' }}
                        >
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontSize: 14, color: '#1f1f1f', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{news.title}</span>
                            <span style={{ fontSize: 11, padding: '0 6px', borderRadius: 3, color: news.tagColor, background: news.tagBg, whiteSpace: 'nowrap', marginLeft: 8 }}>{news.tag}</span>
                          </div>
                          <div style={{ fontSize: 12, color: '#bfbfbf', marginTop: 3 }}>{news.date}</div>
                        </div>
                      );
                    })}
                  </div>
                </Card>
              </Col>
              <Col span={8}>
                <Card style={{ borderRadius: 10, height: '100%' }} styles={{ body: { padding: 0 } }}>
                  <div style={{ padding: '14px 20px', borderBottom: '1px solid #f0f0f0' }}>
                    <span style={{ fontSize: 15, fontWeight: 600 }}>📋 政策速递</span>
                  </div>
                  <div style={{ padding: '6px 20px 16px' }}>
                    {getVisiblePolicies().map(function (policy, index) {
                      return (
                        <div
                          key={policy.id + '-' + index}
                          onClick={function () { handleNavigate('policy-national'); }}
                          style={{ padding: '10px 0', borderBottom: index < POLICY_PAGE_SIZE - 1 ? '1px solid #f5f5f5' : 'none', cursor: 'pointer', transition: 'all 0.3s' }}
                        >
                          <div style={{ fontSize: 14, color: '#1f1f1f', marginBottom: 3, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{policy.title}</div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontSize: 11, padding: '0 6px', borderRadius: 3, color: policy.tagColor, background: policy.tagBg }}>{policy.tag}</span>
                            <span style={{ fontSize: 12, color: '#bfbfbf' }}>{policy.date}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </Card>
              </Col>
              <Col span={8}>
                <Card style={{ borderRadius: 10, height: '100%' }} styles={{ body: { padding: 0 } }}>
                  <div style={{ padding: '14px 20px', borderBottom: '1px solid #f0f0f0' }}>
                    <span style={{ fontSize: 15, fontWeight: 600 }}>🔔 通知公告</span>
                  </div>
                  <div style={{ padding: '6px 20px 16px' }}>
                    {getVisibleNotices().map(function (notice, index) {
                      return (
                        <div
                          key={notice.id + '-' + index}
                          onClick={function () { handleNavigate('news'); }}
                          style={{ padding: '10px 0', borderBottom: index < NOTICE_PAGE_SIZE - 1 ? '1px solid #f5f5f5' : 'none', cursor: 'pointer', transition: 'all 0.3s' }}
                        >
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontSize: 14, color: '#1f1f1f', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{notice.title}</span>
                            <span style={{ fontSize: 11, padding: '0 6px', borderRadius: 3, color: notice.tagColor, background: notice.tagBg, whiteSpace: 'nowrap', marginLeft: 8 }}>{notice.tag}</span>
                          </div>
                          <div style={{ fontSize: 12, color: '#bfbfbf', marginTop: 3 }}>{notice.date}</div>
                        </div>
                      );
                    })}
                  </div>
                </Card>
              </Col>
            </Row>

            <Card style={{ borderRadius: 10, marginTop: 20 }} styles={{ body: { padding: 0 } }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 20px', borderBottom: '1px solid #f0f0f0' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <ShoppingOutlined style={{ fontSize: 16, color: '#722ed1' }} />
                  <span style={{ fontSize: 15, fontWeight: 600 }}>低空商城</span>
                  <Tag color="purple" style={{ marginLeft: 2, borderRadius: 8, fontSize: 11, lineHeight: '18px', padding: '0 6px' }}>精选</Tag>
                </div>
                <div style={{ display: 'flex', gap: 4 }}>
                  <Button type="text" size="small" icon={<LeftOutlined />} style={{ width: 24, height: 24, minWidth: 24, padding: 0, borderRadius: 4, color: '#8c8c8c', border: '1px solid #d9d9d9' }} onClick={handleMallPrev} />
                  <Button type="text" size="small" icon={<RightOutlined />} style={{ width: 24, height: 24, minWidth: 24, padding: 0, borderRadius: 4, color: '#8c8c8c', border: '1px solid #d9d9d9' }} onClick={handleMallNext} />
                </div>
              </div>
              <div style={{ padding: '16px 20px' }}>
                <Row gutter={16}>
                  {getVisibleMallProducts().map(function (product, index) {
                    return (
                      <Col key={product.id + '-' + index} span={8}>
                        <div
                          onClick={function () { handleNavigate('mall-detail'); }}
                          style={{
                            borderRadius: 8,
                            border: '1px solid #f0f0f0',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                            overflow: 'hidden'
                          }}
                          onMouseEnter={function (e) {
                            (e.currentTarget as HTMLDivElement).style.borderColor = '#d3adf7';
                            (e.currentTarget as HTMLDivElement).style.boxShadow = '0 2px 8px rgba(114,46,209,0.08)';
                          }}
                          onMouseLeave={function (e) {
                            (e.currentTarget as HTMLDivElement).style.borderColor = '#f0f0f0';
                            (e.currentTarget as HTMLDivElement).style.boxShadow = 'none';
                          }}
                        >
                          <div style={{ height: 80, background: 'linear-gradient(135deg, #f9f0ff 0%, #e6f4ff 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                            <RocketOutlined style={{ fontSize: 28, color: '#d9d9d9' }} />
                            {product.tag && (
                              <Tag color={product.tagColor} style={{ position: 'absolute', top: 6, left: 6, margin: 0, fontSize: 10, lineHeight: '16px', padding: '0 4px', borderRadius: 3 }}>{product.tag}</Tag>
                            )}
                          </div>
                          <div style={{ padding: '10px 12px' }}>
                            <div style={{ fontSize: 13, fontWeight: 500, color: 'rgba(0,0,0,0.85)', marginBottom: 4, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{product.name}</div>
                            <div style={{ fontSize: 15, fontWeight: 700, color: '#f5222d' }}>{product.price}</div>
                          </div>
                        </div>
                      </Col>
                    );
                  })}
                </Row>
              </div>
            </Card>
          </Col>

          <Col span={8}>
            <Card style={{ borderRadius: 10 }} styles={{ body: { padding: 0 } }}>
              <div style={{ padding: '14px 20px', borderBottom: '1px solid #f0f0f0' }}>
                <span style={{ fontSize: 15, fontWeight: 600 }}>🧭 低空服务</span>
              </div>
              <div style={{ padding: '16px 20px' }}>
                <Row gutter={[12, 12]}>
                  {SERVICE_MODULES.map(function (mod) {
                    return (
                      <Col key={mod.key} span={8}>
                        <div
                          onClick={function () { requireLogin(function () { handleNavigate('service-show'); }); }}
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            padding: '14px 8px',
                            borderRadius: 8,
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                            textAlign: 'center'
                          }}
                          onMouseEnter={function (e) {
                            (e.currentTarget as HTMLDivElement).style.background = mod.bg;
                          }}
                          onMouseLeave={function (e) {
                            (e.currentTarget as HTMLDivElement).style.background = 'transparent';
                          }}
                        >
                          <div style={{
                            width: 40,
                            height: 40,
                            borderRadius: 12,
                            background: mod.bg,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom: 8,
                            fontSize: 20,
                            color: mod.color
                          }}>
                            {mod.icon}
                          </div>
                          <div style={{ fontSize: 12, fontWeight: 500, color: 'rgba(0,0,0,0.85)' }}>{mod.title}</div>
                        </div>
                      </Col>
                    );
                  })}
                </Row>
              </div>
            </Card>

            <Card style={{ borderRadius: 10, marginTop: 20 }} styles={{ body: { padding: 0 } }}>
              <div style={{ padding: '14px 20px', borderBottom: '1px solid #f0f0f0' }}>
                <span style={{ fontSize: 15, fontWeight: 600 }}>🚀 飞行服务</span>
              </div>
              <div style={{ padding: '12px 16px' }}>
                <div
                  onClick={function () { requireLogin(function () { handleNavigate('flight-airspace'); }); }}
                  style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', borderRadius: 8, background: 'linear-gradient(135deg, #e6f4ff 0%, #f0f5ff 100%)', marginBottom: 8, cursor: 'pointer', transition: '0.2s' }}
                  onMouseEnter={function (e) { (e.currentTarget as HTMLDivElement).style.boxShadow = '0 2px 8px rgba(22,119,255,0.1)'; }}
                  onMouseLeave={function (e) { (e.currentTarget as HTMLDivElement).style.boxShadow = 'none'; }}
                >
                  <EnvironmentOutlined style={{ fontSize: 18, color: '#1677ff' }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: '#1677ff' }}>空域查询</div>
                  </div>
                  <RightOutlined style={{ fontSize: 10, color: '#bfbfbf' }} />
                </div>
                <div
                  onClick={function () { requireLogin(function () { handleNavigate('flight-airspace'); }); }}
                  style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', borderRadius: 8, background: 'linear-gradient(135deg, #fff7e6 0%, #fff1f0 100%)', cursor: 'pointer', transition: '0.2s' }}
                  onMouseEnter={function (e) { (e.currentTarget as HTMLDivElement).style.boxShadow = '0 2px 8px rgba(250,140,22,0.1)'; }}
                  onMouseLeave={function (e) { (e.currentTarget as HTMLDivElement).style.boxShadow = 'none'; }}
                >
                  <AlertOutlined style={{ fontSize: 18, color: '#fa8c16' }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: '#fa8c16' }}>临时管制通知</div>
                  </div>
                  <RightOutlined style={{ fontSize: 10, color: '#bfbfbf' }} />
                </div>
              </div>
            </Card>
          </Col>
        </Row>
      </section>

      <footer style={{ background: '#001529', marginTop: 40, padding: '32px 24px 20px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <Row gutter={24}>
            <Col span={10}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                <RocketOutlined style={{ fontSize: 18, color: '#1677ff' }} />
                <span style={{ fontSize: 15, fontWeight: 600, color: '#fff' }}>区域低空公共服务平台</span>
              </div>
              <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 12, lineHeight: 1.8, margin: 0 }}>
                以便民利企、普惠高效为核心，为政府部门、企业、飞手、公众提供全场景、一站式、便捷化低空公共服务。
              </p>
            </Col>
            <Col span={7}>
              <h4 style={{ color: '#fff', fontSize: 13, marginBottom: 12 }}>快速链接</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <a onClick={function () { handleNavigate('service-list'); }} style={{ color: 'rgba(255,255,255,0.55)', cursor: 'pointer', fontSize: 12 }}>低空服务</a>
                <a onClick={function () { handleNavigate('mall-list'); }} style={{ color: 'rgba(255,255,255,0.55)', cursor: 'pointer', fontSize: 12 }}>低空商城</a>
                <a onClick={function () { handleNavigate('flight-dynamic'); }} style={{ color: 'rgba(255,255,255,0.55)', cursor: 'pointer', fontSize: 12 }}>飞行服务</a>
                <a onClick={function () { handleNavigate('policy-national'); }} style={{ color: 'rgba(255,255,255,0.55)', cursor: 'pointer', fontSize: 12 }}>政策法规</a>
              </div>
            </Col>
            <Col span={7}>
              <h4 style={{ color: '#fff', fontSize: 13, marginBottom: 12 }}>联系我们</h4>
              <div style={{ color: 'rgba(255,255,255,0.55)', fontSize: 12, lineHeight: 2 }}>
                <div>📞 服务热线：400-888-0000</div>
                <div>📧 邮箱：service@lowaltitude.gov.cn</div>
                <div>📍 地址：XX市XX区低空经济产业园</div>
              </div>
            </Col>
          </Row>
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', marginTop: 20, marginBottom: 12 }} />
          <div style={{ textAlign: 'center', color: 'rgba(255,255,255,0.35)', fontSize: 12 }}>
            © 2026 区域低空公共服务管理体系 版权所有
          </div>
        </div>
      </footer>

      <Modal
        open={warningOpen}
        onCancel={function () { setWarningOpen(false); }}
        footer={[
          <Button key="cancel" onClick={function () { setWarningOpen(false); }}>知道了</Button>,
          <Button key="go" type="primary" onClick={function () { setWarningOpen(false); handleNavigate('register-aircraft'); }}>去办理飞行器备案</Button>,
        ]}
        width={420}
        centered
      >
        <div style={{ padding: '12px 0', textAlign: 'center' }}>
          <ExclamationCircleOutlined style={{ fontSize: 40, color: '#faad14', marginBottom: 12 }} />
          <div style={{ fontSize: 15, fontWeight: 600, color: 'rgba(0,0,0,0.88)', marginBottom: 6 }}>流程提示</div>
          <div style={{ fontSize: 14, color: '#595959', lineHeight: 1.8 }}>{warningMsg}</div>
        </div>
      </Modal>
    </div>
  );
};

export default Component;
