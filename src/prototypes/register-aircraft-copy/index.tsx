/**
 * @name 备案飞行器
 * @mode axure
 * /Users/xu/Desktop/元引信息/Axhub-Make-main/skills/axure-export-workflow/SKILL.md
 *
 */

import './style.css';

import React, { useState, useCallback } from 'react';
import { Card, Form, Input, Button, Select, Steps, Upload, message, Table, Tag, Modal, Divider, Row, Col } from 'antd';
import { RocketOutlined, UploadOutlined, CheckCircleOutlined, InboxOutlined, SafetyCertificateOutlined, PlusOutlined, FileTextOutlined } from '@ant-design/icons';

const AIRCRAFT_TYPES = [
  { value: 'multirotor', label: '多旋翼无人机' },
  { value: 'fixedwing', label: '固定翼无人机' },
  { value: 'vtol', label: '垂直起降固定翼(eVTOL)' },
  { value: 'helicopter', label: '无人直升机' }
];

const WEIGHT_CLASSES = [
  { value: 'micro', label: '微型（<1.5kg）' },
  { value: 'light', label: '轻型（1.5-25kg）' },
  { value: 'small', label: '小型（25-150kg）' },
  { value: 'medium', label: '中型（150-5700kg）' }
];

const USE_PURPOSES = [
  { value: 'photography', label: '航拍摄影' },
  { value: 'inspection', label: '巡检巡查' },
  { value: 'logistics', label: '物流配送' },
  { value: 'agriculture', label: '农林植保' },
  { value: 'mapping', label: '测绘勘探' },
  { value: 'training', label: '培训教学' },
  { value: 'emergency', label: '应急救援' },
  { value: 'other', label: '其他用途' }
];

const MY_AIRCRAFT_LIST = [
  {
    key: '1',
    id: 'UAV-BJ-2026-001',
    model: 'DJI Mavic 3 Enterprise',
    type: '多旋翼无人机',
    weightClass: '轻型（1.5-25kg）',
    purpose: '航拍摄影',
    serialNo: 'DM3E20260115001',
    registerDate: '2026-01-15',
    status: '已备案',
    statusColor: '#52c41a'
  },
  {
    key: '2',
    id: 'UAV-BJ-2026-002',
    model: '大疆 T50 农业无人机',
    type: '多旋翼无人机',
    weightClass: '小型（25-150kg）',
    purpose: '农林植保',
    serialNo: 'DJT50202603200001',
    registerDate: '2026-03-20',
    status: '已备案',
    statusColor: '#52c41a'
  }
];

