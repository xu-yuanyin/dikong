/**
 * @name 提交飞行计划
 * @mode axure
 * /Users/xu/Desktop/元引信息/Axhub-Make-main/skills/axure-export-workflow/SKILL.md
 *
 */

import './style.css';

import React, { useCallback } from 'react';
import { Card, Form, Input, Select, Button, Breadcrumb, Tabs, DatePicker, TimePicker, message } from 'antd';
import { HomeOutlined, RocketOutlined } from '@ant-design/icons';

const AIRCRAFT_TYPES = [
  { value: 'multirotor', label: '多旋翼无人机' },
  { value: 'fixed_wing', label: '固定翼无人机' },
  { value: 'evtol', label: 'eVTOL载人飞行器' },
  { value: 'helicopter', label: '直升机' },
  { value: 'other', label: '其他' }
];

const FLIGHT_PURPOSES = [
  { value: 'survey', label: '测绘巡检' },
  { value: 'logistics', label: '物流配送' },
  { value: 'training', label: '飞行训练' },
  { value: 'agriculture', label: '农业植保' },
  { value: 'emergency', label: '应急救援' },
  { value: 'aerial_photo', label: '航拍摄影' },
  { value: 'other', label: '其他' }
];

const Component = function FlightPlanPage() {
  const [form] = Form.useForm();

  const handleNavigate = useCallback(function (key: string) {
    const baseUrl = window.location.origin;
    window.location.href = '/prototypes/' + key;
  }, []);

  const handleSubmit = useCallback(function () {
    form.validateFields().then(function () {
      message.success('飞行计划提交成功！等待审批');
    }).catch(function () {});
  }, [form]);

  return (
    <div style={{ minHeight: '100vh', background: '#f5f5f5' }}>
      <header style={{ background: 'linear-gradient(135deg, #0c4a6e 0%, #13c2c2 100%)', padding: '0 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }} onClick={function () { handleNavigate('home'); }}>
            <RocketOutlined style={{ fontSize: 20, color: '#fff' }} />
            <span style={{ fontSize: 16, fontWeight: 600, color: '#fff' }}>区域低空公共服务平台</span>
          </div>
          <div style={{ display: 'flex', gap: 16 }}>
            <a style={{ color: 'rgba(255,255,255,0.85)', cursor: 'pointer' }} onClick={function () { handleNavigate('home'); }}>首页</a>
            <a style={{ color: 'rgba(255,255,255,0.85)', cursor: 'pointer' }} onClick={function () { handleNavigate('news'); }}>资讯公告</a>
            <a style={{ color: 'rgba(255,255,255,0.85)', cursor: 'pointer' }} onClick={function () { handleNavigate('policy-national'); }}>政策法规</a>
            <a style={{ color: 'rgba(255,255,255,0.85)', cursor: 'pointer' }} onClick={function () { handleNavigate('service-list'); }}>低空服务</a>
            <a style={{ color: 'rgba(255,255,255,0.85)', cursor: 'pointer' }} onClick={function () { handleNavigate('mall-list'); }}>低空商城</a>
            <a style={{ color: '#fff', fontWeight: 600, cursor: 'pointer' }}>飞行服务</a>
            <a style={{ color: 'rgba(255,255,255,0.85)', cursor: 'pointer' }} onClick={function () { handleNavigate('login'); }}>登录</a>
          </div>
        </div>
      </header>

      <div style={{ maxWidth: 900, margin: '0 auto', padding: '24px 24px 48px' }}>
        <Breadcrumb items={[
          { title: <a onClick={function () { handleNavigate('home'); }}><HomeOutlined /> 首页</a> },
          { title: '飞行服务' },
          { title: '提交飞行计划' }
        ]} style={{ marginBottom: 24 }} />

        <Card style={{ borderRadius: 12, marginBottom: 24 }}>
          <Tabs
            defaultActiveKey="plan"
            items={[
              { key: 'dynamic', label: <span onClick={function () { handleNavigate('flight-dynamic'); }}>本地动态</span> },
              { key: 'airspace', label: <span onClick={function () { handleNavigate('flight-airspace'); }}>空域地图</span> },
              { key: 'weather', label: <span onClick={function () { handleNavigate('flight-weather'); }}>气象信息</span> },
              { key: 'plan', label: '提交飞行计划' }
            ]}
          />
        </Card>

        <Card title="✈️ 提交飞行计划" style={{ borderRadius: 12 }}>
          <Form form={form} layout="vertical">
            <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16, color: '#1677ff' }}>基本信息</h3>
            <Form.Item name="pilotName" label="飞手姓名" rules={[{ required: true, message: '请输入飞手姓名' }]}>
              <Input size="large" placeholder="请输入飞手姓名" />
            </Form.Item>
            <Form.Item name="pilotCert" label="飞手证书编号" rules={[{ required: true, message: '请输入证书编号' }]}>
              <Input size="large" placeholder="请输入飞手证书编号" />
            </Form.Item>

            <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16, marginTop: 24, color: '#1677ff' }}>飞行器信息</h3>
            <Form.Item name="aircraftType" label="飞行器类型" rules={[{ required: true, message: '请选择飞行器类型' }]}>
              <Select size="large" placeholder="请选择飞行器类型" options={AIRCRAFT_TYPES} />
            </Form.Item>
            <Form.Item name="aircraftId" label="飞行器编号" rules={[{ required: true, message: '请输入飞行器编号' }]}>
              <Input size="large" placeholder="请输入飞行器备案编号" />
            </Form.Item>

            <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16, marginTop: 24, color: '#1677ff' }}>飞行计划</h3>
            <Form.Item name="purpose" label="飞行目的" rules={[{ required: true, message: '请选择飞行目的' }]}>
              <Select size="large" placeholder="请选择飞行目的" options={FLIGHT_PURPOSES} />
            </Form.Item>
            <Form.Item name="date" label="飞行日期" rules={[{ required: true, message: '请选择飞行日期' }]}>
              <DatePicker size="large" style={{ width: '100%' }} />
            </Form.Item>
            <div style={{ display: 'flex', gap: 16 }}>
              <Form.Item name="startTime" label="起飞时间" rules={[{ required: true, message: '请选择起飞时间' }]} style={{ flex: 1 }}>
                <TimePicker size="large" format="HH:mm" style={{ width: '100%' }} />
              </Form.Item>
              <Form.Item name="endTime" label="降落时间" rules={[{ required: true, message: '请选择降落时间' }]} style={{ flex: 1 }}>
                <TimePicker size="large" format="HH:mm" style={{ width: '100%' }} />
              </Form.Item>
            </div>
            <Form.Item name="departure" label="起飞地点" rules={[{ required: true, message: '请输入起飞地点' }]}>
              <Input size="large" placeholder="请输入起飞地点（经纬度或地址）" />
            </Form.Item>
            <Form.Item name="destination" label="降落地点" rules={[{ required: true, message: '请输入降落地点' }]}>
              <Input size="large" placeholder="请输入降落地点（经纬度或地址）" />
            </Form.Item>
            <Form.Item name="altitude" label="飞行高度（米）" rules={[{ required: true, message: '请输入飞行高度' }]}>
              <Input size="large" placeholder="请输入最大飞行高度" type="number" />
            </Form.Item>
            <Form.Item name="route" label="飞行航线描述">
              <Input.TextArea size="large" rows={3} placeholder="请描述飞行航线（选填）" />
            </Form.Item>
            <Form.Item name="remark" label="备注">
              <Input.TextArea size="large" rows={2} placeholder="其他需要说明的事项（选填）" />
            </Form.Item>
            <Form.Item>
              <div style={{ display: 'flex', gap: 12 }}>
                <Button type="primary" size="large" onClick={handleSubmit} style={{ minWidth: 140 }}>提交飞行计划</Button>
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
