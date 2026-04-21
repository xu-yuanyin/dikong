/**
 * @name 禁飞区域
 *
 * 展示区域内所有禁飞区域信息
 */

import './style.css';
import React, { useState, useMemo } from 'react';
import {
  Layout, Menu, Card, Tabs, Typography, Tag, Input, Table, Empty, Breadcrumb, Descriptions, Drawer, Alert
} from 'antd';
import {
  EnvironmentOutlined, SearchOutlined, CompassOutlined, GlobalOutlined, CloseCircleOutlined, ArrowLeftOutlined, EyeOutlined, WarningOutlined
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
  airport: { color: '#ff4d4f', text: '机场净空区' },
  military: { color: '#ff4d4f', text: '军事禁区' },
  government: { color: '#ff4d4f', text: '政府机关' },
  facility: { color: '#ff4d4f', text: '重要设施' }
};

const MOCK_DATA = [
  { id: 'P001', name: '首都机场净空区', type: 'airport', altitude: '0-500m', area: '125.0km²', restrictions: '禁止一切飞行活动', description: '首都机场净空保护区，严禁任何飞行器进入' },
  { id: 'P002', name: '大兴机场净空区', type: 'airport', altitude: '0-500m', area: '98.5km²', restrictions: '禁止一切飞行活动', description: '大兴机场净空保护区' },
  { id: 'P003', name: '市政府禁飞区', type: 'government', altitude: '0-200m', area: '3.2km²', restrictions: '禁止一切飞行活动', description: '市政府及周边区域禁飞区' },
  { id: 'P004', name: '军事基地禁飞区', type: 'military', altitude: '0-300m', area: '45.0km²', restrictions: '禁止一切飞行活动', description: '军事基地及周边区域禁飞区' },
  { id: 'P005', name: '核电站禁飞区', type: 'facility', altitude: '0-250m', area: '20.0km²', restrictions: '禁止一切飞行活动', description: '核电站及周边重要设施禁飞区' }
];

interface ProhibitedRecord {
  id: string; name: string; type: string; altitude: string; area: string; restrictions: string; description: string;
}

const Component: React.FC = () => {
  const [selectedMenu, setSelectedMenu] = useState('prohibited');
  const [activeTab, setActiveTab] = useState('all');
  const [searchText, setSearchText] = useState('');
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<ProhibitedRecord | null>(null);

  const typeCounts = useMemo(() => {
    const counts = { all: MOCK_DATA.length, airport: 0, military: 0, government: 0, facility: 0 };
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
    { key: 'airport', label: `机场净空区 (${typeCounts.airport})` },
    { key: 'military', label: `军事禁区 (${typeCounts.military})` },
    { key: 'government', label: `政府机关 (${typeCounts.government})` },
    { key: 'facility', label: `重要设施 (${typeCounts.facility})` }
  ];

  const columns = [
    { title: '区域编号', dataIndex: 'id', key: 'id', width: 100, render: (text: string) => <Text strong style={{ color: '#ff4d4f' }}>{text}</Text> },
    { title: '区域名称', dataIndex: 'name', key: 'name', width: 180 },
    { title: '类型', dataIndex: 'type', key: 'type', width: 120, render: (type: string) => <Tag color={TYPE_CONFIG[type].color}>{TYPE_CONFIG[type].text}</Tag> },
    { title: '高度范围', dataIndex: 'altitude', key: 'altitude', width: 100 },
    { title: '面积', dataIndex: 'area', key: 'area', width: 80 },
    { title: '限制说明', dataIndex: 'restrictions', key: 'restrictions', render: () => <Tag color="error" icon={<CloseCircleOutlined />}>禁止飞行</Tag> },
    { title: '操作', key: 'action', width: 80, render: (_: any, record: ProhibitedRecord) => <EyeOutlined style={{ cursor: 'pointer', color: '#1677ff' }} onClick={() => { setSelectedRecord(record); setDrawerVisible(true); }} /> }
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
            <Breadcrumb items={[{ title: <a href="/prototypes/home">门户首页</a> }, { title: <a href="/prototypes/flight-service">低空飞行服务</a> }, { title: <a href="/prototypes/airspace-query">空域信息查询</a> }, { title: '禁飞区域' }]} />
            <Title level={4} style={{ margin: '8px 0 0' }}>禁飞区域</Title>
          </Card>

          <Alert message={<><WarningOutlined style={{ marginRight: 8 }} /><strong>警告：</strong>禁飞区域严禁任何飞行活动，违规飞行将承担法律责任！</>} type="error" showIcon style={{ marginBottom: 16, borderRadius: 8 }} />

          <Card style={{ borderRadius: 8 }}>
            <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, alignItems: 'center' }}>
              <Tabs activeKey={activeTab} onChange={setActiveTab} items={tabItems} style={{ marginBottom: -16 }} />
              <Input.Search placeholder="搜索禁飞区名称" allowClear onSearch={setSearchText} style={{ width: 260 }} prefix={<SearchOutlined />} />
            </div>
            <Table dataSource={filteredData} columns={columns} rowKey="id" pagination={{ pageSize: 10, showTotal: (total) => `共 ${total} 条记录` }} locale={{ emptyText: <Empty description="暂无禁飞区数据" image={Empty.PRESENTED_IMAGE_SIMPLE} /> }} />
          </Card>
        </div>
      </Content>

      <Drawer title="禁飞区详情" placement="right" width={480} open={drawerVisible} onClose={() => setDrawerVisible(false)}>
        {selectedRecord && (
          <Descriptions column={1} bordered size="small">
            <Descriptions.Item label="区域编号">{selectedRecord.id}</Descriptions.Item>
            <Descriptions.Item label="区域名称">{selectedRecord.name}</Descriptions.Item>
            <Descriptions.Item label="区域类型"><Tag color={TYPE_CONFIG[selectedRecord.type].color}>{TYPE_CONFIG[selectedRecord.type].text}</Tag></Descriptions.Item>
            <Descriptions.Item label="高度范围">{selectedRecord.altitude}</Descriptions.Item>
            <Descriptions.Item label="覆盖面积">{selectedRecord.area}</Descriptions.Item>
            <Descriptions.Item label="限制说明"><Tag color="error">禁止飞行</Tag></Descriptions.Item>
            <Descriptions.Item label="详细说明">{selectedRecord.description}</Descriptions.Item>
          </Descriptions>
        )}
      </Drawer>
    </Layout>
  );
};

export default Component;
