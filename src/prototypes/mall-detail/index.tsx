/**
 * @name 商品详情
 * @mode axure
 * /Users/xu/Desktop/元引信息/Axhub-Make-main/skills/axure-export-workflow/SKILL.md
 *
 */

import './style.css';

import React, { useState, useCallback } from 'react';
import { Card, Tag, Breadcrumb, Divider, Row, Col, Rate, Button, Segmented, message, Modal } from 'antd';
import { HomeOutlined, ArrowLeftOutlined, FileTextOutlined, ShoppingOutlined, ShoppingCartOutlined, SafetyCertificateOutlined, CheckCircleOutlined, TeamOutlined, PhoneOutlined, EnvironmentOutlined, StarOutlined } from '@ant-design/icons';

var DETAIL = {
  title: '工业级无人机 DJI Matrice 350 RTK',
  category: '飞行器',
  price: '¥68,800',
  originalPrice: '¥72,000',
  rating: 4.8,
  sales: 326,
  reviews: 89,
  brand: '大疆创新',
  model: 'Matrice 350 RTK',
  supplier: 'XX无人机专营店',
  supplierRating: 4.9,
  highlight: '热销',
  desc: 'DJI Matrice 350 RTK 是大疆推出的旗舰级工业无人机平台，搭载全向避障和精准定位系统，续航长达 55 分钟，广泛应用于测绘、巡检、安防等专业领域。',
  specs: [
    { key: '飞行器重量', value: '6.47 kg（含桨叶和电池）' },
    { key: '最大起飞重量', value: '9.2 kg' },
    { key: '续航时间', value: '55 分钟（悬停）' },
    { key: '工作温度', value: '-20°C 至 50°C' },
    { key: '抗风等级', value: '12 m/s' },
    { key: '防护等级', value: 'IP55' },
    { key: '定位精度', value: 'RTK：1 cm + 1 ppm（水平）' },
    { key: '最大飞行速度', value: '23 m/s（运动模式）' }
  ],
  content: [
    '产品概述',
    'DJI Matrice 350 RTK 是新一代旗舰级飞行平台，专为航空测绘、电力巡检、应急救援等专业应用设计。采用全新动力系统和电池技术，续航时间提升至 55 分钟，搭载全向视觉感知和六向避障系统，确保飞行安全。',
    '',
    '核心优势',
    '一、超长续航：全新 TB65 智能飞行电池，支持 400 次循环充电，续航长达 55 分钟。',
    '二、精准定位：内置 RTK 厘米级定位模块，支持 NTRIP 和 CORS 网络差分，满足高精度测绘需求。',
    '三、智能避障：全向视觉感知 + 红外传感器，六向环境感知，全自主避障。',
    '四、多负载支持：支持同时挂载 3 个负载（上置 + 下置 × 2），灵活搭配禅思 H20T、L2 等专业负载。',
    '',
    '应用场景',
    '· 电力线路巡检：搭配禅思 H20T 热成像相机，实现杆塔精细化巡检',
    '· 航空摄影测量：搭配禅思 P1 全画幅相机，高效完成大面积测绘任务',
    '· 激光雷达扫描：搭配禅思 L2 激光雷达，快速获取高精度三维点云',
    '· 应急救援：搭配喊话器、照明灯、抛投器等救援负载',
    '',
    '售后服务',
    '· 整机质保 12 个月，电池质保 200 次循环或 6 个月',
    '· 全国 50+ 授权维修中心，7×24 小时技术支持',
    '· 提供飞行培训课程（额外收费）',
    '· 支持以旧换新服务'
  ]
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

var Component = function MallDetailPage() {
  var [fontSize, setFontSize] = useState<string>('中');
  var [isLoggedIn, setIsLoggedIn] = useState(false);
  var fontSizeMap: Record<string, number> = { '小': 14, '中': 16, '大': 18 };
  var handleNavigate = useCallback(function (key: string) {
    window.location.href = '/prototypes/' + key;
  }, []);

  var requireLogin = useCallback(function (callback: () => void) {
    if (!isLoggedIn) {
      Modal.warning({
        title: '提示',
        content: '请先登录后再进行此操作',
        okText: '去登录',
        onOk: function () { handleNavigate('login'); }
      });
      return;
    }
    callback();
  }, [isLoggedIn, handleNavigate]);

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
          { title: DETAIL.title }
        ]} style={{ marginBottom: 24 }} />

        <Row gutter={24}>
          <Col xs={24} md={17}>
            <Card style={{ borderRadius: 12, marginBottom: 24 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                <a onClick={function () { handleNavigate('mall-list'); }} style={{ color: '#722ed1', cursor: 'pointer', fontSize: 13 }}>
                  <ArrowLeftOutlined /> 返回商城
                </a>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 12, color: '#8c8c8c' }}>字号</span>
                  <Segmented options={['小', '中', '大']} value={fontSize} onChange={function (v) { setFontSize(v as string); }} size="small" />
                </div>
              </div>

              <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
                <Tag color="purple">{DETAIL.category}</Tag>
                <Tag color="red">{DETAIL.highlight}</Tag>
              </div>

              <h1 style={{ fontSize: 22, fontWeight: 700, lineHeight: 1.4, marginBottom: 12 }}>{DETAIL.title}</h1>

              <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', fontSize: 13, color: '#8c8c8c', marginBottom: 16 }}>
                <span>品牌：{DETAIL.brand}</span>
                <span>型号：{DETAIL.model}</span>
                <span><StarOutlined /> <Rate disabled defaultValue={DETAIL.rating} allowHalf style={{ fontSize: 12 }} /> {DETAIL.rating} ({DETAIL.reviews}评价)</span>
                <span>已售 {DETAIL.sales}</span>
              </div>

              <div style={{ background: '#fff7e6', padding: 16, borderRadius: 8, marginBottom: 16, borderLeft: '4px solid #fa8c16' }}>
                <span style={{ fontSize: 24, fontWeight: 700, color: '#ff4d4f', marginRight: 12 }}>{DETAIL.price}</span>
                <span style={{ fontSize: 14, color: '#8c8c8c', textDecoration: 'line-through' }}>{DETAIL.originalPrice}</span>
                <p style={{ fontSize: 14, color: '#595959', lineHeight: 1.8, margin: '8px 0 0' }}>{DETAIL.desc}</p>
              </div>

              <div style={{ marginBottom: 16 }}>
                <div style={{ height: 260, borderRadius: 10, overflow: 'hidden', marginBottom: 12, background: 'linear-gradient(135deg, #f9f0ff 0%, #efdbff 50%, #d3adf7 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 8 }}>
                  <ShoppingOutlined style={{ fontSize: 48, color: '#722ed1' }} />
                  <span style={{ fontSize: 14, color: '#722ed1', fontWeight: 500 }}>{DETAIL.brand} {DETAIL.model} · 产品主图</span>
                </div>
                <Row gutter={12}>
                  <Col span={6}>
                    <div style={{ height: 80, borderRadius: 8, background: 'linear-gradient(135deg, #f0f5ff, #d6e4ff)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', border: '2px solid #722ed1' }}>
                      <span style={{ fontSize: 10, color: '#722ed1' }}>正面</span>
                    </div>
                  </Col>
                  <Col span={6}>
                    <div style={{ height: 80, borderRadius: 8, background: 'linear-gradient(135deg, #f9f0ff, #efdbff)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                      <span style={{ fontSize: 10, color: '#722ed1' }}>侧面</span>
                    </div>
                  </Col>
                  <Col span={6}>
                    <div style={{ height: 80, borderRadius: 8, background: 'linear-gradient(135deg, #e6fffb, #b5f5ec)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                      <span style={{ fontSize: 10, color: '#13c2c2' }}>配件</span>
                    </div>
                  </Col>
                  <Col span={6}>
                    <div style={{ height: 80, borderRadius: 8, background: 'linear-gradient(135deg, #fff7e6, #ffe7ba)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                      <span style={{ fontSize: 10, color: '#fa8c16' }}>场景</span>
                    </div>
                  </Col>
                </Row>
              </div>

              <Divider>产品参数</Divider>
              <Row gutter={[16, 8]} style={{ marginBottom: 16 }}>
                {DETAIL.specs.map(function (s) {
                  return (
                    <Col xs={24} sm={12} key={s.key}>
                      <div style={{ display: 'flex', borderBottom: '1px solid #f5f5f5', padding: '8px 0' }}>
                        <span style={{ width: 120, color: '#8c8c8c', fontSize: 13, flexShrink: 0 }}>{s.key}</span>
                        <span style={{ fontSize: 13, fontWeight: 500 }}>{s.value}</span>
                      </div>
                    </Col>
                  );
                })}
              </Row>

              <Divider>详细介绍</Divider>
              <div style={{ fontSize: fontSizeMap[fontSize], lineHeight: 1.8 }}>
                {DETAIL.content.map(function (line, idx) {
                  if (!line) return <div key={idx} style={{ height: 12 }} />;
                  var isTitle = /^产品概述|核心优势|应用场景|售后服务$/.test(line);
                  var isSection = /^[一二三四五六]/.test(line);
                  return (
                    <p key={idx} style={{ margin: 0, marginBottom: 4, fontWeight: isTitle ? 600 : 400, fontSize: isTitle ? fontSizeMap[fontSize] + 2 : fontSizeMap[fontSize] }}>
                      {line}
                    </p>
                  );
                })}
              </div>
            </Card>
          </Col>

          <Col xs={24} md={7}>
            <Card style={{ borderRadius: 12, marginBottom: 16 }}>
              <Button type="primary" size="large" block style={{ height: 48, fontSize: 16, marginBottom: 12, background: '#722ed1', borderColor: '#722ed1' }} onClick={function () { requireLogin(function () { handleNavigate('mall-intention'); }); }}>
                提交采购意向
              </Button>
              <Button size="large" block style={{ height: 44 }} onClick={function () { requireLogin(function () { message.info('已收藏该商品'); }); }}>
                收藏商品
              </Button>
            </Card>
            <Card style={{ borderRadius: 12, marginBottom: 16 }}>
              <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>供应商信息</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                <div style={{ width: 40, height: 40, borderRadius: 8, background: '#f9f0ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <TeamOutlined style={{ color: '#722ed1' }} />
                </div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 500 }}>{DETAIL.supplier}</div>
                  <div style={{ fontSize: 12, color: '#8c8c8c' }}><SafetyCertificateOutlined style={{ color: '#52c41a', marginRight: 4 }} />认证供应商</div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 8 }}>
                <span style={{ fontSize: 13, color: '#8c8c8c' }}>店铺评分</span>
                <Rate disabled defaultValue={DETAIL.supplierRating} allowHalf style={{ fontSize: 12 }} />
                <span style={{ fontSize: 13, color: '#faad14' }}>{DETAIL.supplierRating}</span>
              </div>
            </Card>
            <Card style={{ borderRadius: 12 }}>
              <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>服务保障</div>
              <div style={{ fontSize: 13, color: '#595959', lineHeight: 2 }}>
                <div><CheckCircleOutlined style={{ color: '#52c41a', marginRight: 8 }} />正品保证</div>
                <div><CheckCircleOutlined style={{ color: '#52c41a', marginRight: 8 }} />全国联保</div>
                <div><CheckCircleOutlined style={{ color: '#52c41a', marginRight: 8 }} />7天无理由退换</div>
                <div><CheckCircleOutlined style={{ color: '#52c41a', marginRight: 8 }} />专业安装指导</div>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Component;
