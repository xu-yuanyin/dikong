/**
 * @name 规范标准
 * @mode axure
 * /Users/xu/Desktop/元引信息/Axhub-Make-main/skills/axure-export-workflow/SKILL.md
 *
 */

import './style.css';

import React, { useState, useCallback } from 'react';
import { Card, Tag, Input, Row, Col, Pagination } from 'antd';
import { SearchOutlined, CalendarOutlined, FileTextOutlined, ReadOutlined, BankOutlined } from '@ant-design/icons';

var TYPE_MAP: Record<string, { label: string; color: string }> = {
  national: { label: '国家标准', color: 'blue' },
  industry: { label: '行业标准', color: 'green' },
  local: { label: '地方标准', color: 'orange' },
  tech: { label: '技术规范', color: 'purple' }
};

var STATUS_MAP: Record<string, { label: string; color: string }> = {
  active: { label: '现行有效', color: 'green' },
  repealed: { label: '已废止', color: 'red' },
  upcoming: { label: '即将实施', color: 'blue' }
};

var STANDARDS = [
  { id: 1, title: '民用无人驾驶航空器系统身份识别 总体要求', code: 'GB/T 42967-2023', type: 'national', issuer: '国家市场监督管理总局', publishDate: '2023-09-07', effectDate: '2024-01-01', status: 'active', isTop: true, summary: '规定了民用无人驾驶航空器系统身份识别的总体要求，包括身份识别标识、识别信息内容、识别信息传输等技术要求。' },
  { id: 2, title: '民用无人驾驶航空器系统安全管理要求', code: 'GB/T 42968-2023', type: 'national', issuer: '国家市场监督管理总局', publishDate: '2023-09-07', effectDate: '2024-01-01', status: 'active', isTop: true, summary: '规定了民用无人驾驶航空器系统安全管理的基本要求，涵盖设计、生产、使用、维护等全生命周期。' },
  { id: 3, title: '无人机航摄安全作业基本要求', code: 'CH/T 3002-2023', type: 'industry', issuer: '自然资源部', publishDate: '2023-06-15', effectDate: '2023-12-01', status: 'active', isTop: false, summary: '规定了利用无人机进行航空摄影测量安全作业的基本要求，包括飞行准备、航线规划、飞行实施和数据采集。' },
  { id: 4, title: '民用无人驾驶航空器物流配送运行管理规范', code: 'MH/T 4087-2024', type: 'industry', issuer: '中国民用航空局', publishDate: '2024-03-20', effectDate: '2024-09-01', status: 'upcoming', isTop: false, summary: '规定了民用无人驾驶航空器物流配送运行的总体要求，涵盖运行场景、飞行安全、货物管理等方面。' },
  { id: 5, title: 'XX市低空飞行服务保障体系建设规范', code: 'DBXX/T 001-2026', type: 'local', issuer: '市交通运输局', publishDate: '2026-01-15', effectDate: '2026-07-01', status: 'active', isTop: false, summary: '规定了本市低空飞行服务保障体系的建设要求，包括基础设施、通信导航、气象服务等内容。' },
  { id: 6, title: '无人机巡检作业技术规范', code: 'T/CAA-001-2025', type: 'tech', issuer: '中国航空运输协会', publishDate: '2025-05-10', effectDate: '2025-11-01', status: 'active', isTop: false, summary: '规定了利用无人机进行电力线路、管道、桥梁等基础设施巡检作业的技术规范。' },
  { id: 7, title: '民用无人机驾驶员执照管理规则', code: 'AC-61-FS-2024', type: 'tech', issuer: '中国民用航空局', publishDate: '2024-08-01', effectDate: '2025-01-01', status: 'active', isTop: false, summary: '规定了民用无人机驾驶员执照的申请、考试、颁发、管理和监督等要求。' },
  { id: 8, title: '低空空域分类与管理技术规范', code: 'GB/T 44XXX-2026', type: 'national', issuer: '国家空管委', publishDate: '2026-02-28', effectDate: '2026-08-01', status: 'upcoming', isTop: false, summary: '规定了低空空域分类原则、划设方法和管理技术要求，为低空空域精细化管理提供标准依据。' }
];

