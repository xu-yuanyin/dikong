/**
 * @name 个人中心（未认证）
 * @mode axure
 */

import './style.css';

import React, { useState, useCallback } from 'react';
import { Card, Form, Input, Select, Button, Breadcrumb, Avatar, Descriptions, Tag, message, Row, Col, Modal, Alert, Result, Progress, Divider } from 'antd';
import { HomeOutlined, UserOutlined, SafetyCertificateOutlined, ExclamationCircleOutlined, IdcardOutlined, PhoneOutlined, EnvironmentOutlined, RocketOutlined, TeamOutlined, ShopOutlined, CustomerServiceOutlined, BankOutlined, LockOutlined, MailOutlined, MobileOutlined, EditOutlined, KeyOutlined } from '@ant-design/icons';

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

var getPasswordStrength = function (pwd: string) {
  if (!pwd) return { level: 0, text: '', color: '#d9d9d9' };
  var score = 0;
  if (pwd.length >= 8) score++;
  if (/[A-Z]/.test(pwd)) score++;
  if (/[0-9]/.test(pwd)) score++;
  if (/[^A-Za-z0-9]/.test(pwd)) score++;
  if (score <= 1) return { level: 33, text: '弱', color: '#ff4d4f' };
  if (score <= 2) return { level: 66, text: '中', color: '#faad14' };
  return { level: 100, text: '强', color: '#52c41a' };
};

