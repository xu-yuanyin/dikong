/**
 * @name 我的飞行器
 * @mode axure
 * /Users/xu/Desktop/元引信息/Axhub-Make-main/skills/axure-export-workflow/SKILL.md
 *
 */

import './style.css';

import React, { useState, useCallback } from 'react';
import { Card, Table, Tag, Button, Breadcrumb, Tabs, Avatar, Row, Col, Select, message } from 'antd';
import { HomeOutlined, UserOutlined, SafetyCertificateOutlined, PlusOutlined } from '@ant-design/icons';

var MENU_ITEMS = [
  { key: 'profile', label: '我的信息' },
  { key: 'my-aircraft', label: '我的飞行器' },
  { key: 'my-flight-plan', label: '我的飞行计划' },
  { key: 'my-service', label: '我的服务' },
  { key: 'my-intention', label: '我的采购意向' },
  { key: 'my-service-demand', label: '我的需求' }
];

var FILED_COLUMNS = [
  { title: '飞行器编号', dataIndex: 'id', key: 'id' },
  { title: '型号', dataIndex: 'model', key: 'model' },
  { title: '类型', dataIndex: 'type', key: 'type', render: function (t: string) { return <Tag color="blue">{t}</Tag>; } },
  { title: '备案日期', dataIndex: 'filedDate', key: 'filedDate' },
  { title: '状态', dataIndex: 'status', key: 'status', render: function (s: string) { return <Tag color={s === '已备案' ? 'green' : 'orange'}>{s}</Tag>; } }
];

var FILED_DATA = [
  { key: '1', id: 'UAV-2024-0088', model: 'DJI Matrice 350 RTK', type: '多旋翼', filedDate: '2025-08-15', status: '已备案' },
  { key: '2', id: 'UAV-2024-0092', model: 'DJI Mavic 3 Enterprise', type: '多旋翼', filedDate: '2025-09-20', status: '已备案' },
  { key: '3', id: 'UAV-2025-0003', model: '纵横 CW-25', type: '固定翼', filedDate: '2026-01-10', status: '审核中' }
];

var MY_COLUMNS = [
  { title: '飞行器编号', dataIndex: 'id', key: 'id' },
  { title: '型号', dataIndex: 'model', key: 'model' },
  { title: '类型', dataIndex: 'type', key: 'type', render: function (t: string) { return <Tag color="purple">{t}</Tag>; } },
  { title: '购入日期', dataIndex: 'purchaseDate', key: 'purchaseDate' },
  { title: '飞行时长', dataIndex: 'flightHours', key: 'flightHours' },
  { title: '状态', dataIndex: 'status', key: 'status', render: function (s: string) { return <Tag color={s === '可用' ? 'green' : s === '维修中' ? 'orange' : 'red'}>{s}</Tag>; } },
  { title: '操作', key: 'action', render: function (_: any, record: any) { return <Select size="small" defaultValue={record.status} style={{ width: 100 }} options={[{ value: '可用', label: '可用' }, { value: '维修中', label: '维修中' }, { value: '报废', label: '报废' }]} onChange={function (v) { message.success('状态已更新为：' + v); }} />; } }
];

var MY_DATA = [
  { key: '1', id: 'UAV-2024-0088', model: 'DJI Matrice 350 RTK', type: '多旋翼', purchaseDate: '2025-07-10', flightHours: '128h', status: '可用' },
  { key: '2', id: 'UAV-2024-0092', model: 'DJI Mavic 3 Enterprise', type: '多旋翼', purchaseDate: '2025-08-05', flightHours: '56h', status: '可用' },
  { key: '3', id: 'UAV-2025-0003', model: '纵横 CW-25', type: '固定翼', purchaseDate: '2025-12-20', flightHours: '23h', status: '维修中' }
];

const Component = function MyAircraftPage() {
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
          { title: '我的飞行器' }
        ]} style={{ marginBottom: 24 }} />

        <Row gutter={24}>
          <Col xs={24} md={6}>
            <Card style={{ borderRadius: 12, marginBottom: 24 }}>
              <div style={{ textAlign: 'center', marginBottom: 16 }}>
                <Avatar size={80} icon={<UserOutlined />} style={{ backgroundColor: '#52c41a', marginBottom: 12 }} />
                <div style={{ fontSize: 18, fontWeight: 600, color: '#1f1f1f' }}>张明</div>
                <Tag color="green" style={{ marginTop: 8 }}>飞手</Tag>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {MENU_ITEMS.map(function (item, idx) {
                  var isActive = item.key === 'my-aircraft';
                  return (
                    <div key={item.key}>
                      {item.group ? <div style={{ fontSize: 11, color: '#bfbfbf', padding: '12px 16px 4px', fontWeight: 600, letterSpacing: 1 }}>{item.group}</div> : null}
                      <div
                        onClick={function () { if (!isActive) handleNavigate(item.key); }}
                        style={{
                          padding: '10px 16px',
                          borderRadius: 8,
                          cursor: 'pointer',
                          background: isActive ? '#fff0f6' : 'transparent',
                          color: isActive ? '#eb2f96' : '#595959',
                          fontWeight: isActive ? 600 : 400,
                          fontSize: 14
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
            <Card
              title="我的飞行器"
              extra={<Button type="primary" icon={<PlusOutlined />} onClick={function () { handleNavigate('register-aircraft'); }}>备案飞行器</Button>}
              style={{ borderRadius: 12 }}
            >
              <Tabs
                activeKey={activeTab}
                onChange={setActiveTab}
                items={[
                  { key: 'filed', label: '备案飞行器', children: <Table columns={FILED_COLUMNS} dataSource={FILED_DATA} pagination={false} /> },
                  { key: 'my', label: '我的飞行器', children: <Table columns={MY_COLUMNS} dataSource={MY_DATA} pagination={false} /> }
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
