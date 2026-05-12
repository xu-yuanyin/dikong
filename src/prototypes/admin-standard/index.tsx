/**
 * @name 规范标准管理
 * @mode axure
 * /Users/xu/Desktop/元引信息/Axhub-Make-main/skills/axure-export-workflow/SKILL.md
 *
 */

import './style.css';

import React, { useState, useCallback } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { Card, Table, Tag, Button, Breadcrumb, Space, Modal, Form, Input, Select, Switch, DatePicker, message, Popconfirm, Tooltip, Descriptions, Row, Col, Upload } from 'antd';
import { SettingOutlined, PlusOutlined, EyeOutlined, EditOutlined, DeleteOutlined, SearchOutlined, UploadOutlined, SendOutlined, UndoOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

var TYPE_OPTIONS = [
  { value: 'national', label: '国家标准' },
  { value: 'industry', label: '行业标准' },
  { value: 'local', label: '地方标准' },
  { value: 'tech', label: '技术规范' }
];

var PUBLISH_STATUS_OPTIONS = [{ value: 'published', label: '已发布' }, { value: 'draft', label: '草稿' }];

var VALIDITY_STATUS_MAP: Record<string, { text: string; color: string }> = {
  active: { text: '现行有效', color: 'green' },
  repealed: { text: '已废止', color: 'red' },
  upcoming: { text: '即将实施', color: 'blue' },
  pending: { text: '待生效', color: 'blue' }
};

var VALIDITY_OPTIONS = [{ value: 'active', label: '现行有效' }, { value: 'repealed', label: '已废止' }, { value: 'upcoming', label: '即将实施' }, { value: 'pending', label: '待生效' }];

var TABLE_DATA = [
  { key: '1', id: 1, title: '民用无人驾驶航空器系统身份识别 总体要求', code: 'GB/T 42967-2023', type: 'national', typeLabel: '国家标准', issuer: '国家市场监督管理总局', publishDate: '2023-09-07 09:00', effectDate: '2024-01-01', validity: 'active', publishStatus: 'published', summary: '规定了民用无人驾驶航空器系统身份识别的总体要求', content: '本文件规定了民用无人驾驶航空器系统身份识别的总体要求，包括身份识别编码规则、识别信息内容、识别信号特征等。', isTop: false },
  { key: '2', id: 2, title: '民用无人驾驶航空器系统安全管理要求', code: 'GB/T 42968-2023', type: 'national', typeLabel: '国家标准', issuer: '国家市场监督管理总局', publishDate: '2023-09-07 09:00', effectDate: '2024-01-01', validity: 'active', publishStatus: 'published', summary: '规定了民用无人驾驶航空器系统安全管理的基本要求', content: '本文件规定了民用无人驾驶航空器系统安全管理的基本要求，包括组织管理、人员管理、设备管理、运行管理等。', isTop: false },
  { key: '3', id: 3, title: '无人机航摄安全作业基本要求', code: 'CH/T 3002-2023', type: 'industry', typeLabel: '行业标准', issuer: '自然资源部', publishDate: '2023-06-15 14:00', effectDate: '2023-12-01', validity: 'active', publishStatus: 'published', summary: '规定了无人机航摄安全作业的基本要求', content: '本标准规定了无人机航摄安全作业的基本要求，包括作业条件、飞行准备、飞行实施、数据处理等。', isTop: true },
  { key: '4', id: 4, title: '民用无人驾驶航空器物流配送运行管理规范', code: 'MH/T 4087-2024', type: 'industry', typeLabel: '行业标准', issuer: '中国民用航空局', publishDate: '2024-03-20 10:30', effectDate: '2024-09-01', validity: 'upcoming', publishStatus: 'published', summary: '规定了民用无人驾驶航空器物流配送运行管理规范', content: '本标准规定了民用无人驾驶航空器物流配送运行管理的规范要求，包括运行条件、运行程序、安全管理等。', isTop: false },
  { key: '5', id: 5, title: 'XX市低空飞行服务保障体系建设规范', code: 'DBXX/T 001-2026', type: 'local', typeLabel: '地方标准', issuer: '市交通运输局', publishDate: '2026-01-15 11:00', effectDate: '2026-07-01', validity: 'active', publishStatus: 'published', summary: '规定了XX市低空飞行服务保障体系建设规范', content: '本标准规定了XX市低空飞行服务保障体系建设的规范要求，包括设施建设、人员配置、服务流程等。', isTop: false },
  { key: '6', id: 6, title: '无人机巡检作业技术规范', code: 'T/CAA-001-2025', type: 'tech', typeLabel: '技术规范', issuer: '中国航空运输协会', publishDate: '2025-05-10 15:00', effectDate: '2025-11-01', validity: 'active', publishStatus: 'published', summary: '规定了无人机巡检作业的技术规范', content: '本标准规定了无人机巡检作业的技术规范，包括巡检准备、巡检实施、数据处理、成果提交等。', isTop: false },
  { key: '7', id: 7, title: '低空飞行器起降场建设技术标准', code: 'GB/T 50XXX-2026', type: 'national', typeLabel: '国家标准', issuer: '住房和城乡建设部', publishDate: '', effectDate: '', validity: 'pending', publishStatus: 'draft', summary: '规定低空飞行器起降场建设的技术标准要求', content: '', isTop: false }
];



function renderActionColumn(record: any, viewFn: Function, editFn: Function) {
  var isDraft = record.publishStatus === 'draft';
  return (
    <Space size={4}>
      <Tooltip title="查看">
        <Button type="text" size="small" icon={<EyeOutlined />} style={{ color: '#1677ff' }} onClick={function () { viewFn(record); }} />
      </Tooltip>
      {isDraft ? (
        <>
          <Tooltip title="编辑">
            <Button type="text" size="small" icon={<EditOutlined />} style={{ color: '#fa8c16' }} onClick={function () { editFn(record); }} />
          </Tooltip>
          <Tooltip title="发布">
            <Popconfirm title="确定发布该标准？" icon={<ExclamationCircleOutlined />} onConfirm={function () { message.success('发布成功'); }}>
              <Button type="text" size="small" icon={<SendOutlined />} style={{ color: '#52c41a' }} />
            </Popconfirm>
          </Tooltip>
          <Tooltip title="删除">
            <Popconfirm title="确定删除该标准？" icon={<ExclamationCircleOutlined />} onConfirm={function () { message.success('删除成功'); }}>
              <Button type="text" size="small" icon={<DeleteOutlined />} style={{ color: '#ff4d4f' }} />
            </Popconfirm>
          </Tooltip>
        </>
      ) : (
        <Tooltip title="撤回">
          <Popconfirm title="确定撤回该标准？" icon={<ExclamationCircleOutlined />} onConfirm={function () { message.success('已撤回'); }}>
            <Button type="text" size="small" icon={<UndoOutlined />} style={{ color: '#fa8c16' }} />
          </Popconfirm>
        </Tooltip>
      )}
    </Space>
  );
}

var Component = function AdminStandardPage() {
  var [addOpen, setAddOpen] = useState(false);
  var [editOpen, setEditOpen] = useState(false);
  var [viewOpen, setViewOpen] = useState(false);
  var [currentRecord, setCurrentRecord] = useState<typeof TABLE_DATA[0] | null>(null);
  var [addForm] = Form.useForm();
  var [editForm] = Form.useForm();

  var handleNavigate = useCallback(function (key: string) {
    window.location.href = '/prototypes/' + key;
  }, []);

  var handleView = function (record: typeof TABLE_DATA[0]) {
    setCurrentRecord(record);
    setViewOpen(true);
  };

  var handleEdit = function (record: typeof TABLE_DATA[0]) {
    setCurrentRecord(record);
    editForm.setFieldsValue(record);
    setEditOpen(true);
  };

  var columns = [
    { title: '序号', dataIndex: 'id', key: 'id', width: 60 },
    { title: '标准名称', dataIndex: 'title', key: 'title', width: 240, ellipsis: true, render: function (t: string) { return <span style={{ fontWeight: 500 }}>{t}</span>; } },
    { title: '标准编号', dataIndex: 'code', key: 'code', width: 150 },
    { title: '类型', dataIndex: 'typeLabel', key: 'typeLabel', width: 100, render: function (t: string) { return <Tag color="blue">{t}</Tag>; } },
    { title: '发布机构', dataIndex: 'issuer', key: 'issuer', width: 160, ellipsis: true },
    {
      title: '效力状态', dataIndex: 'validity', key: 'validity', width: 90,
      render: function (t: string) { var s = VALIDITY_STATUS_MAP[t]; return s ? <Tag color={s.color}>{s.text}</Tag> : '-'; }
    },
    {
      title: '发布状态', dataIndex: 'publishStatus', key: 'publishStatus', width: 80,
      render: function (t: string) { return <Tag color={t === 'published' ? 'green' : 'orange'}>{t === 'published' ? '已发布' : '草稿'}</Tag>; }
    },
    { title: '实施日期', dataIndex: 'effectDate', key: 'effectDate', width: 110 },
    {
      title: '是否置顶', dataIndex: 'isTop', key: 'isTop', width: 80,
      render: function (val: boolean) { return val ? <Tag color="red">是</Tag> : <Tag>否</Tag>; }
    },
    { title: '发布时间', dataIndex: 'publishDate', key: 'publishDate', width: 150 },
    {
      title: '操作', key: 'action', width: 160, fixed: 'right' as const,
      render: function (_: any, record: any) { return renderActionColumn(record, handleView, handleEdit); }
    }
  ];

  return (
    <AdminLayout activeKey="admin-standard">
      

      <div style={{ maxWidth: 1400, margin: '0 auto', padding: 24 }}>
        <Breadcrumb items={[{ title: '内容管理' }, { title: '规范标准' }]} style={{ marginBottom: 16 }} />
        <Card style={{ borderRadius: 12 }}>
          <div style={{ display: 'flex', gap: 12, marginBottom: 16, flexWrap: 'wrap' }}>
            <Input prefix={<SearchOutlined />} placeholder="搜索标准名称/编号" style={{ width: 240 }} allowClear />
            <Select placeholder="标准类型" style={{ width: 130 }} options={TYPE_OPTIONS} allowClear />
            <Select placeholder="发布状态" style={{ width: 120 }} options={PUBLISH_STATUS_OPTIONS} allowClear />
            <Button type="primary" icon={<SearchOutlined />}>查询</Button>
            <Button>重置</Button>
            <div style={{ flex: 1 }} />
            <Button type="primary" icon={<PlusOutlined />} onClick={function () { addForm.resetFields(); setAddOpen(true); }}>新增标准</Button>
          </div>
          <Table columns={columns} dataSource={TABLE_DATA} pagination={{ pageSize: 10 }} scroll={{ x: 1300 }} />
        </Card>
      </div>

      <Modal
        title="新增标准"
        open={addOpen}
        onCancel={function () { setAddOpen(false); }}
        width={720}
        footer={[
          <Button key="cancel" onClick={function () { setAddOpen(false); }}>关闭</Button>,
          <Button key="draft" onClick={function () { message.success('已保存为草稿'); setAddOpen(false); }}>保存草稿</Button>,
          <Button key="preview" onClick={function () { handleNavigate('standard-detail'); }}>预览</Button>,
          <Button key="publish" type="primary" onClick={function () { message.success('标准发布成功'); setAddOpen(false); }}>立即发布</Button>
        ]}
      >
        <Form form={addForm} layout="vertical" style={{ marginTop: 16 }}>
          <Row gutter={16}>
            <Col span={12}><Form.Item name="title" label="标准名称" rules={[{ required: true, message: '请输入标准名称' }]}><Input placeholder="请输入标准名称" /></Form.Item></Col>
            <Col span={12}><Form.Item name="code" label="标准编号" rules={[{ required: true, message: '请输入标准编号' }]}><Input placeholder="如：GB/T 42967-2023" /></Form.Item></Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}><Form.Item name="type" label="标准类型" rules={[{ required: true, message: '请选择类型' }]}><Select placeholder="请选择标准类型" options={TYPE_OPTIONS} /></Form.Item></Col>
            <Col span={12}><Form.Item name="validity" label="效力状态"><Select placeholder="请选择效力状态" options={VALIDITY_OPTIONS} /></Form.Item></Col>
          </Row>
          <Form.Item name="issuer" label="发布机构"><Input placeholder="请输入发布机构" /></Form.Item>
          <Row gutter={16}>
            <Col span={12}><Form.Item name="effectDate" label="实施日期"><DatePicker style={{ width: '100%' }} /></Form.Item></Col>
          </Row>
          <Form.Item name="summary" label="摘要"><Input.TextArea rows={2} placeholder="请输入标准摘要" /></Form.Item>
          <Form.Item name="content" label="正文内容" rules={[{ required: true, message: '请输入正文内容' }]}>
            <div style={{ border: '1px solid #d9d9d9', borderRadius: 8, overflow: 'hidden' }}>
              <div style={{ display: 'flex', gap: 4, padding: '8px 12px', borderBottom: '1px solid #f0f0f0', background: '#fafafa', flexWrap: 'wrap' }}>
                <Button size="small" type="text">B</Button>
                <Button size="small" type="text">I</Button>
                <Button size="small" type="text">U</Button>
                <span style={{ color: '#d9d9d9' }}>|</span>
                <Button size="small" type="text">H1</Button>
                <Button size="small" type="text">H2</Button>
                <Button size="small" type="text">H3</Button>
                <span style={{ color: '#d9d9d9' }}>|</span>
                <Button size="small" type="text">无序列表</Button>
                <Button size="small" type="text">有序列表</Button>
                <span style={{ color: '#d9d9d9' }}>|</span>
                <Button size="small" type="text">插入图片</Button>
                <Button size="small" type="text">插入链接</Button>
              </div>
              <Input.TextArea rows={8} placeholder="请输入正文内容..." bordered={false} style={{ padding: 12 }} />
            </div>
          </Form.Item>
          <Form.Item name="attachment" label="附件"><Upload beforeUpload={function () { return false; }}><Button icon={<UploadOutlined />}>上传附件</Button></Upload></Form.Item>
          <Form.Item name="isTop" label="是否置顶" valuePropName="checked">
            <Switch checkedChildren="是" unCheckedChildren="否" />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="编辑标准"
        open={editOpen}
        onCancel={function () { setEditOpen(false); }}
        width={720}
        footer={[
          <Button key="cancel" onClick={function () { setEditOpen(false); }}>关闭</Button>,
          <Button key="preview" onClick={function () { handleNavigate('standard-detail'); }}>预览</Button>,
          <Button key="save" type="primary" onClick={function () { message.success('保存成功'); setEditOpen(false); }}>确认</Button>
        ]}
      >
        <Form form={editForm} layout="vertical" style={{ marginTop: 16 }}>
          <Row gutter={16}>
            <Col span={12}><Form.Item name="title" label="标准名称" rules={[{ required: true, message: '请输入标准名称' }]}><Input placeholder="请输入标准名称" /></Form.Item></Col>
            <Col span={12}><Form.Item name="code" label="标准编号" rules={[{ required: true, message: '请输入标准编号' }]}><Input placeholder="如：GB/T 42967-2023" /></Form.Item></Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}><Form.Item name="type" label="标准类型" rules={[{ required: true, message: '请选择类型' }]}><Select placeholder="请选择标准类型" options={TYPE_OPTIONS} /></Form.Item></Col>
            <Col span={12}><Form.Item name="validity" label="效力状态"><Select placeholder="请选择效力状态" options={VALIDITY_OPTIONS} /></Form.Item></Col>
          </Row>
          <Form.Item name="issuer" label="发布机构"><Input placeholder="请输入发布机构" /></Form.Item>
          <Row gutter={16}>
            <Col span={12}><Form.Item name="effectDate" label="实施日期"><DatePicker style={{ width: '100%' }} /></Form.Item></Col>
          </Row>
          <Form.Item name="summary" label="摘要"><Input.TextArea rows={2} placeholder="请输入标准摘要" /></Form.Item>
          <Form.Item name="content" label="正文内容" rules={[{ required: true, message: '请输入正文内容' }]}>
            <Input.TextArea rows={8} placeholder="请输入正文内容..." />
          </Form.Item>
          <Form.Item name="attachment" label="附件" valuePropName="fileList" getValueFromEvent={function (e) { if (Array.isArray(e)) { return e; } return e && e.fileList; }}>
            <Upload beforeUpload={function () { return false; }} defaultFileList={[{ uid: '1', name: '民用无人驾驶航空器系统分类标准.pdf', status: 'done' }]}>
              <Button icon={<UploadOutlined />}>上传附件</Button>
            </Upload>
          </Form.Item>
          <Form.Item name="isTop" label="是否置顶" valuePropName="checked">
            <Switch checkedChildren="是" unCheckedChildren="否" />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="标准详情"
        open={viewOpen}
        onCancel={function () { setViewOpen(false); }}
        width={720}
        footer={<Space><Button onClick={function () { setViewOpen(false); }}>关闭</Button><Button type="primary" onClick={function () { setViewOpen(false); handleNavigate('standard-detail'); }}>预览</Button></Space>}
      >
        {currentRecord && (
          <Descriptions column={2} bordered style={{ marginTop: 16 }}>
            <Descriptions.Item label="标准名称" span={2}>{currentRecord.title}</Descriptions.Item>
            <Descriptions.Item label="标准编号">{currentRecord.code}</Descriptions.Item>
            <Descriptions.Item label="类型"><Tag color="blue">{currentRecord.typeLabel}</Tag></Descriptions.Item>
            <Descriptions.Item label="发布机构" span={2}>{currentRecord.issuer}</Descriptions.Item>
            <Descriptions.Item label="效力状态"><Tag color={VALIDITY_STATUS_MAP[currentRecord.validity].color}>{VALIDITY_STATUS_MAP[currentRecord.validity].text}</Tag></Descriptions.Item>
            <Descriptions.Item label="发布状态"><Tag color={currentRecord.publishStatus === 'published' ? 'green' : 'orange'}>{currentRecord.publishStatus === 'published' ? '已发布' : '草稿'}</Tag></Descriptions.Item>
            <Descriptions.Item label="发布时间">{currentRecord.publishDate || '-'}</Descriptions.Item>
            <Descriptions.Item label="实施日期">{currentRecord.effectDate || '-'}</Descriptions.Item>
            <Descriptions.Item label="是否置顶">{currentRecord.isTop ? <Tag color="red">是</Tag> : <Tag>否</Tag>}</Descriptions.Item>
            <Descriptions.Item label="摘要" span={2}>{currentRecord.summary || '-'}</Descriptions.Item>
            <Descriptions.Item label="正文内容" span={2}>{currentRecord.content || '-'}</Descriptions.Item>
          </Descriptions>
        )}
      </Modal>
    </AdminLayout>
  );
};

export default Component;
