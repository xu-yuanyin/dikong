/**
 * @name 首页轮播管理
 * @mode axure
 * /Users/xu/Desktop/元引信息/Axhub-Make-main/skills/axure-export-workflow/SKILL.md
 *
 */

import './style.css';

import React, { useState, useCallback } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { Card, Table, Tag, Button, Breadcrumb, Space, Modal, Form, Input, Select, Switch, message, Popconfirm, Tooltip, Descriptions, Upload, InputNumber, Row, Col } from 'antd';
import { HomeOutlined, PlusOutlined, EditOutlined, DeleteOutlined, EyeOutlined, SearchOutlined, UploadOutlined, ArrowUpOutlined, ArrowDownOutlined, ExclamationCircleOutlined, PictureOutlined, LinkOutlined } from '@ant-design/icons';

var STATUS_OPTIONS = [
  { value: 'enabled', label: '已启用' },
  { value: 'disabled', label: '已禁用' }
];

var CONTENT_TYPE_OPTIONS = [
  { value: 'news', label: '新闻资讯' },
  { value: 'notice', label: '通知公告' },
  { value: 'national-policy', label: '国家政策' },
  { value: 'local-policy', label: '本地政策' },
  { value: 'policy-interpret', label: '政策解读' },
  { value: 'standard', label: '规范标准' },
  { value: 'service', label: '低空服务' },
  { value: 'product', label: '商城商品' },
  { value: 'airspace', label: '空域信息' },
  { value: 'temp-control', label: '临时管制通知' }
];

var CONTENT_OPTIONS_MAP: Record<string, { value: string; label: string }[]> = {
  'news': [
    { value: 'news-1', label: '全国首条城市低空物流航线开通运营' },
    { value: 'news-2', label: '无人机驾驶员培训标准体系升级' },
    { value: 'news-3', label: '新型eVTOL完成适航审定首飞' },
    { value: 'news-4', label: '低空经济示范区建设方案正式发布' }
  ],
  'notice': [
    { value: 'notice-1', label: '关于开展低空空域使用申请的通知' },
    { value: 'notice-2', label: '2026年度无人机驾驶员考试安排' },
    { value: 'notice-3', label: '低空飞行安全管理规范征求意见' }
  ],
  'national-policy': [
    { value: 'np-1', label: '无人驾驶航空器飞行管理暂行条例' },
    { value: 'np-2', label: '关于促进低空经济发展的指导意见' },
    { value: 'np-3', label: '低空空域分类划设标准' }
  ],
  'local-policy': [
    { value: 'lp-1', label: 'XX市低空经济产业发展规划' },
    { value: 'lp-2', label: 'XX市无人机飞行管理办法' },
    { value: 'lp-3', label: 'XX市低空空域使用管理办法' }
  ],
  'policy-interpret': [
    { value: 'pi-1', label: '《无人驾驶航空器飞行管理暂行条例》解读' },
    { value: 'pi-2', label: '《低空空域分类划设标准》政策解读' }
  ],
  'standard': [
    { value: 'std-1', label: '无人机系统分类与分级标准' },
    { value: 'std-2', label: '低空通信导航监视技术规范' },
    { value: 'std-3', label: '无人机起降场建设技术标准' }
  ],
  'service': [
    { value: 'svc-1', label: '飞行计划申请服务' },
    { value: 'svc-2', label: '空域信息查询服务' },
    { value: 'svc-3', label: '气象信息服务' },
    { value: 'svc-4', label: '飞行器备案服务' }
  ],
  'product': [
    { value: 'prod-1', label: '大疆经纬 M350 RTK' },
    { value: 'prod-2', label: '亿航EH216-S载人无人机' },
    { value: 'prod-3', label: '峰飞V2000CG载物eVTOL' }
  ],
  'airspace': [
    { value: 'air-1', label: 'XX市主城区低空空域' },
    { value: 'air-2', label: 'XX高新区试飞空域' },
    { value: 'air-3', label: 'XX物流航线专用空域' }
  ],
  'temp-control': [
    { value: 'tc-1', label: 'XX区域临时管制通知（2026年5月）' },
    { value: 'tc-2', label: '重大活动期间空域管制通知' }
  ]
};

