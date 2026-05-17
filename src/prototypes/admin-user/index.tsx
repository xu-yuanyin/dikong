/**
 * @name 门户用户管理
 * @mode axure
 */

import './style.css';

import React, { useState, useCallback } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { Card, Table, Tag, Button, Breadcrumb, Space, Modal, Input, Select, message, Popconfirm, Tooltip, Descriptions, Tabs, Divider, Timeline } from 'antd';
import { EyeOutlined, StopOutlined, CheckCircleOutlined, SafetyCertificateOutlined, LockOutlined, SearchOutlined, UserOutlined, ClockCircleOutlined, EnvironmentOutlined } from '@ant-design/icons';

var ROLES = [
  { value: 'guest', label: '游客', color: 'default' },
  { value: 'personal', label: '个人用户', color: 'blue' },
  { value: 'pilot', label: '飞手', color: 'green' },
  { value: 'enterprise', label: '企业用户', color: 'purple' },
  { value: 'provider', label: '飞行服务商', color: 'cyan' },
  { value: 'merchant', label: '商户', color: 'orange' },
  { value: 'government', label: '政府部门', color: 'geekblue' }
];

var CERT_STATUS = [
  { value: 'uncertified', label: '未认证', color: 'default' },
  { value: 'pending', label: '待审核', color: 'orange' },
  { value: 'certified', label: '已认证', color: 'green' }
];

/* 模拟门户用户详细数据 */
var USER_DATA = [
  { 
    key: '1', id: 10001, username: 'dk_user_001', phone: '13812341111', email: 'user001@example.com',
    role: 'pilot', certStatus: 'certified', status: 'normal', regTime: '2026-03-15 09:23:11', lastLogin: '2026-05-17 08:30:00',
    certifiedRoles: ['personal', 'pilot'],
    loginLogs: [
      { time: '2026-05-17 08:30:00', ip: '115.192.12.34', location: '浙江省杭州市', method: '密码登录' },
      { time: '2026-05-16 19:45:12', ip: '115.192.12.34', location: '浙江省杭州市', method: '短信验证码登录' }
    ]
  },
  { 
    key: '2', id: 10002, username: 'dk_user_002', phone: '13912342222', email: 'contact@enterprise.com',
    role: 'enterprise', certStatus: 'pending', status: 'normal', regTime: '2026-03-18 14:10:05', lastLogin: '2026-05-15 16:45:33',
    certifiedRoles: ['personal'],
    loginLogs: [
      { time: '2026-05-15 16:45:33', ip: '220.181.38.148', location: '北京市', method: '密码登录' }
    ]
  },
  { 
    key: '3', id: 10003, username: 'dk_user_003', phone: '13712343333', email: 'service@provider.com',
    role: 'provider', certStatus: 'certified', status: 'normal', regTime: '2026-03-20 11:05:22', lastLogin: '2026-05-17 10:15:00',
    certifiedRoles: ['personal', 'enterprise', 'provider'],
    loginLogs: [
      { time: '2026-05-17 10:15:00', ip: '121.35.211.20', location: '广东省深圳市', method: '扫码登录' },
      { time: '2026-05-14 09:00:00', ip: '121.35.211.20', location: '广东省深圳市', method: '扫码登录' }
    ]
  },
  { 
    key: '4', id: 10004, username: 'dk_user_004', phone: '13612344444', email: '',
    role: 'guest', certStatus: 'uncertified', status: 'normal', regTime: '2026-04-05 16:20:44', lastLogin: '2026-04-20 14:20:11',
    certifiedRoles: [],
    loginLogs: [
      { time: '2026-04-20 14:20:11', ip: '183.129.210.50', location: '浙江省宁波市', method: '短信验证码登录' }
    ]
  },
  { 
    key: '5', id: 10005, username: 'dk_user_005', phone: '13512345555', email: 'gov_dept@gov.cn',
    role: 'government', certStatus: 'certified', status: 'normal', regTime: '2026-01-10 09:00:00', lastLogin: '2026-05-17 11:00:00',
    certifiedRoles: ['personal', 'government'],
    loginLogs: [
      { time: '2026-05-17 11:00:00', ip: '218.75.123.45', location: '江苏省南京市', method: '密码登录' }
    ]
  },
  { 
    key: '6', id: 10006, username: 'dk_user_006', phone: '13412346666', email: 'bad_user@test.com',
    role: 'guest', certStatus: 'uncertified', status: 'disabled', regTime: '2026-04-01 20:30:15', lastLogin: '2026-04-15 08:30:00',
    banReason: '发布违规言论，多次警告无效',
    certifiedRoles: [],
    loginLogs: [
      { time: '2026-04-15 08:30:00', ip: '112.65.12.34', location: '上海市', method: '密码登录' }
    ]
  }
];

