/**
 * @name 临时报备
 *
 * 提供临时飞行活动报备服务
 */

import './style.css';
import React, { useState, useMemo } from 'react';
import {
  Layout, Menu, Card, Row, Col, Button, Tabs, Typography, Tag, Input, Table, Empty, Breadcrumb, Descriptions, Drawer, Badge, Form, DatePicker, TimePicker, Select, Modal, message, Space
} from 'antd';
import {
  SafetyCertificateOutlined, FileTextOutlined, ClockCircleOutlined, CheckCircleOutlined, CloseCircleOutlined, ExclamationCircleOutlined, SearchOutlined, RightOutlined, PlusOutlined, ArrowLeftOutlined, EnvironmentOutlined, CalendarOutlined, RocketOutlined, EyeOutlined
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
  approved: { color: 'success', text: '已通过' },
  rejected: { color: 'error', text: '已驳回' },
  expired: { color: 'warning', text: '已过期' }
};

const MOCK_DATA = [
  { id: 'TB202401001', reporter: '张三', phone: '138****1234', aircraft: 'DJI M300', area: '城东区临时空域', date: '2024-01-20', time: '09:00-11:00', status: 'approved', reason: '电力巡检', altitude: '100m' },
  { id: 'TB202401002', reporter: '李四', phone: '139****5678', aircraft: '大疆御3', area: '城西区临时空域', date: '2024-01-21', time: '14:00-16:00', status: 'pending', reason: '航拍摄影', altitude: '80m' },
  { id: 'TB202401003', reporter: '王五', phone: '137****9012', aircraft: '固定翼无人机', area: '工业区临时空域', date: '2024-01-19', time: '10:00-12:00', status: 'rejected', reason: '测绘作业', altitude: '150m' },
  { id: 'TB202401004', reporter: '赵六', phone: '136****3456', aircraft: '直升机', area: '景区临时空域', date: '2024-01-18', time: '08:00-10:00', status: 'expired', reason: '应急救援演练', altitude: '200m' },
  { id: 'TB202401005', reporter: '钱七', phone: '135****7890', aircraft: '多旋翼无人机', area: '城南区临时空域', date: '2024-01-22', time: '15:00-17:00', status: 'pending', reason: '农业植保', altitude: '50m' }
];

interface ReportRecord {
  id: string; reporter: string; phone: string; aircraft: string; area: string; date: string; time: string; status: string; reason: string; altitude: string;
}

