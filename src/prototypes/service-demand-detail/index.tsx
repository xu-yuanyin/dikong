/**
 * @name 服务需求详情
 * @mode axure
 */

import './style.css';

import React, { useCallback } from 'react';
import { Card, Tag, Breadcrumb, Divider, Row, Col, Descriptions, Button, message } from 'antd';
import { HomeOutlined, ArrowLeftOutlined, FileTextOutlined, DollarOutlined, ClockCircleOutlined, EnvironmentOutlined, PhoneOutlined, UserOutlined, SafetyCertificateOutlined, FormOutlined, CalendarOutlined } from '@ant-design/icons';

var DETAIL = {
  title: '某产业园区需要航拍宣传片拍摄',
  category: '航拍摄影',
  status: '征集中',
  budget: '¥5,000-10,000',
  area: '郑州市高新区',
  publisher: '张经理',
  phone: '138-0000-6666',
  company: '郑州高新技术产业开发区管委会',
  publishDate: '2026-05-10',
  deadline: '2026-06-01',
  desc: '因园区招商宣传需要，现面向社会征集航拍服务商，需航拍整体鸟瞰图及重点楼宇特写镜头，用于制作园区宣传片。要求拍摄画质不低于4K，飞手须持有合法资质证书，具备相关航拍经验。',
  requirements: [
    '拍摄画质不低于4K分辨率',
    '需提供园区整体鸟瞰图和重点楼宇特写镜头',
    '飞手须持有CAAC/AOPA驾驶员执照',
    '需提供近一年内类似项目的案例参考',
    '交付物包含原始素材及初步剪辑成片',
    '作业期间须购买第三方责任险',
    '服务周期不超过5个工作日'
  ]
};

var PORTAL_NAV = [
  { key: 'home', label: '首页' },
  { key: 'news', label: '资讯公告' },
  { key: 'policy-national', label: '政策法规' },
  { key: 'service-list', label: '低空服务' },
  { key: 'mall-list', label: '低空商城' },
  { key: 'flight-dynamic', label: '飞行服务' },
  { key: 'login', label: '登录' }
];

