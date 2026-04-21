/**
 * @name 维修保险管理
 * @mode axure
 * @see /skills/axure-export-workflow/SKILL.md
 */

import './style.css';
import React, { useState } from 'react';
import { Layout, Menu, Card, Table, Tag, Button, Space, Input, Select, Modal, Form, InputNumber, message, Dropdown, Avatar, Badge, Rate } from 'antd';
import {
  DashboardOutlined, FileTextOutlined, SafetyCertificateOutlined, EnvironmentOutlined,
  AlertOutlined, CloudOutlined, SettingOutlined, UserOutlined, BellOutlined, LogoutOutlined,
  RocketOutlined, SearchOutlined, EyeOutlined, PlusOutlined, EditOutlined, DeleteOutlined,
  MenuFoldOutlined, MenuUnfoldOutlined,
} from '@ant-design/icons';

const { Header, Sider, Content } = Layout;
const { TextArea } = Input;

const AdminProductMaintenance: React.FC = () => {
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
    { id: 1, name: '无人机常规保养服务', provider: '飞修科技', type: '维修', price: 299, orders: 456, rating: 4.8, status: 'active' },
    { id: 2, name: '无人机意外保险', provider: '安飞保险', type: '保险', price: 599, orders: 892, rating: 4.9, status: 'active' },
    { id: 3, name: '电池检测更换服务', provider: '飞修科技', type: '维修', price: 199, orders: 345, rating: 4.7, status: 'active' },
    { id: 4, name: '第三方责任险', provider: '安飞保险', type: '保险', price: 399, orders: 678, rating: 4.6, status: 'active' },
    { id: 5, name: '年度全包维修服务', provider: '飞修科技', type: '维修', price: 1299, orders: 234, rating: 4.9, status: 'inactive' },
  ];

  const columns = [
    { title: 'ID', dataIndex: 'id', width: 60 },
    { title: '服务名称', dataIndex: 'name', ellipsis: true },
    { title: '服务商', dataIndex: 'provider', width: 100 },
    { title: '类型', dataIndex: 'type', width: 80, render: (text: string) => <Tag color={text === '保险' ? 'purple' : 'blue'}>{text}</Tag> },
    { title: '价格', dataIndex: 'price', width: 90, render: (price: number) => `¥${price}` },
    { title: '订单数', dataIndex: 'orders', width: 80 },
    { title: '评分', dataIndex: 'rating', width: 100, render: (rating: number) => <Rate disabled defaultValue={rating} allowHalf style={{ fontSize: 12 }} /> },
    { title: '状态', dataIndex: 'status', width: 90, render: (status: string) => <Tag color={status === 'active' ? 'green' : 'default'}>{status === 'active' ? '上架中' : '已下架'}</Tag> },
    { title: '操作', width: 150, render: () => <Space><Button type="link" size="small" icon={<EyeOutlined />}>查看</Button><Button type="link" size="small" icon={<EditOutlined />}>编辑</Button><Button type="link" size="small" danger icon={<DeleteOutlined />}>下架</Button></Space> },
  ];

  return (
    <Layout className="admin-layout">
      <Sider trigger={null} collapsible collapsed={collapsed} className="admin-sider" width={220}>
        <div className="admin-logo"><RocketOutlined />{!collapsed && <span>低空服务管理后台</span>}</div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['product-maintenance']} defaultOpenKeys={['product']} items={menuItems} onClick={handleMenuClick} />
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
          <Card title="维修保险管理" extra={<Button type="primary" icon={<PlusOutlined />} onClick={() => setModalVisible(true)}>新增服务</Button>}>
            <div style={{ marginBottom: 16, display: 'flex', gap: 16 }}>
              <Input placeholder="搜索服务名称" prefix={<SearchOutlined />} style={{ width: 200 }} />
              <Select placeholder="类型" style={{ width: 100 }} allowClear><Select.Option value="维修">维修</Select.Option><Select.Option value="保险">保险</Select.Option></Select>
              <Select placeholder="状态" style={{ width: 120 }} allowClear><Select.Option value="active">上架中</Select.Option><Select.Option value="inactive">已下架</Select.Option></Select>
              <Button type="primary">搜索</Button><Button>重置</Button>
            </div>
            <Table dataSource={dataSource} columns={columns} rowKey="id" pagination={{ pageSize: 10, showTotal: (total) => `共 ${total} 条` }} />
          </Card>
          <Modal title="新增维修保险服务" open={modalVisible} onCancel={() => setModalVisible(false)} width={600} footer={[<Button key="cancel" onClick={() => setModalVisible(false)}>取消</Button>, <Button key="submit" type="primary" onClick={() => { message.success('创建成功'); setModalVisible(false); }}>确定</Button>]}>
            <Form layout="vertical">
              <Form.Item label="服务名称" required><Input placeholder="请输入服务名称" /></Form.Item>
              <Form.Item label="服务商" required><Input placeholder="请输入服务商" /></Form.Item>
              <Form.Item label="服务类型" required><Select placeholder="请选择类型"><Select.Option value="维修">维修</Select.Option><Select.Option value="保险">保险</Select.Option></Select></Form.Item>
              <Form.Item label="价格" required><InputNumber min={0} style={{ width: '100%' }} placeholder="请输入价格" prefix="¥" /></Form.Item>
              <Form.Item label="服务描述"><TextArea rows={3} placeholder="请输入服务描述" /></Form.Item>
            </Form>
          </Modal>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminProductMaintenance;
