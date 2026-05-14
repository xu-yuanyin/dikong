/**
 * @name 商品评价
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
  { name: '飞行器整机', rating: 4.8, count: 526, color: '#1677ff' },
  { name: '配件与电池', rating: 4.7, count: 856, color: '#52c41a' },
  { name: '传感器载荷', rating: 4.9, count: 212, color: '#fa8c16' },
  { name: '软件系统', rating: 4.5, count: 198, color: '#722ed1' },
  { name: '配套设施', rating: 4.6, count: 323, color: '#13c2c2' }
];

var REVIEWS = [
  { id: 1, service: 'DJI Matrice 350 RTK 工业级无人机', category: '飞行器整机', user: '飞手李先生', rating: 5, content: '抗风性能极佳，图传稳定，双控模式在复杂地形作业时非常实用，电池续航也能满足日常需求。', time: '2026-04-22', avatar: '李' },
  { id: 2, service: '大疆 TB65 智能飞行电池', category: '配件与电池', user: '张同学', rating: 5, content: '原装正品，循环寿命长，充电速度快，配合智能电池箱简直是外场作业的神器！', time: '2026-04-21', avatar: '张' },
  { id: 3, service: 'Zenmuse L2 激光雷达', category: '传感器载荷', user: '王经理', rating: 5, content: '穿透力很强，植被覆盖率高的山区也能打出很好的地表模型，精度完全满足1:500测图。', time: '2026-04-20', avatar: '王' },
  { id: 4, service: '大疆司空 2 云平台', category: '软件系统', user: '赵先生', rating: 4, content: '团队协作和航线规划功能强大，不过偶尔会有网络延迟，希望能优化一下弱网环境下的体验。', time: '2026-04-19', avatar: '赵' },
  { id: 5, service: '纵横 CW-25 垂直起降固定翼', category: '飞行器整机', user: '陈飞手', rating: 5, content: '长航时大面积巡检的绝对主力，起降方便不需要跑道，气动布局很成熟，非常可靠。', time: '2026-04-18', avatar: '陈' },
  { id: 6, service: '便携式无人机停机坪', category: '配套设施', user: 'XX航拍公司', rating: 4, content: '材质结实，折叠收纳方便，附带地钉在野外也能固定得很稳，就是反光条如果更宽一点夜降会更好。', time: '2026-04-17', avatar: 'X' }
];

var PRODUCT_OPTIONS = [
  { value: 'DJI Matrice 350 RTK 工业级无人机', label: 'DJI Matrice 350 RTK 工业级无人机' },
  { value: '大疆 TB65 智能飞行电池', label: '大疆 TB65 智能飞行电池' },
  { value: 'Zenmuse L2 激光雷达', label: 'Zenmuse L2 激光雷达' },
  { value: '纵横 CW-25 垂直起降固定翼', label: '纵横 CW-25 垂直起降固定翼' },
  { value: '便携式无人机停机坪', label: '便携式无人机停机坪' }
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

var Component = function MallReviewPage() {
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
          { title: <a onClick={function () { handleNavigate('mall-list'); }}>低空商城</a> },
          { title: '商品评价' }
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
                    <div style={{ fontSize: 13, color: '#1677ff', marginBottom: 4 }}>商品型号：{r.service}</div>
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
          <Form.Item name="product" label="购买商品" rules={[{ required: true, message: '请选择购买的商品' }]}>
            <Select placeholder="请选择您购买过的商品" options={PRODUCT_OPTIONS} />
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
