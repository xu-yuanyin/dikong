/**
 * @name 认证管理
 * @mode axure
 * /Users/xu/Desktop/元引信息/Axhub-Make-main/skills/axure-export-workflow/SKILL.md
 *
 */

import './style.css';

import React, { useState, useCallback } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { Card, Table, Tag, Button, Breadcrumb, Space, Modal, Form, Input, Select, message, Popconfirm, Tooltip, Descriptions, Row, Col, Tabs } from 'antd';
import { SettingOutlined, EyeOutlined, SearchOutlined, CheckCircleOutlined, CloseCircleOutlined, SafetyCertificateOutlined } from '@ant-design/icons';



var ROLE_MAP: Record<string, { text: string; color: string }> = {
  personal: { text: '个人用户', color: '#1677ff' },
  pilot: { text: '飞手', color: '#52c41a' },
  enterprise: { text: '企业用户', color: '#722ed1' },
  provider: { text: '飞行服务商', color: '#13c2c2' },
  merchant: { text: '商户', color: '#fa8c16' },
  government: { text: '政府部门', color: '#1677ff' }
};

var STATUS_MAP: Record<string, { text: string; color: string }> = {
  pending: { text: '待审核', color: 'orange' },
  approved: { text: '已通过', color: 'green' },
  rejected: { text: '已驳回', color: 'red' }
};

var TABLE_DATA = [
  { key: '1', id: 1, certNo: 'CERT-2026-0001', username: 'dk20260001', role: 'pilot', phone: '13812348888', certTarget: 'dk20260001', applyDate: '2026-04-25', status: 'pending', remark: '' },
  { key: '2', id: 2, certNo: 'CERT-2026-0002', username: 'dk20260002', role: 'enterprise', phone: '13912342222', certTarget: 'dk20260002', applyDate: '2026-04-23', status: 'approved', remark: '企业资质齐全' },
  { key: '3', id: 3, certNo: 'CERT-2026-0003', username: 'dk20260003', role: 'provider', phone: '13712343333', certTarget: 'dk20260003', applyDate: '2026-04-22', status: 'approved', remark: '' },
  { key: '4', id: 4, certNo: 'CERT-2026-0004', username: 'dk20260004', role: 'merchant', phone: '13612344444', certTarget: 'dk20260004', applyDate: '2026-04-20', status: 'rejected', remark: '营业执照不清晰' },
  { key: '5', id: 5, certNo: 'CERT-2026-0005', username: 'dk20260005', role: 'government', phone: '13512345555', certTarget: 'dk20260005', applyDate: '2026-04-18', status: 'approved', remark: '' },
  { key: '6', id: 6, certNo: 'CERT-2026-0006', username: 'dk20260006', role: 'personal', phone: '13412346666', certTarget: 'dk20260006', applyDate: '2026-04-27', status: 'pending', remark: '' },
  { key: '7', id: 7, certNo: 'CERT-2026-0007', username: 'dk20260007', role: 'provider', phone: '13312347777', certTarget: 'dk20260007', applyDate: '2026-04-26', status: 'pending', remark: '' }
];

