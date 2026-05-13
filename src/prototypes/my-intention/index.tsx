/**
 * @name 我的采购意向（需求方）
 * @mode axure
 * /Users/xu/Desktop/元引信息/Axhub-Make-main/skills/axure-export-workflow/SKILL.md
 *
 */

import './style.css';

import React, { useState, useCallback } from 'react';
import { Card, Table, Tag, Button, Breadcrumb, Avatar, Row, Col, message } from 'antd';
import { HomeOutlined, UserOutlined, SafetyCertificateOutlined, PlusOutlined } from '@ant-design/icons';

var MENU_ITEMS = [
  { key: 'profile', label: '我的信息' },
  { key: 'my-aircraft', label: '我的飞行器' },
  { key: 'my-flight-plan', label: '我的飞行计划' },
  { key: 'my-service', label: '我的服务' },
  { key: 'my-intention', label: '我的采购意向' },
  { key: 'my-service-demand', label: '我的需求' }
];

var INTENTION_DATA = [
  { key: '1', product: 'DJI Matrice 350 RTK 工业级无人机', type: '飞行器', quantity: 5, budget: '¥30-40万', status: '已报价', company: '大疆代理商', createDate: '2026-04-22', quoteCount: 3 },
  { key: '2', product: '激光雷达测绘模块', type: '配件', quantity: 3, budget: '¥6-9万', status: '等待报价', company: '-', createDate: '2026-04-25', quoteCount: 0 },
  { key: '3', product: '纵横 CW-25 垂直起降固定翼', type: '飞行器', quantity: 2, budget: '¥20-25万', status: '已成交', company: '纵横股份', createDate: '2026-04-10', quoteCount: 4 },
  { key: '4', product: '飞宇 AK2000S 三轴稳定器', type: '配件', quantity: 10, budget: '¥2-3万', status: '已报价', company: '飞宇科技', createDate: '2026-04-18', quoteCount: 2 },
  { key: '5', product: '道通 EVO Lite+ 航拍无人机', type: '飞行器', quantity: 8, budget: '¥5-7万', status: '已取消', company: '-', createDate: '2026-03-28', quoteCount: 1 }
];

var COLUMNS = [
  { title: '关联商品', dataIndex: 'product', key: 'product', render: function (p: string) { return <a onClick={function () { handleNavigate('mall-detail'); }}>{p}</a>; } },
  { title: '类型', dataIndex: 'type', key: 'type', render: function (t: string) { return <Tag color="purple">{t}</Tag>; } },
  { title: '数量', dataIndex: 'quantity', key: 'quantity' },
  { title: '预算', dataIndex: 'budget', key: 'budget', render: function (b: string) { return <span style={{ color: '#ff4d4f', fontWeight: 600 }}>{b}</span>; } },
  { title: '报价数', dataIndex: 'quoteCount', key: 'quoteCount', render: function (c: number) { return c > 0 ? <Tag color="orange">{c} 条报价</Tag> : <Tag>暂无</Tag>; } },
  { title: '供应商', dataIndex: 'company', key: 'company' },
  { title: '状态', dataIndex: 'status', key: 'status', render: function (s: string) { return <Tag color={s === '已报价' ? 'blue' : s === '等待报价' ? 'orange' : s === '已成交' ? 'green' : 'default'}>{s}</Tag>; } },
  { title: '提交日期', dataIndex: 'createDate', key: 'createDate' },
  { title: '操作', key: 'action', render: function (_: any, record: any) {
    return (
      <div style={{ display: 'flex', gap: 8 }}>
        <a onClick={function () { message.info('查看报价详情'); }}>查看</a>
        {record.status === '等待报价' && <a onClick={function () { message.success('已取消意向'); }}>取消</a>}
        {record.status === '已报价' && <a onClick={function () { message.success('已确认成交'); }}>确认成交</a>}
      </div>
    );
  }}
];

var handleNavigate = function (key: string) {
  window.location.href = '/prototypes/' + key;
};

var Component = function MyIntentionPage() {
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
          { title: '我的采购意向' }
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
                    <div
                      key={item.key}
                      onClick={function () { if (item.key !== 'my-intention') handleNavigate(item.key); }}
                      style={{
                        padding: '10px 16px',
                        borderRadius: 8,
                        cursor: 'pointer',
                        background: item.key === 'my-intention' ? '#fff0f6' : 'transparent',
                        color: item.key === 'my-intention' ? '#eb2f96' : '#595959',
                        fontWeight: item.key === 'my-intention' ? 600 : 400,
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
          <Col xs={24} md={18}>
            <Card title="我的采购意向" extra={<Button type="primary" icon={<PlusOutlined />} onClick={function () { handleNavigate('mall-list'); }}>去商城</Button>} style={{ borderRadius: 12 }}>
              <div style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
                <div style={{ padding: '12px 20px', background: '#fff7e6', borderRadius: 8, textAlign: 'center' }}>
                  <div style={{ fontSize: 20, fontWeight: 700, color: '#fa8c16' }}>{INTENTION_DATA.filter(function (i) { return i.status === '等待报价'; }).length}</div>
                  <div style={{ fontSize: 12, color: '#8c8c8c' }}>等待报价</div>
                </div>
                <div style={{ padding: '12px 20px', background: '#e6f4ff', borderRadius: 8, textAlign: 'center' }}>
                  <div style={{ fontSize: 20, fontWeight: 700, color: '#1677ff' }}>{INTENTION_DATA.filter(function (i) { return i.status === '已报价'; }).length}</div>
                  <div style={{ fontSize: 12, color: '#8c8c8c' }}>已报价</div>
                </div>
                <div style={{ padding: '12px 20px', background: '#f6ffed', borderRadius: 8, textAlign: 'center' }}>
                  <div style={{ fontSize: 20, fontWeight: 700, color: '#52c41a' }}>{INTENTION_DATA.filter(function (i) { return i.status === '已成交'; }).length}</div>
                  <div style={{ fontSize: 12, color: '#8c8c8c' }}>已成交</div>
                </div>
              </div>
              <Table columns={COLUMNS} dataSource={INTENTION_DATA} pagination={{ pageSize: 5 }} />
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Component;
