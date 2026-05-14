/**
 * @name 商城列表
 * @mode axure
 * /Users/xu/Desktop/元引信息/Axhub-Make-main/skills/axure-export-workflow/SKILL.md
 *
 */

import './style.css';

import React, { useState, useCallback } from 'react';
import { Card, Tag, Input, Row, Col, Pagination, Breadcrumb, Button, Avatar, Empty, Segmented } from 'antd';
import {
  SearchOutlined, HomeOutlined, ShoppingOutlined, ShoppingCartOutlined, PlusOutlined,
  CompassOutlined, EnvironmentOutlined, AppstoreOutlined, RocketOutlined, SafetyCertificateOutlined,
  ThunderboltOutlined, ReadOutlined, FormOutlined, ClockCircleOutlined, DollarOutlined
} from '@ant-design/icons';

const PRODUCTS = [
  { id: 1, name: '工业级无人机 DJI Matrice 350 RTK', category: '飞行器', price: '¥68,800', rating: 4.8, sales: 326, desc: '专业测绘巡检无人机，55分钟续航', hot: true },
  { id: 2, name: 'eVTOL载人飞行器 EH216-S', category: '飞行器', price: '¥2,380,000', rating: 4.5, sales: 12, desc: '载人级自动驾驶飞行器，适航认证', hot: true },
  { id: 3, name: '无人机反制系统 UAD-2000', category: '安全设备', price: '¥128,000', rating: 4.6, sales: 89, desc: '多频段无人机侦测反制一体机', hot: false },
  { id: 4, name: '低空通信基站 LA-COM500', category: '通信设备', price: '¥45,000', rating: 4.3, sales: 156, desc: '5G+北斗双模低空通信基站', hot: false },
  { id: 5, name: '飞行模拟训练系统 FS-Pro', category: '培训设备', price: '¥86,000', rating: 4.7, sales: 67, desc: '全场景无人机飞行模拟训练平台', hot: true },
  { id: 6, name: '智能停机坪 SmartPad-M', category: '基础设施', price: '¥32,000', rating: 4.4, sales: 203, desc: '自动充电/收纳智能停机坪', hot: false }
];

const DEMANDS = [
  { id: 1, title: '求购 10 台工业级测绘无人机', category: '飞行器', budget: '¥50-80万', area: '全市', deadline: '2026-05-31', status: '进行中', company: 'XX测绘工程有限公司', time: '2026-04-20', publisher: '张经理' },
  { id: 2, title: '采购 5 套低空通信基站设备', category: '通信设备', budget: '¥20-30万', area: '主城区', deadline: '2026-06-15', status: '进行中', company: 'XX通信技术有限公司', time: '2026-04-18', publisher: '李总' },
  { id: 3, title: '求购无人机反制系统 3 套', category: '安全设备', budget: '¥30-50万', area: '全市', deadline: '2026-05-20', status: '即将截止', company: 'XX安保服务集团', time: '2026-04-15', publisher: '王主管' },
  { id: 4, title: '采购 eVTOL 载人飞行器 2 架', category: '飞行器', budget: '¥500万以上', area: '全省', deadline: '2026-08-01', status: '进行中', company: 'XX低空旅游有限公司', time: '2026-04-12', publisher: '赵总' },
  { id: 5, title: '求购智能停机坪 20 套', category: '基础设施', budget: '¥60-80万', area: '全市', deadline: '2026-07-01', status: '进行中', company: 'XX城市管理运营中心', time: '2026-04-10', publisher: '孙主任' },
  { id: 6, title: '采购飞行模拟训练系统 2 套', category: '培训设备', budget: '¥15-20万', area: '主城区', deadline: '2026-06-30', status: '已完成', company: 'XX飞行培训学校', time: '2026-04-05', publisher: '刘校长' }
];

const CATEGORIES = [
  { key: '全部', icon: <AppstoreOutlined />, title: '全部', color: '#1677ff', bg: '#e6f4ff' },
  { key: '飞行器', icon: <RocketOutlined />, title: '飞行器', color: '#722ed1', bg: '#f9f0ff' },
  { key: '安全设备', icon: <SafetyCertificateOutlined />, title: '安全设备', color: '#fa8c16', bg: '#fff7e6' },
  { key: '通信设备', icon: <ThunderboltOutlined />, title: '通信设备', color: '#13c2c2', bg: '#e6fffb' },
  { key: '培训设备', icon: <ReadOutlined />, title: '培训设备', color: '#52c41a', bg: '#f6ffed' },
  { key: '基础设施', icon: <EnvironmentOutlined />, title: '基础设施', color: '#eb2f96', bg: '#fff0f6' }
];

