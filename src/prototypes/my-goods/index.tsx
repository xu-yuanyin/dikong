/**
 * @name 我的商品（商户）
 * @mode axure
 */

import './style.css';

import React, { useState, useCallback } from 'react';
import { Card, Table, Tag, Button, Breadcrumb, Avatar, Row, Col, message, Modal, Tabs, Descriptions } from 'antd';
import { HomeOutlined, UserOutlined, SafetyCertificateOutlined, PlusOutlined, ClockCircleOutlined, ExclamationCircleOutlined } from '@ant-design/icons';

var MENU_ITEMS = [
  { key: 'profile-certified', label: '我的信息', group: '账号管理' },
  { key: 'role-management', label: '角色管理' },
  { key: 'message-center', label: '消息中心' },
  { key: 'my-orders', label: '我的预约', group: '个人/需求方业务' },
  { key: 'my-demand', label: '我的需求' },
  { key: 'my-aircraft', label: '我的飞行器', group: '飞行服务 (飞手/企业)' },
  { key: 'my-flight-plan', label: '我的飞行计划' },
  { key: 'my-goods', label: '我的商品', group: '低空商城 (商户)' },
  { key: 'mall-publish', label: '发布商品' },
  { key: 'my-service', label: '我的服务', group: '低空服务 (飞行服务商)' },
  { key: 'service-publish', label: '发布服务项目' },
  { key: 'provider-orders', label: '服务受理单' },
  { key: 'provider-intentions', label: '商品受理单' }
];

var GOODS_DATA = [
  { key: '1', name: 'DJI Matrice 350 RTK 工业级无人机', category: '飞行器', price: '¥68,800', stock: 15, sales: 23, status: '销售中', createDate: '2026-03-10' },
  { key: '2', name: '大疆 DJI Mavic 3 Enterprise', category: '飞行器', price: '¥23,800', stock: 28, sales: 45, status: '已下架', createDate: '2026-02-18' },
  { key: '3', name: '纵横 CW-25 垂直起降固定翼', category: '飞行器', price: '¥128,000', stock: 5, sales: 8, status: '销售中', createDate: '2026-01-20' },

  { key: '5', name: '道通 EVO Lite+ 航拍无人机', category: '飞行器', price: '¥7,999', stock: 20, sales: 67, status: '销售中', createDate: '2026-04-01' },
  { key: '6', name: '大疆 DJI Air 3S 旗舰航拍机', category: '飞行器', price: '¥8,999', stock: 30, sales: 0, status: '待审核', createDate: '2026-05-18' },
  { key: '7', name: '无人机专用降落伞安全系统', category: '安全设备', price: '¥3,200', stock: 50, sales: 0, status: '待审核', createDate: '2026-05-19' },
  { key: '8', name: '低空通信模块 V2.0', category: '通信设备', price: '¥12,500', stock: 10, sales: 0, status: '已驳回', createDate: '2026-05-12', rejectReason: '商品描述中缺少必要的产品认证信息（如 3C 认证编号），且商品图片模糊不清，请补充后重新提交。' }
];

var STATUS_COLOR_MAP: Record<string, string> = {
  '销售中': 'green',
  '已下架': 'default',
  '待审核': 'orange',
  '已驳回': 'red'
};

var handleNavigate = function (key: string) {
  window.location.href = '/prototypes/' + key;
};

