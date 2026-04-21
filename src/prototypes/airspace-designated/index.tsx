/**
 * @name 空域划设
 *
 * 展示区域内所有已划设的空域信息，包括管制空域和非管制空域
 */

import './style.css';
import React, { useState, useMemo } from 'react';
import {
  Layout,
  Menu,
  Card,
  Row,
  Col,
  Button,
  Tabs,
  Typography,
  Tag,
  Space,
  Input,
  Table,
  Empty,
  Breadcrumb,
  Descriptions,
  Drawer
} from 'antd';
import {
  EnvironmentOutlined,
  SearchOutlined,
  CompassOutlined,
  RightOutlined,
  GlobalOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  ArrowLeftOutlined,
  EyeOutlined
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
  controlled: { color: '#1677ff', text: '管制空域' },
  uncontrolled: { color: '#52c41a', text: '非管制空域' }
};

const MOCK_DATA = [
  { id: 'A001', name: '城东区A类空域', type: 'controlled', altitude: '0-300m', area: '12.5km²', status: 'active', restrictions: '需提前申请', description: '城东区主要飞行区域，适用于无人机巡检、航拍等作业' },
  { id: 'A002', name: '城西区B类空域', type: 'uncontrolled', altitude: '0-150m', area: '8.3km²', status: 'active', restrictions: '无需申请', description: '城西区开放飞行区域，适用于轻型无人机飞行' },
  { id: 'A003', name: '工业区C类空域', type: 'controlled', altitude: '0-200m', area: '6.7km²', status: 'inactive', restrictions: '暂停使用', description: '工业区巡检专用空域，目前暂停使用' },
  { id: 'A004', name: '科技园区空域', type: 'controlled', altitude: '0-250m', area: '5.2km²', status: 'active', restrictions: '需提前申请', description: '科技园区无人机配送试点空域' },
  { id: 'A005', name: '农业示范区空域', type: 'uncontrolled', altitude: '0-100m', area: '15.8km²', status: 'active', restrictions: '无需申请', description: '农业植保作业专用空域' },
  { id: 'A006', name: '物流园区空域', type: 'controlled', altitude: '0-200m', area: '4.5km²', status: 'active', restrictions: '需提前申请', description: '物流配送无人机专用空域' }
];

interface AirspaceRecord {
  id: string;
  name: string;
  type: string;
  altitude: string;
  area: string;
  status: string;
  restrictions: string;
  description: string;
}

