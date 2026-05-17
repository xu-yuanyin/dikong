/**
 * @name 商品详情
 * @mode axure
 * /Users/xu/Desktop/元引信息/Axhub-Make-main/skills/axure-export-workflow/SKILL.md
 *
 */

import './style.css';

import React, { useState, useCallback } from 'react';
import { Card, Tag, Breadcrumb, Divider, Row, Col, Rate, Button, Segmented, message, Modal, Form, Input, Avatar, List, Progress, InputNumber } from 'antd';
import { HomeOutlined, ArrowLeftOutlined, FileTextOutlined, ShoppingOutlined, ShoppingCartOutlined, SafetyCertificateOutlined, CheckCircleOutlined, TeamOutlined, PhoneOutlined, EnvironmentOutlined, StarOutlined, MessageOutlined, UserOutlined } from '@ant-design/icons';

var DETAIL = {
  title: '工业级无人机 DJI Matrice 350 RTK',
  category: '飞行器',
  price: '¥68,800',
  stock: 50,
  brand: '大疆创新',
  model: 'Matrice 350 RTK',
  supplier: 'XX无人机专营店',
  contactPerson: '李经理',
  contactPhone: '400-888-9999',
  desc: 'DJI Matrice 350 RTK 是大疆推出的旗舰级工业无人机平台，搭载全向避障和精准定位系统，续航长达 55 分钟，广泛应用于测绘、巡检、安防等专业领域。',
  specs: [
    { key: '飞行器重量', value: '6.47 kg（含桨叶和电池）' },
    { key: '最大起飞重量', value: '9.2 kg' },
    { key: '续航时间', value: '55 分钟（悬停）' },
    { key: '工作温度', value: '-20°C 至 50°C' },
    { key: '抗风等级', value: '12 m/s' },
    { key: '防护等级', value: 'IP55' },
    { key: '定位精度', value: 'RTK：1 cm + 1 ppm（水平）' },
    { key: '最大飞行速度', value: '23 m/s（运动模式）' }
  ],
  guarantees: ['正品保证', '全国联保', '7天无理由退换', '专业安装指导'],
  rating: 4.8,
  reviewCount: 56
};

var REVIEWS = [
  { id: 1, user: '王先生', rating: 5, date: '2026-05-10', content: '设备性能稳定，全向避障功能非常实用，大大提升了我们在复杂环境下的作业安全性。' },
  { id: 2, user: '李工', rating: 5, date: '2026-04-22', content: '续航能力确实强悍，带满载荷也能飞将近50分钟。卖家发货速度很快，包装严实。' },
  { id: 3, user: '赵总', rating: 4, date: '2026-04-05', content: '机器很不错，就是电池稍微有点重。配套的遥控器图传距离很远，总体满意。' }
];

