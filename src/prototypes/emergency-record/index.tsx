/**
 * @name 数据留存
 *
 * 提供应急数据留存管理功能
 */

import './style.css';
import React, { useState, useMemo } from 'react';
import {
  Layout, Menu, Card, Row, Col, Button, Tabs, Typography, Tag, Table, Empty, Breadcrumb, DatePicker, Select, Space, Statistic, Input, Drawer, Descriptions
} from 'antd';
import {
  AlertOutlined, PhoneOutlined, TeamOutlined, WarningOutlined, FileTextOutlined, ArrowLeftOutlined, DownloadOutlined, SearchOutlined, DatabaseOutlined, CalendarOutlined
} from '@ant-design/icons';

const { Sider, Content } = Layout;
const { Title, Text, Paragraph } = Typography;
const { RangePicker } = DatePicker;

const SIDE_MENU = [
  { key: 'overview', label: '应急概览', icon: <AlertOutlined />, path: '/prototypes/emergency-service' },
  { key: 'alarm', label: '一键报警', icon: <PhoneOutlined />, path: '/prototypes/emergency-alarm' },
  { key: 'rescue', label: '救援调度', icon: <TeamOutlined />, path: '/prototypes/emergency-rescue' },
  { key: 'warning', label: '预警发布', icon: <WarningOutlined />, path: '/prototypes/emergency-warning' },
  { key: 'record', label: '数据留存', icon: <FileTextOutlined />, path: '/prototypes/emergency-record' }
];

const TYPE_CONFIG: Record<string, { color: string; text: string }> = {
  alarm: { color: 'red', text: '报警记录' },
  rescue: { color: 'blue', text: '救援记录' },
  warning: { color: 'orange', text: '预警记录' },
  operation: { color: 'green', text: '操作日志' }
};

const MOCK_DATA = [
  { id: 'D001', type: 'alarm', title: '紧急报警记录', content: '城东区A3空域飞行器失控报警', operator: '系统自动', time: '2024-01-16 14:30:25', size: '256KB' },
  { id: 'D002', type: 'rescue', title: '救援调度记录', content: '救援一组前往城东区A3空域执行救援任务', operator: '调度员张三', time: '2024-01-16 14:35:10', size: '128KB' },
  { id: 'D003', type: 'warning', title: '大风预警发布', content: '发布橙色气象预警，影响区域：全市范围', operator: '预警管理员', time: '2024-01-16 08:00:00', size: '64KB' },
  { id: 'D004', type: 'operation', title: '系统操作日志', content: '用户登录系统', operator: '用户李四', time: '2024-01-16 09:15:30', size: '16KB' },
  { id: 'D005', type: 'alarm', title: '设备故障报警', content: '城西区B2空域电池异常报警', operator: '系统自动', time: '2024-01-15 10:15:42', size: '192KB' },
  { id: 'D006', type: 'rescue', title: '救援完成记录', content: '城西区B2空域设备故障救援完成', operator: '技术支援组', time: '2024-01-15 11:30:00', size: '96KB' }
];

interface RecordData {
  id: string; type: string; title: string; content: string; operator: string; time: string; size: string;
}

