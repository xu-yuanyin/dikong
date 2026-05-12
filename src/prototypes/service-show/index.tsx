/**
 * @name 服务概览
 * @mode axure
 */

import './style.css';

import React, { useCallback } from 'react';
import { Card, Tag, Input, Row, Col, Breadcrumb, Button, Rate, Divider, Avatar } from 'antd';
import { 
  HomeOutlined, 
  CompassOutlined, 
  ReadOutlined, 
  SafetyCertificateOutlined, 
  ToolOutlined, 
  BulbOutlined, 
  EnvironmentOutlined, 
  ClockCircleOutlined,
  SearchOutlined
} from '@ant-design/icons';

const CATEGORIES = [
  { key: 'tourism', icon: <CompassOutlined />, title: '低空旅游', color: '#1677ff', bg: '#e6f4ff', desc: '城市观光 · 景区游览' },
  { key: 'training', icon: <ReadOutlined />, title: '飞行培训', color: '#52c41a', bg: '#f6ffed', desc: '驾照考证 · 技能提升' },
  { key: 'industry', icon: <SafetyCertificateOutlined />, title: '行业应用', color: '#fa8c16', bg: '#fff7e6', desc: '测绘巡检 · 农业植保' },
  { key: 'aerial', icon: <EnvironmentOutlined />, title: '航拍影像', color: '#722ed1', bg: '#f9f0ff', desc: '影视广告 · 全景VR' },
  { key: 'aircraft', icon: <ToolOutlined />, title: '飞行器服务', color: '#13c2c2', bg: '#e6fffb', desc: '维修保养 · 保险定损' }
];

const HOT_SERVICES = [
  { 
    id: 1, 
    name: '山地物资调运', 
    category: '行业应用', 
    price: '¥1,200/架次', 
    provider: '大疆通用航空',
    image: 'https://picsum.photos/seed/drone5/600/338',
    tag: ''
  },
  { 
    id: 2, 
    name: '精准植保喷洒', 
    category: '行业应用', 
    price: '¥15/亩', 
    provider: '极飞农业服务',
    image: 'https://picsum.photos/seed/agri/600/338',
    tag: ''
  },
  { 
    id: 3, 
    name: '电力通信巡检', 
    category: '行业应用', 
    price: '¥3,000/天', 
    provider: '中科星图测绘',
    image: 'https://picsum.photos/seed/power/600/338',
    tag: ''
  },
  { 
    id: 4, 
    name: '特色活动航拍', 
    category: '航拍影像', 
    price: '¥2,800/场', 
    provider: '光影视觉传媒',
    image: 'https://picsum.photos/seed/event/600/338',
    tag: ''
  },
  { 
    id: 5, 
    name: '多旋翼无人机驾驶员考证培训', 
    category: '飞行培训', 
    price: '¥8,500/人', 
    provider: '中航航空飞行学院',
    image: 'https://picsum.photos/seed/train/600/338',
    tag: ''
  },
  { 
    id: 6, 
    name: 'VR全景拍摄', 
    category: '航拍影像', 
    price: '¥4,500/组', 
    provider: '光影视觉传媒',
    image: 'https://picsum.photos/seed/vr/600/338',
    tag: ''
  },
  { 
    id: 6, 
    name: '体育赛事拍摄', 
    category: '航拍影像', 
    price: '¥3,500/场', 
    provider: '飞跃体育传媒',
    image: 'https://picsum.photos/seed/sports/600/338',
    tag: ''
  }
];

const PORTAL_NAV = [
  { key: 'home', label: '首页' },
  { key: 'news', label: '资讯公告' },
  { key: 'policy-national', label: '政策法规' },
  { key: 'service-show', label: '低空服务', active: true },
  { key: 'mall-list', label: '低空商城' },
  { key: 'flight-dynamic', label: '飞行服务' },
  { key: 'login', label: '登录' }
];

