/**
 * @name 我的服务需求（需求方）
 * @mode axure
 * /Users/xu/Desktop/元引信息/Axhub-Make-main/skills/axure-export-workflow/SKILL.md
 *
 */

import './style.css';

import React, { useState, useCallback } from 'react';
import { Card, Table, Tag, Button, Breadcrumb, Avatar, Row, Col, message, Modal, Tabs } from 'antd';
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
  { key: '1', title: '需要测绘无人机培训服务', type: '飞行培训', budget: '¥3,000-5,000', area: '主城区', status: '展示中', createDate: '2026-04-20', serviceTime: '2026-05-01 至 2026-05-15', desc: '需要提供5个工作日的封闭式培训' },
  { key: '2', title: '航拍服务需求（房地产项目）', type: '低空旅游', budget: '¥5,000-8,000', area: '全市', status: '已关闭', createDate: '2026-04-10', serviceTime: '2026-04-25 至 2026-04-30', desc: '楼盘宣传片航拍素材收集' },
  { key: '3', title: '测试需求发包', type: '飞行器服务', budget: '电议', area: '郊区', status: '违规下架', createDate: '2026-04-18', serviceTime: '随时', desc: '测试使用，无需响应' },
  { key: '4', title: '电力巡检服务外包', type: '飞行器服务', budget: '¥10,000-15,000', area: '全市', status: '已关闭', createDate: '2026-03-15', serviceTime: '2026-04-01 至 2026-04-15', desc: '高压线网日常巡检' },
  { key: '5', title: '大型活动航拍直播服务', type: '低空旅游', budget: '¥8,000-12,000', area: '主城区', status: '展示中', createDate: '2026-04-25', serviceTime: '2026-05-20', desc: '马拉松赛事全程跟拍直播' }
];

var handleNavigate = function (key: string) {
  window.location.href = '/prototypes/' + key;
};

var Component = function MyServiceDemandPage() {
  var [activeTab, setActiveTab] = useState('all');

  var COLUMNS = [
    { title: '需求描述', dataIndex: 'title', key: 'title', render: function (t: string) { return <a style={{ fontWeight: 500 }} onClick={() => handleNavigate('service-demand-detail')}>{t}</a>; } },
    { title: '需求类别', dataIndex: 'type', key: 'type', render: function (t: string) { return <Tag color="blue">{t}</Tag>; } },
    { title: '预算范围', dataIndex: 'budget', key: 'budget', render: function (b: string) { return <span style={{ color: '#ff4d4f', fontWeight: 600 }}>{b}</span>; } },
    { title: '服务区域', dataIndex: 'area', key: 'area' },
    { title: '期望服务时间', dataIndex: 'serviceTime', key: 'serviceTime' },
    { title: '状态', dataIndex: 'status', key: 'status', render: function (s: string) { 
        return <Tag color={s === '展示中' ? 'green' : s === '违规下架' ? 'red' : 'default'}>{s}</Tag>; 
    }},
    { title: '发布日期', dataIndex: 'createDate', key: 'createDate' },
    { title: '操作', key: 'action', render: function (_: any, record: any) {
      return (
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <a style={{ color: '#1677ff' }} onClick={function () { handleNavigate('service-demand-detail'); }}>查看</a>
          {record.status === '展示中' && (
            <>
              <a style={{ color: '#1677ff' }}>编辑</a>
              <a style={{ color: '#faad14' }} onClick={function () { message.success('已关闭需求'); }}>关闭需求</a>
            </>
          )}
          {record.status === '已关闭' && (
            <>
              <a style={{ color: '#1677ff' }}>编辑</a>
              <a style={{ color: '#52c41a' }} onClick={function () { message.success('已重新发布'); }}>重新发布</a>
              <a style={{ color: '#ff4d4f' }} onClick={function () { message.success('已删除'); }}>删除</a>
            </>
          )}
          {record.status === '违规下架' && (
            <>
              <a style={{ color: '#faad14' }} onClick={function () { Modal.error({ title: '违规详情', content: '您发布的需求涉嫌违规内容，已被管理员强制下架。如有异议请联系客服。' }); }}>查看原因</a>
              <a style={{ color: '#ff4d4f' }} onClick={function () { message.success('已删除'); }}>删除</a>
            </>
          )}
        </div>
      );
    }}
  ];


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
              {DEMAND_DATA.filter(function (d) { return d.status === '违规下架'; }).length > 0 && (
                <div style={{ padding: '8px 16px', background: '#fff2f0', border: '1px solid #ffccc7', borderRadius: 6, marginBottom: 16, color: '#cf1322', fontSize: 13 }}>
                  系统提示：发现被违规下架的需求，涉嫌违反平台发布规范。如有疑问请致电客服咨询：400-123-4567。
                </div>
              )}
              <Tabs
                activeKey={activeTab}
                onChange={setActiveTab}
                items={[
                  { key: 'all', label: `全部 (${DEMAND_DATA.length})` },
                  { key: '展示中', label: `展示中 (${DEMAND_DATA.filter(function (d) { return d.status === '展示中'; }).length})` },
                  { key: '已关闭', label: `已关闭 (${DEMAND_DATA.filter(function (d) { return d.status === '已关闭'; }).length})` },
                  { key: '违规下架', label: `违规下架 (${DEMAND_DATA.filter(function (d) { return d.status === '违规下架'; }).length})` }
                ]}
                style={{ marginBottom: 0 }}
              />
              <Table 
                columns={COLUMNS} 
                dataSource={activeTab === 'all' ? DEMAND_DATA : DEMAND_DATA.filter(function (d) { return d.status === activeTab; })} 
                pagination={{ pageSize: 10 }} 
              />
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Component;
