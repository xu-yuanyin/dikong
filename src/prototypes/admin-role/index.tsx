/**
 * @name 角色管理
 * @mode axure
 * /Users/xu/Desktop/元引信息/Axhub-Make-main/skills/axure-export-workflow/SKILL.md
 *
 */

import './style.css';

import React, { useState, useCallback } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { Card, Table, Tag, Button, Breadcrumb, Space, Modal, Form, Input, Select, message, Popconfirm, Tooltip, Descriptions, Tree, Row, Col } from 'antd';
import { SettingOutlined, PlusOutlined, EyeOutlined, EditOutlined, DeleteOutlined, SearchOutlined, SafetyCertificateOutlined } from '@ant-design/icons';

var ROLE_DATA = [
  { key: '1', id: 1, name: '个人用户', code: 'personal', desc: '普通个人用户，浏览资讯、使用基础服务', userCount: 1256, isSystem: true, status: 'normal', createTime: '2026-01-01' },
  { key: '2', id: 2, name: '飞手', code: 'pilot', desc: '持证无人机驾驶员，可申请飞行计划', userCount: 389, isSystem: true, status: 'normal', createTime: '2026-01-01' },
  { key: '3', id: 3, name: '企业用户', code: 'enterprise', desc: '企业主体，进行业务对接与信息管理', userCount: 215, isSystem: true, status: 'normal', createTime: '2026-01-01' },
  { key: '4', id: 4, name: '飞行服务商', code: 'provider', desc: '提供低空飞行相关服务的专业机构', userCount: 68, isSystem: true, status: 'normal', createTime: '2026-01-01' },
  { key: '5', id: 5, name: '商户', code: 'merchant', desc: '入驻低空商城，销售无人机及相关产品', userCount: 142, isSystem: true, status: 'normal', createTime: '2026-01-01' },
  { key: '6', id: 6, name: '政府部门', code: 'government', desc: '政府监管机构，进行低空管理与审批', userCount: 37, isSystem: true, status: 'normal', createTime: '2026-01-01' },
  { key: '7', id: 7, name: '系统管理员', code: 'admin', desc: '系统最高权限，可管理所有模块', userCount: 3, isSystem: true, status: 'normal', createTime: '2026-01-01' },
  { key: '8', id: 8, name: '审核员', code: 'reviewer', desc: '负责审核飞行计划、企业认证等', userCount: 12, isSystem: false, status: 'normal', createTime: '2026-02-15' }
];

var PERMISSION_TREE = [
  { key: 'news', title: '资讯公告', children: [
    { key: 'news-view', title: '查看' }, { key: 'news-edit', title: '编辑' }, { key: 'news-publish', title: '发布' }, { key: 'news-delete', title: '删除' }
  ]},
  { key: 'policy', title: '政策法规', children: [
    { key: 'policy-view', title: '查看' }, { key: 'policy-edit', title: '编辑' }, { key: 'policy-publish', title: '发布' }, { key: 'policy-delete', title: '删除' }
  ]},
  { key: 'service', title: '低空服务', children: [
    { key: 'service-view', title: '查看' }, { key: 'service-audit', title: '审核' }, { key: 'service-manage', title: '管理' }
  ]},
  { key: 'mall', title: '商城管理', children: [
    { key: 'mall-view', title: '查看' }, { key: 'mall-audit', title: '审核' }, { key: 'mall-manage', title: '管理' }
  ]},
  { key: 'flight', title: '飞行审批', children: [
    { key: 'flight-view', title: '查看' }, { key: 'flight-approve', title: '审批' }, { key: 'flight-manage', title: '管理' }
  ]},
  { key: 'emergency', title: '应急管理', children: [
    { key: 'emergency-view', title: '查看' }, { key: 'emergency-publish', title: '发布预警' }, { key: 'emergency-manage', title: '管理' }
  ]},
  { key: 'system', title: '系统设置', children: [
    { key: 'system-user', title: '用户管理' }, { key: 'system-role', title: '角色管理' }, { key: 'system-log', title: '操作日志' }
  ]}
];



