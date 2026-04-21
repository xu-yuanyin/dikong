/**
 * @name 全部服务
 *
 * 区域低空公共服务移动端服务列表页
 * 包含所有服务分类和入口
 */

import './style.css';
import React from 'react';
import {
  Card,
  Input,
  Badge
} from 'antd';
import {
  SearchOutlined,
  RocketOutlined,
  InfoCircleOutlined,
  AlertOutlined,
  HeartOutlined,
  EnvironmentOutlined,
  SafetyCertificateOutlined,
  CompassOutlined,
  HomeOutlined,
  IdcardOutlined,
  CloudOutlined,
  FileTextOutlined,
  RightOutlined,
  BellOutlined,
  ToolOutlined,
  MessageOutlined,
  BookOutlined,
  NotificationOutlined,
  LineChartOutlined,
  HomeOutlined as HomeIcon,
  AppstoreOutlined,
  MessageOutlined as MessageIcon,
  UserOutlined
} from '@ant-design/icons';

const SERVICE_CATEGORIES = [
  {
    title: '低空飞行服务',
    icon: <RocketOutlined style={{ color: '#1677ff' }} />,
    services: [
      { key: 'plan', name: '飞行计划填报', icon: <FileTextOutlined />, desc: '在线填报飞行计划', path: '/prototypes/flight-plan' },
      { key: 'airspace', name: '空域信息查询', icon: <EnvironmentOutlined />, desc: '查询空域划设信息', path: '/prototypes/airspace-query' },
      { key: 'permit', name: '飞行许可办理', icon: <SafetyCertificateOutlined />, desc: '在线申请飞行许可', path: '/prototypes/flight-permit' },
      { key: 'route', name: '航线规划', icon: <CompassOutlined />, desc: '智能规划飞行航线', path: '/prototypes/route-planning' },
      { key: 'landing', name: '起降点服务', icon: <HomeOutlined />, desc: '查询预约起降点', path: '/prototypes/landing-point' },
      { key: 'qualification', name: '资质办理', icon: <IdcardOutlined />, desc: '办理飞行员资质', path: '/prototypes/qualification' }
    ]
  },
  {
    title: '低空信息服务',
    icon: <InfoCircleOutlined style={{ color: '#fa8c16' }} />,
    services: [
      { key: 'policy', name: '政策法规', icon: <FileTextOutlined />, desc: '政策文件查询', path: '/prototypes/info-policy' },
      { key: 'weather', name: '气象服务', icon: <CloudOutlined />, desc: '实时气象数据', path: '/prototypes/info-weather' },
      { key: 'notice', name: '通知公告', icon: <NotificationOutlined />, desc: '权威通知发布', path: '/prototypes/info-notice' },
      { key: 'news', name: '行业资讯', icon: <LineChartOutlined />, desc: '行业动态资讯', path: '/prototypes/info-news' },
      { key: 'safety', name: '安全知识', icon: <SafetyCertificateOutlined />, desc: '飞行安全知识', path: '/prototypes/info-safety' }
    ]
  },
  {
    title: '低空应急服务',
    icon: <AlertOutlined style={{ color: '#ff4d4f' }} />,
    services: [
      { key: 'alarm', name: '一键报警', icon: <AlertOutlined />, desc: '紧急情况快速求助', path: '/prototypes/emergency-alarm' },
      { key: 'rescue', name: '救援调度', icon: <RocketOutlined />, desc: '联动救援力量', path: '/prototypes/emergency-rescue' },
      { key: 'warning', name: '预警发布', icon: <BellOutlined />, desc: '发布预警信息', path: '/prototypes/emergency-warning' },
      { key: 'record', name: '数据留存', icon: <FileTextOutlined />, desc: '应急数据记录', path: '/prototypes/emergency-record' }
    ]
  },
  {
    title: '低空便民服务',
    icon: <HeartOutlined style={{ color: '#52c41a' }} />,
    services: [
      { key: 'tour', name: '低空旅游', icon: <CompassOutlined />, desc: '低空旅游线路预约', path: '/prototypes/public-tour' },
      { key: 'training', name: '培训服务', icon: <BookOutlined />, desc: '飞行培训机构查询', path: '/prototypes/public-training' },
      { key: 'query', name: '资质查询', icon: <SafetyCertificateOutlined />, desc: '在线查询合规资质', path: '/prototypes/public-query' },
      { key: 'maintenance', name: '维修保险', icon: <ToolOutlined />, desc: '飞行器维修保养服务', path: '/prototypes/public-maintenance' },
      { key: 'feedback', name: '意见反馈', icon: <MessageOutlined />, desc: '提交意见建议', path: '/prototypes/public-feedback' }
    ]
  }
];

const Component: React.FC = () => {
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
    paddingBottom: 70
  };

  return (
    <div style={containerStyle}>
      <div style={{
        background: '#fff',
        padding: '12px 16px',
        position: 'sticky',
        top: 0,
        zIndex: 10,
        borderBottom: '1px solid #f0f0f0'
      }}>
        <div style={{ fontSize: 17, fontWeight: 600, marginBottom: 12, textAlign: 'center' }}>
          全部服务
        </div>
        <Input
          placeholder="搜索服务..."
          prefix={<SearchOutlined style={{ color: '#999' }} />}
          style={{ borderRadius: 20, background: '#f5f7fa', border: 'none' }}
        />
      </div>

      <div style={{ padding: 16 }}>
        {SERVICE_CATEGORIES.map((category, index) => (
          <Card
            key={index}
            title={
              <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                {category.icon}
                <span style={{ fontSize: 15, fontWeight: 600 }}>{category.title}</span>
              </span>
            }
            style={{ borderRadius: 12, marginBottom: 12 }}
            styles={{ body: { padding: '8px 12px' } }}
          >
            {category.services.map((service) => (
              <div
                key={service.key}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '12px 0',
                  borderBottom: '1px solid #f5f5f5',
                  cursor: 'pointer'
                }}
                onClick={() => handleServiceClick(service.path)}
              >
                <div style={{
                  width: 36,
                  height: 36,
                  borderRadius: 8,
                  background: '#f5f7fa',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: 12,
                  color: '#1677ff'
                }}>
                  {service.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14 }}>{service.name}</div>
                  <div style={{ fontSize: 12, color: '#999', marginTop: 2 }}>{service.desc}</div>
                </div>
                <RightOutlined style={{ color: '#ccc', fontSize: 12 }} />
              </div>
            ))}
          </Card>
        ))}
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
          { key: 'home', icon: <HomeIcon />, label: '首页', active: false },
          { key: 'service', icon: <AppstoreOutlined />, label: '服务', active: true },
          { key: 'message', icon: <MessageIcon />, label: '消息', active: false },
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
            <span style={{ fontSize: 20 }}>{tab.icon}</span>
            <span style={{ fontSize: 10, marginTop: 2 }}>{tab.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Component;
