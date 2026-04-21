/**
 * @name 后台登录
 * @mode axure
 * @see /skills/axure-export-workflow/SKILL.md
 *
 * 区域低空公共服务管理后台登录页面
 */

import './style.css';
import React, { useState } from 'react';
import { Form, Input, Button, Checkbox, message, Card } from 'antd';
import { UserOutlined, LockOutlined, RocketOutlined } from '@ant-design/icons';

const AdminLogin: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const onFinish = (values: any) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      message.success('登录成功');
      window.location.href = '/prototypes/admin-dashboard';
    }, 1500);
  };

  return (
    <div className="admin-login-container">
      <div className="admin-login-bg">
        <div className="admin-login-bg-pattern"></div>
      </div>
      
      <div className="admin-login-content">
        <div className="admin-login-header">
          <div className="admin-login-logo">
            <RocketOutlined />
          </div>
          <h1 className="admin-login-title">区域低空公共服务</h1>
          <p className="admin-login-subtitle">管理后台</p>
        </div>

        <Card className="admin-login-card">
          <Form
            name="login"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            size="large"
          >
            <Form.Item
              name="username"
              rules={[{ required: true, message: '请输入用户名' }]}
            >
              <Input 
                prefix={<UserOutlined />} 
                placeholder="用户名" 
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ required: true, message: '请输入密码' }]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="密码"
              />
            </Form.Item>

            <Form.Item>
              <div className="admin-login-remember">
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>记住我</Checkbox>
                </Form.Item>
                <a className="admin-login-forgot" href="#">
                  忘记密码？
                </a>
              </div>
            </Form.Item>

            <Form.Item>
              <Button 
                type="primary" 
                htmlType="submit" 
                loading={loading}
                block
              >
                登录
              </Button>
            </Form.Item>
          </Form>

          <div className="admin-login-footer">
            <p>测试账号：admin / 123456</p>
          </div>
        </Card>

        <div className="admin-login-tips">
          <p>© 2024 区域低空公共服务平台 版权所有</p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
