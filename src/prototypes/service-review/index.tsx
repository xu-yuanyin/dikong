/**
 * @name 服务评价
 * @mode axure
 * /Users/xu/Desktop/元引信息/Axhub-Make-main/skills/axure-export-workflow/SKILL.md
 *
 */

import './style.css';

import React, { useState, useCallback } from 'react';
import { Card, Tag, Breadcrumb, Button, Rate, Modal, Form, Input, Select, Row, Col, message, Progress, Segmented } from 'antd';
import { HomeOutlined, FileTextOutlined, StarOutlined, EditOutlined, TrophyOutlined, CompassOutlined } from '@ant-design/icons';

var STATS = {
  avgRating: 4.7,
  totalCount: 1286,
  distribution: [
    { stars: 5, percent: 65 },
    { stars: 4, percent: 22 },
    { stars: 3, percent: 8 },
    { stars: 2, percent: 3 },
    { stars: 1, percent: 2 }
  ]
};

var CATEGORY_STATS = [
  { name: '低空旅游', rating: 4.9, count: 326, color: '#1677ff' },
  { name: '飞行培训', rating: 4.8, count: 156, color: '#52c41a' },
  { name: '资质查询', rating: 4.6, count: 412, color: '#fa8c16' },
  { name: '飞行器服务', rating: 4.5, count: 198, color: '#722ed1' },
  { name: '低空科普', rating: 4.8, count: 523, color: '#13c2c2' },
  { name: '意见反馈', rating: 4.4, count: 89, color: '#eb2f96' }
];

var REVIEWS = [
  { id: 1, service: '城市空中观光体验', category: '低空旅游', user: '飞手李先生', rating: 5, content: '风景太美了！全程约30分钟，飞过城市地标建筑，视野开阔。飞行员非常专业，讲解详细，安全措施到位，强烈推荐！', time: '2026-04-22', avatar: '李' },
  { id: 2, service: '多旋翼驾驶员培训', category: '飞行培训', user: '张同学', rating: 5, content: '培训机构设施齐全，教练经验丰富，从理论到实操一步步带，课程安排合理。顺利拿到了驾驶证，非常满意！', time: '2026-04-21', avatar: '张' },
  { id: 3, service: '运营企业资质查询', category: '资质查询', user: '王经理', rating: 5, content: '查询功能非常便捷，输入企业名称就能看到完整的资质信息，包括经营许可证、安全记录等，做合作决策时很有参考价值。', time: '2026-04-20', avatar: '王' },
  { id: 4, service: '无人机保险方案定制', category: '飞行器服务', user: '赵先生', rating: 4, content: '保险方案覆盖面广，从机身损失到第三方责任都有保障。理赔流程也还方便，就是保费稍贵，希望能推出更多优惠方案。', time: '2026-04-19', avatar: '赵' },
  { id: 5, service: '低空安全飞行指南', category: '低空科普', user: '陈飞手', rating: 5, content: '内容非常实用！涵盖了禁飞区查询、气象判断、应急处理等方方面面，视频教程也很生动。新手必读，老手也可以温故知新。', time: '2026-04-18', avatar: '陈' },
  { id: 6, service: '飞行器年度适航检测', category: '飞行器服务', user: 'XX航拍公司', rating: 4, content: '检测流程规范，报告出具及时，专业度很高。预约排队时间有点长，建议增加检测时段。', time: '2026-04-17', avatar: 'X' },
  { id: 7, service: '投诉举报处理', category: '意见反馈', user: '刘女士', rating: 4, content: '投诉黑飞现象后，相关部门很快响应并处理了。平台跟踪反馈机制做得不错，能实时看到处理进度。', time: '2026-04-16', avatar: '刘' },
  { id: 8, service: '定制飞行体验', category: '低空旅游', user: '周先生', rating: 5, content: '生日当天预定了定制飞行体验，可以在空中看到自己的小区，太惊喜了！服务态度也很好，拍了超多照片。', time: '2026-04-15', avatar: '周' }
];

