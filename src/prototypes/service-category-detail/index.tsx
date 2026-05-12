/**
 * @name 服务分类列表
 * @mode axure
 * /Users/xu/Desktop/元引信息/Axhub-Make-main/skills/axure-export-workflow/SKILL.md
 *
 */

import './style.css';

import React, { useState, useCallback } from 'react';
import { Card, Tag, Breadcrumb, Row, Col, Input, Rate, Divider, Button } from 'antd';
import { HomeOutlined, ArrowLeftOutlined, FileTextOutlined, CompassOutlined, ReadOutlined, SafetyCertificateOutlined, ToolOutlined, BulbOutlined, MessageOutlined, SearchOutlined, DollarOutlined, ClockCircleOutlined, EnvironmentOutlined } from '@ant-design/icons';

var CATEGORY_INFO = {
  key: 'tourism',
  title: '低空旅游',
  icon: <CompassOutlined style={{ fontSize: 28 }} />,
  color: '#1677ff',
  bg: '#e6f4ff',
  desc: '提供低空旅游线路、产品、票价、预约、支付、评价一站式服务'
};

var SERVICES = [
  { id: 1, name: '城市空中观光体验', price: '¥299/人', duration: '约30分钟', rating: 4.9, count: 326, tag: '热门', desc: '乘坐专业低空飞行器，从空中俯瞰城市地标建筑群，感受不一样的城市之美。', area: '主城区' },
  { id: 2, name: '定制飞行体验', price: '¥899起/次', duration: '可定制', rating: 4.8, count: 156, tag: '推荐', desc: '根据个人或团队需求，定制专属飞行路线和时长，适用于生日庆祝、企业团建等特殊场景。', area: '全市' },
  { id: 3, name: '景区专线游览', price: '¥199/人', duration: '约20分钟', rating: 4.7, count: 89, tag: '', desc: '接入全市各大景区低空游览航线，支持在线预约、选座、电子票务。', area: '各景区' },
  { id: 4, name: '日落/夜航体验', price: '¥399/人', duration: '约25分钟', rating: 4.9, count: 67, tag: '新品', desc: '在日落或夜晚时分体验空中飞行，欣赏城市夜景和落日余晖，浪漫而难忘。', area: '主城区' },
  { id: 5, name: '空中婚纱摄影', price: '¥1,299/组', duration: '约45分钟', rating: 4.8, count: 34, tag: '', desc: '专业航拍摄影师全程跟拍，在空中留下最浪漫的婚纱照。含精修照片20张。', area: '全市' },
  { id: 6, name: '亲子飞行体验', price: '¥499/组', duration: '约20分钟', rating: 4.7, count: 78, tag: '', desc: '适合家庭亲子出游的专业飞行体验，配备儿童安全座椅和专业飞行员。', area: '主城区' }
];

var PORTAL_NAV = [
  { key: 'home', label: '首页' },
  { key: 'news', label: '资讯公告' },
  { key: 'policy-national', label: '政策法规' },
  { key: 'service-show', label: '低空服务' },
  { key: 'mall-list', label: '低空商城' },
  { key: 'flight-dynamic', label: '飞行服务' },
  { key: 'login', label: '登录' }
];

var Component = function ServiceCategoryDetailPage() {
  var [searchText, setSearchText] = useState('');
  var handleNavigate = useCallback(function (key: string) {
    window.location.href = '/prototypes/' + key;
  }, []);

  var filtered = SERVICES.filter(function (s) {
    return !searchText || s.name.includes(searchText) || s.desc.includes(searchText);
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
            {PORTAL_NAV.map(function (nav) {
              return <a key={nav.key} style={{ color: 'rgba(255,255,255,0.85)', cursor: 'pointer' }} onClick={function () { handleNavigate(nav.key); }}>{nav.label}</a>;
            })}
          </div>
        </div>
      </header>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px 24px 48px' }}>
        <Breadcrumb items={[
          { title: <a onClick={function () { handleNavigate('home'); }}><HomeOutlined /> 首页</a> },
          { title: <a onClick={function () { handleNavigate('service-show'); }}>服务概览</a> },
          { title: CATEGORY_INFO.title }
        ]} style={{ marginBottom: 24 }} />

        <Card style={{ borderRadius: 12, marginBottom: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <a onClick={function () { handleNavigate('service-show'); }} style={{ color: '#1677ff', cursor: 'pointer', fontSize: 13, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                <ArrowLeftOutlined /> 返回服务概览
              </a>
              <Divider type="vertical" style={{ height: 20 }} />
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: CATEGORY_INFO.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: CATEGORY_INFO.color }}>
                  {CATEGORY_INFO.icon}
                </div>
                <div>
                  <h2 style={{ fontSize: 18, fontWeight: 600, margin: 0, color: CATEGORY_INFO.color }}>{CATEGORY_INFO.title}</h2>
                  <p style={{ fontSize: 12, color: '#8c8c8c', margin: 0 }}>{CATEGORY_INFO.desc}</p>
                </div>
              </div>
            </div>
            <Input prefix={<SearchOutlined />} placeholder="搜索服务名称..." value={searchText} onChange={function (e) { setSearchText(e.target.value); }} style={{ width: 260 }} allowClear />
          </div>
        </Card>

        <Row gutter={[16, 16]}>
          {filtered.map(function (s) {
            return (
              <Col xs={24} sm={12} lg={8} key={s.id}>
                <Card style={{ borderRadius: 12, height: '100%' }} hoverable onClick={function () { handleNavigate('service-detail'); }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                    <Tag color="blue">{CATEGORY_INFO.title}</Tag>
                    {s.tag && <Tag color={s.tag === '热门' ? 'red' : s.tag === '新品' ? 'green' : 'orange'}>{s.tag}</Tag>}
                  </div>
                  <h4 style={{ fontSize: 15, fontWeight: 600, marginBottom: 6 }}>{s.name}</h4>
                  <p style={{ fontSize: 12, color: '#8c8c8c', lineHeight: 1.6, marginBottom: 8 }}>{s.desc}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 8 }}>
                    <Rate disabled defaultValue={s.rating} allowHalf style={{ fontSize: 12 }} />
                    <span style={{ fontSize: 12, color: '#faad14', fontWeight: 600 }}>{s.rating}</span>
                    <span style={{ fontSize: 12, color: '#8c8c8c' }}>({s.count}人评价)</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: 16, color: '#ff4d4f', fontWeight: 600 }}>{s.price}</span>
                    <span style={{ fontSize: 11, color: '#8c8c8c' }}><ClockCircleOutlined /> {s.duration}　<EnvironmentOutlined /> {s.area}</span>
                  </div>
                </Card>
              </Col>
            );
          })}
        </Row>

        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: 48, color: '#8c8c8c' }}>
            <SearchOutlined style={{ fontSize: 48, marginBottom: 16 }} />
            <p>未找到匹配的服务</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Component;
