/**
 * @name 服务详情
 * @mode axure
 * /Users/xu/Desktop/元引信息/Axhub-Make-main/skills/axure-export-workflow/SKILL.md
 *
 */

import './style.css';

import React, { useState, useCallback } from 'react';
import { Card, Tag, Breadcrumb, Divider, Row, Col, Segmented, Rate, Button, message, Modal, Form, Input, Avatar, List, Progress } from 'antd';
import { HomeOutlined, ArrowLeftOutlined, FileTextOutlined, FontSizeOutlined, DollarOutlined, ClockCircleOutlined, EnvironmentOutlined, PhoneOutlined, StarOutlined, SafetyCertificateOutlined, CheckCircleOutlined, TeamOutlined, CompassOutlined, UserOutlined, MessageOutlined } from '@ant-design/icons';

var DETAIL = {
  title: '山地物资调运',
  category: '行业应用',
  categoryColor: '#fa8c16',
  price: '¥1,200/架次',
  duration: '按项目周期',
  area: '郑州市全域',
  rating: 4.8,
  reviewCount: 56,
  provider: '大疆通用航空服务（郑州）有限公司',
  providerRating: 4.9,
  highlight: '',
  equipment: '大疆 FlyCart 30、大疆 M350 RTK',
  delivery: '《无人机物资运输作业报告》（含航迹图、签收表）',
  highlights: '持证飞手 · 全程保险 · 恶劣天气安全优先',
  contact: '王工',
  phone: '138-0000-8888',
  desc: '利用大载重无人机（最大载荷 40kg）为山区、高原、海岛等交通不便区域提供物资运输服务。可承载建材、医疗急救物资、生活补给品等，大幅缩短传统人力或车辆运输时间，降低作业风险。',
  content: [
    '服务介绍',
    '山地物资调运服务面向交通不便的偏远山区、施工工地、灾后救援现场等场景，通过工业级多旋翼/垂直起降固定翼无人机，实现点对点空中物资快速投递。',
    '',
    '适用场景',
    '· 高山基站建设：运输通信基站配件、光缆、工具箱等',
    '· 电力设施维护：向高山铁塔输送绝缘子、工具等检修物资',
    '· 应急救援：向灾区/被困人员投递药品、食品、饮用水',
    '· 林业作业：向护林点运送生活物资和灭火器材',
    '· 工程施工：向山顶/山腰施工点运送水泥、钢筋等建材',
    '',
    '投入设备',
    '· 主力机型：大疆 FlyCart 30（最大载荷 40kg，最远航程 16km）',
    '· 备用机型：大疆 M350 RTK + 挂载吊舱（轻量级物资 5kg 以内）',
    '· 地面站：D-RTK 2 高精度 GNSS 移动站',
    '· 辅助设备：RTK 测量仪、风速仪、对讲机',
    '',
    '作业流程',
    '一、前期勘察',
    '· 实地踏勘起降点与投递点的地形、海拔和障碍物分布',
    '· 利用无人机进行航线预飞与三维建模',
    '· 制定飞行方案并报备当地空域管理部门',
    '',
    '二、现场执行',
    '· 专业飞手驻场操作，双人配合（飞手 + 安全员）',
    '· 单架次载荷根据物资类型灵活配载',
    '· 全程 4G/5G 图传实时回传飞行画面',
    '· 投递点配置地面引导人员接收物资',
    '',
    '三、交付验收',
    '· 每次飞行自动生成飞行日志（含航迹、载荷、电量等数据）',
    '· 项目结束后提交完整的《无人机物资运输作业报告》',
    '· 包含：作业航迹图、物资清单签收表、安全记录表',
    '',
    '服务保障',
    '· 全部飞行器均通过民航局适航认证',
    '· 飞手持有 AOPA/CAAC 超视距驾驶员执照',
    '· 每架次投保无人机机体险 + 第三方责任险',
    '· 恶劣天气自动暂停作业，安全优先'
  ]
};

