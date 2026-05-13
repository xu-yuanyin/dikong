/**
 * @name 采购需求
 * @mode axure
 * /Users/xu/Desktop/元引信息/Axhub-Make-main/skills/axure-export-workflow/SKILL.md
 *
 */

import './style.css';

import React, { useState, useCallback } from 'react';
import { Card, Tag, Input, Row, Col, Breadcrumb, Button, Pagination } from 'antd';
import { SearchOutlined, HomeOutlined, ShoppingOutlined, PlusOutlined, EnvironmentOutlined, ClockCircleOutlined, DollarOutlined } from '@ant-design/icons';

var DEMANDS = [
  { id: 1, title: '求购 10 台工业级测绘无人机', category: '飞行器', budget: '¥50-80万', area: '全市', deadline: '2026-05-31', status: '进行中', company: 'XX测绘工程有限公司', time: '2026-04-20' },
  { id: 2, title: '采购 5 套低空通信基站设备', category: '通信设备', budget: '¥20-30万', area: '主城区', deadline: '2026-06-15', status: '进行中', company: 'XX通信技术有限公司', time: '2026-04-18' },
  { id: 3, title: '求购无人机反制系统 3 套', category: '安全设备', budget: '¥30-50万', area: '全市', deadline: '2026-05-20', status: '即将截止', company: 'XX安保服务集团', time: '2026-04-15' },
  { id: 4, title: '采购 eVTOL 载人飞行器 2 架', category: '飞行器', budget: '¥500万以上', area: '全省', deadline: '2026-08-01', status: '进行中', company: 'XX低空旅游有限公司', time: '2026-04-12' },
  { id: 5, title: '求购智能停机坪 20 套', category: '基础设施', budget: '¥60-80万', area: '全市', deadline: '2026-07-01', status: '进行中', company: 'XX城市管理运营中心', time: '2026-04-10' },
  { id: 6, title: '采购飞行模拟训练系统 2 套', category: '培训设备', budget: '¥15-20万', area: '主城区', deadline: '2026-06-30', status: '已完成', company: 'XX飞行培训学校', time: '2026-04-05' }
];

var STATUS_MAP: Record<string, { color: string }> = {
  '进行中': { color: 'blue' },
  '即将截止': { color: 'red' },
  '已完成': { color: 'default' }
};

var PORTAL_NAV = [
  { key: 'home', label: '首页' },
  { key: 'news', label: '资讯公告' },
  { key: 'policy-national', label: '政策法规' },
  { key: 'service-list', label: '低空服务' },
  { key: 'mall-list', label: '低空商城', active: true },
  { key: 'flight-dynamic', label: '飞行服务' },
  { key: 'login', label: '登录' }
];

var Component = function MallDemandPage() {
  var [searchText, setSearchText] = useState('');
  var handleNavigate = useCallback(function (key: string) {
    window.location.href = '/prototypes/' + key;
  }, []);

  var filtered = DEMANDS.filter(function (d) {
    return !searchText || d.title.includes(searchText) || d.category.includes(searchText);
  });

  return (
    <div style={{ minHeight: '100vh', background: '#f5f5f5' }}>
      <header style={{ background: 'linear-gradient(135deg, #0c4a6e 0%, #722ed1 100%)', padding: '0 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }} onClick={function () { handleNavigate('home'); }}>
            <ShoppingOutlined style={{ fontSize: 20, color: '#fff' }} />
            <span style={{ fontSize: 16, fontWeight: 600, color: '#fff' }}>区域低空公共服务平台</span>
          </div>
          <div style={{ display: 'flex', gap: 16 }}>
            {PORTAL_NAV.map(function (nav) {
              return <a key={nav.key} style={{ color: nav.active ? '#fff' : 'rgba(255,255,255,0.85)', fontWeight: nav.active ? 600 : 400, cursor: 'pointer' }} onClick={function () { handleNavigate(nav.key); }}>{nav.label}</a>;
            })}
          </div>
        </div>
      </header>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px 24px 48px' }}>
        <Breadcrumb items={[
          { title: <a onClick={function () { handleNavigate('home'); }}><HomeOutlined /> 首页</a> },
          { title: <a onClick={function () { handleNavigate('mall-list'); }}>低空商城</a> },
          { title: '采购需求' }
        ]} style={{ marginBottom: 20 }} />

        <Card style={{ borderRadius: 12, marginBottom: 20 }}>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <Input prefix={<SearchOutlined />} placeholder="搜索采购需求..." value={searchText} onChange={function (e) { setSearchText(e.target.value); }} style={{ width: 320 }} allowClear />
            <div style={{ flex: 1 }} />
            <Button type="primary" icon={<PlusOutlined />} style={{ background: '#722ed1', borderColor: '#722ed1' }} onClick={function () { handleNavigate('mall-intention'); }}>发布采购需求</Button>
          </div>
        </Card>

        <Row gutter={[16, 16]}>
          {filtered.map(function (d) {
            var statusInfo = STATUS_MAP[d.status] || STATUS_MAP['进行中'];
            return (
              <Col xs={24} key={d.id}>
                <Card style={{ borderRadius: 12, cursor: 'pointer' }} hoverable onClick={function () { handleNavigate('mall-demand-detail'); }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                        <Tag color="purple">{d.category}</Tag>
                        <Tag color={statusInfo.color}>{d.status}</Tag>
                      </div>
                      <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{d.title}</h3>
                      <div style={{ fontSize: 13, color: '#8c8c8c', display: 'flex', gap: 20, flexWrap: 'wrap' }}>
                        <span><DollarOutlined /> 预算：{d.budget}</span>
                        <span><EnvironmentOutlined /> {d.area}</span>
                        <span><ClockCircleOutlined /> 截止：{d.deadline}</span>
                        <span>{d.company}</span>
                      </div>
                    </div>
                    <div style={{ fontSize: 12, color: '#8c8c8c', flexShrink: 0 }}>{d.time}</div>
                  </div>
                </Card>
              </Col>
            );
          })}
        </Row>

        <div style={{ textAlign: 'center', marginTop: 24 }}>
          <Pagination defaultCurrent={1} total={filtered.length} pageSize={10} />
        </div>
      </div>
    </div>
  );
};

export default Component;
