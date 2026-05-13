/**
 * @name 我的商品（商户）
 * @mode axure
 * /Users/xu/Desktop/元引信息/Axhub-Make-main/skills/axure-export-workflow/SKILL.md
 *
 */

import './style.css';

import React, { useState, useCallback } from 'react';
import { Card, Table, Tag, Button, Breadcrumb, Avatar, Row, Col, Select, message, Modal, Tabs } from 'antd';
import { HomeOutlined, UserOutlined, SafetyCertificateOutlined, PlusOutlined, EyeOutlined } from '@ant-design/icons';

var MENU_ITEMS = [
  { key: 'profile-certified', label: '我的信息', group: '账号管理' },
  { key: 'role-management', label: '角色管理' },
  { key: 'message-center', label: '消息中心' },
  { key: 'my-intention', label: '我的意向', group: '个人/需求方业务' },
  { key: 'my-service-demand', label: '我的服务需求' },
  { key: 'my-demand', label: '我的采购需求' },
  { key: 'my-aircraft', label: '我的飞行器', group: '飞行服务 (飞手/企业)' },
  { key: 'my-flight-plan', label: '我的飞行计划' },
  { key: 'my-goods', label: '我的商品', group: '低空商城 (商户)' },
  { key: 'mall-publish', label: '发布商品' },
  { key: 'my-service', label: '我的服务', group: '低空服务 (飞行服务商)' },
  { key: 'service-publish', label: '发布服务项目' },
  { key: 'provider-orders', label: '预约受理单' },
  { key: 'provider-intentions', label: '收到的意向' }
];

var GOODS_DATA = [
  { key: '1', name: 'DJI Matrice 350 RTK 工业级无人机', category: '飞行器', price: '¥68,800', stock: 15, sales: 23, status: '展示中', createDate: '2026-03-10' },
  { key: '2', name: '大疆 DJI Mavic 3 Enterprise', category: '飞行器', price: '¥23,800', stock: 28, sales: 45, status: '已下线', createDate: '2026-02-18' },
  { key: '3', name: '纵横 CW-25 垂直起降固定翼', category: '飞行器', price: '¥128,000', stock: 5, sales: 8, status: '展示中', createDate: '2026-01-20' },
  { key: '4', name: '特价三无电池', category: '配件', price: '¥500', stock: 0, sales: 12, status: '违规下架', createDate: '2025-12-05' },
  { key: '5', name: '道通 EVO Lite+ 航拍无人机', category: '飞行器', price: '¥7,999', stock: 20, sales: 67, status: '展示中', createDate: '2026-04-01' }
];

var COLUMNS = [
  { title: '商品名称', dataIndex: 'name', key: 'name', render: function (n: string) { return <a onClick={function () { handleNavigate('mall-detail'); }}>{n}</a>; } },
  { title: '类别', dataIndex: 'category', key: 'category', render: function (t: string) { return <Tag color="purple">{t}</Tag>; } },
  { title: '价格', dataIndex: 'price', key: 'price', render: function (p: string) { return <span style={{ color: '#ff4d4f', fontWeight: 600 }}>{p}</span>; } },
  { title: '库存', dataIndex: 'stock', key: 'stock', render: function (s: number) { return <span style={{ color: s === 0 ? '#ff4d4f' : s < 10 ? '#fa8c16' : '#52c41a' }}>{s}</span>; } },
  { title: '销量', dataIndex: 'sales', key: 'sales' },
  { title: '状态', dataIndex: 'status', key: 'status', render: function (s: string) { return <Tag color={s === '展示中' ? 'green' : s === '违规下架' ? 'red' : 'default'}>{s}</Tag>; } },
  { title: '发布日期', dataIndex: 'createDate', key: 'createDate' },
  { title: '操作', key: 'action', render: function (_: any, record: any) {
    return (
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        <a style={{ color: '#1677ff' }} onClick={function () { handleNavigate('mall-detail'); }}>查看</a>
        {record.status === '展示中' && (
          <>
            <a style={{ color: '#1677ff' }} onClick={function () { message.success('编辑商品'); }}>编辑</a>
            <a style={{ color: '#faad14' }} onClick={function () { message.success('已下线'); }}>下线</a>
          </>
        )}
        {record.status === '已下线' && (
          <>
            <a style={{ color: '#1677ff' }} onClick={function () { message.success('编辑商品'); }}>编辑</a>
            <a style={{ color: '#52c41a' }} onClick={function () { message.success('已重新发布'); }}>重新发布</a>
            <a style={{ color: '#ff4d4f' }} onClick={function () { message.success('已删除'); }}>删除</a>
          </>
        )}
        {record.status === '违规下架' && (
          <>
            <a style={{ color: '#faad14' }} onClick={function () { Modal.error({ title: '违规详情', content: '您发布的商品涉嫌违规内容，已被管理员强制下架。如有异议请联系客服。' }); }}>查看原因</a>
            <a style={{ color: '#ff4d4f' }} onClick={function () { message.success('已删除'); }}>删除</a>
          </>
        )}
      </div>
    );
  }}
];

