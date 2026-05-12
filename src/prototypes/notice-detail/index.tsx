/**
 * @name 通知公告详情
 * @mode axure
 * /Users/xu/Desktop/元引信息/Axhub-Make-main/skills/axure-export-workflow/SKILL.md
 *
 */

import './style.css';

import React, { useState, useCallback } from 'react';
import { Card, Tag, Breadcrumb, Divider, Row, Col, Segmented } from 'antd';
import { HomeOutlined, CalendarOutlined, ReadOutlined, ArrowLeftOutlined, BellOutlined, NotificationOutlined, ClockCircleOutlined, FontSizeOutlined } from '@ant-design/icons';

var NOTICE_DETAIL = {
  id: 2,
  title: '【气象预警】明日午后有雷暴天气，请合理安排飞行计划',
  type: 'weather',
  typeLabel: '气象预警',
  typeColor: '#fa8c16',
  publishDate: '2026-04-21',
  effectiveDate: '2026-04-22 14:00 ~ 20:00',
  publisher: '低空空管服务中心',
  isTop: true,
  content: [
    '据市气象台2026年4月21日16时发布的强对流天气预报，预计明日（4月22日）午后至傍晚时段，我市自西向东将出现一次强对流天气过程，主要影响时段为14:00至20:00。',
    '一、天气预警信息',
    '预警类型：雷暴橙色预警',
    '影响区域：全市低空空域（重点影响南区、东区训练空域及城市物流航线）',
    '预计风力：阵风7-8级，局部可达9级',
    '预计降水：中到大雨，局部暴雨，伴有强雷电',
    '能见度：最低降至500米以下',
    '二、管控措施',
    '1. 管控时段：2026年4月22日14:00至20:00',
    '2. 管控范围：全市所有低空空域',
    '3. 管控要求：',
    '（1）管控时段内，暂停一切非紧急飞行活动审批；',
    '（2）已获批复的飞行计划，建议延期执行或取消；',
    '（3）紧急飞行任务（如应急救援、医疗转运等）需提前向空管中心报备，经特批后方可执行；',
    '（4）各飞行服务站做好飞行器安全停放和防护工作。',
    '三、恢复通知',
    '空管中心将根据天气实况和预报，在天气条件满足飞行安全要求后，通过平台发布恢复飞行通知。请各飞行主体密切关注平台公告信息。',
    '四、联系方式',
    '空管服务热线：400-888-LATC',
    '值班电话：010-8888-5678',
    '紧急联系人：李工 138****1234',
    '请各相关单位和飞行人员高度重视，提前做好应对准备，确保飞行安全。'
  ]
};

var RELATED_NOTICES = [
  { id: 1, title: '关于开展2026年第二季度飞行计划集中审批的通知', typeLabel: '系统公告', typeColor: '#1677ff', date: '2026-04-21' },
  { id: 3, title: '南区训练空域临时管制通告（4月23日-25日）', typeLabel: '空域通知', typeColor: '#f5222d', date: '2026-04-20' },
  { id: 4, title: '平台系统升级维护公告（4月26日凌晨）', typeLabel: '维护通知', typeColor: '#8c8c8c', date: '2026-04-19' }
];