var Component = function AdminUserPage() {
  var [viewOpen, setViewOpen] = useState(false);
  var [banOpen, setBanOpen] = useState(false);
  var [resetOpen, setResetOpen] = useState(false);
  var [currentRecord, setCurrentRecord] = useState<any>(null);
  var [banReason, setBanReason] = useState('');

  var handleNavigate = useCallback(function (key: string) {
    window.location.href = '/prototypes/' + key;
  }, []);

  var confirmBan = function () {
    if (!banReason.trim()) {
      message.warning('请输入封禁原因');
      return;
    }
    message.success('该账号已封禁');
    setBanOpen(false);
    setBanReason('');
  };

  var columns = [
    { title: '用户ID', dataIndex: 'id', key: 'id', width: 90 },
    { title: '门户账号', dataIndex: 'username', key: 'username', width: 120, render: function (t: string) { return <span style={{ fontWeight: 500 }}>{t}</span>; } },
    { title: '注册手机号', dataIndex: 'phone', key: 'phone', width: 140 },
    { title: '当前身份', dataIndex: 'role', key: 'role', width: 110, render: function (t: string) { var r = ROLES.find(function (item) { return item.value === t; }); return <Tag color={r ? r.color : 'default'}>{r ? r.label : t}</Tag>; } },
    { title: '认证状态', dataIndex: 'certStatus', key: 'certStatus', width: 100, render: function (t: string) { var c = CERT_STATUS.find(function (item) { return item.value === t; }); return <Tag color={c ? c.color : 'default'}>{c ? c.label : t}</Tag>; } },
    { title: '账号状态', dataIndex: 'status', key: 'status', width: 100, render: function (t: string) { return t === 'normal' ? <Tag color="green">正常</Tag> : <Tag color="red">已封禁</Tag>; } },
    { title: '注册时间', dataIndex: 'regTime', key: 'regTime', width: 160 },
    { title: '操作', key: 'action', width: 200, fixed: 'right' as const, render: function (_: any, record: any) {
      return (
        <Space size={4}>
          <Tooltip title="查看详情"><Button type="text" size="small" icon={<EyeOutlined />} style={{ color: '#1677ff' }} onClick={function () { setCurrentRecord(record); setViewOpen(true); }} /></Tooltip>
          {record.certStatus !== 'uncertified' && <Tooltip title="查看认证资料"><Button type="text" size="small" icon={<SafetyCertificateOutlined />} style={{ color: '#13c2c2' }} onClick={function () { handleNavigate('admin-cert'); }} /></Tooltip>}
          {record.status === 'normal' ? (
            <Tooltip title="封禁账号"><Button type="text" size="small" icon={<StopOutlined />} style={{ color: '#ff4d4f' }} onClick={function () { setCurrentRecord(record); setBanOpen(true); }} /></Tooltip>
          ) : (
            <Tooltip title="解封账号"><Popconfirm title="确定解封该用户账号？" onConfirm={function () { message.success('账号已解封'); }}><Button type="text" size="small" icon={<CheckCircleOutlined />} style={{ color: '#52c41a' }} /></Popconfirm></Tooltip>
          )}
          <Tooltip title="重置密码"><Button type="text" size="small" icon={<LockOutlined />} style={{ color: '#fa8c16' }} onClick={function () { setCurrentRecord(record); setResetOpen(true); }} /></Tooltip>
        </Space>
      );
    }}
  ];

  return (
    <AdminLayout activeKey="admin-user">
      <div style={{ maxWidth: 1400, margin: '0 auto', padding: 24 }}>
        <Breadcrumb items={[{ title: '系统设置' }, { title: '前台门户用户管理' }]} style={{ marginBottom: 16 }} />
        
        <Card style={{ borderRadius: 12 }}>
          <div style={{ display: 'flex', gap: 12, marginBottom: 16, flexWrap: 'wrap' }}>
            <Input prefix={<SearchOutlined />} placeholder="搜索账号/手机号/ID" style={{ width: 240 }} allowClear />
            <Select placeholder="当前身份" style={{ width: 140 }} options={ROLES} allowClear />
            <Select placeholder="认证状态" style={{ width: 120 }} options={CERT_STATUS} allowClear />
            <Select placeholder="账号状态" style={{ width: 120 }} options={[{ value: 'normal', label: '正常' }, { value: 'disabled', label: '已封禁' }]} allowClear />
            <Button type="primary" icon={<SearchOutlined />}>检索</Button>
            <Button>重置</Button>
          </div>
          <Table columns={columns} dataSource={USER_DATA} pagination={{ pageSize: 10, total: USER_DATA.length, showTotal: function(t) { return '共 ' + t + ' 名用户'; } }} scroll={{ x: 1000 }} />
        </Card>
      </div>

      {/* 用户详情弹窗 */}
      <Modal title="用户详情" open={viewOpen} onCancel={function () { setViewOpen(false); }} width={720} footer={<Button onClick={function () { setViewOpen(false); }}>关闭</Button>}>
        {currentRecord && (
          <div style={{ marginTop: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24, padding: '16px', background: '#f5f5f5', borderRadius: 8 }}>
              <UserOutlined style={{ fontSize: 40, color: '#1677ff', background: '#e6f4ff', padding: 12, borderRadius: '50%' }} />
              <div>
                <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 4 }}>
                  {currentRecord.username}
                  <Tag color={currentRecord.status === 'normal' ? 'green' : 'red'} style={{ marginLeft: 8, fontWeight: 'normal' }}>
                    {currentRecord.status === 'normal' ? '正常' : '已封禁'}
                  </Tag>
                </div>
                <div style={{ color: '#8c8c8c' }}>用户ID: {currentRecord.id} | 手机号: {currentRecord.phone} | 邮箱: {currentRecord.email || '未绑定'}</div>
              </div>
            </div>

            <Tabs defaultActiveKey="basic" items={[
              {
                key: 'basic',
                label: '基础信息',
                children: (
                  <Descriptions column={2} bordered size="small" style={{ marginTop: 8 }}>
                    <Descriptions.Item label="当前展示身份"><Tag color={ROLES.find(function(r) { return r.value === currentRecord.role })?.color}>{ROLES.find(function(r) { return r.value === currentRecord.role })?.label}</Tag></Descriptions.Item>
                    <Descriptions.Item label="认证状态"><Tag color={CERT_STATUS.find(function(c) { return c.value === currentRecord.certStatus })?.color}>{CERT_STATUS.find(function(c) { return c.value === currentRecord.certStatus })?.label}</Tag></Descriptions.Item>
                    <Descriptions.Item label="注册时间">{currentRecord.regTime}</Descriptions.Item>
                    <Descriptions.Item label="最后登录时间">{currentRecord.lastLogin}</Descriptions.Item>
                    {currentRecord.status !== 'normal' && (
                      <Descriptions.Item label="封禁原因" span={2}><span style={{ color: '#ff4d4f' }}>{currentRecord.banReason}</span></Descriptions.Item>
                    )}
                  </Descriptions>
                )
              },
              {
                key: 'cert',
                label: '已认证角色',
                children: (
                  <div style={{ marginTop: 8 }}>
                    <div style={{ marginBottom: 16, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                      {currentRecord.certifiedRoles.map(function(roleCode: string) {
                        var roleInfo = ROLES.find(function(r) { return r.value === roleCode; });
                        return roleInfo ? <Tag key={roleCode} color={roleInfo.color} style={{ padding: '4px 12px', fontSize: 14 }}>{roleInfo.label}</Tag> : null;
                      })}
                    </div>
                    {currentRecord.certifiedRoles.length > 1 && (
                      <Button type="primary" ghost icon={<SafetyCertificateOutlined />} onClick={function() { setViewOpen(false); handleNavigate('admin-cert'); }}>前往认证管理查看详细资质</Button>
                    )}
                  </div>
                )
              },
              {
                key: 'log',
                label: '登录日志',
                children: (
                  <div style={{ marginTop: 16, maxHeight: 300, overflow: 'auto' }}>
                    <Timeline items={currentRecord.loginLogs.map(function(log: any) {
                      return {
                        content: (
                          <div>
                            <div style={{ fontWeight: 500, marginBottom: 4 }}>{log.time}</div>
                            <div style={{ color: '#8c8c8c', fontSize: 13 }}>
                              <Space size={16}>
                                <span><EnvironmentOutlined /> {log.ip} ({log.location})</span>
                                <span><LockOutlined /> {log.method}</span>
                              </Space>
                            </div>
                          </div>
                        )
                      };
                    })} />
                  </div>
                )
              }
            ]} />
          </div>
        )}
      </Modal>

      {/* 封禁账号弹窗 */}
      <Modal title="封禁门户账号" open={banOpen} onCancel={function () { setBanOpen(false); setBanReason(''); }} onOk={confirmBan} okButtonProps={{ danger: true }} okText="确认封禁">
        {currentRecord && (
          <div style={{ marginTop: 16 }}>
            <div style={{ marginBottom: 16, padding: '12px', background: '#fff1f0', border: '1px solid #ffccc7', borderRadius: 6 }}>
              <span style={{ color: '#cf1322', fontWeight: 600 }}><StopOutlined style={{ marginRight: 6 }} />警告</span>
              <div style={{ marginTop: 4, color: '#cf1322', fontSize: 13 }}>封禁后，该用户将无法登录前台门户，其名下发布的所有商品和需求将被隐藏。</div>
            </div>
            <div style={{ marginBottom: 8, fontWeight: 500 }}>请输入封禁原因（必填）：</div>
            <Input.TextArea rows={4} placeholder="例如：发布违法违规信息、恶意刷单等" value={banReason} onChange={function(e) { setBanReason(e.target.value); }} />
          </div>
        )}
      </Modal>

      {/* 重置密码弹窗 */}
      <Modal title="重置密码确认" open={resetOpen} onCancel={function () { setResetOpen(false); }} onOk={function() { message.success('重置成功，新密码已生效'); setResetOpen(false); }} okText="确认重置">
        {currentRecord && (
          <div style={{ marginTop: 16 }}>
            <p>确定要为账号 <span style={{ fontWeight: 600, color: '#1677ff' }}>{currentRecord.username}</span> 重置密码吗？</p>
            <div style={{ padding: '12px 16px', background: '#f6ffed', border: '1px solid #b7eb8f', borderRadius: 6, marginTop: 12 }}>
              重置后的默认密码为：<span style={{ fontSize: 18, fontWeight: 700, color: '#52c41a', letterSpacing: 1 }}>123456</span>
            </div>
            <p style={{ marginTop: 12, color: '#8c8c8c', fontSize: 13 }}>请提示用户在下次登录后及时修改默认密码以保障账号安全。</p>
          </div>
        )}
      </Modal>

    </AdminLayout>
  );
};

export default Component;
