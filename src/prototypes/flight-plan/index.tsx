/**
 * @name 飞行计划填报
 *
 * 提供飞行计划在线填报、材料上传、提交审核等全流程服务
 */

import './style.css';
import React, { useState } from 'react';
import {
  Layout,
  Steps,
  Form,
  Input,
  Select,
  DatePicker,
  TimePicker,
  Button,
  Card,
  Row,
  Col,
  Space,
  Typography,
  Divider,
  Upload,
  message,
  Modal,
  Table,
  Tag,
  Tooltip,
  Breadcrumb,
  Result
} from 'antd';
import {
  UserOutlined,
  CalendarOutlined,
  EnvironmentOutlined,
  FileTextOutlined,
  UploadOutlined,
  PlusOutlined,
  DeleteOutlined,
  CheckCircleOutlined,
  InfoCircleOutlined,
  CompassOutlined,
  ClockCircleOutlined,
  RocketOutlined,
  HomeOutlined,
  ArrowLeftOutlined,
  SaveOutlined,
  SendOutlined
} from '@ant-design/icons';

const { Content } = Layout;
const { Title, Text } = Typography;
const { RangePicker } = DatePicker;

interface FlightSegment {
  id: string;
  departure: string;
  arrival: string;
  altitude: number;
  speed: number;
}

interface FlightPlanForm {
  planName: string;
  flightType: string;
  flightDate: [string, string];
  flightTime: [string, string];
  aircraftType: string;
  aircraftReg: string;
  pilotName: string;
  pilotLicense: string;
  passengerCount: number;
  flightPurpose: string;
  segments: FlightSegment[];
  emergencyContact: string;
  emergencyPhone: string;
}

const AIRCRAFT_TYPES = [
  { value: 'multirotor', label: '多旋翼无人机' },
  { value: 'fixed-wing', label: '固定翼无人机' },
  { value: 'helicopter', label: '直升机' },
  { value: 'vtol', label: '垂直起降固定翼' },
  { value: 'light-sport', label: '轻型运动飞机' },
  { value: 'other', label: '其他' }
];

const FLIGHT_TYPES = [
  { value: 'training', label: '训练飞行' },
  { value: 'aerial-photo', label: '航拍飞行' },
  { value: 'inspection', label: '巡检飞行' },
  { value: 'logistics', label: '物流配送' },
  { value: 'agriculture', label: '农林植保' },
  { value: 'emergency', label: '应急救援' },
  { value: 'tourism', label: '低空旅游' },
  { value: 'other', label: '其他' }
];

const TAKEOFF_POINTS = [
  { value: 'A1', label: '城东区A1起降点' },
  { value: 'A2', label: '城东区A2起降点' },
  { value: 'A3', label: '城东区A3起降点' },
  { value: 'B1', label: '城西区B1起降点' },
  { value: 'B2', label: '城西区B2起降点' },
  { value: 'C1', label: '市中心C1起降点' }
];

const LANDING_POINTS = [
  { value: 'A1', label: '城东区A1起降点' },
  { value: 'A2', label: '城东区A2起降点' },
  { value: 'A3', label: '城东区A3起降点' },
  { value: 'B1', label: '城西区B1起降点' },
  { value: 'B2', label: '城西区B2起降点' },
  { value: 'C1', label: '市中心C1起降点' }
];

