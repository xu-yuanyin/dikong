/**
 * @name 需求发布审核
 * @mode axure
 */
import './style.css';
import React, { useState } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { Card, Table, Tag, Button, Breadcrumb, Space, Modal, Input, Select, message, Tooltip, Descriptions, Tabs, Popconfirm, Divider, Timeline } from 'antd';
import { EyeOutlined, SearchOutlined, CheckCircleOutlined, SoundOutlined, AuditOutlined, CloseCircleOutlined, UserOutlined, HistoryOutlined } from '@ant-design/icons';

var DEMAND_TYPES = [
  { value: 'tourism', label: '低空旅游' }, { value: 'training', label: '飞行培训' },
  { value: 'aircraft_buy', label: '飞行器购买咨询' }, { value: 'inspection', label: '巡检服务' },
  { value: 'aerial_photo', label: '航拍摄影' }, { value: 'logistics', label: '物流配送' },
  { value: 'other', label: '其他需求' }
];

var DEMAND_DATA = [
  { key: '1', id: 'DMD-2026-001', title: '求购 10 台大疆 M300 工业级测绘无人机', type: '采购需求', subType: '飞行器购买咨询', publisher: 'XX测绘工程有限公司', publisherType: '企业用户', contact: '赵总', phone: '13812345678', time: '2026-04-20 09:00:00', status: 'normal', budget: '¥50-80万', area: '浙江省全省', expectedTime: '2026年5月底前', desc: '急需采购 10 台大疆 M300 RTK 或同等参数指标的工业级无人机。', auditHistory: [{ time: '2026-04-20 09:00:00', action: 'approve', operator: '系统自动核验', remark: '企业认证主体匹配正常。' }] },
  { key: '2', id: 'DMD-2026-002', title: '需要 500 亩水稻农田飞防喷洒服务', type: '服务需求', subType: '其他需求', publisher: '李先生', publisherType: '个人用户', contact: '李先生', phone: '13987654321', time: '2026-04-21 14:20:15', status: 'normal', budget: '¥1,000-5,000', area: '杭州市余杭区', expectedTime: '2026年5月上旬', desc: '500 亩水稻需要喷洒除草剂和营养液。', auditHistory: [{ time: '2026-04-21 14:20:15', action: 'approve', operator: '系统自动核验', remark: '个人主体自动通过。' }] },
  { key: '3', id: 'DMD-2026-004', title: '农田精准喷洒飞防服务', type: '服务需求', subType: '其他需求', publisher: '张明', publisherType: '个人用户', contact: '张明', phone: '13800008888', time: '2026-05-21 15:00:00', status: 'pending', budget: '¥2,000-4,000', area: '郊区', expectedTime: '2026年6月中旬', desc: '500亩水稻田需要喷洒农药，要求持证飞手。', auditHistory: [
    { time: '2026-05-02 10:00:00', action: 'approve', operator: '需求监管主管', remark: '首次提交，审核通过。' },
    { time: '2026-05-18 14:00:00', action: 'offline', operator: '张明(前台自主下架)', remark: '下架原因：前台用户手动下架，因当地雨季来临，作业推迟。' },
    { time: '2026-05-21 15:00:00', action: 'submit', operator: '张明(重新申请发布)', remark: '雨季已过，计划重开，申请重新发布需求上架审批。' }
  ] },
  { key: '4', id: 'DMD-2026-005', title: '批量采购植保无人机电池组', type: '采购需求', subType: '飞行器购买咨询', publisher: '张明', publisherType: '个人用户', contact: '张明', phone: '13800008888', time: '2026-05-18 14:00:00', status: 'pending', budget: '¥5-8万', area: '全市', expectedTime: '2026年6月底前', desc: '需要采购大疆 T40 植保无人机专用电池组 20 块。', auditHistory: [{ time: '2026-05-18 14:00:00', action: 'submit', operator: '张明', remark: '首次上架发布。' }] },
  { key: '5', id: 'DMD-2026-006', title: '景区低空观光路线规划', type: '服务需求', subType: '低空旅游', publisher: '张明', publisherType: '个人用户', contact: '张明', phone: '13800008888', time: '2026-05-10 11:00:00', status: 'rejected', budget: '¥15,000-25,000', area: '全市', expectedTime: '2026年7月1日前', desc: '景区空中游览路线设计与安全评估。', rejectReason: '该需求涉及景区空域申请相关审批，请先提供景区管委会出具的空域使用意向书后再次提交。', rejectTime: '2026-05-11 15:00:00', auditHistory: [
    { time: '2026-05-10 11:00:00', action: 'submit', operator: '张明', remark: '首次提交景区路线评估需求。' },
    { time: '2026-05-11 15:00:00', action: 'reject', operator: '特种作业审核员', remark: '该需求涉及景区空域申请相关审批，请先提供景区管委会出具的空域使用意向书后再次提交。' }
  ] },
  { key: '6', id: 'DMD-2026-007', title: '采购无人机防撞雷达模块', type: '采购需求', subType: '飞行器购买咨询', publisher: '某科技公司', publisherType: '企业用户', contact: '陈工', phone: '13655556666', time: '2026-05-12 09:30:00', status: 'rejected', budget: '¥10-15万', area: '主城区', expectedTime: '2026年7月1日前', desc: '采购微波雷达避障模块 50 套。', rejectReason: '需求描述过于简略，请补充具体的技术参数要求、数量及交付标准后重新提交。', rejectTime: '2026-05-13 10:30:00', auditHistory: [
    { time: '2026-05-12 09:30:00', action: 'submit', operator: '企业账号', remark: '发布防撞雷达模块求购需求。' },
    { time: '2026-05-13 10:30:00', action: 'reject', operator: '物料审核员', remark: '需求描述过于简略，请补充具体的技术参数要求、数量及交付标准后重新提交。' }
  ] }
];

