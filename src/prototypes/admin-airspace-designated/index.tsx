/**
 * @name 空域划设管理
 * @mode axure
 * @see /skills/axure-export-workflow/SKILL.md
 */

import './style.css';
import React, { useState } from 'react';
import { Layout, Menu, Card, Table, Tag, Button, Space, Input, Select, Modal, Form, InputNumber, message, Dropdown, Avatar, Badge } from 'antd';
import {
  DashboardOutlined, FileTextOutlined, SafetyCertificateOutlined, EnvironmentOutlined,
  AlertOutlined, CloudOutlined, SettingOutlined, UserOutlined, BellOutlined, LogoutOutlined,
  RocketOutlined, SearchOutlined, EyeOutlined, PlusOutlined, EditOutlined, DeleteOutlined,
  MenuFoldOutlined, MenuUnfoldOutlined,
} from '@ant-design/icons';

const { Header, Sider, Content } = Layout;
const { TextArea } = Input;

const AdminAirspaceDesignated: React.FC = () => {
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
    { id: 'AD001', name: '城东区无人机物流空域', type: '物流运输', altitude: '0-120m', area: '15.6km²', status: 'active', updateTime: '2024-01-15' },
    { id: 'AD002', name: '南山区航拍空域', type: '航拍摄影', altitude: '0-200m', area: '8.2km²', status: 'active', updateTime: '2024-01-12' },
    { id: 'AD003', name: '北城区农业植保空域', type: '农业植保', altitude: '0-30m', area: '25.8km²', status: 'active', updateTime: '2024-01-10' },
    { id: 'AD004', name: '中心区巡检空域', type: '巡检监测', altitude: '50-150m', area: '12.3km²', status: 'maintenance', updateTime: '2024-01-08' },
    { id: 'AD005', name: '东湖区应急救援空域', type: '应急救援', altitude: '0-300m', area: '20.5km²', status: 'active', updateTime: '2024-01-05' },
  ];

  const columns = [
    { title: '编号', dataIndex: 'id', width: 80 },
    { title: '空域名称', dataIndex: 'name', ellipsis: true },
    { title: '用途类型', dataIndex: 'type', width: 100, render: (text: string) => <Tag color="blue">{text}</Tag> },
    { title: '高度范围', dataIndex: 'altitude', width: 100 },
    { title: '覆盖面积', dataIndex: 'area', width: 100 },
    { title: '状态', dataIndex: 'status', width: 90, render: (status: string) => <Tag color={status === 'active' ? 'green' : 'orange'}>{status === 'active' ? '已启用' : '维护中'}</Tag> },
    { title: '更新时间', dataIndex: 'updateTime', width: 110 },
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
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['airspace-designated']} defaultOpenKeys={['airspace']} items={menuItems} onClick={handleMenuClick} />
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
          <Card title="空域划设管理" extra={<Button type="primary" icon={<PlusOutlined />} onClick={() => setModalVisible(true)}>新增空域</Button>}>
            <div style={{ marginBottom: 16, display: 'flex', gap: 16 }}>
              <Input placeholder="搜索空域名称" prefix={<SearchOutlined />} style={{ width: 200 }} />
              <Select placeholder="用途类型" style={{ width: 120 }} allowClear><Select.Option value="物流运输">物流运输</Select.Option><Select.Option value="航拍摄影">航拍摄影</Select.Option><Select.Option value="农业植保">农业植保</Select.Option><Select.Option value="巡检监测">巡检监测</Select.Option><Select.Option value="应急救援">应急救援</Select.Option></Select>
              <Select placeholder="状态" style={{ width: 120 }} allowClear><Select.Option value="active">已启用</Select.Option><Select.Option value="maintenance">维护中</Select.Option></Select>
              <Button type="primary">搜索</Button><Button>重置</Button>
            </div>
            <Table dataSource={dataSource} columns={columns} rowKey="id" pagination={{ pageSize: 10, showTotal: (total) => `共 ${total} 条` }} />
          </Card>
          <Modal title="新增空域划设" open={modalVisible} onCancel={() => setModalVisible(false)} width={600} footer={[<Button key="cancel" onClick={() => setModalVisible(false)}>取消</Button>, <Button key="submit" type="primary" onClick={() => { message.success('创建成功'); setModalVisible(false); }}>确定</Button>]}>
            <Form layout="vertical">
              <Form.Item label="空域名称" required><Input placeholder="请输入空域名称" /></Form.Item>
              <Form.Item label="用途类型" required><Select placeholder="请选择类型"><Select.Option value="物流运输">物流运输</Select.Option><Select.Option value="航拍摄影">航拍摄影</Select.Option><Select.Option value="农业植保">农业植保</Select.Option><Select.Option value="巡检监测">巡检监测</Select.Option><Select.Option value="应急救援">应急救援</Select.Option></Select></Form.Item>
              <Form.Item label="高度范围" required><Input placeholder="如：0-120m" /></Form.Item>
              <Form.Item label="覆盖面积" required><Input placeholder="如：15.6km²" /></Form.Item>
              <Form.Item label="坐标范围"><TextArea rows={3} placeholder="请输入坐标范围（JSON格式）" /></Form.Item>
              <Form.Item label="备注说明"><TextArea rows={2} placeholder="请输入备注说明" /></Form.Item>
            </Form>
          </Modal>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminAirspaceDesignated;
