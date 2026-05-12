/**
 * @name 资讯公告管理
 * @mode axure
 * /Users/xu/Desktop/元引信息/Axhub-Make-main/skills/axure-export-workflow/SKILL.md
 *
 */

import './style.css';

import React, { useState, useCallback } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { Card, Table, Tag, Button, Breadcrumb, Tabs, Space, Modal, Form, Input, Select, Switch, Row, Col, DatePicker, message, Popconfirm, Tooltip, Descriptions, Upload } from 'antd';
import { HomeOutlined, PlusOutlined, EditOutlined, DeleteOutlined, EyeOutlined, SearchOutlined, SettingOutlined, FileTextOutlined, BellOutlined, ExclamationCircleOutlined, SendOutlined, UndoOutlined, UploadOutlined } from '@ant-design/icons';

const NEWS_CATEGORIES = [
  { value: 'industry', label: '行业新闻' },
  { value: 'tech', label: '技术前沿' },
  { value: 'training', label: '培训认证' },
  { value: 'safety', label: '安全提示' }
];

const NOTICE_TYPES = [
  { value: 'airspace', label: '空域通知', color: '#f5222d' },
  { value: 'weather', label: '气象预警', color: '#fa8c16' },
  { value: 'activity', label: '活动通知', color: '#722ed1' },
  { value: 'system', label: '系统公告', color: '#1677ff' },
  { value: 'maintenance', label: '维护通知', color: '#8c8c8c' }
];

var NEWS_DATA = [
  { key: '1', id: 1, title: '低空经济示范区建设方案正式发布', category: '行业新闻', status: 'published', publishDate: '2026-04-20 09:30', effectDate: '2026-05-01', views: 1280, author: '编辑部', source: '国家发展和改革委员会', isTop: true },
  { key: '2', id: 2, title: '全国首条城市低空物流航线开通运营', category: '行业新闻', status: 'published', publishDate: '2026-04-19 14:15', effectDate: '2026-04-25', views: 956, author: '编辑部', source: '交通运输部', isTop: false },
  { key: '3', id: 3, title: '无人机驾驶员培训标准体系升级', category: '培训认证', status: 'published', publishDate: '2026-04-18 10:00', effectDate: '2026-06-01', views: 743, author: '培训部', source: '民航局', isTop: false },
  { key: '4', id: 4, title: '新型eVTOL完成适航审定首飞', category: '技术前沿', status: 'published', publishDate: '2026-04-17 16:45', effectDate: '', views: 2105, author: '技术部', source: '中国航空研究院', isTop: false },
  { key: '5', id: 5, title: '低空空域安全管控系统上线', category: '安全提示', status: 'published', publishDate: '2026-04-16 08:20', effectDate: '2026-04-20', views: 634, author: '安全部', source: '空域管理办公室', isTop: false },
  { key: '6', id: 6, title: '多城市低空交通规划获批', category: '行业新闻', status: 'draft', publishDate: '', effectDate: '', views: 0, author: '编辑部', source: '住建部', isTop: false }
];

