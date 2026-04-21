/**
 * @name 气象服务
 *
 * 提供低空飞行相关的气象信息服务
 */

import './style.css';
import React, { useState } from 'react';
import {
  Layout, Menu, Card, Row, Col, Button, Typography, Tag, Breadcrumb, Statistic, Alert, Progress, Divider, Space
} from 'antd';
import {
  FileTextOutlined, CloudOutlined, NotificationOutlined, LineChartOutlined, SafetyOutlined, ArrowLeftOutlined, SunOutlined, CloudFilled, ThunderboltFilled, WarningOutlined, EnvironmentOutlined, EyeOutlined, DashboardOutlined, ClockCircleOutlined
} from '@ant-design/icons';

const { Sider, Content } = Layout;
const { Title, Text, Paragraph } = Typography;

const SIDE_MENU = [
  { key: 'overview', label: '服务概览', icon: <FileTextOutlined />, path: '/prototypes/info-service' },
  { key: 'policy', label: '政策法规', icon: <FileTextOutlined />, path: '/prototypes/info-policy' },
  { key: 'weather', label: '气象服务', icon: <CloudOutlined />, path: '/prototypes/info-weather' },
  { key: 'notice', label: '通知公告', icon: <NotificationOutlined />, path: '/prototypes/info-notice' },
  { key: 'news', label: '行业资讯', icon: <LineChartOutlined />, path: '/prototypes/info-news' },
  { key: 'safety', label: '安全知识', icon: <SafetyOutlined />, path: '/prototypes/info-safety' }
];

const WEATHER_CURRENT = {
  temp: 18, humidity: 65, wind: '东南风 3级', windSpeed: 12, visibility: 15, pressure: 1013, uv: 3, aqi: 45
};

const WEATHER_FORECAST = [
  { day: '今天', icon: <SunOutlined style={{ fontSize: 32, color: '#faad14' }} />, temp: '18-25°C', status: '晴', wind: '东南风 2-3级', suitable: true },
  { day: '明天', icon: <CloudFilled style={{ fontSize: 32, color: '#69b1ff' }} />, temp: '16-22°C', status: '多云', wind: '东风 3级', suitable: true },
  { day: '后天', icon: <ThunderboltFilled style={{ fontSize: 32, color: '#ff4d4f' }} />, temp: '14-20°C', status: '雷阵雨', wind: '西南风 4-5级', suitable: false }
];

const WEATHER_ALERTS = [
  { type: 'warning', title: '大风预警', content: '预计明日午后有5-6级大风，建议减少户外飞行活动', time: '2024-01-16 08:00' },
  { type: 'info', title: '能见度提醒', content: '明日早晨可能有轻雾，能见度较低，请注意飞行安全', time: '2024-01-16 07:30' }
];

