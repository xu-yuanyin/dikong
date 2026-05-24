/**
 * @name 商城商品上架审核
 * @mode axure
 */
import './style.css';
import React, { useState } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { Card, Table, Tag, Button, Breadcrumb, Space, Modal, Input, Select, message, Tooltip, Descriptions, Tabs, Popconfirm, Divider, Timeline, Row, Col } from 'antd';
import { EyeOutlined, SearchOutlined, CheckCircleOutlined, ShopOutlined, AuditOutlined, CloseCircleOutlined, HistoryOutlined, UserOutlined, PhoneOutlined, PaperClipOutlined } from '@ant-design/icons';

var PRODUCT_OPTIONS = [
  { value: 'uav', label: '工业级无人机' }, { value: 'evtol', label: 'eVTOL载人飞行器' },
  { value: 'security', label: '安全设备' }, { value: 'communication', label: '通信设备' },
  { value: 'training', label: '培训设备' }, { value: 'other', label: '其他' }
];

var GOODS_DATA = [
  { key: '1', id: 'MALL-2026-101', title: '大疆 DJI Mavic 3 Enterprise', category: '工业级无人机', scenario: '航拍测绘', price: '¥22,000.00', provider: 'XX无人机专营店', time: '2026-04-18 10:00:00', status: 'normal', stock: 50, specs: { weight: '915g', battery: '45分钟', payload: '无', range: '32公里' }, desc: 'DJI Mavic 3 Enterprise 配备机械快门、56倍变焦相机及 RTK 模块。', auditHistory: [{ time: '2026-04-18 10:00:00', action: 'approve', operator: '系统自动审核', remark: '产品参数匹配合规。' }] },
  { key: '2', id: 'MALL-2026-102', title: '纵横 CW-15 垂直起降固定翼', category: '工业级无人机', scenario: '巡检安防', price: '电议', provider: '纵横官方旗舰店', time: '2026-04-19 14:30:22', status: 'normal', stock: 5, specs: { weight: '14.5kg', battery: '180分钟', payload: '3kg', range: '100公里' }, desc: 'CW-15 采用先进的垂直起降技术。', auditHistory: [{ time: '2026-04-19 14:30:22', action: 'approve', operator: '系统自动审核', remark: '自动核准上架。' }] },
  { key: '3', id: 'MALL-2026-104', title: '大疆 DJI Air 3S 旗舰航拍机', category: '工业级无人机', scenario: '航拍测绘', price: '¥8,999.00', provider: '张明', time: '2026-05-21 15:00:00', status: 'pending', stock: 30, specs: { weight: '720g', battery: '46分钟', payload: '无', range: '20公里' }, desc: '全新 Air 3S 搭载 1 英寸 CMOS 传感器。', auditHistory: [
    { time: '2026-05-01 10:00:00', action: 'approve', operator: '商城管理专员', remark: '首次上架，通过审核。' },
    { time: '2026-05-18 14:00:00', action: 'offline', operator: '前台商户(自主下架)', remark: '下架原因：该型号设备国内库存售罄，待厂家补货后重新提交。' },
    { 
      time: '2026-05-19 09:00:00', 
      action: 'submit', 
      operator: '前台商户', 
      remark: '第一次申请重新发布：厂家新到货30台，申请补货重新上架。',
      details: [
        { label: '商品库存', oldVal: '0 件 (售罄下架)', newVal: '30 件' }
      ]
    },
    { time: '2026-05-20 11:00:00', action: 'reject', operator: '产品审核经理', remark: '第一次驳回原因：上架参数中起飞重量填写有误（把720g错写成了710g，会误导消费者关于实名登记分类的判断），请修正后再次提交。' },
    { 
      time: '2026-05-21 15:00:00', 
      action: 'submit', 
      operator: '前台商户(重新申请发布)', 
      remark: '第二次重新提交，修正了核心重量规格信息，并重新校对了库存：',
      details: [
        { label: '起飞重量', oldVal: '710g', newVal: '720g' },
        { label: '商品描述', oldVal: '未提及实名登记规则', newVal: '新增关于 720g 需遵守实名登记的购买提示' }
      ]
    }
  ] },
  { key: '4', id: 'MALL-2026-105', title: '无人机专用降落伞安全系统', category: '安全设备', scenario: '通用/其他', price: '¥3,200.00', provider: '张明', time: '2026-05-19 11:00:00', status: 'pending', stock: 50, specs: { weight: '350g', battery: '-', payload: '-', range: '-' }, desc: '适配 25kg 以下多旋翼无人机的紧急降落伞系统。', auditHistory: [{ time: '2026-05-19 11:00:00', action: 'submit', operator: '前台商户', remark: '首次提交发布申请。' }] },
  { key: '5', id: 'MALL-2026-106', title: '低空通信模块 V2.0', category: '通信设备', scenario: '通用/其他', price: '¥12,500.00', provider: '某通信公司', time: '2026-05-12 09:00:00', status: 'rejected', stock: 10, specs: { weight: '200g', battery: '-', payload: '-', range: '50公里' }, desc: '新一代低空通信模块，支持 5G/4G 双模。', rejectReason: '商品描述中缺少必要的产品认证信息（如 3C 认证编号），且商品图片模糊不清。', rejectTime: '2026-05-13 10:00:00', auditHistory: [
    { time: '2026-05-12 09:00:00', action: 'submit', operator: '某通信公司', remark: '首次提交产品发布。' },
    { time: '2026-05-13 10:00:00', action: 'reject', operator: '产品审核经理', remark: '商品描述中缺少必要的产品认证信息（如 3C 认证编号），且商品图片模糊不清。' }
  ] }
];

