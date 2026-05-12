/**
 * @name 后台系统用户管理
 * @mode axure
 * /Users/xu/Desktop/元引信息/Axhub-Make-main/skills/axure-export-workflow/SKILL.md
 *
 */


import React, { useState, useCallback } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { Card, Table, Tag, Button, Breadcrumb, Space, Modal, Form, Input, Select, message, Popconfirm, Tooltip, Row, Col } from 'antd';
import { SettingOutlined, PlusOutlined, EditOutlined, StopOutlined, CheckCircleOutlined, LockOutlined, SearchOutlined, UserOutlined, PhoneOutlined, KeyOutlined, ClusterOutlined } from '@ant-design/icons';

var SYSTEM_ROLES = [
  { value: 'super_admin', label: '超级管理员', color: 'red' },
  { value: 'content_operator', label: '内容运营', color: 'blue' },
  { value: 'auditor', label: '审核专员', color: 'green' },
  { value: 'mall_manager', label: '商城管理员', color: 'orange' },
  { value: 'financial', label: '财务管理员', color: 'purple' }
];

var DEPARTMENTS = [
  { value: 'tech', label: '技术部' },
  { value: 'operation', label: '运营部' },
  { value: 'audit', label: '审核中心' },
  { value: 'commerce', label: '商务部' }
];

var SYSTEM_USER_DATA = [
  { key: '1', id: 1001, username: 'admin', realName: '王建国', phone: '13800000001', department: 'tech', role: 'super_admin', status: 'normal', createTime: '2026-01-01' },
  { key: '2', id: 1002, username: 'op_zhang', realName: '张芳', phone: '13800000002', department: 'operation', role: 'content_operator', status: 'normal', createTime: '2026-03-10' },
  { key: '3', id: 1003, username: 'audit_li', realName: '李伟', phone: '13800000003', department: 'audit', role: 'auditor', status: 'normal', createTime: '2026-03-15' },
  { key: '4', id: 1004, username: 'mall_zhao', realName: '赵刚', phone: '13800000004', department: 'commerce', role: 'mall_manager', status: 'disabled', createTime: '2026-04-05' }
];



