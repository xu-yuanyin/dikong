/**
 * @name 角色管理
 * @mode axure
 */

import './style.css';

import React, { useState, useCallback } from 'react';
import { Card, Tag, Button, Modal, Form, Input, Select, Avatar, message, Empty, Breadcrumb, Row, Col, Descriptions } from 'antd';
import { UserOutlined, RocketOutlined, TeamOutlined, CustomerServiceOutlined, ShopOutlined, BankOutlined, PlusOutlined, SwapOutlined, CheckCircleOutlined, ClockCircleOutlined, ExclamationCircleOutlined, SafetyCertificateOutlined, HomeOutlined, IdcardOutlined, PhoneOutlined, EnvironmentOutlined, EyeOutlined } from '@ant-design/icons';

var MENU_ITEMS = [
  { key: 'profile-certified', label: '我的信息', group: '账号管理' },
  { key: 'role-management', label: '角色管理' },
  { key: 'message-center', label: '消息中心' },
  { key: 'my-orders', label: '我的预约', group: '个人/需求方业务' },
  { key: 'my-demand', label: '我的需求' },
  { key: 'my-aircraft', label: '我的飞行器', group: '飞行服务 (飞手/企业)' },
  { key: 'my-flight-plan', label: '我的飞行计划' },
  { key: 'my-goods', label: '我的商品', group: '低空商城 (商户)' },
  { key: 'mall-publish', label: '发布商品' },
  { key: 'my-service', label: '我的服务', group: '低空服务 (飞行服务商)' },
  { key: 'service-publish', label: '发布服务项目' },
  { key: 'provider-orders', label: '服务受理单' },
  { key: 'provider-intentions', label: '商品受理单' }
];

