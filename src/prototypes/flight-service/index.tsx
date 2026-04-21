/**
 * @name 服务概览
 *
 * 提供飞行计划填报、空域查询、飞行许可办理、航线规划、起降点预约、资质办理等全流程服务
 */

import './style.css';
import React, { useState } from 'react';
import {
  Layout,
  Menu,
  Card,
  Row,
  Col,
  Button,
  Tabs,
  Typography,
  Tag,
  Space,
  Badge,
  Timeline,
  Empty
} from 'antd';
import {
  FileTextOutlined,
  EnvironmentOutlined,
  SafetyCertificateOutlined,
  CompassOutlined,
  HomeOutlined,
  IdcardOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  RightOutlined,
  BellOutlined,
  CalendarOutlined
} from '@ant-design/icons';

const { Sider, Content } = Layout;
const { Title, Text } = Typography;

const SERVICE_MENU = [
  { key: 'overview', label: '服务概览', icon: <HomeOutlined />, path: '/prototypes/flight-service' },
  { key: 'plan', label: '飞行计划填报', icon: <FileTextOutlined />, path: '/prototypes/flight-plan' },
  { key: 'airspace', label: '空域信息查询', icon: <EnvironmentOutlined />, path: '/prototypes/airspace-query' },
  { key: 'permit', label: '飞行许可办理', icon: <SafetyCertificateOutlined />, path: '/prototypes/flight-permit' },
  { key: 'route', label: '航线规划', icon: <CompassOutlined />, path: '/prototypes/route-planning' },
  { key: 'landing', label: '起降点服务', icon: <HomeOutlined />, path: '/prototypes/landing-point' },
  { key: 'qualification', label: '资质办理', icon: <IdcardOutlined />, path: '/prototypes/qualification' },
  { key: 'my-business', label: '我的业务', icon: <FileTextOutlined />, path: '/prototypes/my-business' }
];

const SERVICE_CARDS = [
  {
    key: 'plan',
    title: '飞行计划填报',
    description: '在线填报飞行计划，支持批量申报与模板导入',
    icon: <FileTextOutlined style={{ fontSize: 32 }} />,
    color: '#1677ff',
    bgColor: '#e6f4ff',
    stats: '今日已受理 128 件',
    path: '/prototypes/flight-plan'
  },
  {
    key: 'airspace',
    title: '空域信息查询',
    description: '实时查询空域划设、航路航线、禁飞区、限飞区',
    icon: <EnvironmentOutlined style={{ fontSize: 32 }} />,
    color: '#722ed1',
    bgColor: '#f9f0ff',
    stats: '覆盖 156 个空域区域',
    path: '/prototypes/airspace-query'
  },
  {
    key: 'permit',
    title: '飞行许可办理',
    description: '在线申请飞行许可、临时飞行报备及跨区域审批',
    icon: <SafetyCertificateOutlined style={{ fontSize: 32 }} />,
    color: '#13c2c2',
    bgColor: '#e6fffb',
    stats: '平均审批时长 2.5 天',
    path: '/prototypes/flight-permit'
  },
  {
    key: 'route',
    title: '航线规划',
    description: '智能规划最优飞行航线，精准规避风险区域',
    icon: <CompassOutlined style={{ fontSize: 32 }} />,
    color: '#fa8c16',
    bgColor: '#fff7e6',
    stats: '已规划航线 2,847 条',
    path: '/prototypes/route-planning'
  },
  {
    key: 'landing',
    title: '起降点服务',
    description: '查询预约起降点，了解设施与费用信息',
    icon: <HomeOutlined style={{ fontSize: 32 }} />,
    color: '#52c41a',
    bgColor: '#f6ffed',
    stats: '可用起降点 89 个',
    path: '/prototypes/landing-point'
  },
  {
    key: 'qualification',
    title: '资质办理',
    description: '办理飞行员资质、飞行器备案、运营许可',
    icon: <IdcardOutlined style={{ fontSize: 32 }} />,
    color: '#eb2f96',
    bgColor: '#fff0f6',
    stats: '已办理资质 3,562 个',
    path: '/prototypes/qualification'
  }
];

