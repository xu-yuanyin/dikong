/**
 * @name 消息公告管理
 * @mode axure
 */

import './style.css';

import React, { useState, useCallback } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { Card, Table, Tag, Button, Breadcrumb, Space, Modal, Input, Select, message, Tabs, Popconfirm, Form, Row, Col, Descriptions, Avatar } from 'antd';
import { SearchOutlined, PlusOutlined, EyeOutlined, SendOutlined, StopOutlined, NotificationOutlined, MessageOutlined, UserOutlined } from '@ant-design/icons';

var ANNOUNCEMENT_DATA = [
  { key: '1', id: 'ANN-001', title: '关于全平台升级维护的通知', target: 'all', targetLabel: '全部用户', publisher: '超级管理员', publishTime: '2026-05-15 10:00:00', status: 'published', content: '平台将于2026年5月20日凌晨2:00-6:00进行停机维护升级，届时将无法登录，请提前做好业务安排。' },
  { key: '2', id: 'ANN-002', title: '《区域低空飞行服务管理条例》更新', target: 'roles', targetLabel: '指定角色 (飞手, 企业)', publisher: '内容运营', publishTime: '2026-05-10 14:30:00', status: 'published', content: '更新了部分飞行空域的准入细则，详见附件说明。' },
  { key: '3', id: 'ANN-003', title: '【测试】这是一条测试公告', target: 'all', targetLabel: '全部用户', publisher: '实习运营', publishTime: '2026-05-01 09:15:00', status: 'withdrawn', content: '测试内容，请忽略。', withdrawTime: '2026-05-01 09:20:00' }
];

var DIRECT_MSG_DATA = [
  { key: '1', receiver: 'dk_user_001 (13812341111)', content: '您的无人机飞行执照即将于下月底过期，请尽快前往认证管理更新您的资质材料，以免影响后续接单。', sender: '认证审核专员', sendTime: '2026-05-16 16:45:00' },
  { key: '2', receiver: '蓝天农业服务部 (13911113333)', content: '您发布的“大面积农林植保喷洒作业”服务已被系统下架，原因为：缺乏必要的植保无人机飞手操作证，请补充后重新上架。', sender: '系统自动发送', sendTime: '2026-05-15 09:30:00' },
  { key: '3', receiver: '赚大钱传媒工作室 (13711112222)', content: '警告：您发布的需求已被屏蔽，请规范使用平台功能，否则账号将被封禁。', sender: '需求监管专员', sendTime: '2026-04-22 17:05:00' }
];

var TARGET_ROLES = [
  { value: 'personal', label: '个人用户' },
  { value: 'enterprise', label: '企业用户' },
  { value: 'pilot', label: '飞手' },
  { value: 'provider', label: '飞行服务商' },
  { value: 'merchant', label: '商户' },
  { value: 'government', label: '政府部门' }
];

