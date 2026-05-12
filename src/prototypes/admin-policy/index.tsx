/**
 * @name 政策法规管理
 * @mode axure
 * /Users/xu/Desktop/元引信息/Axhub-Make-main/skills/axure-export-workflow/SKILL.md
 *
 */

import './style.css';

import React, { useState, useCallback } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { Card, Table, Tag, Button, Breadcrumb, Tabs, Space, Modal, Form, Input, Select, Switch, Row, Col, DatePicker, message, Popconfirm, Tooltip, Descriptions, Upload } from 'antd';
import { SettingOutlined, FileTextOutlined, PlusOutlined, EditOutlined, DeleteOutlined, EyeOutlined, SearchOutlined, SendOutlined, UndoOutlined, ExclamationCircleOutlined, ReadOutlined, UploadOutlined, PaperClipOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

var handleNavigate = function (key: string) {
  window.location.href = '/prototypes/' + key;
};

var STATUS_OPTIONS = [{ value: 'published', label: '已发布' }, { value: 'draft', label: '草稿' }];

var VALIDITY_OPTIONS = [{ value: '现行有效', label: '现行有效' }, { value: '已修订', label: '已修订' }, { value: '已废止', label: '已废止' }, { value: '待生效', label: '待生效' }];

var NATIONAL_CATEGORIES = [
  { value: 'law', label: '法律法规' },
  { value: 'regulation', label: '部门规章' },
  { value: 'opinion', label: '指导意见' },
  { value: 'standard', label: '技术标准' }
];

var LOCAL_CATEGORIES = [
  { value: 'implement', label: '实施细则' },
  { value: 'plan', label: '发展规划' },
  { value: 'notice', label: '通知公告' },
  { value: 'measure', label: '管理办法' }
];

var INTERPRETATION_TYPES = [
  { value: 'graphic', label: '图文解读' },
  { value: 'authority', label: '权威解读' },
  { value: 'expert', label: '专家解读' },
  { value: 'video', label: '视频解读' },
  { value: 'qa', label: '政策问答' }
];

var NATIONAL_DATA = [
  { key: '1', id: 1, title: '关于促进低空经济发展的若干意见', category: '指导意见', dept: '国务院', status: 'published', validity: '现行有效', publishDate: '2026-04-15 10:00', effectDate: '2026-05-01', documentNo: '国发〔2026〕12号', summary: '为促进低空经济高质量发展，加快构建低空飞行服务保障体系，提出若干意见。', content: '为促进低空经济高质量发展，经国务院同意，现提出以下意见。\n\n一、总体要求\n以习近平新时代中国特色社会主义思想为指导，坚持市场主导、政府引导，创新驱动、安全发展...', isTop: true },
  { key: '2', id: 2, title: '无人驾驶航空器飞行管理暂行条例', category: '法律法规', dept: '国务院/中央军委', status: 'published', validity: '现行有效', publishDate: '2026-03-20 09:30', effectDate: '2026-06-01', documentNo: '国发〔2026〕5号', summary: '规范无人驾驶航空器飞行及相关活动，保障飞行安全和公共利益。', content: '为了规范无人驾驶航空器飞行及相关活动，促进无人驾驶航空器产业健康有序发展，维护航空安全、公共安全、国家安全，制定本条例...', isTop: false },
  { key: '3', id: 3, title: '低空空域分类管理办法', category: '部门规章', dept: '民航局', status: 'published', validity: '现行有效', publishDate: '2026-02-10 14:00', effectDate: '2026-04-01', documentNo: '民航规〔2026〕3号', summary: '明确低空空域分类标准和管理要求，优化空域资源配置。', content: '为规范低空空域分类管理，合理利用空域资源，保障飞行安全，根据《中华人民共和国飞行基本规则》等规定，制定本办法...', isTop: false },
  { key: '4', id: 4, title: '民用无人驾驶航空器运营合格证管理规则', category: '部门规章', dept: '民航局', status: 'published', validity: '已修订', publishDate: '2026-01-15 16:30', effectDate: '2026-03-01', documentNo: '民航规〔2026〕1号', summary: '规范民用无人机运营合格证的申请、审批和管理流程。', content: '为规范民用无人驾驶航空器运营合格证的管理，保障运营安全，根据相关法律法规，制定本规则...', isTop: false },
  { key: '5', id: 5, title: '低空飞行服务保障体系建设指导意见', category: '指导意见', dept: '交通运输部', status: 'draft', validity: '待生效', publishDate: '', effectDate: '', documentNo: '', summary: '指导各地建设低空飞行服务保障体系，提升低空飞行服务能力。', content: '', isTop: false }
];

var LOCAL_DATA = [
  { key: '1', id: 1, title: 'XX市民用无人驾驶航空器管理办法', category: '管理办法', dept: '市政府', status: 'published', validity: '现行有效', publishDate: '2026-04-10 09:00', effectDate: '2026-06-01', documentNo: 'X政发〔2026〕8号', summary: '为规范本市民用无人驾驶航空器飞行及相关活动，保障飞行安全和公共利益，制定本办法。', content: '第一条 为规范本市民用无人驾驶航空器飞行及相关活动，根据《无人驾驶航空器飞行管理暂行条例》等法律法规，结合本市实际，制定本办法。\n\n第二条 适用范围\n在本市行政区域内从事民用无人驾驶航空器生产、销售、使用及其管理活动，适用本办法。', isTop: false },
  { key: '2', id: 2, title: 'XX市低空经济发展三年行动计划', category: '发展规划', dept: '发改委', status: 'published', validity: '现行有效', publishDate: '2026-03-15 10:30', effectDate: '2026-04-01', documentNo: 'X发改〔2026〕15号', summary: '明确本市低空经济产业发展目标、重点任务和保障措施。', content: '为贯彻落实国家低空经济发展战略，加快推进本市低空经济产业高质量发展，特制定本行动计划...', isTop: false },
  { key: '3', id: 3, title: '关于开展低空飞行服务试点工作的通知', category: '通知公告', dept: '交通局', status: 'published', validity: '已废止', publishDate: '2026-02-20 14:00', effectDate: '2026-03-01', documentNo: 'X交〔2026〕22号', summary: '在全市范围内开展低空飞行服务试点工作。', content: '为探索低空飞行服务管理新模式，经研究决定在全市范围内开展低空飞行服务试点工作...', isTop: false },
  { key: '4', id: 4, title: 'XX市低空空域使用实施细则', category: '实施细则', dept: '空管办', status: 'draft', validity: '待生效', publishDate: '', effectDate: '', documentNo: '', summary: '细化低空空域使用管理要求，明确申请流程和审批标准。', content: '', isTop: false }
];

var INTERPRETATION_DATA = [
  { key: '1', id: 1, title: '一图读懂：《关于促进低空经济发展的若干意见》', type: '图文解读', relatedPolicy: '关于促进低空经济发展的若干意见', source: '国务院政策研究室', status: 'published', publishDate: '2026-04-18 10:00', content: '以图文并茂的形式，系统解读《若干意见》的核心要点。\n\n核心要点一：总体目标\n到2028年，低空经济产业规模突破5000亿元，培育10家以上具有国际竞争力的低空经济龙头企业。\n\n核心要点二：重点任务\n加快基础设施建设、深化空域管理改革、培育产业生态、强化安全监管。', isTop: false },
  { key: '2', id: 2, title: '权威解读：无人驾驶航空器飞行管理暂行条例五大亮点', type: '权威解读', relatedPolicy: '无人驾驶航空器飞行管理暂行条例', source: '司法部', status: 'published', publishDate: '2026-03-25 15:30', content: '本条例的五大亮点包括：一、确立了全链条管理制度；二、明确了分类管理原则；三、强化了安全监管措施...', isTop: false },
  { key: '3', id: 3, title: '专家解读：低空空域分类管理办法如何影响行业发展', type: '专家解读', relatedPolicy: '低空空域分类管理办法', source: '中国民航大学', status: 'published', publishDate: '2026-02-20 09:00', content: '低空空域分类管理办法的实施将对行业产生深远影响，主要体现在以下几个方面...', isTop: false },
  { key: '4', id: 4, title: '图解政策：低空经济示范区申报条件与流程', type: '图文解读', relatedPolicy: '关于促进低空经济发展的若干意见', source: '国家发改委', status: 'draft', publishDate: '', content: '', isTop: false }
];

function renderActionColumn(record: any, viewFn: Function, editFn: Function, type: string) {
  var isDraft = record.status === 'draft';
  return (
    <Space size={8}>
      <Tooltip title="查看">
        <Button type="text" size="small" icon={<EyeOutlined />} style={{ color: '#1677ff' }} onClick={function () { viewFn(type); }} />
      </Tooltip>
      {isDraft ? (
        <>
          <Tooltip title="编辑"><Button type="text" size="small" icon={<EditOutlined />} style={{ color: '#fa8c16' }} onClick={function () { editFn(type); }} /></Tooltip>
          <Tooltip title="发布">
            <Popconfirm title={'确定发布该' + (type === 'interpretation' ? '解读' : '政策') + '？'} icon={<ExclamationCircleOutlined />} onConfirm={function () { message.success('发布成功'); }}>
              <Button type="text" size="small" icon={<SendOutlined />} style={{ color: '#52c41a' }} />
            </Popconfirm>
          </Tooltip>
          <Tooltip title="删除">
            <Popconfirm title={'确定删除该' + (type === 'interpretation' ? '解读' : '政策') + '？'} icon={<ExclamationCircleOutlined />} onConfirm={function () { message.success('删除成功'); }}>
              <Button type="text" size="small" icon={<DeleteOutlined />} style={{ color: '#ff4d4f' }} />
            </Popconfirm>
          </Tooltip>
        </>
      ) : (
        <Tooltip title="撤回">
          <Popconfirm title={'确定撤回该' + (type === 'interpretation' ? '解读' : '政策') + '？'} icon={<ExclamationCircleOutlined />} onConfirm={function () { message.success('已撤回'); }}>
            <Button type="text" size="small" icon={<UndoOutlined />} style={{ color: '#fa8c16' }} />
          </Popconfirm>
        </Tooltip>
      )}
    </Space>
  );
}

var Component = function AdminPolicyPage() {
  var [nationalModalOpen, setNationalModalOpen] = useState(false);
  var [localModalOpen, setLocalModalOpen] = useState(false);
  var [interpModalOpen, setInterpModalOpen] = useState(false);
  var [viewNationalOpen, setViewNationalOpen] = useState(false);
  var [viewLocalOpen, setViewLocalOpen] = useState(false);
  var [viewInterpOpen, setViewInterpOpen] = useState(false);
  var [editNationalOpen, setEditNationalOpen] = useState(false);
  var [editLocalOpen, setEditLocalOpen] = useState(false);
  var [editInterpOpen, setEditInterpOpen] = useState(false);
  var [nationalForm] = Form.useForm();
  var [localForm] = Form.useForm();
  var [interpForm] = Form.useForm();
  var [editNationalForm] = Form.useForm();
  var [editLocalForm] = Form.useForm();
  var [editInterpForm] = Form.useForm();

  var NATIONAL_COLUMNS = [
    { title: '序号', dataIndex: 'id', key: 'id', width: 60 },
    {
      title: '政策标题', dataIndex: 'title', key: 'title', ellipsis: true,
      render: function (text: string) { return <span style={{ fontWeight: 500, color: '#1f1f1f' }}>{text}</span>; }
    },
    {
      title: '政策分类', dataIndex: 'category', key: 'category', width: 100,
      render: function (text: string) { return <Tag color="orange">{text}</Tag>; }
    },
    { title: '发布单位', dataIndex: 'dept', key: 'dept', width: 120, ellipsis: true },
    { title: '文号', dataIndex: 'documentNo', key: 'documentNo', width: 140, ellipsis: true },
    {
      title: '效力状态', dataIndex: 'validity', key: 'validity', width: 90,
      render: function (text: string) {
        if (!text) return '-';
        var colorMap: Record<string, string> = { '现行有效': 'green', '已修订': 'orange', '已废止': 'red', '待生效': 'blue' };
        return <Tag color={colorMap[text] || 'default'}>{text}</Tag>;
      }
    },
    {
      title: '发布状态', dataIndex: 'status', key: 'status', width: 80,
      render: function (text: string) { return <Tag color={text === 'published' ? 'green' : 'orange'}>{text === 'published' ? '已发布' : '草稿'}</Tag>; }
    },
    { title: '实施日期', dataIndex: 'effectDate', key: 'effectDate', width: 110 },
    {
      title: '是否置顶', dataIndex: 'isTop', key: 'isTop', width: 80,
      render: function (val: boolean) { return val ? <Tag color="red">是</Tag> : <Tag>否</Tag>; }
    },
    { title: '发布时间', dataIndex: 'publishDate', key: 'publishDate', width: 150 },
    {
      title: '操作', key: 'action', width: 160, fixed: 'right' as const,
      render: function (_: any, record: any) { return renderActionColumn(record, function () { setViewNationalOpen(true); }, function () { editNationalForm.setFieldsValue(record); setEditNationalOpen(true); }, 'national'); }
    }
  ];

  var LOCAL_COLUMNS = [
    { title: '序号', dataIndex: 'id', key: 'id', width: 60 },
    {
      title: '政策标题', dataIndex: 'title', key: 'title', ellipsis: true,
      render: function (text: string) { return <span style={{ fontWeight: 500, color: '#1f1f1f' }}>{text}</span>; }
    },
    {
      title: '政策分类', dataIndex: 'category', key: 'category', width: 100,
      render: function (text: string) { return <Tag color="green">{text}</Tag>; }
    },
    { title: '发布单位', dataIndex: 'dept', key: 'dept', width: 120, ellipsis: true },
    { title: '文号', dataIndex: 'documentNo', key: 'documentNo', width: 140, ellipsis: true },
    {
      title: '效力状态', dataIndex: 'validity', key: 'validity', width: 90,
      render: function (text: string) {
        if (!text) return '-';
        var colorMap: Record<string, string> = { '现行有效': 'green', '已修订': 'orange', '已废止': 'red', '待生效': 'blue' };
        return <Tag color={colorMap[text] || 'default'}>{text}</Tag>;
      }
    },
    {
      title: '发布状态', dataIndex: 'status', key: 'status', width: 80,
      render: function (text: string) { return <Tag color={text === 'published' ? 'green' : 'orange'}>{text === 'published' ? '已发布' : '草稿'}</Tag>; }
    },
    { title: '实施日期', dataIndex: 'effectDate', key: 'effectDate', width: 110 },
    {
      title: '是否置顶', dataIndex: 'isTop', key: 'isTop', width: 80,
      render: function (val: boolean) { return val ? <Tag color="red">是</Tag> : <Tag>否</Tag>; }
    },
    { title: '发布时间', dataIndex: 'publishDate', key: 'publishDate', width: 150 },
    {
      title: '操作', key: 'action', width: 160, fixed: 'right' as const,
      render: function (_: any, record: any) { return renderActionColumn(record, function () { setViewLocalOpen(true); }, function () { editLocalForm.setFieldsValue(record); setEditLocalOpen(true); }, 'local'); }
    }
  ];

  var INTERP_COLUMNS = [
    { title: '序号', dataIndex: 'id', key: 'id', width: 60 },
    {
      title: '解读标题', dataIndex: 'title', key: 'title', ellipsis: true,
      render: function (text: string) { return <span style={{ fontWeight: 500, color: '#1f1f1f' }}>{text}</span>; }
    },
    {
      title: '解读类型', dataIndex: 'type', key: 'type', width: 100,
      render: function (text: string) {
        var colorMap: Record<string, string> = { '图文解读': '#1677ff', '权威解读': '#722ed1', '专家解读': '#13c2c2', '视频解读': '#fa8c16', '政策问答': '#52c41a' };
        return <Tag color={colorMap[text] || '#1677ff'}>{text}</Tag>;
      }
    },
    { title: '关联政策', dataIndex: 'relatedPolicy', key: 'relatedPolicy', width: 200, ellipsis: true },
    { title: '来源', dataIndex: 'source', key: 'source', width: 120, ellipsis: true },
    {
      title: '发布状态', dataIndex: 'status', key: 'status', width: 80,
      render: function (text: string) { return <Tag color={text === 'published' ? 'green' : 'orange'}>{text === 'published' ? '已发布' : '草稿'}</Tag>; }
    },
    {
      title: '是否置顶', dataIndex: 'isTop', key: 'isTop', width: 80,
      render: function (val: boolean) { return val ? <Tag color="red">是</Tag> : <Tag>否</Tag>; }
    },
    { title: '发布时间', dataIndex: 'publishDate', key: 'publishDate', width: 150 },
    {
      title: '操作', key: 'action', width: 160, fixed: 'right' as const,
      render: function (_: any, record: any) { return renderActionColumn(record, function () { setViewInterpOpen(true); }, function () { editInterpForm.setFieldsValue(record); setEditInterpOpen(true); }, 'interpretation'); }
    }
  ];

  var richTextEditor = (
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
  );

  return (
    <AdminLayout activeKey="admin-policy">
      

      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '24px' }}>
        <Breadcrumb items={[{ title: '政策管理' }]} style={{ marginBottom: 24 }} />

        <Card style={{ borderRadius: 12 }}>
          <Tabs
            defaultActiveKey="national"
            items={[
              {
                key: 'national',
                label: <span><FileTextOutlined style={{ marginRight: 6 }} /> 国家政策管理</span>,
                children: (
                  <div>
                    <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
                      <Input size="middle" prefix={<SearchOutlined />} placeholder="搜索政策标题..." style={{ width: 280 }} allowClear />
                      <Select size="middle" placeholder="分类筛选" style={{ width: 140 }} options={NATIONAL_CATEGORIES} allowClear />
                      <Select size="middle" placeholder="发布状态" style={{ width: 120 }} options={STATUS_OPTIONS} allowClear />
                      <Button size="middle" type="primary" icon={<SearchOutlined />}>查询</Button>
                      <Button size="middle">重置</Button>
                      <div style={{ flex: 1 }} />
                      <Button type="primary" icon={<PlusOutlined />} onClick={function () { setNationalModalOpen(true); }}>新建政策</Button>
                    </div>
                    <Table columns={NATIONAL_COLUMNS} dataSource={NATIONAL_DATA} pagination={{ pageSize: 10, total: NATIONAL_DATA.length }} />
                  </div>
                )
              },
              {
                key: 'local',
                label: <span><FileTextOutlined style={{ marginRight: 6 }} /> 本地政策管理</span>,
                children: (
                  <div>
                    <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
                      <Input size="middle" prefix={<SearchOutlined />} placeholder="搜索政策标题..." style={{ width: 280 }} allowClear />
                      <Select size="middle" placeholder="分类筛选" style={{ width: 140 }} options={LOCAL_CATEGORIES} allowClear />
                      <Select size="middle" placeholder="发布状态" style={{ width: 120 }} options={STATUS_OPTIONS} allowClear />
                      <Button size="middle" type="primary" icon={<SearchOutlined />}>查询</Button>
                      <Button size="middle">重置</Button>
                      <div style={{ flex: 1 }} />
                      <Button type="primary" icon={<PlusOutlined />} onClick={function () { setLocalModalOpen(true); }}>新建政策</Button>
                    </div>
                    <Table columns={LOCAL_COLUMNS} dataSource={LOCAL_DATA} pagination={{ pageSize: 10, total: LOCAL_DATA.length }} />
                  </div>
                )
              },
              {
                key: 'interpretation',
                label: <span><ReadOutlined style={{ marginRight: 6 }} /> 政策解读管理</span>,
                children: (
                  <div>
                    <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
                      <Input size="middle" prefix={<SearchOutlined />} placeholder="搜索解读标题..." style={{ width: 280 }} allowClear />
                      <Select size="middle" placeholder="类型筛选" style={{ width: 140 }} options={INTERPRETATION_TYPES} allowClear />
                      <Select size="middle" placeholder="状态筛选" style={{ width: 120 }} options={STATUS_OPTIONS} allowClear />
                      <Button size="middle" type="primary" icon={<SearchOutlined />}>查询</Button>
                      <Button size="middle">重置</Button>
                      <div style={{ flex: 1 }} />
                      <Button type="primary" icon={<PlusOutlined />} onClick={function () { setInterpModalOpen(true); }}>新建解读</Button>
                    </div>
                    <Table columns={INTERP_COLUMNS} dataSource={INTERPRETATION_DATA} pagination={{ pageSize: 10, total: INTERPRETATION_DATA.length }} />
                  </div>
                )
              }
            ]}
          />
        </Card>
      </div>

      <Modal
        title="新建国家政策"
        open={nationalModalOpen}
        onCancel={function () { setNationalModalOpen(false); }}
        width={720}
        footer={[
          <Button key="cancel" onClick={function () { setNationalModalOpen(false); }}>关闭</Button>,
          <Button key="draft" onClick={function () { message.success('已保存为草稿'); setNationalModalOpen(false); }}>保存草稿</Button>,
          <Button key="preview" onClick={function () { handleNavigate('policy-national'); }}>预览</Button>,
          <Button key="publish" type="primary" onClick={function () { message.success('政策发布成功'); setNationalModalOpen(false); }}>立即发布</Button>
        ]}
      >
        <Form form={nationalForm} layout="vertical" style={{ marginTop: 16 }}>
          <Row gutter={16}>
            <Col span={16}>
              <Form.Item name="title" label="政策标题" rules={[{ required: true, message: '请输入政策标题' }]}>
                <Input placeholder="请输入政策标题" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="category" label="政策分类" rules={[{ required: true, message: '请选择分类' }]}>
                <Select placeholder="请选择分类" options={NATIONAL_CATEGORIES} />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item name="dept" label="发布单位">
            <Input placeholder="请输入发布单位" />
          </Form.Item>
          <Form.Item name="documentNo" label="文号">
            <Input placeholder="如：国发〔2026〕12号" />
          </Form.Item>
          <Form.Item name="validity" label="效力状态">
            <Select placeholder="请选择效力状态" options={VALIDITY_OPTIONS} />
          </Form.Item>
          <Form.Item name="effectDate" label="实施日期">
            <DatePicker placeholder="请选择实施日期" style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name="summary" label="摘要">
            <Input.TextArea rows={2} placeholder="请输入政策摘要" />
          </Form.Item>
          <Form.Item name="content" label="正文内容" rules={[{ required: true, message: '请输入正文内容' }]}>
            {richTextEditor}
          </Form.Item>
          <Form.Item name="attachment" label="附件" valuePropName="fileList" getValueFromEvent={function (e) { if (Array.isArray(e)) { return e; } return e && e.fileList; }}>
            <Upload beforeUpload={function () { return false; }}>
              <Button icon={<UploadOutlined />}>上传附件</Button>
            </Upload>
          </Form.Item>
          <Form.Item name="isTop" label="是否置顶" valuePropName="checked">
            <Switch checkedChildren="是" unCheckedChildren="否" />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="新建本地政策"
        open={localModalOpen}
        onCancel={function () { setLocalModalOpen(false); }}
        width={720}
        footer={[
          <Button key="cancel" onClick={function () { setLocalModalOpen(false); }}>关闭</Button>,
          <Button key="draft" onClick={function () { message.success('已保存为草稿'); setLocalModalOpen(false); }}>保存草稿</Button>,
          <Button key="preview" onClick={function () { handleNavigate('policy-local'); }}>预览</Button>,
          <Button key="publish" type="primary" onClick={function () { message.success('政策发布成功'); setLocalModalOpen(false); }}>立即发布</Button>
        ]}
      >
        <Form form={localForm} layout="vertical" style={{ marginTop: 16 }}>
          <Row gutter={16}>
            <Col span={16}>
              <Form.Item name="title" label="政策标题" rules={[{ required: true, message: '请输入政策标题' }]}>
                <Input placeholder="请输入政策标题" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="category" label="政策分类" rules={[{ required: true, message: '请选择分类' }]}>
                <Select placeholder="请选择分类" options={LOCAL_CATEGORIES} />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item name="dept" label="发布单位">
            <Input placeholder="请输入发布单位" />
          </Form.Item>
          <Form.Item name="documentNo" label="文号">
            <Input placeholder="如：X政发〔2026〕8号" />
          </Form.Item>
          <Form.Item name="validity" label="效力状态">
            <Select placeholder="请选择效力状态" options={VALIDITY_OPTIONS} />
          </Form.Item>
          <Form.Item name="effectDate" label="实施日期">
            <DatePicker placeholder="请选择实施日期" style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name="summary" label="摘要">
            <Input.TextArea rows={2} placeholder="请输入政策摘要" />
          </Form.Item>
          <Form.Item name="content" label="正文内容" rules={[{ required: true, message: '请输入正文内容' }]}>
            {richTextEditor}
          </Form.Item>
          <Form.Item name="attachment" label="附件" valuePropName="fileList" getValueFromEvent={function (e) { if (Array.isArray(e)) { return e; } return e && e.fileList; }}>
            <Upload beforeUpload={function () { return false; }}>
              <Button icon={<UploadOutlined />}>上传附件</Button>
            </Upload>
          </Form.Item>
          <Form.Item name="isTop" label="是否置顶" valuePropName="checked">
            <Switch checkedChildren="是" unCheckedChildren="否" />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="新建政策解读"
        open={interpModalOpen}
        onCancel={function () { setInterpModalOpen(false); }}
        width={720}
        footer={[
          <Button key="cancel" onClick={function () { setInterpModalOpen(false); }}>关闭</Button>,
          <Button key="draft" onClick={function () { message.success('已保存为草稿'); setInterpModalOpen(false); }}>保存草稿</Button>,
          <Button key="preview" onClick={function () { handleNavigate('policy-interpretation'); }}>预览</Button>,
          <Button key="publish" type="primary" onClick={function () { message.success('解读发布成功'); setInterpModalOpen(false); }}>立即发布</Button>
        ]}
      >
        <Form form={interpForm} layout="vertical" style={{ marginTop: 16 }}>
          <Row gutter={16}>
            <Col span={16}>
              <Form.Item name="title" label="解读标题" rules={[{ required: true, message: '请输入解读标题' }]}>
                <Input placeholder="请输入解读标题" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="type" label="解读类型" rules={[{ required: true, message: '请选择类型' }]}>
                <Select placeholder="请选择类型" options={INTERPRETATION_TYPES} />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item name="relatedPolicy" label="关联政策" rules={[{ required: true, message: '请选择关联政策' }]}>
            <Select placeholder="请选择关联政策" showSearch optionFilterProp="label" options={[
              { value: '关于促进低空经济发展的若干意见', label: '关于促进低空经济发展的若干意见' },
              { value: '无人驾驶航空器飞行管理暂行条例', label: '无人驾驶航空器飞行管理暂行条例' },
              { value: '低空空域分类管理办法', label: '低空空域分类管理办法' },
              { value: '民用无人驾驶航空器运营合格证管理规则', label: '民用无人驾驶航空器运营合格证管理规则' },
              { value: '低空飞行服务保障体系建设指导意见', label: '低空飞行服务保障体系建设指导意见' },
              { value: 'XX市民用无人驾驶航空器管理办法', label: 'XX市民用无人驾驶航空器管理办法' },
              { value: 'XX市低空经济发展三年行动计划', label: 'XX市低空经济发展三年行动计划' }
            ]} />
          </Form.Item>
          <Form.Item name="source" label="来源">
            <Input placeholder="请输入来源" />
          </Form.Item>
          <Form.Item name="content" label="正文内容" rules={[{ required: true, message: '请输入正文内容' }]}>
            {richTextEditor}
          </Form.Item>
          <Form.Item name="isTop" label="是否置顶" valuePropName="checked">
            <Switch checkedChildren="是" unCheckedChildren="否" />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="查看国家政策"
        open={viewNationalOpen}
        onCancel={function () { setViewNationalOpen(false); }}
        width={720}
        footer={<Space><Button onClick={function () { setViewNationalOpen(false); }}>关闭</Button><Button type="primary" onClick={function () { setViewNationalOpen(false); handleNavigate('policy-national'); }}>预览</Button></Space>}
      >
        <Descriptions column={2} bordered style={{ marginTop: 16 }}>
          <Descriptions.Item label="政策标题" span={2}>关于促进低空经济发展的若干意见</Descriptions.Item>
          <Descriptions.Item label="政策分类"><Tag color="orange">指导意见</Tag></Descriptions.Item>
          <Descriptions.Item label="发布状态"><Tag color="green">已发布</Tag></Descriptions.Item>
          <Descriptions.Item label="发布单位">国务院</Descriptions.Item>
          <Descriptions.Item label="文号">国发〔2026〕12号</Descriptions.Item>
          <Descriptions.Item label="效力状态"><Tag color="green">现行有效</Tag></Descriptions.Item>
          <Descriptions.Item label="发布时间">2026-04-15 10:00</Descriptions.Item>
          <Descriptions.Item label="实施日期">2026-05-01</Descriptions.Item>
          <Descriptions.Item label="是否置顶"><Tag color="red">是</Tag></Descriptions.Item>
          <Descriptions.Item label="摘要" span={2}>为促进低空经济高质量发展，加快构建低空飞行服务保障体系，提出若干意见。</Descriptions.Item>
          <Descriptions.Item label="正文内容" span={2}>
            <div style={{ lineHeight: 1.8, color: '#333', fontSize: 14 }}>
              <p>为促进低空经济高质量发展，经国务院同意，现提出以下意见。</p>
              <p><strong>一、总体要求</strong></p>
              <p>以习近平新时代中国特色社会主义思想为指导，坚持市场主导、政府引导，创新驱动、安全发展...</p>
            </div>
          </Descriptions.Item>
        </Descriptions>
      </Modal>

      <Modal
        title="查看本地政策"
        open={viewLocalOpen}
        onCancel={function () { setViewLocalOpen(false); }}
        width={720}
        footer={<Space><Button onClick={function () { setViewLocalOpen(false); }}>关闭</Button><Button type="primary" onClick={function () { setViewLocalOpen(false); handleNavigate('policy-local'); }}>预览</Button></Space>}
      >
        <Descriptions column={2} bordered style={{ marginTop: 16 }}>
          <Descriptions.Item label="政策标题" span={2}>XX市民用无人驾驶航空器管理办法</Descriptions.Item>
          <Descriptions.Item label="政策分类"><Tag color="green">管理办法</Tag></Descriptions.Item>
          <Descriptions.Item label="发布状态"><Tag color="green">已发布</Tag></Descriptions.Item>
          <Descriptions.Item label="发布单位">市政府</Descriptions.Item>
          <Descriptions.Item label="文号">X政发〔2026〕8号</Descriptions.Item>
          <Descriptions.Item label="效力状态"><Tag color="green">现行有效</Tag></Descriptions.Item>
          <Descriptions.Item label="发布时间">2026-04-10 09:00</Descriptions.Item>
          <Descriptions.Item label="实施日期">2026-06-01</Descriptions.Item>
          <Descriptions.Item label="是否置顶"><Tag>否</Tag></Descriptions.Item>
          <Descriptions.Item label="摘要" span={2}>为规范本市民用无人驾驶航空器飞行及相关活动，保障飞行安全和公共利益，制定本办法。</Descriptions.Item>
          <Descriptions.Item label="正文内容" span={2}>
            <div style={{ lineHeight: 1.8, color: '#333', fontSize: 14 }}>
              <p>第一条 为规范本市民用无人驾驶航空器飞行及相关活动，根据《无人驾驶航空器飞行管理暂行条例》等法律法规，结合本市实际，制定本办法。</p>
              <p><strong>第二条 适用范围</strong></p>
              <p>在本市行政区域内从事民用无人驾驶航空器生产、销售、使用及其管理活动，适用本办法。</p>
            </div>
          </Descriptions.Item>
        </Descriptions>
      </Modal>

      <Modal
        title="查看政策解读"
        open={viewInterpOpen}
        onCancel={function () { setViewInterpOpen(false); }}
        width={720}
        footer={<Space><Button onClick={function () { setViewInterpOpen(false); }}>关闭</Button><Button type="primary" onClick={function () { setViewInterpOpen(false); handleNavigate('policy-interpretation'); }}>预览</Button></Space>}
      >
        <Descriptions column={2} bordered style={{ marginTop: 16 }}>
          <Descriptions.Item label="解读标题" span={2}>一图读懂：《关于促进低空经济发展的若干意见》</Descriptions.Item>
          <Descriptions.Item label="解读类型"><Tag color="#1677ff">图文解读</Tag></Descriptions.Item>
          <Descriptions.Item label="发布状态"><Tag color="green">已发布</Tag></Descriptions.Item>
          <Descriptions.Item label="关联政策">关于促进低空经济发展的若干意见</Descriptions.Item>
          <Descriptions.Item label="来源">国务院政策研究室</Descriptions.Item>
          <Descriptions.Item label="发布时间">2026-04-18 10:00</Descriptions.Item>
          <Descriptions.Item label="是否置顶"><Tag>否</Tag></Descriptions.Item>
          <Descriptions.Item label="正文内容" span={2}>
            <div style={{ lineHeight: 1.8, color: '#333', fontSize: 14 }}>
              <p>以图文并茂的形式，系统解读《若干意见》的核心要点。</p>
              <p><strong>核心要点一：总体目标</strong></p>
              <p>到2028年，低空经济产业规模突破5000亿元，培育10家以上具有国际竞争力的低空经济龙头企业。</p>
              <p><strong>核心要点二：重点任务</strong></p>
              <p>加快基础设施建设、深化空域管理改革、培育产业生态、强化安全监管。</p>
            </div>
          </Descriptions.Item>
        </Descriptions>
      </Modal>

      <Modal
        title="编辑国家政策"
        open={editNationalOpen}
        onCancel={function () { setEditNationalOpen(false); }}
        afterOpenChange={function (open: boolean) { if (open) { editNationalForm.setFieldsValue(NATIONAL_DATA[0]); } }}
        width={720}
        footer={[
          <Button key="cancel" onClick={function () { setEditNationalOpen(false); }}>关闭</Button>,
          <Button key="preview" onClick={function () { handleNavigate('policy-national'); }}>预览</Button>,
          <Button key="save" type="primary" onClick={function () { message.success('保存成功'); setEditNationalOpen(false); }}>确认</Button>
        ]}
      >
        <Form form={editNationalForm} layout="vertical" style={{ marginTop: 16 }}>
          <Row gutter={16}>
            <Col span={16}>
              <Form.Item name="title" label="政策标题" rules={[{ required: true, message: '请输入政策标题' }]}>
                <Input placeholder="请输入政策标题" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="category" label="政策分类" rules={[{ required: true, message: '请选择分类' }]}>
                <Select placeholder="请选择分类" options={NATIONAL_CATEGORIES} />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item name="dept" label="发布单位">
            <Input placeholder="请输入发布单位" />
          </Form.Item>
          <Form.Item name="documentNo" label="文号">
            <Input placeholder="如：国发〔2026〕12号" />
          </Form.Item>
          <Form.Item name="validity" label="效力状态">
            <Select placeholder="请选择效力状态" options={VALIDITY_OPTIONS} />
          </Form.Item>
          <Form.Item name="effectDate" label="实施日期">
            <DatePicker placeholder="请选择实施日期" style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name="summary" label="摘要">
            <Input.TextArea rows={2} placeholder="请输入政策摘要" />
          </Form.Item>
          <Form.Item name="content" label="正文内容" rules={[{ required: true, message: '请输入正文内容' }]}>
            <Input.TextArea rows={8} placeholder="请输入正文内容..." />
          </Form.Item>
          <Form.Item name="attachment" label="附件" valuePropName="fileList" getValueFromEvent={function (e) { if (Array.isArray(e)) { return e; } return e && e.fileList; }}>
            <Upload beforeUpload={function () { return false; }} defaultFileList={[{ uid: '1', name: '关于促进低空经济发展的若干意见.pdf', status: 'done' }]}>
              <Button icon={<UploadOutlined />}>上传附件</Button>
            </Upload>
          </Form.Item>
          <Form.Item name="isTop" label="是否置顶" valuePropName="checked">
            <Switch checkedChildren="是" unCheckedChildren="否" />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="编辑本地政策"
        open={editLocalOpen}
        onCancel={function () { setEditLocalOpen(false); }}
        width={720}
        footer={[
          <Button key="cancel" onClick={function () { setEditLocalOpen(false); }}>关闭</Button>,
          <Button key="preview" onClick={function () { handleNavigate('policy-local'); }}>预览</Button>,
          <Button key="save" type="primary" onClick={function () { message.success('保存成功'); setEditLocalOpen(false); }}>确认</Button>
        ]}
      >
        <Form form={editLocalForm} layout="vertical" style={{ marginTop: 16 }}>
          <Row gutter={16}>
            <Col span={16}>
              <Form.Item name="title" label="政策标题" rules={[{ required: true, message: '请输入政策标题' }]}>
                <Input placeholder="请输入政策标题" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="category" label="政策分类" rules={[{ required: true, message: '请选择分类' }]}>
                <Select placeholder="请选择分类" options={LOCAL_CATEGORIES} />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item name="dept" label="发布单位">
            <Input placeholder="请输入发布单位" />
          </Form.Item>
          <Form.Item name="documentNo" label="文号">
            <Input placeholder="如：X政发〔2026〕8号" />
          </Form.Item>
          <Form.Item name="validity" label="效力状态">
            <Select placeholder="请选择效力状态" options={VALIDITY_OPTIONS} />
          </Form.Item>
          <Form.Item name="effectDate" label="实施日期">
            <DatePicker placeholder="请选择实施日期" style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name="summary" label="摘要">
            <Input.TextArea rows={2} placeholder="请输入政策摘要" />
          </Form.Item>
          <Form.Item name="content" label="正文内容" rules={[{ required: true, message: '请输入正文内容' }]}>
            <Input.TextArea rows={8} placeholder="请输入正文内容..." />
          </Form.Item>
          <Form.Item name="attachment" label="附件" valuePropName="fileList" getValueFromEvent={function (e) { if (Array.isArray(e)) { return e; } return e && e.fileList; }}>
            <Upload beforeUpload={function () { return false; }} defaultFileList={[{ uid: '1', name: '本市民用无人驾驶航空器管理办法.pdf', status: 'done' }]}>
              <Button icon={<UploadOutlined />}>上传附件</Button>
            </Upload>
          </Form.Item>
          <Form.Item name="isTop" label="是否置顶" valuePropName="checked">
            <Switch checkedChildren="是" unCheckedChildren="否" />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="编辑政策解读"
        open={editInterpOpen}
        onCancel={function () { setEditInterpOpen(false); }}
        width={720}
        footer={[
          <Button key="cancel" onClick={function () { setEditInterpOpen(false); }}>关闭</Button>,
          <Button key="preview" onClick={function () { handleNavigate('policy-interpretation'); }}>预览</Button>,
          <Button key="save" type="primary" onClick={function () { message.success('保存成功'); setEditInterpOpen(false); }}>确认</Button>
        ]}
      >
        <Form form={editInterpForm} layout="vertical" style={{ marginTop: 16 }}>
          <Row gutter={16}>
            <Col span={16}>
              <Form.Item name="title" label="解读标题" rules={[{ required: true, message: '请输入解读标题' }]}>
                <Input placeholder="请输入解读标题" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="type" label="解读类型" rules={[{ required: true, message: '请选择类型' }]}>
                <Select placeholder="请选择类型" options={INTERPRETATION_TYPES} />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item name="relatedPolicy" label="关联政策" rules={[{ required: true, message: '请选择关联政策' }]}>
            <Select placeholder="请选择关联政策" showSearch optionFilterProp="label" options={[
              { value: '关于促进低空经济发展的若干意见', label: '关于促进低空经济发展的若干意见' },
              { value: '无人驾驶航空器飞行管理暂行条例', label: '无人驾驶航空器飞行管理暂行条例' },
              { value: '低空空域分类管理办法', label: '低空空域分类管理办法' },
              { value: '民用无人驾驶航空器运营合格证管理规则', label: '民用无人驾驶航空器运营合格证管理规则' },
              { value: '低空飞行服务保障体系建设指导意见', label: '低空飞行服务保障体系建设指导意见' },
              { value: 'XX市民用无人驾驶航空器管理办法', label: 'XX市民用无人驾驶航空器管理办法' },
              { value: 'XX市低空经济发展三年行动计划', label: 'XX市低空经济发展三年行动计划' }
            ]} />
          </Form.Item>
          <Form.Item name="source" label="来源">
            <Input placeholder="请输入来源" />
          </Form.Item>
          <Form.Item name="effectDate" label="实施日期">
            <DatePicker placeholder="请选择实施日期" style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name="content" label="正文内容" rules={[{ required: true, message: '请输入正文内容' }]}>
            <Input.TextArea rows={8} placeholder="请输入正文内容..." />
          </Form.Item>
          <Form.Item name="isTop" label="是否置顶" valuePropName="checked">
            <Switch checkedChildren="是" unCheckedChildren="否" />
          </Form.Item>
        </Form>
      </Modal>
    </AdminLayout>
  );
};

export default Component;
