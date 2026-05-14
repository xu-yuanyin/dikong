/**
 * @name 我的服务预约（需求方/买方工作台）
 * @mode axure
 */

import './style.css';

import React, { useState, useCallback } from 'react';
import { Card, Table, Tag, Button, Breadcrumb, Tabs, Avatar, Row, Col, Rate, message, Modal, Steps, Descriptions, Segmented, Form, Input } from 'antd';
import { HomeOutlined, UserOutlined, SafetyCertificateOutlined, CalendarOutlined, CompassOutlined, ShoppingOutlined } from '@ant-design/icons';

var MENU_ITEMS = [
  { key: 'profile-certified', label: '我的信息', group: '账号管理' },
  { key: 'role-management', label: '角色管理' },
  { key: 'message-center', label: '消息中心' },
  { key: 'my-orders', label: '我的预约', group: '个人/需求方业务' },
  { key: 'my-aircraft', label: '我的飞行器', group: '飞行作业台' },
  { key: 'my-flight-plan', label: '我的飞行计划' },
  { key: 'my-service', label: '我的服务管理', group: '低空服务 (供给端)' },
  { key: 'service-publish', label: '发布服务项目' },
  { key: 'provider-orders', label: '服务受理单' },
  { key: 'my-goods', label: '我的商品', group: '低空商城 (供给端)' },
  { key: 'mall-publish', label: '发布商品' },
  { key: 'provider-intentions', label: '商品受理单' }
];

var BOOKED_DATA = [
  { key: '1', orderNo: 'SRV20260512001', name: '山地物资调运', category: '行业应用', price: '¥1,200/架次', bookDate: '2026-05-12 14:00', provider: '大疆通用航空', contact: '王工', phone: '138-0000-8888', myContact: '张明', myPhone: '13800138000', requirements: '希望下周三在二七区山区进行服务，时间大约在下午2点左右，需要运输约100kg物资。', status: '待处理', rating: null },
  { key: '2', orderNo: 'SRV20260505002', name: '多旋翼驾驶员考证培训', category: '飞行培训', price: '¥8,500/人', bookDate: '2026-05-05 09:00', provider: '中航航空飞行学院', contact: '李老师', phone: '139-1111-2222', myContact: '张明', myPhone: '13800138000', requirements: '本人零基础，希望能安排在周末班学习，尽快拿证。', status: '待处理', rating: null },
  { key: '3', orderNo: 'SRV20260510003', name: '电力通信巡检', category: '行业应用', price: '¥3,000/天', bookDate: '2026-05-10 11:00', provider: '中科星图测绘', contact: '赵经理', phone: '137-3333-4444', myContact: '李四', myPhone: '13800138000', requirements: '需巡检线路长度约 10KM，请提前准备高精度挂载设备。', status: '已完成', rating: null },
  { key: '4', orderNo: 'SRV20260415004', name: '大疆 M300 年度适航检测', category: '飞行器服务', price: '¥2,000/次', bookDate: '2026-04-15 10:00', provider: '大疆官方售后(郑州)', contact: '技术支持', phone: '400-000-0000', myContact: '张明', myPhone: '13800138000', requirements: '飞机图传模块有时会断连，请重点排查，周五下午送过去。', status: '已完成', rating: 4.7 },
  { key: '5', orderNo: 'SRV20260410005', name: '特色活动航拍', category: '航拍影像', price: '¥2,800/场', bookDate: '2026-04-10 15:00', provider: '光影视觉传媒', contact: '刘总', phone: '186-5555-6666', myContact: '王五', myPhone: '13800138000', requirements: '公司团建航拍，包含大合照和花絮，需要剪辑一段3分钟的成片。', status: '已取消', rating: null }
];

var STATUS_MAP: Record<string, { color: string, step: number }> = {
  '待处理': { color: 'orange', step: 0 },
  '已完成': { color: 'green', step: 2 },
  '已取消': { color: 'default', step: -1 }
};