const Component: React.FC = () => {
  const [selectedMenu, setSelectedMenu] = useState('record');
  const [activeTab, setActiveTab] = useState('all');
  const [searchText, setSearchText] = useState('');
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<RecordData | null>(null);

  const menuItems = SIDE_MENU.map(item => ({ key: item.key, label: item.label, icon: item.icon }));

  const typeCounts = useMemo(() => {
    const counts = { all: MOCK_DATA.length, alarm: 0, rescue: 0, warning: 0, operation: 0 };
    MOCK_DATA.forEach(item => { counts[item.type as keyof typeof counts]++; });
    return counts;
  }, []);

  const filteredData = useMemo(() => {
    return MOCK_DATA.filter(item => {
      const typeMatch = activeTab === 'all' || item.type === activeTab;
      const searchMatch = !searchText || item.title.toLowerCase().includes(searchText.toLowerCase()) || item.content.toLowerCase().includes(searchText.toLowerCase());
      return typeMatch && searchMatch;
    });
  }, [activeTab, searchText]);

  const tabItems = [
    { key: 'all', label: `全部 (${typeCounts.all})` },
    { key: 'alarm', label: `报警记录 (${typeCounts.alarm})` },
    { key: 'rescue', label: `救援记录 (${typeCounts.rescue})` },
    { key: 'warning', label: `预警记录 (${typeCounts.warning})` },
    { key: 'operation', label: `操作日志 (${typeCounts.operation})` }
  ];

  const columns = [
    { title: '记录编号', dataIndex: 'id', key: 'id', width: 100, render: (text: string) => <Text strong style={{ color: '#52c41a' }}>{text}</Text> },
    { title: '记录类型', dataIndex: 'type', key: 'type', width: 100, render: (type: string) => <Tag color={TYPE_CONFIG[type].color}>{TYPE_CONFIG[type].text}</Tag> },
    { title: '标题', dataIndex: 'title', key: 'title', width: 160 },
    { title: '内容摘要', dataIndex: 'content', key: 'content', width: 240, ellipsis: true },
    { title: '操作人', dataIndex: 'operator', key: 'operator', width: 100 },
    { title: '记录时间', dataIndex: 'time', key: 'time', width: 160 },
    { title: '大小', dataIndex: 'size', key: 'size', width: 80 },
    { title: '操作', key: 'action', width: 120, render: (_: any, record: RecordData) => <Space><Button type="text" size="small" onClick={() => { setSelectedRecord(record); setDrawerVisible(true); }}>详情</Button><Button type="text" size="small" icon={<DownloadOutlined />}>导出</Button></Space> }
  ];

  return (
    <Layout style={{ minHeight: '100vh', background: '#f5f7fa' }}>
      <Sider width={220} style={{ background: '#fff', borderRight: '1px solid #f0f0f0' }} theme="light">
        <div style={{ padding: '20px 16px', borderBottom: '1px solid #f0f0f0' }}>
          <Title level={4} style={{ margin: 0, color: '#52c41a' }}><FileTextOutlined style={{ marginRight: 8 }} />低空应急服务</Title>
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
            <Breadcrumb items={[{ title: <a href="/prototypes/home">门户首页</a> }, { title: <a href="/prototypes/emergency-service">低空应急服务</a> }, { title: '数据留存' }]} />
            <Title level={4} style={{ margin: '8px 0 0' }}>数据留存</Title>
          </Card>

          <Row gutter={[24, 24]}>
            <Col xs={24} lg={6}>
              <Card style={{ borderRadius: 8 }}>
                <Statistic title="总记录数" value={typeCounts.all} prefix={<DatabaseOutlined style={{ color: '#52c41a' }} />} />
              </Card>
            </Col>
            <Col xs={24} lg={6}>
              <Card style={{ borderRadius: 8 }}>
                <Statistic title="报警记录" value={typeCounts.alarm} valueStyle={{ color: '#ff4d4f' }} prefix={<AlertOutlined />} />
              </Card>
            </Col>
            <Col xs={24} lg={6}>
              <Card style={{ borderRadius: 8 }}>
                <Statistic title="救援记录" value={typeCounts.rescue} valueStyle={{ color: '#1677ff' }} prefix={<TeamOutlined />} />
              </Card>
            </Col>
            <Col xs={24} lg={6}>
              <Card style={{ borderRadius: 8 }}>
                <Statistic title="预警记录" value={typeCounts.warning} valueStyle={{ color: '#faad14' }} prefix={<WarningOutlined />} />
              </Card>
            </Col>
          </Row>

          <Card style={{ borderRadius: 8, marginTop: 24 }}>
            <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, alignItems: 'center' }}>
              <Tabs activeKey={activeTab} onChange={setActiveTab} items={tabItems} style={{ marginBottom: -16 }} />
              <Space>
                <RangePicker placeholder={['开始日期', '结束日期']} />
                <Input.Search placeholder="搜索记录" allowClear onSearch={setSearchText} style={{ width: 200 }} prefix={<SearchOutlined />} />
                <Button type="primary" icon={<DownloadOutlined />}>批量导出</Button>
              </Space>
            </div>
            <Table dataSource={filteredData} columns={columns} rowKey="id" pagination={{ pageSize: 10, showTotal: (total) => `共 ${total} 条记录` }} locale={{ emptyText: <Empty description="暂无数据记录" image={Empty.PRESENTED_IMAGE_SIMPLE} /> }} />
          </Card>
        </div>
      </Content>

      <Drawer title="记录详情" placement="right" width={560} open={drawerVisible} onClose={() => setDrawerVisible(false)}>
        {selectedRecord && (
          <>
            <div style={{ marginBottom: 16 }}>
              <Tag color={TYPE_CONFIG[selectedRecord.type].color}>{TYPE_CONFIG[selectedRecord.type].text}</Tag>
            </div>
            <Descriptions column={1} bordered size="small">
              <Descriptions.Item label="记录编号">{selectedRecord.id}</Descriptions.Item>
              <Descriptions.Item label="标题">{selectedRecord.title}</Descriptions.Item>
              <Descriptions.Item label="内容">{selectedRecord.content}</Descriptions.Item>
              <Descriptions.Item label="操作人">{selectedRecord.operator}</Descriptions.Item>
              <Descriptions.Item label="记录时间">{selectedRecord.time}</Descriptions.Item>
              <Descriptions.Item label="数据大小">{selectedRecord.size}</Descriptions.Item>
            </Descriptions>
            <div style={{ marginTop: 24 }}>
              <Button type="primary" icon={<DownloadOutlined />}>导出记录</Button>
            </div>
          </>
        )}
      </Drawer>
    </Layout>
  );
};

export default Component;
