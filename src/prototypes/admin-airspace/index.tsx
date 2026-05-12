/**
 * @name 空域管理
 * @mode axure
 * /Users/xu/Desktop/元引信息/Axhub-Make-main/skills/axure-export-workflow/SKILL.md
 *
 */

import './style.css';

import React, { useState, useCallback } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { Card, Table, Tag, Button, Breadcrumb, Space, Modal, Form, Input, Select, message, Popconfirm, Tooltip, Descriptions, Row, Col, Tabs, Divider, Badge } from 'antd';
import { SettingOutlined, PlusOutlined, EyeOutlined, EditOutlined, DeleteOutlined, SearchOutlined, EnvironmentOutlined, WarningOutlined, CarOutlined, FileTextOutlined, InboxOutlined, SafetyCertificateOutlined, SendOutlined, UndoOutlined, ExclamationCircleOutlined } from '@ant-design/icons';



var ZONE_TYPE_OPTIONS = [
  { value: 'training', label: '训练空域' },
  { value: 'logistics', label: '物流航线' },
  { value: 'forbidden', label: '禁飞区' },
  { value: 'test', label: '试飞空域' },
  { value: 'inspection', label: '巡检航线' },
  { value: 'restricted', label: '限飞区' },
  { value: 'sightseeing', label: '观光航线' }
];

var ZONE_TYPE_COLOR: Record<string, string> = {
  training: '#52c41a',
  logistics: '#1677ff',
  forbidden: '#ff4d4f',
  test: '#722ed1',
  inspection: '#13c2c2',
  restricted: '#fa8c16',
  sightseeing: '#eb2f96'
};

var ZONE_STATUS_MAP: Record<string, { text: string; color: string }> = {
  open: { text: '开放', color: 'green' },
  forbidden: { text: '禁飞', color: 'red' },
  restricted: { text: '限制', color: 'orange' },
  closed: { text: '关闭', color: 'default' }
};

var NOTICE_TYPE_OPTIONS = [
  { value: 'route_adjust', label: '航线调整' },
  { value: 'zone_close', label: '空域关闭' },
  { value: 'temp_control', label: '临时管制' }
];

var NOTICE_STATUS_MAP: Record<string, { text: string; color: string }> = {
  active: { text: '生效中', color: 'red' },
  upcoming: { text: '即将生效', color: 'orange' },
  preview: { text: '预告', color: 'blue' },
  expired: { text: '已过期', color: 'default' }
};

var TAKEOFF_TYPE_OPTIONS = [
  { value: 'hardground', label: '硬化地面' },
  { value: 'grass', label: '草坪场地' },
  { value: 'rooftop', label: '楼顶平台' }
];

var TAKEOFF_STATUS_OPTIONS = [
  { value: 'available', label: '可用' },
  { value: 'reserved', label: '预约中' },
  { value: 'maintenance', label: '维护中' },
  { value: 'closed', label: '已关闭' }
];

var ZONE_DATA = [
  { key: '1', id: 1, name: '城北训练区', type: 'training', typeLabel: '训练空域', status: 'open', altitude: '0-120m', time: '06:00-20:00', area: '3.2km²', desc: '适用于多旋翼、固定翼基础训练飞行', manager: '空域管理办公室', managerPhone: '0571-88888010' },
  { key: '2', id: 2, name: '城东物流走廊', type: 'logistics', typeLabel: '物流航线', status: 'open', altitude: '50-150m', time: '全天', area: '12.5km', desc: '连接城东物流园与配送中心的固定航线', manager: '空域管理办公室', managerPhone: '0571-88888010' },
  { key: '3', id: 3, name: '中心禁飞区', type: 'forbidden', typeLabel: '禁飞区', status: 'forbidden', altitude: '0-无限', time: '全天', area: '5.8km²', desc: '政府机关及军事设施所在区域，全天禁飞', manager: '空域管理办公室', managerPhone: '0571-88888010' },
  { key: '4', id: 4, name: '南区试飞区', type: 'test', typeLabel: '试飞空域', status: 'open', altitude: '0-300m', time: '08:00-18:00', area: '8.1km²', desc: '新型飞行器试飞专用空域，需提前申请', manager: '空域管理办公室', managerPhone: '0571-88888010' },
  { key: '5', id: 5, name: '西区巡检航线', type: 'inspection', typeLabel: '巡检航线', status: 'open', altitude: '30-100m', time: '06:00-22:00', area: '15.3km', desc: '电力线路巡检固定航线', manager: '空域管理办公室', managerPhone: '0571-88888010' },
  { key: '6', id: 6, name: '机场净空区', type: 'restricted', typeLabel: '限飞区', status: 'restricted', altitude: '0-500m', time: '全天', area: '25km²', desc: '机场周边净空保护区域，需审批后飞行', manager: '空域管理办公室', managerPhone: '0571-88888010' },
  { key: '7', id: 7, name: '滨江观光航线', type: 'sightseeing', typeLabel: '观光航线', status: 'open', altitude: '50-200m', time: '09:00-21:00', area: '8.6km', desc: '沿江景观带低空观光专用航线', manager: '空域管理办公室', managerPhone: '0571-88888010' }
];

