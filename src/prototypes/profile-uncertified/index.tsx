/**
 * @name 个人中心（未认证）
 * @mode axure
 * /Users/xu/Desktop/元引信息/Axhub-Make-main/skills/axure-export-workflow/SKILL.md
 *
 */

import './style.css';

import React, { useState, useCallback } from 'react';
import { Card, Form, Input, Select, Button, Breadcrumb, Avatar, Descriptions, Tag, message, Row, Col, Modal, Alert, Result } from 'antd';
import { HomeOutlined, UserOutlined, SafetyCertificateOutlined, ExclamationCircleOutlined, IdcardOutlined, PhoneOutlined, EnvironmentOutlined, RocketOutlined, TeamOutlined, ShopOutlined, CustomerServiceOutlined, BankOutlined } from '@ant-design/icons';

var ROLES = [
  { value: 'personal', label: '个人用户', color: '#1677ff', icon: <UserOutlined /> },
  { value: 'pilot', label: '飞手', color: '#52c41a', icon: <RocketOutlined /> },
  { value: 'enterprise', label: '企业用户', color: '#722ed1', icon: <TeamOutlined /> },
  { value: 'provider', label: '飞行服务商', color: '#13c2c2', icon: <CustomerServiceOutlined /> },
  { value: 'merchant', label: '商户', color: '#fa8c16', icon: <ShopOutlined /> },
  { value: 'government', label: '政府部门', color: '#1677ff', icon: <BankOutlined /> }
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

var Component = function ProfileUncertifiedPage() {
  var [editMode, setEditMode] = useState(false);
  var [certOpen, setCertOpen] = useState(false);
  var [certStep, setCertStep] = useState(0);
  var [selectedRole, setSelectedRole] = useState('');
  var [form] = Form.useForm();
  var [certForm] = Form.useForm();

  var handleNavigate = useCallback(function (key: string) {
    window.location.href = '/prototypes/' + key;
  }, []);

  var handleSave = useCallback(function () {
    form.validateFields().then(function () {
      message.success('信息保存成功！');
      setEditMode(false);
    }).catch(function () {});
  }, [form]);

  var handleCertNext = useCallback(function () {
    if (certStep === 0) {
      if (!selectedRole) { message.warning('请选择角色'); return; }
      setCertStep(1);
    }
  }, [certStep, selectedRole]);

  var handleCertSubmit = useCallback(function () {
    certForm.validateFields().then(function () {
      setCertStep(2);
      message.success('认证信息已提交！');
    }).catch(function () {});
  }, [certForm]);

  var roleLabel = ROLES.find(function (r) { return r.value === selectedRole; });

  var renderCertForm = function () {
    if (selectedRole === 'personal') {
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
    if (selectedRole === 'pilot') {
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
    if (selectedRole === 'enterprise') return enterpriseFields;
    if (selectedRole === 'provider') {
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
    if (selectedRole === 'merchant') {
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
    if (selectedRole === 'government') {
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
          { title: '个人中心' }
        ]} style={{ marginBottom: 24 }} />

        <Row gutter={24}>
          <Col xs={24} md={6}>
            <Card style={{ borderRadius: 12, marginBottom: 24 }}>
              <div style={{ textAlign: 'center', marginBottom: 12 }}>
                <Avatar size={80} icon={<UserOutlined />} style={{ backgroundColor: '#bfbfbf', marginBottom: 12 }} />
                <div style={{ fontSize: 18, fontWeight: 600, color: '#1f1f1f' }}>新用户</div>
                <Tag color="default" style={{ marginTop: 8 }}>未认证</Tag>
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
                <Form form={form} layout="vertical" initialValues={{ name: 'dk20260001', phone: '138****8888', email: '' }}>
                  <Row gutter={16}>
                    <Col span={12}><Form.Item name="name" label="昵称" rules={[{ required: true }]}><Input size="large" /></Form.Item></Col>
                    <Col span={12}><Form.Item name="phone" label="联系电话" rules={[{ required: true }]}><Input size="large" /></Form.Item></Col>
                  </Row>
                  <Form.Item name="email" label="邮箱"><Input size="large" /></Form.Item>
                  <Form.Item>
                    <Button type="primary" size="large" onClick={handleSave} style={{ minWidth: 120 }}>保存</Button>
                  </Form.Item>
                </Form>
              ) : (
                <Descriptions column={2} bordered>
                  <Descriptions.Item label="昵称">新用户</Descriptions.Item>
                  <Descriptions.Item label="联系电话">138****8888</Descriptions.Item>
                  <Descriptions.Item label="邮箱">未设置</Descriptions.Item>
                  <Descriptions.Item label="注册时间">2026-04-27</Descriptions.Item>
                  <Descriptions.Item label="账户状态"><Tag color="green">正常</Tag></Descriptions.Item>
                </Descriptions>
              )}
            </Card>

            <Card
              title="认证信息"
              style={{ borderRadius: 12, marginBottom: 24 }}
              extra={<Button type="primary" icon={<SafetyCertificateOutlined />} onClick={function () { certForm.resetFields(); setCertStep(0); setSelectedRole(''); setCertOpen(true); }}>立即认证</Button>}
            >
              <Alert
                type="warning"
                showIcon
                icon={<ExclamationCircleOutlined />}
                title="您尚未完成角色认证"
                description="完成角色认证后，即可使用飞行器备案、飞行计划申报、服务预约、商品购买等平台完整功能。"
                style={{ marginBottom: 16 }}
              />
              <Descriptions column={2} bordered>
                <Descriptions.Item label="认证状态"><Tag color="default">未认证</Tag></Descriptions.Item>
                <Descriptions.Item label="认证类型">未选择</Descriptions.Item>
                <Descriptions.Item label="认证时间">—</Descriptions.Item>
                <Descriptions.Item label="认证编号">—</Descriptions.Item>
              </Descriptions>
            </Card>

            <Card title="角色说明" style={{ borderRadius: 12, marginBottom: 24 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[
                  { icon: <UserOutlined />, color: '#1677ff', label: '个人用户', desc: '面向普通公众用户，可浏览资讯公告、政策法规，预约低空服务、购买商城商品等基础功能。' },
                  { icon: <RocketOutlined />, color: '#52c41a', label: '飞手', desc: '面向持证无人机驾驶员，可进行飞行器备案、飞行计划申报、查看空域信息等专业飞行服务。' },
                  { icon: <TeamOutlined />, color: '#722ed1', label: '企业用户', desc: '面向无人机相关企业，支持企业资质认证、批量飞行器备案、团队飞行计划管理等功能。' },
                  { icon: <CustomerServiceOutlined />, color: '#13c2c2', label: '飞行服务商', desc: '面向低空飞行服务提供方，可发布服务项目、管理订单、提供航拍/巡检/物流等专业服务。' },
                  { icon: <ShopOutlined />, color: '#fa8c16', label: '商户', desc: '面向无人机产品销售方，可入驻商城发布商品、管理库存、处理订单和售后等电商业务。' },
                  { icon: <BankOutlined />, color: '#1677ff', label: '政府部门', desc: '面向监管机构和管理部门，可审批飞行主体、飞行器、飞行计划，管理空域信息和发布政策。' }
                ].map(function (role) {
                  return (
                    <div key={role.label} style={{ padding: '14px 16px', background: '#fafafa', borderRadius: 8, display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                      <div style={{ color: role.color, fontSize: 22, marginTop: 2, flexShrink: 0 }}>{role.icon}</div>
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 600, color: '#1f1f1f', marginBottom: 4 }}>{role.label}</div>
                        <div style={{ fontSize: 13, color: '#8c8c8c', lineHeight: 1.6 }}>{role.desc}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>


          </Col>
        </Row>
      </div>

      <Modal
        title="角色认证"
        open={certOpen}
        onCancel={function () { setCertOpen(false); }}
        width={600}
        footer={certStep === 2 ? [<Button key="close" type="primary" onClick={function () { setCertOpen(false); }}>关闭</Button>] : certStep === 1 ? [
          <Button key="prev" onClick={function () { setCertStep(0); }}>上一步</Button>,
          <Button key="submit" type="primary" onClick={handleCertSubmit}>提交认证</Button>
        ] : [
          <Button key="cancel" onClick={function () { setCertOpen(false); }}>关闭</Button>,
          <Button key="next" type="primary" disabled={!selectedRole} onClick={handleCertNext}>下一步</Button>
        ]}
      >
        {certStep === 0 && (
          <div style={{ marginTop: 16 }}>
            <p style={{ fontSize: 14, color: '#595959', marginBottom: 16 }}>请选择您要认证的角色：</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {ROLES.map(function (role) {
                var isSelected = selectedRole === role.value;
                return (
                  <div key={role.value} onClick={function () { setSelectedRole(role.value); }} style={{
                    padding: '16px 12px', borderRadius: 10, border: '2px solid ' + (isSelected ? '#1677ff' : '#f0f0f0'),
                    background: isSelected ? '#e6f4ff' : '#fff', cursor: 'pointer', textAlign: 'center', transition: 'all 0.2s'
                  }}>
                    <div style={{ fontSize: 24, color: isSelected ? '#1677ff' : role.color, marginBottom: 6 }}>{role.icon}</div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: isSelected ? '#1677ff' : '#1f1f1f', marginBottom: 2 }}>{role.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
        {certStep === 1 && (
          <div style={{ marginTop: 16 }}>
            <div style={{ background: '#f6ffed', padding: '12px 16px', borderRadius: 8, marginBottom: 16 }}>
              <p style={{ margin: 0, fontSize: 13, color: '#52c41a' }}>
                <SafetyCertificateOutlined style={{ marginRight: 6 }} />
                认证角色：<strong>{roleLabel ? roleLabel.label : ''}</strong>
              </p>
            </div>
            <Form form={certForm} layout="vertical">
              {renderCertForm()}
            </Form>
          </div>
        )}
        {certStep === 2 && (
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
