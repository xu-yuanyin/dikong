/**
 * @name 本地政策详情
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
  title: 'XX市民用无人驾驶航空器管理办法',
  category: '管理办法',
  status: '现行有效',
  date: '2026-04-10',
  effectDate: '2026-06-01',
  dept: '市政府',
  documentNo: 'X政发〔2026〕8号',
  content: [
    '各区人民政府，市政府各委、办、局，各有关单位：',
    '为规范本市民用无人驾驶航空器飞行及相关活动，保障飞行安全和公共利益，促进低空经济健康发展，根据《无人驾驶航空器飞行管理暂行条例》等法律法规，结合本市实际，制定本办法。',
    '第一章 总则',
    '第一条 为规范本市民用无人驾驶航空器（以下简称无人机）飞行及相关活动，保障飞行安全和公共利益，促进低空经济健康发展，根据有关法律法规，结合本市实际，制定本办法。',
    '第二条 本办法适用于本市行政区域内民用无人机的生产、销售、使用及其管理活动。军用无人机的管理按照国家和军队有关规定执行。',
    '第三条 本市无人机管理遵循安全第一、规范管理、促进发展、协同共治的原则。',
    '第二章 备案登记',
    '第四条 在本市使用的民用无人机应当按照国家和本市有关规定进行实名登记。无人机所有人应当通过本市无人机管理服务平台完成实名登记。',
    '第五条 从事经营性飞行活动的无人机运营人，应当依法取得无人机运营合格证。未取得运营合格证的，不得从事经营性飞行活动。',
    '第三章 飞行管理',
    '第六条 在本市行政区域内飞行无人机，应当遵守国家和本市空域管理、飞行管理的有关规定。无人机飞行前应当通过本市低空飞行服务平台提交飞行计划。',
    '第七条 在人员密集区域、重要目标区域、机场净空保护区等区域飞行无人机的，应当提前向公安机关和空管部门报告，并按照批准的方案执行。',
    '第四章 安全监管',
    '第八条 无人机运营人应当建立健全安全管理制度，配备必要的安全管理人员和设备，定期开展安全检查和风险评估。',
    '第九条 市交通部门应当会同公安、应急管理等相关部门建立无人机飞行安全联合监管机制，加强对无人机飞行活动的监督检查。'
  ]
};

var Component = function PolicyLocalDetailPage() {
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
          { title: <a onClick={function () { handleNavigate('policy-local'); }}>本地政策</a> },
          { title: POLICY_DETAIL.title }
        ]} style={{ marginBottom: 24 }} />

        <Row gutter={24}>
          <Col xs={24}>
            <Card style={{ borderRadius: 12, marginBottom: 24 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                <a onClick={function () { handleNavigate('policy-local'); }} style={{ color: '#1677ff', cursor: 'pointer', fontSize: 13 }}>
                  <ArrowLeftOutlined /> 返回
                </a>
                <a style={{ color: '#1677ff', fontSize: 13, display: 'flex', alignItems: 'center', gap: 4, cursor: 'pointer' }}><DownloadOutlined /> 下载原文</a>
              </div>

              <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
                <Tag color="green">{POLICY_DETAIL.category}</Tag>
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
                  var isHeading = para.startsWith('第') && para.includes('章');
                  return (
                    <p key={idx} style={{ marginBottom: 12, textIndent: isHeading ? 0 : '2em', fontWeight: isHeading ? 600 : 400, fontSize: isHeading ? '1.05em' : undefined }}>
                      {para}
                    </p>
                  );
                })}
              </div>

              <Divider style={{ margin: '32px 0 24px' }} />

              <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                <span style={{ color: '#8c8c8c', fontSize: 13 }}>上一篇：<a style={{ color: '#1677ff' }}>XX市低空经济发展三年行动计划</a></span>
              </div>
              <div style={{ marginTop: 8 }}>
                <span style={{ color: '#8c8c8c', fontSize: 13 }}>下一篇：<a style={{ color: '#1677ff' }}>关于开展低空飞行服务试点工作的通知</a></span>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Component;