var Component = function StandardListPage() {
  var [searchText, setSearchText] = useState('');
  var [activeType, setActiveType] = useState('all');

  var handleNavigate = useCallback(function (key: string) {
    window.location.href = '/prototypes/' + key;
  }, []);

  var filtered = STANDARDS.filter(function (s) {
    var matchSearch = !searchText || s.title.includes(searchText) || s.code.includes(searchText);
    var matchType = activeType === 'all' || s.type === activeType;
    return matchSearch && matchType;
  });

  var typeOptions = [
    { key: 'all', label: '全部' },
    { key: 'national', label: '国家标准' },
    { key: 'industry', label: '行业标准' },
    { key: 'local', label: '地方标准' },
    { key: 'tech', label: '技术规范' }
  ];

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

      <div style={{ background: 'linear-gradient(135deg, #0c4a6e 0%, #1677ff 100%)', padding: '32px 24px 48px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', textAlign: 'center' }}>
          <ReadOutlined style={{ fontSize: 40, color: '#fff', marginBottom: 12 }} />
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#fff', marginBottom: 8 }}>规范标准</h1>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.75)', marginBottom: 20 }}>低空领域国家标准、行业标准、地方标准与技术规范</p>
          <Input
            prefix={<SearchOutlined />}
            placeholder="搜索标准名称或编号..."
            value={searchText}
            onChange={function (e) { setSearchText(e.target.value); }}
            style={{ maxWidth: 480, height: 44 }}
            size="large"
            allowClear
          />
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px 24px 48px' }}>
        <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
          {typeOptions.map(function (opt) {
            var isActive = activeType === opt.key;
            return (
              <div key={opt.key} onClick={function () { setActiveType(opt.key); }} style={{
                padding: '6px 20px', borderRadius: 20, cursor: 'pointer', fontSize: 14,
                background: isActive ? '#1677ff' : '#fff', color: isActive ? '#fff' : '#595959',
                border: '1px solid ' + (isActive ? '#1677ff' : '#d9d9d9'), transition: 'all 0.2s'
              }}>
                {opt.label}
              </div>
            );
          })}
        </div>

        <Row gutter={[16, 16]}>
          {filtered.map(function (s) {
            var typeInfo = TYPE_MAP[s.type];
            var statusInfo = STATUS_MAP[s.status];
            return (
              <Col xs={24} key={s.id}>
                <Card style={{ borderRadius: 12, cursor: 'pointer', position: 'relative' }} hoverable onClick={function () { handleNavigate('standard-detail'); }}>
                  {s.isTop && (
                    <Tag color="red" style={{ position: 'absolute', top: -8, right: 16, zIndex: 1 }}>置顶</Tag>
                  )}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                        <Tag color={typeInfo.color}>{typeInfo.label}</Tag>
                        <Tag color={statusInfo.color}>{statusInfo.label}</Tag>
                      </div>
                      <h3 style={{ fontSize: 17, fontWeight: 600, marginBottom: 8, lineHeight: 1.5 }}>{s.title}</h3>
                      <div style={{ fontSize: 13, color: '#8c8c8c', marginBottom: 6 }}>
                        <span style={{ marginRight: 16 }}>标准编号：{s.code}</span>
                        <span style={{ marginRight: 16 }}><BankOutlined style={{ marginRight: 4 }} />{s.issuer}</span>
                      </div>
                      <p style={{ fontSize: 13, color: '#595959', lineHeight: 1.6, marginBottom: 8 }}>{s.summary}</p>
                      <div style={{ fontSize: 12, color: '#8c8c8c' }}>
                        <CalendarOutlined style={{ marginRight: 4 }} />
                        实施日期：{s.effectDate}
                      </div>
                    </div>
                  </div>
                </Card>
              </Col>
            );
          })}
        </Row>

        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: 48, color: '#8c8c8c' }}>
            <FileTextOutlined style={{ fontSize: 48, marginBottom: 16 }} />
            <p>暂无符合条件的规范标准</p>
          </div>
        )}

        <div style={{ textAlign: 'center', marginTop: 24 }}>
          <Pagination defaultCurrent={1} total={filtered.length} pageSize={10} showSizeChanger={false} />
        </div>
      </div>
    </div>
  );
};

export default Component;
