/**
 * @name 飞行计划审批
 * @mode axure
 * /Users/xu/Desktop/元引信息/Axhub-Make-main/skills/axure-export-workflow/SKILL.md
 *
 */

import './style.css';

import React, { useState, useCallback } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { Card, Table, Tag, Button, Breadcrumb, Space, Modal, Input, Select, message, Tooltip, Descriptions, Divider } from 'antd';
import { SettingOutlined, EyeOutlined, SearchOutlined, CheckCircleOutlined, CloseCircleOutlined, FileTextOutlined, ClockCircleOutlined, SafetyCertificateOutlined, EnvironmentOutlined } from '@ant-design/icons';



var FLIGHT_TYPES = [
  { value: 'training', label: '训练飞行' },
  { value: 'operation', label: '作业飞行' },
  { value: 'inspection', label: '巡检飞行' },
  { value: 'logistics', label: '物流配送' },
  { value: 'photography', label: '航拍测绘' },
  { value: 'emergency', label: '应急救援' },
  { value: 'test', label: '试飞测试' },
  { value: 'other', label: '其他' }
];

var STATUS_MAP: Record<string, { text: string; color: string }> = {
  pending: { text: '待审批', color: 'orange' },
  approved: { text: '已通过', color: 'green' },
  rejected: { text: '已驳回', color: 'red' }
};

