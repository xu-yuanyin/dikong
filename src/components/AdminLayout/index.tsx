import './style.css';
import React, { ReactNode } from 'react';
import { Layout, Menu, Avatar, Dropdown, Button } from 'antd';
import { UserOutlined, SettingOutlined, SafetyCertificateOutlined, MessageOutlined, DesktopOutlined, ContainerOutlined, RocketOutlined, TeamOutlined, PictureOutlined } from '@ant-design/icons';

const { Sider, Content, Header } = Layout;

interface AdminLayoutProps {
  children: ReactNode;
  activeKey: string;
}

const MENU_ITEMS = [
  { key: 'admin-news', label: '资讯公告' },
  { key: 'admin-policy', label: '政策法规' },
  { key: 'admin-policy-interpretation', label: '政策解读' },
  { key: 'admin-standard', label: '规范标准' },
  { key: 'admin-cert', label: '认证管理' },
  { key: 'admin-airspace', label: '空域管理' },
  { key: 'admin-role', label: '角色管理' },
  // 以下为补充的下架与业务监管功能
  { key: 'admin-service', label: '服务下架监管' },
  { key: 'admin-mall', label: '商城违规监管' },
  { key: 'admin-demand', label: '需求屏蔽监管' },
  { key: 'admin-aircraft', label: '飞行器管理' },
  { key: 'admin-flight-plan', label: '飞行计划管理' },
  { key: 'admin-carousel', label: '轮播图管理' },
  { key: 'admin-system-user', label: '系统账号管理' },
  { key: 'message-center', label: '消息中心' }
];

export default function AdminLayout({ children, activeKey }: AdminLayoutProps) {
  const handleMenuClick = (e: { key: string }) => {
    if (e.key.startsWith('sub-')) return;
    window.location.href = '/prototypes/' + e.key;
  };

  // Find openKeys based on activeKey
  let defaultOpenKeys: string[] = [];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider width={240} theme="light" className="admin-layout-sider">
        <div className="admin-layout-logo" style={{ cursor: 'pointer' }} onClick={() => window.location.href = '/prototypes/home'}>
          <SettingOutlined style={{ fontSize: 20, color: '#1677ff', marginRight: 8 }} />
          <span>低空公共服务平台</span>
        </div>
        <Menu
          mode="inline"
          selectedKeys={[activeKey]}
          items={MENU_ITEMS}
          onClick={handleMenuClick}
          style={{ borderRight: 0, paddingTop: 16, fontSize: 14 }}
        />
      </Sider>
      <Layout>
        <Header className="admin-layout-header" style={{ height: 64, paddingInline: 24, background: '#fff' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <Button type="link" onClick={() => window.location.href = '/prototypes/home'}>返回前台门户</Button>
            <Dropdown menu={{ items: [{ key: 'logout', label: '退出登录', onClick: () => window.location.href = '/prototypes/login' }] }}>
              <div style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}>
                <Avatar icon={<UserOutlined />} style={{ backgroundColor: '#1677ff' }} />
                <span style={{ fontWeight: 500 }}>系统管理员</span>
              </div>
            </Dropdown>
          </div>
        </Header>
        <Content style={{ background: '#f0f2f5', padding: 24, overflow: 'auto', height: 'calc(100vh - 64px)' }}>
          <div style={{ maxWidth: 1400, margin: '0 auto' }}>
            {children}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}
