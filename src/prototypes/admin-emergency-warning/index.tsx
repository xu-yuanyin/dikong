/**
 * @name 预警发布
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

const AdminEmergencyWarning: React.FC = () => {
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
    { id: 'WN20240120001', title: '恶劣天气飞行预警', type: '气象预警', level: 'red', region: '全市', validFrom: '2024-01-20 08:00', validTo: '2024-01-20 20:00', status: 'active' },
    { id: 'WN20240120002', title: '临时空域管制', type: '空域预警', level: 'orange', region: '城东区', validFrom: '2024-01-21 09:00', validTo: '2024-01-21 17:00', status: 'active' },
    { id: 'WN20240120003', title: '重大活动飞行限制', type: '活动预警', level: 'yellow', region: '中心区', validFrom: '2024-01-22 14:00', validTo: '2024-01-22 18:00', status: 'pending' },
    { id: 'WN20240120004', title: '设备故障预警', type: '设备预警', level: 'blue', region: '南山区', validFrom: '2024-01-19 10:00', validTo: '2024-01-19 16:00', status: 'expired' },
    { id: 'WN20240120005', title: '电磁干扰预警', type: '设备预警', level: 'orange', region: '北城区', validFrom: '2024-01-18 12:00', validTo: '2024-01-18 18:00', status: 'expired' },
  ];

  const columns = [
    { title: '预警编号', dataIndex: 'id', width: 140 },
    { title: '预警标题', dataIndex: 'title', ellipsis: true },
    { title: '类型', dataIndex: 'type', width: 100, render: (text: string) => <Tag color="blue">{text}</Tag> },
    { title: '等级', dataIndex: 'level', width: 80, render: (text: string) => <Tag color={text}>{text === 'red' ? '红色' : text === 'orange' ? '橙色' : text === 'yellow' ? '黄色' : '蓝色'}</Tag> },
    { title: '适用区域', dataIndex: 'region', width: 100 },
    { title: '有效期起', dataIndex: 'validFrom', width: 150 },
    { title: '有效期止', dataIndex: 'validTo', width: 150 },
    { title: '状态', dataIndex: 'status', width: 90, render: (status: string) => {
      const config: Record<string, { color: string; text: string }> = {
        active: { color: 'green', text: '生效中' },
        pending: { color: 'orange', text: '待生效' },
        expired: { color: 'default', text: '已过期' },
      };
      return <Tag color={config[status].color}>{config[status].text}</Tag>;
    }},
    { title: '操作', width: 150, render: () => (
      <Space>
        <Button type="link" size="small" icon={<EyeOutlined />}>查看</Button>
        <Button type="link" size="small" icon={<EditOutlined />}>编辑</Button>
        <Button type="link" size="small" danger icon={<DeleteOutlined />}>撤销</Button>
      </Space>
    )},
  ];

  return (
    <Layout className="admin-layout">
      <Sider trigger={null} collapsible collapsed={collapsed} className="admin-sider" width={220}>
        <div className="admin-logo"><RocketOutlined />{!collapsed && <span>低空服务管理后台</span>}</div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['emergency-warning']} defaultOpenKeys={['emergency']} items={menuItems} onClick={handleMenuClick} />
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
          <Card title="预警发布" extra={<Button type="primary" icon={<PlusOutlined />} onClick={() => setModalVisible(true)}>发布预警</Button>}>
            <div style={{ marginBottom: 16, display: 'flex', gap: 16 }}>
              <Input placeholder="搜索预警标题" prefix={<SearchOutlined />} style={{ width: 200 }} />
              <Select placeholder="预警类型" style={{ width: 120 }} allowClear><Select.Option value="气象预警">气象预警</Select.Option><Select.Option value="空域预警">空域预警</Select.Option><Select.Option value="活动预警">活动预警</Select.Option><Select.Option value="设备预警">设备预警</Select.Option></Select>
              <Select placeholder="预警等级" style={{ width: 100 }} allowClear><Select.Option value="red">红色</Select.Option><Select.Option value="orange">橙色</Select.Option><Select.Option value="yellow">黄色</Select.Option><Select.Option value="blue">蓝色</Select.Option></Select>
              <Select placeholder="状态" style={{ width: 120 }} allowClear><Select.Option value="active">生效中</Select.Option><Select.Option value="pending">待生效</Select.Option><Select.Option value="expired">已过期</Select.Option></Select>
              <Button type="primary">搜索</Button><Button>重置</Button>
            </div>
            <Table dataSource={dataSource} columns={columns} rowKey="id" pagination={{ pageSize: 10, showTotal: (total) => `共 ${total} 条` }} />
          </Card>
          <Modal title="发布预警" open={modalVisible} onCancel={() => setModalVisible(false)} width={600} footer={[<Button key="cancel" onClick={() => setModalVisible(false)}>取消</Button>, <Button key="submit" type="primary" onClick={() => { message.success('发布成功'); setModalVisible(false); }}>发布</Button>]}>
            <Form layout="vertical">
              <Form.Item label="预警标题" required><Input placeholder="请输入预警标题" /></Form.Item>
              <Form.Item label="预警类型" required><Select placeholder="请选择类型"><Select.Option value="气象预警">气象预警</Select.Option><Select.Option value="空域预警">空域预警</Select.Option><Select.Option value="活动预警">活动预警</Select.Option><Select.Option value="设备预警">设备预警</Select.Option></Select></Form.Item>
              <Form.Item label="预警等级" required><Select placeholder="请选择等级"><Select.Option value="red">红色（最高）</Select.Option><Select.Option value="orange">橙色（较高）</Select.Option><Select.Option value="yellow">黄色（一般）</Select.Option><Select.Option value="blue">蓝色（提示）</Select.Option></Select></Form.Item>
              <Form.Item label="适用区域" required><Input placeholder="请输入适用区域" /></Form.Item>
              <Form.Item label="有效期" required><RangePicker showTime style={{ width: '100%' }} /></Form.Item>
              <Form.Item label="预警内容" required><TextArea rows={4} placeholder="请输入预警内容" /></Form.Item>
            </Form>
          </Modal>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminEmergencyWarning;