var Component = function AdminSystemUserPage() {
  var [addOpen, setAddOpen] = useState(false);
  var [editOpen, setEditOpen] = useState(false);
  var [addForm] = Form.useForm();
  var [editForm] = Form.useForm();

  var handleNavigate = useCallback(function (key: string) {
    window.location.href = '/prototypes/' + key;
  }, []);

  var columns = [
    { title: '工号', dataIndex: 'id', key: 'id', width: 80 },
    { title: '账号', dataIndex: 'username', key: 'username', width: 120, render: function (t: string) { return <span style={{ fontWeight: 600 }}>{t}</span>; } },
    { title: '姓名', dataIndex: 'realName', key: 'realName', width: 100 },
    { title: '联系电话', dataIndex: 'phone', key: 'phone', width: 140 },
    { title: '所属部门', dataIndex: 'department', key: 'department', width: 120, render: function (t: string) { var d = DEPARTMENTS.find(function (item) { return item.value === t; }); return d ? d.label : t; } },
    { title: '系统角色', dataIndex: 'role', key: 'role', width: 120, render: function (t: string) { var r = SYSTEM_ROLES.find(function (item) { return item.value === t; }); return <Tag color={r ? r.color : 'default'}>{r ? r.label : t}</Tag>; } },
    { title: '状态', dataIndex: 'status', key: 'status', width: 80, render: function (t: string) { return t === 'normal' ? <Tag color="green">正常</Tag> : <Tag color="red">已禁用</Tag>; } },
    { title: '创建时间', dataIndex: 'createTime', key: 'createTime', width: 120 },
    { title: '操作', key: 'action', width: 160, fixed: 'right' as const, render: function (_: any, record: any) {
      return (
        <Space size={4}>
          <Tooltip title="编辑"><Button type="text" size="small" icon={<EditOutlined />} style={{ color: '#fa8c16' }} onClick={function () { editForm.setFieldsValue(record); setEditOpen(true); }} /></Tooltip>
          {record.status === 'normal' ? (
            <Tooltip title="禁用"><Popconfirm title="确定禁用该员工账号？" onConfirm={function () { message.success('账号已禁用'); }}><Button type="text" size="small" icon={<StopOutlined />} style={{ color: '#ff4d4f' }} /></Popconfirm></Tooltip>
          ) : (
            <Tooltip title="启用"><Popconfirm title="确定启用该员工账号？" onConfirm={function () { message.success('账号已启用'); }}><Button type="text" size="small" icon={<CheckCircleOutlined />} style={{ color: '#52c41a' }} /></Popconfirm></Tooltip>
          )}
          <Tooltip title="重置密码"><Popconfirm title="确定重置密码为 123456？" onConfirm={function () { message.success('密码已重置'); }}><Button type="text" size="small" icon={<LockOutlined />} style={{ color: '#1677ff' }} /></Popconfirm></Tooltip>
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
            <Input prefix={<SearchOutlined />} placeholder="搜索账号/姓名" style={{ width: 220 }} allowClear />
            <Select placeholder="部门筛选" style={{ width: 140 }} options={DEPARTMENTS} allowClear />
            <Select placeholder="系统角色" style={{ width: 140 }} options={SYSTEM_ROLES} allowClear />
            <Button type="primary" icon={<SearchOutlined />}>查询</Button>
            <div style={{ flex: 1 }} />
            <Button type="primary" icon={<PlusOutlined />} onClick={function () { addForm.resetFields(); setAddOpen(true); }}>新增运营账号</Button>
          </div>
          <Table columns={columns} dataSource={SYSTEM_USER_DATA} pagination={{ pageSize: 10, total: SYSTEM_USER_DATA.length }} />
        </Card>
      </div>

      <Modal title="新增运营账号" open={addOpen} onCancel={function () { setAddOpen(false); }} width={720} footer={[<Button key="c" onClick={function () { setAddOpen(false); }}>关闭</Button>, <Button key="p" type="primary" onClick={function () { message.success('运营账号创建成功'); setAddOpen(false); }}>确认创建</Button>]}>
        <Form form={addForm} layout="vertical" style={{ marginTop: 16 }}>
          <Row gutter={16}>
            <Col span={12}><Form.Item name="username" label="登录账号" rules={[{ required: true, message: '请输入' }]}><Input prefix={<UserOutlined />} placeholder="仅限字母和数字" /></Form.Item></Col>
            <Col span={12}><Form.Item name="password" label="初始密码" rules={[{ required: true, message: '请输入' }]}><Input.Password prefix={<KeyOutlined />} placeholder="请设置初始密码" /></Form.Item></Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}><Form.Item name="realName" label="真实姓名" rules={[{ required: true, message: '请输入' }]}><Input placeholder="员工姓名" /></Form.Item></Col>
            <Col span={12}><Form.Item name="phone" label="联系电话" rules={[{ required: true, message: '请输入' }]}><Input prefix={<PhoneOutlined />} placeholder="手机号" /></Form.Item></Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}><Form.Item name="department" label="所属部门" rules={[{ required: true, message: '请选择' }]}><Select options={DEPARTMENTS} placeholder="请选择部门" /></Form.Item></Col>
            <Col span={12}><Form.Item name="role" label="分配角色" rules={[{ required: true, message: '请选择' }]}><Select options={SYSTEM_ROLES} placeholder="分配系统权限角色" /></Form.Item></Col>
          </Row>
          <Form.Item name="remark" label="备注说明"><Input.TextArea rows={2} /></Form.Item>
        </Form>
      </Modal>

      <Modal title="编辑账号信息" open={editOpen} onCancel={function () { setEditOpen(false); }} width={720} footer={[<Button key="c" onClick={function () { setEditOpen(false); }}>关闭</Button>, <Button key="s" type="primary" onClick={function () { message.success('保存成功'); setEditOpen(false); }}>保存</Button>]}>
        <Form form={editForm} layout="vertical" style={{ marginTop: 16 }}>
          <Row gutter={16}>
            <Col span={12}><Form.Item name="username" label="登录账号"><Input disabled /></Form.Item></Col>
            <Col span={12}><Form.Item name="realName" label="真实姓名" rules={[{ required: true, message: '请输入' }]}><Input /></Form.Item></Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}><Form.Item name="phone" label="联系电话" rules={[{ required: true, message: '请输入' }]}><Input /></Form.Item></Col>
            <Col span={12}><Form.Item name="department" label="所属部门" rules={[{ required: true, message: '请选择' }]}><Select options={DEPARTMENTS} /></Form.Item></Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}><Form.Item name="role" label="分配角色" rules={[{ required: true, message: '请选择' }]}><Select options={SYSTEM_ROLES} /></Form.Item></Col>
            <Col span={12}><Form.Item name="status" label="账号状态"><Select options={[{ value: 'normal', label: '正常' }, { value: 'disabled', label: '禁用' }]} /></Form.Item></Col>
          </Row>
        </Form>
      </Modal>
    </AdminLayout>
  );
};

export default Component;