var RATING_DISTRIBUTION = [
  { star: 5, count: 42 },
  { star: 4, count: 12 },
  { star: 3, count: 2 },
  { star: 2, count: 0 },
  { star: 1, count: 0 }
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

var Component = function MallDetailPage() {
  var [isLoggedIn, setIsLoggedIn] = useState(false);
  var [reviewRating, setReviewRating] = useState(5);
  var [reviewText, setReviewText] = useState('');
  var [reviews, setReviews] = useState(REVIEWS);
  var [intentionModalOpen, setIntentionModalOpen] = useState(false);
  var [form] = Form.useForm();
  var handleNavigate = useCallback(function (key: string) {
    window.location.href = '/prototypes/' + key;
  }, []);

  var requireLogin = useCallback(function (callback: () => void) {
    if (!isLoggedIn) {
      Modal.warning({
        title: '提示',
        content: '请先登录后再进行此操作',
        okText: '去登录',
        onOk: function () { handleNavigate('login'); }
      });
      return;
    }
    callback();
  }, [isLoggedIn, handleNavigate]);

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
          { title: DETAIL.title }
        ]} style={{ marginBottom: 24 }} />

        <Row gutter={24}>
          <Col xs={24} md={17}>
            <Card style={{ borderRadius: 12, marginBottom: 24 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                <a onClick={function () { handleNavigate('mall-list'); }} style={{ color: '#722ed1', cursor: 'pointer', fontSize: 13 }}>
                  <ArrowLeftOutlined /> 返回商城
                </a>
              </div>

              <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
                <Tag color="purple">{DETAIL.category}</Tag>
              </div>

              <h1 style={{ fontSize: 22, fontWeight: 700, lineHeight: 1.4, marginBottom: 12 }}>{DETAIL.title}</h1>

              <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', fontSize: 13, color: '#8c8c8c', marginBottom: 16 }}>
                <span>品牌：{DETAIL.brand}</span>
                <span>型号：{DETAIL.model}</span>
                <span>库存：{DETAIL.stock}</span>
              </div>

              <div style={{ background: '#fff7e6', padding: 16, borderRadius: 8, marginBottom: 16, borderLeft: '4px solid #fa8c16' }}>
                <span style={{ fontSize: 24, fontWeight: 700, color: '#ff4d4f' }}>{DETAIL.price}</span>
                <p style={{ fontSize: 14, color: '#595959', lineHeight: 1.8, margin: '8px 0 0' }}>{DETAIL.desc}</p>
              </div>

              <div style={{ marginBottom: 16 }}>
                <div style={{ height: 260, borderRadius: 10, overflow: 'hidden', marginBottom: 12, background: 'linear-gradient(135deg, #f9f0ff 0%, #efdbff 50%, #d3adf7 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 8 }}>
                  <ShoppingOutlined style={{ fontSize: 48, color: '#722ed1' }} />
                  <span style={{ fontSize: 14, color: '#722ed1', fontWeight: 500 }}>{DETAIL.brand} {DETAIL.model} · 产品主图</span>
                </div>
                <Row gutter={12}>
                  <Col span={6}>
                    <div style={{ height: 80, borderRadius: 8, background: 'linear-gradient(135deg, #f0f5ff, #d6e4ff)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', border: '2px solid #722ed1' }}>
                      <span style={{ fontSize: 10, color: '#722ed1' }}>正面</span>
                    </div>
                  </Col>
                  <Col span={6}>
                    <div style={{ height: 80, borderRadius: 8, background: 'linear-gradient(135deg, #f9f0ff, #efdbff)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                      <span style={{ fontSize: 10, color: '#722ed1' }}>侧面</span>
                    </div>
                  </Col>
                  <Col span={6}>
                    <div style={{ height: 80, borderRadius: 8, background: 'linear-gradient(135deg, #e6fffb, #b5f5ec)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                      <span style={{ fontSize: 10, color: '#13c2c2' }}>配件</span>
                    </div>
                  </Col>
                  <Col span={6}>
                    <div style={{ height: 80, borderRadius: 8, background: 'linear-gradient(135deg, #fff7e6, #ffe7ba)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                      <span style={{ fontSize: 10, color: '#fa8c16' }}>场景</span>
                    </div>
                  </Col>
                </Row>
              </div>

              <Divider>产品参数</Divider>
              <Row gutter={[16, 8]} style={{ marginBottom: 16 }}>
                {DETAIL.specs.map(function (s) {
                  return (
                    <Col xs={24} sm={12} key={s.key}>
                      <div style={{ display: 'flex', borderBottom: '1px solid #f5f5f5', padding: '8px 0' }}>
                        <span style={{ width: 120, color: '#8c8c8c', fontSize: 13, flexShrink: 0 }}>{s.key}</span>
                        <span style={{ fontSize: 13, fontWeight: 500 }}>{s.value}</span>
                      </div>
                    </Col>
                  );
                })}
              </Row>

            </Card>

            {/* ========== 用户评价区域 ========== */}
            <Card style={{ borderRadius: 12, marginBottom: 24 }} id="reviews-section">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <MessageOutlined style={{ fontSize: 18, color: '#722ed1' }} />
                  <span style={{ fontSize: 18, fontWeight: 700 }}>用户评价</span>
                  <Tag color="purple" style={{ marginLeft: 4 }}>{reviews.length} 条评价</Tag>
                </div>
              </div>

              {/* 评分概览 */}
              <div style={{ display: 'flex', gap: 32, marginBottom: 24, padding: 20, background: 'linear-gradient(135deg, #f9f0ff 0%, #f0f5ff 100%)', borderRadius: 12 }}>
                <div style={{ textAlign: 'center', minWidth: 120 }}>
                  <div style={{ fontSize: 42, fontWeight: 800, color: '#722ed1', lineHeight: 1 }}>{DETAIL.rating}</div>
                  <Rate disabled defaultValue={DETAIL.rating} allowHalf style={{ fontSize: 14, marginTop: 8 }} />
                  <div style={{ fontSize: 12, color: '#8c8c8c', marginTop: 4 }}>{DETAIL.reviewCount} 人评价</div>
                </div>
                <div style={{ flex: 1 }}>
                  {RATING_DISTRIBUTION.map(function (item) {
                    var total = RATING_DISTRIBUTION.reduce(function (sum, r) { return sum + r.count; }, 0);
                    var pct = Math.round(item.count / total * 100);
                    return (
                      <div key={item.star} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                        <span style={{ fontSize: 12, color: '#8c8c8c', minWidth: 32 }}>{item.star} 星</span>
                        <Progress percent={pct} showInfo={false} strokeColor={item.star >= 4 ? '#722ed1' : item.star === 3 ? '#faad14' : '#ff4d4f'} trailColor="#e8e8e8" style={{ flex: 1, margin: 0 }} size="small" />
                        <span style={{ fontSize: 12, color: '#8c8c8c', minWidth: 24, textAlign: 'right' }}>{item.count}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 发表评价 */}
              <div style={{ marginBottom: 24, padding: 20, background: '#fafafa', borderRadius: 12, border: '1px dashed #d9d9d9' }}>
                <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <UserOutlined style={{ color: '#722ed1' }} />
                  发表评价
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                  <span style={{ fontSize: 13, color: '#595959' }}>商品评分：</span>
                  <Rate value={reviewRating} onChange={function (v) { setReviewRating(v); }} style={{ fontSize: 20 }} />
                  <span style={{ fontSize: 13, color: '#faad14', fontWeight: 600 }}>{reviewRating}.0</span>
                </div>
                <Input.TextArea
                  rows={3}
                  value={reviewText}
                  onChange={function (e) { setReviewText(e.target.value); }}
                  placeholder="分享您的商品体验，帮助更多用户了解该商品..."
                  maxLength={500}
                  showCount
                  style={{ marginBottom: 12, borderRadius: 8 }}
                />
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Button
                    type="primary"
                    disabled={!reviewText.trim()}
                    onClick={function () {
                      var newReview = {
                        id: Date.now(),
                        user: '当前用户',
                        rating: reviewRating,
                        date: new Date().toISOString().slice(0, 10),
                        content: reviewText
                      };
                      setReviews([newReview].concat(reviews));
                      setReviewText('');
                      setReviewRating(5);
                      message.success('评价发布成功！感谢您的反馈。');
                    }}
                    style={{ borderRadius: 6, height: 36, paddingLeft: 24, paddingRight: 24, background: '#722ed1', borderColor: '#722ed1' }}
                  >
                    提交评价
                  </Button>
                </div>
              </div>

              {/* 评价列表 */}
              <List
                itemLayout="vertical"
                dataSource={reviews}
                renderItem={function (item) {
                  return (
                    <List.Item
                      key={item.id}
                      style={{ padding: '16px 0', borderBottom: '1px solid #f0f0f0' }}
                    >
                      <div style={{ display: 'flex', gap: 12 }}>
                        <Avatar size={40} style={{ background: 'linear-gradient(135deg, #d3adf7, #722ed1)', flexShrink: 0, fontSize: 16, fontWeight: 600 }}>
                          {item.user.slice(0, 1)}
                        </Avatar>
                        <div style={{ flex: 1 }}>
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                              <span style={{ fontSize: 14, fontWeight: 600, color: '#262626' }}>{item.user}</span>
                              <Rate disabled defaultValue={item.rating} allowHalf style={{ fontSize: 12 }} />
                            </div>
                            <span style={{ fontSize: 12, color: '#bfbfbf' }}>{item.date}</span>
                          </div>
                          <p style={{ fontSize: 14, color: '#595959', lineHeight: 1.8, margin: '8px 0 0' }}>{item.content}</p>
                        </div>
                      </div>
                    </List.Item>
                  );
                }}
              />
            </Card>
          </Col>

          <Col xs={24} md={7}>
            <Card style={{ borderRadius: 12, marginBottom: 16 }}>
              <Button type="primary" size="large" block style={{ height: 48, fontSize: 16, background: '#722ed1', borderColor: '#722ed1' }} onClick={function () { setIntentionModalOpen(true); }}>
                预约购买
              </Button>
            </Card>
            <Card style={{ borderRadius: 12, marginBottom: 16 }}>
              <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>供应商信息</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                <div style={{ width: 40, height: 40, borderRadius: 8, background: '#f9f0ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <TeamOutlined style={{ color: '#722ed1' }} />
                </div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 500 }}>{DETAIL.supplier}</div>
                  <div style={{ fontSize: 12, color: '#8c8c8c' }}><SafetyCertificateOutlined style={{ color: '#52c41a', marginRight: 4 }} />认证供应商</div>
                </div>
              </div>
              <div style={{ padding: 12, background: '#f5f5f5', borderRadius: 8 }}>
                <div style={{ fontSize: 13, color: '#8c8c8c', marginBottom: 8 }}>联系人：{DETAIL.contactPerson}</div>
                <div style={{ fontSize: 18, fontWeight: 600, color: '#722ed1', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <PhoneOutlined /> {DETAIL.contactPhone}
                </div>
              </div>
            </Card>
            {DETAIL.guarantees && DETAIL.guarantees.length > 0 && (
              <Card style={{ borderRadius: 12 }}>
                <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>服务保障</div>
                <div style={{ fontSize: 13, color: '#595959', lineHeight: 2 }}>
                  {DETAIL.guarantees.map(function(g, i) {
                    return <div key={i}><CheckCircleOutlined style={{ color: '#52c41a', marginRight: 8 }} />{g}</div>;
                  })}
                </div>
              </Card>
            )}
          </Col>
        </Row>
      </div>

      <Modal
        title="预约购买"
        open={intentionModalOpen}
        onCancel={function () { setIntentionModalOpen(false); }}
        footer={[
          <Button key="back" onClick={function () { setIntentionModalOpen(false); }}>取消</Button>,
          <Button key="submit" type="primary" style={{ background: '#722ed1', borderColor: '#722ed1' }} onClick={function () {
            form.validateFields().then(function () {
              message.success('您的预约已提交！商家将尽快与您联系。');
              setIntentionModalOpen(false);
              form.resetFields();
            });
          }}>提交预约</Button>
        ]}
      >
        <div style={{ marginBottom: 16, padding: 12, background: '#f9f0ff', borderRadius: 8, color: '#722ed1', fontSize: 13, border: '1px solid #d3adf7' }}>
          提交后，商家将收到您的联系方式并与您对接，具体采购细节与费用将由双方线下确认。
        </div>
        <Form form={form} layout="vertical">
          <Form.Item name="quantity" label="采购数量" rules={[{ required: true, message: '请输入采购数量' }]} initialValue={1}>
            <InputNumber min={1} style={{ width: '100%' }} placeholder="请输入采购数量" />
          </Form.Item>
          <Form.Item name="contactName" label="联系人姓名" rules={[{ required: true, message: '请输入联系人姓名' }]}>
            <Input placeholder="请输入您的姓名" />
          </Form.Item>
          <Form.Item name="contactPhone" label="联系电话" rules={[{ required: true, message: '请输入联系电话' }]}>
            <Input placeholder="请输入您的联系电话" />
          </Form.Item>
          <Form.Item name="requirements" label="需求备注" rules={[{ required: true, message: '请简述您的需求' }]}>
            <Input.TextArea rows={4} placeholder="例如：希望尽快发货，或有特殊的技术参数要求等。" />
          </Form.Item>
        </Form>
      </Modal>

    </div>
  );
};

export default Component;