var Component = function AdminCertPage() {
  var [viewOpen, setViewOpen] = useState(false);
  var [activeTab, setActiveTab] = useState('pilot');
  var [approveOpen, setApproveOpen] = useState(false);
  var [rejectOpen, setRejectOpen] = useState(false);
  var [rejectReason, setRejectReason] = useState('');
  var [viewRecord, setViewRecord] = useState<any>(null);

  var handleNavigate = useCallback(function (key: string) {
    window.location.href = '/prototypes/' + key;
  }, []);

  var handleView = useCallback(function (record: any) {
    setViewRecord(record);
    setViewOpen(true);
  }, []);

  var renderCertDetail = function () {
    if (!viewRecord) return null;
    var r = viewRecord;
    if (r.role === 'personal') {
      return (
        <Descriptions column={2} bordered style={{ marginTop: 16 }}>
          <Descriptions.Item label="真实姓名">dk20260006</Descriptions.Item>
          <Descriptions.Item label="身份证号">330102199501011234</Descriptions.Item>
        </Descriptions>
      );
    }
    if (r.role === 'pilot') {
      return (
        <Descriptions column={2} bordered style={{ marginTop: 16 }}>
          <Descriptions.Item label="真实姓名">dk20260001</Descriptions.Item>
          <Descriptions.Item label="身份证号">330102199803055678</Descriptions.Item>
          <Descriptions.Item label="驾驶证编号">UAV-P-2024-0088</Descriptions.Item>
          <Descriptions.Item label="驾驶等级"><Tag>多旋翼</Tag><Tag>固定翼</Tag></Descriptions.Item>
        </Descriptions>
      );
    }
    if (r.role === 'enterprise' || r.role === 'provider') {
      return (
        <Descriptions column={2} bordered style={{ marginTop: 16 }}>
          <Descriptions.Item label="企业名称">{r.certTarget}</Descriptions.Item>
          <Descriptions.Item label="统一社会信用代码">91330000XXXXXXXXXX</Descriptions.Item>
          <Descriptions.Item label="联系人">王企</Descriptions.Item>
          <Descriptions.Item label="联系电话">{r.phone}</Descriptions.Item>
          {r.role === 'provider' && <Descriptions.Item label="服务类型"><Tag>航拍服务</Tag><Tag>巡检服务</Tag><Tag>物流配送</Tag></Descriptions.Item>}
          {r.role === 'provider' && <Descriptions.Item label="服务区域">XX市全域</Descriptions.Item>}
        </Descriptions>
      );
    }
    if (r.role === 'merchant') {
      return (
        <Descriptions column={2} bordered style={{ marginTop: 16 }}>
          <Descriptions.Item label="企业名称">{r.certTarget}</Descriptions.Item>
          <Descriptions.Item label="统一社会信用代码">91330000YYYYYYYYYY</Descriptions.Item>
          <Descriptions.Item label="联系人">赵商</Descriptions.Item>
          <Descriptions.Item label="联系电话">{r.phone}</Descriptions.Item>
          <Descriptions.Item label="主营类目"><Tag>无人机整机</Tag><Tag>配件电池</Tag></Descriptions.Item>
          <Descriptions.Item label="经营地址">XX市高新区创业路88号</Descriptions.Item>
        </Descriptions>
      );
    }
    if (r.role === 'government') {
      return (
        <Descriptions column={2} bordered style={{ marginTop: 16 }}>
          <Descriptions.Item label="单位名称">{r.certTarget}</Descriptions.Item>
          <Descriptions.Item label="统一社会信用代码">11330000ZZZZZZZZZZ</Descriptions.Item>
          <Descriptions.Item label="机构类型">职能部门</Descriptions.Item>
          <Descriptions.Item label="联系人">李政</Descriptions.Item>
          <Descriptions.Item label="联系电话">{r.phone}</Descriptions.Item>
        </Descriptions>
      );
    }
    return null;
  };

  var columns = [
    { title: '序号', dataIndex: 'id', key: 'id', width: 60 },
    { title: '认证编号', dataIndex: 'certNo', key: 'certNo', width: 140 },
    { title: '用户名', dataIndex: 'username', key: 'username', width: 160, render: function (t: string) { return <span style={{ fontWeight: 500 }}>{t}</span>; } },
    { title: '认证角色', dataIndex: 'role', key: 'role', width: 110, render: function (t: string) { var r = ROLE_MAP[t]; return <Tag color={r.color}>{r.text}</Tag>; } },
    { title: '真实姓名', dataIndex: 'certTarget', key: 'certTarget', width: 160, ellipsis: true },
    { title: '联系电话', dataIndex: 'phone', key: 'phone', width: 120 },
    { title: '申请日期', dataIndex: 'applyDate', key: 'applyDate', width: 110 },
    { title: '状态', dataIndex: 'status', key: 'status', width: 90, render: function (t: string) { var s = STATUS_MAP[t]; return <Tag color={s.color}>{s.text}</Tag>; } },
    { title: '操作', key: 'action', width: 80, fixed: 'right' as const, render: function (_: any, record: any) {
      return (
        <Space size={4}>
          <Tooltip title="查看详情"><Button type="text" size="small" icon={<EyeOutlined />} style={{ color: '#1677ff' }} onClick={function () { handleView(record); }} /></Tooltip>
        </Space>
      );
    }}
  ];

  return (
    <AdminLayout activeKey="admin-cert">
      

      <div style={{ maxWidth: 1400, margin: '0 auto', padding: 24 }}>
        <Breadcrumb items={[{ title: '系统管理' }, { title: '认证查询' }]} style={{ marginBottom: 16 }} />
        <Card style={{ borderRadius: 12 }}>
          <Tabs
            activeKey={activeTab}
            onChange={setActiveTab}
            items={[
              { key: 'personal', label: '个人用户' },
              { key: 'enterprise', label: '企业用户' },
              { key: 'government', label: '政府部门' },
              { key: 'pilot', label: '飞手' },
              { key: 'provider', label: '飞行服务商' },
              { key: 'merchant', label: '商户' }
            ]}
          />
          <div style={{ display: 'flex', gap: 12, marginBottom: 16, flexWrap: 'wrap' }}>
            <Input prefix={<SearchOutlined />} placeholder="请输入认证编号" style={{ width: 180 }} allowClear />
            <Input prefix={<SearchOutlined />} placeholder="请输入真实姓名" style={{ width: 180 }} allowClear />
            <Select placeholder="请选择状态" style={{ width: 140 }} options={[{ value: 'pending', label: '待审核' }, { value: 'approved', label: '已通过' }, { value: 'rejected', label: '已驳回' }]} allowClear />
            <Button type="primary">查询</Button>
            <Button>重置</Button>
          </div>
          <Table columns={columns} dataSource={TABLE_DATA.filter(function (d) { return d.role === activeTab; })} pagination={{ pageSize: 10 }} scroll={{ x: 1200 }} />
        </Card>
      </div>

      <Modal
        title="认证详情"
        open={viewOpen}
        onCancel={function () { setViewOpen(false); }}
        width={720}
        footer={[
          <Button key="close" onClick={function () { setViewOpen(false); }}>关闭</Button>,
          viewRecord && viewRecord.status === 'pending' ? <Button key="reject" danger onClick={function () { setRejectReason(''); setRejectOpen(true); }}>驳回</Button> : null,
          viewRecord && viewRecord.status === 'pending' ? <Button key="approve" type="primary" onClick={function () { setApproveOpen(true); }}>通过</Button> : null
        ]}
      >
        {viewRecord && (
          <>
            <Descriptions column={2} bordered>
              <Descriptions.Item label="认证编号">{viewRecord.certNo}</Descriptions.Item>
              <Descriptions.Item label="认证角色">{(() => { var r = ROLE_MAP[viewRecord.role]; return <Tag color={r.color}>{r.text}</Tag>; })()}</Descriptions.Item>
              <Descriptions.Item label="用户名">{viewRecord.username}</Descriptions.Item>
              <Descriptions.Item label="真实姓名">{viewRecord.certTarget}</Descriptions.Item>
              <Descriptions.Item label="联系电话">{viewRecord.phone}</Descriptions.Item>
              <Descriptions.Item label="申请日期">{viewRecord.applyDate}</Descriptions.Item>
              <Descriptions.Item label="审核状态">{(() => { var s = STATUS_MAP[viewRecord.status]; return <Tag color={s.color}>{s.text}</Tag>; })()}</Descriptions.Item>
              {viewRecord.remark && <Descriptions.Item label="审核备注" span={2}>{viewRecord.remark}</Descriptions.Item>}
            </Descriptions>
            <div style={{ marginTop: 16, marginBottom: 8, fontSize: 14, fontWeight: 600, color: '#1f1f1f' }}>认证资料</div>
            {renderCertDetail()}
          </>
        )}
      </Modal>

      <Modal
        title="审核通过确认"
        open={approveOpen}
        onCancel={function () { setApproveOpen(false); }}
        width={480}
        footer={[
          <Button key="c" onClick={function () { setApproveOpen(false); }}>关闭</Button>,
          <Button key="ok" type="primary" onClick={function () { message.success('审核通过'); setApproveOpen(false); setViewOpen(false); }}>确认通过</Button>
        ]}
      >
        <div style={{ padding: '16px 0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
            <CheckCircleOutlined style={{ fontSize: 40, color: '#52c41a' }} />
            <div>
              <div style={{ fontSize: 16, fontWeight: 600 }}>确定通过该认证申请？</div>
              <div style={{ color: '#8c8c8c', marginTop: 4 }}>通过后，该用户将获得对应角色的完整权限</div>
            </div>
          </div>
          {viewRecord && (
            <Descriptions column={1} bordered size="small">
              <Descriptions.Item label="认证编号">{viewRecord.certNo}</Descriptions.Item>
              <Descriptions.Item label="用户名">{viewRecord.username}</Descriptions.Item>
              <Descriptions.Item label="认证角色">{(() => { var r = ROLE_MAP[viewRecord.role]; return <Tag color={r.color}>{r.text}</Tag>; })()}</Descriptions.Item>
            </Descriptions>
          )}
        </div>
      </Modal>

      <Modal
        title="驳回认证申请"
        open={rejectOpen}
        onCancel={function () { setRejectOpen(false); }}
        width={480}
        footer={[
          <Button key="c" onClick={function () { setRejectOpen(false); }}>关闭</Button>,
          <Button key="ok" danger type="primary" onClick={function () { if (!rejectReason.trim()) { message.warning('请填写驳回原因'); return; } message.success('已驳回'); setRejectOpen(false); setViewOpen(false); }}>确认驳回</Button>
        ]}
      >
        <div style={{ padding: '16px 0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
            <CloseCircleOutlined style={{ fontSize: 40, color: '#ff4d4f' }} />
            <div>
              <div style={{ fontSize: 16, fontWeight: 600 }}>确定驳回该认证申请？</div>
              <div style={{ color: '#8c8c8c', marginTop: 4 }}>驳回后，用户可重新提交认证申请</div>
            </div>
          </div>
          {viewRecord && (
            <Descriptions column={1} bordered size="small" style={{ marginBottom: 16 }}>
              <Descriptions.Item label="认证编号">{viewRecord.certNo}</Descriptions.Item>
              <Descriptions.Item label="用户名">{viewRecord.username}</Descriptions.Item>
              <Descriptions.Item label="认证角色">{(() => { var r = ROLE_MAP[viewRecord.role]; return <Tag color={r.color}>{r.text}</Tag>; })()}</Descriptions.Item>
            </Descriptions>
          )}
          <div style={{ marginBottom: 8, fontWeight: 500 }}>驳回原因 <span style={{ color: '#ff4d4f' }}>*</span></div>
          <Input.TextArea rows={3} placeholder="请输入驳回原因" value={rejectReason} onChange={function (e: any) { setRejectReason(e.target.value); }} />
        </div>
      </Modal>
    </AdminLayout>
  );
};

export default Component;
