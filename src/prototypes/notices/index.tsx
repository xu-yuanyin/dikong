/**
 * @name 通知公告
 *
 * 低空飞行服务相关的通知公告查看入口，展示政策法规、通知公告、行业动态等信息
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
  List,
  Empty,
  Badge
} from 'antd';
import {
  FileTextOutlined,
  EnvironmentOutlined,
  SafetyCertificateOutlined,
  CompassOutlined,
  HomeOutlined,
  IdcardOutlined,
  BellOutlined,
  SearchOutlined,
  RightOutlined,
  ClockCircleOutlined,
  ExclamationCircleOutlined,
  BookOutlined,
  BulbOutlined,
  ArrowLeftOutlined
} from '@ant-design/icons';

const { Sider, Content } = Layout;
const { Title, Text, Paragraph } = Typography;
const { Search } = Input;

const SERVICE_MENU = [
  { key: 'overview', label: '服务概览', icon: <HomeOutlined />, path: '/prototypes/flight-service' },
  { key: 'plan', label: '飞行计划填报', icon: <FileTextOutlined />, path: '/prototypes/flight-plan' },
  { key: 'airspace', label: '空域信息查询', icon: <EnvironmentOutlined />, path: '/prototypes/airspace-query' },
  { key: 'permit', label: '飞行许可办理', icon: <SafetyCertificateOutlined />, path: '/prototypes/flight-permit' },
  { key: 'route', label: '航线规划', icon: <CompassOutlined />, path: '/prototypes/route-planning' },
  { key: 'landing', label: '起降点服务', icon: <HomeOutlined />, path: '/prototypes/landing-point' },
  { key: 'qualification', label: '资质办理', icon: <IdcardOutlined />, path: '/prototypes/qualification' },
  { key: 'my-business', label: '我的业务', icon: <FileTextOutlined />, path: '/prototypes/my-business' }
];

const TYPE_CONFIG: Record<string, { color: string; text: string; icon: React.ReactNode }> = {
  policy: { color: '#1677ff', text: '政策法规', icon: <BookOutlined /> },
  notice: { color: '#faad14', text: '通知公告', icon: <BellOutlined /> },
  dynamic: { color: '#52c41a', text: '行业动态', icon: <BulbOutlined /> }
};

const MOCK_DATA = [
  { id: 1, title: '春节期间空域管制通知', type: 'notice', urgent: true, publishTime: '2024-01-20', content: '根据民航局相关规定，2024年春节期间（2月9日-2月17日）将实施临时空域管制措施。在此期间，部分空域将限制飞行活动，请各飞行单位提前做好飞行计划调整。具体管制区域和时间安排详见附件。' },
  { id: 2, title: '飞行计划填报系统升级公告', type: 'notice', urgent: false, publishTime: '2024-01-19', content: '为提升用户体验，飞行计划填报系统将于2024年1月25日进行系统升级。升级期间系统将暂停服务，预计维护时间为凌晨2:00-6:00。升级后新增批量导入、模板保存等功能。' },
  { id: 3, title: '新增12个临时起降点开放', type: 'dynamic', urgent: false, publishTime: '2024-01-18', content: '为满足日益增长的低空飞行需求，经民航局批准，本市新增12个临时起降点，分别位于朝阳区、海淀区、通州区等地。新增起降点将于2024年2月1日正式开放预约。' },
  { id: 4, title: '《低空飞行管理条例》正式发布', type: 'policy', urgent: true, publishTime: '2024-01-17', content: '国务院正式发布《低空飞行管理条例》，自2024年3月1日起施行。条例对低空飞行的申请流程、安全管理、违规处罚等方面做出了明确规定，请各飞行单位和飞手认真学习并遵守。' },
  { id: 5, title: '无人机驾驶员执照考试安排通知', type: 'notice', urgent: false, publishTime: '2024-01-16', content: '2024年第一季度无人机驾驶员执照考试将于3月举行，报名时间为2月1日-2月28日。考试地点设在市航空运动学校，请考生提前准备相关材料。' },
  { id: 6, title: '低空经济产业发展报告发布', type: 'dynamic', urgent: false, publishTime: '2024-01-15', content: '中国航空运输协会发布《2023年低空经济产业发展报告》，报告显示2023年我国低空经济规模突破5000亿元，同比增长35%。无人机应用、低空旅游、物流配送等领域发展迅速。' },
  { id: 7, title: '关于规范无人机航拍活动的通知', type: 'policy', urgent: false, publishTime: '2024-01-14', content: '为进一步规范无人机航拍活动，保障公共安全和隐私权益，现就无人机航拍活动作出如下规定：一、航拍前须向当地公安机关报备；二、禁止在军事禁区、政府机关等敏感区域上空航拍；三、航拍内容不得侵犯他人隐私。' },
  { id: 8, title: '气象服务系统升级完成通知', type: 'notice', urgent: false, publishTime: '2024-01-13', content: '低空气象服务系统已完成升级，新增精细化气象预报功能，可提供未来72小时内指定区域的气象信息，包括风速、能见度、降水概率等，为飞行计划制定提供更准确的参考。' },
  { id: 9, title: '低空物流配送试点城市名单公布', type: 'dynamic', urgent: false, publishTime: '2024-01-12', content: '民航局公布第二批低空物流配送试点城市名单，共15个城市入选。试点城市将获得政策支持，开展无人机物流配送业务，推动低空经济发展。' },
  { id: 10, title: '飞行器备案流程优化通知', type: 'notice', urgent: false, publishTime: '2024-01-11', content: '为简化办事流程，飞行器备案现已支持在线办理。申请人可通过本平台提交备案申请，上传相关材料，审批时间由原来的5个工作日缩短至3个工作日。' }
];

interface NoticeRecord {
  id: number;
  title: string;
  type: string;
  urgent: boolean;
  publishTime: string;
  content: string;
}

const Component: React.FC = () => {
  const [selectedMenu, setSelectedMenu] = useState('overview');
  const [activeTab, setActiveTab] = useState('all');
  const [searchText, setSearchText] = useState('');

  const typeCounts = useMemo(() => {
    const counts = { all: MOCK_DATA.length, policy: 0, notice: 0, dynamic: 0 };
    MOCK_DATA.forEach(item => {
      counts[item.type as keyof typeof counts]++;
    });
    return counts;
  }, []);

  const filteredData = useMemo(() => {
    return MOCK_DATA.filter(item => {
      const typeMatch = activeTab === 'all' || item.type === activeTab;
      const searchMatch = !searchText || 
        item.title.toLowerCase().includes(searchText.toLowerCase());
      return typeMatch && searchMatch;
    });
  }, [activeTab, searchText]);

  const menuItems = SERVICE_MENU.map(item => ({
    key: item.key,
    label: item.label,
    icon: item.icon
  }));

  const tabItems = [
    { key: 'all', label: `全部 (${typeCounts.all})` },
    { key: 'policy', label: `政策法规 (${typeCounts.policy})` },
    { key: 'notice', label: `通知公告 (${typeCounts.notice})` },
    { key: 'dynamic', label: `行业动态 (${typeCounts.dynamic})` }
  ];

  return (
    <Layout style={{ minHeight: '100vh', background: '#f5f7fa' }}>
      <Sider
        width={220}
        style={{
          background: '#fff',
          borderRight: '1px solid #f0f0f0'
        }}
        theme="light"
      >
        <div style={{ padding: '20px 16px', borderBottom: '1px solid #f0f0f0' }}>
          <Title level={4} style={{ margin: 0, color: '#1677ff' }}>
            <CompassOutlined style={{ marginRight: 8 }} />
            低空飞行服务
          </Title>
          <Text type="secondary" style={{ fontSize: 12 }}>
            飞行服务一站式办理
          </Text>
        </div>
        <Menu
          mode="inline"
          selectedKeys={[selectedMenu]}
          items={menuItems}
          onClick={(e) => {
            const item = SERVICE_MENU.find(m => m.key === e.key);
            if (item && item.path) {
              window.location.href = item.path;
            }
            setSelectedMenu(e.key);
          }}
          style={{ borderRight: 0, marginTop: 8 }}
        />
        <div style={{ padding: 16, borderTop: '1px solid #f0f0f0', marginTop: 'auto' }}>
          <Button block icon={<ArrowLeftOutlined />} href="/prototypes/flight-service">返回</Button>
        </div>
      </Sider>

      <Content style={{ padding: 24 }}>
        <div style={{ maxWidth: 1200 }}>
          <Card style={{ borderRadius: 8 }}>
            <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, alignItems: 'center' }}>
              <Tabs
                activeKey={activeTab}
                onChange={setActiveTab}
                items={tabItems}
                style={{ marginBottom: -16 }}
              />
              <Search
                placeholder="搜索公告标题"
                allowClear
                onSearch={setSearchText}
                style={{ width: 240 }}
                prefix={<SearchOutlined />}
              />
            </div>

            <List
              itemLayout="vertical"
              dataSource={filteredData}
              locale={{
                emptyText: (
                  <Empty
                    description="暂无公告"
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                  />
                )
              }}
              renderItem={(item: NoticeRecord) => {
                const typeConfig = TYPE_CONFIG[item.type];
                return (
                  <List.Item
                    key={item.id}
                    style={{
                      padding: '16px 0',
                      borderBottom: '1px solid #f0f0f0',
                      cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#fafafa';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'transparent';
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div style={{ flex: 1 }}>
                        <Space size={8} style={{ marginBottom: 8 }}>
                          {item.urgent && (
                            <Tag color="error" icon={<ExclamationCircleOutlined />}>紧急</Tag>
                          )}
                          <Tag color={typeConfig.color} icon={typeConfig.icon}>
                            {typeConfig.text}
                          </Tag>
                        </Space>
                        <Title level={5} style={{ margin: 0, marginBottom: 8 }}>{item.title}</Title>
                        <Paragraph
                          ellipsis={{ rows: 2 }}
                          style={{ margin: 0, color: 'rgba(0,0,0,0.65)', fontSize: 14 }}
                        >
                          {item.content}
                        </Paragraph>
                        <Text type="secondary" style={{ fontSize: 12, marginTop: 8, display: 'inline-block' }}>
                          <ClockCircleOutlined style={{ marginRight: 4 }} />
                          发布时间：{item.publishTime}
                        </Text>
                      </div>
                      <Button type="text" icon={<RightOutlined />} style={{ color: '#bfbfbf' }} />
                    </div>
                  </List.Item>
                );
              }}
              pagination={{
                pageSize: 10,
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total) => `共 ${total} 条公告`
              }}
            />
          </Card>
        </div>
      </Content>
    </Layout>
  );
};

export default Component;
