/**
 * @name 后台角色管理
 * @mode axure
 */

import './style.css';

import React, { useState, useCallback } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { Card, Table, Tag, Button, Breadcrumb, Space, Modal, Form, Input, Select, message, Popconfirm, Tooltip, Descriptions, Tree, Row, Col, Statistic, Divider } from 'antd';
import { PlusOutlined, EyeOutlined, EditOutlined, DeleteOutlined, SearchOutlined, SafetyCertificateOutlined, TeamOutlined, LockOutlined, CheckCircleOutlined, StopOutlined } from '@ant-design/icons';

var PERMISSION_TREE = [
  { key: 'content', title: '内容管理', children: [
    { key: 'content-news', title: '资讯公告管理', children: [
      { key: 'content-news-view', title: '查看' }, { key: 'content-news-add', title: '新增' }, { key: 'content-news-edit', title: '编辑' }, { key: 'content-news-delete', title: '删除' }, { key: 'content-news-publish', title: '发布/下架' }
    ]},
    { key: 'content-policy', title: '政策法规管理', children: [
      { key: 'content-policy-view', title: '查看' }, { key: 'content-policy-add', title: '新增' }, { key: 'content-policy-edit', title: '编辑' }, { key: 'content-policy-delete', title: '删除' }
    ]},
    { key: 'content-standard', title: '规范标准管理', children: [
      { key: 'content-standard-view', title: '查看' }, { key: 'content-standard-add', title: '新增' }, { key: 'content-standard-edit', title: '编辑' }, { key: 'content-standard-delete', title: '删除' }
    ]},
    { key: 'content-carousel', title: '轮播图管理', children: [
      { key: 'content-carousel-view', title: '查看' }, { key: 'content-carousel-edit', title: '编辑' }
    ]}
  ]},
  { key: 'cert', title: '认证审批', children: [
    { key: 'cert-user', title: '门户用户管理', children: [
      { key: 'cert-user-view', title: '查看' }, { key: 'cert-user-ban', title: '封禁/解封' }, { key: 'cert-user-reset', title: '重置密码' }
    ]},
    { key: 'cert-audit', title: '认证审核', children: [
      { key: 'cert-audit-view', title: '查看申请' }, { key: 'cert-audit-approve', title: '通过/驳回' }
    ]}
  ]},
  { key: 'flight', title: '飞行监管', children: [
    { key: 'flight-aircraft', title: '飞行器管理', children: [
      { key: 'flight-aircraft-view', title: '查看' }, { key: 'flight-aircraft-audit', title: '备案审批' }
    ]},
    { key: 'flight-plan', title: '飞行计划管理', children: [
      { key: 'flight-plan-view', title: '查看' }, { key: 'flight-plan-audit', title: '审批' }
    ]},
    { key: 'flight-airspace', title: '空域管理', children: [
      { key: 'flight-airspace-view', title: '查看' }, { key: 'flight-airspace-edit', title: '编辑' }, { key: 'flight-airspace-control', title: '临时管制' }
    ]}
  ]},
  { key: 'business', title: '业务监管', children: [
    { key: 'business-service', title: '服务监管', children: [
      { key: 'business-service-view', title: '查看' }, { key: 'business-service-manage', title: '上下架' }
    ]},
    { key: 'business-mall', title: '商城监管', children: [
      { key: 'business-mall-view', title: '查看' }, { key: 'business-mall-manage', title: '违规处理' }
    ]},
    { key: 'business-demand', title: '需求监管', children: [
      { key: 'business-demand-view', title: '查看' }, { key: 'business-demand-manage', title: '屏蔽处理' }
    ]}
  ]},
  { key: 'system', title: '系统设置', children: [
    { key: 'system-role', title: '角色管理', children: [
      { key: 'system-role-view', title: '查看' }, { key: 'system-role-edit', title: '编辑' }, { key: 'system-role-delete', title: '删除' }
    ]},
    { key: 'system-account', title: '运营账号管理', children: [
      { key: 'system-account-view', title: '查看' }, { key: 'system-account-add', title: '新增' }, { key: 'system-account-edit', title: '编辑' }, { key: 'system-account-ban', title: '禁用/启用' }
    ]},
    { key: 'system-message', title: '消息中心', children: [
      { key: 'system-message-view', title: '查看' }, { key: 'system-message-send', title: '发送通知' }
    ]}
  ]}
];

