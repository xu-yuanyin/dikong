/**
 * @name 空域概览
 *
 * 提供空域划设、航路航线、禁飞区、限飞区、临时管制信息查询服务
 */

import './style.css';
import React, { useState } from 'react';
import {
  Layout,
  Menu,
  Card,
  Row,
  Col,
  Button,
  Input,
  Select,
  Tabs,
  Typography,
  Tag,
  Space,
  Table,
  Badge,
  Tooltip,
  Breadcrumb,
  Drawer,
  Descriptions,
  Empty,
  Segmented,
  message,
  Divider
} from 'antd';
import {
  EnvironmentOutlined,
  SearchOutlined,
  CompassOutlined,
  WarningOutlined,
  SafetyCertificateOutlined,
  ClockCircleOutlined,
  RightOutlined,
  InfoCircleOutlined,
  GlobalOutlined,
  ThunderboltOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  FilterOutlined,
  DownloadOutlined,
  ReloadOutlined,
  ArrowLeftOutlined,
  FileTextOutlined
} from '@ant-design/icons';

const { Sider, Content } = Layout;
const { Title, Text } = Typography;

const AIRSPACE_TYPES = [
  { value: 'all', label: '全部空域' },
  { value: 'controlled', label: '管制空域' },
  { value: 'uncontrolled', label: '非管制空域' },
  { value: 'restricted', label: '限制空域' },
  { value: 'prohibited', label: '禁飞空域' },
  { value: 'temporary', label: '临时管制区' }
];

const AIRSPACE_DATA = [
  { id: 'A001', name: '城东区A类空域', type: 'controlled', altitude: '0-300m', status: 'active', area: '12.5km²', restrictions: '需提前申请' },
  { id: 'A002', name: '城西区B类空域', type: 'uncontrolled', altitude: '0-150m', status: 'active', area: '8.3km²', restrictions: '无需申请' },
  { id: 'R001', name: '机场净空区', type: 'prohibited', altitude: '0-500m', status: 'active', area: '25.0km²', restrictions: '禁止飞行' },
  { id: 'R002', name: '政府机关禁飞区', type: 'prohibited', altitude: '0-200m', status: 'active', area: '3.2km²', restrictions: '禁止飞行' },
  { id: 'T001', name: '春节临时管制区', type: 'temporary', altitude: '0-300m', status: 'active', area: '45.0km²', restrictions: '临时管制', endDate: '2024-02-17' },
  { id: 'L001', name: '城市中心限飞区', type: 'restricted', altitude: '0-120m', status: 'active', area: '15.8km²', restrictions: '限高120米' },
  { id: 'A003', name: '工业区C类空域', type: 'controlled', altitude: '0-200m', status: 'inactive', area: '6.7km²', restrictions: '暂停使用' },
  { id: 'L002', name: '景区限飞区', type: 'restricted', altitude: '0-100m', status: 'active', area: '5.2km²', restrictions: '限高100米' }
];

const ROUTES_DATA = [
  { id: 'RT001', name: '城东-城西航线', distance: '15.2km', altitude: '100-200m', status: 'available' },
  { id: 'RT002', name: '工业区巡检航线', distance: '8.5km', altitude: '50-100m', status: 'available' },
  { id: 'RT003', name: '景区观光航线', distance: '12.0km', altitude: '80-150m', status: 'restricted' },
  { id: 'RT004', name: '物流配送航线', distance: '20.3km', altitude: '120-200m', status: 'available' }
];

