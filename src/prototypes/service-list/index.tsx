/**
 * @name 服务大厅列表
 * @mode axure
 */

import './style.css';

import React, { useState, useCallback } from 'react';
import { Card, Tag, Input, Row, Col, Pagination, Breadcrumb, Button, Avatar, Empty } from 'antd';
import {
  SearchOutlined, HomeOutlined, SafetyCertificateOutlined, RightOutlined,
  CompassOutlined, ReadOutlined, EnvironmentOutlined, ToolOutlined, AppstoreOutlined
} from '@ant-design/icons';

const CATEGORIES = [
  { key: '全部', icon: <AppstoreOutlined />, title: '全部服务', color: '#1677ff', bg: '#e6f4ff' },
  { key: '行业应用', icon: <SafetyCertificateOutlined />, title: '行业应用', color: '#fa8c16', bg: '#fff7e6' },
  { key: '航拍影像', icon: <EnvironmentOutlined />, title: '航拍影像', color: '#722ed1', bg: '#f9f0ff' },
  { key: '飞行培训', icon: <ReadOutlined />, title: '飞行培训', color: '#52c41a', bg: '#f6ffed' },
  { key: '低空旅游', icon: <CompassOutlined />, title: '低空旅游', color: '#1677ff', bg: '#e6f4ff' },
  { key: '飞行器服务', icon: <ToolOutlined />, title: '飞行器服务', color: '#13c2c2', bg: '#e6fffb' }
];

const SERVICES = [
  { id: 1, name: '山地物资调运', category: '行业应用', price: '¥1,200/架次', provider: '大疆通用航空', image: 'https://picsum.photos/seed/drone5/600/338' },
  { id: 2, name: '精准植保喷洒', category: '行业应用', price: '¥15/亩', provider: '极飞农业服务', image: 'https://picsum.photos/seed/agri/600/338' },
  { id: 3, name: '电力通信巡检', category: '行业应用', price: '¥3,000/天', provider: '中科星图测绘', image: 'https://picsum.photos/seed/power/600/338' },
  { id: 4, name: '特色活动航拍', category: '航拍影像', price: '¥2,800/场', provider: '光影视觉传媒', image: 'https://picsum.photos/seed/event/600/338' },
  { id: 5, name: 'VR全景拍摄', category: '航拍影像', price: '¥4,500/组', provider: '光影视觉传媒', image: 'https://picsum.photos/seed/vr/600/338' },
  { id: 6, name: '体育赛事拍摄', category: '航拍影像', price: '¥3,500/场', provider: '飞跃体育传媒', image: 'https://picsum.photos/seed/sports/600/338' },
  { id: 7, name: '多旋翼驾驶员考证培训', category: '飞行培训', price: '¥8,500/人', provider: '中航航空飞行学院', image: 'https://picsum.photos/seed/train/600/338' },
  { id: 8, name: '大疆 M300 年度适航检测', category: '飞行器服务', price: '¥2,000/次', provider: '大疆官方售后(郑州)', image: 'https://picsum.photos/seed/repair/600/338' }
];