var STATUS_LABEL: Record<string, string> = { normal: '已通过', pending: '待审核', rejected: '已驳回' };
var STATUS_COLOR: Record<string, string> = { normal: 'green', pending: 'orange', rejected: 'red' };

var Component = function AdminDemandPage() {
  var [demandData, setDemandData] = useState(DEMAND_DATA);
  var [activeTab, setActiveTab] = useState('all');
  var [viewOpen, setViewOpen] = useState(false);
  var [currentRecord, setCurrentRecord] = useState<any>(null);
  var [rejectReason, setRejectReason] = useState('');

  var handleApprove = function () {
    if (currentRecord) {
      var auditTime = '2026-05-21 17:46:00';
      setDemandData(function (prev) {
        return prev.map(function (item) {
          if (item.key === currentRecord.key) {
            var history = item.auditHistory ? [].concat(item.auditHistory) : [];
            history.push({
              time: auditTime,
              action: 'approve',
              operator: '当前管理员',
              remark: '运营审核通过，同意发布上线。'
            });
            return Object.assign({}, item, { status: 'normal', auditHistory: history });
          }
          return item;
        });
      });
      message.success('审核通过！该需求已上线展示。');
      setViewOpen(false);
    }
  };

  var handleReject = function () {
    if (!rejectReason.trim()) { message.warning('请输入驳回原因'); return; }
    if (currentRecord) {
      var auditTime = '2026-05-21 17:46:00';
      setDemandData(function (prev) {
        return prev.map(function (item) {
          if (item.key === currentRecord.key) {
            var history = item.auditHistory ? [].concat(item.auditHistory) : [];
            history.push({
              time: auditTime,
              action: 'reject',
              operator: '当前管理员',
              remark: rejectReason
            });
            return Object.assign({}, item, {
              status: 'rejected',
              rejectReason: rejectReason,
              rejectTime: auditTime,
              auditHistory: history
            });
          }
          return item;
        });
      });
      message.success('已驳回该需求申请。');
      setViewOpen(false);
      setRejectReason('');
    }
  };

  var columns = [
    { title: '需求编号', dataIndex: 'id', key: 'id', width: 130 },
    { title: '需求标题', dataIndex: 'title', key: 'title', width: 220, render: function (t: string) { return <span style={{ fontWeight: 500, color: '#1677ff' }}>{t}</span>; } },
    { title: '主类别', dataIndex: 'type', key: 'type', width: 100, render: function (t: string) { return <Tag color={t === '采购需求' ? 'purple' : 'blue'}>{t}</Tag>; } },
    { title: '预算', dataIndex: 'budget', key: 'budget', width: 120, render: function (b: string) { return <span style={{ color: '#fa8c16', fontWeight: 500 }}>{b}</span>; } },
    { title: '发布方', dataIndex: 'publisher', key: 'publisher', width: 160 },
    { title: '发布时间', dataIndex: 'time', key: 'time', width: 150 },
    { title: '状态', dataIndex: 'status', key: 'status', width: 100, render: function (s: string) { return <Tag color={STATUS_COLOR[s] || 'default'}>{STATUS_LABEL[s] || s}</Tag>; } },
    { title: '操作', key: 'action', width: 120, fixed: 'right' as const, render: function (_: any, record: any) {
      return (<Space size={4}>
        <Tooltip title="查看详情"><Button type="text" size="small" icon={<EyeOutlined />} style={{ color: '#1677ff' }} onClick={function () { setCurrentRecord(record); setViewOpen(true); }} /></Tooltip>
        {record.status === 'pending' && (<Tooltip title="审核处理"><Button type="text" size="small" icon={<AuditOutlined />} style={{ color: '#722ed1' }} onClick={function () { setCurrentRecord(record); setRejectReason(''); setViewOpen(true); }} /></Tooltip>)}
      </Space>);
    }}
  ];

  var tabItems = [
    { key: 'all', label: '全部 (' + demandData.length + ')' },
    { key: 'pending', label: '待审核 (' + demandData.filter(function (d) { return d.status === 'pending'; }).length + ')' },
    { key: 'normal', label: '已通过 (' + demandData.filter(function (d) { return d.status === 'normal'; }).length + ')' },
    { key: 'rejected', label: '已驳回 (' + demandData.filter(function (d) { return d.status === 'rejected'; }).length + ')' }
  ];
  var filteredData = activeTab === 'all' ? demandData : demandData.filter(function (d) { return d.status === activeTab; });

  return (
    <AdminLayout activeKey="admin-demand">
      <div style={{ maxWidth: 1400, margin: '0 auto', padding: 24 }}>
        <Breadcrumb items={[{ title: '业务审核' }, { title: '需求发布审核' }]} style={{ marginBottom: 16 }} />
        <Card style={{ borderRadius: 12 }}>
          <div style={{ display: 'flex', gap: 12, marginBottom: 16, flexWrap: 'wrap' }}>
            <Input prefix={<SearchOutlined />} placeholder="搜索需求编号/标题/发布方" style={{ width: 240 }} allowClear />
            <Select placeholder="主类别" style={{ width: 120 }} options={[{ value: '1', label: '采购需求' }, { value: '2', label: '服务需求' }]} allowClear />
            <Select placeholder="审核状态" style={{ width: 120 }} options={[{ value: 'pending', label: '待审核' }, { value: 'normal', label: '已通过' }, { value: 'rejected', label: '已驳回' }]} allowClear />
            <Button type="primary" icon={<SearchOutlined />}>检索</Button>
            <Button>重置</Button>
          </div>
          <Tabs activeKey={activeTab} onChange={setActiveTab} items={tabItems} style={{ marginBottom: 0 }} />
          <Table columns={columns} dataSource={filteredData} pagination={{ pageSize: 10, total: filteredData.length, showTotal: function(t){return '共 '+t+' 项需求';} }} scroll={{ x: 1100 }} />
        </Card>
      </div>

      <Modal
        title="需求详情"
        open={viewOpen}
        onCancel={function () { setViewOpen(false); }}
        width={800}
        footer={
          currentRecord && currentRecord.status === 'pending' ? [
            <Button key="close" onClick={function () { setViewOpen(false); }}>关闭</Button>,
            <Button key="reject" danger onClick={handleReject} icon={<CloseCircleOutlined />}>驳回申请</Button>,
            <Popconfirm key="approve" title="确认审核通过？" onConfirm={handleApprove}>
              <Button type="primary" style={{ background: '#52c41a', borderColor: '#52c41a' }} icon={<CheckCircleOutlined />}>审核通过</Button>
            </Popconfirm>
          ] : [
            <Button key="close" onClick={function () { setViewOpen(false); }}>关闭</Button>
          ]
        }
      >
        {currentRecord && (
          <div style={{ marginTop: 16 }}>
            <div style={{ display: 'flex', gap: 16, marginBottom: 24, padding: 16, background: currentRecord.status === 'normal' ? '#f6ffed' : currentRecord.status === 'pending' ? '#fffbe6' : '#fff1f0', border: '1px solid', borderColor: currentRecord.status === 'normal' ? '#b7eb8f' : currentRecord.status === 'pending' ? '#ffe58f' : '#ffccc7', borderRadius: 8 }}>
              <SoundOutlined style={{ fontSize: 40, color: currentRecord.status === 'normal' ? '#52c41a' : currentRecord.status === 'pending' ? '#fa8c16' : '#ff4d4f', padding: 8 }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 4 }}>{currentRecord.title}<Tag color={STATUS_COLOR[currentRecord.status]} style={{ marginLeft: 12 }}>{STATUS_LABEL[currentRecord.status]}</Tag></div>
                <div style={{ color: '#595959', fontSize: 13 }}>编号: {currentRecord.id} | 发布时间: {currentRecord.time}</div>
              </div>
              <div style={{ textAlign: 'right' }}><div style={{ fontSize: 12, color: '#8c8c8c' }}>意向预算</div><div style={{ fontSize: 20, fontWeight: 600, color: '#fa8c16' }}>{currentRecord.budget}</div></div>
            </div>
            <Descriptions column={2} bordered size="small" style={{ marginBottom: 16 }}>
              <Descriptions.Item label="主类别"><Tag color={currentRecord.type === '采购需求' ? 'purple' : 'blue'}>{currentRecord.type}</Tag></Descriptions.Item>
              <Descriptions.Item label="细分领域">{currentRecord.subType}</Descriptions.Item>
              <Descriptions.Item label="需求区域">{currentRecord.area}</Descriptions.Item>
              <Descriptions.Item label="期望完成时间">{currentRecord.expectedTime}</Descriptions.Item>
              <Descriptions.Item label="发布方"><span style={{ fontWeight: 600 }}>{currentRecord.publisher}</span></Descriptions.Item>
              <Descriptions.Item label="主体性质">{currentRecord.publisherType}</Descriptions.Item>
              <Descriptions.Item label="联系人">{currentRecord.contact}</Descriptions.Item>
              <Descriptions.Item label="联系电话">{currentRecord.phone}</Descriptions.Item>
              <Descriptions.Item label="需求描述" span={2}>{currentRecord.desc}</Descriptions.Item>
            </Descriptions>
            {currentRecord.status === 'rejected' && (<div style={{ padding: 16, background: '#fff2f0', border: '1px solid #ffccc7', borderRadius: 8, marginBottom: 16 }}><div style={{ fontWeight: 600, color: '#cf1322', marginBottom: 8 }}><CloseCircleOutlined style={{ marginRight: 6 }} />驳回记录</div><Descriptions column={1} size="small"><Descriptions.Item label="驳回时间">{currentRecord.rejectTime}</Descriptions.Item><Descriptions.Item label="驳回原因">{currentRecord.rejectReason}</Descriptions.Item></Descriptions></div>)}

            {currentRecord.auditHistory && currentRecord.auditHistory.length > 0 && (
              <div style={{ marginTop: 24, marginBottom: 24, padding: 16, background: '#f5f7fa', border: '1px solid #e4e7ed', borderRadius: 8 }}>
                <div style={{ fontWeight: 600, color: '#002c8c', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <HistoryOutlined /> 历史审核与状态变更记录 (含下架重发历史)
                </div>
                <Timeline
                  style={{ marginTop: 8 }}
                  items={currentRecord.auditHistory.map(function (hist: any) {
                    var color = hist.action === 'approve' ? 'green' : hist.action === 'reject' ? 'red' : hist.action === 'offline' ? 'gray' : 'blue';
                    var label = hist.action === 'approve' ? '审批通过' : hist.action === 'reject' ? '审批驳回' : hist.action === 'offline' ? '自主下架' : '重新提交';
                    return {
                      color: color,
                      children: (
                        <div style={{ paddingBottom: 2 }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 500, fontSize: 13 }}>
                            <span>{label} <span style={{ color: '#8c8c8c', fontWeight: 'normal', fontSize: 12 }}>({hist.operator})</span></span>
                            <span style={{ color: '#8c8c8c', fontWeight: 'normal', fontSize: 12 }}>{hist.time}</span>
                          </div>
                          {hist.remark && <div style={{ color: '#595959', marginTop: 4, fontSize: 12, background: '#ffffff', padding: '6px 12px', borderRadius: 4, border: '1px dashed #e8e8e8' }}>{hist.remark}</div>}
                        </div>
                      )
                    };
                  })}
                />
              </div>
            )}

            {currentRecord.status === 'pending' && (
              <div style={{ marginTop: 24, padding: 16, background: '#fafafa', border: '1px solid #f0f0f0', borderRadius: 8 }}>
                <div style={{ fontWeight: 600, color: '#722ed1', marginBottom: 12 }}>
                  <AuditOutlined style={{ marginRight: 6 }} /> 审批意见
                </div>
                <div style={{ marginBottom: 8, fontSize: 13, color: '#595959' }}>如需驳回该需求申请，请在此处填写驳回原因：</div>
                <Input.TextArea placeholder="例如：需求描述过于简略、发布无关广告等" rows={3} value={rejectReason} onChange={function (e) { setRejectReason(e.target.value); }} />
              </div>
            )}
          </div>
        )}
      </Modal>
    </AdminLayout>
  );
};
export default Component;
