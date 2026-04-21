/**
 * @name 飞行计划审批
 * @mode axure
 * @see /skills/axure-export-workflow/SKILL.md
 */

import './style.css';
import React, { useState } from 'react';
import { Layout, Menu, Card, Table, Tag, Button, Space, Input, Select, Modal, Form, DatePicker, message, Dropdown, Avatar, Badge, Descriptions, Tabs, Timeline } from 'antd';
import {
  DashboardOutlined, FileTextOutlined, SafetyCertificateOutlined, EnvironmentOutlined,
  AlertOutlined, CloudOutlined, SettingOutlined, UserOutlined, BellOutlined, LogoutOutlined,
  RocketOutlined, SearchOutlined, CheckCircleOutlined, CloseCircleOutlined, EyeOutlined,
  MenuFoldOutlined, MenuUnfoldOutlined, ClockCircleOutlined,
} from '@ant-design/icons';

const { Header, Sider, Content } = Layout;
const { TextArea } = Input;

const AdminServicePlan: React.FC = () => {
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
    { id: 'FP20240120001', applicant: '张三', phone: '138****1234', route: '城东区→城西区', date: '2024-01-22', time: '09:00-11:00', altitude: '100-200m', status: 'pending', submitTime: '2024-01-20 14:30' },
    { id: 'FP20240120002', applicant: '李四', phone: '139****5678', route: '南山区巡检', date: '2024-01-22', time: '14:00-16:00', altitude: '50-150m', status: 'pending', submitTime: '2024-01-20 15:20' },
    { id: 'FP20240120003', applicant: '王五', phone: '137****9012', route: '北城区测绘', date: '2024-01-21', time: '10:00-12:00', altitude: '80-180m', status: 'approved', submitTime: '2024-01-20 10:15' },
    { id: 'FP20240120004', applicant: '赵六', phone: '136****3456', route: '中心区物流', date: '2024-01-21', time: '15:00-17:00', altitude: '60-120m', status: 'rejected', submitTime: '2024-01-20 11:30' },
    { id: 'FP20240120005', applicant: '钱七', phone: '135****7890', route: '东湖区航拍', date: '2024-01-23', time: '08:00-10:00', altitude: '100-250m', status: 'pending', submitTime: '2024-01-20 16:45' },
  ];

  const columns = [
    { title: '计划编号', dataIndex: 'id', width: 140 },
    { title: '申请人', dataIndex: 'applicant', width: 80 },
    { title: '联系电话', dataIndex: 'phone', width: 110 },
    { title: '飞行航线', dataIndex: 'route', ellipsis: true },
    { title: '飞行日期', dataIndex: 'date', width: 110 },
    { title: '飞行时段', dataIndex: 'time', width: 120 },
    { title: '飞行高度', dataIndex: 'altitude', width: 100 },
    { title: '状态', dataIndex: 'status', width: 90, render: (status: string) => {
      const config: Record<string, { color: string; text: string }> = {
        pending: { color: 'orange', text: '待审批' },
        approved: { color: 'green', text: '已批准' },
        rejected: { color: 'red', text: '已驳回' },
      };
      return <Tag color={config[status].color}>{config[status].text}</Tag>;
    }},
    { title: '操作', width: 200, render: (_: any, record: any) => (
      <Space>
        <Button type="link" size="small" icon={<EyeOutlined />} onClick={() => { setCurrentRecord(record); setDetailVisible(true); }}>详情</Button>
        {record.status === 'pending' && (
          <>
            <Button type="link" size="small" style={{ color: '#52c41a' }} icon={<CheckCircleOutlined />} onClick={() => message.success('审批通过')}>通过</Button>
            <Button type="link" size="small" danger icon={<CloseCircleOutlined />} onClick={() => message.error('已驳回')}>驳回</Button>
          </>
        )}
      </Space>
    )},
  ];

  return (
    <Layout className="admin-layout">
      <Sider trigger={null} collapsible collapsed={collapsed} className="admin-sider" width={220}>
        <div className="admin-logo"><RocketOutlined />{!collapsed && <span>低空服务管理后台</span>}</div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['service-plan']} defaultOpenKeys={['service']} items={menuItems} onClick={handleMenuClick} />
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
          <Card title="飞行计划审批">
            <div style={{ marginBottom: 16, display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              <Input placeholder="搜索计划编号/申请人" prefix={<SearchOutlined />} style={{ width: 200 }} />
              <Select placeholder="审批状态" style={{ width: 120 }} allowClear>
                <Select.Option value="pending">待审批</Select.Option>
                <Select.Option value="approved">已批准</Select.Option>
                <Select.Option value="rejected">已驳回</Select.Option>
              </Select>
              <DatePicker placeholder="选择日期" />
              <Button type="primary">搜索</Button>
              <Button>重置</Button>
            </div>
            <Table dataSource={dataSource} columns={columns} rowKey="id" pagination={{ pageSize: 10, showTotal: (total) => `共 ${total} 条` }} />
          </Card>

          <Modal title="飞行计划详情" open={detailVisible} onCancel={() => setDetailVisible(false)} width={800} footer={currentRecord?.status === 'pending' ? [
            <Button key="cancel" onClick={() => setDetailVisible(false)}>取消</Button>,
            <Button key="reject" danger onClick={() => { message.error('已驳回'); setDetailVisible(false); }}>驳回</Button>,
            <Button key="approve" type="primary" onClick={() => { message.success('审批通过'); setDetailVisible(false); }}>批准</Button>,
          ] : [<Button key="close" onClick={() => setDetailVisible(false)}>关闭</Button>]}>
            {currentRecord && (
              <Tabs items={[
                { key: 'info', label: '基本信息', children: (
                  <Descriptions column={2} bordered>
                    <Descriptions.Item label="计划编号">{currentRecord.id}</Descriptions.Item>
                    <Descriptions.Item label="状态"><Tag color={currentRecord.status === 'pending' ? 'orange' : currentRecord.status === 'approved' ? 'green' : 'red'}>{currentRecord.status === 'pending' ? '待审批' : currentRecord.status === 'approved' ? '已批准' : '已驳回'}</Tag></Descriptions.Item>
                    <Descriptions.Item label="申请人">{currentRecord.applicant}</Descriptions.Item>
                    <Descriptions.Item label="联系电话">{currentRecord.phone}</Descriptions.Item>
                    <Descriptions.Item label="飞行航线" span={2}>{currentRecord.route}</Descriptions.Item>
                    <Descriptions.Item label="飞行日期">{currentRecord.date}</Descriptions.Item>
                    <Descriptions.Item label="飞行时段">{currentRecord.time}</Descriptions.Item>
                    <Descriptions.Item label="飞行高度">{currentRecord.altitude}</Descriptions.Item>
                    <Descriptions.Item label="提交时间">{currentRecord.submitTime}</Descriptions.Item>
                    <Descriptions.Item label="飞行目的" span={2}>航拍摄影</Descriptions.Item>
                    <Descriptions.Item label="飞行器型号" span={2}>DJI Mavic 3 Pro</Descriptions.Item>
                    <Descriptions.Item label="备注" span={2}>无</Descriptions.Item>
                  </Descriptions>
                )},
                { key: 'timeline', label: '审批记录', children: (
                  <Timeline items={[
                    { color: 'green', children: <>{currentRecord.submitTime} - 用户提交申请</> },
                    { color: 'blue', children: <>2024-01-20 15:00 - 系统自动审核通过</> },
                    { color: 'grey', children: <>等待审批...</> },
                  ]} />
                )},
              ]} />
            )}
          </Modal>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminServicePlan;
