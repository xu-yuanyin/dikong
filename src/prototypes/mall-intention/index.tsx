/**
 * @name 提交采购意向（待调整）
 * @mode axure
 * /Users/xu/Desktop/元引信息/Axhub-Make-main/skills/axure-export-workflow/SKILL.md
 *
 */

import './style.css';

import React, { useCallback } from 'react';
import { Card, Form, Input, Select, Button, Breadcrumb, message, Tabs, InputNumber } from 'antd';
import { HomeOutlined, ShoppingOutlined } from '@ant-design/icons';

const PRODUCT_OPTIONS = [
  { value: 'uav', label: '工业级无人机' },
  { value: 'evtol', label: 'eVTOL载人飞行器' },
  { value: 'security', label: '安全设备' },
  { value: 'communication', label: '通信设备' },
  { value: 'training', label: '培训设备' },
  { value: 'infrastructure', label: '基础设施' },
  { value: 'other', label: '其他' }
];

const Component = function MallIntentionPage() {
  const [form] = Form.useForm();

  const handleNavigate = useCallback(function (key: string) {
    const baseUrl = window.location.origin;
    window.location.href = '/prototypes/' + key;
  }, []);

  const handleSubmit = useCallback(function () {
    form.validateFields().then(function () {
      message.success('采购意向提交成功！');
    }).catch(function () {});
  }, [form]);

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

      <div style={{ maxWidth: 800, margin: '0 auto', padding: '24px 24px 48px' }}>
        <Breadcrumb items={[
          { title: <a onClick={function () { handleNavigate('home'); }}><HomeOutlined /> 首页</a> },
          { title: '低空商城' },
          { title: '提交采购意向' }
        ]} style={{ marginBottom: 24 }} />

        <Card style={{ borderRadius: 12, marginBottom: 24 }}>
          <Tabs
            defaultActiveKey="intention"
            items={[
              { key: 'list', label: <span onClick={function () { handleNavigate('mall-list'); }}>商城清单</span> },
              { key: 'intention', label: '提交采购意向' }
            ]}
          />
        </Card>

        <Card title="提交采购意向" style={{ borderRadius: 12 }}>
          <Form form={form} layout="vertical">
            <Form.Item name="relatedProduct" label="关联商品" rules={[{ required: true, message: '请输入关联商品' }]}>
              <Input size="large" defaultValue="DJI Matrice 350 RTK 工业级无人机" placeholder="请输入关联的商品名称" />
            </Form.Item>
            <Form.Item name="productType" label="产品类型" rules={[{ required: true, message: '请选择产品类型' }]}>
              <Select size="large" placeholder="请选择需要采购的产品类型" options={PRODUCT_OPTIONS} />
            </Form.Item>
            <Form.Item name="quantity" label="采购数量" rules={[{ required: true, message: '请输入采购数量' }]}>
              <InputNumber size="large" min={1} style={{ width: '100%' }} placeholder="请输入采购数量" />
            </Form.Item>
            <Form.Item name="budget" label="预算范围">
              <Input size="large" placeholder="请输入预算范围（选填）" />
            </Form.Item>
            <Form.Item name="contactName" label="联系人" rules={[{ required: true, message: '请输入联系人' }]}>
              <Input size="large" placeholder="请输入联系人姓名" />
            </Form.Item>
            <Form.Item name="contactPhone" label="联系电话" rules={[{ required: true, message: '请输入联系电话' }]}>
              <Input size="large" placeholder="请输入联系电话" />
            </Form.Item>
            <Form.Item name="company" label="公司名称">
              <Input size="large" placeholder="请输入公司名称（选填）" />
            </Form.Item>
            <Form.Item name="requirement" label="采购需求描述" rules={[{ required: true, message: '请描述采购需求' }]}>
              <Input.TextArea size="large" rows={4} placeholder="请详细描述您的采购需求、技术要求等" />
            </Form.Item>
            <Form.Item>
              <div style={{ display: 'flex', gap: 12 }}>
                <Button type="primary" size="large" onClick={handleSubmit} style={{ minWidth: 120 }}>提交意向</Button>
                <Button size="large" onClick={function () { form.resetFields(); }}>重置</Button>
              </div>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default Component;
