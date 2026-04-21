/**
 * @name 资质办理
 *
 * 在线查询、办理飞行员资质、飞行器备案、运营许可等相关业务
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
  Tabs,
  Form,
  Modal,
  Steps,
  message,
  Descriptions,
  Divider,
  Timeline,
  Progress
} from 'antd';
import {
  IdcardOutlined,
  FileTextOutlined,
  EnvironmentOutlined,
  SafetyCertificateOutlined,
  CompassOutlined,
  HomeOutlined,
  RocketOutlined,
  PlusOutlined,
  SearchOutlined,
  DownloadOutlined,
  ArrowLeftOutlined,
  EyeOutlined,
  ReloadOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  AuditOutlined,
  UserOutlined,
  CarOutlined
} from '@ant-design/icons';

const { Sider, Content } = Layout;
const { Title, Text } = Typography;

const QUAL_TYPES = [
  { value: 'all', label: '全部类型' },
  { value: 'pilot', label: '飞行员资质' },
  { value: 'aircraft', label: '飞行器备案' },
  { value: 'operation', label: '运营许可' }
];

const QUAL_STATUS = [
  { value: 'all', label: '全部状态' },
  { value: 'pending', label: '审核中' },
  { value: 'approved', label: '已通过' },
  { value: 'rejected', label: '已驳回' },
  { value: 'expired', label: '已过期' }
];

const STATUS_CONFIG: Record<string, { color: string; text: string; icon: React.ReactNode }> = {
  pending: { color: 'processing', text: '审核中', icon: <ClockCircleOutlined /> },
  approved: { color: 'success', text: '已通过', icon: <CheckCircleOutlined /> },
  rejected: { color: 'error', text: '已驳回', icon: <CloseCircleOutlined /> },
  expired: { color: 'warning', text: '已过期', icon: <ExclamationCircleOutlined /> }
};

const TYPE_CONFIG: Record<string, { color: string; text: string }> = {
  pilot: { color: 'blue', text: '飞行员资质' },
  aircraft: { color: 'purple', text: '飞行器备案' },
  operation: { color: 'cyan', text: '运营许可' }
};

const QUAL_DATA = [
  { id: 'QL202401001', type: 'pilot', name: '多旋翼无人机驾驶员执照', applicant: '张三', applyDate: '2024-01-20', status: 'approved', validTo: '2027-01-20' },
  { id: 'QL202401002', type: 'aircraft', name: 'DJI M300 RTK 备案', applicant: '李四', applyDate: '2024-01-18', status: 'pending', validTo: '-' },
  { id: 'QL202401003', type: 'operation', name: '无人机运营合格证', applicant: '王五', applyDate: '2024-01-15', status: 'pending', validTo: '-' },
  { id: 'QL202401004', type: 'pilot', name: '固定翼无人机驾驶员执照', applicant: '赵六', applyDate: '2024-01-10', status: 'rejected', validTo: '-' },
  { id: 'QL202401005', type: 'aircraft', name: '大疆御3 Pro 备案', applicant: '钱七', applyDate: '2024-01-08', status: 'approved', validTo: '2025-01-08' },
  { id: 'QL202401006', type: 'pilot', name: '垂直起降固定翼驾驶员执照', applicant: '孙八', applyDate: '2023-06-15', status: 'expired', validTo: '2024-01-15' }
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
  const [selectedMenu, setSelectedMenu] = useState('qualification');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [applyModalVisible, setApplyModalVisible] = useState(false);
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [selectedQual, setSelectedQual] = useState<any>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [form] = Form.useForm();

  const columns = [
    {
      title: '资质编号',
      dataIndex: 'id',
      key: 'id',
      width: 130,
      render: (text: string) => <Text strong style={{ color: '#eb2f96' }}>{text}</Text>
    },
    {
      title: '资质类型',
      dataIndex: 'type',
      key: 'type',
      width: 100,
      render: (type: string) => {
        const config = TYPE_CONFIG[type];
        return <Tag color={config.color}>{config.text}</Tag>;
      }
    },
    {
      title: '资质名称',
      dataIndex: 'name',
      key: 'name',
      width: 180
    },
    {
      title: '申请人',
      dataIndex: 'applicant',
      key: 'applicant',
      width: 80
    },
    {
      title: '申请日期',
      dataIndex: 'applyDate',
      key: 'applyDate',
      width: 100
    },
    {
      title: '有效期至',
      dataIndex: 'validTo',
      key: 'validTo',
      width: 100
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
      width: 80,
      render: (_: any, record: any) => (
        <Space size="small">
          <Button type="link" size="small" icon={<EyeOutlined />} onClick={() => handleViewDetail(record)} title="查看" />
        </Space>
      )
    }
  ];

  const handleViewDetail = (record: any) => {
    setSelectedQual(record);
    setDetailModalVisible(true);
  };

  const handleApply = () => {
    setApplyModalVisible(true);
    setCurrentStep(0);
    form.resetFields();
  };

  const filteredData = QUAL_DATA.filter(item => {
    const matchType = selectedType === 'all' || item.type === selectedType;
    const matchStatus = selectedStatus === 'all' || item.status === selectedStatus;
    const matchKeyword = !searchKeyword || 
      item.id.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      item.name.includes(searchKeyword) ||
      item.applicant.includes(searchKeyword);
    return matchType && matchStatus && matchKeyword;
  });

  const stats = [
    { label: '审核中', value: 2, color: '#1677ff', status: 'pending' },
    { label: '已通过', value: 2, color: '#52c41a', status: 'approved' },
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
          <Title level={4} style={{ margin: 0, color: '#eb2f96' }}>
            <IdcardOutlined style={{ marginRight: 8 }} />
            资质办理
          </Title>
          <Text type="secondary" style={{ fontSize: 12 }}>
            在线办理各类资质
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
                    { title: '资质办理' }
                  ]}
                />
                <Title level={4} style={{ margin: '8px 0 0' }}>
                  资质办理
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
                        placeholder="搜索资质编号、名称、申请人..."
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
                        options={QUAL_TYPES}
                      />
                      <Select
                        style={{ width: 120 }}
                        value={selectedStatus}
                        onChange={setSelectedStatus}
                        options={QUAL_STATUS}
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
                title={<span style={{ fontWeight: 600 }}>办理类型</span>} 
                style={{ borderRadius: 8, height: '100%' }}
                styles={{ body: { minHeight: 220 } }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 12, background: '#f6ffed', borderRadius: 8 }}>
                    <UserOutlined style={{ fontSize: 24, color: '#52c41a' }} />
                    <div style={{ flex: 1 }}>
                      <Text strong>飞行员资质</Text>
                      <br />
                      <Text type="secondary" style={{ fontSize: 12 }}>多旋翼、固定翼、直升机等各类驾驶员执照办理</Text>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 12, background: '#e6f4ff', borderRadius: 8 }}>
                    <RocketOutlined style={{ fontSize: 24, color: '#1677ff' }} />
                    <div style={{ flex: 1 }}>
                      <Text strong>飞行器备案</Text>
                      <br />
                      <Text type="secondary" style={{ fontSize: 12 }}>无人机实名登记、飞行器注册备案</Text>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 12, background: '#fff7e6', borderRadius: 8 }}>
                    <CarOutlined style={{ fontSize: 24, color: '#fa8c16' }} />
                    <div style={{ flex: 1 }}>
                      <Text strong>运营许可</Text>
                      <br />
                      <Text type="secondary" style={{ fontSize: 12 }}>无人机运营合格证、经营许可证办理</Text>
                    </div>
                  </div>
                </div>
              </Card>
            </Col>

            <Col span={12}>
              <Card 
                title={<span style={{ fontWeight: 600 }}>办理须知</span>}
                style={{ borderRadius: 8, height: '100%' }}
                styles={{ body: { minHeight: 220 } }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                    <CheckCircleOutlined style={{ color: '#52c41a', marginTop: 4 }} />
                    <div>
                      <Text strong>材料准备</Text>
                      <br />
                      <Text type="secondary">身份证、培训证明、体检报告等相关材料</Text>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                    <ClockCircleOutlined style={{ color: '#1677ff', marginTop: 4 }} />
                    <div>
                      <Text strong>办理时限</Text>
                      <br />
                      <Text type="secondary">一般资质7-15个工作日，加急可缩短至3个工作日</Text>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                    <ExclamationCircleOutlined style={{ color: '#faad14', marginTop: 4 }} />
                    <div>
                      <Text strong>有效期提醒</Text>
                      <br />
                      <Text type="secondary">资质到期前30天系统将自动提醒续期</Text>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                    <AuditOutlined style={{ color: '#722ed1', marginTop: 4 }} />
                    <div>
                      <Text strong>审核流程</Text>
                      <br />
                      <Text type="secondary">提交申请 → 材料审核 → 现场核验 → 发放证书</Text>
                    </div>
                  </div>
                </div>
              </Card>
            </Col>
          </Row>
        </div>
      </Content>

      <Modal
        title="新建资质申请"
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
              {[
                { type: 'pilot', label: '飞行员资质', icon: <UserOutlined style={{ fontSize: 32, color: '#52c41a' }} /> },
                { type: 'aircraft', label: '飞行器备案', icon: <RocketOutlined style={{ fontSize: 32, color: '#1677ff' }} /> },
                { type: 'operation', label: '运营许可', icon: <CarOutlined style={{ fontSize: 32, color: '#fa8c16' }} /> }
              ].map((item) => (
                <Col span={8} key={item.type}>
                  <Card
                    hoverable
                    style={{ borderRadius: 8, textAlign: 'center' }}
                    styles={{ body: { padding: 24 } }}
                    onClick={() => {
                      form.setFieldValue('qualType', item.type);
                      setCurrentStep(1);
                    }}
                  >
                    {item.icon}
                    <br />
                    <Text strong>{item.label}</Text>
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
                <Form.Item name="qualType" label="资质类型" rules={[{ required: true }]}>
                  <Select options={QUAL_TYPES.filter(t => t.value !== 'all')} disabled />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="applicantName" label="申请人姓名" rules={[{ required: true, message: '请输入申请人姓名' }]}>
                  <Input placeholder="请输入" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="idNumber" label="身份证号" rules={[{ required: true, message: '请输入身份证号' }]}>
                  <Input placeholder="请输入" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="phone" label="联系电话" rules={[{ required: true, message: '请输入联系电话' }]}>
                  <Input placeholder="请输入" />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item name="remark" label="备注说明">
                  <Input.TextArea rows={3} placeholder="请输入备注说明" />
                </Form.Item>
              </Col>
            </Row>
            <Divider />
            <Space style={{ width: '100%', justifyContent: 'flex-end' }}>
              <Button onClick={() => setCurrentStep(0)}>上一步</Button>
              <Button type="primary" onClick={() => {
                setCurrentStep(2);
                setTimeout(() => {
                  setApplyModalVisible(false);
                  setCurrentStep(0);
                  message.success('申请已提交，请等待审核');
                }, 1500);
              }}>提交申请</Button>
            </Space>
          </Form>
        )}

        {currentStep === 2 && (
          <div style={{ textAlign: 'center', padding: 24 }}>
            <CheckCircleOutlined style={{ fontSize: 64, color: '#52c41a', marginBottom: 16 }} />
            <Title level={4}>申请提交成功</Title>
            <Text type="secondary">您的资质申请已提交，审核结果将通过短信和站内消息通知您。</Text>
          </div>
        )}
      </Modal>

      <Modal
        title="资质详情"
        open={detailModalVisible}
        onCancel={() => setDetailModalVisible(false)}
        width={640}
        footer={[
          <Button key="close" onClick={() => setDetailModalVisible(false)}>关闭</Button>,
          selectedQual?.status === 'approved' && (
            <Button key="download" type="primary" icon={<DownloadOutlined />}>
              下载证书
            </Button>
          )
        ]}
      >
        {selectedQual && (
          <div>
            <Descriptions column={2} bordered size="small">
              <Descriptions.Item label="资质编号" span={2}>
                <Text strong style={{ color: '#eb2f96' }}>{selectedQual.id}</Text>
              </Descriptions.Item>
              <Descriptions.Item label="资质类型">
                <Tag color={TYPE_CONFIG[selectedQual.type].color}>{TYPE_CONFIG[selectedQual.type].text}</Tag>
              </Descriptions.Item>
              <Descriptions.Item label="当前状态">
                <Tag color={STATUS_CONFIG[selectedQual.status].color} icon={STATUS_CONFIG[selectedQual.status].icon}>
                  {STATUS_CONFIG[selectedQual.status].text}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="资质名称" span={2}>{selectedQual.name}</Descriptions.Item>
              <Descriptions.Item label="申请人">{selectedQual.applicant}</Descriptions.Item>
              <Descriptions.Item label="申请日期">{selectedQual.applyDate}</Descriptions.Item>
              <Descriptions.Item label="有效期至">{selectedQual.validTo}</Descriptions.Item>
            </Descriptions>

            {selectedQual.status === 'approved' && (
              <>
                <Divider />
                <Title level={5}>审核进度</Title>
                <Progress percent={100} status="success" />
                <Timeline
                  style={{ marginTop: 16 }}
                  items={[
                    { color: 'green', children: '提交申请 - 2024-01-20 10:30' },
                    { color: 'green', children: '材料审核通过 - 2024-01-22 14:20' },
                    { color: 'green', children: '现场核验完成 - 2024-01-25 09:00' },
                    { color: 'green', children: '证书已发放 - 2024-01-26 16:00' }
                  ]}
                />
              </>
            )}
          </div>
        )}
      </Modal>
    </Layout>
  );
};

export default Component;