var NOTICE_DATA = [
  { key: '1', id: 1, title: '关于开展2026年第二季度飞行计划集中审批的通知', type: '系统公告', typeColor: '#1677ff', status: 'published', publishDate: '2026-04-21 10:00', effectiveDate: '2026-04-25 ~ 2026-05-10', isTop: true, publisher: '低空空管服务中心' },
  { key: '2', id: 2, title: '【气象预警】明日午后有雷暴天气', type: '气象预警', typeColor: '#fa8c16', status: 'published', publishDate: '2026-04-21 15:30', effectiveDate: '2026-04-22 14:00~20:00', isTop: true, publisher: '气象服务中心' },
  { key: '3', id: 3, title: '南区训练空域临时管制通告', type: '空域通知', typeColor: '#f5222d', status: 'published', publishDate: '2026-04-20 09:15', effectiveDate: '2026-04-23 ~ 2026-04-25', isTop: false, publisher: '空域管理办公室' },
  { key: '4', id: 4, title: '平台系统升级维护公告', type: '维护通知', typeColor: '#8c8c8c', status: 'published', publishDate: '2026-04-19 17:00', effectiveDate: '2026-04-26 02:00~06:00', isTop: false, publisher: '技术运维部' },
  { key: '5', id: 5, title: '关于举办"低空经济发展论坛"活动的通知', type: '活动通知', typeColor: '#722ed1', status: 'published', publishDate: '2026-04-18 11:20', effectiveDate: '2026-05-08', isTop: false, publisher: '行业发展促进中心' },
  { key: '6', id: 6, title: '西区航线临时调整通知', type: '空域通知', typeColor: '#f5222d', status: 'draft', publishDate: '', effectiveDate: '2026-05-15 ~ 2026-05-20', isTop: false, publisher: '空域管理办公室' }
];

