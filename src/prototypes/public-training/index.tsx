/**
 * @name 培训服务
 *
 * 提供飞行培训服务信息展示和报名功能
 */

import './style.css';
import React, { useState } from 'react';
import {
  Layout, Menu, Card, Row, Col, Button, Typography, Tag, List, Empty, Breadcrumb, Rate, Avatar, Space, Tabs, Modal, Form, Input, Select, Statistic
} from 'antd';
import {
  HeartOutlined, CompassOutlined, BookOutlined, SafetyCertificateOutlined, ToolOutlined, MessageOutlined, ArrowLeftOutlined, ClockCircleOutlined, TeamOutlined, StarOutlined, PhoneOutlined, EnvironmentOutlined
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

const TRAINING_SCHOOLS = [
  { id: 1, name: '蓝天飞行培训中心', courses: 12, students: 2560, rating: 4.8, location: '城东区', phone: '400-123-4567', description: '专业无人机驾驶员培训，民航局认证机构' },
  { id: 2, name: '云端航空学院', courses: 8, students: 1820, rating: 4.6, location: '城西区', phone: '400-234-5678', description: '提供多类型飞行器培训，师资力量雄厚' },
  { id: 3, name: '翼翔飞行俱乐部', courses: 6, students: 980, rating: 4.5, location: '城南区', phone: '400-345-6789', description: '小班教学，一对一指导，通过率高' }
];

const COURSES = [
  { id: 1, name: '无人机驾驶员初级培训', school: '蓝天飞行培训中心', duration: '7天', price: 2980, level: '初级', students: 1200 },
  { id: 2, name: '无人机驾驶员中级培训', school: '蓝天飞行培训中心', duration: '14天', price: 4980, level: '中级', students: 860 },
  { id: 3, name: '航拍技术专项培训', school: '云端航空学院', duration: '5天', price: 1980, level: '进阶', students: 520 },
  { id: 4, name: '农业植保无人机培训', school: '翼翔飞行俱乐部', duration: '10天', price: 3580, level: '专项', students: 380 }
];

const Component: React.FC = () => {
  const [selectedMenu, setSelectedMenu] = useState('training');
  const [activeTab, setActiveTab] = useState('schools');
  const [enrollModalVisible, setEnrollModalVisible] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<typeof COURSES[0] | null>(null);
  const [form] = Form.useForm();

  const menuItems = SIDE_MENU.map(item => ({ key: item.key, label: item.label, icon: item.icon }));

  const handleEnroll = (course: typeof COURSES[0]) => {
    setSelectedCourse(course);
    setEnrollModalVisible(true);
  };

  const handleEnrollSubmit = () => {
    form.validateFields().then(() => {
      setEnrollModalVisible(false);
      form.resetFields();
    });
  };

  return (
    <Layout style={{ minHeight: '100vh', background: '#f5f7fa' }}>
      <Sider width={220} style={{ background: '#fff', borderRight: '1px solid #f0f0f0' }} theme="light">
        <div style={{ padding: '20px 16px', borderBottom: '1px solid #f0f0f0' }}>
          <Title level={4} style={{ margin: 0, color: '#722ed1' }}><BookOutlined style={{ marginRight: 8 }} />低空便民服务</Title>
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
            <Breadcrumb items={[{ title: <a href="/prototypes/home">门户首页</a> }, { title: <a href="/prototypes/public-service">低空便民服务</a> }, { title: '培训服务' }]} />
            <Title level={4} style={{ margin: '8px 0 0' }}>培训服务</Title>
          </Card>

          <Row gutter={[24, 24]}>
            <Col xs={24} lg={6}>
              <Card style={{ borderRadius: 8 }}>
                <Statistic title="培训机构" value={TRAINING_SCHOOLS.length} prefix={<TeamOutlined style={{ color: '#722ed1' }} />} suffix="家" />
              </Card>
            </Col>
            <Col xs={24} lg={6}>
              <Card style={{ borderRadius: 8 }}>
                <Statistic title="培训课程" value={COURSES.length} prefix={<BookOutlined style={{ color: '#1677ff' }} />} suffix="门" />
              </Card>
            </Col>
            <Col xs={24} lg={6}>
              <Card style={{ borderRadius: 8 }}>
                <Statistic title="累计学员" value={5360} prefix={<TeamOutlined style={{ color: '#52c41a' }} />} suffix="人" />
              </Card>
            </Col>
            <Col xs={24} lg={6}>
              <Card style={{ borderRadius: 8 }}>
                <Statistic title="平均评分" value={4.7} prefix={<StarOutlined style={{ color: '#faad14' }} />} suffix="分" />
              </Card>
            </Col>
          </Row>

          <Card style={{ borderRadius: 8, marginTop: 24 }}>
            <Tabs activeKey={activeTab} onChange={setActiveTab} items={[{ key: 'schools', label: '培训机构' }, { key: 'courses', label: '培训课程' }]} />
            {activeTab === 'schools' && (
              <List
                grid={{ gutter: 24, xs: 1, sm: 2, lg: 3 }}
                dataSource={TRAINING_SCHOOLS}
                renderItem={(item) => (
                  <List.Item>
                    <Card style={{ borderRadius: 8 }} actions={[<Button type="primary">查看详情</Button>]}>
                      <Card.Meta
                        avatar={<Avatar style={{ background: '#722ed1' }} icon={<BookOutlined />} />}
                        title={item.name}
                        description={
                          <div>
                            <div style={{ marginBottom: 8 }}><EnvironmentOutlined style={{ marginRight: 4 }} />{item.location}</div>
                            <Paragraph ellipsis={{ rows: 2 }} style={{ marginBottom: 8, minHeight: 44 }}>{item.description}</Paragraph>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                              <Space><TeamOutlined />{item.students}学员</Space>
                              <Space><StarOutlined style={{ color: '#faad14' }} />{item.rating}</Space>
                            </div>
                          </div>
                        }
                      />
                    </Card>
                  </List.Item>
                )}
              />
            )}
            {activeTab === 'courses' && (
              <List
                dataSource={COURSES}
                renderItem={(item) => (
                  <List.Item actions={[<Text strong style={{ color: '#ff4d4f' }}>¥{item.price}</Text>, <Button type="primary" onClick={() => handleEnroll(item)}>立即报名</Button>]}>
                    <List.Item.Meta
                      avatar={<Avatar style={{ background: '#1677ff' }} icon={<BookOutlined />} />}
                      title={<><Text strong>{item.name}</Text><Tag color="blue" style={{ marginLeft: 8 }}>{item.level}</Tag></>}
                      description={<><Text type="secondary">{item.school}</Text><br /><Space><ClockCircleOutlined />{item.duration}<TeamOutlined />{item.students}人已报名</Space></>}
                    />
                  </List.Item>
                )}
              />
            )}
          </Card>
        </div>
      </Content>

      <Modal title={`报名 - ${selectedCourse?.name}`} open={enrollModalVisible} onCancel={() => setEnrollModalVisible(false)} onOk={handleEnrollSubmit} okText="确认报名" width={480}>
        <div style={{ marginBottom: 16 }}>
          <Text type="secondary">课程：</Text><Text strong>{selectedCourse?.name}</Text>
          <br /><Text type="secondary">学费：</Text><Text strong style={{ color: '#ff4d4f' }}>¥{selectedCourse?.price}</Text>
        </div>
        <Form form={form} layout="vertical">
          <Form.Item name="name" label="姓名" rules={[{ required: true, message: '请输入姓名' }]}>
            <Input placeholder="请输入姓名" />
          </Form.Item>
          <Form.Item name="phone" label="联系电话" rules={[{ required: true, message: '请输入联系电话' }]}>
            <Input placeholder="请输入联系电话" />
          </Form.Item>
          <Form.Item name="idCard" label="身份证号" rules={[{ required: true, message: '请输入身份证号' }]}>
            <Input placeholder="请输入身份证号" />
          </Form.Item>
        </Form>
      </Modal>
    </Layout>
  );
};

export default Component;
