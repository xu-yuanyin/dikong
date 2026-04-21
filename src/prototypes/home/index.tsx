/**
 * @name 门户首页
 * @mode axure
 * @see /skills/axure-export-workflow/SKILL.md
 *
 * 区域低空公共服务管理体系的门户入口页面
 * 为政府部门、企业、飞手、公众提供一站式服务导航
 */

import './style.css';
import React, { useState } from 'react';
import {
  Layout,
  Row,
  Col,
  Card,
  Button,
  Input,
  Badge,
  List,
  Tabs,
  Space,
  Typography
} from 'antd';
import {
  SearchOutlined,
  BellOutlined,
  UserOutlined,
  RocketOutlined,
  InfoCircleOutlined,
  AlertOutlined,
  HeartOutlined,
  EnvironmentOutlined,
  CloudOutlined,
  SafetyCertificateOutlined,
  ThunderboltOutlined,
  FileTextOutlined,
  NotificationOutlined,
  LineChartOutlined,
  CalendarOutlined,
  RightOutlined,
  PhoneOutlined,
  MailOutlined,
  GlobalOutlined
} from '@ant-design/icons';

const { Header, Content, Footer } = Layout;
const { Title, Text, Paragraph } = Typography;

const SERVICE_MODULES = [
  {
    key: 'flight',
    title: '低空飞行服务',
    description: '飞行计划在线填报、空域查询、飞行许可办理、航线规划、起降点预约',
    icon: <RocketOutlined style={{ fontSize: 36 }} />,
    color: '#1677ff',
    bgColor: '#e6f4ff',
    link: '/flight-service'
  },
  {
    key: 'info',
    title: '低空信息服务',
    description: '政策法规查询、气象服务、通知公告、行业资讯、安全知识',
    icon: <InfoCircleOutlined style={{ fontSize: 36 }} />,
    color: '#fa8c16',
    bgColor: '#fff7e6',
    link: '/info-service'
  },
  {
    key: 'emergency',
    title: '低空应急服务',
    description: '一键报警、救援调度、预警发布、数据留存、事故调查',
    icon: <AlertOutlined style={{ fontSize: 36 }} />,
    color: '#ff4d4f',
    bgColor: '#fff1f0',
    link: '/emergency-service'
  },
  {
    key: 'public',
    title: '低空便民服务',
    description: '低空旅游、培训服务、资质查询、维修保险、科普宣传',
    icon: <HeartOutlined style={{ fontSize: 36 }} />,
    color: '#52c41a',
    bgColor: '#f6ffed',
    link: '/public-service'
  }
];

const QUICK_SERVICES = [
  { key: 'permit', title: '飞行许可办理', icon: <SafetyCertificateOutlined />, color: '#13c2c2', path: '/prototypes/flight-permit' },
  { key: 'route', title: '航线规划', icon: <EnvironmentOutlined />, color: '#722ed1', path: '/prototypes/route-planning' },
  { key: 'landing', title: '起降点预约', icon: <CalendarOutlined />, color: '#1677ff', path: '/prototypes/landing-point' },
  { key: 'weather', title: '气象服务', icon: <CloudOutlined />, color: '#faad14', path: '/prototypes/info-weather' },
  { key: 'rescue', title: '救援调度', icon: <AlertOutlined />, color: '#ff4d4f', path: '/prototypes/emergency-rescue' },
  { key: 'qualify', title: '资质查询', icon: <SafetyCertificateOutlined />, color: '#52c41a', path: '/prototypes/public-query' },
  { key: 'maintenance', title: '维修保险', icon: <ThunderboltOutlined />, color: '#eb2f96', path: '/prototypes/public-maintenance' },
  { key: 'tour', title: '低空旅游', icon: <RocketOutlined />, color: '#2f54eb', path: '/prototypes/public-tour' }
];