const Component = function ServiceListPage() {
  const [selectedCategory, setSelectedCategory] = useState('全部');
  const [searchText, setSearchText] = useState('');

  const handleNavigate = useCallback(function (key: string) {
    window.location.href = '/prototypes/' + key;
  }, []);

  const filteredServices = SERVICES.filter(function (s) {
    const matchCategory = selectedCategory === '全部' || s.category === selectedCategory;
    const matchSearch = !searchText || s.name.includes(searchText) || s.provider.includes(searchText);
    return matchCategory && matchSearch;
  });

  return (
    <div style={{ minHeight: '100vh', background: '#f5f5f5' }}>
      <header style={{ background: 'linear-gradient(135deg, #0c4a6e 0%, #1677ff 100%)', padding: '0 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }} onClick={() => handleNavigate('home')}>
            <SafetyCertificateOutlined style={{ fontSize: 20, color: '#fff' }} />
            <span style={{ fontSize: 16, fontWeight: 600, color: '#fff' }}>区域低空公共服务平台</span>
          </div>
          <div style={{ display: 'flex', gap: 16 }}>
            <a style={{ color: 'rgba(255,255,255,0.85)', cursor: 'pointer' }} onClick={() => handleNavigate('home')}>首页</a>
            <a style={{ color: 'rgba(255,255,255,0.85)', cursor: 'pointer' }} onClick={() => handleNavigate('news')}>资讯公告</a>
            <a style={{ color: 'rgba(255,255,255,0.85)', cursor: 'pointer' }} onClick={() => handleNavigate('policy-national')}>政策法规</a>
            <a style={{ color: '#fff', fontWeight: 600, cursor: 'pointer' }}>低空服务</a>
            <a style={{ color: 'rgba(255,255,255,0.85)', cursor: 'pointer' }} onClick={() => handleNavigate('mall-list')}>低空商城</a>
            <a style={{ color: 'rgba(255,255,255,0.85)', cursor: 'pointer' }} onClick={() => handleNavigate('flight-dynamic')}>飞行服务</a>
            <a style={{ color: 'rgba(255,255,255,0.85)', cursor: 'pointer' }} onClick={() => handleNavigate('login')}>登录</a>
          </div>
        </div>
      </header>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px 24px 48px' }}>
        <Breadcrumb items={[
          { title: <a onClick={() => handleNavigate('home')}><HomeOutlined /> 首页</a> },
          { title: <a onClick={() => handleNavigate('service-show')}>低空服务</a> },
          { title: '服务大厅' }
        ]} style={{ marginBottom: 24 }} />

        {/* 分类图标卡片 */}
        <Row gutter={[12, 12]} style={{ marginBottom: 24 }}>
          {CATEGORIES.map((cat) => (
            <Col xs={8} sm={4} key={cat.key}>
              <div
                onClick={() => setSelectedCategory(cat.key)}
                style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
                  padding: '16px 8px', borderRadius: 12, cursor: 'pointer',
                  background: selectedCategory === cat.key ? cat.bg : '#fff',
                  border: selectedCategory === cat.key ? `2px solid ${cat.color}` : '2px solid transparent',
                  boxShadow: selectedCategory === cat.key ? `0 4px 12px ${cat.color}22` : '0 2px 8px rgba(0,0,0,0.04)',
                  transition: 'all 0.25s ease'
                }}
              >
                <div style={{
                  width: 44, height: 44, borderRadius: '50%',
                  background: selectedCategory === cat.key ? cat.color : cat.bg,
                  color: selectedCategory === cat.key ? '#fff' : cat.color,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22,
                  transition: 'all 0.25s ease'
                }}>
                  {cat.icon}
                </div>
                <span style={{
                  fontSize: 13, fontWeight: selectedCategory === cat.key ? 600 : 400,
                  color: selectedCategory === cat.key ? cat.color : '#595959'
                }}>
                  {cat.title}
                </span>
              </div>
            </Col>
          ))}
        </Row>

        {/* 搜索栏 + 结果统计 */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: 16, fontWeight: 600, color: '#1f1f1f' }}>
              {selectedCategory === '全部' ? '全部服务' : selectedCategory}
            </span>
            <Tag color="blue">{filteredServices.length} 项服务</Tag>
          </div>
          <Input
            prefix={<SearchOutlined />}
            placeholder="搜索服务名称或商家..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{ width: 300 }}
            allowClear
          />
        </div>

        {/* 服务卡片列表 */}
        {filteredServices.length > 0 ? (
          <Row gutter={[24, 24]}>
            {filteredServices.map((service) => (
              <Col key={service.id} xs={24} sm={12} lg={8}>
                <Card
                  hoverable
                  style={{ borderRadius: 16, overflow: 'hidden', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}
                  styles={{ body: { padding: 0 } }}
                  onClick={() => handleNavigate('service-detail')}
                >
                  {/* 封面图 */}
                  <div style={{ width: '100%', paddingTop: '56.25%', position: 'relative', background: '#e6f4ff' }}>
                    <img
                      src={service.image}
                      alt={service.name}
                      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    {/* 发布商标识 */}
                    <div style={{ position: 'absolute', bottom: 12, left: 12, background: 'rgba(255,255,255,0.9)', padding: '4px 8px', borderRadius: 4, fontSize: 12, fontWeight: 500, display: 'flex', alignItems: 'center', gap: 4 }}>
                      <Avatar size={16} src={`https://api.dicebear.com/7.x/shapes/svg?seed=${service.id}`} />
                      {service.provider}
                    </div>
                  </div>

                  {/* 卡片内容区 */}
                  <div style={{ padding: '20px' }}>
                    <h4 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8, color: '#1f1f1f', display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {service.name}
                    </h4>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 16 }}>
                      <span style={{ fontSize: 16, color: service.price.startsWith('¥') ? '#ff4d4f' : '#52c41a', fontWeight: 600 }}>{service.price}</span>
                      <Tag color="blue">{service.category}</Tag>
                    </div>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        ) : (
          <Card style={{ borderRadius: 12, textAlign: 'center', padding: '48px 0' }}>
            <Empty description="暂无符合条件的服务" />
          </Card>
        )}

        <div style={{ textAlign: 'center', marginTop: 32 }}>
          <Pagination defaultCurrent={1} total={filteredServices.length * 3} />
        </div>
      </div>
    </div>
  );
};

export default Component;
