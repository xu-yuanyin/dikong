/**
 * @name 备案飞行计划
 * @mode axure
 * /Users/xu/Desktop/元引信息/Axhub-Make-main/skills/axure-export-workflow/SKILL.md
 *
 */

import './style.css';

import React, { useState, useCallback } from 'react';
import { Card, Form, Input, Button, Select, Steps, DatePicker, TimePicker, message, Table, Tag, Modal, Row, Col, Alert, Divider, Radio, Space } from 'antd';
import { RocketOutlined, CheckCircleOutlined, EnvironmentOutlined, ClockCircleOutlined, CalendarOutlined, SafetyCertificateOutlined, ArrowLeftOutlined, PlusOutlined, FileTextOutlined, ExclamationCircleOutlined } from '@ant-design/icons';

const FLIGHT_TYPES = [
  { value: 'training', label: '训练飞行' },
  { value: 'operation', label: '作业飞行' },
  { value: 'inspection', label: '巡检飞行' },
  { value: 'logistics', label: '物流配送' },
  { value: 'photography', label: '航拍测绘' },
  { value: 'emergency', label: '应急救援' },
  { value: 'test', label: '试飞测试' },
  { value: 'other', label: '其他' }
];

const AIRSPACE_OPTIONS = [
  { value: 'north-zone', label: '北区训练空域（0-300m）' },
  { value: 'south-zone', label: '南区试飞区（0-500m）' },
  { value: 'east-route', label: '东区巡检航线（30-120m）' },
  { value: 'west-route', label: '西区物流航线（50-200m）' },
  { value: 'custom', label: '自定义空域' }
];

const AIRCRAFT_OPTIONS = [
  { value: 'uav001', label: 'DJI Mavic 3E（UAV-BJ-2026-001）' },
  { value: 'uav002', label: '大疆 T50（UAV-BJ-2026-002）' },
  { value: 'uav003', label: '纵横 CW-25（UAV-BJ-2026-003）' }
];

const EMERGENCY_CONTACTS = [
  { value: 'dk20260009', label: 'dk20260009（138****1234）' },
  { value: 'dk20260010', label: 'dk20260010（139****5678）' },
  { value: 'dk20260008', label: 'dk20260008（137****9012）' }
];

const MY_PLAN_LIST = [
  {
    key: '1',
    id: 'FP-BJ-2026-0088',
    flightType: '训练飞行',
    aircraft: 'DJI Mavic 3E',
    airspace: '北区训练空域',
    date: '2026-04-22',
    timeRange: '09:00-11:30',
    pilot: 'dk20260009',
    status: '审批中',
    statusColor: '#fa8c16'
  },
  {
    key: '2',
    id: 'FP-BJ-2026-0079',
    flightType: '巡检飞行',
    aircraft: '纵横 CW-25',
    airspace: '东区巡检航线',
    date: '2026-04-20',
    timeRange: '14:00-17:00',
    pilot: '李明',
    status: '已通过',
    statusColor: '#52c41a'
  },
  {
    key: '3',
    id: 'FP-BJ-2026-0065',
    flightType: '作业飞行',
    aircraft: '大疆 T50',
    airspace: '南区试飞区',
    date: '2026-04-18',
    timeRange: '08:00-15:00',
    pilot: 'dk20260008',
    status: '已完成',
    statusColor: '#8c8c8c'
  }
];

