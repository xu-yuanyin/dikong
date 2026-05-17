/**
 * @name 商城违规监管
 * @mode axure
 */

import './style.css';

import React, { useState, useCallback } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { Card, Table, Tag, Button, Breadcrumb, Space, Modal, Input, Select, message, Tooltip, Descriptions, Tabs, Popconfirm, Divider } from 'antd';
import { EyeOutlined, StopOutlined, SearchOutlined, CheckCircleOutlined, ShopOutlined, AlertOutlined } from '@ant-design/icons';

var PRODUCT_OPTIONS = [
  { value: 'uav', label: '工业级无人机' },
  { value: 'evtol', label: 'eVTOL载人飞行器' },
  { value: 'security', label: '安全设备' },
  { value: 'communication', label: '通信设备' },
  { value: 'training', label: '培训设备' },
  { value: 'infrastructure', label: '基础设施' },
  { value: 'other', label: '其他' }
];

var SCENARIO_OPTIONS = [
  { value: 'agriculture', label: '农林植保' },
  { value: 'mapping', label: '航拍测绘' },
  { value: 'inspection', label: '巡检安防' },
  { value: 'logistics', label: '物流运输' },
  { value: 'general', label: '通用/其他' }
];

var GOODS_DATA = [
  { 
    key: '1', id: 'MALL-2026-101', title: '大疆 DJI Mavic 3 Enterprise', 
    category: '工业级无人机', scenario: '航拍测绘', price: '¥22,000.00', provider: 'XX无人机专营店', 
    time: '2026-04-18 10:00:00', status: 'normal', stock: 50,
    specs: { weight: '915g', battery: '45分钟', payload: '无', range: '32公里' },
    desc: 'DJI Mavic 3 Enterprise 重新定义了小型行业无人机标准。配备机械快门、56 倍变焦相机及 RTK 模块，支持厘米级高精度作业。'
  },
  { 
    key: '2', id: 'MALL-2026-102', title: '纵横 CW-15 垂直起降固定翼', 
    category: '工业级无人机', scenario: '巡检安防', price: '电议', provider: '纵横官方旗舰店', 
    time: '2026-04-19 14:30:22', status: 'normal', stock: 5,
    specs: { weight: '14.5kg', battery: '180分钟', payload: '3kg', range: '100公里' },
    desc: 'CW-15 是全新一代的小型无人机平台，采用先进的垂直起降技术，具备极高的安全性和易用性，广泛应用于航空测绘、巡逻监控等。'
  },
  { 
    key: '3', id: 'MALL-2026-103', title: '特价三无高容量电池（测试版）', 
    category: '其他', scenario: '通用/其他', price: '¥500.00', provider: '某个人商户', 
    time: '2026-04-20 08:15:10', status: 'offline', stock: 999,
    specs: { weight: '未知', battery: '超长待机', payload: '无', range: '无' },
    desc: '超大容量电池，适合各类自组装无人机，未经安全认证，价格低廉，不提供发票和售后。',
    takedownReason: '商品描述含有“三无产品”、“未经安全认证”等违规高风险信息，违反平台安全销售规范。',
    takedownTime: '2026-04-20 09:30:00'
  }
];

