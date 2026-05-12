/**
 * @name 新闻资讯详情
 * @mode axure
 * /Users/xu/Desktop/元引信息/Axhub-Make-main/skills/axure-export-workflow/SKILL.md
 *
 */

import './style.css';

import React, { useState, useCallback } from 'react';
import { Card, Tag, Breadcrumb, Divider, Avatar, Row, Col, Segmented } from 'antd';
import { HomeOutlined, CalendarOutlined, EyeOutlined, ReadOutlined, ArrowLeftOutlined, UserOutlined, TagOutlined, FontSizeOutlined } from '@ant-design/icons';

var NEWS_DETAIL = {
  id: 1,
  title: '低空经济示范区建设方案正式发布',
  category: '行业新闻',
  date: '2026-04-20',
  effectDate: '2026-05-01',
  views: 1280,
  author: '平台编辑部',
  source: '国家发展和改革委员会',
  content: [
    '为加快推进低空经济高质量发展，经国务院同意，现印发《低空经济示范区建设方案》（以下简称《方案》）。《方案》明确了未来三年低空经济示范区建设的总体目标、重点任务和保障措施。',
    '一、总体目标',
    '到2028年，在全国范围内建设20个低空经济示范区，形成可复制、可推广的发展模式和制度创新成果。示范区内低空飞行器保有量达到10万架以上，低空经济产业规模突破5000亿元。',
    '二、重点任务',
    '（一）基础设施体系建设。建设低空飞行起降场、充换电站、维修保障基地等地面基础设施，完善低空通信、导航、监视等空中基础设施。推进城市低空飞行网络规划与建设。',
    '（二）空域管理与保障。深化低空空域管理改革，建立高效灵活的空域使用机制。推进低空空域分类划设，优化空域资源配置。建设低空飞行服务保障体系。',
    '（三）产业生态培育。支持低空制造、低空飞行、低空保障等全产业链发展。鼓励eVTOL、工业级无人机等新型航空器研发制造。培育低空物流、低空旅游、低空巡检等新业态。',
    '（四）安全监管体系。建立完善低空飞行安全监管制度。推进低空飞行器适航认证体系建设。加强低空飞行安全风险防控和应急处置能力。',
    '三、保障措施',
    '各示范区所在地方政府要建立工作推进机制，制定实施方案和配套政策。国家发展改革委、交通运输部、民航局等部门要加强统筹协调，形成工作合力。加大财政、金融、人才等政策支持力度。',
    '《方案》要求各示范区于2026年6月底前完成实施方案编制，9月底前正式启动建设。'
  ]
};

var RELATED_NEWS = [
  { id: 2, title: '全国首条城市低空物流航线开通运营', date: '2026-04-19', category: '行业新闻' },
  { id: 4, title: '新型eVTOL完成适航审定首飞', date: '2026-04-17', category: '技术前沿' },
  { id: 6, title: '多城市低空交通规划获批', date: '2026-04-15', category: '行业新闻' }
];

const Component = function NewsDetailPage() {
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
          { title: <a onClick={function () { handleNavigate('news'); }}>新闻资讯</a> },
          { title: NEWS_DETAIL.title }
        ]} style={{ marginBottom: 24 }} />

        <Row gutter={24}>
          <Col xs={24}>
            <Card style={{ borderRadius: 12, marginBottom: 24 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                <a onClick={function () { handleNavigate('news'); }} style={{ color: '#1677ff', cursor: 'pointer', fontSize: 13 }}>
                  <ArrowLeftOutlined /> 返回
                </a>
              </div>

              <Tag color="blue" style={{ marginBottom: 16 }}>{NEWS_DETAIL.category}</Tag>

              <h1 style={{ fontSize: 24, fontWeight: 700, color: '#1f1f1f', lineHeight: 1.4, marginBottom: 12 }}>
                {NEWS_DETAIL.title}
              </h1>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', color: '#8c8c8c', fontSize: 13 }}>
                  <span><CalendarOutlined /> 实施日期：{NEWS_DETAIL.effectDate}</span>
                  <span><UserOutlined /> 作者：{NEWS_DETAIL.author}</span>
                  <span><TagOutlined /> 来源：{NEWS_DETAIL.source}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
                  <FontSizeOutlined style={{ color: '#8c8c8c' }} />
                  <Segmented size="small" options={['小', '中', '大']} value={fontSize} onChange={function (val) { setFontSize(val as string); }} />
                </div>
              </div>

              <Divider style={{ margin: '0 0 24px' }} />

              <div style={{ lineHeight: 2, fontSize: fontSizeMap[fontSize], color: '#333', transition: 'font-size 0.2s' }}>
                {NEWS_DETAIL.content.map(function (para, idx) {
                  return (
                    <p key={idx} style={{ marginBottom: idx === 0 ? 20 : 12, textIndent: idx > 0 ? '2em' : 0 }}>
                      {para}
                    </p>
                  );
                })}
              </div>

              <Divider style={{ margin: '32px 0 24px' }} />

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: '#8c8c8c', fontSize: 13 }}>上一篇：<a style={{ color: '#1677ff' }}>全国首条城市低空物流航线开通运营</a></span>
              </div>
              <div style={{ marginTop: 8 }}>
                <span style={{ color: '#8c8c8c', fontSize: 13 }}>下一篇：<a style={{ color: '#1677ff' }}>无人机驾驶员培训标准体系升级</a></span>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Component;
