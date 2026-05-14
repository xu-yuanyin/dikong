/**
 * @name 采购需求详情
 * @mode axure
 * /Users/xu/Desktop/元引信息/Axhub-Make-main/skills/axure-export-workflow/SKILL.md
 *
 */

import './style.css';

import React, { useState, useCallback } from 'react';
import { Card, Tag, Breadcrumb, Divider, Row, Col, Descriptions, Button, message } from 'antd';
import { HomeOutlined, ArrowLeftOutlined, ShoppingOutlined, DollarOutlined, EnvironmentOutlined, ClockCircleOutlined, TeamOutlined, PhoneOutlined, SafetyCertificateOutlined, UserOutlined, FormOutlined, CalendarOutlined } from '@ant-design/icons';

var DETAIL = {
  title: '求购 10 台工业级测绘无人机',
  category: '飞行器',
  status: '进行中',
  budget: '¥50-80万',
  area: '全市',
  deadline: '2026-05-31',
  company: 'XX测绘工程有限公司',
  contact: '张经理',
  phone: '138****5678',
  time: '2026-04-20',
  desc: '因公司业务扩展需要，现面向社会公开采购 10 台工业级测绘无人机，要求具备 RTK 厘米级定位能力，续航不低于 45 分钟，支持全画幅相机和激光雷达双负载挂载。',
  requirements: [
    '1. 具备 RTK 厘米级定位精度',
    '2. 续航时间不低于 45 分钟',
    '3. 抗风等级不低于 6 级',
    '4. 支持全画幅相机 + 激光雷达双负载',
    '5. 防护等级不低于 IP54',
    '6. 提供完整售后服务方案',
    '7. 交货期不超过 30 个工作日'
  ],
  qualification: [
    '供应商须为合法注册企业，具备相关经营资质',
    '产品须通过民航局适航认证或等同认证',
    '近三年内无重大质量投诉和安全事故',
    '能够提供本地化技术支持和培训服务'
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

var Component = function MallDemandDetailPage() {
  var handleNavigate = useCallback(function (key: string) {
    window.location.href = '/prototypes/' + key;
  }, []);

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
          { title: <a onClick={function () { handleNavigate('mall-demand'); }}>采购需求</a> },
          { title: DETAIL.title }
        ]} style={{ marginBottom: 24 }} />

        <Row gutter={24}>
          <Col xs={24} md={17}>
            <Card style={{ borderRadius: 12 }}>
              <div style={{ marginBottom: 16 }}>
                <a onClick={function () { handleNavigate('mall-demand'); }} style={{ color: '#722ed1', cursor: 'pointer', fontSize: 13 }}>
                  <ArrowLeftOutlined /> 返回采购需求列表
                </a>
              </div>

              <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
                <Tag color="purple">{DETAIL.category}</Tag>
                <Tag color="blue">{DETAIL.status}</Tag>
              </div>

              <h1 style={{ fontSize: 22, fontWeight: 700, lineHeight: 1.4, marginBottom: 16 }}>{DETAIL.title}</h1>

              <Descriptions column={2} bordered style={{ marginBottom: 20 }}>
                <Descriptions.Item label="预算范围"><span style={{ color: '#ff4d4f', fontWeight: 600 }}>{DETAIL.budget}</span></Descriptions.Item>
                <Descriptions.Item label="需求区域">{DETAIL.area}</Descriptions.Item>
                <Descriptions.Item label="截止日期">{DETAIL.deadline}</Descriptions.Item>
                <Descriptions.Item label="发布时间">{DETAIL.time}</Descriptions.Item>
                <Descriptions.Item label="采购单位" span={2}>{DETAIL.company}</Descriptions.Item>
              </Descriptions>

              <Divider>需求描述</Divider>
              <p style={{ fontSize: 15, lineHeight: 1.8, color: '#595959', marginBottom: 20 }}>{DETAIL.desc}</p>

              <Divider>技术要求</Divider>
              <div style={{ marginBottom: 20 }}>
                {DETAIL.requirements.map(function (r, idx) {
                  return <p key={idx} style={{ fontSize: 14, lineHeight: 2, margin: 0 }}>{r}</p>;
                })}
              </div>

              <Divider>供应商资质要求</Divider>
              <div>
                {DETAIL.qualification.map(function (q, idx) {
                  return <p key={idx} style={{ fontSize: 14, lineHeight: 2, margin: 0 }}>{q}</p>;
                })}
              </div>
              <div style={{ background: '#fffbe6', padding: 16, borderRadius: 8, border: '1px solid #ffe58f', marginTop: 16 }}>
                <div style={{ fontSize: 13, color: '#ad8b00', fontWeight: 500 }}>
                  <SafetyCertificateOutlined style={{ marginRight: 4 }} />
                  温馨提示：本平台仅提供采购信息展示服务，具体合作细节与交易请与采购方线下沟通确认。
                </div>
              </div>
            </Card>
          </Col>

          <Col xs={24} md={7}>
            {/* 醒目联系方式卡片 */}
            <Card style={{ borderRadius: 12, marginBottom: 16, border: '2px solid #722ed1' }}>
              <div style={{ textAlign: 'center', marginBottom: 16 }}>
                <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'linear-gradient(135deg, #722ed1, #9254de)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
                  <PhoneOutlined style={{ fontSize: 28, color: '#fff' }} />
                </div>
                <div style={{ fontSize: 16, fontWeight: 700, color: '#1f1f1f', marginBottom: 4 }}>联系采购方</div>
                <div style={{ fontSize: 13, color: '#8c8c8c' }}>如您可提供相关商品，请直接联系</div>
              </div>

              <div style={{ background: '#f9f0ff', padding: 16, borderRadius: 8, marginBottom: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                  <UserOutlined style={{ color: '#722ed1', fontSize: 16 }} />
                  <span style={{ fontSize: 13, color: '#8c8c8c' }}>联系人</span>
                </div>
                <div style={{ fontSize: 18, fontWeight: 700, color: '#1f1f1f', paddingLeft: 24 }}>{DETAIL.contact}</div>
              </div>

              <div style={{ background: '#f6ffed', padding: 16, borderRadius: 8, marginBottom: 16 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                  <PhoneOutlined style={{ color: '#52c41a', fontSize: 16 }} />
                  <span style={{ fontSize: 13, color: '#8c8c8c' }}>联系电话</span>
                </div>
                <div style={{ fontSize: 22, fontWeight: 800, color: '#722ed1', paddingLeft: 24, letterSpacing: 1 }}>{DETAIL.phone}</div>
              </div>

              <Button type="primary" size="large" block style={{ height: 48, fontSize: 16, borderRadius: 8, background: '#722ed1', borderColor: '#722ed1' }} onClick={function () { message.success('已复制联系电话到剪贴板'); }}>
                复制联系电话
              </Button>
            </Card>

            <Card style={{ borderRadius: 12 }}>
              <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>采购方信息</div>
              <div style={{ fontSize: 13, lineHeight: 2.2, color: '#595959' }}>
                <div><SafetyCertificateOutlined style={{ marginRight: 8, color: '#52c41a' }} />已完成实名认证</div>
                <div><FormOutlined style={{ marginRight: 8, color: '#722ed1' }} />{DETAIL.company}</div>
                <div><CalendarOutlined style={{ marginRight: 8, color: '#8c8c8c' }} />发布于 {DETAIL.time}</div>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Component;
