/**
 * @name 临时管制通知详情
 * @mode axure
 * /Users/xu/Desktop/元引信息/Axhub-Make-main/skills/axure-export-workflow/SKILL.md
 *
 */

import './style.css';

import React, { useState, useCallback } from 'react';
import { Card, Tag, Breadcrumb, Divider, Row, Col, Descriptions, Badge, Alert } from 'antd';
import { HomeOutlined, RocketOutlined, ArrowLeftOutlined, WarningOutlined, CalendarOutlined, UserOutlined, ClockCircleOutlined, EnvironmentOutlined } from '@ant-design/icons';

var NOTICE_DETAIL = {
  id: 1,
  title: '城东片区低空航线临时调整',
  type: '航线调整',
  typeColor: '#1677ff',
  status: '生效中',
  statusColor: 'red',
  publishTime: '2026-04-26 10:00',
  effectiveTime: '2026-04-26 06:00 ~ 18:00',
  publisher: '空域管理办公室',
  desc: '因城东施工需要，4月26日6:00-18:00临时调整低空航线，城东物流走廊降高至80-120m运行',
  content: [
    '各相关单位：',
    '因城东片区市政工程施工需要，为确保低空飞行安全，经空域管理办公室研究决定，对城东片区低空航线进行临时调整。现将有关事项通知如下：',
    '一、调整时间',
    '2026年4月26日06:00至18:00，共计12小时。',
    '二、调整范围',
    '城东物流走廊（城东物流园至配送中心航线段），高度范围由原50-150m调整为80-120m运行。',
    '三、调整原因',
    '城东片区科技路沿线市政管道施工，施工现场临时搭建大型起重设备，设备最高点约70m，对原航线低空段构成安全威胁。',
    '四、飞行要求',
    '1. 在调整时段内，所有通过城东物流走廊的飞行器，飞行高度不得低于80m，不得高于120m；',
    '2. 飞行器通过施工区域时，应保持与起重设备水平距离不少于200m；',
    '3. 建议飞行器运营方提前调整飞行计划，预留充足时间；',
    '4. 如遇紧急情况，请立即联系空域管理办公室（0571-88888010）。',
    '五、其他事项',
    '施工预计4月26日18:00前完成，届时航线恢复正常运行。如施工延期，将另行通知。',
    '请各相关单位严格遵守以上规定，确保飞行安全。'
  ],
  affectedZones: ['城东物流走廊'],
  contactPhone: '0571-88888010'
};

var Component = function FlightAirspaceDetailPage() {
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
            <a style={{ color: 'rgba(255,255,255,0.85)', cursor: 'pointer' }} onClick={function () { handleNavigate('service-show'); }}>低空服务</a>
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
                <span style={{ color: '#8c8c8c', fontSize: 13 }}>上一篇：暂无</span>
              </div>
              <div style={{ marginTop: 8 }}>
                <span style={{ color: '#8c8c8c', fontSize: 13 }}>下一篇：<a style={{ color: '#1677ff' }} onClick={function () { handleNavigate('flight-airspace-detail-2'); }}>南区空域临时关闭通知</a></span>
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

            {NOTICE_DETAIL.status === '生效中' && (
              <Alert
                message="该管制通知当前正在生效中"
                description="请在飞行前确认航线是否受影响，如有疑问请联系空域管理办公室。"
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
