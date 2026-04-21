/**
 * @name 消息中心
 *
 * 区域低空公共服务移动端消息中心页面
 * 包含通知消息、系统消息等
 */

import './style.css';
import React, { useState } from 'react';
import {
  Card,
  Tabs,
  Tag,
  Badge
} from 'antd';
import {
  BellOutlined,
  FileTextOutlined,
  RightOutlined,
  HomeOutlined,
  AppstoreOutlined,
  MessageOutlined,
  UserOutlined
} from '@ant-design/icons';

const MESSAGES = {
  system: [
    { id: 1, title: '飞行计划审批通过', content: '您提交的飞行计划 #FP20240116001 已审批通过', time: '10分钟前', read: false, path: '/prototypes/my-business' },
    { id: 2, title: '起降点预约成功', content: '您已成功预约城东区A3起降点，预约时间：2024-01-20 14:00', time: '1小时前', read: false, path: '/prototypes/landing-point' },
    { id: 3, title: '资质证书即将到期', content: '您的飞行员资质证书将于30天后到期，请及时续期', time: '昨天', read: true, path: '/prototypes/qualification' }
  ],
  notice: [
    { id: 1, title: '春节期间空域管制通知', content: '2024年2月9日-2月17日期间，部分空域实施临时管制...', time: '今天', urgent: true, path: '/prototypes/info-notice' },
    { id: 2, title: '飞行计划填报系统升级公告', content: '系统将于本周六凌晨进行升级维护，届时服务暂停...', time: '昨天', urgent: false, path: '/prototypes/info-notice' },
    { id: 3, title: '新增12个临时起降点开放', content: '为满足春节假期需求，新增12个临时起降点...', time: '3天前', urgent: false, path: '/prototypes/info-notice' }
  ]
};

const Component: React.FC = () => {
  const [activeTab, setActiveTab] = useState('system');

  const handleMessageClick = (path: string) => {
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
        <div style={{ fontSize: 17, fontWeight: 600, textAlign: 'center' }}>
          消息中心
        </div>
      </div>

      <Tabs
        activeKey={activeTab}
        onChange={setActiveTab}
        centered
        style={{ background: '#fff', marginBottom: 8 }}
        items={[
          {
            key: 'system',
            label: <span><BellOutlined /> 系统消息 <Badge count={2} size="small" /></span>,
            children: (
              <div style={{ padding: '0 16px' }}>
                {MESSAGES.system.map((msg) => (
                  <Card
                    key={msg.id}
                    style={{
                      borderRadius: 12,
                      marginBottom: 12,
                      borderLeft: msg.read ? 'none' : '3px solid #1677ff',
                      cursor: 'pointer'
                    }}
                    styles={{ body: { padding: 12 } }}
                    onClick={() => handleMessageClick(msg.path)}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 15, fontWeight: msg.read ? 400 : 600, marginBottom: 4 }}>
                          {msg.title}
                        </div>
                        <div style={{ fontSize: 13, color: '#666', marginBottom: 8 }}>
                          {msg.content}
                        </div>
                        <div style={{ fontSize: 12, color: '#999' }}>{msg.time}</div>
                      </div>
                      <RightOutlined style={{ color: '#ccc', marginTop: 4 }} />
                    </div>
                  </Card>
                ))}
              </div>
            )
          },
          {
            key: 'notice',
            label: <span><FileTextOutlined /> 通知公告</span>,
            children: (
              <div style={{ padding: '0 16px' }}>
                {MESSAGES.notice.map((msg) => (
                  <Card
                    key={msg.id}
                    style={{
                      borderRadius: 12,
                      marginBottom: 12,
                      cursor: 'pointer'
                    }}
                    styles={{ body: { padding: 12 } }}
                    onClick={() => handleMessageClick(msg.path)}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                          {msg.urgent && <Tag color="error">紧急</Tag>}
                          <span style={{ fontSize: 15, fontWeight: 600 }}>{msg.title}</span>
                        </div>
                        <div style={{ fontSize: 13, color: '#666', marginBottom: 8 }}>
                          {msg.content}
                        </div>
                        <div style={{ fontSize: 12, color: '#999' }}>{msg.time}</div>
                      </div>
                      <RightOutlined style={{ color: '#ccc', marginTop: 4 }} />
                    </div>
                  </Card>
                ))}
              </div>
            )
          }
        ]}
      />

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
          { key: 'message', icon: <MessageOutlined />, label: '消息', active: true },
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
