/**
 * @name 规范标准详情
 * @mode axure
 * /Users/xu/Desktop/元引信息/Axhub-Make-main/skills/axure-export-workflow/SKILL.md
 *
 */

import './style.css';

import React, { useState, useCallback } from 'react';
import { Card, Tag, Breadcrumb, Divider, Row, Col, Segmented, message } from 'antd';
import { HomeOutlined, CalendarOutlined, ArrowLeftOutlined, FileTextOutlined, ReadOutlined, FontSizeOutlined, DownloadOutlined, BankOutlined } from '@ant-design/icons';

var DETAIL = {
  id: 1,
  title: '民用无人驾驶航空器系统身份识别 总体要求',
  code: 'GB/T 42967-2023',
  type: '国家标准',
  typeColor: 'blue',
  status: '现行有效',
  statusColor: 'green',
  issuer: '国家市场监督管理总局 / 国家标准化管理委员会',
  publishDate: '2023-09-07',
  effectDate: '2024-01-01',
  summary: '本文件规定了民用无人驾驶航空器系统身份识别的总体要求，包括身份识别标识、识别信息内容、识别信息传输等技术要求。适用于民用无人驾驶航空器系统的设计、生产、使用和管理。',
  keywords: ['无人机', '身份识别', '国家标准', '安全管理'],
  content: [
    '前言',
    '本文件按照 GB/T 1.1—2020《标准化工作导则 第1部分：标准化文件的结构和起草规则》的规定起草。',
    '本文件由全国航空器标准化技术委员会（SAC/TC 435）提出并归口。',
    '',
    '1 范围',
    '本文件规定了民用无人驾驶航空器系统（以下简称"无人机系统"）身份识别的总体要求，包括：',
    'a) 身份识别标识的编码规则和格式；',
    'b) 身份识别信息的内容要求；',
    'c) 身份识别信息的传输方式和技术要求；',
    'd) 身份识别信息的存储和管理要求。',
    '本文件适用于民用无人机系统的设计、生产、销售、使用和管理活动。',
    '',
    '2 规范性引用文件',
    '下列文件中的内容通过文中的规范性引用而构成本文件必不可少的条款。其中，注日期的引用文件，仅该日期对应的版本适用于本文件。',
    'GB/T 35673 民用无人驾驶航空器系统分类及分级',
    'GB/T 38058 民用多旋翼无人机系统飞行试验通用要求',
    'MH/T 0044 民用无人驾驶航空器系统信息安全通用要求',
    '',
    '3 术语和定义',
    '下列术语和定义适用于本文件。',
    '3.1 身份识别 identification',
    '通过特定技术手段，获取和验证无人机系统身份信息的过程。',
    '3.2 身份标识 identity mark',
    '用于唯一标识无人机系统的一组编码信息。',
    '',
    '4 总体要求',
    '4.1 一般要求',
    '无人机系统应具备身份识别功能，能够实现身份信息的生成、存储、传输和验证。身份识别应满足唯一性、不可篡改性、可追溯性的基本要求。',
    '4.2 编码规则',
    '无人机系统身份标识应采用统一的编码规则，编码应包含以下信息：',
    'a) 国家/地区代码；',
    'b) 制造商代码；',
    'c) 产品型号代码；',
    'd) 序列号；',
    'e) 校验码。',
    '4.3 信息内容',
    '无人机系统身份识别信息应包含但不限于以下内容：',
    'a) 身份标识编码；',
    'b) 制造商名称；',
    'c) 产品型号和序列号；',
    'd) 生产日期；',
    'e) 所有人/运营人信息；',
    'f) 注册登记信息。',
    '',
    '5 传输要求',
    '5.1 无人机系统应支持在飞行过程中实时广播身份识别信息。',
    '5.2 身份识别信息的传输应采用安全可靠的方式，确保信息完整性和保密性。',
    '5.3 传输频率应满足实时监管需要，不少于每秒一次。'
  ],
  attachments: [
    { name: 'GB/T 42967-2023 正文.pdf', size: '2.8MB' },
    { name: '标准编制说明.pdf', size: '1.5MB' },
    { name: '征求意见稿及意见汇总.pdf', size: '3.2MB' }
  ]
};

