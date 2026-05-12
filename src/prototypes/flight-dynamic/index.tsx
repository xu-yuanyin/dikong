/**
 * @name 本地动态
 * @mode axure
 * /Users/xu/Desktop/元引信息/Axhub-Make-main/skills/axure-export-workflow/SKILL.md
 *
 */

import './style.css';

import React, { useState, useCallback } from 'react';
import { Card, Tag, Row, Col, Pagination, Breadcrumb, Tabs, Timeline } from 'antd';
import { HomeOutlined, RocketOutlined, ClockCircleOutlined, CheckCircleOutlined, WarningOutlined, SyncOutlined } from '@ant-design/icons';

const DYNAMICS = [
  { id: 1, title: '城东片区低空航线临时调整通知', time: '10分钟前', type: '通知', status: 'urgent', content: '因城东片区施工需要，4月22日6:00-18:00临时调整低空航线...' },
  { id: 2, title: '南区空域开放时间延长', time: '1小时前', type: '公告', status: 'normal', content: '经空管委批准，南区训练空域开放时间延长至每日20:00...' },
  { id: 3, title: '新一批eVTOL试飞许可发放', time: '3小时前', type: '审批', status: 'success', content: '本周共发放5份eVTOL试飞许可，涉及3家企业...' },
  { id: 4, title: '气象预警：明日大风天气', time: '5小时前', type: '预警', status: 'warning', content: '明日6:00-14:00预计风力5-6级，建议暂停低空飞行活动...' },
  { id: 5, title: '低空交通管理系统升级完成', time: '1天前', type: '系统', status: 'normal', content: '低空交通管理系统V2.1升级完成，新增实时避障功能...' }
];

const STATS = [
  { label: '今日飞行', value: '128', unit: '架次', color: '#1677ff' },
  { label: '活跃空域', value: '15', unit: '个', color: '#52c41a' },
  { label: '在线飞手', value: '86', unit: '人', color: '#722ed1' },
  { label: '待审批计划', value: '23', unit: '个', color: '#fa8c16' }
];

const Component = function FlightDynamicPage() {
  const handleNavigate = useCallback(function (key: string) {
    const baseUrl = window.location.origin;
    window.location.href = '/prototypes/' + key;
  }, []);

  return (
    <div style={{ minHeight: '100vh', background: '#f5f5f5' }}>
      <header style={{ background: 'linear-gradient(135deg, #0c4a6e 0%, #13c2c2 100%)', padding: '0 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }} onClick={function () { handleNavigate('home'); }}>
            <RocketOutlined style={{ fontSize: 20, color: '#fff' }} />
            <span style={{ fontSize: 16, fontWeight: 600, color: '#fff' }}>区域低空公共服务平台</span>
          </div>
          <div style={{ display: 'flex', gap: 16 }}>
            <a style={{ color: 'rgba(255,255,255,0.85)', cursor: 'pointer' }} onClick={function () { handleNavigate('home'); }}>首页</a>
            <a style={{ color: 'rgba(255,255,255,0.85)', cursor: 'pointer' }} onClick={function () { handleNavigate('news'); }}>资讯公告</a>
            <a style={{ color: 'rgba(255,255,255,0.85)', cursor: 'pointer' }} onClick={function () { handleNavigate('policy-national'); }}>政策法规</a>
            <a style={{ color: 'rgba(255,255,255,0.85)', cursor: 'pointer' }} onClick={function () { handleNavigate('service-list'); }}>低空服务</a>
            <a style={{ color: 'rgba(255,255,255,0.85)', cursor: 'pointer' }} onClick={function () { handleNavigate('mall-list'); }}>低空商城</a>
            <a style={{ color: '#fff', fontWeight: 600, cursor: 'pointer' }}>飞行服务</a>
            <a style={{ color: 'rgba(255,255,255,0.85)', cursor: 'pointer' }} onClick={function () { handleNavigate('login'); }}>登录</a>
          </div>
        </div>
      </header>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px 24px 48px' }}>
        <Breadcrumb items={[
          { title: <a onClick={function () { handleNavigate('home'); }}><HomeOutlined /> 首页</a> },
          { title: '飞行服务' },
          { title: '本地动态' }
        ]} style={{ marginBottom: 24 }} />

        <Card style={{ borderRadius: 12, marginBottom: 24 }}>
          <Tabs
            defaultActiveKey="dynamic"
            items={[
              { key: 'dynamic', label: '本地动态' },
              { key: 'airspace', label: <span onClick={function () { handleNavigate('flight-airspace'); }}>空域地图</span> },
              { key: 'weather', label: <span onClick={function () { handleNavigate('flight-weather'); }}>气象信息</span> },
              { key: 'plan', label: <span onClick={function () { handleNavigate('flight-plan'); }}>提交飞行计划</span> }
            ]}
          />
        </Card>

        <Row gutter={[24, 24]} style={{ marginBottom: 24 }}>
          {STATS.map(function (stat) {
            return (
              <Col key={stat.label} xs={12} md={6}>
                <Card style={{ borderRadius: 12, textAlign: 'center' }}>
                  <div style={{ fontSize: 28, fontWeight: 700, color: stat.color }}>{stat.value}</div>
                  <div style={{ fontSize: 13, color: '#8c8c8c', marginTop: 4 }}>{stat.label}（{stat.unit}）</div>
                </Card>
              </Col>
            );
          })}
        </Row>

        <Card title="📋 动态时间线" style={{ borderRadius: 12 }}>
          <Timeline
            items={DYNAMICS.map(function (d) {
              var icon = d.status === 'urgent' ? <WarningOutlined style={{ color: '#ff4d4f' }} /> :
                         d.status === 'warning' ? <WarningOutlined style={{ color: '#faad14' }} /> :
                         d.status === 'success' ? <CheckCircleOutlined style={{ color: '#52c41a' }} /> :
                         <SyncOutlined style={{ color: '#1677ff' }} />;
              return {
                dot: icon,
                children: (
                  <div style={{ paddingBottom: 16 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                        <Tag color={d.type === '预警' ? 'red' : d.type === '通知' ? 'orange' : d.type === '审批' ? 'green' : 'blue'}>{d.type}</Tag>
                        <span style={{ fontSize: 15, fontWeight: 600, color: '#1f1f1f' }}>{d.title}</span>
                      </div>
                      <span style={{ fontSize: 12, color: '#8c8c8c', display: 'flex', alignItems: 'center', gap: 4 }}><ClockCircleOutlined /> {d.time}</span>
                    </div>
                    <p style={{ fontSize: 14, color: '#595959', lineHeight: 1.6, margin: 0 }}>{d.content}</p>
                  </div>
                )
              };
            })}
          />
        </Card>

        <div style={{ textAlign: 'center', marginTop: 32 }}>
          <Pagination defaultCurrent={1} total={30} />
        </div>
      </div>
    </div>
  );
};

export default Component;