var PRODUCT_DATA = [
  { key: '1', orderNo: 'PRD20260422001', product: 'DJI Matrice 350 RTK 工业级无人机', category: '飞行器', quantity: 5, price: '¥68,800', status: '已完成', provider: '大疆代理商', contact: '王经理', phone: '138-0000-1234', bookDate: '2026-04-22 10:00', myContact: '张明', myPhone: '13800138000', requirements: '需要包含5块备用电池', rating: 5 },
  { key: '2', orderNo: 'PRD20260425002', product: '激光雷达测绘模块', category: '配件', quantity: 3, price: '¥25,000', status: '待处理', provider: '星图测绘', contact: '李老师', phone: '139-1111-5678', bookDate: '2026-04-25 14:30', myContact: '张明', myPhone: '13800138000', requirements: '适配M300', rating: null },
  { key: '3', orderNo: 'PRD20260410003', product: '纵横 CW-25 垂直起降固定翼', category: '飞行器', quantity: 2, price: '¥120,000', status: '已取消', provider: '纵横股份', contact: '赵总', phone: '137-3333-8888', bookDate: '2026-04-10 09:15', myContact: '张明', myPhone: '13800138000', requirements: '全套标准版', rating: null }
];

var handleNavigate = function (key: string) {
  window.location.href = '/prototypes/' + key;
};