const Component = function AdminNewsPage() {
  const [activeTab, setActiveTab] = useState('news');
  const [newsModalOpen, setNewsModalOpen] = useState(false);
  const [noticeModalOpen, setNoticeModalOpen] = useState(false);
  const [editNoticeOpen, setEditNoticeOpen] = useState(false);
  const [editNewsOpen, setEditNewsOpen] = useState(false);
  const [viewNewsOpen, setViewNewsOpen] = useState(false);
  const [viewNoticeOpen, setViewNoticeOpen] = useState(false);
  const [newsForm] = Form.useForm();
  const [noticeForm] = Form.useForm();
  const [editNoticeForm] = Form.useForm();
  const [editNewsForm] = Form.useForm();

  var handleNavigate = useCallback(function (key: string) {
    window.location.href = '/prototypes/' + key;
  }, []);

  var NEWS_COLUMNS = [
    { title: '序号', dataIndex: 'id', key: 'id', width: 60 },
    {
      title: '新闻标题', dataIndex: 'title', key: 'title', ellipsis: true,
      render: function (text: string) { return <span style={{ fontWeight: 500, color: '#1f1f1f' }}>{text}</span>; }
    },
    {
      title: '新闻分类', dataIndex: 'category', key: 'category', width: 100,
      render: function (text: string) { return <Tag color="blue">{text}</Tag>; }
    },
    { title: '作者', dataIndex: 'author', key: 'author', width: 80 },
    { title: '来源', dataIndex: 'source', key: 'source', width: 120, ellipsis: true },
    {
      title: '状态', dataIndex: 'status', key: 'status', width: 80,
      render: function (text: string) { return <Tag color={text === 'published' ? 'green' : 'orange'}>{text === 'published' ? '已发布' : '草稿'}</Tag>; }
    },
    { title: '浏览量', dataIndex: 'views', key: 'views', width: 80 },
    { title: '实施日期', dataIndex: 'effectDate', key: 'effectDate', width: 110 },
    {
      title: '是否置顶', dataIndex: 'isTop', key: 'isTop', width: 80,
      render: function (val: boolean) { return val ? <Tag color="red">是</Tag> : <Tag>否</Tag>; }
    },
    { title: '发布时间', dataIndex: 'publishDate', key: 'publishDate', width: 150 },
    {
      title: '操作', key: 'action', width: 160, fixed: 'right' as const,
      render: function (_: any, record: any) {
        var isDraft = record.status === 'draft';
        return (
          <Space size={8}>
            <Tooltip title="查看">
              <Button type="text" size="small" icon={<EyeOutlined />} style={{ color: '#1677ff' }} onClick={function () { setViewNewsOpen(true); }} />
            </Tooltip>
            {isDraft ? (
              <>
                <Tooltip title="编辑">
                  <Button type="text" size="small" icon={<EditOutlined />} style={{ color: '#fa8c16' }} onClick={function () { setEditNewsOpen(true); }} />
                </Tooltip>
                <Tooltip title="发布">
                  <Popconfirm title="确定发布该新闻？" icon={<ExclamationCircleOutlined />} onConfirm={function () { message.success('发布成功'); }}>
                    <Button type="text" size="small" icon={<SendOutlined />} style={{ color: '#52c41a' }} />
                  </Popconfirm>
                </Tooltip>
                <Tooltip title="删除">
                  <Popconfirm title="确定删除该新闻？" icon={<ExclamationCircleOutlined />} onConfirm={function () { message.success('删除成功'); }}>
                    <Button type="text" size="small" icon={<DeleteOutlined />} style={{ color: '#ff4d4f' }} />
                  </Popconfirm>
                </Tooltip>
              </>
            ) : (
              <Tooltip title="撤回">
                <Popconfirm title="确定撤回该新闻？撤回后变为草稿状态" icon={<ExclamationCircleOutlined />} onConfirm={function () { message.success('已撤回'); }}>
                  <Button type="text" size="small" icon={<UndoOutlined />} style={{ color: '#fa8c16' }} />
                </Popconfirm>
              </Tooltip>
            )}
          </Space>
        );
      }
    }
  ];

  var NOTICE_COLUMNS = [
    { title: '序号', dataIndex: 'id', key: 'id', width: 60 },
    {
      title: '公告标题', dataIndex: 'title', key: 'title', ellipsis: true,
      render: function (text: string) { return <span style={{ fontWeight: 500, color: '#1f1f1f' }}>{text}</span>; }
    },
    {
      title: '公告类型', dataIndex: 'type', key: 'type', width: 100,
      render: function (text: string, record: any) { return <Tag color={record.typeColor}>{text}</Tag>; }
    },
    { title: '发布单位', dataIndex: 'publisher', key: 'publisher', width: 120, ellipsis: true },
    {
      title: '状态', dataIndex: 'status', key: 'status', width: 80,
      render: function (text: string) { return <Tag color={text === 'published' ? 'green' : 'orange'}>{text === 'published' ? '已发布' : '草稿'}</Tag>; }
    },
    {
      title: '是否置顶', dataIndex: 'isTop', key: 'isTop', width: 80,
      render: function (val: boolean) { return val ? <Tag color="red">是</Tag> : <Tag>否</Tag>; }
    },
    { title: '发布时间', dataIndex: 'publishDate', key: 'publishDate', width: 150 },
    { title: '操作', key: 'action', width: 160, fixed: 'right' as const,
      render: function (_: any, record: any) {
        var isDraft = record.status === 'draft';
        return (
          <Space size={8}>
            <Tooltip title="查看">
              <Button type="text" size="small" icon={<EyeOutlined />} style={{ color: '#1677ff' }} onClick={function () { setViewNoticeOpen(true); }} />
            </Tooltip>
            {isDraft ? (
              <>
                <Tooltip title="编辑">
                  <Button type="text" size="small" icon={<EditOutlined />} style={{ color: '#fa8c16' }} onClick={function () { setEditNoticeOpen(true); }} />
                </Tooltip>
                <Tooltip title="发布">
                  <Popconfirm title="确定发布该公告？" icon={<ExclamationCircleOutlined />} onConfirm={function () { message.success('发布成功'); }}>
                    <Button type="text" size="small" icon={<SendOutlined />} style={{ color: '#52c41a' }} />
                  </Popconfirm>
                </Tooltip>
                <Tooltip title="删除">
                  <Popconfirm title="确定删除该公告？" icon={<ExclamationCircleOutlined />} onConfirm={function () { message.success('删除成功'); }}>
                    <Button type="text" size="small" icon={<DeleteOutlined />} style={{ color: '#ff4d4f' }} />
                  </Popconfirm>
                </Tooltip>
              </>
            ) : (
              <Tooltip title="撤回">
                <Popconfirm title="确定撤回该公告？撤回后变为草稿状态" icon={<ExclamationCircleOutlined />} onConfirm={function () { message.success('已撤回'); }}>
                  <Button type="text" size="small" icon={<UndoOutlined />} style={{ color: '#fa8c16' }} />
                </Popconfirm>
              </Tooltip>
            )}
          </Space>
        );
      }
    }
  ];

  return (
    <AdminLayout activeKey="admin-news">
      

      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '24px' }}>
        <Breadcrumb items={[
          { title: '资讯公告' }
        ]} style={{ marginBottom: 24 }} />

        <Card style={{ borderRadius: 12 }}>
          <Tabs
            activeKey={activeTab}
            onChange={setActiveTab}
            size="large"
            tabBarExtraContent={
              <Space>
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={function () {
                    if (activeTab === 'news') {
                      newsForm.resetFields();
                      setNewsModalOpen(true);
                    } else {
                      noticeForm.resetFields();
                      setNoticeModalOpen(true);
                    }
                  }}
                >
                  {activeTab === 'news' ? '新建新闻' : '新建公告'}
                </Button>
              </Space>
            }
            items={[
              {
                key: 'news',
                label: <span><FileTextOutlined style={{ marginRight: 6 }} /> 新闻资讯管理</span>,
                children: (
                  <div>
                    <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
                      <Input size="middle" prefix={<SearchOutlined />} placeholder="搜索新闻标题..." style={{ width: 280 }} allowClear />
                      <Select size="middle" placeholder="分类筛选" style={{ width: 140 }} options={NEWS_CATEGORIES} allowClear />
                      <Select size="middle" placeholder="状态筛选" style={{ width: 120 }} options={[{ value: 'published', label: '已发布' }, { value: 'draft', label: '草稿' }]} allowClear />
                      <Button size="middle" type="primary" icon={<SearchOutlined />}>查询</Button>
                      <Button size="middle">重置</Button>
                    </div>
                    <Table columns={NEWS_COLUMNS} dataSource={NEWS_DATA} pagination={{ pageSize: 10, total: NEWS_DATA.length }} />
                  </div>
                )
              },
              {
                key: 'notice',
                label: <span><BellOutlined style={{ marginRight: 6 }} /> 通知公告管理</span>,
                children: (
                  <div>
                    <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
                      <Input prefix={<SearchOutlined />} placeholder="搜索公告标题..." style={{ width: 280 }} allowClear />
                      <Select placeholder="类型筛选" style={{ width: 140 }} options={NOTICE_TYPES} allowClear />
                      <Select placeholder="状态筛选" style={{ width: 120 }} options={[{ value: 'published', label: '已发布' }, { value: 'draft', label: '草稿' }]} allowClear />
                      <Button type="primary" icon={<SearchOutlined />}>查询</Button>
                      <Button>重置</Button>
                    </div>
                    <Table columns={NOTICE_COLUMNS} dataSource={NOTICE_DATA} pagination={{ pageSize: 10, total: NOTICE_DATA.length }} />
                  </div>
                )
              }
            ]}
          />
        </Card>
      </div>

      <Modal
        title="新建新闻"
        open={newsModalOpen}
        onCancel={function () { setNewsModalOpen(false); }}
        width={720}
        footer={[
          <Button key="cancel" onClick={function () { setNewsModalOpen(false); }}>关闭</Button>,
          <Button key="draft" onClick={function () { message.success('已保存为草稿'); setNewsModalOpen(false); }}>保存草稿</Button>,
          <Button key="preview" onClick={function () { handleNavigate('news-detail'); }}>预览</Button>,
          <Button key="publish" type="primary" onClick={function () { message.success('新闻发布成功'); setNewsModalOpen(false); }}>确认发布</Button>
        ]}
      >
        <Form form={newsForm} layout="vertical" style={{ marginTop: 16 }}>
          <Row gutter={16}>
            <Col span={16}>
              <Form.Item name="title" label="新闻标题" rules={[{ required: true, message: '请输入新闻标题' }]}>
                <Input placeholder="请输入新闻标题" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="category" label="新闻分类" rules={[{ required: true, message: '请选择分类' }]}>
                <Select placeholder="请选择分类" options={NEWS_CATEGORIES} />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item name="author" label="作者">
            <Input placeholder="请输入作者" />
          </Form.Item>
          <Form.Item name="source" label="来源">
            <Input placeholder="请输入新闻来源" />
          </Form.Item>
          <Form.Item name="effectDate" label="实施日期">
            <DatePicker placeholder="请选择实施日期" style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name="summary" label="摘要">
            <Input.TextArea rows={2} placeholder="请输入新闻摘要" />
          </Form.Item>
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
              <Input.TextArea rows={8} placeholder="请输入新闻正文内容..." bordered={false} style={{ padding: 12 }} />
            </div>
          </Form.Item>
          <Form.Item name="isTop" label="是否置顶" valuePropName="checked">
            <Switch checkedChildren="是" unCheckedChildren="否" />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="编辑新闻"
        open={editNewsOpen}
        onCancel={function () { setEditNewsOpen(false); }}
        afterOpenChange={function (open: boolean) { if (open) { editNewsForm.setFieldsValue({ title: '低空经济产业联盟正式成立', category: 'industry', author: '编辑部', source: '国家发展和改革委员会', summary: '为推动低空经济产业链上下游协同发展，由多家龙头企业联合发起的低空经济产业联盟于今日正式成立。', content: '为推动低空经济产业链上下游协同发展，由多家龙头企业联合发起的低空经济产业联盟于今日正式成立。\n\n一、联盟背景\n随着低空经济政策的不断推进，产业链上下游协同需求日益凸显。联盟的成立旨在搭建资源共享、技术交流、标准制定的平台。\n\n二、联盟成员\n首批联盟成员包括无人机制造商、飞行服务商、空域管理技术企业等30余家单位。\n\n三、重点工作\n1. 制定行业技术标准；\n2. 推动空域资源共享机制；\n3. 建立行业自律公约；\n4. 开展国际交流合作。' }); } }}
        width={720}
        footer={[
          <Button key="cancel" onClick={function () { setEditNewsOpen(false); }}>关闭</Button>,
          <Button key="preview" onClick={function () { handleNavigate('news-detail'); }}>预览</Button>,
          <Button key="save" type="primary" onClick={function () { message.success('保存成功'); setEditNewsOpen(false); }}>确认</Button>
        ]}
      >
        <Form form={editNewsForm} layout="vertical" style={{ marginTop: 16 }}>
          <Row gutter={16}>
            <Col span={16}>
              <Form.Item name="title" label="新闻标题" rules={[{ required: true, message: '请输入新闻标题' }]}>
                <Input placeholder="请输入新闻标题" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="category" label="新闻分类" rules={[{ required: true, message: '请选择分类' }]}>
                <Select placeholder="请选择分类" options={NEWS_CATEGORIES} />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item name="author" label="作者">
            <Input placeholder="请输入作者" />
          </Form.Item>
          <Form.Item name="source" label="来源">
            <Input placeholder="请输入新闻来源" />
          </Form.Item>
          <Form.Item name="effectDate" label="实施日期">
            <DatePicker placeholder="请选择实施日期" style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name="summary" label="摘要">
            <Input.TextArea rows={2} placeholder="请输入新闻摘要" />
          </Form.Item>
          <Form.Item name="content" label="正文内容" rules={[{ required: true, message: '请输入正文内容' }]}>
            <Input.TextArea rows={8} placeholder="请输入新闻正文内容..." />
          </Form.Item>
          <Form.Item name="isTop" label="是否置顶" valuePropName="checked">
            <Switch checkedChildren="是" unCheckedChildren="否" />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="新建通知公告"
        open={noticeModalOpen}
        onCancel={function () { setNoticeModalOpen(false); }}
        width={720}
        footer={[
          <Button key="cancel" onClick={function () { setNoticeModalOpen(false); }}>关闭</Button>,
          <Button key="draft" onClick={function () { message.success('已保存为草稿'); setNoticeModalOpen(false); }}>保存草稿</Button>,
          <Button key="preview" onClick={function () { handleNavigate('notice-detail'); }}>预览</Button>,
          <Button key="publish" type="primary" onClick={function () { message.success('公告发布成功'); setNoticeModalOpen(false); }}>确认发布</Button>
        ]}
      >
        <Form form={noticeForm} layout="vertical" style={{ marginTop: 16 }}>
          <Row gutter={16}>
            <Col span={16}>
              <Form.Item name="title" label="公告标题" rules={[{ required: true, message: '请输入公告标题' }]}>
                <Input placeholder="请输入公告标题" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="type" label="公告类型" rules={[{ required: true, message: '请选择类型' }]}>
                <Select placeholder="请选择类型" options={NOTICE_TYPES} />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item name="publisher" label="发布单位">
            <Input placeholder="请输入发布单位" />
          </Form.Item>
          <Form.Item name="content" label="公告正文" rules={[{ required: true, message: '请输入公告正文' }]}>
            <Input.TextArea rows={8} placeholder="请输入公告正文内容..." />
          </Form.Item>
          <Form.Item name="isTop" label="是否置顶" valuePropName="checked">
            <Switch checkedChildren="是" unCheckedChildren="否" />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="查看新闻"
        open={viewNewsOpen}
        onCancel={function () { setViewNewsOpen(false); }}
        width={720}
        footer={<Space><Button onClick={function () { setViewNewsOpen(false); }}>关闭</Button><Button type="primary" onClick={function () { setViewNewsOpen(false); handleNavigate('news-detail'); }}>预览</Button></Space>}
      >
        <Descriptions column={2} bordered style={{ marginTop: 16 }}>
          <Descriptions.Item label="新闻标题" span={2}>低空经济示范区建设方案正式发布</Descriptions.Item>
          <Descriptions.Item label="新闻分类"><Tag color="blue">行业新闻</Tag></Descriptions.Item>
          <Descriptions.Item label="作者">编辑部</Descriptions.Item>
          <Descriptions.Item label="来源">国家发展和改革委员会</Descriptions.Item>
          <Descriptions.Item label="状态"><Tag color="green">已发布</Tag></Descriptions.Item>
          <Descriptions.Item label="浏览量">1280</Descriptions.Item>
          <Descriptions.Item label="发布时间">2026-04-20 09:30</Descriptions.Item>
          <Descriptions.Item label="实施日期">2026-05-01</Descriptions.Item>
          <Descriptions.Item label="是否置顶"><Tag color="red">是</Tag></Descriptions.Item>
          <Descriptions.Item label="摘要" span={2}>为加快推进低空经济高质量发展，经国务院同意，现印发《低空经济示范区建设方案》。方案明确了未来三年低空经济示范区建设的总体目标、重点任务和保障措施。</Descriptions.Item>
          <Descriptions.Item label="正文内容" span={2}>
            <div style={{ lineHeight: 1.8, color: '#333', fontSize: 14 }}>
              <p>为加快推进低空经济高质量发展，经国务院同意，现印发《低空经济示范区建设方案》（以下简称《方案》）。</p>
              <p><strong>一、总体目标</strong></p>
              <p>到2028年，在全国范围内建设20个低空经济示范区，形成可复制、可推广的发展模式和制度创新成果。</p>
              <p><strong>二、重点任务</strong></p>
              <p>（一）基础设施体系建设。（二）空域管理与保障。（三）产业生态培育。（四）安全监管体系。</p>
            </div>
          </Descriptions.Item>
        </Descriptions>
      </Modal>

      <Modal
        title="编辑通知公告"
        open={editNoticeOpen}
        onCancel={function () { setEditNoticeOpen(false); }}
        afterOpenChange={function (open: boolean) { if (open) { editNoticeForm.setFieldsValue({ title: '西区航线临时调整通知', type: 'airspace', publisher: '空域管理办公室', isTop: false, content: '因西区航线维修施工需要，自2026年5月15日起至2026年5月20日止，对西区W3航线进行临时调整。具体调整方案如下：\n\n一、调整范围\n西区W3航线（A3至A5航段），全长12.5公里。\n\n二、替代航线\n临时启用W3-B备用航线，航线高度不变，飞行时间预计增加3-5分钟。\n\n三、注意事项\n1. 请各飞行单位提前调整飞行计划；\n2. 临时调整期间，原W3航线严禁任何飞行器进入；\n3. 如有疑问请联系空域管理办公室。' }); } }}
        width={720}
        footer={[
          <Button key="cancel" onClick={function () { setEditNoticeOpen(false); }}>关闭</Button>,
          <Button key="preview" onClick={function () { handleNavigate('notice-detail'); }}>预览</Button>,
          <Button key="save" type="primary" onClick={function () { message.success('保存成功'); setEditNoticeOpen(false); }}>确认</Button>
        ]}
      >
        <Form form={editNoticeForm} layout="vertical" style={{ marginTop: 16 }}>
          <Row gutter={16}>
            <Col span={16}>
              <Form.Item name="title" label="公告标题" rules={[{ required: true, message: '请输入公告标题' }]}>
                <Input placeholder="请输入公告标题" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="type" label="公告类型" rules={[{ required: true, message: '请选择类型' }]}>
                <Select placeholder="请选择类型" options={NOTICE_TYPES} />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item name="publisher" label="发布单位">
            <Input placeholder="请输入发布单位" />
          </Form.Item>
          <Form.Item name="content" label="公告正文" rules={[{ required: true, message: '请输入公告正文' }]}>
            <Input.TextArea rows={8} placeholder="请输入公告正文内容..." />
          </Form.Item>
          <Form.Item name="isTop" label="是否置顶" valuePropName="checked">
            <Switch checkedChildren="是" unCheckedChildren="否" />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="查看公告"
        open={viewNoticeOpen}
        onCancel={function () { setViewNoticeOpen(false); }}
        width={720}
        footer={<Space><Button onClick={function () { setViewNoticeOpen(false); }}>关闭</Button><Button type="primary" onClick={function () { setViewNoticeOpen(false); handleNavigate('notice-detail'); }}>预览</Button></Space>}
      >
        <Descriptions column={2} bordered style={{ marginTop: 16 }}>
          <Descriptions.Item label="公告标题" span={2}>【气象预警】明日午后有雷暴天气，请合理安排飞行计划</Descriptions.Item>
          <Descriptions.Item label="公告类型"><Tag color="#fa8c16">气象预警</Tag></Descriptions.Item>
          <Descriptions.Item label="发布单位">低空空管服务中心</Descriptions.Item>
          <Descriptions.Item label="状态"><Tag color="green">已发布</Tag></Descriptions.Item>
          <Descriptions.Item label="是否置顶"><Tag color="red">是</Tag></Descriptions.Item>
          <Descriptions.Item label="发布时间">2026-04-21 10:00</Descriptions.Item>
          <Descriptions.Item label="公告正文" span={2}>
            <div style={{ lineHeight: 1.8, color: '#333', fontSize: 14 }}>
              <p>据市气象台2026年4月21日16时发布的强对流天气预报，预计明日（4月22日）午后至傍晚时段，我市自西向东将出现一次强对流天气过程。</p>
              <p><strong>一、天气预警信息</strong></p>
              <p>预警类型：雷暴橙色预警。影响区域：全市低空空域。预计风力：阵风7-8级。</p>
              <p><strong>二、管控措施</strong></p>
              <p>管控时段：2026年4月22日14:00至20:00。管控范围：全市所有低空空域。</p>
            </div>
          </Descriptions.Item>
        </Descriptions>
      </Modal>
    </AdminLayout>
  );
};

export default Component;
