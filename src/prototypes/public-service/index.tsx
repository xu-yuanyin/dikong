/**
 * @name 服务概览
 *
 * 提供低空旅游、培训服务、资质查询、维修保险、科普宣传、意见反馈等便民服务
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
  Input,
  Rate,
  Avatar,
  Divider
} from 'antd';
import {
  HeartOutlined,
  CompassOutlined,
  BookOutlined,
  SafetyCertificateOutlined,
  ToolOutlined,
  MessageOutlined,
  EnvironmentOutlined,
  ClockCircleOutlined,
  PhoneOutlined,
  StarOutlined,
  RightOutlined,
  SearchOutlined,
  TeamOutlined,
  FileTextOutlined
} from '@ant-design/icons';

const { Sider, Content } = Layout;
const { Title, Text, Paragraph } = Typography;

const SERVICE_MENU = [
  { key: 'overview', label: '服务概览', icon: <HeartOutlined />, path: '/prototypes/public-service' },
  { key: 'tour', label: '低空旅游', icon: <CompassOutlined />, path: '/prototypes/public-tour' },
  { key: 'training', label: '培训服务', icon: <BookOutlined />, path: '/prototypes/public-training' },
  { key: 'query', label: '资质查询', icon: <SafetyCertificateOutlined />, path: '/prototypes/public-query' },
  { key: 'maintenance', label: '维修保险', icon: <ToolOutlined />, path: '/prototypes/public-maintenance' },
  { key: 'feedback', label: '意见反馈', icon: <MessageOutlined />, path: '/prototypes/public-feedback' }
];

const TOUR_ROUTES = [
  { id: 1, name: '城市天际线观光', location: '城东区A3空域', duration: '30分钟', price: 299, rating: 4.8, image: '🏙️' },
  { id: 2, name: '湖光山色之旅', location: '城西区B2空域', duration: '45分钟', price: 399, rating: 4.9, image: '🏞️' },
  { id: 3, name: '夜景璀璨飞行', location: '市中心C1空域', duration: '25分钟', price: 359, rating: 4.7, image: '🌃' }
];

const TRAINING_SCHOOLS = [
  { id: 1, name: '蓝天飞行培训中心', courses: 12, students: 2560, rating: 4.8 },
  { id: 2, name: '云端航空学院', courses: 8, students: 1820, rating: 4.6 },
  { id: 3, name: '翼翔飞行俱乐部', courses: 6, students: 980, rating: 4.5 }
];

const Component: React.FC = () => {
  const [selectedMenu, setSelectedMenu] = useState('overview');

  const handleMenuClick = (key: string) => {
    const menuItem = SERVICE_MENU.find(item => item.key === key);
    if (menuItem && menuItem.path) {
      window.location.href = menuItem.path;
    }
    setSelectedMenu(key);
  };

  const menuItems = SERVICE_MENU.map(item => ({
    key: item.key,
    label: item.label,
    icon: item.icon
  }));

  const handleServiceClick = (key: string) => {
    const menuItem = SERVICE_MENU.find(item => item.key === key);
    if (menuItem && menuItem.path) {
      window.location.href = menuItem.path;
    }
  };

  return (
    <Layout style={{ minHeight: '100vh', background: '#f5f7fa' }}>
      <Sider
        width={220}
        style={{ background: '#fff', borderRight: '1px solid #f0f0f0' }}
        theme="light"
      >
        <div style={{ padding: '20px 16px', borderBottom: '1px solid #f0f0f0' }}>
          <Title level={4} style={{ margin: 0, color: '#52c41a' }}>
            <HeartOutlined style={{ marginRight: 8 }} />
            低空便民服务
          </Title>
          <Text type="secondary" style={{ fontSize: 12 }}>
            便民利企，普惠高效
          </Text>
        </div>
        <Menu
          mode="inline"
          selectedKeys={[selectedMenu]}
          items={menuItems}
          onClick={(e) => handleMenuClick(e.key)}
          style={{ borderRight: 0, marginTop: 8 }}
        />
      </Sider>

      <Content style={{ padding: 24 }}>
        <div style={{ maxWidth: 1200 }}>
          <Row gutter={[24, 24]}>
            <Col span={24}>
              <Card style={{ borderRadius: 8 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <Text strong style={{ fontSize: 16 }}>低空便民服务，让您的生活更便捷</Text>
                    <br />
                    <Text type="secondary">低空旅游、培训服务、资质查询、维修保险一站式办理</Text>
                  </div>
                  <Space>
                    <Input.Search
                      placeholder="搜索服务..."
                      style={{ width: 240 }}
                    />
                  </Space>
                </div>
              </Card>
            </Col>

            <Col span={24}>
              <Title level={4} style={{ marginBottom: 16 }}>热门服务</Title>
              <Row gutter={[16, 16]}>
                {[
                  { key: 'tour', title: '低空旅游', desc: '低空旅游线路预约', icon: <CompassOutlined />, color: '#52c41a' },
                  { key: 'training', title: '培训服务', desc: '飞行培训机构查询', icon: <BookOutlined />, color: '#1677ff' },
                  { key: 'query', title: '资质查询', desc: '在线查询合规资质', icon: <SafetyCertificateOutlined />, color: '#722ed1' },
                  { key: 'maintenance', title: '维修保险', desc: '飞行器维修保养服务', icon: <ToolOutlined />, color: '#fa8c16' }
                ].map((service) => (
                  <Col xs={24} sm={12} lg={6} key={service.key}>
                    <Card
                      hoverable
                      style={{ borderRadius: 8, textAlign: 'center', cursor: 'pointer' }}
                      styles={{ body: { padding: 24 } }}
                      onClick={() => handleServiceClick(service.key)}
                    >
                      <div style={{
                        width: 56,
                        height: 56,
                        borderRadius: '50%',
                        background: `${service.color}15`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 12px',
                        color: service.color,
                        fontSize: 24
                      }}>
                        {service.icon}
                      </div>
                      <Text strong style={{ fontSize: 15 }}>{service.title}</Text>
                      <br />
                      <Text type="secondary" style={{ fontSize: 12 }}>{service.desc}</Text>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Col>

            <Col xs={24} lg={14}>
              <Card
                title={<span style={{ fontWeight: 600 }}><CompassOutlined /> 热门旅游线路</span>}
                extra={<Button type="link">查看全部 <RightOutlined /></Button>}
                style={{ borderRadius: 8 }}
              >
                {TOUR_ROUTES.map((route) => (
                  <div
                    key={route.id}
                    style={{
                      display: 'flex',
                      gap: 16,
                      padding: '16px 0',
                      borderBottom: '1px solid #f0f0f0'
                    }}
                  >
                    <div style={{
                      width: 80,
                      height: 80,
                      borderRadius: 8,
                      background: '#f5f7fa',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 36,
                      flexShrink: 0
                    }}>
                      {route.image}
                    </div>
                    <div style={{ flex: 1 }}>
                      <Text strong style={{ fontSize: 15 }}>{route.name}</Text>
                      <br />
                      <Space style={{ marginTop: 4 }}>
                        <Text type="secondary" style={{ fontSize: 12 }}>
                          <EnvironmentOutlined /> {route.location}
                        </Text>
                        <Text type="secondary" style={{ fontSize: 12 }}>
                          <ClockCircleOutlined /> {route.duration}
                        </Text>
                      </Space>
                      <div style={{ marginTop: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Space>
                          <Rate disabled defaultValue={route.rating} style={{ fontSize: 12 }} />
                          <Text style={{ fontSize: 12, color: '#faad14' }}>{route.rating}</Text>
                        </Space>
                        <Text strong style={{ color: '#ff4d4f', fontSize: 16 }}>¥{route.price}</Text>
                      </div>
                    </div>
                    <Button type="primary" style={{ alignSelf: 'center' }}>立即预约</Button>
                  </div>
                ))}
              </Card>
            </Col>

            <Col xs={24} lg={10}>
              <Card
                title={<span style={{ fontWeight: 600 }}><BookOutlined /> 推荐培训机构</span>}
                extra={<Button type="link">更多 <RightOutlined /></Button>}
                style={{ borderRadius: 8 }}
              >
                {TRAINING_SCHOOLS.map((school) => (
                  <div
                    key={school.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      padding: '12px 0',
                      borderBottom: '1px solid #f0f0f0'
                    }}
                  >
                    <Avatar size={48} style={{ background: '#1677ff', marginRight: 12 }}>
                      {school.name.charAt(0)}
                    </Avatar>
                    <div style={{ flex: 1 }}>
                      <Text strong>{school.name}</Text>
                      <br />
                      <Space style={{ marginTop: 4 }}>
                        <Text type="secondary" style={{ fontSize: 12 }}>
                          <FileTextOutlined /> {school.courses}门课程
                        </Text>
                        <Text type="secondary" style={{ fontSize: 12 }}>
                          <TeamOutlined /> {school.students}名学员
                        </Text>
                      </Space>
                    </div>
                    <Space>
                      <StarOutlined style={{ color: '#faad14' }} />
                      <Text>{school.rating}</Text>
                    </Space>
                  </div>
                ))}
              </Card>
            </Col>

            <Col span={24}>
              <Card
                title={<span style={{ fontWeight: 600 }}>快捷服务</span>}
                style={{ borderRadius: 8 }}
              >
                <Row gutter={[16, 16]}>
                  {[
                    { name: '飞行员资质查询', icon: <SafetyCertificateOutlined />, key: 'query' },
                    { name: '飞行器备案查询', icon: <FileTextOutlined />, key: 'query' },
                    { name: '运营企业查询', icon: <TeamOutlined />, key: 'query' },
                    { name: '培训机构查询', icon: <BookOutlined />, key: 'training' },
                    { name: '维修服务预约', icon: <ToolOutlined />, key: 'maintenance' },
                    { name: '保险办理咨询', icon: <SafetyCertificateOutlined />, key: 'maintenance' },
                    { name: '意见建议', icon: <MessageOutlined />, key: 'feedback' },
                    { name: '投诉举报', icon: <MessageOutlined />, key: 'feedback' }
                  ].map((item, i) => (
                    <Col xs={12} sm={8} lg={6} key={i}>
                      <Card
                        hoverable
                        style={{ borderRadius: 8, textAlign: 'center', cursor: 'pointer' }}
                        styles={{ body: { padding: 16 } }}
                        onClick={() => handleServiceClick(item.key)}
                      >
                        <div style={{ color: '#1677ff', fontSize: 24, marginBottom: 8 }}>
                          {item.icon}
                        </div>
                        <Text style={{ fontSize: 13 }}>{item.name}</Text>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </Card>
            </Col>
          </Row>
        </div>
      </Content>
    </Layout>
  );
};

export default Component;
