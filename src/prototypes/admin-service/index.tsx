/**
 * @name 低空服务监管
 * @mode axure
 */

import './style.css';

import React, { useState, useCallback } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { Card, Table, Tag, Button, Breadcrumb, Space, Modal, Input, Select, message, Tooltip, Descriptions, Tabs, Popconfirm, Divider } from 'antd';
import { EyeOutlined, StopOutlined, SearchOutlined, CheckCircleOutlined, RocketOutlined, AlertOutlined } from '@ant-design/icons';

var SERVICE_CATE_OPTIONS = [
  { value: 'mapping', label: '航拍测绘' },
  { value: 'agriculture', label: '农林植保' },
  { value: 'inspection', label: '巡检安防' },
  { value: 'logistics', label: '物流运输' },
  { value: 'performance', label: '飞行表演' },
  { value: 'other', label: '其他服务' }
];

var BILLING_OPTIONS = [
  { value: 'hour', label: '按小时计算' },
  { value: 'day', label: '按天计算' },
  { value: 'area', label: '按面积(亩/平方公里)' },
  { value: 'flight', label: '按架次计算' },
  { value: 'negotiable', label: '面议' }
];

var SERVICE_DATA = [
  { 
    key: '1', id: 'SRV-2026-001', title: '高精度无人机倾斜摄影与航拍测绘', 
    category: '航拍测绘', provider: 'XX测绘科技有限公司', contact: '王经理', phone: '13811112222', 
    time: '2026-04-20 14:00:00', status: 'normal',
    billing: '按面积(亩/平方公里)', price: '¥800/平方公里', area: '浙江省全省及周边省份',
    qualifications: ['测绘航空摄影乙级资质', '民用无人驾驶航空器运营合格证'],
    desc: '提供高精度正射影像(DOM)、数字高程模型(DEM)及三维倾斜摄影模型构建服务。团队拥有5名资深持证飞手，配备大疆M300 RTK及多镜头倾斜相机。'
  },
  { 
    key: '2', id: 'SRV-2026-002', title: '大面积农林植保喷洒作业（大疆T40）', 
    category: '农林植保', provider: '蓝天农业服务部', contact: '张总', phone: '13911113333', 
    time: '2026-04-21 09:30:15', status: 'normal',
    billing: '按面积(亩/平方公里)', price: '¥10/亩', area: '杭州市及周边郊县',
    qualifications: ['民用无人驾驶航空器运营合格证', '植保无人机飞手操作证'],
    desc: '采用最新大疆T40农业无人机，支持大面积水稻、小麦、果园的农药喷洒及播撒作业。高效安全，日作业量可达数千亩。'
  },
  { 
    key: '3', id: 'SRV-2026-003', title: '【特价包机】通航直升机代办及黑飞免审服务', 
    category: '其他服务', provider: '某某代办中介', contact: '李先生', phone: '13711114444', 
    time: '2026-04-22 11:15:00', status: 'offline',
    billing: '面议', price: '电议', area: '全国可飞',
    qualifications: ['无相关资质证明'],
    desc: '提供各类通航直升机、固定翼的特价包机服务，内部渠道可免除空域审批流程，提供“黑飞”保障，懂得都懂。',
    takedownReason: '服务详情中公然承诺“黑飞免审”，严重违反国家空域管理法规及平台服务规范。',
    takedownTime: '2026-04-22 13:00:00'
  }
];