const Component: React.FC = () => {
  const [selectedMenu, setSelectedMenu] = useState('overview');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [detailDrawerVisible, setDetailDrawerVisible] = useState(false);
  const [selectedAirspace, setSelectedAirspace] = useState<any>(null);
  const [viewMode, setViewMode] = useState('map');

  const getTypeTag = (type: string) => {
    const config: Record<string, { color: string; text: string }> = {
      controlled: { color: 'blue', text: '管制空域' },
      uncontrolled: { color: 'green', text: '非管制空域' },
      restricted: { color: 'orange', text: '限制空域' },
      prohibited: { color: 'red', text: '禁飞空域' },
      temporary: { color: 'purple', text: '临时管制' }
    };
    return config[type] || { color: 'default', text: type };
  };

  const getStatusTag = (status: string) => {
    const config: Record<string, { color: string; icon: React.ReactNode }> = {
      active: { color: 'success', icon: <CheckCircleOutlined /> },
      inactive: { color: 'default', icon: <CloseCircleOutlined /> },
      restricted: { color: 'warning', icon: <WarningOutlined /> }
    };
    return config[status] || { color: 'default', icon: null };
  };

  const handleSearch = () => {
    message.info(`搜索关键词: ${searchKeyword}`);
  };

  const handleRowClick = (record: any) => {
    setSelectedAirspace(record);
    setDetailDrawerVisible(true);
  };

  const filteredData = AIRSPACE_DATA.filter(item => {
    const matchType = selectedType === 'all' || item.type === selectedType;
    const matchKeyword = !searchKeyword || 
      item.name.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      item.id.toLowerCase().includes(searchKeyword.toLowerCase());
    return matchType && matchKeyword;
  });

  const SIDE_MENU = [
    { key: 'overview', label: '空域概览', icon: <GlobalOutlined />, path: '/prototypes/airspace-query' },
    { key: 'airspace', label: '空域划设', icon: <EnvironmentOutlined />, path: '/prototypes/airspace-designated' },
    { key: 'routes', label: '航路航线', icon: <CompassOutlined />, path: '/prototypes/flight-routes' },
    { key: 'prohibited', label: '禁飞区域', icon: <CloseCircleOutlined />, path: '/prototypes/prohibited-areas' },
    { key: 'restricted', label: '限飞区域', icon: <WarningOutlined />, path: '/prototypes/restricted-areas' },
    { key: 'temporary', label: '临时管制', icon: <ClockCircleOutlined />, path: '/prototypes/temporary-control' }
  ];

  const menuItems = SIDE_MENU.map(item => ({
    key: item.key,
    label: item.label,
    icon: item.icon
  }));

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
      width: 100,
      render: (type: string) => {
        const config = getTypeTag(type);
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
      render: (status: string) => {
        const config = getStatusTag(status);
        return <Tag color={config.color} icon={config.icon}>{status === 'active' ? '启用' : status === 'inactive' ? '停用' : '限制'}</Tag>;
      }
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
      render: () => <Button type="link" size="small">详情</Button>
    }
  ];

  return (
    <Layout style={{ minHeight: '100vh', background: '#f5f7fa' }}>
      <Sider
        width={220}
        style={{ background: '#fff', borderRight: '1px solid #f0f0f0' }}
        theme="light"
      >
        <div style={{ padding: '20px 16px', borderBottom: '1px solid #f0f0f0' }}>
          <Title level={4} style={{ margin: 0, color: '#722ed1' }}>
            <EnvironmentOutlined style={{ marginRight: 8 }} />
            空域信息查询
          </Title>
          <Text type="secondary" style={{ fontSize: 12 }}>
            实时查询空域信息
          </Text>
        </div>
        <Menu
          mode="inline"
          selectedKeys={[selectedMenu]}
          items={menuItems}
          onClick={(e) => {
            const item = SIDE_MENU.find(m => m.key === e.key);
            if (item && item.path) {
              window.location.href = item.path;
            }
            setSelectedMenu(e.key);
          }}
          style={{ borderRight: 0, marginTop: 8 }}
        />
        
        <div style={{ padding: 16, borderTop: '1px solid #f0f0f0', marginTop: 'auto' }}>
          <Button 
            block 
            icon={<ArrowLeftOutlined />}
            href="/prototypes/flight-service"
          >
            返回
          </Button>
        </div>
      </Sider>

      <Content style={{ padding: 24 }}>
        <div style={{ maxWidth: 1400 }}>
          <Card style={{ borderRadius: 8, marginBottom: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <Breadcrumb
                  items={[
                    { title: <a href="/prototypes/home">门户首页</a> },
                    { title: <a href="/prototypes/flight-service">低空飞行服务</a> },
                    { title: '空域信息查询' }
                  ]}
                />
                <Title level={4} style={{ margin: '8px 0 0' }}>
                  空域信息查询
                </Title>
              </div>
              <Space>
                <Button icon={<DownloadOutlined />}>导出数据</Button>
                <Button icon={<ReloadOutlined />}>刷新</Button>
              </Space>
            </div>
          </Card>

          <Row gutter={[24, 24]}>
            <Col span={24}>
              <Card 
                title={<span style={{ fontWeight: 600 }}>空域类型统计</span>}
                style={{ borderRadius: 8 }}
                styles={{ body: { padding: 0 } }}
              >
                {(() => {
                  const data = [
                    { label: '管制空域', value: 12, color: '#1677ff', bgColor: '#e6f4ff' },
                    { label: '非管制空域', value: 8, color: '#52c41a', bgColor: '#f6ffed' },
                    { label: '限制空域', value: 6, color: '#fa8c16', bgColor: '#fff7e6' },
                    { label: '禁飞区域', value: 5, color: '#ff4d4f', bgColor: '#fff1f0' },
                    { label: '临时管制', value: 3, color: '#722ed1', bgColor: '#f9f0ff' }
                  ];
                  const total = data.reduce((sum, item) => sum + item.value, 0);
                  return (
                    <Row>
                      <Col 
                        xs={24} sm={6} md={4}
                        style={{ 
                          textAlign: 'center',
                          padding: '20px 16px',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'center',
                          alignItems: 'center',
                          borderRight: '1px solid #f0f0f0'
                        }}
                      >
                        <Text type="secondary" style={{ fontSize: 12 }}>空域总数</Text>
                        <Text strong style={{ fontSize: 32, color: '#1677ff' }}>{total}</Text>
                        <Text type="secondary" style={{ fontSize: 12 }}>个</Text>
                      </Col>
                      <Col xs={24} sm={18} md={20}>
                        <Row>
                          {data.map((item, i) => (
                            <Col xs={12} sm={8} md={4} key={i} style={{ textAlign: 'center', padding: '14px 12px' }}>
                              <div 
                                style={{ 
                                  width: 36, 
                                  height: 36, 
                                  borderRadius: 8, 
                                  background: item.bgColor,
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  marginBottom: 6
                                }}
                              >
                                <div style={{ width: 12, height: 12, borderRadius: 3, background: item.color }} />
                              </div>
                              <br />
                              <Text strong style={{ fontSize: 20, color: item.color }}>{item.value}</Text>
                              <br />
                              <Text type="secondary" style={{ fontSize: 12 }}>{item.label}</Text>
                            </Col>
                          ))}
                        </Row>
                      </Col>
                    </Row>
                  );
                })()}
              </Card>
            </Col>

            <Col span={24}>
              <Card 
                title={<span style={{ fontWeight: 600 }}>空域列表</span>}
                style={{ borderRadius: 8 }}
                extra={
                  <Space>
                    <Text type="secondary">共 {filteredData.length} 条记录</Text>
                  </Space>
                }
              >
                <div style={{ marginBottom: 16, padding: '12px 16px', background: '#fafafa', borderRadius: 8 }}>
                  <Row gutter={16} align="middle">
                    <Col flex="auto">
                      <Space wrap>
                        <Input.Search
                          placeholder="搜索空域名称或编号..."
                          allowClear
                          style={{ width: 300 }}
                          value={searchKeyword}
                          onChange={(e) => setSearchKeyword(e.target.value)}
                          onSearch={handleSearch}
                          enterButton={<SearchOutlined />}
                        />
                        <Select
                          style={{ width: 150 }}
                          value={selectedType}
                          onChange={setSelectedType}
                          options={AIRSPACE_TYPES}
                        />
                      </Space>
                    </Col>
                    <Col>
                      <Segmented
                        value={viewMode}
                        onChange={setViewMode}
                        options={[
                          { label: '地图视图', value: 'map', icon: <GlobalOutlined /> },
                          { label: '列表视图', value: 'list', icon: <EnvironmentOutlined /> }
                        ]}
                      />
                    </Col>
                  </Row>
                </div>
                {viewMode === 'list' ? (
                  <Table
                    dataSource={filteredData}
                    columns={columns}
                    rowKey="id"
                    pagination={{ pageSize: 10 }}
                    onRow={(record) => ({
                      onClick: () => handleRowClick(record),
                      style: { cursor: 'pointer' }
                    })}
                  />
                ) : (
                  <div 
                    style={{ 
                      height: 400, 
                      background: 'linear-gradient(135deg, #e6f4ff 0%, #f0f5ff 100%)', 
                      borderRadius: 8,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'relative',
                      overflow: 'hidden'
                    }}
                  >
                    <div style={{ textAlign: 'center', color: '#1677ff' }}>
                      <GlobalOutlined style={{ fontSize: 64, marginBottom: 16, opacity: 0.3 }} />
                      <br />
                      <Text style={{ fontSize: 16, color: '#999' }}>地图可视化视图</Text>
                      <br />
                      <Text type="secondary" style={{ fontSize: 12 }}>
                        点击空域卡片查看详情
                      </Text>
                    </div>
                    
                    {filteredData.slice(0, 6).map((item, i) => {
                      const positions = [
                        { top: '15%', left: '20%' },
                        { top: '25%', left: '60%' },
                        { top: '45%', left: '30%' },
                        { top: '55%', left: '70%' },
                        { top: '75%', left: '25%' },
                        { top: '70%', left: '55%' }
                      ];
                      const typeConfig = getTypeTag(item.type);
                      return (
                        <div
                          key={item.id}
                          onClick={() => handleRowClick(item)}
                          style={{
                            position: 'absolute',
                            top: positions[i].top,
                            left: positions[i].left,
                            padding: '8px 12px',
                            background: '#fff',
                            borderRadius: 8,
                            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                            cursor: 'pointer',
                            transition: 'all 0.3s'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'scale(1.05)';
                            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'scale(1)';
                            e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
                          }}
                        >
                          <Tag color={typeConfig.color} style={{ margin: 0 }}>{item.id}</Tag>
                          <br />
                          <Text style={{ fontSize: 12 }}>{item.name}</Text>
                        </div>
                      );
                    })}
                  </div>
                )}
              </Card>
            </Col>

            <Col span={24}>
              <Card title={<span style={{ fontWeight: 600 }}>航路航线</span>} style={{ borderRadius: 8 }}>
                <Row gutter={[16, 16]}>
                  {ROUTES_DATA.map((route) => (
                    <Col xs={24} sm={12} lg={6} key={route.id}>
                      <Card 
                        hoverable
                        style={{ borderRadius: 8 }}
                        styles={{ body: { padding: 16 } }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                          <Text strong>{route.name}</Text>
                          <Tag color={route.status === 'available' ? 'success' : 'warning'}>
                            {route.status === 'available' ? '可用' : '限制'}
                          </Tag>
                        </div>
                        <Space direction="vertical" size={4}>
                          <Text type="secondary" style={{ fontSize: 12 }}>
                            <CompassOutlined style={{ marginRight: 4 }} />
                            航程：{route.distance}
                          </Text>
                          <Text type="secondary" style={{ fontSize: 12 }}>
                            <EnvironmentOutlined style={{ marginRight: 4 }} />
                            高度：{route.altitude}
                          </Text>
                        </Space>
                        <Button type="link" size="small" style={{ padding: '4px 0', marginTop: 8 }}>
                          查看详情 <RightOutlined />
                        </Button>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </Card>
            </Col>

            <Col span={24}>
              <Card 
                title={<span style={{ fontWeight: 600 }}><WarningOutlined style={{ color: '#ff4d4f', marginRight: 8 }} />临时管制公告</span>}
                style={{ borderRadius: 8 }}
                extra={<Badge count={2} />}
              >
                <Row gutter={[16, 16]}>
                  {[
                    { title: '春节期间空域临时管制通知', date: '2024-02-09 至 2024-02-17', urgent: true, desc: '春节期间城东区、城西区部分空域实施临时管制，请提前申请飞行许可。' },
                    { title: '重大活动期间临时禁飞通知', date: '2024-01-25 至 2024-01-26', urgent: true, desc: '重大活动期间，市中心区域临时禁飞，请勿违规飞行。' }
                  ].map((notice, i) => (
                    <Col xs={24} md={12} key={i}>
                      <Card 
                        hoverable
                        style={{ 
                          borderRadius: 8, 
                          border: notice.urgent ? '1px solid #ffccc7' : undefined,
                          height: '100%',
                          minHeight: 120
                        }}
                        styles={{ body: { padding: 16 } }}
                      >
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, height: '100%' }}>
                          <div 
                            style={{ 
                              width: 40, 
                              height: 40, 
                              borderRadius: 8, 
                              background: notice.urgent ? '#fff1f0' : '#fff7e6',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              flexShrink: 0
                            }}
                          >
                            <WarningOutlined style={{ fontSize: 20, color: notice.urgent ? '#ff4d4f' : '#fa8c16' }} />
                          </div>
                          <div style={{ flex: 1 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                              {notice.urgent && <Tag color="error" style={{ margin: 0 }}>紧急</Tag>}
                              <Text strong>{notice.title}</Text>
                            </div>
                            <Text type="secondary" style={{ fontSize: 12, display: 'block', marginBottom: 8 }}>
                              <ClockCircleOutlined style={{ marginRight: 4 }} />
                              {notice.date}
                            </Text>
                            <Text type="secondary" style={{ fontSize: 13, minHeight: 40, display: 'block' }}>{notice.desc}</Text>
                          </div>
                        </div>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </Card>
            </Col>
          </Row>
        </div>
      </Content>

      <Drawer
        title="空域详情"
        placement="right"
        width={480}
        onClose={() => setDetailDrawerVisible(false)}
        open={detailDrawerVisible}
      >
        {selectedAirspace && (
          <div>
            <Card style={{ marginBottom: 16, borderRadius: 8 }}>
              <div style={{ textAlign: 'center' }}>
                <Tag color={getTypeTag(selectedAirspace.type).color} style={{ fontSize: 14, padding: '4px 12px' }}>
                  {getTypeTag(selectedAirspace.type).text}
                </Tag>
                <Title level={4} style={{ margin: '12px 0 4px' }}>{selectedAirspace.name}</Title>
                <Text type="secondary">{selectedAirspace.id}</Text>
              </div>
            </Card>
            
            <Descriptions column={1} bordered size="small">
              <Descriptions.Item label="空域类型">{getTypeTag(selectedAirspace.type).text}</Descriptions.Item>
              <Descriptions.Item label="高度范围">{selectedAirspace.altitude}</Descriptions.Item>
              <Descriptions.Item label="覆盖面积">{selectedAirspace.area}</Descriptions.Item>
              <Descriptions.Item label="当前状态">
                <Tag color={getStatusTag(selectedAirspace.status).color}>
                  {selectedAirspace.status === 'active' ? '启用中' : '已停用'}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="限制说明">{selectedAirspace.restrictions}</Descriptions.Item>
              {selectedAirspace.endDate && (
                <Descriptions.Item label="截止日期">{selectedAirspace.endDate}</Descriptions.Item>
              )}
            </Descriptions>

            <Divider />

            <Title level={5}>相关服务</Title>
            <Space direction="vertical" style={{ width: '100%' }}>
              <Button block icon={<FileTextOutlined />} href="/prototypes/flight-plan">
                申请飞行计划
              </Button>
              <Button block icon={<SafetyCertificateOutlined />} href="/prototypes/flight-permit">
                办理飞行许可
              </Button>
              <Button block icon={<CompassOutlined />} href="/prototypes/route-planning">
                规划航线
              </Button>
            </Space>
          </div>
        )}
      </Drawer>
    </Layout>
  );
};

export default Component;
