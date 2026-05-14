/**
 * @name 我的评价
 * @mode axure
 */

import './style.css';

import React, { useCallback, useState } from 'react';
import { Card, Table, Rate, Button, Breadcrumb, Avatar, Row, Col, message, Popconfirm, Tag, Tooltip, Segmented } from 'antd';
import { HomeOutlined, UserOutlined, SafetyCertificateOutlined } from '@ant-design/icons';

var MENU_ITEMS = [
  { key: 'profile-certified', label: '我的信息', group: '账号管理' },
  { key: 'role-management', label: '角色管理' },
  { key: 'message-center', label: '消息中心' },
  { key: 'my-orders', label: '我的预约', group: '个人/需求方业务' },
  { key: 'my-demand', label: '我的需求' },
  { key: 'my-reviews', label: '我的评价' },
  { key: 'my-aircraft', label: '我的飞行器', group: '飞行服务 (飞手/企业)' },
  { key: 'my-flight-plan', label: '我的飞行计划' },
  { key: 'my-goods', label: '我的商品', group: '低空商城 (商户)' },
  { key: 'mall-publish', label: '发布商品' },
  { key: 'my-service', label: '我的服务', group: '低空服务 (飞行服务商)' },
  { key: 'service-publish', label: '发布服务项目' },
  { key: 'provider-orders', label: '服务受理单' },
  { key: 'provider-intentions', label: '商品受理单' }
];

var REVIEWS_DATA = [
  {
    key: '1',
    serviceName: '山地物资调运',
    provider: '大疆通用航空服务（郑州）有限公司',
    rating: 5,
    content: '非常专业的服务团队！山区基站建设项目中，无人机吊运效率远超传统人工搬运。',
    date: '2026-04-28',
    reply: '感谢您的认可！我们将持续提升服务质量。'
  },
  {
    key: '2',
    serviceName: '大型活动航拍直播',
    provider: '星光航空科技',
    rating: 4,
    content: '航拍画面很稳定，画质清晰。唯一不足是沟通对接上稍微有点慢。',
    date: '2026-03-15',
    reply: ''
  },
  {
    key: '3',
    serviceName: '农业植保喷洒作业（小麦）',
    provider: '丰收农服',
    rating: 5,
    content: '效果很好，喷洒均匀，效率高，省时省力！明年还找你们。',
    date: '2025-10-12',
    reply: '谢谢支持，祝您有个好收成！'
  }
];

var MALL_REVIEWS_DATA = [
  {
    key: '1',
    productName: '工业级无人机 DJI Matrice 350 RTK',
    supplier: 'XX无人机专营店',
    rating: 5,
    content: '设备性能稳定，全向避障功能非常实用，大大提升了我们在复杂环境下的作业安全性。',
    date: '2026-05-10',
    reply: ''
  },
  {
    key: '2',
    productName: '无人机载荷云台 Zenmuse H20T',
    supplier: '大疆通用航空服务（郑州）有限公司',
    rating: 4,
    content: '热成像效果清晰，测温精准，是巡检的得力助手。唯一缺点是价格偏高。',
    date: '2026-04-18',
    reply: '感谢您的评价！高质量的传感器成本较高，我们将努力提供更多优惠活动。'
  }
];

