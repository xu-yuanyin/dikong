/**
 * @name 服务商工单管理
 * @mode axure
 */

import './style.css';

import React, { useState, useCallback } from 'react';
import { Card, Table, Tag, Button, Breadcrumb, Tabs, Avatar, Row, Col, message } from 'antd';
import { HomeOutlined, SafetyCertificateOutlined, TeamOutlined, CopyOutlined } from '@ant-design/icons';

var MENU_ITEMS = [
  { key: 'profile-certified', label: '我的信息', group: '账号管理' },
  { key: 'role-management', label: '角色管理' },
  { key: 'message-center', label: '消息中心' },
  { key: 'my-intention', label: '我的意向', group: '个人/需求方业务' },
  { key: 'my-service-demand', label: '我的服务需求' },
  { key: 'my-demand', label: '我的采购需求' },
  { key: 'my-aircraft', label: '我的飞行器', group: '飞行作业台' },
  { key: 'my-flight-plan', label: '我的飞行计划' },
  { key: 'my-service', label: '我的服务管理', group: '低空服务 (供给端)' },
  { key: 'service-publish', label: '发布服务项目' },
  { key: 'provider-orders', label: '预约受理单' },
  { key: 'my-goods', label: '我的商品', group: '低空商城 (供给端)' },
  { key: 'mall-publish', label: '发布商品' },
  { key: 'provider-intentions', label: '收到的商城意向' }
];

var ORDER_DATA = [
  { key: '1', service: '城市空中观光体验', contact: '张先生', phone: '13812345678', req: '希望下周三在江北区进行飞行体验。', date: '2026-05-12 10:30', status: '待联系' },
  { key: '2', service: '无人机驾照培训', contact: '李女士', phone: '13987654321', req: '咨询周末班的上课时间与费用明细。', date: '2026-05-11 14:20', status: '进行中' },
  { key: '3', service: '航拍测绘外包', contact: '赵总', phone: '13655556666', req: '需要对园区进行正射影像拍摄。', date: '2026-05-10 11:00', status: '待确认' },
  { key: '4', service: '飞行器年检检测', contact: '王经理', phone: '13700001111', req: '公司有3台大疆M300需要做年度检修。', date: '2026-05-09 09:15', status: '已完成' },
];

