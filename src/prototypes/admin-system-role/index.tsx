/**
 * @name 角色管理
 * @mode axure
 * @see /skills/axure-export-workflow/SKILL.md
 */

import './style.css';
import React, { useState } from 'react';
import { Layout, Menu, Card, Table, Tag, Button, Space, Input, Select, Modal, Form, message, Dropdown, Avatar, Badge, Tree } from 'antd';
import {
  DashboardOutlined, FileTextOutlined, SafetyCertificateOutlined, EnvironmentOutlined,
  AlertOutlined, CloudOutlined, SettingOutlined, UserOutlined, BellOutlined, LogoutOutlined,
  RocketOutlined, SearchOutlined, EyeOutlined, PlusOutlined, EditOutlined, DeleteOutlined,
  MenuFoldOutlined, MenuUnfoldOutlined,
} from '@ant-design/icons';

const { Header, Sider, Content } = Layout;
const { TextArea } = Input;

const AdminSystemRole: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const menuItems = [
    { key: 'dashboard', icon: <DashboardOutlined />, label: '首页', path: '/prototypes/admin-dashboard' },
    { key: 'content', icon: <FileTextOutlined />, label: '内容管理', children: [
      { key: 'content-policy', label: '政策法规', path: '/prototypes/admin-content-policy' },
      { key: 'content-notice', label: '通知公告', path: '/prototypes/admin-content-notice' },
      { key: 'content-news', label: '行业资讯', path: '/prototypes/admin-content-news' },
      { key: 'content-safety', label: '安全知识', path: '/prototypes/admin-content-safety' },
    ]},
    { key: 'service', icon: <SafetyCertificateOutlined />, label: '服务管理', children: [
      { key: 'service-plan', label: '飞行计划审批', path: '/prototypes/admin-service-plan' },
      { key: 'service-permit', label: '飞行许可管理', path: '/prototypes/admin-service-permit' },
      { key: 'service-landing', label: '起降点管理', path: '/prototypes/admin-service-landing' },
    ]},
    { key: 'product', icon: <RocketOutlined />, label: '商品管理', children: [
      { key: 'product-tour', label: '低空旅游', path: '/prototypes/admin-product-tour' },
      { key: 'product-training', label: '培训服务', path: '/prototypes/admin-product-training' },
      { key: 'product-maintenance', label: '维修保险', path: '/prototypes/admin-product-maintenance' },
    ]},
    { key: 'emergency', icon: <AlertOutlined />, label: '应急服务管理', children: [
      { key: 'emergency-alarm', label: '报警处理', path: '/prototypes/admin-emergency-alarm' },
      { key: 'emergency-rescue', label: '救援调度', path: '/prototypes/admin-emergency-rescue' },
      { key: 'emergency-warning', label: '预警发布', path: '/prototypes/admin-emergency-warning' },
    ]},
    { key: 'airspace', icon: <EnvironmentOutlined />, label: '空域信息管理', children: [
      { key: 'airspace-designated', label: '空域划设', path: '/prototypes/admin-airspace-designated' },
      { key: 'airspace-route', label: '航路航线', path: '/prototypes/admin-airspace-route' },
      { key: 'airspace-prohibited', label: '禁飞区域', path: '/prototypes/admin-airspace-prohibited' },
    ]},
    { key: 'weather', icon: <CloudOutlined />, label: '气象信息管理', path: '/prototypes/admin-weather' },
    { key: 'system', icon: <SettingOutlined />, label: '系统管理', children: [
      { key: 'system-user', label: '用户管理', path: '/prototypes/admin-system-user' },
      { key: 'system-role', label: '角色管理', path: '/prototypes/admin-system-role' },
      { key: 'system-log', label: '日志管理', path: '/prototypes/admin-system-log' },
    ]},
  ];

  const handleMenuClick = (e: any) => {
    const findPath = (items: any[]): string | null => {
      for (const item of items) {
        if (item.key === e.key) return item.path;
        if (item.children) { const found = findPath(item.children); if (found) return found; }
      }
      return null;
    };
    const path = findPath(menuItems);
    if (path) window.location.href = path;
  };

  const userMenu = (
    <Menu>
      <Menu.Item key="profile" icon={<UserOutlined />}>个人中心</Menu.Item>
      <Menu.Item key="settings" icon={<SettingOutlined />}>系统设置</Menu.Item>
      <Menu.Divider />
      <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={() => window.location.href = '/prototypes/admin-login'}>退出登录</Menu.Item>
    </Menu>
  );

  const dataSource = [
    { id: 1, name: '超级管理员', code: 'super_admin', description: '拥有系统所有权限', userCount: 1, createTime: '2024-01-01', status: 'active' },
    { id: 2, name: '运营管理员', code: 'operator', description: '负责日常运营管理', userCount: 5, createTime: '2024-01-05', status: 'active' },
    { id: 3, name: '审批员', code: 'approver', description: '负责飞行计划审批', userCount: 3, createTime: '2024-01-08', status: 'active' },
    { id: 4, name: '客服', code: 'service', description: '负责用户咨询处理', userCount: 8, createTime: '2024-01-10', status: 'active' },
    { id: 5, name: '数据分析师', code: 'analyst', description: '负责数据分析统计', userCount: 2, createTime: '2024-01-12', status: 'active' },
  ];

  const columns = [
    { title: 'ID', dataIndex: 'id', width: 60 },
    { title: '角色名称', dataIndex: 'name', width: 120 },
    { title: '角色编码', dataIndex: 'code', width: 120 },
    { title: '描述', dataIndex: 'description', ellipsis: true },
    { title: '用户数', dataIndex: 'userCount', width: 80 },
    { title: '创建时间', dataIndex: 'createTime', width: 110 },
    { title: '状态', dataIndex: 'status', width: 90, render: (status: string) => <Tag color={status === 'active' ? 'green' : 'default'}>{status === 'active' ? '启用' : '禁用'}</Tag> },
    { title: '操作', width: 150, render: () => (
      <Space>
        <Button type="link" size="small" icon={<EyeOutlined />}>权限</Button>
        <Button type="link" size="small" icon={<EditOutlined />}>编辑</Button>
        <Button type="link" size="small" danger icon={<DeleteOutlined />}>删除</Button>
      </Space>
    )},
  ];

  const permissionTree = [
    { title: '内容管理', key: 'content', children: [
      { title: '政策法规管理', key: 'content-policy' },
      { title: '通知公告管理', key: 'content-notice' },
      { title: '行业资讯管理', key: 'content-news' },
      { title: '安全知识管理', key: 'content-safety' },
    ]},
    { title: '服务管理', key: 'service', children: [
      { title: '飞行计划审批', key: 'service-plan' },
      { title: '飞行许可管理', key: 'service-permit' },
      { title: '起降点管理', key: 'service-landing' },
    ]},
    { title: '商品管理', key: 'product', children: [
      { title: '低空旅游管理', key: 'product-tour' },
      { title: '培训服务管理', key: 'product-training' },
      { title: '维修保险管理', key: 'product-maintenance' },
    ]},
    { title: '应急服务管理', key: 'emergency', children: [
      { title: '报警处理', key: 'emergency-alarm' },
      { title: '救援调度', key: 'emergency-rescue' },
      { title: '预警发布', key: 'emergency-warning' },
    ]},
    { title: '空域信息管理', key: 'airspace', children: [
      { title: '空域划设管理', key: 'airspace-designated' },
      { title: '航路航线管理', key: 'airspace-route' },
      { title: '禁飞区域管理', key: 'airspace-prohibited' },
    ]},
    { title: '气象信息管理', key: 'weather' },
    { title: '系统管理', key: 'system', children: [
      { title: '用户管理', key: 'system-user' },
      { title: '角色管理', key: 'system-role' },
      { title: '日志管理', key: 'system-log' },
    ]},
  ];

  return (
    <Layout className="admin-layout">
      <Sider trigger={null} collapsible collapsed={collapsed} className="admin-sider" width={220}>
        <div className="admin-logo"><RocketOutlined />{!collapsed && <span>低空服务管理后台</span>}</div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['system-role']} defaultOpenKeys={['system']} items={menuItems} onClick={handleMenuClick} />
      </Sider>
      <Layout>
        <Header className="admin-header">
          <div className="admin-header-left">{React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, { className: 'admin-trigger', onClick: () => setCollapsed(!collapsed) })}</div>
          <div className="admin-header-right">
            <Badge count={5} size="small"><BellOutlined className="admin-header-icon" /></Badge>
            <Dropdown menu={{ items: userMenu as any }} placement="bottomRight"><div className="admin-header-user"><Avatar size="small" icon={<UserOutlined />} /><span>管理员</span></div></Dropdown>
          </div>
        </Header>
        <Content className="admin-content">
          <Card title="角色管理" extra={<Button type="primary" icon={<PlusOutlined />} onClick={() => setModalVisible(true)}>新增角色</Button>}>
            <div style={{ marginBottom: 16, display: 'flex', gap: 16 }}>
              <Input placeholder="搜索角色名称" prefix={<SearchOutlined />} style={{ width: 200 }} />
              <Select placeholder="状态" style={{ width: 100 }} allowClear><Select.Option value="active">启用</Select.Option><Select.Option value="inactive">禁用</Select.Option></Select>
              <Button type="primary">搜索</Button><Button>重置</Button>
            </div>
            <Table dataSource={dataSource} columns={columns} rowKey="id" pagination={{ pageSize: 10, showTotal: (total) => `共 ${total} 条` }} />
          </Card>
          <Modal title="新增角色" open={modalVisible} onCancel={() => setModalVisible(false)} width={700} footer={[<Button key="cancel" onClick={() => setModalVisible(false)}>取消</Button>, <Button key="submit" type="primary" onClick={() => { message.success('创建成功'); setModalVisible(false); }}>确定</Button>]}>
            <Form layout="vertical">
              <Form.Item label="角色名称" required><Input placeholder="请输入角色名称" /></Form.Item>
              <Form.Item label="角色编码" required><Input placeholder="请输入角色编码" /></Form.Item>
              <Form.Item label="描述"><TextArea rows={2} placeholder="请输入角色描述" /></Form.Item>
              <Form.Item label="权限配置">
                <Tree checkable defaultExpandAll treeData={permissionTree} style={{ maxHeight: 300, overflow: 'auto' }} />
              </Form.Item>
            </Form>
          </Modal>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminSystemRole;
