/**
 * @name 政策法规
 *
 * 提供低空飞行相关的政策法规查询服务
 */

import './style.css';
import React, { useState, useMemo } from 'react';
import {
  Layout, Menu, Card, Row, Col, Button, Tabs, Typography, Tag, Input, Table, Empty, Breadcrumb, Descriptions, Drawer, List, Space
} from 'antd';
import {
  FileTextOutlined, CloudOutlined, NotificationOutlined, LineChartOutlined, SafetyOutlined, SearchOutlined, ArrowLeftOutlined, BookOutlined, DownloadOutlined, EyeOutlined
} from '@ant-design/icons';

const { Sider, Content } = Layout;
const { Title, Text, Paragraph } = Typography;

const SIDE_MENU = [
  { key: 'overview', label: '服务概览', icon: <FileTextOutlined />, path: '/prototypes/info-service' },
  { key: 'policy', label: '政策法规', icon: <FileTextOutlined />, path: '/prototypes/info-policy' },
  { key: 'weather', label: '气象服务', icon: <CloudOutlined />, path: '/prototypes/info-weather' },
  { key: 'notice', label: '通知公告', icon: <NotificationOutlined />, path: '/prototypes/info-notice' },
  { key: 'news', label: '行业资讯', icon: <LineChartOutlined />, path: '/prototypes/info-news' },
  { key: 'safety', label: '安全知识', icon: <SafetyOutlined />, path: '/prototypes/info-safety' }
];

const TYPE_CONFIG: Record<string, { color: string; text: string }> = {
  regulation: { color: 'blue', text: '法规' },
  policy: { color: 'green', text: '政策' },
  standard: { color: 'orange', text: '标准' },
  notice: { color: 'purple', text: '通知' }
};

const MOCK_DATA = [
  { id: 'P001', title: '低空飞行服务管理办法（试行）', type: 'regulation', date: '2024-01-15', source: '民航局', status: '有效', summary: '为规范低空飞行服务管理，保障飞行安全，促进低空经济发展，制定本办法。' },
  { id: 'P002', title: '民用无人驾驶航空器系统安全管理规定', type: 'regulation', date: '2024-01-10', source: '国务院', status: '有效', summary: '为加强民用无人驾驶航空器系统安全管理，维护公共安全和飞行秩序。' },
  { id: 'P003', title: '关于进一步加强低空空域管理的通知', type: 'notice', date: '2024-01-05', source: '空管局', status: '有效', summary: '进一步规范低空空域使用，提高空域使用效率。' },
  { id: 'P004', title: '低空经济产业发展指导意见', type: 'policy', date: '2024-01-02', source: '发改委', status: '有效', summary: '推动低空经济产业高质量发展，培育新的经济增长点。' },
  { id: 'P005', title: '无人机驾驶员培训管理规范', type: 'standard', date: '2023-12-20', source: '民航局', status: '有效', summary: '规范无人机驾驶员培训工作，提高培训质量。' },
  { id: 'P006', title: '低空空域分类管理标准', type: 'standard', date: '2023-12-15', source: '空管局', status: '有效', summary: '明确低空空域分类标准，便于空域管理和使用。' }
];

interface PolicyRecord {
  id: string; title: string; type: string; date: string; source: string; status: string; summary: string;
}