var Component = function ProviderOrdersPage() {
  var handleNavigate = useCallback(function (key: string) {
    window.location.href = '/prototypes/' + key;
  }, []);

  var copyPhone = function (phone: string) {
    message.success(`已复制手机号：${phone}`);
  };

  var updateStatus = function (status: string) {
    message.success(`工单状态已更新为：${status}`);
  };

  var COLUMNS = [
    { title: '关联服务', dataIndex: 'service', key: 'service', render: function (t: string) { return <span style={{ fontWeight: 500, color: '#1677ff' }}>{t}</span>; } },
    { title: '客户姓名', dataIndex: 'contact', key: 'contact' },
    { title: '联系电话', dataIndex: 'phone', key: 'phone', render: function (p: string) { 
      return <span>{p} <CopyOutlined style={{ color: '#1677ff', cursor: 'pointer', marginLeft: 4 }} onClick={() => copyPhone(p)} /></span>; 
    }},
    { title: '需求备注', dataIndex: 'req', key: 'req', width: 250 },
    { title: '提交时间', dataIndex: 'date', key: 'date' },
    { title: '状态', dataIndex: 'status', key: 'status', render: function (s: string) { 
      return <Tag color={s === '待联系' ? 'orange' : s === '进行中' ? 'blue' : s === '待确认' ? 'cyan' : 'green'}>{s}</Tag>; 
    }},
    { title: '操作', key: 'action', render: function (_: any, record: any) {
      return (
        <div style={{ display: 'flex', gap: 8 }}>
          {record.status === '待联系' && <a onClick={() => updateStatus('进行中')}>标记为进行中</a>}
          {record.status === '进行中' && <a onClick={() => updateStatus('待确认')}>提交交付</a>}
          {record.status === '待确认' && <span style={{ color: '#bfbfbf' }}>等待客户确认</span>}
          <a style={{ color: '#8c8c8c' }}>查看详情</a>
        </div>
      );
    }}
  ];

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
            <a style={{ color: '#fff', fontWeight: 600, cursor: 'pointer' }}>服务商后台</a>
          </div>
        </div>
      </header>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px 24px 48px' }}>
        <Breadcrumb items={[
          { title: <a onClick={function () { handleNavigate('home'); }}><HomeOutlined /> 首页</a> },
          { title: '服务商后台' },
          { title: '预约受理单' }
        ]} style={{ marginBottom: 24 }} />

        <Row gutter={24}>
          <Col xs={24} md={5}>
            <Card style={{ borderRadius: 12, marginBottom: 24 }}>
              <div style={{ textAlign: 'center', marginBottom: 16 }}>
                <Avatar size={72} icon={<TeamOutlined />} style={{ backgroundColor: '#1677ff', marginBottom: 12 }} />
                <div style={{ fontSize: 16, fontWeight: 600, color: '#1f1f1f' }}>XX通航服务商</div>
                <Tag color="blue" style={{ marginTop: 8 }}>已认证</Tag>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                {MENU_ITEMS.map(function (item) {
                  return (
                    <div key={item.key}>
                      {item.group ? <div style={{ fontSize: 11, color: '#bfbfbf', padding: '8px 16px 4px', fontWeight: 600, letterSpacing: 1 }}>{item.group}</div> : null}
                      <div
                        onClick={function () { if (item.key !== 'provider-orders') handleNavigate(item.key); }}
                        style={{
                          padding: '10px 16px',
                          borderRadius: 8,
                          cursor: 'pointer',
                          background: item.key === 'provider-orders' ? '#e6f4ff' : 'transparent',
                          color: item.key === 'provider-orders' ? '#1677ff' : '#595959',
                          fontWeight: item.key === 'provider-orders' ? 600 : 400,
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
          <Col xs={24} md={19}>
            <Card title="收到的客户工单" style={{ borderRadius: 12 }}>
              <div style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
                <div style={{ padding: '12px 10px', background: '#fff7e6', borderRadius: 8, textAlign: 'center', flex: 1 }}>
                  <div style={{ fontSize: 24, fontWeight: 700, color: '#fa8c16' }}>{ORDER_DATA.filter(d => d.status === '待联系').length}</div>
                  <div style={{ fontSize: 12, color: '#8c8c8c' }}>待联系</div>
                </div>
                <div style={{ padding: '12px 10px', background: '#e6f4ff', borderRadius: 8, textAlign: 'center', flex: 1 }}>
                  <div style={{ fontSize: 24, fontWeight: 700, color: '#1677ff' }}>{ORDER_DATA.filter(d => d.status === '进行中').length}</div>
                  <div style={{ fontSize: 12, color: '#8c8c8c' }}>进行中</div>
                </div>
                <div style={{ padding: '12px 10px', background: '#e6fffb', borderRadius: 8, textAlign: 'center', flex: 1 }}>
                  <div style={{ fontSize: 24, fontWeight: 700, color: '#13c2c2' }}>{ORDER_DATA.filter(d => d.status === '待确认').length}</div>
                  <div style={{ fontSize: 12, color: '#8c8c8c' }}>待确认</div>
                </div>
                <div style={{ padding: '12px 10px', background: '#f6ffed', borderRadius: 8, textAlign: 'center', flex: 1 }}>
                  <div style={{ fontSize: 24, fontWeight: 700, color: '#52c41a' }}>{ORDER_DATA.filter(d => d.status === '已完成').length}</div>
                  <div style={{ fontSize: 12, color: '#8c8c8c' }}>已完成</div>
                </div>
              </div>
              <Table columns={COLUMNS} dataSource={ORDER_DATA} pagination={{ pageSize: 10 }} />
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Component;
