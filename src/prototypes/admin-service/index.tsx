/**
 * @name 低空服务发布审核
 * @mode axure
 */
import './style.css';
import React, { useState } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { Card, Table, Tag, Button, Breadcrumb, Space, Modal, Input, Select, message, Tooltip, Descriptions, Tabs, Popconfirm, Divider } from 'antd';
import { EyeOutlined, SearchOutlined, CheckCircleOutlined, RocketOutlined, AuditOutlined, CloseCircleOutlined } from '@ant-design/icons';

var SERVICE_DATA = [
  { key: '1', id: 'SRV-2026-001', title: '高精度无人机倾斜摄影与航拍测绘', category: '航拍测绘', provider: 'XX测绘科技有限公司', contact: '王经理', phone: '13811112222', time: '2026-04-20 14:00:00', status: 'normal', billing: '按面积', price: '¥800/平方公里', area: '浙江省全省', qualifications: ['测绘航空摄影乙级资质', '民用无人驾驶航空器运营合格证'], desc: '提供高精度正射影像及三维倾斜摄影模型构建服务。' },
  { key: '2', id: 'SRV-2026-002', title: '大面积农林植保喷洒作业', category: '农林植保', provider: '蓝天农业服务部', contact: '张总', phone: '13911113333', time: '2026-04-21 09:30:15', status: 'normal', billing: '按面积', price: '¥10/亩', area: '杭州市及周边', qualifications: ['民用无人驾驶航空器运营合格证'], desc: '采用大疆T40农业无人机，支持大面积喷洒作业。' },
  { key: '3', id: 'SRV-2026-003', title: '城市空中观光体验飞行', category: '其他服务', provider: '星图测绘航拍公司', contact: '王工', phone: '13800008888', time: '2026-05-18 16:00:00', status: 'pending', billing: '按架次', price: '¥299/人', area: '郑州市核心城区', qualifications: ['民用无人驾驶航空器运营合格证', '低空旅游经营许可（试点）'], desc: '提供城市低空观光体验飞行。' },
  { key: '4', id: 'SRV-2026-004', title: '无人机物流配送试点服务', category: '物流运输', provider: '星图测绘航拍公司', contact: '王工', phone: '13800008888', time: '2026-05-19 10:30:00', status: 'pending', billing: '面议', price: '¥50/单', area: '郑州市高新区', qualifications: ['民用无人驾驶航空器运营合格证'], desc: '基于大疆 FlyCart 30 提供中短距离配送服务试点。' },
  { key: '5', id: 'SRV-2026-005', title: '高空清洗无人机服务', category: '其他服务', provider: '某清洁公司', contact: '刘经理', phone: '13912345678', time: '2026-05-10 09:00:00', status: 'rejected', billing: '按天', price: '¥800/次', area: '郑州市全域', qualifications: ['无相关资质证明'], desc: '使用自研高空清洗无人机为高层建筑提供清洗服务。', rejectReason: '服务资质文件不清晰，请重新上传高清版营业执照与相关资质证明后再次提交。', rejectTime: '2026-05-11 14:00:00' }
];

var STATUS_LABEL: Record<string, string> = { normal: '已通过', pending: '待审核', rejected: '已驳回' };
var STATUS_COLOR: Record<string, string> = { normal: 'green', pending: 'orange', rejected: 'red' };

