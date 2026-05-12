/**
 * @name 忘记密码
 * @mode axure
 * /Users/xu/Desktop/元引信息/Axhub-Make-main/skills/axure-export-workflow/SKILL.md
 *
 */

import './style.css';

import React, { useState, useCallback } from 'react';
import { Input, Button, Form, message, Steps, Result } from 'antd';
import { RocketOutlined, MobileOutlined, LockOutlined, SafetyCertificateOutlined, UserOutlined, ArrowLeftOutlined, CheckCircleOutlined } from '@ant-design/icons';

var FEATURES = [
  { icon: <SafetyCertificateOutlined />, title: '安全可靠', desc: '多重安全认证保障' },
  { icon: <RocketOutlined />, title: '高效便捷', desc: '一站式服务办理' },
  { icon: <UserOutlined />, title: '多角色支持', desc: '满足不同用户需求' }
];

var Component = function ForgotPasswordPage() {
  var [currentStep, setCurrentStep] = useState(0);
  var [phoneForm] = Form.useForm();
  var [resetForm] = Form.useForm();
  var [countdown, setCountdown] = useState(0);

  var handleNavigate = useCallback(function (key: string) {
    window.location.href = '/prototypes/' + key;
  }, []);

  var handleSendCode = useCallback(function () {
    phoneForm.validateFields(['phone']).then(function () {
      message.success('验证码已发送');
      setCountdown(60);
      var timer = setInterval(function () {
        setCountdown(function (prev: number) {
          if (prev <= 1) { clearInterval(timer); return 0; }
          return prev - 1;
        });
      }, 1000);
    }).catch(function () {});
  }, [phoneForm]);

  var handleVerify = useCallback(function () {
    phoneForm.validateFields().then(function () {
      setCurrentStep(1);
    }).catch(function () {});
  }, [phoneForm]);

  var handleReset = useCallback(function () {
    resetForm.validateFields().then(function () {
      setCurrentStep(2);
      message.success('密码重置成功！');
    }).catch(function () {});
  }, [resetForm]);

  return (
    <div style={{ minHeight: '100vh', display: 'flex' }}>
      <div style={{
        flex: '0 0 55%',
        background: 'linear-gradient(135deg, #0c4a6e 0%, #1677ff 60%, #69b1ff 100%)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 48,
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: 0.05, background: 'radial-gradient(circle at 30% 70%, #fff 0%, transparent 50%), radial-gradient(circle at 70% 30%, #fff 0%, transparent 50%)' }} />
        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: 480 }}>
          <RocketOutlined style={{ fontSize: 56, color: '#fff', marginBottom: 24 }} />
          <h1 style={{ fontSize: 36, fontWeight: 700, color: '#fff', marginBottom: 12 }}>区域低空公共服务平台</h1>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.8)', lineHeight: 1.8, marginBottom: 48 }}>
            以便民利企、普惠高效为核心<br />为政府部门、企业、飞手、公众提供全场景低空公共服务
          </p>
          <div style={{ display: 'flex', gap: 32, justifyContent: 'center' }}>
            {FEATURES.map(function (f) {
              return (
                <div key={f.title} style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 28, color: '#fff', marginBottom: 8 }}>{f.icon}</div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: '#fff', marginBottom: 4 }}>{f.title}</div>
                  <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)' }}>{f.desc}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div style={{
        flex: '0 0 45%',
        display: 'flex',
        flexDirection: 'column',
        background: '#fff',
        overflowY: 'auto'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 40px', borderBottom: '1px solid #f0f0f0' }}>
          <a style={{ color: '#8c8c8c', fontSize: 13, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 4 }} onClick={function () { handleNavigate('login'); }}>
            <ArrowLeftOutlined /> 返回登录
          </a>
          <div />
        </div>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '32px 40px' }}>
          <h2 style={{ fontSize: 22, fontWeight: 600, color: '#1f1f1f', marginBottom: 8 }}>忘记密码</h2>
          <p style={{ fontSize: 14, color: '#8c8c8c', marginBottom: 28 }}>通过手机验证码重置您的密码</p>

          <Steps current={currentStep} style={{ marginBottom: 32 }} items={[{ title: '验证手机' }, { title: '重置密码' }, { title: '完成' }]} />

          {currentStep === 0 && (
            <Form form={phoneForm} layout="vertical">
              <Form.Item name="phone" label="手机号" rules={[{ required: true, message: '请输入手机号' }]}>
                <Input size="large" prefix={<MobileOutlined />} placeholder="请输入注册时使用的手机号" />
              </Form.Item>
              <Form.Item name="code" label="验证码" rules={[{ required: true, message: '请输入验证码' }]}>
                <div style={{ display: 'flex', gap: 8 }}>
                  <Input size="large" prefix={<SafetyCertificateOutlined />} placeholder="请输入验证码" style={{ flex: 1 }} />
                  <Button size="large" disabled={countdown > 0} onClick={handleSendCode} style={{ whiteSpace: 'nowrap', minWidth: 110 }}>
                    {countdown > 0 ? countdown + 's' : '获取验证码'}
                  </Button>
                </div>
              </Form.Item>
              <Form.Item style={{ marginTop: 24, marginBottom: 0 }}>
                <Button type="primary" size="large" block onClick={handleVerify} style={{ height: 44, fontSize: 16 }}>
                  下一步
                </Button>
              </Form.Item>
            </Form>
          )}

          {currentStep === 1 && (
            <Form form={resetForm} layout="vertical">
              <Form.Item name="newPassword" label="新密码" rules={[{ required: true, message: '请输入新密码' }, { min: 8, message: '密码至少8位' }]}>
                <Input.Password size="large" prefix={<LockOutlined />} placeholder="请设置新密码（至少8位）" />
              </Form.Item>
              <Form.Item name="confirmPassword" label="确认密码" dependencies={['newPassword']} rules={[{ required: true, message: '请确认密码' }, function (_: any) { return { validator: function (_: any, value: string) { var pwd = resetForm.getFieldValue('newPassword'); if (!value || pwd === value) return Promise.resolve(); return Promise.reject('两次密码不一致'); } }; }]}>
                <Input.Password size="large" prefix={<LockOutlined />} placeholder="请再次输入新密码" />
              </Form.Item>
              <Form.Item style={{ marginTop: 24, marginBottom: 0 }}>
                <Button type="primary" size="large" block onClick={handleReset} style={{ height: 44, fontSize: 16 }}>
                  确认重置
                </Button>
              </Form.Item>
            </Form>
          )}

          {currentStep === 2 && (
            <Result
              status="success"
              icon={<CheckCircleOutlined style={{ color: '#52c41a' }} />}
              title="密码重置成功！"
              subTitle="您的密码已成功重置，请使用新密码登录"
              extra={
                <Button type="primary" size="large" style={{ minWidth: 160 }} onClick={function () { handleNavigate('login'); }}>
                  前往登录
                </Button>
              }
            />
          )}

          <div style={{ marginTop: 'auto' }}>
            <div style={{ textAlign: 'center', padding: '16px 0', color: '#8c8c8c', fontSize: 12 }}>
              区域低空公共服务平台 © 2026
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Component;
