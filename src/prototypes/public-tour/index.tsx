/**
 * @name 低空旅游
 *
 * 提供低空旅游服务信息展示和预订功能
 */

import './style.css';
import React, { useState } from 'react';
import {
  Layout, Menu, Card, Row, Col, Button, Typography, Tag, List, Empty, Breadcrumb, Rate, Avatar, Space, Input, Modal, DatePicker, Select, Statistic
} from 'antd';
import {
  HeartOutlined, CompassOutlined, BookOutlined, SafetyCertificateOutlined, ToolOutlined, MessageOutlined, ArrowLeftOutlined, EnvironmentOutlined, ClockCircleOutlined, StarOutlined, SearchOutlined, TeamOutlined, CalendarOutlined
} from '@ant-design/icons';

const { Sider, Content } = Layout;
const { Title, Text, Paragraph } = Typography;

const SIDE_MENU = [
  { key: 'overview', label: '服务概览', icon: <HeartOutlined />, path: '/prototypes/public-service' },
  { key: 'tour', label: '低空旅游', icon: <CompassOutlined />, path: '/prototypes/public-tour' },
  { key: 'training', label: '培训服务', icon: <BookOutlined />, path: '/prototypes/public-training' },
  { key: 'query', label: '资质查询', icon: <SafetyCertificateOutlined />, path: '/prototypes/public-query' },
  { key: 'maintenance', label: '维修保险', icon: <ToolOutlined />, path: '/prototypes/public-maintenance' },
  { key: 'feedback', label: '意见反馈', icon: <MessageOutlined />, path: '/prototypes/public-feedback' }
];

const TOUR_ROUTES = [
  { id: 1, name: '城市天际线观光', location: '城东区A3空域', duration: '30分钟', price: 299, rating: 4.8, reviews: 256, description: '俯瞰城市全景，感受都市繁华', features: ['专业飞行员', '安全保险', '高清航拍'] },
  { id: 2, name: '湖光山色之旅', location: '城西区B2空域', duration: '45分钟', price: 399, rating: 4.9, reviews: 189, description: '穿越山水之间，尽享自然风光', features: ['专业飞行员', '安全保险', '高清航拍', '纪念证书'] },
  { id: 3, name: '夜景璀璨飞行', location: '市中心C1空域', duration: '25分钟', price: 359, rating: 4.7, reviews: 312, description: '华灯初上，俯瞰城市夜景', features: ['专业飞行员', '安全保险', '夜景拍摄'] },
  { id: 4, name: '海岸线探索', location: '滨海新区D2空域', duration: '40分钟', price: 459, rating: 4.8, reviews: 145, description: '沿着海岸线飞行，感受海风拂面', features: ['专业飞行员', '安全保险', '海洋生态讲解'] },
  { id: 5, name: '古镇风情游', location: '历史文化区E1空域', duration: '35分钟', price: 329, rating: 4.6, reviews: 98, description: '空中俯瞰古镇风貌，穿越历史时光', features: ['专业飞行员', '安全保险', '历史文化讲解'] }
];

const REVIEWS = [
  { id: 1, user: '飞行爱好者', avatar: '🧑', rating: 5, content: '非常棒的体验！飞行员很专业，景色太美了！', time: '2024-01-15' },
  { id: 2, user: '摄影达人', avatar: '👩', rating: 5, content: '航拍效果超赞，拍到了很多美美的照片！', time: '2024-01-14' },
  { id: 3, user: '周末玩家', avatar: '👨', rating: 4, content: '整体体验不错，就是价格稍微有点贵。', time: '2024-01-13' }
];

