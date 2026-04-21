/**
 * @name 意见反馈
 *
 * 提供用户意见反馈渠道
 */

import './style.css';
import React, { useState } from 'react';
import {
  Layout, Menu, Card, Row, Col, Button, Typography, Tag, Table, Empty, Breadcrumb, Form, Input, Select, Space, Result, Timeline, Upload, message
} from 'antd';
import {
  HeartOutlined, CompassOutlined, BookOutlined, SafetyCertificateOutlined, ToolOutlined, MessageOutlined, ArrowLeftOutlined, CheckCircleOutlined, ClockCircleOutlined, UploadOutlined, SendOutlined
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

const FEEDBACK_TYPES = [
  { value: 'suggestion', label: '功能建议' },
  { value: 'problem', label: '问题反馈' },
  { value: 'complaint', label: '投诉建议' },
  { value: 'other', label: '其他' }
];

const STATUS_CONFIG: Record<string, { color: string; text: string }> = {
  pending: { color: 'warning', text: '待处理' },
  processing: { color: 'processing', text: '处理中' },
  completed: { color: 'success', text: '已完成' }
};

const MOCK_HISTORY = [
  { id: 'F001', type: 'suggestion', title: '建议增加夜间飞行服务', content: '希望平台能增加夜间飞行时段的预约功能', time: '2024-01-15 14:30', status: 'completed', reply: '感谢您的建议，我们已将此功能纳入开发计划。' },
  { id: 'F002', type: 'problem', title: '预约页面加载缓慢', content: '使用预约功能时页面加载较慢', time: '2024-01-14 10:15', status: 'processing', reply: '' },
  { id: 'F003', type: 'complaint', title: '客服响应不及时', content: '咨询客服时等待时间过长', time: '2024-01-13 09:20', status: 'completed', reply: '非常抱歉给您带来不便，我们已优化客服响应流程。' }
];

interface FeedbackRecord {
  id: string; type: string; title: string; content: string; time: string; status: string; reply: string;
}

const Component: React.FC = () => {
  const [selectedMenu, setSelectedMenu] = useState('feedback');
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [form] = Form.useForm();

  const menuItems = SIDE_MENU.map(item => ({ key: item.key, label: item.label, icon: item.icon }));

  const handleSubmit = () => {
    form.validateFields().then(() => {
      setSubmitSuccess(true);
      setTimeout(() => {
        setSubmitSuccess(false);
        form.resetFields();
      }, 2000);
    });
  };

  const columns = [
    { title: '反馈编号', dataIndex: 'id', key: 'id', width: 100, render: (text: string) => <Text strong style={{ color: '#1677ff' }}>{text}</Text> },
    { title: '类型', dataIndex: 'type', key: 'type', width: 100, render: (type: string) => <Tag>{FEEDBACK_TYPES.find(t => t.value === type)?.label}</Tag> },
    { title: '标题', dataIndex: 'title', key: 'title', width: 200 },
    { title: '提交时间', dataIndex: 'time', key: 'time', width: 160 },
    { title: '状态', dataIndex: 'status', key: 'status', width: 100, render: (status: string) => <Tag color={STATUS_CONFIG[status].color}>{STATUS_CONFIG[status].text}</Tag> },
    { title: '操作', key: 'action', width: 80, render: () => <Button type="text" size="small">详情</Button> }
  ];

  return (
    <Layout style={{ minHeight: '100vh', background: '#f5f7fa' }}>
      <Sider width={220} style={{ background: '#fff', borderRight: '1px solid #f0f0f0' }} theme="light">
        <div style={{ padding: '20px 16px', borderBottom: '1px solid #f0f0f0' }}>
          <Title level={4} style={{ margin: 0, color: '#1677ff' }}><MessageOutlined style={{ marginRight: 8 }} />低空便民服务</Title>
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
            <Breadcrumb items={[{ title: <a href="/prototypes/home">门户首页</a> }, { title: <a href="/prototypes/public-service">低空便民服务</a> }, { title: '意见反馈' }]} />
            <Title level={4} style={{ margin: '8px 0 0' }}>意见反馈</Title>
          </Card>

          <Row gutter={[24, 24]}>
            <Col xs={24} lg={10}>
              <Card style={{ borderRadius: 8 }}>
                {submitSuccess ? (
                  <Result status="success" title="提交成功" subTitle="感谢您的反馈，我们会尽快处理" icon={<CheckCircleOutlined style={{ color: '#52c41a' }} />} />
                ) : (
                  <>
                    <Title level={5} style={{ marginBottom: 16 }}>提交反馈</Title>
                    <Form form={form} layout="vertical">
                      <Form.Item name="type" label="反馈类型" rules={[{ required: true, message: '请选择反馈类型' }]}>
                        <Select placeholder="请选择反馈类型" options={FEEDBACK_TYPES} />
                      </Form.Item>
                      <Form.Item name="title" label="标题" rules={[{ required: true, message: '请输入标题' }]}>
                        <Input placeholder="请简要描述您的反馈" />
                      </Form.Item>
                      <Form.Item name="content" label="详细内容" rules={[{ required: true, message: '请输入详细内容' }]}>
                        <Input.TextArea rows={4} placeholder="请详细描述您的反馈内容" />
                      </Form.Item>
                      <Form.Item name="contact" label="联系方式" rules={[{ required: true, message: '请输入联系方式' }]}>
                        <Input placeholder="请输入手机号或邮箱" />
                      </Form.Item>
                      <Form.Item label="附件上传">
                        <Upload><Button icon={<UploadOutlined />}>上传图片</Button></Upload>
                      </Form.Item>
                      <Form.Item>
                        <Button type="primary" icon={<SendOutlined />} onClick={handleSubmit} style={{ width: '100%' }}>提交反馈</Button>
                      </Form.Item>
                    </Form>
                  </>
                )}
              </Card>
            </Col>

            <Col xs={24} lg={14}>
              <Card style={{ borderRadius: 8 }} title="反馈记录">
                <Table dataSource={MOCK_HISTORY} columns={columns} rowKey="id" pagination={{ pageSize: 5 }} locale={{ emptyText: <Empty description="暂无反馈记录" image={Empty.PRESENTED_IMAGE_SIMPLE} /> }} />
              </Card>

              <Card style={{ borderRadius: 8, marginTop: 24 }} title="处理流程">
                <Timeline items={[
                  { children: '提交反馈', color: 'green' },
                  { children: '客服受理', color: 'blue' },
                  { children: '问题处理', color: 'blue' },
                  { children: '结果反馈', color: 'gray' }
                ]} />
                <Paragraph type="secondary" style={{ marginTop: 16 }}>
                  我们会在1-3个工作日内处理您的反馈，并通过您提供的联系方式回复处理结果。
                </Paragraph>
              </Card>
            </Col>
          </Row>
        </div>
      </Content>
    </Layout>
  );
};

export default Component;