const Component: React.FC = () => {
  const [selectedMenu, setSelectedMenu] = useState('policy');
  const [activeTab, setActiveTab] = useState('all');
  const [searchText, setSearchText] = useState('');
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<PolicyRecord | null>(null);

  const typeCounts = useMemo(() => {
    const counts = { all: MOCK_DATA.length, regulation: 0, policy: 0, standard: 0, notice: 0 };
    MOCK_DATA.forEach(item => { counts[item.type as keyof typeof counts]++; });
    return counts;
  }, []);

  const filteredData = useMemo(() => {
    return MOCK_DATA.filter(item => {
      const typeMatch = activeTab === 'all' || item.type === activeTab;
      const searchMatch = !searchText || item.title.toLowerCase().includes(searchText.toLowerCase());
      return typeMatch && searchMatch;
    });
  }, [activeTab, searchText]);

  const menuItems = SIDE_MENU.map(item => ({ key: item.key, label: item.label, icon: item.icon }));
  const tabItems = [
    { key: 'all', label: `全部 (${typeCounts.all})` },
    { key: 'regulation', label: `法规 (${typeCounts.regulation})` },
    { key: 'policy', label: `政策 (${typeCounts.policy})` },
    { key: 'standard', label: `标准 (${typeCounts.standard})` },
    { key: 'notice', label: `通知 (${typeCounts.notice})` }
  ];

  const columns = [
    { title: '标题', dataIndex: 'title', key: 'title', width: 300, render: (text: string) => <Text strong>{text}</Text> },
    { title: '类型', dataIndex: 'type', key: 'type', width: 80, render: (type: string) => <Tag color={TYPE_CONFIG[type].color}>{TYPE_CONFIG[type].text}</Tag> },
    { title: '发布日期', dataIndex: 'date', key: 'date', width: 100 },
    { title: '发布单位', dataIndex: 'source', key: 'source', width: 100 },
    { title: '状态', dataIndex: 'status', key: 'status', width: 60, render: () => <Tag color="success">有效</Tag> },
    { title: '操作', key: 'action', width: 120, render: (_: any, record: PolicyRecord) => <Space><Button type="text" size="small" icon={<EyeOutlined />} onClick={() => { setSelectedRecord(record); setDrawerVisible(true); }} /><Button type="text" size="small" icon={<DownloadOutlined />}>下载</Button></Space> }
  ];

  return (
    <Layout style={{ minHeight: '100vh', background: '#f5f7fa' }}>
      <Sider width={220} style={{ background: '#fff', borderRight: '1px solid #f0f0f0' }} theme="light">
        <div style={{ padding: '20px 16px', borderBottom: '1px solid #f0f0f0' }}>
          <Title level={4} style={{ margin: 0, color: '#1677ff' }}><FileTextOutlined style={{ marginRight: 8 }} />低空信息服务</Title>
          <Text type="secondary" style={{ fontSize: 12 }}>信息查询与服务</Text>
        </div>
        <Menu mode="inline" selectedKeys={[selectedMenu]} items={menuItems} onClick={(e) => { const item = SIDE_MENU.find(m => m.key === e.key); if (item?.path) window.location.href = item.path; setSelectedMenu(e.key); }} style={{ borderRight: 0, marginTop: 8 }} />
        <div style={{ padding: 16, borderTop: '1px solid #f0f0f0', marginTop: 'auto' }}>
          <Button block icon={<ArrowLeftOutlined />} href="/prototypes/home">返回</Button>
        </div>
      </Sider>

      <Content style={{ padding: 24 }}>
        <div style={{ maxWidth: 1400 }}>
          <Card style={{ borderRadius: 8, marginBottom: 24 }}>
            <Breadcrumb items={[{ title: <a href="/prototypes/home">门户首页</a> }, { title: <a href="/prototypes/info-service">低空信息服务</a> }, { title: '政策法规' }]} />
            <Title level={4} style={{ margin: '8px 0 0' }}>政策法规</Title>
          </Card>

          <Card style={{ borderRadius: 8 }}>
            <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, alignItems: 'center' }}>
              <Tabs activeKey={activeTab} onChange={setActiveTab} items={tabItems} style={{ marginBottom: -16 }} />
              <Input.Search placeholder="搜索政策标题" allowClear onSearch={setSearchText} style={{ width: 260 }} prefix={<SearchOutlined />} />
            </div>
            <Table dataSource={filteredData} columns={columns} rowKey="id" pagination={{ pageSize: 10, showTotal: (total) => `共 ${total} 条记录` }} locale={{ emptyText: <Empty description="暂无政策法规" image={Empty.PRESENTED_IMAGE_SIMPLE} /> }} />
          </Card>
        </div>
      </Content>

      <Drawer title="政策详情" placement="right" width={560} open={drawerVisible} onClose={() => setDrawerVisible(false)}>
        {selectedRecord && (
          <>
            <Descriptions column={1} bordered size="small">
              <Descriptions.Item label="标题">{selectedRecord.title}</Descriptions.Item>
              <Descriptions.Item label="类型"><Tag color={TYPE_CONFIG[selectedRecord.type].color}>{TYPE_CONFIG[selectedRecord.type].text}</Tag></Descriptions.Item>
              <Descriptions.Item label="发布日期">{selectedRecord.date}</Descriptions.Item>
              <Descriptions.Item label="发布单位">{selectedRecord.source}</Descriptions.Item>
              <Descriptions.Item label="状态"><Tag color="success">{selectedRecord.status}</Tag></Descriptions.Item>
            </Descriptions>
            <div style={{ marginTop: 24 }}>
              <Title level={5}>摘要</Title>
              <Paragraph>{selectedRecord.summary}</Paragraph>
            </div>
            <div style={{ marginTop: 16 }}>
              <Button type="primary" icon={<DownloadOutlined />}>下载全文</Button>
            </div>
          </>
        )}
      </Drawer>
    </Layout>
  );
};

export default Component;