const Component = function RegisterFlightPlanPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [form] = Form.useForm();
  const [showSuccess, setShowSuccess] = useState(false);

  const handleNavigate = useCallback(function (key: string) {
    window.location.href = '/prototypes/' + key;
  }, []);

  var handleSubmit = useCallback(function () {
    form.validateFields().then(function () {
      setShowSuccess(true);
      message.success('飞行计划备案提交成功！等待空管部门审批。');
    }).catch(function () {});
  }, [form]);

  return (
    <div style={{ minHeight: '100vh', background: '#f5f5f5' }}>
      <header style={{ background: 'linear-gradient(135deg, #0c4a6e 0%, #eb2f96 100%)', padding: '0 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }} onClick={function () { handleNavigate('home'); }}>
            <SafetyCertificateOutlined style={{ fontSize: 20, color: '#fff' }} />
            <span style={{ fontSize: 16, fontWeight: 600, color: '#fff' }}>区域低空公共服务平台</span>
          </div>
          <div style={{ display: 'flex', gap: 16 }}>
            <a style={{ color: 'rgba(255,255,255,0.85)', cursor: 'pointer' }} onClick={function () { handleNavigate('home'); }}>首页</a>
            <a style={{ color: 'rgba(255,255,255,0.85)', cursor: 'pointer' }} onClick={function () { handleNavigate('news'); }}>资讯公告</a>
            <a style={{ color: 'rgba(255,255,255,0.85)', cursor: 'pointer' }} onClick={function () { handleNavigate('policy-national'); }}>政策法规</a>
            <a style={{ color: 'rgba(255,255,255,0.85)', cursor: 'pointer' }} onClick={function () { handleNavigate('service-list'); }}>低空服务</a>
            <a style={{ color: 'rgba(255,255,255,0.85)', cursor: 'pointer' }} onClick={function () { handleNavigate('mall-list'); }}>低空商城</a>
            <a style={{ color: '#fff', fontWeight: 600, cursor: 'pointer' }} onClick={function () { handleNavigate('flight-dynamic'); }}>飞行服务</a>
            <a style={{ color: 'rgba(255,255,255,0.85)', cursor: 'pointer' }} onClick={function () { handleNavigate('profile'); }}>个人中心</a>
          </div>
        </div>
      </header>

      <div style={{ maxWidth: 1000, margin: '0 auto', padding: '24px 24px 48px' }}>
        <Alert
          type="info"
          showIcon
          icon={<ExclamationCircleOutlined />}
          description="飞行计划需提前至少 24 小时提交备案，临时飞行计划需提前 4 小时提交。紧急任务请联系空管服务热线：400-888-LATC"
          style={{ borderRadius: 8, marginBottom: 24 }}
        />

        <Card style={{ borderRadius: 12, marginBottom: 24 }}>
          <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 4, display: 'flex', alignItems: 'center', gap: 8 }}>
            <RocketOutlined style={{ color: '#eb2f96' }} />
            备案飞行计划
          </h2>
          <p style={{ color: '#8c8c8c', marginTop: 8, marginBottom: 24 }}>请完整填写飞行计划信息，提交后由空管部门进行审批。</p>

          <Steps
            current={currentStep}
            items={[
              { title: '飞行基础信息', icon: <FileTextOutlined /> },
              { title: '时空参数', icon: <ClockCircleOutlined /> },
              { title: '安全措施', icon: <SafetyCertificateOutlined /> },
              { title: '确认提交', icon: <CheckCircleOutlined /> }
            ]}
            style={{ marginBottom: 32 }}
          />

          {currentStep === 0 && (
            <Form form={form} layout="vertical" requiredMark="optional">
              <Row gutter={24}>
                <Col span={12}>
                  <Form.Item name="planName" label="计划名称" rules={[{ required: true, message: '请输入计划名称' }]}>
                    <Input placeholder="如：北区日常训练飞行计划" size="large" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="flightType" label="飞行类型" rules={[{ required: true, message: '请选择飞行类型' }]}>
                    <Select placeholder="请选择飞行类型" size="large" options={FLIGHT_TYPES} />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={24}>
                <Col span={12}>
                  <Form.Item name="aircraftId" label="使用飞行器" rules={[{ required: true, message: '请选择飞行器' }]}>
                    <Select placeholder="请选择已备案的飞行器" size="large" options={AIRCRAFT_OPTIONS} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="pilotName" label="驾驶员姓名" rules={[{ required: true, message: '请输入驾驶员姓名' }]}>
                    <Input placeholder="请输入驾驶员姓名" size="large" />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={24}>
                <Col span={12}>
                  <Form.Item name="pilotLicense" label="驾驶员执照编号">
                    <Input placeholder="请输入执照编号" size="large" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="pilotPhone" label="联系电话" rules={[{ required: true, message: '请输入联系电话' }]}>
                    <Input placeholder="请输入手机号码" size="large" />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={24}>
                <Col span={12}>
                  <Form.Item name="organization" label="所属单位">
                    <Input placeholder="请输入所属单位名称" size="large" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="emergencyContact" label="应急联系人" rules={[{ required: true, message: '请输入应急联系人' }]}>
                    <Input placeholder="请输入应急联系人" size="large" />
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item name="flightPurpose" label="飞行目的描述" rules={[{ required: true, message: '请描述飞行目的' }]}>
                <Input.TextArea rows={3} placeholder="请简要描述本次飞行的具体目的和任务内容" size="large" />
              </Form.Item>
              <div style={{ textAlign: 'right', marginTop: 24 }}>
                <Button type="primary" size="large" onClick={function () { setCurrentStep(1); }}>下一步</Button>
              </div>
            </Form>
          )}

          {currentStep === 1 && (
            <Form form={form} layout="vertical" requiredMark="optional">
              <Row gutter={24}>
                <Col span={12}>
                  <Form.Item name="airspace" label="使用空域/航线" rules={[{ required: true, message: '请选择使用空域' }]}>
                    <Select placeholder="请选择使用空域或航线" size="large" options={AIRSPACE_OPTIONS} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="flightDate" label="飞行日期" rules={[{ required: true, message: '请选择飞行日期' }]}>
                    <DatePicker style={{ width: '100%' }} size="large" format="YYYY-MM-DD" placeholder="请选择日期" />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={24}>
                <Col span={12}>
                  <Form.Item name="startTime" label="预计起飞时间" rules={[{ required: true, message: '请选择起飞时间' }]}>
                    <TimePicker style={{ width: '100%' }} size="large" format="HH:mm" minuteStep={5} placeholder="选择时间" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="endTime" label="预计降落时间" rules={[{ required: true, message: '请选择降落时间' }]}>
                    <TimePicker style={{ width: '100%' }} size="large" format="HH:mm" minuteStep={5} placeholder="选择时间" />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={24}>
                <Col span={12}>
                  <Form.Item name="altitudeMin" label="最低飞行高度(m)">
                    <Input placeholder="如：30" size="large" type="number" suffix="m" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="altitudeMax" label="最高飞行高度(m)" rules={[{ required: true, message: '请输入最高高度' }]}>
                    <Input placeholder="如：120" size="large" type="number" suffix="m" />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={24}>
                <Col span={12}>
                  <Form.Item name="takeoffPoint" label="起飞点" rules={[{ required: true, message: '请输入起飞点' }]}>
                    <Input placeholder="如：XX区XX路起降场" size="large" prefix={<EnvironmentOutlined />} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="landingPoint" label="降落点" rules={[{ required: true, message: '请输入降落点' }]}>
                    <Input placeholder="如：XX区XX路起降场" size="large" prefix={<EnvironmentOutlined />} />
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item name="flightRoute" label="飞行路线描述">
                <Input.TextArea rows={2} placeholder="请简要描述飞行路线、途经区域等" size="large" />
              </Form.Item>
              <div style={{ textAlign: 'right', marginTop: 24 }}>
                <Button size="large" onClick={function () { setCurrentStep(0); }} style={{ marginRight: 12 }}>上一步</Button>
                <Button type="primary" size="large" onClick={function () { setCurrentStep(2); }}>下一步</Button>
              </div>
            </Form>
          )}

          {currentStep === 2 && (
            <Form form={form} layout="vertical" requiredMark="optional">
              <Form.Item name="insuranceStatus" label="是否已购买飞行保险" rules={[{ required: true }]}>
                <Radio.Group>
                  <Radio value="yes">是</Radio>
                  <Radio value="no">否</Radio>
                  <Radio value="pending">办理中</Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item name="insuranceInfo" label="保险信息">
                <Input placeholder="保险公司、保单号等（如有）" size="large" />
              </Form.Item>
              <Form.Item name="safetyMeasures" label="安全保障措施" rules={[{ required: true, message: '请填写安全措施' }]}>
                <Input.TextArea rows={3} placeholder="请描述本次飞行的安全保障措施，包括但不限于：应急预案、通信保障、天气监测方案等" size="large" />
              </Form.Item>
              <Form.Item name="riskControl" label="风险管控预案">
                <Input.TextArea rows={2} placeholder="如遇突发情况的处置预案" size="large" />
              </Form.Item>
              <Row gutter={24}>
                <Col span={12}>
                  <Form.Item name="backupComm" label="备用通信方式">
                    <Input placeholder="备用对讲频率或联系方式" size="large" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="weatherCondition" label="气象条件要求">
                    <Select placeholder="气象条件限制" size="large" mode="multiple" options={[
                      { value: 'wind', label: '风速≤5级' },
                      { value: 'visibility', label: '能见度≥3km' },
                      { value: 'rain', label: '无降水' },
                      { value: 'thunder', label: '无雷电活动' },
                      { value: 'cloud', label: '云底高度≥300m' }
                    ]} />
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item name="remarks" label="备注">
                <Input.TextArea rows={2} placeholder="其他需要说明的情况" size="large" />
              </Form.Item>
              <div style={{ textAlign: 'right', marginTop: 24 }}>
                <Button size="large" onClick={function () { setCurrentStep(1); }} style={{ marginRight: 12 }}>上一步</Button>
                <Button type="primary" size="large" onClick={function () { setCurrentStep(3); }}>下一步</Button>
              </div>
            </Form>
          )}

          {currentStep === 3 && (
            <div>
              <Card size="small" title={<span>⚠️ 提交前确认</span>} style={{ marginBottom: 24, borderColor: '#faad14', background: '#fffbe6' }}>
                <ul style={{ color: '#595959', fontSize: 14, lineHeight: 2, paddingLeft: 20 }}>
                  <li>请确保所填信息真实准确，虚假信息将承担相应法律责任</li>
                  <li>飞行计划提交后需等待空管部门审批，通常 1-3 个工作日</li>
                  <li>审批通过后请在规定时间内执行飞行计划</li>
                  <li>如需变更或取消计划，请提前联系空管部门</li>
                </ul>
              </Card>
              <Divider />
              <div style={{ textAlign: 'center', marginBottom: 24 }}>
                <CheckCircleOutlined style={{ fontSize: 48, color: '#52c41a', marginBottom: 16 }} />
                <p style={{ fontSize: 16, color: '#262626' }}>飞行计划信息已全部填写完毕</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <Button size="large" onClick={function () { setCurrentStep(2); }} style={{ marginRight: 12 }}>上一步</Button>
                <Button type="primary" size="large" icon={<CheckCircleOutlined />} onClick={handleSubmit}>确认提交备案</Button>
              </div>
            </div>
          )}
        </Card>

        <Card title={<span style={{ fontSize: 16, fontWeight: 600 }}>📋 已备案飞行计划列表</span>} style={{ borderRadius: 12 }}>
          <Table
            dataSource={MY_PLAN_LIST}
            pagination={false}
            columns={[
              { title: '计划编号', dataIndex: 'id', key: 'id' },
              { title: '飞行类型', dataIndex: 'flightType', key: 'flightType' },
              { title: '飞行器', dataIndex: 'aircraft', key: 'aircraft' },
              { title: '使用空域', dataIndex: 'airspace', key: 'airspace' },
              { title: '日期', dataIndex: 'date', key: 'date' },
              { title: '时间段', dataIndex: 'timeRange', key: 'timeRange' },
              { title: '驾驶员', dataIndex: 'pilot', key: 'pilot' },
              {
                title: '状态',
                dataIndex: 'status',
                key: 'status',
                render: function (text: string, record: typeof MY_PLAN_LIST[0]) {
                  return <Tag color={record.statusColor}>{text}</Tag>;
                }
              }
            ]}
          />
        </Card>
      </div>

      <Modal
        open={showSuccess}
        title={null}
        footer={null}
        centered
        closable={false}
        width={420}
      >
        <div style={{ textAlign: 'center', padding: '24px 0' }}>
          <CheckCircleOutlined style={{ fontSize: 64, color: '#52c41a', marginBottom: 16 }} />
          <h3 style={{ fontSize: 20, fontWeight: 600, marginBottom: 8 }}>提交成功！</h3>
          <p style={{ color: '#595959', marginBottom: 24, lineHeight: 1.6 }}>
            您的飞行计划备案申请已成功提交<br />
            计划编号将自动生成，审批进度可在「我的飞行计划」中查看
          </p>
          <Button type="primary" size="large" block onClick={function () { setShowSuccess(false); handleNavigate('profile-certified?tab=plan'); }}>
            查看我的飞行计划
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default Component;
