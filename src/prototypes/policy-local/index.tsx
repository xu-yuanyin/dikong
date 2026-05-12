/**
 * @name 本地政策
 * @mode axure
 * /Users/xu/Desktop/元引信息/Axhub-Make-main/skills/axure-export-workflow/SKILL.md
 *
 */

import './style.css';

import React, { useState, useCallback } from 'react';
import { Card, Tag, Input, Row, Col, Pagination, Tabs, Breadcrumb } from 'antd';
import { SearchOutlined, CalendarOutlined, FileTextOutlined, DownloadOutlined, ReadOutlined, HomeOutlined } from '@ant-design/icons';

var STATUS_OPTIONS = [
  { key: 'all', label: '全部' },
  { key: '现行有效', label: '现行有效' },
  { key: '已修订', label: '已修订' },
  { key: '已废止', label: '已废止' }
];

var LOCAL_POLICIES = [
  { id: 1, title: '本市民用无人驾驶航空器管理办法', date: '2026-04-12', effectDate: '2026-06-01', dept: '市政府', status: '现行有效', isTop: true, summary: '规范本市民用无人驾驶航空器的生产、经营、使用和管理活动...' },
  { id: 2, title: '低空经济产业发展三年行动计划', date: '2026-03-28', effectDate: '2026-05-01', dept: '市发改委', status: '现行有效', isTop: false, summary: '明确本市低空经济产业发展目标、重点任务和保障措施...' },
  { id: 3, title: '城市低空空域使用管理实施细则', date: '2026-02-15', effectDate: '2026-04-01', dept: '市空管委', status: '已废止', isTop: false, summary: '细化城市低空空域使用管理要求，明确申请流程和审批标准...' },
  { id: 4, title: '低空飞行服务保障能力建设方案', date: '2026-01-20', effectDate: '2026-03-01', dept: '市交通运输局', status: '现行有效', isTop: false, summary: '提出低空飞行服务保障能力建设的总体思路和重点任务...' }
];

var STATUS_COLOR_MAP: Record<string, string> = {
  '现行有效': 'green',
  '已修订': 'orange',
  '已废止': 'red'
};

var Component = function PolicyLocalPage() {
  var [searchText, setSearchText] = useState('');
  var [activeStatus, setActiveStatus] = useState('all');

  var handleNavigate = useCallback(function (key: string) {
    window.location.href = '/prototypes/' + key;
  }, []);

  var filteredPolicies = LOCAL_POLICIES.filter(function (p) {
    var matchSearch = !searchText || p.title.includes(searchText) || p.dept.includes(searchText);
    var matchStatus = activeStatus === 'all' || p.status === activeStatus;
    return matchSearch && matchStatus;
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
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#fff', marginBottom: 8 }}>本地政策</h1>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.75)', marginBottom: 20 }}>本地低空经济政策法规与管理规范</p>
          <Input
            prefix={<SearchOutlined />}
            placeholder="搜索政策名称或发布单位..."
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
            defaultActiveKey="local"
            items={[
              { key: 'national', label: <span onClick={function () { handleNavigate('policy-national'); }}>国家政策</span> },
              { key: 'local', label: '本地政策' },
              { key: 'interpretation', label: <span onClick={function () { handleNavigate('policy-interpretation'); }}>政策解读</span> }
            ]}
          />
        </Card>

        <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
          {STATUS_OPTIONS.map(function (opt) {
            var isActive = activeStatus === opt.key;
            return (
              <div key={opt.key} onClick={function () { setActiveStatus(opt.key); }} style={{
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
          {filteredPolicies.map(function (policy) {
            return (
              <Col key={policy.id} xs={24}>
                <Card hoverable style={{ borderRadius: 12, cursor: 'pointer', position: 'relative' }} onClick={function () { handleNavigate('policy-local-detail'); }}>
                  {policy.isTop && (
                    <Tag color="red" style={{ position: 'absolute', top: -8, right: 16, zIndex: 1 }}>置顶</Tag>
                  )}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                        <Tag color="green">本地政策</Tag>
                        <Tag color={STATUS_COLOR_MAP[policy.status] || 'default'}>{policy.status}</Tag>
                      </div>
                      <h3 style={{ fontSize: 17, fontWeight: 600, marginBottom: 8, color: '#1f1f1f' }}>{policy.title}</h3>
                      <p style={{ fontSize: 14, color: '#595959', lineHeight: 1.6, marginBottom: 12 }}>{policy.summary}</p>
                      <div style={{ display: 'flex', gap: 24, color: '#8c8c8c', fontSize: 13 }}>
                        <span>发布单位：{policy.dept}</span>
                        <span><CalendarOutlined /> 实施日期：{policy.effectDate}</span>
                      </div>
                    </div>
                    <a style={{ color: '#1677ff', fontSize: 13, whiteSpace: 'nowrap', marginLeft: 16, display: 'flex', alignItems: 'center', gap: 4 }}>
                      <DownloadOutlined /> 下载
                    </a>
                  </div>
                </Card>
              </Col>
            );
          })}
        </Row>

        {filteredPolicies.length === 0 && (
          <div style={{ textAlign: 'center', padding: 48, color: '#8c8c8c' }}>
            <FileTextOutlined style={{ fontSize: 48, marginBottom: 16 }} />
            <p>暂无符合条件的本地政策</p>
          </div>
        )}

        <div style={{ textAlign: 'center', marginTop: 24 }}>
          <Pagination defaultCurrent={1} total={filteredPolicies.length} pageSize={10} showSizeChanger={false} />
        </div>
      </div>
    </div>
  );
};

export default Component;
