/**
 * @name 飞行器审批
 * @mode axure
 * /Users/xu/Desktop/元引信息/Axhub-Make-main/skills/axure-export-workflow/SKILL.md
 *
 */

import './style.css';

import React, { useState, useCallback } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { Card, Table, Tag, Button, Breadcrumb, Space, Modal, Input, Select, message, Tooltip, Descriptions, Row, Col, Divider, Image } from 'antd';
import { SettingOutlined, EyeOutlined, SearchOutlined, CheckCircleOutlined, CloseCircleOutlined, SafetyCertificateOutlined, FileTextOutlined, InboxOutlined, UploadOutlined, FilePdfOutlined, FileImageOutlined, ZoomInOutlined } from '@ant-design/icons';



var TYPE_OPTIONS = [
  { value: 'multirotor', label: '多旋翼无人机' },
  { value: 'fixedwing', label: '固定翼无人机' },
  { value: 'vtol', label: '垂直起降固定翼(eVTOL)' },
  { value: 'helicopter', label: '无人直升机' }
];

var WEIGHT_OPTIONS = [
  { value: 'micro', label: '微型（<1.5kg）' },
  { value: 'light', label: '轻型（1.5-25kg）' },
  { value: 'small', label: '小型（25-150kg）' },
  { value: 'medium', label: '中型（150-5700kg）' }
];

var STATUS_MAP: Record<string, { text: string; color: string }> = {
  pending: { text: '待审批', color: 'orange' },
  approved: { text: '已通过', color: 'green' },
  rejected: { text: '已驳回', color: 'red' }
};

var TABLE_DATA = [
  {
    key: '1', id: 1, sn: 'UAV-BJ-2026-001', name: '作业一号机', model: 'DJI Mavic 3 Enterprise', type: '多旋翼无人机', weightClass: '轻型（1.5-25kg）', purpose: '航拍摄影', owner: '张伟', applyDate: '2026-04-22', status: 'pending',
    manufacturer: '深圳市大疆创新科技', serialNo: 'DM3E20260115001', purchaseDate: '2025-11-20',
    maxTakeoffWeight: '8.5', maxFlightAltitude: '120', maxEndurance: '45', maxRange: '15', maxSpeed: '82', gpsCapability: 'RTK高精度定位', specialFeatures: '全向避障系统、IP45防护等级',
    rejectReason: ''
  },
  {
    key: '2', id: 2, sn: 'UAV-BJ-2026-002', name: '植保二号机', model: '大疆 T50 农业无人机', type: '多旋翼无人机', weightClass: '小型（25-150kg）', purpose: '农林植保', owner: 'XX农业科技有限公司', applyDate: '2026-04-20', status: 'pending',
    manufacturer: '深圳市大疆创新科技', serialNo: 'DJT50202603200001', purchaseDate: '2026-01-10',
    maxTakeoffWeight: '92', maxFlightAltitude: '30', maxEndurance: '20', maxRange: '5', maxSpeed: '45', gpsCapability: '双频GPS+北斗', specialFeatures: 'RTK厘米级定位、仿地飞行',
    rejectReason: ''
  },
  {
    key: '3', id: 3, sn: 'UAV-BJ-2026-003', name: '巡检三号机', model: '纵横 CW-25', type: '固定翼无人机', weightClass: '轻型（1.5-25kg）', purpose: '巡检巡查', owner: 'XX测绘工程有限公司', applyDate: '2026-04-18', status: 'approved',
    manufacturer: '成都纵横自动化技术', serialNo: 'ZHCW25202602150001', purchaseDate: '2026-02-15',
    maxTakeoffWeight: '18', maxFlightAltitude: '300', maxEndurance: '180', maxRange: '50', maxSpeed: '90', gpsCapability: 'RTK高精度定位', specialFeatures: '垂直起降、长续航',
    rejectReason: ''
  },
  {
    key: '4', id: 4, sn: 'UAV-BJ-2026-004', name: '载客试飞机', model: '亿航 EH216-S', type: '垂直起降固定翼(eVTOL)', weightClass: '中型（150-5700kg）', purpose: '物流配送', owner: 'XX通航公司', applyDate: '2026-04-25', status: 'pending',
    manufacturer: '广州亿航智能', serialNo: 'EHEH216S20260301001', purchaseDate: '2026-03-01',
    maxTakeoffWeight: '620', maxFlightAltitude: '300', maxEndurance: '30', maxRange: '35', maxSpeed: '130', gpsCapability: 'RTK高精度定位', specialFeatures: '载人级、全备份安全系统',
    rejectReason: ''
  },
  {
    key: '5', id: 5, sn: 'UAV-BJ-2026-005', name: '航拍五号机', model: '道通 EVO Lite+', type: '多旋翼无人机', weightClass: '微型（<1.5kg）', purpose: '航拍摄影', owner: '李明', applyDate: '2026-04-10', status: 'rejected',
    manufacturer: '深圳道通智能航空', serialNo: 'ATEL20260305001', purchaseDate: '2026-03-05',
    maxTakeoffWeight: '0.84', maxFlightAltitude: '120', maxEndurance: '40', maxRange: '10', maxSpeed: '68', gpsCapability: '双频GPS+北斗', specialFeatures: '',
    rejectReason: '序列号与购买凭证信息不一致，请核实后重新提交'
  }
];

