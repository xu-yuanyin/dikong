/**
 * @name 后台首页仪表盘
 * @mode axure
 * @see /skills/axure-export-workflow/SKILL.md
 *
 * 区域低空公共服务管理后台首页
 */

import './style.css';
import React, { useState } from 'react';
import { Layout, Menu, Card, Row, Col, Statistic, Table, Tag, Badge, Avatar, Dropdown, Button, Progress, List, Typography, Space } from 'antd';
import {
  DashboardOutlined,
  FileTextOutlined,
  SafetyCertificateOutlined,
  EnvironmentOutlined,
  AlertOutlined,
  CloudOutlined,
  SettingOutlined,
  UserOutlined,
  BellOutlined,
  LogoutOutlined,
  RocketOutlined,
  TeamOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  ExclamationCircleOutlined,
  BarChartOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';

const { Header, Sider, Content } = Layout;
const { Title, Text } = Typography;

const AdminDashboard: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

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
      <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={() => window.location.href = '/prototypes/admin-login'}>
        退出登录
      </Menu.Item>
    </Menu>
  );

  const pendingTasks = [
    { id: 1, type: 'plan', title: '飞行计划审批 - FP20240116001', status: 'pending', time: '10分钟前' },
    { id: 2, type: 'plan', title: '飞行计划审批 - FP20240116002', status: 'pending', time: '30分钟前' },
    { id: 3, type: 'permit', title: '跨区域审批申请 - KA20240116001', status: 'pending', time: '1小时前' },
    { id: 4, type: 'alarm', title: '紧急报警处理 - 东城区', status: 'urgent', time: '刚刚' },
    { id: 5, type: 'feedback', title: '用户意见反馈处理', status: 'pending', time: '2小时前' },
  ];

  const recentFlights = [
    { id: 'FP20240116001', pilot: '张三', route: '城东区→城西区', status: 'approved', time: '09:00-11:00' },
    { id: 'FP20240116002', pilot: '李四', route: '南山区巡检', status: 'pending', time: '14:00-16:00' },
    { id: 'FP20240116003', pilot: '王五', route: '北城区测绘', status: 'approved', time: '15:00-17:00' },
    { id: 'FP20240116004', pilot: '赵六', route: '中心区物流', status: 'rejected', time: '16:00-18:00' },
  ];

  return (
    <Layout className="admin-layout">
      <Sider 
        trigger={null} 
        collapsible 
        collapsed={collapsed}
        className="admin-sider"
        width={220}
      >
        <div className="admin-logo">
          <RocketOutlined />
          {!collapsed && <span>低空服务管理后台</span>}
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['dashboard']}
          defaultOpenKeys={['content', 'service', 'product', 'emergency', 'airspace', 'system']}
          items={menuItems}
          onClick={handleMenuClick}
        />
      </Sider>
      <Layout>
        <Header className="admin-header">
          <div className="admin-header-left">
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'admin-trigger',
              onClick: () => setCollapsed(!collapsed),
            })}
          </div>
          <div className="admin-header-right">
            <Badge count={5} size="small">
              <BellOutlined className="admin-header-icon" />
            </Badge>
            <Dropdown overlay={userMenu} placement="bottomRight">
              <div className="admin-header-user">
                <Avatar size="small" icon={<UserOutlined />} />
                <span>管理员</span>
              </div>
            </Dropdown>
          </div>
        </Header>
        <Content className="admin-content">
          <div className="admin-dashboard">
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={12} lg={6}>
                <Card className="stat-card stat-card-primary">
                  <Statistic
                    title="今日飞行"
                    value={128}
                    prefix={<RocketOutlined />}
                    suffix="架次"
                  />
                  <div className="stat-footer">
                    <Text type="secondary">较昨日 <span style={{ color: '#52c41a' }}>+12%</span></Text>
                  </div>
                </Card>
              </Col>
              <Col xs={24} sm={12} lg={6}>
                <Card className="stat-card stat-card-warning">
                  <Statistic
                    title="待审批"
                    value={23}
                    prefix={<ClockCircleOutlined />}
                    suffix="项"
                  />
                  <div className="stat-footer">
                    <Text type="secondary">飞行计划 15 / 许可申请 8</Text>
                  </div>
                </Card>
              </Col>
              <Col xs={24} sm={12} lg={6}>
                <Card className="stat-card stat-card-danger">
                  <Statistic
                    title="今日报警"
                    value={3}
                    prefix={<AlertOutlined />}
                    suffix="起"
                  />
                  <div className="stat-footer">
                    <Text type="secondary">已处理 2 / 处理中 1</Text>
                  </div>
                </Card>
              </Col>
              <Col xs={24} sm={12} lg={6}>
                <Card className="stat-card stat-card-success">
                  <Statistic
                    title="注册用户"
                    value={1856}
                    prefix={<TeamOutlined />}
                    suffix="人"
                  />
                  <div className="stat-footer">
                    <Text type="secondary">本月新增 <span style={{ color: '#52c41a' }}>+86</span></Text>
                  </div>
                </Card>
              </Col>
            </Row>

            <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
              <Col xs={24} lg={12}>
                <Card 
                  title={<span><ExclamationCircleOutlined style={{ marginRight: 8 }} />待办事项</span>}
                  extra={<a href="/prototypes/admin-service-plan">查看全部</a>}
                >
                  <List
                    dataSource={pendingTasks}
                    renderItem={(item) => (
                      <List.Item
                        actions={[<Text type="secondary">{item.time}</Text>]}
                        style={{ cursor: 'pointer' }}
                        onClick={() => {
                          if (item.type === 'alarm') {
                            window.location.href = '/prototypes/admin-emergency-alarm';
                          } else {
                            window.location.href = '/prototypes/admin-service-plan';
                          }
                        }}
                      >
                        <List.Item.Meta
                          avatar={
                            <Badge dot={item.status === 'urgent'}>
                              <Avatar 
                                style={{ 
                                  backgroundColor: item.status === 'urgent' ? '#ff4d4f' : '#1677ff' 
                                }}
                                icon={item.type === 'alarm' ? <AlertOutlined /> : <FileTextOutlined />}
                              />
                            </Badge>
                          }
                          title={item.title}
                          description={
                            <Tag color={item.status === 'urgent' ? 'red' : 'orange'}>
                              {item.status === 'urgent' ? '紧急' : '待处理'}
                            </Tag>
                          }
                        />
                      </List.Item>
                    )}
                  />
                </Card>
              </Col>
              <Col xs={24} lg={12}>
                <Card 
                  title={<span><BarChartOutlined style={{ marginRight: 8 }} />近期飞行计划</span>}
                  extra={<a href="/prototypes/admin-service-plan">查看全部</a>}
                >
                  <Table
                    dataSource={recentFlights}
                    pagination={false}
                    size="small"
                    columns={[
                      { title: '计划编号', dataIndex: 'id', width: 130 },
                      { title: '飞手', dataIndex: 'pilot', width: 80 },
                      { title: '航线', dataIndex: 'route', ellipsis: true },
                      { title: '时段', dataIndex: 'time', width: 100 },
                      { 
                        title: '状态', 
                        dataIndex: 'status', 
                        width: 80,
                        render: (status: string) => {
                          const colors: Record<string, string> = {
                            approved: 'green',
                            pending: 'orange',
                            rejected: 'red'
                          };
                          const texts: Record<string, string> = {
                            approved: '已批准',
                            pending: '待审批',
                            rejected: '已驳回'
                          };
                          return <Tag color={colors[status]}>{texts[status]}</Tag>;
                        }
                      },
                    ]}
                  />
                </Card>
              </Col>
            </Row>

            <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
              <Col xs={24} lg={8}>
                <Card title="空域使用率">
                  <div style={{ marginBottom: 16 }}>
                    <Text>城东区空域</Text>
                    <Progress percent={78} status="active" strokeColor="#1677ff" />
                  </div>
                  <div style={{ marginBottom: 16 }}>
                    <Text>城西区空域</Text>
                    <Progress percent={45} status="active" strokeColor="#52c41a" />
                  </div>
                  <div style={{ marginBottom: 16 }}>
                    <Text>南山区空域</Text>
                    <Progress percent={62} status="active" strokeColor="#faad14" />
                  </div>
                  <div>
                    <Text>北城区空域</Text>
                    <Progress percent={30} strokeColor="#13c2c2" />
                  </div>
                </Card>
              </Col>
              <Col xs={24} lg={8}>
                <Card title="服务类型分布">
                  <div style={{ marginBottom: 16 }}>
                    <Text>物流配送</Text>
                    <Progress percent={35} strokeColor="#1677ff" />
                  </div>
                  <div style={{ marginBottom: 16 }}>
                    <Text>巡检测绘</Text>
                    <Progress percent={28} strokeColor="#52c41a" />
                  </div>
                  <div style={{ marginBottom: 16 }}>
                    <Text>航拍摄影</Text>
                    <Progress percent={20} strokeColor="#faad14" />
                  </div>
                  <div>
                    <Text>其他服务</Text>
                    <Progress percent={17} strokeColor="#722ed1" />
                  </div>
                </Card>
              </Col>
              <Col xs={24} lg={8}>
                <Card title="快捷操作">
                  <Space direction="vertical" style={{ width: '100%' }}>
                    <Button 
                      type="primary" 
                      block 
                      icon={<FileTextOutlined />}
                      onClick={() => window.location.href = '/prototypes/admin-service-plan'}
                    >
                      飞行计划审批
                    </Button>
                    <Button 
                      block 
                      icon={<AlertOutlined />}
                      danger
                      onClick={() => window.location.href = '/prototypes/admin-emergency-alarm'}
                    >
                      报警处理
                    </Button>
                    <Button 
                      block 
                      icon={<FileTextOutlined />}
                      onClick={() => window.location.href = '/prototypes/admin-content-notice'}
                    >
                      发布通知公告
                    </Button>
                    <Button 
                      block 
                      icon={<EnvironmentOutlined />}
                      onClick={() => window.location.href = '/prototypes/admin-airspace-designated'}
                    >
                      空域配置
                    </Button>
                  </Space>
                </Card>
              </Col>
            </Row>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminDashboard;
