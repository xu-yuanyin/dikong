/**
 * @name 服务概览
 *
 * 提供政策法规、气象服务、通知公告、行业资讯、安全知识等信息服务
 */

import './style.css';
import React, { useState } from 'react';
import {
  Layout,
  Menu,
  Card,
  Row,
  Col,
  Tabs,
  Typography,
  Tag,
  Input,
  Button,
  Space,
  Statistic
} from 'antd';
import {
  FileTextOutlined,
  CloudOutlined,
  NotificationOutlined,
  LineChartOutlined,
  SafetyOutlined,
  SearchOutlined,
  SunOutlined,
  ThunderboltOutlined,
  WarningOutlined
} from '@ant-design/icons';

const { Sider, Content } = Layout;
const { Title, Text, Paragraph } = Typography;

const SERVICE_MENU = [
  { key: 'overview', label: '服务概览', icon: <FileTextOutlined />, path: '/prototypes/info-service' },
  { key: 'policy', label: '政策法规', icon: <FileTextOutlined />, path: '/prototypes/info-policy' },
  { key: 'weather', label: '气象服务', icon: <CloudOutlined />, path: '/prototypes/info-weather' },
  { key: 'notice', label: '通知公告', icon: <NotificationOutlined />, path: '/prototypes/info-notice' },
  { key: 'news', label: '行业资讯', icon: <LineChartOutlined />, path: '/prototypes/info-news' },
  { key: 'safety', label: '安全知识', icon: <SafetyOutlined />, path: '/prototypes/info-safety' }
];

const POLICY_DATA = [
  { id: 1, title: '低空飞行服务管理办法（试行）', date: '2024-01-15', tag: '新规', source: '民航局' },
  { id: 2, title: '民用无人驾驶航空器系统安全管理规定', date: '2024-01-10', tag: '重要', source: '国务院' },
  { id: 3, title: '关于进一步加强低空空域管理的通知', date: '2024-01-05', tag: '', source: '空管局' },
  { id: 4, title: '低空经济产业发展指导意见', date: '2024-01-02', tag: '', source: '发改委' }
];

const WEATHER_DATA = {
  current: { temp: 18, humidity: 65, wind: '东南风 3级', visibility: '良好' },
  forecast: [
    { day: '今天', icon: <SunOutlined />, temp: '18-25°C', status: '晴' },
    { day: '明天', icon: <CloudOutlined />, temp: '16-22°C', status: '多云' },
    { day: '后天', icon: <ThunderboltOutlined />, temp: '14-20°C', status: '雷阵雨' }
  ],
  alerts: [
    { type: 'warning', title: '大风预警', content: '预计明日午后有5-6级大风' }
  ]
};

