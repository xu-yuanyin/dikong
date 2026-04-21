/**
 * @name 维修保险
 *
 * 提供无人机维修和保险服务信息展示
 */

import './style.css';
import React, { useState } from 'react';
import {
  Layout, Menu, Card, Row, Col, Button, Typography, Tag, List, Empty, Breadcrumb, Tabs, Space, Avatar, Modal, Form, Input, Select, Rate
} from 'antd';
import {
  HeartOutlined, CompassOutlined, BookOutlined, SafetyCertificateOutlined, ToolOutlined, MessageOutlined, ArrowLeftOutlined, PhoneOutlined, EnvironmentOutlined, StarOutlined, SafetyOutlined, CheckCircleOutlined
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

const REPAIR_SERVICES = [
  { id: 1, name: '蓝天无人机维修中心', location: '城东区', phone: '400-123-4567', rating: 4.8, services: ['整机维修', '配件更换', '系统升级'], certified: true },
  { id: 2, name: '翼翔维修服务站', location: '城西区', phone: '400-234-5678', rating: 4.6, services: ['电池检测', '电机维修', '飞控调试'], certified: true },
  { id: 3, name: '云端技术服务部', location: '城南区', phone: '400-345-6789', rating: 4.5, services: ['机身修复', '相机维修', '遥控器维修'], certified: false }
];

const INSURANCE_PRODUCTS = [
  { id: 1, name: '无人机基础险', company: '平安保险', price: 299, coverage: '机身损失、第三者责任', period: '1年', features: ['快速理赔', '全国联保', '7x24服务'] },
  { id: 2, name: '无人机综合险', company: '人保财险', price: 599, coverage: '机身损失、第三者责任、飞手意外', period: '1年', features: ['快速理赔', '全国联保', '法律援助', '医疗补偿'] },
  { id: 3, name: '无人机专业险', company: '太平洋保险', price: 999, coverage: '全面保障、设备损失、运营中断', period: '1年', features: ['快速理赔', '专属客服', '设备租赁', '运营补偿'] }
];

const Component: React.FC = () => {
  const [selectedMenu, setSelectedMenu] = useState('maintenance');
  const [activeTab, setActiveTab] = useState('repair');
  const [consultModalVisible, setConsultModalVisible] = useState(false);
  const [form] = Form.useForm();

  const menuItems = SIDE_MENU.map(item => ({ key: item.key, label: item.label, icon: item.icon }));

  const handleConsult = () => {
    setConsultModalVisible(true);
  };

  const handleConsultSubmit = () => {
    form.validateFields().then(() => {
      setConsultModalVisible(false);
      form.resetFields();
    });
  };

  return (
    <Layout style={{ minHeight: '100vh', background: '#f5f7fa' }}>
      <Sider width={220} style={{ background: '#fff', borderRight: '1px solid #f0f0f0' }} theme="light">
        <div style={{ padding: '20px 16px', borderBottom: '1px solid #f0f0f0' }}>
          <Title level={4} style={{ margin: 0, color: '#fa8c16' }}><ToolOutlined style={{ marginRight: 8 }} />低空便民服务</Title>
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
            <Breadcrumb items={[{ title: <a href="/prototypes/home">门户首页</a> }, { title: <a href="/prototypes/public-service">低空便民服务</a> }, { title: '维修保险' }]} />
            <Title level={4} style={{ margin: '8px 0 0' }}>维修保险</Title>
          </Card>

          <Card style={{ borderRadius: 8 }}>
            <Tabs activeKey={activeTab} onChange={setActiveTab} items={[{ key: 'repair', label: '维修服务' }, { key: 'insurance', label: '保险服务' }]} />
            {activeTab === 'repair' && (
              <List
                grid={{ gutter: 24, xs: 1, sm: 2, lg: 3 }}
                dataSource={REPAIR_SERVICES}
                renderItem={(item) => (
                  <List.Item>
                    <Card style={{ borderRadius: 8 }} actions={[<Button type="primary" onClick={handleConsult}>在线咨询</Button>, <Button>预约服务</Button>]}>
                      <Card.Meta
                        avatar={<Avatar style={{ background: '#fa8c16' }} icon={<ToolOutlined />} />}
                        title={<>{item.name}{item.certified && <Tag color="green" style={{ marginLeft: 8 }}>认证</Tag>}</>}
                        description={
                          <div>
                            <div style={{ marginBottom: 8 }}><EnvironmentOutlined style={{ marginRight: 4 }} />{item.location}</div>
                            <div style={{ marginBottom: 8 }}><PhoneOutlined style={{ marginRight: 4 }} />{item.phone}</div>
                            <div style={{ marginBottom: 8 }}>
                              {item.services.map((s, i) => <Tag key={i} style={{ marginBottom: 4 }}>{s}</Tag>)}
                            </div>
                            <Space><StarOutlined style={{ color: '#faad14' }} />{item.rating}</Space>
                          </div>
                        }
                      />
                    </Card>
                  </List.Item>
                )}
              />
            )}
            {activeTab === 'insurance' && (
              <List
                dataSource={INSURANCE_PRODUCTS}
                renderItem={(item) => (
                  <List.Item actions={[<Text strong style={{ fontSize: 18, color: '#ff4d4f' }}>¥{item.price}/年</Text>, <Button type="primary" onClick={handleConsult}>立即投保</Button>]}>
                    <List.Item.Meta
                      avatar={<Avatar style={{ background: '#1677ff' }} icon={<SafetyOutlined />} />}
                      title={<><Text strong>{item.name}</Text><Tag color="blue" style={{ marginLeft: 8 }}>{item.company}</Tag></>}
                      description={
                        <div>
                          <div style={{ marginBottom: 8 }}><Text type="secondary">保障范围：</Text>{item.coverage}</div>
                          <div style={{ marginBottom: 8 }}>
                            {item.features.map((f, i) => <><CheckCircleOutlined style={{ color: '#52c41a', marginRight: 4 }} key={i} />{f}</>)}
                          </div>
                        </div>
                      }
                    />
                  </List.Item>
                )}
              />
            )}
          </Card>
        </div>
      </Content>

      <Modal title="在线咨询" open={consultModalVisible} onCancel={() => setConsultModalVisible(false)} onOk={handleConsultSubmit} okText="提交咨询" width={480}>
        <Form form={form} layout="vertical">
          <Form.Item name="type" label="咨询类型" rules={[{ required: true, message: '请选择咨询类型' }]}>
            <Select placeholder="请选择咨询类型">
              <Select.Option value="repair">维修服务</Select.Option>
              <Select.Option value="insurance">保险服务</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item name="name" label="姓名" rules={[{ required: true, message: '请输入姓名' }]}>
            <Input placeholder="请输入姓名" />
          </Form.Item>
          <Form.Item name="phone" label="联系电话" rules={[{ required: true, message: '请输入联系电话' }]}>
            <Input placeholder="请输入联系电话" />
          </Form.Item>
          <Form.Item name="content" label="咨询内容" rules={[{ required: true, message: '请输入咨询内容' }]}>
            <Input.TextArea rows={3} placeholder="请描述您的需求" />
          </Form.Item>
        </Form>
      </Modal>
    </Layout>
  );
};

export default Component;
