/**
 * @name 首页
 *
 * 区域低空公共服务管理体系移动端门户入口页面
 * 为政府部门、企业、飞手、公众提供一站式服务导航
 */

import './style.css';
import React, { useState } from 'react';
import {
  Input,
  Card,
  Badge,
  Tag,
  Button,
  Tabs,
  List,
  Space
} from 'antd';
import {
  SearchOutlined,
  BellOutlined,
  RocketOutlined,
  InfoCircleOutlined,
  AlertOutlined,
  HeartOutlined,
  EnvironmentOutlined,
  CloudOutlined,
  SafetyCertificateOutlined,
  ThunderboltOutlined,
  FileTextOutlined,
  NotificationOutlined,
  LineChartOutlined,
  RightOutlined,
  PhoneOutlined,
  HomeOutlined,
  AppstoreOutlined,
  MessageOutlined,
  UserOutlined,
  ClockCircleOutlined
} from '@ant-design/icons';

const SERVICE_MODULES = [
  {
    key: 'flight',
    title: '低空飞行服务',
    description: '飞行计划、空域查询、飞行许可',
    icon: <RocketOutlined />,
    color: '#1677ff',
    bgColor: '#e6f4ff',
    path: '/prototypes/flight-service'
  },
  {
    key: 'info',
    title: '低空信息服务',
    description: '政策法规、气象服务、通知公告',
    icon: <InfoCircleOutlined />,
    color: '#fa8c16',
    bgColor: '#fff7e6',
    path: '/prototypes/info-service'
  },
  {
    key: 'emergency',
    title: '低空应急服务',
    description: '一键报警、救援调度、预警发布',
    icon: <AlertOutlined />,
    color: '#ff4d4f',
    bgColor: '#fff1f0',
    path: '/prototypes/emergency-service'
  },
  {
    key: 'public',
    title: '低空便民服务',
    description: '低空旅游、培训服务、资质查询',
    icon: <HeartOutlined />,
    color: '#52c41a',
    bgColor: '#f6ffed',
    path: '/prototypes/public-service'
  }
];

const QUICK_SERVICES = [
  { key: 'plan', title: '飞行计划填报', icon: <FileTextOutlined />, color: '#1677ff', path: '/prototypes/flight-plan' },
  { key: 'airspace', title: '空域信息查询', icon: <EnvironmentOutlined />, color: '#722ed1', path: '/prototypes/airspace-query' },
  { key: 'permit', title: '飞行许可办理', icon: <SafetyCertificateOutlined />, color: '#13c2c2', path: '/prototypes/flight-permit' },
  { key: 'weather', title: '气象服务', icon: <CloudOutlined />, color: '#faad14', path: '/prototypes/info-weather' },
  { key: 'alarm', title: '一键报警', icon: <AlertOutlined />, color: '#ff4d4f', path: '/prototypes/emergency-alarm' },
  { key: 'qualify', title: '资质查询', icon: <SafetyCertificateOutlined />, color: '#52c41a', path: '/prototypes/public-query' },
  { key: 'training', title: '培训报名', icon: <ThunderboltOutlined />, color: '#eb2f96', path: '/prototypes/public-training' },
  { key: 'tour', title: '低空旅游', icon: <RocketOutlined />, color: '#2f54eb', path: '/prototypes/public-tour' }
];

const NEWS_DATA = {
  policies: [
    { id: 1, title: '关于进一步加强低空空域管理的通知', date: '01-15', tag: '重要' },
    { id: 2, title: '低空飞行服务管理办法（试行）', date: '01-10', tag: '新规' },
    { id: 3, title: '民用无人驾驶航空器系统安全管理规定', date: '01-05', tag: '' }
  ],
  notices: [
    { id: 1, title: '关于开展低空飞行安全专项检查的通知', date: '01-16', tag: '紧急' },
    { id: 2, title: '春节期间空域管制公告', date: '01-14', tag: '重要' },
    { id: 3, title: '系统升级维护通知', date: '01-12', tag: '' }
  ],
  trends: [
    { id: 1, title: '低空经济市场规模突破千亿', date: '01-16' },
    { id: 2, title: '多地开展低空空域改革试点', date: '01-13' },
    { id: 3, title: '无人机配送业务迎来快速发展期', date: '01-11' }
  ]
};