var Component = function AdminRolePage() {
  var [addOpen, setAddOpen] = useState(false);
  var [editOpen, setEditOpen] = useState(false);
  var [viewOpen, setViewOpen] = useState(false);
  var [addForm] = Form.useForm();
  var [editForm] = Form.useForm();

  var handleNavigate = useCallback(function (key: string) {
    window.location.href = '/prototypes/' + key;
  }, []);

  var columns = [
    { title: '序号', dataIndex: 'id', key: 'id', width: 60 },
    { title: '角色名称', dataIndex: 'name', key: 'name', width: 130, render: function (t: string, r: any) { return <span style={{ fontWeight: 500 }}>{t}</span>; } },
    { title: '角色标识', dataIndex: 'code', key: 'code', width: 120, render: function (t: string) { return <Tag>{t}</Tag>; } },
    { title: '描述', dataIndex: 'desc', key: 'desc', ellipsis: true },
    { title: '用户数', dataIndex: 'userCount', key: 'userCount', width: 80 },
    { title: '状态', dataIndex: 'status', key: 'status', width: 80, render: function (t: string) { return <Tag color={t === 'normal' ? 'green' : 'red'}>{t === 'normal' ? '正常' : '已禁用'}</Tag>; } },
    { title: '创建时间', dataIndex: 'createTime', key: 'createTime', width: 120 },
    { title: '操作', key: 'action', width: 150, fixed: 'right' as const, render: function (_: any, record: any) {
      return (
        <Space size={4}>
          <Tooltip title="查看"><Button type="text" size="small" icon={<EyeOutlined />} style={{ color: '#1677ff' }} onClick={function () { setViewOpen(true); }} /></Tooltip>
          <Tooltip title="编辑"><Button type="text" size="small" icon={<EditOutlined />} style={{ color: '#fa8c16' }} onClick={function () { editForm.setFieldsValue(record); setEditOpen(true); }} /></Tooltip>
          <Tooltip title="删除"><Popconfirm title="确定删除该角色？" onConfirm={function () { message.success('删除成功'); }}><Button type="text" size="small" icon={<DeleteOutlined />} style={{ color: '#ff4d4f' }} /></Popconfirm></Tooltip>
        </Space>
      );
    }}
  ];

  var permissionBlock = (
    <Form.Item name="permissions" label="权限配置" valuePropName="checkedKeys">
      <Tree checkable defaultExpandAll treeData={PERMISSION_TREE} style={{ maxHeight: 300, overflow: 'auto', border: '1px solid #f0f0f0', borderRadius: 8, padding: 12 }} />
    </Form.Item>
  );

  return (
    <AdminLayout activeKey="admin-role">
      

      <div style={{ maxWidth: 1400, margin: '0 auto', padding: 24 }}>
        <Breadcrumb items={[{ title: '系统设置' }, { title: '角色管理' }]} style={{ marginBottom: 16 }} />
        <Card style={{ borderRadius: 12 }}>
          <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
            <Input prefix={<SearchOutlined />} placeholder="搜索角色名称" style={{ width: 240 }} allowClear />
            <Select placeholder="状态筛选" style={{ width: 120 }} options={[{ value: 'normal', label: '正常' }, { value: 'disabled', label: '已禁用' }]} allowClear />
            <Button type="primary" icon={<SearchOutlined />}>查询</Button>
            <Button>重置</Button>
            <div style={{ flex: 1 }} />
            <Button type="primary" icon={<PlusOutlined />} onClick={function () { addForm.resetFields(); setAddOpen(true); }}>新增角色</Button>
          </div>
          <Table columns={columns} dataSource={ROLE_DATA} pagination={{ pageSize: 10, total: ROLE_DATA.length }} />
        </Card>
      </div>

      <Modal title="新增角色" open={addOpen} onCancel={function () { setAddOpen(false); }} width={720} footer={[<Button key="c" onClick={function () { setAddOpen(false); }}>关闭</Button>, <Button key="p" type="primary" onClick={function () { message.success('角色创建成功'); setAddOpen(false); }}>确定</Button>]}>
        <Form form={addForm} layout="vertical" style={{ marginTop: 16 }}>
          <Row gutter={16}>
            <Col span={12}><Form.Item name="name" label="角色名称" rules={[{ required: true, message: '请输入角色名称' }]}><Input placeholder="请输入角色名称" /></Form.Item></Col>
            <Col span={12}><Form.Item name="code" label="角色标识" rules={[{ required: true, message: '请输入角色标识' }]}><Input placeholder="如：reviewer（英文+下划线）" /></Form.Item></Col>
          </Row>
          <Form.Item name="desc" label="描述"><Input.TextArea rows={2} placeholder="请输入描述" /></Form.Item>
          {permissionBlock}
        </Form>
      </Modal>

      <Modal title="编辑角色" open={editOpen} onCancel={function () { setEditOpen(false); }} width={720} afterOpenChange={function (open: boolean) { if (open) editForm.setFieldsValue(ROLE_DATA[7]); }} footer={[<Button key="c" onClick={function () { setEditOpen(false); }}>关闭</Button>, <Button key="s" type="primary" onClick={function () { message.success('保存成功'); setEditOpen(false); }}>确认</Button>]}>
        <Form form={editForm} layout="vertical" style={{ marginTop: 16 }}>
          <Row gutter={16}>
            <Col span={12}><Form.Item name="name" label="角色名称" rules={[{ required: true, message: '请输入角色名称' }]}><Input placeholder="请输入角色名称" /></Form.Item></Col>
            <Col span={12}><Form.Item name="code" label="角色标识"><Input disabled /></Form.Item></Col>
          </Row>
          <Form.Item name="desc" label="描述"><Input.TextArea rows={2} placeholder="请输入描述" /></Form.Item>
          {permissionBlock}
        </Form>
      </Modal>

      <Modal title="角色详情" open={viewOpen} onCancel={function () { setViewOpen(false); }} width={720} footer={<Button onClick={function () { setViewOpen(false); }}>关闭</Button>}>
        <Descriptions column={2} bordered style={{ marginTop: 16 }}>
          <Descriptions.Item label="角色名称">审核员</Descriptions.Item>
          <Descriptions.Item label="角色标识"><Tag>reviewer</Tag></Descriptions.Item>
          <Descriptions.Item label="用户数">12</Descriptions.Item>
          <Descriptions.Item label="描述" span={2}>负责审核飞行计划、企业认证等</Descriptions.Item>
          <Descriptions.Item label="创建时间">2026-02-15</Descriptions.Item>
          <Descriptions.Item label="状态"><Tag color="green">正常</Tag></Descriptions.Item>
          <Descriptions.Item label="权限列表" span={2}>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              <Tag color="blue">资讯公告-查看</Tag>
              <Tag color="blue">资讯公告-编辑</Tag>
              <Tag color="blue">政策法规-查看</Tag>
              <Tag color="blue">低空服务-审核</Tag>
              <Tag color="blue">飞行审批-审批</Tag>
            </div>
          </Descriptions.Item>
        </Descriptions>
      </Modal>
    </AdminLayout>
  );
};

export default Component;