var TABLE_DATA = [
  {
    key: '1', id: 1, planId: 'FP-BJ-2026-0201', name: '城东测绘巡检', flightType: '巡检飞行', aircraft: '纵横 CW-25（UAV-BJ-2026-003）', airspace: '东区巡检航线（30-120m）', date: '2026-04-28', timeRange: '08:00-12:00', pilot: '李明', applicant: 'XX测绘工程有限公司', status: 'pending',
    pilotLicense: 'UAV-L-2026-0088', pilotPhone: '138****5678', organization: 'XX测绘工程有限公司', emergencyContact: 'dk20260009（138****1234）', flightPurpose: '城东片区电力线路定期巡检，航拍数据采集与分析，确保线路安全运行',
    startTime: '08:00', endTime: '12:00', altitudeMin: '30', altitudeMax: '120', takeoffPoint: '城东起降场A区', landingPoint: '城东起降场A区', flightRoute: '城东起降场→沿电力线路→东区巡检航线→返回起降场',
    insuranceStatus: '是', insuranceInfo: '中国人保 UAV-INS-2026-0088', safetyMeasures: '配备实时监控地面站、备用飞行器、紧急降落预案', riskControl: '如遇突发天气变化立即返航，备用降落点：城东公园广场', backupComm: '对讲机 433.125MHz', weatherCondition: '风速≤5级、能见度≥3km、无降水、无雷电活动', remarks: '',
    rejectReason: ''
  },
  {
    key: '2', id: 2, planId: 'FP-BJ-2026-0199', name: '南区航拍摄影', flightType: '航拍测绘', aircraft: 'DJI Mavic 3E（UAV-BJ-2026-001）', airspace: '南区试飞区（0-500m）', date: '2026-04-27', timeRange: '09:00-11:30', pilot: '张伟', applicant: '张伟', status: 'pending',
    pilotLicense: 'UAV-L-2026-0001', pilotPhone: '139****1234', organization: '', emergencyContact: 'dk20260010（139****5678）', flightPurpose: '南区城市景观航拍，用于城市规划展示宣传片拍摄',
    startTime: '09:00', endTime: '11:30', altitudeMin: '50', altitudeMax: '200', takeoffPoint: '南区市民广场', landingPoint: '南区市民广场', flightRoute: '市民广场→沿江景观带→南区公园→返回',
    insuranceStatus: '是', insuranceInfo: '平安保险 UAV-INS-2026-0001', safetyMeasures: '飞行前检查设备状态、保持视距内飞行、配备观察员', riskControl: '如信号丢失自动返航，备用降落点：南区体育场', backupComm: '手机 139****1234', weatherCondition: '风速≤4级、能见度≥5km、无降水', remarks: '',
    rejectReason: ''
  },
  {
    key: '3', id: 3, planId: 'FP-BJ-2026-0195', name: '物流配送测试', flightType: '物流配送', aircraft: '亿航 EH216-S（UAV-BJ-2026-004）', airspace: '城东物流走廊（50-200m）', date: '2026-04-25', timeRange: '10:00-16:00', pilot: '王芳', applicant: 'XX通航公司', status: 'approved',
    pilotLicense: 'UAV-L-2026-0055', pilotPhone: '137****9012', organization: 'XX通航公司', emergencyContact: 'dk20260008（137****9012）', flightPurpose: '城东至城西物流配送航线测试，验证eVTOL载货飞行可行性',
    startTime: '10:00', endTime: '16:00', altitudeMin: '80', altitudeMax: '200', takeoffPoint: '城东物流中心起降坪', landingPoint: '城西配送站起降坪', flightRoute: '城东物流中心→城东物流走廊→城西配送站',
    insuranceStatus: '是', insuranceInfo: '太平洋保险 UAV-INS-2026-0055', safetyMeasures: '全程远程监控、双机备份、地面保障团队随行', riskControl: '紧急降落点：沿线3个应急停机坪', backupComm: '对讲机 433.200MHz + 卫星电话', weatherCondition: '风速≤3级、能见度≥5km、无降水、无雷电活动、云底高度≥300m', remarks: '首次载人级eVTOL物流测试飞行',
    rejectReason: ''
  },
  {
    key: '4', id: 4, planId: 'FP-BJ-2026-0188', name: '电力线路巡检', flightType: '巡检飞行', aircraft: '纵横 CW-25（UAV-BJ-2026-003）', airspace: '西区巡检航线（30-120m）', date: '2026-04-22', timeRange: '14:00-17:00', pilot: '李明', applicant: 'XX测绘工程有限公司', status: 'approved',
    pilotLicense: 'UAV-L-2026-0088', pilotPhone: '138****5678', organization: 'XX测绘工程有限公司', emergencyContact: 'dk20260009（138****1234）', flightPurpose: '西区高压输电线路红外巡检，排查线路隐患',
    startTime: '14:00', endTime: '17:00', altitudeMin: '30', altitudeMax: '80', takeoffPoint: '西区变电站', landingPoint: '西区变电站', flightRoute: '西区变电站→沿高压线路→巡检终点→返回',
    insuranceStatus: '是', insuranceInfo: '中国人保 UAV-INS-2026-0088', safetyMeasures: '配备红外热成像设备、实时数据回传、地面站监控', riskControl: '紧急降落点：沿线变电站空地', backupComm: '对讲机 433.125MHz', weatherCondition: '风速≤5级、能见度≥3km', remarks: '',
    rejectReason: ''
  },
  {
    key: '5', id: 5, planId: 'FP-BJ-2026-0180', name: '应急救援演练', flightType: '应急救援', aircraft: 'DJI M350 RTK（UAV-BJ-2026-006）', airspace: '城北训练区（0-300m）', date: '2026-04-20', timeRange: '08:00-15:00', pilot: '赵刚', applicant: '市应急管理局', status: 'rejected',
    pilotLicense: 'UAV-L-2026-0020', pilotPhone: '136****3456', organization: '市应急管理局', emergencyContact: 'dk20260011（136****3456）', flightPurpose: '城北区域应急救援演练，模拟山区搜救场景',
    startTime: '08:00', endTime: '15:00', altitudeMin: '50', altitudeMax: '300', takeoffPoint: '城北训练基地', landingPoint: '城北训练基地', flightRoute: '训练基地→模拟搜救区域→物资投送点→返回',
    insuranceStatus: '办理中', insuranceInfo: '', safetyMeasures: '配备搜救设备、热成像仪、喊话器', riskControl: '紧急降落点：训练基地备用场地', backupComm: '对讲机 433.300MHz', weatherCondition: '风速≤4级、能见度≥3km', remarks: '年度应急演练计划',
    rejectReason: '保险尚未办理完成，请补充保险凭证后重新提交'
  }
];

