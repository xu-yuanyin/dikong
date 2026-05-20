/**
 * @name 发布商品（待调整）
 * @mode axure
 * /Users/xu/Desktop/元引信息/Axhub-Make-main/skills/axure-export-workflow/SKILL.md
 *
 */

import './style.css';

import React, { useState, useCallback } from 'react';
import { Card, Form, Input, Select, Button, Breadcrumb, message, Upload, Row, Col, InputNumber, Checkbox } from 'antd';
import { HomeOutlined, FileTextOutlined, ShoppingOutlined, UploadOutlined, ArrowLeftOutlined, PhoneOutlined, UserOutlined } from '@ant-design/icons';

var CATEGORIES = [
  { value: 'aircraft', label: '飞行器' },
  { value: 'accessory', label: '配件电池' },
  { value: 'sensor', label: '传感器载荷' },
  { value: 'communication', label: '通信设备' },
  { value: 'security', label: '安全设备' },
  { value: 'training', label: '培训设备' },
  { value: 'infrastructure', label: '基础设施' },
  { value: 'software', label: '软件服务' },
  { value: 'other', label: '其他' }
];

var PORTAL_NAV = [
  { key: 'home', label: '首页' },
  { key: 'news', label: '资讯公告' },
  { key: 'policy-national', label: '政策法规' },
  { key: 'service-list', label: '低空服务' },
  { key: 'mall-list', label: '低空商城' },
  { key: 'flight-dynamic', label: '飞行服务' },
  { key: 'login', label: '登录' }
];

var Component = function MallPublishPage() {
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
          { title: <a onClick={function () { handleNavigate('mall-list'); }}>低空商城</a> },
          { title: '发布商品' }
        ]} style={{ marginBottom: 20 }} />

        <a onClick={function () { handleNavigate('mall-list'); }} style={{ color: '#722ed1', cursor: 'pointer', fontSize: 13, display: 'inline-flex', alignItems: 'center', gap: 4, marginBottom: 16 }}>
          <ArrowLeftOutlined /> 返回商城
        </a>

        <Card style={{ borderRadius: 12 }}>
          <div style={{ textAlign: 'center', marginBottom: 24 }}>
            <ShoppingOutlined style={{ fontSize: 32, color: '#722ed1', marginBottom: 8 }} />
            <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 4 }}>发布商品</h2>
            <p style={{ fontSize: 13, color: '#8c8c8c' }}>填写商品信息，即可发布商品</p>
          </div>

          <Form form={form} layout="vertical">
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item name="name" label="商品名称" rules={[{ required: true, message: '请输入商品名称' }]}>
                  <Input size="large" placeholder="如：工业级无人机 DJI Matrice 350 RTK" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="category" label="商品类别" rules={[{ required: true, message: '请选择类别' }]}>
                  <Select size="large" placeholder="请选择商品类别" options={CATEGORIES} />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item name="brand" label="品牌" rules={[{ required: true, message: '请输入品牌' }]}>
                  <Input size="large" placeholder="如：大疆创新" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="model" label="型号" rules={[{ required: true, message: '请输入型号' }]}>
                  <Input size="large" placeholder="如：Matrice 350 RTK" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item name="price" label="售价" rules={[{ required: true, message: '请输入售价' }]}>
                  <InputNumber size="large" prefix="¥" style={{ width: '100%' }} placeholder="请输入售价" min={0} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="stock" label="库存数量" rules={[{ required: true, message: '请输入库存' }]}>
                  <InputNumber size="large" style={{ width: '100%' }} placeholder="请输入库存数量" min={0} />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item name="desc" label="商品描述" rules={[{ required: true, message: '请输入商品描述' }]}>
              <Input.TextArea rows={3} placeholder="请详细描述商品特点、功能、适用场景等" />
            </Form.Item>
            <Form.Item name="specs" label="产品参数">
              <Input.TextArea rows={3} placeholder="每行一个参数，如：续航时间：55分钟" />
            </Form.Item>
            <Form.Item name="images" label="商品图片">
              <Upload listType="picture-card"><Button icon={<UploadOutlined />}>上传图片</Button></Upload>
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
            <Form.Item name="license" label="经营许可/资质">
              <Upload listType="text"><Button icon={<UploadOutlined />}>上传经营许可文件</Button></Upload>
            </Form.Item>
            <Form.Item name="guarantees" label="服务保障">
              <Checkbox.Group options={['正品保证', '全国联保', '7天无理由退换', '专业安装指导', '免费培训', '终身维护']} />
            </Form.Item>
            <Form.Item>
              <div style={{ display: 'flex', gap: 12 }}>
                <Button size="large" onClick={function () { handleNavigate('mall-list'); }}>关闭</Button>
                <Button type="primary" size="large" style={{ flex: 1, background: '#722ed1', borderColor: '#722ed1' }} onClick={function () {
                  form.validateFields().then(function () { message.success('商品上架申请已提交，等待运营人员审核！'); setTimeout(function () { handleNavigate('my-goods'); }, 1500); }).catch(function () {});
                }}>提交发布</Button>
              </div>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default Component;
