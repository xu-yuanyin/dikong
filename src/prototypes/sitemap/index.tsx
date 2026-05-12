/**
 * @name 全站原型导航地图
 * @mode axure
 */

import './style.css';
import React from 'react';
import { Card, Row, Col, Typography, Tag } from 'antd';
import { 
  HomeOutlined, 
  UserOutlined, 
  FileTextOutlined, 
  ShoppingOutlined, 
  AppstoreOutlined, 
  RocketOutlined, 
  SafetyCertificateOutlined, 
  SettingOutlined,
  CompassOutlined
} from '@ant-design/icons';

const { Title, Text } = Typography;

const DIRECTORY = [
  {
    title: '门户 (Portal)',
    icon: <HomeOutlined style={{ color: '#1677ff' }} />,
    links: [
      { key: 'home', label: '首页' },
      { key: 'login', label: '登录/注册' },
      { key: 'forgot-password', label: '忘记密码' },
    ]
  },
  {
    title: '个人中心 (User Center)',
    icon: <UserOutlined style={{ color: '#eb2f96' }} />,
    links: [
      { key: 'profile-uncertified', label: '个人中心 (未认证)' },
      { key: 'profile-pending', label: '个人中心 (认证审核中)' },
      { key: 'profile-rejected', label: '个人中心 (认证失败)' },
      { key: 'profile-certified', label: '个人中心 (认证成功)' },
      { key: 'role-management', label: '角色管理 / 我的角色' },
    ]
  },
  {
    title: '资讯公告与政策 (News & Policy)',
    icon: <FileTextOutlined style={{ color: '#fa8c16' }} />,
    links: [
      { key: 'news', label: '资讯公告' },
      { key: 'news-detail', label: '新闻资讯详情' },
      { key: 'notice-detail', label: '通知公告详情' },
      { key: 'policy-national', label: '国家政策' },
      { key: 'policy-national-detail', label: '国家政策详情' },
      { key: 'policy-local', label: '本地政策' },
      { key: 'policy-local-detail', label: '本地政策详情' },
      { key: 'policy-interpretation', label: '政策解读' },
      { key: 'policy-interpretation-detail', label: '政策解读详情' },
    ]
  },
  {
    title: '低空商城与需求 (Mall & Demand)',
    icon: <ShoppingOutlined style={{ color: '#fadb14' }} />,
    links: [
      { key: 'mall-list', label: '商城首页' },
      { key: 'mall-detail', label: '商品详情' },
      { key: 'mall-publish', label: '发布商品 (商户)' },
      { key: 'my-goods', label: '我的商品 (商户)' },
      { key: 'mall-demand', label: '商品需求大厅' },
      { key: 'mall-demand-detail', label: '商品需求详情' },
      { key: 'demand-publish', label: '发布需求' },
      { key: 'my-demand', label: '我的商品需求' },
      { key: 'my-intention', label: '发出的采购意向' },
      { key: 'provider-intentions', label: '收到的采购意向 (商户)' },
    ]
  },
  {
    title: '低空服务 (Services)',
    icon: <AppstoreOutlined style={{ color: '#52c41a' }} />,
    links: [
      { key: 'service-show', label: '服务展示 (低空服务门户)' },
      { key: 'service-list', label: '服务大厅' },
      { key: 'service-detail', label: '服务详情' },
      { key: 'service-category-detail', label: '服务类目详情' },
      { key: 'service-publish', label: '发布服务项目 (服务商)' },
      { key: 'my-service', label: '我的服务 (服务商)' },
      { key: 'service-demand', label: '服务需求大厅' },
      { key: 'my-service-demand', label: '我的服务需求' },
      { key: 'provider-orders', label: '收到的服务工单 (服务商)' },
    ]
  },
  {
    title: '飞行服务 (Flight)',
    icon: <RocketOutlined style={{ color: '#722ed1' }} />,
    links: [
      { key: 'flight-dynamic', label: '飞行动态 / 服务首页' },
      { key: 'flight-airspace', label: '空域申请' },
      { key: 'flight-airspace-detail', label: '空域详情' },
      { key: 'flight-airspace-detail-2', label: '空域详情 (变体2)' },
      { key: 'my-aircraft', label: '我的飞行器' },
      { key: 'register-aircraft', label: '登记飞行器' },
      { key: 'my-flight-plan', label: '我的飞行计划' },
      { key: 'register-flight-plan', label: '申报飞行计划' },
      { key: 'flight-weather', label: '航空气象' },
    ]
  },
  {
    title: '规范标准与其他 (Standards & Messages)',
    icon: <SafetyCertificateOutlined style={{ color: '#13c2c2' }} />,
    links: [
      { key: 'standard-list', label: '规范标准列表' },
      { key: 'standard-detail', label: '规范标准详情' },
      { key: 'message-center', label: '消息中心' },
      { key: 'message-detail', label: '消息详情' },
    ]
  },
  {
    title: '后台管理系统 (Admin Center)',
    icon: <SettingOutlined style={{ color: '#2f54eb' }} />,
    links: [
      { key: 'admin-news', label: '资讯公告管理' },
      { key: 'admin-policy', label: '政策法规管理' },
      { key: 'admin-standard', label: '规范标准管理' },
      { key: 'admin-cert', label: '角色认证审批' },
      { key: 'admin-role', label: '角色权限配置' },
      { key: 'admin-airspace', label: '空域与航线管理' },
      { key: 'admin-aircraft', label: '飞行器登记审批' },
      { key: 'admin-flight-plan', label: '飞行计划审批' },
      { key: 'admin-service', label: '低空服务违规下架监管' },
      { key: 'admin-mall', label: '低空商城违规下架监管' },
      { key: 'admin-demand', label: '需求大厅违规屏蔽监管' },
      { key: 'admin-carousel', label: '首页轮播图管理' },
      { key: 'admin-system-user', label: '平台系统内部账号管理' },
    ]
  }
];

