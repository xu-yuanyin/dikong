/**
 * @name 气象信息管理
 * @mode axure
 * @see /skills/axure-export-workflow/SKILL.md
 */

import './style.css';
import React, { useState } from 'react';
import { Layout, Menu, Card, Table, Tag, Button, Space, Input, Select, Modal, Form, DatePicker, message, Dropdown, Avatar, Badge, Row, Col, Statistic } from 'antd';
import {
  DashboardOutlined, FileTextOutlined, SafetyCertificateOutlined, EnvironmentOutlined,
  AlertOutlined, CloudOutlined, SettingOutlined, UserOutlined, BellOutlined, LogoutOutlined,
  RocketOutlined, SearchOutlined, EyeOutlined, PlusOutlined, EditOutlined, DeleteOutlined,
  MenuFoldOutlined, MenuUnfoldOutlined, CloudSyncOutlined,
} from '@ant-design/icons';

const { Header, Sider, Content } = Layout;
const { TextArea } = Input;
const { RangePicker } = DatePicker;

const AdminWeather: React.FC = () => {
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
    { id: 'WX20240120001', region: '城东区', time: '2024-01-20 14:00', weather: '晴', wind: '东南风3级', visibility: '15km', temperature: '18°C', humidity: '45%', flyable: true },
    { id: 'WX20240120002', region: '南山区', time: '2024-01-20 14:00', weather: '多云', wind: '东风2级', visibility: '12km', temperature: '16°C', humidity: '55%', flyable: true },
    { id: 'WX20240120003', region: '北城区', time: '2024-01-20 14:00', weather: '阴', wind: '北风4级', visibility: '8km', temperature: '14°C', humidity: '65%', flyable: true },
    { id: 'WX20240120004', region: '中心区', time: '2024-01-20 14:00', weather: '小雨', wind: '西风3级', visibility: '5km', temperature: '12°C', humidity: '80%', flyable: false },
    { id: 'WX20240120005', region: '东湖区', time: '2024-01-20 14:00', weather: '晴', wind: '南风2级', visibility: '18km', temperature: '17°C', humidity: '50%', flyable: true },
  ];

  const columns = [
    { title: '编号', dataIndex: 'id', width: 140 },
    { title: '区域', dataIndex: 'region', width: 100 },
    { title: '更新时间', dataIndex: 'time', width: 150 },
    { title: '天气', dataIndex: 'weather', width: 80, render: (text: string) => <Tag color={text === '晴' ? 'gold' : text === '多云' ? 'blue' : text === '阴' ? 'default' : 'cyan'}>{text}</Tag> },
    { title: '风向风力', dataIndex: 'wind', width: 100 },
    { title: '能见度', dataIndex: 'visibility', width: 80 },
    { title: '温度', dataIndex: 'temperature', width: 80 },
    { title: '湿度', dataIndex: 'humidity', width: 80 },
    { title: '适飞状态', dataIndex: 'flyable', width: 100, render: (flyable: boolean) => <Tag color={flyable ? 'green' : 'red'}>{flyable ? '适宜飞行' : '不宜飞行'}</Tag> },
    { title: '操作', width: 150, render: () => (
      <Space>
        <Button type="link" size="small" icon={<EyeOutlined />}>详情</Button>
        <Button type="link" size="small" icon={<EditOutlined />}>编辑</Button>
      </Space>
    )},
  ];

  return (
    <Layout className="admin-layout">
      <Sider trigger={null} collapsible collapsed={collapsed} className="admin-sider" width={220}>
        <div className="admin-logo"><RocketOutlined />{!collapsed && <span>低空服务管理后台</span>}</div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['weather']} items={menuItems} onClick={handleMenuClick} />
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
          <Row gutter={16} style={{ marginBottom: 16 }}>
            <Col span={6}><Card><Statistic title="监测区域数" value={5} suffix="个" /></Card></Col>
            <Col span={6}><Card><Statistic title="适宜飞行区域" value={4} suffix="个" valueStyle={{ color: '#52c41a' }} /></Card></Col>
            <Col span={6}><Card><Statistic title="不宜飞行区域" value={1} suffix="个" valueStyle={{ color: '#ff4d4f' }} /></Card></Col>
            <Col span={6}><Card><Statistic title="最后更新" value="14:00" /></Card></Col>
          </Row>
          <Card title="气象信息管理" extra={<Space><Button icon={<CloudSyncOutlined />}>同步数据</Button><Button type="primary" icon={<PlusOutlined />} onClick={() => setModalVisible(true)}>新增记录</Button></Space>}>
            <div style={{ marginBottom: 16, display: 'flex', gap: 16 }}>
              <Input placeholder="搜索区域" prefix={<SearchOutlined />} style={{ width: 200 }} />
              <Select placeholder="天气状况" style={{ width: 120 }} allowClear><Select.Option value="晴">晴</Select.Option><Select.Option value="多云">多云</Select.Option><Select.Option value="阴">阴</Select.Option><Select.Option value="小雨">小雨</Select.Option></Select>
              <Select placeholder="适飞状态" style={{ width: 120 }} allowClear><Select.Option value={true}>适宜飞行</Select.Option><Select.Option value={false}>不宜飞行</Select.Option></Select>
              <Button type="primary">搜索</Button><Button>重置</Button>
            </div>
            <Table dataSource={dataSource} columns={columns} rowKey="id" pagination={{ pageSize: 10, showTotal: (total) => `共 ${total} 条` }} />
          </Card>
          <Modal title="新增气象记录" open={modalVisible} onCancel={() => setModalVisible(false)} width={600} footer={[<Button key="cancel" onClick={() => setModalVisible(false)}>取消</Button>, <Button key="submit" type="primary" onClick={() => { message.success('创建成功'); setModalVisible(false); }}>确定</Button>]}>
            <Form layout="vertical">
              <Form.Item label="区域" required><Input placeholder="请输入区域名称" /></Form.Item>
              <Form.Item label="天气状况" required><Select placeholder="请选择天气"><Select.Option value="晴">晴</Select.Option><Select.Option value="多云">多云</Select.Option><Select.Option value="阴">阴</Select.Option><Select.Option value="小雨">小雨</Select.Option><Select.Option value="大雨">大雨</Select.Option></Select></Form.Item>
              <Form.Item label="风向风力" required><Input placeholder="如：东南风3级" /></Form.Item>
              <Form.Item label="能见度" required><Input placeholder="如：15km" /></Form.Item>
              <Form.Item label="温度" required><Input placeholder="如：18°C" /></Form.Item>
              <Form.Item label="湿度" required><Input placeholder="如：45%" /></Form.Item>
              <Form.Item label="适飞状态" required><Select placeholder="请选择"><Select.Option value={true}>适宜飞行</Select.Option><Select.Option value={false}>不宜飞行</Select.Option></Select></Form.Item>
              <Form.Item label="备注"><TextArea rows={2} placeholder="请输入备注信息" /></Form.Item>
            </Form>
          </Modal>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminWeather;
