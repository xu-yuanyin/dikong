/**
 * @name 发布服务（待调整）
 * @mode axure
 * /Users/xu/Desktop/元引信息/Axhub-Make-main/skills/axure-export-workflow/SKILL.md
 *
 */

import './style.css';

import React, { useState, useCallback } from 'react';
import { Card, Form, Input, Select, Button, Breadcrumb, message, Upload, Row, Col } from 'antd';
import { HomeOutlined, FileTextOutlined, CompassOutlined, UploadOutlined, ArrowLeftOutlined, PhoneOutlined, UserOutlined, DollarOutlined, EnvironmentOutlined } from '@ant-design/icons';

var SERVICE_CATEGORIES = [
  { value: 'industry', label: '行业应用' },
  { value: 'photo', label: '航拍影像' },
  { value: 'training', label: '飞行培训' },
  { value: 'tourism', label: '低空旅游' },
  { value: 'service', label: '飞行器服务' },
  { value: 'other', label: '其它定制服务' }
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
  { key: 'mall-list', label: '低空商城' },
  { key: 'flight-dynamic', label: '飞行服务' },
  { key: 'login', label: '登录' }
];

var Component = function ServicePublishPage() {
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
          { title: <a onClick={function () { handleNavigate('service-list'); }}>服务大厅</a> },
          { title: '发布服务' }
        ]} style={{ marginBottom: 20 }} />

        <a onClick={function () { handleNavigate('service-list'); }} style={{ color: '#1677ff', cursor: 'pointer', fontSize: 13, display: 'inline-flex', alignItems: 'center', gap: 4, marginBottom: 16 }}>
          <ArrowLeftOutlined /> 返回服务大厅
        </a>

        <Card style={{ borderRadius: 12 }}>
          <div style={{ textAlign: 'center', marginBottom: 24 }}>
            <CompassOutlined style={{ fontSize: 32, color: '#1677ff', marginBottom: 8 }} />
            <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 4 }}>发布低空服务</h2>
            <p style={{ fontSize: 13, color: '#8c8c8c' }}>填写服务信息后点击发布，服务将直接在服务大厅进行公开展示，请确保内容符合平台发布规范</p>
          </div>

          <Form form={form} layout="vertical">
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item name="name" label="服务名称" rules={[{ required: true, message: '请输入服务名称' }]}>
                  <Input size="large" placeholder="如：城市空中观光体验" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="category" label="服务类别" rules={[{ required: true, message: '请选择服务类别' }]}>
                  <Select size="large" placeholder="请选择服务类别" options={SERVICE_CATEGORIES} />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={8}>
                <Form.Item name="isFree" label="是否免费" rules={[{ required: true, message: '请选择' }]}>
                  <Select size="large" placeholder="请选择" options={[{ value: 'yes', label: '免费服务' }, { value: 'no', label: '收费服务' }]} />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item name="price" label="服务价格" rules={[{ required: true, message: '请输入价格' }]}>
                  <Input size="large" prefix={<span style={{ color: '#ff4d4f', fontWeight: 600 }}>¥</span>} placeholder="如：299/人、面议" />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item name="area" label="服务区域" rules={[{ required: true, message: '请输入服务区域' }]}>
                  <Input size="large" prefix={<EnvironmentOutlined />} placeholder="如：郑州市全域、河南省全省" />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item name="duration" label="服务时长/有效期" rules={[{ required: true, message: '请输入服务时长' }]}>
              <Input size="large" placeholder="如：30分钟/次、3个月有效、随约随到" />
            </Form.Item>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item name="equipment" label="投入设备/作业机型" rules={[{ required: true, message: '请输入执行服务所需的设备' }]}>
                  <Input size="large" placeholder="如：大疆 M300 RTK、精灵 4 Pro" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="delivery" label="交付标准/成果物" rules={[{ required: true, message: '请输入交付标准' }]}>
                  <Input size="large" placeholder="如：交付 4K 原片、出具专业测绘报告" />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item name="coverImage" label="服务封面图" rules={[{ required: true, message: '请上传服务封面图' }]}>
              <Upload listType="picture-card"><Button icon={<UploadOutlined />}>上传封面</Button></Upload>
            </Form.Item>
            <Form.Item label={<span><span style={{ color: '#ff4d4f', marginRight: 4 }}>*</span>服务描述</span>}>
              <div style={{ border: '1px solid #d9d9d9', borderRadius: 8, overflow: 'hidden' }}>
                <div style={{ display: 'flex', gap: 2, padding: '8px 12px', background: '#fafafa', borderBottom: '1px solid #d9d9d9', flexWrap: 'wrap' }}>
                  {['B', 'I', 'U', 'S'].map(b => (
                    <span key={b} style={{ width: 28, height: 28, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', borderRadius: 4, fontWeight: b === 'B' ? 700 : 400, fontStyle: b === 'I' ? 'italic' : 'normal', textDecoration: b === 'U' ? 'underline' : b === 'S' ? 'line-through' : 'none', fontSize: 13, color: '#595959', border: '1px solid transparent' }}
                      onMouseEnter={e => (e.currentTarget.style.background = '#e6f4ff')}
                      onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                    >{b}</span>
                  ))}
                  <span style={{ width: 1, background: '#d9d9d9', margin: '2px 6px' }} />
                  {['H1', 'H2', '引用', '有序', '无序'].map(b => (
                    <span key={b} style={{ height: 28, padding: '0 8px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', borderRadius: 4, fontSize: 12, color: '#595959' }}
                      onMouseEnter={e => (e.currentTarget.style.background = '#e6f4ff')}
                      onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                    >{b}</span>
                  ))}
                  <span style={{ width: 1, background: '#d9d9d9', margin: '2px 6px' }} />
                  {['插入图片', '插入链接', '插入表格'].map(b => (
                    <span key={b} style={{ height: 28, padding: '0 8px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', borderRadius: 4, fontSize: 12, color: '#1677ff' }}
                      onMouseEnter={e => (e.currentTarget.style.background = '#e6f4ff')}
                      onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                    >{b}</span>
                  ))}
                </div>
                <div
                  contentEditable
                  suppressContentEditableWarning
                  style={{ minHeight: 200, padding: '16px', fontSize: 14, lineHeight: 1.8, outline: 'none', color: '#8c8c8c' }}
                >
                  请在此编辑服务详细描述，支持富文本格式...
                </div>
              </div>
            </Form.Item>
            <Form.Item name="highlights" label="服务亮点">
              <Input.TextArea rows={2} placeholder="如：专业持证飞手带队、全景航拍、安全有保障" />
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
            <Form.Item name="qualification" label="资质/证书文件">
              <Upload listType="text"><Button icon={<UploadOutlined />}>上传资质文件（支持PDF、图片）</Button></Upload>
            </Form.Item>
            <Form.Item>
              <div style={{ display: 'flex', gap: 12 }}>
                <Button size="large" onClick={function () { handleNavigate('service-list'); }}>关闭</Button>
                <Button type="primary" size="large" style={{ flex: 1 }} onClick={function () {
                  form.validateFields().then(function () { 
                    message.success('服务发布申请已提交，等待后台运营人员审核！');
                    setTimeout(() => handleNavigate('my-service'), 1500);
                  }).catch(function () {});
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