var Component = function AdminMessagePage() {
  var [activeTab, setActiveTab] = useState('announcement');
  var [annPublishOpen, setAnnPublishOpen] = useState(false);
  var [msgSendOpen, setMsgSendOpen] = useState(false);
  var [viewOpen, setViewOpen] = useState(false);
  var [viewType, setViewType] = useState('announcement');
  var [currentRecord, setCurrentRecord] = useState<any>(null);

  var [annForm] = Form.useForm();
  var [msgForm] = Form.useForm();
  
  var [targetType, setTargetType] = useState('all');

  var handleWithdraw = function() {
    message.success('已成功撤回该系统公告');
  };

  var annColumns = [
    { title: '公告标题', dataIndex: 'title', key: 'title', width: 280, render: function(t: string) { return <span style={{ fontWeight: 500 }}>{t}</span>; } },
    { title: '发布受众', dataIndex: 'targetLabel', key: 'targetLabel', width: 160 },
    { title: '发布人', dataIndex: 'publisher', key: 'publisher', width: 120 },
    { title: '发布时间', dataIndex: 'publishTime', key: 'publishTime', width: 160 },
    { title: '状态', dataIndex: 'status', key: 'status', width: 100, render: function(s: string) { return s === 'published' ? <Tag color="green">已发布</Tag> : <Tag color="default">已撤回</Tag>; } },
    { title: '操作', key: 'action', width: 140, render: function(_: any, record: any) {
      return (
        <Space size={8}>
          <Button type="link" size="small" onClick={function() { setViewType('announcement'); setCurrentRecord(record); setViewOpen(true); }}>查看详情</Button>
          {record.status === 'published' && (
            <Popconfirm title="确定要撤回该公告吗？撤回后前台将不再展示。" onConfirm={handleWithdraw}>
              <Button type="link" danger size="small">撤回</Button>
            </Popconfirm>
          )}
        </Space>
      );
    }}
  ];

  var msgColumns = [
    { title: '接收人账号/手机', dataIndex: 'receiver', key: 'receiver', width: 200, render: function(t: string) { return <span style={{ fontWeight: 500, color: '#1677ff' }}>{t}</span>; } },
    { title: '通知内容', dataIndex: 'content', key: 'content', ellipsis: true },
    { title: '发送人', dataIndex: 'sender', key: 'sender', width: 140 },
    { title: '发送时间', dataIndex: 'sendTime', key: 'sendTime', width: 160 },
    { title: '操作', key: 'action', width: 100, render: function(_: any, record: any) {
      return <Button type="link" size="small" onClick={function() { setViewType('message'); setCurrentRecord(record); setViewOpen(true); }}>查看详情</Button>;
    }}
  ];

  return (
    <AdminLayout activeKey="admin-message">
      <div style={{ maxWidth: 1400, margin: '0 auto', padding: 24 }}>
        <Breadcrumb items={[{ title: '系统设置' }, { title: '消息公告管理' }]} style={{ marginBottom: 16 }} />
        
        <Card style={{ borderRadius: 12 }} bodyStyle={{ padding: '0 24px 24px' }}>
          <Tabs activeKey={activeTab} onChange={setActiveTab} size="large" items={[
            {
              key: 'announcement',
              label: <span><NotificationOutlined />系统公告管理</span>,
              children: (
                <div>
                  <div style={{ display: 'flex', gap: 12, marginBottom: 16, marginTop: 16 }}>
                    <Input prefix={<SearchOutlined />} placeholder="搜索公告标题" style={{ width: 260 }} allowClear />
                    <Select placeholder="发布受众" style={{ width: 140 }} options={[{value:'all', label:'全部用户'}, {value:'roles', label:'指定角色'}]} allowClear />
                    <Select placeholder="状态" style={{ width: 120 }} options={[{value:'published', label:'已发布'}, {value:'withdrawn', label:'已撤回'}]} allowClear />
                    <Button type="primary" icon={<SearchOutlined />}>检索</Button>
                    <div style={{ flex: 1 }} />
                    <Button type="primary" icon={<PlusOutlined />} onClick={function() { annForm.resetFields(); setTargetType('all'); setAnnPublishOpen(true); }}>发布系统公告</Button>
                  </div>
                  <Table columns={annColumns} dataSource={ANNOUNCEMENT_DATA} pagination={{ pageSize: 10, total: ANNOUNCEMENT_DATA.length }} />
                </div>
              )
            },
            {
              key: 'message',
              label: <span><MessageOutlined />定向通知下发</span>,
              children: (
                <div>
                  <div style={{ display: 'flex', gap: 12, marginBottom: 16, marginTop: 16 }}>
                    <Input prefix={<SearchOutlined />} placeholder="搜索接收人账号/手机号" style={{ width: 260 }} allowClear />
                    <Button type="primary" icon={<SearchOutlined />}>检索</Button>
                    <div style={{ flex: 1 }} />
                    <Button type="primary" icon={<SendOutlined />} onClick={function() { msgForm.resetFields(); setMsgSendOpen(true); }}>发送定向通知</Button>
                  </div>
                  <Table columns={msgColumns} dataSource={DIRECT_MSG_DATA} pagination={{ pageSize: 10, total: DIRECT_MSG_DATA.length }} />
                </div>
              )
            }
          ]} />
        </Card>
      </div>

      {/* 发布系统公告弹窗 */}
      <Modal title="发布系统公告" open={annPublishOpen} onCancel={function() { setAnnPublishOpen(false); }} width={720} footer={[<Button key="c" onClick={function() { setAnnPublishOpen(false); }}>取消</Button>, <Button key="s" type="primary" onClick={function() { message.success('公告发布成功'); setAnnPublishOpen(false); }}>确认发布</Button>]}>
        <Form form={annForm} layout="vertical" style={{ marginTop: 16 }}>
          <Form.Item name="title" label="公告标题" rules={[{ required: true, message: '请输入公告标题' }]}>
            <Input placeholder="输入精简扼要的公告标题，最长50字" maxLength={50} showCount />
          </Form.Item>
          <Form.Item name="target" label="发送受众范围" rules={[{ required: true }]} initialValue="all">
            <Select 
              options={[{ value: 'all', label: '全部门户用户' }, { value: 'roles', label: '指定前台角色' }]} 
              onChange={function(val) { setTargetType(val); }}
            />
          </Form.Item>
          {targetType === 'roles' && (
            <Form.Item name="targetRoles" label="选择目标角色" rules={[{ required: true, message: '请至少选择一个角色' }]}>
              <Select mode="multiple" placeholder="选择一个或多个目标角色" options={TARGET_ROLES} />
            </Form.Item>
          )}
          <Form.Item name="content" label="公告正文" rules={[{ required: true, message: '请输入正文' }]}>
            <Input.TextArea rows={6} placeholder="请输入完整的公告详情内容..." />
          </Form.Item>
        </Form>
      </Modal>

      {/* 发送定向通知弹窗 */}
      <Modal title="发送定向通知" open={msgSendOpen} onCancel={function() { setMsgSendOpen(false); }} width={600} footer={[<Button key="c" onClick={function() { setMsgSendOpen(false); }}>取消</Button>, <Button key="s" type="primary" onClick={function() { message.success('定向通知已发送'); setMsgSendOpen(false); }}>确认发送</Button>]}>
        <div style={{ marginBottom: 16, color: '#8c8c8c' }}>定向通知将以“系统消息”的形式直接发送至对应用户的个人中心消息列表，并会触发站内未读红点。</div>
        <Form form={msgForm} layout="vertical">
          <Form.Item name="receiver" label="接收人识别号" rules={[{ required: true, message: '请输入' }]}>
            <Input placeholder="请输入精确的用户账号或注册手机号" />
          </Form.Item>
          <Form.Item name="content" label="通知内容" rules={[{ required: true, message: '请输入内容' }]}>
            <Input.TextArea rows={5} placeholder="例如：您的材料存在缺失，请尽快前往更新..." showCount maxLength={200} />
          </Form.Item>
        </Form>
      </Modal>

      {/* 详情弹窗 */}
      <Modal title={viewType === 'announcement' ? '公告详情' : '定向通知详情'} open={viewOpen} onCancel={function() { setViewOpen(false); }} footer={<Button onClick={function() { setViewOpen(false); }}>关闭</Button>} width={640}>
        {currentRecord && (
          <div style={{ marginTop: 16 }}>
            {viewType === 'announcement' ? (
              <>
                <div style={{ fontSize: 20, fontWeight: 600, textAlign: 'center', marginBottom: 16 }}>{currentRecord.title}</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#8c8c8c', borderBottom: '1px solid #f0f0f0', paddingBottom: 16, marginBottom: 16 }}>
                  <span>发布人：{currentRecord.publisher}</span>
                  <span>时间：{currentRecord.publishTime}</span>
                </div>
                <div style={{ marginBottom: 16 }}>
                  <Tag color="blue">受众: {currentRecord.targetLabel}</Tag>
                  <Tag color={currentRecord.status === 'published' ? 'green' : 'default'}>{currentRecord.status === 'published' ? '状态: 已发布' : '状态: 已撤回'}</Tag>
                </div>
                <div style={{ padding: 16, background: '#fafafa', borderRadius: 8, lineHeight: '1.8', minHeight: 120 }}>
                  {currentRecord.content}
                </div>
              </>
            ) : (
              <>
                <Descriptions column={1} bordered size="small" style={{ marginBottom: 16 }}>
                  <Descriptions.Item label="接收人">{currentRecord.receiver}</Descriptions.Item>
                  <Descriptions.Item label="发送人">{currentRecord.sender}</Descriptions.Item>
                  <Descriptions.Item label="发送时间">{currentRecord.sendTime}</Descriptions.Item>
                </Descriptions>
                <div style={{ fontWeight: 600, marginBottom: 8 }}>通知内容正文：</div>
                <div style={{ padding: 16, background: '#f0f5ff', border: '1px solid #d6e4ff', borderRadius: 8, lineHeight: '1.6' }}>
                  {currentRecord.content}
                </div>
              </>
            )}
          </div>
        )}
      </Modal>

    </AdminLayout>
  );
};

export default Component;
