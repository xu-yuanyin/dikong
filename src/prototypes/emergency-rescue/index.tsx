/**
 * @name 救援调度
 *
 * 提供救援调度管理功能
 */

import './style.css';
import React, { useState } from 'react';
import {
  Layout, Menu, Card, Row, Col, Button, Tabs, Typography, Tag, Table, Empty, Breadcrumb, Drawer, Timeline, Statistic, Avatar, Space, Progress
} from 'antd';
import {
  AlertOutlined, PhoneOutlined, TeamOutlined, WarningOutlined, FileTextOutlined, ArrowLeftOutlined, EnvironmentOutlined, ClockCircleOutlined, CheckCircleOutlined, UserOutlined, CarOutlined
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
  pending: { color: 'warning', text: '待调度' },
  dispatched: { color: 'processing', text: '已调度' },
  in_progress: { color: 'blue', text: '进行中' },
  completed: { color: 'success', text: '已完成' }
};

const PRIORITY_CONFIG: Record<string, { color: string; text: string }> = {
  high: { color: 'red', text: '紧急' },
  medium: { color: 'orange', text: '一般' },
  low: { color: 'default', text: '普通' }
};

const MOCK_DATA = [
  { id: 'R001', type: '紧急救援', location: '城东区A3空域', time: '2024-01-16 14:30', status: 'in_progress', priority: 'high', team: '救援一组', progress: 60 },
  { id: 'R002', type: '设备故障', location: '城西区B2空域', time: '2024-01-16 13:15', status: 'dispatched', priority: 'medium', team: '技术支援组', progress: 30 },
  { id: 'R003', type: '气象异常', location: '城南区C1空域', time: '2024-01-15 16:45', status: 'completed', priority: 'medium', team: '救援二组', progress: 100 },
  { id: 'R004', type: '紧急救援', location: '城北区D4空域', time: '2024-01-15 10:20', status: 'completed', priority: 'high', team: '救援一组', progress: 100 },
  { id: 'R005', type: '设备故障', location: '中心区E2空域', time: '2024-01-14 09:00', status: 'pending', priority: 'low', team: '-', progress: 0 }
];

interface RescueRecord {
  id: string; type: string; location: string; time: string; status: string; priority: string; team: string; progress: number;
}

