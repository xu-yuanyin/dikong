/**
 * @name 国家政策详情
 * @mode axure
 * /Users/xu/Desktop/元引信息/Axhub-Make-main/skills/axure-export-workflow/SKILL.md
 *
 */

import './style.css';

import React, { useState, useCallback } from 'react';
import { Card, Tag, Breadcrumb, Divider, Row, Col, Segmented } from 'antd';
import { HomeOutlined, CalendarOutlined, ArrowLeftOutlined, UserOutlined, FileTextOutlined, FontSizeOutlined, DownloadOutlined } from '@ant-design/icons';

var POLICY_DETAIL = {
  id: 1,
  title: '关于促进低空经济发展的若干意见',
  category: '指导意见',
  status: '现行有效',
  date: '2026-04-15',
  effectDate: '2026-05-01',
  dept: '国务院',
  documentNo: '国发〔2026〕12号',
  content: [
    '各省、自治区、直辖市人民政府，国务院各部委、各直属机构：',
    '为促进低空经济高质量发展，加快构建低空飞行服务保障体系，推动新型航空器研发制造和低空飞行应用，经国务院同意，现提出以下意见。',
    '一、总体要求',
    '（一）指导思想。以习近平新时代中国特色社会主义思想为指导，全面贯彻党的二十大精神，立足新发展阶段，贯彻新发展理念，构建新发展格局，以推动高质量发展为主题，以深化供给侧结构性改革为主线，以满足人民日益增长的美好生活需要为根本目的，统筹发展和安全，充分发挥市场在资源配置中的决定性作用，更好发挥政府作用，加快推动低空经济高质量发展。',
    '（二）发展目标。到2028年，低空经济综合实力显著提升，产业规模突破5000亿元，培育10家以上具有国际竞争力的低空经济龙头企业。低空飞行服务保障体系基本建成，城市间低空飞行网络初步形成。到2030年，低空经济成为新的重要增长引擎，低空飞行服务覆盖全国主要城市和重点区域。',
    '二、加快基础设施建设',
    '（三）完善地面基础设施。统筹规划建设低空飞行起降场、充换电站、维修保障基地等地面基础设施，鼓励社会资本参与建设和运营。在城市重点区域、交通枢纽、产业园区等布局建设多功能低空飞行起降设施。',
    '（四）建设空中基础设施。推进低空通信、导航、监视等空中基础设施建设，构建覆盖全国低空空域的数字化飞行服务保障网络。加快5G-A、北斗、低轨卫星等新技术在低空领域的应用。',
    '三、深化空域管理改革',
    '（五）优化空域分类管理。深化低空空域管理改革，建立高效灵活的空域使用机制。推进低空空域分类划设，优化空域资源配置，提高空域使用效率。建立空域动态管理机制，实现空域资源的精细化配置。',
    '（六）简化飞行审批流程。推进低空飞行审批制度改革，实施分类分级管理。对符合条件的低空飞行活动实行备案管理，简化审批程序，提高审批效率。建设全国统一的低空飞行服务平台。',
    '四、培育壮大产业生态',
    '（七）支持低空制造产业发展。鼓励eVTOL、工业级无人机等新型航空器研发制造，支持关键核心技术攻关。培育壮大低空经济产业链，推动形成涵盖研发、制造、运营、服务的完整产业体系。',
    '（八）拓展低空应用场景。积极发展低空物流、低空旅游、低空巡检、应急救援等新业态。在城市群、重点区域开展低空物流配送试点。推动低空飞行在农业生产、环境保护、公共服务等领域的广泛应用。'
  ]
};

var Component = function PolicyNationalDetailPage() {
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
          { title: <a onClick={function () { handleNavigate('policy-national'); }}>国家政策</a> },
          { title: POLICY_DETAIL.title }
        ]} style={{ marginBottom: 24 }} />

        <Row gutter={24}>
          <Col xs={24}>
            <Card style={{ borderRadius: 12, marginBottom: 24 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                <a onClick={function () { handleNavigate('policy-national'); }} style={{ color: '#1677ff', cursor: 'pointer', fontSize: 13 }}>
                  <ArrowLeftOutlined /> 返回
                </a>
                <a style={{ color: '#1677ff', fontSize: 13, display: 'flex', alignItems: 'center', gap: 4, cursor: 'pointer' }}><DownloadOutlined /> 下载原文</a>
              </div>

              <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
                <Tag color="orange">{POLICY_DETAIL.category}</Tag>
                <Tag color="green">{POLICY_DETAIL.status}</Tag>
              </div>

              <h1 style={{ fontSize: 24, fontWeight: 700, color: '#1f1f1f', lineHeight: 1.4, marginBottom: 12 }}>
                {POLICY_DETAIL.title}
              </h1>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', color: '#8c8c8c', fontSize: 13 }}>
                  <span><UserOutlined /> 发布单位：{POLICY_DETAIL.dept}</span>
                  <span><FileTextOutlined /> 文号：{POLICY_DETAIL.documentNo}</span>
                  <span><CalendarOutlined /> 实施日期：{POLICY_DETAIL.effectDate}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
                  <FontSizeOutlined style={{ color: '#8c8c8c' }} />
                  <Segmented size="small" options={['小', '中', '大']} value={fontSize} onChange={function (val) { setFontSize(val as string); }} />
                </div>
              </div>

              <Divider style={{ margin: '0 0 24px' }} />

              <div style={{ lineHeight: 2, fontSize: fontSizeMap[fontSize], color: '#333', transition: 'font-size 0.2s' }}>
                {POLICY_DETAIL.content.map(function (para, idx) {
                  var isHeading = para.startsWith('一、') || para.startsWith('二、') || para.startsWith('三、') || para.startsWith('四、');
                  return (
                    <p key={idx} style={{ marginBottom: 12, textIndent: isHeading ? 0 : '2em', fontWeight: isHeading ? 600 : 400, fontSize: isHeading ? '1.05em' : undefined }}>
                      {para}
                    </p>
                  );
                })}
              </div>

              <Divider style={{ margin: '32px 0 24px' }} />

              <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                <span style={{ color: '#8c8c8c', fontSize: 13 }}>上一篇：<a style={{ color: '#1677ff' }}>无人驾驶航空器飞行管理暂行条例</a></span>
              </div>
              <div style={{ marginTop: 8 }}>
                <span style={{ color: '#8c8c8c', fontSize: 13 }}>下一篇：<a style={{ color: '#1677ff' }}>低空空域分类管理办法</a></span>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Component;
