/**
 * @name 我的业务
 *
 * 用户业务管理入口，集中展示所有飞行服务相关业务的申请记录、办理进度和办理结果
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
  Select,
  Table,
  Statistic,
  Empty
} from 'antd';
import {
  FileTextOutlined,
  EnvironmentOutlined,
  SafetyCertificateOutlined,
  CompassOutlined,
  HomeOutlined,
  IdcardOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  CloseCircleOutlined,
  SearchOutlined,
  EyeOutlined,
  RightOutlined,
  ArrowLeftOutlined
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';

const { Sider, Content } = Layout;
const { Title, Text } = Typography;
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

const BUSINESS_TYPES = [
  { value: 'all', label: '全部类型' },
  { value: 'plan', label: '飞行计划填报' },
  { value: 'permit', label: '飞行许可办理' },
  { value: 'landing', label: '起降点预约' },
  { value: 'qualification', label: '资质办理' }
];

const STATUS_CONFIG: Record<string, { color: string; text: string; icon: React.ReactNode }> = {
  pending: { color: 'warning', text: '待审核', icon: <ClockCircleOutlined /> },
  processing: { color: 'processing', text: '审批中', icon: <ExclamationCircleOutlined /> },
  approved: { color: 'success', text: '已通过', icon: <CheckCircleOutlined /> },
  rejected: { color: 'error', text: '已驳回', icon: <CloseCircleOutlined /> }
};

const TYPE_CONFIG: Record<string, { color: string; text: string }> = {
  plan: { color: '#1677ff', text: '飞行计划' },
  permit: { color: '#13c2c2', text: '飞行许可' },
  landing: { color: '#52c41a', text: '起降点预约' },
  qualification: { color: '#eb2f96', text: '资质办理' }
};

const MOCK_DATA = [
  { id: 1, businessNo: 'FP20240120001', type: 'plan', title: '飞行计划申请 - 北京至天津航线', status: 'pending', submitTime: '2024-01-20 10:30', updateTime: '2024-01-20 10:30', description: '计划于2024年1月22日执行北京至天津的飞行任务' },
  { id: 2, businessNo: 'PM20240119003', type: 'permit', title: '飞行许可申请 - 临时空域使用', status: 'processing', submitTime: '2024-01-19 14:20', updateTime: '2024-01-20 09:15', description: '申请在A3空域进行无人机测绘作业' },
  { id: 3, businessNo: 'LP20240118002', type: 'landing', title: '起降点预约 - 朝阳机场', status: 'approved', submitTime: '2024-01-18 09:00', updateTime: '2024-01-19 16:30', description: '预约2024年1月21日使用朝阳机场起降点' },
  { id: 4, businessNo: 'QL20240117001', type: 'qualification', title: '资质办理申请 - 无人机驾驶员执照', status: 'rejected', submitTime: '2024-01-17 11:45', updateTime: '2024-01-18 14:00', description: '申请办理无人机驾驶员执照，材料不完整已驳回' },
  { id: 5, businessNo: 'FP20240116002', type: 'plan', title: '飞行计划申请 - 农业植保作业', status: 'approved', submitTime: '2024-01-16 08:30', updateTime: '2024-01-17 10:00', description: '计划于2024年1月20日在通州区进行农业植保作业' },
  { id: 6, businessNo: 'PM20240115002', type: 'permit', title: '飞行许可申请 - 跨区域飞行', status: 'approved', submitTime: '2024-01-15 16:00', updateTime: '2024-01-16 11:30', description: '申请从北京飞往河北的跨区域飞行许可' },
  { id: 7, businessNo: 'LP20240114001', type: 'landing', title: '起降点预约 - 大兴机场', status: 'processing', submitTime: '2024-01-14 13:20', updateTime: '2024-01-15 09:45', description: '预约2024年1月25日使用大兴机场起降点' },
  { id: 8, businessNo: 'QL20240113002', type: 'qualification', title: '资质办理申请 - 飞行器备案', status: 'approved', submitTime: '2024-01-13 10:15', updateTime: '2024-01-14 15:20', description: '申请办理新型号无人机飞行器备案' },
  { id: 9, businessNo: 'FP20240112001', type: 'plan', title: '飞行计划申请 - 航拍任务', status: 'rejected', submitTime: '2024-01-12 14:30', updateTime: '2024-01-13 11:00', description: '计划于2024年1月18日在禁飞区边缘进行航拍，已驳回修改' },
  { id: 10, businessNo: 'PM20240111001', type: 'permit', title: '飞行许可申请 - 夜间飞行', status: 'pending', submitTime: '2024-01-11 09:45', updateTime: '2024-01-11 09:45', description: '申请夜间飞行许可用于电力巡检' }
];

interface BusinessRecord {
  id: number;
  businessNo: string;
  type: string;
  title: string;
  status: string;
  submitTime: string;
  updateTime: string;
  description: string;
}

const Component: React.FC = () => {
  const [selectedMenu, setSelectedMenu] = useState('my-business');
  const [activeTab, setActiveTab] = useState('all');
  const [businessType, setBusinessType] = useState('all');
  const [searchText, setSearchText] = useState('');

  const statusCounts = useMemo(() => {
    const counts = { all: MOCK_DATA.length, pending: 0, processing: 0, approved: 0, rejected: 0 };
    MOCK_DATA.forEach(item => {
      counts[item.status as keyof typeof counts]++;
    });
    return counts;
  }, []);

  const filteredData = useMemo(() => {
    return MOCK_DATA.filter(item => {
      const statusMatch = activeTab === 'all' || item.status === activeTab;
      const typeMatch = businessType === 'all' || item.type === businessType;
      const searchMatch = !searchText || 
        item.businessNo.toLowerCase().includes(searchText.toLowerCase()) ||
        item.title.toLowerCase().includes(searchText.toLowerCase());
      return statusMatch && typeMatch && searchMatch;
    });
  }, [activeTab, businessType, searchText]);

  const columns: ColumnsType<BusinessRecord> = [
    {
      title: '业务编号',
      dataIndex: 'businessNo',
      key: 'businessNo',
      width: 150,
      render: (text: string) => <Text strong style={{ color: '#1677ff' }}>{text}</Text>
    },
    {
      title: '业务类型',
      dataIndex: 'type',
      key: 'type',
      width: 120,
      render: (type: string) => {
        const config = TYPE_CONFIG[type];
        return <Tag color={config.color}>{config.text}</Tag>;
      }
    },
    {
      title: '业务标题',
      dataIndex: 'title',
      key: 'title',
      ellipsis: true,
      render: (text: string) => <Text>{text}</Text>
    },
    {
      title: '当前状态',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (status: string) => {
        const config = STATUS_CONFIG[status];
        return <Tag color={config.color} icon={config.icon}>{config.text}</Tag>;
      }
    },
    {
      title: '提交时间',
      dataIndex: 'submitTime',
      key: 'submitTime',
      width: 160
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      key: 'updateTime',
      width: 160
    },
    {
      title: '操作',
      key: 'action',
      width: 80,
      render: () => (
        <Button type="text" size="small" icon={<EyeOutlined />} />
      )
    }
  ];

  const menuItems = SERVICE_MENU.map(item => ({
    key: item.key,
    label: item.label,
    icon: item.icon
  }));

  const tabItems = [
    { key: 'all', label: `全部 (${statusCounts.all})` },
    { key: 'pending', label: `待审核 (${statusCounts.pending})` },
    { key: 'processing', label: `审批中 (${statusCounts.processing})` },
    { key: 'approved', label: `已通过 (${statusCounts.approved})` },
    { key: 'rejected', label: `已驳回 (${statusCounts.rejected})` }
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
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Card style={{ borderRadius: 8 }}>
                <Row gutter={16}>
                  <Col xs={12} sm={6}>
                    <Statistic
                      title="待审核"
                      value={statusCounts.pending}
                      valueStyle={{ color: '#faad14' }}
                      prefix={<ClockCircleOutlined />}
                    />
                  </Col>
                  <Col xs={12} sm={6}>
                    <Statistic
                      title="审批中"
                      value={statusCounts.processing}
                      valueStyle={{ color: '#1677ff' }}
                      prefix={<ExclamationCircleOutlined />}
                    />
                  </Col>
                  <Col xs={12} sm={6}>
                    <Statistic
                      title="已通过"
                      value={statusCounts.approved}
                      valueStyle={{ color: '#52c41a' }}
                      prefix={<CheckCircleOutlined />}
                    />
                  </Col>
                  <Col xs={12} sm={6}>
                    <Statistic
                      title="已驳回"
                      value={statusCounts.rejected}
                      valueStyle={{ color: '#ff4d4f' }}
                      prefix={<CloseCircleOutlined />}
                    />
                  </Col>
                </Row>
              </Card>
            </Col>

            <Col span={24}>
              <Card style={{ borderRadius: 8 }}>
                <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
                  <Tabs
                    activeKey={activeTab}
                    onChange={setActiveTab}
                    items={tabItems}
                    style={{ marginBottom: -16 }}
                  />
                  <Space>
                    <Select
                      value={businessType}
                      onChange={setBusinessType}
                      style={{ width: 140 }}
                      options={BUSINESS_TYPES}
                    />
                    <Search
                      placeholder="搜索业务编号/标题"
                      allowClear
                      onSearch={setSearchText}
                      style={{ width: 220 }}
                      prefix={<SearchOutlined />}
                    />
                  </Space>
                </div>

                <Table
                  columns={columns}
                  dataSource={filteredData}
                  rowKey="id"
                  pagination={{
                    pageSize: 10,
                    showSizeChanger: true,
                    showQuickJumper: true,
                    showTotal: (total) => `共 ${total} 条记录`
                  }}
                  locale={{
                    emptyText: (
                      <Empty
                        description="暂无业务记录"
                        image={Empty.PRESENTED_IMAGE_SIMPLE}
                      />
                    )
                  }}
                  onRow={(record) => ({
                    style: { cursor: 'pointer' },
                    onMouseEnter: (e) => {
                      e.currentTarget.style.background = '#fafafa';
                    },
                    onMouseLeave: (e) => {
                      e.currentTarget.style.background = 'transparent';
                    }
                  })}
                />
              </Card>
            </Col>
          </Row>
        </div>
      </Content>
    </Layout>
  );
};

export default Component;