var Component = function ServiceDemandDetailPage() {
  var handleNavigate = useCallback(function (key: string) {
    window.location.href = '/prototypes/' + key;
  }, []);

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
              return <a key={nav.key} style={{ color: nav.key === 'service-list' ? '#fff' : 'rgba(255,255,255,0.85)', fontWeight: nav.key === 'service-list' ? 600 : 400, cursor: 'pointer' }} onClick={function () { handleNavigate(nav.key); }}>{nav.label}</a>;
            })}
          </div>
        </div>
      </header>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px 24px 48px' }}>
        <Breadcrumb items={[
          { title: <a onClick={function () { handleNavigate('home'); }}><HomeOutlined /> 首页</a> },
          { title: <a onClick={function () { handleNavigate('service-list'); }}>低空服务大厅</a> },
          { title: <a onClick={function () { handleNavigate('service-list'); }}>需求大厅</a> },
          { title: DETAIL.title }
        ]} style={{ marginBottom: 24 }} />

        <Row gutter={24}>
          <Col xs={24} md={17}>
            <Card style={{ borderRadius: 12 }}>
              <div style={{ marginBottom: 16 }}>
                <a onClick={function () { handleNavigate('service-list'); }} style={{ color: '#1677ff', cursor: 'pointer', fontSize: 13 }}>
                  <ArrowLeftOutlined /> 返回需求大厅
                </a>
              </div>

              <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
                <Tag color="blue">{DETAIL.category}</Tag>
                <Tag color={DETAIL.status === '征集中' ? 'green' : 'default'}>{DETAIL.status}</Tag>
              </div>

              <h1 style={{ fontSize: 22, fontWeight: 700, lineHeight: 1.4, marginBottom: 16 }}>{DETAIL.title}</h1>

              <Descriptions column={2} bordered style={{ marginBottom: 20 }}>
                <Descriptions.Item label="预算范围"><span style={{ color: '#ff4d4f', fontWeight: 600, fontSize: 16 }}>{DETAIL.budget}</span></Descriptions.Item>
                <Descriptions.Item label="服务区域"><EnvironmentOutlined style={{ marginRight: 4, color: '#1677ff' }} />{DETAIL.area}</Descriptions.Item>
                <Descriptions.Item label="截止日期"><ClockCircleOutlined style={{ marginRight: 4, color: '#fa8c16' }} />{DETAIL.deadline}</Descriptions.Item>
                <Descriptions.Item label="发布日期"><CalendarOutlined style={{ marginRight: 4 }} />{DETAIL.publishDate}</Descriptions.Item>
                <Descriptions.Item label="需求方" span={2}>{DETAIL.company}</Descriptions.Item>
              </Descriptions>

              <Divider>需求描述</Divider>
              <p style={{ fontSize: 15, lineHeight: 1.8, color: '#595959', marginBottom: 20 }}>{DETAIL.desc}</p>

              <Divider>具体要求</Divider>
              <div style={{ marginBottom: 20 }}>
                {DETAIL.requirements.map(function (r, idx) {
                  return <p key={idx} style={{ fontSize: 14, lineHeight: 2, margin: 0, paddingLeft: 8 }}>• {r}</p>;
                })}
              </div>

              <div style={{ background: '#fffbe6', padding: 16, borderRadius: 8, border: '1px solid #ffe58f', marginTop: 16 }}>
                <div style={{ fontSize: 13, color: '#ad8b00', fontWeight: 500 }}>
                  <SafetyCertificateOutlined style={{ marginRight: 4 }} />
                  温馨提示：本平台仅提供需求信息展示服务，具体合作细节请与需求方线下沟通确认。
                </div>
              </div>
            </Card>
          </Col>

          <Col xs={24} md={7}>
            {/* 醒目联系方式卡片 */}
            <Card style={{ borderRadius: 12, marginBottom: 16, border: '2px solid #1677ff' }}>
              <div style={{ textAlign: 'center', marginBottom: 16 }}>
                <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'linear-gradient(135deg, #1677ff, #4096ff)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
                  <PhoneOutlined style={{ fontSize: 28, color: '#fff' }} />
                </div>
                <div style={{ fontSize: 16, fontWeight: 700, color: '#1f1f1f', marginBottom: 4 }}>联系需求方</div>
                <div style={{ fontSize: 13, color: '#8c8c8c' }}>如您可提供相关服务，请直接联系</div>
              </div>

              <div style={{ background: '#e6f4ff', padding: 16, borderRadius: 8, marginBottom: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                  <UserOutlined style={{ color: '#1677ff', fontSize: 16 }} />
                  <span style={{ fontSize: 13, color: '#8c8c8c' }}>联系人</span>
                </div>
                <div style={{ fontSize: 18, fontWeight: 700, color: '#1f1f1f', paddingLeft: 24 }}>{DETAIL.publisher}</div>
              </div>

              <div style={{ background: '#f6ffed', padding: 16, borderRadius: 8, marginBottom: 16 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                  <PhoneOutlined style={{ color: '#52c41a', fontSize: 16 }} />
                  <span style={{ fontSize: 13, color: '#8c8c8c' }}>联系电话</span>
                </div>
                <div style={{ fontSize: 22, fontWeight: 800, color: '#1677ff', paddingLeft: 24, letterSpacing: 1 }}>{DETAIL.phone}</div>
              </div>

              <Button type="primary" size="large" block style={{ height: 48, fontSize: 16, borderRadius: 8 }} onClick={function () { message.success('已复制联系电话到剪贴板'); }}>
                复制联系电话
              </Button>
            </Card>

            <Card style={{ borderRadius: 12 }}>
              <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>需求方信息</div>
              <div style={{ fontSize: 13, lineHeight: 2.2, color: '#595959' }}>
                <div><SafetyCertificateOutlined style={{ marginRight: 8, color: '#52c41a' }} />已完成实名认证</div>
                <div><FormOutlined style={{ marginRight: 8, color: '#1677ff' }} />{DETAIL.company}</div>
                <div><CalendarOutlined style={{ marginRight: 8, color: '#8c8c8c' }} />发布于 {DETAIL.publishDate}</div>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Component;
