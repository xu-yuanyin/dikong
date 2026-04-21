/**
 * @name 通知公告管理
 * @mode axure
 * @see /skills/axure-export-workflow/SKILL.md
 */

import './style.css';
import React, { useState } from 'react';
import { Layout, Menu, Card, Table, Tag, Button, Space, Input, Select, Modal, Form, DatePicker, message, Dropdown, Avatar, Badge, Switch } from 'antd';
import {
  DashboardOutlined, FileTextOutlined, SafetyCertificateOutlined, EnvironmentOutlined,
  AlertOutlined, CloudOutlined, SettingOutlined, UserOutlined, BellOutlined, LogoutOutlined,
  RocketOutlined, PlusOutlined, SearchOutlined, EditOutlined, DeleteOutlined, EyeOutlined,
  MenuFoldOutlined, MenuUnfoldOutlined,
} from '@ant-design/icons';

const { Header, Sider, Content } = Layout;
const { TextArea } = Input;

const AdminContentNotice: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const menuItems = [
    { key: 'dashboard', icon: <DashboardOutlined />, label: '首页', path: '/prototypes/admin-dashboard' },
    { key: 'content', icon: <FileTextOutlined />, label: '内容管理',
      children: [
        { key: 'content-policy', label: '政策法规', path: '/prototypes/admin-content-policy' },
        { key: 'content-notice', label: '通知公告', path: '/prototypes/admin-content-notice' },
        { key: 'content-news', label: '行业资讯', path: '/prototypes/admin-content-news' },
        { key: 'content-safety', label: '安全知识', path: '/prototypes/admin-content-safety' },
      ]
    },
    { key: 'service', icon: <SafetyCertificateOutlined />, label: '服务管理',
      children: [
        { key: 'service-plan', label: '飞行计划审批', path: '/prototypes/admin-service-plan' },
        { key: 'service-permit', label: '飞行许可管理', path: '/prototypes/admin-service-permit' },
        { key: 'service-landing', label: '起降点管理', path: '/prototypes/admin-service-landing' },
      ]
    },
    { key: 'product', icon: <RocketOutlined />, label: '商品管理',
      children: [
        { key: 'product-tour', label: '低空旅游', path: '/prototypes/admin-product-tour' },
        { key: 'product-training', label: '培训服务', path: '/prototypes/admin-product-training' },
        { key: 'product-maintenance', label: '维修保险', path: '/prototypes/admin-product-maintenance' },
      ]
    },
    { key: 'emergency', icon: <AlertOutlined />, label: '应急服务管理',
      children: [
        { key: 'emergency-alarm', label: '报警处理', path: '/prototypes/admin-emergency-alarm' },
        { key: 'emergency-rescue', label: '救援调度', path: '/prototypes/admin-emergency-rescue' },
        { key: 'emergency-warning', label: '预警发布', path: '/prototypes/admin-emergency-warning' },
      ]
    },
    { key: 'airspace', icon: <EnvironmentOutlined />, label: '空域信息管理',
      children: [
        { key: 'airspace-designated', label: '空域划设', path: '/prototypes/admin-airspace-designated' },
        { key: 'airspace-route', label: '航路航线', path: '/prototypes/admin-airspace-route' },
        { key: 'airspace-prohibited', label: '禁飞区域', path: '/prototypes/admin-airspace-prohibited' },
      ]
    },
    { key: 'weather', icon: <CloudOutlined />, label: '气象信息管理', path: '/prototypes/admin-weather' },
    { key: 'system', icon: <SettingOutlined />, label: '系统管理',
      children: [
        { key: 'system-user', label: '用户管理', path: '/prototypes/admin-system-user' },
        { key: 'system-role', label: '角色管理', path: '/prototypes/admin-system-role' },
        { key: 'system-log', label: '日志管理', path: '/prototypes/admin-system-log' },
      ]
    },
  ];

  const handleMenuClick = (e: any) => {
    const findPath = (items: any[]): string | null => {
      for (const item of items) {
        if (item.key === e.key) return item.path;
        if (item.children) {
          const found = findPath(item.children);
          if (found) return found;
        }
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
    { id: 1, title: '春节期间空域管制通知', type: '紧急通知', publishDate: '2024-01-20', status: 'published', urgent: true, views: 3562 },
    { id: 2, title: '系统升级维护公告', type: '系统公告', publishDate: '2024-01-18', status: 'published', urgent: false, views: 892 },
    { id: 3, title: '低空飞行安全须知', type: '安全通知', publishDate: '2024-01-15', status: 'published', urgent: false, views: 1256 },
    { id: 4, title: '新增起降点开放通知', type: '业务通知', publishDate: '2024-01-12', status: 'published', urgent: false, views: 678 },
    { id: 5, title: '气象服务升级公告', type: '系统公告', publishDate: '2024-01-10', status: 'draft', urgent: false, views: 0 },
  ];

  const columns = [
    { title: '序号', dataIndex: 'id', width: 60 },
    { title: '公告标题', dataIndex: 'title', ellipsis: true, render: (text: string, record: any) => record.urgent ? <><Tag color="red">紧急</Tag>{text}</> : text },
    { title: '类型', dataIndex: 'type', width: 100, render: (text: string) => <Tag color="blue">{text}</Tag> },
    { title: '发布日期', dataIndex: 'publishDate', width: 120 },
    { title: '浏览量', dataIndex: 'views', width: 80 },
    { title: '状态', dataIndex: 'status', width: 80, render: (status: string) => <Tag color={status === 'published' ? 'green' : 'orange'}>{status === 'published' ? '已发布' : '草稿'}</Tag> },
    { title: '操作', width: 150, render: () => <Space><Button type="link" size="small" icon={<EyeOutlined />}>查看</Button><Button type="link" size="small" icon={<EditOutlined />}>编辑</Button><Button type="link" size="small" danger icon={<DeleteOutlined />}>删除</Button></Space> },
  ];

  return (
    <Layout className="admin-layout">
      <Sider trigger={null} collapsible collapsed={collapsed} className="admin-sider" width={220}>
        <div className="admin-logo"><RocketOutlined />{!collapsed && <span>低空服务管理后台</span>}</div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['content-notice']} defaultOpenKeys={['content']} items={menuItems} onClick={handleMenuClick} />
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
          <Card title="通知公告管理" extra={<Button type="primary" icon={<PlusOutlined />} onClick={() => setModalVisible(true)}>发布公告</Button>}>
            <div style={{ marginBottom: 16, display: 'flex', gap: 16 }}>
              <Input placeholder="搜索公告标题" prefix={<SearchOutlined />} style={{ width: 250 }} />
              <Select placeholder="选择类型" style={{ width: 150 }} allowClear><Select.Option value="紧急通知">紧急通知</Select.Option><Select.Option value="系统公告">系统公告</Select.Option><Select.Option value="安全通知">安全通知</Select.Option><Select.Option value="业务通知">业务通知</Select.Option></Select>
              <Select placeholder="选择状态" style={{ width: 120 }} allowClear><Select.Option value="published">已发布</Select.Option><Select.Option value="draft">草稿</Select.Option></Select>
              <Button type="primary">搜索</Button><Button>重置</Button>
            </div>
            <Table dataSource={dataSource} columns={columns} rowKey="id" pagination={{ pageSize: 10, showTotal: (total) => `共 ${total} 条` }} />
          </Card>
          <Modal title="发布公告" open={modalVisible} onCancel={() => setModalVisible(false)} width={700} footer={[<Button key="cancel" onClick={() => setModalVisible(false)}>取消</Button>, <Button key="draft">保存草稿</Button>, <Button key="submit" type="primary" onClick={() => { message.success('发布成功'); setModalVisible(false); }}>发布</Button>]}>
            <Form layout="vertical">
              <Form.Item label="公告标题" required><Input placeholder="请输入公告标题" /></Form.Item>
              <Form.Item label="公告类型" required><Select placeholder="请选择类型"><Select.Option value="紧急通知">紧急通知</Select.Option><Select.Option value="系统公告">系统公告</Select.Option><Select.Option value="安全通知">安全通知</Select.Option><Select.Option value="业务通知">业务通知</Select.Option></Select></Form.Item>
              <Form.Item label="发布日期"><DatePicker style={{ width: '100%' }} /></Form.Item>
              <Form.Item label="紧急公告" valuePropName="checked"><Switch checkedChildren="是" unCheckedChildren="否" /></Form.Item>
              <Form.Item label="公告内容" required><TextArea rows={6} placeholder="请输入公告内容" /></Form.Item>
            </Form>
          </Modal>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminContentNotice;
