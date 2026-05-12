/**
 * @name 登录/注册
 * @mode axure
 * /Users/xu/Desktop/元引信息/Axhub-Make-main/skills/axure-export-workflow/SKILL.md
 *
 */

import './style.css';

import React, { useState, useCallback } from 'react';
import { Input, Button, Tabs, Checkbox, Form, message } from 'antd';
import { RocketOutlined, MobileOutlined, LockOutlined, SafetyCertificateOutlined, UserOutlined, ArrowLeftOutlined, CheckCircleOutlined } from '@ant-design/icons';

var FEATURES = [
  { icon: <SafetyCertificateOutlined />, title: '安全可靠', desc: '多重安全认证保障' },
  { icon: <RocketOutlined />, title: '高效便捷', desc: '一站式服务办理' },
  { icon: <UserOutlined />, title: '多角色支持', desc: '满足不同用户需求' }
];

var Component = function LoginPage() {
  var [activeTab, setActiveTab] = useState('login');
  var [loginForm] = Form.useForm();
  var [regSuccess, setRegSuccess] = useState(false);
  var [regForm] = Form.useForm();
  var [countdown, setCountdown] = useState(0);

  var handleNavigate = useCallback(function (key: string) {
    window.location.href = '/prototypes/' + key;
  }, []);

  var handleLogin = useCallback(function () {
    loginForm.validateFields().then(function () {
      message.success('登录成功！');
      handleNavigate('profile');
    }).catch(function () {});
  }, [loginForm, handleNavigate]);

  var handleSendCode = useCallback(function () {
    regForm.validateFields(['phone']).then(function () {
      message.success('验证码已发送');
      setCountdown(60);
      var timer = setInterval(function () {
        setCountdown(function (prev: number) {
          if (prev <= 1) { clearInterval(timer); return 0; }
          return prev - 1;
        });
      }, 1000);
    }).catch(function () {});
  }, [regForm]);

  var handleRegister = useCallback(function () {
    regForm.validateFields().then(function () {
      setRegSuccess(true);
      message.success('注册成功！');
    }).catch(function () {});
  }, [regForm]);

  var renderRegisterContent = function () {
    if (regSuccess) {
      return (
        <div style={{ textAlign: 'center', padding: '32px 0' }}>
          <CheckCircleOutlined style={{ fontSize: 48, color: '#52c41a', marginBottom: 16 }} />
          <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>注册成功！</h3>
          <p style={{ fontSize: 13, color: '#8c8c8c', marginBottom: 24 }}>您的账号已成功创建，可前往登录</p>
          <Button type="primary" size="large" style={{ minWidth: 160 }} onClick={function () { setActiveTab('login'); setRegSuccess(false); regForm.resetFields(); }}>
            前往登录
          </Button>
        </div>
      );
    }

    return (
      <Form form={regForm} layout="vertical" style={{ marginTop: 8 }}>
        <Form.Item name="phone" label="手机号" rules={[{ required: true, message: '请输入手机号' }]}>
          <Input size="large" prefix={<MobileOutlined />} placeholder="请输入手机号" />
        </Form.Item>
        <Form.Item name="code" label="验证码" rules={[{ required: true, message: '请输入验证码' }]}>
          <div style={{ display: 'flex', gap: 8 }}>
            <Input size="large" prefix={<SafetyCertificateOutlined />} placeholder="请输入验证码" style={{ flex: 1 }} />
            <Button size="large" disabled={countdown > 0} onClick={handleSendCode} style={{ whiteSpace: 'nowrap', minWidth: 110 }}>
              {countdown > 0 ? countdown + 's' : '获取验证码'}
            </Button>
          </div>
        </Form.Item>
        <Form.Item name="password" label="密码" rules={[{ required: true, message: '请输入密码' }, { min: 8, message: '密码至少8位' }]}>
          <Input.Password size="large" prefix={<LockOutlined />} placeholder="请设置密码（至少8位）" />
        </Form.Item>
        <Form.Item name="confirmPassword" label="确认密码" dependencies={['password']} rules={[{ required: true, message: '请确认密码' }, function (_: any) { return { validator: function (_: any, value: string) { var pwd = regForm.getFieldValue('password'); if (!value || pwd === value) return Promise.resolve(); return Promise.reject('两次密码不一致'); } }; }]}>
          <Input.Password size="large" prefix={<LockOutlined />} placeholder="请再次输入密码" />
        </Form.Item>
        <Form.Item style={{ marginBottom: 0, marginTop: 16 }}>
          <Button type="primary" size="large" block onClick={handleRegister} style={{ height: 44, fontSize: 16 }}>
            立即注册
          </Button>
        </Form.Item>
      </Form>
    );
  };

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
          <a style={{ color: '#8c8c8c', fontSize: 13, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 4 }} onClick={function () { handleNavigate('home'); }}>
            <ArrowLeftOutlined /> 返回首页
          </a>
          <div />
        </div>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '24px 40px 32px' }}>
          <Tabs
            activeKey={activeTab}
            onChange={function (key) { setActiveTab(key); if (key === 'register') { setRegSuccess(false); regForm.resetFields(); } }}
            centered
            items={[
              {
                key: 'login',
                label: <span style={{ fontSize: 16, fontWeight: 500 }}>登录</span>,
                children: (
                  <Form form={loginForm} layout="vertical" style={{ marginTop: 16 }}>
                    <Form.Item name="phone" rules={[{ required: true, message: '请输入手机号' }]}>
                      <Input size="large" prefix={<MobileOutlined />} placeholder="请输入手机号/用户名" />
                    </Form.Item>
                    <Form.Item name="password" rules={[{ required: true, message: '请输入密码' }]}>
                      <Input.Password size="large" prefix={<LockOutlined />} placeholder="请输入密码" />
                    </Form.Item>
                    <Form.Item>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Checkbox>记住我</Checkbox>
                        <a style={{ color: '#1677ff', fontSize: 13, cursor: 'pointer' }} onClick={function () { handleNavigate('forgot-password'); }}>忘记密码？</a>
                      </div>
                    </Form.Item>
                    <Form.Item>
                      <Button type="primary" size="large" block onClick={handleLogin} style={{ height: 44, fontSize: 16 }}>
                        登录
                      </Button>
                    </Form.Item>
                  </Form>
                )
              },
              {
                key: 'register',
                label: <span style={{ fontSize: 16, fontWeight: 500 }}>注册</span>,
                children: renderRegisterContent()
              }
            ]}
          />

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
