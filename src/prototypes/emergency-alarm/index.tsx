/**
 * @name 一键报警
 *
 * 提供快速报警功能
 */

import './style.css';
import React, { useState } from 'react';
import {
  Layout, Menu, Card, Row, Col, Button, Typography, Tag, Table, Empty, Breadcrumb, Modal, Form, Input, Select, Space, Statistic, Alert, Timeline
} from 'antd';
import {
  AlertOutlined, PhoneOutlined, TeamOutlined, WarningOutlined, FileTextOutlined, ArrowLeftOutlined, EnvironmentOutlined, ClockCircleOutlined, CheckCircleOutlined, ExclamationCircleOutlined
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

const STATUS_CONFIG: Record<string, { color: string; text: string }> = {
  pending: { color: 'warning', text: '待处理' },
  processing: { color: 'processing', text: '处理中' },
  completed: { color: 'success', text: '已完成' }
};

const TYPE_CONFIG: Record<string, { color: string; text: string }> = {
  emergency: { color: 'red', text: '紧急救援' },
  device: { color: 'orange', text: '设备故障' },
  weather: { color: 'blue', text: '气象异常' },
  other: { color: 'default', text: '其他' }
};

const MOCK_DATA = [
  { id: 'A001', type: 'emergency', location: '城东区A3空域', time: '2024-01-16 14:30', status: 'processing', description: '飞行器失控，请求紧急救援', contact: '张先生 138****1234' },
  { id: 'A002', type: 'device', location: '城西区B2空域', time: '2024-01-15 10:15', status: 'completed', description: '电池异常发热，已安全降落', contact: '李女士 139****5678' },
  { id: 'A003', type: 'weather', location: '城南区C1空域', time: '2024-01-14 16:45', status: 'completed', description: '突遇大风，请求降落指导', contact: '王先生 137****9012' },
  { id: 'A004', type: 'other', location: '城北区D4空域', time: '2024-01-13 09:20', status: 'completed', description: '信号丢失，已找回', contact: '赵女士 136****3456' }
];

interface AlarmRecord {
  id: string; type: string; location: string; time: string; status: string; description: string; contact: string;
}

const Component: React.FC = () => {
  const [selectedMenu, setSelectedMenu] = useState('alarm');
  const [alarmModalVisible, setAlarmModalVisible] = useState(false);
  const [form] = Form.useForm();

  const menuItems = SIDE_MENU.map(item => ({ key: item.key, label: item.label, icon: item.icon }));

  const handleAlarm = () => {
    setAlarmModalVisible(true);
  };

  const handleAlarmSubmit = () => {
    form.validateFields().then(() => {
      setAlarmModalVisible(false);
      form.resetFields();
    });
  };

  const columns = [
    { title: '报警编号', dataIndex: 'id', key: 'id', width: 100, render: (text: string) => <Text strong style={{ color: '#ff4d4f' }}>{text}</Text> },
    { title: '报警类型', dataIndex: 'type', key: 'type', width: 100, render: (type: string) => <Tag color={TYPE_CONFIG[type].color}>{TYPE_CONFIG[type].text}</Tag> },
    { title: '位置', dataIndex: 'location', key: 'location', width: 140, render: (text: string) => <><EnvironmentOutlined style={{ marginRight: 4, color: '#1677ff' }} />{text}</> },
    { title: '报警时间', dataIndex: 'time', key: 'time', width: 140 },
    { title: '状态', dataIndex: 'status', key: 'status', width: 80, render: (status: string) => <Tag color={STATUS_CONFIG[status].color}>{STATUS_CONFIG[status].text}</Tag> },
    { title: '操作', key: 'action', width: 80, render: () => <Button type="text" size="small">详情</Button> }
  ];

  return (
    <Layout style={{ minHeight: '100vh', background: '#f5f7fa' }}>
      <Sider width={220} style={{ background: '#fff', borderRight: '1px solid #f0f0f0' }} theme="light">
        <div style={{ padding: '20px 16px', borderBottom: '1px solid #f0f0f0' }}>
          <Title level={4} style={{ margin: 0, color: '#ff4d4f' }}><AlertOutlined style={{ marginRight: 8 }} />低空应急服务</Title>
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
            <Breadcrumb items={[{ title: <a href="/prototypes/home">门户首页</a> }, { title: <a href="/prototypes/emergency-service">低空应急服务</a> }, { title: '一键报警' }]} />
            <Title level={4} style={{ margin: '8px 0 0' }}>一键报警</Title>
          </Card>

          <Row gutter={[24, 24]}>
            <Col xs={24} lg={8}>
              <Card style={{ borderRadius: 8, textAlign: 'center', padding: 24 }}>
                <div style={{ width: 120, height: 120, borderRadius: '50%', background: 'linear-gradient(135deg, #ff4d4f 0%, #ff7875 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', boxShadow: '0 4px 20px rgba(255,77,79,0.4)' }}>
                  <PhoneOutlined style={{ fontSize: 48, color: '#fff' }} />
                </div>
                <Title level={4} style={{ marginBottom: 8 }}>紧急报警</Title>
                <Paragraph type="secondary" style={{ marginBottom: 24 }}>遇到紧急情况，请立即点击报警按钮</Paragraph>
                <Button type="primary" danger size="large" icon={<AlertOutlined />} onClick={handleAlarm} style={{ width: '100%', height: 48, fontSize: 16 }}>
                  立即报警
                </Button>
              </Card>

              <Card style={{ borderRadius: 8, marginTop: 24 }}>
                <Title level={5}><ExclamationCircleOutlined style={{ marginRight: 8, color: '#faad14' }} />报警须知</Title>
                <ul style={{ paddingLeft: 20, margin: '16px 0 0' }}>
                  <li><Text>请准确描述紧急情况</Text></li>
                  <li><Text>保持通讯畅通</Text></li>
                  <li><Text>等待救援人员联系</Text></li>
                  <li><Text>如情况恶化请再次报警</Text></li>
                </ul>
              </Card>
            </Col>

            <Col xs={24} lg={16}>
              <Card style={{ borderRadius: 8, marginBottom: 24 }}>
                <Row gutter={24}>
                  <Col span={8}><Statistic title="今日报警" value={12} prefix={<AlertOutlined style={{ color: '#ff4d4f' }} />} /></Col>
                  <Col span={8}><Statistic title="处理中" value={3} prefix={<ClockCircleOutlined style={{ color: '#1677ff' }} />} /></Col>
                  <Col span={8}><Statistic title="已完成" value={9} prefix={<CheckCircleOutlined style={{ color: '#52c41a' }} />} /></Col>
                </Row>
              </Card>

              <Card title="报警记录" style={{ borderRadius: 8 }}>
                <Table dataSource={MOCK_DATA} columns={columns} rowKey="id" pagination={{ pageSize: 5 }} locale={{ emptyText: <Empty description="暂无报警记录" image={Empty.PRESENTED_IMAGE_SIMPLE} /> }} />
              </Card>
            </Col>
          </Row>
        </div>
      </Content>

      <Modal title="紧急报警" open={alarmModalVisible} onCancel={() => setAlarmModalVisible(false)} onOk={handleAlarmSubmit} okText="确认报警" okButtonProps={{ danger: true }} width={520}>
        <Alert message="请准确填写报警信息，我们将尽快响应" type="warning" showIcon style={{ marginBottom: 24 }} />
        <Form form={form} layout="vertical">
          <Form.Item name="type" label="报警类型" rules={[{ required: true, message: '请选择报警类型' }]}>
            <Select placeholder="请选择报警类型">
              <Select.Option value="emergency">紧急救援</Select.Option>
              <Select.Option value="device">设备故障</Select.Option>
              <Select.Option value="weather">气象异常</Select.Option>
              <Select.Option value="other">其他</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item name="location" label="当前位置" rules={[{ required: true, message: '请输入当前位置' }]}>
            <Input placeholder="请输入或自动获取位置" prefix={<EnvironmentOutlined />} />
          </Form.Item>
          <Form.Item name="contact" label="联系电话" rules={[{ required: true, message: '请输入联系电话' }]}>
            <Input placeholder="请输入联系电话" />
          </Form.Item>
          <Form.Item name="description" label="情况描述" rules={[{ required: true, message: '请描述紧急情况' }]}>
            <Input.TextArea rows={3} placeholder="请详细描述紧急情况" />
          </Form.Item>
        </Form>
      </Modal>
    </Layout>
  );
};

export default Component;
