/**
 * @name 日志管理
 * @mode axure
 * @see /skills/axure-export-workflow/SKILL.md
 */

import './style.css';
import React, { useState } from 'react';
import { Layout, Menu, Card, Table, Tag, Button, Space, Input, Select, DatePicker, message, Dropdown, Avatar, Badge, Descriptions } from 'antd';
import {
  DashboardOutlined, FileTextOutlined, SafetyCertificateOutlined, EnvironmentOutlined,
  AlertOutlined, CloudOutlined, SettingOutlined, UserOutlined, BellOutlined, LogoutOutlined,
  RocketOutlined, SearchOutlined, EyeOutlined, ExportOutlined,
  MenuFoldOutlined, MenuUnfoldOutlined,
} from '@ant-design/icons';

const { Header, Sider, Content } = Layout;
const { RangePicker } = DatePicker;

const AdminSystemLog: React.FC = () => {
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
    { id: 1, operator: 'admin', module: '用户管理', action: '新增用户', target: '用户: zhangsan', ip: '192.168.1.100', time: '2024-01-20 14:30:25', status: 'success' },
    { id: 2, operator: 'admin', module: '飞行计划审批', action: '审批通过', target: '计划: FP20240120001', ip: '192.168.1.100', time: '2024-01-20 14:25:10', status: 'success' },
    { id: 3, operator: 'zhangsan', module: '内容管理', action: '发布公告', target: '公告: 系统维护通知', ip: '192.168.1.101', time: '2024-01-20 13:45:30', status: 'success' },
    { id: 4, operator: 'lisi', module: '报警处理', action: '派单处理', target: '报警: AL20240120001', ip: '192.168.1.102', time: '2024-01-20 11:20:15', status: 'success' },
    { id: 5, operator: 'wangwu', module: '用户管理', action: '登录系统', target: '-', ip: '192.168.1.103', time: '2024-01-20 10:15:00', status: 'fail' },
  ];

  const columns = [
    { title: 'ID', dataIndex: 'id', width: 60 },
    { title: '操作人', dataIndex: 'operator', width: 100 },
    { title: '操作模块', dataIndex: 'module', width: 120, render: (text: string) => <Tag color="blue">{text}</Tag> },
    { title: '操作类型', dataIndex: 'action', width: 100 },
    { title: '操作对象', dataIndex: 'target', ellipsis: true },
    { title: 'IP地址', dataIndex: 'ip', width: 130 },
    { title: '操作时间', dataIndex: 'time', width: 170 },
    { title: '状态', dataIndex: 'status', width: 80, render: (status: string) => <Tag color={status === 'success' ? 'green' : 'red'}>{status === 'success' ? '成功' : '失败'}</Tag> },
    { title: '操作', width: 80, render: (_: any, record: any) => <Button type="link" size="small" icon={<EyeOutlined />} onClick={() => { setCurrentRecord(record); setDetailVisible(true); }}>详情</Button> },
  ];

  return (
    <Layout className="admin-layout">
      <Sider trigger={null} collapsible collapsed={collapsed} className="admin-sider" width={220}>
        <div className="admin-logo"><RocketOutlined />{!collapsed && <span>低空服务管理后台</span>}</div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['system-log']} defaultOpenKeys={['system']} items={menuItems} onClick={handleMenuClick} />
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
          <Card title="日志管理" extra={<Button icon={<ExportOutlined />}>导出日志</Button>}>
            <div style={{ marginBottom: 16, display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              <Input placeholder="搜索操作人" prefix={<SearchOutlined />} style={{ width: 150 }} />
              <Select placeholder="操作模块" style={{ width: 140 }} allowClear><Select.Option value="用户管理">用户管理</Select.Option><Select.Option value="内容管理">内容管理</Select.Option><Select.Option value="飞行计划审批">飞行计划审批</Select.Option><Select.Option value="报警处理">报警处理</Select.Option></Select>
              <Select placeholder="操作类型" style={{ width: 120 }} allowClear><Select.Option value="新增">新增</Select.Option><Select.Option value="编辑">编辑</Select.Option><Select.Option value="删除">删除</Select.Option><Select.Option value="审批通过">审批通过</Select.Option><Select.Option value="审批驳回">审批驳回</Select.Option></Select>
              <Select placeholder="状态" style={{ width: 100 }} allowClear><Select.Option value="success">成功</Select.Option><Select.Option value="fail">失败</Select.Option></Select>
              <RangePicker style={{ width: 240 }} />
              <Button type="primary">搜索</Button><Button>重置</Button>
            </div>
            <Table dataSource={dataSource} columns={columns} rowKey="id" pagination={{ pageSize: 10, showTotal: (total) => `共 ${total} 条` }} />
          </Card>
          <Modal title="日志详情" open={detailVisible} onCancel={() => setDetailVisible(false)} width={600} footer={[<Button key="close" onClick={() => setDetailVisible(false)}>关闭</Button>]}>
            {currentRecord && (
              <Descriptions column={2} bordered>
                <Descriptions.Item label="日志ID">{currentRecord.id}</Descriptions.Item>
                <Descriptions.Item label="操作人">{currentRecord.operator}</Descriptions.Item>
                <Descriptions.Item label="操作模块">{currentRecord.module}</Descriptions.Item>
                <Descriptions.Item label="操作类型">{currentRecord.action}</Descriptions.Item>
                <Descriptions.Item label="操作对象" span={2}>{currentRecord.target}</Descriptions.Item>
                <Descriptions.Item label="IP地址">{currentRecord.ip}</Descriptions.Item>
                <Descriptions.Item label="状态"><Tag color={currentRecord.status === 'success' ? 'green' : 'red'}>{currentRecord.status === 'success' ? '成功' : '失败'}</Tag></Descriptions.Item>
                <Descriptions.Item label="操作时间" span={2}>{currentRecord.time}</Descriptions.Item>
              </Descriptions>
            )}
          </Modal>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminSystemLog;