var ROLES = [
  { value: 'personal', label: '个人用户', color: '#1677ff', icon: <UserOutlined />, desc: '面向普通公众用户，可浏览资讯公告、政策法规，预约低空服务、购买商城商品等基础功能。' },
  { value: 'pilot', label: '飞手', color: '#52c41a', icon: <RocketOutlined />, desc: '面向持证无人机驾驶员，可进行飞行器备案、飞行计划申报、查看空域信息等专业飞行服务。' },
  { value: 'enterprise', label: '企业用户', color: '#722ed1', icon: <TeamOutlined />, desc: '面向无人机相关企业，支持企业资质认证、批量飞行器备案、团队飞行计划管理等功能。' },
  { value: 'provider', label: '飞行服务商', color: '#13c2c2', icon: <CustomerServiceOutlined />, desc: '面向低空飞行服务提供方，可发布服务项目、管理订单、提供航拍/巡检/物流等专业服务。' },
  { value: 'merchant', label: '商户', color: '#fa8c16', icon: <ShopOutlined />, desc: '面向无人机产品销售方，可入驻商城发布商品、管理库存、处理订单和售后等电商业务。' },
  { value: 'government', label: '政府部门', color: '#1677ff', icon: <BankOutlined />, desc: '面向监管机构和管理部门，可审批飞行主体、飞行器、飞行计划，管理空域信息和发布政策。' }
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

var MY_ROLES = [
  { value: 'pilot', label: '飞手', color: '#52c41a', icon: <RocketOutlined />, status: 'certified', certTime: '2026-03-15', isCurrent: true },
  { value: 'provider', label: '飞行服务商', color: '#13c2c2', icon: <CustomerServiceOutlined />, status: 'certified', certTime: '2026-04-01', isCurrent: false },
  { value: 'enterprise', label: '企业用户', color: '#722ed1', icon: <TeamOutlined />, status: 'pending', certTime: '', isCurrent: false }
];

var handleNavigate = function (key: string) {
  window.location.href = '/prototypes/' + key;
};

var Component = function RoleManagementPage() {
  var [myRoles, setMyRoles] = useState(MY_ROLES);
  var [addOpen, setAddOpen] = useState(false);
  var [selectedRole, setSelectedRole] = useState('');
  var [certStep, setCertStep] = useState(0);
  var [certForm] = Form.useForm();
  var [switchOpen, setSwitchOpen] = useState(false);
  var [switchTarget, setSwitchTarget] = useState<any>(null);

  var availableRoles = ROLES.filter(function (r) {
    return !myRoles.some(function (mr) { return mr.value === r.value; });
  });

  var handleAddNext = function () {
    if (!selectedRole) { message.warning('请选择要认证的角色'); return; }
    setCertStep(1);
  };

  var handleCertSubmit = function () {
    certForm.validateFields().then(function () {
      var roleInfo = ROLES.find(function (r) { return r.value === selectedRole; });
      if (roleInfo) {
        setMyRoles(function (prev) {
          return prev.concat([{ value: roleInfo.value, label: roleInfo.label, color: roleInfo.color, icon: roleInfo.icon, status: 'pending', certTime: '', isCurrent: false }]);
        });
      }
      message.success('认证申请已提交，请等待审核');
      setAddOpen(false); setCertStep(0); setSelectedRole(''); certForm.resetFields();
    }).catch(function () {});
  };

  var handleSwitch = function (role: any) {
    if (role.status !== 'certified') { message.warning('该角色尚未认证通过，无法切换'); return; }
    setSwitchTarget(role); setSwitchOpen(true);
  };

  var confirmSwitch = function () {
    if (switchTarget) {
      setMyRoles(function (prev) { return prev.map(function (r) { return Object.assign({}, r, { isCurrent: r.value === switchTarget.value }); }); });
      message.success('已切换至「' + switchTarget.label + '」角色');
    }
    setSwitchOpen(false); setSwitchTarget(null);
  };

  var getStatusTag = function (status: string) {
    if (status === 'certified') return <Tag color="success" icon={<CheckCircleOutlined />}>已认证</Tag>;
    if (status === 'pending') return <Tag color="processing" icon={<ClockCircleOutlined />}>审核中</Tag>;
    return <Tag color="error" icon={<ExclamationCircleOutlined />}>已驳回</Tag>;
  };

  var renderCertForm = function () {
    if (selectedRole === 'personal') {
      return (<>
        <Form.Item name="realName" label="真实姓名" rules={[{ required: true, message: '请输入' }]}><Input size="large" prefix={<UserOutlined />} placeholder="请输入真实姓名" /></Form.Item>
        <Form.Item name="idCard" label="身份证号" rules={[{ required: true, message: '请输入' }]}><Input size="large" prefix={<IdcardOutlined />} placeholder="请输入18位身份证号" /></Form.Item>
      </>);
    }
    if (selectedRole === 'pilot') {
      return (<>
        <Form.Item name="realName" label="真实姓名" rules={[{ required: true, message: '请输入' }]}><Input size="large" prefix={<UserOutlined />} placeholder="请输入真实姓名" /></Form.Item>
        <Form.Item name="idCard" label="身份证号" rules={[{ required: true, message: '请输入' }]}><Input size="large" prefix={<IdcardOutlined />} placeholder="请输入18位身份证号" /></Form.Item>
        <Form.Item name="licenseNo" label="驾驶证编号" rules={[{ required: true, message: '请输入' }]}><Input size="large" prefix={<SafetyCertificateOutlined />} placeholder="请输入无人机驾驶证编号" /></Form.Item>
        <Form.Item name="pilotLevel" label="驾驶等级" rules={[{ required: true, message: '请选择' }]}><Select size="large" mode="multiple" placeholder="请选择驾驶等级（可多选）" options={PILOT_LEVELS} /></Form.Item>
      </>);
    }
    var enterpriseFields = (<>
      <Form.Item name="companyName" label="企业名称" rules={[{ required: true, message: '请输入' }]}><Input size="large" placeholder="请输入企业全称" /></Form.Item>
      <Form.Item name="creditCode" label="统一社会信用代码" rules={[{ required: true, message: '请输入' }]}><Input size="large" placeholder="请输入18位统一社会信用代码" /></Form.Item>
      <Form.Item name="contactName" label="联系人" rules={[{ required: true, message: '请输入' }]}><Input size="large" prefix={<UserOutlined />} placeholder="请输入联系人姓名" /></Form.Item>
      <Form.Item name="contactPhone" label="联系电话" rules={[{ required: true, message: '请输入' }]}><Input size="large" prefix={<PhoneOutlined />} placeholder="请输入联系电话" /></Form.Item>
    </>);
    if (selectedRole === 'enterprise') return enterpriseFields;
    if (selectedRole === 'provider') {
      return (<>{enterpriseFields}
        <Form.Item name="serviceTypes" label="服务类型" rules={[{ required: true, message: '请选择' }]}><Select size="large" mode="multiple" placeholder="请选择服务类型（可多选）" options={SERVICE_TYPES} /></Form.Item>
        <Form.Item name="serviceArea" label="服务区域" rules={[{ required: true, message: '请输入' }]}><Input size="large" prefix={<EnvironmentOutlined />} placeholder="如：XX市全域" /></Form.Item>
      </>);
    }
    if (selectedRole === 'merchant') {
      return (<>{enterpriseFields}
        <Form.Item name="productCategories" label="经营品类" rules={[{ required: true, message: '请选择' }]}><Select size="large" mode="multiple" placeholder="请选择经营品类（可多选）" options={PRODUCT_CATEGORIES} /></Form.Item>
      </>);
    }
    if (selectedRole === 'government') {
      return (<>
        <Form.Item name="deptName" label="部门名称" rules={[{ required: true, message: '请输入' }]}><Input size="large" placeholder="请输入政府部门全称" /></Form.Item>
        <Form.Item name="deptCode" label="机构代码" rules={[{ required: true, message: '请输入' }]}><Input size="large" placeholder="请输入统一机构代码" /></Form.Item>
        <Form.Item name="contactName" label="联系人" rules={[{ required: true, message: '请输入' }]}><Input size="large" prefix={<UserOutlined />} placeholder="请输入联系人姓名" /></Form.Item>
        <Form.Item name="contactPhone" label="联系电话" rules={[{ required: true, message: '请输入' }]}><Input size="large" prefix={<PhoneOutlined />} placeholder="请输入联系电话" /></Form.Item>
      </>);
    }
    return null;
  };

  var currentRole = myRoles.find(function (r) { return r.isCurrent; });

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
          { title: '角色管理' }
        ]} style={{ marginBottom: 24 }} />

        <Row gutter={24}>
          <Col xs={24} md={6}>
            <Card style={{ borderRadius: 12, marginBottom: 24 }}>
              <div style={{ textAlign: 'center', marginBottom: 16 }}>
                <Avatar size={80} icon={<UserOutlined />} style={{ backgroundColor: currentRole ? currentRole.color : '#bfbfbf', marginBottom: 12 }} />
                <div style={{ fontSize: 18, fontWeight: 600, color: '#1f1f1f' }}>张明</div>
                {currentRole && <Tag color={currentRole.color} style={{ marginTop: 8 }}>{currentRole.label}</Tag>}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                {MENU_ITEMS.map(function (item) {
                  return (
                    <div key={item.key}>
                      {item.group ? <div style={{ fontSize: 11, color: '#bfbfbf', padding: '8px 16px 4px', fontWeight: 600, letterSpacing: 1 }}>{item.group}</div> : null}
                      <div
                        onClick={function () { if (item.key !== 'role-management') handleNavigate(item.key); }}
                        style={{
                          padding: '10px 16px', borderRadius: 8, cursor: 'pointer',
                          background: item.key === 'role-management' ? '#fff0f6' : 'transparent',
                          color: item.key === 'role-management' ? '#eb2f96' : '#595959',
                          fontWeight: item.key === 'role-management' ? 600 : 400,
                          fontSize: 14, marginBottom: 4
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
            {/* 认证信息 */}
            <Card title="认证信息" style={{ borderRadius: 12, marginBottom: 24 }}>
              <Descriptions column={2} bordered>
                <Descriptions.Item label="认证状态"><Tag color="green">已认证</Tag></Descriptions.Item>
                <Descriptions.Item label="当前激活角色"><Tag color="#52c41a">飞手</Tag></Descriptions.Item>
                <Descriptions.Item label="首次认证时间">2026-03-15</Descriptions.Item>
                <Descriptions.Item label="主认证编号">CERT-2026-0315-001</Descriptions.Item>
              </Descriptions>
            </Card>

            <Card style={{ borderRadius: 12, marginBottom: 24 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                <div>
                  <h2 style={{ fontSize: 18, fontWeight: 600, margin: 0 }}>我的角色</h2>
                  <div style={{ fontSize: 13, color: '#8c8c8c', marginTop: 4 }}>管理您已认证的角色，可切换当前使用角色或认证新角色</div>
                </div>
                {availableRoles.length > 0 && (
                  <Button type="primary" icon={<PlusOutlined />} onClick={function () { setAddOpen(true); setCertStep(0); setSelectedRole(''); }}>
                    认证新角色
                  </Button>
                )}
              </div>

              {/* 统计概览 */}
              <div style={{ display: 'flex', gap: 16, marginBottom: 20 }}>
                <div style={{ padding: '12px 20px', background: '#f6ffed', borderRadius: 8, textAlign: 'center', flex: 1 }}>
                  <div style={{ fontSize: 20, fontWeight: 700, color: '#52c41a' }}>{myRoles.filter(function (r) { return r.status === 'certified'; }).length}</div>
                  <div style={{ fontSize: 12, color: '#8c8c8c' }}>已认证</div>
                </div>
                <div style={{ padding: '12px 20px', background: '#e6f4ff', borderRadius: 8, textAlign: 'center', flex: 1 }}>
                  <div style={{ fontSize: 20, fontWeight: 700, color: '#1677ff' }}>{myRoles.filter(function (r) { return r.status === 'pending'; }).length}</div>
                  <div style={{ fontSize: 12, color: '#8c8c8c' }}>审核中</div>
                </div>
                <div style={{ padding: '12px 20px', background: '#f9f0ff', borderRadius: 8, textAlign: 'center', flex: 1 }}>
                  <div style={{ fontSize: 20, fontWeight: 700, color: '#722ed1' }}>{availableRoles.length}</div>
                  <div style={{ fontSize: 12, color: '#8c8c8c' }}>可认证</div>
                </div>
              </div>

              {myRoles.length === 0 ? (
                <Empty description="暂无已认证角色" style={{ padding: '40px 0' }} />
              ) : (
                <div>
                  {myRoles.map(function (role) {
                    return (
                      <Card
                        key={role.value}
                        style={{
                          borderRadius: 10, marginBottom: 12,
                          border: role.isCurrent ? '2px solid ' + role.color : '1px solid #f0f0f0',
                          background: role.isCurrent ? role.color + '08' : '#fff'
                        }}
                        styles={{ body: { padding: '20px 24px' } }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                            <Avatar size={48} style={{ background: role.color, fontSize: 22 }} icon={role.icon} />
                            <div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                                <span style={{ fontSize: 16, fontWeight: 600, color: 'rgba(0,0,0,0.88)' }}>{role.label}</span>
                                {getStatusTag(role.status)}
                                {role.isCurrent && <Tag color={role.color}>当前角色</Tag>}
                              </div>
                              <div style={{ fontSize: 13, color: '#8c8c8c' }}>
                                {ROLES.find(function (r) { return r.value === role.value; })?.desc}
                              </div>
                              {role.certTime && <div style={{ fontSize: 12, color: '#bfbfbf', marginTop: 2 }}>认证时间：{role.certTime}</div>}
                            </div>
                          </div>
                          <div style={{ display: 'flex', gap: 8 }}>
                            {role.status === 'certified' && (
                              <Button size="small" icon={<EyeOutlined />} onClick={function () { handleNavigate('profile-certified'); }}>查看认证</Button>
                            )}
                            {role.status === 'pending' && (
                              <Button size="small" icon={<ClockCircleOutlined />} onClick={function () { handleNavigate('profile-pending'); }}>查看进度</Button>
                            )}
                            {!role.isCurrent && role.status === 'certified' && (
                              <Button type="primary" size="small" icon={<SwapOutlined />} onClick={function () { handleSwitch(role); }}>切换角色</Button>
                            )}
                          </div>
                        </div>
                      </Card>
                    );
                  })}
                </div>
              )}
            </Card>

            {/* 可认证角色说明 */}
            {availableRoles.length > 0 && (
              <Card title="可认证角色" style={{ borderRadius: 12 }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
                  {availableRoles.map(function (role) {
                    return (
                      <div key={role.value} style={{ padding: 16, background: '#fafafa', borderRadius: 10, cursor: 'pointer', transition: 'all 0.2s', border: '1px solid #f0f0f0' }}
                        onClick={function () { setSelectedRole(role.value); setAddOpen(true); setCertStep(0); }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                          <Avatar size={32} style={{ background: role.color }} icon={role.icon} />
                          <span style={{ fontSize: 14, fontWeight: 600 }}>{role.label}</span>
                        </div>
                        <div style={{ fontSize: 12, color: '#8c8c8c', lineHeight: 1.6 }}>{role.desc}</div>
                        <Button type="link" size="small" style={{ padding: 0, marginTop: 8, fontSize: 12 }}>立即认证 →</Button>
                      </div>
                    );
                  })}
                </div>
              </Card>
            )}

            {/* 角色说明 */}
            <Card title="角色说明" style={{ borderRadius: 12, marginTop: 24 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {ROLES.map(function (role) {
                  var isCertified = myRoles.some(function (mr) { return mr.value === role.value && mr.status === 'certified'; });
                  var isPending = myRoles.some(function (mr) { return mr.value === role.value && mr.status === 'pending'; });
                  return (
                    <div key={role.label} style={{ padding: '14px 16px', background: '#fafafa', borderRadius: 8, display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                      <div style={{ color: role.color, fontSize: 22, marginTop: 2, flexShrink: 0 }}>{role.icon}</div>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                          <span style={{ fontSize: 14, fontWeight: 600, color: '#1f1f1f' }}>{role.label}</span>
                          {isCertified && <Tag color="green">已认证</Tag>}
                          {isPending && <Tag color="orange">审核中</Tag>}
                        </div>
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

      {/* 认证新角色弹窗 */}
      <Modal
        title="认证新角色"
        open={addOpen}
        onCancel={function () { setAddOpen(false); setCertStep(0); setSelectedRole(''); certForm.resetFields(); }}
        footer={certStep === 0 ? [
          <Button key="cancel" onClick={function () { setAddOpen(false); setSelectedRole(''); }}>关闭</Button>,
          <Button key="next" type="primary" onClick={handleAddNext}>下一步</Button>
        ] : [
          <Button key="prev" onClick={function () { setCertStep(0); }}>上一步</Button>,
          <Button key="submit" type="primary" onClick={handleCertSubmit}>提交认证</Button>
        ]}
        width={520}
        destroyOnHidden
      >
        {certStep === 0 ? (
          <div>
            <div style={{ marginBottom: 16, fontSize: 14, color: '#595959' }}>请选择要认证的角色类型：</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
              {availableRoles.map(function (role) {
                return (
                  <div
                    key={role.value}
                    onClick={function () { setSelectedRole(role.value); }}
                    style={{
                      padding: '16px', borderRadius: 8,
                      border: selectedRole === role.value ? '2px solid ' + role.color : '1px solid #f0f0f0',
                      background: selectedRole === role.value ? role.color + '08' : '#fff',
                      cursor: 'pointer', transition: 'all 0.2s'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                      <Avatar size={32} style={{ background: role.color }} icon={role.icon} />
                      <span style={{ fontSize: 14, fontWeight: 600 }}>{role.label}</span>
                    </div>
                    <div style={{ fontSize: 12, color: '#8c8c8c', lineHeight: 1.5 }}>{role.desc}</div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16, padding: '12px 16px', background: '#f6ffed', borderRadius: 8 }}>
              <Avatar size={28} style={{ background: ROLES.find(function (r) { return r.value === selectedRole; })?.color }} icon={ROLES.find(function (r) { return r.value === selectedRole; })?.icon} />
              <span style={{ fontWeight: 600 }}>认证角色：{ROLES.find(function (r) { return r.value === selectedRole; })?.label}</span>
            </div>
            <Form form={certForm} layout="vertical">
              {renderCertForm()}
            </Form>
          </div>
        )}
      </Modal>

      {/* 切换角色确认弹窗 */}
      <Modal
        title="切换角色"
        open={switchOpen}
        onCancel={function () { setSwitchOpen(false); setSwitchTarget(null); }}
        onOk={confirmSwitch}
        okText="确认切换"
        width={400}
      >
        {switchTarget && (
          <div style={{ textAlign: 'center', padding: '16px 0' }}>
            <Avatar size={56} style={{ background: switchTarget.color, marginBottom: 12 }} icon={switchTarget.icon} />
            <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>切换至「{switchTarget.label}」</div>
            <div style={{ fontSize: 13, color: '#8c8c8c', lineHeight: 1.6 }}>
              切换角色后，您将以「{switchTarget.label}」身份使用平台功能，<br />相关菜单和权限将随之变化。
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Component;