var Component = function AdminServicePage() {
  var [viewOpen, setViewOpen] = useState(false);
  var [takedownOpen, setTakedownOpen] = useState(false);
  var [currentRecord, setCurrentRecord] = useState<any>(null);
  var [takedownReason, setTakedownReason] = useState('');

  var handleTakedown = function () {
    if (!takedownReason.trim()) {
      message.warning('请输入下架原因');
      return;
    }
    message.success('已强制下架该服务，前台服务大厅将不再展示');
    setTakedownOpen(false);
    setTakedownReason('');
  };

  var handleRestore = function () {
    message.success('已解除违规状态，服务恢复上架展示');
  };

  var columns = [
    { title: '服务编号', dataIndex: 'id', key: 'id', width: 130 },
    { title: '服务标题', dataIndex: 'title', key: 'title', width: 220, render: function (t: string) { return <span style={{ fontWeight: 500, color: '#1677ff' }}>{t}</span>; } },
    { title: '分类', dataIndex: 'category', key: 'category', width: 100, render: function (t: string) { return <Tag color="blue">{t}</Tag>; } },
    { title: '计费与报价', key: 'priceInfo', width: 160, render: function (_: any, r: any) { 
      return <div><div style={{ color: '#ff4d4f', fontWeight: 500 }}>{r.price}</div><div style={{ fontSize: 12, color: '#8c8c8c' }}>{r.billing}</div></div>; 
    } },
    { title: '发布方', dataIndex: 'provider', key: 'provider', width: 160 },
    { title: '发布时间', dataIndex: 'time', key: 'time', width: 150 },
    { title: '状态', dataIndex: 'status', key: 'status', width: 100, render: function (s: string) { return s === 'normal' ? <Tag color="green">展示中</Tag> : <Tag color="red">强制下架</Tag>; } },
    { title: '操作', key: 'action', width: 120, fixed: 'right' as const, render: function (_: any, record: any) {
      return (
        <Space size={4}>
          <Tooltip title="查看详情与监管"><Button type="text" size="small" icon={<EyeOutlined />} style={{ color: '#1677ff' }} onClick={function () { setCurrentRecord(record); setViewOpen(true); }} /></Tooltip>
          {record.status === 'normal' ? (
            <Tooltip title="强制下架"><Button type="text" size="small" icon={<StopOutlined />} style={{ color: '#ff4d4f' }} onClick={function () { setCurrentRecord(record); setTakedownOpen(true); }} /></Tooltip>
          ) : (
            <Tooltip title="恢复上架"><Popconfirm title="确认该服务已整改合规并恢复上架？" onConfirm={handleRestore}><Button type="text" size="small" icon={<CheckCircleOutlined />} style={{ color: '#52c41a' }} /></Popconfirm></Tooltip>
          )}
        </Space>
      );
    }}
  ];

  return (
    <AdminLayout activeKey="admin-service">
      <div style={{ maxWidth: 1400, margin: '0 auto', padding: 24 }}>
        <Breadcrumb items={[{ title: '业务监管' }, { title: '服务违规监管' }]} style={{ marginBottom: 16 }} />
        <Card style={{ borderRadius: 12 }}>
          <div style={{ display: 'flex', gap: 12, marginBottom: 16, flexWrap: 'wrap' }}>
            <Input prefix={<SearchOutlined />} placeholder="搜索服务标题/编号/发布方" style={{ width: 240 }} allowClear />
            <Select placeholder="服务分类" style={{ width: 140 }} options={SERVICE_CATE_OPTIONS} allowClear />
            <Select placeholder="管控状态" style={{ width: 120 }} options={[{ value: 'normal', label: '展示中' }, { value: 'offline', label: '强制下架' }]} allowClear />
            <Button type="primary" icon={<SearchOutlined />}>综合检索</Button>
            <Button>重置</Button>
          </div>
          <Table columns={columns} dataSource={SERVICE_DATA} pagination={{ pageSize: 10, total: SERVICE_DATA.length, showTotal: function(t){return '共 '+t+' 项服务';} }} scroll={{ x: 1100 }} />
        </Card>
      </div>

      {/* 服务详情弹窗 */}
      <Modal title="低空服务监管详情" open={viewOpen} onCancel={function () { setViewOpen(false); }} width={800} footer={<Button onClick={function () { setViewOpen(false); }}>关闭</Button>}>
        {currentRecord && (
          <div style={{ marginTop: 16 }}>
            <div style={{ display: 'flex', gap: 16, marginBottom: 24, padding: '16px', background: currentRecord.status === 'normal' ? '#f6ffed' : '#fff1f0', border: '1px solid', borderColor: currentRecord.status === 'normal' ? '#b7eb8f' : '#ffccc7', borderRadius: 8 }}>
              <RocketOutlined style={{ fontSize: 40, color: currentRecord.status === 'normal' ? '#52c41a' : '#ff4d4f', padding: 8 }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 4 }}>
                  {currentRecord.title}
                  <Tag color={currentRecord.status === 'normal' ? 'green' : 'red'} style={{ marginLeft: 12 }}>
                    {currentRecord.status === 'normal' ? '展示中' : '强制下架'}
                  </Tag>
                </div>
                <div style={{ color: '#595959', fontSize: 13 }}>服务编号: {currentRecord.id} | 发布时间: {currentRecord.time}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 12, color: '#8c8c8c' }}>服务报价</div>
                <div style={{ fontSize: 20, fontWeight: 600, color: '#ff4d4f' }}>{currentRecord.price}</div>
              </div>
            </div>

            <Tabs defaultActiveKey="info" items={[
              {
                key: 'info',
                label: '基础与联系信息',
                children: (
                  <div style={{ marginTop: 8 }}>
                    <Descriptions column={2} bordered size="small">
                      <Descriptions.Item label="服务分类"><Tag color="blue">{currentRecord.category}</Tag></Descriptions.Item>
                      <Descriptions.Item label="计费方式"><Tag>{currentRecord.billing}</Tag></Descriptions.Item>
                      <Descriptions.Item label="服务范围" span={2}>{currentRecord.area}</Descriptions.Item>
                    </Descriptions>
                    <Divider orientation="left" style={{ margin: '16px 0' }}>发布方联系方式</Divider>
                    <Descriptions column={2} bordered size="small">
                      <Descriptions.Item label="服务商户主体" span={2}><span style={{ fontWeight: 600 }}>{currentRecord.provider}</span></Descriptions.Item>
                      <Descriptions.Item label="业务联系人">{currentRecord.contact}</Descriptions.Item>
                      <Descriptions.Item label="联系电话">{currentRecord.phone}</Descriptions.Item>
                    </Descriptions>
                  </div>
                )
              },
              {
                key: 'desc',
                label: '服务详情与资质',
                children: (
                  <div style={{ marginTop: 8 }}>
                    <div style={{ marginBottom: 16 }}>
                      <div style={{ fontWeight: 600, marginBottom: 8 }}>服务商声明的资质证明：</div>
                      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                        {currentRecord.qualifications.map(function(q: string) {
                          return <Tag key={q} color={q === '无相关资质证明' ? 'red' : 'green'} style={{ padding: '4px 12px' }}>{q}</Tag>;
                        })}
                      </div>
                    </div>
                    <div style={{ fontWeight: 600, marginBottom: 8 }}>详细服务描述：</div>
                    <div style={{ padding: 16, background: '#fafafa', border: '1px solid #f0f0f0', borderRadius: 8, minHeight: 120, lineHeight: '1.8' }}>
                      {currentRecord.desc}
                    </div>
                  </div>
                )
              },
              {
                key: 'log',
                label: '管控日志',
                children: (
                  <div style={{ marginTop: 8 }}>
                    {currentRecord.status === 'offline' ? (
                      <div style={{ padding: 16, background: '#fff2f0', border: '1px solid #ffccc7', borderRadius: 8 }}>
                        <div style={{ fontWeight: 600, color: '#cf1322', marginBottom: 8 }}><AlertOutlined style={{ marginRight: 6 }} />强制下架记录</div>
                        <Descriptions column={1} size="small">
                          <Descriptions.Item label="下架时间">{currentRecord.takedownTime}</Descriptions.Item>
                          <Descriptions.Item label="违规原因">{currentRecord.takedownReason}</Descriptions.Item>
                          <Descriptions.Item label="操作人员">服务监管专员 (audit_srv)</Descriptions.Item>
                        </Descriptions>
                      </div>
                    ) : (
                      <div style={{ padding: 32, textAlign: 'center', color: '#8c8c8c' }}>暂无违规管控记录</div>
                    )}
                  </div>
                )
              }
            ]} />
          </div>
        )}
      </Modal>

      {/* 强制下架弹窗 */}
      <Modal
        title={<span style={{ color: '#ff4d4f' }}><AlertOutlined style={{ marginRight: 8 }} />强制下架违规服务</span>}
        open={takedownOpen}
        onCancel={function () { setTakedownOpen(false); setTakedownReason(''); }}
        onOk={handleTakedown}
        okButtonProps={{ danger: true }}
        okText="确认强制下架"
      >
        <div style={{ marginBottom: 16, fontSize: 14 }}>
          您正在对服务 <strong>{currentRecord?.title}</strong> 执行强制下架操作。下架后：
          <ul style={{ paddingLeft: 20, marginTop: 8, color: '#595959' }}>
            <li>前台服务大厅将立即隐藏此服务</li>
            <li>系统将自动向发布方 <strong>{currentRecord?.provider}</strong> 发送违规整改通知</li>
          </ul>
        </div>
        <div style={{ marginBottom: 8, fontWeight: 500 }}>请输入下架原因（必填，将作为整改依据发送给发布方）：</div>
        <Input.TextArea 
          placeholder="例如：涉嫌黑飞服务承诺、无相应资质承接业务、内容虚假宣传等" 
          rows={4} 
          value={takedownReason}
          onChange={function (e) { setTakedownReason(e.target.value); }} 
        />
      </Modal>
    </AdminLayout>
  );
};

export default Component;
