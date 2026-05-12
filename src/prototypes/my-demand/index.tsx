/**
 * @name 我的飞行需求
 * @mode axure
 * /Users/xu/Desktop/元引信息/Axhub-Make-main/skills/axure-export-workflow/SKILL.md
 *
 */

import './style.css';

import React, { useCallback } from 'react';
import { Card, Table, Tag, Button, Breadcrumb, Avatar, Row, Col } from 'antd';
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
  { title: '需求编号', dataIndex: 'id', key: 'id' },
  { title: '服务类型', dataIndex: 'type', key: 'type', render: function (t: string) { return <Tag color="blue">{t}</Tag>; } },
  { title: '需求描述', dataIndex: 'desc', key: 'desc', ellipsis: true },
  { title: '提交时间', dataIndex: 'submitTime', key: 'submitTime' },
  { title: '状态', dataIndex: 'status', key: 'status', render: function (s: string) { return <Tag color={s === '已受理' ? 'green' : s === '处理中' ? 'blue' : s === '待受理' ? 'orange' : 'default'}>{s}</Tag>; } }
];

var DATA = [
  { key: '1', id: 'SD-2026-0088', type: '飞行计划审批', desc: '城东片区测绘巡检飞行计划审批', submitTime: '2026-04-20', status: '已受理' },
  { key: '2', id: 'SD-2026-0092', type: '空域使用申请', desc: '南区训练空域临时使用申请', submitTime: '2026-04-19', status: '处理中' },
  { key: '3', id: 'SD-2026-0098', type: '飞行器备案', desc: '新购DJI Mavic 3E备案登记', submitTime: '2026-04-18', status: '待受理' },
  { key: '4', id: 'SD-2026-0085', type: '驾驶员资质认证', desc: 'A2类无人机驾驶员资质认证', submitTime: '2026-04-15', status: '已受理' }
];

const Component = function MyDemandPage() {
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
          { title: '我的飞行需求' }
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
              title="我的飞行需求"
              extra={<Button type="primary" icon={<PlusOutlined />} onClick={function () { handleNavigate('service-demand'); }}>提交需求</Button>}
              style={{ borderRadius: 12 }}
            >
              <Table columns={COLUMNS} dataSource={DATA} pagination={{ pageSize: 5 }} />
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Component;
