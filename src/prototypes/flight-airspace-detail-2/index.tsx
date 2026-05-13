/**
 * @name 南区空域临时关闭通知详情
 * @mode axure
 * /Users/xu/Desktop/元引信息/Axhub-Make-main/skills/axure-export-workflow/SKILL.md
 *
 */

import './style.css';

import React, { useState, useCallback } from 'react';
import { Card, Tag, Breadcrumb, Divider, Row, Col, Descriptions, Badge, Alert } from 'antd';
import { HomeOutlined, RocketOutlined, ArrowLeftOutlined, WarningOutlined, CalendarOutlined, UserOutlined, ClockCircleOutlined, EnvironmentOutlined } from '@ant-design/icons';

var NOTICE_DETAIL = {
  id: 2,
  title: '南区空域临时关闭通知',
  type: '空域关闭',
  typeColor: '#f5222d',
  status: '即将生效',
  statusColor: 'orange',
  publishTime: '2026-04-25 16:00',
  effectiveTime: '2026-04-27 全天',
  publisher: '空域管理办公室',
  desc: '南区试飞区4月27日全天临时关闭，用于设备检修维护',
  content: [
    '各相关单位：',
    '因南区试飞区设备检修维护需要，为确保低空飞行安全，经空域管理办公室研究决定，对南区试飞区实施临时关闭。现将有关事项通知如下：',
    '一、关闭时间',
    '2026年4月27日00:00至24:00，全天关闭。',
    '二、关闭范围',
    '南区试飞区全部空域（0-300m），包括试飞起降坪及配套设施区域。',
    '三、关闭原因',
    '南区试飞区指挥塔台通信系统升级改造，需对空域内全部导航、监视、通信设备进行停机检修，检修期间无法提供飞行保障服务。',
    '四、飞行要求',
    '1. 关闭期间，南区试飞区全域禁止一切飞行活动，包括但不限于试飞、训练、巡检等；',
    '2. 原计划在南区试飞区执行的飞行任务，请提前调整至其他可用空域或延期执行；',
    '3. 如有紧急飞行需求，请联系空域管理办公室另行协调；',
    '4. 关闭期间，试飞区起降坪暂停使用，已预约的起降时段自动取消。',
    '五、恢复安排',
    '设备检修预计4月27日24:00前完成，4月28日06:00起恢复正常运行。如检修延期，将另行通知。',
    '请各相关单位提前做好飞行计划调整，确保飞行安全。'
  ],
  affectedZones: ['南区试飞区'],
  contactPhone: '0571-88888010'
};

var Component = function FlightAirspaceDetail2Page() {
  var [fontSize, setFontSize] = useState<string>('中');
  var fontSizeMap: Record<string, number> = { '小': 14, '中': 16, '大': 18 };
  var handleNavigate = useCallback(function (key: string) {
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
          { title: <a onClick={function () { handleNavigate('flight-airspace'); }}>空域查询</a> },
          { title: NOTICE_DETAIL.title }
        ]} style={{ marginBottom: 24 }} />

        <Row gutter={24}>
          <Col xs={24} lg={16}>
            <Card style={{ borderRadius: 12, marginBottom: 24 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                <a onClick={function () { handleNavigate('flight-airspace'); }} style={{ color: '#1677ff', cursor: 'pointer', fontSize: 13 }}>
                  <ArrowLeftOutlined /> 返回空域查询
                </a>
              </div>

              <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
                <Tag color={NOTICE_DETAIL.typeColor}>{NOTICE_DETAIL.type}</Tag>
                <Tag color={NOTICE_DETAIL.statusColor}>{NOTICE_DETAIL.status}</Tag>
              </div>

              <h1 style={{ fontSize: 24, fontWeight: 700, color: '#1f1f1f', lineHeight: 1.4, marginBottom: 12 }}>
                {NOTICE_DETAIL.title}
              </h1>

              <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', color: '#8c8c8c', fontSize: 13, marginBottom: 16 }}>
                <span><CalendarOutlined /> 发布时间：{NOTICE_DETAIL.publishTime}</span>
                <span><ClockCircleOutlined /> 生效时间：{NOTICE_DETAIL.effectiveTime}</span>
                <span><UserOutlined /> 发布单位：{NOTICE_DETAIL.publisher}</span>
              </div>

              <Divider style={{ margin: '0 0 24px' }} />

              <div style={{ lineHeight: 2, fontSize: fontSizeMap[fontSize], color: '#333', transition: 'font-size 0.2s' }}>
                {NOTICE_DETAIL.content.map(function (para, idx) {
                  var isHeading = para.startsWith('一、') || para.startsWith('二、') || para.startsWith('三、') || para.startsWith('四、') || para.startsWith('五、');
                  return (
                    <p key={idx} style={{ marginBottom: 12, textIndent: isHeading ? 0 : '2em', fontWeight: isHeading ? 600 : 400, fontSize: isHeading ? '1.05em' : undefined }}>
                      {para}
                    </p>
                  );
                })}
              </div>

              <Divider style={{ margin: '32px 0 24px' }} />

              <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                <span style={{ color: '#8c8c8c', fontSize: 13 }}>上一篇：<a style={{ color: '#1677ff' }} onClick={function () { handleNavigate('flight-airspace-detail'); }}>城东片区低空航线临时调整</a></span>
              </div>
              <div style={{ marginTop: 8 }}>
                <span style={{ color: '#8c8c8c', fontSize: 13 }}>下一篇：<a style={{ color: '#1677ff' }} onClick={function () { handleNavigate('flight-airspace-detail-3'); }}>五一假期空域管制通知</a></span>
              </div>
            </Card>
          </Col>

          <Col xs={24} lg={8}>
            <Card title={<span><WarningOutlined style={{ color: '#fa8c16', marginRight: 8 }} />通知概要</span>} style={{ borderRadius: 12, marginBottom: 24 }}>
              <Descriptions column={1} bordered size="small">
                <Descriptions.Item label="通知类型"><Tag color={NOTICE_DETAIL.typeColor}>{NOTICE_DETAIL.type}</Tag></Descriptions.Item>
                <Descriptions.Item label="当前状态"><Badge color={NOTICE_DETAIL.statusColor} text={NOTICE_DETAIL.status} /></Descriptions.Item>
                <Descriptions.Item label="生效时间">{NOTICE_DETAIL.effectiveTime}</Descriptions.Item>
                <Descriptions.Item label="发布单位">{NOTICE_DETAIL.publisher}</Descriptions.Item>
                <Descriptions.Item label="联系电话">{NOTICE_DETAIL.contactPhone}</Descriptions.Item>
              </Descriptions>
            </Card>

            {NOTICE_DETAIL.status === '即将生效' && (
              <Alert
                message="该管制通知即将生效"
                description="请提前调整飞行计划，避免在生效时段内进入受影响空域。如有疑问请联系空域管理办公室。"
                type="warning"
                showIcon
                style={{ borderRadius: 8 }}
              />
            )}
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Component;