const Component = function RegisterAircraftPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [form] = Form.useForm();
  const [showSuccess, setShowSuccess] = useState(false);
  const handleNavigate = useCallback(function (key: string) {
    window.location.href = '/prototypes/' + key;
  }, []);

  var handleSubmit = useCallback(function () {
    form.validateFields().then(function () {
      setShowSuccess(true);
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
        <Card style={{ borderRadius: 12, marginBottom: 24 }}>
          <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 4, display: 'flex', alignItems: 'center', gap: 8 }}>
            <RocketOutlined style={{ color: '#eb2f96' }} />
            备案飞行器
          </h2>
          <p style={{ color: '#8c8c8c', marginTop: 8, marginBottom: 24 }}>请填写飞行器信息完成实名备案登记，审核通过后即可正常使用。</p>

          <Steps
            current={currentStep}
            items={[
              { title: '基本信息', icon: <FileTextOutlined /> },
              { title: '技术参数', icon: <InboxOutlined /> },
              { title: '上传材料', icon: <UploadOutlined /> },
              { title: '确认提交', icon: <CheckCircleOutlined /> }
            ]}
            style={{ marginBottom: 32 }}
          />

          {currentStep === 0 && (
            <Form form={form} layout="vertical" requiredMark="optional">
              <Row gutter={24}>
                <Col span={12}>
                  <Form.Item name="aircraftName" label="飞行器名称" rules={[{ required: true, message: '请输入飞行器名称' }]}>
                    <Input placeholder="如：作业一号机" size="large" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="aircraftType" label="飞行器类型" rules={[{ required: true, message: '请选择飞行器类型' }]}>
                    <Select placeholder="请选择飞行器类型" size="large" options={AIRCRAFT_TYPES} />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={24}>
                <Col span={12}>
                  <Form.Item name="model" label="型号规格" rules={[{ required: true, message: '请输入型号规格' }]}>
                    <Input placeholder="如：DJI Mavic 3 Enterprise" size="large" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="serialNumber" label="序列号/SN码" rules={[{ required: true, message: '请输入序列号' }]}>
                    <Input placeholder="请输入飞行器序列号" size="large" />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={24}>
                <Col span={12}>
                  <Form.Item name="manufacturer" label="制造商">
                    <Input placeholder="如：深圳市大疆创新科技" size="large" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="weightClass" label="重量分类" rules={[{ required: true, message: '请选择重量分类' }]}>
                    <Select placeholder="请选择重量分类" size="large" options={WEIGHT_CLASSES} />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={24}>
                <Col span={12}>
                  <Form.Item name="purchaseDate" label="购置日期">
                    <Input type="date" size="large" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="purpose" label="使用用途" rules={[{ required: true, message: '请选择使用用途' }]}>
                    <Select placeholder="请选择主要用途" size="large" options={USE_PURPOSES} />
                  </Form.Item>
                </Col>
              </Row>
              <div style={{ textAlign: 'right', marginTop: 24 }}>
                <Button type="primary" size="large" onClick={function () { setCurrentStep(1); }}>下一步</Button>
              </div>
            </Form>
          )}

          {currentStep === 1 && (
            <Form form={form} layout="vertical" requiredMark="optional">
              <Row gutter={24}>
                <Col span={12}>
                  <Form.Item name="maxTakeoffWeight" label="最大起飞重量(kg)">
                    <Input placeholder="请输入最大起飞重量" size="large" type="number" suffix="kg" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="maxFlightAltitude" label="最大飞行高度(m)">
                    <Input placeholder="请输入最大飞行高度" size="large" type="number" suffix="m" />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={24}>
                <Col span={12}>
                  <Form.Item name="maxEndurance" label="最大续航时间(min)">
                    <Input placeholder="请输入续航时间" size="large" type="number" suffix="分钟" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="maxRange" label="最大控制距离(km)">
                    <Input placeholder="请输入控制距离" size="large" type="number" suffix="km" />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={24}>
                <Col span={12}>
                  <Form.Item name="maxSpeed" label="最大飞行速度(km/h)">
                    <Input placeholder="请输入最大速度" size="large" type="number" suffix="km/h" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="gpsCapability" label="定位能力">
                    <Select placeholder="请选择定位能力" size="large" options={[
                      { value: 'single', label: '单频GPS' },
                      { value: 'dual', label: '双频GPS+北斗' },
                      { value: 'rtk', label: 'RTK高精度定位' }
                    ]} />
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item name="specialFeatures" label="特殊功能">
                <Input.TextArea rows={3} placeholder="如有避障系统、夜航能力、防水等级等特殊功能请说明" size="large" />
              </Form.Item>
              <div style={{ textAlign: 'right', marginTop: 24 }}>
                <Button size="large" onClick={function () { setCurrentStep(0); }} style={{ marginRight: 12 }}>上一步</Button>
                <Button type="primary" size="large" onClick={function () { setCurrentStep(2); }}>下一步</Button>
              </div>
            </Form>
          )}

          {currentStep === 2 && (
            <div>
              <Card size="small" title={<span>📎 上传材料清单</span>} style={{ marginBottom: 16, background: '#fafafa' }}>
                <p style={{ color: '#595959', fontSize: 13, lineHeight: 1.8 }}>
                  请上传以下材料的清晰照片或扫描件：<br />
                  • 购买凭证或发票<br />
                  • 飞行器合格证明文件<br />
                  • 保险单据（如有）<br />
                  • 驾驶员执照（如有）
                </p>
              </Card>
              <Form.Item label="购买凭证">
                <Upload.Dragger multiple maxCount={3} beforeUpload={function () { return false; }}>
                  <p className="ant-upload-drag-icon"><InboxOutlined /></p>
                  <p className="ant-upload-text">点击或拖拽上传购买凭证</p>
                  <p className="ant-upload-hint">支持 JPG、PNG、PDF 格式，单个文件不超过 10MB</p>
                </Upload.Dragger>
              </Form.Item>
              <Form.Item label="合格证明">
                <Upload.Dragger multiple maxCount={3} beforeUpload={function () { return false; }}>
                  <p className="ant-upload-drag-icon"><InboxOutlined /></p>
                  <p className="ant-upload-text">点击或拖拽上传合格证明</p>
                  <p className="ant-upload-hint">支持 JPG、PNG、PDF 格式，单个文件不超过 10MB</p>
                </Upload.Dragger>
              </Form.Item>
              <Form.Item label="其他材料">
                <Upload.Dragger multiple maxCount={5} beforeUpload={function () { return false; }}>
                  <p className="ant-upload-drag-icon"><InboxOutlined /></p>
                  <p className="ant-upload-text">点击或拖拽上传其他材料</p>
                  <p className="ant-upload-hint">保险单据、驾驶员执照等</p>
                </Upload.Dragger>
              </Form.Item>
              <div style={{ textAlign: 'right', marginTop: 24 }}>
                <Button size="large" onClick={function () { setCurrentStep(1); }} style={{ marginRight: 12 }}>上一步</Button>
                <Button type="primary" size="large" onClick={function () { setCurrentStep(3); }}>下一步</Button>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div>
              <Card size="small" title={<span>📋 信息确认</span>} style={{ marginBottom: 24, background: '#fafafa' }}>
                <p style={{ color: '#595959', fontSize: 14, lineHeight: 2 }}>
                  请仔细核对以上填写的所有信息，确认无误后点击提交。<br />
                  提交后将在 3-5 个工作日内完成审核。
                </p>
              </Card>
              <Divider />
              <div style={{ textAlign: 'center', marginBottom: 24 }}>
                <CheckCircleOutlined style={{ fontSize: 48, color: '#52c41a', marginBottom: 16 }} />
                <p style={{ fontSize: 16, color: '#262626' }}>所有信息已填写完毕，请确认提交</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <Button size="large" onClick={function () { setCurrentStep(2); }} style={{ marginRight: 12 }}>上一步</Button>
                <Button type="primary" size="large" icon={<CheckCircleOutlined />} onClick={handleSubmit}>确认提交备案</Button>
              </div>
            </div>
          )}
        </Card>

        <Card title={<span style={{ fontSize: 16, fontWeight: 600 }}>📋 已备案飞行器列表</span>} style={{ borderRadius: 12 }}>
          <Table
            dataSource={MY_AIRCRAFT_LIST}
            pagination={false}
            columns={[
              { title: '备案编号', dataIndex: 'id', key: 'id' },
              { title: '型号', dataIndex: 'model', key: 'model' },
              { title: '类型', dataIndex: 'type', key: 'type' },
              { title: '重量级别', dataIndex: 'weightClass', key: 'weightClass' },
              { title: '用途', dataIndex: 'purpose', key: 'purpose' },
              { title: '备案日期', dataIndex: 'registerDate', key: 'registerDate' },
              {
                title: '状态',
                dataIndex: 'status',
                key: 'status',
                render: function (text: string, record: typeof MY_AIRCRAFT_LIST[0]) {
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
            您的飞行器备案申请已成功提交<br />
            审核结果将通过短信和站内消息通知您
          </p>
          <Button type="primary" size="large" block onClick={function () { window.location.href = '/prototypes/profile-certified?tab=aircraft'; }}>
            查看我的飞行器
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default Component;
