/**
 * @name 低空服务管理
 * @mode axure
 */

import './style.css';

import React, { useState, useCallback } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { Card, Table, Tag, Button, Breadcrumb, Space, Modal, Input, Select, message, Popconfirm, Tooltip, Descriptions } from 'antd';
import { SettingOutlined, EyeOutlined, StopOutlined, SearchOutlined } from '@ant-design/icons';



var SERVICE_DATA = [
  { key: '1', id: 'SRV-2026-001', title: '无人机航拍测绘服务', category: '航拍测绘', provider: 'XX测绘科技有限公司', contact: '王经理', phone: '13811112222', time: '2026-04-20 14:00', status: 'normal' },
  { key: '2', id: 'SRV-2026-002', title: '农林植保喷洒作业', category: '农林植保', provider: '蓝天农业服务部', contact: '张总', phone: '13911113333', time: '2026-04-21 09:30', status: 'normal' },
  { key: '3', id: 'SRV-2026-003', title: '特价通航包机代办', category: '其他服务', provider: '某某代办中介', contact: '李先生', phone: '13711114444', time: '2026-04-22 11:15', status: 'offline' }
];

var Component = function AdminServicePage() {
  var [viewOpen, setViewOpen] = useState(false);
  var [takedownOpen, setTakedownOpen] = useState(false);
  var [currentRecord, setCurrentRecord] = useState<any>(null);
  var [takedownReason, setTakedownReason] = useState('');

  var handleNavigate = useCallback(function (key: string) {
    window.location.href = '/prototypes/' + key;
  }, []);

  var handleTakedown = function () {
    message.success('已强制下架该服务，前台大厅将不再展示');
    setTakedownOpen(false);
    setTakedownReason('');
  };

  var columns = [
    { title: '服务编号', dataIndex: 'id', key: 'id', width: 120 },
    { title: '服务标题', dataIndex: 'title', key: 'title', width: 180, render: function (t: string) { return <span style={{ fontWeight: 500, color: '#1677ff' }}>{t}</span>; } },
    { title: '分类', dataIndex: 'category', key: 'category', width: 100, render: function (t: string) { return <Tag color="blue">{t}</Tag>; } },
    { title: '发布方', dataIndex: 'provider', key: 'provider', width: 160 },
    { title: '联系人', dataIndex: 'contact', key: 'contact', width: 100 },
    { title: '联系电话', dataIndex: 'phone', key: 'phone', width: 120 },
    { title: '发布时间', dataIndex: 'time', key: 'time', width: 150 },
    { title: '状态', dataIndex: 'status', key: 'status', width: 90, render: function (s: string) { return s === 'normal' ? <Tag color="green">正常</Tag> : <Tag color="red">已下架</Tag>; } },
    { title: '操作', key: 'action', width: 120, fixed: 'right' as const, render: function (_: any, record: any) {
      return (
        <Space size={4}>
          <Tooltip title="查看详情"><Button type="text" size="small" icon={<EyeOutlined />} style={{ color: '#1677ff' }} onClick={function () { setCurrentRecord(record); setViewOpen(true); }} /></Tooltip>
          {record.status === 'normal' && (
            <Tooltip title="强制下架"><Button type="text" size="small" icon={<StopOutlined />} style={{ color: '#ff4d4f' }} onClick={function () { setCurrentRecord(record); setTakedownOpen(true); }} /></Tooltip>
          )}
        </Space>
      );
    }}
  ];

  return (
    <AdminLayout activeKey="admin-service">
      

      <div style={{ maxWidth: 1400, margin: '0 auto', padding: 24 }}>
        <Breadcrumb items={[{ title: '系统设置' }, { title: '低空服务管理' }]} style={{ marginBottom: 16 }} />
        <Card style={{ borderRadius: 12 }}>
          <div style={{ display: 'flex', gap: 12, marginBottom: 16, flexWrap: 'wrap' }}>
            <Input prefix={<SearchOutlined />} placeholder="搜索服务标题/发布方" style={{ width: 220 }} allowClear />
            <Select placeholder="分类" style={{ width: 140 }} options={[{ value: '1', label: '航拍测绘' }, { value: '2', label: '农林植保' }]} allowClear />
            <Select placeholder="状态" style={{ width: 120 }} options={[{ value: 'normal', label: '正常' }, { value: 'offline', label: '已下架' }]} allowClear />
            <Button type="primary" icon={<SearchOutlined />}>检索</Button>
          </div>
          <Table columns={columns} dataSource={SERVICE_DATA} pagination={{ pageSize: 10, total: SERVICE_DATA.length }} />
        </Card>
      </div>

      <Modal title="查看服务详情" open={viewOpen} onCancel={function () { setViewOpen(false); }} width={720} footer={<Button onClick={function () { setViewOpen(false); }}>关闭</Button>}>
        {currentRecord && (
          <Descriptions column={2} bordered style={{ marginTop: 16 }}>
            <Descriptions.Item label="服务标题" span={2}>{currentRecord.title}</Descriptions.Item>
            <Descriptions.Item label="服务编号">{currentRecord.id}</Descriptions.Item>
            <Descriptions.Item label="分类"><Tag color="blue">{currentRecord.category}</Tag></Descriptions.Item>
            <Descriptions.Item label="发布方">{currentRecord.provider}</Descriptions.Item>
            <Descriptions.Item label="联系人">{currentRecord.contact}</Descriptions.Item>
            <Descriptions.Item label="联系电话">{currentRecord.phone}</Descriptions.Item>
            <Descriptions.Item label="发布时间">{currentRecord.time}</Descriptions.Item>
            <Descriptions.Item label="当前状态">{currentRecord.status === 'normal' ? <Tag color="green">正常</Tag> : <Tag color="red">已下架</Tag>}</Descriptions.Item>
          </Descriptions>
        )}
      </Modal>

      <Modal
        title={<span style={{ color: '#ff4d4f' }}>强制下架该服务</span>}
        open={takedownOpen}
        onCancel={function () { setTakedownOpen(false); }}
        onOk={handleTakedown}
        okButtonProps={{ danger: true }}
        okText="确认下架"
      >
        <div style={{ marginBottom: 16, fontSize: 14 }}>您正在强制下架服务 <strong>{currentRecord?.title}</strong>，下架后将不在前台展示。</div>
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