var Component = function AdminMallPage() {
  var [viewOpen, setViewOpen] = useState(false);
  var [takedownOpen, setTakedownOpen] = useState(false);
  var [currentRecord, setCurrentRecord] = useState<any>(null);
  var [takedownReason, setTakedownReason] = useState('');

  var handleTakedown = function () {
    if (!takedownReason.trim()) {
      message.warning('请输入下架原因');
      return;
    }
    message.success('已违规下架该商品，前台将显示违规提示并隐藏该商品');
    setTakedownOpen(false);
    setTakedownReason('');
  };

  var handleRestore = function () {
    message.success('已解除违规状态，商品恢复上架展示');
  };

  var columns = [
    { title: '商品编号', dataIndex: 'id', key: 'id', width: 130 },
    { title: '商品名称', dataIndex: 'title', key: 'title', width: 220, render: function (t: string) { return <span style={{ fontWeight: 500, color: '#1677ff' }}>{t}</span>; } },
    { title: '分类与场景', key: 'categoryInfo', width: 180, render: function (_: any, r: any) { 
      return <div><Tag color="purple">{r.category}</Tag> <Tag color="default">{r.scenario}</Tag></div>; 
    } },
    { title: '价格', dataIndex: 'price', key: 'price', width: 100, render: function (t: string) { return <span style={{ color: '#ff4d4f', fontWeight: 500 }}>{t}</span>; } },
    { title: '发布商户', dataIndex: 'provider', key: 'provider', width: 160 },
    { title: '发布时间', dataIndex: 'time', key: 'time', width: 150 },
    { title: '状态', dataIndex: 'status', key: 'status', width: 100, render: function (s: string) { return s === 'normal' ? <Tag color="green">展示中</Tag> : <Tag color="red">违规下架</Tag>; } },
    { title: '操作', key: 'action', width: 120, fixed: 'right' as const, render: function (_: any, record: any) {
      return (
        <Space size={4}>
          <Tooltip title="查看详情与监管"><Button type="text" size="small" icon={<EyeOutlined />} style={{ color: '#1677ff' }} onClick={function () { setCurrentRecord(record); setViewOpen(true); }} /></Tooltip>
          {record.status === 'normal' ? (
            <Tooltip title="违规下架"><Button type="text" size="small" icon={<StopOutlined />} style={{ color: '#ff4d4f' }} onClick={function () { setCurrentRecord(record); setTakedownOpen(true); }} /></Tooltip>
          ) : (
            <Tooltip title="恢复上架"><Popconfirm title="确认该商品已合规并恢复上架？" onConfirm={handleRestore}><Button type="text" size="small" icon={<CheckCircleOutlined />} style={{ color: '#52c41a' }} /></Popconfirm></Tooltip>
          )}
        </Space>
      );
    }}
  ];

  return (
    <AdminLayout activeKey="admin-mall">
      <div style={{ maxWidth: 1400, margin: '0 auto', padding: 24 }}>
        <Breadcrumb items={[{ title: '业务监管' }, { title: '商城违规监管' }]} style={{ marginBottom: 16 }} />
        
        <Card style={{ borderRadius: 12 }}>
          <div style={{ display: 'flex', gap: 12, marginBottom: 16, flexWrap: 'wrap' }}>
            <Input prefix={<SearchOutlined />} placeholder="搜索商品编号/名称/商户" style={{ width: 240 }} allowClear />
            <Select placeholder="商品分类" style={{ width: 140 }} options={PRODUCT_OPTIONS} allowClear />
            <Select placeholder="应用场景" style={{ width: 140 }} options={SCENARIO_OPTIONS} allowClear />
            <Select placeholder="管控状态" style={{ width: 120 }} options={[{ value: 'normal', label: '展示中' }, { value: 'offline', label: '违规下架' }]} allowClear />
            <Button type="primary" icon={<SearchOutlined />}>综合检索</Button>
            <Button>重置</Button>
          </div>
          <Table columns={columns} dataSource={GOODS_DATA} pagination={{ pageSize: 10, total: GOODS_DATA.length, showTotal: function(t){return '共 '+t+' 个商品';} }} scroll={{ x: 1100 }} />
        </Card>
      </div>

      {/* 商品详情弹窗 */}
      <Modal title="商城商品监管详情" open={viewOpen} onCancel={function () { setViewOpen(false); }} width={800} footer={<Button onClick={function () { setViewOpen(false); }}>关闭</Button>}>
        {currentRecord && (
          <div style={{ marginTop: 16 }}>
            <div style={{ display: 'flex', gap: 16, marginBottom: 24, padding: '16px', background: currentRecord.status === 'normal' ? '#f6ffed' : '#fff1f0', border: '1px solid', borderColor: currentRecord.status === 'normal' ? '#b7eb8f' : '#ffccc7', borderRadius: 8 }}>
              <ShopOutlined style={{ fontSize: 40, color: currentRecord.status === 'normal' ? '#52c41a' : '#ff4d4f', padding: 8 }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 4 }}>
                  {currentRecord.title}
                  <Tag color={currentRecord.status === 'normal' ? 'green' : 'red'} style={{ marginLeft: 12 }}>
                    {currentRecord.status === 'normal' ? '展示中' : '违规下架'}
                  </Tag>
                </div>
                <div style={{ color: '#595959', fontSize: 13 }}>发布商户: {currentRecord.provider} | 商品编号: {currentRecord.id} | 发布时间: {currentRecord.time}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 12, color: '#8c8c8c' }}>销售价格</div>
                <div style={{ fontSize: 20, fontWeight: 600, color: '#ff4d4f' }}>{currentRecord.price}</div>
              </div>
            </div>

            <Tabs defaultActiveKey="info" items={[
              {
                key: 'info',
                label: '基础与规格信息',
                children: (
                  <div style={{ marginTop: 8 }}>
                    <Descriptions column={2} bordered size="small">
                      <Descriptions.Item label="商品分类"><Tag color="purple">{currentRecord.category}</Tag></Descriptions.Item>
                      <Descriptions.Item label="应用场景"><Tag>{currentRecord.scenario}</Tag></Descriptions.Item>
                      <Descriptions.Item label="当前库存数量">{currentRecord.stock} 件</Descriptions.Item>
                      <Descriptions.Item label="发货地址">详见商户配置</Descriptions.Item>
                    </Descriptions>
                    <Divider orientation="left" style={{ margin: '16px 0' }}>技术规格</Divider>
                    <Descriptions column={2} bordered size="small">
                      <Descriptions.Item label="起飞重量">{currentRecord.specs.weight}</Descriptions.Item>
                      <Descriptions.Item label="续航时间">{currentRecord.specs.battery}</Descriptions.Item>
                      <Descriptions.Item label="最大载重">{currentRecord.specs.payload}</Descriptions.Item>
                      <Descriptions.Item label="图传距离">{currentRecord.specs.range}</Descriptions.Item>
                    </Descriptions>
                  </div>
                )
              },
              {
                key: 'desc',
                label: '商品详情描述',
                children: (
                  <div style={{ marginTop: 8, padding: 16, background: '#fafafa', border: '1px solid #f0f0f0', borderRadius: 8, minHeight: 150 }}>
                    <div style={{ lineHeight: '1.8' }}>{currentRecord.desc}</div>
                    <div style={{ marginTop: 24, textAlign: 'center', color: '#bfbfbf' }}>[此处渲染商户上传的商品详情富文本/图片]</div>
                  </div>
                )
              },
              {
                key: 'log',
                label: '管控日志',
                children: (
                  <div style={{ marginTop: 8 }}>
                    {currentRecord.status === 'offline' ? (
                      <div style={{ padding: 16, background: '#fff2f0', border: '1px solid #ffccc7', borderRadius: 8 }}>
                        <div style={{ fontWeight: 600, color: '#cf1322', marginBottom: 8 }}><AlertOutlined style={{ marginRight: 6 }} />下架管控记录</div>
                        <Descriptions column={1} size="small">
                          <Descriptions.Item label="下架时间">{currentRecord.takedownTime}</Descriptions.Item>
                          <Descriptions.Item label="违规原因">{currentRecord.takedownReason}</Descriptions.Item>
                          <Descriptions.Item label="操作人员">商城审核专员 (audit_li)</Descriptions.Item>
                        </Descriptions>
                      </div>
                    ) : (
                      <div style={{ padding: 32, textAlign: 'center', color: '#8c8c8c' }}>暂无违规管控记录</div>
                    )}
                  </div>
                )
              }
            ]} />
          </div>
        )}
      </Modal>

      {/* 违规下架弹窗 */}
      <Modal
        title={<span style={{ color: '#ff4d4f' }}><AlertOutlined style={{ marginRight: 8 }} />违规下架商品</span>}
        open={takedownOpen}
        onCancel={function () { setTakedownOpen(false); setTakedownReason(''); }}
        onOk={handleTakedown}
        okButtonProps={{ danger: true }}
        okText="确认违规下架"
      >
        <div style={{ marginBottom: 16, fontSize: 14 }}>
          您正在对商品 <strong>{currentRecord?.title}</strong> 执行违规下架操作。下架后：
          <ul style={{ paddingLeft: 20, marginTop: 8, color: '#595959' }}>
            <li>前台商城大厅将不再展示此商品</li>
            <li>商户管理后台将显示商品处于“违规封禁”状态及下架原因</li>
            <li>系统将自动发送违规通知给该商户关联的账号</li>
          </ul>
        </div>
        <div style={{ marginBottom: 8, fontWeight: 500 }}>请输入下架原因（必填，将展示给商户）：</div>
        <Input.TextArea 
          placeholder="例如：涉嫌销售违禁品、夸大宣传、未提供特种设备资质证明等" 
          rows={4} 
          value={takedownReason}
          onChange={function (e) { setTakedownReason(e.target.value); }} 
        />
      </Modal>
    </AdminLayout>
  );
};

export default Component;
