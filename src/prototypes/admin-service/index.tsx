/**
 * @name 低空服务发布审核
 * @mode axure
 */
import './style.css';
import React, { useState } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { Card, Table, Tag, Button, Breadcrumb, Space, Modal, Input, Select, message, Tooltip, Descriptions, Tabs, Popconfirm, Divider, Timeline } from 'antd';
import { EyeOutlined, SearchOutlined, CheckCircleOutlined, RocketOutlined, AuditOutlined, CloseCircleOutlined, HistoryOutlined } from '@ant-design/icons';

var SERVICE_DATA = [
  { key: '1', id: 'SRV-2026-001', title: '高精度无人机倾斜摄影与航拍测绘', category: '航拍测绘', provider: 'XX测绘科技有限公司', contact: '王经理', phone: '13811112222', time: '2026-04-20 14:00:00', status: 'normal', billing: '按面积', price: '¥800/平方公里', area: '浙江省全省', qualifications: ['测绘航空摄影乙级资质', '民用无人驾驶航空器运营合格证'], desc: '提供高精度正射影像及三维倾斜摄影模型构建服务。', auditHistory: [{ time: '2026-04-20 14:00:00', action: 'approve', operator: '高级审核员', remark: '资质核验通过，服务内容符合发布规范。' }] },
  { key: '2', id: 'SRV-2026-002', title: '大面积农林植保喷洒作业', category: '农林植保', provider: '蓝天农业服务部', contact: '张总', phone: '13911113333', time: '2026-04-21 09:30:15', status: 'normal', billing: '按面积', price: '¥10/亩', area: '杭州市及周边', qualifications: ['民用无人驾驶航空器运营合格证'], desc: '采用大疆T40农业无人机，支持大面积喷洒作业。', auditHistory: [{ time: '2026-04-21 09:30:15', action: 'approve', operator: '系统自动审核', remark: '标准业务模板，合规条件通过。' }] },
  { key: '3', id: 'SRV-2026-003', title: '城市空中观光体验飞行', category: '其他服务', provider: '星图测绘航拍公司', contact: '王工', phone: '13800008888', time: '2026-05-21 16:00:00', status: 'pending', billing: '按架次', price: '¥299/人', area: '郑州市核心城区', qualifications: ['民用无人驾驶航空器运营合格证', '低空旅游经营许可（试点）'], desc: '提供城市低空观光体验飞行。', auditHistory: [
    { time: '2026-05-10 10:00:00', action: 'approve', operator: '审核专员A', remark: '首次提交：资质与经营范围契合，核准通过。' },
    { time: '2026-05-18 14:00:00', action: 'offline', operator: '星图商户(前台自主下架)', remark: '下架原因：因直升机例行大修保养，暂停前台在线预约。' },
    { time: '2026-05-21 16:00:00', action: 'submit', operator: '星图商户(重新申请发布)', remark: '检修保养全部合格，现申请重新上架发布服务。' }
  ] },
  { key: '4', id: 'SRV-2026-004', title: '无人机物流配送试点服务', category: '物流运输', provider: '星图测绘航拍公司', contact: '王工', phone: '13800008888', time: '2026-05-19 10:30:00', status: 'pending', billing: '面议', price: '¥50/单', area: '郑州市高新区', qualifications: ['民用无人驾驶航空器运营合格证'], desc: '基于大疆 FlyCart 30 提供中短距离配送服务试点。', auditHistory: [{ time: '2026-05-19 10:30:00', action: 'submit', operator: '星图商户', remark: '首次发布服务上架。' }] },
  { key: '5', id: 'SRV-2026-005', title: '高空清洗无人机服务', category: '其他服务', provider: '某清洁公司', contact: '刘经理', phone: '13912345678', time: '2026-05-10 09:00:00', status: 'rejected', billing: '按天', price: '¥800/次', area: '郑州市全域', qualifications: ['无相关资质证明'], desc: '使用自研高空清洗无人机为高层建筑提供清洗服务。', rejectReason: '服务资质文件不清晰，请重新上传高清版营业执照与相关资质证明后再次提交。', rejectTime: '2026-05-11 14:00:00', auditHistory: [
    { time: '2026-05-10 09:00:00', action: 'submit', operator: '商户账号', remark: '首次提交发布申请。' },
    { time: '2026-05-11 14:00:00', action: 'reject', operator: '系统审核员', remark: '服务资质文件不清晰，请重新上传高清版营业执照与相关资质证明后再次提交。' }
  ] }
];

var STATUS_LABEL: Record<string, string> = { normal: '已通过', pending: '待审核', rejected: '已驳回' };
var STATUS_COLOR: Record<string, string> = { normal: 'green', pending: 'orange', rejected: 'red' };

