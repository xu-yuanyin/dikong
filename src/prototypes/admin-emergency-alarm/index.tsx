/**
 * @name 报警处理
 * @mode axure
 * @see /skills/axure-export-workflow/SKILL.md
 */

import './style.css';
import React, { useState } from 'react';
import { Layout, Menu, Card, Table, Tag, Button, Space, Input, Select, Modal, Form, message, Dropdown, Avatar, Badge, Descriptions, Timeline } from 'antd';
import {
  DashboardOutlined, FileTextOutlined, SafetyCertificateOutlined, EnvironmentOutlined,
  AlertOutlined, CloudOutlined, SettingOutlined, UserOutlined, BellOutlined, LogoutOutlined,
  RocketOutlined, SearchOutlined, EyeOutlined, CheckCircleOutlined, PhoneOutlined,
  MenuFoldOutlined, MenuUnfoldOutlined,
} from '@ant-design/icons';

const { Header, Sider, Content } = Layout;
const { TextArea } = Input;

const AdminEmergencyAlarm: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [detailVisible, setDetailVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState<any>(null);

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
    { id: 'AL20240120001', type: '紧急', reporter: '张三', phone: '138****1234', location: '城东区科技园区', time: '2024-01-20 14:30', status: 'pending', description: '无人机失控坠落' },
    { id: 'AL20240120002', type: '一般', reporter: '李四', phone: '139****5678', location: '南山区体育公园', time: '2024-01-20 13:20', status: 'processing', description: '无人机电池冒烟' },
    { id: 'AL20240120003', type: '紧急', reporter: '王五', phone: '137****9012', location: '城西区物流中心', time: '2024-01-20 10:15', status: 'resolved', description: '无人机碰撞建筑物' },
    { id: 'AL20240120004', type: '一般', reporter: '赵六', phone: '136****3456', location: '北城区会展中心', time: '2024-01-20 09:30', status: 'resolved', description: '无人机信号丢失' },
    { id: 'AL20240120005', type: '紧急', reporter: '钱七', phone: '135****7890', location: '中心区商业广场', time: '2024-01-19 16:45', status: 'resolved', description: '无人机伤人事故' },
  ];

  const columns = [
    { title: '报警编号', dataIndex: 'id', width: 140 },
    { title: '类型', dataIndex: 'type', width: 80, render: (text: string) => <Tag color={text === '紧急' ? 'red' : 'orange'}>{text}</Tag> },
    { title: '报警人', dataIndex: 'reporter', width: 80 },
    { title: '联系电话', dataIndex: 'phone', width: 110 },
    { title: '事发地点', dataIndex: 'location', ellipsis: true },
    { title: '报警时间', dataIndex: 'time', width: 150 },
    { title: '状态', dataIndex: 'status', width: 90, render: (status: string) => {
      const config: Record<string, { color: string; text: string }> = {
        pending: { color: 'red', text: '待处理' },
        processing: { color: 'orange', text: '处理中' },
        resolved: { color: 'green', text: '已解决' },
      };
      return <Tag color={config[status].color}>{config[status].text}</Tag>;
    }},
    { title: '操作', width: 180, render: (_: any, record: any) => (
      <Space>
        <Button type="link" size="small" icon={<EyeOutlined />} onClick={() => { setCurrentRecord(record); setDetailVisible(true); }}>详情</Button>
        {record.status === 'pending' && <Button type="link" size="small" style={{ color: '#52c41a' }} icon={<CheckCircleOutlined />} onClick={() => message.success('已派单')}>派单</Button>}
        <Button type="link" size="small" icon={<PhoneOutlined />}>联系</Button>
      </Space>
    )},
  ];

  return (
    <Layout className="admin-layout">
      <Sider trigger={null} collapsible collapsed={collapsed} className="admin-sider" width={220}>
        <div className="admin-logo"><RocketOutlined />{!collapsed && <span>低空服务管理后台</span>}</div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['emergency-alarm']} defaultOpenKeys={['emergency']} items={menuItems} onClick={handleMenuClick} />
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
          <Card title="报警处理">
            <div style={{ marginBottom: 16, display: 'flex', gap: 16 }}>
              <Input placeholder="搜索报警编号/报警人" prefix={<SearchOutlined />} style={{ width: 200 }} />
              <Select placeholder="报警类型" style={{ width: 100 }} allowClear><Select.Option value="紧急">紧急</Select.Option><Select.Option value="一般">一般</Select.Option></Select>
              <Select placeholder="处理状态" style={{ width: 120 }} allowClear><Select.Option value="pending">待处理</Select.Option><Select.Option value="processing">处理中</Select.Option><Select.Option value="resolved">已解决</Select.Option></Select>
              <Button type="primary">搜索</Button><Button>重置</Button>
            </div>
            <Table dataSource={dataSource} columns={columns} rowKey="id" pagination={{ pageSize: 10, showTotal: (total) => `共 ${total} 条` }} />
          </Card>
          <Modal title="报警详情" open={detailVisible} onCancel={() => setDetailVisible(false)} width={700} footer={currentRecord?.status === 'pending' ? [
            <Button key="cancel" onClick={() => setDetailVisible(false)}>关闭</Button>,
            <Button key="assign" type="primary" onClick={() => { message.success('已派单'); setDetailVisible(false); }}>派单处理</Button>,
          ] : [<Button key="close" onClick={() => setDetailVisible(false)}>关闭</Button>]}>
            {currentRecord && (
              <>
                <Descriptions column={2} bordered style={{ marginBottom: 16 }}>
                  <Descriptions.Item label="报警编号">{currentRecord.id}</Descriptions.Item>
                  <Descriptions.Item label="报警类型"><Tag color={currentRecord.type === '紧急' ? 'red' : 'orange'}>{currentRecord.type}</Tag></Descriptions.Item>
                  <Descriptions.Item label="报警人">{currentRecord.reporter}</Descriptions.Item>
                  <Descriptions.Item label="联系电话">{currentRecord.phone}</Descriptions.Item>
                  <Descriptions.Item label="事发地点" span={2}>{currentRecord.location}</Descriptions.Item>
                  <Descriptions.Item label="报警时间">{currentRecord.time}</Descriptions.Item>
                  <Descriptions.Item label="状态"><Tag color={currentRecord.status === 'pending' ? 'red' : currentRecord.status === 'processing' ? 'orange' : 'green'}>{currentRecord.status === 'pending' ? '待处理' : currentRecord.status === 'processing' ? '处理中' : '已解决'}</Tag></Descriptions.Item>
                  <Descriptions.Item label="报警描述" span={2}>{currentRecord.description}</Descriptions.Item>
                </Descriptions>
                <Card title="处理记录" size="small">
                  <Timeline items={[
                    { color: 'red', children: <>{currentRecord.time} - 用户报警</> },
                    { color: 'blue', children: <>系统自动定位事发地点</> },
                    { color: 'grey', children: <>等待处理...</> },
                  ]} />
                </Card>
              </>
            )}
          </Modal>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminEmergencyAlarm;
