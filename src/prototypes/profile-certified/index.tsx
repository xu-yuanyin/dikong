/**
 * @name 个人中心（认证成功）
 * @mode axure
 * /Users/xu/Desktop/元引信息/Axhub-Make-main/skills/axure-export-workflow/SKILL.md
 *
 */

import './style.css';

import React, { useState, useCallback, useEffect } from 'react';
import { Card, Form, Input, Button, Breadcrumb, Avatar, Descriptions, Tag, message, Row, Col, Tabs, Table, Modal, Select, Space, Divider, Image } from 'antd';
import { UserOutlined, SafetyCertificateOutlined, CheckCircleOutlined, RocketOutlined, PlusOutlined, EyeOutlined, EditOutlined, FileTextOutlined, InboxOutlined, UploadOutlined, FilePdfOutlined, FileImageOutlined, ZoomInOutlined } from '@ant-design/icons';

var MENU_ITEMS = [
  { key: 'profile-certified', label: '我的信息', group: '账号管理' },
  { key: 'role-management', label: '角色管理' },
  { key: 'message-center', label: '消息中心' },
  { key: 'my-orders', label: '我的预约', group: '个人/需求方业务' },
  { key: 'my-demand', label: '我的需求' },
  { key: 'my-aircraft', label: '我的飞行器', group: '飞行服务 (飞手/企业)' },
  { key: 'my-flight-plan', label: '我的飞行计划' },
  { key: 'my-goods', label: '我的商品', group: '低空商城 (商户)' },
  { key: 'mall-publish', label: '发布商品' },
  { key: 'my-service', label: '我的服务', group: '低空服务 (飞行服务商)' },
  { key: 'service-publish', label: '发布服务项目' },
  { key: 'provider-orders', label: '服务受理单' },
  { key: 'provider-intentions', label: '商品受理单' }
];