var Component = function StandardDetailPage() {
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
          { title: '政策法规' },
          { title: <a onClick={function () { handleNavigate('standard-list'); }}>规范标准</a> },
          { title: DETAIL.title }
        ]} style={{ marginBottom: 24 }} />

        <Row gutter={24}>
          <Col xs={24}>
            <Card style={{ borderRadius: 12, marginBottom: 24 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                <a onClick={function () { handleNavigate('standard-list'); }} style={{ color: '#1677ff', cursor: 'pointer', fontSize: 13 }}>
                  <ArrowLeftOutlined style={{ marginRight: 4 }} />返回规范标准列表
                </a>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <FontSizeOutlined style={{ color: '#8c8c8c' }} />
                  <Segmented options={['小', '中', '大']} value={fontSize} onChange={function (v) { setFontSize(v as string); }} size="small" />
                </div>
              </div>

              <div style={{ marginBottom: 16 }}>
                <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
                  <Tag color={DETAIL.typeColor}>{DETAIL.type}</Tag>
                  <Tag color={DETAIL.statusColor}>{DETAIL.status}</Tag>
                </div>
                <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 12, lineHeight: 1.5 }}>{DETAIL.title}</h1>
                <div style={{ display: 'flex', gap: 24, fontSize: 13, color: '#8c8c8c', flexWrap: 'wrap' }}>
                  <span>标准编号：{DETAIL.code}</span>
                  <span><BankOutlined style={{ marginRight: 4 }} />{DETAIL.issuer}</span>
                  <span><CalendarOutlined style={{ marginRight: 4 }} />实施日期：{DETAIL.effectDate}</span>
                </div>
              </div>

              <Divider style={{ margin: '16px 0' }} />

              <div style={{ background: '#fafafa', padding: 16, borderRadius: 8, marginBottom: 16 }}>
                <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 8 }}>摘要</div>
                <p style={{ fontSize: 14, color: '#595959', lineHeight: 1.8, margin: 0 }}>{DETAIL.summary}</p>
                <div style={{ marginTop: 8, display: 'flex', gap: 6 }}>
                  {DETAIL.keywords.map(function (kw) { return <Tag key={kw}>{kw}</Tag>; })}
                </div>
              </div>

              <Divider style={{ margin: '16px 0' }} />

              <div style={{ fontSize: fontSizeMap[fontSize], lineHeight: 1.8 }}>
                {DETAIL.content.map(function (line, idx) {
                  if (!line) return <div key={idx} style={{ height: 12 }} />;
                  var isTitle = /^[0-9]+\s/.test(line) || line === '前言';
                  return (
                    <p key={idx} style={{
                      margin: 0, marginBottom: 4,
                      fontWeight: isTitle ? 600 : 400,
                      fontSize: isTitle ? fontSizeMap[fontSize] + 2 : fontSizeMap[fontSize]
                    }}>
                      {line}
                    </p>
                  );
                })}
              </div>

              <Divider style={{ margin: '24px 0' }} />

              <div>
                <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 12 }}>
                  <DownloadOutlined style={{ marginRight: 8 }} />相关附件
                </div>
                {DETAIL.attachments.map(function (att, idx) {
                  return (
                    <div key={idx} onClick={function () { message.success('开始下载：' + att.name); }} style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      padding: '10px 16px', background: '#fafafa', borderRadius: 8, marginBottom: 8,
                      cursor: 'pointer', border: '1px solid #f0f0f0', transition: 'all 0.2s'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <FileTextOutlined style={{ color: '#1677ff', fontSize: 18 }} />
                        <span style={{ fontSize: 14 }}>{att.name}</span>
                      </div>
                      <span style={{ fontSize: 12, color: '#8c8c8c' }}>{att.size}</span>
                    </div>
                  );
                })}
              </div>
              <Divider style={{ margin: '32px 0 24px' }} />

              <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                <span style={{ color: '#8c8c8c', fontSize: 13 }}>上一篇：<a style={{ color: '#1677ff' }}>无人机航摄安全作业基本要求</a></span>
              </div>
              <div style={{ marginTop: 8 }}>
                <span style={{ color: '#8c8c8c', fontSize: 13 }}>下一篇：<a style={{ color: '#1677ff' }}>民用无人驾驶航空器系统安全管理要求</a></span>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Component;