var NOTICE_PUBLISH_STATUS_OPTIONS = [{ value: 'published', label: '已发布' }, { value: 'draft', label: '草稿' }];

var NOTICE_DATA = [
  { key: '1', id: 1, title: '城东片区低空航线临时调整', type: 'route_adjust', typeLabel: '航线调整', status: 'active', publishStatus: 'published', publishTime: '2026-04-26 10:00', effectiveTime: '2026-04-26 06:00 ~ 18:00', desc: '因城东施工需要，4月26日6:00-18:00临时调整低空航线，城东物流走廊降高至80-120m运行', publisher: '空域管理办公室' },
  { key: '2', id: 2, title: '南区空域临时关闭通知', type: 'zone_close', typeLabel: '空域关闭', status: 'upcoming', publishStatus: 'published', publishTime: '2026-04-25 16:00', effectiveTime: '2026-04-27 全天', desc: '南区试飞区4月27日全天临时关闭，用于设备检修维护', publisher: '空域管理办公室' },
  { key: '3', id: 3, title: '五一假期空域管制通知', type: 'temp_control', typeLabel: '临时管制', status: 'preview', publishStatus: 'published', publishTime: '2026-04-24 09:00', effectiveTime: '2026-05-01 ~ 2026-05-05', desc: '5月1日-5日，中心区域新增临时限飞区，半径扩大2km，详情另行通知', publisher: '空域管理办公室' },
  { key: '4', id: 4, title: '城西片区临时飞行限制', type: 'temp_control', typeLabel: '临时管制', status: 'preview', publishStatus: 'draft', publishTime: '', effectiveTime: '2026-05-10 ~ 2026-05-12', desc: '城西片区因重大活动需要，5月10日-12日实施临时飞行限制', publisher: '空域管理办公室' }
];

var TAKEOFF_DATA = [
  { key: '1', id: 1, name: '城北训练基地起降场', type: 'hardground', typeLabel: '硬化地面', location: '城北新区科技路88号', altitude: '海拔52m', facilities: '充电桩、维修间、气象站', status: 'available', fee: '免费', phone: '0571-88888001', manager: '城北训练基地' },
  { key: '2', id: 2, name: '南区试飞中心起降坪', type: 'grass', typeLabel: '草坪场地', location: '南区航空产业园', altitude: '海拔48m', facilities: '充电桩、机库、指挥塔台', status: 'available', fee: '¥200/次', phone: '0571-88888002', manager: '南区试飞中心' },
  { key: '3', id: 3, name: '西区巡检基地停机坪', type: 'hardground', typeLabel: '硬化地面', location: '西区电力运维中心', altitude: '海拔55m', facilities: '充电桩、维修间', status: 'available', fee: '¥100/次', phone: '0571-88888003', manager: '西区巡检基地' },
  { key: '4', id: 4, name: '滨江观光起降平台', type: 'rooftop', typeLabel: '楼顶平台', location: '滨江大道188号', altitude: '海拔68m', facilities: '充电桩、候机区', status: 'reserved', fee: '¥300/次', phone: '0571-88888004', manager: '滨江观光运营部' },
  { key: '5', id: 5, name: '物流园起降场', type: 'hardground', typeLabel: '硬化地面', location: '城东物流园A区', altitude: '海拔45m', facilities: '充电桩、货物装卸区', status: 'available', fee: '¥150/次', phone: '0571-88888005', manager: '城东物流园' }
];

