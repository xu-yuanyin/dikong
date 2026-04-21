/**
 * @name 临时管制
 *
 * 展示当前生效的临时空域管制信息
 */

import './style.css';
import React, { useState, useMemo } from 'react';
import {
  Layout, Menu, Card, Tabs, Typography, Tag, Input, Table, Empty, Breadcrumb, Descriptions, Drawer, Alert, Badge, Timeline
} from 'antd';
import {
  EnvironmentOutlined, SearchOutlined, CompassOutlined, GlobalOutlined, CloseCircleOutlined, ClockCircleOutlined, WarningOutlined, CheckCircleOutlined
} from '@ant-design/icons';

const { Sider, Content } = Layout;
const { Title, Text } = Typography;

const SIDE_MENU = [
  { key: 'overview', label: '空域概览', icon: <GlobalOutlined />, path: '/prototypes/airspace-query' },
  { key: 'designated', label: '空域划设', icon: <EnvironmentOutlined />, path: '/prototypes/airspace-designated' },
  { key: 'routes', label: '航路航线', icon: <CompassOutlined />, path: '/prototypes/flight-routes' },
  { key: 'prohibited', label: '禁飞区域', icon: <CloseCircleOutlined />, path: '/prototypes/prohibited-areas' },
  { key: 'restricted', label: '限飞区域', icon: <EnvironmentOutlined />, path: '/prototypes/restricted-areas' },
  { key: 'temporary', label: '临时管制', icon: <ClockCircleOutlined />, path: '/prototypes/temporary-control' }
];

const STATUS_CONFIG: Record<string, { color: string; text: string }> = {
  active: { color: 'processing', text: '生效中' },
  upcoming: { color: 'warning', text: '即将生效' },
  expired: { color: 'default', text: '已过期' }
};

const MOCK_DATA = [
  { id: 'T001', name: '春节期间空域临时管制', status: 'active', startDate: '2024-02-09', endDate: '2024-02-17', area: '城东区、城西区部分空域', altitude: '0-300m', reason: '春节假期安全保障', urgent: true, description: '春节期间为保障公共安全，对城东区、城西区部分空域实施临时管制，请提前申请飞行许可。' },
  { id: 'T002', name: '重大活动期间临时禁飞', status: 'active', startDate: '2024-01-25', endDate: '2024-01-26', area: '市中心区域', altitude: '0-500m', reason: '重大活动安保', urgent: true, description: '重大活动期间，市中心区域临时禁飞，请勿违规飞行。' },
  { id: 'T003', name: '马拉松赛事临时管制', status: 'upcoming', startDate: '2024-03-15', endDate: '2024-03-15', area: '赛事沿线区域', altitude: '0-200m', reason: '马拉松赛事保障', urgent: false, description: '马拉松赛事期间，赛事沿线区域临时管制。' },
  { id: 'T004', name: '国庆阅兵临时管制', status: 'upcoming', startDate: '2024-10-01', endDate: '2024-10-01', area: '全市范围', altitude: '0-500m', reason: '国庆活动安保', urgent: false, description: '国庆阅兵期间，全市范围临时管制。' },
  { id: 'T005', name: '元旦跨年活动管制', status: 'expired', startDate: '2024-01-01', endDate: '2024-01-01', area: '商业中心区域', altitude: '0-150m', reason: '跨年活动安保', urgent: false, description: '元旦跨年活动期间临时管制已结束。' }
];

interface TemporaryRecord {
  id: string; name: string; status: string; startDate: string; endDate: string; area: string; altitude: string; reason: string; urgent: boolean; description: string;
}