var Component = function AdminServicePage() {
  var [serviceData, setServiceData] = useState(SERVICE_DATA);
  var [activeTab, setActiveTab] = useState('all');
  var [viewOpen, setViewOpen] = useState(false);
  var [currentRecord, setCurrentRecord] = useState<any>(null);
  var [rejectReason, setRejectReason] = useState('');

  var handleApprove = function () {
    if (currentRecord) {
      var auditTime = '2026-05-21 17:46:00';
      setServiceData(function (prev) {
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
      message.success('审核通过！该服务已上架展示。');
      setViewOpen(false);
    }
  };

  var handleReject = function () {
    if (!rejectReason.trim()) { message.warning('请输入驳回原因'); return; }
    if (currentRecord) {
      var auditTime = '2026-05-21 17:46:00';
      setServiceData(function (prev) {
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
      message.success('已驳回该服务申请。');
      setViewOpen(false);
      setRejectReason('');
    }
  };

  var columns = [
    { title: '服务编号', dataIndex: 'id', key: 'id', width: 130 },
    { title: '服务标题', dataIndex: 'title', key: 'title', width: 220, render: function (t: string) { return <span style={{ fontWeight: 500, color: '#1677ff' }}>{t}</span>; } },
    { title: '分类', dataIndex: 'category', key: 'category', width: 100, render: function (t: string) { return <Tag color="blue">{t}</Tag>; } },
    { title: '报价', dataIndex: 'price', key: 'price', width: 120, render: function (t: string) { return <span style={{ color: '#ff4d4f', fontWeight: 500 }}>{t}</span>; } },
    { title: '发布方', dataIndex: 'provider', key: 'provider', width: 160 },
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
    { key: 'all', label: '全部 (' + serviceData.length + ')' },
    { key: 'pending', label: '待审核 (' + serviceData.filter(function (d) { return d.status === 'pending'; }).length + ')' },
    { key: 'normal', label: '已通过 (' + serviceData.filter(function (d) { return d.status === 'normal'; }).length + ')' },
    { key: 'rejected', label: '已驳回 (' + serviceData.filter(function (d) { return d.status === 'rejected'; }).length + ')' }
  ];
  var filteredData = activeTab === 'all' ? serviceData : serviceData.filter(function (d) { return d.status === activeTab; });

  return (
    <AdminLayout activeKey="admin-service">
      <div style={{ maxWidth: 1400, margin: '0 auto', padding: 24 }}>
        <Breadcrumb items={[{ title: '业务审核' }, { title: '低空服务发布审核' }]} style={{ marginBottom: 16 }} />
        <Card style={{ borderRadius: 12 }}>
          <div style={{ display: 'flex', gap: 12, marginBottom: 16, flexWrap: 'wrap' }}>
            <Input prefix={<SearchOutlined />} placeholder="搜索服务标题/编号/发布方" style={{ width: 240 }} allowClear />
            <Select placeholder="审核状态" style={{ width: 120 }} options={[{ value: 'pending', label: '待审核' }, { value: 'normal', label: '已通过' }, { value: 'rejected', label: '已驳回' }]} allowClear />
            <Button type="primary" icon={<SearchOutlined />}>检索</Button>
            <Button>重置</Button>
          </div>
          <Tabs activeKey={activeTab} onChange={setActiveTab} items={tabItems} style={{ marginBottom: 0 }} />
          <Table columns={columns} dataSource={filteredData} pagination={{ pageSize: 10, total: filteredData.length, showTotal: function(t){return '共 '+t+' 项';} }} scroll={{ x: 1100 }} />
        </Card>
      </div>

      <Modal
        title="低空服务详情"
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
              <RocketOutlined style={{ fontSize: 40, color: currentRecord.status === 'normal' ? '#52c41a' : currentRecord.status === 'pending' ? '#fa8c16' : '#ff4d4f', padding: 8 }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 4 }}>{currentRecord.title}<Tag color={STATUS_COLOR[currentRecord.status]} style={{ marginLeft: 12 }}>{STATUS_LABEL[currentRecord.status]}</Tag></div>
                <div style={{ color: '#595959', fontSize: 13 }}>服务编号: {currentRecord.id} | 发布时间: {currentRecord.time}</div>
              </div>
              <div style={{ textAlign: 'right' }}><div style={{ fontSize: 12, color: '#8c8c8c' }}>服务报价</div><div style={{ fontSize: 20, fontWeight: 600, color: '#ff4d4f' }}>{currentRecord.price}</div></div>
            </div>
            <Descriptions column={2} bordered size="small" style={{ marginBottom: 16 }}>
              <Descriptions.Item label="服务分类"><Tag color="blue">{currentRecord.category}</Tag></Descriptions.Item>
              <Descriptions.Item label="计费方式">{currentRecord.billing}</Descriptions.Item>
              <Descriptions.Item label="服务范围" span={2}>{currentRecord.area}</Descriptions.Item>
              <Descriptions.Item label="发布方" span={2}>{currentRecord.provider}</Descriptions.Item>
              <Descriptions.Item label="联系人">{currentRecord.contact}</Descriptions.Item>
              <Descriptions.Item label="电话">{currentRecord.phone}</Descriptions.Item>
              <Descriptions.Item label="资质" span={2}>{currentRecord.qualifications.map(function(q: string) { return <Tag key={q} color={q === '无相关资质证明' ? 'red' : 'green'} style={{ marginRight: 4 }}>{q}</Tag>; })}</Descriptions.Item>
              <Descriptions.Item label="服务描述" span={2}>{currentRecord.desc}</Descriptions.Item>
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
                <div style={{ marginBottom: 8, fontSize: 13, color: '#595959' }}>如需驳回该服务申请，请在此处填写驳回原因：</div>
                <Input.TextArea placeholder="例如：资质证书文件模糊，或者服务内容描述含有违规宣传字眼" rows={3} value={rejectReason} onChange={function (e) { setRejectReason(e.target.value); }} />
              </div>
            )}
          </div>
        )}
      </Modal>
    </AdminLayout>
  );
};
export default Component;