var Component = function ProfileUncertifiedPage() {
  var [editMode, setEditMode] = useState(false);
  var [certOpen, setCertOpen] = useState(false);
  var [certStep, setCertStep] = useState(0);
  var [selectedRole, setSelectedRole] = useState('');
  var [passwordOpen, setPasswordOpen] = useState(false);
  var [passwordLoading, setPasswordLoading] = useState(false);
  var [newPassword, setNewPassword] = useState('');
  var [phoneOpen, setPhoneOpen] = useState(false);
  var [phoneCooldown, setPhoneCooldown] = useState(0);
  var [emailOpen, setEmailOpen] = useState(false);
  var [emailCooldown, setEmailCooldown] = useState(0);
  
  var [form] = Form.useForm();
  var [certForm] = Form.useForm();
  var [pwdForm] = Form.useForm();
  var [phoneForm] = Form.useForm();
  var [emailForm] = Form.useForm();

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

  var passwordStrength = getPasswordStrength(newPassword);

  var handlePasswordSubmit = function () {
    pwdForm.validateFields().then(function (values: any) {
      if (values.newPassword !== values.confirmPassword) {
        message.error('两次输入的新密码不一致！');
        return;
      }
      setPasswordLoading(true);
      setTimeout(function () {
        setPasswordLoading(false);
        setPasswordOpen(false);
        setNewPassword('');
        pwdForm.resetFields();
        message.success('密码修改成功！请使用新密码重新登录。');
      }, 1500);
    }).catch(function () {});
  };

  var startPhoneCooldown = function () {
    setPhoneCooldown(60);
    var timer = setInterval(function () {
      setPhoneCooldown(function (prev: number) {
        if (prev <= 1) { clearInterval(timer); return 0; }
        return prev - 1;
      });
    }, 1000);
    message.success('验证码已发送至您的手机');
  };

  var startEmailCooldown = function () {
    setEmailCooldown(60);
    var timer = setInterval(function () {
      setEmailCooldown(function (prev: number) {
        if (prev <= 1) { clearInterval(timer); return 0; }
        return prev - 1;
      });
    }, 1000);
    message.success('验证码已发送至您的邮箱');
  };

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
              <div style={{ textAlign: 'center', marginBottom: 16 }}>
                <Avatar size={80} icon={<UserOutlined />} style={{ backgroundColor: '#bfbfbf', marginBottom: 12 }} />
                <div style={{ fontSize: 18, fontWeight: 600, color: '#1f1f1f' }}>新用户</div>
                <Tag color="default" style={{ marginTop: 8 }}>未认证</Tag>
                <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 12 }}>
                  <Button size="small" type="link" icon={<EditOutlined />} onClick={function () { setEditMode(true); }}>修改资料</Button>
                  <Button size="small" type="link" icon={<KeyOutlined />} onClick={function () { pwdForm.resetFields(); setNewPassword(''); setPasswordOpen(true); }}>修改密码</Button>
                </div>
              </div>
              <div style={{ marginTop: 16, borderTop: '1px solid #f0f0f0', paddingTop: 16 }}>
                {MENU_ITEMS.map(function (item) {
                  var isActive = item.key === 'profile-certified';
                  return (
                    <div key={item.key}>
                      {item.group ? <div style={{ fontSize: 11, color: '#bfbfbf', padding: '12px 16px 4px', fontWeight: 600, letterSpacing: 1 }}>{item.group}</div> : null}
                      <div
                        onClick={function () {
                          if (item.key !== 'profile-certified') {
                            handleNavigate(item.key);
                          }
                        }}
                        style={{
                          padding: '10px 16px',
                          borderRadius: 8,
                          cursor: 'pointer',
                          background: isActive ? '#fff0f6' : 'transparent',
                          color: isActive ? '#eb2f96' : '#595959',
                          fontWeight: isActive ? 600 : 400,
                          fontSize: 14,
                          marginBottom: 4
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
                <Form form={form} layout="vertical" initialValues={{ name: '新用户', phone: '138****8888', email: '' }}>
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

            {/* 账号安全设置 */}
            <Card title="账号安全设置" style={{ borderRadius: 12, marginBottom: 24 }} extra={<Tag color="green"><LockOutlined /> 安全等级：一般</Tag>}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                {/* 登录密码 */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 0', borderBottom: '1px solid #f0f0f0' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 40, height: 40, borderRadius: 8, background: '#e6f4ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><LockOutlined style={{ fontSize: 18, color: '#1677ff' }} /></div>
                    <div>
                      <div style={{ fontWeight: 500, fontSize: 14 }}>登录密码</div>
                      <div style={{ fontSize: 12, color: '#8c8c8c' }}>已设置。建议定期更换密码以保障账户安全。</div>
                    </div>
                  </div>
                  <Button type="link" onClick={function () { pwdForm.resetFields(); setNewPassword(''); setPasswordOpen(true); }}>修改密码</Button>
                </div>
                {/* 安全手机 */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 0', borderBottom: '1px solid #f0f0f0' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 40, height: 40, borderRadius: 8, background: '#f6ffed', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><MobileOutlined style={{ fontSize: 18, color: '#52c41a' }} /></div>
                    <div>
                      <div style={{ fontWeight: 500, fontSize: 14 }}>绑定手机</div>
                      <div style={{ fontSize: 12, color: '#8c8c8c' }}>已绑定。当前绑定手机：138****8888</div>
                    </div>
                  </div>
                  <Button type="link" onClick={function () { phoneForm.resetFields(); setPhoneCooldown(0); setPhoneOpen(true); }}>更换手机</Button>
                </div>
                {/* 安全邮箱 */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 0' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 40, height: 40, borderRadius: 8, background: '#fff7e6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><MailOutlined style={{ fontSize: 18, color: '#fa8c16' }} /></div>
                    <div>
                      <div style={{ fontWeight: 500, fontSize: 14 }}>安全邮箱</div>
                      <div style={{ fontSize: 12, color: '#8c8c8c' }}>未设置安全邮箱。</div>
                    </div>
                  </div>
                  <Button type="link" onClick={function () { emailForm.resetFields(); setEmailCooldown(0); setEmailOpen(true); }}>绑定邮箱</Button>
                </div>
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

      {/* 修改密码 Modal */}
      <Modal
        title={<span><LockOutlined style={{ marginRight: 8 }} />修改登录密码</span>}
        open={passwordOpen}
        onCancel={function () { setPasswordOpen(false); setNewPassword(''); pwdForm.resetFields(); }}
        onOk={handlePasswordSubmit}
        confirmLoading={passwordLoading}
        okText="确认修改"
        width={480}
      >
        <Form form={pwdForm} layout="vertical" style={{ marginTop: 16 }}>
          <Form.Item name="oldPassword" label="当前密码" rules={[{ required: true, message: '请输入当前密码' }]}>
            <Input.Password size="large" placeholder="请输入当前密码" />
          </Form.Item>
          <Form.Item name="newPassword" label="新密码" rules={[{ required: true, message: '请输入新密码' }, { min: 8, message: '密码长度不少于8位' }]}>
            <Input.Password size="large" placeholder="请输入新密码（至少8位）" onChange={function (e) { setNewPassword(e.target.value); }} />
          </Form.Item>
          {newPassword && (
            <div style={{ marginBottom: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                <span style={{ fontSize: 12, color: '#8c8c8c' }}>密码强度：</span>
                <span style={{ fontSize: 12, fontWeight: 600, color: passwordStrength.color }}>{passwordStrength.text}</span>
              </div>
              <Progress percent={passwordStrength.level} showInfo={false} strokeColor={passwordStrength.color} size="small" />
              <div style={{ fontSize: 11, color: '#bfbfbf', marginTop: 4 }}>建议包含大写字母、数字和特殊字符</div>
            </div>
          )}
          <Form.Item name="confirmPassword" label="确认新密码" rules={[{ required: true, message: '请再次输入新密码' }]}>
            <Input.Password size="large" placeholder="请再次输入新密码" />
          </Form.Item>
        </Form>
      </Modal>

      {/* 更换手机 Modal */}
      <Modal
        title={<span><MobileOutlined style={{ marginRight: 8 }} />更换绑定手机</span>}
        open={phoneOpen}
        onCancel={function () { setPhoneOpen(false); }}
        onOk={function () { phoneForm.validateFields().then(function () { message.success('手机号更换成功！'); setPhoneOpen(false); }).catch(function () {}); }}
        okText="确认更换"
        width={480}
      >
        <Form form={phoneForm} layout="vertical" style={{ marginTop: 16 }}>
          <Form.Item label="当前手机号">
            <Input size="large" value="138****8888" disabled />
          </Form.Item>
          <Form.Item name="newPhone" label="新手机号" rules={[{ required: true, message: '请输入新手机号' }]}>
            <Input size="large" placeholder="请输入新手机号" />
          </Form.Item>
          <Form.Item name="verifyCode" label="验证码" rules={[{ required: true, message: '请输入验证码' }]}>
            <div style={{ display: 'flex', gap: 8 }}>
              <Input size="large" placeholder="请输入短信验证码" style={{ flex: 1 }} />
              <Button size="large" disabled={phoneCooldown > 0} onClick={startPhoneCooldown}>{phoneCooldown > 0 ? phoneCooldown + 's 后重试' : '获取验证码'}</Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>

      {/* 更换邮箱 Modal */}
      <Modal
        title={<span><MailOutlined style={{ marginRight: 8 }} />绑定安全邮箱</span>}
        open={emailOpen}
        onCancel={function () { setEmailOpen(false); }}
        onOk={function () { emailForm.validateFields().then(function () { message.success('安全邮箱绑定成功！'); setEmailOpen(false); }).catch(function () {}); }}
        okText="确认绑定"
        width={480}
      >
        <Form form={emailForm} layout="vertical" style={{ marginTop: 16 }}>
          <Form.Item name="newEmail" label="安全邮箱地址" rules={[{ required: true, message: '请输入安全邮箱' }, { type: 'email', message: '请输入有效的邮箱地址' }]}>
            <Input size="large" placeholder="请输入安全邮箱地址" />
          </Form.Item>
          <Form.Item name="emailCode" label="验证码" rules={[{ required: true, message: '请输入验证码' }]}>
            <div style={{ display: 'flex', gap: 8 }}>
              <Input size="large" placeholder="请输入邮箱验证码" style={{ flex: 1 }} />
              <Button size="large" disabled={emailCooldown > 0} onClick={startEmailCooldown}>{emailCooldown > 0 ? emailCooldown + 's 后重试' : '获取验证码'}</Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Component;