const Component: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [form] = Form.useForm();
  const [segments, setSegments] = useState<FlightSegment[]>([
    { id: '1', departure: '', arrival: '', altitude: 100, speed: 50 }
  ]);
  const [submitModalVisible, setSubmitModalVisible] = useState(false);
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [savedPlans, setSavedPlans] = useState<any[]>([]);
  const [draftModalVisible, setDraftModalVisible] = useState(false);

  const addSegment = () => {
    const newSegment: FlightSegment = {
      id: Date.now().toString(),
      departure: '',
      arrival: '',
      altitude: 100,
      speed: 50
    };
    setSegments([...segments, newSegment]);
    message.success('已添加新航段');
  };

  const removeSegment = (id: string) => {
    if (segments.length <= 1) {
      message.warning('至少保留一个航段');
      return;
    }
    setSegments(segments.filter(s => s.id !== id));
    message.info('已删除航段');
  };

  const updateSegment = (id: string, field: string, value: any) => {
    setSegments(segments.map(s => 
      s.id === id ? { ...s, [field]: value } : s
    ));
  };

  const handleSaveDraft = () => {
    const values = form.getFieldsValue();
    const draft = {
      id: Date.now().toString(),
      ...values,
      segments,
      savedAt: new Date().toLocaleString()
    };
    setSavedPlans([...savedPlans, draft]);
    message.success('草稿已保存');
  };

  const handleSubmit = () => {
    form.validateFields().then(() => {
      setSubmitModalVisible(true);
    }).catch(() => {
      message.error('请完善必填信息');
    });
  };

  const confirmSubmit = () => {
    setSubmitModalVisible(false);
    setSuccessModalVisible(true);
  };

  const steps = [
    { title: '基本信息', icon: <UserOutlined /> },
    { title: '飞行器信息', icon: <RocketOutlined /> },
    { title: '飞行计划', icon: <CompassOutlined /> },
    { title: '航段详情', icon: <EnvironmentOutlined /> },
    { title: '材料上传', icon: <UploadOutlined /> }
  ];

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <Card title="基本信息" style={{ borderRadius: 8 }}>
            <Row gutter={24}>
              <Col xs={24} md={12}>
                <Form.Item
                  name="planName"
                  label="计划名称"
                  rules={[{ required: true, message: '请输入计划名称' }]}
                >
                  <Input placeholder="请输入飞行计划名称" maxLength={50} showCount />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  name="flightType"
                  label="飞行类型"
                  rules={[{ required: true, message: '请选择飞行类型' }]}
                >
                  <Select placeholder="请选择飞行类型" options={FLIGHT_TYPES} />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  name="flightDate"
                  label="飞行日期"
                  rules={[{ required: true, message: '请选择飞行日期' }]}
                >
                  <RangePicker style={{ width: '100%' }} />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  name="flightTime"
                  label="飞行时段"
                  rules={[{ required: true, message: '请选择飞行时段' }]}
                >
                  <TimePicker.RangePicker style={{ width: '100%' }} format="HH:mm" />
                </Form.Item>
              </Col>
              <Col xs={24} md={24}>
                <Form.Item
                  name="flightPurpose"
                  label="飞行目的"
                  rules={[{ required: true, message: '请输入飞行目的' }]}
                >
                  <Input.TextArea 
                    rows={3} 
                    placeholder="请详细描述本次飞行的目的和任务内容" 
                    maxLength={500} 
                    showCount 
                  />
                </Form.Item>
              </Col>
            </Row>
          </Card>
        );
      
      case 1:
        return (
          <Card title="飞行器信息" style={{ borderRadius: 8 }}>
            <Row gutter={24}>
              <Col xs={24} md={12}>
                <Form.Item
                  name="aircraftType"
                  label="飞行器类型"
                  rules={[{ required: true, message: '请选择飞行器类型' }]}
                >
                  <Select placeholder="请选择飞行器类型" options={AIRCRAFT_TYPES} />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  name="aircraftReg"
                  label="飞行器注册号"
                  rules={[{ required: true, message: '请输入飞行器注册号' }]}
                >
                  <Input placeholder="请输入飞行器注册号" />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  name="pilotName"
                  label="驾驶员姓名"
                  rules={[{ required: true, message: '请输入驾驶员姓名' }]}
                >
                  <Input placeholder="请输入驾驶员姓名" />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  name="pilotLicense"
                  label="驾驶员执照号"
                  rules={[{ required: true, message: '请输入驾驶员执照号' }]}
                >
                  <Input placeholder="请输入驾驶员执照号" />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  name="passengerCount"
                  label="乘员数量"
                  initialValue={0}
                >
                  <Input type="number" min={0} max={10} placeholder="请输入乘员数量" />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  name="aircraftWeight"
                  label="飞行器重量(kg)"
                >
                  <Input type="number" min={0} placeholder="请输入飞行器重量" />
                </Form.Item>
              </Col>
            </Row>
          </Card>
        );
      
      case 2:
        return (
          <Card title="飞行计划" style={{ borderRadius: 8 }}>
            <Row gutter={24}>
              <Col xs={24} md={12}>
                <Form.Item
                  name="takeoffPoint"
                  label="起飞点"
                  rules={[{ required: true, message: '请选择起飞点' }]}
                >
                  <Select 
                    placeholder="请选择起飞点" 
                    options={TAKEOFF_POINTS}
                    showSearch
                    filterOption={(input, option) =>
                      (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                    }
                  />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  name="landingPoint"
                  label="降落点"
                  rules={[{ required: true, message: '请选择降落点' }]}
                >
                  <Select 
                    placeholder="请选择降落点" 
                    options={LANDING_POINTS}
                    showSearch
                    filterOption={(input, option) =>
                      (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                    }
                  />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  name="maxAltitude"
                  label="最大飞行高度(m)"
                  rules={[{ required: true, message: '请输入最大飞行高度' }]}
                >
                  <Input type="number" min={0} max={1000} placeholder="请输入最大飞行高度" />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  name="flightDistance"
                  label="预计飞行距离(km)"
                >
                  <Input type="number" min={0} placeholder="请输入预计飞行距离" />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  name="flightDuration"
                  label="预计飞行时长(分钟)"
                  rules={[{ required: true, message: '请输入预计飞行时长' }]}
                >
                  <Input type="number" min={0} placeholder="请输入预计飞行时长" />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  name="flightArea"
                  label="飞行区域描述"
                >
                  <Input placeholder="请输入飞行区域描述" />
                </Form.Item>
              </Col>
            </Row>
            
            <Divider />
            
            <div style={{ marginBottom: 16 }}>
              <Text strong>紧急联系人信息</Text>
            </div>
            <Row gutter={24}>
              <Col xs={24} md={12}>
                <Form.Item
                  name="emergencyContact"
                  label="紧急联系人"
                  rules={[{ required: true, message: '请输入紧急联系人' }]}
                >
                  <Input placeholder="请输入紧急联系人姓名" />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  name="emergencyPhone"
                  label="联系电话"
                  rules={[{ required: true, message: '请输入联系电话' }]}
                >
                  <Input placeholder="请输入联系电话" />
                </Form.Item>
              </Col>
            </Row>
          </Card>
        );
      
      case 3:
        return (
          <Card 
            title="航段详情" 
            style={{ borderRadius: 8 }}
            extra={
              <Button type="dashed" icon={<PlusOutlined />} onClick={addSegment}>
                添加航段
              </Button>
            }
          >
            <div style={{ marginBottom: 16 }}>
              <Tooltip title="航段是指从起飞点到降落点的飞行路线，可添加多个航段">
                <Text type="secondary">
                  <InfoCircleOutlined style={{ marginRight: 4 }} />
                  点击"添加航段"可规划多段飞行路线
                </Text>
              </Tooltip>
            </div>
            
            {segments.map((segment, index) => (
              <Card 
                key={segment.id}
                size="small"
                title={`航段 ${index + 1}`}
                style={{ marginBottom: 16, borderRadius: 8 }}
                extra={
                  <Button 
                    type="text" 
                    danger 
                    icon={<DeleteOutlined />}
                    onClick={() => removeSegment(segment.id)}
                  >
                    删除
                  </Button>
                }
              >
                <Row gutter={16}>
                  <Col xs={24} md={6}>
                    <Form.Item label="起飞点">
                      <Select
                        placeholder="选择起飞点"
                        options={TAKEOFF_POINTS}
                        value={segment.departure}
                        onChange={(v) => updateSegment(segment.id, 'departure', v)}
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={6}>
                    <Form.Item label="降落点">
                      <Select
                        placeholder="选择降落点"
                        options={LANDING_POINTS}
                        value={segment.arrival}
                        onChange={(v) => updateSegment(segment.id, 'arrival', v)}
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={6}>
                    <Form.Item label="飞行高度(m)">
                      <Input
                        type="number"
                        min={0}
                        max={1000}
                        value={segment.altitude}
                        onChange={(e) => updateSegment(segment.id, 'altitude', Number(e.target.value))}
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={6}>
                    <Form.Item label="飞行速度(km/h)">
                      <Input
                        type="number"
                        min={0}
                        value={segment.speed}
                        onChange={(e) => updateSegment(segment.id, 'speed', Number(e.target.value))}
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </Card>
            ))}
          </Card>
        );
      
      case 4:
        return (
          <Card title="材料上传" style={{ borderRadius: 8 }}>
            <div style={{ marginBottom: 24 }}>
              <Text type="secondary">请上传以下材料（支持 PDF、JPG、PNG 格式，单个文件不超过 10MB）</Text>
            </div>
            
            <Row gutter={[24, 24]}>
              <Col xs={24} md={12}>
                <Card size="small" title="飞行器适航证明" style={{ borderRadius: 8 }}>
                  <Upload.Dragger
                    name="files"
                    multiple={false}
                    accept=".pdf,.jpg,.jpeg,.png"
                    beforeUpload={() => false}
                    onChange={(info) => {
                      if (info.file.status === 'done') {
                        message.success('上传成功');
                      }
                    }}
                  >
                    <p className="ant-upload-drag-icon">
                      <UploadOutlined />
                    </p>
                    <p className="ant-upload-text">点击或拖拽文件上传</p>
                    <p className="ant-upload-hint">支持 PDF、JPG、PNG 格式</p>
                  </Upload.Dragger>
                </Card>
              </Col>
              <Col xs={24} md={12}>
                <Card size="small" title="驾驶员执照" style={{ borderRadius: 8 }}>
                  <Upload.Dragger
                    name="files"
                    multiple={false}
                    accept=".pdf,.jpg,.jpeg,.png"
                    beforeUpload={() => false}
                  >
                    <p className="ant-upload-drag-icon">
                      <UploadOutlined />
                    </p>
                    <p className="ant-upload-text">点击或拖拽文件上传</p>
                    <p className="ant-upload-hint">支持 PDF、JPG、PNG 格式</p>
                  </Upload.Dragger>
                </Card>
              </Col>
              <Col xs={24} md={12}>
                <Card size="small" title="保险证明" style={{ borderRadius: 8 }}>
                  <Upload.Dragger
                    name="files"
                    multiple={false}
                    accept=".pdf,.jpg,.jpeg,.png"
                    beforeUpload={() => false}
                  >
                    <p className="ant-upload-drag-icon">
                      <UploadOutlined />
                    </p>
                    <p className="ant-upload-text">点击或拖拽文件上传</p>
                    <p className="ant-upload-hint">支持 PDF、JPG、PNG 格式</p>
                  </Upload.Dragger>
                </Card>
              </Col>
              <Col xs={24} md={12}>
                <Card size="small" title="其他材料" style={{ borderRadius: 8 }}>
                  <Upload.Dragger
                    name="files"
                    multiple={true}
                    accept=".pdf,.jpg,.jpeg,.png"
                    beforeUpload={() => false}
                  >
                    <p className="ant-upload-drag-icon">
                      <UploadOutlined />
                    </p>
                    <p className="ant-upload-text">点击或拖拽文件上传</p>
                    <p className="ant-upload-hint">支持上传多个文件</p>
                  </Upload.Dragger>
                </Card>
              </Col>
            </Row>
            
            <Divider />
            
            <Card size="small" style={{ borderRadius: 8, background: '#f6ffed', borderColor: '#b7eb8f' }}>
              <Space>
                <CheckCircleOutlined style={{ color: '#52c41a', fontSize: 18 }} />
                <Text>材料上传完成后，请确认信息无误并提交审核</Text>
              </Space>
            </Card>
          </Card>
        );
      
      default:
        return null;
    }
  };

  return (
    <Layout style={{ minHeight: '100vh', background: '#f5f7fa' }}>
      <Content style={{ padding: 24 }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <Card style={{ borderRadius: 8, marginBottom: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <Breadcrumb
                  items={[
                    { title: <a href="/prototypes/flight-service">低空飞行服务</a> },
                    { title: '飞行计划填报' }
                  ]}
                />
                <Title level={4} style={{ margin: '8px 0 0' }}>
                  <FileTextOutlined style={{ marginRight: 8, color: '#1677ff' }} />
                  飞行计划填报
                </Title>
              </div>
              <Space>
                <Button onClick={() => setDraftModalVisible(true)}>
                  我的草稿 ({savedPlans.length})
                </Button>
                <Button icon={<ArrowLeftOutlined />} href="/prototypes/flight-service">
                  返回
                </Button>
              </Space>
            </div>
          </Card>

          <Card style={{ borderRadius: 8, marginBottom: 24 }}>
            <Steps current={currentStep} items={steps} />
          </Card>

          <Form form={form} layout="vertical">
            {renderStepContent()}
          </Form>

          <Card style={{ borderRadius: 8, marginTop: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Space>
                {currentStep > 0 && (
                  <Button onClick={() => setCurrentStep(currentStep - 1)}>
                    上一步
                  </Button>
                )}
              </Space>
              <Space>
                <Button icon={<SaveOutlined />} onClick={handleSaveDraft}>
                  保存草稿
                </Button>
                {currentStep < steps.length - 1 ? (
                  <Button type="primary" onClick={() => setCurrentStep(currentStep + 1)}>
                    下一步
                  </Button>
                ) : (
                  <Button type="primary" icon={<SendOutlined />} onClick={handleSubmit}>
                    提交审核
                  </Button>
                )}
              </Space>
            </div>
          </Card>
        </div>
      </Content>

      <Modal
        title="确认提交"
        open={submitModalVisible}
        onOk={confirmSubmit}
        onCancel={() => setSubmitModalVisible(false)}
        okText="确认提交"
        cancelText="取消"
      >
        <div style={{ padding: '16px 0' }}>
          <Text>您确定要提交此飞行计划吗？</Text>
          <br />
          <Text type="secondary">提交后将进入审核流程，预计 1-3 个工作日内完成审核</Text>
        </div>
      </Modal>

      <Modal
        title="提交成功"
        open={successModalVisible}
        footer={[
          <Button key="new" onClick={() => {
            setSuccessModalVisible(false);
            form.resetFields();
            setSegments([{ id: '1', departure: '', arrival: '', altitude: 100, speed: 50 }]);
            setCurrentStep(0);
          }}>
            继续填报
          </Button>,
          <Button key="back" type="primary" href="/prototypes/flight-service">
            返回
          </Button>
        ]}
        closable={false}
      >
        <Result
          status="success"
          title="飞行计划提交成功！"
          subTitle={
            <div>
              <Text>申请编号：<Text strong>FP20240120001</Text></Text>
              <br />
              <Text type="secondary">您可以在"我的业务"中查看审核进度</Text>
            </div>
          }
        />
      </Modal>

      <Modal
        title="我的草稿"
        open={draftModalVisible}
        onCancel={() => setDraftModalVisible(false)}
        footer={null}
        width={700}
      >
        {savedPlans.length > 0 ? (
          <Table
            dataSource={savedPlans}
            rowKey="id"
            columns={[
              { title: '计划名称', dataIndex: 'planName', key: 'planName' },
              { 
                title: '保存时间', 
                dataIndex: 'savedAt', 
                key: 'savedAt',
                width: 180
              },
              {
                title: '操作',
                key: 'action',
                width: 120,
                render: (_, record) => (
                  <Space>
                    <Button type="link" size="small">继续编辑</Button>
                    <Button type="link" size="small" danger>删除</Button>
                  </Space>
                )
              }
            ]}
          />
        ) : (
          <div style={{ textAlign: 'center', padding: 40 }}>
            <Text type="secondary">暂无保存的草稿</Text>
          </div>
        )}
      </Modal>
    </Layout>
  );
};

export default Component;
