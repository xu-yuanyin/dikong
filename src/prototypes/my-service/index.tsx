/**
 * @name 我的服务（供给方 - 飞行服务商/飞手）
 * @mode axure
 */

import './style.css';

import React, { useState, useCallback } from 'react';
import { Card, Table, Tag, Button, Breadcrumb, Tabs, Avatar, Row, Col, message, Dropdown, Menu, Modal, Descriptions } from 'antd';
import { HomeOutlined, UserOutlined, SafetyCertificateOutlined, PlusOutlined, MoreOutlined, EditOutlined, DeleteOutlined, StopOutlined, PlayCircleOutlined } from '@ant-design/icons';

var MENU_ITEMS = [
  { key: 'profile-certified', label: '我的信息', group: '账号管理' },
  { key: 'role-management', label: '角色管理' },
  { key: 'message-center', label: '消息中心' },
  { key: 'my-intention', label: '我的意向', group: '个人/需求方业务' },
  { key: 'my-service-demand', label: '我的服务需求' },
  { key: 'my-demand', label: '我的采购需求' },
  { key: 'my-aircraft', label: '我的飞行器', group: '飞行作业台' },
  { key: 'my-flight-plan', label: '我的飞行计划' },
  { key: 'my-service', label: '我的服务管理', group: '低空服务 (供给端)' },
  { key: 'service-publish', label: '发布服务项目' },
  { key: 'provider-orders', label: '预约受理单' },
  { key: 'my-goods', label: '我的商品', group: '低空商城 (供给端)' },
  { key: 'mall-publish', label: '发布商品' },
  { key: 'provider-intentions', label: '收到的商城意向' }
];

var PUBLISHED_DATA = [
  { key: '1', name: '电力通信精细化巡检服务', category: '行业应用', price: '￥3,000/天', status: '已发布', views: 342, orders: 12, createDate: '2026-03-10' },
  { key: '2', name: '大疆 M300 飞行器年检保养', category: '飞行器服务', price: '￥500/次', status: '已发布', views: 890, orders: 45, createDate: '2026-03-15' },
  { key: '3', name: '房地产/楼盘全景航拍', category: '航拍影像', price: '￥1,500/组', status: '已暂停', views: 120, orders: 3, createDate: '2026-04-01' },
  { key: '4', name: '多旋翼无人机考证冲刺班', category: '飞行培训', price: '￥6,800/人', status: '违规下架', views: 0, orders: 0, createDate: '2026-04-20' }
];

var handleNavigate = function (key: string) {
  window.location.href = '/prototypes/' + key;
};

