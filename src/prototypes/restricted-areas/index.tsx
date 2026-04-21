/**
 * @name 限飞区域
 *
 * 展示区域内所有限飞区域信息
 */

import './style.css';
import React, { useState, useMemo } from 'react';
import {
  Layout, Menu, Card, Tabs, Typography, Tag, Input, Table, Empty, Breadcrumb, Descriptions, Drawer, Alert
} from 'antd';
import {
  EnvironmentOutlined, SearchOutlined, CompassOutlined, GlobalOutlined, CloseCircleOutlined, WarningOutlined, ClockCircleOutlined
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

const TYPE_CONFIG: Record<string, { color: string; text: string }> = {
  urban: { color: '#faad14', text: '城市中心' },
  scenic: { color: '#faad14', text: '景区限飞' },
  residential: { color: '#faad14', text: '居民区' },
  event: { color: '#faad14', text: '活动区域' }
};

const MOCK_DATA = [
  { id: 'L001', name: '城市中心限飞区', type: 'urban', altitude: '0-120m', area: '15.8km²', timeLimit: '全天', restrictions: '限高120米，需报备', description: '城市核心区域，人口密集，限高飞行' },
  { id: 'L002', name: '故宫景区限飞区', type: 'scenic', altitude: '0-100m', area: '5.2km²', timeLimit: '08:00-18:00', restrictions: '限高100米，需提前申请', description: '故宫及周边景区，游客密集区域' },
  { id: 'L003', name: '颐和园限飞区', type: 'scenic', altitude: '0-80m', area: '3.8km²', timeLimit: '07:00-19:00', restrictions: '限高80米', description: '颐和园景区限飞区域' },
  { id: 'L004', name: '大型居民区限飞区', type: 'residential', altitude: '0-50m', area: '8.5km²', timeLimit: '全天', restrictions: '限高50米，禁止夜间飞行', description: '大型居民区，注意隐私保护' },
  { id: 'L005', name: '奥体中心限飞区', type: 'event', altitude: '0-150m', area: '6.0km²', timeLimit: '活动期间', restrictions: '活动期间限飞', description: '大型活动期间临时限飞' }
];

interface RestrictedRecord {
  id: string; name: string; type: string; altitude: string; area: string; timeLimit: string; restrictions: string; description: string;
}

const Component: React.FC = () => {
  const [selectedMenu, setSelectedMenu] = useState('restricted');
  const [activeTab, setActiveTab] = useState('all');
  const [searchText, setSearchText] = useState('');
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<RestrictedRecord | null>(null);

  const typeCounts = useMemo(() => {
    const counts = { all: MOCK_DATA.length, urban: 0, scenic: 0, residential: 0, event: 0 };
    MOCK_DATA.forEach(item => { counts[item.type as keyof typeof counts]++; });
    return counts;
  }, []);

  const filteredData = useMemo(() => {
    return MOCK_DATA.filter(item => {
      const typeMatch = activeTab === 'all' || item.type === activeTab;
      const searchMatch = !searchText || item.name.toLowerCase().includes(searchText.toLowerCase());
      return typeMatch && searchMatch;
    });
  }, [activeTab, searchText]);

  const menuItems = SIDE_MENU.map(item => ({ key: item.key, label: item.label, icon: item.icon }));
  const tabItems = [
    { key: 'all', label: `全部 (${typeCounts.all})` },
    { key: 'urban', label: `城市中心 (${typeCounts.urban})` },
    { key: 'scenic', label: `景区限飞 (${typeCounts.scenic})` },
    { key: 'residential', label: `居民区 (${typeCounts.residential})` },
    { key: 'event', label: `活动区域 (${typeCounts.event})` }
  ];

  const columns = [
    { title: '区域编号', dataIndex: 'id', key: 'id', width: 100, render: (text: string) => <Text strong style={{ color: '#faad14' }}>{text}</Text> },
    { title: '区域名称', dataIndex: 'name', key: 'name', width: 180 },
    { title: '类型', dataIndex: 'type', key: 'type', width: 100, render: (type: string) => <Tag color={TYPE_CONFIG[type].color}>{TYPE_CONFIG[type].text}</Tag> },
    { title: '高度限制', dataIndex: 'altitude', key: 'altitude', width: 100 },
    { title: '面积', dataIndex: 'area', key: 'area', width: 80 },
    { title: '时间限制', dataIndex: 'timeLimit', key: 'timeLimit', width: 100, render: (text: string) => <><ClockCircleOutlined style={{ marginRight: 4 }} />{text}</> },
    { title: '限制说明', dataIndex: 'restrictions', key: 'restrictions', ellipsis: true },
    { title: '操作', key: 'action', width: 80, render: (_: any, record: RestrictedRecord) => <EnvironmentOutlined style={{ cursor: 'pointer', color: '#1677ff' }} onClick={() => { setSelectedRecord(record); setDrawerVisible(true); }} /> }
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
            <Breadcrumb items={[{ title: <a href="/prototypes/home">门户首页</a> }, { title: <a href="/prototypes/flight-service">低空飞行服务</a> }, { title: <a href="/prototypes/airspace-query">空域信息查询</a> }, { title: '限飞区域' }]} />
            <Title level={4} style={{ margin: '8px 0 0' }}>限飞区域</Title>
          </Card>

          <Alert message={<><WarningOutlined style={{ marginRight: 8 }} /><strong>注意：</strong>限飞区域需遵守高度和时间限制，违规飞行将受到处罚！</>} type="warning" showIcon style={{ marginBottom: 16, borderRadius: 8 }} />

          <Card style={{ borderRadius: 8 }}>
            <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, alignItems: 'center' }}>
              <Tabs activeKey={activeTab} onChange={setActiveTab} items={tabItems} style={{ marginBottom: -16 }} />
              <Input.Search placeholder="搜索限飞区名称" allowClear onSearch={setSearchText} style={{ width: 260 }} prefix={<SearchOutlined />} />
            </div>
            <Table dataSource={filteredData} columns={columns} rowKey="id" pagination={{ pageSize: 10, showTotal: (total) => `共 ${total} 条记录` }} locale={{ emptyText: <Empty description="暂无限飞区数据" image={Empty.PRESENTED_IMAGE_SIMPLE} /> }} />
          </Card>
        </div>
      </Content>

      <Drawer title="限飞区详情" placement="right" width={480} open={drawerVisible} onClose={() => setDrawerVisible(false)}>
        {selectedRecord && (
          <Descriptions column={1} bordered size="small">
            <Descriptions.Item label="区域编号">{selectedRecord.id}</Descriptions.Item>
            <Descriptions.Item label="区域名称">{selectedRecord.name}</Descriptions.Item>
            <Descriptions.Item label="区域类型"><Tag color={TYPE_CONFIG[selectedRecord.type].color}>{TYPE_CONFIG[selectedRecord.type].text}</Tag></Descriptions.Item>
            <Descriptions.Item label="高度限制">{selectedRecord.altitude}</Descriptions.Item>
            <Descriptions.Item label="覆盖面积">{selectedRecord.area}</Descriptions.Item>
            <Descriptions.Item label="时间限制">{selectedRecord.timeLimit}</Descriptions.Item>
            <Descriptions.Item label="限制说明">{selectedRecord.restrictions}</Descriptions.Item>
            <Descriptions.Item label="详细说明">{selectedRecord.description}</Descriptions.Item>
          </Descriptions>
        )}
      </Drawer>
    </Layout>
  );
};

export default Component;
