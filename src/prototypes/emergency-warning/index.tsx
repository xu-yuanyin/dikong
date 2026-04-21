/**
 * @name 预警发布
 *
 * 提供预警信息发布功能
 */

import './style.css';
import React, { useState } from 'react';
import {
  Layout, Menu, Card, Row, Col, Button, Tabs, Typography, Tag, Table, Empty, Breadcrumb, Modal, Form, Input, Select, Space, Alert, DatePicker, Radio
} from 'antd';
import {
  AlertOutlined, PhoneOutlined, TeamOutlined, WarningOutlined, FileTextOutlined, ArrowLeftOutlined, EnvironmentOutlined, ClockCircleOutlined, CheckCircleOutlined, SendOutlined, BellOutlined
} from '@ant-design/icons';

const { Sider, Content } = Layout;
const { Title, Text, Paragraph } = Typography;

const SIDE_MENU = [
  { key: 'overview', label: '应急概览', icon: <AlertOutlined />, path: '/prototypes/emergency-service' },
  { key: 'alarm', label: '一键报警', icon: <PhoneOutlined />, path: '/prototypes/emergency-alarm' },
  { key: 'rescue', label: '救援调度', icon: <TeamOutlined />, path: '/prototypes/emergency-rescue' },
  { key: 'warning', label: '预警发布', icon: <WarningOutlined />, path: '/prototypes/emergency-warning' },
  { key: 'record', label: '数据留存', icon: <FileTextOutlined />, path: '/prototypes/emergency-record' }
];

const LEVEL_CONFIG: Record<string, { color: string; text: string }> = {
  red: { color: 'red', text: '红色预警' },
  orange: { color: 'orange', text: '橙色预警' },
  yellow: { color: 'gold', text: '黄色预警' },
  blue: { color: 'blue', text: '蓝色预警' }
};

const TYPE_CONFIG: Record<string, { color: string; text: string }> = {
  weather: { color: 'blue', text: '气象预警' },
  airspace: { color: 'purple', text: '空域预警' },
  device: { color: 'orange', text: '设备预警' },
  security: { color: 'red', text: '安全预警' }
};

const STATUS_CONFIG: Record<string, { color: string; text: string }> = {
  active: { color: 'processing', text: '生效中' },
  expired: { color: 'default', text: '已过期' }
};

const MOCK_DATA = [
  { id: 'W001', type: 'weather', level: 'orange', title: '大风预警', content: '预计今日午后有5-6级大风', area: '全市范围', time: '2024-01-16 08:00', expireTime: '2024-01-16 18:00', status: 'active' },
  { id: 'W002', type: 'airspace', level: 'red', title: '禁飞区临时管控', content: '重要活动期间临时禁飞', area: '城中心区', time: '2024-01-15 06:00', expireTime: '2024-01-15 20:00', status: 'expired' },
  { id: 'W003', type: 'device', level: 'yellow', title: '设备维护通知', content: '部分设备进行例行维护', area: '城东区', time: '2024-01-14 09:00', expireTime: '2024-01-14 17:00', status: 'expired' },
  { id: 'W004', type: 'security', level: 'blue', title: '安全提示', content: '近期发现违规飞行行为，请注意飞行规范', area: '全市范围', time: '2024-01-13 10:00', expireTime: '2024-01-20 10:00', status: 'active' }
];

interface WarningRecord {
  id: string; type: string; level: string; title: string; content: string; area: string; time: string; expireTime: string; status: string;
}

