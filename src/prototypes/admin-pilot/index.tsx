/**
 * @name 飞行主体审批（待调整）
 * @mode axure
 * /Users/xu/Desktop/元引信息/Axhub-Make-main/skills/axure-export-workflow/SKILL.md
 *
 */

import './style.css';

import React, { useState, useCallback } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { Card, Table, Tag, Button, Breadcrumb, Space, Modal, Form, Input, Select, message, Popconfirm, Tooltip, Descriptions, Row, Col } from 'antd';
import { SettingOutlined, PlusOutlined, EyeOutlined, EditOutlined, DeleteOutlined, SearchOutlined, CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';



var TABLE_DATA = [
  { key: '1', id: 1, name: 'dk20260001', type: '个人飞手', license: 'AOPA-2024-0888', phone: '13812345678', status: 'pending', applyDate: '2026-04-20', remark: '申请A2类飞行资质' },
  { key: '2', id: 2, name: 'XX测绘工程有限公司', type: '企业', license: 'UAS-ENT-2025-012', phone: '057188888001', status: 'approved', applyDate: '2026-04-18', remark: '测绘资质年审' },
  { key: '3', id: 3, name: 'dk20260006', type: '个人飞手', license: 'AOPA-2025-0156', phone: '13912341234', status: 'approved', applyDate: '2026-04-15', remark: '新办飞行许可' },
  { key: '4', id: 4, name: 'XX航空科技有限公司', type: '企业', license: 'UAS-ENT-2024-008', phone: '057188888002', status: 'rejected', applyDate: '2026-04-10', remark: '资质信息不完整' },
  { key: '5', id: 5, name: 'dk20260008', type: '个人飞手', license: 'AOPA-2026-0032', phone: '13612349876', status: 'pending', applyDate: '2026-04-25', remark: '升级B类飞行资质' }
];

var STATUS_MAP: Record<string, { text: string; color: string }> = {
  pending: { text: '待审批', color: 'orange' },
  approved: { text: '已通过', color: 'green' },
  rejected: { text: '已驳回', color: 'red' }
};

var TYPE_OPTIONS = [
  { value: 'personal', label: '个人飞手' },
  { value: 'enterprise', label: '企业' },
  { value: 'government', label: '政府部门' }
];

var Component = function AdminPilotPage() {
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
    { title: '主体名称', dataIndex: 'name', key: 'name', width: 180, render: function (t: string) { return <span style={{ fontWeight: 500 }}>{t}</span>; } },
    { title: '类型', dataIndex: 'type', key: 'type', width: 100, render: function (t: string) { return <Tag color="blue">{t}</Tag>; } },
    { title: '许可证号', dataIndex: 'license', key: 'license', width: 160 },
    { title: '联系电话', dataIndex: 'phone', key: 'phone', width: 130 },
    { title: '申请日期', dataIndex: 'applyDate', key: 'applyDate', width: 110 },
    { title: '状态', dataIndex: 'status', key: 'status', width: 90, render: function (t: string) { var s = STATUS_MAP[t]; return <Tag color={s.color}>{s.text}</Tag>; } },
    { title: '备注', dataIndex: 'remark', key: 'remark', width: 160, ellipsis: true },
    { title: '操作', key: 'action', width: 200, fixed: 'right' as const, render: function (_: any, record: any) {
      return (
        <Space size={4}>
          <Tooltip title="查看"><Button type="text" size="small" icon={<EyeOutlined />} style={{ color: '#1677ff' }} onClick={function () { setViewOpen(true); }} /></Tooltip>
          <Tooltip title="编辑"><Button type="text" size="small" icon={<EditOutlined />} style={{ color: '#fa8c16' }} onClick={function () { editForm.setFieldsValue(record); setEditOpen(true); }} /></Tooltip>
          {record.status === 'pending' && <Tooltip title="通过"><Button type="text" size="small" icon={<CheckCircleOutlined />} style={{ color: '#52c41a' }} onClick={function () { message.success('审批通过'); }} /></Tooltip>}
          {record.status === 'pending' && <Tooltip title="驳回"><Button type="text" size="small" icon={<CloseCircleOutlined />} style={{ color: '#ff4d4f' }} onClick={function () { message.success('已驳回'); }} /></Tooltip>}
          <Tooltip title="删除"><Popconfirm title="确定删除？" onConfirm={function () { message.success('删除成功'); }}><Button type="text" size="small" icon={<DeleteOutlined />} style={{ color: '#ff4d4f' }} /></Popconfirm></Tooltip>
        </Space>
      );
    }}
  ];

  return (
    <AdminLayout activeKey="admin-pilot">
      

      <div style={{ maxWidth: 1400, margin: '0 auto', padding: 24 }}>
        <Breadcrumb items={[{ title: '飞行审批' }, { title: '飞行主体审批' }]} style={{ marginBottom: 16 }} />
        <Card style={{ borderRadius: 12 }}>
          <div style={{ display: 'flex', gap: 12, marginBottom: 16, flexWrap: 'wrap' }}>
            <Input prefix={<SearchOutlined />} placeholder="搜索名称/许可证号" style={{ width: 240 }} allowClear />
            <Select placeholder="主体类型" style={{ width: 130 }} options={TYPE_OPTIONS} allowClear />
            <Select placeholder="审批状态" style={{ width: 120 }} options={[{ value: 'pending', label: '待审批' }, { value: 'approved', label: '已通过' }, { value: 'rejected', label: '已驳回' }]} allowClear />
            <Button type="primary" icon={<SearchOutlined />}>查询</Button>
            <Button>重置</Button>
            <div style={{ flex: 1 }} />
            <Button type="primary" icon={<PlusOutlined />} onClick={function () { addForm.resetFields(); setAddOpen(true); }}>新增主体</Button>
          </div>
          <Table columns={columns} dataSource={TABLE_DATA} pagination={{ pageSize: 10 }} scroll={{ x: 1200 }} />
        </Card>
      </div>

      <Modal title="新增飞行主体" open={addOpen} onCancel={function () { setAddOpen(false); }} width={640} footer={[<Button key="c" onClick={function () { setAddOpen(false); }}>关闭</Button>, <Button key="p" type="primary" onClick={function () { message.success('新增成功'); setAddOpen(false); }}>确定</Button>]}>
        <Form form={addForm} layout="vertical" style={{ marginTop: 16 }}>
          <Row gutter={16}>
            <Col span={12}><Form.Item name="name" label="主体名称" rules={[{ required: true, message: '请输入' }]}><Input placeholder="请输入主体名称" /></Form.Item></Col>
            <Col span={12}><Form.Item name="type" label="主体类型" rules={[{ required: true, message: '请选择' }]}><Select placeholder="请选择" options={TYPE_OPTIONS} /></Form.Item></Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}><Form.Item name="license" label="许可证号" rules={[{ required: true, message: '请输入' }]}><Input placeholder="如：AOPA-2026-XXXX" /></Form.Item></Col>
            <Col span={12}><Form.Item name="phone" label="联系电话" rules={[{ required: true, message: '请输入' }]}><Input placeholder="请输入联系电话" /></Form.Item></Col>
          </Row>
          <Form.Item name="remark" label="备注"><Input.TextArea rows={3} placeholder="请输入备注信息" /></Form.Item>
        </Form>
      </Modal>

      <Modal title="编辑飞行主体" open={editOpen} onCancel={function () { setEditOpen(false); }} width={640} footer={[<Button key="c" onClick={function () { setEditOpen(false); }}>关闭</Button>, <Button key="s" type="primary" onClick={function () { message.success('保存成功'); setEditOpen(false); }}>确认</Button>]}>
        <Form form={editForm} layout="vertical" style={{ marginTop: 16 }}>
          <Row gutter={16}>
            <Col span={12}><Form.Item name="name" label="主体名称" rules={[{ required: true }]}><Input /></Form.Item></Col>
            <Col span={12}><Form.Item name="type" label="主体类型"><Select options={TYPE_OPTIONS} /></Form.Item></Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}><Form.Item name="license" label="许可证号"><Input /></Form.Item></Col>
            <Col span={12}><Form.Item name="phone" label="联系电话"><Input /></Form.Item></Col>
          </Row>
          <Form.Item name="status" label="审批状态"><Select options={[{ value: 'pending', label: '待审批' }, { value: 'approved', label: '已通过' }, { value: 'rejected', label: '已驳回' }]} /></Form.Item>
          <Form.Item name="remark" label="备注"><Input.TextArea rows={3} /></Form.Item>
        </Form>
      </Modal>

      <Modal title="飞行主体详情" open={viewOpen} onCancel={function () { setViewOpen(false); }} width={640} footer={<Button onClick={function () { setViewOpen(false); }}>关闭</Button>}>
        <Descriptions column={2} bordered style={{ marginTop: 16 }}>
          <Descriptions.Item label="主体名称">dk20260001</Descriptions.Item>
          <Descriptions.Item label="类型"><Tag color="blue">个人飞手</Tag></Descriptions.Item>
          <Descriptions.Item label="许可证号">AOPA-2024-0888</Descriptions.Item>
          <Descriptions.Item label="联系电话">13812345678</Descriptions.Item>
          <Descriptions.Item label="申请日期">2026-04-20</Descriptions.Item>
          <Descriptions.Item label="状态"><Tag color="orange">待审批</Tag></Descriptions.Item>
          <Descriptions.Item label="备注" span={2}>申请A2类飞行资质</Descriptions.Item>
        </Descriptions>
      </Modal>
    </AdminLayout>
  );
};

export default Component;