const Component: React.FC = () => {
  const [selectedMenu, setSelectedMenu] = useState('designated');
  const [activeTab, setActiveTab] = useState('all');
  const [searchText, setSearchText] = useState('');
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<AirspaceRecord | null>(null);

  const typeCounts = useMemo(() => {
    const counts = { all: MOCK_DATA.length, controlled: 0, uncontrolled: 0 };
    MOCK_DATA.forEach(item => {
      counts[item.type as keyof typeof counts]++;
    });
    return counts;
  }, []);

  const filteredData = useMemo(() => {
    return MOCK_DATA.filter(item => {
      const typeMatch = activeTab === 'all' || item.type === activeTab;
      const searchMatch = !searchText || 
        item.name.toLowerCase().includes(searchText.toLowerCase()) ||
        item.id.toLowerCase().includes(searchText.toLowerCase());
      return typeMatch && searchMatch;
    });
  }, [activeTab, searchText]);

  const menuItems = SIDE_MENU.map(item => ({
    key: item.key,
    label: item.label,
    icon: item.icon
  }));

  const tabItems = [
    { key: 'all', label: `全部 (${typeCounts.all})` },
    { key: 'controlled', label: `管制空域 (${typeCounts.controlled})` },
    { key: 'uncontrolled', label: `非管制空域 (${typeCounts.uncontrolled})` }
  ];

  const columns = [
    {
      title: '空域编号',
      dataIndex: 'id',
      key: 'id',
      width: 100,
      render: (text: string) => <Text strong style={{ color: '#1677ff' }}>{text}</Text>
    },
    {
      title: '空域名称',
      dataIndex: 'name',
      key: 'name',
      width: 180
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
      width: 120,
      render: (type: string) => {
        const config = TYPE_CONFIG[type];
        return <Tag color={config.color}>{config.text}</Tag>;
      }
    },
    {
      title: '高度范围',
      dataIndex: 'altitude',
      key: 'altitude',
      width: 100
    },
    {
      title: '面积',
      dataIndex: 'area',
      key: 'area',
      width: 80
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 80,
      render: (status: string) => (
        <Tag color={status === 'active' ? 'success' : 'default'} icon={status === 'active' ? <CheckCircleOutlined /> : <CloseCircleOutlined />}>
          {status === 'active' ? '启用' : '停用'}
        </Tag>
      )
    },
    {
      title: '限制说明',
      dataIndex: 'restrictions',
      key: 'restrictions',
      ellipsis: true
    },
    {
      title: '操作',
      key: 'action',
      width: 80,
      render: (_: any, record: AirspaceRecord) => (
        <Button type="text" size="small" icon={<EyeOutlined />} onClick={() => { setSelectedRecord(record); setDrawerVisible(true); }} />
      )
    }
  ];

  return (
    <Layout style={{ minHeight: '100vh', background: '#f5f7fa' }}>
      <Sider width={220} style={{ background: '#fff', borderRight: '1px solid #f0f0f0' }} theme="light">
        <div style={{ padding: '20px 16px', borderBottom: '1px solid #f0f0f0' }}>
          <Title level={4} style={{ margin: 0, color: '#722ed1' }}>
            <EnvironmentOutlined style={{ marginRight: 8 }} />
            空域信息查询
          </Title>
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
            <Breadcrumb items={[{ title: <a href="/prototypes/home">门户首页</a> }, { title: <a href="/prototypes/flight-service">低空飞行服务</a> }, { title: <a href="/prototypes/airspace-query">空域信息查询</a> }, { title: '空域划设' }]} />
            <Title level={4} style={{ margin: '8px 0 0' }}>空域划设</Title>
          </Card>

          <Card style={{ borderRadius: 8 }}>
            <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, alignItems: 'center' }}>
              <Tabs activeKey={activeTab} onChange={setActiveTab} items={tabItems} style={{ marginBottom: -16 }} />
              <Input.Search placeholder="搜索空域名称或编号" allowClear onSearch={setSearchText} style={{ width: 260 }} prefix={<SearchOutlined />} />
            </div>
            <Table dataSource={filteredData} columns={columns} rowKey="id" pagination={{ pageSize: 10, showTotal: (total) => `共 ${total} 条记录` }} locale={{ emptyText: <Empty description="暂无空域数据" image={Empty.PRESENTED_IMAGE_SIMPLE} /> }} />
          </Card>
        </div>
      </Content>

      <Drawer title="空域详情" placement="right" width={480} open={drawerVisible} onClose={() => setDrawerVisible(false)}>
        {selectedRecord && (
          <Descriptions column={1} bordered size="small">
            <Descriptions.Item label="空域编号">{selectedRecord.id}</Descriptions.Item>
            <Descriptions.Item label="空域名称">{selectedRecord.name}</Descriptions.Item>
            <Descriptions.Item label="空域类型"><Tag color={TYPE_CONFIG[selectedRecord.type].color}>{TYPE_CONFIG[selectedRecord.type].text}</Tag></Descriptions.Item>
            <Descriptions.Item label="高度范围">{selectedRecord.altitude}</Descriptions.Item>
            <Descriptions.Item label="覆盖面积">{selectedRecord.area}</Descriptions.Item>
            <Descriptions.Item label="使用状态"><Tag color={selectedRecord.status === 'active' ? 'success' : 'default'}>{selectedRecord.status === 'active' ? '启用' : '停用'}</Tag></Descriptions.Item>
            <Descriptions.Item label="限制说明">{selectedRecord.restrictions}</Descriptions.Item>
            <Descriptions.Item label="详细说明">{selectedRecord.description}</Descriptions.Item>
          </Descriptions>
        )}
      </Drawer>
    </Layout>
  );
};

export default Component;
