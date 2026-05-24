/**
 * @name 认证管理
 * @mode axure
 * /Users/xu/Desktop/元引信息/Axhub-Make-main/skills/axure-export-workflow/SKILL.md
 *
 */

import './style.css';

import React, { useState, useCallback } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { Card, Table, Tag, Button, Breadcrumb, Space, Modal, Form, Input, Select, message, Popconfirm, Tooltip, Descriptions, Row, Col, Tabs, Timeline } from 'antd';
import { SettingOutlined, EyeOutlined, SearchOutlined, CheckCircleOutlined, CloseCircleOutlined, SafetyCertificateOutlined, HistoryOutlined } from '@ant-design/icons';

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
  { 
    key: '1', 
    id: 1, 
    certNo: 'CERT-2026-0001', 
    username: 'dk20260001', 
    role: 'pilot', 
    phone: '13812348888', 
    certTarget: '陈明', 
    applyDate: '2026-05-22', 
    status: 'pending', 
    remark: '',
    history: [
      { time: '2026-05-10 10:00:00', action: 'submit', operator: 'dk20260001', remark: '首次提交飞手角色入驻认证申请。' },
      { time: '2026-05-11 14:00:00', action: 'reject', operator: '高级审核员', remark: '首次驳回原因：真实姓名与身份证名字不一致（写成了同音字“陈鸣”），且驾驶证编号填写有误。' },
      { 
        time: '2026-05-12 09:30:00', 
        action: 'resubmit', 
        operator: 'dk20260001', 
        remark: '第一次重新提交，修正了名字和证书编号：',
        details: [
          { label: '真实姓名', oldVal: '陈鸣', newVal: '陈明' },
          { label: '驾驶证编号', oldVal: 'UAV-P-2024-0012', newVal: 'UAV-P-2024-0088' }
        ]
      },
      { time: '2026-05-13 16:30:00', action: 'reject', operator: '高级审核员', remark: '第二次驳回原因：重新上传的手持驾驶证照片严重反光模糊，红章和有效期限字样无法清晰辨识。' },
      { 
        time: '2026-05-22 09:30:00', 
        action: 'resubmit', 
        operator: 'dk20260001', 
        remark: '第二次重新提交，重新上传了高清无反光的彩色手持驾驶证与身份证原件照片：',
        details: [
          { label: '手持驾驶证照', oldVal: '照片反光模糊遮挡', newVal: '超清无反光彩色原件' },
          { label: '手持身份证照', oldVal: '边角缺失不全', newVal: '完整清晰免冠手持原照' }
        ]
      }
    ]
  },
  { 
    key: '2', 
    id: 2, 
    certNo: 'CERT-2026-0002', 
    username: 'dk20260002', 
    role: 'enterprise', 
    phone: '13912342222', 
    certTarget: '极飞低空测绘公司', 
    applyDate: '2026-04-23', 
    status: 'approved', 
    remark: '企业资质齐全' 
  },
  { 
    key: '3', 
    id: 3, 
    certNo: 'CERT-2026-0003', 
    username: 'dk20260003', 
    role: 'provider', 
    phone: '13712343333', 
    certTarget: '蓝天通航飞行服务商', 
    applyDate: '2026-04-22', 
    status: 'approved', 
    remark: '' 
  },
  { 
    key: '4', 
    id: 4, 
    certNo: 'CERT-2026-0004', 
    username: 'dk20260004', 
    role: 'merchant', 
    phone: '13612344444', 
    certTarget: '大疆创新专卖店', 
    applyDate: '2026-04-20', 
    status: 'rejected', 
    remark: '营业执照不清晰' 
  },
  { 
    key: '5', 
    id: 5, 
    certNo: 'CERT-2026-0005', 
    username: 'dk20260005', 
    role: 'government', 
    phone: '13512345555', 
    certTarget: '郑州市低空空域管理局', 
    applyDate: '2026-04-18', 
    status: 'approved', 
    remark: '' 
  },
  { 
    key: '6', 
    id: 6, 
    certNo: 'CERT-2026-0006', 
    username: 'dk20260006', 
    role: 'personal', 
    phone: '13412346666', 
    certTarget: '张华', 
    applyDate: '2026-05-22', 
    status: 'pending', 
    remark: '',
    history: [
      { time: '2026-05-18 09:12:00', action: 'submit', operator: 'dk20260006', remark: '首次提交个人实名认证，因拼音姓名手误写为“张化”被系统退回。' },
      { time: '2026-05-19 11:20:00', action: 'reject', operator: '系统自动核验', remark: '驳回原因：姓名与身份证号码不匹配。' },
      { 
        time: '2026-05-22 08:50:00', 
        action: 'resubmit', 
        operator: 'dk20260006', 
        remark: '修正并重新提交，主要修改如下：',
        details: [
          { label: '真实姓名', oldVal: '张化', newVal: '张华' },
          { label: '身份证号', oldVal: '33010219950101123X', newVal: '330102199501011234' },
          { label: '手持身份证照', oldVal: '背光拍摄模糊', newVal: '日光充足高清照片' }
        ]
      }
    ]
  },
  { 
    key: '7', 
    id: 7, 
    certNo: 'CERT-2026-0007', 
    username: 'dk20260007', 
    role: 'provider', 
    phone: '13312347777', 
    certTarget: '星空低空物流配送部', 
    applyDate: '2026-05-22', 
    status: 'pending', 
    remark: '',
    history: [
      { time: '2026-05-15 16:30:00', action: 'submit', operator: 'dk20260007', remark: '首次提交飞行服务商资质申请。' },
      { time: '2026-05-17 10:15:00', action: 'reject', operator: '高级审核员', remark: '驳回原因：营业执照复印件未加盖公章，且填写的统一社会信用代码与执照原件不符。' },
      { 
        time: '2026-05-22 09:00:00', 
        action: 'resubmit', 
        operator: 'dk20260007', 
        remark: '已重新核对信用代码，并上传加盖红色公章的营业执照彩色扫描件。修改信息如下：',
        details: [
          { label: '统一社会信用代码', oldVal: '91330000YYYYYYYYYY', newVal: '91330000XXXXXXXXXX' },
          { label: '营业执照复印件', oldVal: '无公章扫描件', newVal: '已盖红公章彩色扫描件' }
        ]
      }
    ]
  }
];

