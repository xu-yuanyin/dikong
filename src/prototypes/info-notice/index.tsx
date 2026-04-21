/**
 * @name 通知公告
 *
 * 提供低空飞行相关的通知公告服务
 */

import './style.css';
import React, { useState, useMemo } from 'react';
import {
  Layout, Menu, Card, Row, Col, Button, Tabs, Typography, Tag, Input, List, Empty, Breadcrumb, Drawer, Badge
} from 'antd';
import {
  FileTextOutlined, CloudOutlined, NotificationOutlined, LineChartOutlined, SafetyOutlined, SearchOutlined, ArrowLeftOutlined, EyeOutlined, ClockCircleOutlined, SoundOutlined
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
  important: { color: 'red', text: '重要' },
  system: { color: 'blue', text: '系统' },
  activity: { color: 'green', text: '活动' },
  maintenance: { color: 'orange', text: '维护' }
};

const MOCK_DATA = [
  { id: 'N001', title: '关于系统升级维护的通知', type: 'maintenance', date: '2024-01-16', isTop: true, content: '为提升系统性能，定于2024年1月20日0:00-6:00进行系统升级维护，届时系统将暂停服务。' },
  { id: 'N002', title: '低空飞行服务新功能上线公告', type: 'system', date: '2024-01-15', isTop: true, content: '低空飞行服务平台新增气象预警功能，为用户提供更精准的飞行建议。' },
  { id: 'N003', title: '2024年度低空飞行安全培训通知', type: 'activity', date: '2024-01-14', isTop: false, content: '为提高飞行安全意识，定于2024年2月举办低空飞行安全培训班，欢迎报名参加。' },
  { id: 'N004', title: '关于规范无人机飞行活动的通知', type: 'important', date: '2024-01-13', isTop: false, content: '为进一步规范无人机飞行活动，保障飞行安全，现将有关事项通知如下。' },
  { id: 'N005', title: '春节假期服务时间调整通知', type: 'system', date: '2024-01-12', isTop: false, content: '2024年春节期间，服务时间调整为：除夕至初三休息，初四恢复正常服务。' },
  { id: 'N006', title: '低空飞行安全知识竞赛活动', type: 'activity', date: '2024-01-11', isTop: false, content: '为普及低空飞行安全知识，特举办安全知识竞赛活动，参与即有机会获得精美礼品。' }
];

interface NoticeRecord {
  id: string; title: string; type: string; date: string; isTop: boolean; content: string;
}

const Component: React.FC = () => {
  const [selectedMenu, setSelectedMenu] = useState('notice');
  const [activeTab, setActiveTab] = useState('all');
  const [searchText, setSearchText] = useState('');
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<NoticeRecord | null>(null);

  const typeCounts = useMemo(() => {
    const counts = { all: MOCK_DATA.length, important: 0, system: 0, activity: 0, maintenance: 0 };
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
    { key: 'important', label: `重要 (${typeCounts.important})` },
    { key: 'system', label: `系统 (${typeCounts.system})` },
    { key: 'activity', label: `活动 (${typeCounts.activity})` },
    { key: 'maintenance', label: `维护 (${typeCounts.maintenance})` }
  ];

  return (
    <Layout style={{ minHeight: '100vh', background: '#f5f7fa' }}>
      <Sider width={220} style={{ background: '#fff', borderRight: '1px solid #f0f0f0' }} theme="light">
        <div style={{ padding: '20px 16px', borderBottom: '1px solid #f0f0f0' }}>
          <Title level={4} style={{ margin: 0, color: '#fa8c16' }}><NotificationOutlined style={{ marginRight: 8 }} />低空信息服务</Title>
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
            <Breadcrumb items={[{ title: <a href="/prototypes/home">门户首页</a> }, { title: <a href="/prototypes/info-service">低空信息服务</a> }, { title: '通知公告' }]} />
            <Title level={4} style={{ margin: '8px 0 0' }}>通知公告</Title>
          </Card>

          <Card style={{ borderRadius: 8 }}>
            <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, alignItems: 'center' }}>
              <Tabs activeKey={activeTab} onChange={setActiveTab} items={tabItems} style={{ marginBottom: -16 }} />
              <Input.Search placeholder="搜索通知标题" allowClear onSearch={setSearchText} style={{ width: 260 }} prefix={<SearchOutlined />} />
            </div>
            <List
              dataSource={filteredData}
              locale={{ emptyText: <Empty description="暂无通知公告" image={Empty.PRESENTED_IMAGE_SIMPLE} /> }}
              renderItem={(item) => (
                <List.Item
                  actions={[<Text type="secondary">{item.date}</Text>, <Button type="text" size="small" icon={<EyeOutlined />} onClick={() => { setSelectedRecord(item); setDrawerVisible(true); }}>查看</Button>]}
                  style={{ padding: '16px 0' }}
                >
                  <List.Item.Meta
                    avatar={<SoundOutlined style={{ fontSize: 20, color: item.isTop ? '#ff4d4f' : '#fa8c16' }} />}
                    title={<>{item.isTop && <Tag color="red" style={{ marginRight: 8 }}>置顶</Tag>}<Text strong style={{ cursor: 'pointer' }} onClick={() => { setSelectedRecord(item); setDrawerVisible(true); }}>{item.title}</Text></>}
                    description={<><Tag color={TYPE_CONFIG[item.type].color}>{TYPE_CONFIG[item.type].text}</Tag></>}
                  />
                </List.Item>
              )}
            />
          </Card>
        </div>
      </Content>

      <Drawer title="通知详情" placement="right" width={560} open={drawerVisible} onClose={() => setDrawerVisible(false)}>
        {selectedRecord && (
          <>
            <div style={{ marginBottom: 16 }}>
              <Tag color={TYPE_CONFIG[selectedRecord.type].color}>{TYPE_CONFIG[selectedRecord.type].text}</Tag>
              {selectedRecord.isTop && <Tag color="red">置顶</Tag>}
            </div>
            <Title level={4}>{selectedRecord.title}</Title>
            <div style={{ marginBottom: 24 }}>
              <Text type="secondary"><ClockCircleOutlined style={{ marginRight: 4 }} />发布时间：{selectedRecord.date}</Text>
            </div>
            <Paragraph style={{ lineHeight: 2 }}>{selectedRecord.content}</Paragraph>
          </>
        )}
      </Drawer>
    </Layout>
  );
};

export default Component;