const Component: React.FC = () => {
  const [selectedMenu, setSelectedMenu] = useState('temporary');
  const [activeTab, setActiveTab] = useState('all');
  const [searchText, setSearchText] = useState('');
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<ReportRecord | null>(null);
  const [applyModalVisible, setApplyModalVisible] = useState(false);
  const [form] = Form.useForm();

  const statusCounts = useMemo(() => {
    const counts = { all: MOCK_DATA.length, pending: 0, approved: 0, rejected: 0, expired: 0 };
    MOCK_DATA.forEach(item => { counts[item.status as keyof typeof counts]++; });
    return counts;
  }, []);

  const filteredData = useMemo(() => {
    return MOCK_DATA.filter(item => {
      const statusMatch = activeTab === 'all' || item.status === activeTab;
      const searchMatch = !searchText || item.id.toLowerCase().includes(searchText.toLowerCase()) || item.reporter.includes(searchText);
      return statusMatch && searchMatch;
    });
  }, [activeTab, searchText]);

  const menuItems = SIDE_MENU.map(item => ({ key: item.key, label: item.label, icon: item.icon }));
  const tabItems = [
    { key: 'all', label: `全部 (${statusCounts.all})` },
    { key: 'pending', label: `待审核 (${statusCounts.pending})` },
    { key: 'approved', label: `已通过 (${statusCounts.approved})` },
    { key: 'rejected', label: `已驳回 (${statusCounts.rejected})` },
    { key: 'expired', label: `已过期 (${statusCounts.expired})` }
  ];

  const columns = [
    { title: '报备编号', dataIndex: 'id', key: 'id', width: 120, render: (text: string) => <Text strong style={{ color: '#faad14' }}>{text}</Text> },
    { title: '报备人', dataIndex: 'reporter', key: 'reporter', width: 80 },
    { title: '联系电话', dataIndex: 'phone', key: 'phone', width: 110 },
    { title: '飞行器', dataIndex: 'aircraft', key: 'aircraft', width: 120 },
    { title: '飞行区域', dataIndex: 'area', key: 'area', width: 140 },
    { title: '飞行日期', dataIndex: 'date', key: 'date', width: 100 },
    { title: '飞行时段', dataIndex: 'time', key: 'time', width: 100 },
    { title: '状态', dataIndex: 'status', key: 'status', width: 80, render: (status: string) => <Tag color={STATUS_CONFIG[status].color}>{STATUS_CONFIG[status].text}</Tag> },
    { title: '操作', key: 'action', width: 80, render: (_: any, record: ReportRecord) => <Button type="text" size="small" icon={<EyeOutlined />} onClick={() => { setSelectedRecord(record); setDrawerVisible(true); }} /> }
  ];

  const handleApply = () => {
    message.success('报备提交成功！');
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
            <Breadcrumb items={[{ title: <a href="/prototypes/home">门户首页</a> }, { title: <a href="/prototypes/flight-service">低空飞行服务</a> }, { title: <a href="/prototypes/flight-permit">飞行许可办理</a> }, { title: '临时报备' }]} />
            <Title level={4} style={{ margin: '8px 0 0' }}>临时报备</Title>
          </Card>

          <Card style={{ borderRadius: 8 }}>
            <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, alignItems: 'center' }}>
              <Tabs activeKey={activeTab} onChange={setActiveTab} items={tabItems} style={{ marginBottom: -16 }} />
              <Space>
                <Input.Search placeholder="搜索报备编号/报备人" allowClear onSearch={setSearchText} style={{ width: 220 }} prefix={<SearchOutlined />} />
                <Button type="primary" icon={<PlusOutlined />} onClick={() => setApplyModalVisible(true)}>新增报备</Button>
              </Space>
            </div>
            <Table dataSource={filteredData} columns={columns} rowKey="id" pagination={{ pageSize: 10, showTotal: (total) => `共 ${total} 条记录` }} locale={{ emptyText: <Empty description="暂无报备记录" image={Empty.PRESENTED_IMAGE_SIMPLE} /> }} />
          </Card>
        </div>
      </Content>

      <Drawer title="报备详情" placement="right" width={480} open={drawerVisible} onClose={() => setDrawerVisible(false)}>
        {selectedRecord && (
          <Descriptions column={1} bordered size="small">
            <Descriptions.Item label="报备编号">{selectedRecord.id}</Descriptions.Item>
            <Descriptions.Item label="报备人">{selectedRecord.reporter}</Descriptions.Item>
            <Descriptions.Item label="联系电话">{selectedRecord.phone}</Descriptions.Item>
            <Descriptions.Item label="飞行器">{selectedRecord.aircraft}</Descriptions.Item>
            <Descriptions.Item label="飞行区域">{selectedRecord.area}</Descriptions.Item>
            <Descriptions.Item label="飞行高度">{selectedRecord.altitude}</Descriptions.Item>
            <Descriptions.Item label="飞行日期">{selectedRecord.date}</Descriptions.Item>
            <Descriptions.Item label="飞行时段">{selectedRecord.time}</Descriptions.Item>
            <Descriptions.Item label="报备事由">{selectedRecord.reason}</Descriptions.Item>
            <Descriptions.Item label="状态"><Tag color={STATUS_CONFIG[selectedRecord.status].color}>{STATUS_CONFIG[selectedRecord.status].text}</Tag></Descriptions.Item>
          </Descriptions>
        )}
      </Drawer>

      <Modal title="新增临时报备" open={applyModalVisible} onCancel={() => setApplyModalVisible(false)} onOk={handleApply} width={600}>
        <Form form={form} layout="vertical">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="报备人" name="reporter" rules={[{ required: true, message: '请输入报备人姓名' }]}>
                <Input placeholder="请输入报备人姓名" />
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
              <Form.Item label="飞行高度" name="altitude" rules={[{ required: true, message: '请输入飞行高度' }]}>
                <Input placeholder="请输入飞行高度（米）" suffix="米" />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item label="飞行区域" name="area" rules={[{ required: true, message: '请输入飞行区域' }]}>
            <Input placeholder="请输入飞行区域" />
          </Form.Item>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="飞行日期" name="date" rules={[{ required: true, message: '请选择飞行日期' }]}>
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="飞行时段" name="time" rules={[{ required: true, message: '请选择飞行时段' }]}>
                <Select placeholder="请选择飞行时段" options={[{ value: '08-10', label: '08:00-10:00' }, { value: '10-12', label: '10:00-12:00' }, { value: '14-16', label: '14:00-16:00' }, { value: '16-18', label: '16:00-18:00' }]} />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item label="报备事由" name="reason" rules={[{ required: true, message: '请输入报备事由' }]}>
            <Input.TextArea rows={3} placeholder="请输入报备事由" />
          </Form.Item>
        </Form>
      </Modal>
    </Layout>
  );
};

export default Component;
