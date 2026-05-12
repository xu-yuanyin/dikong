/**
 * @name 需求大厅管理
 * @mode axure
 */

import './style.css';

import React, { useState, useCallback } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { Card, Table, Tag, Button, Breadcrumb, Space, Modal, Input, Select, message, Tooltip, Descriptions } from 'antd';
import { SettingOutlined, EyeOutlined, StopOutlined, SearchOutlined } from '@ant-design/icons';



var DEMAND_DATA = [
  { key: '1', id: 'DMD-2026-001', title: '求购 10 台工业级测绘无人机', type: '采购需求', publisher: 'XX测绘工程有限公司', time: '2026-04-20 09:00', status: 'normal' },
  { key: '2', id: 'DMD-2026-002', title: '需要 500 亩农田喷洒服务', type: '飞行需求', publisher: '李先生(个人)', time: '2026-04-21 14:20', status: 'normal' },
  { key: '3', id: 'DMD-2026-003', title: '测试需求发包', type: '采购需求', publisher: '某个人用户', time: '2026-04-22 16:30', status: 'blocked' }
];

var Component = function AdminDemandPage() {
  var [viewOpen, setViewOpen] = useState(false);
  var [takedownOpen, setTakedownOpen] = useState(false);
  var [currentRecord, setCurrentRecord] = useState<any>(null);
  var [takedownReason, setTakedownReason] = useState('');

  var handleNavigate = useCallback(function (key: string) {
    window.location.href = '/prototypes/' + key;
  }, []);

  var handleTakedown = function () {
    message.success('已屏蔽该需求，前台大厅将不再展示');
    setTakedownOpen(false);
    setTakedownReason('');
  };

  var columns = [
    { title: '需求编号', dataIndex: 'id', key: 'id', width: 120 },
    { title: '需求标题', dataIndex: 'title', key: 'title', width: 200, render: function (t: string) { return <span style={{ fontWeight: 500, color: '#1677ff' }}>{t}</span>; } },
    { title: '需求类型', dataIndex: 'type', key: 'type', width: 100, render: function (t: string) { return <Tag color={t === '采购需求' ? 'purple' : 'blue'}>{t}</Tag>; } },
    { title: '发布方', dataIndex: 'publisher', key: 'publisher', width: 160 },
    { title: '发布时间', dataIndex: 'time', key: 'time', width: 150 },
    { title: '状态', dataIndex: 'status', key: 'status', width: 90, render: function (s: string) { return s === 'normal' ? <Tag color="green">正常</Tag> : <Tag color="red">已屏蔽</Tag>; } },
    { title: '操作', key: 'action', width: 120, fixed: 'right' as const, render: function (_: any, record: any) {
      return (
        <Space size={4}>
          <Tooltip title="查看详情"><Button type="text" size="small" icon={<EyeOutlined />} style={{ color: '#1677ff' }} onClick={function () { setCurrentRecord(record); setViewOpen(true); }} /></Tooltip>
          {record.status === 'normal' && (
            <Tooltip title="违规屏蔽"><Button type="text" size="small" icon={<StopOutlined />} style={{ color: '#ff4d4f' }} onClick={function () { setCurrentRecord(record); setTakedownOpen(true); }} /></Tooltip>
          )}
        </Space>
      );
    }}
  ];

  return (
    <AdminLayout activeKey="admin-demand">
      

      <div style={{ maxWidth: 1400, margin: '0 auto', padding: 24 }}>
        <Breadcrumb items={[{ title: '系统设置' }, { title: '需求大厅管理' }]} style={{ marginBottom: 16 }} />
        <Card style={{ borderRadius: 12 }}>
          <div style={{ display: 'flex', gap: 12, marginBottom: 16, flexWrap: 'wrap' }}>
            <Input prefix={<SearchOutlined />} placeholder="搜索需求标题/发布方" style={{ width: 220 }} allowClear />
            <Select placeholder="类型" style={{ width: 140 }} options={[{ value: '1', label: '采购需求' }, { value: '2', label: '飞行需求' }]} allowClear />
            <Select placeholder="状态" style={{ width: 120 }} options={[{ value: 'normal', label: '正常' }, { value: 'blocked', label: '已屏蔽' }]} allowClear />
            <Button type="primary" icon={<SearchOutlined />}>检索</Button>
          </div>
          <Table columns={columns} dataSource={DEMAND_DATA} pagination={{ pageSize: 10, total: DEMAND_DATA.length }} />
        </Card>
      </div>

      <Modal title="查看需求详情" open={viewOpen} onCancel={function () { setViewOpen(false); }} width={720} footer={<Button onClick={function () { setViewOpen(false); }}>关闭</Button>}>
        {currentRecord && (
          <Descriptions column={2} bordered style={{ marginTop: 16 }}>
            <Descriptions.Item label="需求标题" span={2}>{currentRecord.title}</Descriptions.Item>
            <Descriptions.Item label="需求编号">{currentRecord.id}</Descriptions.Item>
            <Descriptions.Item label="需求类型"><Tag color={currentRecord.type === '采购需求' ? 'purple' : 'blue'}>{currentRecord.type}</Tag></Descriptions.Item>
            <Descriptions.Item label="发布方">{currentRecord.publisher}</Descriptions.Item>
            <Descriptions.Item label="发布时间">{currentRecord.time}</Descriptions.Item>
            <Descriptions.Item label="当前状态">{currentRecord.status === 'normal' ? <Tag color="green">正常</Tag> : <Tag color="red">已屏蔽</Tag>}</Descriptions.Item>
          </Descriptions>
        )}
      </Modal>

      <Modal
        title={<span style={{ color: '#ff4d4f' }}>强制屏蔽该需求</span>}
        open={takedownOpen}
        onCancel={function () { setTakedownOpen(false); }}
        onOk={handleTakedown}
        okButtonProps={{ danger: true }}
        okText="确认屏蔽"
      >
        <div style={{ marginBottom: 16, fontSize: 14 }}>您正在违规屏蔽需求 <strong>{currentRecord?.title}</strong>，屏蔽后前台将不再展示。</div>
        <Input.TextArea 
          placeholder="请输入屏蔽/下架原因（选填，用于后台备案核查）" 
          rows={4} 
          value={takedownReason}
          onChange={function (e) { setTakedownReason(e.target.value); }} 
        />
      </Modal>
    </AdminLayout>
  );
};

export default Component;