var STATUS_LABEL: Record<string, string> = { normal: '已通过', pending: '待审核', rejected: '已驳回' };
var STATUS_COLOR: Record<string, string> = { normal: 'green', pending: 'orange', rejected: 'red' };

var Component = function AdminMallPage() {
  var [goodsData, setGoodsData] = useState(GOODS_DATA);
  var [activeTab, setActiveTab] = useState('all');
  var [viewOpen, setViewOpen] = useState(false);
  var [currentRecord, setCurrentRecord] = useState<any>(null);
  var [rejectReason, setRejectReason] = useState('');

  var handleApprove = function () {
    if (currentRecord) {
      var auditTime = '2026-05-21 17:46:00';
      setGoodsData(function (prev) {
        return prev.map(function (item) {
          if (item.key === currentRecord.key) {
            var history = item.auditHistory ? [].concat(item.auditHistory) : [];
            history.push({
              time: auditTime,
              action: 'approve',
              operator: '当前管理员',
              remark: '商品审核通过，准予在线商城销售上架。'
            });
            return Object.assign({}, item, { status: 'normal', auditHistory: history });
          }
          return item;
        });
      });
      message.success('审核通过！该商品已上架展示。');
      setViewOpen(false);
    }
  };

  var handleReject = function () {
    if (!rejectReason.trim()) { message.warning('请输入驳回原因'); return; }
    if (currentRecord) {
      var auditTime = '2026-05-21 17:46:00';
      setGoodsData(function (prev) {
        return prev.map(function (item) {
          if (item.key === currentRecord.key) {
            var history = item.auditHistory ? [].concat(item.auditHistory) : [];
            history.push({
              time: auditTime,
              action: 'reject',
              operator: '当前管理员',
              remark: rejectReason
            });
            return Object.assign({}, item, {
              status: 'rejected',
              rejectReason: rejectReason,
              rejectTime: auditTime,
              auditHistory: history
            });
          }
          return item;
        });
      });
      message.success('已驳回该商品上架申请。');
      setViewOpen(false);
      setRejectReason('');
    }
  };

  var columns = [
    { title: '商品编号', dataIndex: 'id', key: 'id', width: 130 },
    { title: '商品名称', dataIndex: 'title', key: 'title', width: 220, render: function (t: string) { return <span style={{ fontWeight: 500, color: '#1677ff' }}>{t}</span>; } },
    { title: '分类', key: 'cat', width: 180, render: function (_: any, r: any) { return <div><Tag color="purple">{r.category}</Tag> <Tag>{r.scenario}</Tag></div>; } },
    { title: '价格', dataIndex: 'price', key: 'price', width: 100, render: function (t: string) { return <span style={{ color: '#ff4d4f', fontWeight: 500 }}>{t}</span>; } },
    { title: '发布商户', dataIndex: 'provider', key: 'provider', width: 160 },
    { title: '发布时间', dataIndex: 'time', key: 'time', width: 150 },
    { title: '状态', dataIndex: 'status', key: 'status', width: 100, render: function (s: string) { return <Tag color={STATUS_COLOR[s] || 'default'}>{STATUS_LABEL[s] || s}</Tag>; } },
    { title: '操作', key: 'action', width: 120, fixed: 'right' as const, render: function (_: any, record: any) {
      return (<Space size={4}>
        <Tooltip title="查看详情"><Button type="text" size="small" icon={<EyeOutlined />} style={{ color: '#1677ff' }} onClick={function () { setCurrentRecord(record); setViewOpen(true); }} /></Tooltip>
        {record.status === 'pending' && (<Tooltip title="审核处理"><Button type="text" size="small" icon={<AuditOutlined />} style={{ color: '#722ed1' }} onClick={function () { setCurrentRecord(record); setRejectReason(''); setViewOpen(true); }} /></Tooltip>)}
      </Space>);
    }}
  ];

  var tabItems = [
    { key: 'all', label: '全部 (' + goodsData.length + ')' },
    { key: 'pending', label: '待审核 (' + goodsData.filter(function (d) { return d.status === 'pending'; }).length + ')' },
    { key: 'normal', label: '已通过 (' + goodsData.filter(function (d) { return d.status === 'normal'; }).length + ')' },
    { key: 'rejected', label: '已驳回 (' + goodsData.filter(function (d) { return d.status === 'rejected'; }).length + ')' }
  ];
  var filteredData = activeTab === 'all' ? goodsData : goodsData.filter(function (d) { return d.status === activeTab; });

  return (
    <AdminLayout activeKey="admin-mall">
      <div style={{ maxWidth: 1400, margin: '0 auto', padding: 24 }}>
        <Breadcrumb items={[{ title: '业务审核' }, { title: '商城商品上架审核' }]} style={{ marginBottom: 16 }} />
        <Card style={{ borderRadius: 12 }}>
          <div style={{ display: 'flex', gap: 12, marginBottom: 16, flexWrap: 'wrap' }}>
            <Input prefix={<SearchOutlined />} placeholder="搜索商品编号/名称/商户" style={{ width: 240 }} allowClear />
            <Select placeholder="商品分类" style={{ width: 140 }} options={PRODUCT_OPTIONS} allowClear />
            <Select placeholder="审核状态" style={{ width: 120 }} options={[{ value: 'pending', label: '待审核' }, { value: 'normal', label: '已通过' }, { value: 'rejected', label: '已驳回' }]} allowClear />
            <Button type="primary" icon={<SearchOutlined />}>检索</Button>
            <Button>重置</Button>
          </div>
          <Tabs activeKey={activeTab} onChange={setActiveTab} items={tabItems} style={{ marginBottom: 0 }} />
          <Table columns={columns} dataSource={filteredData} pagination={{ pageSize: 10, total: filteredData.length, showTotal: function(t){return '共 '+t+' 个商品';} }} scroll={{ x: 1100 }} />
        </Card>
      </div>

      <Modal
        title="商品详情"
        open={viewOpen}
        onCancel={function () { setViewOpen(false); }}
        width={850}
        footer={
          currentRecord && currentRecord.status === 'pending' ? [
            <Button key="close" onClick={function () { setViewOpen(false); }}>关闭</Button>,
            <Button key="reject" danger onClick={handleReject} icon={<CloseCircleOutlined />}>驳回上架</Button>,
            <Popconfirm key="approve" title="确认审核通过？" onConfirm={handleApprove}>
              <Button type="primary" style={{ background: '#52c41a', borderColor: '#52c41a' }} icon={<CheckCircleOutlined />}>同意上架</Button>
            </Popconfirm>
          ] : [
            <Button key="close" onClick={function () { setViewOpen(false); }}>关闭</Button>
          ]
        }
      >
        {currentRecord && (
          <div style={{ marginTop: 16 }}>
            <div style={{ display: 'flex', gap: 16, marginBottom: 24, padding: 16, background: currentRecord.status === 'normal' ? '#f6ffed' : currentRecord.status === 'pending' ? '#fffbe6' : '#fff1f0', border: '1px solid', borderColor: currentRecord.status === 'normal' ? '#b7eb8f' : currentRecord.status === 'pending' ? '#ffe58f' : '#ffccc7', borderRadius: 8 }}>
              <ShopOutlined style={{ fontSize: 40, color: currentRecord.status === 'normal' ? '#52c41a' : currentRecord.status === 'pending' ? '#fa8c16' : '#ff4d4f', padding: 8 }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 4 }}>{currentRecord.title}<Tag color={STATUS_COLOR[currentRecord.status]} style={{ marginLeft: 12 }}>{STATUS_LABEL[currentRecord.status]}</Tag></div>
                <div style={{ color: '#595959', fontSize: 13 }}>商品编号: {currentRecord.id} | 发布商户: {currentRecord.provider}</div>
              </div>
              <div style={{ textAlign: 'right' }}><div style={{ fontSize: 12, color: '#8c8c8c' }}>售价</div><div style={{ fontSize: 20, fontWeight: 600, color: '#ff4d4f' }}>{currentRecord.price}</div></div>
            </div>
            <Descriptions column={2} bordered size="small" style={{ marginBottom: 16 }}>
              <Descriptions.Item label="商品分类">
                <Tag color="purple">{currentRecord.category}</Tag>
              </Descriptions.Item>
              <Descriptions.Item label="品牌 / 型号">
                <span>{currentRecord.brand || '大疆 (DJI)'} / {currentRecord.model || currentRecord.title.replace('大疆 DJI ', '')}</span>
              </Descriptions.Item>
              <Descriptions.Item label="商品库存">
                {currentRecord.stock} 件
              </Descriptions.Item>
              <Descriptions.Item label="发布主体/商户">
                {currentRecord.provider}
              </Descriptions.Item>
              <Descriptions.Item label="联系人及方式">
                <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <span><UserOutlined style={{ color: '#8c8c8c', marginRight: 4 }} />{currentRecord.contact || '王经理'}</span>
                  <span><PhoneOutlined style={{ color: '#8c8c8c', marginRight: 4 }} />{currentRecord.phone || '13855556666'}</span>
                </div>
              </Descriptions.Item>
              <Descriptions.Item label="服务保障">
                {(currentRecord.guarantees || ['正品保证', '全国联保', '专业安装指导', '免费培训']).map((g: any, idx: number) => (
                  <Tag color="success" key={idx} style={{ marginBottom: 2 }}>{g}</Tag>
                ))}
              </Descriptions.Item>
              <Descriptions.Item label="资质证明/经营许可" span={2}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: '#f5f5f5', padding: '6px 12px', borderRadius: 4, border: '1px solid #d9d9d9', maxWidth: 'fit-content' }}>
                  <PaperClipOutlined style={{ color: '#8c8c8c' }} />
                  <span style={{ fontSize: 13, color: '#262626' }}>{currentRecord.license || '航空器材经营许可证及营业执照.pdf'}</span>
                  <a style={{ fontSize: 12, marginLeft: 8 }} onClick={function () { message.success('正在模拟下载资质证明文件...'); }}>下载查看</a>
                </div>
              </Descriptions.Item>
              <Descriptions.Item label="产品参数" span={2}>
                {typeof currentRecord.specs === 'string' ? (
                  <div style={{ whiteSpace: 'pre-wrap', color: '#595959' }}>{currentRecord.specs}</div>
                ) : (
                  <Row gutter={[16, 8]}>
                    {currentRecord.specs && Object.entries(currentRecord.specs).map(([key, val]: any) => {
                      var labelMap: Record<string, string> = { weight: '重量', battery: '续航', payload: '最大载重', range: '图传距离' };
                      return (
                        <Col span={12} key={key}>
                          <span style={{ color: '#8c8c8c' }}>{labelMap[key] || key}: </span>
                          <span style={{ fontWeight: 500 }}>{val}</span>
                        </Col>
                      );
                    })}
                  </Row>
                )}
              </Descriptions.Item>
              <Descriptions.Item label="商品详细描述" span={2}>
                <div style={{ whiteSpace: 'pre-wrap', color: '#595959', maxHeight: 150, overflowY: 'auto', background: '#fafafa', padding: 8, borderRadius: 4, border: '1px solid #f0f0f0', lineHeight: 1.8 }}>{currentRecord.desc}</div>
              </Descriptions.Item>
            </Descriptions>

            {currentRecord.auditHistory && currentRecord.auditHistory.length > 0 && (
              <div style={{ marginTop: 24, marginBottom: 24, padding: 16, background: '#f5f7fa', border: '1px solid #e4e7ed', borderRadius: 8 }}>
                <div style={{ fontWeight: 600, color: '#002c8c', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 6, fontSize: 14 }}>
                  <HistoryOutlined /> 历史审批与重新提交记录
                </div>
                <Timeline
                  style={{ marginTop: 8 }}
                  items={currentRecord.auditHistory.map(function (hist: any, idx: number) {
                    var color = hist.action === 'approve' ? 'green' : hist.action === 'reject' ? 'red' : hist.action === 'offline' ? 'gray' : 'blue';
                    
                    var firstSubmitIdx = currentRecord.auditHistory.findIndex(function (h: any) {
                      return h.action === 'submit';
                    });
                    
                    var submitTotalIndex = currentRecord.auditHistory.slice(0, idx + 1).filter(function (h: any) {
                      return h.action === 'submit';
                    }).length;
                    
                    var isResubmit = hist.action === 'submit' && idx !== firstSubmitIdx;
                    
                    var label = hist.action === 'approve'
                      ? '同意上架'
                      : hist.action === 'reject'
                        ? '驳回上架'
                        : hist.action === 'offline'
                          ? '自主下架'
                          : (isResubmit ? ('第' + submitTotalIndex + '次提交') : '首次提交');
                    
                    var showRemark = hist.remark && !isResubmit;
                    
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

            {currentRecord.status === 'pending' && (
              <div style={{ marginTop: 24, padding: 16, background: '#fafafa', border: '1px solid #f0f0f0', borderRadius: 8 }}>
                <div style={{ fontWeight: 600, color: '#722ed1', marginBottom: 12 }}>
                  <AuditOutlined style={{ marginRight: 6 }} /> 审批意见
                </div>
                <div style={{ marginBottom: 8, fontSize: 13, color: '#595959' }}>如需驳回该商品上架申请，请在此处填写驳回原因：</div>
                <Input.TextArea placeholder="例如：缺少产品认证信息、商品图片不清晰等" rows={3} value={rejectReason} onChange={function (e) { setRejectReason(e.target.value); }} />
              </div>
            )}
          </div>
        )}
      </Modal>
    </AdminLayout>
  );
};
export default Component;