var Component = function AdminAircraftPage() {
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
    message.success('飞行器 ' + record.sn + ' 审批通过');
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
    message.success('已驳回飞行器 ' + (currentRecord?.sn || ''));
    setRejectOpen(false);
    setRejectReason('');
  };

  var columns = [
    { title: '序号', dataIndex: 'id', key: 'id', width: 60 },
    { title: '备案编号', dataIndex: 'sn', key: 'sn', width: 150 },
    { title: '飞行器名称', dataIndex: 'name', key: 'name', width: 120, render: function (t: string) { return <span style={{ fontWeight: 500 }}>{t}</span>; } },
    { title: '型号规格', dataIndex: 'model', key: 'model', width: 180 },
    { title: '类型', dataIndex: 'type', key: 'type', width: 140, render: function (t: string) { return <Tag color="blue">{t}</Tag>; } },
    { title: '制造商', dataIndex: 'manufacturer', key: 'manufacturer', width: 120, ellipsis: true },
    { title: '序列号', dataIndex: 'serialNo', key: 'serialNo', width: 140 },
    { title: '重量分类', dataIndex: 'weightClass', key: 'weightClass', width: 130 },
    { title: '使用用途', dataIndex: 'purpose', key: 'purpose', width: 100 },
    { title: '申请人', dataIndex: 'owner', key: 'owner', width: 140 },
    { title: '购置日期', dataIndex: 'purchaseDate', key: 'purchaseDate', width: 110 },
    { title: '申请日期', dataIndex: 'applyDate', key: 'applyDate', width: 110 },
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
    <AdminLayout activeKey="admin-aircraft">
      

      <div style={{ maxWidth: 1400, margin: '0 auto', padding: 24 }}>
        <Breadcrumb items={[{ title: '飞行审批' }, { title: '飞行器审批' }]} style={{ marginBottom: 16 }} />
        <Card style={{ borderRadius: 12 }}>
          <div style={{ display: 'flex', gap: 12, marginBottom: 16, flexWrap: 'wrap' }}>
            <Input prefix={<SearchOutlined />} placeholder="搜索编号/名称/型号/申请人" style={{ width: 260 }} allowClear />
            <Select placeholder="飞行器类型" style={{ width: 170 }} options={TYPE_OPTIONS} allowClear />
            <Select placeholder="重量分类" style={{ width: 160 }} options={WEIGHT_OPTIONS} allowClear />
            <Select placeholder="审批状态" style={{ width: 120 }} options={[{ value: 'pending', label: '待审批' }, { value: 'approved', label: '已通过' }, { value: 'rejected', label: '已驳回' }]} allowClear />
            <Button type="primary" icon={<SearchOutlined />}>查询</Button>
            <Button>重置</Button>
          </div>
          <Table columns={columns} dataSource={TABLE_DATA} pagination={{ pageSize: 10 }} scroll={{ x: 1500 }} />
        </Card>
      </div>

      <Modal title="飞行器备案详情" open={viewOpen} onCancel={function () { setViewOpen(false); }} width={760} footer={currentRecord?.status === 'pending' ? [
        <Button key="reject" danger icon={<CloseCircleOutlined />} onClick={function () { setViewOpen(false); handleRejectClick(currentRecord); }}>驳回</Button>,
        <Button key="approve" type="primary" icon={<CheckCircleOutlined />} onClick={function () { setViewOpen(false); handleApprove(currentRecord); }}>审批通过</Button>
      ] : <Button onClick={function () { setViewOpen(false); }}>关闭</Button>}>
        {currentRecord && (
          <div style={{ marginTop: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
              <FileTextOutlined style={{ color: '#1677ff', fontSize: 16 }} />
              <span style={{ fontSize: 15, fontWeight: 600 }}>基本信息</span>
            </div>
            <Descriptions column={2} bordered size="small">
              <Descriptions.Item label="备案编号">{currentRecord.sn}</Descriptions.Item>
              <Descriptions.Item label="飞行器名称">{currentRecord.name}</Descriptions.Item>
              <Descriptions.Item label="型号规格">{currentRecord.model}</Descriptions.Item>
              <Descriptions.Item label="飞行器类型"><Tag color="blue">{currentRecord.type}</Tag></Descriptions.Item>
              <Descriptions.Item label="序列号/SN码">{currentRecord.serialNo}</Descriptions.Item>
              <Descriptions.Item label="制造商">{currentRecord.manufacturer}</Descriptions.Item>
              <Descriptions.Item label="重量分类">{currentRecord.weightClass}</Descriptions.Item>
              <Descriptions.Item label="使用用途">{currentRecord.purpose}</Descriptions.Item>
              <Descriptions.Item label="购置日期">{currentRecord.purchaseDate}</Descriptions.Item>
              <Descriptions.Item label="申请人">{currentRecord.owner}</Descriptions.Item>
              <Descriptions.Item label="申请日期">{currentRecord.applyDate}</Descriptions.Item>
              <Descriptions.Item label="审批状态"><Tag color={STATUS_MAP[currentRecord.status].color}>{STATUS_MAP[currentRecord.status].text}</Tag></Descriptions.Item>
            </Descriptions>

            <Divider />
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
              <InboxOutlined style={{ color: '#722ed1', fontSize: 16 }} />
              <span style={{ fontSize: 15, fontWeight: 600 }}>技术参数</span>
            </div>
            <Descriptions column={2} bordered size="small">
              <Descriptions.Item label="最大起飞重量">{currentRecord.maxTakeoffWeight} kg</Descriptions.Item>
              <Descriptions.Item label="最大飞行高度">{currentRecord.maxFlightAltitude} m</Descriptions.Item>
              <Descriptions.Item label="最大续航时间">{currentRecord.maxEndurance} min</Descriptions.Item>
              <Descriptions.Item label="最大控制距离">{currentRecord.maxRange} km</Descriptions.Item>
              <Descriptions.Item label="最大飞行速度">{currentRecord.maxSpeed} km/h</Descriptions.Item>
              <Descriptions.Item label="定位能力">{currentRecord.gpsCapability}</Descriptions.Item>
              <Descriptions.Item label="特殊功能" span={2}>{currentRecord.specialFeatures || '无'}</Descriptions.Item>
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

      <Modal title="驳回飞行器备案" open={rejectOpen} onCancel={function () { setRejectOpen(false); }} width={520} footer={[
        <Button key="c" onClick={function () { setRejectOpen(false); }}>关闭</Button>,
        <Button key="s" type="primary" danger onClick={handleRejectConfirm}>确认驳回</Button>
      ]}>
        <div style={{ marginTop: 16 }}>
          <div style={{ marginBottom: 8, color: '#262626', fontWeight: 500 }}>飞行器编号：{currentRecord?.sn}</div>
          <div style={{ marginBottom: 8, color: '#262626', fontWeight: 500 }}>型号规格：{currentRecord?.model}</div>
          <div style={{ marginBottom: 16, color: '#595959' }}>请填写驳回原因，申请人将收到驳回通知：</div>
          <Input.TextArea rows={4} value={rejectReason} onChange={function (e) { setRejectReason(e.target.value); }} placeholder="请输入驳回原因，如：材料不完整、信息与实际不符等" />
        </div>
      </Modal>
    </AdminLayout>
  );
};

export default Component;