var SERVICE_OPTIONS = [
  { value: '城市空中观光体验', label: '城市空中观光体验' },
  { value: '定制飞行体验', label: '定制飞行体验' },
  { value: '多旋翼驾驶员培训', label: '多旋翼驾驶员培训' },
  { value: '运营企业资质查询', label: '运营企业资质查询' },
  { value: '飞行器年度适航检测', label: '飞行器年度适航检测' },
  { value: '无人机保险方案定制', label: '无人机保险方案定制' },
  { value: '低空安全飞行指南', label: '低空安全飞行指南' }
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

var Component = function ServiceReviewPage() {
  var [sortBy, setSortBy] = useState<string>('最新');
  var [modalOpen, setModalOpen] = useState(false);
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

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px 24px 48px' }}>
        <Breadcrumb items={[
          { title: <a onClick={function () { handleNavigate('home'); }}><HomeOutlined /> 首页</a> },
          { title: <a onClick={function () { handleNavigate('service-list'); }}>服务大厅</a> },
          { title: '服务评价' }
        ]} style={{ marginBottom: 20 }} />

        <Row gutter={24}>
          <Col xs={24} md={7}>
            <Card style={{ borderRadius: 12, marginBottom: 16, textAlign: 'center' }}>
              <TrophyOutlined style={{ fontSize: 32, color: '#faad14', marginBottom: 8 }} />
              <div style={{ fontSize: 40, fontWeight: 700, color: '#faad14', marginBottom: 4 }}>{STATS.avgRating}</div>
              <Rate disabled defaultValue={STATS.avgRating} allowHalf style={{ fontSize: 18, marginBottom: 8 }} />
              <div style={{ fontSize: 13, color: '#8c8c8c' }}>共 {STATS.totalCount} 条评价</div>
            </Card>
            <Card style={{ borderRadius: 12, marginBottom: 16 }}>
              <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>评分分布</div>
              {STATS.distribution.map(function (d) {
                return (
                  <div key={d.stars} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                    <span style={{ fontSize: 12, color: '#8c8c8c', width: 28 }}>{d.stars}星</span>
                    <Progress percent={d.percent} showInfo={false} strokeColor="#faad14" style={{ flex: 1 }} />
                    <span style={{ fontSize: 12, color: '#8c8c8c', width: 32 }}>{d.percent}%</span>
                  </div>
                );
              })}
            </Card>
            <Card style={{ borderRadius: 12 }}>
              <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>各模块评分</div>
              {CATEGORY_STATS.map(function (c) {
                return (
                  <div key={c.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                    <span style={{ fontSize: 13, color: '#595959' }}>{c.name}</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span style={{ fontSize: 14, fontWeight: 600, color: c.color }}>{c.rating}</span>
                      <span style={{ fontSize: 11, color: '#8c8c8c' }}>({c.count})</span>
                    </div>
                  </div>
                );
              })}
            </Card>
          </Col>

          <Col xs={24} md={17}>
            <Card style={{ borderRadius: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <Segmented options={['最新', '最高评分', '最低评分']} value={sortBy} onChange={function (v) { setSortBy(v as string); }} />
                <Button type="primary" icon={<EditOutlined />} onClick={function () { form.resetFields(); setModalOpen(true); }}>写评价</Button>
              </div>
              {REVIEWS.map(function (r) {
                return (
                  <div key={r.id} style={{ padding: '16px 0', borderBottom: '1px solid #f0f0f0' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#e6f4ff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1677ff', fontWeight: 600, fontSize: 14 }}>{r.avatar}</div>
                        <div>
                          <div style={{ fontSize: 14, fontWeight: 500 }}>{r.user}</div>
                          <div style={{ fontSize: 12, color: '#8c8c8c' }}>{r.time}</div>
                        </div>
                      </div>
                      <Tag color="blue">{r.category}</Tag>
                    </div>
                    <div style={{ fontSize: 13, color: '#1677ff', marginBottom: 4 }}>服务项目：{r.service}</div>
                    <div style={{ marginBottom: 8 }}>
                      <Rate disabled defaultValue={r.rating} style={{ fontSize: 14 }} />
                    </div>
                    <p style={{ fontSize: 14, color: '#595959', lineHeight: 1.7, margin: 0 }}>{r.content}</p>
                  </div>
                );
              })}
            </Card>
          </Col>
        </Row>
      </div>

      <Modal title="提交评价" open={modalOpen} onCancel={function () { setModalOpen(false); }} footer={[<Button key="c" onClick={function () { setModalOpen(false); }}>关闭</Button>, <Button key="p" type="primary" onClick={function () { message.success('评价提交成功！'); setModalOpen(false); }}>提交</Button>]}>
        <Form form={form} layout="vertical" style={{ marginTop: 16 }}>
          <Form.Item name="service" label="服务项目" rules={[{ required: true, message: '请选择服务项目' }]}>
            <Select placeholder="请选择您使用过的服务" options={SERVICE_OPTIONS} />
          </Form.Item>
          <Form.Item name="rating" label="评分" rules={[{ required: true, message: '请评分' }]}>
            <Rate style={{ fontSize: 28 }} />
          </Form.Item>
          <Form.Item name="content" label="评价内容" rules={[{ required: true, message: '请输入评价内容' }]}>
            <Input.TextArea rows={4} placeholder="请分享您的使用体验..." />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Component;