const Component = function ServiceShowPage() {
  const handleNavigate = useCallback(function (key: string) {
    window.location.href = '/prototypes/' + key;
  }, []);

  return (
    <div style={{ minHeight: '100vh', background: '#f5f5f5' }}>
      <header style={{ background: 'linear-gradient(135deg, #0c4a6e 0%, #1677ff 100%)', padding: '0 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }} onClick={() => handleNavigate('home')}>
            <SafetyCertificateOutlined style={{ fontSize: 20, color: '#fff' }} />
            <span style={{ fontSize: 16, fontWeight: 600, color: '#fff' }}>区域低空公共服务平台</span>
          </div>
          <div style={{ display: 'flex', gap: 16 }}>
            {PORTAL_NAV.map((nav) => (
              <a 
                key={nav.key} 
                style={{ color: nav.active ? '#fff' : 'rgba(255,255,255,0.85)', fontWeight: nav.active ? 600 : 400, cursor: 'pointer' }} 
                onClick={() => handleNavigate(nav.key)}
              >
                {nav.label}
              </a>
            ))}
          </div>
        </div>
      </header>

      {/* Banner Area */}
      <div style={{ background: 'linear-gradient(135deg, #0c4a6e 0%, #1677ff 100%)', padding: '40px 24px 56px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', textAlign: 'center' }}>
          <CompassOutlined style={{ fontSize: 48, color: '#fff', marginBottom: 16 }} />
          <h1 style={{ fontSize: 32, fontWeight: 700, color: '#fff', marginBottom: 12 }}>低空服务大厅</h1>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.85)', marginBottom: 32 }}>汇聚优质低空服务资源，为您提供专业、安全、高效的一站式低空服务解决方案</p>
          
          <div style={{ maxWidth: 600, margin: '0 auto', display: 'flex', gap: 12 }}>
            <Input.Search 
              size="large" 
              placeholder="搜索航拍、植保、测绘等低空服务..." 
              enterButton="搜索服务" 
              onSearch={() => handleNavigate('service-list')}
              style={{ flex: 1 }}
            />
            <Button size="large" type="primary" style={{ background: '#52c41a', borderColor: '#52c41a', fontWeight: 600, whiteSpace: 'nowrap' }} onClick={() => handleNavigate('service-publish')}>
              我要发布服务
            </Button>
          </div>
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', marginTop: 8 }}>* 仅飞行服务商和飞手可发布服务</p>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: '-24px auto 0', padding: '0 24px 48px', position: 'relative', zIndex: 10 }}>
        
        {/* Categories 金刚区 */}
        <Row gutter={[16, 16]} style={{ marginBottom: 40 }}>
          {CATEGORIES.map((m) => (
            <Col xs={12} sm={8} lg={4} key={m.key}>
              <Card 
                style={{ borderRadius: 12, border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', textAlign: 'center', height: '100%', cursor: 'pointer' }} 
                hoverable 
                onClick={() => handleNavigate('service-list')}
              >
                <div style={{ width: 56, height: 56, borderRadius: '50%', background: m.bg, margin: '0 auto 12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: m.color, fontSize: 28 }}>
                  {m.icon}
                </div>
                <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 4, color: '#1f1f1f' }}>{m.title}</h3>
                <p style={{ fontSize: 12, color: '#8c8c8c', margin: 0 }}>{m.desc}</p>
              </Card>
            </Col>
          ))}
        </Row>

        <Divider titlePlacement="left" style={{ fontSize: 22, fontWeight: 700, margin: '32px 0 24px' }}>精选服务推荐</Divider>
        
        {/* Waterfall/Grid of Beautiful Cards */}
        <Row gutter={[24, 24]}>
          {HOT_SERVICES.map((s) => (
            <Col xs={24} sm={12} lg={8} key={s.id}>
              <Card 
                hoverable 
                style={{ borderRadius: 16, overflow: 'hidden', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}
                styles={{ body: { padding: 0 } }}
                onClick={() => handleNavigate('service-detail')}
              >
                {/* 封面图 */}
                <div style={{ width: '100%', paddingTop: '56.25%', position: 'relative', background: '#e6f4ff' }}>
                  <img 
                    src={s.image} 
                    alt={s.name} 
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }} 
                  />
                  {/* 悬浮标签 */}
                  {s.tag && (
                    <div style={{ position: 'absolute', top: 12, left: 12, background: 'rgba(0,0,0,0.65)', color: '#fff', padding: '4px 10px', borderRadius: 6, fontSize: 12, backdropFilter: 'blur(4px)' }}>
                      {s.tag}
                    </div>
                  )}
                  {/* 发布商标识 */}
                  <div style={{ position: 'absolute', bottom: 12, left: 12, background: 'rgba(255,255,255,0.9)', padding: '4px 8px', borderRadius: 4, fontSize: 12, fontWeight: 500, display: 'flex', alignItems: 'center', gap: 4 }}>
                    <Avatar size={16} src="https://api.dicebear.com/7.x/shapes/svg?seed=provider" />
                    {s.provider}
                  </div>
                </div>

                {/* 卡片内容区 */}
                <div style={{ padding: '20px' }}>
                  <h4 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8, color: '#1f1f1f', display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {s.name}
                  </h4>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 16 }}>
                    <span style={{ fontSize: 16, color: s.price.startsWith('¥') ? '#ff4d4f' : '#52c41a', fontWeight: 600 }}>{s.price}</span>
                    <Tag color="blue">{s.category}</Tag>
                  </div>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default Component;
