/**
 * @name 用户管理
 * @mode axure
 * @see /skills/axure-export-workflow/SKILL.md
 */

import './style.css';
import React, { useState } from 'react';
import { Layout, Menu, Card, Table, Tag, Button, Space, Input, Select, Modal, Form, message, Dropdown, Avatar, Badge, Switch } from 'antd';
import {
  DashboardOutlined, FileTextOutlined, SafetyCertificateOutlined, EnvironmentOutlined,
  AlertOutlined, CloudOutlined, SettingOutlined, UserOutlined, BellOutlined, LogoutOutlined,
  RocketOutlined, SearchOutlined, EyeOutlined, PlusOutlined, EditOutlined, DeleteOutlined,
  MenuFoldOutlined, MenuUnfoldOutlined, KeyOutlined,
} from '@ant-design/icons';

const { Header, Sider, Content } = Layout;

const AdminSystemUser: React.FC = () => {
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
    { id: 1, username: 'admin', name: '系统管理员', role: '超级管理员', department: '信息中心', phone: '138****1234', email: 'admin@example.com', status: true, lastLogin: '2024-01-20 14:30' },
    { id: 2, username: 'zhangsan', name: '张三', role: '运营管理员', department: '运营部', phone: '139****5678', email: 'zhangsan@example.com', status: true, lastLogin: '2024-01-20 10:15' },
    { id: 3, username: 'lisi', name: '李四', role: '审批员', department: '审批中心', phone: '137****9012', email: 'lisi@example.com', status: true, lastLogin: '2024-01-19 16:45' },
    { id: 4, username: 'wangwu', name: '王五', role: '客服', department: '客服部', phone: '136****3456', email: 'wangwu@example.com', status: false, lastLogin: '2024-01-15 09:30' },
    { id: 5, username: 'zhaoliu', name: '赵六', role: '数据分析师', department: '数据中心', phone: '135****7890', email: 'zhaoliu@example.com', status: true, lastLogin: '2024-01-20 11:20' },
  ];

  const columns = [
    { title: 'ID', dataIndex: 'id', width: 60 },
    { title: '用户名', dataIndex: 'username', width: 100 },
    { title: '姓名', dataIndex: 'name', width: 100 },
    { title: '角色', dataIndex: 'role', width: 110, render: (text: string) => <Tag color="blue">{text}</Tag> },
    { title: '部门', dataIndex: 'department', width: 100 },
    { title: '手机号', dataIndex: 'phone', width: 110 },
    { title: '邮箱', dataIndex: 'email', ellipsis: true },
    { title: '状态', dataIndex: 'status', width: 90, render: (status: boolean) => <Switch checked={status} size="small" onChange={() => message.success('状态已更新')} /> },
    { title: '最后登录', dataIndex: 'lastLogin', width: 150 },
    { title: '操作', width: 180, render: () => (
      <Space>
        <Button type="link" size="small" icon={<EyeOutlined />}>查看</Button>
        <Button type="link" size="small" icon={<EditOutlined />}>编辑</Button>
        <Button type="link" size="small" icon={<KeyOutlined />}>重置密码</Button>
        <Button type="link" size="small" danger icon={<DeleteOutlined />}>删除</Button>
      </Space>
    )},
  ];

  return (
    <Layout className="admin-layout">
      <Sider trigger={null} collapsible collapsed={collapsed} className="admin-sider" width={220}>
        <div className="admin-logo"><RocketOutlined />{!collapsed && <span>低空服务管理后台</span>}</div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['system-user']} defaultOpenKeys={['system']} items={menuItems} onClick={handleMenuClick} />
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
          <Card title="用户管理" extra={<Button type="primary" icon={<PlusOutlined />} onClick={() => setModalVisible(true)}>新增用户</Button>}>
            <div style={{ marginBottom: 16, display: 'flex', gap: 16 }}>
              <Input placeholder="搜索用户名/姓名" prefix={<SearchOutlined />} style={{ width: 200 }} />
              <Select placeholder="角色" style={{ width: 140 }} allowClear><Select.Option value="超级管理员">超级管理员</Select.Option><Select.Option value="运营管理员">运营管理员</Select.Option><Select.Option value="审批员">审批员</Select.Option><Select.Option value="客服">客服</Select.Option></Select>
              <Select placeholder="部门" style={{ width: 120 }} allowClear><Select.Option value="信息中心">信息中心</Select.Option><Select.Option value="运营部">运营部</Select.Option><Select.Option value="审批中心">审批中心</Select.Option><Select.Option value="客服部">客服部</Select.Option></Select>
              <Select placeholder="状态" style={{ width: 100 }} allowClear><Select.Option value={true}>启用</Select.Option><Select.Option value={false}>禁用</Select.Option></Select>
              <Button type="primary">搜索</Button><Button>重置</Button>
            </div>
            <Table dataSource={dataSource} columns={columns} rowKey="id" pagination={{ pageSize: 10, showTotal: (total) => `共 ${total} 条` }} />
          </Card>
          <Modal title="新增用户" open={modalVisible} onCancel={() => setModalVisible(false)} width={600} footer={[<Button key="cancel" onClick={() => setModalVisible(false)}>取消</Button>, <Button key="submit" type="primary" onClick={() => { message.success('创建成功'); setModalVisible(false); }}>确定</Button>]}>
            <Form layout="vertical">
              <Form.Item label="用户名" required><Input placeholder="请输入用户名" /></Form.Item>
              <Form.Item label="姓名" required><Input placeholder="请输入姓名" /></Form.Item>
              <Form.Item label="角色" required><Select placeholder="请选择角色"><Select.Option value="运营管理员">运营管理员</Select.Option><Select.Option value="审批员">审批员</Select.Option><Select.Option value="客服">客服</Select.Option><Select.Option value="数据分析师">数据分析师</Select.Option></Select></Form.Item>
              <Form.Item label="部门" required><Input placeholder="请输入部门" /></Form.Item>
              <Form.Item label="手机号" required><Input placeholder="请输入手机号" /></Form.Item>
              <Form.Item label="邮箱" required><Input placeholder="请输入邮箱" /></Form.Item>
              <Form.Item label="初始密码" required><Input.Password placeholder="请输入初始密码" /></Form.Item>
            </Form>
          </Modal>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminSystemUser;
