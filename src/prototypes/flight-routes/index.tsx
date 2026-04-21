/**
 * @name 航路航线
 *
 * 展示区域内已规划的航路航线信息
 */

import './style.css';
import React, { useState, useMemo } from 'react';
import {
  Layout, Menu, Card, Row, Col, Button, Tabs, Typography, Tag, Space, Input, Table, Empty, Breadcrumb, Descriptions, Drawer
} from 'antd';
import {
  EnvironmentOutlined, SearchOutlined, CompassOutlined, GlobalOutlined, CheckCircleOutlined, CloseCircleOutlined, ArrowLeftOutlined, EyeOutlined
} from '@ant-design/icons';

const { Sider, Content } = Layout;
const { Title, Text } = Typography;

const SIDE_MENU = [
  { key: 'overview', label: '空域概览', icon: <GlobalOutlined />, path: '/prototypes/airspace-query' },
  { key: 'designated', label: '空域划设', icon: <EnvironmentOutlined />, path: '/prototypes/airspace-designated' },
  { key: 'routes', label: '航路航线', icon: <CompassOutlined />, path: '/prototypes/flight-routes' },
  { key: 'prohibited', label: '禁飞区域', icon: <CloseCircleOutlined />, path: '/prototypes/prohibited-areas' },
  { key: 'restricted', label: '限飞区域', icon: <EnvironmentOutlined />, path: '/prototypes/restricted-areas' },
  { key: 'temporary', label: '临时管制', icon: <EnvironmentOutlined />, path: '/prototypes/temporary-control' }
];

const MOCK_DATA = [
  { id: 'RT001', name: '城东-城西航线', distance: '15.2km', altitude: '100-200m', status: 'available', waypoints: '城东起降点 → 城西起降点', description: '连接城东城西的主要航线，适用于物流配送' },
  { id: 'RT002', name: '工业区巡检航线', distance: '8.5km', altitude: '50-100m', status: 'available', waypoints: '工业区A区 → 工业区B区 → 工业区C区', description: '工业区设备巡检专用航线' },
  { id: 'RT003', name: '景区观光航线', distance: '12.0km', altitude: '80-150m', status: 'restricted', waypoints: '景区入口 → 观景台 → 景区出口', description: '景区观光航线，需提前申请' },
  { id: 'RT004', name: '物流配送航线', distance: '20.3km', altitude: '120-200m', status: 'available', waypoints: '物流中心 → 配送站A → 配送站B', description: '物流配送专用航线' },
  { id: 'RT005', name: '农业植保航线', distance: '18.5km', altitude: '30-50m', status: 'available', waypoints: '农田A区 → 农田B区 → 农田C区', description: '农业植保作业专用航线' },
  { id: 'RT006', name: '电力巡检航线', distance: '25.0km', altitude: '50-80m', status: 'restricted', waypoints: '变电站A → 输电线路 → 变电站B', description: '电力设施巡检航线，需特殊审批' }
];

interface RouteRecord {
  id: string; name: string; distance: string; altitude: string; status: string; waypoints: string; description: string;
}

const Component: React.FC = () => {
  const [selectedMenu, setSelectedMenu] = useState('routes');
  const [activeTab, setActiveTab] = useState('all');
  const [searchText, setSearchText] = useState('');
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<RouteRecord | null>(null);

  const statusCounts = useMemo(() => {
    const counts = { all: MOCK_DATA.length, available: 0, restricted: 0 };
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
    { key: 'available', label: `可用 (${statusCounts.available})` },
    { key: 'restricted', label: `限制 (${statusCounts.restricted})` }
  ];

  const columns = [
    { title: '航线编号', dataIndex: 'id', key: 'id', width: 100, render: (text: string) => <Text strong style={{ color: '#1677ff' }}>{text}</Text> },
    { title: '航线名称', dataIndex: 'name', key: 'name', width: 180 },
    { title: '航程距离', dataIndex: 'distance', key: 'distance', width: 100 },
    { title: '高度范围', dataIndex: 'altitude', key: 'altitude', width: 100 },
    { title: '状态', dataIndex: 'status', key: 'status', width: 80, render: (status: string) => <Tag color={status === 'available' ? 'success' : 'warning'} icon={status === 'available' ? <CheckCircleOutlined /> : <CloseCircleOutlined />}>{status === 'available' ? '可用' : '限制'}</Tag> },
    { title: '途经点', dataIndex: 'waypoints', key: 'waypoints', ellipsis: true },
    { title: '操作', key: 'action', width: 80, render: (_: any, record: RouteRecord) => <Button type="text" size="small" icon={<EyeOutlined />} onClick={() => { setSelectedRecord(record); setDrawerVisible(true); }} /> }
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
          <Button block icon={<ArrowLeftOutlined />} href="/prototypes/flight-service">返回</Button>
        </div>
      </Sider>

      <Content style={{ padding: 24 }}>
        <div style={{ maxWidth: 1400 }}>
          <Card style={{ borderRadius: 8, marginBottom: 24 }}>
            <Breadcrumb items={[{ title: <a href="/prototypes/home">门户首页</a> }, { title: <a href="/prototypes/flight-service">低空飞行服务</a> }, { title: <a href="/prototypes/airspace-query">空域信息查询</a> }, { title: '航路航线' }]} />
            <Title level={4} style={{ margin: '8px 0 0' }}>航路航线</Title>
          </Card>
          <Card style={{ borderRadius: 8 }}>
            <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, alignItems: 'center' }}>
              <Tabs activeKey={activeTab} onChange={setActiveTab} items={tabItems} style={{ marginBottom: -16 }} />
              <Input.Search placeholder="搜索航线名称" allowClear onSearch={setSearchText} style={{ width: 260 }} prefix={<SearchOutlined />} />
            </div>
            <Table dataSource={filteredData} columns={columns} rowKey="id" pagination={{ pageSize: 10, showTotal: (total) => `共 ${total} 条记录` }} locale={{ emptyText: <Empty description="暂无航线数据" image={Empty.PRESENTED_IMAGE_SIMPLE} /> }} />
          </Card>
        </div>
      </Content>

      <Drawer title="航线详情" placement="right" width={480} open={drawerVisible} onClose={() => setDrawerVisible(false)}>
        {selectedRecord && (
          <Descriptions column={1} bordered size="small">
            <Descriptions.Item label="航线编号">{selectedRecord.id}</Descriptions.Item>
            <Descriptions.Item label="航线名称">{selectedRecord.name}</Descriptions.Item>
            <Descriptions.Item label="航程距离">{selectedRecord.distance}</Descriptions.Item>
            <Descriptions.Item label="高度范围">{selectedRecord.altitude}</Descriptions.Item>
            <Descriptions.Item label="使用状态"><Tag color={selectedRecord.status === 'available' ? 'success' : 'warning'}>{selectedRecord.status === 'available' ? '可用' : '限制'}</Tag></Descriptions.Item>
            <Descriptions.Item label="途经点">{selectedRecord.waypoints}</Descriptions.Item>
            <Descriptions.Item label="详细说明">{selectedRecord.description}</Descriptions.Item>
          </Descriptions>
        )}
      </Drawer>
    </Layout>
  );
};

export default Component;