var Component = function AdminAirspacePage() {
  var [activeTab, setActiveTab] = useState('zone');
  var [zoneAddOpen, setZoneAddOpen] = useState(false);
  var [zoneEditOpen, setZoneEditOpen] = useState(false);
  var [zoneViewOpen, setZoneViewOpen] = useState(false);
  var [noticeAddOpen, setNoticeAddOpen] = useState(false);
  var [noticeEditOpen, setNoticeEditOpen] = useState(false);
  var [noticeViewOpen, setNoticeViewOpen] = useState(false);
  var [takeoffAddOpen, setTakeoffAddOpen] = useState(false);
  var [takeoffEditOpen, setTakeoffEditOpen] = useState(false);
  var [takeoffViewOpen, setTakeoffViewOpen] = useState(false);
  var [currentZone, setCurrentZone] = useState<typeof ZONE_DATA[0] | null>(null);
  var [currentNotice, setCurrentNotice] = useState<typeof NOTICE_DATA[0] | null>(null);
  var [currentTakeoff, setCurrentTakeoff] = useState<typeof TAKEOFF_DATA[0] | null>(null);
  var [zoneAddForm] = Form.useForm();
  var [zoneEditForm] = Form.useForm();
  var [noticeAddForm] = Form.useForm();
  var [noticeEditForm] = Form.useForm();
  var [takeoffAddForm] = Form.useForm();
  var [takeoffEditForm] = Form.useForm();

  var handleNavigate = useCallback(function (key: string) {
    window.location.href = '/prototypes/' + key;
  }, []);

  var handleZoneView = function (record: typeof ZONE_DATA[0]) {
    setCurrentZone(record);
    setZoneViewOpen(true);
  };

  var handleZoneEdit = function (record: typeof ZONE_DATA[0]) {
    setCurrentZone(record);
    zoneEditForm.setFieldsValue(record);
    setZoneEditOpen(true);
  };

  var handleNoticeView = function (record: typeof NOTICE_DATA[0]) {
    setCurrentNotice(record);
    setNoticeViewOpen(true);
  };

  var handleNoticeEdit = function (record: typeof NOTICE_DATA[0]) {
    setCurrentNotice(record);
    noticeEditForm.setFieldsValue(record);
    setNoticeEditOpen(true);
  };

  var handleTakeoffView = function (record: typeof TAKEOFF_DATA[0]) {
    setCurrentTakeoff(record);
    setTakeoffViewOpen(true);
  };

  var handleTakeoffEdit = function (record: typeof TAKEOFF_DATA[0]) {
    setCurrentTakeoff(record);
    takeoffEditForm.setFieldsValue(record);
    setTakeoffEditOpen(true);
  };

  var zoneColumns = [
    { title: '序号', dataIndex: 'id', key: 'id', width: 60 },
    { title: '空域名称', dataIndex: 'name', key: 'name', width: 140, render: function (t: string) { return <span style={{ fontWeight: 500 }}>{t}</span>; } },
    { title: '类型', dataIndex: 'typeLabel', key: 'typeLabel', width: 100, render: function (t: string, r: typeof ZONE_DATA[0]) { return <Tag color={ZONE_TYPE_COLOR[r.type]}>{t}</Tag>; } },
    { title: '状态', dataIndex: 'status', key: 'status', width: 80, render: function (t: string) { var s = ZONE_STATUS_MAP[t]; return <Tag color={s.color}>{s.text}</Tag>; } },
    { title: '高度范围', dataIndex: 'altitude', key: 'altitude', width: 100 },
    { title: '开放时间', dataIndex: 'time', key: 'time', width: 120 },
    { title: '面积/长度', dataIndex: 'area', key: 'area', width: 100 },
    { title: '管理单位', dataIndex: 'manager', key: 'manager', width: 130 },
    { title: '联系电话', dataIndex: 'managerPhone', key: 'managerPhone', width: 120 },
    { title: '操作', key: 'action', width: 150, fixed: 'right' as const, render: function (_: any, record: typeof ZONE_DATA[0]) {
      return (
        <Space size={4}>
          <Tooltip title="查看详情"><Button type="text" size="small" icon={<EyeOutlined />} style={{ color: '#1677ff' }} onClick={function () { handleZoneView(record); }} /></Tooltip>
          <Tooltip title="编辑"><Button type="text" size="small" icon={<EditOutlined />} style={{ color: '#fa8c16' }} onClick={function () { handleZoneEdit(record); }} /></Tooltip>
          <Tooltip title="删除"><Popconfirm title="确定删除该空域？" onConfirm={function () { message.success('删除成功'); }}><Button type="text" size="small" icon={<DeleteOutlined />} style={{ color: '#ff4d4f' }} /></Popconfirm></Tooltip>
        </Space>
      );
    }}
  ];

  var noticeColumns = [
    { title: '序号', dataIndex: 'id', key: 'id', width: 60 },
    { title: '通知标题', dataIndex: 'title', key: 'title', width: 220, render: function (t: string) { return <span style={{ fontWeight: 500 }}>{t}</span>; } },
    { title: '类型', dataIndex: 'typeLabel', key: 'typeLabel', width: 100, render: function (t: string, r: typeof NOTICE_DATA[0]) { return <Tag color={r.type === 'route_adjust' ? '#1677ff' : r.type === 'zone_close' ? '#f5222d' : '#fa8c16'}>{t}</Tag>; } },
    { title: '状态', dataIndex: 'status', key: 'status', width: 100, render: function (t: string) { var s = NOTICE_STATUS_MAP[t]; return <Badge status={t === 'active' ? 'error' : t === 'upcoming' ? 'warning' : t === 'preview' ? 'processing' : 'default'} text={s.text} />; } },
    { title: '发布状态', dataIndex: 'publishStatus', key: 'publishStatus', width: 90, render: function (t: string) { return <Tag color={t === 'published' ? 'green' : 'orange'}>{t === 'published' ? '已发布' : '草稿'}</Tag>; } },
    { title: '生效时间', dataIndex: 'effectiveTime', key: 'effectiveTime', width: 200 },
    { title: '发布时间', dataIndex: 'publishTime', key: 'publishTime', width: 150 },
    { title: '发布单位', dataIndex: 'publisher', key: 'publisher', width: 130 },
    { title: '操作', key: 'action', width: 180, fixed: 'right' as const, render: function (_: any, record: typeof NOTICE_DATA[0]) {
      var isDraft = record.publishStatus === 'draft';
      return (
        <Space size={4}>
          <Tooltip title="查看"><Button type="text" size="small" icon={<EyeOutlined />} style={{ color: '#1677ff' }} onClick={function () { handleNoticeView(record); }} /></Tooltip>
          {isDraft ? (
            <>
              <Tooltip title="编辑"><Button type="text" size="small" icon={<EditOutlined />} style={{ color: '#fa8c16' }} onClick={function () { handleNoticeEdit(record); }} /></Tooltip>
              <Tooltip title="发布">
                <Popconfirm title="确定发布该通知？" icon={<ExclamationCircleOutlined />} onConfirm={function () { message.success('发布成功'); }}>
                  <Button type="text" size="small" icon={<SendOutlined />} style={{ color: '#52c41a' }} />
                </Popconfirm>
              </Tooltip>
              <Tooltip title="删除">
                <Popconfirm title="确定删除该通知？" icon={<ExclamationCircleOutlined />} onConfirm={function () { message.success('删除成功'); }}>
                  <Button type="text" size="small" icon={<DeleteOutlined />} style={{ color: '#ff4d4f' }} />
                </Popconfirm>
              </Tooltip>
            </>
          ) : (
            <Tooltip title="撤回">
              <Popconfirm title="确定撤回该通知？" icon={<ExclamationCircleOutlined />} onConfirm={function () { message.success('已撤回'); }}>
                <Button type="text" size="small" icon={<UndoOutlined />} style={{ color: '#fa8c16' }} />
              </Popconfirm>
            </Tooltip>
          )}
        </Space>
      );
    }}
  ];

  var takeoffColumns = [
    { title: '序号', dataIndex: 'id', key: 'id', width: 60 },
    { title: '起降点名称', dataIndex: 'name', key: 'name', width: 170, render: function (t: string) { return <span style={{ fontWeight: 500 }}>{t}</span>; } },
    { title: '类型', dataIndex: 'typeLabel', key: 'typeLabel', width: 100, render: function (t: string) { return <Tag color="cyan">{t}</Tag>; } },
    { title: '位置', dataIndex: 'location', key: 'location', width: 160 },
    { title: '海拔', dataIndex: 'altitude', key: 'altitude', width: 90 },
    { title: '设施', dataIndex: 'facilities', key: 'facilities', width: 180, render: function (f: string) { return <span style={{ fontSize: 12 }}>{f}</span>; } },
    { title: '状态', dataIndex: 'status', key: 'status', width: 80, render: function (t: string) { var map: Record<string, { text: string; color: string }> = { available: { text: '可用', color: 'green' }, reserved: { text: '预约中', color: 'orange' }, maintenance: { text: '维护中', color: 'default' }, closed: { text: '已关闭', color: 'red' } }; var s = map[t]; return <Tag color={s.color}>{s.text}</Tag>; } },
    { title: '费用', dataIndex: 'fee', key: 'fee', width: 90, render: function (f: string) { return <span style={{ color: f === '免费' ? '#52c41a' : '#ff4d4f', fontWeight: 600 }}>{f}</span>; } },
    { title: '联系电话', dataIndex: 'phone', key: 'phone', width: 120 },
    { title: '管理单位', dataIndex: 'manager', key: 'manager', width: 130 },
    { title: '操作', key: 'action', width: 150, fixed: 'right' as const, render: function (_: any, record: typeof TAKEOFF_DATA[0]) {
      return (
        <Space size={4}>
          <Tooltip title="查看详情"><Button type="text" size="small" icon={<EyeOutlined />} style={{ color: '#1677ff' }} onClick={function () { handleTakeoffView(record); }} /></Tooltip>
          <Tooltip title="编辑"><Button type="text" size="small" icon={<EditOutlined />} style={{ color: '#fa8c16' }} onClick={function () { handleTakeoffEdit(record); }} /></Tooltip>
          <Tooltip title="删除"><Popconfirm title="确定删除该起降点？" onConfirm={function () { message.success('删除成功'); }}><Button type="text" size="small" icon={<DeleteOutlined />} style={{ color: '#ff4d4f' }} /></Popconfirm></Tooltip>
        </Space>
      );
    }}
  ];

  return (
    <AdminLayout activeKey="admin-airspace">
      

      <div style={{ maxWidth: 1400, margin: '0 auto', padding: 24 }}>
        <Breadcrumb items={[{ title: '飞行审批' }, { title: '空域管理' }]} style={{ marginBottom: 16 }} />
        <Card style={{ borderRadius: 12 }}>
          <Tabs
            activeKey={activeTab}
            onChange={setActiveTab}
            items={[
              {
                key: 'zone',
                label: <span><EnvironmentOutlined style={{ marginRight: 6 }} />空域管理</span>,
                children: (
                  <div>
                    <div style={{ display: 'flex', gap: 12, marginBottom: 16, flexWrap: 'wrap' }}>
                      <Input prefix={<SearchOutlined />} placeholder="搜索空域名称" style={{ width: 240 }} allowClear />
                      <Select placeholder="空域类型" style={{ width: 140 }} options={ZONE_TYPE_OPTIONS} allowClear />
                      <Select placeholder="状态" style={{ width: 120 }} options={Object.entries(ZONE_STATUS_MAP).map(function ([k, v]) { return { value: k, label: v.text }; })} allowClear />
                      <Button type="primary" icon={<SearchOutlined />}>查询</Button>
                      <Button>重置</Button>
                      <div style={{ flex: 1 }} />
                      <Button type="primary" icon={<PlusOutlined />} onClick={function () { zoneAddForm.resetFields(); setZoneAddOpen(true); }}>新增空域</Button>
                    </div>
                    <Table columns={zoneColumns} dataSource={ZONE_DATA} pagination={{ pageSize: 10 }} scroll={{ x: 1200 }} />
                  </div>
                )
              },
              {
                key: 'notice',
                label: <span><WarningOutlined style={{ marginRight: 6 }} />临时管制通知</span>,
                children: (
                  <div>
                    <div style={{ display: 'flex', gap: 12, marginBottom: 16, flexWrap: 'wrap' }}>
                      <Input prefix={<SearchOutlined />} placeholder="搜索通知标题" style={{ width: 240 }} allowClear />
                      <Select placeholder="通知类型" style={{ width: 140 }} options={NOTICE_TYPE_OPTIONS} allowClear />
                      <Select placeholder="状态" style={{ width: 120 }} options={Object.entries(NOTICE_STATUS_MAP).map(function ([k, v]) { return { value: k, label: v.text }; })} allowClear />
                      <Select placeholder="发布状态" style={{ width: 120 }} options={NOTICE_PUBLISH_STATUS_OPTIONS} allowClear />
                      <Button type="primary" icon={<SearchOutlined />}>查询</Button>
                      <Button>重置</Button>
                      <div style={{ flex: 1 }} />
                      <Button type="primary" icon={<PlusOutlined />} onClick={function () { noticeAddForm.resetFields(); setNoticeAddOpen(true); }}>发布通知</Button>
                    </div>
                    <Table columns={noticeColumns} dataSource={NOTICE_DATA} pagination={{ pageSize: 10 }} scroll={{ x: 1200 }} />
                  </div>
                )
              },
              // 起降点管理 Tab 暂时隐藏，恢复时取消下方注释即可
              // {
              //   key: 'takeoff',
              //   label: <span><CarOutlined style={{ marginRight: 6 }} />起降点管理</span>,
              //   children: (
              //     <div>
              //       <div style={{ display: 'flex', gap: 12, marginBottom: 16, flexWrap: 'wrap' }}>
              //         <Input prefix={<SearchOutlined />} placeholder="搜索起降点名称" style={{ width: 240 }} allowClear />
              //         <Select placeholder="场地类型" style={{ width: 140 }} options={TAKEOFF_TYPE_OPTIONS} allowClear />
              //         <Select placeholder="状态" style={{ width: 120 }} options={TAKEOFF_STATUS_OPTIONS} allowClear />
              //         <Button type="primary" icon={<SearchOutlined />}>查询</Button>
              //         <Button>重置</Button>
              //         <div style={{ flex: 1 }} />
              //         <Button type="primary" icon={<PlusOutlined />} onClick={function () { takeoffAddForm.resetFields(); setTakeoffAddOpen(true); }}>新增起降点</Button>
              //       </div>
              //       <Table columns={takeoffColumns} dataSource={TAKEOFF_DATA} pagination={{ pageSize: 10 }} scroll={{ x: 1300 }} />
              //     </div>
              //   )
              // }
            ]}
          />
        </Card>
      </div>

      <Modal title="新增空域" open={zoneAddOpen} onCancel={function () { setZoneAddOpen(false); }} width={720} footer={[<Button key="c" onClick={function () { setZoneAddOpen(false); }}>关闭</Button>, <Button key="p" type="primary" onClick={function () { message.success('创建成功'); setZoneAddOpen(false); }}>确定</Button>]}>
        <Form form={zoneAddForm} layout="vertical" style={{ marginTop: 16 }}>
          <Row gutter={16}>
            <Col span={12}><Form.Item name="name" label="空域名称" rules={[{ required: true, message: '请输入空域名称' }]}><Input placeholder="请输入空域名称" /></Form.Item></Col>
            <Col span={12}><Form.Item name="type" label="空域类型" rules={[{ required: true, message: '请选择空域类型' }]}><Select placeholder="请选择" options={ZONE_TYPE_OPTIONS} /></Form.Item></Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}><Form.Item name="status" label="状态" rules={[{ required: true, message: '请选择状态' }]}><Select placeholder="请选择" options={Object.entries(ZONE_STATUS_MAP).map(function ([k, v]) { return { value: k, label: v.text }; })} /></Form.Item></Col>
            <Col span={12}><Form.Item name="altitude" label="高度范围" rules={[{ required: true, message: '请输入高度范围' }]}><Input placeholder="如：0-120m" /></Form.Item></Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}><Form.Item name="time" label="开放时间"><Input placeholder="如：06:00-20:00" /></Form.Item></Col>
            <Col span={12}><Form.Item name="area" label="面积/长度"><Input placeholder="如：3.2km²" /></Form.Item></Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}><Form.Item name="manager" label="管理单位"><Input placeholder="请输入管理单位" /></Form.Item></Col>
            <Col span={12}><Form.Item name="managerPhone" label="联系电话"><Input placeholder="请输入联系电话" /></Form.Item></Col>
          </Row>
          <Form.Item name="desc" label="描述"><Input.TextArea rows={3} placeholder="请输入空域描述" /></Form.Item>
        </Form>
      </Modal>

      <Modal title="编辑空域" open={zoneEditOpen} onCancel={function () { setZoneEditOpen(false); }} width={720} footer={[<Button key="c" onClick={function () { setZoneEditOpen(false); }}>关闭</Button>, <Button key="s" type="primary" onClick={function () { message.success('保存成功'); setZoneEditOpen(false); }}>确认</Button>]}>
        <Form form={zoneEditForm} layout="vertical" style={{ marginTop: 16 }}>
          <Row gutter={16}>
            <Col span={12}><Form.Item name="name" label="空域名称" rules={[{ required: true }]}><Input /></Form.Item></Col>
            <Col span={12}><Form.Item name="type" label="空域类型" rules={[{ required: true }]}><Select options={ZONE_TYPE_OPTIONS} /></Form.Item></Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}><Form.Item name="status" label="状态" rules={[{ required: true }]}><Select options={Object.entries(ZONE_STATUS_MAP).map(function ([k, v]) { return { value: k, label: v.text }; })} /></Form.Item></Col>
            <Col span={12}><Form.Item name="altitude" label="高度范围" rules={[{ required: true }]}><Input /></Form.Item></Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}><Form.Item name="time" label="开放时间"><Input /></Form.Item></Col>
            <Col span={12}><Form.Item name="area" label="面积/长度"><Input /></Form.Item></Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}><Form.Item name="manager" label="管理单位"><Input /></Form.Item></Col>
            <Col span={12}><Form.Item name="managerPhone" label="联系电话"><Input /></Form.Item></Col>
          </Row>
          <Form.Item name="desc" label="描述"><Input.TextArea rows={3} /></Form.Item>
        </Form>
      </Modal>

      <Modal title="空域详情" open={zoneViewOpen} onCancel={function () { setZoneViewOpen(false); }} width={720} footer={<Button onClick={function () { setZoneViewOpen(false); }}>关闭</Button>}>
        {currentZone && (
          <div style={{ marginTop: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
              <FileTextOutlined style={{ color: '#1677ff', fontSize: 16 }} />
              <span style={{ fontSize: 15, fontWeight: 600 }}>基本信息</span>
            </div>
            <Descriptions column={2} bordered size="small">
              <Descriptions.Item label="空域名称">{currentZone.name}</Descriptions.Item>
              <Descriptions.Item label="空域类型"><Tag color={ZONE_TYPE_COLOR[currentZone.type]}>{currentZone.typeLabel}</Tag></Descriptions.Item>
              <Descriptions.Item label="状态"><Tag color={ZONE_STATUS_MAP[currentZone.status].color}>{ZONE_STATUS_MAP[currentZone.status].text}</Tag></Descriptions.Item>
              <Descriptions.Item label="高度范围">{currentZone.altitude}</Descriptions.Item>
              <Descriptions.Item label="开放时间">{currentZone.time}</Descriptions.Item>
              <Descriptions.Item label="面积/长度">{currentZone.area}</Descriptions.Item>
              <Descriptions.Item label="管理单位">{currentZone.manager}</Descriptions.Item>
              <Descriptions.Item label="联系电话">{currentZone.managerPhone}</Descriptions.Item>
              <Descriptions.Item label="描述" span={2}>{currentZone.desc}</Descriptions.Item>
            </Descriptions>
          </div>
        )}
      </Modal>

      <Modal title="发布临时管制通知" open={noticeAddOpen} onCancel={function () { setNoticeAddOpen(false); }} width={720} footer={[
        <Button key="cancel" onClick={function () { setNoticeAddOpen(false); }}>关闭</Button>,
        <Button key="draft" onClick={function () { message.success('已保存为草稿'); setNoticeAddOpen(false); }}>保存草稿</Button>,
        <Button key="preview" onClick={function () { handleNavigate('flight-airspace'); }}>预览</Button>,
        <Button key="publish" type="primary" onClick={function () { message.success('发布成功'); setNoticeAddOpen(false); }}>立即发布</Button>
      ]}>
        <Form form={noticeAddForm} layout="vertical" style={{ marginTop: 16 }}>
          <Form.Item name="title" label="通知标题" rules={[{ required: true, message: '请输入通知标题' }]}><Input placeholder="请输入通知标题" /></Form.Item>
          <Row gutter={16}>
            <Col span={12}><Form.Item name="type" label="通知类型" rules={[{ required: true, message: '请选择通知类型' }]}><Select placeholder="请选择" options={NOTICE_TYPE_OPTIONS} /></Form.Item></Col>
            <Col span={12}><Form.Item name="status" label="状态" rules={[{ required: true, message: '请选择状态' }]}><Select placeholder="请选择" options={Object.entries(NOTICE_STATUS_MAP).map(function ([k, v]) { return { value: k, label: v.text }; })} /></Form.Item></Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}><Form.Item name="effectiveTime" label="生效时间" rules={[{ required: true, message: '请输入生效时间' }]}><Input placeholder="如：2026-04-26 06:00 ~ 18:00" /></Form.Item></Col>
            <Col span={12}><Form.Item name="publisher" label="发布单位"><Input placeholder="请输入发布单位" /></Form.Item></Col>
          </Row>
          <Form.Item name="desc" label="通知内容" rules={[{ required: true, message: '请输入通知内容' }]}><Input.TextArea rows={4} placeholder="请输入通知详细内容" /></Form.Item>
        </Form>
      </Modal>

      <Modal title="编辑临时管制通知" open={noticeEditOpen} onCancel={function () { setNoticeEditOpen(false); }} width={720} footer={[
        <Button key="cancel" onClick={function () { setNoticeEditOpen(false); }}>关闭</Button>,
        <Button key="preview" onClick={function () { handleNavigate('flight-airspace'); }}>预览</Button>,
        <Button key="save" type="primary" onClick={function () { message.success('保存成功'); setNoticeEditOpen(false); }}>确认</Button>
      ]}>
        <Form form={noticeEditForm} layout="vertical" style={{ marginTop: 16 }}>
          <Form.Item name="title" label="通知标题" rules={[{ required: true }]}><Input /></Form.Item>
          <Row gutter={16}>
            <Col span={12}><Form.Item name="type" label="通知类型" rules={[{ required: true }]}><Select options={NOTICE_TYPE_OPTIONS} /></Form.Item></Col>
            <Col span={12}><Form.Item name="status" label="状态" rules={[{ required: true }]}><Select options={Object.entries(NOTICE_STATUS_MAP).map(function ([k, v]) { return { value: k, label: v.text }; })} /></Form.Item></Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}><Form.Item name="effectiveTime" label="生效时间" rules={[{ required: true }]}><Input /></Form.Item></Col>
            <Col span={12}><Form.Item name="publisher" label="发布单位"><Input /></Form.Item></Col>
          </Row>
          <Form.Item name="desc" label="通知内容" rules={[{ required: true }]}><Input.TextArea rows={4} /></Form.Item>
        </Form>
      </Modal>

      <Modal title="临时管制通知详情" open={noticeViewOpen} onCancel={function () { setNoticeViewOpen(false); }} width={720} footer={<Space><Button onClick={function () { setNoticeViewOpen(false); }}>关闭</Button><Button type="primary" onClick={function () { setNoticeViewOpen(false); handleNavigate('flight-airspace'); }}>预览</Button></Space>}>
        {currentNotice && (
          <div style={{ marginTop: 16 }}>
            <Descriptions column={2} bordered>
              <Descriptions.Item label="通知标题" span={2}>{currentNotice.title}</Descriptions.Item>
              <Descriptions.Item label="通知类型"><Tag color={currentNotice.type === 'route_adjust' ? '#1677ff' : currentNotice.type === 'zone_close' ? '#f5222d' : '#fa8c16'}>{currentNotice.typeLabel}</Tag></Descriptions.Item>
              <Descriptions.Item label="发布状态"><Tag color={currentNotice.publishStatus === 'published' ? 'green' : 'orange'}>{currentNotice.publishStatus === 'published' ? '已发布' : '草稿'}</Tag></Descriptions.Item>
              <Descriptions.Item label="状态"><Badge status={currentNotice.status === 'active' ? 'error' : currentNotice.status === 'upcoming' ? 'warning' : currentNotice.status === 'preview' ? 'processing' : 'default'} text={NOTICE_STATUS_MAP[currentNotice.status].text} /></Descriptions.Item>
              <Descriptions.Item label="生效时间">{currentNotice.effectiveTime}</Descriptions.Item>
              <Descriptions.Item label="发布时间">{currentNotice.publishTime || '—'}</Descriptions.Item>
              <Descriptions.Item label="发布单位">{currentNotice.publisher}</Descriptions.Item>
              <Descriptions.Item label="通知内容" span={2}>{currentNotice.desc}</Descriptions.Item>
            </Descriptions>
          </div>
        )}
      </Modal>

      <Modal title="新增起降点" open={takeoffAddOpen} onCancel={function () { setTakeoffAddOpen(false); }} width={720} footer={[<Button key="c" onClick={function () { setTakeoffAddOpen(false); }}>关闭</Button>, <Button key="p" type="primary" onClick={function () { message.success('创建成功'); setTakeoffAddOpen(false); }}>确定</Button>]}>
        <Form form={takeoffAddForm} layout="vertical" style={{ marginTop: 16 }}>
          <Row gutter={16}>
            <Col span={12}><Form.Item name="name" label="起降点名称" rules={[{ required: true, message: '请输入起降点名称' }]}><Input placeholder="请输入起降点名称" /></Form.Item></Col>
            <Col span={12}><Form.Item name="type" label="场地类型" rules={[{ required: true, message: '请选择场地类型' }]}><Select placeholder="请选择" options={TAKEOFF_TYPE_OPTIONS} /></Form.Item></Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}><Form.Item name="location" label="位置" rules={[{ required: true, message: '请输入位置' }]}><Input placeholder="请输入详细位置" /></Form.Item></Col>
            <Col span={12}><Form.Item name="altitude" label="海拔"><Input placeholder="如：海拔52m" /></Form.Item></Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}><Form.Item name="status" label="状态" rules={[{ required: true, message: '请选择状态' }]}><Select placeholder="请选择" options={TAKEOFF_STATUS_OPTIONS} /></Form.Item></Col>
            <Col span={12}><Form.Item name="fee" label="使用费用"><Input placeholder="如：免费 或 ¥200/次" /></Form.Item></Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}><Form.Item name="phone" label="联系电话"><Input placeholder="请输入联系电话" /></Form.Item></Col>
            <Col span={12}><Form.Item name="manager" label="管理单位"><Input placeholder="请输入管理单位" /></Form.Item></Col>
          </Row>
          <Form.Item name="facilities" label="配套设施"><Input.TextArea rows={2} placeholder="如：充电桩、维修间、气象站" /></Form.Item>
        </Form>
      </Modal>

      <Modal title="编辑起降点" open={takeoffEditOpen} onCancel={function () { setTakeoffEditOpen(false); }} width={720} footer={[<Button key="c" onClick={function () { setTakeoffEditOpen(false); }}>关闭</Button>, <Button key="s" type="primary" onClick={function () { message.success('保存成功'); setTakeoffEditOpen(false); }}>确认</Button>]}>
        <Form form={takeoffEditForm} layout="vertical" style={{ marginTop: 16 }}>
          <Row gutter={16}>
            <Col span={12}><Form.Item name="name" label="起降点名称" rules={[{ required: true }]}><Input /></Form.Item></Col>
            <Col span={12}><Form.Item name="type" label="场地类型" rules={[{ required: true }]}><Select options={TAKEOFF_TYPE_OPTIONS} /></Form.Item></Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}><Form.Item name="location" label="位置" rules={[{ required: true }]}><Input /></Form.Item></Col>
            <Col span={12}><Form.Item name="altitude" label="海拔"><Input /></Form.Item></Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}><Form.Item name="status" label="状态" rules={[{ required: true }]}><Select options={TAKEOFF_STATUS_OPTIONS} /></Form.Item></Col>
            <Col span={12}><Form.Item name="fee" label="使用费用"><Input /></Form.Item></Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}><Form.Item name="phone" label="联系电话"><Input /></Form.Item></Col>
            <Col span={12}><Form.Item name="manager" label="管理单位"><Input /></Form.Item></Col>
          </Row>
          <Form.Item name="facilities" label="配套设施"><Input.TextArea rows={2} /></Form.Item>
        </Form>
      </Modal>

      <Modal title="起降点详情" open={takeoffViewOpen} onCancel={function () { setTakeoffViewOpen(false); }} width={720} footer={<Button onClick={function () { setTakeoffViewOpen(false); }}>关闭</Button>}>
        {currentTakeoff && (
          <div style={{ marginTop: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
              <CarOutlined style={{ color: '#13c2c2', fontSize: 16 }} />
              <span style={{ fontSize: 15, fontWeight: 600 }}>起降点信息</span>
            </div>
            <Descriptions column={2} bordered size="small">
              <Descriptions.Item label="起降点名称">{currentTakeoff.name}</Descriptions.Item>
              <Descriptions.Item label="场地类型"><Tag color="cyan">{currentTakeoff.typeLabel}</Tag></Descriptions.Item>
              <Descriptions.Item label="位置">{currentTakeoff.location}</Descriptions.Item>
              <Descriptions.Item label="海拔">{currentTakeoff.altitude}</Descriptions.Item>
              <Descriptions.Item label="配套设施" span={2}>{currentTakeoff.facilities}</Descriptions.Item>
              <Descriptions.Item label="状态"><Tag color={currentTakeoff.status === 'available' ? 'green' : currentTakeoff.status === 'reserved' ? 'orange' : currentTakeoff.status === 'maintenance' ? 'default' : 'red'}>{currentTakeoff.status === 'available' ? '可用' : currentTakeoff.status === 'reserved' ? '预约中' : currentTakeoff.status === 'maintenance' ? '维护中' : '已关闭'}</Tag></Descriptions.Item>
              <Descriptions.Item label="使用费用"><span style={{ color: currentTakeoff.fee === '免费' ? '#52c41a' : '#ff4d4f', fontWeight: 600 }}>{currentTakeoff.fee}</span></Descriptions.Item>
              <Descriptions.Item label="联系电话">{currentTakeoff.phone}</Descriptions.Item>
              <Descriptions.Item label="管理单位">{currentTakeoff.manager}</Descriptions.Item>
            </Descriptions>
          </div>
        )}
      </Modal>
    </AdminLayout>
  );
};

export default Component;
