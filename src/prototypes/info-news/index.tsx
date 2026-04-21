/**
 * @name 行业资讯
 *
 * 提供低空飞行相关的行业资讯服务
 */

import './style.css';
import React, { useState, useMemo } from 'react';
import {
  Layout, Menu, Card, Row, Col, Button, Tabs, Typography, Tag, Input, List, Empty, Breadcrumb, Drawer, Image
} from 'antd';
import {
  FileTextOutlined, CloudOutlined, NotificationOutlined, LineChartOutlined, SafetyOutlined, SearchOutlined, ArrowLeftOutlined, EyeOutlined, ClockCircleOutlined, GlobalOutlined
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
  industry: { color: 'purple', text: '行业动态' },
  technology: { color: 'blue', text: '技术前沿' },
  market: { color: 'green', text: '市场分析' },
  event: { color: 'orange', text: '展会活动' }
};

const MOCK_DATA = [
  { id: 'NW001', title: '2024年低空经济市场规模有望突破万亿', type: 'market', date: '2024-01-16', source: '经济日报', views: 1256, summary: '随着政策支持力度加大，低空经济产业快速发展，预计2024年市场规模将突破万亿元。', image: 'https://picsum.photos/seed/news1/400/200' },
  { id: 'NW002', title: '新型无人机续航能力突破2小时', type: 'technology', date: '2024-01-15', source: '科技日报', views: 892, summary: '国内某科技公司研发的新型无人机续航能力突破2小时，达到行业领先水平。', image: 'https://picsum.photos/seed/news2/400/200' },
  { id: 'NW003', title: '低空飞行服务保障体系建设加速推进', type: 'industry', date: '2024-01-14', source: '民航局', views: 654, summary: '全国低空飞行服务保障体系建设正在加速推进，预计年底前覆盖主要城市。', image: 'https://picsum.photos/seed/news3/400/200' },
  { id: 'NW004', title: '2024国际无人机展览会即将开幕', type: 'event', date: '2024-01-13', source: '展会官网', views: 1023, summary: '2024国际无人机展览会将于3月在上海举办，届时将有来自全球的数百家企业参展。', image: 'https://picsum.photos/seed/news4/400/200' },
  { id: 'NW005', title: '无人机物流配送试点城市增至20个', type: 'industry', date: '2024-01-12', source: '交通部', views: 789, summary: '无人机物流配送试点城市范围进一步扩大，新增10个试点城市。', image: 'https://picsum.photos/seed/news5/400/200' },
  { id: 'NW006', title: 'AI赋能无人机智能避障技术突破', type: 'technology', date: '2024-01-11', source: '科技网', views: 567, summary: '人工智能技术在无人机避障领域取得重大突破，大幅提升飞行安全性。', image: 'https://picsum.photos/seed/news6/400/200' }
];

interface NewsRecord {
  id: string; title: string; type: string; date: string; source: string; views: number; summary: string; image: string;
}

const Component: React.FC = () => {
  const [selectedMenu, setSelectedMenu] = useState('news');
  const [activeTab, setActiveTab] = useState('all');
  const [searchText, setSearchText] = useState('');
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<NewsRecord | null>(null);

  const typeCounts = useMemo(() => {
    const counts = { all: MOCK_DATA.length, industry: 0, technology: 0, market: 0, event: 0 };
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
    { key: 'industry', label: `行业动态 (${typeCounts.industry})` },
    { key: 'technology', label: `技术前沿 (${typeCounts.technology})` },
    { key: 'market', label: `市场分析 (${typeCounts.market})` },
    { key: 'event', label: `展会活动 (${typeCounts.event})` }
  ];

  return (
    <Layout style={{ minHeight: '100vh', background: '#f5f7fa' }}>
      <Sider width={220} style={{ background: '#fff', borderRight: '1px solid #f0f0f0' }} theme="light">
        <div style={{ padding: '20px 16px', borderBottom: '1px solid #f0f0f0' }}>
          <Title level={4} style={{ margin: 0, color: '#722ed1' }}><LineChartOutlined style={{ marginRight: 8 }} />低空信息服务</Title>
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
            <Breadcrumb items={[{ title: <a href="/prototypes/home">门户首页</a> }, { title: <a href="/prototypes/info-service">低空信息服务</a> }, { title: '行业资讯' }]} />
            <Title level={4} style={{ margin: '8px 0 0' }}>行业资讯</Title>
          </Card>

          <Card style={{ borderRadius: 8 }}>
            <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, alignItems: 'center' }}>
              <Tabs activeKey={activeTab} onChange={setActiveTab} items={tabItems} style={{ marginBottom: -16 }} />
              <Input.Search placeholder="搜索资讯标题" allowClear onSearch={setSearchText} style={{ width: 260 }} prefix={<SearchOutlined />} />
            </div>
            <List
              grid={{ gutter: 24, xs: 1, sm: 2, md: 2, lg: 3, xl: 3, xxl: 3 }}
              dataSource={filteredData}
              locale={{ emptyText: <Empty description="暂无行业资讯" image={Empty.PRESENTED_IMAGE_SIMPLE} /> }}
              renderItem={(item) => (
                <List.Item>
                  <Card hoverable style={{ borderRadius: 8, overflow: 'hidden' }} cover={<Image alt={item.title} src={item.image} style={{ height: 140, objectFit: 'cover' }} preview={false} />} onClick={() => { setSelectedRecord(item); setDrawerVisible(true); }}>
                    <Card.Meta
                      title={<Text ellipsis={{ rows: 2 }} style={{ fontSize: 14 }}>{item.title}</Text>}
                      description={
                        <div>
                          <div style={{ marginBottom: 8 }}><Tag color={TYPE_CONFIG[item.type].color}>{TYPE_CONFIG[item.type].text}</Tag></div>
                          <Text type="secondary" style={{ fontSize: 12 }}><GlobalOutlined /> {item.source}</Text>
                          <br /><Text type="secondary" style={{ fontSize: 12 }}><EyeOutlined /> {item.views} 阅读</Text>
                        </div>
                      }
                    />
                  </Card>
                </List.Item>
              )}
            />
          </Card>
        </div>
      </Content>

      <Drawer title="资讯详情" placement="right" width={560} open={drawerVisible} onClose={() => setDrawerVisible(false)}>
        {selectedRecord && (
          <>
            <Image src={selectedRecord.image} style={{ width: '100%', borderRadius: 8, marginBottom: 16 }} />
            <div style={{ marginBottom: 16 }}>
              <Tag color={TYPE_CONFIG[selectedRecord.type].color}>{TYPE_CONFIG[selectedRecord.type].text}</Tag>
            </div>
            <Title level={4}>{selectedRecord.title}</Title>
            <div style={{ marginBottom: 24, display: 'flex', gap: 16 }}>
              <Text type="secondary"><GlobalOutlined style={{ marginRight: 4 }} />{selectedRecord.source}</Text>
              <Text type="secondary"><ClockCircleOutlined style={{ marginRight: 4 }} />{selectedRecord.date}</Text>
              <Text type="secondary"><EyeOutlined style={{ marginRight: 4 }} />{selectedRecord.views} 阅读</Text>
            </div>
            <Paragraph style={{ lineHeight: 2 }}>{selectedRecord.summary}</Paragraph>
          </>
        )}
      </Drawer>
    </Layout>
  );
};

export default Component;
