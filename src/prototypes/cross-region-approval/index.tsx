/**
 * @name 跨区域审批
 *
 * 提供跨区域飞行活动审批服务
 */

import './style.css';
import React, { useState, useMemo } from 'react';
import {
  Layout, Menu, Card, Row, Col, Button, Tabs, Typography, Tag, Input, Table, Empty, Breadcrumb, Descriptions, Drawer, Form, DatePicker, Select, Modal, message, Space, Steps, Timeline
} from 'antd';
import {
  SafetyCertificateOutlined, FileTextOutlined, ClockCircleOutlined, CheckCircleOutlined, CloseCircleOutlined, ExclamationCircleOutlined, SearchOutlined, PlusOutlined, ArrowLeftOutlined, EnvironmentOutlined, RocketOutlined, EyeOutlined
} from '@ant-design/icons';

const { Sider, Content } = Layout;
const { Title, Text } = Typography;

const SIDE_MENU = [
  { key: 'list', label: '许可列表', icon: <FileTextOutlined />, path: '/prototypes/flight-permit' },
  { key: 'temporary', label: '临时报备', icon: <ClockCircleOutlined />, path: '/prototypes/temporary-report' },
  { key: 'cross-region', label: '跨区域审批', icon: <EnvironmentOutlined />, path: '/prototypes/cross-region-approval' },
  { key: 'guide', label: '办理指南', icon: <SafetyCertificateOutlined />, path: '/prototypes/permit-guide' }
];

const STATUS_CONFIG: Record<string, { color: string; text: string }> = {
  pending: { color: 'processing', text: '待审核' },
  reviewing: { color: 'cyan', text: '审核中' },
  approved: { color: 'success', text: '已通过' },
  rejected: { color: 'error', text: '已驳回' },
  expired: { color: 'warning', text: '已过期' }
};

const MOCK_DATA = [
  { id: 'CR202401001', applicant: '张三', phone: '138****1234', aircraft: 'DJI M300', route: '城东区 → 城西区', regions: '城东区、城西区', date: '2024-01-20', status: 'approved', reason: '物流配送', distance: '25km' },
  { id: 'CR202401002', applicant: '李四', phone: '139****5678', aircraft: '固定翼无人机', route: '城南区 → 工业区', regions: '城南区、工业区', date: '2024-01-21', status: 'reviewing', reason: '测绘作业', distance: '18km' },
  { id: 'CR202401003', applicant: '王五', phone: '137****9012', aircraft: '直升机', route: '城东区 → 景区', regions: '城东区、景区', date: '2024-01-19', status: 'pending', reason: '应急救援', distance: '30km' },
  { id: 'CR202401004', applicant: '赵六', phone: '136****3456', aircraft: '多旋翼无人机', route: '工业区 → 城北区', regions: '工业区、城北区', date: '2024-01-18', status: 'rejected', reason: '设备巡检', distance: '15km' },
  { id: 'CR202401005', applicant: '钱七', phone: '135****7890', aircraft: '大疆御3', route: '城西区 → 城南区', regions: '城西区、城南区', date: '2024-01-17', status: 'expired', reason: '航拍摄影', distance: '20km' }
];

interface ApprovalRecord {
  id: string; applicant: string; phone: string; aircraft: string; route: string; regions: string; date: string; status: string; reason: string; distance: string;
}