var Component = function MyReviewsPage() {
  var [reviewType, setReviewType] = useState('服务评价');
  var handleNavigate = useCallback(function (key: string) {
    window.location.href = '/prototypes/' + key;
  }, []);

  var columns = [
    {
      title: '服务项目',
      dataIndex: 'serviceName',
      key: 'serviceName',
      width: '20%',
      render: function (t: string, record: any) {
        return (
          <div>
            <a style={{ fontWeight: 600, fontSize: 14 }} onClick={function () { handleNavigate('service-detail'); }}>{t}</a>
            <div style={{ fontSize: 12, color: '#8c8c8c', marginTop: 4 }}>服务商：{record.provider}</div>
          </div>
        );
      }
    },
    {
      title: '评分',
      dataIndex: 'rating',
      key: 'rating',
      width: '15%',
      render: function (r: number) {
        return <Rate disabled defaultValue={r} style={{ fontSize: 14 }} />;
      }
    },
    {
      title: '评价内容',
      dataIndex: 'content',
      key: 'content',
      width: '35%',
      render: function (c: string, record: any) {
        return (
          <div>
            <div style={{ color: '#595959', fontSize: 13, lineHeight: 1.6 }}>{c}</div>
            {record.reply && (
              <div style={{ background: '#f5f5f5', padding: '6px 10px', borderRadius: 4, marginTop: 8, fontSize: 12, color: '#8c8c8c', borderLeft: '2px solid #d9d9d9' }}>
                <span style={{ color: '#1677ff' }}>服务商回复：</span>{record.reply}
              </div>
            )}
          </div>
        );
      }
    },
    {
      title: '评价时间',
      dataIndex: 'date',
      key: 'date',
      width: '15%',
      render: function (d: string) { return <span style={{ color: '#8c8c8c', fontSize: 13 }}>{d}</span>; }
    },
    {
      title: '操作',
      key: 'action',
      width: '15%',
      render: function () {
        return (
          <Popconfirm
            title="确定要删除这条评价吗？"
            onConfirm={function () { message.success('评价已删除'); }}
            okText="确定"
            cancelText="取消"
          >
            <a style={{ color: '#ff4d4f' }}>删除评价</a>
          </Popconfirm>
        );
      }
    }
  ];

  var mallColumns = [
    {
      title: '商品名称',
      dataIndex: 'productName',
      key: 'productName',
      width: '20%',
      render: function (t: string, record: any) {
        return (
          <div>
            <a style={{ fontWeight: 600, fontSize: 14 }} onClick={function () { handleNavigate('mall-detail'); }}>{t}</a>
            <div style={{ fontSize: 12, color: '#8c8c8c', marginTop: 4 }}>供应商：{record.supplier}</div>
          </div>
        );
      }
    },
    {
      title: '评分',
      dataIndex: 'rating',
      key: 'rating',
      width: '15%',
      render: function (r: number) {
        return <Rate disabled defaultValue={r} style={{ fontSize: 14 }} />;
      }
    },
    {
      title: '评价内容',
      dataIndex: 'content',
      key: 'content',
      width: '35%',
      render: function (c: string, record: any) {
        return (
          <div>
            <div style={{ color: '#595959', fontSize: 13, lineHeight: 1.6 }}>{c}</div>
            {record.reply && (
              <div style={{ background: '#f5f5f5', padding: '6px 10px', borderRadius: 4, marginTop: 8, fontSize: 12, color: '#8c8c8c', borderLeft: '2px solid #d9d9d9' }}>
                <span style={{ color: '#1677ff' }}>供应商回复：</span>{record.reply}
              </div>
            )}
          </div>
        );
      }
    },
    {
      title: '评价时间',
      dataIndex: 'date',
      key: 'date',
      width: '15%',
      render: function (d: string) { return <span style={{ color: '#8c8c8c', fontSize: 13 }}>{d}</span>; }
    },
    {
      title: '操作',
      key: 'action',
      width: '15%',
      render: function () {
        return (
          <Popconfirm
            title="确定要删除这条评价吗？"
            onConfirm={function () { message.success('评价已删除'); }}
            okText="确定"
            cancelText="取消"
          >
            <a style={{ color: '#ff4d4f' }}>删除评价</a>
          </Popconfirm>
        );
      }
    }
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
          { title: '我的评价' }
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
                        onClick={function () { if (item.key !== 'my-reviews') handleNavigate(item.key); }}
                        style={{
                          padding: '10px 16px',
                          borderRadius: 8,
                          cursor: 'pointer',
                          background: item.key === 'my-reviews' ? '#fff0f6' : 'transparent',
                          color: item.key === 'my-reviews' ? '#eb2f96' : '#595959',
                          fontWeight: item.key === 'my-reviews' ? 600 : 400,
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
            <Card 
              title={
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>我的评价</span>
                  <Segmented 
                    options={['服务评价', '商品评价']} 
                    value={reviewType} 
                    onChange={function(v) { setReviewType(v as string); }} 
                  />
                </div>
              } 
              style={{ borderRadius: 12 }}
            >
              <Table 
                columns={reviewType === '服务评价' ? columns : mallColumns} 
                dataSource={reviewType === '服务评价' ? REVIEWS_DATA : MALL_REVIEWS_DATA} 
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
