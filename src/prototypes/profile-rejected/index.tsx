/**
 * @name 个人中心（认证失败）
 * @mode axure
 * /Users/xu/Desktop/元引信息/Axhub-Make-main/skills/axure-export-workflow/SKILL.md
 *
 */

import './style.css';

import React, { useState, useCallback } from 'react';
import { Card, Form, Input, Button, Breadcrumb, Avatar, Descriptions, Tag, message, Row, Col, Alert, Steps } from 'antd';
import { UserOutlined, SafetyCertificateOutlined, CloseCircleOutlined, CheckCircleOutlined, RedoOutlined } from '@ant-design/icons';

var MENU_ITEMS = [
  { key: 'profile', label: '个人中心' },
  { key: 'my-aircraft', label: '我的飞行器' },
  { key: 'register-flight-plan', label: '飞行计划' },
  { key: 'my-service', label: '我的服务' },
  { key: 'my-goods', label: '我的订单' }
];

var Component = function ProfileRejectedPage() {
  var [editMode, setEditMode] = useState(false);
  var [form] = Form.useForm();

  var handleNavigate = useCallback(function (key: string) {
    window.location.href = '/prototypes/' + key;
  }, []);

  var handleSave = useCallback(function () {
    form.validateFields().then(function () {
      message.success('保存成功');
      setEditMode(false);
    });
  }, [form]);

  return (
    <div style={{ minHeight: '100vh', background: '#f5f7fa' }}>
      <header style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)', padding: '0 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 56 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <SafetyCertificateOutlined style={{ fontSize: 20, color: '#fff' }} />
            <span style={{ fontSize: 16, fontWeight: 600, color: '#fff' }}>低空公共服务平台</span>
          </div>
          <div style={{ display: 'flex', gap: 24 }}>
            {MENU_ITEMS.map(function (item) {
              return <a key={item.key} style={{ color: item.key === 'profile' ? '#fff' : 'rgba(255,255,255,0.65)', fontWeight: item.key === 'profile' ? 600 : 400, cursor: 'pointer', fontSize: 14 }} onClick={function () { if (item.key !== 'profile') handleNavigate(item.key); }}>{item.label}</a>;
            })}
          </div>
        </div>
      </header>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: 24 }}>
        <Breadcrumb items={[{ title: <span onClick={function () { handleNavigate('home'); }} style={{ cursor: 'pointer' }}>首页</span> }, { title: '个人中心' }]} style={{ marginBottom: 16 }} />

        <div style={{ display: 'flex', gap: 24 }}>
          <Card style={{ borderRadius: 12, width: 240, flexShrink: 0 }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '16px 0' }}>
              <Avatar size={72} icon={<UserOutlined />} style={{ backgroundColor: '#1677ff', marginBottom: 12 }} />
              <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 4 }}>新用户</div>
              <Tag color="red" icon={<CloseCircleOutlined />}>认证失败</Tag>
            </div>
          </Card>

          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 24 }}>
            <Card
              title="基本信息"
              extra={<Button type={editMode ? 'default' : 'primary'} onClick={function () { setEditMode(!editMode); }}>{editMode ? '取消编辑' : '编辑信息'}</Button>}
              style={{ borderRadius: 12 }}
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

            <Card title="认证信息" style={{ borderRadius: 12 }}>
              <Alert
                type="error"
                showIcon
                icon={<CloseCircleOutlined />}
                message="您的认证申请未通过审核"
                description="您可以查看驳回原因，修改认证资料后重新提交申请。"
                style={{ marginBottom: 16 }}
                action={<Button type="primary" danger icon={<RedoOutlined />} onClick={function () { handleNavigate('profile-uncertified'); }}>重新认证</Button>}
              />
              <Descriptions column={2} bordered>
                <Descriptions.Item label="认证状态"><Tag color="red">已驳回</Tag></Descriptions.Item>
                <Descriptions.Item label="认证角色"><Tag color="#52c41a">飞手</Tag></Descriptions.Item>
                <Descriptions.Item label="提交时间">2026-04-29 10:30</Descriptions.Item>
                <Descriptions.Item label="审核时间">2026-04-30 09:15</Descriptions.Item>
                <Descriptions.Item label="认证编号">CERT-2026-0001</Descriptions.Item>
                <Descriptions.Item label="驳回原因" span={2}>
                  <span style={{ color: '#ff4d4f' }}>驾驶证照片不清晰，请重新上传清晰的驾驶证原件照片，确保证件信息完整可辨认。</span>
                </Descriptions.Item>
              </Descriptions>
            </Card>

            <Card title="认证资料" style={{ borderRadius: 12 }}>
              <Descriptions column={2} bordered>
                <Descriptions.Item label="真实姓名">dk20260001</Descriptions.Item>
                <Descriptions.Item label="身份证号">330102199803055678</Descriptions.Item>
                <Descriptions.Item label="驾驶证编号">UAV-P-2024-0088</Descriptions.Item>
                <Descriptions.Item label="驾驶等级">
                  <Tag>多旋翼</Tag><Tag>固定翼</Tag>
                </Descriptions.Item>
              </Descriptions>
            </Card>

            <Card title="认证进度" style={{ borderRadius: 12 }}>
              <Steps
                direction="vertical"
                current={2}
                items={[
                  { title: '提交认证申请', description: '2026-04-29 10:30', status: 'finish', icon: <CheckCircleOutlined /> },
                  { title: '资料审核', description: '2026-04-30 09:15', status: 'finish', icon: <CheckCircleOutlined /> },
                  { title: '审核未通过', description: <><div style={{ color: '#ff4d4f' }}>驾驶证照片不清晰</div><div style={{ color: '#8c8c8c', fontSize: 12 }}>2026-04-30 09:20</div></>, status: 'error', icon: <CloseCircleOutlined /> }
                ]}
                style={{ padding: '8px 0' }}
              />
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Component;