const NEWS_DATA = {
  policies: [
    { id: 1, title: '关于进一步加强低空空域管理的通知', date: '2024-01-15', tag: '重要' },
    { id: 2, title: '低空飞行服务管理办法（试行）', date: '2024-01-10', tag: '新规' },
    { id: 3, title: '民用无人驾驶航空器系统安全管理规定', date: '2024-01-05', tag: '' },
    { id: 4, title: '低空经济产业发展指导意见', date: '2024-01-02', tag: '' }
  ],
  notices: [
    { id: 1, title: '关于开展低空飞行安全专项检查的通知', date: '2024-01-16', tag: '紧急' },
    { id: 2, title: '春节期间空域管制公告', date: '2024-01-14', tag: '重要' },
    { id: 3, title: '系统升级维护通知', date: '2024-01-12', tag: '' },
    { id: 4, title: '低空飞行器备案系统上线公告', date: '2024-01-08', tag: '新功能' }
  ],
  trends: [
    { id: 1, title: '低空经济市场规模突破千亿，发展前景广阔', date: '2024-01-16' },
    { id: 2, title: '多地开展低空空域改革试点，简化审批流程', date: '2024-01-13' },
    { id: 3, title: '无人机配送业务迎来快速发展期', date: '2024-01-11' },
    { id: 4, title: '低空旅游成为文旅消费新热点', date: '2024-01-09' }
  ]
};

