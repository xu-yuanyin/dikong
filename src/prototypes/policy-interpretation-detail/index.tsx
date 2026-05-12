/**
 * @name 政策解读详情
 * @mode axure
 * /Users/xu/Desktop/元引信息/Axhub-Make-main/skills/axure-export-workflow/SKILL.md
 *
 */

import './style.css';

import React, { useState, useCallback } from 'react';
import { Card, Tag, Breadcrumb, Divider, Row, Col, Segmented } from 'antd';
import { HomeOutlined, CalendarOutlined, ArrowLeftOutlined, FileTextOutlined, FontSizeOutlined, ReadOutlined, LinkOutlined } from '@ant-design/icons';

var DETAIL = {
  id: 1,
  title: '一图读懂：《关于促进低空经济发展的若干意见》',
  type: '图文解读',
  typeColor: '#1677ff',
  relatedPolicy: '关于促进低空经济发展的若干意见',
  date: '2026-04-18',
  effectDate: '2026-05-01',
  source: '国务院政策研究室',
  content: [
    '为帮助各级政府部门和市场主体准确把握《关于促进低空经济发展的若干意见》（国发〔2026〕12号）精神，现以图文形式进行系统解读。',
    '一、政策背景',
    '低空经济作为战略性新兴产业，涵盖低空制造、低空飞行、低空保障和综合服务等多个领域。随着技术进步和政策放开，低空经济迎来重要发展机遇期。2025年全球低空经济市场规模已超过5000亿美元，我国低空经济正处于加速发展阶段。',
    '二、核心要点解读',
    '要点一：发展目标明确。《意见》提出到2028年低空经济产业规模突破5000亿元，培育10家以上具有国际竞争力的龙头企业。到2030年，低空经济成为新的重要增长引擎。',
    '要点二：基础设施先行。统筹规划建设起降场、充换电站、维修保障基地等地面基础设施，构建低空通信、导航、监视等空中基础设施，形成天地一体的低空飞行服务保障网络。',
    '要点三：空域改革深化。推进低空空域分类管理，建立高效灵活的空域使用机制。简化飞行审批流程，对符合条件的飞行活动实行备案管理，建设全国统一的低空飞行服务平台。',
    '要点四：产业生态培育。支持eVTOL、工业级无人机等新型航空器研发制造，发展低空物流、低空旅游、低空巡检等新业态，推动低空飞行在农业、环保、应急等领域的应用。',
    '要点五：安全保障体系。建立完善低空飞行安全监管制度，推进适航认证体系建设，加强风险防控和应急处置能力，确保低空飞行安全有序。',
    '三、对行业的影响',
    '《意见》的出台将显著降低低空飞行准入门槛，激发市场活力。预计未来三年，低空物流配送将覆盖全国主要城市，城市空中交通（UAM）将在部分城市开展试点运营，低空巡检、低空旅游等应用场景将加速落地。'
  ]
};

var Component = function PolicyInterpretationDetailPage() {
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
            <FileTextOutlined style={{ fontSize: 20, color: '#fff' }} />
            <span style={{ fontSize: 16, fontWeight: 600, color: '#fff' }}>区域低空公共服务平台</span>
          </div>
          <div style={{ display: 'flex', gap: 16 }}>
            <a style={{ color: 'rgba(255,255,255,0.85)', cursor: 'pointer' }} onClick={function () { handleNavigate('home'); }}>首页</a>
            <a style={{ color: 'rgba(255,255,255,0.85)', cursor: 'pointer' }} onClick={function () { handleNavigate('news'); }}>资讯公告</a>
            <a style={{ color: '#fff', fontWeight: 600, cursor: 'pointer' }}>政策法规</a>
            <a style={{ color: 'rgba(255,255,255,0.85)', cursor: 'pointer' }} onClick={function () { handleNavigate('service-list'); }}>低空服务</a>
            <a style={{ color: 'rgba(255,255,255,0.85)', cursor: 'pointer' }} onClick={function () { handleNavigate('mall-list'); }}>低空商城</a>
            <a style={{ color: 'rgba(255,255,255,0.85)', cursor: 'pointer' }} onClick={function () { handleNavigate('flight-dynamic'); }}>飞行服务</a>
            <a style={{ color: 'rgba(255,255,255,0.85)', cursor: 'pointer' }} onClick={function () { handleNavigate('login'); }}>登录</a>
          </div>
        </div>
      </header>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px 24px 48px' }}>
        <Breadcrumb items={[
          { title: <a onClick={function () { handleNavigate('home'); }}><HomeOutlined /> 首页</a> },
          { title: <a onClick={function () { handleNavigate('policy-national'); }}>政策法规</a> },
          { title: <a onClick={function () { handleNavigate('policy-interpretation'); }}>政策解读</a> },
          { title: DETAIL.title }
        ]} style={{ marginBottom: 24 }} />

        <Row gutter={24}>
          <Col xs={24}>
            <Card style={{ borderRadius: 12, marginBottom: 24 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                <a onClick={function () { handleNavigate('policy-interpretation'); }} style={{ color: '#1677ff', cursor: 'pointer', fontSize: 13 }}>
                  <ArrowLeftOutlined /> 返回
                </a>
              </div>

              <div style={{ display: 'flex', gap: 8, marginBottom: 12, alignItems: 'center' }}>
                <Tag color={DETAIL.typeColor}>{DETAIL.type}</Tag>
              </div>

              <h1 style={{ fontSize: 24, fontWeight: 700, color: '#1f1f1f', lineHeight: 1.4, marginBottom: 12 }}>
                {DETAIL.title}
              </h1>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', color: '#8c8c8c', fontSize: 13 }}>
                  <span>来源：{DETAIL.source}</span>
                  <span><LinkOutlined /> 关联政策：<a style={{ color: '#1677ff' }}>{DETAIL.relatedPolicy}</a></span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
                  <FontSizeOutlined style={{ color: '#8c8c8c' }} />
                  <Segmented size="small" options={['小', '中', '大']} value={fontSize} onChange={function (val) { setFontSize(val as string); }} />
                </div>
              </div>

              <Divider style={{ margin: '0 0 24px' }} />

              <div style={{ lineHeight: 2, fontSize: fontSizeMap[fontSize], color: '#333', transition: 'font-size 0.2s' }}>
                {DETAIL.content.map(function (para, idx) {
                  var isHeading = para.startsWith('一、') || para.startsWith('二、') || para.startsWith('三、');
                  var isPoint = para.startsWith('要点');
                  return (
                    <p key={idx} style={{ marginBottom: 12, textIndent: (isHeading || isPoint) ? 0 : '2em', fontWeight: (isHeading || isPoint) ? 600 : 400, fontSize: isHeading ? '1.05em' : undefined }}>
                      {para}
                    </p>
                  );
                })}
              </div>

              <Divider style={{ margin: '32px 0 24px' }} />

              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#8c8c8c', fontSize: 13 }}>上一篇：<a style={{ color: '#1677ff' }}>权威解读：无人驾驶航空器飞行管理暂行条例五大亮点</a></span>
              </div>
              <div style={{ marginTop: 8 }}>
                <span style={{ color: '#8c8c8c', fontSize: 13 }}>下一篇：<a style={{ color: '#1677ff' }}>专家解读：低空空域分类管理办法如何影响行业发展</a></span>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Component;
