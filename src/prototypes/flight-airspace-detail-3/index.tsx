/**
 * @name 五一假期空域管制通知详情
 * @mode axure
 * /Users/xu/Desktop/元引信息/Axhub-Make-main/skills/axure-export-workflow/SKILL.md
 *
 */

import './style.css';

import React, { useState, useCallback } from 'react';
import { Card, Tag, Breadcrumb, Divider, Row, Col, Descriptions, Badge, Alert } from 'antd';
import { HomeOutlined, RocketOutlined, ArrowLeftOutlined, WarningOutlined, CalendarOutlined, UserOutlined, ClockCircleOutlined, EnvironmentOutlined } from '@ant-design/icons';

var NOTICE_DETAIL = {
  id: 3,
  title: '五一假期空域管制通知',
  type: '临时管制',
  typeColor: '#fa8c16',
  status: '预告',
  statusColor: 'blue',
  publishTime: '2026-04-24 09:00',
  effectiveTime: '2026-05-01 ~ 2026-05-05',
  publisher: '空域管理办公室',
  desc: '5月1日-5日，中心区域新增临时限飞区，半径扩大2km，详情另行通知',
  content: [
    '各相关单位：',
    '因五一假期期间大型群众性活动需要，为确保低空飞行安全及公共安全，经空域管理办公室研究决定，对中心区域实施临时空域管制。现将有关事项预告如下：',
    '一、管制时间',
    '2026年5月1日00:00至5月5日24:00，共计5天。',
    '二、管制范围',
    '中心区域新增临时限飞区，以市民广场为中心，半径由原1km扩大至3km，高度范围0-500m。具体范围包括：',
    '1. 核心管制区：市民广场周边1km范围内，全天禁止一切飞行活动；',
    '2. 扩展管制区：市民广场周边1-3km范围内，每日06:00-22:00禁止未经审批的飞行活动；',
    '3. 原有禁飞区范围不变，与新增临时限飞区叠加执行。',
    '三、管制原因',
    '五一假期期间，市民广场及周边区域将举办大型文化庆典活动，预计日均人流量超过10万人次。为确保活动现场空域安全，防止无人机等低空飞行器对群众造成安全威胁，实施临时空域管制。',
    '四、飞行要求',
    '1. 核心管制区内，全天禁止一切飞行活动，包括无人机航拍、物流配送等；',
    '2. 扩展管制区内，如因特殊需要执行飞行任务，须提前48小时向空域管理办公室提交申请，经审批后方可执行；',
    '3. 管制期间，城东物流走廊、滨江观光航线等周边航线可能受到影响，请关注后续通知；',
    '4. 各无人机运营单位应提前通知客户，调整配送方案；',
    '5. 如遇紧急情况（如医疗救援、消防灭火等），请立即联系空域管理办公室协调。',
    '五、其他事项',
    '1. 管制期间，空域管理办公室将24小时值班，联系电话：0571-88888010；',
    '2. 管制解除时间可能根据活动情况调整，请关注后续通知；',
    '3. 违反管制规定的飞行活动，将依法依规处理。',
    '请各相关单位提前做好飞行计划调整，确保飞行安全。'
  ],
  affectedZones: ['中心禁飞区', '城东物流走廊', '滨江观光航线'],
  contactPhone: '0571-88888010'
};

var Component = function FlightAirspaceDetail3Page() {
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
                <span style={{ color: '#8c8c8c', fontSize: 13 }}>上一篇：<a style={{ color: '#1677ff' }} onClick={function () { handleNavigate('flight-airspace-detail-2'); }}>南区空域临时关闭通知</a></span>
              </div>
              <div style={{ marginTop: 8 }}>
                <span style={{ color: '#8c8c8c', fontSize: 13 }}>下一篇：暂无</span>
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

            {NOTICE_DETAIL.status === '预告' && (
              <Alert
                message="该管制通知为预告信息"
                description="管制尚未生效，请提前做好飞行计划调整准备。正式生效前可能有所调整，请关注后续通知。"
                type="info"
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
