/**
 * @name 采购需求详情
 * @mode axure
 * /Users/xu/Desktop/元引信息/Axhub-Make-main/skills/axure-export-workflow/SKILL.md
 *
 */

import './style.css';

import React, { useState, useCallback } from 'react';
import { Card, Tag, Breadcrumb, Divider, Row, Col, Descriptions, Button, message, Modal, Form, Input } from 'antd';
import { HomeOutlined, ArrowLeftOutlined, ShoppingOutlined, DollarOutlined, EnvironmentOutlined, ClockCircleOutlined, TeamOutlined, PhoneOutlined, SafetyCertificateOutlined, UserOutlined } from '@ant-design/icons';

var DETAIL = {
  title: '求购 10 台工业级测绘无人机',
  category: '飞行器',
  status: '进行中',
  budget: '50-80万',
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
  { key: 'service-show', label: '低空服务' },
  { key: 'mall-list', label: '低空商城', active: true },
  { key: 'flight-dynamic', label: '飞行服务' },
  { key: 'login', label: '登录' }
];

var Component = function MallDemandDetailPage() {
  var [quoteModalOpen, setQuoteModalOpen] = useState(false);
  var [form] = Form.useForm();
  var handleNavigate = useCallback(function (key: string) {
    window.location.href = '/prototypes/' + key;
  }, []);

  var handleQuoteSubmit = function () {
    form.validateFields().then(function (values) {
      message.success('报价响应已提交！需求方将很快与您线下联系。');
      setQuoteModalOpen(false);
      form.resetFields();
    }).catch(function () {});
  };

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
            </Card>
          </Col>

          <Col xs={24} md={7}>
            <Card style={{ borderRadius: 12, marginBottom: 16 }}>
              <Button type="primary" size="large" block style={{ height: 48, fontSize: 16, marginBottom: 12, background: '#722ed1', borderColor: '#722ed1' }} onClick={function () { setQuoteModalOpen(true); }}>
                响应需求 / 提交报价
              </Button>
              <Button size="large" block style={{ height: 44 }} onClick={function () { message.info('已收藏该需求'); }}>
                收藏需求
              </Button>
            </Card>
            <Card style={{ borderRadius: 12 }}>
              <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>联系方式</div>
              <div style={{ fontSize: 13, lineHeight: 2, color: '#595959' }}>
                <div><TeamOutlined style={{ marginRight: 8, color: '#722ed1' }} />{DETAIL.company}</div>
                <div><UserOutlined style={{ marginRight: 8, color: '#722ed1' }} />{DETAIL.contact}</div>
                <div><PhoneOutlined style={{ marginRight: 8, color: '#722ed1' }} />{DETAIL.phone}</div>
              </div>
            </Card>
          </Col>
        </Row>
      </div>

      <Modal
        title="提交报价与响应"
        open={quoteModalOpen}
        onCancel={function () { setQuoteModalOpen(false); form.resetFields(); }}
        footer={null}
      >
        <div style={{ marginBottom: 16, color: '#595959' }}>
          请简要描述您的方案，留下联系方式，需求方确认后将与您线下对接。
        </div>
        <Form form={form} layout="vertical">
          <Form.Item name="company" label="企业名称" rules={[{ required: true, message: '请输入企业名称' }]}>
            <Input placeholder="请输入您的企业名称" />
          </Form.Item>
          <Form.Item name="contact" label="联系人" rules={[{ required: true, message: '请输入联系人姓名' }]}>
            <Input placeholder="请输入联系人姓名" />
          </Form.Item>
          <Form.Item name="phone" label="联系电话" rules={[{ required: true, message: '请输入联系电话' }]}>
            <Input placeholder="请输入联系电话" />
          </Form.Item>
          <Form.Item name="plan" label="初步方案与报价" rules={[{ required: true, message: '请输入初步方案或报价说明' }]}>
            <Input.TextArea placeholder="请输入您的能提供的产品/服务优势，以及初步报价（选填）" rows={4} />
          </Form.Item>
          <Form.Item style={{ marginBottom: 0, textAlign: 'right' }}>
            <Button onClick={function () { setQuoteModalOpen(false); }} style={{ marginRight: 8 }}>取消</Button>
            <Button type="primary" onClick={handleQuoteSubmit}>确认提交</Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Component;
