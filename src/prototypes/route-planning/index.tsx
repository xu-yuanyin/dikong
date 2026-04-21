/**
 * @name 航线规划
 *
 * 依托空域、气象、障碍物数据，自动规划最优、最安全飞行航线，精准规避风险区域
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
  Typography,
  Tag,
  Space,
  Table,
  Breadcrumb,
  Form,
  DatePicker,
  TimePicker,
  Modal,
  Steps,
  message,
  Drawer,
  Descriptions,
  Divider,
  Switch,
  Slider,
  Tooltip,
  Badge
} from 'antd';
import {
  CompassOutlined,
  FileTextOutlined,
  EnvironmentOutlined,
  SafetyCertificateOutlined,
  HomeOutlined,
  IdcardOutlined,
  PlusOutlined,
  SearchOutlined,
  DownloadOutlined,
  ArrowLeftOutlined,
  CalendarOutlined,
  RocketOutlined,
  EyeOutlined,
  ReloadOutlined,
  DeleteOutlined,
  EditOutlined,
  ThunderboltOutlined,
  WarningOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  SettingOutlined,
  AimOutlined,
  SwapOutlined
} from '@ant-design/icons';

const { Sider, Content } = Layout;
const { Title, Text } = Typography;

const ROUTE_STATUS = [
  { value: 'all', label: '全部状态' },
  { value: 'active', label: '使用中' },
  { value: 'draft', label: '草稿' },
  { value: 'expired', label: '已过期' }
];

const STATUS_CONFIG: Record<string, { color: string; text: string }> = {
  active: { color: 'success', text: '使用中' },
  draft: { color: 'default', text: '草稿' },
  expired: { color: 'warning', text: '已过期' }
};

const ROUTE_DATA = [
  { id: 'RT202401001', name: '城东巡检航线', start: '城东起降点A', end: '城东起降点B', distance: 12.5, duration: 25, status: 'active', createTime: '2024-01-20' },
  { id: 'RT202401002', name: '跨区物流航线', start: '物流中心起降点', end: '城西配送站', distance: 18.3, duration: 35, status: 'active', createTime: '2024-01-18' },
  { id: 'RT202401003', name: '景区观光航线', start: '景区入口起降点', end: '观景台起降点', distance: 5.2, duration: 12, status: 'draft', createTime: '2024-01-15' },
  { id: 'RT202401004', name: '农业植保航线', start: '农田A区起降点', end: '农田B区起降点', distance: 8.7, duration: 18, status: 'expired', createTime: '2024-01-10' },
  { id: 'RT202401005', name: '应急救援航线', start: '应急中心起降点', end: '医院停机坪', distance: 6.8, duration: 10, status: 'active', createTime: '2024-01-08' }
];

const SERVICE_MENU = [
  { key: 'overview', label: '服务概览', icon: <HomeOutlined />, path: '/prototypes/flight-service' },
  { key: 'plan', label: '飞行计划填报', icon: <FileTextOutlined />, path: '/prototypes/flight-plan' },
  { key: 'airspace', label: '空域信息查询', icon: <EnvironmentOutlined />, path: '/prototypes/airspace-query' },
  { key: 'permit', label: '飞行许可办理', icon: <SafetyCertificateOutlined />, path: '/prototypes/flight-permit' },
  { key: 'route', label: '航线规划', icon: <CompassOutlined />, path: '/prototypes/route-planning' },
  { key: 'landing', label: '起降点服务', icon: <HomeOutlined />, path: '/prototypes/landing-point' },
  { key: 'qualification', label: '资质办理', icon: <IdcardOutlined />, path: '/prototypes/qualification' }
];

const Component: React.FC = () => {
  const [selectedMenu, setSelectedMenu] = useState('route');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [planModalVisible, setPlanModalVisible] = useState(false);
  const [detailDrawerVisible, setDetailDrawerVisible] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState<any>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [form] = Form.useForm();
  const [avoidObstacles, setAvoidObstacles] = useState(true);
  const [avoidNoFly, setAvoidNoFly] = useState(true);
  const [altitude, setAltitude] = useState(120);

  const columns = [
    {
      title: '航线编号',
      dataIndex: 'id',
      key: 'id',
      width: 130,
      render: (text: string) => <Text strong style={{ color: '#fa8c16' }}>{text}</Text>
    },
    {
      title: '航线名称',
      dataIndex: 'name',
      key: 'name',
      width: 130
    },
    {
      title: '起点',
      dataIndex: 'start',
      key: 'start',
      width: 150
    },
    {
      title: '终点',
      dataIndex: 'end',
      key: 'end',
      width: 150
    },
    {
      title: '距离(km)',
      dataIndex: 'distance',
      key: 'distance',
      width: 90,
      render: (v: number) => <Text>{v}</Text>
    },
    {
      title: '时长(分钟)',
      dataIndex: 'duration',
      key: 'duration',
      width: 100
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 90,
      render: (status: string) => {
        const config = STATUS_CONFIG[status];
        return <Tag color={config.color}>{config.text}</Tag>;
      }
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      width: 100
    },
    {
      title: '操作',
      key: 'action',
      width: 120,
      render: (_: any, record: any) => (
        <Space size="small">
          <Button type="link" size="small" icon={<EyeOutlined />} onClick={() => handleViewDetail(record)} title="查看" />
          <Button type="link" size="small" icon={<EditOutlined />} title="编辑" />
          <Button type="link" size="small" danger icon={<DeleteOutlined />} title="删除" />
        </Space>
      )
    }
  ];

  const handleViewDetail = (record: any) => {
    setSelectedRoute(record);
    setDetailDrawerVisible(true);
  };

  const handlePlanRoute = () => {
    setPlanModalVisible(true);
    setCurrentStep(0);
    form.resetFields();
  };

  const filteredData = ROUTE_DATA.filter(item => {
    const matchStatus = selectedStatus === 'all' || item.status === selectedStatus;
    const matchKeyword = !searchKeyword || 
      item.id.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      item.name.includes(searchKeyword) ||
      item.start.includes(searchKeyword) ||
      item.end.includes(searchKeyword);
    return matchStatus && matchKeyword;
  });

  const stats = [
    { label: '使用中', value: 3, color: '#52c41a', status: 'active' },
    { label: '草稿', value: 1, color: '#999', status: 'draft' },
    { label: '已过期', value: 1, color: '#faad14', status: 'expired' }
  ];

  return (
    <Layout style={{ minHeight: '100vh', background: '#f5f7fa' }}>
      <Sider
        width={220}
        style={{ background: '#fff', borderRight: '1px solid #f0f0f0' }}
        theme="light"
      >
        <div style={{ padding: '20px 16px', borderBottom: '1px solid #f0f0f0' }}>
          <Title level={4} style={{ margin: 0, color: '#fa8c16' }}>
            <CompassOutlined style={{ marginRight: 8 }} />
            航线规划
          </Title>
          <Text type="secondary" style={{ fontSize: 12 }}>
            智能规划最优航线
          </Text>
        </div>
        <Menu
          mode="inline"
          selectedKeys={[selectedMenu]}
          items={SERVICE_MENU.map(item => ({
            key: item.key,
            label: <a href={item.path} onClick={(e) => { e.preventDefault(); window.location.href = item.path; }}>{item.label}</a>,
            icon: item.icon
          }))}
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
                    { title: '航线规划' }
                  ]}
                />
                <Title level={4} style={{ margin: '8px 0 0' }}>
                  航线规划
                </Title>
              </div>
              <Space>
                <Button type="primary" icon={<PlusOutlined />} onClick={handlePlanRoute}>
                  规划新航线
                </Button>
                <Button icon={<DownloadOutlined />}>导出</Button>
              </Space>
            </div>
          </Card>

          <Row gutter={[24, 24]}>
            <Col span={24}>
              <Card style={{ borderRadius: 8 }}>
                <Row gutter={16}>
                  {stats.map((stat, i) => (
                    <Col flex="1" key={i}>
                      <Card 
                        size="small" 
                        style={{ borderRadius: 8, textAlign: 'center', cursor: 'pointer' }}
                        styles={{ body: { padding: 16 } }}
                        onClick={() => setSelectedStatus(stat.status)}
                      >
                        <Text strong style={{ fontSize: 28, color: stat.color }}>{stat.value}</Text>
                        <br />
                        <Text type="secondary">{stat.label}</Text>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </Card>
            </Col>

            <Col span={24}>
              <Card style={{ borderRadius: 8 }}>
                <Row gutter={16} align="middle" style={{ marginBottom: 16 }}>
                  <Col flex="auto">
                    <Space wrap>
                      <Input.Search
                        placeholder="搜索航线编号、名称、起终点..."
                        allowClear
                        style={{ width: 280 }}
                        value={searchKeyword}
                        onChange={(e) => setSearchKeyword(e.target.value)}
                        enterButton={<SearchOutlined />}
                      />
                      <Select
                        style={{ width: 120 }}
                        value={selectedStatus}
                        onChange={setSelectedStatus}
                        options={ROUTE_STATUS}
                      />
                    </Space>
                  </Col>
                  <Col>
                    <Button icon={<ReloadOutlined />}>刷新</Button>
                  </Col>
                </Row>

                <Table
                  dataSource={filteredData}
                  columns={columns}
                  rowKey="id"
                  pagination={{ pageSize: 10 }}
                />
              </Card>
            </Col>

            <Col span={12}>
              <Card 
                title={<span style={{ fontWeight: 600 }}>规划流程</span>} 
                style={{ borderRadius: 8, height: '100%' }}
                styles={{ body: { minHeight: 220 } }}
              >
                <Steps
                  current={-1}
                  direction="vertical"
                  items={[
                    { title: '选择起终点', description: '设置起飞和降落位置', icon: <AimOutlined /> },
                    { title: '参数配置', description: '设置飞行高度、速度等参数', icon: <SettingOutlined /> },
                    { title: '智能规划', description: '系统自动计算最优航线', icon: <CompassOutlined /> },
                    { title: '确认保存', description: '预览并保存航线方案', icon: <CheckCircleOutlined /> }
                  ]}
                />
              </Card>
            </Col>

            <Col span={12}>
              <Card 
                title={<span style={{ fontWeight: 600 }}>规划须知</span>}
                style={{ borderRadius: 8, height: '100%' }}
                styles={{ body: { minHeight: 220 } }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                    <WarningOutlined style={{ color: '#faad14', marginTop: 4 }} />
                    <div>
                      <Text strong>禁飞区规避</Text>
                      <br />
                      <Text type="secondary">系统自动识别并规避禁飞区、限飞区</Text>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                    <WarningOutlined style={{ color: '#faad14', marginTop: 4 }} />
                    <div>
                      <Text strong>障碍物规避</Text>
                      <br />
                      <Text type="secondary">自动规避高层建筑、电力线等障碍物</Text>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                    <ThunderboltOutlined style={{ color: '#1677ff', marginTop: 4 }} />
                    <div>
                      <Text strong>气象因素</Text>
                      <br />
                      <Text type="secondary">综合考虑风速、能见度等气象条件</Text>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                    <CheckCircleOutlined style={{ color: '#52c41a', marginTop: 4 }} />
                    <div>
                      <Text strong>最优路径</Text>
                      <br />
                      <Text type="secondary">智能计算最短、最安全飞行路径</Text>
                    </div>
                  </div>
                </div>
              </Card>
            </Col>
          </Row>
        </div>
      </Content>

      <Modal
        title="规划新航线"
        open={planModalVisible}
        onCancel={() => setPlanModalVisible(false)}
        width={800}
        footer={null}
      >
        <Steps
          current={currentStep}
          size="small"
          style={{ marginBottom: 24 }}
          items={[
            { title: '选择起终点' },
            { title: '参数配置' },
            { title: '确认规划' }
          ]}
        />

        {currentStep === 0 && (
          <Form form={form} layout="vertical">
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item name="startPoint" label="起飞点" rules={[{ required: true, message: '请选择起飞点' }]}>
                  <Select 
                    placeholder="请选择起飞点" 
                    showSearch
                    options={[
                      { value: 'point-a', label: '城东起降点A' },
                      { value: 'point-b', label: '城西起降点B' },
                      { value: 'point-c', label: '物流中心起降点' },
                      { value: 'point-d', label: '应急中心起降点' }
                    ]}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="endPoint" label="降落点" rules={[{ required: true, message: '请选择降落点' }]}>
                  <Select 
                    placeholder="请选择降落点" 
                    showSearch
                    options={[
                      { value: 'point-a', label: '城东起降点A' },
                      { value: 'point-b', label: '城西起降点B' },
                      { value: 'point-c', label: '物流中心起降点' },
                      { value: 'point-d', label: '应急中心起降点' }
                    ]}
                  />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item name="routeName" label="航线名称" rules={[{ required: true, message: '请输入航线名称' }]}>
                  <Input placeholder="请输入航线名称" />
                </Form.Item>
              </Col>
            </Row>
            <Divider />
            <Space style={{ width: '100%', justifyContent: 'flex-end' }}>
              <Button onClick={() => setPlanModalVisible(false)}>取消</Button>
              <Button type="primary" onClick={() => setCurrentStep(1)}>下一步</Button>
            </Space>
          </Form>
        )}

        {currentStep === 1 && (
          <div>
            <Card size="small" style={{ marginBottom: 16 }}>
              <Row gutter={16}>
                <Col span={12}>
                  <div style={{ marginBottom: 16 }}>
                    <Text strong>规避设置</Text>
                  </div>
                  <Space direction="vertical" style={{ width: '100%' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Text>规避障碍物</Text>
                      <Switch checked={avoidObstacles} onChange={setAvoidObstacles} />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Text>规避禁飞区</Text>
                      <Switch checked={avoidNoFly} onChange={setAvoidNoFly} />
                    </div>
                  </Space>
                </Col>
                <Col span={12}>
                  <div style={{ marginBottom: 16 }}>
                    <Text strong>飞行参数</Text>
                  </div>
                  <div>
                    <Text>飞行高度: {altitude}m</Text>
                    <Slider 
                      value={altitude} 
                      onChange={setAltitude}
                      min={50} 
                      max={300} 
                      step={10}
                      marks={{ 50: '50m', 120: '120m', 300: '300m' }}
                    />
                  </div>
                </Col>
              </Row>
            </Card>
            <Divider />
            <Space style={{ width: '100%', justifyContent: 'flex-end' }}>
              <Button onClick={() => setCurrentStep(0)}>上一步</Button>
              <Button type="primary" onClick={() => {
                setCurrentStep(2);
                message.success('航线规划完成');
              }}>开始规划</Button>
            </Space>
          </div>
        )}

        {currentStep === 2 && (
          <div>
            <Card style={{ textAlign: 'center', padding: 24 }}>
              <CheckCircleOutlined style={{ fontSize: 64, color: '#52c41a', marginBottom: 16 }} />
              <Title level={4}>航线规划成功</Title>
              <Text type="secondary">已为您规划最优航线，预计飞行距离 15.2km，飞行时间 28分钟</Text>
              <div style={{ marginTop: 24 }}>
                <Space>
                  <Button onClick={() => { setCurrentStep(0); form.resetFields(); }}>重新规划</Button>
                  <Button type="primary" onClick={() => { setPlanModalVisible(false); setCurrentStep(0); }}>保存航线</Button>
                </Space>
              </div>
            </Card>
          </div>
        )}
      </Modal>

      <Drawer
        title="航线详情"
        placement="right"
        width={480}
        onClose={() => setDetailDrawerVisible(false)}
        open={detailDrawerVisible}
      >
        {selectedRoute && (
          <div>
            <Descriptions column={1} bordered size="small">
              <Descriptions.Item label="航线编号">
                <Text strong style={{ color: '#fa8c16' }}>{selectedRoute.id}</Text>
              </Descriptions.Item>
              <Descriptions.Item label="航线名称">{selectedRoute.name}</Descriptions.Item>
              <Descriptions.Item label="起点">{selectedRoute.start}</Descriptions.Item>
              <Descriptions.Item label="终点">{selectedRoute.end}</Descriptions.Item>
              <Descriptions.Item label="飞行距离">{selectedRoute.distance} km</Descriptions.Item>
              <Descriptions.Item label="预计时长">{selectedRoute.duration} 分钟</Descriptions.Item>
              <Descriptions.Item label="状态">
                <Tag color={STATUS_CONFIG[selectedRoute.status].color}>{STATUS_CONFIG[selectedRoute.status].text}</Tag>
              </Descriptions.Item>
              <Descriptions.Item label="创建时间">{selectedRoute.createTime}</Descriptions.Item>
            </Descriptions>

            <Divider />

            <Title level={5}>航线途经点</Title>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <Badge color="#52c41a" />
              <Text>{selectedRoute.start}</Text>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginLeft: 6, marginBottom: 8 }}>
              <div style={{ width: 2, height: 24, background: '#d9d9d9' }}></div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <Badge color="#1677ff" />
              <Text>途经点1: 城区上空</Text>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginLeft: 6, marginBottom: 8 }}>
              <div style={{ width: 2, height: 24, background: '#d9d9d9' }}></div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Badge color="#ff4d4f" />
              <Text>{selectedRoute.end}</Text>
            </div>

            <Divider />

            <Space style={{ width: '100%' }} direction="vertical">
              <Button block icon={<EyeOutlined />}>查看地图</Button>
              <Button block icon={<EditOutlined />}>编辑航线</Button>
              <Button block icon={<DownloadOutlined />}>导出航线</Button>
            </Space>
          </div>
        )}
      </Drawer>
    </Layout>
  );
};

export default Component;