const Component: React.FC = () => {
  const [activeTab, setActiveTab] = useState('policies');

  const handleServiceClick = (path: string) => {
    window.location.href = path;
  };

  const handleNavClick = (key: string) => {
    const navPaths: Record<string, string> = {
      home: '/prototypes/mobile-home',
      service: '/prototypes/mobile-service',
      message: '/prototypes/mobile-message',
      profile: '/prototypes/mobile-profile'
    };
    if (navPaths[key]) {
      window.location.href = navPaths[key];
    }
  };

  const containerStyle: React.CSSProperties = {
    maxWidth: 430,
    margin: '0 auto',
    minHeight: '100vh',
    background: '#f5f7fa',
    position: 'relative',
    paddingBottom: 70
  };

  const renderNewsItem = (item: { id: number; title: string; date: string; tag: string }) => (
    <div
      key={item.id}
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: '12px 0',
        borderBottom: '1px solid #f0f0f0',
        cursor: 'pointer'
      }}
      onClick={() => {}}
    >
      {item.tag && (
        <Tag
          color={item.tag === '紧急' ? 'error' : item.tag === '重要' ? 'warning' : item.tag === '新规' ? 'processing' : 'default'}
          style={{ marginRight: 8, flexShrink: 0 }}
        >
          {item.tag}
        </Tag>
      )}
      <span style={{ flex: 1, fontSize: 14, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
        {item.title}
      </span>
      <span style={{ fontSize: 12, color: '#999', marginLeft: 8, flexShrink: 0 }}>{item.date}</span>
    </div>
  );

  return (
    <div style={containerStyle}>
      <div style={{
        background: 'linear-gradient(135deg, #1677ff 0%, #0958d9 100%)',
        padding: '12px 16px 24px',
        color: '#fff'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              background: 'rgba(255,255,255,0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <RocketOutlined style={{ fontSize: 18 }} />
            </div>
            <div>
              <div style={{ fontSize: 16, fontWeight: 600 }}>区域低空公共服务</div>
            </div>
          </div>
          <Badge count={5} size="small">
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
              onClick={() => handleNavClick('message')}
            >
              <BellOutlined style={{ fontSize: 18 }} />
            </div>
          </Badge>
        </div>

        <Input
          placeholder="搜索服务、政策、资讯..."
          prefix={<SearchOutlined style={{ color: '#999' }} />}
          style={{
            borderRadius: 20,
            background: 'rgba(255,255,255,0.95)',
            border: 'none'
          }}
        />
      </div>

      <div style={{ padding: '0 16px', marginTop: 12 }}>
        <Card
          style={{
            borderRadius: 12,
            marginBottom: 12,
            background: 'linear-gradient(135deg, #ff4d4f 0%, #ff7875 100%)',
            border: 'none'
          }}
          styles={{ body: { padding: 16 } }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ color: '#fff' }}>
              <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 4 }}>
                <AlertOutlined style={{ marginRight: 8 }} />
                一键报警
              </div>
              <div style={{ fontSize: 12, opacity: 0.9 }}>紧急情况快速求助，自动上报位置</div>
            </div>
            <Button
              type="primary"
              style={{
                background: '#fff',
                color: '#ff4d4f',
                border: 'none',
                borderRadius: 20,
                fontWeight: 600
              }}
              icon={<PhoneOutlined />}
              onClick={() => handleServiceClick('/prototypes/emergency-alarm')}
            >
              立即报警
            </Button>
          </div>
        </Card>

        <Card
          title={<span style={{ fontSize: 15, fontWeight: 600 }}>核心服务</span>}
          style={{ borderRadius: 12, marginBottom: 12 }}
          styles={{ body: { padding: '12px 16px' } }}
        >
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
            {SERVICE_MODULES.map((module) => (
              <div
                key={module.key}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: 12,
                  background: module.bgColor,
                  borderRadius: 8,
                  cursor: 'pointer'
                }}
                onClick={() => handleServiceClick(module.path)}
              >
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 10,
                    background: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 10,
                    color: module.color,
                    fontSize: 18
                  }}
                >
                  {module.icon}
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#333' }}>{module.title}</div>
                  <div style={{ fontSize: 11, color: '#666', marginTop: 2 }}>{module.description}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card
          title={<span style={{ fontSize: 15, fontWeight: 600 }}>快捷服务</span>}
          style={{ borderRadius: 12, marginBottom: 12 }}
          styles={{ body: { padding: '12px 16px' } }}
        >
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
            {QUICK_SERVICES.map((service) => (
              <div
                key={service.key}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  padding: '8px 0',
                  cursor: 'pointer'
                }}
                onClick={() => handleServiceClick(service.path)}
              >
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 10,
                    background: `${service.color}15`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 6,
                    color: service.color,
                    fontSize: 18
                  }}
                >
                  {service.icon}
                </div>
                <span style={{ fontSize: 11, color: '#333', textAlign: 'center' }}>{service.title}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card
          style={{ borderRadius: 12, marginBottom: 12 }}
          styles={{ body: { padding: 0 } }}
        >
          <Tabs
            activeKey={activeTab}
            onChange={setActiveTab}
            centered
            style={{ marginBottom: 0 }}
            items={[
              {
                key: 'policies',
                label: <span style={{ fontSize: 13 }}><FileTextOutlined /> 政策法规</span>,
                children: (
                  <div style={{ padding: '0 16px 12px' }}>
                    {NEWS_DATA.policies.map(renderNewsItem)}
                  </div>
                )
              },
              {
                key: 'notices',
                label: <span style={{ fontSize: 13 }}><NotificationOutlined /> 通知公告</span>,
                children: (
                  <div style={{ padding: '0 16px 12px' }}>
                    {NEWS_DATA.notices.map(renderNewsItem)}
                  </div>
                )
              },
              {
                key: 'trends',
                label: <span style={{ fontSize: 13 }}><LineChartOutlined /> 行业动态</span>,
                children: (
                  <div style={{ padding: '0 16px 12px' }}>
                    {NEWS_DATA.trends.map(renderNewsItem)}
                  </div>
                )
              }
            ]}
          />
        </Card>
      </div>

      <div
        style={{
          position: 'fixed',
          bottom: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '100%',
          maxWidth: 430,
          background: '#fff',
          borderTop: '1px solid #f0f0f0',
          display: 'flex',
          justifyContent: 'space-around',
          padding: '8px 0',
          zIndex: 100
        }}
      >
        {[
          { key: 'home', icon: <HomeOutlined />, label: '首页', active: true },
          { key: 'service', icon: <AppstoreOutlined />, label: '服务', active: false },
          { key: 'message', icon: <MessageOutlined />, label: '消息', active: false, badge: 5 },
          { key: 'profile', icon: <UserOutlined />, label: '我的', active: false }
        ].map((tab) => (
          <div
            key={tab.key}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              color: tab.active ? '#1677ff' : '#999',
              cursor: 'pointer'
            }}
            onClick={() => handleNavClick(tab.key)}
          >
            <Badge count={tab.badge || 0} size="small" offset={[2, -2]}>
              <span style={{ fontSize: 20 }}>{tab.icon}</span>
            </Badge>
            <span style={{ fontSize: 10, marginTop: 2 }}>{tab.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Component;