var Component = function ProfileCertifiedPage() {
  var [activeMenu, setActiveMenu] = useState('profile-certified');
  var [aircraftTab, setAircraftTab] = useState('filed');
  var [planTab, setPlanTab] = useState('filed');
  var [editMode, setEditMode] = useState(false);
  var [form] = Form.useForm();
  var [aircraftDetailOpen, setAircraftDetailOpen] = useState(false);
  var [planDetailOpen, setPlanDetailOpen] = useState(false);
  var [aircraftEditOpen, setAircraftEditOpen] = useState(false);
  var [planEditOpen, setPlanEditOpen] = useState(false);
  var [currentAircraft, setCurrentAircraft] = useState<any>(null);
  var [currentPlan, setCurrentPlan] = useState<any>(null);
  var [aircraftStatus, setAircraftStatus] = useState<string>('');
  var [planStatus, setPlanStatus] = useState<string>('');

  useEffect(function () {
    var params = new URLSearchParams(window.location.search);
    var tab = params.get('tab');
    if (tab === 'aircraft') {
      setActiveMenu('my-aircraft');
    } else if (tab === 'plan') {
      setActiveMenu('my-flight-plan');
    }
  }, []);

  var handleNavigate = useCallback(function (key: string) {
    window.location.href = '/prototypes/' + key;
  }, []);

  var handleSave = useCallback(function () {
    form.validateFields().then(function () {
      message.success('保存成功');
      setEditMode(false);
    });
  }, [form]);

  var showAircraftDetail = function (record: any) {
    setCurrentAircraft(record);
    setAircraftDetailOpen(true);
  };

  var showPlanDetail = function (record: any) {
    setCurrentPlan(record);
    setPlanDetailOpen(true);
  };

  var showAircraftEdit = function (record: any) {
    setCurrentAircraft(record);
    setAircraftStatus(record.status);
    setAircraftEditOpen(true);
  };

  var showPlanEdit = function (record: any) {
    setCurrentPlan(record);
    setPlanStatus(record.status);
    setPlanEditOpen(true);
  };

  var handleAircraftEditSave = function () {
    message.success('飞行器状态已更新');
    setAircraftEditOpen(false);
  };

  var handlePlanEditSave = function () {
    message.success('飞行计划状态已更新');
    setPlanEditOpen(false);
  };

  var FILED_COLUMNS = [
    { title: '飞行器编号', dataIndex: 'id', key: 'id' },
    { title: '型号', dataIndex: 'model', key: 'model' },
    { title: '类型', dataIndex: 'type', key: 'type', render: function (t: string) { return <Tag color="blue">{t}</Tag>; } },
    { title: '备案日期', dataIndex: 'filedDate', key: 'filedDate' },
    { title: '状态', dataIndex: 'status', key: 'status', render: function (s: string) { return <Tag color={s === '已备案' ? 'green' : 'orange'}>{s}</Tag>; } },
    { title: '操作', key: 'action', render: function (_: any, record: any) { return <a onClick={function () { showAircraftDetail(record); }}><EyeOutlined /> 查看</a>; } }
  ];

  var FILED_DATA = [
    { key: '1', id: 'UAV-BJ-2026-001', name: '作业一号机', model: 'DJI Mavic 3 Enterprise', type: '多旋翼无人机', weightClass: '轻型（1.5-25kg）', purpose: '航拍摄影', filedDate: '2026-01-15', status: '已备案', sn: 'DM3E20260115001', manufacturer: '深圳市大疆创新科技', purchaseDate: '2025-11-20', maxTakeoffWeight: '8.5kg', maxFlightAltitude: '120m', maxFlightTime: '45分钟', maxRange: '15km', maxSpeed: '82km/h', gpsCapability: 'RTK高精度定位', specialFeatures: '全向避障系统、IP45防护等级' },
    { key: '2', id: 'UAV-BJ-2026-002', name: '植保二号机', model: '大疆 T50 农业无人机', type: '多旋翼无人机', weightClass: '小型（25-150kg）', purpose: '农林植保', filedDate: '2026-03-20', status: '已备案', sn: 'DJT50202603200001', manufacturer: '深圳市大疆创新科技', purchaseDate: '2026-01-10', maxTakeoffWeight: '92kg', maxFlightAltitude: '30m', maxFlightTime: '20分钟', maxRange: '5km', maxSpeed: '45km/h', gpsCapability: '双频GPS+北斗', specialFeatures: 'RTK厘米级定位、仿地飞行' },
    { key: '3', id: 'UAV-BJ-2026-003', name: '巡检三号机', model: '纵横 CW-25', type: '固定翼无人机', weightClass: '轻型（1.5-25kg）', purpose: '巡检巡查', filedDate: '2026-02-15', status: '审核中', sn: 'ZHCW25202602150001', manufacturer: '成都纵横自动化技术', purchaseDate: '2026-02-15', maxTakeoffWeight: '18kg', maxFlightAltitude: '300m', maxFlightTime: '180分钟', maxRange: '50km', maxSpeed: '90km/h', gpsCapability: 'RTK高精度定位', specialFeatures: '垂直起降、长续航' }
  ];

  var MY_COLUMNS = [
    { title: '飞行器编号', dataIndex: 'id', key: 'id' },
    { title: '型号', dataIndex: 'model', key: 'model' },
    { title: '类型', dataIndex: 'type', key: 'type', render: function (t: string) { return <Tag color="purple">{t}</Tag>; } },
    { title: '购入日期', dataIndex: 'purchaseDate', key: 'purchaseDate' },
    { title: '飞行时长', dataIndex: 'flightHours', key: 'flightHours' },
    { title: '状态', dataIndex: 'status', key: 'status', render: function (s: string) { return <Tag color={s === '可用' ? 'green' : s === '维修中' ? 'orange' : 'red'}>{s}</Tag>; } },
    { title: '操作', key: 'action', render: function (_: any, record: any) { return <Space><a onClick={function () { showAircraftDetail(record); }}><EyeOutlined /> 查看</a><a onClick={function () { showAircraftEdit(record); }}><EditOutlined /> 编辑</a></Space>; } }
  ];

  var MY_DATA = [
    { key: '1', id: 'UAV-BJ-2026-001', name: '作业一号机', model: 'DJI Mavic 3 Enterprise', type: '多旋翼无人机', weightClass: '轻型（1.5-25kg）', purpose: '航拍摄影', purchaseDate: '2025-11-20', flightHours: '128h', status: '可用', sn: 'DM3E20260115001', manufacturer: '深圳市大疆创新科技', maxTakeoffWeight: '8.5kg', maxFlightAltitude: '120m', maxFlightTime: '45分钟', maxRange: '15km', maxSpeed: '82km/h', gpsCapability: 'RTK高精度定位', specialFeatures: '全向避障系统、IP45防护等级' },
    { key: '2', id: 'UAV-BJ-2026-002', name: '植保二号机', model: '大疆 T50 农业无人机', type: '多旋翼无人机', weightClass: '小型（25-150kg）', purpose: '农林植保', purchaseDate: '2026-01-10', flightHours: '56h', status: '可用', sn: 'DJT50202603200001', manufacturer: '深圳市大疆创新科技', maxTakeoffWeight: '92kg', maxFlightAltitude: '30m', maxFlightTime: '20分钟', maxRange: '5km', maxSpeed: '45km/h', gpsCapability: '双频GPS+北斗', specialFeatures: 'RTK厘米级定位、仿地飞行' },
    { key: '3', id: 'UAV-BJ-2026-003', name: '巡检三号机', model: '纵横 CW-25', type: '固定翼无人机', weightClass: '轻型（1.5-25kg）', purpose: '巡检巡查', purchaseDate: '2026-02-15', flightHours: '23h', status: '维修中', sn: 'ZHCW25202602150001', manufacturer: '成都纵横自动化技术', maxTakeoffWeight: '18kg', maxFlightAltitude: '300m', maxFlightTime: '180分钟', maxRange: '50km', maxSpeed: '90km/h', gpsCapability: 'RTK高精度定位', specialFeatures: '垂直起降、长续航' }
  ];

  var FILED_PLAN_COLUMNS = [
    { title: '计划编号', dataIndex: 'id', key: 'id' },
    { title: '飞行类型', dataIndex: 'flightType', key: 'flightType' },
    { title: '使用飞行器', dataIndex: 'aircraft', key: 'aircraft' },
    { title: '飞行空域', dataIndex: 'airspace', key: 'airspace' },
    { title: '日期', dataIndex: 'date', key: 'date' },
    { title: '时段', dataIndex: 'timeRange', key: 'timeRange' },
    { title: '状态', dataIndex: 'status', key: 'status', render: function (s: string) { return <Tag color={s === '已通过' ? 'green' : s === '审批中' ? 'orange' : s === '已完成' ? 'default' : 'red'}>{s}</Tag>; } },
    { title: '操作', key: 'action', render: function (_: any, record: any) { return <a onClick={function () { showPlanDetail(record); }}><EyeOutlined /> 查看</a>; } }
  ];

  var FILED_PLAN_DATA = [
    { key: '1', id: 'FP-BJ-2026-0088', name: '北区日常训练', flightType: '训练飞行', aircraft: 'DJI Mavic 3E（UAV-BJ-2026-001）', airspace: '北区训练空域（0-300m）', date: '2026-04-22', timeRange: '09:00-11:30', status: '审批中', pilot: '张明', pilotLicense: 'UAV-L-2026-0001', pilotPhone: '138****8888', organization: '', emergencyContact: 'dk20260009（138****1234）', flightPurpose: '日常飞行训练，提升操控技能', startTime: '09:00', endTime: '11:30', altitudeMin: '0', altitudeMax: '300', takeoffPoint: '北区训练场', landingPoint: '北区训练场', flightRoute: '训练场→北区训练空域→返回', insuranceStatus: '是', insuranceInfo: '平安保险 UAV-INS-2026-0001', safetyMeasures: '飞行前检查设备状态、保持视距内飞行', riskControl: '如遇突发天气立即返航', backupComm: '对讲机 433.125MHz', weatherCondition: '风速≤5级、能见度≥3km', remarks: '' },
    { key: '2', id: 'FP-BJ-2026-0079', name: '东区电力巡检', flightType: '巡检飞行', aircraft: '纵横 CW-25（UAV-BJ-2026-003）', airspace: '东区巡检航线（30-120m）', date: '2026-04-20', timeRange: '14:00-17:00', status: '已通过', pilot: '张明', pilotLicense: 'UAV-L-2026-0001', pilotPhone: '138****8888', organization: 'XX测绘工程有限公司', emergencyContact: 'dk20260010（139****5678）', flightPurpose: '东区电力线路定期巡检，排查线路隐患', startTime: '14:00', endTime: '17:00', altitudeMin: '30', altitudeMax: '120', takeoffPoint: '东区变电站', landingPoint: '东区变电站', flightRoute: '东区变电站→沿电力线路→巡检终点→返回', insuranceStatus: '是', insuranceInfo: '中国人保 UAV-INS-2026-0001', safetyMeasures: '配备红外热成像设备、实时数据回传、地面站监控', riskControl: '紧急降落点：沿线变电站空地', backupComm: '对讲机 433.125MHz', weatherCondition: '风速≤5级、能见度≥3km', remarks: '' },
    { key: '3', id: 'FP-BJ-2026-0065', name: '南区农业植保', flightType: '作业飞行', aircraft: '大疆 T50（UAV-BJ-2026-002）', airspace: '南区试飞区（0-500m）', date: '2026-04-18', timeRange: '08:00-15:00', status: '已完成', pilot: '张明', pilotLicense: 'UAV-L-2026-0001', pilotPhone: '138****8888', organization: 'XX农业科技有限公司', emergencyContact: 'dk20260008（137****9012）', flightPurpose: '南区农田植保喷洒作业', startTime: '08:00', endTime: '15:00', altitudeMin: '3', altitudeMax: '10', takeoffPoint: '南区农田作业点', landingPoint: '南区农田作业点', flightRoute: '作业点→农田区域→返回', insuranceStatus: '是', insuranceInfo: '中国人保 UAV-INS-2026-0002', safetyMeasures: '仿地飞行、自动避障、作业区域隔离', riskControl: '紧急降落点：田埂空地', backupComm: '手机 138****8888', weatherCondition: '风速≤3级、无降水', remarks: '' }
  ];

  var MY_PLAN_COLUMNS = [
    { title: '计划编号', dataIndex: 'id', key: 'id' },
    { title: '飞行类型', dataIndex: 'flightType', key: 'flightType' },
    { title: '使用飞行器', dataIndex: 'aircraft', key: 'aircraft' },
    { title: '飞行空域', dataIndex: 'airspace', key: 'airspace' },
    { title: '日期', dataIndex: 'date', key: 'date' },
    { title: '实际时长', dataIndex: 'actualHours', key: 'actualHours' },
    { title: '状态', dataIndex: 'status', key: 'status', render: function (s: string) { return <Tag color={s === '执行中' ? 'blue' : s === '已完成' ? 'green' : 'default'}>{s}</Tag>; } },
    { title: '操作', key: 'action', render: function (_: any, record: any) { return <Space><a onClick={function () { showPlanDetail(record); }}><EyeOutlined /> 查看</a><a onClick={function () { showPlanEdit(record); }}><EditOutlined /> 编辑</a></Space>; } }
  ];

  var MY_PLAN_DATA = [
    { key: '1', id: 'FP-BJ-2026-0079', name: '东区电力巡检', flightType: '巡检飞行', aircraft: '纵横 CW-25（UAV-BJ-2026-003）', airspace: '东区巡检航线（30-120m）', date: '2026-04-20', actualHours: '2.5h', status: '已完成', pilot: '张明', pilotLicense: 'UAV-L-2026-0001', pilotPhone: '138****8888', organization: 'XX测绘工程有限公司', emergencyContact: 'dk20260010（139****5678）', flightPurpose: '东区电力线路定期巡检，排查线路隐患', startTime: '14:00', endTime: '17:00', altitudeMin: '30', altitudeMax: '120', takeoffPoint: '东区变电站', landingPoint: '东区变电站', flightRoute: '东区变电站→沿电力线路→巡检终点→返回', insuranceStatus: '是', insuranceInfo: '中国人保 UAV-INS-2026-0001', safetyMeasures: '配备红外热成像设备、实时数据回传、地面站监控', riskControl: '紧急降落点：沿线变电站空地', backupComm: '对讲机 433.125MHz', weatherCondition: '风速≤5级、能见度≥3km', remarks: '' },
    { key: '2', id: 'FP-BJ-2026-0065', name: '南区农业植保', flightType: '作业飞行', aircraft: '大疆 T50（UAV-BJ-2026-002）', airspace: '南区试飞区（0-500m）', date: '2026-04-18', actualHours: '5.5h', status: '已完成', pilot: '张明', pilotLicense: 'UAV-L-2026-0001', pilotPhone: '138****8888', organization: 'XX农业科技有限公司', emergencyContact: 'dk20260008（137****9012）', flightPurpose: '南区农田植保喷洒作业', startTime: '08:00', endTime: '15:00', altitudeMin: '3', altitudeMax: '10', takeoffPoint: '南区农田作业点', landingPoint: '南区农田作业点', flightRoute: '作业点→农田区域→返回', insuranceStatus: '是', insuranceInfo: '中国人保 UAV-INS-2026-0002', safetyMeasures: '仿地飞行、自动避障、作业区域隔离', riskControl: '紧急降落点：田埂空地', backupComm: '手机 138****8888', weatherCondition: '风速≤3级、无降水', remarks: '' }
  ];

  var renderContent = function () {
    if (activeMenu === 'profile-certified') {
      return (
        <>
          <Card
            title="基本信息"
            extra={<Button type={editMode ? 'default' : 'primary'} onClick={function () { setEditMode(!editMode); }}>{editMode ? '取消编辑' : '编辑信息'}</Button>}
            style={{ borderRadius: 12 }}
          >
            {editMode ? (
              <Form form={form} layout="vertical" initialValues={{ name: '新用户', phone: '138****8888', email: '' }}>
                <Row gutter={16}>
                  <Col span={12}><Form.Item name="name" label="昵称" rules={[{ required: true }]}><Input size="large" /></Form.Item></Col>
                  <Col span={12}><Form.Item name="phone" label="联系电话" rules={[{ required: true }]}><Input size="large" /></Form.Item></Col>
                </Row>
                <Form.Item name="email" label="邮箱"><Input size="large" /></Form.Item>
                <Form.Item>
                  <Button type="primary" size="large" onClick={handleSave} style={{ minWidth: 120 }}>保存</Button>
                </Form.Item>
              </Form>
            ) : (
              <Descriptions column={2} bordered>
                <Descriptions.Item label="昵称">新用户</Descriptions.Item>
                <Descriptions.Item label="联系电话">138****8888</Descriptions.Item>
                <Descriptions.Item label="邮箱">未设置</Descriptions.Item>
                <Descriptions.Item label="注册时间">2026-04-27</Descriptions.Item>
                <Descriptions.Item label="账户状态"><Tag color="green">正常</Tag></Descriptions.Item>
              </Descriptions>
            )}
          </Card>

          <Card title="认证信息" style={{ borderRadius: 12 }}>
            <Descriptions column={2} bordered>
              <Descriptions.Item label="认证状态"><Tag color="green">已认证</Tag></Descriptions.Item>
              <Descriptions.Item label="认证角色"><Tag color="#52c41a">飞手</Tag></Descriptions.Item>
              <Descriptions.Item label="认证时间">2026-04-29 14:20</Descriptions.Item>
              <Descriptions.Item label="认证编号">CERT-2026-0001</Descriptions.Item>
            </Descriptions>
          </Card>

          <Card title="认证资料" style={{ borderRadius: 12 }}>
            <Descriptions column={2} bordered>
              <Descriptions.Item label="真实姓名">张明</Descriptions.Item>
              <Descriptions.Item label="身份证号">330102199803055678</Descriptions.Item>
              <Descriptions.Item label="驾驶证编号">UAV-P-2024-0088</Descriptions.Item>
              <Descriptions.Item label="驾驶等级">
                <Tag>多旋翼</Tag><Tag>固定翼</Tag>
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </>
      );
    }

    if (activeMenu === 'my-aircraft') {
      return (
        <Card
          title="我的飞行器"
          extra={<Button type="primary" icon={<PlusOutlined />} onClick={function () { handleNavigate('register-aircraft'); }}>备案飞行器</Button>}
          style={{ borderRadius: 12 }}
        >
          <Tabs
            activeKey={aircraftTab}
            onChange={setAircraftTab}
            items={[
              { key: 'filed', label: '备案飞行器', children: <Table columns={FILED_COLUMNS} dataSource={FILED_DATA} pagination={false} /> },
              { key: 'my', label: '我的飞行器', children: <Table columns={MY_COLUMNS} dataSource={MY_DATA} pagination={false} /> }
            ]}
          />
        </Card>
      );
    }

    if (activeMenu === 'my-flight-plan') {
      return (
        <Card
          title="我的飞行计划"
          extra={<Button type="primary" icon={<PlusOutlined />} onClick={function () { handleNavigate('register-flight-plan'); }}>申报飞行计划</Button>}
          style={{ borderRadius: 12 }}
        >
          <Tabs
            activeKey={planTab}
            onChange={setPlanTab}
            items={[
              { key: 'filed', label: '备案飞行计划', children: <Table columns={FILED_PLAN_COLUMNS} dataSource={FILED_PLAN_DATA} pagination={false} /> },
              { key: 'my', label: '我的飞行计划', children: <Table columns={MY_PLAN_COLUMNS} dataSource={MY_PLAN_DATA} pagination={false} /> }
            ]}
          />
        </Card>
      );
    }

    return null;
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f5f7fa' }}>
      <header style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)', padding: '0 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 56 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <SafetyCertificateOutlined style={{ fontSize: 20, color: '#fff' }} />
            <span style={{ fontSize: 16, fontWeight: 600, color: '#fff' }}>低空公共服务平台</span>
          </div>
          <div style={{ display: 'flex', gap: 24 }}>
            {MENU_ITEMS.map(function (item) {
              return <a key={item.key} style={{ color: item.key === 'profile-certified' ? '#fff' : 'rgba(255,255,255,0.65)', fontWeight: item.key === 'profile-certified' ? 600 : 400, cursor: 'pointer', fontSize: 14 }} onClick={function () { if (item.key !== 'profile-certified') handleNavigate(item.key); }}>{item.label}</a>;
            })}
          </div>
        </div>
      </header>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: 24 }}>
        <Breadcrumb items={[{ title: <span onClick={function () { handleNavigate('home'); }} style={{ cursor: 'pointer' }}>首页</span> }, { title: '个人中心' }]} style={{ marginBottom: 16 }} />

        <div style={{ display: 'flex', gap: 24 }}>
          <Card style={{ borderRadius: 12, width: 240, flexShrink: 0 }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '16px 0' }}>
              <Avatar size={72} icon={<UserOutlined />} style={{ backgroundColor: '#1677ff', marginBottom: 12 }} />
              <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 4 }}>张明</div>
              <Tag color="green" icon={<CheckCircleOutlined />}>已认证</Tag>
              <div style={{ marginTop: 8, fontSize: 13, color: '#8c8c8c' }}>
                <RocketOutlined style={{ marginRight: 4 }} />飞手
              </div>
            </div>
            <div style={{ marginTop: 16, borderTop: '1px solid #f0f0f0', paddingTop: 16 }}>
              {MENU_ITEMS.map(function (item) {
                var isActive = item.key === activeMenu;
                return (
                  <div key={item.key}>
                    {item.group ? <div style={{ fontSize: 11, color: '#bfbfbf', padding: '12px 16px 4px', fontWeight: 600, letterSpacing: 1 }}>{item.group}</div> : null}
                    <div
                      onClick={function () { 
                        if (['profile-certified', 'my-aircraft', 'my-flight-plan'].includes(item.key)) { 
                          setActiveMenu(item.key); 
                        } else { 
                          handleNavigate(item.key); 
                        } 
                      }}
                      style={{
                        padding: '10px 16px',
                        borderRadius: 8,
                        cursor: 'pointer',
                        background: isActive ? '#fff0f6' : 'transparent',
                        color: isActive ? '#eb2f96' : '#595959',
                        fontWeight: isActive ? 600 : 400,
                        fontSize: 14
                      }}
                    >
                      {item.label}
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 24 }}>
            {renderContent()}
          </div>
        </div>
      </div>

      <Modal
        title="飞行器详情"
        open={aircraftDetailOpen}
        onCancel={function () { setAircraftDetailOpen(false); }}
        footer={<Button onClick={function () { setAircraftDetailOpen(false); }}>关闭</Button>}
        width={760}
      >
        {currentAircraft && (
          <div style={{ marginTop: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
              <FileTextOutlined style={{ color: '#1677ff', fontSize: 16 }} />
              <span style={{ fontSize: 15, fontWeight: 600 }}>基本信息</span>
            </div>
            <Descriptions column={2} bordered size="small">
              <Descriptions.Item label="备案编号">{currentAircraft.id}</Descriptions.Item>
              <Descriptions.Item label="飞行器名称">{currentAircraft.name}</Descriptions.Item>
              <Descriptions.Item label="型号规格">{currentAircraft.model}</Descriptions.Item>
              <Descriptions.Item label="飞行器类型"><Tag color="blue">{currentAircraft.type}</Tag></Descriptions.Item>
              <Descriptions.Item label="序列号/SN码">{currentAircraft.sn}</Descriptions.Item>
              <Descriptions.Item label="制造商">{currentAircraft.manufacturer}</Descriptions.Item>
              <Descriptions.Item label="重量分类">{currentAircraft.weightClass}</Descriptions.Item>
              <Descriptions.Item label="使用用途">{currentAircraft.purpose}</Descriptions.Item>
              <Descriptions.Item label="购置日期">{currentAircraft.purchaseDate}</Descriptions.Item>
              <Descriptions.Item label="状态"><Tag color={currentAircraft.status === '已备案' || currentAircraft.status === '可用' ? 'green' : 'orange'}>{currentAircraft.status}</Tag></Descriptions.Item>
              {currentAircraft.filedDate && <Descriptions.Item label="备案日期">{currentAircraft.filedDate}</Descriptions.Item>}
              {currentAircraft.flightHours && <Descriptions.Item label="累计飞行">{currentAircraft.flightHours}</Descriptions.Item>}
            </Descriptions>

            <Divider />
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
              <InboxOutlined style={{ color: '#722ed1', fontSize: 16 }} />
              <span style={{ fontSize: 15, fontWeight: 600 }}>技术参数</span>
            </div>
            <Descriptions column={2} bordered size="small">
              <Descriptions.Item label="最大起飞重量">{currentAircraft.maxTakeoffWeight}</Descriptions.Item>
              <Descriptions.Item label="最大飞行高度">{currentAircraft.maxFlightAltitude}</Descriptions.Item>
              <Descriptions.Item label="最大续航时间">{currentAircraft.maxFlightTime}</Descriptions.Item>
              <Descriptions.Item label="最大控制距离">{currentAircraft.maxRange}</Descriptions.Item>
              <Descriptions.Item label="最大飞行速度">{currentAircraft.maxSpeed}</Descriptions.Item>
              <Descriptions.Item label="定位能力">{currentAircraft.gpsCapability}</Descriptions.Item>
              <Descriptions.Item label="特殊功能" span={2}>{currentAircraft.specialFeatures || '无'}</Descriptions.Item>
            </Descriptions>

            <Divider />
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
              <UploadOutlined style={{ color: '#13c2c2', fontSize: 16 }} />
              <span style={{ fontSize: 15, fontWeight: 600 }}>上传材料</span>
            </div>
            <Row gutter={16}>
              <Col span={8}>
                <div style={{ border: '1px solid #f0f0f0', borderRadius: 8, overflow: 'hidden' }}>
                  <div style={{ position: 'relative', height: 160, background: '#fafafa', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Image
                      src="https://placehold.co/400x300/f0f5ff/1677ff?text=购买凭证"
                      alt="购买凭证"
                      style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                      preview={{ mask: <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}><ZoomInOutlined style={{ fontSize: 20 }} /><span>预览</span></div> }}
                    />
                  </div>
                  <div style={{ padding: '8px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #f0f0f0' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <FileImageOutlined style={{ color: '#1677ff' }} />
                      <span style={{ fontSize: 13 }}>购买凭证.jpg</span>
                    </div>
                    <Tag color="green" style={{ margin: 0 }}>已上传</Tag>
                  </div>
                </div>
              </Col>
              <Col span={8}>
                <div style={{ border: '1px solid #f0f0f0', borderRadius: 8, overflow: 'hidden' }}>
                  <div style={{ position: 'relative', height: 160, background: '#fafafa', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Image
                      src="https://placehold.co/400x300/f6ffed/52c41a?text=合格证明"
                      alt="合格证明"
                      style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                      preview={{ mask: <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}><ZoomInOutlined style={{ fontSize: 20 }} /><span>预览</span></div> }}
                    />
                  </div>
                  <div style={{ padding: '8px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #f0f0f0' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <FilePdfOutlined style={{ color: '#f5222d' }} />
                      <span style={{ fontSize: 13 }}>合格证明.pdf</span>
                    </div>
                    <Tag color="green" style={{ margin: 0 }}>已上传</Tag>
                  </div>
                </div>
              </Col>
              <Col span={8}>
                <div style={{ border: '1px dashed #d9d9d9', borderRadius: 8, overflow: 'hidden' }}>
                  <div style={{ position: 'relative', height: 160, background: '#fafafa', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8, color: '#bfbfbf' }}>
                    <UploadOutlined style={{ fontSize: 32 }} />
                    <span style={{ fontSize: 13 }}>暂未上传</span>
                  </div>
                  <div style={{ padding: '8px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px dashed #d9d9d9' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <FileImageOutlined style={{ color: '#bfbfbf' }} />
                      <span style={{ fontSize: 13, color: '#bfbfbf' }}>其他材料</span>
                    </div>
                    <Tag style={{ margin: 0 }}>未上传</Tag>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        )}
      </Modal>

      <Modal
        title="飞行计划详情"
        open={planDetailOpen}
        onCancel={function () { setPlanDetailOpen(false); }}
        footer={<Button onClick={function () { setPlanDetailOpen(false); }}>关闭</Button>}
        width={760}
      >
        {currentPlan && (
          <div style={{ marginTop: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
              <FileTextOutlined style={{ color: '#1677ff', fontSize: 16 }} />
              <span style={{ fontSize: 15, fontWeight: 600 }}>基础信息</span>
            </div>
            <Descriptions column={2} bordered size="small">
              <Descriptions.Item label="计划编号">{currentPlan.id}</Descriptions.Item>
              <Descriptions.Item label="计划名称">{currentPlan.name}</Descriptions.Item>
              <Descriptions.Item label="飞行类型">{currentPlan.flightType}</Descriptions.Item>
              <Descriptions.Item label="使用飞行器">{currentPlan.aircraft}</Descriptions.Item>
              <Descriptions.Item label="驾驶员姓名">{currentPlan.pilot}</Descriptions.Item>
              <Descriptions.Item label="驾驶员执照编号">{currentPlan.pilotLicense}</Descriptions.Item>
              <Descriptions.Item label="联系电话">{currentPlan.pilotPhone}</Descriptions.Item>
              <Descriptions.Item label="所属单位">{currentPlan.organization || '—'}</Descriptions.Item>
              <Descriptions.Item label="应急联系人">{currentPlan.emergencyContact}</Descriptions.Item>
              <Descriptions.Item label="飞行目的描述" span={2}>{currentPlan.flightPurpose}</Descriptions.Item>
              <Descriptions.Item label="状态"><Tag color={currentPlan.status === '已通过' ? 'green' : currentPlan.status === '审批中' ? 'orange' : 'default'}>{currentPlan.status}</Tag></Descriptions.Item>
              {currentPlan.actualHours && <Descriptions.Item label="实际时长">{currentPlan.actualHours}</Descriptions.Item>}
            </Descriptions>

            <Divider />
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
              <InboxOutlined style={{ color: '#722ed1', fontSize: 16 }} />
              <span style={{ fontSize: 15, fontWeight: 600 }}>时空参数</span>
            </div>
            <Descriptions column={2} bordered size="small">
              <Descriptions.Item label="使用空域/航线">{currentPlan.airspace}</Descriptions.Item>
              <Descriptions.Item label="飞行日期">{currentPlan.date}</Descriptions.Item>
              <Descriptions.Item label="预计起飞时间">{currentPlan.startTime}</Descriptions.Item>
              <Descriptions.Item label="预计降落时间">{currentPlan.endTime}</Descriptions.Item>
              <Descriptions.Item label="最低飞行高度">{currentPlan.altitudeMin}m</Descriptions.Item>
              <Descriptions.Item label="最高飞行高度">{currentPlan.altitudeMax}m</Descriptions.Item>
              <Descriptions.Item label="起飞点">{currentPlan.takeoffPoint}</Descriptions.Item>
              <Descriptions.Item label="降落点">{currentPlan.landingPoint}</Descriptions.Item>
              <Descriptions.Item label="飞行路线描述" span={2}>{currentPlan.flightRoute}</Descriptions.Item>
            </Descriptions>

            <Divider />
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
              <SafetyCertificateOutlined style={{ color: '#eb2f96', fontSize: 16 }} />
              <span style={{ fontSize: 15, fontWeight: 600 }}>安全措施</span>
            </div>
            <Descriptions column={2} bordered size="small">
              <Descriptions.Item label="是否已购买飞行保险"><Tag color={currentPlan.insuranceStatus === '是' ? 'green' : 'red'}>{currentPlan.insuranceStatus}</Tag></Descriptions.Item>
              <Descriptions.Item label="保险信息">{currentPlan.insuranceInfo || '—'}</Descriptions.Item>
              <Descriptions.Item label="安全保障措施" span={2}>{currentPlan.safetyMeasures}</Descriptions.Item>
              <Descriptions.Item label="风险管控预案" span={2}>{currentPlan.riskControl}</Descriptions.Item>
              <Descriptions.Item label="备用通信方式">{currentPlan.backupComm}</Descriptions.Item>
              <Descriptions.Item label="气象条件要求">{currentPlan.weatherCondition}</Descriptions.Item>
              <Descriptions.Item label="备注" span={2}>{currentPlan.remarks || '无'}</Descriptions.Item>
            </Descriptions>
          </div>
        )}
      </Modal>

      <Modal
        title="编辑飞行器状态"
        open={aircraftEditOpen}
        onCancel={function () { setAircraftEditOpen(false); }}
        footer={[<Button key="cancel" onClick={function () { setAircraftEditOpen(false); }}>关闭</Button>, <Button key="save" type="primary" onClick={handleAircraftEditSave}>保存</Button>]}
        width={400}
      >
        {currentAircraft && (
          <div style={{ padding: '16px 0' }}>
            <div style={{ marginBottom: 16 }}>
              <span style={{ color: '#8c8c8c' }}>飞行器编号：</span>
              <span style={{ fontWeight: 600 }}>{currentAircraft.id}</span>
            </div>
            <div style={{ marginBottom: 16 }}>
              <span style={{ color: '#8c8c8c' }}>型号：</span>
              <span>{currentAircraft.model}</span>
            </div>
            <div style={{ marginBottom: 8 }}>
              <span style={{ color: '#8c8c8c' }}>状态：</span>
            </div>
            <Select
              value={aircraftStatus}
              onChange={setAircraftStatus}
              style={{ width: '100%' }}
              options={[
                { value: '可用', label: '可用' },
                { value: '维修中', label: '维修中' },
                { value: '报废', label: '报废' }
              ]}
            />
          </div>
        )}
      </Modal>

      <Modal
        title="编辑飞行计划状态"
        open={planEditOpen}
        onCancel={function () { setPlanEditOpen(false); }}
        footer={[<Button key="cancel" onClick={function () { setPlanEditOpen(false); }}>关闭</Button>, <Button key="save" type="primary" onClick={handlePlanEditSave}>保存</Button>]}
        width={400}
      >
        {currentPlan && (
          <div style={{ padding: '16px 0' }}>
            <div style={{ marginBottom: 16 }}>
              <span style={{ color: '#8c8c8c' }}>计划编号：</span>
              <span style={{ fontWeight: 600 }}>{currentPlan.id}</span>
            </div>
            <div style={{ marginBottom: 16 }}>
              <span style={{ color: '#8c8c8c' }}>飞行类型：</span>
              <span>{currentPlan.flightType}</span>
            </div>
            <div style={{ marginBottom: 8 }}>
              <span style={{ color: '#8c8c8c' }}>状态：</span>
            </div>
            <Select
              value={planStatus}
              onChange={setPlanStatus}
              style={{ width: '100%' }}
              options={[
                { value: '执行中', label: '执行中' },
                { value: '已完成', label: '已完成' },
                { value: '已取消', label: '已取消' }
              ]}
            />
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Component;
