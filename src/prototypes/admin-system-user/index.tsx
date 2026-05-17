/**
 * @name 后台系统用户管理
 * @mode axure
 */

import React, { useState, useCallback } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { Card, Table, Tag, Button, Breadcrumb, Space, Modal, Form, Input, Select, message, Popconfirm, Tooltip, Row, Col, Descriptions, Avatar, Divider } from 'antd';
import { SettingOutlined, PlusOutlined, EditOutlined, StopOutlined, CheckCircleOutlined, LockOutlined, SearchOutlined, UserOutlined, PhoneOutlined, KeyOutlined, EyeOutlined, SafetyCertificateOutlined } from '@ant-design/icons';

var SYSTEM_ROLES = [
  { value: 'super_admin', label: '超级管理员', color: 'red' },
  { value: 'content_operator', label: '内容运营', color: 'blue' },
  { value: 'cert_auditor', label: '认证审核专员', color: 'green' },
  { value: 'flight_supervisor', label: '飞行监管专员', color: 'cyan' },
  { value: 'mall_operator', label: '商城运营', color: 'orange' },
  { value: 'readonly_audit', label: '只读审计', color: 'purple' },
  { value: 'intern_operator', label: '实习运营', color: 'default' }
];



var SYSTEM_USER_DATA = [
  { key: '1', id: 1001, username: 'admin', realName: '王建国', phone: '13800000001', role: 'super_admin', status: 'normal', createTime: '2026-01-01', lastLogin: '2026-05-17 08:00:00' },
  { key: '2', id: 1002, username: 'op_zhang', realName: '张芳', phone: '13800000002', role: 'content_operator', status: 'normal', createTime: '2026-03-10', lastLogin: '2026-05-16 17:30:22' },
  { key: '3', id: 1003, username: 'audit_li', realName: '李伟', phone: '13800000003', role: 'cert_auditor', status: 'normal', createTime: '2026-03-15', lastLogin: '2026-05-17 09:12:45' },
  { key: '4', id: 1004, username: 'flight_wang', realName: '王磊', phone: '13800000004', role: 'flight_supervisor', status: 'normal', createTime: '2026-03-20', lastLogin: '2026-05-17 10:05:11' },
  { key: '5', id: 1005, username: 'mall_zhao', realName: '赵刚', phone: '13800000005', role: 'mall_operator', status: 'normal', createTime: '2026-04-05', lastLogin: '2026-05-15 14:22:00' },
  { key: '6', id: 1006, username: 'sec_chen', realName: '陈静', phone: '13800000006', role: 'readonly_audit', status: 'normal', createTime: '2026-04-10', lastLogin: '2026-05-01 11:11:11' },
  { key: '7', id: 1007, username: 'intern_liu', realName: '刘洋', phone: '13800000007', role: 'intern_operator', status: 'disabled', createTime: '2026-04-25', lastLogin: '2026-04-28 18:00:00', remark: '实习期满离职' }
];