const Component: React.FC = () => {
  const [selectedMenu, setSelectedMenu] = useState('tour');
  const [searchText, setSearchText] = useState('');
  const [bookingModalVisible, setBookingModalVisible] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState<typeof TOUR_ROUTES[0] | null>(null);

  const menuItems = SIDE_MENU.map(item => ({ key: item.key, label: item.label, icon: item.icon }));

  const filteredRoutes = TOUR_ROUTES.filter(route => !searchText || route.name.toLowerCase().includes(searchText.toLowerCase()));

  const handleBooking = (route: typeof TOUR_ROUTES[0]) => {
    setSelectedRoute(route);
    setBookingModalVisible(true);
  };

  return (
    <Layout style={{ minHeight: '100vh', background: '#f5f7fa' }}>
      <Sider width={220} style={{ background: '#fff', borderRight: '1px solid #f0f0f0' }} theme="light">
        <div style={{ padding: '20px 16px', borderBottom: '1px solid #f0f0f0' }}>
          <Title level={4} style={{ margin: 0, color: '#13c2c2' }}><HeartOutlined style={{ marginRight: 8 }} />低空便民服务</Title>
          <Text type="secondary" style={{ fontSize: 12 }}>便民服务与咨询</Text>
        </div>
        <Menu mode="inline" selectedKeys={[selectedMenu]} items={menuItems} onClick={(e) => { const item = SIDE_MENU.find(m => m.key === e.key); if (item?.path) window.location.href = item.path; setSelectedMenu(e.key); }} style={{ borderRight: 0, marginTop: 8 }} />
        <div style={{ padding: 16, borderTop: '1px solid #f0f0f0', marginTop: 'auto' }}>
          <Button block icon={<ArrowLeftOutlined />} href="/prototypes/home">返回</Button>
        </div>
      </Sider>

      <Content style={{ padding: 24 }}>
        <div style={{ maxWidth: 1400 }}>
          <Card style={{ borderRadius: 8, marginBottom: 24 }}>
            <Breadcrumb items={[{ title: <a href="/prototypes/home">门户首页</a> }, { title: <a href="/prototypes/public-service">低空便民服务</a> }, { title: '低空旅游' }]} />
            <Title level={4} style={{ margin: '8px 0 0' }}>低空旅游</Title>
          </Card>

          <Row gutter={[24, 24]}>
            <Col xs={24} lg={18}>
              <Card style={{ borderRadius: 8, marginBottom: 24 }}>
                <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Title level={5} style={{ margin: 0 }}>热门航线</Title>
                  <Input.Search placeholder="搜索航线" allowClear onSearch={setSearchText} style={{ width: 260 }} prefix={<SearchOutlined />} />
                </div>
                <List
                  grid={{ gutter: 24, xs: 1, sm: 2, lg: 2 }}
                  dataSource={filteredRoutes}
                  locale={{ emptyText: <Empty description="暂无航线信息" image={Empty.PRESENTED_IMAGE_SIMPLE} /> }}
                  renderItem={(item) => (
                    <List.Item>
                      <Card hoverable style={{ borderRadius: 8 }} actions={[<Button type="primary" onClick={() => handleBooking(item)}>立即预订</Button>]}>
                        <Card.Meta
                          title={<><Text strong>{item.name}</Text><Tag color="cyan" style={{ marginLeft: 8 }}>{item.duration}</Tag></>}
                          description={
                            <div>
                              <div style={{ marginBottom: 8 }}><EnvironmentOutlined style={{ marginRight: 4, color: '#1677ff' }} />{item.location}</div>
                              <Paragraph ellipsis={{ rows: 2 }} style={{ marginBottom: 8, minHeight: 44 }}>{item.description}</Paragraph>
                              <div style={{ marginBottom: 8 }}>
                                {item.features.map((f, i) => <Tag key={i} style={{ marginBottom: 4 }}>{f}</Tag>)}
                              </div>
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Text strong style={{ fontSize: 18, color: '#ff4d4f' }}>¥{item.price}</Text>
                                <Space><StarOutlined style={{ color: '#faad14' }} /><Text>{item.rating}</Text><Text type="secondary">({item.reviews}评价)</Text></Space>
                              </div>
                            </div>
                          }
                        />
                      </Card>
                    </List.Item>
                  )}
                />
              </Card>
            </Col>

            <Col xs={24} lg={6}>
              <Card style={{ borderRadius: 8, marginBottom: 24 }}>
                <Statistic title="今日预订" value={128} prefix={<CalendarOutlined style={{ color: '#13c2c2' }} />} />
              </Card>
              <Card style={{ borderRadius: 8, marginBottom: 24 }}>
                <Statistic title="累计服务" value={12580} prefix={<TeamOutlined style={{ color: '#1677ff' }} />} suffix="人次" />
              </Card>
              <Card title="用户评价" style={{ borderRadius: 8 }}>
                <List
                  dataSource={REVIEWS}
                  renderItem={(item) => (
                    <List.Item style={{ padding: '8px 0' }}>
                      <List.Item.Meta
                        avatar={<Avatar>{item.avatar}</Avatar>}
                        title={<><Text>{item.user}</Text><Rate disabled defaultValue={item.rating} style={{ fontSize: 12, marginLeft: 8 }} /></>}
                        description={<Text type="secondary" style={{ fontSize: 12 }}>{item.content}</Text>}
                      />
                    </List.Item>
                  )}
                />
              </Card>
            </Col>
          </Row>
        </div>
      </Content>

      <Modal title={`预订 - ${selectedRoute?.name}`} open={bookingModalVisible} onCancel={() => setBookingModalVisible(false)} onOk={() => setBookingModalVisible(false)} okText="确认预订" width={480}>
        <div style={{ marginBottom: 16 }}>
          <Text type="secondary">航线：</Text><Text strong>{selectedRoute?.name}</Text>
          <br /><Text type="secondary">价格：</Text><Text strong style={{ color: '#ff4d4f' }}>¥{selectedRoute?.price}</Text>
        </div>
        <DatePicker style={{ width: '100%', marginBottom: 16 }} placeholder="选择出行日期" />
        <Select style={{ width: '100%', marginBottom: 16 }} placeholder="选择出行时段">
          <Select.Option value="morning">上午 (09:00-12:00)</Select.Option>
          <Select.Option value="afternoon">下午 (14:00-17:00)</Select.Option>
          <Select.Option value="evening">傍晚 (17:00-19:00)</Select.Option>
        </Select>
        <Input placeholder="联系电话" style={{ marginBottom: 16 }} />
        <Input.TextArea rows={2} placeholder="备注信息（选填）" />
      </Modal>
    </Layout>
  );
};

export default Component;