const Component: React.FC = () => {
  const [searchValue, setSearchValue] = useState('');

  return (
    <Layout style={{ minHeight: '100vh', background: '#f5f7fa' }}>
      <Header
        style={{
          background: '#fff',
          padding: '0 24px',
          height: 64,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
          position: 'sticky',
          top: 0,
          zIndex: 100
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: 8,
                background: 'linear-gradient(135deg, #1677ff 0%, #4096ff 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <RocketOutlined style={{ color: '#fff', fontSize: 20 }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ fontWeight: 600, fontSize: 16, color: 'rgba(0,0,0,0.88)', lineHeight: '22px' }}>
                区域低空公共服务
              </div>
              <div style={{ fontSize: 12, color: 'rgba(0,0,0,0.45)', lineHeight: '18px' }}>
                Regional Low-Altitude Public Service
              </div>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <Input
            placeholder="搜索服务、政策、资讯..."
            prefix={<SearchOutlined style={{ color: 'rgba(0,0,0,0.45)' }} />}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            style={{ width: 280, borderRadius: 6 }}
            allowClear
          />
          <Badge count={5} size="small">
            <Button type="text" icon={<BellOutlined style={{ fontSize: 18 }} />} />
          </Badge>
          <Button type="primary" icon={<UserOutlined />}>
            登录 / 注册
          </Button>
        </div>
      </Header>

      <Content>
        <div
          style={{
            background: 'linear-gradient(135deg, #1677ff 0%, #0958d9 50%, #003eb3 100%)',
            padding: '60px 24px',
            textAlign: 'center',
            color: '#fff'
          }}
        >
          <div style={{ maxWidth: 800, margin: '0 auto' }}>
            <Title level={1} style={{ color: '#fff', marginBottom: 16, fontWeight: 600 }}>
              足不出户 · 一键办理
            </Title>
            <Paragraph style={{ color: 'rgba(255,255,255,0.85)', fontSize: 18, marginBottom: 32 }}>
              为政府部门、企业、飞手、公众提供全场景、一站式、便捷化低空公共服务
            </Paragraph>
            <Space size={16}>
              <Button
                type="primary"
                size="large"
                icon={<AlertOutlined />}
                style={{
                  background: '#ff4d4f',
                  borderColor: '#ff4d4f',
                  height: 48,
                  paddingInline: 32,
                  borderRadius: 8
                }}
              >
                一键报警
              </Button>
              <Button
                size="large"
                icon={<FileTextOutlined />}
                href="/prototypes/flight-plan"
                style={{
                  background: 'rgba(255,255,255,0.15)',
                  borderColor: 'rgba(255,255,255,0.3)',
                  color: '#fff',
                  height: 48,
                  paddingInline: 32,
                  borderRadius: 8
                }}
              >
                飞行计划填报
              </Button>
              <Button
                size="large"
                icon={<EnvironmentOutlined />}
                href="/prototypes/airspace-query"
                style={{
                  background: 'rgba(255,255,255,0.15)',
                  borderColor: 'rgba(255,255,255,0.3)',
                  color: '#fff',
                  height: 48,
                  paddingInline: 32,
                  borderRadius: 8
                }}
              >
                空域查询
              </Button>
            </Space>
          </div>
        </div>

        <div style={{ padding: '48px 24px', maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ marginBottom: 32, textAlign: 'center' }}>
            <Title level={2} style={{ marginBottom: 8 }}>核心服务</Title>
            <Text type="secondary">四大服务模块，覆盖低空服务全场景</Text>
          </div>
          <Row gutter={[24, 24]}>
            {SERVICE_MODULES.map((module) => (
              <Col xs={24} sm={12} lg={6} key={module.key}>
                <Card
                  hoverable
                  style={{
                    height: '100%',
                    borderRadius: 12,
                    border: '1px solid #f0f0f0',
                    transition: 'all 0.3s',
                    cursor: 'pointer'
                  }}
                  styles={{
                    body: { padding: 24 }
                  }}
                  onClick={() => window.location.href = `/prototypes${module.link}`}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div
                    style={{
                      width: 64,
                      height: 64,
                      borderRadius: 16,
                      background: module.bgColor,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: 16,
                      color: module.color
                    }}
                  >
                    {module.icon}
                  </div>
                  <Title level={4} style={{ marginBottom: 8 }}>{module.title}</Title>
                  <Text type="secondary" style={{ fontSize: 13, lineHeight: 1.6 }}>
                    {module.description}
                  </Text>
                  <Button
                    type="link"
                    style={{ padding: '8px 0', marginTop: 12 }}
                    icon={<RightOutlined />}
                    iconPlacement="end"
                  >
                    进入服务
                  </Button>
                </Card>
              </Col>
            ))}
          </Row>
        </div>

        <div style={{ background: '#fff', padding: '48px 24px' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ marginBottom: 32, textAlign: 'center' }}>
              <Title level={2} style={{ marginBottom: 8 }}>资讯公告</Title>
              <Text type="secondary">政策法规、通知公告、行业动态实时更新</Text>
            </div>
            <Tabs 
              defaultActiveKey="policies" 
              centered
              items={[
                {
                  key: 'policies',
                  label: <span><FileTextOutlined /> 政策法规</span>,
                  children: (
                    <List
                      dataSource={NEWS_DATA.policies}
                      renderItem={(item) => (
                        <List.Item
                          style={{ cursor: 'pointer' }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = '#fafafa';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'transparent';
                          }}
                        >
                          <List.Item.Meta
                            avatar={
                              item.tag && (
                                <span
                                  style={{
                                    padding: '2px 8px',
                                    borderRadius: 4,
                                    fontSize: 12,
                                    background: item.tag === '重要' ? '#fff1f0' : item.tag === '新规' ? '#e6f4ff' : '#f6ffed',
                                    color: item.tag === '重要' ? '#ff4d4f' : item.tag === '新规' ? '#1677ff' : '#52c41a'
                                  }}
                                >
                                  {item.tag}
                                </span>
                              )
                            }
                            title={<Text style={{ fontSize: 15 }}>{item.title}</Text>}
                          />
                          <Text type="secondary">{item.date}</Text>
                        </List.Item>
                      )}
                    />
                  )
                },
                {
                  key: 'notices',
                  label: <span><NotificationOutlined /> 通知公告</span>,
                  children: (
                    <List
                      dataSource={NEWS_DATA.notices}
                      renderItem={(item) => (
                        <List.Item
                          style={{ cursor: 'pointer' }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = '#fafafa';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'transparent';
                          }}
                        >
                          <List.Item.Meta
                            avatar={
                              item.tag && (
                                <span
                                  style={{
                                    padding: '2px 8px',
                                    borderRadius: 4,
                                    fontSize: 12,
                                    background: item.tag === '紧急' ? '#fff1f0' : item.tag === '重要' ? '#fff7e6' : '#e6f4ff',
                                    color: item.tag === '紧急' ? '#ff4d4f' : item.tag === '重要' ? '#fa8c16' : '#1677ff'
                                  }}
                                >
                                  {item.tag}
                                </span>
                              )
                            }
                            title={<Text style={{ fontSize: 15 }}>{item.title}</Text>}
                          />
                          <Text type="secondary">{item.date}</Text>
                        </List.Item>
                      )}
                    />
                  )
                },
                {
                  key: 'trends',
                  label: <span><LineChartOutlined /> 行业动态</span>,
                  children: (
                    <List
                      dataSource={NEWS_DATA.trends}
                      renderItem={(item) => (
                        <List.Item
                          style={{ cursor: 'pointer' }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = '#fafafa';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'transparent';
                          }}
                        >
                          <List.Item.Meta title={<Text style={{ fontSize: 15 }}>{item.title}</Text>} />
                          <Text type="secondary">{item.date}</Text>
                        </List.Item>
                      )}
                    />
                  )
                }
              ]}
            />
          </div>
        </div>

        <div style={{ padding: '48px 24px', maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ marginBottom: 32, textAlign: 'center' }}>
            <Title level={2} style={{ marginBottom: 8 }}>快捷服务</Title>
            <Text type="secondary">常用服务一键直达</Text>
          </div>
          <Row gutter={[16, 16]}>
            {QUICK_SERVICES.map((service) => (
              <Col xs={12} sm={8} md={6} key={service.key}>
                <Card
                  hoverable
                  style={{
                    textAlign: 'center',
                    borderRadius: 8,
                    border: '1px solid #f0f0f0',
                    cursor: 'pointer'
                  }}
                  styles={{
                    body: { padding: 20 }
                  }}
                  onClick={() => window.location.href = service.path}
                >
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: 12,
                      background: `${service.color}15`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 12px',
                      color: service.color
                    }}
                  >
                    {React.cloneElement(service.icon, { style: { fontSize: 22 } })}
                  </div>
                  <Text style={{ fontWeight: 500 }}>{service.title}</Text>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </Content>

      <Footer
        style={{
          background: '#001529',
          padding: '40px 24px 24px',
          color: 'rgba(255,255,255,0.65)'
        }}
      >
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <Row gutter={[48, 32]}>
            <Col xs={24} md={8}>
              <div style={{ marginBottom: 16 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 8,
                      background: '#1677ff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <RocketOutlined style={{ color: '#fff', fontSize: 18 }} />
                  </div>
                  <span style={{ color: '#fff', fontWeight: 600, fontSize: 16 }}>
                    区域低空公共服务
                  </span>
                </div>
                <Text style={{ color: 'rgba(255,255,255,0.45)', fontSize: 13 }}>
                  以便民利企、普惠高效为核心，为政府部门、企业、飞手、公众提供全场景、一站式、便捷化低空公共服务
                </Text>
              </div>
            </Col>
            <Col xs={12} md={5}>
              <Title level={5} style={{ color: '#fff', marginBottom: 16 }}>服务支持</Title>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                <li style={{ marginBottom: 8 }}><a href="#" style={{ color: 'rgba(255,255,255,0.65)' }}>帮助中心</a></li>
                <li style={{ marginBottom: 8 }}><a href="#" style={{ color: 'rgba(255,255,255,0.65)' }}>常见问题</a></li>
                <li style={{ marginBottom: 8 }}><a href="#" style={{ color: 'rgba(255,255,255,0.65)' }}>意见反馈</a></li>
                <li style={{ marginBottom: 8 }}><a href="#" style={{ color: 'rgba(255,255,255,0.65)' }}>投诉举报</a></li>
              </ul>
            </Col>
            <Col xs={12} md={5}>
              <Title level={5} style={{ color: '#fff', marginBottom: 16 }}>友情链接</Title>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                <li style={{ marginBottom: 8 }}><a href="#" style={{ color: 'rgba(255,255,255,0.65)' }}>民航局</a></li>
                <li style={{ marginBottom: 8 }}><a href="#" style={{ color: 'rgba(255,255,255,0.65)' }}>空管局</a></li>
                <li style={{ marginBottom: 8 }}><a href="#" style={{ color: 'rgba(255,255,255,0.65)' }}>地方政府</a></li>
                <li style={{ marginBottom: 8 }}><a href="#" style={{ color: 'rgba(255,255,255,0.65)' }}>行业协会</a></li>
              </ul>
            </Col>
            <Col xs={24} md={6}>
              <Title level={5} style={{ color: '#fff', marginBottom: 16 }}>联系我们</Title>
              <Space vertical size={8}>
                <span><PhoneOutlined style={{ marginRight: 8 }} /> 服务热线：400-XXX-XXXX</span>
                <span><MailOutlined style={{ marginRight: 8 }} /> 邮箱：service@example.gov.cn</span>
                <span><GlobalOutlined style={{ marginRight: 8 }} /> 工作时间：周一至周五 9:00-18:00</span>
              </Space>
            </Col>
          </Row>
          <div
            style={{
              marginTop: 32,
              paddingTop: 24,
              borderTop: '1px solid rgba(255,255,255,0.1)',
              textAlign: 'center'
            }}
          >
            <Text style={{ color: 'rgba(255,255,255,0.45)', fontSize: 12 }}>
              © 2024 区域低空公共服务管理体系 版权所有 | 备案号：XXXXXXX
            </Text>
          </div>
        </div>
      </Footer>
    </Layout>
  );
};

export default Component;