const Component: React.FC = () => {
  const [selectedMenu, setSelectedMenu] = useState('cross-region');
  const [activeTab, setActiveTab] = useState('all');
  const [searchText, setSearchText] = useState('');
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<ApprovalRecord | null>(null);
  const [applyModalVisible, setApplyModalVisible] = useState(false);
  const [form] = Form.useForm();

  const statusCounts = useMemo(() => {
    const counts = { all: MOCK_DATA.length, pending: 0, reviewing: 0, approved: 0, rejected: 0, expired: 0 };
    MOCK_DATA.forEach(item => { counts[item.status as keyof typeof counts]++; });
    return counts;
  }, []);

  const filteredData = useMemo(() => {
    return MOCK_DATA.filter(item => {
      const statusMatch = activeTab === 'all' || item.status === activeTab;
      const searchMatch = !searchText || item.id.toLowerCase().includes(searchText.toLowerCase()) || item.applicant.includes(searchText);
      return statusMatch && searchMatch;
    });
  }, [activeTab, searchText]);

  const menuItems = SIDE_MENU.map(item => ({ key: item.key, label: item.label, icon: item.icon }));
  const tabItems = [
    { key: 'all', label: `全部 (${statusCounts.all})` },
    { key: 'pending', label: `待审核 (${statusCounts.pending})` },
    { key: 'reviewing', label: `审核中 (${statusCounts.reviewing})` },
    { key: 'approved', label: `已通过 (${statusCounts.approved})` },
    { key: 'rejected', label: `已驳回 (${statusCounts.rejected})` }
  ];

  const columns = [
    { title: '审批编号', dataIndex: 'id', key: 'id', width: 120, render: (text: string) => <Text strong style={{ color: '#13c2c2' }}>{text}</Text> },
    { title: '申请人', dataIndex: 'applicant', key: 'applicant', width: 80 },
    { title: '联系电话', dataIndex: 'phone', key: 'phone', width: 110 },
    { title: '飞行器', dataIndex: 'aircraft', key: 'aircraft', width: 120 },
    { title: '航线', dataIndex: 'route', key: 'route', width: 150 },
    { title: '跨越区域', dataIndex: 'regions', key: 'regions', width: 140 },
    { title: '申请日期', dataIndex: 'date', key: 'date', width: 100 },
    { title: '状态', dataIndex: 'status', key: 'status', width: 80, render: (status: string) => <Tag color={STATUS_CONFIG[status].color}>{STATUS_CONFIG[status].text}</Tag> },
    { title: '操作', key: 'action', width: 80, render: (_: any, record: ApprovalRecord) => <Button type="text" size="small" icon={<EyeOutlined />} onClick={() => { setSelectedRecord(record); setDrawerVisible(true); }} /> }
  ];

  const handleApply = () => {
    message.success('申请提交成功！');
    setApplyModalVisible(false);
    form.resetFields();
  };

  return (
    <Layout style={{ minHeight: '100vh', background: '#f5f7fa' }}>
      <Sider width={220} style={{ background: '#fff', borderRight: '1px solid #f0f0f0' }} theme="light">
        <div style={{ padding: '20px 16px', borderBottom: '1px solid #f0f0f0' }}>
          <Title level={4} style={{ margin: 0, color: '#1677ff' }}><SafetyCertificateOutlined style={{ marginRight: 8 }} />飞行许可办理</Title>
          <Text type="secondary" style={{ fontSize: 12 }}>在线办理飞行许可</Text>
        </div>
        <Menu mode="inline" selectedKeys={[selectedMenu]} items={menuItems} onClick={(e) => { const item = SIDE_MENU.find(m => m.key === e.key); if (item?.path) window.location.href = item.path; setSelectedMenu(e.key); }} style={{ borderRight: 0, marginTop: 8 }} />
        <div style={{ padding: 16, borderTop: '1px solid #f0f0f0', marginTop: 'auto' }}>
          <Button block icon={<ArrowLeftOutlined />} href="/prototypes/flight-service">返回</Button>
        </div>
      </Sider>

      <Content style={{ padding: 24 }}>
        <div style={{ maxWidth: 1400 }}>
          <Card style={{ borderRadius: 8, marginBottom: 24 }}>
            <Breadcrumb items={[{ title: <a href="/prototypes/home">门户首页</a> }, { title: <a href="/prototypes/flight-service">低空飞行服务</a> }, { title: <a href="/prototypes/flight-permit">飞行许可办理</a> }, { title: '跨区域审批' }]} />
            <Title level={4} style={{ margin: '8px 0 0' }}>跨区域审批</Title>
          </Card>

          <Card style={{ borderRadius: 8 }}>
            <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, alignItems: 'center' }}>
              <Tabs activeKey={activeTab} onChange={setActiveTab} items={tabItems} style={{ marginBottom: -16 }} />
              <Space>
                <Input.Search placeholder="搜索审批编号/申请人" allowClear onSearch={setSearchText} style={{ width: 220 }} prefix={<SearchOutlined />} />
                <Button type="primary" icon={<PlusOutlined />} onClick={() => setApplyModalVisible(true)}>新增申请</Button>
              </Space>
            </div>
            <Table dataSource={filteredData} columns={columns} rowKey="id" pagination={{ pageSize: 10, showTotal: (total) => `共 ${total} 条记录` }} locale={{ emptyText: <Empty description="暂无审批记录" image={Empty.PRESENTED_IMAGE_SIMPLE} /> }} />
          </Card>
        </div>
      </Content>

      <Drawer title="审批详情" placement="right" width={480} open={drawerVisible} onClose={() => setDrawerVisible(false)}>
        {selectedRecord && (
          <>
            <Descriptions column={1} bordered size="small">
              <Descriptions.Item label="审批编号">{selectedRecord.id}</Descriptions.Item>
              <Descriptions.Item label="申请人">{selectedRecord.applicant}</Descriptions.Item>
              <Descriptions.Item label="联系电话">{selectedRecord.phone}</Descriptions.Item>
              <Descriptions.Item label="飞行器">{selectedRecord.aircraft}</Descriptions.Item>
              <Descriptions.Item label="航线">{selectedRecord.route}</Descriptions.Item>
              <Descriptions.Item label="跨越区域">{selectedRecord.regions}</Descriptions.Item>
              <Descriptions.Item label="航程距离">{selectedRecord.distance}</Descriptions.Item>
              <Descriptions.Item label="申请日期">{selectedRecord.date}</Descriptions.Item>
              <Descriptions.Item label="申请事由">{selectedRecord.reason}</Descriptions.Item>
              <Descriptions.Item label="状态"><Tag color={STATUS_CONFIG[selectedRecord.status].color}>{STATUS_CONFIG[selectedRecord.status].text}</Tag></Descriptions.Item>
            </Descriptions>
            <div style={{ marginTop: 24 }}>
              <Title level={5}>审批流程</Title>
              <Timeline items={[{ children: '提交申请', color: 'green' }, { children: '区域一审核', color: 'green' }, { children: '区域二审核', color: selectedRecord.status === 'approved' ? 'green' : 'blue' }, { children: '审批完成', color: selectedRecord.status === 'approved' ? 'green' : 'gray' }]} />
            </div>
          </>
        )}
      </Drawer>

      <Modal title="新增跨区域审批申请" open={applyModalVisible} onCancel={() => setApplyModalVisible(false)} onOk={handleApply} width={650}>
        <Form form={form} layout="vertical">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="申请人" name="applicant" rules={[{ required: true, message: '请输入申请人姓名' }]}>
                <Input placeholder="请输入申请人姓名" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="联系电话" name="phone" rules={[{ required: true, message: '请输入联系电话' }]}>
                <Input placeholder="请输入联系电话" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="飞行器型号" name="aircraft" rules={[{ required: true, message: '请选择飞行器型号' }]}>
                <Select placeholder="请选择飞行器型号" options={[{ value: 'dji-m300', label: 'DJI M300' }, { value: 'dji-mavic3', label: '大疆御3' }, { value: 'fixed-wing', label: '固定翼无人机' }, { value: 'helicopter', label: '直升机' }]} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="航程距离" name="distance" rules={[{ required: true, message: '请输入航程距离' }]}>
                <Input placeholder="请输入航程距离" suffix="公里" />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item label="起飞地点" name="origin" rules={[{ required: true, message: '请输入起飞地点' }]}>
            <Input placeholder="请输入起飞地点" />
          </Form.Item>
          <Form.Item label="降落地点" name="destination" rules={[{ required: true, message: '请输入降落地点' }]}>
            <Input placeholder="请输入降落地点" />
          </Form.Item>
          <Form.Item label="跨越区域" name="regions" rules={[{ required: true, message: '请选择跨越区域' }]}>
            <Select mode="multiple" placeholder="请选择跨越区域" options={[{ value: 'east', label: '城东区' }, { value: 'west', label: '城西区' }, { value: 'south', label: '城南区' }, { value: 'north', label: '城北区' }, { value: 'industrial', label: '工业区' }, { value: 'scenic', label: '景区' }]} />
          </Form.Item>
          <Form.Item label="飞行日期" name="date" rules={[{ required: true, message: '请选择飞行日期' }]}>
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item label="申请事由" name="reason" rules={[{ required: true, message: '请输入申请事由' }]}>
            <Input.TextArea rows={3} placeholder="请输入申请事由" />
          </Form.Item>
        </Form>
      </Modal>
    </Layout>
  );
};

export default Component;
