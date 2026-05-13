/**
 * @name 我的飞行需求
 * @mode axure
 * /Users/xu/Desktop/元引信息/Axhub-Make-main/skills/axure-export-workflow/SKILL.md
 *
 */

import './style.css';

import React, { useCallback } from 'react';
import { Card, Table, Tag, Button, Breadcrumb, Avatar, Row, Col, Tabs, message, Modal } from 'antd';
import { HomeOutlined, UserOutlined, SafetyCertificateOutlined, PlusOutlined } from '@ant-design/icons';

const MENU_ITEMS = [
  { key: 'profile', label: '我的信息', group: '' },
  { key: 'my-aircraft', label: '我的飞行器', group: '飞行服务' },
  { key: 'my-flight-plan', label: '我的飞行计划', group: '' },
  { key: 'my-service', label: '我的服务', group: '低空服务' },
  { key: 'my-service-demand', label: '我的服务需求', group: '' },
  { key: 'my-orders', label: '我的订单', group: '低空商城' },
  { key: 'my-goods', label: '我的商品', group: '' },
  { key: 'my-intention', label: '我的采购意向', group: '' }
];

var COLUMNS = [
  { title: '采购标题', dataIndex: 'title', key: 'title', render: function (t: string) { return <a style={{ fontWeight: 500 }} onClick={() => handleNavigate('mall-demand-detail')}>{t}</a>; } },
  { title: '产品类型', dataIndex: 'type', key: 'type', render: function (t: string) { return <Tag color="purple">{t}</Tag>; } },
  { title: '预算范围', dataIndex: 'budget', key: 'budget', render: function (b: string) { return <span style={{ color: '#ff4d4f', fontWeight: 600 }}>{b}</span>; } },
  { title: '需求区域', dataIndex: 'area', key: 'area' },
  { title: '截止日期', dataIndex: 'deadline', key: 'deadline' },
  { title: '状态', dataIndex: 'status', key: 'status', render: function (s: string) { 
      return <Tag color={s === '征集中' ? 'green' : s === '违规下架' ? 'red' : 'default'}>{s}</Tag>; 
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
          {record.status === '已关闭' && (
            <>
              <a style={{ color: '#1677ff' }}>编辑</a>
              <a style={{ color: '#52c41a' }} onClick={function () { message.success('已重新发布'); }}>重新发布</a>
              <a style={{ color: '#ff4d4f' }} onClick={function () { message.success('已删除'); }}>删除</a>
            </>
          )}
          {record.status === '违规下架' && (
            <>
              <a style={{ color: '#faad14' }} onClick={function () { Modal.error({ title: '违规详情', content: '您发布的采购需求涉嫌违规，已被强制下架。如有异议请联系客服。' }); }}>查看原因</a>
              <a style={{ color: '#ff4d4f' }} onClick={function () { message.success('已删除'); }}>删除</a>
            </>
          )}
        </div>
      );
  }}
];

var DATA = [
  { key: '1', title: '求购 10 台工业级测绘无人机', type: '飞行器', budget: '¥50-80万', area: '全市', status: '征集中', createDate: '2026-04-20', deadline: '2026-05-31' },
  { key: '2', title: '采购 5 套低空通信基站设备', type: '通信设备', budget: '¥20-30万', area: '主城区', status: '已关闭', createDate: '2026-04-18', deadline: '2026-06-15' },
  { key: '3', title: '特种设备采购需求测试', type: '安全设备', budget: '电议', area: '郊区', status: '违规下架', createDate: '2026-04-10', deadline: '2026-05-20' },
  { key: '4', title: '采购 eVTOL 载人飞行器 2 架', type: '飞行器', budget: '¥500万以上', area: '全省', status: '征集中', createDate: '2026-04-05', deadline: '2026-08-01' }
];

const Component = function MyDemandPage() {
  const [activeTab, React_useState] = React.useState('all');
  const handleNavigate = useCallback(function (key: string) {
    const baseUrl = window.location.origin;
    window.location.href = '/prototypes/' + key;
  }, []);

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
          { title: '我的采购需求' }
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
              title="我的采购需求"
              extra={<Button type="primary" icon={<PlusOutlined />} style={{ background: '#722ed1', borderColor: '#722ed1' }} onClick={function () { handleNavigate('mall-demand-publish'); }}>发布采购需求</Button>}
              style={{ borderRadius: 12 }}
            >
              {DATA.filter(function (d) { return d.status === '违规下架'; }).length > 0 && (
                <div style={{ padding: '8px 16px', background: '#fff2f0', border: '1px solid #ffccc7', borderRadius: 6, marginBottom: 16, color: '#cf1322', fontSize: 13 }}>
                  系统提示：发现被违规下架的采购需求，涉嫌违反平台发布规范。如有疑问请致电客服咨询：400-123-4567。
                </div>
              )}
              <Tabs
                activeKey={activeTab}
                onChange={React_useState}
                items={[
                  { key: 'all', label: `全部 (${DATA.length})` },
                  { key: '征集中', label: `征集中 (${DATA.filter(function (d) { return d.status === '征集中'; }).length})` },
                  { key: '已关闭', label: `已关闭 (${DATA.filter(function (d) { return d.status === '已关闭'; }).length})` },
                  { key: '违规下架', label: `违规下架 (${DATA.filter(function (d) { return d.status === '违规下架'; }).length})` }
                ]}
                style={{ marginBottom: 0 }}
              />
              <Table 
                columns={COLUMNS} 
                dataSource={activeTab === 'all' ? DATA : DATA.filter(function(d) { return d.status === activeTab; })} 
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
