/**
 * @name 禁飞区域管理
 * @mode axure
 * @see /skills/axure-export-workflow/SKILL.md
 */

import './style.css';
import React, { useState } from 'react';
import { Layout, Menu, Card, Table, Tag, Button, Space, Input, Select, Modal, Form, DatePicker, message, Dropdown, Avatar, Badge } from 'antd';
import {
  DashboardOutlined, FileTextOutlined, SafetyCertificateOutlined, EnvironmentOutlined,
  AlertOutlined, CloudOutlined, SettingOutlined, UserOutlined, BellOutlined, LogoutOutlined,
  RocketOutlined, SearchOutlined, EyeOutlined, PlusOutlined, EditOutlined, DeleteOutlined,
  MenuFoldOutlined, MenuUnfoldOutlined,
} from '@ant-design/icons';

const { Header, Sider, Content } = Layout;
const { TextArea } = Input;
const { RangePicker } = DatePicker;

const AdminAirspaceProhibited: React.FC = () => {
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
    { id: 'NP001', name: '机场净空区', type: '永久禁飞', reason: '机场安全', area: '中心区北部', altitude: '0-300m', status: 'active' },
    { id: 'NP002', name: '政府机关区域', type: '永久禁飞', reason: '机关安全', area: '中心区', altitude: '0-200m', status: 'active' },
    { id: 'NP003', name: '重大活动现场', type: '临时禁飞', reason: '活动安保', area: '体育中心', altitude: '0-150m', validTo: '2024-01-25', status: 'active' },
    { id: 'NP004', name: '军事管理区', type: '永久禁飞', reason: '军事安全', area: '北城区', altitude: '0-500m', status: 'active' },
    { id: 'NP005', name: '临时管控区', type: '临时禁飞', reason: '重要会议', area: '会展中心', altitude: '0-100m', validTo: '2024-01-22', status: 'expired' },
  ];

  const columns = [
    { title: '编号', dataIndex: 'id', width: 80 },
    { title: '区域名称', dataIndex: 'name', ellipsis: true },
    { title: '类型', dataIndex: 'type', width: 100, render: (text: string) => <Tag color={text === '永久禁飞' ? 'red' : 'orange'}>{text}</Tag> },
    { title: '禁飞原因', dataIndex: 'reason', width: 100 },
    { title: '所在区域', dataIndex: 'area', width: 100 },
    { title: '高度限制', dataIndex: 'altitude', width: 100 },
    { title: '有效期至', dataIndex: 'validTo', width: 110, render: (text: string) => text || '-' },
    { title: '状态', dataIndex: 'status', width: 90, render: (status: string) => <Tag color={status === 'active' ? 'red' : 'default'}>{status === 'active' ? '生效中' : '已过期'}</Tag> },
    { title: '操作', width: 150, render: () => (
      <Space>
        <Button type="link" size="small" icon={<EyeOutlined />}>查看</Button>
        <Button type="link" size="small" icon={<EditOutlined />}>编辑</Button>
        <Button type="link" size="small" danger icon={<DeleteOutlined />}>删除</Button>
      </Space>
    )},
  ];

  return (
    <Layout className="admin-layout">
      <Sider trigger={null} collapsible collapsed={collapsed} className="admin-sider" width={220}>
        <div className="admin-logo"><RocketOutlined />{!collapsed && <span>低空服务管理后台</span>}</div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['airspace-prohibited']} defaultOpenKeys={['airspace']} items={menuItems} onClick={handleMenuClick} />
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
          <Card title="禁飞区域管理" extra={<Button type="primary" icon={<PlusOutlined />} onClick={() => setModalVisible(true)}>新增禁飞区</Button>}>
            <div style={{ marginBottom: 16, display: 'flex', gap: 16 }}>
              <Input placeholder="搜索区域名称" prefix={<SearchOutlined />} style={{ width: 200 }} />
              <Select placeholder="类型" style={{ width: 120 }} allowClear><Select.Option value="永久禁飞">永久禁飞</Select.Option><Select.Option value="临时禁飞">临时禁飞</Select.Option></Select>
              <Select placeholder="状态" style={{ width: 120 }} allowClear><Select.Option value="active">生效中</Select.Option><Select.Option value="expired">已过期</Select.Option></Select>
              <Button type="primary">搜索</Button><Button>重置</Button>
            </div>
            <Table dataSource={dataSource} columns={columns} rowKey="id" pagination={{ pageSize: 10, showTotal: (total) => `共 ${total} 条` }} />
          </Card>
          <Modal title="新增禁飞区域" open={modalVisible} onCancel={() => setModalVisible(false)} width={600} footer={[<Button key="cancel" onClick={() => setModalVisible(false)}>取消</Button>, <Button key="submit" type="primary" onClick={() => { message.success('创建成功'); setModalVisible(false); }}>确定</Button>]}>
            <Form layout="vertical">
              <Form.Item label="区域名称" required><Input placeholder="请输入区域名称" /></Form.Item>
              <Form.Item label="禁飞类型" required><Select placeholder="请选择类型"><Select.Option value="永久禁飞">永久禁飞</Select.Option><Select.Option value="临时禁飞">临时禁飞</Select.Option></Select></Form.Item>
              <Form.Item label="禁飞原因" required><Input placeholder="请输入禁飞原因" /></Form.Item>
              <Form.Item label="所在区域" required><Input placeholder="请输入所在区域" /></Form.Item>
              <Form.Item label="高度限制" required><Input placeholder="如：0-300m" /></Form.Item>
              <Form.Item label="有效期"><RangePicker showTime style={{ width: '100%' }} /></Form.Item>
              <Form.Item label="区域坐标"><TextArea rows={3} placeholder="请输入区域坐标（JSON格式）" /></Form.Item>
            </Form>
          </Modal>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminAirspaceProhibited;