const MY_BUSINESS = [
  { id: 1, title: '飞行计划申请 #FP20240116001', status: 'pending', statusText: '待审核', date: '2024-01-16' },
  { id: 2, title: '飞行许可申请 #PM20240115003', status: 'processing', statusText: '审批中', date: '2024-01-15' },
  { id: 3, title: '起降点预约 #LP20240114002', status: 'approved', statusText: '已通过', date: '2024-01-14' },
  { id: 4, title: '资质办理申请 #QL20240113001', status: 'rejected', statusText: '已驳回', date: '2024-01-13' }
];

const NOTICES = [
  { id: 1, title: '春节期间空域管制通知', date: '2024-01-16', urgent: true },
  { id: 2, title: '飞行计划填报系统升级公告', date: '2024-01-15', urgent: false },
  { id: 3, title: '新增 12 个临时起降点开放', date: '2024-01-14', urgent: false }
];

const Component: React.FC = () => {
  const [selectedMenu, setSelectedMenu] = useState('overview');

  const getStatusTag = (status: string) => {
    const config: Record<string, { color: string; icon: React.ReactNode }> = {
      pending: { color: 'warning', icon: <ClockCircleOutlined /> },
      processing: { color: 'processing', icon: <ExclamationCircleOutlined /> },
      approved: { color: 'success', icon: <CheckCircleOutlined /> },
      rejected: { color: 'error', icon: <ExclamationCircleOutlined /> }
    };
    return config[status] || { color: 'default', icon: null };
  };

  const menuItems = SERVICE_MENU.map(item => ({
    key: item.key,
    label: item.label,
    icon: item.icon
  }));

  return (
    <Layout style={{ minHeight: '100vh', background: '#f5f7fa' }}>
      <Sider
        width={220}
        style={{
          background: '#fff',
          borderRight: '1px solid #f0f0f0'
        }}
        theme="light"
      >
        <div style={{ padding: '20px 16px', borderBottom: '1px solid #f0f0f0' }}>
          <Title level={4} style={{ margin: 0, color: '#1677ff' }}>
            <CompassOutlined style={{ marginRight: 8 }} />
            低空飞行服务
          </Title>
          <Text type="secondary" style={{ fontSize: 12 }}>
            飞行服务一站式办理
          </Text>
        </div>
        <Menu
          mode="inline"
          selectedKeys={[selectedMenu]}
          items={menuItems}
          onClick={(e) => {
            const item = SERVICE_MENU.find(m => m.key === e.key);
            if (item && item.path) {
              window.location.href = item.path;
            }
            setSelectedMenu(e.key);
          }}
          style={{ borderRight: 0, marginTop: 8 }}
        />
      </Sider>

      <Content style={{ padding: 24 }}>
        <div style={{ maxWidth: 1200 }}>
          <Row gutter={[24, 24]}>
            <Col span={24}>
              <Card
                style={{ borderRadius: 8 }}
                styles={{ body: { padding: '16px 24px' } }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <Text strong style={{ fontSize: 16 }}>您好，欢迎使用低空飞行服务</Text>
                    <br />
                    <Text type="secondary">今日已有 256 位用户办理业务，平均办理时长 1.5 天</Text>
                  </div>
                </div>
              </Card>
            </Col>

            <Col span={24}>
              <Card
                title={<span style={{ fontWeight: 600 }}><BellOutlined style={{ marginRight: 8 }} />通知公告</span>}
                extra={<Button type="link" onClick={() => window.location.href = '/prototypes/notices'}>查看全部 <RightOutlined /></Button>}
                style={{ borderRadius: 8 }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid #f0f0f0' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <Tag color="warning">通知</Tag>
                      <Text>关于春节期间空域临时管制的通知</Text>
                    </div>
                    <Text type="secondary" style={{ fontSize: 12 }}>2024-01-20</Text>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid #f0f0f0' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <Tag color="processing">政策</Tag>
                      <Text>低空飞行服务管理办法（试行）发布</Text>
                    </div>
                    <Text type="secondary" style={{ fontSize: 12 }}>2024-01-18</Text>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <Tag color="success">动态</Tag>
                      <Text>本地区新增3条无人机配送航线</Text>
                    </div>
                    <Text type="secondary" style={{ fontSize: 12 }}>2024-01-15</Text>
                  </div>
                </div>
              </Card>
            </Col>

            <Col span={24}>
              <Title level={4} style={{ marginBottom: 16 }}>服务入口</Title>
              <Row gutter={[16, 16]}>
                {SERVICE_CARDS.map((service) => (
                  <Col xs={24} sm={12} lg={8} key={service.key}>
                    <Card
                      hoverable
                      style={{ borderRadius: 8, height: '100%', cursor: 'pointer' }}
                      styles={{ body: { padding: 20 } }}
                      onClick={() => window.location.href = service.path}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    >
                      <div style={{ display: 'flex', gap: 16 }}>
                        <div
                          style={{
                            width: 56,
                            height: 56,
                            borderRadius: 12,
                            background: service.bgColor,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: service.color,
                            flexShrink: 0
                          }}
                        >
                          {service.icon}
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <Text strong style={{ fontSize: 15 }}>{service.title}</Text>
                          <br />
                          <Text type="secondary" style={{ fontSize: 12 }}>
                            {service.description}
                          </Text>
                          <div style={{ marginTop: 8 }}>
                            <Text style={{ fontSize: 12, color: service.color }}>
                              {service.stats}
                            </Text>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Col>

            <Col span={24}>
              <Card
                title={<span style={{ fontWeight: 600 }}>我的业务</span>}
                extra={<Button type="link" onClick={() => window.location.href = '/prototypes/my-business'}>查看全部 <RightOutlined /></Button>}
                style={{ borderRadius: 8 }}
              >
                {MY_BUSINESS.length > 0 ? (
                  MY_BUSINESS.map((item) => {
                    const statusConfig = getStatusTag(item.status);
                    return (
                      <div
                        key={item.id}
                        style={{
                          padding: '12px 0',
                          borderBottom: '1px solid #f0f0f0',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center'
                        }}
                      >
                        <div>
                          <Text>{item.title}</Text>
                          <br />
                          <Text type="secondary" style={{ fontSize: 12 }}>
                            <CalendarOutlined style={{ marginRight: 4 }} />
                            {item.date}
                          </Text>
                        </div>
                        <Tag color={statusConfig.color} icon={statusConfig.icon}>
                          {item.statusText}
                        </Tag>
                      </div>
                    );
                  })
                ) : (
                  <Empty description="暂无业务记录" />
                )}
              </Card>
            </Col>

            <Col span={24}>
              <Card
                title={<span style={{ fontWeight: 600 }}>办理指南</span>}
                style={{ borderRadius: 8 }}
              >
                <Tabs
                  items={[
                    {
                      key: 'guide',
                      label: '办理流程',
                      children: (
                        <Timeline
                          items={[
                            { children: '注册账号并完成实名认证' },
                            { children: '选择需要办理的业务类型' },
                            { children: '填写申请信息并上传材料' },
                            { children: '提交申请，等待审核' },
                            { children: '审核通过，获取许可/资质' }
                          ]}
                        />
                      )
                    },
                    {
                      key: 'faq',
                      label: '常见问题',
                      children: (
                        <div>
                          {[
                            '飞行计划需要提前多久提交？',
                            '禁飞区和限飞区有什么区别？',
                            '如何查询我的申请进度？',
                            '飞行许可有效期是多久？'
                          ].map((q, i) => (
                            <div
                              key={i}
                              style={{
                                padding: '12px 0',
                                borderBottom: '1px solid #f0f0f0',
                                cursor: 'pointer'
                              }}
                            >
                              <Text>{q}</Text>
                              <RightOutlined style={{ float: 'right', color: '#bfbfbf' }} />
                            </div>
                          ))}
                        </div>
                      )
                    }
                  ]}
                />
              </Card>
            </Col>
          </Row>
        </div>
      </Content>
    </Layout>
  );
};

export default Component;
