/**
 * @name 许可列表
 *
 * 提供飞行许可在线办理、临时飞行报备、跨区域飞行审批等服务
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
  Badge,
  Breadcrumb,
  Tabs,
  Form,
  DatePicker,
  TimePicker,
  Modal,
  Steps,
  message,
  Timeline,
  Descriptions,
  Divider,
  Result
} from 'antd';
import {
  SafetyCertificateOutlined,
  FileTextOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  RightOutlined,
  PlusOutlined,
  SearchOutlined,
  FilterOutlined,
  DownloadOutlined,
  ArrowLeftOutlined,
  EnvironmentOutlined,
  CalendarOutlined,
  UserOutlined,
  RocketOutlined,
  AuditOutlined,
  SendOutlined,
  EyeOutlined,
  ReloadOutlined,
  EditOutlined,
  DeleteOutlined
} from '@ant-design/icons';

const { Sider, Content } = Layout;
const { Title, Text } = Typography;

const PERMIT_TYPES = [
  { value: 'general', label: '一般飞行许可' },
  { value: 'temporary', label: '临时飞行报备' },
  { value: 'cross-region', label: '跨区域飞行审批' },
  { value: 'special', label: '特殊飞行许可' }
];

const STATUS_CONFIG: Record<string, { color: string; text: string; icon: React.ReactNode }> = {
  pending: { color: 'processing', text: '审核中', icon: <ClockCircleOutlined /> },
  pending_publish: { color: 'cyan', text: '待发布', icon: <SendOutlined /> },
  approved: { color: 'success', text: '已通过', icon: <CheckCircleOutlined /> },
  rejected: { color: 'error', text: '已驳回', icon: <CloseCircleOutlined /> },
  draft: { color: 'default', text: '草稿', icon: <ExclamationCircleOutlined /> },
  expired: { color: 'warning', text: '已过期', icon: <ExclamationCircleOutlined /> }
};

const PERMIT_DATA = [
  { id: 'PM202401001', type: 'general', applicant: '张三', aircraft: 'DJI M300', area: '城东区A类空域', date: '2024-01-20', status: 'approved', validFrom: '2024-01-22', validTo: '2024-01-25' },
  { id: 'PM202401002', type: 'temporary', applicant: '李四', aircraft: '大疆御3', area: '城西区B类空域', date: '2024-01-19', status: 'pending', validFrom: '2024-01-21', validTo: '2024-01-21' },
  { id: 'PM202401003', type: 'cross-region', applicant: '王五', aircraft: '固定翼无人机', area: '跨城区航线', date: '2024-01-18', status: 'pending_publish', validFrom: '2024-01-23', validTo: '2024-01-23' },
  { id: 'PM202401004', type: 'special', applicant: '赵六', aircraft: '直升机', area: '景区限飞区', date: '2024-01-17', status: 'rejected', validFrom: '-', validTo: '-' },
  { id: 'PM202401005', type: 'general', applicant: '钱七', aircraft: '多旋翼无人机', area: '工业区C类空域', date: '2024-01-16', status: 'expired', validFrom: '2024-01-10', validTo: '2024-01-15' },
  { id: 'PM202401006', type: 'general', applicant: '孙八', aircraft: 'DJI Mavic 3', area: '城南区D类空域', date: '2024-01-15', status: 'pending_publish', validFrom: '2024-01-25', validTo: '2024-01-28' }
];

const Component: React.FC = () => {
  const [selectedMenu, setSelectedMenu] = useState('list');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [applyModalVisible, setApplyModalVisible] = useState(false);
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [selectedPermit, setSelectedPermit] = useState<any>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [form] = Form.useForm();

  const SIDE_MENU = [
    { key: 'list', label: '许可列表', icon: <FileTextOutlined />, path: '/prototypes/flight-permit' },
    { key: 'temporary', label: '临时报备', icon: <ClockCircleOutlined />, path: '/prototypes/temporary-report' },
    { key: 'cross-region', label: '跨区域审批', icon: <EnvironmentOutlined />, path: '/prototypes/cross-region-approval' },
    { key: 'guide', label: '办理指南', icon: <AuditOutlined />, path: '/prototypes/permit-guide' }
  ];

  const menuItems = SIDE_MENU.map(item => ({
    key: item.key,
    label: item.label,
    icon: item.icon
  }));

  const columns = [
    {
      title: '许可编号',
      dataIndex: 'id',
      key: 'id',
      width: 140,
      render: (text: string) => <Text strong style={{ color: '#1677ff' }}>{text}</Text>
    },
    {
      title: '许可类型',
      dataIndex: 'type',
      key: 'type',
      width: 120,
      render: (type: string) => {
        const config = PERMIT_TYPES.find(t => t.value === type);
        return <Tag color={type === 'special' ? 'purple' : type === 'cross-region' ? 'cyan' : 'blue'}>{config?.label || type}</Tag>;
      }
    },
    {
      title: '申请人',
      dataIndex: 'applicant',
      key: 'applicant',
      width: 80
    },
    {
      title: '飞行器',
      dataIndex: 'aircraft',
      key: 'aircraft',
      width: 120
    },
    {
      title: '飞行区域',
      dataIndex: 'area',
      key: 'area',
      width: 140
    },
    {
      title: '申请日期',
      dataIndex: 'date',
      key: 'date',
      width: 100
    },
    {
      title: '有效期',
      key: 'valid',
      width: 180,
      render: (_: any, record: any) => (
        <Text type="secondary" style={{ fontSize: 12 }}>
          {record.validFrom} ~ {record.validTo}
        </Text>
      )
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 90,
      render: (status: string) => {
        const config = STATUS_CONFIG[status];
        return <Tag color={config.color} icon={config.icon}>{config.text}</Tag>;
      }
    },
    {
      title: '操作',
      key: 'action',
      width: 120,
      render: (_: any, record: any) => (
        <Space size="small">
          <Button type="link" size="small" icon={<EyeOutlined />} onClick={() => handleViewDetail(record)} />
          {record.status === 'pending' && (
            <Button type="link" size="small" icon={<CloseCircleOutlined />} title="撤回" />
          )}
          {record.status === 'pending_publish' && (
            <>
              <Button type="link" size="small" icon={<EditOutlined />} title="编辑" />
              <Button type="link" size="small" icon={<SendOutlined />} title="发布" />
              <Button type="link" size="small" danger icon={<DeleteOutlined />} title="删除" />
            </>
          )}
        </Space>
      )
    }
  ];

  const handleViewDetail = (record: any) => {
    setSelectedPermit(record);
    setDetailModalVisible(true);
  };

  const handleApply = () => {
    setApplyModalVisible(true);
    setCurrentStep(0);
    form.resetFields();
  };

  const handleSubmitApply = () => {
    form.validateFields().then(() => {
      setCurrentStep(2);
      setTimeout(() => {
        setApplyModalVisible(false);
        setCurrentStep(0);
        message.success('申请已提交，请等待审核');
      }, 1500);
    }).catch(() => {
      message.error('请完善申请信息');
    });
  };

  const filteredData = PERMIT_DATA.filter(item => {
    const matchType = selectedType === 'all' || item.type === selectedType;
    const matchStatus = selectedStatus === 'all' || item.status === selectedStatus;
    const matchKeyword = !searchKeyword || 
      item.id.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      item.applicant.includes(searchKeyword) ||
      item.area.includes(searchKeyword);
    return matchType && matchStatus && matchKeyword;
  });

  const stats = [
    { label: '待审核', value: 1, color: '#1677ff', status: 'pending' },
    { label: '待发布', value: 2, color: '#13c2c2', status: 'pending_publish' },
    { label: '已通过', value: 1, color: '#52c41a', status: 'approved' },
    { label: '已驳回', value: 1, color: '#ff4d4f', status: 'rejected' },
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
          <Title level={4} style={{ margin: 0, color: '#52c41a' }}>
            <SafetyCertificateOutlined style={{ marginRight: 8 }} />
            飞行许可办理
          </Title>
          <Text type="secondary" style={{ fontSize: 12 }}>
            在线办理飞行许可
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
            if (e.key === 'apply') {
              handleApply();
            }
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
                    { title: '飞行许可办理' }
                  ]}
                />
                <Title level={4} style={{ margin: '8px 0 0' }}>
                  飞行许可办理
                </Title>
              </div>
              <Space>
                <Button type="primary" icon={<PlusOutlined />} onClick={handleApply}>
                  新建申请
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
                        placeholder="搜索许可编号、申请人、区域..."
                        allowClear
                        style={{ width: 280 }}
                        value={searchKeyword}
                        onChange={(e) => setSearchKeyword(e.target.value)}
                        enterButton={<SearchOutlined />}
                      />
                      <Select
                        style={{ width: 140 }}
                        value={selectedType}
                        onChange={setSelectedType}
                        options={[{ value: 'all', label: '全部类型' }, ...PERMIT_TYPES]}
                      />
                      <Select
                        style={{ width: 120 }}
                        value={selectedStatus}
                        onChange={setSelectedStatus}
                        options={[
                          { value: 'all', label: '全部状态' },
                          { value: 'pending', label: '审核中' },
                          { value: 'pending_publish', label: '待发布' },
                          { value: 'approved', label: '已通过' },
                          { value: 'rejected', label: '已驳回' },
                          { value: 'expired', label: '已过期' }
                        ]}
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
                title={<span style={{ fontWeight: 600 }}>办理流程</span>} 
                style={{ borderRadius: 8, height: '100%' }}
                styles={{ body: { minHeight: 220 } }}
              >
                <Steps
                  current={-1}
                  direction="vertical"
                  items={[
                    { title: '提交申请', description: '填写申请信息', icon: <FileTextOutlined /> },
                    { title: '材料审核', description: '监管部门审核', icon: <AuditOutlined /> },
                    { title: '许可发放', description: '发放飞行许可', icon: <SafetyCertificateOutlined /> },
                    { title: '飞行执行', description: '按许可飞行', icon: <RocketOutlined /> }
                  ]}
                />
              </Card>
            </Col>

            <Col span={12}>
              <Card 
                title={<span style={{ fontWeight: 600 }}>办理须知</span>}
                style={{ borderRadius: 8, height: '100%' }}
                styles={{ body: { minHeight: 220 } }}
              >
                <Timeline
                  items={[
                    { color: 'blue', children: <><Text strong>申请材料</Text><br /><Text type="secondary">飞行计划、飞行器证明、操作员资质</Text></> },
                    { color: 'green', children: <><Text strong>办理时限</Text><br /><Text type="secondary">一般许可3个工作日，临时报备即时办理</Text></> },
                    { color: 'orange', children: <><Text strong>注意事项</Text><br /><Text type="secondary">跨区域飞行需提前5个工作日申请</Text></> },
                    { color: 'red', children: <><Text strong>违规处罚</Text><br /><Text type="secondary">未经许可飞行将依法处理</Text></> }
                  ]}
                />
              </Card>
            </Col>
          </Row>
        </div>
      </Content>

      <Modal
        title="新建飞行许可申请"
        open={applyModalVisible}
        onCancel={() => setApplyModalVisible(false)}
        width={720}
        footer={null}
      >
        <Steps
          current={currentStep}
          size="small"
          style={{ marginBottom: 24 }}
          items={[
            { title: '选择类型' },
            { title: '填写信息' },
            { title: '提交完成' }
          ]}
        />

        {currentStep === 0 && (
          <div>
            <Row gutter={[16, 16]}>
              {PERMIT_TYPES.map((type) => (
                <Col span={12} key={type.value}>
                  <Card
                    hoverable
                    style={{ borderRadius: 8, textAlign: 'center' }}
                    styles={{ body: { padding: 24 } }}
                    onClick={() => {
                      form.setFieldValue('permitType', type.value);
                      setCurrentStep(1);
                    }}
                  >
                    <SafetyCertificateOutlined style={{ fontSize: 32, color: '#1677ff', marginBottom: 8 }} />
                    <br />
                    <Text strong>{type.label}</Text>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        )}

        {currentStep === 1 && (
          <Form form={form} layout="vertical">
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item name="permitType" label="许可类型" rules={[{ required: true }]}>
                  <Select options={PERMIT_TYPES} disabled />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="aircraftType" label="飞行器类型" rules={[{ required: true, message: '请选择飞行器类型' }]}>
                  <Select placeholder="请选择" options={[
                    { value: 'multirotor', label: '多旋翼无人机' },
                    { value: 'fixed-wing', label: '固定翼无人机' },
                    { value: 'helicopter', label: '直升机' },
                    { value: 'vtol', label: '垂直起降固定翼' }
                  ]} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="aircraftReg" label="飞行器注册号" rules={[{ required: true, message: '请输入飞行器注册号' }]}>
                  <Input placeholder="请输入" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="pilotName" label="操作员姓名" rules={[{ required: true, message: '请输入操作员姓名' }]}>
                  <Input placeholder="请输入" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="flightArea" label="飞行区域" rules={[{ required: true, message: '请选择飞行区域' }]}>
                  <Select placeholder="请选择" options={[
                    { value: 'area-a', label: '城东区A类空域' },
                    { value: 'area-b', label: '城西区B类空域' },
                    { value: 'area-c', label: '工业区C类空域' }
                  ]} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="flightDate" label="飞行日期" rules={[{ required: true, message: '请选择飞行日期' }]}>
                  <DatePicker style={{ width: '100%' }} />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item name="flightPurpose" label="飞行目的" rules={[{ required: true, message: '请输入飞行目的' }]}>
                  <Input.TextArea rows={3} placeholder="请简要描述飞行目的" />
                </Form.Item>
              </Col>
            </Row>
            <Divider />
            <Space style={{ width: '100%', justifyContent: 'flex-end' }}>
              <Button onClick={() => setCurrentStep(0)}>上一步</Button>
              <Button type="primary" icon={<SendOutlined />} onClick={handleSubmitApply}>
                提交申请
              </Button>
            </Space>
          </Form>
        )}

        {currentStep === 2 && (
          <Result
            status="success"
            title="申请提交成功"
            subTitle="您的飞行许可申请已提交，请等待审核。审核结果将通过短信和站内消息通知您。"
            extra={[
              <Button type="primary" key="list" onClick={() => setApplyModalVisible(false)}>
                查看申请列表
              </Button>,
              <Button key="apply" onClick={() => { setCurrentStep(0); form.resetFields(); }}>
                继续申请
              </Button>
            ]}
          />
        )}
      </Modal>

      <Modal
        title="许可详情"
        open={detailModalVisible}
        onCancel={() => setDetailModalVisible(false)}
        width={640}
        footer={[
          <Button key="close" onClick={() => setDetailModalVisible(false)}>关闭</Button>,
          selectedPermit?.status === 'approved' && (
            <Button key="download" type="primary" icon={<DownloadOutlined />}>
              下载许可证
            </Button>
          )
        ]}
      >
        {selectedPermit && (
          <div>
            <Descriptions column={2} bordered size="small">
              <Descriptions.Item label="许可编号" span={2}>
                <Text strong style={{ color: '#1677ff' }}>{selectedPermit.id}</Text>
              </Descriptions.Item>
              <Descriptions.Item label="许可类型">
                <Tag color="blue">{PERMIT_TYPES.find(t => t.value === selectedPermit.type)?.label}</Tag>
              </Descriptions.Item>
              <Descriptions.Item label="当前状态">
                <Tag color={STATUS_CONFIG[selectedPermit.status].color} icon={STATUS_CONFIG[selectedPermit.status].icon}>
                  {STATUS_CONFIG[selectedPermit.status].text}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="申请人">{selectedPermit.applicant}</Descriptions.Item>
              <Descriptions.Item label="飞行器">{selectedPermit.aircraft}</Descriptions.Item>
              <Descriptions.Item label="飞行区域" span={2}>{selectedPermit.area}</Descriptions.Item>
              <Descriptions.Item label="申请日期">{selectedPermit.date}</Descriptions.Item>
              <Descriptions.Item label="有效期">
                {selectedPermit.validFrom} ~ {selectedPermit.validTo}
              </Descriptions.Item>
            </Descriptions>

            {selectedPermit.status === 'approved' && (
              <>
                <Divider />
                <Title level={5}>审核信息</Title>
                <Descriptions column={1} size="small">
                  <Descriptions.Item label="审核人">管理员</Descriptions.Item>
                  <Descriptions.Item label="审核时间">2024-01-20 14:30:00</Descriptions.Item>
                  <Descriptions.Item label="审核意见">材料齐全，符合飞行条件，予以批准。</Descriptions.Item>
                </Descriptions>
              </>
            )}

            {selectedPermit.status === 'rejected' && (
              <>
                <Divider />
                <Title level={5}>驳回原因</Title>
                <Text type="danger">该区域为限飞区，暂不允许飞行。请选择其他区域或申请特殊许可。</Text>
              </>
            )}

            <Divider />
            <Title level={5}>相关操作</Title>
            <Space wrap>
              <Button href="/prototypes/flight-plan">关联飞行计划</Button>
              <Button href="/prototypes/airspace-query">查看空域信息</Button>
            </Space>
          </div>
        )}
      </Modal>
    </Layout>
  );
};

export default Component;