const Component: React.FC = () => {
  const [selectedMenu, setSelectedMenu] = useState('weather');

  const menuItems = SIDE_MENU.map(item => ({ key: item.key, label: item.label, icon: item.icon }));

  return (
    <Layout style={{ minHeight: '100vh', background: '#f5f7fa' }}>
      <Sider width={220} style={{ background: '#fff', borderRight: '1px solid #f0f0f0' }} theme="light">
        <div style={{ padding: '20px 16px', borderBottom: '1px solid #f0f0f0' }}>
          <Title level={4} style={{ margin: 0, color: '#13c2c2' }}><CloudOutlined style={{ marginRight: 8 }} />低空信息服务</Title>
          <Text type="secondary" style={{ fontSize: 12 }}>信息查询与服务</Text>
        </div>
        <Menu mode="inline" selectedKeys={[selectedMenu]} items={menuItems} onClick={(e) => { const item = SIDE_MENU.find(m => m.key === e.key); if (item?.path) window.location.href = item.path; setSelectedMenu(e.key); }} style={{ borderRight: 0, marginTop: 8 }} />
        <div style={{ padding: 16, borderTop: '1px solid #f0f0f0', marginTop: 'auto' }}>
          <Button block icon={<ArrowLeftOutlined />} href="/prototypes/home">返回</Button>
        </div>
      </Sider>

      <Content style={{ padding: 24 }}>
        <div style={{ maxWidth: 1400 }}>
          <Card style={{ borderRadius: 8, marginBottom: 24 }}>
            <Breadcrumb items={[{ title: <a href="/prototypes/home">门户首页</a> }, { title: <a href="/prototypes/info-service">低空信息服务</a> }, { title: '气象服务' }]} />
            <Title level={4} style={{ margin: '8px 0 0' }}>气象服务</Title>
          </Card>

          <Row gutter={[24, 24]}>
            <Col xs={24} lg={16}>
              <Card title={<><EnvironmentOutlined style={{ marginRight: 8 }} />当前天气</>} style={{ borderRadius: 8, marginBottom: 24 }}>
                <Row gutter={[24, 16]}>
                  <Col xs={12} sm={6}>
                    <Statistic title="温度" value={WEATHER_CURRENT.temp} suffix="°C" prefix={<SunOutlined style={{ color: '#faad14' }} />} />
                  </Col>
                  <Col xs={12} sm={6}>
                    <Statistic title="湿度" value={WEATHER_CURRENT.humidity} suffix="%" prefix={<CloudOutlined style={{ color: '#69b1ff' }} />} />
                  </Col>
                  <Col xs={12} sm={6}>
                    <Statistic title="风速" value={WEATHER_CURRENT.windSpeed} suffix="km/h" prefix={<DashboardOutlined style={{ color: '#13c2c2' }} />} />
                  </Col>
                  <Col xs={12} sm={6}>
                    <Statistic title="能见度" value={WEATHER_CURRENT.visibility} suffix="km" prefix={<EyeOutlined style={{ color: '#52c41a' }} />} />
                  </Col>
                </Row>
                <Divider />
                <Row gutter={[24, 16]}>
                  <Col xs={12} sm={6}>
                    <Text type="secondary">风向</Text><br /><Text strong>{WEATHER_CURRENT.wind}</Text>
                  </Col>
                  <Col xs={12} sm={6}>
                    <Text type="secondary">气压</Text><br /><Text strong>{WEATHER_CURRENT.pressure} hPa</Text>
                  </Col>
                  <Col xs={12} sm={6}>
                    <Text type="secondary">紫外线指数</Text><br /><Text strong>{WEATHER_CURRENT.uv} 中等</Text>
                  </Col>
                  <Col xs={12} sm={6}>
                    <Text type="secondary">空气质量</Text><br /><Text strong style={{ color: '#52c41a' }}>{WEATHER_CURRENT.aqi} 优</Text>
                  </Col>
                </Row>
              </Card>

              <Card title={<><ClockCircleOutlined style={{ marginRight: 8 }} />天气预报</>} style={{ borderRadius: 8 }}>
                <Row gutter={24}>
                  {WEATHER_FORECAST.map((item, index) => (
                    <Col xs={24} sm={8} key={index}>
                      <Card style={{ textAlign: 'center', borderRadius: 8, background: item.suitable ? '#f6ffed' : '#fff2f0' }}>
                        <Text type="secondary">{item.day}</Text>
                        <div style={{ margin: '12px 0' }}>{item.icon}</div>
                        <Text strong style={{ fontSize: 16 }}>{item.temp}</Text>
                        <br /><Text>{item.status}</Text>
                        <br /><Text type="secondary" style={{ fontSize: 12 }}>{item.wind}</Text>
                        <div style={{ marginTop: 12 }}>
                          <Tag color={item.suitable ? 'success' : 'error'}>{item.suitable ? '适宜飞行' : '不宜飞行'}</Tag>
                        </div>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </Card>
            </Col>

            <Col xs={24} lg={8}>
              <Card title={<><WarningOutlined style={{ marginRight: 8 }} />气象预警</>} style={{ borderRadius: 8, marginBottom: 24 }}>
                <Space direction="vertical" style={{ width: '100%' }}>
                  {WEATHER_ALERTS.map((alert, index) => (
                    <Alert key={index} message={alert.title} description={alert.content} type={alert.type as any} showIcon style={{ borderRadius: 6 }} />
                  ))}
                </Space>
              </Card>

              <Card title="飞行建议" style={{ borderRadius: 8 }}>
                <Paragraph>
                  <Text strong style={{ color: '#52c41a' }}>今日天气良好，适宜低空飞行活动。</Text>
                </Paragraph>
                <Paragraph>
                  <Text type="secondary">建议：</Text>
                </Paragraph>
                <ul style={{ paddingLeft: 20, margin: 0 }}>
                  <li><Text>选择上午时段飞行，能见度更佳</Text></li>
                  <li><Text>注意观察天气变化，随时准备降落</Text></li>
                  <li><Text>携带备用电池，应对风向变化</Text></li>
                </ul>
                <Divider />
                <Text type="secondary" style={{ fontSize: 12 }}>数据更新时间：2024-01-16 09:30</Text>
              </Card>
            </Col>
          </Row>
        </div>
      </Content>
    </Layout>
  );
};

export default Component;