var Component = function MyOrdersPage() {
  var [activeType, setActiveType] = useState('service');
  var [activeTab, setActiveTab] = useState('all');
  var [detailRecord, setDetailRecord] = useState<any>(null);
  
  // Review Modal states
  var [reviewModalOpen, setReviewModalOpen] = useState(false);
  var [reviewTarget, setReviewTarget] = useState<any>(null);
  var [reviewForm] = Form.useForm();

  var handleCancel = function() {
    message.success('已取消预约');
    setDetailRecord(null);
  };

  var handleConfirm = function() {
    message.success('已确认服务完成！');
    setDetailRecord(null);
  };

  var handleOpenReview = function(record: any) {
    setReviewTarget(record);
    reviewForm.resetFields();
    setReviewModalOpen(true);
  };

  var handleSubmitReview = function() {
    reviewForm.validateFields().then(function() {
      message.success('评价提交成功！感谢您的反馈。');
      setReviewModalOpen(false);
      setReviewTarget(null);
      if (detailRecord) {
        setDetailRecord(null); // Close detail modal if opened from there
      }
    });
  };

  var COLUMNS = [
    { title: '预约单号', dataIndex: 'orderNo', key: 'orderNo', render: (t: string) => <span style={{ color: '#8c8c8c' }}>{t}</span> },
    { title: '服务名称', dataIndex: 'name', key: 'name', render: (t: string) => <a style={{ fontWeight: 500 }}>{t}</a> },
    { title: '服务商', dataIndex: 'provider', key: 'provider' },
    { title: '价格', dataIndex: 'price', key: 'price', render: (p: string) => <span style={{ color: '#ff4d4f', fontWeight: 600 }}>{p}</span> },
    { title: '提交时间', dataIndex: 'bookDate', key: 'bookDate' },
    { title: '状态', dataIndex: 'status', key: 'status', render: (s: string) => <Tag color={STATUS_MAP[s].color}>{s}</Tag> },
    { title: '操作', key: 'action', render: function (_: any, record: any) {
      return (
        <div style={{ display: 'flex', gap: 12 }}>
          <a style={{ color: '#1677ff' }} onClick={() => setDetailRecord(record)}>查看</a>
          {record.status === '待处理' && (
            <>
              <a style={{ color: '#52c41a' }} onClick={handleConfirm}>标记完成</a>
              <a style={{ color: '#ff4d4f' }} onClick={handleCancel}>取消预约</a>
            </>
          )}
          {record.status === '已完成' && <a style={{ color: '#faad14' }} onClick={() => handleOpenReview(record)}>去评价</a>}
        </div>
      );
    }}
  ];

  var handleConfirmProduct = function() {
    message.success('已确认商品交付完成！');
    setDetailRecord(null);
  };

  var PRODUCT_COLUMNS = [
    { title: '预约单号', dataIndex: 'orderNo', key: 'orderNo', render: (t: string) => <span style={{ color: '#8c8c8c' }}>{t}</span> },
    { title: '关联商品', dataIndex: 'product', key: 'product', render: function (p: string) { return <a style={{ fontWeight: 500 }} onClick={function () { handleNavigate('mall-detail'); }}>{p}</a>; } },
    { title: '商品类型', dataIndex: 'category', key: 'category', render: function (t: string) { return <Tag color="purple">{t}</Tag>; } },
    { title: '采购数量', dataIndex: 'quantity', key: 'quantity' },
    { title: '预估单价', dataIndex: 'price', key: 'price', render: (p: string) => <span style={{ color: '#ff4d4f', fontWeight: 600 }}>{p}</span> },
    { title: '供应商', dataIndex: 'provider', key: 'provider' },
    { title: '提交时间', dataIndex: 'bookDate', key: 'bookDate' },
    { title: '状态', dataIndex: 'status', key: 'status', render: function (s: string) { return <Tag color={STATUS_MAP[s].color}>{s}</Tag>; } },
    { title: '操作', key: 'action', render: function (_: any, record: any) {
      return (
        <div style={{ display: 'flex', gap: 12 }}>
          <a style={{ color: '#1677ff' }} onClick={() => setDetailRecord({ ...record, isProduct: true })}>查看</a>
          {record.status === '待处理' && (
            <>
              <a style={{ color: '#52c41a' }} onClick={handleConfirmProduct}>标记完成</a>
              <a style={{ color: '#ff4d4f' }} onClick={handleCancel}>取消预约</a>
            </>
          )}
          {record.status === '已完成' && <a style={{ color: '#faad14' }} onClick={() => handleOpenReview({ ...record, isProduct: true })}>去评价</a>}
        </div>
      );
    }}
  ];

  var filteredData = activeTab === 'all' ? (activeType === 'service' ? BOOKED_DATA : PRODUCT_DATA) : (activeType === 'service' ? BOOKED_DATA.filter(d => d.status === activeTab) : PRODUCT_DATA.filter(d => d.status === activeTab));

  return (
    <div style={{ minHeight: '100vh', background: '#f5f5f5' }}>
      <header style={{ background: 'linear-gradient(135deg, #0c4a6e 0%, #eb2f96 100%)', padding: '0 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }} onClick={() => handleNavigate('home')}>
            <SafetyCertificateOutlined style={{ fontSize: 20, color: '#fff' }} />
            <span style={{ fontSize: 16, fontWeight: 600, color: '#fff' }}>区域低空公共服务平台</span>
          </div>
          <div style={{ display: 'flex', gap: 16 }}>
            <a style={{ color: 'rgba(255,255,255,0.85)', cursor: 'pointer' }} onClick={() => handleNavigate('home')}>首页</a>
            <a style={{ color: 'rgba(255,255,255,0.85)', cursor: 'pointer' }} onClick={() => handleNavigate('service-list')}>低空服务</a>
            <a style={{ color: '#fff', fontWeight: 600, cursor: 'pointer' }}>个人中心</a>
          </div>
        </div>
      </header>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px 24px 48px' }}>
        <Breadcrumb items={[
          { title: <a onClick={() => handleNavigate('home')}><HomeOutlined /> 首页</a> },
          { title: '个人中心' },
          { title: '我的服务预约' }
        ]} style={{ marginBottom: 24 }} />

        <Row gutter={24}>
          <Col xs={24} md={6}>
            <Card style={{ borderRadius: 12, marginBottom: 24 }}>
              <div style={{ textAlign: 'center', marginBottom: 16 }}>
                <Avatar size={80} icon={<UserOutlined />} style={{ backgroundColor: '#1890ff', marginBottom: 12 }} />
                <div style={{ fontSize: 18, fontWeight: 600, color: '#1f1f1f' }}>张明</div>
                <Tag color="green" style={{ marginTop: 8 }}>普通用户</Tag>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                {MENU_ITEMS.map((item) => (
                  <div key={item.key}>
                    {item.group ? <div style={{ fontSize: 11, color: '#bfbfbf', padding: '8px 16px 4px', fontWeight: 600, letterSpacing: 1 }}>{item.group}</div> : null}
                    <div
                      onClick={() => { if (item.key !== 'my-orders') handleNavigate(item.key); }}
                      style={{
                        padding: '10px 16px',
                        borderRadius: 8,
                        cursor: 'pointer',
                        background: item.key === 'my-orders' ? '#e6f4ff' : 'transparent',
                        color: item.key === 'my-orders' ? '#1677ff' : '#595959',
                        fontWeight: item.key === 'my-orders' ? 600 : 400,
                        fontSize: 14,
                        marginBottom: 4
                      }}
                    >
                      {item.label}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </Col>
          <Col xs={24} md={18}>
            <Card style={{ borderRadius: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                <div style={{ fontSize: 18, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div>
                    <CalendarOutlined style={{ marginRight: 8, color: '#1677ff' }} />
                    我的预约
                  </div>
                  <Segmented
                    options={[
                      { label: <span style={{ padding: '0 16px' }}><CompassOutlined /> 服务预约</span>, value: 'service' },
                      { label: <span style={{ padding: '0 16px' }}><ShoppingOutlined /> 商品预约</span>, value: 'product' }
                    ]}
                    value={activeType}
                    onChange={(v) => {
                      setActiveType(v as string);
                      setActiveTab('all');
                    }}
                    style={{ marginLeft: 16 }}
                  />
                </div>
                <Button type="primary" ghost onClick={() => handleNavigate(activeType === 'service' ? 'service-list' : 'mall-list')}>
                  {activeType === 'service' ? '去发现服务' : '去商城逛逛'}
                </Button>
              </div>
              
              {activeType === 'service' ? (
                <Tabs
                  activeKey={activeTab}
                  onChange={setActiveTab}
                  items={[
                    { key: 'all', label: `全部 (${BOOKED_DATA.length})` },
                    { key: '待处理', label: `待处理 (${BOOKED_DATA.filter(d => d.status === '待处理').length})` },
                    { key: '已完成', label: `已完成 (${BOOKED_DATA.filter(d => d.status === '已完成').length})` },
                    { key: '已取消', label: `已取消 (${BOOKED_DATA.filter(d => d.status === '已取消').length})` }
                  ]}
                  style={{ marginBottom: 0 }}
                />
              ) : (
                <Tabs
                  activeKey={activeTab}
                  onChange={setActiveTab}
                  items={[
                    { key: 'all', label: `全部 (${PRODUCT_DATA.length})` },
                    { key: '待处理', label: `待处理 (${PRODUCT_DATA.filter(d => d.status === '待处理').length})` },
                    { key: '已完成', label: `已完成 (${PRODUCT_DATA.filter(d => d.status === '已完成').length})` },
                    { key: '已取消', label: `已取消 (${PRODUCT_DATA.filter(d => d.status === '已取消').length})` }
                  ]}
                  style={{ marginBottom: 0 }}
                />
              )}
              <Table columns={activeType === 'service' ? COLUMNS : PRODUCT_COLUMNS} dataSource={filteredData} pagination={{ pageSize: 10 }} />
            </Card>
          </Col>
        </Row>
      </div>

      {/* 预约详情弹窗 */}
      <Modal
        title="预约服务详情"
        open={!!detailRecord}
        onCancel={() => setDetailRecord(null)}
        width={700}
        footer={[
          <Button key="close" onClick={() => setDetailRecord(null)}>关闭</Button>,
          detailRecord?.status === '待处理' && <Button key="cancel" danger onClick={handleCancel}>取消预约</Button>,
          detailRecord?.status === '待处理' && <Button key="confirm" type="primary" style={{ background: '#52c41a' }} onClick={handleConfirm}>标记完成</Button>,
          detailRecord?.status === '已完成' && <Button key="rate" type="primary" onClick={() => handleOpenReview(detailRecord)}>去评价</Button>
        ].filter(Boolean)}
      >
        {detailRecord && (
          <div>
            <div style={{ padding: '24px 0', marginBottom: 16 }}>
              {detailRecord.status === '已取消' ? (
                <div style={{ textAlign: 'center', color: '#8c8c8c', fontSize: 16, fontWeight: 500 }}>
                  该预约已取消
                </div>
              ) : (
                <Steps
                  current={STATUS_MAP[detailRecord.status].step}
                  items={detailRecord.isProduct ? [
                    { title: '提交预约', subTitle: '待处理' },
                    { title: '线下对接', subTitle: '确认采购与发货' },
                    { title: '交付完结', subTitle: '评价与归档' }
                  ] : [
                    { title: '提交预约', subTitle: '待处理' },
                    { title: '线下对接', subTitle: '确认需求与作业' },
                    { title: '服务完结', subTitle: '评价与归档' }
                  ]}
                />
              )}
            </div>

            <Descriptions title="基本信息" bordered size="small" column={2}>
              <Descriptions.Item label="预约单号" span={2}>{detailRecord.orderNo}</Descriptions.Item>
              <Descriptions.Item label={detailRecord.isProduct ? '商品名称' : '服务名称'} span={2}>
                <span style={{ fontWeight: 600 }}>{detailRecord.isProduct ? detailRecord.product : detailRecord.name}</span>
              </Descriptions.Item>
              <Descriptions.Item label={detailRecord.isProduct ? '商品类别' : '服务类别'}>
                <Tag color={detailRecord.isProduct ? 'purple' : 'blue'}>{detailRecord.category}</Tag>
              </Descriptions.Item>
              {detailRecord.isProduct ? (
                <>
                  <Descriptions.Item label="采购数量">{detailRecord.quantity}</Descriptions.Item>
                  <Descriptions.Item label="预估单价"><span style={{ color: '#ff4d4f', fontWeight: 600 }}>{detailRecord.price}</span></Descriptions.Item>
                </>
              ) : (
                <Descriptions.Item label="预估价格"><span style={{ color: '#ff4d4f', fontWeight: 600 }}>{detailRecord.price}</span></Descriptions.Item>
              )}
              <Descriptions.Item label="提交时间">{detailRecord.bookDate}</Descriptions.Item>
              <Descriptions.Item label="当前状态">
                <Tag color={STATUS_MAP[detailRecord.status].color}>{detailRecord.status}</Tag>
              </Descriptions.Item>
            </Descriptions>

            <div style={{ marginTop: 24 }}>
              <Descriptions title={detailRecord.isProduct ? '商家信息' : '服务商信息'} bordered size="small" column={2}>
                <Descriptions.Item label="名称" span={2}>{detailRecord.provider}</Descriptions.Item>
                <Descriptions.Item label="联系人">{detailRecord.contact}</Descriptions.Item>
                <Descriptions.Item label="联系电话">{detailRecord.phone}</Descriptions.Item>
              </Descriptions>
            </div>


            <div style={{ marginTop: 24 }}>
              <Descriptions title="我提交的预约信息" bordered size="small" column={2}>
                <Descriptions.Item label="预约联系人">{detailRecord.myContact}</Descriptions.Item>
                <Descriptions.Item label="联系电话">{detailRecord.myPhone}</Descriptions.Item>
                <Descriptions.Item label="需求说明 / 备注" span={2}>
                  <div style={{ color: '#595959' }}>
                    {detailRecord.requirements}
                  </div>
                </Descriptions.Item>
              </Descriptions>
            </div>
          </div>
        )}
      </Modal>

      {/* 评价弹窗 */}
      <Modal 
        title={reviewTarget?.isProduct ? "评价商品" : "评价服务"} 
        open={reviewModalOpen} 
        onCancel={() => { setReviewModalOpen(false); setReviewTarget(null); }}
        footer={[
          <Button key="close" onClick={() => { setReviewModalOpen(false); setReviewTarget(null); }}>取消</Button>,
          <Button key="submit" type="primary" onClick={handleSubmitReview}>提交评价</Button>
        ]}
      >
        {reviewTarget && (
          <div style={{ marginBottom: 16, padding: 12, background: '#f5f5f5', borderRadius: 8 }}>
            <div style={{ fontSize: 13, color: '#8c8c8c' }}>{reviewTarget.isProduct ? '商品名称' : '服务项目'}</div>
            <div style={{ fontSize: 15, fontWeight: 600, marginTop: 4 }}>{reviewTarget.isProduct ? reviewTarget.product : reviewTarget.name}</div>
            <div style={{ fontSize: 12, color: '#8c8c8c', marginTop: 4 }}>{reviewTarget.isProduct ? '商家' : '服务商'}：{reviewTarget.provider}</div>
          </div>
        )}
        <Form form={reviewForm} layout="vertical">
          <Form.Item name="rating" label="综合评分" rules={[{ required: true, message: '请打分' }]}>
            <Rate style={{ fontSize: 24 }} />
          </Form.Item>
          <Form.Item name="content" label="评价详情" rules={[{ required: true, message: '请输入您的评价体验' }]}>
            <Input.TextArea rows={4} placeholder="请详细分享您的使用体验，对其他用户会有很大帮助..." showCount maxLength={500} />
          </Form.Item>
        </Form>
      </Modal>

    </div>
  );
};

export default Component;
