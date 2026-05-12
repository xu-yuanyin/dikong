/**
 * @name 我的信息
 * @mode axure
 * /Users/xu/Desktop/元引信息/Axhub-Make-main/skills/axure-export-workflow/SKILL.md
 *
 */

import './style.css';

import React, { useState, useCallback } from 'react';
import { Card, Form, Input, Select, Button, Breadcrumb, Avatar, Descriptions, Tag, message, Row, Col, Modal, Alert, Steps, Result } from 'antd';
import { HomeOutlined, UserOutlined, SafetyCertificateOutlined, CheckCircleOutlined, ExclamationCircleOutlined, IdcardOutlined, PhoneOutlined, EnvironmentOutlined, RocketOutlined, TeamOutlined, ShopOutlined, CustomerServiceOutlined, BankOutlined } from '@ant-design/icons';

var ROLES = [
  { value: 'personal', label: '个人用户', color: '#1677ff', icon: <UserOutlined /> },
  { value: 'pilot', label: '飞手', color: '#52c41a', icon: <RocketOutlined /> },
  { value: 'enterprise', label: '企业用户', color: '#722ed1', icon: <TeamOutlined /> },
  { value: 'provider', label: '飞行服务商', color: '#13c2c2', icon: <CustomerServiceOutlined /> },
  { value: 'merchant', label: '商户', color: '#fa8c16', icon: <ShopOutlined /> },
  { value: 'government', label: '政府部门', color: '#1677ff', icon: <BankOutlined /> }
];

var MENU_ITEMS = [
  { key: 'profile', label: '我的信息' },
  { key: 'my-aircraft', label: '我的飞行器' },
  { key: 'my-flight-plan', label: '我的飞行计划' },
  { key: 'my-service', label: '我的服务' },
  { key: 'my-intention', label: '我的采购意向' },
  { key: 'my-service-demand', label: '我的需求' }
];

var PILOT_LEVELS = [
  { value: 'multi_rotor', label: '多旋翼' },
  { value: 'fixed_wing', label: '固定翼' },
  { value: 'helicopter', label: '直升机' },
  { value: 'vtol', label: '垂直起降固定翼' }
];

var SERVICE_TYPES = [
  { value: 'aerial_photo', label: '航拍服务' },
  { value: 'survey', label: '测绘服务' },
  { value: 'inspection', label: '巡检服务' },
  { value: 'logistics', label: '物流配送' },
  { value: 'agriculture', label: '农业植保' },
  { value: 'training', label: '培训服务' }
];

var PRODUCT_CATEGORIES = [
  { value: 'drone', label: '无人机整机' },
  { value: 'accessory', label: '配件电池' },
  { value: 'sensor', label: '传感器载荷' },
  { value: 'software', label: '软件服务' },
  { value: 'other', label: '其他' }
];

