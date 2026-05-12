/**
 * @name 提交服务需求
 * @mode axure
 * /Users/xu/Desktop/元引信息/Axhub-Make-main/skills/axure-export-workflow/SKILL.md
 *
 */

import './style.css';

import React, { useCallback } from 'react';
import { Card, Form, Input, Select, Button, Breadcrumb, message, Tabs } from 'antd';
import { HomeOutlined, SafetyCertificateOutlined } from '@ant-design/icons';

const SERVICE_OPTIONS = [
  { value: 'flight_plan', label: '飞行计划审批' },
  { value: 'airspace', label: '空域使用申请' },
  { value: 'aircraft_register', label: '飞行器备案登记' },
  { value: 'pilot_cert', label: '驾驶员资质认证' },
  { value: 'weather', label: '低空气象服务' },
  { value: 'data_query', label: '飞行数据查询' },
  { value: 'other', label: '其他服务' }
];

const Component = function ServiceDemandPage() {
  const [form] = Form.useForm();

  const handleNavigate = useCallback(function (key: string) {
    const baseUrl = window.location.origin;
    window.location.href = '/prototypes/' + key;
  }, []);

  const handleSubmit = useCallback(function () {
    form.validateFields().then(function () {
      message.success('服务需求提交成功！');
    }).catch(function () {});
  }, [form]);

  return (
    <div style={{ minHeight: '100vh', background: '#f5f5f5' }}>
      <header style={{ background: 'linear-gradient(135deg, #0c4a6e 0%, #1677ff 100%)', padding: '0 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }} onClick={function () { handleNavigate('home'); }}>
            <SafetyCertificateOutlined style={{ fontSize: 20, color: '#fff' }} />
            <span style={{ fontSize: 16, fontWeight: 600, color: '#fff' }}>区域低空公共服务平台</span>
          </div>
          <div style={{ display: 'flex', gap: 16 }}>
            <a style={{ color: 'rgba(255,255,255,0.85)', cursor: 'pointer' }} onClick={function () { handleNavigate('home'); }}>首页</a>
            <a style={{ color: 'rgba(255,255,255,0.85)', cursor: 'pointer' }} onClick={function () { handleNavigate('news'); }}>资讯公告</a>
            <a style={{ color: 'rgba(255,255,255,0.85)', cursor: 'pointer' }} onClick={function () { handleNavigate('policy-national'); }}>政策法规</a>
            <a style={{ color: '#fff', fontWeight: 600, cursor: 'pointer' }}>低空服务</a>
            <a style={{ color: 'rgba(255,255,255,0.85)', cursor: 'pointer' }} onClick={function () { handleNavigate('mall-list'); }}>低空商城</a>
            <a style={{ color: 'rgba(255,255,255,0.85)', cursor: 'pointer' }} onClick={function () { handleNavigate('flight-dynamic'); }}>飞行服务</a>
            <a style={{ color: 'rgba(255,255,255,0.85)', cursor: 'pointer' }} onClick={function () { handleNavigate('login'); }}>登录</a>
          </div>
        </div>
      </header>

      <div style={{ maxWidth: 800, margin: '0 auto', padding: '24px 24px 48px' }}>
        <Breadcrumb items={[
          { title: <a onClick={function () { handleNavigate('home'); }}><HomeOutlined /> 首页</a> },
          { title: '低空服务' },
          { title: '提交服务需求' }
        ]} style={{ marginBottom: 24 }} />

        <Card style={{ borderRadius: 12, marginBottom: 24 }}>
          <Tabs
            defaultActiveKey="demand"
            items={[
              { key: 'list', label: <span onClick={function () { handleNavigate('service-list'); }}>服务清单</span> },
              { key: 'demand', label: '提交服务需求' }
            ]}
          />
        </Card>

        <Card title="提交服务需求" style={{ borderRadius: 12 }}>
          <Form form={form} layout="vertical">
            <Form.Item name="serviceType" label="服务类型" rules={[{ required: true, message: '请选择服务类型' }]}>
              <Select size="large" placeholder="请选择需要的服务类型" options={SERVICE_OPTIONS} />
            </Form.Item>
            <Form.Item name="contactName" label="联系人" rules={[{ required: true, message: '请输入联系人' }]}>
              <Input size="large" placeholder="请输入联系人姓名" />
            </Form.Item>
            <Form.Item name="contactPhone" label="联系电话" rules={[{ required: true, message: '请输入联系电话' }]}>
              <Input size="large" placeholder="请输入联系电话" />
            </Form.Item>
            <Form.Item name="organization" label="所属单位">
              <Input size="large" placeholder="请输入所属单位（选填）" />
            </Form.Item>
            <Form.Item name="description" label="需求描述" rules={[{ required: true, message: '请描述您的需求' }]}>
              <Input.TextArea size="large" rows={4} placeholder="请详细描述您的服务需求" />
            </Form.Item>
            <Form.Item label="附件上传">
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Button>选择文件</Button>
                <span style={{ marginLeft: 8, color: '#8c8c8c', fontSize: 13 }}>支持 PDF、Word、图片格式</span>
              </div>
            </Form.Item>
            <Form.Item>
              <div style={{ display: 'flex', gap: 12 }}>
                <Button type="primary" size="large" onClick={handleSubmit} style={{ minWidth: 120 }}>提交需求</Button>
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