const Component: React.FC = () => {
  const [selectedMenu, setSelectedMenu] = useState('overview');

  const menuItems = SERVICE_MENU.map(item => ({
    key: item.key,
    label: item.label,
    icon: item.icon
  }));

  return (
    <Layout style={{ minHeight: '100vh', background: '#f5f7fa' }}>
      <Sider
        width={220}
        style={{ background: '#fff', borderRight: '1px solid #f0f0f0' }}
        theme="light"
      >
        <div style={{ padding: '20px 16px', borderBottom: '1px solid #f0f0f0' }}>
          <Title level={4} style={{ margin: 0, color: '#fa8c16' }}>
            <InfoCircleOutlined style={{ marginRight: 8 }} />
            低空信息服务
          </Title>
          <Text type="secondary" style={{ fontSize: 12 }}>
            信息汇聚与发布
          </Text>
        </div>
        <Menu
          mode="inline"
          selectedKeys={[selectedMenu]}
          items={menuItems}
          onClick={(e) => {
            const item = SERVICE_MENU.find(m => m.key === e.key);
            if (item && item.path && e.key !== 'overview') {
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
              <Card style={{ borderRadius: 8 }}>
                <Input.Search
                  placeholder="搜索政策、法规、资讯..."
                  allowClear
                  enterButton={<><SearchOutlined /> 搜索</>}
                  size="large"
                  style={{ maxWidth: 600 }}
                />
              </Card>
            </Col>

            <Col xs={24} lg={12}>
              <Card
                title={<span style={{ fontWeight: 600 }}><CloudOutlined /> 气象服务</span>}
                style={{ borderRadius: 8 }}
              >
                <Row gutter={16}>
                  <Col span={12}>
                    <Statistic title="当前温度" value={WEATHER_DATA.current.temp} suffix="°C" />
                  </Col>
                  <Col span={12}>
                    <Statistic title="湿度" value={WEATHER_DATA.current.humidity} suffix="%" />
                  </Col>
                </Row>
                <div style={{ marginTop: 16 }}>
                  <Text type="secondary">风向：{WEATHER_DATA.current.wind}</Text>
                  <br />
                  <Text type="secondary">能见度：{WEATHER_DATA.current.visibility}</Text>
                </div>
                {WEATHER_DATA.alerts.map((alert, i) => (
                  <Tag key={i} color="warning" icon={<WarningOutlined />} style={{ marginTop: 12 }}>
                    {alert.title}：{alert.content}
                  </Tag>
                ))}
              </Card>
            </Col>

            <Col xs={24} lg={12}>
              <Card
                title={<span style={{ fontWeight: 600 }}><NotificationOutlined /> 最新公告</span>}
                extra={<Button type="link">更多</Button>}
                style={{ borderRadius: 8 }}
              >
                {[
                  { title: '春节期间空域管制通知', date: '2024-01-16', urgent: true },
                  { title: '飞行计划填报系统升级公告', date: '2024-01-15', urgent: false },
                  { title: '新增12个临时起降点开放', date: '2024-01-14', urgent: false }
                ].map((item, i) => (
                  <div key={i} style={{ padding: '8px 0', borderBottom: '1px solid #f0f0f0' }}>
                    {item.urgent && <Tag color="error">紧急</Tag>}
                    <Text>{item.title}</Text>
                    <Text type="secondary" style={{ float: 'right', fontSize: 12 }}>{item.date}</Text>
                  </div>
                ))}
              </Card>
            </Col>

            <Col span={24}>
              <Card
                title={<span style={{ fontWeight: 600 }}><FileTextOutlined /> 政策法规</span>}
                extra={<Button type="link">查看全部</Button>}
                style={{ borderRadius: 8 }}
              >
                <Tabs
                  items={[
                    {
                      key: 'all',
                      label: '全部',
                      children: (
                        <div>
                          {POLICY_DATA.map((item) => (
                            <div
                              key={item.id}
                              style={{
                                padding: '12px 0',
                                borderBottom: '1px solid #f0f0f0',
                                cursor: 'pointer'
                              }}
                            >
                              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                {item.tag && (
                                  <Tag color={item.tag === '新规' ? 'blue' : item.tag === '重要' ? 'red' : 'default'}>
                                    {item.tag}
                                  </Tag>
                                )}
                                <Text strong>{item.title}</Text>
                              </div>
                              <Space style={{ marginTop: 4 }}>
                                <Text type="secondary" style={{ fontSize: 12 }}>来源：{item.source}</Text>
                                <Text type="secondary" style={{ fontSize: 12 }}>{item.date}</Text>
                              </Space>
                            </div>
                          ))}
                        </div>
                      )
                    },
                    {
                      key: 'regulation',
                      label: '法规标准',
                      children: <div style={{ padding: 20, textAlign: 'center', color: '#999' }}>法规标准内容...</div>
                    },
                    {
                      key: 'interpretation',
                      label: '政策解读',
                      children: <div style={{ padding: 20, textAlign: 'center', color: '#999' }}>政策解读内容...</div>
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

function InfoCircleOutlined() {
  return <FileTextOutlined />;
}

export default Component;