const Component: React.FC = () => {
  const [selectedMenu, setSelectedMenu] = useState('warning');
  const [activeTab, setActiveTab] = useState('all');
  const [publishModalVisible, setPublishModalVisible] = useState(false);
  const [form] = Form.useForm();

  const menuItems = SIDE_MENU.map(item => ({ key: item.key, label: item.label, icon: item.icon }));

  const tabItems = [
    { key: 'all', label: '全部预警' },
    { key: 'active', label: '生效中' },
    { key: 'expired', label: '已过期' }
  ];

  const filteredData = MOCK_DATA.filter(item => activeTab === 'all' || item.status === activeTab);

  const handlePublish = () => {
    form.validateFields().then(() => {
      setPublishModalVisible(false);
      form.resetFields();
    });
  };

  const columns = [
    { title: '预警编号', dataIndex: 'id', key: 'id', width: 100, render: (text: string) => <Text strong style={{ color: '#faad14' }}>{text}</Text> },
    { title: '预警级别', dataIndex: 'level', key: 'level', width: 100, render: (level: string) => <Tag color={LEVEL_CONFIG[level].color}>{LEVEL_CONFIG[level].text}</Tag> },
    { title: '预警类型', dataIndex: 'type', key: 'type', width: 100, render: (type: string) => <Tag color={TYPE_CONFIG[type].color}>{TYPE_CONFIG[type].text}</Tag> },
    { title: '预警标题', dataIndex: 'title', key: 'title', width: 160 },
    { title: '影响区域', dataIndex: 'area', key: 'area', width: 100, render: (text: string) => <><EnvironmentOutlined style={{ marginRight: 4, color: '#1677ff' }} />{text}</> },
    { title: '发布时间', dataIndex: 'time', key: 'time', width: 140 },
    { title: '状态', dataIndex: 'status', key: 'status', width: 80, render: (status: string) => <Tag color={STATUS_CONFIG[status].color}>{STATUS_CONFIG[status].text}</Tag> },
    { title: '操作', key: 'action', width: 80, render: () => <Button type="text" size="small">详情</Button> }
  ];

  return (
    <Layout style={{ minHeight: '100vh', background: '#f5f7fa' }}>
      <Sider width={220} style={{ background: '#fff', borderRight: '1px solid #f0f0f0' }} theme="light">
        <div style={{ padding: '20px 16px', borderBottom: '1px solid #f0f0f0' }}>
          <Title level={4} style={{ margin: 0, color: '#faad14' }}><WarningOutlined style={{ marginRight: 8 }} />低空应急服务</Title>
          <Text type="secondary" style={{ fontSize: 12 }}>应急响应与救援</Text>
        </div>
        <Menu mode="inline" selectedKeys={[selectedMenu]} items={menuItems} onClick={(e) => { const item = SIDE_MENU.find(m => m.key === e.key); if (item?.path) window.location.href = item.path; setSelectedMenu(e.key); }} style={{ borderRight: 0, marginTop: 8 }} />
        <div style={{ padding: 16, borderTop: '1px solid #f0f0f0', marginTop: 'auto' }}>
          <Button block icon={<ArrowLeftOutlined />} href="/prototypes/home">返回</Button>
        </div>
      </Sider>

      <Content style={{ padding: 24 }}>
        <div style={{ maxWidth: 1400 }}>
          <Card style={{ borderRadius: 8, marginBottom: 24 }}>
            <Breadcrumb items={[{ title: <a href="/prototypes/home">门户首页</a> }, { title: <a href="/prototypes/emergency-service">低空应急服务</a> }, { title: '预警发布' }]} />
            <Title level={4} style={{ margin: '8px 0 0' }}>预警发布</Title>
          </Card>

          <Row gutter={[24, 24]}>
            <Col xs={24} lg={8}>
              <Card style={{ borderRadius: 8, textAlign: 'center', padding: 24 }}>
                <BellOutlined style={{ fontSize: 48, color: '#faad14', marginBottom: 16 }} />
                <Title level={4} style={{ marginBottom: 8 }}>发布预警</Title>
                <Paragraph type="secondary" style={{ marginBottom: 24 }}>发布新的预警信息，及时通知相关用户</Paragraph>
                <Button type="primary" icon={<SendOutlined />} onClick={() => setPublishModalVisible(true)} style={{ width: '100%' }}>
                  发布预警
                </Button>
              </Card>

              <Card style={{ borderRadius: 8, marginTop: 24 }} title="预警级别说明">
                <Space direction="vertical" style={{ width: '100%' }}>
                  <div><Tag color="red">红色预警</Tag><Text type="secondary">特别严重</Text></div>
                  <div><Tag color="orange">橙色预警</Tag><Text type="secondary">严重</Text></div>
                  <div><Tag color="gold">黄色预警</Tag><Text type="secondary">较重</Text></div>
                  <div><Tag color="blue">蓝色预警</Tag><Text type="secondary">一般</Text></div>
                </Space>
              </Card>
            </Col>

            <Col xs={24} lg={16}>
              <Card style={{ borderRadius: 8 }}>
                <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Tabs activeKey={activeTab} onChange={setActiveTab} items={tabItems} style={{ marginBottom: -16 }} />
                </div>
                <Table dataSource={filteredData} columns={columns} rowKey="id" pagination={{ pageSize: 10 }} locale={{ emptyText: <Empty description="暂无预警信息" image={Empty.PRESENTED_IMAGE_SIMPLE} /> }} />
              </Card>
            </Col>
          </Row>
        </div>
      </Content>

      <Modal title="发布预警" open={publishModalVisible} onCancel={() => setPublishModalVisible(false)} onOk={handlePublish} okText="确认发布" width={560}>
        <Form form={form} layout="vertical">
          <Form.Item name="level" label="预警级别" rules={[{ required: true, message: '请选择预警级别' }]}>
            <Radio.Group>
              <Radio value="red">红色预警</Radio>
              <Radio value="orange">橙色预警</Radio>
              <Radio value="yellow">黄色预警</Radio>
              <Radio value="blue">蓝色预警</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item name="type" label="预警类型" rules={[{ required: true, message: '请选择预警类型' }]}>
            <Select placeholder="请选择预警类型">
              <Select.Option value="weather">气象预警</Select.Option>
              <Select.Option value="airspace">空域预警</Select.Option>
              <Select.Option value="device">设备预警</Select.Option>
              <Select.Option value="security">安全预警</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item name="title" label="预警标题" rules={[{ required: true, message: '请输入预警标题' }]}>
            <Input placeholder="请输入预警标题" />
          </Form.Item>
          <Form.Item name="area" label="影响区域" rules={[{ required: true, message: '请输入影响区域' }]}>
            <Input placeholder="请输入影响区域" />
          </Form.Item>
          <Form.Item name="content" label="预警内容" rules={[{ required: true, message: '请输入预警内容' }]}>
            <Input.TextArea rows={3} placeholder="请输入预警内容" />
          </Form.Item>
        </Form>
      </Modal>
    </Layout>
  );
};

export default Component;
