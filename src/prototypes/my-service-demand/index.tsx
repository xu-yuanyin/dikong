/**
 * @name 我的服务需求（需求方）
 * @mode axure
 * /Users/xu/Desktop/元引信息/Axhub-Make-main/skills/axure-export-workflow/SKILL.md
 *
 */

import './style.css';

import React, { useState, useCallback } from 'react';
import { Card, Table, Tag, Button, Breadcrumb, Avatar, Row, Col, message, Modal } from 'antd';
import { HomeOutlined, UserOutlined, SafetyCertificateOutlined, PlusOutlined } from '@ant-design/icons';

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

var DEMAND_DATA = [
  { key: '1', title: '需要测绘无人机培训服务', type: '飞行培训', budget: '¥3,000-5,000', area: '主城区', status: '进行中', createDate: '2026-04-20', responseCount: 3, deadline: '2026-05-15' },
  { key: '2', title: '航拍服务需求（房地产项目）', type: '低空旅游', budget: '¥5,000-8,000', area: '全市', status: '已解决', createDate: '2026-04-10', responseCount: 7, deadline: '2026-04-30' },
  { key: '3', title: '测试需求发包', type: '飞行器服务', budget: '电议', area: '郊区', status: '已屏蔽', createDate: '2026-04-18', responseCount: 0, deadline: '2026-05-20' },
  { key: '4', title: '电力巡检服务外包', type: '飞行器服务', budget: '¥10,000-15,000', area: '全市', status: '已关闭', createDate: '2026-03-15', responseCount: 5, deadline: '2026-04-15' },
  { key: '5', title: '大型活动航拍直播服务', type: '低空旅游', budget: '¥8,000-12,000', area: '主城区', status: '进行中', createDate: '2026-04-25', responseCount: 1, deadline: '2026-05-30' }
];

var COLUMNS = [
  { title: '需求标题', dataIndex: 'title', key: 'title', render: function (t: string) { return <a style={{ fontWeight: 500 }}>{t}</a>; } },
  { title: '类型', dataIndex: 'type', key: 'type', render: function (t: string) { return <Tag color="blue">{t}</Tag>; } },
  { title: '预算', dataIndex: 'budget', key: 'budget', render: function (b: string) { return <span style={{ color: '#ff4d4f', fontWeight: 600 }}>{b}</span>; } },
  { title: '区域', dataIndex: 'area', key: 'area' },
  { title: '响应数', dataIndex: 'responseCount', key: 'responseCount', render: function (c: number) { return <Tag color="orange">{c} 条响应</Tag>; } },
  { title: '截止日期', dataIndex: 'deadline', key: 'deadline' },
  { title: '状态', dataIndex: 'status', key: 'status', render: function (s: string) { return <Tag color={s === '进行中' ? 'green' : s === '已解决' ? 'blue' : s === '已屏蔽' ? 'red' : 'default'}>{s}</Tag>; } },
  { title: '发布日期', dataIndex: 'createDate', key: 'createDate' },
  { title: '操作', key: 'action', render: function (_: any, record: any) {
    if (record.status === '已屏蔽') {
      return <a style={{ color: '#ff4d4f' }} onClick={function () { Modal.error({ title: '违规屏蔽原因', content: '您发布的需求因涉嫌违规内容已被后台强制屏蔽。如有异议请联系客服：400-xxx-xxxx' }); }}>查看原因</a>;
    }
    return (
      <div style={{ display: 'flex', gap: 8 }}>
        <a onClick={function () { message.info('查看详情'); }}>查看</a>
        {record.status === '进行中' && <a onClick={function () { message.success('已关闭需求'); }}>关闭</a>}
        <a style={{ color: '#ff4d4f' }} onClick={function () { message.success('已删除'); }}>删除</a>
      </div>
    );
  }}
];

var handleNavigate = function (key: string) {
  window.location.href = '/prototypes/' + key;
};

var Component = function MyServiceDemandPage() {
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
            <a style={{ color: 'rgba(255,255,255,0.85)', cursor: 'pointer' }} onClick={function () { handleNavigate('service-show'); }}>低空服务</a>
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
          { title: '我的服务需求' }
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
                        onClick={function () { if (item.key !== 'my-service-demand') handleNavigate(item.key); }}
                        style={{
                          padding: '10px 16px',
                          borderRadius: 8,
                          cursor: 'pointer',
                          background: item.key === 'my-service-demand' ? '#fff0f6' : 'transparent',
                          color: item.key === 'my-service-demand' ? '#eb2f96' : '#595959',
                          fontWeight: item.key === 'my-service-demand' ? 600 : 400,
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
            <Card title="我的服务需求" extra={<Button type="primary" icon={<PlusOutlined />} onClick={function () { handleNavigate('demand-publish'); }}>发布需求</Button>} style={{ borderRadius: 12 }}>
              <div style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
                <div style={{ padding: '12px 20px', background: '#f6ffed', borderRadius: 8, textAlign: 'center' }}>
                  <div style={{ fontSize: 20, fontWeight: 700, color: '#52c41a' }}>{DEMAND_DATA.filter(function (d) { return d.status === '进行中'; }).length}</div>
                  <div style={{ fontSize: 12, color: '#8c8c8c' }}>进行中</div>
                </div>
                <div style={{ padding: '12px 20px', background: '#e6f4ff', borderRadius: 8, textAlign: 'center' }}>
                  <div style={{ fontSize: 20, fontWeight: 700, color: '#1677ff' }}>{DEMAND_DATA.filter(function (d) { return d.status === '已解决'; }).length}</div>
                  <div style={{ fontSize: 12, color: '#8c8c8c' }}>已解决</div>
                </div>
                <div style={{ padding: '12px 20px', background: '#f5f5f5', borderRadius: 8, textAlign: 'center' }}>
                  <div style={{ fontSize: 20, fontWeight: 700, color: '#8c8c8c' }}>{DEMAND_DATA.length}</div>
                  <div style={{ fontSize: 12, color: '#8c8c8c' }}>总需求</div>
                </div>
              </div>
              <Table columns={COLUMNS} dataSource={DEMAND_DATA} pagination={{ pageSize: 5 }} />
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Component;