var REVIEWS = [
  { id: 1, user: '张先生', rating: 5, date: '2026-04-28', content: '非常专业的服务团队！山区基站建设项目中，无人机吊运效率远超传统人工搬运。飞手操作娴熟，安全措施到位，全程实时图传让我们甲方也能掌握作业进度。强烈推荐！' },
  { id: 2, user: '李女士', rating: 5, date: '2026-04-15', content: '应急救援场景下使用了他们的物资调运服务，响应速度很快，从接单到飞手到场不到3小时。FlyCart 30 载荷能力确实强悍，一次运了30多公斤的医疗物资上山。' },
  { id: 3, user: '王经理', rating: 4, date: '2026-03-22', content: '电力线路检修用了两次他们的服务，整体不错。唯一的建议是希望能增加夜间作业能力，有时候紧急抢修等不到天亮。交付的作业报告非常详细规范。' },
  { id: 4, user: '赵工', rating: 5, date: '2026-03-10', content: '林场物资补给一直是我们的痛点，自从用了无人机调运服务，效率提升了10倍不止。飞手团队很专业，风大的时候主动暂停作业保安全，值得信赖。' },
  { id: 5, user: '孙总', rating: 4, date: '2026-02-18', content: '施工工地用来运水泥袋上山坡，省了不少人力。价格合理，服务态度也好。就是希望单架次载荷还能再大一些，40公斤有时候还是不太够用。' }
];