const Component: React.FC = () => {
  const [selectedMenu, setSelectedMenu] = useState('rescue');
  const [activeTab, setActiveTab] = useState('all');
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<RescueRecord | null>(null);

  const menuItems = SIDE_MENU.map(item => ({ key: item.key, label: item.label, icon: item.icon }));

  const tabItems = [
    { key: 'all', label: '全部任务' },
    { key: 'pending', label: '待调度' },
    { key: 'in_progress', label: '进行中' },
    { key: 'completed', label: '已完成' }
  ];

  const filteredData = MOCK_DATA.filter(item => activeTab === 'all' || item.status === activeTab);

  const columns = [
    { title: '任务编号', dataIndex: 'id', key: 'id', width: 100, render: (text: string) => <Text strong style={{ color: '#1677ff' }}>{text}</Text> },
    { title: '任务类型', dataIndex: 'type', key: 'type', width: 100 },
    { title: '优先级', dataIndex: 'priority', key: 'priority', width: 80, render: (priority: string) => <Tag color={PRIORITY_CONFIG[priority].color}>{PRIORITY_CONFIG[priority].text}</Tag> },
    { title: '位置', dataIndex: 'location', key: 'location', width: 140, render: (text: string) => <><EnvironmentOutlined style={{ marginRight: 4, color: '#1677ff' }} />{text}</> },
    { title: '救援团队', dataIndex: 'team', key: 'team', width: 100 },
    { title: '状态', dataIndex: 'status', key: 'status', width: 90, render: (status: string) => <Tag color={STATUS_CONFIG[status].color}>{STATUS_CONFIG[status].text}</Tag> },
    { title: '进度', dataIndex: 'progress', key: 'progress', width: 120, render: (progress: number) => <Progress percent={progress} size="small" status={progress === 100 ? 'success' : 'active'} /> },
    { title: '操作', key: 'action', width: 80, render: (_: any, record: RescueRecord) => <Button type="text" size="small" onClick={() => { setSelectedRecord(record); setDrawerVisible(true); }}>详情</Button> }
  ];

  return (
    <Layout style={{ minHeight: '100vh', background: '#f5f7fa' }}>
      <Sider width={220} style={{ background: '#fff', borderRight: '1px solid #f0f0f0' }} theme="light">
        <div style={{ padding: '20px 16px', borderBottom: '1px solid #f0f0f0' }}>
          <Title level={4} style={{ margin: 0, color: '#1677ff' }}><TeamOutlined style={{ marginRight: 8 }} />低空应急服务</Title>
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
            <Breadcrumb items={[{ title: <a href="/prototypes/home">门户首页</a> }, { title: <a href="/prototypes/emergency-service">低空应急服务</a> }, { title: '救援调度' }]} />
            <Title level={4} style={{ margin: '8px 0 0' }}>救援调度</Title>
          </Card>

          <Row gutter={[24, 24]}>
            <Col xs={24} lg={6}>
              <Card style={{ borderRadius: 8 }}>
                <Statistic title="待调度" value={1} valueStyle={{ color: '#faad14' }} prefix={<ClockCircleOutlined />} />
              </Card>
            </Col>
            <Col xs={24} lg={6}>
              <Card style={{ borderRadius: 8 }}>
                <Statistic title="进行中" value={2} valueStyle={{ color: '#1677ff' }} prefix={<CarOutlined />} />
              </Card>
            </Col>
            <Col xs={24} lg={6}>
              <Card style={{ borderRadius: 8 }}>
                <Statistic title="已完成" value={2} valueStyle={{ color: '#52c41a' }} prefix={<CheckCircleOutlined />} />
              </Card>
            </Col>
            <Col xs={24} lg={6}>
              <Card style={{ borderRadius: 8 }}>
                <Statistic title="救援团队" value={3} prefix={<TeamOutlined />} />
              </Card>
            </Col>
          </Row>

          <Card style={{ borderRadius: 8, marginTop: 24 }}>
            <Tabs activeKey={activeTab} onChange={setActiveTab} items={tabItems} style={{ marginBottom: 16 }} />
            <Table dataSource={filteredData} columns={columns} rowKey="id" pagination={{ pageSize: 10 }} locale={{ emptyText: <Empty description="暂无救援任务" image={Empty.PRESENTED_IMAGE_SIMPLE} /> }} />
          </Card>
        </div>
      </Content>

      <Drawer title="任务详情" placement="right" width={560} open={drawerVisible} onClose={() => setDrawerVisible(false)}>
        {selectedRecord && (
          <>
            <div style={{ marginBottom: 16 }}>
              <Tag color={PRIORITY_CONFIG[selectedRecord.priority].color}>{PRIORITY_CONFIG[selectedRecord.priority].text}</Tag>
              <Tag color={STATUS_CONFIG[selectedRecord.status].color}>{STATUS_CONFIG[selectedRecord.status].text}</Tag>
            </div>
            <Title level={4}>{selectedRecord.type} - {selectedRecord.id}</Title>
            <div style={{ marginBottom: 24 }}>
              <Space direction="vertical" style={{ width: '100%' }}>
                <Text><EnvironmentOutlined style={{ marginRight: 8 }} />位置：{selectedRecord.location}</Text>
                <Text><ClockCircleOutlined style={{ marginRight: 8 }} />时间：{selectedRecord.time}</Text>
                <Text><TeamOutlined style={{ marginRight: 8 }} />救援团队：{selectedRecord.team}</Text>
              </Space>
            </div>
            <Title level={5}>任务进度</Title>
            <Progress percent={selectedRecord.progress} status={selectedRecord.progress === 100 ? 'success' : 'active'} />
            <div style={{ marginTop: 24 }}>
              <Title level={5}>处理时间线</Title>
              <Timeline items={[
                { children: '任务创建', color: 'blue' },
                { children: '已分配救援团队', color: selectedRecord.status !== 'pending' ? 'green' : 'gray' },
                { children: '救援进行中', color: selectedRecord.status === 'in_progress' ? 'blue' : selectedRecord.status === 'completed' ? 'green' : 'gray' },
                { children: '任务完成', color: selectedRecord.status === 'completed' ? 'green' : 'gray' }
              ]} />
            </div>
          </>
        )}
      </Drawer>
    </Layout>
  );
};

export default Component;