var Component = function AdminSystemUserPage() {
  var [addOpen, setAddOpen] = useState(false);
  var [editOpen, setEditOpen] = useState(false);
  var [viewOpen, setViewOpen] = useState(false);
  var [resetOpen, setResetOpen] = useState(false);
  var [currentRecord, setCurrentRecord] = useState<any>(null);
  
  var [addForm] = Form.useForm();
  var [editForm] = Form.useForm();

  var columns = [
    { title: '用户ID', dataIndex: 'id', key: 'id', width: 80 },
    { title: '登录账号', dataIndex: 'username', key: 'username', width: 120, render: function (t: string) { return <span style={{ fontWeight: 600 }}>{t}</span>; } },
    { title: '姓名', dataIndex: 'realName', key: 'realName', width: 100 },
    { title: '联系电话', dataIndex: 'phone', key: 'phone', width: 140 },

    { title: '系统角色', dataIndex: 'role', key: 'role', width: 140, render: function (t: string) { var r = SYSTEM_ROLES.find(function (item) { return item.value === t; }); return <Tag color={r ? r.color : 'default'}>{r ? r.label : t}</Tag>; } },
    { title: '状态', dataIndex: 'status', key: 'status', width: 80, render: function (t: string) { return t === 'normal' ? <Tag color="green">正常</Tag> : <Tag color="red">已禁用</Tag>; } },
    { title: '创建时间', dataIndex: 'createTime', key: 'createTime', width: 120 },
    { title: '操作', key: 'action', width: 180, fixed: 'right' as const, render: function (_: any, record: any) {
      return (
        <Space size={4}>
          <Tooltip title="查看详情"><Button type="text" size="small" icon={<EyeOutlined />} style={{ color: '#1677ff' }} onClick={function () { setCurrentRecord(record); setViewOpen(true); }} /></Tooltip>
          <Tooltip title="编辑信息"><Button type="text" size="small" icon={<EditOutlined />} style={{ color: '#fa8c16' }} onClick={function () { setCurrentRecord(record); editForm.setFieldsValue(record); setEditOpen(true); }} /></Tooltip>
          {record.status === 'normal' ? (
            <Tooltip title="禁用账号"><Popconfirm title="确定禁用该员工账号吗？" onConfirm={function () { message.success('账号已禁用'); }}><Button type="text" size="small" icon={<StopOutlined />} style={{ color: '#ff4d4f' }} /></Popconfirm></Tooltip>
          ) : (
            <Tooltip title="启用账号"><Popconfirm title="确定启用该员工账号吗？" onConfirm={function () { message.success('账号已启用'); }}><Button type="text" size="small" icon={<CheckCircleOutlined />} style={{ color: '#52c41a' }} /></Popconfirm></Tooltip>
          )}
          <Tooltip title="重置密码"><Button type="text" size="small" icon={<LockOutlined />} style={{ color: '#722ed1' }} onClick={function () { setCurrentRecord(record); setResetOpen(true); }} /></Tooltip>
        </Space>
      );
    }}
  ];

  return (
    <AdminLayout activeKey="admin-system-user">
      <div style={{ maxWidth: 1400, margin: '0 auto', padding: 24 }}>
        <Breadcrumb items={[{ title: '系统设置' }, { title: '后台系统用户管理' }]} style={{ marginBottom: 16 }} />
        
        <Card style={{ borderRadius: 12 }}>
          <div style={{ display: 'flex', gap: 12, marginBottom: 16, flexWrap: 'wrap' }}>
            <Input prefix={<SearchOutlined />} placeholder="搜索账号/姓名/用户ID" style={{ width: 220 }} allowClear />

            <Select placeholder="系统角色" style={{ width: 140 }} options={SYSTEM_ROLES} allowClear />
            <Select placeholder="账号状态" style={{ width: 120 }} options={[{ value: 'normal', label: '正常' }, { value: 'disabled', label: '已禁用' }]} allowClear />
            <Button type="primary" icon={<SearchOutlined />}>检索</Button>
            <Button>重置</Button>
            <div style={{ flex: 1 }} />
            <Button type="primary" icon={<PlusOutlined />} onClick={function () { addForm.resetFields(); setAddOpen(true); }}>新增运营账号</Button>
          </div>
          <Table columns={columns} dataSource={SYSTEM_USER_DATA} pagination={{ pageSize: 10, total: SYSTEM_USER_DATA.length, showTotal: function(t) { return '共 ' + t + ' 名运营人员'; } }} scroll={{ x: 1000 }} />
        </Card>
      </div>

      {/* 新增账号弹窗 */}
      <Modal title="新增运营账号" open={addOpen} onCancel={function () { setAddOpen(false); }} width={720} footer={[<Button key="c" onClick={function () { setAddOpen(false); }}>取消</Button>, <Button key="p" type="primary" onClick={function () { message.success('运营账号创建成功'); setAddOpen(false); }}>确认创建</Button>]}>
        <Form form={addForm} layout="vertical" style={{ marginTop: 16 }}>
          <Row gutter={16}>
            <Col span={12}><Form.Item name="username" label="登录账号" rules={[{ required: true, message: '请输入' }]}><Input prefix={<UserOutlined />} placeholder="限字母、数字和下划线" /></Form.Item></Col>
            <Col span={12}><Form.Item name="password" label="初始密码" rules={[{ required: true, message: '请输入' }]}><Input.Password prefix={<KeyOutlined />} placeholder="请设置初始密码" /></Form.Item></Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}><Form.Item name="realName" label="姓名" rules={[{ required: true, message: '请输入' }]}><Input placeholder="员工真实姓名" /></Form.Item></Col>
            <Col span={12}><Form.Item name="phone" label="联系电话" rules={[{ required: true, message: '请输入' }]}><Input prefix={<PhoneOutlined />} placeholder="手机号" /></Form.Item></Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}><Form.Item name="role" label="系统角色" rules={[{ required: true, message: '请选择' }]}><Select options={SYSTEM_ROLES} placeholder="分配后台权限角色" /></Form.Item></Col>
          </Row>
          <Form.Item name="remark" label="备注说明"><Input.TextArea rows={2} placeholder="选填" /></Form.Item>
        </Form>
      </Modal>

      {/* 编辑账号弹窗 */}
      <Modal title="编辑账号信息" open={editOpen} onCancel={function () { setEditOpen(false); }} width={720} footer={[<Button key="c" onClick={function () { setEditOpen(false); }}>取消</Button>, <Button key="s" type="primary" onClick={function () { message.success('保存成功'); setEditOpen(false); }}>保存修改</Button>]}>
        <Form form={editForm} layout="vertical" style={{ marginTop: 16 }}>
          <Row gutter={16}>
            <Col span={12}><Form.Item name="username" label="登录账号"><Input disabled /></Form.Item></Col>
            <Col span={12}><Form.Item name="realName" label="姓名" rules={[{ required: true, message: '请输入' }]}><Input /></Form.Item></Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}><Form.Item name="phone" label="联系电话" rules={[{ required: true, message: '请输入' }]}><Input /></Form.Item></Col>
            <Col span={12}><Form.Item name="role" label="系统角色" rules={[{ required: true, message: '请选择' }]}><Select options={SYSTEM_ROLES} /></Form.Item></Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}><Form.Item name="status" label="账号状态"><Select options={[{ value: 'normal', label: '正常' }, { value: 'disabled', label: '禁用' }]} /></Form.Item></Col>
          </Row>
          <Form.Item name="remark" label="备注说明"><Input.TextArea rows={2} /></Form.Item>
        </Form>
      </Modal>

      {/* 查看详情弹窗 */}
      <Modal title="系统账号详情" open={viewOpen} onCancel={function () { setViewOpen(false); }} width={720} footer={<Button onClick={function () { setViewOpen(false); }}>关闭</Button>}>
        {currentRecord && (
          <div style={{ marginTop: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24, padding: '16px', background: '#fafafa', borderRadius: 8, border: '1px solid #f0f0f0' }}>
              <Avatar size={56} style={{ backgroundColor: '#1677ff' }} icon={<UserOutlined />} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 4, display: 'flex', alignItems: 'center', gap: 8 }}>
                  {currentRecord.realName}
                  <Tag color={currentRecord.status === 'normal' ? 'green' : 'red'}>{currentRecord.status === 'normal' ? '正常' : '已禁用'}</Tag>
                </div>
                <div style={{ color: '#8c8c8c', fontSize: 13 }}>
                  <Space size={16} split={<Divider type="vertical" />}>
                    <span>用户ID：{currentRecord.id}</span>
                    <span>账号：{currentRecord.username}</span>
                  </Space>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 12, color: '#8c8c8c', marginBottom: 4 }}>当前系统角色</div>
                <Tag color={SYSTEM_ROLES.find(r => r.value === currentRecord.role)?.color} style={{ margin: 0, padding: '4px 12px', fontSize: 14 }}>
                  <SafetyCertificateOutlined style={{ marginRight: 4 }} />
                  {SYSTEM_ROLES.find(r => r.value === currentRecord.role)?.label}
                </Tag>
              </div>
            </div>

            <Descriptions column={2} bordered size="small">

              <Descriptions.Item label="联系电话">{currentRecord.phone}</Descriptions.Item>
              <Descriptions.Item label="创建时间">{currentRecord.createTime}</Descriptions.Item>
              <Descriptions.Item label="最后登录">{currentRecord.lastLogin}</Descriptions.Item>
              <Descriptions.Item label="备注说明" span={2}>{currentRecord.remark || '无'}</Descriptions.Item>
            </Descriptions>
          </div>
        )}
      </Modal>

      {/* 重置密码弹窗 */}
      <Modal title="重置账号密码" open={resetOpen} onCancel={function () { setResetOpen(false); }} onOk={function() { message.success('重置成功'); setResetOpen(false); }} okText="确认重置">
        {currentRecord && (
          <div style={{ marginTop: 16 }}>
            <p>确定要为 <span style={{ fontWeight: 600 }}>{currentRecord.realName} ({currentRecord.username})</span> 重置密码吗？</p>
            <div style={{ padding: '12px 16px', background: '#f6ffed', border: '1px solid #b7eb8f', borderRadius: 6, marginTop: 12 }}>
              重置后的初始密码为：<span style={{ fontSize: 18, fontWeight: 700, color: '#52c41a', letterSpacing: 1 }}>Admin123456</span>
            </div>
          </div>
        )}
      </Modal>

    </AdminLayout>
  );
};

export default Component;
