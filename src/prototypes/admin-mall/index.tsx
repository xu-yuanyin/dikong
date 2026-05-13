/**
 * @name 商城管理
 * @mode axure
 */

import './style.css';

import React, { useState, useCallback } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { Card, Table, Tag, Button, Breadcrumb, Space, Modal, Input, Select, message, Tooltip, Descriptions } from 'antd';
import { SettingOutlined, EyeOutlined, StopOutlined, SearchOutlined } from '@ant-design/icons';



var PRODUCT_OPTIONS = [
  { value: 'uav', label: '工业级无人机' },
  { value: 'evtol', label: 'eVTOL载人飞行器' },
  { value: 'security', label: '安全设备' },
  { value: 'communication', label: '通信设备' },
  { value: 'training', label: '培训设备' },
  { value: 'infrastructure', label: '基础设施' },
  { value: 'other', label: '其他' }
];

var GOODS_DATA = [
  { key: '1', id: 'MALL-2026-101', title: '大疆 DJI Mavic 3 Enterprise', category: '工业级无人机', price: '¥22,000.00', provider: 'XX无人机专营店', time: '2026-04-18 10:00', status: 'normal' },
  { key: '2', id: 'MALL-2026-102', title: '纵横 CW-15 垂直起降固定翼', category: '工业级无人机', price: '电议', provider: '纵横官方旗舰店', time: '2026-04-19 14:30', status: 'normal' },
  { key: '3', id: 'MALL-2026-103', title: '特价三无电池', category: '其他', price: '¥500.00', provider: '某个人商户', time: '2026-04-20 08:15', status: 'offline' }
];

var Component = function AdminMallPage() {
  var [viewOpen, setViewOpen] = useState(false);
  var [takedownOpen, setTakedownOpen] = useState(false);
  var [currentRecord, setCurrentRecord] = useState<any>(null);
  var [takedownReason, setTakedownReason] = useState('');

  var handleNavigate = useCallback(function (key: string) {
    window.location.href = '/prototypes/' + key;
  }, []);

  var handleTakedown = function () {
    message.success('已违规下架该商品，前台将显示违规提示');
    setTakedownOpen(false);
    setTakedownReason('');
  };

  var columns = [
    { title: '商品编号', dataIndex: 'id', key: 'id', width: 120 },
    { title: '商品名称', dataIndex: 'title', key: 'title', width: 200, render: function (t: string) { return <span style={{ fontWeight: 500, color: '#1677ff' }}>{t}</span>; } },
    { title: '分类', dataIndex: 'category', key: 'category', width: 100, render: function (t: string) { return <Tag color="purple">{t}</Tag>; } },
    { title: '价格', dataIndex: 'price', key: 'price', width: 120, render: function (t: string) { return <span style={{ color: '#ff4d4f' }}>{t}</span>; } },
    { title: '商户', dataIndex: 'provider', key: 'provider', width: 160 },
    { title: '发布时间', dataIndex: 'time', key: 'time', width: 150 },
    { title: '状态', dataIndex: 'status', key: 'status', width: 90, render: function (s: string) { return s === 'normal' ? <Tag color="green">展示中</Tag> : <Tag color="red">违规下架</Tag>; } },
    { title: '操作', key: 'action', width: 120, fixed: 'right' as const, render: function (_: any, record: any) {
      return (
        <Space size={4}>
          <Tooltip title="查看详情"><Button type="text" size="small" icon={<EyeOutlined />} style={{ color: '#1677ff' }} onClick={function () { setCurrentRecord(record); setViewOpen(true); }} /></Tooltip>
          {record.status === 'normal' && (
            <Tooltip title="违规下架"><Button type="text" size="small" icon={<StopOutlined />} style={{ color: '#ff4d4f' }} onClick={function () { setCurrentRecord(record); setTakedownOpen(true); }} /></Tooltip>
          )}
        </Space>
      );
    }}
  ];

  return (
    <AdminLayout activeKey="admin-mall">
      

      <div style={{ maxWidth: 1400, margin: '0 auto', padding: 24 }}>
        <Breadcrumb items={[{ title: '系统设置' }, { title: '商城管理' }]} style={{ marginBottom: 16 }} />
        <Card style={{ borderRadius: 12 }}>
          <div style={{ display: 'flex', gap: 12, marginBottom: 16, flexWrap: 'wrap' }}>
            <Input prefix={<SearchOutlined />} placeholder="搜索商品名称/商户" style={{ width: 220 }} allowClear />
            <Select placeholder="分类" style={{ width: 140 }} options={PRODUCT_OPTIONS} allowClear />
            <Select placeholder="状态" style={{ width: 120 }} options={[{ value: 'normal', label: '展示中' }, { value: 'offline', label: '违规下架' }]} allowClear />
            <Button type="primary" icon={<SearchOutlined />}>检索</Button>
          </div>
          <Table columns={columns} dataSource={GOODS_DATA} pagination={{ pageSize: 10, total: GOODS_DATA.length }} />
        </Card>
      </div>

      <Modal title="查看商品详情" open={viewOpen} onCancel={function () { setViewOpen(false); }} width={720} footer={<Button onClick={function () { setViewOpen(false); }}>关闭</Button>}>
        {currentRecord && (
          <Descriptions column={2} bordered style={{ marginTop: 16 }}>
            <Descriptions.Item label="商品名称" span={2}>{currentRecord.title}</Descriptions.Item>
            <Descriptions.Item label="商品编号">{currentRecord.id}</Descriptions.Item>
            <Descriptions.Item label="分类"><Tag color="purple">{currentRecord.category}</Tag></Descriptions.Item>
            <Descriptions.Item label="商品价格"><span style={{ color: '#ff4d4f', fontWeight: 600 }}>{currentRecord.price}</span></Descriptions.Item>
            <Descriptions.Item label="商户">{currentRecord.provider}</Descriptions.Item>
            <Descriptions.Item label="发布时间">{currentRecord.time}</Descriptions.Item>
            <Descriptions.Item label="当前状态">{currentRecord.status === 'normal' ? <Tag color="green">展示中</Tag> : <Tag color="red">违规下架</Tag>}</Descriptions.Item>
          </Descriptions>
        )}
      </Modal>

      <Modal
        title={<span style={{ color: '#ff4d4f' }}>违规下架该商品</span>}
        open={takedownOpen}
        onCancel={function () { setTakedownOpen(false); }}
        onOk={handleTakedown}
        okButtonProps={{ danger: true }}
        okText="确认违规下架"
      >
        <div style={{ marginBottom: 16, fontSize: 14 }}>您正在违规下架商品 <strong>{currentRecord?.title}</strong>，下架后前台将显示违规提示，且不再展示在商城大厅中。</div>
        <Input.TextArea 
          placeholder="请输入下架原因（选填，用于后台备案核查）" 
          rows={4} 
          value={takedownReason}
          onChange={function (e) { setTakedownReason(e.target.value); }} 
        />
      </Modal>
    </AdminLayout>
  );
};

export default Component;