var Component = function AdminCertPage() {
  var [tableData, setTableData] = useState(TABLE_DATA);
  var [viewOpen, setViewOpen] = useState(false);
  var [activeTab, setActiveTab] = useState('pilot');
  var [approveOpen, setApproveOpen] = useState(false);
  var [rejectOpen, setRejectOpen] = useState(false);
  var [rejectReason, setRejectReason] = useState('');
  var [viewRecord, setViewRecord] = useState<any>(null);

  var [searchCertNo, setSearchCertNo] = useState('');
  var [searchName, setSearchName] = useState('');
  var [searchStatus, setSearchStatus] = useState<string | undefined>(undefined);
  var [filterQuery, setFilterQuery] = useState({ certNo: '', name: '', status: undefined as string | undefined });

  var handleSearch = function () {
    setFilterQuery({ certNo: searchCertNo, name: searchName, status: searchStatus });
  };

  var handleReset = function () {
    setSearchCertNo('');
    setSearchName('');
    setSearchStatus(undefined);
    setFilterQuery({ certNo: '', name: '', status: undefined });
  };

  var handleNavigate = useCallback(function (key: string) {
    window.location.href = '/prototypes/' + key;
  }, []);

  var handleView = useCallback(function (record: any) {
    setViewRecord(record);
    setViewOpen(true);
  }, []);

  var handleApproveConfirm = function () {
    if (viewRecord) {
      var auditTime = '2026-05-22 09:53:00';
      setTableData(function (prev) {
        return prev.map(function (item) {
          if (item.key === viewRecord.key) {
            var history = item.history ? [].concat(item.history) : [];
            history.push({
              time: auditTime,
              action: 'approve',
              operator: '当前管理员',
              remark: '人工运营审核通过，证件真实有效。'
            });
            var updated = Object.assign({}, item, { status: 'approved', remark: '审核通过，资质齐全', history: history });
            setViewRecord(updated);
            return updated;
          }
          return item;
        });
      });
      message.success('审核已通过');
      setApproveOpen(false);
      setViewOpen(false);
    }
  };

  var handleRejectConfirm = function () {
    if (!rejectReason.trim()) { message.warning('请填写驳回原因'); return; }
    if (viewRecord) {
      var auditTime = '2026-05-22 09:53:00';
      setTableData(function (prev) {
        return prev.map(function (item) {
          if (item.key === viewRecord.key) {
            var history = item.history ? [].concat(item.history) : [];
            history.push({
              time: auditTime,
              action: 'reject',
              operator: '当前管理员',
              remark: rejectReason
            });
            var updated = Object.assign({}, item, {
              status: 'rejected',
              remark: rejectReason,
              history: history
            });
            setViewRecord(updated);
            return updated;
          }
          return item;
        });
      });
      message.success('已驳回申请');
      setRejectOpen(false);
      setViewOpen(false);
      setRejectReason('');
    }
  };

  var renderCertDetail = function () {
    if (!viewRecord) return null;
    var r = viewRecord;
    if (r.role === 'personal') {
      return (
        <Descriptions column={2} bordered style={{ marginTop: 16 }}>
          <Descriptions.Item label="真实姓名">{r.certTarget}</Descriptions.Item>
          <Descriptions.Item label="身份证号">330102199501011234</Descriptions.Item>
        </Descriptions>
      );
    }
    if (r.role === 'pilot') {
      return (
        <Descriptions column={2} bordered style={{ marginTop: 16 }}>
          <Descriptions.Item label="真实姓名">{r.certTarget}</Descriptions.Item>
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
    { title: '真实姓名', dataIndex: 'certTarget', key: 'certTarget', width: 180, ellipsis: true },
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

  var filteredData = tableData.filter(function (d) {
    var matchTab = d.role === activeTab;
    var matchCertNo = !filterQuery.certNo || d.certNo.toLowerCase().indexOf(filterQuery.certNo.toLowerCase()) > -1;
    var matchName = !filterQuery.name || d.certTarget.toLowerCase().indexOf(filterQuery.name.toLowerCase()) > -1;
    var matchStatus = !filterQuery.status || d.status === filterQuery.status;
    return matchTab && matchCertNo && matchName && matchStatus;
  });

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
            <Input prefix={<SearchOutlined />} placeholder="请输入认证编号" style={{ width: 180 }} value={searchCertNo} onChange={function (e) { setSearchCertNo(e.target.value); }} onPressEnter={handleSearch} allowClear />
            <Input prefix={<SearchOutlined />} placeholder="请输入真实姓名" style={{ width: 180 }} value={searchName} onChange={function (e) { setSearchName(e.target.value); }} onPressEnter={handleSearch} allowClear />
            <Select placeholder="请选择状态" style={{ width: 140 }} options={[{ value: 'pending', label: '待审核' }, { value: 'approved', label: '已通过' }, { value: 'rejected', label: '已驳回' }]} value={searchStatus} onChange={setSearchStatus} allowClear />
            <Button type="primary" onClick={handleSearch}>查询</Button>
            <Button onClick={handleReset}>重置</Button>
          </div>
          <Table columns={columns} dataSource={filteredData} pagination={{ pageSize: 10 }} scroll={{ x: 1200 }} />
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
              <Descriptions.Item label="申请日期">{viewRecord.applyDate}</Descriptions.Item>
              <Descriptions.Item label="审核状态">{(() => { var s = STATUS_MAP[viewRecord.status]; return <Tag color={s.color}>{s.text}</Tag>; })()}</Descriptions.Item>
              {viewRecord.remark && <Descriptions.Item label="审核备注" span={2}>{viewRecord.remark}</Descriptions.Item>}
            </Descriptions>
            
            <div style={{ marginTop: 16, marginBottom: 8, fontSize: 14, fontWeight: 600, color: '#1f1f1f' }}>认证资料</div>
            {renderCertDetail()}

            {viewRecord.history && viewRecord.history.length > 0 && (
              <div style={{ marginTop: 24, padding: 16, background: '#f5f7fa', border: '1px solid #e4e7ed', borderRadius: 8 }}>
                <div style={{ fontWeight: 600, color: '#002c8c', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 6, fontSize: 14 }}>
                  <HistoryOutlined /> 历史审批与重新提交记录
                </div>
                <Timeline
                  style={{ marginTop: 8 }}
                  items={viewRecord.history.map(function (hist: any, idx: number) {
                    var color = hist.action === 'approve' ? 'green' : hist.action === 'reject' ? 'red' : hist.action === 'submit' ? 'blue' : 'orange';
                    var submitTotalIndex = viewRecord.history.slice(0, idx + 1).filter(function (h: any) {
                      return h.action === 'submit' || h.action === 'resubmit';
                    }).length;
                    var label = hist.action === 'approve'
                      ? '审批通过'
                      : hist.action === 'reject'
                        ? '审批驳回'
                        : hist.action === 'submit'
                          ? '首次提交'
                          : ('第' + submitTotalIndex + '次提交');
                    var showRemark = hist.remark && hist.action !== 'resubmit';
                    return {
                      color: color,
                      children: (
                        <div style={{ paddingBottom: 2 }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 500, fontSize: 13 }}>
                            <span>{label} <span style={{ color: '#8c8c8c', fontWeight: 'normal', fontSize: 12 }}>({hist.operator})</span></span>
                            <span style={{ color: '#8c8c8c', fontWeight: 'normal', fontSize: 12 }}>{hist.time}</span>
                          </div>
                          {showRemark && (
                            <div style={{ color: '#595959', marginTop: 4, fontSize: 12, background: '#ffffff', padding: '8px 12px', borderRadius: 6, border: '1px dashed #e8e8e8' }}>
                              <div style={{ fontWeight: 500 }}>{hist.remark}</div>
                              {hist.details && hist.details.length > 0 && (
                                <div style={{ marginTop: 6, borderTop: '1px solid #f0f0f0', paddingTop: 6 }}>
                                  <div style={{ color: '#8c8c8c', marginBottom: 4, fontWeight: 500 }}>修改对比明细：</div>
                                  <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                                    {hist.details.map(function (det: any, dIdx: number) {
                                      return (
                                        <div key={dIdx} style={{ padding: '2px 0', display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
                                          <Tag color="blue" style={{ margin: 0, fontSize: '10px', height: '18px', lineHeight: '16px' }}>{det.label}</Tag>
                                          <span style={{ textDecoration: 'line-through', color: '#8c8c8c' }}>{det.oldVal}</span>
                                          <span style={{ color: '#8c8c8c' }}>➜</span>
                                          <span style={{ color: '#52c41a', fontWeight: 600 }}>{det.newVal}</span>
                                        </div>
                                      );
                                    })}
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      )
                    };
                  })}
                />
              </div>
            )}
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
          <Button key="ok" type="primary" onClick={handleApproveConfirm}>确认通过</Button>
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
          <Button key="ok" danger type="primary" onClick={handleRejectConfirm}>确认驳回</Button>
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