const DEMAND_GRADIENTS: Record<string, string> = {
  '飞行器': 'linear-gradient(135deg, #f9f0ff, #efdbff)',
  '安全设备': 'linear-gradient(135deg, #fff7e6, #ffe7ba)',
  '通信设备': 'linear-gradient(135deg, #e6fffb, #b5f5ec)',
  '培训设备': 'linear-gradient(135deg, #f6ffed, #d9f7be)',
  '基础设施': 'linear-gradient(135deg, #fff0f6, #ffd6e7)'
};

const STATUS_MAP: Record<string, { color: string }> = {
  '进行中': { color: 'green' },
  '即将截止': { color: 'red' },
  '已完成': { color: 'default' }
};

const PORTAL_NAV = [
  { key: 'home', label: '首页' },
  { key: 'news', label: '资讯公告' },
  { key: 'policy-national', label: '政策法规' },
  { key: 'service-list', label: '低空服务' },
  { key: 'mall-list', label: '低空商城', active: true },
  { key: 'flight-dynamic', label: '飞行服务' },
  { key: 'login', label: '登录' }
];

export function MallLayout({ defaultTab = '低空商城' }: { defaultTab?: string }) {
  const [activeTab, setActiveTab] = useState<string>(defaultTab);
  const [selectedCategory, setSelectedCategory] = useState('全部');
  const [demandCategory, setDemandCategory] = useState('全部');
  const [searchText, setSearchText] = useState('');

  const handleNavigate = useCallback(function (key: string) {
    window.location.href = '/prototypes/' + key;
  }, []);

  const filteredProducts = PRODUCTS.filter(function (p) {
    const matchCategory = selectedCategory === '全部' || p.category === selectedCategory;
    const matchSearch = !searchText || p.name.includes(searchText) || p.desc.includes(searchText);
    return matchCategory && matchSearch;
  });

  const filteredDemands = DEMANDS.filter(function (d) {
    const matchCategory = demandCategory === '全部' || d.category === demandCategory;
    const matchSearch = !searchText || d.title.includes(searchText) || d.company.includes(searchText);
    return matchCategory && matchSearch;
  });

  return (
    <div style={{ minHeight: '100vh', background: '#f5f5f5' }}>
      <header style={{ background: 'linear-gradient(135deg, #0c4a6e 0%, #722ed1 100%)', padding: '0 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }} onClick={() => handleNavigate('home')}>
            <ShoppingOutlined style={{ fontSize: 20, color: '#fff' }} />
            <span style={{ fontSize: 16, fontWeight: 600, color: '#fff' }}>区域低空公共服务平台</span>
          </div>
          <div style={{ display: 'flex', gap: 16 }}>
            {PORTAL_NAV.map((nav) => (
              <a key={nav.key} style={{ color: nav.active ? '#fff' : 'rgba(255,255,255,0.85)', fontWeight: nav.active ? 600 : 400, cursor: 'pointer' }} onClick={() => handleNavigate(nav.key)}>{nav.label}</a>
            ))}
          </div>
        </div>
      </header>

      {/* Banner Area */}
      <div style={{ background: 'linear-gradient(135deg, #0c4a6e 0%, #722ed1 100%)', padding: '24px 24px 72px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <Breadcrumb 
            separator={<span style={{ color: 'rgba(255,255,255,0.4)' }}>/</span>}
            items={[
              { title: <a style={{ color: 'rgba(255,255,255,0.85)' }} onClick={() => handleNavigate('home')}><HomeOutlined /> 首页</a> },
              { title: <span style={{ color: '#fff', fontWeight: 500 }}>低空商城</span> }
            ]} 
            style={{ marginBottom: 24 }} 
          />

          <div style={{ textAlign: 'center', marginTop: 16 }}>
            <ShoppingOutlined style={{ fontSize: 48, color: '#fff', marginBottom: 16 }} />
            <h1 style={{ fontSize: 32, fontWeight: 700, color: '#fff', marginBottom: 12 }}>{activeTab === '低空商城' ? '低空商城' : '采购需求'}</h1>
            <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.85)', marginBottom: 20 }}>{activeTab === '低空商城' ? '汇聚优质低空飞行器与设备资源，为您提供一站式低空装备采购服务' : '发布您的低空装备采购需求，让优质供应商主动为您提供解决方案'}</p>

            <div style={{ marginBottom: 20 }}>
              <Segmented
                options={[
                  { label: <span style={{ padding: '0 16px' }}><ShoppingOutlined /> 低空商城</span>, value: '低空商城' },
                  { label: <span style={{ padding: '0 16px' }}><FormOutlined /> 采购需求</span>, value: '采购需求' }
                ]}
                value={activeTab}
                onChange={(v) => { setActiveTab(v as string); setSearchText(''); }}
                size="large"
                style={{ background: 'rgba(255,255,255,0.15)', borderRadius: 8 }}
              />
            </div>
          
            <div style={{ maxWidth: 600, margin: '0 auto', display: 'flex', gap: 12 }}>
              <Input.Search 
                size="large" 
                placeholder={activeTab === '低空商城' ? '搜索飞行器、安全设备、通信基站等...' : '搜索无人机、基站、停机坪等采购需求...'} 
                enterButton={activeTab === '低空商城' ? '搜索商品' : '搜索需求'} 
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                style={{ flex: 1 }}
              />
              {activeTab === '低空商城' ? (
                <Button size="large" type="primary" style={{ background: '#52c41a', borderColor: '#52c41a', fontWeight: 600, whiteSpace: 'nowrap' }} onClick={() => handleNavigate('mall-publish')}>
                  发布商品
                </Button>
              ) : (
                <Button size="large" type="primary" style={{ background: '#fa8c16', borderColor: '#fa8c16', fontWeight: 600, whiteSpace: 'nowrap' }} onClick={() => handleNavigate('mall-demand-publish')}>
                  发布采购需求
                </Button>
              )}
            </div>
            <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', marginTop: 8 }}>{activeTab === '低空商城' ? '* 仅认证商家可发布商品' : '* 已完成认证的用户均可发布采购需求'}</p>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: '-40px auto 0', padding: '0 24px 48px', position: 'relative', zIndex: 10 }}>

        {/* ========== 低空商城 ========== */}
        {activeTab === '低空商城' && (<>
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

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <span style={{ fontSize: 16, fontWeight: 600, color: '#1f1f1f' }}>
            {selectedCategory === '全部' ? '全部商品' : selectedCategory}
          </span>
          <span style={{ fontSize: 13, color: '#8c8c8c' }}>共 {filteredProducts.length} 件商品</span>
        </div>

        {filteredProducts.length > 0 ? (
          <Row gutter={[24, 24]}>
            {filteredProducts.map((product) => (
              <Col key={product.id} xs={24} sm={12} lg={8}>
                <Card
                  hoverable
                  style={{ borderRadius: 16, overflow: 'hidden', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}
                  styles={{ body: { padding: 0 } }}
                  onClick={() => handleNavigate('mall-detail')}
                >
                  <div style={{ width: '100%', paddingTop: '56.25%', position: 'relative', background: 'linear-gradient(135deg, #f0f5ff 0%, #e6f4ff 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <ShoppingCartOutlined style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: 48, color: '#1677ff' }} />
                  </div>
                  <div style={{ padding: '20px' }}>
                    <Tag color="purple" style={{ marginBottom: 8 }}>{product.category}</Tag>
                    <h4 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8, color: '#1f1f1f', display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {product.name}
                    </h4>
                    <p style={{ fontSize: 13, color: '#8c8c8c', marginBottom: 16, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {product.desc}
                    </p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: 18, color: '#ff4d4f', fontWeight: 700 }}>{product.price}</span>
                    </div>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        ) : (
          <Card style={{ borderRadius: 12, textAlign: 'center', padding: '48px 0' }}>
            <Empty description="暂无符合条件的商品" />
          </Card>
        )}

        <div style={{ textAlign: 'center', marginTop: 32 }}>
          <Pagination defaultCurrent={1} total={filteredProducts.length * 3} />
        </div>
        </>)}

        {/* ========== 采购需求 ========== */}
        {activeTab === '采购需求' && (<>
        <Row gutter={[12, 12]} style={{ marginBottom: 24 }}>
          {CATEGORIES.map((cat) => (
            <Col xs={8} sm={4} key={cat.key}>
              <div
                onClick={() => setDemandCategory(cat.key)}
                style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
                  padding: '16px 8px', borderRadius: 12, cursor: 'pointer',
                  background: demandCategory === cat.key ? cat.bg : '#fff',
                  border: demandCategory === cat.key ? `2px solid ${cat.color}` : '2px solid transparent',
                  boxShadow: demandCategory === cat.key ? `0 4px 12px ${cat.color}22` : '0 2px 8px rgba(0,0,0,0.04)',
                  transition: 'all 0.25s ease'
                }}
              >
                <div style={{
                  width: 44, height: 44, borderRadius: '50%',
                  background: demandCategory === cat.key ? cat.color : cat.bg,
                  color: demandCategory === cat.key ? '#fff' : cat.color,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22,
                  transition: 'all 0.25s ease'
                }}>
                  {cat.icon}
                </div>
                <span style={{
                  fontSize: 13, fontWeight: demandCategory === cat.key ? 600 : 400,
                  color: demandCategory === cat.key ? cat.color : '#595959'
                }}>
                  {cat.title}
                </span>
              </div>
            </Col>
          ))}
        </Row>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <span style={{ fontSize: 16, fontWeight: 600, color: '#1f1f1f' }}>
            {demandCategory === '全部' ? '全部需求' : demandCategory}
          </span>
          <span style={{ fontSize: 13, color: '#8c8c8c' }}>共 {filteredDemands.length} 条需求</span>
        </div>

        {filteredDemands.length > 0 ? (
          <Row gutter={[24, 24]}>
            {filteredDemands.map((demand) => {
              const statusInfo = STATUS_MAP[demand.status] || STATUS_MAP['进行中'];
              return (
                <Col key={demand.id} xs={24} sm={12} lg={8}>
                  <Card
                    hoverable
                    style={{ borderRadius: 16, overflow: 'hidden', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}
                    styles={{ body: { padding: 0 } }}
                    onClick={() => handleNavigate('mall-demand-detail')}
                  >
                    <div style={{ height: 6, background: DEMAND_GRADIENTS[demand.category] || 'linear-gradient(135deg, #e6f4ff, #bae0ff)' }} />
                    <div style={{ padding: 20 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                        <h4 style={{ fontSize: 16, fontWeight: 700, color: '#1f1f1f', margin: 0, flex: 1, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                          {demand.title}
                        </h4>
                        <Tag color={statusInfo.color} style={{ marginLeft: 8, flexShrink: 0 }}>{demand.status}</Tag>
                      </div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, fontSize: 13, color: '#595959', marginBottom: 12 }}>
                        <span><DollarOutlined style={{ color: '#fa8c16', marginRight: 4 }} />{demand.budget}</span>
                        <span><EnvironmentOutlined style={{ color: '#1677ff', marginRight: 4 }} />{demand.area}</span>
                        <span style={{ display: 'flex', alignItems: 'center' }}><Tag color="purple" style={{ margin: 0 }}>{demand.category}</Tag></span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 12, borderTop: '1px solid #f0f0f0' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                          <Avatar size={20} style={{ background: '#722ed1', fontSize: 10 }}>{demand.publisher.slice(0, 1)}</Avatar>
                          <span style={{ fontSize: 12, color: '#8c8c8c' }}>{demand.company}</span>
                        </div>
                        <div style={{ fontSize: 12, color: '#bfbfbf' }}>
                          <ClockCircleOutlined style={{ marginRight: 4 }} />截止 {demand.deadline}
                        </div>
                      </div>
                    </div>
                  </Card>
                </Col>
              );
            })}
          </Row>
        ) : (
          <Card style={{ borderRadius: 12, textAlign: 'center', padding: '48px 0' }}>
            <Empty description="暂无符合条件的需求" />
          </Card>
        )}

        <div style={{ textAlign: 'center', marginTop: 32 }}>
          <Pagination defaultCurrent={1} total={filteredDemands.length * 3} />
        </div>
        </>)}
      </div>
    </div>
  );
}

const Component = function MallListPage() {
  return <MallLayout defaultTab="低空商城" />;
};

export default Component;