var handleNavigate = function (key: string) {
  window.location.href = '/prototypes/' + key;
};

var Component = function MyGoodsPage() {
  var [activeTab, setActiveTab] = useState('all');
  return (
    <div style={{ minHeight: '100vh', background: '#f5f5f5' }}>
      <header style={{ background: 'linear-gradient(135deg, #0c4a6e 0%, #eb2f96 100%)', padding: '0 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }} onClick={function () { handleNavigate('home'); }}>
            <SafetyCertificateOutlined style={{ fontSize: 20, color: '#fff' }} />
            <span style={{ fontSize: 16, fontWeight: 600, color: '#fff' }}>区域低空公共服务平台</span>
          </div>
          <div style={{ display: 'flex', gap: 16 }}>
            <a style={{ color: 'rgba(255,255,255,0.85)', cursor: 'pointer' }} onClick={function () { handleNavigate('home'); }}>首页</a>
            <a style={{ color: 'rgba(255,255,255,0.85)', cursor: 'pointer' }} onClick={function () { handleNavigate('news'); }}>资讯公告</a>
            <a style={{ color: 'rgba(255,255,255,0.85)', cursor: 'pointer' }} onClick={function () { handleNavigate('policy-national'); }}>政策法规</a>
            <a style={{ color: 'rgba(255,255,255,0.85)', cursor: 'pointer' }} onClick={function () { handleNavigate('service-list'); }}>低空服务</a>
            <a style={{ color: 'rgba(255,255,255,0.85)', cursor: 'pointer' }} onClick={function () { handleNavigate('mall-list'); }}>低空商城</a>
            <a style={{ color: 'rgba(255,255,255,0.85)', cursor: 'pointer' }} onClick={function () { handleNavigate('flight-dynamic'); }}>飞行服务</a>
            <a style={{ color: '#fff', fontWeight: 600, cursor: 'pointer' }}>个人中心</a>
          </div>
        </div>
      </header>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px 24px 48px' }}>
        <Breadcrumb items={[
          { title: <a onClick={function () { handleNavigate('home'); }}><HomeOutlined /> 首页</a> },
          { title: '个人中心' },
          { title: '我的商品' }
        ]} style={{ marginBottom: 24 }} />

        <Row gutter={24}>
          <Col xs={24} md={6}>
            <Card style={{ borderRadius: 12, marginBottom: 24 }}>
              <div style={{ textAlign: 'center', marginBottom: 16 }}>
                <Avatar size={80} icon={<UserOutlined />} style={{ backgroundColor: '#eb2f96', marginBottom: 12 }} />
                <div style={{ fontSize: 18, fontWeight: 600, color: '#1f1f1f' }}>张明</div>
                <Tag color="green" style={{ marginTop: 8 }}>飞手</Tag>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                {MENU_ITEMS.map(function (item) {
                  return (
                    <div key={item.key}>
                      {item.group ? <div style={{ fontSize: 11, color: '#bfbfbf', padding: '8px 16px 4px', fontWeight: 600, letterSpacing: 1 }}>{item.group}</div> : null}
                      <div
                        onClick={function () { if (item.key !== 'my-goods') handleNavigate(item.key); }}
                        style={{
                          padding: '10px 16px',
                          borderRadius: 8,
                          cursor: 'pointer',
                          background: item.key === 'my-goods' ? '#fff0f6' : 'transparent',
                          color: item.key === 'my-goods' ? '#eb2f96' : '#595959',
                          fontWeight: item.key === 'my-goods' ? 600 : 400,
                          fontSize: 14,
                          marginBottom: 4
                        }}
                      >
                        {item.label}
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          </Col>
          <Col xs={24} md={18}>
            <Card title="我的商品" extra={<Button type="primary" icon={<PlusOutlined />} onClick={function () { handleNavigate('mall-publish'); }}>发布商品</Button>} style={{ borderRadius: 12 }}>
              <div style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
                <div style={{ padding: '12px 20px', background: '#f6ffed', borderRadius: 8, textAlign: 'center' }}>
                  <div style={{ fontSize: 20, fontWeight: 700, color: '#52c41a' }}>{GOODS_DATA.filter(function (g) { return g.status === '展示中'; }).length}</div>
                  <div style={{ fontSize: 12, color: '#8c8c8c' }}>展示中</div>
                </div>
                <div style={{ padding: '12px 20px', background: '#fff7e6', borderRadius: 8, textAlign: 'center' }}>
                  <div style={{ fontSize: 20, fontWeight: 700, color: '#fa8c16' }}>{GOODS_DATA.filter(function (g) { return g.status !== '展示中'; }).length}</div>
                  <div style={{ fontSize: 12, color: '#8c8c8c' }}>异常/下架</div>
                </div>
                <div style={{ padding: '12px 20px', background: '#e6f4ff', borderRadius: 8, textAlign: 'center' }}>
                  <div style={{ fontSize: 20, fontWeight: 700, color: '#1677ff' }}>{GOODS_DATA.reduce(function (sum, g) { return sum + g.sales; }, 0)}</div>
                  <div style={{ fontSize: 12, color: '#8c8c8c' }}>总销量</div>
                </div>
              </div>
              
              {GOODS_DATA.filter(function (d) { return d.status === '违规下架'; }).length > 0 && (
                <div style={{ padding: '8px 16px', background: '#fff2f0', border: '1px solid #ffccc7', borderRadius: 6, marginBottom: 16, color: '#cf1322', fontSize: 13 }}>
                  系统提示：发现被违规下架的商品，涉嫌违反平台发布规范。如有疑问请致电客服咨询：400-123-4567。
                </div>
              )}
              
              <Tabs
                activeKey={activeTab}
                onChange={setActiveTab}
                items={[
                  { key: 'all', label: `全部 (${GOODS_DATA.length})` },
                  { key: '展示中', label: `展示中 (${GOODS_DATA.filter(function (d) { return d.status === '展示中'; }).length})` },
                  { key: '已下线', label: `已下线 (${GOODS_DATA.filter(function (d) { return d.status === '已下线'; }).length})` },
                  { key: '违规下架', label: `违规下架 (${GOODS_DATA.filter(function (d) { return d.status === '违规下架'; }).length})` }
                ]}
                style={{ marginBottom: 0 }}
              />
              <Table 
                columns={COLUMNS} 
                dataSource={activeTab === 'all' ? GOODS_DATA : GOODS_DATA.filter(function(d) { return d.status === activeTab; })} 
                pagination={{ pageSize: 5 }} 
              />
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Component;