const Component = function NoticeDetailPage() {
  var [fontSize, setFontSize] = useState<string>('中');
  var fontSizeMap: Record<string, number> = { '小': 14, '中': 16, '大': 18 };
  var handleNavigate = useCallback(function (key: string) {
    window.location.href = '/prototypes/' + key;
  }, []);

  return (
    <div style={{ minHeight: '100vh', background: '#f5f5f5' }}>
      <header style={{ background: 'linear-gradient(135deg, #0c4a6e 0%, #1677ff 100%)', padding: '0 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }} onClick={function () { handleNavigate('home'); }}>
            <ReadOutlined style={{ fontSize: 20, color: '#fff' }} />
            <span style={{ fontSize: 16, fontWeight: 600, color: '#fff' }}>区域低空公共服务平台</span>
          </div>
          <div style={{ display: 'flex', gap: 16 }}>
            <a style={{ color: 'rgba(255,255,255,0.85)', cursor: 'pointer' }} onClick={function () { handleNavigate('home'); }}>首页</a>
            <a style={{ color: '#fff', fontWeight: 600, cursor: 'pointer' }} onClick={function () { handleNavigate('news'); }}>资讯公告</a>
            <a style={{ color: 'rgba(255,255,255,0.85)', cursor: 'pointer' }} onClick={function () { handleNavigate('policy-national'); }}>政策法规</a>
            <a style={{ color: 'rgba(255,255,255,0.85)', cursor: 'pointer' }} onClick={function () { handleNavigate('service-list'); }}>低空服务</a>
            <a style={{ color: 'rgba(255,255,255,0.85)', cursor: 'pointer' }} onClick={function () { handleNavigate('mall-list'); }}>低空商城</a>
            <a style={{ color: 'rgba(255,255,255,0.85)', cursor: 'pointer' }} onClick={function () { handleNavigate('flight-dynamic'); }}>飞行服务</a>
            <a style={{ color: 'rgba(255,255,255,0.85)', cursor: 'pointer' }} onClick={function () { handleNavigate('login'); }}>登录</a>
          </div>
        </div>
      </header>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px 24px 48px' }}>
        <Breadcrumb items={[
          { title: <a onClick={function () { handleNavigate('news'); }}>资讯公告</a> },
          { title: <a onClick={function () { window.location.href = '/prototypes/news?tab=notice'; }}>通知公告</a> },
          { title: NOTICE_DETAIL.title }
        ]} style={{ marginBottom: 24 }} />

        <Row gutter={24}>
          <Col xs={24}>
            <Card style={{ borderRadius: 12, marginBottom: 24 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                <a onClick={function () { handleNavigate('news'); }} style={{ color: '#1677ff', cursor: 'pointer', fontSize: 13 }}>
                  <ArrowLeftOutlined /> 返回
                </a>
              </div>

              {NOTICE_DETAIL.isTop && (
                <Tag color="red" style={{ marginBottom: 12 }}>置顶公告</Tag>
              )}

              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                <div style={{
                  width: 48, height: 48, borderRadius: '50%',
                  background: NOTICE_DETAIL.typeColor + '15',
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  <NotificationOutlined style={{ fontSize: 22, color: NOTICE_DETAIL.typeColor }} />
                </div>
                <div>
                  <Tag color={NOTICE_DETAIL.typeColor} style={{ fontSize: 12, marginBottom: 4 }}>{NOTICE_DETAIL.typeLabel}</Tag>
                  <h1 style={{ fontSize: 22, fontWeight: 700, color: '#1f1f1f', lineHeight: 1.4, margin: 0 }}>
                    {NOTICE_DETAIL.title}
                  </h1>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', color: '#8c8c8c', fontSize: 13, marginBottom: 8, justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
                  <span><BellOutlined /> 发布单位：{NOTICE_DETAIL.publisher}</span>
                  <span><CalendarOutlined /> 发布时间：{NOTICE_DETAIL.publishDate}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
                  <FontSizeOutlined style={{ color: '#8c8c8c' }} />
                  <Segmented size="small" options={['小', '中', '大']} value={fontSize} onChange={function (val) { setFontSize(val as string); }} />
                </div>
              </div>

              <Divider style={{ margin: '16px 0 24px' }} />

              <div style={{ lineHeight: 2, fontSize: fontSizeMap[fontSize], color: '#333', transition: 'font-size 0.2s' }}>
                {NOTICE_DETAIL.content.map(function (para, idx) {
                  var isHeading = para.startsWith('一、') || para.startsWith('二、') || para.startsWith('三、') || para.startsWith('四、');
                  return (
                    <p key={idx} style={{
                      marginBottom: 12,
                      textIndent: isHeading ? 0 : '2em',
                      fontWeight: isHeading ? 600 : 400,
                      fontSize: isHeading ? 16 : 15
                    }}>
                      {para}
                    </p>
                  );
                })}
              </div>

              <Divider style={{ margin: '32px 0 24px' }} />

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: '#8c8c8c', fontSize: 13 }}>上一篇：<a style={{ color: '#1677ff' }}>关于开展2026年第二季度飞行计划集中审批的通知</a></span>
              </div>
              <div style={{ marginTop: 8 }}>
                <span style={{ color: '#8c8c8c', fontSize: 13 }}>下一篇：<a style={{ color: '#1677ff' }}>南区训练空域临时管制通告（4月23日-25日）</a></span>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Component;