var Component = function MyServicePage() {
  var [activeTab, setActiveTab] = useState('all');
  var [detailRecord, setDetailRecord] = useState<any>(null);
  var [previewOpen, setPreviewOpen] = useState(false);

  var COLUMNS = [
    { title: '服务名称', dataIndex: 'name', key: 'name', render: function (t: string) { return <a style={{ fontWeight: 500 }}>{t}</a>; } },
    { title: '分类', dataIndex: 'category', key: 'category', render: function (t: string) { return <Tag color="blue">{t}</Tag>; } },
    { title: '展示价格', dataIndex: 'price', key: 'price', render: function (p: string) { return <span style={{ color: '#1677ff', fontWeight: 600 }}>{p}</span>; } },
    { title: '浏览量', dataIndex: 'views', key: 'views' },
    { title: '成单量', dataIndex: 'orders', key: 'orders' },
    { title: '状态', dataIndex: 'status', key: 'status', render: function (s: string) { 
        return <Tag color={s === '已发布' ? 'green' : s === '已暂停' ? 'default' : 'red'}>{s}</Tag>; 
    }},
    { title: '发布时间', dataIndex: 'createDate', key: 'createDate' },
    { title: '操作', key: 'action', render: function (_: any, record: any) {
      return (
        <div style={{ display: 'flex', gap: 12 }}>
          <a style={{ color: '#1677ff' }} onClick={() => setDetailRecord(record)}>查看</a>
          {record.status === '已发布' && (
            <a style={{ color: '#faad14' }} onClick={() => message.success('已暂停')}>暂停服务</a>
          )}
          {record.status === '已暂停' && (
            <>
              <a style={{ color: '#1677ff' }} onClick={() => message.success('操作成功')}>编辑</a>
              <a style={{ color: '#52c41a' }} onClick={() => message.success('已发布')}>重新发布</a>
              <a style={{ color: '#ff4d4f' }} onClick={() => message.success('已删除')}>删除</a>
            </>
          )}
          {record.status === '违规下架' && (
            <a style={{ color: '#ff4d4f' }} onClick={() => message.success('已删除')}>删除</a>
          )}
        </div>
      );
    }}
  ];

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
          { title: '我的服务管理' }
        ]} style={{ marginBottom: 24 }} />

        <Row gutter={24}>
          <Col xs={24} md={6}>
            <Card style={{ borderRadius: 12, marginBottom: 24 }}>
              <div style={{ textAlign: 'center', marginBottom: 16 }}>
                <Avatar size={80} icon={<UserOutlined />} style={{ backgroundColor: '#1890ff', marginBottom: 12 }} />
                <div style={{ fontSize: 18, fontWeight: 600, color: '#1f1f1f' }}>星图测绘航拍公司</div>
                <Tag color="blue" style={{ marginTop: 8 }}>飞行服务商</Tag>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                {MENU_ITEMS.map((item) => (
                  <div key={item.key}>
                    {item.group ? <div style={{ fontSize: 11, color: '#bfbfbf', padding: '8px 16px 4px', fontWeight: 600, letterSpacing: 1 }}>{item.group}</div> : null}
                    <div
                      onClick={() => { if (item.key !== 'my-service') handleNavigate(item.key); }}
                      style={{
                        padding: '10px 16px',
                        borderRadius: 8,
                        cursor: 'pointer',
                        background: item.key === 'my-service' ? '#e6f4ff' : 'transparent',
                        color: item.key === 'my-service' ? '#1677ff' : '#595959',
                        fontWeight: item.key === 'my-service' ? 600 : 400,
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
            <Card title="我的服务管理" extra={
              <div style={{ display: 'flex', gap: 8 }}>
                <Button onClick={() => handleNavigate('provider-orders')}>查看预约受理单</Button>
                <Button type="primary" icon={<PlusOutlined />} onClick={() => handleNavigate('service-publish')}>发布新服务</Button>
              </div>
            } style={{ borderRadius: 12 }}>
              {PUBLISHED_DATA.filter(d => d.status === '违规下架').length > 0 && (
                <div style={{ padding: '8px 16px', background: '#fff2f0', border: '1px solid #ffccc7', borderRadius: 6, marginBottom: 16, color: '#cf1322', fontSize: 13 }}>
                  系统提示：发现被违规下架的服务，涉嫌违反平台发布规范。如有疑问请致电客服咨询：400-123-4567。
                </div>
              )}
              <Tabs
                activeKey={activeTab}
                onChange={setActiveTab}
                items={[
                  { key: 'all', label: `全部 (${PUBLISHED_DATA.length})` },
                  { key: '已发布', label: `已发布 (${PUBLISHED_DATA.filter(d => d.status === '已发布').length})` },
                  { key: '已暂停', label: `已暂停 (${PUBLISHED_DATA.filter(d => d.status === '已暂停').length})` },
                  { key: '违规下架', label: `违规下架 (${PUBLISHED_DATA.filter(d => d.status === '违规下架').length})` }
                ]}
                style={{ marginBottom: 0 }}
              />
              <Table columns={COLUMNS} dataSource={activeTab === 'all' ? PUBLISHED_DATA : PUBLISHED_DATA.filter(d => d.status === activeTab)} pagination={{ pageSize: 10 }} />
            </Card>
          </Col>
        </Row>
      </div>

      <Modal
        title="服务详情"
        open={!!detailRecord}
        onCancel={() => setDetailRecord(null)}
        width={700}
        footer={[
          <Button key="close" onClick={() => setDetailRecord(null)}>关闭</Button>,
          <Button key="preview" type="primary" onClick={() => { setDetailRecord(null); setPreviewOpen(true); }}>预览</Button>
        ]}
      >
        {detailRecord && (
          <Descriptions column={2} bordered size="small">
            <Descriptions.Item label="服务名称" span={2}><span style={{ fontWeight: 600 }}>{detailRecord.name}</span></Descriptions.Item>
            <Descriptions.Item label="服务类别"><Tag color="blue">{detailRecord.category}</Tag></Descriptions.Item>
            <Descriptions.Item label="服务价格"><span style={{ color: '#ff4d4f', fontWeight: 600 }}>{detailRecord.price}</span></Descriptions.Item>
            <Descriptions.Item label="服务区域">郑州市全域</Descriptions.Item>
            <Descriptions.Item label="服务时长/有效期">长期有效</Descriptions.Item>
            <Descriptions.Item label="投入设备/作业机型" span={2}>大疆 M300 RTK、经纬 M350 RTK</Descriptions.Item>
            <Descriptions.Item label="交付标准/成果物" span={2}>出具专业检测/作业报告</Descriptions.Item>
            <Descriptions.Item label="服务亮点" span={2}>持证飞手 · 全程保险 · 安全保障</Descriptions.Item>
            <Descriptions.Item label="服务描述" span={2}>
              <div style={{ lineHeight: 1.8, fontSize: 13 }}>专业团队提供无人机巡检、航拍、测绘等综合低空服务。配备持证飞手，全程投保，保障作业安全与交付质量。</div>
            </Descriptions.Item>
            <Descriptions.Item label="联系人">王工</Descriptions.Item>
            <Descriptions.Item label="联系电话"><span style={{ color: '#1677ff' }}>138-0000-8888</span></Descriptions.Item>
            <Descriptions.Item label="当前状态">
              <Tag color={detailRecord.status === '已发布' ? 'green' : detailRecord.status === '已暂停' ? 'default' : 'red'}>{detailRecord.status}</Tag>
            </Descriptions.Item>
            <Descriptions.Item label="发布时间">{detailRecord.createDate}</Descriptions.Item>
            <Descriptions.Item label="浏览量">{detailRecord.views}</Descriptions.Item>
            <Descriptions.Item label="成单量">{detailRecord.orders}</Descriptions.Item>
          </Descriptions>
        )}
      </Modal>

      <Modal
        title={null}
        open={previewOpen}
        onCancel={() => setPreviewOpen(false)}
        width="90vw"
        style={{ top: 20 }}
        footer={[
          <Button key="close" type="primary" onClick={() => setPreviewOpen(false)}>关闭预览</Button>
        ]}
        styles={{ body: { padding: 0, height: '80vh' } }}
      >
        <iframe
          src="/prototypes/service-detail?preview=true"
          style={{ width: '100%', height: '100%', border: 'none', borderRadius: 8 }}
          title="服务预览"
        />
      </Modal>
    </div>
  );
};

export default Component;