var RATING_DISTRIBUTION = [
  { star: 5, count: 38 },
  { star: 4, count: 12 },
  { star: 3, count: 4 },
  { star: 2, count: 1 },
  { star: 1, count: 1 }
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

var Component = function ServiceDetailPage() {
  var [fontSize, setFontSize] = useState<string>('中');
  var fontSizeMap: Record<string, number> = { '小': 14, '中': 16, '大': 18 };
  var [orderModalOpen, setOrderModalOpen] = useState(false);
  var [form] = Form.useForm();
  var [reviewRating, setReviewRating] = useState(5);
  var [reviewText, setReviewText] = useState('');
  var [reviews, setReviews] = useState(REVIEWS);

  var handleNavigate = useCallback(function (key: string) {
    window.location.href = '/prototypes/' + key;
  }, []);
  var isPreview = typeof window !== 'undefined' && window.location.search.includes('preview=true');

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
          { title: <a onClick={function () { handleNavigate('service-category-detail'); }}>{DETAIL.category}</a> },
          { title: DETAIL.title }
        ]} style={{ marginBottom: 24 }} />

        <Row gutter={24}>
          <Col xs={24} md={17}>
            <Card style={{ borderRadius: 12, marginBottom: 24 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                <a onClick={function () { handleNavigate('service-category-detail'); }} style={{ color: '#1677ff', cursor: 'pointer', fontSize: 13 }}>
                  <ArrowLeftOutlined /> 返回{DETAIL.category}
                </a>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <FontSizeOutlined style={{ color: '#8c8c8c' }} />
                  <Segmented options={['小', '中', '大']} value={fontSize} onChange={function (v) { setFontSize(v as string); }} size="small" />
                </div>
              </div>

              <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
                <Tag color="orange">{DETAIL.category}</Tag>
              </div>

              <h1 style={{ fontSize: 24, fontWeight: 700, lineHeight: 1.4, marginBottom: 12 }}>{DETAIL.title}</h1>

              <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', color: '#8c8c8c', fontSize: 13, marginBottom: 16 }}>
                <span style={{ color: '#ff4d4f', fontWeight: 700, fontSize: 20 }}>¥{DETAIL.price.replace('¥', '')}</span>
                <span><ClockCircleOutlined /> {DETAIL.duration}</span>
                <span><EnvironmentOutlined /> {DETAIL.area}</span>
                <span><StarOutlined /> <Rate disabled defaultValue={DETAIL.rating} allowHalf style={{ fontSize: 12 }} /> {DETAIL.rating} ({DETAIL.reviewCount}人评价)</span>
              </div>

              <div style={{ background: '#f6ffed', padding: 16, borderRadius: 8, marginBottom: 16, borderLeft: '4px solid #52c41a' }}>
                <p style={{ fontSize: 15, color: '#595959', lineHeight: 1.8, margin: 0 }}>{DETAIL.desc}</p>
              </div>

              {/* 服务信息摘要卡片 */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
                <div style={{ padding: 12, background: '#fafafa', borderRadius: 8 }}>
                  <div style={{ fontSize: 12, color: '#8c8c8c', marginBottom: 4 }}>投入设备</div>
                  <div style={{ fontSize: 14, fontWeight: 500 }}>{DETAIL.equipment}</div>
                </div>
                <div style={{ padding: 12, background: '#fafafa', borderRadius: 8 }}>
                  <div style={{ fontSize: 12, color: '#8c8c8c', marginBottom: 4 }}>交付标准</div>
                  <div style={{ fontSize: 14, fontWeight: 500 }}>{DETAIL.delivery}</div>
                </div>
              </div>

              {DETAIL.highlights && (
                <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
                  {DETAIL.highlights.split('·').filter(Boolean).map((h: string, i: number) => (
                    <Tag key={i} color="green" style={{ padding: '4px 12px', borderRadius: 12 }}>{h.trim()}</Tag>
                  ))}
                </div>
              )}

              <div style={{ marginBottom: 16 }}>
                <div style={{ height: 240, borderRadius: 10, overflow: 'hidden', marginBottom: 12 }}>
                  <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg, #e6f4ff 0%, #bae0ff 30%, #91caff 60%, #69b1ff 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 8 }}>
                    <CompassOutlined style={{ fontSize: 48, color: '#fa8c16' }} />
                    <span style={{ fontSize: 14, color: '#fa8c16' }}>山地物资调运 · 大疆 FlyCart 30 作业实景</span>
                  </div>
                </div>
                <Row gutter={12}>
                  <Col span={8}>
                    <div style={{ height: 100, borderRadius: 8, overflow: 'hidden', background: 'linear-gradient(135deg, #f0f5ff, #d6e4ff)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                      <span style={{ fontSize: 11, color: '#1677ff' }}>无人机吊运实拍</span>
                    </div>
                  </Col>
                  <Col span={8}>
                    <div style={{ height: 100, borderRadius: 8, overflow: 'hidden', background: 'linear-gradient(135deg, #e6fffb, #b5f5ec)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                      <span style={{ fontSize: 11, color: '#13c2c2' }}>山区起降点</span>
                    </div>
                  </Col>
                  <Col span={8}>
                    <div style={{ height: 100, borderRadius: 8, overflow: 'hidden', background: 'linear-gradient(135deg, #fff7e6, #ffe7ba)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                      <span style={{ fontSize: 11, color: '#fa8c16' }}>物资装载作业</span>
                    </div>
                  </Col>
                </Row>
              </div>

              <Divider />

              <div style={{ fontSize: fontSizeMap[fontSize], lineHeight: 1.8 }}>
                {DETAIL.content.map(function (line, idx) {
                  if (!line) return <div key={idx} style={{ height: 12 }} />;
                  var isTitle = /^服务介绍|飞行路线|服务包含|配套服务|预订须知|安全保障$/.test(line);
                  var isSection = /^[一二二三四五六]/.test(line);
                  return (
                    <p key={idx} style={{ margin: 0, marginBottom: 4, fontWeight: isTitle ? 600 : 400, fontSize: isTitle ? fontSizeMap[fontSize] + 2 : fontSizeMap[fontSize] }}>
                      {line}
                    </p>
                  );
                })}
              </div>
            </Card>

            {/* ========== 用户评价区域 ========== */}
            <Card style={{ borderRadius: 12, marginBottom: 24 }} id="reviews-section">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <MessageOutlined style={{ fontSize: 18, color: '#1677ff' }} />
                  <span style={{ fontSize: 18, fontWeight: 700 }}>用户评价</span>
                  <Tag color="blue" style={{ marginLeft: 4 }}>{reviews.length} 条评价</Tag>
                </div>
              </div>

              {/* 评分概览 */}
              <div style={{ display: 'flex', gap: 32, marginBottom: 24, padding: 20, background: 'linear-gradient(135deg, #f0f5ff 0%, #e6f4ff 100%)', borderRadius: 12 }}>
                <div style={{ textAlign: 'center', minWidth: 120 }}>
                  <div style={{ fontSize: 42, fontWeight: 800, color: '#1677ff', lineHeight: 1 }}>{DETAIL.rating}</div>
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
                        <Progress percent={pct} showInfo={false} strokeColor={item.star >= 4 ? '#1677ff' : item.star === 3 ? '#faad14' : '#ff4d4f'} trailColor="#e8e8e8" style={{ flex: 1, margin: 0 }} size="small" />
                        <span style={{ fontSize: 12, color: '#8c8c8c', minWidth: 24, textAlign: 'right' }}>{item.count}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 发表评价 */}
              {!isPreview && (
              <div style={{ marginBottom: 24, padding: 20, background: '#fafafa', borderRadius: 12, border: '1px dashed #d9d9d9' }}>
                <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <UserOutlined style={{ color: '#1677ff' }} />
                  发表评价
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                  <span style={{ fontSize: 13, color: '#595959' }}>服务评分：</span>
                  <Rate value={reviewRating} onChange={function (v) { setReviewRating(v); }} style={{ fontSize: 20 }} />
                  <span style={{ fontSize: 13, color: '#faad14', fontWeight: 600 }}>{reviewRating}.0</span>
                </div>
                <Input.TextArea
                  rows={3}
                  value={reviewText}
                  onChange={function (e) { setReviewText(e.target.value); }}
                  placeholder="分享您的服务体验，帮助更多用户了解该服务..."
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
                        avatar: '',
                        rating: reviewRating,
                        date: new Date().toISOString().slice(0, 10),
                        content: reviewText,
                        likes: 0,
                        reply: ''
                      };
                      setReviews([newReview].concat(reviews));
                      setReviewText('');
                      setReviewRating(5);
                      message.success('评价发布成功！感谢您的反馈。');
                    }}
                    style={{ borderRadius: 6, height: 36, paddingLeft: 24, paddingRight: 24 }}
                  >
                    提交评价
                  </Button>
                </div>
              </div>
              )}

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
                        <Avatar size={40} style={{ background: 'linear-gradient(135deg, #1677ff, #4096ff)', flexShrink: 0, fontSize: 16, fontWeight: 600 }}>
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
            {!isPreview && (
            <Card style={{ borderRadius: 12, marginBottom: 16 }}>
              <Button type="primary" size="large" block style={{ height: 48, fontSize: 16, marginBottom: 12 }} onClick={function () { setOrderModalOpen(true); }}>
                预约服务
              </Button>
            </Card>
            )}

            <Card style={{ borderRadius: 12, marginBottom: 16 }}>
              <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>服务商信息</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                <div style={{ width: 40, height: 40, borderRadius: 8, background: '#e6f4ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <TeamOutlined style={{ color: '#1677ff' }} />
                </div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 500 }}>{DETAIL.provider}</div>
                  <div style={{ fontSize: 12, color: '#8c8c8c' }}>
                    <SafetyCertificateOutlined style={{ color: '#52c41a', marginRight: 4 }} />已认证服务商
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 8 }}>
                <span style={{ fontSize: 13, color: '#8c8c8c' }}>服务评分</span>
                <Rate disabled defaultValue={DETAIL.providerRating} allowHalf style={{ fontSize: 12 }} />
                <span style={{ fontSize: 13, color: '#faad14', fontWeight: 600 }}>{DETAIL.providerRating}</span>
              </div>
              <div style={{ fontSize: 12, color: '#8c8c8c' }}><CheckCircleOutlined style={{ color: '#52c41a', marginRight: 4 }} />持证经营 · 保险齐全 · 安全保障</div>
            </Card>

            <Card style={{ borderRadius: 12, marginBottom: 16 }}>
              <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>联系方式</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <span style={{ fontSize: 13, color: '#8c8c8c' }}>联系人：</span>
                <span style={{ fontSize: 14, fontWeight: 500 }}>{DETAIL.contact}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 13, color: '#8c8c8c' }}>联系电话：</span>
                <span style={{ fontSize: 14, fontWeight: 500, color: '#1677ff' }}>{DETAIL.phone}</span>
              </div>
            </Card>

          </Col>
        </Row>
      </div>

      <Modal
        title="预约服务"
        open={orderModalOpen}
        onCancel={function () { setOrderModalOpen(false); }}
        footer={[
          <Button key="back" onClick={function () { setOrderModalOpen(false); }}>取消</Button>,
          <Button key="submit" type="primary" onClick={function () {
            form.validateFields().then(function () {
              message.success('预约提交成功！服务商将尽快与您联系。');
              setOrderModalOpen(false);
              form.resetFields();
            });
          }}>提交预约</Button>
        ]}
      >
        <div style={{ marginBottom: 16, padding: 12, background: '#e6f4ff', borderRadius: 8, color: '#1677ff', fontSize: 13 }}>
          提交预约后，服务提供方将收到您的联系方式并与您进行对接，具体服务细节与费用将由双方线下确认。
        </div>
        <Form form={form} layout="vertical">
          <Form.Item name="contactName" label="联系人姓名" rules={[{ required: true, message: '请输入联系人姓名' }]}>
            <Input placeholder="请输入您的姓名" />
          </Form.Item>
          <Form.Item name="contactPhone" label="联系电话" rules={[{ required: true, message: '请输入联系电话' }]}>
            <Input placeholder="请输入您的联系电话" />
          </Form.Item>
          <Form.Item name="requirements" label="需求说明 / 备注" rules={[{ required: true, message: '请简述您的需求' }]}>
            <Input.TextArea rows={4} placeholder="例如：希望下周三在XX区域进行服务，时间大约在下午2点左右。" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Component;