var Component = function AdminServicePage() {
  var [activeTab, setActiveTab] = useState('all');
  var [viewOpen, setViewOpen] = useState(false);
  var [auditOpen, setAuditOpen] = useState(false);
  var [currentRecord, setCurrentRecord] = useState<any>(null);
  var [rejectReason, setRejectReason] = useState('');

  var handleApprove = function () { message.success('审核通过！该服务已上架展示。'); setAuditOpen(false); };
  var handleReject = function () { if (!rejectReason.trim()) { message.warning('请输入驳回原因'); return; } message.success('已驳回该服务申请。'); setAuditOpen(false); setRejectReason(''); };

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
        {record.status === 'pending' && (<Tooltip title="审核处理"><Button type="text" size="small" icon={<AuditOutlined />} style={{ color: '#722ed1' }} onClick={function () { setCurrentRecord(record); setRejectReason(''); setAuditOpen(true); }} /></Tooltip>)}
      </Space>);
    }}
  ];

  var tabItems = [
    { key: 'all', label: '全部 (' + SERVICE_DATA.length + ')' },
    { key: 'pending', label: '待审核 (' + SERVICE_DATA.filter(function (d) { return d.status === 'pending'; }).length + ')' },
    { key: 'normal', label: '已通过 (' + SERVICE_DATA.filter(function (d) { return d.status === 'normal'; }).length + ')' },
    { key: 'rejected', label: '已驳回 (' + SERVICE_DATA.filter(function (d) { return d.status === 'rejected'; }).length + ')' }
  ];
  var filteredData = activeTab === 'all' ? SERVICE_DATA : SERVICE_DATA.filter(function (d) { return d.status === activeTab; });

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

      <Modal title="低空服务详情" open={viewOpen} onCancel={function () { setViewOpen(false); }} width={800} footer={<Button onClick={function () { setViewOpen(false); }}>关闭</Button>}>
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
            {currentRecord.status === 'rejected' && (<div style={{ padding: 16, background: '#fff2f0', border: '1px solid #ffccc7', borderRadius: 8 }}><div style={{ fontWeight: 600, color: '#cf1322', marginBottom: 8 }}><CloseCircleOutlined style={{ marginRight: 6 }} />驳回记录</div><Descriptions column={1} size="small"><Descriptions.Item label="驳回时间">{currentRecord.rejectTime}</Descriptions.Item><Descriptions.Item label="驳回原因">{currentRecord.rejectReason}</Descriptions.Item></Descriptions></div>)}
          </div>
        )}
      </Modal>

      <Modal title={<span style={{ color: '#722ed1' }}><AuditOutlined style={{ marginRight: 8 }} />服务发布审核</span>} open={auditOpen} onCancel={function () { setAuditOpen(false); setRejectReason(''); }} width={640}
        footer={[<Button key="cancel" onClick={function () { setAuditOpen(false); }}>取消</Button>, <Button key="reject" danger onClick={handleReject} icon={<CloseCircleOutlined />}>驳回申请</Button>, <Popconfirm key="approve" title="确认审核通过？" onConfirm={handleApprove}><Button type="primary" style={{ background: '#52c41a', borderColor: '#52c41a' }} icon={<CheckCircleOutlined />}>审核通过</Button></Popconfirm>]}>
        {currentRecord && (<div>
          <div style={{ padding: 16, background: '#fafafa', borderRadius: 8, marginBottom: 16 }}>
            <Descriptions column={2} size="small">
              <Descriptions.Item label="服务编号">{currentRecord.id}</Descriptions.Item>
              <Descriptions.Item label="提交时间">{currentRecord.time}</Descriptions.Item>
              <Descriptions.Item label="服务名称" span={2}><span style={{ fontWeight: 600 }}>{currentRecord.title}</span></Descriptions.Item>
              <Descriptions.Item label="发布方">{currentRecord.provider}</Descriptions.Item>
              <Descriptions.Item label="分类"><Tag color="blue">{currentRecord.category}</Tag></Descriptions.Item>
              <Descriptions.Item label="报价">{currentRecord.price}</Descriptions.Item>
              <Descriptions.Item label="区域">{currentRecord.area}</Descriptions.Item>
            </Descriptions>
          </div>
          <div style={{ marginBottom: 8, fontWeight: 500, color: '#ff4d4f' }}>如需驳回，请填写驳回原因（必填）：</div>
          <Input.TextArea placeholder="例如：资质文件缺失或过期、服务描述含有违规内容等" rows={3} value={rejectReason} onChange={function (e) { setRejectReason(e.target.value); }} />
        </div>)}
      </Modal>
    </AdminLayout>
  );
};
export default Component;
