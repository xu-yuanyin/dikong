/**
 * @name 商城
 * @mode axure
 * /Users/xu/Desktop/元引信息/Axhub-Make-main/skills/axure-export-workflow/SKILL.md
 *
 */

import './style.css';

import React, { useState, useCallback } from 'react';
import { Card, Tag, Input, Row, Col, Pagination, Breadcrumb, Tabs, Button, Rate } from 'antd';
import { SearchOutlined, HomeOutlined, ShoppingOutlined, ShoppingCartOutlined } from '@ant-design/icons';

const PRODUCTS = [
  { id: 1, name: '工业级无人机 DJI Matrice 350 RTK', category: '飞行器', price: '¥68,800', rating: 4.8, sales: 326, desc: '专业测绘巡检无人机，55分钟续航', hot: true },
  { id: 2, name: 'eVTOL载人飞行器 EH216-S', category: '飞行器', price: '¥2,380,000', rating: 4.5, sales: 12, desc: '载人级自动驾驶飞行器，适航认证', hot: true },
  { id: 3, name: '无人机反制系统 UAD-2000', category: '安全设备', price: '¥128,000', rating: 4.6, sales: 89, desc: '多频段无人机侦测反制一体机', hot: false },
  { id: 4, name: '低空通信基站 LA-COM500', category: '通信设备', price: '¥45,000', rating: 4.3, sales: 156, desc: '5G+北斗双模低空通信基站', hot: false },
  { id: 5, name: '飞行模拟训练系统 FS-Pro', category: '培训设备', price: '¥86,000', rating: 4.7, sales: 67, desc: '全场景无人机飞行模拟训练平台', hot: true },
  { id: 6, name: '智能停机坪 SmartPad-M', category: '基础设施', price: '¥32,000', rating: 4.4, sales: 203, desc: '自动充电/收纳智能停机坪', hot: false }
];

const CATEGORIES = ['全部', '飞行器', '安全设备', '通信设备', '培训设备', '基础设施'];

const Component = function MallListPage() {
  const [selectedCategory, setSelectedCategory] = useState('全部');
  const [searchText, setSearchText] = useState('');

  const handleNavigate = useCallback(function (key: string) {
    const baseUrl = window.location.origin;
    window.location.href = '/prototypes/' + key;
  }, []);

  const filteredProducts = PRODUCTS.filter(function (p) {
    const matchCategory = selectedCategory === '全部' || p.category === selectedCategory;
    const matchSearch = !searchText || p.name.includes(searchText);
    return matchCategory && matchSearch;
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
            <a style={{ color: 'rgba(255,255,255,0.85)', cursor: 'pointer' }} onClick={function () { handleNavigate('home'); }}>首页</a>
            <a style={{ color: 'rgba(255,255,255,0.85)', cursor: 'pointer' }} onClick={function () { handleNavigate('news'); }}>资讯公告</a>
            <a style={{ color: 'rgba(255,255,255,0.85)', cursor: 'pointer' }} onClick={function () { handleNavigate('policy-national'); }}>政策法规</a>
            <a style={{ color: 'rgba(255,255,255,0.85)', cursor: 'pointer' }} onClick={function () { handleNavigate('service-list'); }}>低空服务</a>
            <a style={{ color: '#fff', fontWeight: 600, cursor: 'pointer' }}>低空商城</a>
            <a style={{ color: 'rgba(255,255,255,0.85)', cursor: 'pointer' }} onClick={function () { handleNavigate('flight-dynamic'); }}>飞行服务</a>
            <a style={{ color: 'rgba(255,255,255,0.85)', cursor: 'pointer' }} onClick={function () { handleNavigate('login'); }}>登录</a>
          </div>
        </div>
      </header>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px 24px 48px' }}>
        <Breadcrumb items={[
          { title: <a onClick={function () { handleNavigate('home'); }}><HomeOutlined /> 首页</a> },
          { title: '低空商城' },
          { title: '商城清单' }
        ]} style={{ marginBottom: 24 }} />

        <Card style={{ borderRadius: 12, marginBottom: 24 }}>
          <Tabs
            defaultActiveKey="list"
            items={[
              { key: 'list', label: '商城' }
            ]}
            tabBarExtraContent={
              <div style={{ display: 'flex', gap: 8 }}>
                <Button icon={<ShoppingOutlined />} onClick={function () { handleNavigate('mall-publish'); }}>发布商品</Button>
                <Button onClick={function () { handleNavigate('mall-demand'); }}>采购需求</Button>
                <Button type="primary" ghost onClick={function () { handleNavigate('my-goods'); }}>商家中心</Button>
              </div>
            }
          />
          <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap', marginTop: 8 }}>
            <Input
              prefix={<SearchOutlined />}
              placeholder="搜索产品..."
              value={searchText}
              onChange={function (e) { setSearchText(e.target.value); }}
              style={{ width: 280 }}
              allowClear
            />
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {CATEGORIES.map(function (cat) {
                return (
                  <Tag
                    key={cat}
                    color={selectedCategory === cat ? '#722ed1' : undefined}
                    style={{ cursor: 'pointer', padding: '4px 12px', fontSize: 13 }}
                    onClick={function () { setSelectedCategory(cat); }}
                  >
                    {cat}
                  </Tag>
                );
              })}
            </div>
          </div>
        </Card>

        <Row gutter={[24, 24]}>
          {filteredProducts.map(function (product) {
            return (
              <Col key={product.id} xs={24} md={12} lg={8}>
                <Card hoverable style={{ borderRadius: 12, height: '100%' }} cover={<div style={{ height: 160, background: 'linear-gradient(135deg, #f0f5ff 0%, #e6f4ff 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '12px 12px 0 0', cursor: 'pointer' }} onClick={function () { handleNavigate('mall-detail'); }}><ShoppingCartOutlined style={{ fontSize: 48, color: '#1677ff' }} /></div>} onClick={function () { handleNavigate('mall-detail'); }}>
                  {product.hot && <Tag color="red" style={{ position: 'absolute', top: 12, right: 12 }}>热销</Tag>}
                  <Tag color="purple">{product.category}</Tag>
                  <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 8, color: '#1f1f1f', marginTop: 8 }}>{product.name}</h3>
                  <p style={{ fontSize: 13, color: '#8c8c8c', marginBottom: 12 }}>{product.desc}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                    <span style={{ fontSize: 18, fontWeight: 700, color: '#ff4d4f' }}>{product.price}</span>
                    <span style={{ fontSize: 12, color: '#8c8c8c' }}>已售 {product.sales}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Rate disabled defaultValue={product.rating} allowHalf style={{ fontSize: 12 }} />
                    <Button type="primary" size="small" onClick={function () { handleNavigate('mall-intention'); }}>采购意向</Button>
                  </div>
                </Card>
              </Col>
            );
          })}
        </Row>

        <div style={{ textAlign: 'center', marginTop: 32 }}>
          <Pagination defaultCurrent={1} total={30} />
        </div>
      </div>
    </div>
  );
};

export default Component;