/* 后台运营角色数据 */
var ROLE_DATA = [
  {
    key: '1', id: 1, name: '超级管理员', code: 'super_admin',
    desc: '拥有系统全部权限，可管理所有后台功能模块、运营账号及角色配置',
    userCount: 2, isSystem: true, status: 'normal', createTime: '2026-01-01',
    permissionKeys: ['content', 'cert', 'flight', 'business', 'system'],
    permissionSummary: '全部权限'
  },
  {
    key: '2', id: 2, name: '内容运营', code: 'content_operator',
    desc: '负责资讯公告、政策法规、规范标准、轮播图等内容的发布与管理',
    userCount: 3, isSystem: true, status: 'normal', createTime: '2026-01-01',
    permissionKeys: ['content-news-view', 'content-news-add', 'content-news-edit', 'content-news-publish', 'content-policy-view', 'content-policy-add', 'content-policy-edit', 'content-standard-view', 'content-standard-add', 'content-standard-edit', 'content-carousel-view', 'content-carousel-edit'],
    permissionSummary: '内容管理（全部）'
  },
  {
    key: '3', id: 3, name: '认证审核专员', code: 'cert_auditor',
    desc: '负责审核门户用户的角色认证申请（个人、飞手、企业、服务商、商户、政府部门），并管理用户账号状态',
    userCount: 5, isSystem: true, status: 'normal', createTime: '2026-01-01',
    permissionKeys: ['cert-user-view', 'cert-user-ban', 'cert-user-reset', 'cert-audit-view', 'cert-audit-approve'],
    permissionSummary: '认证审批（全部）'
  },
  {
    key: '4', id: 4, name: '飞行监管专员', code: 'flight_supervisor',
    desc: '负责飞行器备案审批、飞行计划审批、空域管理及临时管制发布',
    userCount: 4, isSystem: true, status: 'normal', createTime: '2026-01-15',
    permissionKeys: ['flight-aircraft-view', 'flight-aircraft-audit', 'flight-plan-view', 'flight-plan-audit', 'flight-airspace-view', 'flight-airspace-edit', 'flight-airspace-control'],
    permissionSummary: '飞行监管（全部）'
  },
  {
    key: '5', id: 5, name: '商城运营', code: 'mall_operator',
    desc: '负责低空商城和服务集市的日常监管，包括违规商品/服务的处理及需求屏蔽',
    userCount: 3, isSystem: true, status: 'normal', createTime: '2026-02-01',
    permissionKeys: ['business-service-view', 'business-service-manage', 'business-mall-view', 'business-mall-manage', 'business-demand-view', 'business-demand-manage'],
    permissionSummary: '业务监管（全部）'
  },
  {
    key: '6', id: 6, name: '只读审计', code: 'readonly_audit',
    desc: '仅拥有所有模块的查看权限，用于内部审计与合规检查，不可执行任何操作',
    userCount: 1, isSystem: false, status: 'normal', createTime: '2026-03-10',
    permissionKeys: ['content-news-view', 'content-policy-view', 'content-standard-view', 'cert-user-view', 'cert-audit-view', 'flight-aircraft-view', 'flight-plan-view', 'flight-airspace-view', 'business-service-view', 'business-mall-view', 'business-demand-view', 'system-role-view', 'system-account-view'],
    permissionSummary: '全模块只读'
  },
  {
    key: '7', id: 7, name: '实习运营', code: 'intern_operator',
    desc: '实习运营人员，仅有内容查看和基础编辑权限，不可删除或发布',
    userCount: 2, isSystem: false, status: 'disabled', createTime: '2026-04-20',
    permissionKeys: ['content-news-view', 'content-news-edit', 'content-policy-view', 'content-standard-view'],
    permissionSummary: '内容管理（仅查看与编辑）'
  }
];

