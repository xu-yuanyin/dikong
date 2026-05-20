/**
 * @name 需求发布
 * @mode axure
 * /Users/xu/Desktop/元引信息/Axhub-Make-main/skills/axure-export-workflow/SKILL.md
 *
 */

import './style.css';

import React, { useState, useCallback } from 'react';
import { Card, Form, Input, Select, Button, Breadcrumb, message, Row, Col, DatePicker } from 'antd';
import { HomeOutlined, FileTextOutlined, ArrowLeftOutlined, PhoneOutlined, UserOutlined, EditOutlined, CompassOutlined, ShoppingOutlined } from '@ant-design/icons';

var PRODUCT_OPTIONS = [
  { value: 'uav', label: '工业级无人机' },
  { value: 'evtol', label: 'eVTOL载人飞行器' },
  { value: 'security', label: '安全设备' },
  { value: 'communication', label: '通信设备' },
  { value: 'training', label: '培训设备' },
  { value: 'infrastructure', label: '基础设施' },
  { value: 'other', label: '其他' }
];

var BUDGET_OPTIONS = [
  { value: 'negotiable', label: '面议' },
  { value: 'low', label: '¥1,000以下' },
  { value: 'mid', label: '¥1,000-5,000' },
  { value: 'high', label: '¥5,000-20,000' },
  { value: 'premium', label: '¥20,000以上' }
];

var AREA_OPTIONS = [
  { value: 'all', label: '全市' },
  { value: 'main', label: '主城区' },
  { value: 'suburb', label: '郊区' },
  { value: 'province', label: '全省' }
];

var PORTAL_NAV = [
  { key: 'home', label: '首页' },
  { key: 'news', label: '资讯公告' },
  { key: 'policy-national', label: '政策法规' },
  { key: 'service-list', label: '低空服务' },
  { key: 'mall-list', label: '低空商城', active: true },
  { key: 'flight-dynamic', label: '飞行服务' },
  { key: 'login', label: '登录' }
];

var Component = function MallDemandPublishPage() {
  var [form] = Form.useForm();
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
              return <a key={nav.key} style={{ color: 'rgba(255,255,255,0.85)', cursor: 'pointer' }} onClick={function () { handleNavigate(nav.key); }}>{nav.label}</a>;
            })}
          </div>
        </div>
      </header>

      <div style={{ maxWidth: 800, margin: '0 auto', padding: '24px 24px 48px' }}>
        <Breadcrumb items={[
          { title: <a onClick={function () { handleNavigate('home'); }}><HomeOutlined /> 首页</a> },
          { title: <a onClick={function () { handleNavigate('mall-demand'); }}>采购需求</a> },
          { title: '发布采购需求' }
        ]} style={{ marginBottom: 20 }} />

        <a onClick={function () { handleNavigate('mall-demand'); }} style={{ color: '#722ed1', cursor: 'pointer', fontSize: 13, display: 'inline-flex', alignItems: 'center', gap: 4, marginBottom: 16 }}>
          <ArrowLeftOutlined /> 返回采购需求列表
        </a>

        <Card style={{ borderRadius: 12 }}>
          <div style={{ textAlign: 'center', marginBottom: 24 }}>
            <EditOutlined style={{ fontSize: 32, color: '#722ed1', marginBottom: 8 }} />
            <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 4 }}>发布采购需求</h2>
            <p style={{ fontSize: 13, color: '#8c8c8c' }}>描述您的低空设备采购需求，让优质供应商主动联系您</p>
          </div>

          <Form form={form} layout="vertical">
            <Form.Item name="title" label="采购标题" rules={[{ required: true, message: '请输入采购标题' }]}>
              <Input size="large" placeholder="如：求购10台工业级测绘无人机" />
            </Form.Item>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item name="type" label="产品类型" rules={[{ required: true, message: '请选择产品类型' }]}>
                  <Select size="large" placeholder="请选择产品类型" options={PRODUCT_OPTIONS} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="area" label="服务区域" rules={[{ required: true, message: '请输入服务区域' }]}>
                  <Input size="large" placeholder="请输入期望的服务区域（如：高新区、全市等）" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item name="budget" label="预算范围" rules={[{ required: true, message: '请选择预算' }]}>
                  <Select size="large" placeholder="请选择预算范围" options={BUDGET_OPTIONS} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="deadline" label="截止日期" rules={[{ required: true, message: '请选择截止日期' }]}>
                  <DatePicker size="large" style={{ width: '100%' }} placeholder="请选择截止日期" />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item name="desc" label="需求描述" rules={[{ required: true, message: '请输入需求描述' }]}>
              <Input.TextArea rows={4} placeholder="请详细描述您的需求，包括具体要求、使用场景、期望交付物等" />
            </Form.Item>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item name="contact" label="联系人" rules={[{ required: true, message: '请输入联系人' }]}>
                  <Input size="large" prefix={<UserOutlined />} placeholder="联系人姓名" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="phone" label="联系电话" rules={[{ required: true, message: '请输入联系电话' }]}>
                  <Input size="large" prefix={<PhoneOutlined />} placeholder="联系电话" />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item>
              <div style={{ display: 'flex', gap: 12 }}>
                <Button size="large" onClick={function () { handleNavigate('mall-demand'); }}>关闭</Button>
                <Button type="primary" size="large" style={{ flex: 1, background: '#722ed1', borderColor: '#722ed1' }} onClick={function () {
                  form.validateFields().then(function () { message.success('采购需求提交成功，正在等待平台审核！'); setTimeout(function () { handleNavigate('my-demand'); }, 1500); }).catch(function () {});
                }}>发布采购需求</Button>
              </div>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default Component;
