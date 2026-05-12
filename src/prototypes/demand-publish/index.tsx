/**
 * @name 需求发布
 * @mode axure
 * /Users/xu/Desktop/元引信息/Axhub-Make-main/skills/axure-export-workflow/SKILL.md
 *
 */

import './style.css';

import React, { useState, useCallback } from 'react';
import { Card, Form, Input, Select, Button, Breadcrumb, message, Row, Col, DatePicker } from 'antd';
import { HomeOutlined, FileTextOutlined, ArrowLeftOutlined, PhoneOutlined, UserOutlined, EditOutlined, CompassOutlined } from '@ant-design/icons';

var DEMAND_TYPES = [
  { value: 'tourism', label: '低空旅游' },
  { value: 'training', label: '飞行培训' },
  { value: 'aircraft_buy', label: '飞行器购买咨询' },
  { value: 'aircraft_repair', label: '维修保养' },
  { value: 'inspection', label: '巡检服务' },
  { value: 'aerial_photo', label: '航拍摄影' },
  { value: 'logistics', label: '物流配送' },
  { value: 'insurance', label: '保险咨询' },
  { value: 'other', label: '其他需求' }
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
  { key: 'service-show', label: '低空服务' },
  { key: 'mall-list', label: '低空商城' },
  { key: 'flight-dynamic', label: '飞行服务' },
  { key: 'login', label: '登录' }
];

var Component = function DemandPublishPage() {
  var [form] = Form.useForm();
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
              return <a key={nav.key} style={{ color: 'rgba(255,255,255,0.85)', cursor: 'pointer' }} onClick={function () { handleNavigate(nav.key); }}>{nav.label}</a>;
            })}
          </div>
        </div>
      </header>

      <div style={{ maxWidth: 800, margin: '0 auto', padding: '24px 24px 48px' }}>
        <Breadcrumb items={[
          { title: <a onClick={function () { handleNavigate('home'); }}><HomeOutlined /> 首页</a> },
          { title: <a onClick={function () { handleNavigate('service-show'); }}>服务概览</a> },
          { title: '需求发布' }
        ]} style={{ marginBottom: 20 }} />

        <a onClick={function () { handleNavigate('service-show'); }} style={{ color: '#1677ff', cursor: 'pointer', fontSize: 13, display: 'inline-flex', alignItems: 'center', gap: 4, marginBottom: 16 }}>
          <ArrowLeftOutlined /> 返回服务大厅
        </a>

        <Card style={{ borderRadius: 12 }}>
          <div style={{ textAlign: 'center', marginBottom: 24 }}>
            <EditOutlined style={{ fontSize: 32, color: '#1677ff', marginBottom: 8 }} />
            <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 4 }}>发布服务需求</h2>
            <p style={{ fontSize: 13, color: '#8c8c8c' }}>描述您的低空服务需求，让服务商主动联系您</p>
          </div>

          <Form form={form} layout="vertical">
            <Form.Item name="title" label="需求标题" rules={[{ required: true, message: '请输入需求标题' }]}>
              <Input size="large" placeholder="如：需要XX区域航拍测绘服务、想报名无人机培训班" />
            </Form.Item>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item name="type" label="需求类型" rules={[{ required: true, message: '请选择需求类型' }]}>
                  <Select size="large" placeholder="请选择需求类型" options={DEMAND_TYPES} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="area" label="服务区域" rules={[{ required: true, message: '请选择服务区域' }]}>
                  <Select size="large" placeholder="请选择服务区域" options={AREA_OPTIONS} />
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
                <Button size="large" onClick={function () { handleNavigate('service-show'); }}>关闭</Button>
                <Button type="primary" size="large" style={{ flex: 1 }} onClick={function () {
                  form.validateFields().then(function () { message.success('需求发布成功，等待服务商响应！'); }).catch(function () {});
                }}>发布需求</Button>
              </div>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default Component;