var Component = function MyGoodsPage() {
  var [activeTab, setActiveTab] = useState('all');
  var [detailRecord, setDetailRecord] = useState<any>(null);
  var [previewOpen, setPreviewOpen] = useState(false);

  var COLUMNS = [
    { title: '商品名称', dataIndex: 'name', key: 'name', render: function (n: string) { return <a style={{ fontWeight: 500 }}>{n}</a>; } },
    { title: '商品类别', dataIndex: 'category', key: 'category', render: function (t: string) { return <Tag color="purple">{t}</Tag>; } },
    { title: '售价', dataIndex: 'price', key: 'price', render: function (p: string) { return <span style={{ color: '#ff4d4f', fontWeight: 600 }}>{p}</span>; } },
    { title: '库存数量', dataIndex: 'stock', key: 'stock', render: function (s: number) { return <span style={{ color: s === 0 ? '#ff4d4f' : s < 10 ? '#fa8c16' : '#52c41a' }}>{s}</span>; } },
    { title: '总销量', dataIndex: 'sales', key: 'sales' },
    { title: '商品状态', dataIndex: 'status', key: 'status', render: function (s: string) { return <Tag color={STATUS_COLOR_MAP[s] || 'default'}>{s}</Tag>; } },
    { title: '发布日期', dataIndex: 'createDate', key: 'createDate' },
    { title: '操作', key: 'action', render: function (_: any, record: any) {
      return (
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <a style={{ color: '#1677ff' }} onClick={function () { setDetailRecord(record); }}>查看</a>
          {record.status === '销售中' && (
            <>
              <a style={{ color: '#1677ff' }} onClick={function () { message.success('编辑商品'); }}>编辑</a>
              <a style={{ color: '#faad14' }} onClick={function () { message.success('已下架'); }}>下架</a>
            </>
          )}
          {record.status === '已下架' && (
            <>
              <a style={{ color: '#1677ff' }} onClick={function () { message.success('编辑商品'); }}>编辑</a>
              <a style={{ color: '#52c41a' }} onClick={function () { message.success('已重新发布'); }}>重新发布</a>
              <a style={{ color: '#ff4d4f' }} onClick={function () { message.success('已删除'); }}>删除</a>
            </>
          )}
          {record.status === '待审核' && (
            <span style={{ color: '#8c8c8c', fontSize: 13 }}><ClockCircleOutlined style={{ marginRight: 4 }} />等待运营审核中…</span>
          )}
          {record.status === '已驳回' && (
            <>
              <a style={{ color: '#faad14' }} onClick={function () { Modal.warning({ title: '驳回原因', content: record.rejectReason || '未提供驳回原因', okText: '我知道了' }); }}>查看原因</a>
              <a style={{ color: '#1677ff' }} onClick={function () { message.info('跳转至编辑页面（模拟）'); }}>重新编辑</a>
            </>
          )}

        </div>
      );
    }}
  ];

  var tabItems = [
    { key: 'all', label: '全部 (' + GOODS_DATA.length + ')' },
    { key: '待审核', label: '待审核 (' + GOODS_DATA.filter(function (d) { return d.status === '待审核'; }).length + ')' },
    { key: '销售中', label: '销售中 (' + GOODS_DATA.filter(function (d) { return d.status === '销售中'; }).length + ')' },
    { key: '已下架', label: '已下架 (' + GOODS_DATA.filter(function (d) { return d.status === '已下架'; }).length + ')' },
    { key: '已驳回', label: '已驳回 (' + GOODS_DATA.filter(function (d) { return d.status === '已驳回'; }).length + ')' },

  ];

  return (
    <div style={{ minHeight: '100vh', background: '#f5f5f5' }}>
      <header style={{ background: 'linear-gradient(135deg, #0c4a6e 0%, #eb2f96 100%)', padding: '0 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }} onClick={function () { handleNavigate('home'); }}>
            <SafetyCertificateOutlined style={{ fontSize: 20, color: '#fff' }} />
            <span style={{ fontSize: 16, fontWeight: 600, color: '#fff' }}>区域低空公共服务平台</span>
          </div>
          <div style={{ display: 'flex', gap: 16 }}>
            <a style={{ color: 'rgba(255,255,255,0.85)', cursor: 'pointer' }} onClick={function () { handleNavigate('home'); }}>首页</a>
            <a style={{ color: 'rgba(255,255,255,0.85)', cursor: 'pointer' }} onClick={function () { handleNavigate('news'); }}>资讯公告</a>
            <a style={{ color: 'rgba(255,255,255,0.85)', cursor: 'pointer' }} onClick={function () { handleNavigate('policy-national'); }}>政策法规</a>
            <a style={{ color: 'rgba(255,255,255,0.85)', cursor: 'pointer' }} onClick={function () { handleNavigate('service-list'); }}>低空服务</a>
            <a style={{ color: 'rgba(255,255,255,0.85)', cursor: 'pointer' }} onClick={function () { handleNavigate('mall-list'); }}>低空商城</a>
            <a style={{ color: 'rgba(255,255,255,0.85)', cursor: 'pointer' }} onClick={function () { handleNavigate('flight-dynamic'); }}>飞行服务</a>
            <a style={{ color: '#fff', fontWeight: 600, cursor: 'pointer' }}>个人中心</a>
          </div>
        </div>
      </header>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px 24px 48px' }}>
        <Breadcrumb items={[
          { title: <a onClick={function () { handleNavigate('home'); }}><HomeOutlined /> 首页</a> },
          { title: '个人中心' },
          { title: '我的商品' }
        ]} style={{ marginBottom: 24 }} />

        <Row gutter={24}>
          <Col xs={24} md={6}>
            <Card style={{ borderRadius: 12, marginBottom: 24 }}>
              <div style={{ textAlign: 'center', marginBottom: 16 }}>
                <Avatar size={80} icon={<UserOutlined />} style={{ backgroundColor: '#eb2f96', marginBottom: 12 }} />
                <div style={{ fontSize: 18, fontWeight: 600, color: '#1f1f1f' }}>张明</div>
                <Tag color="green" style={{ marginTop: 8 }}>飞手</Tag>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                {MENU_ITEMS.map(function (item) {
                  return (
                    <div key={item.key}>
                      {item.group ? <div style={{ fontSize: 11, color: '#bfbfbf', padding: '8px 16px 4px', fontWeight: 600, letterSpacing: 1 }}>{item.group}</div> : null}
                      <div
                        onClick={function () { if (item.key !== 'my-goods') handleNavigate(item.key); }}
                        style={{
                          padding: '10px 16px',
                          borderRadius: 8,
                          cursor: 'pointer',
                          background: item.key === 'my-goods' ? '#fff0f6' : 'transparent',
                          color: item.key === 'my-goods' ? '#eb2f96' : '#595959',
                          fontWeight: item.key === 'my-goods' ? 600 : 400,
                          fontSize: 14,
                          marginBottom: 4
                        }}
                      >
                        {item.label}
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          </Col>
          <Col xs={24} md={18}>
            <Card title="我的商品" extra={<Button type="primary" icon={<PlusOutlined />} onClick={function () { handleNavigate('mall-publish'); }}>发布商品</Button>} style={{ borderRadius: 12 }}>
              <div style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
                <div style={{ padding: '12px 20px', background: '#f6ffed', borderRadius: 8, textAlign: 'center' }}>
                  <div style={{ fontSize: 20, fontWeight: 700, color: '#52c41a' }}>{GOODS_DATA.filter(function (g) { return g.status === '销售中'; }).length}</div>
                  <div style={{ fontSize: 12, color: '#8c8c8c' }}>销售中</div>
                </div>
                <div style={{ padding: '12px 20px', background: '#fffbe6', borderRadius: 8, textAlign: 'center' }}>
                  <div style={{ fontSize: 20, fontWeight: 700, color: '#fa8c16' }}>{GOODS_DATA.filter(function (g) { return g.status === '待审核'; }).length}</div>
                  <div style={{ fontSize: 12, color: '#8c8c8c' }}>待审核</div>
                </div>
                <div style={{ padding: '12px 20px', background: '#fff2f0', borderRadius: 8, textAlign: 'center' }}>
                  <div style={{ fontSize: 20, fontWeight: 700, color: '#ff4d4f' }}>{GOODS_DATA.filter(function (g) { return g.status === '已驳回'; }).length}</div>
                  <div style={{ fontSize: 12, color: '#8c8c8c' }}>已驳回</div>
                </div>
                <div style={{ padding: '12px 20px', background: '#e6f4ff', borderRadius: 8, textAlign: 'center' }}>
                  <div style={{ fontSize: 20, fontWeight: 700, color: '#1677ff' }}>{GOODS_DATA.reduce(function (sum, g) { return sum + g.sales; }, 0)}</div>
                  <div style={{ fontSize: 12, color: '#8c8c8c' }}>总销量</div>
                </div>
              </div>
              

              {GOODS_DATA.filter(function (d) { return d.status === '待审核'; }).length > 0 && (
                <div style={{ padding: '8px 16px', background: '#fffbe6', border: '1px solid #ffe58f', borderRadius: 6, marginBottom: 16, color: '#ad6800', fontSize: 13 }}>
                  <ClockCircleOutlined style={{ marginRight: 6 }} />您有 {GOODS_DATA.filter(function (d) { return d.status === '待审核'; }).length} 件商品正在等待平台审核，预计 1-3 个工作日内完成。
                </div>
              )}
              {GOODS_DATA.filter(function (d) { return d.status === '已驳回'; }).length > 0 && (
                <div style={{ padding: '8px 16px', background: '#fff2f0', border: '1px solid #ffccc7', borderRadius: 6, marginBottom: 16, color: '#cf1322', fontSize: 13 }}>
                  <ExclamationCircleOutlined style={{ marginRight: 6 }} />您有 {GOODS_DATA.filter(function (d) { return d.status === '已驳回'; }).length} 件商品审核未通过，请查看驳回原因并修改后重新提交。
                </div>
              )}
              
              <Tabs
                activeKey={activeTab}
                onChange={setActiveTab}
                items={tabItems}
                style={{ marginBottom: 0 }}
              />
              <Table 
                columns={COLUMNS} 
                dataSource={activeTab === 'all' ? GOODS_DATA : GOODS_DATA.filter(function(d) { return d.status === activeTab; })} 
                pagination={{ pageSize: 5 }} 
              />
            </Card>
          </Col>
        </Row>
      </div>

      <Modal
        title="商品详情"
        open={!!detailRecord}
        onCancel={function () { setDetailRecord(null); }}
        width={700}
        footer={[
          <Button key="close" onClick={function () { setDetailRecord(null); }}>关闭</Button>,
          <Button key="preview" type="primary" onClick={function () { setDetailRecord(null); setPreviewOpen(true); }}>预览</Button>
        ]}
      >
        {detailRecord && (
          <Descriptions column={2} bordered size="small">
            <Descriptions.Item label="商品名称" span={2}><span style={{ fontWeight: 600 }}>{detailRecord.name}</span></Descriptions.Item>
            <Descriptions.Item label="商品类别"><Tag color="purple">{detailRecord.category}</Tag></Descriptions.Item>
            <Descriptions.Item label="商品售价"><span style={{ color: '#ff4d4f', fontWeight: 600 }}>{detailRecord.price}</span></Descriptions.Item>
            <Descriptions.Item label="库存数量"><span style={{ color: detailRecord.stock === 0 ? '#ff4d4f' : detailRecord.stock < 10 ? '#fa8c16' : '#52c41a' }}>{detailRecord.stock}</span></Descriptions.Item>
            <Descriptions.Item label="总销量">{detailRecord.sales}</Descriptions.Item>
            <Descriptions.Item label="品牌/型号" span={2}>大疆创新</Descriptions.Item>
            <Descriptions.Item label="供应商" span={2}>XX无人机专营店</Descriptions.Item>
            <Descriptions.Item label="联系人">李经理</Descriptions.Item>
            <Descriptions.Item label="联系电话"><span style={{ color: '#1677ff' }}>400-888-9999</span></Descriptions.Item>
            <Descriptions.Item label="商品描述" span={2}>
              <div style={{ lineHeight: 1.8, fontSize: 13 }}>专业级低空飞行器/配件，品质保障，平台认证供应商提供。</div>
            </Descriptions.Item>
            <Descriptions.Item label="服务保障" span={2}>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                <Tag color="green">正品保证</Tag>
                <Tag color="green">全国联保</Tag>
                <Tag color="green">7天无理由退换</Tag>
              </div>
            </Descriptions.Item>
            <Descriptions.Item label="当前状态">
              <Tag color={STATUS_COLOR_MAP[detailRecord.status] || 'default'}>{detailRecord.status}</Tag>
            </Descriptions.Item>
            <Descriptions.Item label="发布日期">{detailRecord.createDate}</Descriptions.Item>
            {detailRecord.status === '已驳回' && detailRecord.rejectReason && (
              <Descriptions.Item label="驳回原因" span={2}>
                <div style={{ color: '#cf1322', background: '#fff2f0', padding: '8px 12px', borderRadius: 6, border: '1px solid #ffccc7' }}>
                  {detailRecord.rejectReason}
                </div>
              </Descriptions.Item>
            )}
          </Descriptions>
        )}
      </Modal>

      <Modal
        title={null}
        open={previewOpen}
        onCancel={function () { setPreviewOpen(false); }}
        width="90vw"
        style={{ top: 20 }}
        footer={[
          <Button key="close" type="primary" onClick={function () { setPreviewOpen(false); }}>关闭预览</Button>
        ]}
        styles={{ body: { padding: 0, height: '80vh' } }}
      >
        <iframe
          src="/prototypes/mall-detail?preview=true"
          style={{ width: '100%', height: '100%', border: 'none', borderRadius: 8 }}
          title="商品预览"
        />
      </Modal>
    </div>
  );
};

export default Component;
