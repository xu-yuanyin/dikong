/**
 * @name 门户用户管理
 * @mode axure
 * /Users/xu/Desktop/元引信息/Axhub-Make-main/skills/axure-export-workflow/SKILL.md
 *
 */

import './style.css';

import React, { useState, useCallback } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { Card, Table, Tag, Button, Breadcrumb, Space, Modal, Input, Select, message, Popconfirm, Tooltip, Descriptions } from 'antd';
import { SettingOutlined, EyeOutlined, StopOutlined, CheckCircleOutlined, SafetyCertificateOutlined, LockOutlined, SearchOutlined } from '@ant-design/icons';

var ROLES = [
  { value: 'personal', label: '个人用户', color: 'blue' },
  { value: 'pilot', label: '飞手', color: 'green' },
  { value: 'enterprise', label: '企业用户', color: 'purple' },
  { value: 'provider', label: '飞行服务商', color: 'cyan' },
  { value: 'merchant', label: '商户', color: 'orange' },
  { value: 'government', label: '政府部门', color: 'blue' }
];

var CERT_STATUS = [
  { value: 'uncertified', label: '未认证', color: 'default' },
  { value: 'pending', label: '待审核', color: 'orange' },
  { value: 'certified', label: '已认证', color: 'green' }
];

var USER_DATA = [
  { key: '1', id: 1, username: 'dk20260001', phone: '13812341111', role: 'personal', certStatus: 'certified', status: 'normal', regTime: '2026-03-15', lastLogin: '2026-04-22 10:30' },
  { key: '2', id: 2, username: 'dk20260002', phone: '13912342222', role: 'pilot', certStatus: 'certified', status: 'normal', regTime: '2026-03-18', lastLogin: '2026-04-21 16:45' },
  { key: '3', id: 3, username: 'dk20260003', phone: '13712343333', role: 'enterprise', certStatus: 'pending', status: 'normal', regTime: '2026-03-20', lastLogin: '2026-04-22 09:15' },
  { key: '4', id: 4, username: 'dk20260004', phone: '13612344444', role: 'provider', certStatus: 'uncertified', status: 'normal', regTime: '2026-03-22', lastLogin: '2026-04-20 14:20' },
  { key: '5', id: 5, username: 'dk20260005', phone: '13512345555', role: 'merchant', certStatus: 'certified', status: 'normal', regTime: '2026-03-25', lastLogin: '2026-04-22 11:00' },
  { key: '6', id: 6, username: 'dk20260006', phone: '13412346666', role: 'personal', certStatus: 'uncertified', status: 'disabled', regTime: '2026-04-01', lastLogin: '2026-04-15 08:30' }
];



