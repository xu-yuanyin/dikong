/**
 * @name 我的飞行计划
 * @mode axure
 * /Users/xu/Desktop/元引信息/Axhub-Make-main/skills/axure-export-workflow/SKILL.md
 *
 */

import './style.css';

import React, { useState, useCallback } from 'react';
import { Card, Table, Tag, Button, Breadcrumb, Tabs, Avatar, Row, Col } from 'antd';
import { HomeOutlined, UserOutlined, SafetyCertificateOutlined, PlusOutlined } from '@ant-design/icons';

var MENU_ITEMS = [
  { key: 'profile', label: '我的信息' },
  { key: 'my-aircraft', label: '我的飞行器' },
  { key: 'my-flight-plan', label: '我的飞行计划' },
  { key: 'my-service', label: '我的服务' },
  { key: 'my-orders', label: '我的预约' },
  
];

var FILED_COLUMNS = [
  { title: '计划编号', dataIndex: 'id', key: 'id' },
  { title: '飞行目的', dataIndex: 'purpose', key: 'purpose' },
  { title: '飞行日期', dataIndex: 'date', key: 'date' },
  { title: '时间段', dataIndex: 'timeRange', key: 'timeRange' },
  { title: '飞行器', dataIndex: 'aircraft', key: 'aircraft' },
  { title: '状态', dataIndex: 'status', key: 'status', render: function (s: string) { return <Tag color={s === '已通过' ? 'green' : s === '审核中' ? 'blue' : s === '已驳回' ? 'red' : 'default'}>{s}</Tag>; } }
];

var FILED_DATA = [
  { key: '1', id: 'FP-2026-0188', purpose: '测绘巡检', date: '2026-04-22', timeRange: '08:00-12:00', aircraft: 'DJI M350 RTK', status: '已通过' },
  { key: '2', id: 'FP-2026-0195', purpose: '物流配送', date: '2026-04-23', timeRange: '09:00-11:00', aircraft: 'DJI Mavic 3E', status: '审核中' },
  { key: '3', id: 'FP-2026-0201', purpose: '航拍摄影', date: '2026-04-20', timeRange: '14:00-16:00', aircraft: '纵横 CW-25', status: '已驳回' }
];

var MY_COLUMNS = [
  { title: '计划编号', dataIndex: 'id', key: 'id' },
  { title: '飞行目的', dataIndex: 'purpose', key: 'purpose' },
  { title: '飞行日期', dataIndex: 'date', key: 'date' },
  { title: '时间段', dataIndex: 'timeRange', key: 'timeRange' },
  { title: '飞行器', dataIndex: 'aircraft', key: 'aircraft' },
  { title: '状态', dataIndex: 'status', key: 'status', render: function (s: string) { return <Tag color={s === '执行中' ? 'processing' : s === '已完成' ? 'success' : 'default'}>{s}</Tag>; } }
];

var MY_DATA = [
  { key: '1', id: 'FP-2026-0188', purpose: '测绘巡检', date: '2026-04-22', timeRange: '08:00-12:00', aircraft: 'DJI M350 RTK', status: '执行中' },
  { key: '2', id: 'FP-2026-0175', purpose: '巡检', date: '2026-04-18', timeRange: '09:00-11:00', aircraft: 'DJI Mavic 3E', status: '已完成' },
  { key: '3', id: 'FP-2026-0162', purpose: '航拍', date: '2026-04-15', timeRange: '14:00-16:00', aircraft: '纵横 CW-25', status: '已完成' }
];

const Component = function MyFlightPlanPage() {
  const [activeTab, setActiveTab] = useState('filed');

  const handleNavigate = useCallback(function (key: string) {
    const baseUrl = window.location.origin;
    window.location.href = '/prototypes/' + key;
  }, []);

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
          { title: '我的飞行计划' }
        ]} style={{ marginBottom: 24 }} />

        <Row gutter={24}>
          <Col xs={24} md={6}>
            <Card style={{ borderRadius: 12, marginBottom: 24 }}>
              <div style={{ textAlign: 'center', marginBottom: 16 }}>
                <Avatar size={80} icon={<UserOutlined />} style={{ backgroundColor: '#52c41a', marginBottom: 12 }} />
                <div style={{ fontSize: 18, fontWeight: 600, color: '#1f1f1f' }}>张明</div>
                <Tag color="green" style={{ marginTop: 8 }}>飞手</Tag>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                {MENU_ITEMS.map(function (item) {
                  return (
                    <div
                      key={item.key}
                      onClick={function () { if (item.key !== 'my-flight-plan') handleNavigate(item.key); }}
                      style={{
                        padding: '10px 16px',
                        borderRadius: 8,
                        cursor: 'pointer',
                        background: item.key === 'my-flight-plan' ? '#f6ffed' : 'transparent',
                        color: item.key === 'my-flight-plan' ? '#52c41a' : '#595959',
                        fontWeight: item.key === 'my-flight-plan' ? 600 : 400,
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
            <Card
              title="我的飞行计划"
              extra={
                <div style={{ display: 'flex', gap: 8 }}>
                  <Button type="primary" icon={<PlusOutlined />} onClick={function () { handleNavigate('register-flight-plan'); }}>备案飞行计划</Button>
                </div>
              }
              style={{ borderRadius: 12 }}
            >
              <Tabs
                activeKey={activeTab}
                onChange={setActiveTab}
                items={[
                  { key: 'filed', label: '备案飞行计划', children: <Table columns={FILED_COLUMNS} dataSource={FILED_DATA} pagination={false} /> },
                  { key: 'my', label: '我的飞行计划', children: <Table columns={MY_COLUMNS} dataSource={MY_DATA} pagination={false} /> }
                ]}
              />
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Component;