var Component = function ProfilePage() {
  var [editMode, setEditMode] = useState(false);
  var [certOpen, setCertOpen] = useState(false);
  var [certStep, setCertStep] = useState(0);
  var [form] = Form.useForm();
  var [certForm] = Form.useForm();

  var handleNavigate = useCallback(function (key: string) {
    window.location.href = '/prototypes/' + key;
  }, []);

  var currentRole = ROLES[1];
  var certStatus = 'uncertified';

  var handleSave = useCallback(function () {
    form.validateFields().then(function () {
      message.success('信息保存成功！');
      setEditMode(false);
    }).catch(function () {});
  }, [form]);

  var handleCertSubmit = useCallback(function () {
    certForm.validateFields().then(function () {
      setCertStep(1);
      message.success('认证信息已提交！');
    }).catch(function () {});
  }, [certForm]);

  var renderCertForm = function () {
    if (currentRole.value === 'personal') {
      return (
        <>
          <Form.Item name="realName" label="真实姓名" rules={[{ required: true, message: '请输入' }]}>
            <Input size="large" prefix={<UserOutlined />} placeholder="请输入真实姓名" />
          </Form.Item>
          <Form.Item name="idCard" label="身份证号" rules={[{ required: true, message: '请输入' }]}>
            <Input size="large" prefix={<IdcardOutlined />} placeholder="请输入18位身份证号" />
          </Form.Item>
        </>
      );
    }
    if (currentRole.value === 'pilot') {
      return (
        <>
          <Form.Item name="realName" label="真实姓名" rules={[{ required: true, message: '请输入' }]}>
            <Input size="large" prefix={<UserOutlined />} placeholder="请输入真实姓名" />
          </Form.Item>
          <Form.Item name="idCard" label="身份证号" rules={[{ required: true, message: '请输入' }]}>
            <Input size="large" prefix={<IdcardOutlined />} placeholder="请输入18位身份证号" />
          </Form.Item>
          <Form.Item name="licenseNo" label="驾驶证编号" rules={[{ required: true, message: '请输入' }]}>
            <Input size="large" prefix={<SafetyCertificateOutlined />} placeholder="请输入无人机驾驶证编号" />
          </Form.Item>
          <Form.Item name="pilotLevel" label="驾驶等级" rules={[{ required: true, message: '请选择' }]}>
            <Select size="large" mode="multiple" placeholder="请选择驾驶等级（可多选）" options={PILOT_LEVELS} />
          </Form.Item>
        </>
      );
    }
    var enterpriseFields = (
      <>
        <Form.Item name="companyName" label="企业名称" rules={[{ required: true, message: '请输入' }]}>
          <Input size="large" placeholder="请输入企业全称" />
        </Form.Item>
        <Form.Item name="creditCode" label="统一社会信用代码" rules={[{ required: true, message: '请输入' }]}>
          <Input size="large" placeholder="请输入18位统一社会信用代码" />
        </Form.Item>
        <Form.Item name="contactName" label="联系人" rules={[{ required: true, message: '请输入' }]}>
          <Input size="large" prefix={<UserOutlined />} placeholder="请输入联系人姓名" />
        </Form.Item>
        <Form.Item name="contactPhone" label="联系电话" rules={[{ required: true, message: '请输入' }]}>
          <Input size="large" prefix={<PhoneOutlined />} placeholder="请输入联系电话" />
        </Form.Item>
      </>
    );
    if (currentRole.value === 'enterprise') return enterpriseFields;
    if (currentRole.value === 'provider') {
      return (
        <>
          {enterpriseFields}
          <Form.Item name="serviceTypes" label="服务类型" rules={[{ required: true, message: '请选择' }]}>
            <Select size="large" mode="multiple" placeholder="请选择服务类型（可多选）" options={SERVICE_TYPES} />
          </Form.Item>
          <Form.Item name="serviceArea" label="服务区域" rules={[{ required: true, message: '请输入' }]}>
            <Input size="large" prefix={<EnvironmentOutlined />} placeholder="如：XX市全域" />
          </Form.Item>
        </>
      );
    }
    if (currentRole.value === 'merchant') {
      return (
        <>
          {enterpriseFields}
          <Form.Item name="mainCategory" label="主营类目" rules={[{ required: true, message: '请选择' }]}>
            <Select size="large" mode="multiple" placeholder="请选择主营类目（可多选）" options={PRODUCT_CATEGORIES} />
          </Form.Item>
          <Form.Item name="businessAddress" label="经营地址" rules={[{ required: true, message: '请输入' }]}>
            <Input size="large" prefix={<EnvironmentOutlined />} placeholder="请输入详细经营地址" />
          </Form.Item>
        </>
      );
    }
    if (currentRole.value === 'government') {
      return (
        <>
          <Form.Item name="unitName" label="单位名称" rules={[{ required: true, message: '请输入' }]}>
            <Input size="large" placeholder="请输入政府单位全称" />
          </Form.Item>
          <Form.Item name="creditCode" label="统一社会信用代码" rules={[{ required: true, message: '请输入' }]}>
            <Input size="large" placeholder="请输入18位统一社会信用代码" />
          </Form.Item>
          <Form.Item name="orgType" label="机构类型" rules={[{ required: true, message: '请选择' }]}>
            <Select size="large" placeholder="请选择机构类型" options={[
              { value: 'national', label: '国家机关' },
              { value: 'local', label: '地方政府' },
              { value: 'department', label: '职能部门' },
              { value: 'bureau', label: '直属机构' },
              { value: 'other', label: '其他' }
            ]} />
          </Form.Item>
          <Form.Item name="contactName" label="联系人" rules={[{ required: true, message: '请输入' }]}>
            <Input size="large" prefix={<UserOutlined />} placeholder="请输入联系人姓名" />
          </Form.Item>
          <Form.Item name="contactPhone" label="联系电话" rules={[{ required: true, message: '请输入' }]}>
            <Input size="large" prefix={<PhoneOutlined />} placeholder="请输入联系电话" />
          </Form.Item>
        </>
      );
    }
    return null;
  };

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
            <a style={{ color: 'rgba(255,255,255,0.85)', cursor: 'pointer' }} onClick={function () { handleNavigate('flight-dynamic'); }}>飞行服务</a>
            <a style={{ color: '#fff', fontWeight: 600, cursor: 'pointer' }}>个人中心</a>
          </div>
        </div>
      </header>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px 24px 48px' }}>
        <Breadcrumb items={[
          { title: <a onClick={function () { handleNavigate('home'); }}><HomeOutlined /> 首页</a> },
          { title: '个人中心' },
          { title: '我的信息' }
        ]} style={{ marginBottom: 24 }} />

        <Row gutter={24}>
          <Col xs={24} md={6}>
            <Card style={{ borderRadius: 12, marginBottom: 24 }}>
              <div style={{ textAlign: 'center', marginBottom: 16 }}>
                <Avatar size={80} icon={<UserOutlined />} style={{ backgroundColor: currentRole.color, marginBottom: 12 }} />
                <div style={{ fontSize: 18, fontWeight: 600, color: '#1f1f1f' }}>张明</div>
                <Tag color={currentRole.color} style={{ marginTop: 8 }}>{currentRole.label}</Tag>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                {MENU_ITEMS.map(function (item) {
                  var showGroup = item.group && (MENU_ITEMS.findIndex(function (m) { return m.key === item.key; }) === 0 || MENU_ITEMS[MENU_ITEMS.findIndex(function (m) { return m.key === item.key; }) - 1].group !== item.group);
                  return (
                    <div key={item.key}>
                      {showGroup && <div style={{ padding: '8px 16px 4px', fontSize: 11, color: '#8c8c8c', fontWeight: 600, letterSpacing: 1 }}>{item.group}</div>}
                      <div
                        onClick={function () { if (item.key !== 'profile') handleNavigate(item.key); }}
                        style={{
                          padding: '10px 16px',
                          borderRadius: 8,
                          cursor: 'pointer',
                          background: item.key === 'profile' ? '#e6f7ff' : 'transparent',
                          color: item.key === 'profile' ? '#1677ff' : '#595959',
                          fontWeight: item.key === 'profile' ? 600 : 400,
                          fontSize: 14,
                          transition: 'all 0.2s'
                        }}
                      >
                        {item.label}
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          </Col>
          <Col xs={24} md={18}>
            <Card
              title="基本信息"
              extra={<Button type={editMode ? 'default' : 'primary'} onClick={function () { setEditMode(!editMode); }}>{editMode ? '取消编辑' : '编辑信息'}</Button>}
              style={{ borderRadius: 12, marginBottom: 24 }}
            >
              {editMode ? (
                <Form form={form} layout="vertical" initialValues={{ name: 'dk20260001', phone: '138****8888', email: 'dk20260001@example.com', role: 'pilot', company: '蓝天飞行服务队' }}>
                  <Row gutter={16}>
                    <Col span={12}><Form.Item name="name" label="昵称" rules={[{ required: true }]}><Input size="large" /></Form.Item></Col>
                    <Col span={12}><Form.Item name="role" label="角色类型" rules={[{ required: true, message: '请选择角色' }]}>
                      <Select size="large" placeholder="请选择您的角色" options={ROLES.map(function (r) { return { value: r.value, label: <span>{r.icon} <span style={{ marginLeft: 6 }}>{r.label}</span></span> }; })} />
                    </Form.Item></Col>
                  </Row>
                  <Row gutter={16}>
                    <Col span={12}><Form.Item name="phone" label="联系电话" rules={[{ required: true }]}><Input size="large" /></Form.Item></Col>
                    <Col span={12}><Form.Item name="email" label="邮箱"><Input size="large" /></Form.Item></Col>
                  </Row>
                  <Form.Item name="company" label="所属单位"><Input size="large" /></Form.Item>
                  <Form.Item>
                    <Button type="primary" size="large" onClick={handleSave} style={{ minWidth: 120 }}>保存</Button>
                  </Form.Item>
                </Form>
              ) : (
                <Descriptions column={2} bordered>
                  <Descriptions.Item label="昵称">张明</Descriptions.Item>
                  <Descriptions.Item label="角色类型"><Tag color={currentRole.color}>{currentRole.label}</Tag></Descriptions.Item>
                  <Descriptions.Item label="联系电话">138****8888</Descriptions.Item>
                  <Descriptions.Item label="邮箱">zhangming@example.com</Descriptions.Item>
                  <Descriptions.Item label="所属单位">蓝天飞行服务队</Descriptions.Item>
                  <Descriptions.Item label="注册时间">2025-06-15</Descriptions.Item>
                  <Descriptions.Item label="账户状态"><Tag color="green">正常</Tag></Descriptions.Item>
                </Descriptions>
              )}
            </Card>

            <Card
              title="认证信息"
              style={{ borderRadius: 12 }}
              extra={certStatus === 'uncertified' ? <Button type="primary" icon={<SafetyCertificateOutlined />} onClick={function () { certForm.resetFields(); setCertStep(0); setCertOpen(true); }}>去认证</Button> : null}
            >
              {certStatus === 'uncertified' && (
                <Alert
                  type="warning"
                  showIcon
                  icon={<ExclamationCircleOutlined />}
                  message="您尚未完成实名认证"
                  description={
                    <div>
                      <p style={{ margin: '0 0 8px' }}>完成实名认证后可使用飞行器备案、飞行计划申报、服务发布、商品上架等完整功能。</p>
                      <Button type="link" style={{ padding: 0 }} onClick={function () { certForm.resetFields(); setCertStep(0); setCertOpen(true); }}>立即认证 →</Button>
                    </div>
                  }
                  style={{ marginBottom: 16 }}
                />
              )}
              {certStatus === 'pending' && (
                <Alert
                  type="info"
                  showIcon
                  message="认证审核中"
                  description="您的认证信息已提交，管理员将在 1-3 个工作日内完成审核，请耐心等待。"
                  style={{ marginBottom: 16 }}
                />
              )}
              {certStatus === 'certified' && (
                <Alert
                  type="success"
                  showIcon
                  icon={<CheckCircleOutlined />}
                  message="已完成实名认证"
                  description="您已完成实名认证，可使用平台全部功能。"
                  style={{ marginBottom: 16 }}
                />
              )}
              <Descriptions column={2} bordered>
                <Descriptions.Item label="认证状态">
                  {certStatus === 'uncertified' && <Tag color="default">未认证</Tag>}
                  {certStatus === 'pending' && <Tag color="orange">审核中</Tag>}
                  {certStatus === 'certified' && <Tag color="green">已认证</Tag>}
                </Descriptions.Item>
                <Descriptions.Item label="认证类型">{currentRole.label}认证</Descriptions.Item>
                <Descriptions.Item label="认证时间">{certStatus === 'certified' ? '2026-04-20' : '—'}</Descriptions.Item>
                <Descriptions.Item label="认证编号">{certStatus === 'certified' ? 'CERT-2026-0088' : '—'}</Descriptions.Item>
              </Descriptions>
            </Card>
          </Col>
        </Row>
      </div>

      <Modal
        title="实名认证"
        open={certOpen}
        onCancel={function () { setCertOpen(false); }}
        width={600}
        footer={certStep === 1 ? [<Button key="close" type="primary" onClick={function () { setCertOpen(false); }}>关闭</Button>] : [
          <Button key="cancel" onClick={function () { setCertOpen(false); }}>关闭</Button>,
          <Button key="submit" type="primary" onClick={handleCertSubmit}>提交认证</Button>
        ]}
      >
        {certStep === 0 && (
          <div style={{ marginTop: 16 }}>
            <div style={{ background: '#f6ffed', padding: '12px 16px', borderRadius: 8, marginBottom: 16 }}>
              <p style={{ margin: 0, fontSize: 13, color: '#52c41a' }}>
                <SafetyCertificateOutlined style={{ marginRight: 6 }} />
                当前角色：<strong>{currentRole.label}</strong>，请根据角色填写对应认证信息
              </p>
            </div>
            <Form form={certForm} layout="vertical">
              {renderCertForm()}
            </Form>
          </div>
        )}
        {certStep === 1 && (
          <Result
            status="success"
            title="认证信息提交成功！"
            subTitle="管理员将在 1-3 个工作日内完成审核，审核通过后您可使用平台全部功能。"
          />
        )}
      </Modal>
    </div>
  );
};

export default Component;
