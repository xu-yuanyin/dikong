/**
 * @name 我的飞行需求
 * @mode axure
 */

import './style.css';

import React, { useCallback } from 'react';
import { Card, Table, Tag, Button, Breadcrumb, Avatar, Row, Col, Tabs, message, Modal, Segmented } from 'antd';
import { HomeOutlined, UserOutlined, SafetyCertificateOutlined, PlusOutlined, ClockCircleOutlined, ExclamationCircleOutlined } from '@ant-design/icons';

const MENU_ITEMS = [
  { key: 'profile', label: '我的信息', group: '' },
  { key: 'my-aircraft', label: '我的飞行器', group: '飞行服务' },
  { key: 'my-flight-plan', label: '我的飞行计划', group: '' },
  { key: 'my-service', label: '我的服务', group: '低空服务' },
  { key: 'my-orders', label: '我的订单', group: '低空商城' },
  { key: 'my-goods', label: '我的商品', group: '' },
];

var STATUS_COLOR_MAP: Record<string, string> = {
  '征集中': 'green',
  '待审核': 'orange',
  '已驳回': 'red',
  '已关闭': 'default',
  '违规下架': 'red'
};

var MALL_COLUMNS = [
  { title: '采购标题', dataIndex: 'title', key: 'title', render: function (t: string) { return <a style={{ fontWeight: 500 }} onClick={() => handleNavigate('mall-demand-detail')}>{t}</a>; } },
  { title: '产品类型', dataIndex: 'type', key: 'type', render: function (t: string) { return <Tag color="purple">{t}</Tag>; } },
  { title: '预算范围', dataIndex: 'budget', key: 'budget', render: function (b: string) { return <span style={{ color: '#ff4d4f', fontWeight: 600 }}>{b}</span>; } },
  { title: '需求区域', dataIndex: 'area', key: 'area' },
  { title: '截止日期', dataIndex: 'deadline', key: 'deadline' },
  { title: '状态', dataIndex: 'status', key: 'status', render: function (s: string) { 
      return <Tag color={STATUS_COLOR_MAP[s] || 'default'}>{s}</Tag>; 
  }},
  { title: '发布日期', dataIndex: 'createDate', key: 'createDate' },
  { title: '操作', key: 'action', render: function (_: any, record: any) {
      return (
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <a style={{ color: '#1677ff' }} onClick={function () { handleNavigate('mall-demand-detail'); }}>查看</a>
          {record.status === '征集中' && (
            <>
              <a style={{ color: '#1677ff' }}>编辑</a>
              <a style={{ color: '#faad14' }} onClick={function () { message.success('已关闭采购需求'); }}>关闭需求</a>
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
          {record.status === '已关闭' && (
            <>
              <a style={{ color: '#1677ff' }}>编辑</a>
              <a style={{ color: '#52c41a' }} onClick={function () { message.success('已重新发布'); }}>重新发布</a>
              <a style={{ color: '#ff4d4f' }} onClick={function () { message.success('已删除'); }}>删除</a>
            </>
          )}

        </div>
      );
  }}
];

var SERVICE_COLUMNS = [
  { title: '需求标题', dataIndex: 'title', key: 'title', render: function (t: string) { return <a style={{ fontWeight: 500 }} onClick={() => handleNavigate('service-demand-detail')}>{t}</a>; } },
  { title: '需求类型', dataIndex: 'type', key: 'type', render: function (t: string) { return <Tag color="blue">{t}</Tag>; } },
  { title: '预算范围', dataIndex: 'budget', key: 'budget', render: function (b: string) { return <span style={{ color: '#ff4d4f', fontWeight: 600 }}>{b}</span>; } },
  { title: '服务区域', dataIndex: 'area', key: 'area' },
  { title: '截止日期', dataIndex: 'deadline', key: 'deadline' },
  { title: '状态', dataIndex: 'status', key: 'status', render: function (s: string) { 
      return <Tag color={STATUS_COLOR_MAP[s] || 'default'}>{s}</Tag>; 
  }},
  { title: '发布日期', dataIndex: 'createDate', key: 'createDate' },
  { title: '操作', key: 'action', render: function (_: any, record: any) {
    return (
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        <a style={{ color: '#1677ff' }} onClick={function () { handleNavigate('service-demand-detail'); }}>查看</a>
        {record.status === '征集中' && (
          <>
            <a style={{ color: '#1677ff' }}>编辑</a>
            <a style={{ color: '#faad14' }} onClick={function () { message.success('已关闭需求'); }}>关闭需求</a>
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
        {record.status === '已关闭' && (
          <>
            <a style={{ color: '#1677ff' }}>编辑</a>
            <a style={{ color: '#52c41a' }} onClick={function () { message.success('已重新发布'); }}>重新发布</a>
            <a style={{ color: '#ff4d4f' }} onClick={function () { message.success('已删除'); }}>删除</a>
          </>
        )}

      </div>
    );
  }}
];

var MALL_DATA = [
  { key: '1', title: '求购 10 台工业级测绘无人机', type: '飞行器', budget: '¥50-80万', area: '全市', status: '征集中', createDate: '2026-04-20', deadline: '2026-05-31' },
  { key: '2', title: '采购 5 套低空通信基站设备', type: '通信设备', budget: '¥20-30万', area: '主城区', status: '已关闭', createDate: '2026-04-18', deadline: '2026-06-15' },

  { key: '4', title: '采购 eVTOL 载人飞行器 2 架', type: '飞行器', budget: '¥500万以上', area: '全省', status: '征集中', createDate: '2026-04-05', deadline: '2026-08-01' },
  { key: '5', title: '批量采购植保无人机电池组', type: '配件', budget: '¥5-8万', area: '全市', status: '待审核', createDate: '2026-05-18', deadline: '2026-06-30' },
  { key: '6', title: '采购无人机防撞雷达模块', type: '安全设备', budget: '¥10-15万', area: '主城区', status: '已驳回', createDate: '2026-05-12', deadline: '2026-07-01', rejectReason: '需求描述过于简略，请补充具体的技术参数要求、数量及交付标准后重新提交。' }
];

var SERVICE_DATA = [
  { key: '1', title: '需要测绘无人机培训服务', type: '飞行培训', budget: '¥3,000-5,000', area: '主城区', status: '征集中', createDate: '2026-04-20', deadline: '2026-05-15', desc: '需要提供5个工作日的封闭式培训' },
  { key: '2', title: '航拍服务需求（房地产项目）', type: '低空旅游', budget: '¥5,000-8,000', area: '全市', status: '已关闭', createDate: '2026-04-10', deadline: '2026-04-30', desc: '楼盘宣传片航拍素材收集' },

  { key: '4', title: '电力巡检服务外包', type: '飞行器服务', budget: '¥10,000-15,000', area: '全市', status: '已关闭', createDate: '2026-03-15', deadline: '2026-04-15', desc: '高压线网日常巡检' },
  { key: '5', title: '大型活动航拍直播服务', type: '低空旅游', budget: '¥8,000-12,000', area: '主城区', status: '征集中', createDate: '2026-04-25', deadline: '2026-05-30', desc: '马拉松赛事全程跟拍直播' },
  { key: '6', title: '农田精准喷洒飞防服务', type: '飞行器服务', budget: '¥2,000-4,000', area: '郊区', status: '待审核', createDate: '2026-05-19', deadline: '2026-06-15', desc: '500亩水稻田喷洒农药' },
  { key: '7', title: '景区低空观光路线规划', type: '低空旅游', budget: '¥15,000-25,000', area: '全市', status: '已驳回', createDate: '2026-05-10', deadline: '2026-07-01', desc: '景区空中游览路线设计', rejectReason: '该需求涉及景区空域申请相关审批，请先提供景区管委会出具的空域使用意向书后再次提交。' }
];

var handleNavigate = function (key: string) {
  window.location.href = '/prototypes/' + key;
};

const Component = function MyDemandPage() {
  const [activeTab, setActiveTab] = React.useState('all');
  const [activeType, setActiveType] = React.useState('service');

  var currentData = activeType === 'service' ? SERVICE_DATA : MALL_DATA;

  var tabItems = [
    { key: 'all', label: '全部 (' + currentData.length + ')' },
    { key: '待审核', label: '待审核 (' + currentData.filter(function (d) { return d.status === '待审核'; }).length + ')' },
    { key: '征集中', label: '征集中 (' + currentData.filter(function (d) { return d.status === '征集中'; }).length + ')' },
    { key: '已关闭', label: '已关闭 (' + currentData.filter(function (d) { return d.status === '已关闭'; }).length + ')' },
    { key: '已驳回', label: '已驳回 (' + currentData.filter(function (d) { return d.status === '已驳回'; }).length + ')' },

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
          { title: '我的需求' }
        ]} style={{ marginBottom: 24 }} />

        <Row gutter={24}>
          <Col xs={24} md={6}>
            <Card style={{ borderRadius: 12, marginBottom: 24 }}>
              <div style={{ textAlign: 'center', marginBottom: 16 }}>
                <Avatar size={80} icon={<UserOutlined />} style={{ backgroundColor: '#52c41a', marginBottom: 12 }} />
                <div style={{ fontSize: 18, fontWeight: 600, color: '#1f1f1f' }}>张明</div>
                <Tag color="green" style={{ marginTop: 8 }}>飞手</Tag>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                {MENU_ITEMS.map(function (item) {
                  return (
                    <div
                      key={item.key}
                      onClick={function () { if (item.key !== 'my-demand') handleNavigate(item.key); }}
                      style={{
                        padding: '10px 16px',
                        borderRadius: 8,
                        cursor: 'pointer',
                        background: item.key === 'my-demand' ? '#f6ffed' : 'transparent',
                        color: item.key === 'my-demand' ? '#52c41a' : '#595959',
                        fontWeight: item.key === 'my-demand' ? 600 : 400,
                        fontSize: 14
                      }}
                    >
                      {item.label}
                    </div>
                  );
                })}
              </div>
            </Card>
          </Col>
          <Col xs={24} md={18}>
            <Card
              title={
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <span style={{ fontSize: 16 }}>我的需求</span>
                  <Segmented
                    options={[
                      { label: '服务需求', value: 'service' },
                      { label: '商品采购需求', value: 'product' }
                    ]}
                    value={activeType}
                    onChange={function(v) {
                      setActiveType(v as string);
                      setActiveTab('all');
                    }}
                  />
                </div>
              }
              extra={<Button type="primary" icon={<PlusOutlined />} style={{ background: '#722ed1', borderColor: '#722ed1' }} onClick={function () { handleNavigate(activeType === 'service' ? 'demand-publish' : 'mall-demand-publish'); }}>发布需求</Button>}
              style={{ borderRadius: 12 }}
            >

              {currentData.filter(function (d) { return d.status === '待审核'; }).length > 0 && (
                <div style={{ padding: '8px 16px', background: '#fffbe6', border: '1px solid #ffe58f', borderRadius: 6, marginBottom: 16, color: '#ad6800', fontSize: 13 }}>
                  <ClockCircleOutlined style={{ marginRight: 6 }} />您有 {currentData.filter(function (d) { return d.status === '待审核'; }).length} 项需求正在等待平台审核，预计 1-3 个工作日内完成。
                </div>
              )}
              {currentData.filter(function (d) { return d.status === '已驳回'; }).length > 0 && (
                <div style={{ padding: '8px 16px', background: '#fff2f0', border: '1px solid #ffccc7', borderRadius: 6, marginBottom: 16, color: '#cf1322', fontSize: 13 }}>
                  <ExclamationCircleOutlined style={{ marginRight: 6 }} />您有 {currentData.filter(function (d) { return d.status === '已驳回'; }).length} 项需求审核未通过，请查看驳回原因并修改后重新提交。
                </div>
              )}
              <Tabs
                activeKey={activeTab}
                onChange={setActiveTab}
                items={tabItems}
                style={{ marginBottom: 0 }}
              />
              <Table 
                columns={activeType === 'service' ? SERVICE_COLUMNS : MALL_COLUMNS} 
                dataSource={activeTab === 'all' ? currentData : currentData.filter(function(d) { return d.status === activeTab; })} 
                pagination={{ pageSize: 5 }} 
              />
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Component;