var CONTENT_TYPE_LABEL_MAP: Record<string, string> = {};
CONTENT_TYPE_OPTIONS.forEach(function (item) { CONTENT_TYPE_LABEL_MAP[item.value] = item.label; });

var CAROUSEL_DATA = [
  { key: '1', id: 1, title: '低空经济示范区建设方案正式发布', image: 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="400" height="160"><rect width="400" height="160" fill="#0c4a6e"/><text x="200" y="85" text-anchor="middle" fill="white" font-size="18" font-family="sans-serif">低空经济示范区建设方案</text></svg>'), contentType: 'national-policy', contentId: 'np-2', contentLabel: '关于促进低空经济发展的指导意见', enabled: true, sort: 1, createTime: '2026-04-18 09:00' },
  { key: '2', id: 2, title: '全国首条城市低空物流航线开通运营', image: 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="400" height="160"><rect width="400" height="160" fill="#1e40af"/><text x="200" y="85" text-anchor="middle" fill="white" font-size="18" font-family="sans-serif">低空物流航线开通</text></svg>'), contentType: 'news', contentId: 'news-1', contentLabel: '全国首条城市低空物流航线开通运营', enabled: true, sort: 2, createTime: '2026-04-17 14:30' },
  { key: '3', id: 3, title: '无人机驾驶员培训标准体系升级', image: 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="400" height="160"><rect width="400" height="160" fill="#7c3aed"/><text x="200" y="85" text-anchor="middle" fill="white" font-size="18" font-family="sans-serif">培训标准体系升级</text></svg>'), contentType: 'standard', contentId: 'std-1', contentLabel: '无人机系统分类与分级标准', enabled: true, sort: 3, createTime: '2026-04-16 10:15' },
  { key: '4', id: 4, title: '新型eVTOL完成适航审定首飞', image: 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="400" height="160"><rect width="400" height="160" fill="#059669"/><text x="200" y="85" text-anchor="middle" fill="white" font-size="18" font-family="sans-serif">eVTOL适航审定首飞</text></svg>'), contentType: 'product', contentId: 'prod-2', contentLabel: '亿航EH216-S载人无人机', enabled: false, sort: 4, createTime: '2026-04-15 16:00' },
  { key: '5', id: 5, title: '低空空域安全管控系统上线', image: 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="400" height="160"><rect width="400" height="160" fill="#dc2626"/><text x="200" y="85" text-anchor="middle" fill="white" font-size="18" font-family="sans-serif">空域安全管控系统</text></svg>'), contentType: 'service', contentId: 'svc-2', contentLabel: '空域信息查询服务', enabled: true, sort: 5, createTime: '2026-04-14 11:20' },
  { key: '6', id: 6, title: '低空商城春季促销活动', image: 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="400" height="160"><rect width="400" height="160" fill="#d97706"/><text x="200" y="85" text-anchor="middle" fill="white" font-size="18" font-family="sans-serif">商城春季促销</text></svg>'), contentType: 'product', contentId: 'prod-1', contentLabel: '大疆经纬 M350 RTK', enabled: true, sort: 6, createTime: '2026-04-13 08:45' }
];



var CONTENT_TYPE_COLOR_MAP: Record<string, string> = {
  'news': 'blue',
  'notice': 'orange',
  'national-policy': 'red',
  'local-policy': 'volcano',
  'policy-interpret': 'purple',
  'standard': 'cyan',
  'service': 'green',
  'product': 'gold',
  'airspace': 'geekblue',
  'temp-control': 'magenta'
};

var Component = function AdminCarouselPage() {
  var [addOpen, setAddOpen] = useState(false);
  var [editOpen, setEditOpen] = useState(false);
  var [viewOpen, setViewOpen] = useState(false);
  var [currentRecord, setCurrentRecord] = useState<typeof CAROUSEL_DATA[0] | null>(null);
  var [addForm] = Form.useForm();
  var [editForm] = Form.useForm();
  var [searchText, setSearchText] = useState('');
  var [filterStatus, setFilterStatus] = useState<string | undefined>(undefined);
  var [addContentType, setAddContentType] = useState<string | undefined>(undefined);
  var [editContentType, setEditContentType] = useState<string | undefined>(undefined);

  var handleNavigate = useCallback(function (key: string) {
    window.location.href = '/prototypes/' + key;
  }, []);

  var filteredData = CAROUSEL_DATA.filter(function (item) {
    var matchSearch = !searchText || item.title.includes(searchText);
    var matchStatus = !filterStatus || (filterStatus === 'enabled' ? item.enabled : !item.enabled);
    return matchSearch && matchStatus;
  });

  var handleView = function (record: typeof CAROUSEL_DATA[0]) {
    setCurrentRecord(record);
    setViewOpen(true);
  };

  var handleEdit = function (record: typeof CAROUSEL_DATA[0]) {
    setCurrentRecord(record);
    setEditContentType(record.contentType);
    editForm.setFieldsValue({
      title: record.title,
      contentType: record.contentType,
      contentId: record.contentId,
      enabled: record.enabled,
      sort: record.sort
    });
    setEditOpen(true);
  };

  var handleAdd = function () {
    addForm.resetFields();
    setAddContentType(undefined);
    setAddOpen(true);
  };

  var handleToggleEnabled = function (record: typeof CAROUSEL_DATA[0]) {
    var action = record.enabled ? '禁用' : '启用';
    message.success('已' + action + '轮播：' + record.title);
  };

  var handleMoveUp = function (record: typeof CAROUSEL_DATA[0]) {
    message.success('已上移：' + record.title);
  };

  var handleMoveDown = function (record: typeof CAROUSEL_DATA[0]) {
    message.success('已下移：' + record.title);
  };

  var columns = [
    {
      title: '序号', key: 'index', width: 60,
      render: function (_: any, __: any, index: number) { return index + 1; }
    },
    { title: '轮播标题', dataIndex: 'title', key: 'title', ellipsis: true, width: 200 },
    {
      title: '轮播图片', dataIndex: 'image', key: 'image', width: 160,
      render: function (val: string) {
        return <img src={val} alt="轮播图" style={{ width: 140, height: 56, objectFit: 'cover', borderRadius: 4 }} />;
      }
    },
    {
      title: '关联内容类型', dataIndex: 'contentType', key: 'contentType', width: 130,
      render: function (val: string) {
        var color = CONTENT_TYPE_COLOR_MAP[val] || 'blue';
        return <Tag color={color}>{CONTENT_TYPE_LABEL_MAP[val] || val}</Tag>;
      }
    },
    {
      title: '关联内容', dataIndex: 'contentLabel', key: 'contentLabel', width: 200, ellipsis: true
    },
    {
      title: '排序优先级', dataIndex: 'sort', key: 'sort', width: 100,
      sorter: function (a: typeof CAROUSEL_DATA[0], b: typeof CAROUSEL_DATA[0]) { return a.sort - b.sort; }
    },
    {
      title: '是否启用', dataIndex: 'enabled', key: 'enabled', width: 90,
      render: function (val: boolean) { return val ? <Tag color="green">已启用</Tag> : <Tag color="default">已禁用</Tag>; }
    },
    { title: '创建时间', dataIndex: 'createTime', key: 'createTime', width: 150 },
    {
      title: '操作', key: 'action', width: 240, fixed: 'right' as const,
      render: function (_: any, record: typeof CAROUSEL_DATA[0]) {
        return (
          <Space size={4}>
            <Tooltip title="查看">
              <Button type="text" size="small" icon={<EyeOutlined />} style={{ color: '#1677ff' }} onClick={function () { handleView(record); }} />
            </Tooltip>
            <Tooltip title="编辑">
              <Button type="text" size="small" icon={<EditOutlined />} style={{ color: '#fa8c16' }} onClick={function () { handleEdit(record); }} />
            </Tooltip>
            <Tooltip title={record.enabled ? '禁用' : '启用'}>
              <Popconfirm title={'确定' + (record.enabled ? '禁用' : '启用') + '该轮播？'} icon={<ExclamationCircleOutlined />} onConfirm={function () { handleToggleEnabled(record); }}>
                <Button type="text" size="small" icon={<Switch checked={record.enabled} size="small" />} style={{ color: record.enabled ? '#52c41a' : '#8c8c8c' }} />
              </Popconfirm>
            </Tooltip>
            <Tooltip title="上移">
              <Button type="text" size="small" icon={<ArrowUpOutlined />} style={{ color: '#1677ff' }} onClick={function () { handleMoveUp(record); }} />
            </Tooltip>
            <Tooltip title="下移">
              <Button type="text" size="small" icon={<ArrowDownOutlined />} style={{ color: '#1677ff' }} onClick={function () { handleMoveDown(record); }} />
            </Tooltip>
            <Tooltip title="删除">
              <Popconfirm title="确定删除该轮播？" icon={<ExclamationCircleOutlined />} onConfirm={function () { message.success('删除成功'); }}>
                <Button type="text" size="small" icon={<DeleteOutlined />} style={{ color: '#ff4d4f' }} />
              </Popconfirm>
            </Tooltip>
          </Space>
        );
      }
    }
  ];

  return (
    <AdminLayout activeKey="admin-carousel">
      

      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '24px 24px 48px' }}>
        <Breadcrumb items={[
          { title: <a onClick={function () { handleNavigate('home'); }}><HomeOutlined /> 首页</a> },
          { title: '轮播管理' }
        ]} style={{ marginBottom: 24 }} />

        <Card style={{ borderRadius: 12 }}>
          <div style={{ display: 'flex', gap: 12, marginBottom: 16, flexWrap: 'wrap', alignItems: 'center' }}>
            <Input prefix={<SearchOutlined />} placeholder="搜索轮播标题" style={{ width: 240 }} allowClear value={searchText} onChange={function (e) { setSearchText(e.target.value); }} />
            <Select placeholder="状态" style={{ width: 120 }} options={STATUS_OPTIONS} allowClear value={filterStatus} onChange={function (v) { setFilterStatus(v); }} />
            <Button type="primary" icon={<SearchOutlined />}>查询</Button>
            <Button onClick={function () { setSearchText(''); setFilterStatus(undefined); }}>重置</Button>
            <div style={{ flex: 1 }} />
            <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>新增轮播</Button>
          </div>

          <Table columns={columns} dataSource={filteredData} pagination={{ pageSize: 10 }} size="middle" scroll={{ x: 1200 }} />
        </Card>
      </div>

      <Modal
        title="新增轮播"
        open={addOpen}
        onCancel={function () { setAddOpen(false); }}
        width={720}
        footer={[
          <Button key="cancel" onClick={function () { setAddOpen(false); }}>关闭</Button>,
          <Button key="save" type="primary" onClick={function () { message.success('轮播创建成功'); setAddOpen(false); }}>确认</Button>
        ]}
      >
        <Form form={addForm} layout="vertical" style={{ marginTop: 16 }}>
          <Form.Item name="title" label="轮播标题" rules={[{ required: true, message: '请输入轮播标题' }]}>
            <Input placeholder="请输入轮播标题" />
          </Form.Item>
          <Form.Item name="image" label="轮播图片" rules={[{ required: true, message: '请上传轮播图片' }]} valuePropName="fileList" getValueFromEvent={function (e) { if (Array.isArray(e)) { return e; } return e && e.fileList; }}>
            <Upload listType="picture-card" beforeUpload={function () { return false; }} maxCount={1} accept="image/*">
              <div><UploadOutlined style={{ fontSize: 20 }} /><div style={{ marginTop: 4, fontSize: 12 }}>上传图片</div></div>
            </Upload>
          </Form.Item>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="contentType" label="关联内容类型" rules={[{ required: true, message: '请选择关联内容类型' }]}>
                <Select placeholder="请先选择内容类型" options={CONTENT_TYPE_OPTIONS} onChange={function (val) { setAddContentType(val); addForm.setFieldValue('contentId', undefined); }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="contentId" label="关联内容" rules={[{ required: true, message: '请选择关联内容' }]}>
                <Select placeholder={addContentType ? '请选择关联内容' : '请先选择内容类型'} options={addContentType ? CONTENT_OPTIONS_MAP[addContentType] || [] : []} disabled={!addContentType} showSearch optionFilterProp="label" notFoundContent="暂无内容" />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item name="sort" label="排序优先级" rules={[{ required: true, message: '请输入排序优先级' }]}>
            <InputNumber min={1} max={99} placeholder="数字越小越靠前" style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name="enabled" label="是否启用" valuePropName="checked" initialValue={true}>
            <Switch checkedChildren="启用" unCheckedChildren="禁用" />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="编辑轮播"
        open={editOpen}
        onCancel={function () { setEditOpen(false); }}
        width={720}
        footer={[
          <Button key="cancel" onClick={function () { setEditOpen(false); }}>关闭</Button>,
          <Button key="save" type="primary" onClick={function () { message.success('保存成功'); setEditOpen(false); }}>确认</Button>
        ]}
      >
        <Form form={editForm} layout="vertical" style={{ marginTop: 16 }}>
          <Form.Item name="title" label="轮播标题" rules={[{ required: true, message: '请输入轮播标题' }]}>
            <Input placeholder="请输入轮播标题" />
          </Form.Item>
          <Form.Item name="image" label="轮播图片" rules={[{ required: true, message: '请上传轮播图片' }]} valuePropName="fileList" getValueFromEvent={function (e) { if (Array.isArray(e)) { return e; } return e && e.fileList; }}>
            <Upload listType="picture-card" beforeUpload={function () { return false; }} maxCount={1} accept="image/*" defaultFileList={currentRecord ? [{ uid: '-1', name: 'carousel.jpg', status: 'done', url: currentRecord.image }] : []}>
              <div><UploadOutlined style={{ fontSize: 20 }} /><div style={{ marginTop: 4, fontSize: 12 }}>上传图片</div></div>
            </Upload>
          </Form.Item>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="contentType" label="关联内容类型" rules={[{ required: true, message: '请选择关联内容类型' }]}>
                <Select placeholder="请先选择内容类型" options={CONTENT_TYPE_OPTIONS} onChange={function (val) { setEditContentType(val); editForm.setFieldValue('contentId', undefined); }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="contentId" label="关联内容" rules={[{ required: true, message: '请选择关联内容' }]}>
                <Select placeholder={editContentType ? '请选择关联内容' : '请先选择内容类型'} options={editContentType ? CONTENT_OPTIONS_MAP[editContentType] || [] : []} disabled={!editContentType} showSearch optionFilterProp="label" notFoundContent="暂无内容" />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item name="sort" label="排序优先级" rules={[{ required: true, message: '请输入排序优先级' }]}>
            <InputNumber min={1} max={99} placeholder="数字越小越靠前" style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name="enabled" label="是否启用" valuePropName="checked">
            <Switch checkedChildren="启用" unCheckedChildren="禁用" />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="轮播详情"
        open={viewOpen}
        onCancel={function () { setViewOpen(false); }}
        width={720}
        footer={<Button onClick={function () { setViewOpen(false); }}>关闭</Button>}
      >
        {currentRecord && (
          <div style={{ marginTop: 16 }}>
            <Descriptions column={2} bordered>
              <Descriptions.Item label="轮播标题" span={2}>{currentRecord.title}</Descriptions.Item>
              <Descriptions.Item label="轮播图片" span={2}>
                <img src={currentRecord.image} alt="轮播图" style={{ width: '100%', height: 200, objectFit: 'cover', borderRadius: 8 }} />
              </Descriptions.Item>
              <Descriptions.Item label="关联内容类型">
                <Tag color={CONTENT_TYPE_COLOR_MAP[currentRecord.contentType] || 'blue'}>{CONTENT_TYPE_LABEL_MAP[currentRecord.contentType] || currentRecord.contentType}</Tag>
              </Descriptions.Item>
              <Descriptions.Item label="关联内容">
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><LinkOutlined style={{ color: '#1677ff' }} />{currentRecord.contentLabel}</span>
              </Descriptions.Item>
              <Descriptions.Item label="排序优先级">{currentRecord.sort}</Descriptions.Item>
              <Descriptions.Item label="是否启用">{currentRecord.enabled ? <Tag color="green">已启用</Tag> : <Tag color="default">已禁用</Tag>}</Descriptions.Item>
            </Descriptions>
          </div>
        )}
      </Modal>
    </AdminLayout>
  );
};

export default Component;