const Component: React.FC = () => {
  const [selectedMenu, setSelectedMenu] = useState('temporary');
  const [activeTab, setActiveTab] = useState('all');
  const [searchText, setSearchText] = useState('');
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<TemporaryRecord | null>(null);

  const statusCounts = useMemo(() => {
    const counts = { all: MOCK_DATA.length, active: 0, upcoming: 0, expired: 0 };
    MOCK_DATA.forEach(item => { counts[item.status as keyof typeof counts]++; });
    return counts;
  }, []);

  const filteredData = useMemo(() => {
    return MOCK_DATA.filter(item => {
      const statusMatch = activeTab === 'all' || item.status === activeTab;
      const searchMatch = !searchText || item.name.toLowerCase().includes(searchText.toLowerCase());
      return statusMatch && searchMatch;
    });
  }, [activeTab, searchText]);

  const menuItems = SIDE_MENU.map(item => ({ key: item.key, label: item.label, icon: item.icon }));
  const tabItems = [
    { key: 'all', label: `全部 (${statusCounts.all})` },
    { key: 'active', label: `生效中 (${statusCounts.active})` },
    { key: 'upcoming', label: `即将生效 (${statusCounts.upcoming})` },
    { key: 'expired', label: `已过期 (${statusCounts.expired})` }
  ];

  const columns = [
    { title: '管制编号', dataIndex: 'id', key: 'id', width: 80, render: (text: string) => <Text strong style={{ color: '#722ed1' }}>{text}</Text> },
    { title: '管制名称', dataIndex: 'name', key: 'name', width: 200, render: (text: string, record: TemporaryRecord) => <>{record.urgent && <Tag color="error" style={{ marginRight: 4 }}>紧急</Tag>}{text}</> },
    { title: '管制时间', key: 'time', width: 180, render: (_: any, record: TemporaryRecord) => <>{record.startDate} 至 {record.endDate}</> },
    { title: '管制区域', dataIndex: 'area', key: 'area', width: 150, ellipsis: true },
    { title: '高度范围', dataIndex: 'altitude', key: 'altitude', width: 80 },
    { title: '状态', dataIndex: 'status', key: 'status', width: 100, render: (status: string) => <Tag color={STATUS_CONFIG[status].color}>{STATUS_CONFIG[status].text}</Tag> },
    { title: '操作', key: 'action', width: 80, render: (_: any, record: TemporaryRecord) => <EnvironmentOutlined style={{ cursor: 'pointer', color: '#1677ff' }} onClick={() => { setSelectedRecord(record); setDrawerVisible(true); }} /> }
  ];

  return (
    <Layout style={{ minHeight: '100vh', background: '#f5f7fa' }}>
      <Sider width={220} style={{ background: '#fff', borderRight: '1px solid #f0f0f0' }} theme="light">
        <div style={{ padding: '20px 16px', borderBottom: '1px solid #f0f0f0' }}>
          <Title level={4} style={{ margin: 0, color: '#722ed1' }}><EnvironmentOutlined style={{ marginRight: 8 }} />空域信息查询</Title>
          <Text type="secondary" style={{ fontSize: 12 }}>实时查询空域信息</Text>
        </div>
        <Menu mode="inline" selectedKeys={[selectedMenu]} items={menuItems} onClick={(e) => { const item = SIDE_MENU.find(m => m.key === e.key); if (item?.path) window.location.href = item.path; setSelectedMenu(e.key); }} style={{ borderRight: 0, marginTop: 8 }} />
        <div style={{ padding: 16, borderTop: '1px solid #f0f0f0', marginTop: 'auto' }}>
          <a href="/prototypes/flight-service">返回</a>
        </div>
      </Sider>

      <Content style={{ padding: 24 }}>
        <div style={{ maxWidth: 1400 }}>
          <Card style={{ borderRadius: 8, marginBottom: 24 }}>
            <Breadcrumb items={[{ title: <a href="/prototypes/home">门户首页</a> }, { title: <a href="/prototypes/flight-service">低空飞行服务</a> }, { title: <a href="/prototypes/airspace-query">空域信息查询</a> }, { title: '临时管制' }]} />
            <Title level={4} style={{ margin: '8px 0 0' }}>临时管制</Title>
          </Card>

          <Alert message={<><WarningOutlined style={{ marginRight: 8 }} /><strong>提示：</strong>临时管制期间请严格遵守管制规定，如有飞行需求请提前申请！</>} type="info" showIcon style={{ marginBottom: 16, borderRadius: 8 }} />

          <Card style={{ borderRadius: 8 }}>
            <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, alignItems: 'center' }}>
              <Tabs activeKey={activeTab} onChange={setActiveTab} items={tabItems} style={{ marginBottom: -16 }} />
              <Input.Search placeholder="搜索管制名称" allowClear onSearch={setSearchText} style={{ width: 260 }} prefix={<SearchOutlined />} />
            </div>
            <Table dataSource={filteredData} columns={columns} rowKey="id" pagination={{ pageSize: 10, showTotal: (total) => `共 ${total} 条记录` }} locale={{ emptyText: <Empty description="暂无临时管制信息" image={Empty.PRESENTED_IMAGE_SIMPLE} /> }} />
          </Card>
        </div>
      </Content>

      <Drawer title="临时管制详情" placement="right" width={480} open={drawerVisible} onClose={() => setDrawerVisible(false)}>
        {selectedRecord && (
          <>
            <Descriptions column={1} bordered size="small">
              <Descriptions.Item label="管制编号">{selectedRecord.id}</Descriptions.Item>
              <Descriptions.Item label="管制名称">{selectedRecord.urgent && <Tag color="error" style={{ marginRight: 8 }}>紧急</Tag>}{selectedRecord.name}</Descriptions.Item>
              <Descriptions.Item label="管制状态"><Tag color={STATUS_CONFIG[selectedRecord.status].color}>{STATUS_CONFIG[selectedRecord.status].text}</Tag></Descriptions.Item>
              <Descriptions.Item label="管制区域">{selectedRecord.area}</Descriptions.Item>
              <Descriptions.Item label="高度范围">{selectedRecord.altitude}</Descriptions.Item>
              <Descriptions.Item label="管制原因">{selectedRecord.reason}</Descriptions.Item>
              <Descriptions.Item label="详细说明">{selectedRecord.description}</Descriptions.Item>
            </Descriptions>
            <div style={{ marginTop: 24 }}>
              <Title level={5}>管制时间</Title>
              <Timeline items={[{ children: `开始时间：${selectedRecord.startDate}`, color: 'blue' }, { children: `结束时间：${selectedRecord.endDate}`, color: selectedRecord.status === 'expired' ? 'gray' : 'green' }]} />
            </div>
          </>
        )}
      </Drawer>
    </Layout>
  );
};

export default Component;