var Component = function AdminFlightPlanPage() {
  var [viewOpen, setViewOpen] = useState(false);
  var [rejectOpen, setRejectOpen] = useState(false);
  var [rejectReason, setRejectReason] = useState('');
  var [currentRecord, setCurrentRecord] = useState<typeof TABLE_DATA[0] | null>(null);

  var handleNavigate = useCallback(function (key: string) {
    window.location.href = '/prototypes/' + key;
  }, []);

  var handleView = function (record: typeof TABLE_DATA[0]) {
    setCurrentRecord(record);
    setViewOpen(true);
  };

  var handleApprove = function (record: typeof TABLE_DATA[0]) {
    message.success('飞行计划 ' + record.planId + ' 审批通过');
  };

  var handleRejectClick = function (record: typeof TABLE_DATA[0]) {
    setCurrentRecord(record);
    setRejectReason('');
    setRejectOpen(true);
  };

  var handleRejectConfirm = function () {
    if (!rejectReason.trim()) {
      message.warning('请填写驳回原因');
      return;
    }
    message.success('已驳回飞行计划 ' + (currentRecord?.planId || ''));
    setRejectOpen(false);
    setRejectReason('');
  };

  var columns = [
    { title: '序号', dataIndex: 'id', key: 'id', width: 60 },
    { title: '计划编号', dataIndex: 'planId', key: 'planId', width: 140 },
    { title: '计划名称', dataIndex: 'name', key: 'name', width: 130, render: function (t: string) { return <span style={{ fontWeight: 500 }}>{t}</span>; } },
    { title: '飞行类型', dataIndex: 'flightType', key: 'flightType', width: 100, render: function (t: string) { return <Tag color="blue">{t}</Tag>; } },
    { title: '飞行器', dataIndex: 'aircraft', key: 'aircraft', width: 200 },
    { title: '使用空域', dataIndex: 'airspace', key: 'airspace', width: 170 },
    { title: '飞行日期', dataIndex: 'date', key: 'date', width: 110 },
    { title: '时间段', dataIndex: 'timeRange', key: 'timeRange', width: 120 },
    { title: '驾驶员', dataIndex: 'pilot', key: 'pilot', width: 80 },
    { title: '申请人', dataIndex: 'applicant', key: 'applicant', width: 140 },
    { title: '状态', dataIndex: 'status', key: 'status', width: 90, render: function (t: string) { var s = STATUS_MAP[t]; return <Tag color={s.color}>{s.text}</Tag>; } },
    { title: '操作', key: 'action', width: 100, fixed: 'right' as const, render: function (_: any, record: typeof TABLE_DATA[0]) {
      return (
        <Space size={4}>
          <Tooltip title="查看详情"><Button type="text" size="small" icon={<EyeOutlined />} style={{ color: '#1677ff' }} onClick={function () { handleView(record); }} /></Tooltip>
        </Space>
      );
    }}
  ];

  return (
    <AdminLayout activeKey="admin-flight-plan">
      

      <div style={{ maxWidth: 1400, margin: '0 auto', padding: 24 }}>
        <Breadcrumb items={[{ title: '飞行审批' }, { title: '飞行计划审批' }]} style={{ marginBottom: 16 }} />
        <Card style={{ borderRadius: 12 }}>
          <div style={{ display: 'flex', gap: 12, marginBottom: 16, flexWrap: 'wrap' }}>
            <Input prefix={<SearchOutlined />} placeholder="搜索计划编号/名称/申请人" style={{ width: 260 }} allowClear />
            <Select placeholder="飞行类型" style={{ width: 140 }} options={FLIGHT_TYPES} allowClear />
            <Select placeholder="审批状态" style={{ width: 120 }} options={[{ value: 'pending', label: '待审批' }, { value: 'approved', label: '已通过' }, { value: 'rejected', label: '已驳回' }]} allowClear />
            <Button type="primary" icon={<SearchOutlined />}>查询</Button>
            <Button>重置</Button>
          </div>
          <Table columns={columns} dataSource={TABLE_DATA} pagination={{ pageSize: 10 }} scroll={{ x: 1600 }} />
        </Card>
      </div>

      <Modal title="飞行计划详情" open={viewOpen} onCancel={function () { setViewOpen(false); }} width={800} footer={currentRecord?.status === 'pending' ? [
        <Button key="reject" danger icon={<CloseCircleOutlined />} onClick={function () { setViewOpen(false); handleRejectClick(currentRecord); }}>驳回</Button>,
        <Button key="approve" type="primary" icon={<CheckCircleOutlined />} onClick={function () { setViewOpen(false); handleApprove(currentRecord); }}>审批通过</Button>
      ] : <Button onClick={function () { setViewOpen(false); }}>关闭</Button>}>
        {currentRecord && (
          <div style={{ marginTop: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
              <FileTextOutlined style={{ color: '#1677ff', fontSize: 16 }} />
              <span style={{ fontSize: 15, fontWeight: 600 }}>基础信息</span>
            </div>
            <Descriptions column={2} bordered size="small">
              <Descriptions.Item label="计划编号">{currentRecord.planId}</Descriptions.Item>
              <Descriptions.Item label="计划名称">{currentRecord.name}</Descriptions.Item>
              <Descriptions.Item label="飞行类型"><Tag color="blue">{currentRecord.flightType}</Tag></Descriptions.Item>
              <Descriptions.Item label="使用飞行器">{currentRecord.aircraft}</Descriptions.Item>
              <Descriptions.Item label="驾驶员姓名">{currentRecord.pilot}</Descriptions.Item>
              <Descriptions.Item label="执照编号">{currentRecord.pilotLicense}</Descriptions.Item>
              <Descriptions.Item label="联系电话">{currentRecord.pilotPhone}</Descriptions.Item>
              <Descriptions.Item label="所属单位">{currentRecord.organization || '—'}</Descriptions.Item>
              <Descriptions.Item label="应急联系人">{currentRecord.emergencyContact}</Descriptions.Item>
              <Descriptions.Item label="申请人">{currentRecord.applicant}</Descriptions.Item>
              <Descriptions.Item label="飞行目的" span={2}>{currentRecord.flightPurpose}</Descriptions.Item>
            </Descriptions>

            <Divider />
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
              <ClockCircleOutlined style={{ color: '#722ed1', fontSize: 16 }} />
              <span style={{ fontSize: 15, fontWeight: 600 }}>时空参数</span>
            </div>
            <Descriptions column={2} bordered size="small">
              <Descriptions.Item label="使用空域">{currentRecord.airspace}</Descriptions.Item>
              <Descriptions.Item label="飞行日期">{currentRecord.date}</Descriptions.Item>
              <Descriptions.Item label="预计起飞时间">{currentRecord.startTime}</Descriptions.Item>
              <Descriptions.Item label="预计降落时间">{currentRecord.endTime}</Descriptions.Item>
              <Descriptions.Item label="最低飞行高度">{currentRecord.altitudeMin} m</Descriptions.Item>
              <Descriptions.Item label="最高飞行高度">{currentRecord.altitudeMax} m</Descriptions.Item>
              <Descriptions.Item label="起飞点"><EnvironmentOutlined style={{ marginRight: 4, color: '#52c41a' }} />{currentRecord.takeoffPoint}</Descriptions.Item>
              <Descriptions.Item label="降落点"><EnvironmentOutlined style={{ marginRight: 4, color: '#ff4d4f' }} />{currentRecord.landingPoint}</Descriptions.Item>
              <Descriptions.Item label="飞行路线" span={2}>{currentRecord.flightRoute}</Descriptions.Item>
            </Descriptions>

            <Divider />
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
              <SafetyCertificateOutlined style={{ color: '#13c2c2', fontSize: 16 }} />
              <span style={{ fontSize: 15, fontWeight: 600 }}>安全措施</span>
            </div>
            <Descriptions column={2} bordered size="small">
              <Descriptions.Item label="飞行保险">{currentRecord.insuranceStatus === '是' ? <Tag color="green">已购买</Tag> : currentRecord.insuranceStatus === '办理中' ? <Tag color="orange">办理中</Tag> : <Tag color="red">未购买</Tag>}</Descriptions.Item>
              <Descriptions.Item label="保险信息">{currentRecord.insuranceInfo || '—'}</Descriptions.Item>
              <Descriptions.Item label="安全保障措施" span={2}>{currentRecord.safetyMeasures}</Descriptions.Item>
              <Descriptions.Item label="风险管控预案" span={2}>{currentRecord.riskControl}</Descriptions.Item>
              <Descriptions.Item label="备用通信方式">{currentRecord.backupComm}</Descriptions.Item>
              <Descriptions.Item label="气象条件要求">{currentRecord.weatherCondition}</Descriptions.Item>
              <Descriptions.Item label="备注" span={2}>{currentRecord.remarks || '无'}</Descriptions.Item>
              <Descriptions.Item label="审批状态"><Tag color={STATUS_MAP[currentRecord.status].color}>{STATUS_MAP[currentRecord.status].text}</Tag></Descriptions.Item>
            </Descriptions>

            {currentRecord.status === 'rejected' && currentRecord.rejectReason && (
              <>
                <Divider />
                <div style={{ background: '#fff2f0', border: '1px solid #ffccc7', borderRadius: 8, padding: 16 }}>
                  <div style={{ color: '#cf1322', fontWeight: 600, marginBottom: 4 }}>驳回原因</div>
                  <div style={{ color: '#595959' }}>{currentRecord.rejectReason}</div>
                </div>
              </>
            )}
          </div>
        )}
      </Modal>

      <Modal title="驳回飞行计划" open={rejectOpen} onCancel={function () { setRejectOpen(false); }} width={520} footer={[
        <Button key="c" onClick={function () { setRejectOpen(false); }}>关闭</Button>,
        <Button key="s" type="primary" danger onClick={handleRejectConfirm}>确认驳回</Button>
      ]}>
        <div style={{ marginTop: 16 }}>
          <div style={{ marginBottom: 8, color: '#262626', fontWeight: 500 }}>计划编号：{currentRecord?.planId}</div>
          <div style={{ marginBottom: 8, color: '#262626', fontWeight: 500 }}>计划名称：{currentRecord?.name}</div>
          <div style={{ marginBottom: 16, color: '#595959' }}>请填写驳回原因，申请人将收到驳回通知：</div>
          <Input.TextArea rows={4} value={rejectReason} onChange={function (e) { setRejectReason(e.target.value); }} placeholder="请输入驳回原因，如：空域冲突、保险未办理、安全措施不足等" />
        </div>
      </Modal>
    </AdminLayout>
  );
};

export default Component;