var Component = function AdminRolePage() {
  var [addOpen, setAddOpen] = useState(false);
  var [editOpen, setEditOpen] = useState(false);
  var [viewOpen, setViewOpen] = useState(false);
  var [currentRecord, setCurrentRecord] = useState<any>(null);
  var [addForm] = Form.useForm();
  var [editForm] = Form.useForm();

  var columns = [
    { title: '序号', dataIndex: 'id', key: 'id', width: 60 },
    { title: '角色名称', dataIndex: 'name', key: 'name', width: 140, render: function (t: string, r: any) {
      return <div><span style={{ fontWeight: 600 }}>{t}</span>{r.isSystem && <Tag color="geekblue" style={{ marginLeft: 6, fontSize: 10 }}>内置</Tag>}</div>;
    }},
    { title: '角色标识', dataIndex: 'code', key: 'code', width: 150, render: function (t: string) { return <Tag>{t}</Tag>; } },
    { title: '描述', dataIndex: 'desc', key: 'desc', ellipsis: true },
    { title: '权限范围', dataIndex: 'permissionSummary', key: 'permissionSummary', width: 180, render: function (t: string) { return <Tag color="blue">{t}</Tag>; } },
    { title: '关联账号', dataIndex: 'userCount', key: 'userCount', width: 90, render: function (t: number) { return <span style={{ color: '#1677ff', fontWeight: 600 }}>{t} 人</span>; } },
    { title: '状态', dataIndex: 'status', key: 'status', width: 80, render: function (t: string) { return t === 'normal' ? <Tag color="green">正常</Tag> : <Tag color="red">已禁用</Tag>; } },
    { title: '创建时间', dataIndex: 'createTime', key: 'createTime', width: 120 },
    { title: '操作', key: 'action', width: 160, fixed: 'right' as const, render: function (_: any, record: any) {
      return (
        <Space size={4}>
          <Tooltip title="查看详情"><Button type="text" size="small" icon={<EyeOutlined />} style={{ color: '#1677ff' }} onClick={function () { setCurrentRecord(record); setViewOpen(true); }} /></Tooltip>
          <Tooltip title="编辑"><Button type="text" size="small" icon={<EditOutlined />} style={{ color: '#fa8c16' }} onClick={function () { setCurrentRecord(record); editForm.setFieldsValue(record); setEditOpen(true); }} /></Tooltip>
          {record.status === 'normal' ? (
            <Tooltip title="禁用"><Popconfirm title="禁用后该角色下所有账号将失去对应权限" onConfirm={function () { message.success('角色已禁用'); }}><Button type="text" size="small" icon={<StopOutlined />} style={{ color: '#ff4d4f' }} /></Popconfirm></Tooltip>
          ) : (
            <Tooltip title="启用"><Popconfirm title="确定启用该角色？" onConfirm={function () { message.success('角色已启用'); }}><Button type="text" size="small" icon={<CheckCircleOutlined />} style={{ color: '#52c41a' }} /></Popconfirm></Tooltip>
          )}
          {!record.isSystem && (
            <Tooltip title="删除"><Popconfirm title="删除角色不可恢复，确定删除？" onConfirm={function () { message.success('删除成功'); }}><Button type="text" size="small" icon={<DeleteOutlined />} style={{ color: '#ff4d4f' }} /></Popconfirm></Tooltip>
          )}
        </Space>
      );
    }}
  ];

  var permissionBlock = (
    <Form.Item name="permissions" label="权限配置" valuePropName="checkedKeys">
      <Tree checkable defaultExpandAll treeData={PERMISSION_TREE} style={{ maxHeight: 360, overflow: 'auto', border: '1px solid #f0f0f0', borderRadius: 8, padding: 12 }} />
    </Form.Item>
  );

  var totalUsers = ROLE_DATA.reduce(function (sum, r) { return sum + r.userCount; }, 0);
  var activeRoles = ROLE_DATA.filter(function (r) { return r.status === 'normal'; }).length;
  var disabledRoles = ROLE_DATA.filter(function (r) { return r.status === 'disabled'; }).length;
  var builtinRoles = ROLE_DATA.filter(function (r) { return r.isSystem; }).length;

  return (
    <AdminLayout activeKey="admin-role">
      <div style={{ maxWidth: 1400, margin: '0 auto', padding: 24 }}>
        <Breadcrumb items={[{ title: '系统设置' }, { title: '后台角色管理' }]} style={{ marginBottom: 16 }} />

        {/* 统计卡片 */}
        <Row gutter={16} style={{ marginBottom: 16 }}>
          <Col span={6}>
            <Card style={{ borderRadius: 12 }}>
              <Statistic title="角色总数" value={ROLE_DATA.length} prefix={<SafetyCertificateOutlined style={{ color: '#1677ff' }} />} styles={{ content: { color: '#1677ff' } }} />
            </Card>
          </Col>
          <Col span={6}>
            <Card style={{ borderRadius: 12 }}>
              <Statistic title="启用中" value={activeRoles} prefix={<CheckCircleOutlined style={{ color: '#52c41a' }} />} styles={{ content: { color: '#52c41a' } }} />
            </Card>
          </Col>
          <Col span={6}>
            <Card style={{ borderRadius: 12 }}>
              <Statistic title="内置角色" value={builtinRoles} prefix={<LockOutlined style={{ color: '#722ed1' }} />} styles={{ content: { color: '#722ed1' } }} />
            </Card>
          </Col>
          <Col span={6}>
            <Card style={{ borderRadius: 12 }}>
              <Statistic title="关联账号总数" value={totalUsers} suffix="人" prefix={<TeamOutlined style={{ color: '#fa8c16' }} />} styles={{ content: { color: '#fa8c16' } }} />
            </Card>
          </Col>
        </Row>

        <Card style={{ borderRadius: 12 }}>
          <div style={{ display: 'flex', gap: 12, marginBottom: 16, flexWrap: 'wrap' }}>
            <Input prefix={<SearchOutlined />} placeholder="搜索角色名称 / 标识" style={{ width: 240 }} allowClear />
            <Select placeholder="状态筛选" style={{ width: 120 }} options={[{ value: 'normal', label: '启用中' }, { value: 'disabled', label: '已禁用' }]} allowClear />
            <Button type="primary" icon={<SearchOutlined />}>查询</Button>
            <Button>重置</Button>
            <div style={{ flex: 1 }} />
            <Button type="primary" icon={<PlusOutlined />} onClick={function () { addForm.resetFields(); setAddOpen(true); }}>新增角色</Button>
          </div>
          <Table columns={columns} dataSource={ROLE_DATA} pagination={{ pageSize: 10, total: ROLE_DATA.length, showTotal: function (total: number) { return '共 ' + total + ' 个角色'; } }} scroll={{ x: 1200 }} />
        </Card>
      </div>

      {/* 新增角色弹窗 */}
      <Modal title="新增角色" open={addOpen} onCancel={function () { setAddOpen(false); }} width={720} footer={[<Button key="c" onClick={function () { setAddOpen(false); }}>取消</Button>, <Button key="p" type="primary" onClick={function () { message.success('角色创建成功'); setAddOpen(false); }}>确认创建</Button>]}>
        <Form form={addForm} layout="vertical" style={{ marginTop: 16 }}>
          <Row gutter={16}>
            <Col span={12}><Form.Item name="name" label="角色名称" rules={[{ required: true, message: '请输入角色名称' }]}><Input placeholder="如：飞行监管专员" /></Form.Item></Col>
            <Col span={12}><Form.Item name="code" label="角色标识" rules={[{ required: true, message: '请输入角色标识' }]}><Input placeholder="如：flight_supervisor（英文+下划线）" /></Form.Item></Col>
          </Row>
          <Form.Item name="desc" label="角色描述"><Input.TextArea rows={2} placeholder="描述该角色的职责范围" /></Form.Item>
          <Divider style={{ margin: '12px 0' }} />
          {permissionBlock}
        </Form>
      </Modal>

      {/* 编辑角色弹窗 */}
      <Modal title="编辑角色" open={editOpen} onCancel={function () { setEditOpen(false); }} width={720} footer={[<Button key="c" onClick={function () { setEditOpen(false); }}>取消</Button>, <Button key="s" type="primary" onClick={function () { message.success('保存成功'); setEditOpen(false); }}>保存修改</Button>]}>
        <Form form={editForm} layout="vertical" style={{ marginTop: 16 }}>
          <Row gutter={16}>
            <Col span={12}><Form.Item name="name" label="角色名称" rules={[{ required: true, message: '请输入角色名称' }]}><Input /></Form.Item></Col>
            <Col span={12}><Form.Item name="code" label="角色标识"><Input disabled /></Form.Item></Col>
          </Row>
          <Form.Item name="desc" label="角色描述"><Input.TextArea rows={2} /></Form.Item>
          <Divider style={{ margin: '12px 0' }} />
          {permissionBlock}
        </Form>
      </Modal>

      {/* 查看角色详情弹窗 */}
      <Modal title="角色详情" open={viewOpen} onCancel={function () { setViewOpen(false); }} width={760} footer={<Button onClick={function () { setViewOpen(false); }}>关闭</Button>}>
        {currentRecord && (
          <div style={{ marginTop: 16 }}>
            <Descriptions column={2} bordered size="small">
              <Descriptions.Item label="角色名称"><span style={{ fontWeight: 600 }}>{currentRecord.name}</span>{currentRecord.isSystem && <Tag color="geekblue" style={{ marginLeft: 6 }}>内置角色</Tag>}</Descriptions.Item>
              <Descriptions.Item label="角色标识"><Tag>{currentRecord.code}</Tag></Descriptions.Item>
              <Descriptions.Item label="关联账号数"><span style={{ color: '#1677ff', fontWeight: 600 }}>{currentRecord.userCount} 人</span></Descriptions.Item>
              <Descriptions.Item label="状态">{currentRecord.status === 'normal' ? <Tag color="green">正常</Tag> : <Tag color="red">已禁用</Tag>}</Descriptions.Item>
              <Descriptions.Item label="创建时间">{currentRecord.createTime}</Descriptions.Item>
              <Descriptions.Item label="权限范围"><Tag color="blue">{currentRecord.permissionSummary}</Tag></Descriptions.Item>
              <Descriptions.Item label="角色描述" span={2}>{currentRecord.desc}</Descriptions.Item>
            </Descriptions>
            <Divider />
            <div style={{ marginBottom: 12 }}>
              <span style={{ fontSize: 14, fontWeight: 600 }}><LockOutlined style={{ marginRight: 6, color: '#722ed1' }} />权限明细</span>
            </div>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {currentRecord.permissionKeys && currentRecord.permissionKeys.map(function (k: string) {
                return <Tag key={k} color="blue" style={{ marginBottom: 4 }}>{k}</Tag>;
              })}
            </div>
          </div>
        )}
      </Modal>
    </AdminLayout>
  );
};

export default Component;
