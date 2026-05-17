/**
 * @name 需求屏蔽监管
 * @mode axure
 */

import './style.css';

import React, { useState, useCallback } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { Card, Table, Tag, Button, Breadcrumb, Space, Modal, Input, Select, message, Tooltip, Descriptions, Tabs, Popconfirm, Divider } from 'antd';
import { EyeOutlined, StopOutlined, SearchOutlined, CheckCircleOutlined, SoundOutlined, AlertOutlined, UserOutlined } from '@ant-design/icons';

var DEMAND_TYPES = [
  { value: 'tourism', label: '低空旅游' },
  { value: 'training', label: '飞行培训' },
  { value: 'aircraft_buy', label: '飞行器购买咨询' },
  { value: 'aircraft_repair', label: '维修保养' },
  { value: 'inspection', label: '巡检服务' },
  { value: 'aerial_photo', label: '航拍摄影' },
  { value: 'logistics', label: '物流配送' },
  { value: 'insurance', label: '保险咨询' },
  { value: 'other', label: '其他需求' }
];

var DEMAND_DATA = [
  { 
    key: '1', id: 'DMD-2026-001', title: '求购 10 台大疆 M300 工业级测绘无人机', 
    type: '采购需求', subType: '飞行器购买咨询', publisher: 'XX测绘工程有限公司', publisherType: '企业用户', 
    contact: '赵总', phone: '13812345678', time: '2026-04-20 09:00:00', status: 'normal',
    budget: '¥50-80万', area: '浙江省全省', expectedTime: '2026年5月底前',
    desc: '我司因新接国家级测绘重点项目，急需采购 10 台大疆 M300 RTK 或同等参数指标的工业级多旋翼无人机，配套禅思 P1 镜头。要求服务商能提供完整的发票、首年免费维修保养服务及至少一次的上门交付培训。有意者请带报价单联系。'
  },
  { 
    key: '2', id: 'DMD-2026-002', title: '需要 500 亩水稻农田飞防喷洒服务', 
    type: '服务需求', subType: '其他需求', publisher: '李先生', publisherType: '个人用户', 
    contact: '李先生', phone: '13987654321', time: '2026-04-21 14:20:15', status: 'normal',
    budget: '¥1,000-5,000', area: '杭州市余杭区XX镇', expectedTime: '2026年5月上旬',
    desc: '自家承包的 500 亩水稻需要进行一轮除草剂和营养液的混合喷洒。要求飞手持证上岗，自带大疆植保无人机设备及电池，药剂由我方提供。价格按亩数计算，做得好后续几轮也全包给你。'
  },
  { 
    key: '3', id: 'DMD-2026-003', title: '招募兼职航拍飞手，有手就行，日结过万！', 
    type: '服务需求', subType: '航拍摄影', publisher: '赚大钱传媒工作室', publisherType: '个人用户', 
    contact: '王哥', phone: '13711112222', time: '2026-04-22 16:30:00', status: 'blocked',
    budget: '面议', area: '全国均可', expectedTime: '随时',
    desc: '招募兼职航拍飞手，无须自己的设备，提供“特殊”拍摄任务，要求胆子大，日结费用 1万-5万 不等，有意向的加V：xxx_666。',
    blockReason: '需求标题及描述含有“有手就行”、“日结过万”、“特殊拍摄”等极度夸大、涉嫌灰黑产或欺诈的违规词汇，可能危及平台用户财产及国家安全。',
    blockTime: '2026-04-22 17:00:00'
  }
];