var Component = function AdminUserPage() {
  var [viewOpen, setViewOpen] = useState(false);
  var [currentRecord, setCurrentRecord] = useState<any>(null);

  var handleNavigate = useCallback(function (key: string) {
    window.location.href = '/prototypes/' + key;
  }, []);

  var columns = [
    { title: '序号', dataIndex: 'id', key: 'id', width: 60 },
    { title: '门户账号', dataIndex: 'username', key: 'username', width: 100, render: function (t: string) { return <span style={{ fontWeight: 500 }}>{t}</span>; } },
    { title: '注册手机号', dataIndex: 'phone', key: 'phone', width: 140 },
    { title: '用户类型', dataIndex: 'role', key: 'role', width: 100, render: function (t: string) { var r = ROLES.find(function (item) { return item.value === t; }); return <Tag color={r ? r.color : 'default'}>{r ? r.label : t}</Tag>; } },
    { title: '实名认证', dataIndex: 'certStatus', key: 'certStatus', width: 100, render: function (t: string) { var c = CERT_STATUS.find(function (item) { return item.value === t; }); return <Tag color={c ? c.color : 'default'}>{c ? c.label : t}</Tag>; } },
    { title: '账号状态', dataIndex: 'status', key: 'status', width: 100, render: function (t: string) { return t === 'normal' ? <Tag color="green">正常</Tag> : <Tag color="red">已禁用</Tag>; } },
    { title: '注册时间', dataIndex: 'regTime', key: 'regTime', width: 120 },
    { title: '操作', key: 'action', width: 220, fixed: 'right' as const, render: function (_: any, record: any) {
      return (
        <Space size={4}>
          <Tooltip title="查看与审核"><Button type="text" size="small" icon={<EyeOutlined />} style={{ color: '#1677ff' }} onClick={function () { setCurrentRecord(record); setViewOpen(true); }} /></Tooltip>
          {record.certStatus !== 'uncertified' && <Tooltip title="认证资料"><Button type="text" size="small" icon={<SafetyCertificateOutlined />} style={{ color: '#13c2c2' }} onClick={function () { handleNavigate('admin-cert'); }} /></Tooltip>}
          {record.status === 'normal' ? (
            <Tooltip title="封禁账号"><Popconfirm title="确定禁用该用户？" onConfirm={function () { message.success('已禁用'); }}><Button type="text" size="small" icon={<StopOutlined />} style={{ color: '#ff4d4f' }} /></Popconfirm></Tooltip>
          ) : (
            <Tooltip title="解封账号"><Popconfirm title="确定解封该用户？" onConfirm={function () { message.success('已解封'); }}><Button type="text" size="small" icon={<CheckCircleOutlined />} style={{ color: '#52c41a' }} /></Popconfirm></Tooltip>
          )}
          <Tooltip title="重置密码"><Popconfirm title="确定协助重置该用户的密码？" onConfirm={function () { message.success('已重置'); }}><Button type="text" size="small" icon={<LockOutlined />} style={{ color: '#fa8c16' }} /></Popconfirm></Tooltip>
        </Space>
      );
    }}
  ];

  return (
    <AdminLayout activeKey="admin-user">
      

      <div style={{ maxWidth: 1400, margin: '0 auto', padding: 24 }}>
        <Breadcrumb items={[{ title: '系统设置' }, { title: '前台门户用户管理' }]} style={{ marginBottom: 16 }} />
        <Card style={{ borderRadius: 12 }}>
          <div style={{ display: 'flex', gap: 12, marginBottom: 16, flexWrap: 'wrap' }}>
            <Input prefix={<SearchOutlined />} placeholder="搜索用户手机号" style={{ width: 220 }} allowClear />
            <Select placeholder="角色筛选" style={{ width: 140 }} options={ROLES} allowClear />
            <Select placeholder="认证状态" style={{ width: 140 }} options={CERT_STATUS} allowClear />
            <Select placeholder="账号状态" style={{ width: 120 }} options={[{ value: 'normal', label: '正常' }, { value: 'disabled', label: '已禁用' }]} allowClear />
            <Button type="primary" icon={<SearchOutlined />}>检索</Button>
            <Button>重置</Button>
          </div>
          <Table columns={columns} dataSource={USER_DATA} pagination={{ pageSize: 10, total: USER_DATA.length }} />
        </Card>
      </div>

      <Modal title="查看用户详情" open={viewOpen} onCancel={function () { setViewOpen(false); }} width={720} footer={<Button onClick={function () { setViewOpen(false); }}>关闭</Button>}>
        {currentRecord && (
          <Descriptions column={2} bordered style={{ marginTop: 16 }}>
            <Descriptions.Item label="门户账号">{currentRecord.username}</Descriptions.Item>
            <Descriptions.Item label="注册手机号">{currentRecord.phone}</Descriptions.Item>
            <Descriptions.Item label="用户类型"><Tag color="blue">{ROLES.find(function(r) { return r.value === currentRecord.role })?.label}</Tag></Descriptions.Item>
            <Descriptions.Item label="认证状态"><Tag color={CERT_STATUS.find(function(c) { return c.value === currentRecord.certStatus })?.color}>{CERT_STATUS.find(function(c) { return c.value === currentRecord.certStatus })?.label}</Tag></Descriptions.Item>
            <Descriptions.Item label="账号状态">{currentRecord.status === 'normal' ? <Tag color="green">正常</Tag> : <Tag color="red">已禁用</Tag>}</Descriptions.Item>
            <Descriptions.Item label="注册时间">{currentRecord.regTime}</Descriptions.Item>
            <Descriptions.Item label="最后登录">{currentRecord.lastLogin}</Descriptions.Item>
          </Descriptions>
        )}
      </Modal>
    </AdminLayout>
  );
};

export default Component;
