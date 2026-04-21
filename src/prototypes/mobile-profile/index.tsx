/**
 * @name 个人中心
 *
 * 区域低空公共服务移动端个人中心页面
 * 包含个人信息、我的业务、设置等
 */

import './style.css';
import React from 'react';
import {
  Card,
  Avatar,
  Tag
} from 'antd';
import {
  UserOutlined,
  FileTextOutlined,
  SafetyCertificateOutlined,
  SettingOutlined,
  QuestionCircleOutlined,
  RightOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  IdcardOutlined,
  BellOutlined,
  LockOutlined,
  HomeOutlined,
  AppstoreOutlined,
  MessageOutlined,
  RocketOutlined
} from '@ant-design/icons';

const Component: React.FC = () => {
  const handleMenuClick = (path: string) => {
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

  const menuItems = [
    { icon: <FileTextOutlined style={{ color: '#1677ff' }} />, label: '我的申请', value: '3条进行中', path: '/prototypes/my-business' },
    { icon: <SafetyCertificateOutlined style={{ color: '#52c41a' }} />, label: '我的资质', value: '2个有效', path: '/prototypes/qualification' },
    { icon: <RocketOutlined style={{ color: '#fa8c16' }} />, label: '飞行器备案', value: '1架', path: '/prototypes/qualification' },
    { icon: <EnvironmentOutlined style={{ color: '#722ed1' }} />, label: '起降点收藏', value: '5个', path: '/prototypes/landing-point' }
  ];

  const serviceItems = [
    { icon: <FileTextOutlined style={{ color: '#1677ff' }} />, label: '飞行计划', path: '/prototypes/flight-plan' },
    { icon: <EnvironmentOutlined style={{ color: '#722ed1' }} />, label: '空域查询', path: '/prototypes/airspace-query' },
    { icon: <SafetyCertificateOutlined style={{ color: '#13c2c2' }} />, label: '飞行许可', path: '/prototypes/flight-permit' },
    { icon: <RocketOutlined style={{ color: '#faad14' }} />, label: '航线规划', path: '/prototypes/route-planning' }
  ];

  const settingItems = [
    { icon: <BellOutlined style={{ color: '#1677ff' }} />, label: '消息通知', path: '/prototypes/mobile-message' },
    { icon: <LockOutlined style={{ color: '#52c41a' }} />, label: '账号安全', path: '/prototypes/mobile-profile' },
    { icon: <SettingOutlined style={{ color: '#666' }} />, label: '系统设置', path: '/prototypes/mobile-profile' },
    { icon: <QuestionCircleOutlined style={{ color: '#fa8c16' }} />, label: '帮助与反馈', path: '/prototypes/public-feedback' }
  ];

  return (
    <div style={containerStyle}>
      <div style={{
        background: 'linear-gradient(135deg, #1677ff 0%, #0958d9 100%)',
        padding: '24px 16px 32px',
        color: '#fff'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <Avatar size={64} icon={<UserOutlined />} style={{ background: 'rgba(255,255,255,0.2)' }} />
          <div>
            <div style={{ fontSize: 18, fontWeight: 600 }}>张三</div>
            <div style={{ fontSize: 13, opacity: 0.8, marginTop: 4 }}>
              <PhoneOutlined style={{ marginRight: 4 }} />
              138****8888
            </div>
            <Tag color="blue" style={{ marginTop: 8 }}>企业用户</Tag>
          </div>
        </div>
      </div>

      <div style={{ padding: '0 16px', marginTop: -16 }}>
        <Card style={{ borderRadius: 12, marginBottom: 12 }} styles={{ body: { padding: '8px 0' } }}>
          {menuItems.map((item, index) => (
            <div key={index}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '14px 16px',
                  cursor: 'pointer'
                }}
                onClick={() => handleMenuClick(item.path)}
              >
                <div style={{
                  width: 32,
                  height: 32,
                  borderRadius: 8,
                  background: '#f5f7fa',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: 12
                }}>
                  {item.icon}
                </div>
                <span style={{ flex: 1, fontSize: 14 }}>{item.label}</span>
                <span style={{ fontSize: 13, color: '#999', marginRight: 8 }}>{item.value}</span>
                <RightOutlined style={{ color: '#ccc', fontSize: 12 }} />
              </div>
              {index < menuItems.length - 1 && <div style={{ height: 1, background: '#f0f0f0', margin: '0 16px' }} />}
            </div>
          ))}
        </Card>

        <Card
          title={<span style={{ fontSize: 14, fontWeight: 600 }}>常用服务</span>}
          style={{ borderRadius: 12, marginBottom: 12 }}
          styles={{ body: { padding: '12px 16px' } }}
        >
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
            {serviceItems.map((item, index) => (
              <div
                key={index}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  padding: '8px 0',
                  cursor: 'pointer'
                }}
                onClick={() => handleMenuClick(item.path)}
              >
                <div style={{
                  width: 40,
                  height: 40,
                  borderRadius: 10,
                  background: '#f5f7fa',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 6,
                  fontSize: 18
                }}>
                  {item.icon}
                </div>
                <span style={{ fontSize: 11, color: '#333' }}>{item.label}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card style={{ borderRadius: 12 }} styles={{ body: { padding: '8px 0' } }}>
          {settingItems.map((item, index) => (
            <div key={index}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '14px 16px',
                  cursor: 'pointer'
                }}
                onClick={() => handleMenuClick(item.path)}
              >
                <div style={{
                  width: 32,
                  height: 32,
                  borderRadius: 8,
                  background: '#f5f7fa',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: 12
                }}>
                  {item.icon}
                </div>
                <span style={{ flex: 1, fontSize: 14 }}>{item.label}</span>
                <RightOutlined style={{ color: '#ccc', fontSize: 12 }} />
              </div>
              {index < settingItems.length - 1 && <div style={{ height: 1, background: '#f0f0f0', margin: '0 16px' }} />}
            </div>
          ))}
        </Card>

        <div style={{ textAlign: 'center', padding: '24px 0', color: '#999', fontSize: 12 }}>
          低空公共服务 v1.0.0
        </div>
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
          { key: 'home', icon: <HomeOutlined />, label: '首页', active: false },
          { key: 'service', icon: <AppstoreOutlined />, label: '服务', active: false },
          { key: 'message', icon: <MessageOutlined />, label: '消息', active: false },
          { key: 'profile', icon: <UserOutlined />, label: '我的', active: true }
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
