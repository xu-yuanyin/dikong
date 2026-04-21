/**
 * @name 起降点服务
 *
 * 提供区域内合规起降点位置、设施、预约及使用费用等信息查询与预约服务
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
  Modal,
  Descriptions,
  Divider,
  Rate,
  Image,
  Badge,
  Tooltip
} from 'antd';
import {
  HomeOutlined,
  FileTextOutlined,
  EnvironmentOutlined,
  SafetyCertificateOutlined,
  CompassOutlined,
  IdcardOutlined,
  PlusOutlined,
  SearchOutlined,
  DownloadOutlined,
  ArrowLeftOutlined,
  CalendarOutlined,
  EyeOutlined,
  ReloadOutlined,
  PhoneOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  WifiOutlined,
  CarOutlined,
  ToolOutlined,
  StarOutlined
} from '@ant-design/icons';

const { Sider, Content } = Layout;
const { Title, Text } = Typography;

const POINT_TYPES = [
  { value: 'all', label: '全部类型' },
  { value: 'public', label: '公共起降点' },
  { value: 'commercial', label: '商业起降点' },
  { value: 'emergency', label: '应急起降点' },
  { value: 'private', label: '私人起降点' }
];

const POINT_STATUS = [
  { value: 'all', label: '全部状态' },
  { value: 'available', label: '可用' },
  { value: 'busy', label: '繁忙' },
  { value: 'maintenance', label: '维护中' }
];

const STATUS_CONFIG: Record<string, { color: string; text: string }> = {
  available: { color: 'success', text: '可用' },
  busy: { color: 'warning', text: '繁忙' },
  maintenance: { color: 'error', text: '维护中' }
};

const TYPE_CONFIG: Record<string, { color: string; text: string }> = {
  public: { color: 'blue', text: '公共起降点' },
  commercial: { color: 'purple', text: '商业起降点' },
  emergency: { color: 'red', text: '应急起降点' },
  private: { color: 'default', text: '私人起降点' }
};

const POINT_DATA = [
  { id: 'LP001', name: '城东起降点A', type: 'public', address: '城东区科技大道88号', facilities: ['充电桩', '停机坪', '休息室'], fee: 50, rating: 4.5, status: 'available', openTime: '06:00-22:00', phone: '0571-88888881' },
  { id: 'LP002', name: '物流中心起降点', type: 'commercial', address: '物流园区B区12号', facilities: ['充电桩', '仓库', '维修站'], fee: 80, rating: 4.8, status: 'available', openTime: '00:00-24:00', phone: '0571-88888882' },
  { id: 'LP003', name: '应急中心起降点', type: 'emergency', address: '应急管理中心院内', facilities: ['充电桩', '医疗站', '指挥中心'], fee: 0, rating: 4.9, status: 'available', openTime: '00:00-24:00', phone: '0571-88888883' },
  { id: 'LP004', name: '城西起降点B', type: 'public', address: '城西区人民路168号', facilities: ['充电桩', '停机坪'], fee: 45, rating: 4.2, status: 'busy', openTime: '07:00-21:00', phone: '0571-88888884' },
  { id: 'LP005', name: '景区观光起降点', type: 'commercial', address: '西湖景区南门', facilities: ['充电桩', '休息室', '售票处'], fee: 120, rating: 4.7, status: 'maintenance', openTime: '08:00-18:00', phone: '0571-88888885' },
  { id: 'LP006', name: '农业园区起降点', type: 'private', address: '农业示范区A区', facilities: ['充电桩', '农药储存间'], fee: 30, rating: 4.0, status: 'available', openTime: '05:00-20:00', phone: '0571-88888886' }
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

const FACILITY_ICONS: Record<string, React.ReactNode> = {
  '充电桩': <ToolOutlined style={{ color: '#52c41a' }} />,
  '停机坪': <HomeOutlined style={{ color: '#1677ff' }} />,
  '休息室': <HomeOutlined style={{ color: '#722ed1' }} />,
  '仓库': <HomeOutlined style={{ color: '#fa8c16' }} />,
  '维修站': <ToolOutlined style={{ color: '#13c2c2' }} />,
  '医疗站': <HomeOutlined style={{ color: '#ff4d4f' }} />,
  '指挥中心': <HomeOutlined style={{ color: '#eb2f96' }} />,
  '售票处': <HomeOutlined style={{ color: '#faad14' }} />,
  '农药储存间': <ToolOutlined style={{ color: '#52c41a' }} />
};

const Component: React.FC = () => {
  const [selectedMenu, setSelectedMenu] = useState('landing');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [reserveModalVisible, setReserveModalVisible] = useState(false);
  const [selectedPoint, setSelectedPoint] = useState<any>(null);

  const columns = [
    {
      title: '起降点编号',
      dataIndex: 'id',
      key: 'id',
      width: 120,
      render: (text: string) => <Text strong style={{ color: '#52c41a' }}>{text}</Text>
    },
    {
      title: '起降点名称',
      dataIndex: 'name',
      key: 'name',
      width: 140
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
      width: 100,
      render: (type: string) => {
        const config = TYPE_CONFIG[type];
        return <Tag color={config.color}>{config.text}</Tag>;
      }
    },
    {
      title: '地址',
      dataIndex: 'address',
      key: 'address',
      width: 180
    },
    {
      title: '设施',
      dataIndex: 'facilities',
      key: 'facilities',
      width: 180,
      render: (facilities: string[]) => (
        <Space size={4} wrap>
          {facilities.slice(0, 3).map((f, i) => (
            <Tooltip key={i} title={f}>
              <Tag style={{ margin: 0 }}>{FACILITY_ICONS[f]} {f}</Tag>
            </Tooltip>
          ))}
        </Space>
      )
    },
    {
      title: '费用(元/次)',
      dataIndex: 'fee',
      key: 'fee',
      width: 90,
      render: (fee: number) => <Text>{fee === 0 ? '免费' : `¥${fee}`}</Text>
    },
    {
      title: '评分',
      dataIndex: 'rating',
      key: 'rating',
      width: 100,
      render: (rating: number) => <Rate disabled defaultValue={rating} style={{ fontSize: 12 }} />
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 80,
      render: (status: string) => {
        const config = STATUS_CONFIG[status];
        return <Tag color={config.color}>{config.text}</Tag>;
      }
    },
    {
      title: '操作',
      key: 'action',
      width: 120,
      render: (_: any, record: any) => (
        <Space size="small">
          <Button type="link" size="small" icon={<EyeOutlined />} onClick={() => handleViewDetail(record)} title="查看" />
          <Button type="link" size="small" icon={<CalendarOutlined />} onClick={() => handleReserve(record)} title="预约" disabled={record.status !== 'available'} />
        </Space>
      )
    }
  ];

  const handleViewDetail = (record: any) => {
    setSelectedPoint(record);
    setDetailModalVisible(true);
  };

  const handleReserve = (record: any) => {
    setSelectedPoint(record);
    setReserveModalVisible(true);
  };

  const filteredData = POINT_DATA.filter(item => {
    const matchType = selectedType === 'all' || item.type === selectedType;
    const matchStatus = selectedStatus === 'all' || item.status === selectedStatus;
    const matchKeyword = !searchKeyword || 
      item.id.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      item.name.includes(searchKeyword) ||
      item.address.includes(searchKeyword);
    return matchType && matchStatus && matchKeyword;
  });

  const stats = [
    { label: '可用', value: 4, color: '#52c41a', status: 'available' },
    { label: '繁忙', value: 1, color: '#faad14', status: 'busy' },
    { label: '维护中', value: 1, color: '#ff4d4f', status: 'maintenance' }
  ];

  return (
    <Layout style={{ minHeight: '100vh', background: '#f5f7fa' }}>
      <Sider
        width={220}
        style={{ background: '#fff', borderRight: '1px solid #f0f0f0' }}
        theme="light"
      >
        <div style={{ padding: '20px 16px', borderBottom: '1px solid #f0f0f0' }}>
          <Title level={4} style={{ margin: 0, color: '#52c41a' }}>
            <HomeOutlined style={{ marginRight: 8 }} />
            起降点服务
          </Title>
          <Text type="secondary" style={{ fontSize: 12 }}>
            查询预约起降点
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
                    { title: '起降点服务' }
                  ]}
                />
                <Title level={4} style={{ margin: '8px 0 0' }}>
                  起降点服务
                </Title>
              </div>
              <Space>
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
                        placeholder="搜索起降点编号、名称、地址..."
                        allowClear
                        style={{ width: 280 }}
                        value={searchKeyword}
                        onChange={(e) => setSearchKeyword(e.target.value)}
                        enterButton={<SearchOutlined />}
                      />
                      <Select
                        style={{ width: 120 }}
                        value={selectedType}
                        onChange={setSelectedType}
                        options={POINT_TYPES}
                      />
                      <Select
                        style={{ width: 120 }}
                        value={selectedStatus}
                        onChange={setSelectedStatus}
                        options={POINT_STATUS}
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
                title={<span style={{ fontWeight: 600 }}>服务说明</span>} 
                style={{ borderRadius: 8, height: '100%' }}
                styles={{ body: { minHeight: 220 } }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                    <CheckCircleOutlined style={{ color: '#52c41a', marginTop: 4 }} />
                    <div>
                      <Text strong>在线预约</Text>
                      <br />
                      <Text type="secondary">支持在线预约起降点，实时查看可用状态</Text>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                    <CheckCircleOutlined style={{ color: '#52c41a', marginTop: 4 }} />
                    <div>
                      <Text strong>设施查询</Text>
                      <br />
                      <Text type="secondary">查看起降点配套设施，包括充电、维修等</Text>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                    <CheckCircleOutlined style={{ color: '#52c41a', marginTop: 4 }} />
                    <div>
                      <Text strong>费用透明</Text>
                      <br />
                      <Text type="secondary">明确收费标准，支持在线支付</Text>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                    <CheckCircleOutlined style={{ color: '#52c41a', marginTop: 4 }} />
                    <div>
                      <Text strong>评价反馈</Text>
                      <br />
                      <Text type="secondary">用户真实评价，助力选择优质起降点</Text>
                    </div>
                  </div>
                </div>
              </Card>
            </Col>

            <Col span={12}>
              <Card 
                title={<span style={{ fontWeight: 600 }}>使用须知</span>}
                style={{ borderRadius: 8, height: '100%' }}
                styles={{ body: { minHeight: 220 } }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                    <ClockCircleOutlined style={{ color: '#1677ff', marginTop: 4 }} />
                    <div>
                      <Text strong>预约时间</Text>
                      <br />
                      <Text type="secondary">请提前至少2小时预约，确保起降点可用</Text>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                    <EnvironmentOutlined style={{ color: '#722ed1', marginTop: 4 }} />
                    <div>
                      <Text strong>到达确认</Text>
                      <br />
                      <Text type="secondary">到达后请在前台或自助终端确认签到</Text>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                    <ToolOutlined style={{ color: '#fa8c16', marginTop: 4 }} />
                    <div>
                      <Text strong>设施使用</Text>
                      <br />
                      <Text type="secondary">请按规范使用设施，如有问题请联系工作人员</Text>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                    <PhoneOutlined style={{ color: '#13c2c2', marginTop: 4 }} />
                    <div>
                      <Text strong>联系方式</Text>
                      <br />
                      <Text type="secondary">服务热线：400-XXX-XXXX</Text>
                    </div>
                  </div>
                </div>
              </Card>
            </Col>
          </Row>
        </div>
      </Content>

      <Modal
        title="起降点详情"
        open={detailModalVisible}
        onCancel={() => setDetailModalVisible(false)}
        width={640}
        footer={[
          <Button key="close" onClick={() => setDetailModalVisible(false)}>关闭</Button>,
          selectedPoint?.status === 'available' && (
            <Button key="reserve" type="primary" icon={<CalendarOutlined />} onClick={() => { setDetailModalVisible(false); handleReserve(selectedPoint); }}>
              立即预约
            </Button>
          )
        ]}
      >
        {selectedPoint && (
          <div>
            <Descriptions column={2} bordered size="small">
              <Descriptions.Item label="起降点编号">
                <Text strong style={{ color: '#52c41a' }}>{selectedPoint.id}</Text>
              </Descriptions.Item>
              <Descriptions.Item label="起降点名称">{selectedPoint.name}</Descriptions.Item>
              <Descriptions.Item label="类型">
                <Tag color={TYPE_CONFIG[selectedPoint.type].color}>{TYPE_CONFIG[selectedPoint.type].text}</Tag>
              </Descriptions.Item>
              <Descriptions.Item label="状态">
                <Tag color={STATUS_CONFIG[selectedPoint.status].color}>{STATUS_CONFIG[selectedPoint.status].text}</Tag>
              </Descriptions.Item>
              <Descriptions.Item label="地址" span={2}>{selectedPoint.address}</Descriptions.Item>
              <Descriptions.Item label="开放时间">{selectedPoint.openTime}</Descriptions.Item>
              <Descriptions.Item label="联系电话">{selectedPoint.phone}</Descriptions.Item>
              <Descriptions.Item label="使用费用">{selectedPoint.fee === 0 ? '免费' : `¥${selectedPoint.fee}/次`}</Descriptions.Item>
              <Descriptions.Item label="用户评分">
                <Rate disabled defaultValue={selectedPoint.rating} style={{ fontSize: 12 }} />
                <Text type="secondary" style={{ marginLeft: 8 }}>{selectedPoint.rating}分</Text>
              </Descriptions.Item>
              <Descriptions.Item label="配套设施" span={2}>
                <Space size={4} wrap>
                  {selectedPoint.facilities.map((f: string, i: number) => (
                    <Tag key={i}>{FACILITY_ICONS[f]} {f}</Tag>
                  ))}
                </Space>
              </Descriptions.Item>
            </Descriptions>

            <Divider />

            <Title level={5}>位置示意</Title>
            <div 
              style={{ 
                height: 200, 
                background: 'linear-gradient(135deg, #e6f4ff 0%, #f0f5ff 100%)', 
                borderRadius: 8,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <div style={{ textAlign: 'center', color: '#1677ff' }}>
                <EnvironmentOutlined style={{ fontSize: 48, marginBottom: 8, opacity: 0.5 }} />
                <br />
                <Text type="secondary">地图位置展示区域</Text>
              </div>
            </div>
          </div>
        )}
      </Modal>

      <Modal
        title="预约起降点"
        open={reserveModalVisible}
        onCancel={() => setReserveModalVisible(false)}
        width={480}
        footer={[
          <Button key="cancel" onClick={() => setReserveModalVisible(false)}>取消</Button>,
          <Button key="submit" type="primary" onClick={() => {
            setReserveModalVisible(false);
            Modal.success({
              title: '预约成功',
              content: `您已成功预约${selectedPoint?.name}，请按时到达。`
            });
          }}>确认预约</Button>
        ]}
      >
        {selectedPoint && (
          <div>
            <Descriptions column={1} bordered size="small">
              <Descriptions.Item label="起降点名称">{selectedPoint.name}</Descriptions.Item>
              <Descriptions.Item label="地址">{selectedPoint.address}</Descriptions.Item>
              <Descriptions.Item label="使用费用">{selectedPoint.fee === 0 ? '免费' : `¥${selectedPoint.fee}/次`}</Descriptions.Item>
            </Descriptions>
            <Divider />
            <div style={{ marginBottom: 16 }}>
              <Text strong>预约信息</Text>
            </div>
            <Row gutter={16}>
              <Col span={12}>
                <Text type="secondary">预约日期</Text>
                <br />
                <Text>2024-01-25</Text>
              </Col>
              <Col span={12}>
                <Text type="secondary">预约时段</Text>
                <br />
                <Text>10:00 - 12:00</Text>
              </Col>
            </Row>
          </div>
        )}
      </Modal>
    </Layout>
  );
};

export default Component;
