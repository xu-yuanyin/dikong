/**
 * @name 政策解读
 * @mode axure
 * /Users/xu/Desktop/元引信息/Axhub-Make-main/skills/axure-export-workflow/SKILL.md
 *
 */

import './style.css';

import React, { useState, useCallback } from 'react';
import { Card, Tag, Input, Row, Col, Pagination, Tabs, Breadcrumb } from 'antd';
import { SearchOutlined, CalendarOutlined, FileTextOutlined, ReadOutlined, HomeOutlined } from '@ant-design/icons';

var TYPE_OPTIONS = [
  { key: 'all', label: '全部' },
  { key: '图文解读', label: '图文解读' },
  { key: '权威解读', label: '权威解读' },
  { key: '专家解读', label: '专家解读' },
  { key: '视频解读', label: '视频解读' },
  { key: '政策问答', label: '政策问答' }
];

var INTERPRETATION_DATA = [
  {
    id: 1,
    title: '一图读懂：《关于促进低空经济发展的若干意见》',
    relatedPolicy: '关于促进低空经济发展的若干意见',
    date: '2026-04-18',
    effectDate: '2026-05-01',
    source: '国务院政策研究室',
    type: '图文解读',
    typeColor: '#1677ff',
    isTop: true,
    summary: '以图文并茂的形式，系统解读《若干意见》的核心要点、目标任务和保障措施，帮助各级政府部门和市场主体准确把握政策精神。'
  },
  {
    id: 2,
    title: '权威解读：无人驾驶航空器飞行管理暂行条例五大亮点',
    relatedPolicy: '无人驾驶航空器飞行管理暂行条例',
    date: '2026-03-25',
    effectDate: '2026-06-01',
    source: '司法部',
    type: '权威解读',
    typeColor: '#722ed1',
    isTop: false,
    summary: '深度解读条例在空域分类管理、飞行审批简化、安全监管强化、法律责任明确等方面的五大制度创新亮点。'
  },
  {
    id: 3,
    title: '专家解读：低空空域分类管理办法如何影响行业发展',
    relatedPolicy: '低空空域分类管理办法',
    date: '2026-02-20',
    effectDate: '2026-04-01',
    source: '中国民航大学',
    type: '专家解读',
    typeColor: '#13c2c2',
    isTop: false,
    summary: '邀请空域管理领域资深专家，从空域划设标准、使用申请流程、动态管理机制三个维度进行深入分析。'
  },
  {
    id: 4,
    title: '视频解读：民用无人机运营合格证申请全流程指南',
    relatedPolicy: '民用无人驾驶航空器运营合格证管理规则',
    date: '2026-01-20',
    effectDate: '2026-03-01',
    source: '民航局运输司',
    type: '视频解读',
    typeColor: '#fa8c16',
    isTop: false,
    summary: '通过视频形式详细演示运营合格证的申请条件、材料准备、在线提交、审批流程等各环节操作要点。'
  },
  {
    id: 5,
    title: '政策问答：低空飞行服务保障体系建设常见问题解答',
    relatedPolicy: '低空飞行服务保障体系建设指导意见',
    date: '2025-12-28',
    effectDate: '2026-02-01',
    source: '交通运输部',
    type: '政策问答',
    typeColor: '#52c41a',
    isTop: false,
    summary: '收集整理各地在低空飞行服务保障体系建设中遇到的常见问题，以问答形式提供权威解答和操作指引。'
  },
  {
    id: 6,
    title: '图解政策：低空经济示范区申报条件与流程',
    relatedPolicy: '关于促进低空经济发展的若干意见',
    date: '2026-04-10',
    effectDate: '2026-05-01',
    source: '国家发改委',
    type: '图文解读',
    typeColor: '#1677ff',
    isTop: false,
    summary: '以流程图形式展示低空经济示范区的申报条件、评审标准、建设要求和验收流程，便于地方政府参考。'
  }
];

var Component = function PolicyInterpretationPage() {
  var [searchText, setSearchText] = useState('');
  var [activeType, setActiveType] = useState('all');

  var handleNavigate = useCallback(function (key: string) {
    window.location.href = '/prototypes/' + key;
  }, []);

  var filteredData = INTERPRETATION_DATA.filter(function (item) {
    var matchSearch = !searchText || item.title.includes(searchText) || item.summary.includes(searchText);
    var matchType = activeType === 'all' || item.type === activeType;
    return matchSearch && matchType;
  });

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
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#fff', marginBottom: 8 }}>政策解读</h1>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.75)', marginBottom: 20 }}>权威解读政策要点，助力理解政策精神</p>
          <Input
            prefix={<SearchOutlined />}
            placeholder="搜索解读标题或内容..."
            value={searchText}
            onChange={function (e) { setSearchText(e.target.value); }}
            style={{ maxWidth: 480, height: 44 }}
            size="large"
            allowClear
          />
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px 24px 48px' }}>
        <Card style={{ borderRadius: 12, marginBottom: 20 }}>
          <Tabs
            defaultActiveKey="interpretation"
            items={[
              { key: 'national', label: <span onClick={function () { handleNavigate('policy-national'); }}>国家政策</span> },
              { key: 'local', label: <span onClick={function () { handleNavigate('policy-local'); }}>本地政策</span> },
              { key: 'interpretation', label: '政策解读' }
            ]}
          />
        </Card>

        <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
          {TYPE_OPTIONS.map(function (opt) {
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

        <Row gutter={[24, 16]}>
          {filteredData.map(function (item) {
            return (
              <Col key={item.id} xs={24}>
                <Card hoverable style={{ borderRadius: 12, cursor: 'pointer', position: 'relative' }} onClick={function () { handleNavigate('policy-interpretation-detail'); }}>
                  {item.isTop && (
                    <Tag color="red" style={{ position: 'absolute', top: -8, right: 16, zIndex: 1 }}>置顶</Tag>
                  )}
                  <div style={{ display: 'flex', gap: 16 }}>
                    <div style={{
                      width: 56, height: 56, borderRadius: 12,
                      background: item.typeColor + '12',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      <ReadOutlined style={{ fontSize: 24, color: item.typeColor }} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', gap: 8, marginBottom: 8, alignItems: 'center' }}>
                        <Tag color={item.typeColor}>{item.type}</Tag>
                      </div>
                      <h3 style={{ fontSize: 17, fontWeight: 600, marginBottom: 8, color: '#1f1f1f' }}>{item.title}</h3>
                      <p style={{ fontSize: 14, color: '#595959', lineHeight: 1.8, marginBottom: 12 }}>{item.summary}</p>
                      <div style={{ display: 'flex', gap: 24, color: '#8c8c8c', fontSize: 13, flexWrap: 'wrap' }}>
                        <span>来源：{item.source}</span>
                        <span>关联政策：{item.relatedPolicy}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              </Col>
            );
          })}
        </Row>

        {filteredData.length === 0 && (
          <div style={{ textAlign: 'center', padding: 48, color: '#8c8c8c' }}>
            <FileTextOutlined style={{ fontSize: 48, marginBottom: 16 }} />
            <p>暂无符合条件的政策解读</p>
          </div>
        )}

        <div style={{ textAlign: 'center', marginTop: 24 }}>
          <Pagination defaultCurrent={1} total={filteredData.length} pageSize={10} showSizeChanger={false} />
        </div>
      </div>
    </div>
  );
};

export default Component;
