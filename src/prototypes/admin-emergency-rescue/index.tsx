/**
 * @name 救援调度
 * @mode axure
 * @see /skills/axure-export-workflow/SKILL.md
 */

import './style.css';
import React, { useState } from 'react';
import { Layout, Menu, Card, Table, Tag, Button, Space, Input, Select, Modal, Form, message, Dropdown, Avatar, Badge, Descriptions, Steps } from 'antd';
import {
  DashboardOutlined, FileTextOutlined, SafetyCertificateOutlined, EnvironmentOutlined,
  AlertOutlined, CloudOutlined, SettingOutlined, UserOutlined, BellOutlined, LogoutOutlined,
  RocketOutlined, SearchOutlined, EyeOutlined, CheckCircleOutlined,
  MenuFoldOutlined, MenuUnfoldOutlined,
} from '@ant-design/icons';

const { Header, Sider, Content } = Layout;
const { TextArea } = Input;

const AdminEmergencyRescue: React.FC = () => {
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
    { id: 'RS20240120001', alarmId: 'AL20240120001', location: '城东区科技园区', team: '救援一队', leader: '张队长', status: 'dispatched', createTime: '2024-01-20 14:35' },
    { id: 'RS20240120002', alarmId: 'AL20240120002', location: '南山区体育公园', team: '救援二队', leader: '李队长', status: 'arrived', createTime: '2024-01-20 13:25' },
    { id: 'RS20240120003', alarmId: 'AL20240120003', location: '城西区物流中心', team: '救援一队', leader: '张队长', status: 'completed', createTime: '2024-01-20 10:20' },
    { id: 'RS20240120004', alarmId: 'AL20240120004', location: '北城区会展中心', team: '救援三队', leader: '王队长', status: 'completed', createTime: '2024-01-20 09:35' },
    { id: 'RS20240120005', alarmId: 'AL20240120005', location: '中心区商业广场', team: '救援二队', leader: '李队长', status: 'completed', createTime: '2024-01-19 16:50' },
  ];

  const columns = [
    { title: '调度编号', dataIndex: 'id', width: 140 },
    { title: '关联报警', dataIndex: 'alarmId', width: 140 },
    { title: '事发地点', dataIndex: 'location', ellipsis: true },
    { title: '救援队伍', dataIndex: 'team', width: 100 },
    { title: '队长', dataIndex: 'leader', width: 80 },
    { title: '创建时间', dataIndex: 'createTime', width: 150 },
    { title: '状态', dataIndex: 'status', width: 100, render: (status: string) => {
      const config: Record<string, { color: string; text: string }> = {
        dispatched: { color: 'blue', text: '已派单' },
        arrived: { color: 'orange', text: '已到达' },
        completed: { color: 'green', text: '已完成' },
      };
      return <Tag color={config[status].color}>{config[status].text}</Tag>;
    }},
    { title: '操作', width: 150, render: () => (
      <Space>
        <Button type="link" size="small" icon={<EyeOutlined />}>详情</Button>
        <Button type="link" size="small" icon={<CheckCircleOutlined />}>完成</Button>
      </Space>
    )},
  ];

  return (
    <Layout className="admin-layout">
      <Sider trigger={null} collapsible collapsed={collapsed} className="admin-sider" width={220}>
        <div className="admin-logo"><RocketOutlined />{!collapsed && <span>低空服务管理后台</span>}</div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['emergency-rescue']} defaultOpenKeys={['emergency']} items={menuItems} onClick={handleMenuClick} />
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
          <Card title="救援调度" extra={<Button type="primary" onClick={() => setModalVisible(true)}>新建调度</Button>}>
            <div style={{ marginBottom: 16, display: 'flex', gap: 16 }}>
              <Input placeholder="搜索调度编号" prefix={<SearchOutlined />} style={{ width: 200 }} />
              <Select placeholder="状态" style={{ width: 120 }} allowClear><Select.Option value="dispatched">已派单</Select.Option><Select.Option value="arrived">已到达</Select.Option><Select.Option value="completed">已完成</Select.Option></Select>
              <Button type="primary">搜索</Button><Button>重置</Button>
            </div>
            <Table dataSource={dataSource} columns={columns} rowKey="id" pagination={{ pageSize: 10, showTotal: (total) => `共 ${total} 条` }} />
          </Card>
          <Modal title="新建救援调度" open={modalVisible} onCancel={() => setModalVisible(false)} width={600} footer={[<Button key="cancel" onClick={() => setModalVisible(false)}>取消</Button>, <Button key="submit" type="primary" onClick={() => { message.success('调度成功'); setModalVisible(false); }}>确定</Button>]}>
            <Form layout="vertical">
              <Form.Item label="关联报警" required><Input placeholder="请输入报警编号" /></Form.Item>
              <Form.Item label="事发地点" required><Input placeholder="请输入事发地点" /></Form.Item>
              <Form.Item label="救援队伍" required><Select placeholder="请选择救援队伍"><Select.Option value="救援一队">救援一队</Select.Option><Select.Option value="救援二队">救援二队</Select.Option><Select.Option value="救援三队">救援三队</Select.Option></Select></Form.Item>
              <Form.Item label="队长" required><Input placeholder="请输入队长姓名" /></Form.Item>
              <Form.Item label="备注"><TextArea rows={3} placeholder="请输入备注信息" /></Form.Item>
            </Form>
          </Modal>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminEmergencyRescue;