var Component = function AdminDemandPage() {
  var [viewOpen, setViewOpen] = useState(false);
  var [blockOpen, setBlockOpen] = useState(false);
  var [currentRecord, setCurrentRecord] = useState<any>(null);
  var [blockReason, setBlockReason] = useState('');

  var handleBlock = function () {
    if (!blockReason.trim()) {
      message.warning('请输入屏蔽原因');
      return;
    }
    message.success('已违规屏蔽该需求，前台需求大厅将不再展示');
    setBlockOpen(false);
    setBlockReason('');
  };

  var handleRestore = function () {
    message.success('已解除违规屏蔽状态，需求恢复大厅展示');
  };

  var columns = [
    { title: '需求编号', dataIndex: 'id', key: 'id', width: 130 },
    { title: '需求标题', dataIndex: 'title', key: 'title', width: 220, render: function (t: string) { return <span style={{ fontWeight: 500, color: '#1677ff' }}>{t}</span>; } },
    { title: '主类别', dataIndex: 'type', key: 'type', width: 100, render: function (t: string) { return <Tag color={t === '采购需求' ? 'purple' : 'blue'}>{t}</Tag>; } },
    { title: '预算范围', dataIndex: 'budget', key: 'budget', width: 120, render: function (b: string) { return <span style={{ color: '#fa8c16', fontWeight: 500 }}>{b}</span>; } },
    { title: '发布方主体', dataIndex: 'publisher', key: 'publisher', width: 160 },
    { title: '发布时间', dataIndex: 'time', key: 'time', width: 150 },
    { title: '状态', dataIndex: 'status', key: 'status', width: 100, render: function (s: string) { return s === 'normal' ? <Tag color="green">展示中</Tag> : <Tag color="red">违规屏蔽</Tag>; } },
    { title: '操作', key: 'action', width: 120, fixed: 'right' as const, render: function (_: any, record: any) {
      return (
        <Space size={4}>
          <Tooltip title="查看详情与监管"><Button type="text" size="small" icon={<EyeOutlined />} style={{ color: '#1677ff' }} onClick={function () { setCurrentRecord(record); setViewOpen(true); }} /></Tooltip>
          {record.status === 'normal' ? (
            <Tooltip title="违规屏蔽"><Button type="text" size="small" icon={<StopOutlined />} style={{ color: '#ff4d4f' }} onClick={function () { setCurrentRecord(record); setBlockOpen(true); }} /></Tooltip>
          ) : (
            <Tooltip title="解除屏蔽"><Popconfirm title="确认该需求无违规内容并恢复展示？" onConfirm={handleRestore}><Button type="text" size="small" icon={<CheckCircleOutlined />} style={{ color: '#52c41a' }} /></Popconfirm></Tooltip>
          )}
        </Space>
      );
    }}
  ];

  return (
    <AdminLayout activeKey="admin-demand">
      <div style={{ maxWidth: 1400, margin: '0 auto', padding: 24 }}>
        <Breadcrumb items={[{ title: '业务监管' }, { title: '需求屏蔽监管' }]} style={{ marginBottom: 16 }} />
        <Card style={{ borderRadius: 12 }}>
          <div style={{ display: 'flex', gap: 12, marginBottom: 16, flexWrap: 'wrap' }}>
            <Input prefix={<SearchOutlined />} placeholder="搜索需求编号/标题/发布方" style={{ width: 240 }} allowClear />
            <Select placeholder="主类别" style={{ width: 120 }} options={[{ value: '1', label: '采购需求' }, { value: '2', label: '服务需求' }]} allowClear />
            <Select placeholder="子类别" style={{ width: 150 }} options={DEMAND_TYPES} allowClear />
            <Select placeholder="管控状态" style={{ width: 120 }} options={[{ value: 'normal', label: '展示中' }, { value: 'blocked', label: '违规屏蔽' }]} allowClear />
            <Button type="primary" icon={<SearchOutlined />}>综合检索</Button>
            <Button>重置</Button>
          </div>
          <Table columns={columns} dataSource={DEMAND_DATA} pagination={{ pageSize: 10, total: DEMAND_DATA.length, showTotal: function(t){return '共 '+t+' 项需求';} }} scroll={{ x: 1100 }} />
        </Card>
      </div>

      {/* 需求详情弹窗 */}
      <Modal title="需求发布监管详情" open={viewOpen} onCancel={function () { setViewOpen(false); }} width={800} footer={<Button onClick={function () { setViewOpen(false); }}>关闭</Button>}>
        {currentRecord && (
          <div style={{ marginTop: 16 }}>
            <div style={{ display: 'flex', gap: 16, marginBottom: 24, padding: '16px', background: currentRecord.status === 'normal' ? '#f6ffed' : '#fff1f0', border: '1px solid', borderColor: currentRecord.status === 'normal' ? '#b7eb8f' : '#ffccc7', borderRadius: 8 }}>
              <SoundOutlined style={{ fontSize: 40, color: currentRecord.status === 'normal' ? '#52c41a' : '#ff4d4f', padding: 8 }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 4 }}>
                  {currentRecord.title}
                  <Tag color={currentRecord.status === 'normal' ? 'green' : 'red'} style={{ marginLeft: 12 }}>
                    {currentRecord.status === 'normal' ? '展示中' : '违规屏蔽'}
                  </Tag>
                </div>
                <div style={{ color: '#595959', fontSize: 13 }}>需求编号: {currentRecord.id} | 发布时间: {currentRecord.time}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 12, color: '#8c8c8c' }}>意向预算</div>
                <div style={{ fontSize: 20, fontWeight: 600, color: '#fa8c16' }}>{currentRecord.budget}</div>
              </div>
            </div>

            <Tabs defaultActiveKey="info" items={[
              {
                key: 'info',
                label: '需求细节与联系方式',
                children: (
                  <div style={{ marginTop: 8 }}>
                    <Descriptions column={2} bordered size="small">
                      <Descriptions.Item label="主类别"><Tag color={currentRecord.type === '采购需求' ? 'purple' : 'blue'}>{currentRecord.type}</Tag></Descriptions.Item>
                      <Descriptions.Item label="细分领域"><Tag>{currentRecord.subType}</Tag></Descriptions.Item>
                      <Descriptions.Item label="需求预期区域">{currentRecord.area}</Descriptions.Item>
                      <Descriptions.Item label="期望完成时间">{currentRecord.expectedTime}</Descriptions.Item>
                    </Descriptions>
                    <Divider orientation="left" style={{ margin: '16px 0' }}><UserOutlined style={{ marginRight: 6 }}/>发布者信息</Divider>
                    <Descriptions column={2} bordered size="small">
                      <Descriptions.Item label="主体名称"><span style={{ fontWeight: 600 }}>{currentRecord.publisher}</span></Descriptions.Item>
                      <Descriptions.Item label="主体性质">{currentRecord.publisherType}</Descriptions.Item>
                      <Descriptions.Item label="联系人">{currentRecord.contact}</Descriptions.Item>
                      <Descriptions.Item label="联系电话">{currentRecord.phone}</Descriptions.Item>
                    </Descriptions>
                  </div>
                )
              },
              {
                key: 'desc',
                label: '需求详细描述',
                children: (
                  <div style={{ marginTop: 8 }}>
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
                    {currentRecord.status === 'blocked' ? (
                      <div style={{ padding: 16, background: '#fff2f0', border: '1px solid #ffccc7', borderRadius: 8 }}>
                        <div style={{ fontWeight: 600, color: '#cf1322', marginBottom: 8 }}><AlertOutlined style={{ marginRight: 6 }} />违规屏蔽记录</div>
                        <Descriptions column={1} size="small">
                          <Descriptions.Item label="屏蔽时间">{currentRecord.blockTime}</Descriptions.Item>
                          <Descriptions.Item label="违规原因">{currentRecord.blockReason}</Descriptions.Item>
                          <Descriptions.Item label="操作人员">需求监管专员 (audit_dmd)</Descriptions.Item>
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

      {/* 违规屏蔽弹窗 */}
      <Modal
        title={<span style={{ color: '#ff4d4f' }}><AlertOutlined style={{ marginRight: 8 }} />违规屏蔽需求</span>}
        open={blockOpen}
        onCancel={function () { setBlockOpen(false); setBlockReason(''); }}
        onOk={handleBlock}
        okButtonProps={{ danger: true }}
        okText="确认屏蔽"
      >
        <div style={{ marginBottom: 16, fontSize: 14 }}>
          您正在对需求 <strong>{currentRecord?.title}</strong> 执行违规屏蔽操作。屏蔽后：
          <ul style={{ paddingLeft: 20, marginTop: 8, color: '#595959' }}>
            <li>前台需求大厅将立即隐藏此需求记录</li>
            <li>系统将自动向发布方发送违规屏蔽及整改通知</li>
          </ul>
        </div>
        <div style={{ marginBottom: 8, fontWeight: 500 }}>请输入屏蔽原因（必填，将作为整改依据发送给发布方）：</div>
        <Input.TextArea 
          placeholder="例如：涉嫌欺诈、发布无关广告、包含违禁词汇等" 
          rows={4} 
          value={blockReason}
          onChange={function (e) { setBlockReason(e.target.value); }} 
        />
      </Modal>
    </AdminLayout>
  );
};

export default Component;