const handleNavigate = (key: string) => {
  window.open(`/prototypes/${key}`, '_blank'); // Open in new tab so they don't lose the index
};

export default function SitemapPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#f5f5f5' }}>
      {/* 门户统一头部导航 */}
      <header style={{ background: 'linear-gradient(135deg, #0c4a6e 0%, #eb2f96 100%)', padding: '0 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }} onClick={() => handleNavigate('home')}>
            <SafetyCertificateOutlined style={{ fontSize: 20, color: '#fff' }} />
            <span style={{ fontSize: 16, fontWeight: 600, color: '#fff' }}>区域低空公共服务平台 - 导航地图</span>
          </div>
          <div style={{ display: 'flex', gap: 16 }}>
            <a style={{ color: 'rgba(255,255,255,0.85)', cursor: 'pointer' }} onClick={() => handleNavigate('home')}>返回首页</a>
            <a style={{ color: 'rgba(255,255,255,0.85)', cursor: 'pointer' }} onClick={() => handleNavigate('news')}>资讯公告</a>
            <a style={{ color: 'rgba(255,255,255,0.85)', cursor: 'pointer' }} onClick={() => handleNavigate('policy-national')}>政策法规</a>
            <a style={{ color: 'rgba(255,255,255,0.85)', cursor: 'pointer' }} onClick={() => handleNavigate('service-show')}>低空服务</a>
            <a style={{ color: 'rgba(255,255,255,0.85)', cursor: 'pointer' }} onClick={() => handleNavigate('mall-list')}>低空商城</a>
            <a style={{ color: 'rgba(255,255,255,0.85)', cursor: 'pointer' }} onClick={() => handleNavigate('flight-dynamic')}>飞行服务</a>
            <a style={{ color: 'rgba(255,255,255,0.85)', cursor: 'pointer' }} onClick={() => handleNavigate('profile-certified')}>个人中心</a>
          </div>
        </div>
      </header>

      <div style={{ padding: '40px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <CompassOutlined style={{ fontSize: 48, color: '#1677ff', marginBottom: 16 }} />
          <Title level={2} style={{ margin: 0 }}>区域低空公共服务平台 - 原型地图</Title>
          <Text type="secondary" style={{ fontSize: 16, display: 'block', marginTop: 8 }}>
            全站页面索引目录，点击任意卡片即可在新窗口预览该原型页面
          </Text>
        </div>

        <Row gutter={[24, 24]}>
          {DIRECTORY.map((group, index) => (
            <Col xs={24} sm={12} lg={8} xl={6} key={index}>
              <Card 
                className="sitemap-card"
                title={
                  <span style={{ fontSize: 16, fontWeight: 600 }}>
                    <span style={{ marginRight: 8, fontSize: 18 }}>{group.icon}</span>
                    {group.title}
                  </span>
                }
                variant="borderless"
                styles={{
                  header: { borderBottom: '1px solid #f0f0f0', padding: '0 16px' },
                  body: { padding: '16px' }
                }}
              >
                <div>
                  {group.links.map(link => (
                    <div 
                      key={link.key} 
                      className="sitemap-link"
                      onClick={() => handleNavigate(link.key)}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span>{link.label}</span>
                        <Tag color="default" style={{ margin: 0, fontSize: 10 }}>{link.key}</Tag>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </Col>
          ))}
        </Row>
        
        <div style={{ textAlign: 'center', marginTop: 48, color: '#8c8c8c' }}>
          <Text type="secondary">Generated by Antigravity AI @ {new Date().toLocaleDateString()}</Text>
        </div>

      </div>
      </div>
    </div>
  );
}
