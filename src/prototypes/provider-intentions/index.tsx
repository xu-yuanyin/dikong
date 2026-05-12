/**
 * @name 收到的采购意向（供给方）
 * @mode axure
 */

import './style.css';

import React, { useState, useCallback } from 'react';
import { Card, Table, Tag, Breadcrumb, Avatar, Row, Col, message } from 'antd';
import { HomeOutlined, SafetyCertificateOutlined, TeamOutlined } from '@ant-design/icons';

var SUPPLY_MENU = [
  { key: 'profile', label: '企业信息' },
  { key: 'mall-publish', label: '发布商品' },
  { key: 'my-goods', label: '我的商品' },
  { key: 'service-publish', label: '发布服务' },
  { key: 'provider-orders', label: '收到的服务工单' },
  { key: 'provider-intentions', label: '收到的采购意向' }
];

var INTENTIONS_DATA = [
  { key: '1', product: 'DJI Matrice 350 RTK 工业级无人机', customer: '李先生', phone: '13812345678', quantity: 5, budget: '30-40万', status: '待处理', date: '2026-04-22' },
  { key: '2', product: '大疆 DJI Mavic 3 Enterprise', customer: '张总', phone: '13987654321', quantity: 2, budget: '4-5万', status: '已报价', date: '2026-04-21' },
  { key: '3', product: '纵横 CW-25 垂直起降固定翼', customer: '王工', phone: '13655556666', quantity: 1, budget: '12万左右', status: '已成交', date: '2026-04-10' }
];

var Component = function ProviderIntentionsPage() {
  var handleNavigate = useCallback(function (key: string) {
    window.location.href = '/prototypes/' + key;
  }, []);

  var updateStatus = function (status: string) {
    message.success(`意向状态已更新为：${status}`);
  };

  var COLUMNS = [
    { title: '客户意向商品', dataIndex: 'product', key: 'product', render: function (p: string) { return <span style={{ fontWeight: 500, color: '#1677ff' }}>{p}</span>; } },
    { title: '客户姓名', dataIndex: 'customer', key: 'customer' },
    { title: '联系电话', dataIndex: 'phone', key: 'phone' },
    { title: '采购数量', dataIndex: 'quantity', key: 'quantity' },
    { title: '期望预算', dataIndex: 'budget', key: 'budget', render: function (b: string) { return <span style={{ color: '#ff4d4f' }}>{b}</span>; } },
    { title: '提交时间', dataIndex: 'date', key: 'date' },
    { title: '状态', dataIndex: 'status', key: 'status', render: function (s: string) { 
      return <Tag color={s === '待处理' ? 'orange' : s === '已报价' ? 'blue' : 'green'}>{s}</Tag>; 
    }},
    { title: '操作', key: 'action', render: function (_: any, record: any) {
      return (
        <div style={{ display: 'flex', gap: 8 }}>
          {record.status === '待处理' && <a onClick={function() { updateStatus('已报价'); }}>标记已报价</a>}
          {record.status === '已报价' && <a onClick={function() { updateStatus('已成交'); }}>确认成交</a>}
          <a style={{ color: '#8c8c8c' }}>查看详情</a>
        </div>
      );
    }}
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#f5f5f5' }}>
      <header style={{ background: 'linear-gradient(135deg, #0c4a6e 0%, #1677ff 100%)', padding: '0 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }} onClick={function () { handleNavigate('home'); }}>
            <SafetyCertificateOutlined style={{ fontSize: 20, color: '#fff' }} />
            <span style={{ fontSize: 16, fontWeight: 600, color: '#fff' }}>区域低空公共服务平台</span>
          </div>
          <div style={{ display: 'flex', gap: 16 }}>
            <a style={{ color: 'rgba(255,255,255,0.85)', cursor: 'pointer' }} onClick={function () { handleNavigate('home'); }}>首页</a>
            <a style={{ color: '#fff', fontWeight: 600, cursor: 'pointer' }}>服务商后台</a>
          </div>
        </div>
      </header>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px 24px 48px' }}>
        <Breadcrumb items={[
          { title: <a onClick={function () { handleNavigate('home'); }}><HomeOutlined /> 首页</a> },
          { title: '服务商后台' },
          { title: '收到的采购意向' }
        ]} style={{ marginBottom: 24 }} />

        <Row gutter={24}>
          <Col xs={24} md={5}>
            <Card style={{ borderRadius: 12, marginBottom: 24 }}>
              <div style={{ textAlign: 'center', marginBottom: 16 }}>
                <Avatar size={72} icon={<TeamOutlined />} style={{ backgroundColor: '#1677ff', marginBottom: 12 }} />
                <div style={{ fontSize: 16, fontWeight: 600, color: '#1f1f1f' }}>XX通航设备商</div>
                <Tag color="blue" style={{ marginTop: 8 }}>已认证供应商</Tag>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                {SUPPLY_MENU.map(function (item) {
                  return (
                    <div
                      key={item.key}
                      onClick={function () { if (item.key !== 'provider-intentions') handleNavigate(item.key); }}
                      style={{
                        padding: '10px 16px',
                        borderRadius: 8,
                        cursor: 'pointer',
                        background: item.key === 'provider-intentions' ? '#e6f4ff' : 'transparent',
                        color: item.key === 'provider-intentions' ? '#1677ff' : '#595959',
                        fontWeight: item.key === 'provider-intentions' ? 600 : 400,
                        fontSize: 14
                      }}
                    >
                      {item.label}
                    </div>
                  );
                })}
              </div>
            </Card>
          </Col>
          <Col xs={24} md={19}>
            <Card title="客户提交的采购意向" style={{ borderRadius: 12 }}>
              <div style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
                <div style={{ padding: '12px 10px', background: '#fff7e6', borderRadius: 8, textAlign: 'center', flex: 1 }}>
                  <div style={{ fontSize: 24, fontWeight: 700, color: '#fa8c16' }}>{INTENTIONS_DATA.filter(function(d) { return d.status === '待处理'; }).length}</div>
                  <div style={{ fontSize: 12, color: '#8c8c8c' }}>待处理</div>
                </div>
                <div style={{ padding: '12px 10px', background: '#e6f4ff', borderRadius: 8, textAlign: 'center', flex: 1 }}>
                  <div style={{ fontSize: 24, fontWeight: 700, color: '#1677ff' }}>{INTENTIONS_DATA.filter(function(d) { return d.status === '已报价'; }).length}</div>
                  <div style={{ fontSize: 12, color: '#8c8c8c' }}>已报价</div>
                </div>
                <div style={{ padding: '12px 10px', background: '#f6ffed', borderRadius: 8, textAlign: 'center', flex: 1 }}>
                  <div style={{ fontSize: 24, fontWeight: 700, color: '#52c41a' }}>{INTENTIONS_DATA.filter(function(d) { return d.status === '已成交'; }).length}</div>
                  <div style={{ fontSize: 12, color: '#8c8c8c' }}>已成交</div>
                </div>
              </div>
              <Table columns={COLUMNS} dataSource={INTENTIONS_DATA} pagination={{ pageSize: 10 }} />
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Component;
