/**
 * @name 空域查询
 * @mode axure
 * /Users/xu/Desktop/元引信息/Axhub-Make-main/skills/axure-export-workflow/SKILL.md
 *
 */

import './style.css';

import React, { useState, useCallback } from 'react';
import { Card, Tag, Breadcrumb, Row, Col, Input, Table, Badge, message, Modal, Descriptions, Button } from 'antd';
import { HomeOutlined, RocketOutlined, EnvironmentOutlined, SearchOutlined, WarningOutlined, SafetyCertificateOutlined, CheckCircleOutlined, ClockCircleOutlined, ThunderboltOutlined, CarOutlined, PhoneOutlined, ArrowRightOutlined } from '@ant-design/icons';

var AIRSPACE_ZONES = [
  { key: '1', name: '城北训练区', type: '训练空域', status: '开放', altitude: '0-120m', time: '06:00-20:00', color: '#52c41a', area: '3.2km²', desc: '适用于多旋翼、固定翼基础训练飞行', manager: '空域管理办公室', managerPhone: '0571-88888010' },
  { key: '2', name: '城东物流走廊', type: '物流航线', status: '开放', altitude: '50-150m', time: '全天', color: '#1677ff', area: '12.5km', desc: '连接城东物流园与配送中心的固定航线', manager: '空域管理办公室', managerPhone: '0571-88888010' },
  { key: '3', name: '中心禁飞区', type: '禁飞区', status: '禁飞', altitude: '0-无限', time: '全天', color: '#ff4d4f', area: '5.8km²', desc: '政府机关及军事设施所在区域，全天禁飞', manager: '空域管理办公室', managerPhone: '0571-88888010' },
  { key: '4', name: '南区试飞区', type: '试飞空域', status: '开放', altitude: '0-300m', time: '08:00-18:00', color: '#722ed1', area: '8.1km²', desc: '新型飞行器试飞专用空域，需提前申请', manager: '空域管理办公室', managerPhone: '0571-88888010' },
  { key: '5', name: '西区巡检航线', type: '巡检航线', status: '开放', altitude: '30-100m', time: '06:00-22:00', color: '#13c2c2', area: '15.3km', desc: '电力线路巡检固定航线', manager: '空域管理办公室', managerPhone: '0571-88888010' },
  { key: '6', name: '机场净空区', type: '限飞区', status: '限制', altitude: '0-500m', time: '全天', color: '#fa8c16', area: '25km²', desc: '机场周边净空保护区域，需审批后飞行', manager: '空域管理办公室', managerPhone: '0571-88888010' },
  { key: '7', name: '滨江观光航线', type: '观光航线', status: '开放', altitude: '50-200m', time: '09:00-21:00', color: '#eb2f96', area: '8.6km', desc: '沿江景观带低空观光专用航线', manager: '空域管理办公室', managerPhone: '0571-88888010' }
];

var NOTICE_DETAIL_MAP: Record<string, string> = {
  '1': 'flight-airspace-detail',
  '2': 'flight-airspace-detail-2',
  '3': 'flight-airspace-detail-3'
};

var TEMPORARY_NOTICES = [
  { key: '1', title: '城东片区低空航线临时调整', time: '2026-04-26 10:00', type: '航线调整', status: '生效中', desc: '因城东施工需要，4月26日6:00-18:00临时调整低空航线，城东物流走廊降高至80-120m运行' },
  { key: '2', title: '南区空域临时关闭通知', time: '2026-04-25 16:00', type: '空域关闭', status: '即将生效', desc: '南区试飞区4月27日全天临时关闭，用于设备检修维护' },
  { key: '3', title: '五一假期空域管制通知', time: '2026-04-24 09:00', type: '临时管制', status: '预告', desc: '5月1日-5日，中心区域新增临时限飞区，半径扩大2km，详情另行通知' }
];

var TAKEOFF_POINTS = [
  { key: '1', name: '城北训练基地起降场', type: '硬化地面', location: '城北新区科技路88号', altitude: '海拔52m', facilities: '充电桩、维修间、气象站', status: '可用', fee: '免费', phone: '0571-88888001' },
  { key: '2', name: '南区试飞中心起降坪', type: '草坪场地', location: '南区航空产业园', altitude: '海拔48m', facilities: '充电桩、机库、指挥塔台', status: '可用', fee: '¥200/次', phone: '0571-88888002' },
  { key: '3', name: '西区巡检基地停机坪', type: '硬化地面', location: '西区电力运维中心', altitude: '海拔55m', facilities: '充电桩、维修间', status: '可用', fee: '¥100/次', phone: '0571-88888003' },
  { key: '4', name: '滨江观光起降平台', type: '楼顶平台', location: '滨江大道188号', altitude: '海拔68m', facilities: '充电桩、候机区', status: '预约中', fee: '¥300/次', phone: '0571-88888004' },
  { key: '5', name: '物流园起降场', type: '硬化地面', location: '城东物流园A区', altitude: '海拔45m', facilities: '充电桩、货物装卸区', status: '可用', fee: '¥150/次', phone: '0571-88888005' }
];

var TAKEOFF_COLUMNS = [
  { title: '起降点名称', dataIndex: 'name', key: 'name', render: function (n: string) { return <span style={{ fontWeight: 500 }}>{n}</span>; } },
  { title: '类型', dataIndex: 'type', key: 'type', render: function (t: string) { return <Tag color="cyan">{t}</Tag>; } },
  { title: '位置', dataIndex: 'location', key: 'location' },
  { title: '海拔', dataIndex: 'altitude', key: 'altitude' },
  { title: '设施', dataIndex: 'facilities', key: 'facilities', render: function (f: string) { return <span style={{ fontSize: 12 }}>{f}</span>; } },
  { title: '状态', dataIndex: 'status', key: 'status', render: function (s: string) { return <Tag color={s === '可用' ? 'green' : 'orange'}>{s}</Tag>; } },
  { title: '费用', dataIndex: 'fee', key: 'fee', render: function (f: string) { return <span style={{ color: f === '免费' ? '#52c41a' : '#ff4d4f', fontWeight: 600 }}>{f}</span>; } },
  { title: '操作', key: 'action', render: function () {
    return (
      <div style={{ display: 'flex', gap: 8 }}>
        <a onClick={function () { message.success('已预约'); }}>预约</a>
        <a onClick={function () { message.info('查看详情'); }}>详情</a>
      </div>
    );
  }}
];

var Component = function FlightAirspacePage() {
  var [searchText, setSearchText] = useState('');
  var [zoneDetailOpen, setZoneDetailOpen] = useState(false);
  var [currentZone, setCurrentZone] = useState<typeof AIRSPACE_ZONES[0] | null>(null);
  var handleNavigate = useCallback(function (key: string) {
    window.location.href = '/prototypes/' + key;
  }, []);

  var filteredZones = AIRSPACE_ZONES.filter(function (z) {
    return !searchText || z.name.includes(searchText) || z.type.includes(searchText) || z.desc.includes(searchText);
  });

  var handleZoneDetail = function (record: typeof AIRSPACE_ZONES[0]) {
    setCurrentZone(record);
    setZoneDetailOpen(true);
  };

  var ZONE_COLUMNS = [
    { title: '空域名称', dataIndex: 'name', key: 'name', render: function (n: string) { return <span style={{ fontWeight: 500 }}>{n}</span>; } },
    { title: '类型', dataIndex: 'type', key: 'type', render: function (t: string, r: any) { return <Tag color={r.color}>{t}</Tag>; } },
    { title: '状态', dataIndex: 'status', key: 'status', render: function (s: string) { return <Badge status={s === '开放' ? 'success' : s === '禁飞' ? 'error' : 'warning'} text={s} />; } },
    { title: '高度范围', dataIndex: 'altitude', key: 'altitude' },
    { title: '开放时间', dataIndex: 'time', key: 'time' },
    { title: '面积/长度', dataIndex: 'area', key: 'area' },
    { title: '操作', key: 'action', render: function (_: any, record: typeof AIRSPACE_ZONES[0]) { return <a onClick={function () { handleZoneDetail(record); }}>详情</a>; } }
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#f5f5f5' }}>
      <header style={{ background: 'linear-gradient(135deg, #0c4a6e 0%, #13c2c2 100%)', padding: '0 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }} onClick={function () { handleNavigate('home'); }}>
            <RocketOutlined style={{ fontSize: 20, color: '#fff' }} />
            <span style={{ fontSize: 16, fontWeight: 600, color: '#fff' }}>区域低空公共服务平台</span>
          </div>
          <div style={{ display: 'flex', gap: 16 }}>
            <a style={{ color: 'rgba(255,255,255,0.85)', cursor: 'pointer' }} onClick={function () { handleNavigate('home'); }}>首页</a>
            <a style={{ color: 'rgba(255,255,255,0.85)', cursor: 'pointer' }} onClick={function () { handleNavigate('news'); }}>资讯公告</a>
            <a style={{ color: 'rgba(255,255,255,0.85)', cursor: 'pointer' }} onClick={function () { handleNavigate('policy-national'); }}>政策法规</a>
            <a style={{ color: 'rgba(255,255,255,0.85)', cursor: 'pointer' }} onClick={function () { handleNavigate('service-list'); }}>低空服务</a>
            <a style={{ color: 'rgba(255,255,255,0.85)', cursor: 'pointer' }} onClick={function () { handleNavigate('mall-list'); }}>低空商城</a>
            <a style={{ color: '#fff', fontWeight: 600, cursor: 'pointer' }}>飞行服务</a>
            <a style={{ color: 'rgba(255,255,255,0.85)', cursor: 'pointer' }} onClick={function () { handleNavigate('login'); }}>登录</a>
          </div>
        </div>
      </header>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px 24px 48px' }}>
        <Breadcrumb items={[
          { title: <a onClick={function () { handleNavigate('home'); }}><HomeOutlined /> 首页</a> },
          { title: '飞行服务' },
          { title: '空域查询' }
        ]} style={{ marginBottom: 24 }} />

          <div>
            <Row gutter={24}>
              <Col xs={24} lg={14}>
                <Card title="空域地图" style={{ borderRadius: 12, marginBottom: 24 }}>
                  <div style={{
                    height: 400,
                    background: 'linear-gradient(135deg, #e6f7ff 0%, #bae7ff 50%, #91d5ff 100%)',
                    borderRadius: 8,
                    position: 'relative',
                    overflow: 'hidden',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <div style={{ textAlign: 'center' }}>
                      <EnvironmentOutlined style={{ fontSize: 48, color: '#1677ff', marginBottom: 16 }} />
                      <p style={{ fontSize: 16, color: '#0958d9', fontWeight: 500 }}>空域地图可视化区域</p>
                      <p style={{ fontSize: 13, color: '#8c8c8c' }}>实际部署时将接入GIS地图服务</p>
                    </div>
                    <div style={{ position: 'absolute', top: 16, right: 16, display: 'flex', flexDirection: 'column', gap: 6, background: 'rgba(255,255,255,0.95)', padding: 12, borderRadius: 8 }}>
                      <div style={{ fontSize: 12, display: 'flex', alignItems: 'center', gap: 6 }}><span style={{ width: 12, height: 12, borderRadius: 2, background: '#52c41a', display: 'inline-block' }} /> 训练空域</div>
                      <div style={{ fontSize: 12, display: 'flex', alignItems: 'center', gap: 6 }}><span style={{ width: 12, height: 12, borderRadius: 2, background: '#1677ff', display: 'inline-block' }} /> 物流航线</div>
                      <div style={{ fontSize: 12, display: 'flex', alignItems: 'center', gap: 6 }}><span style={{ width: 12, height: 12, borderRadius: 2, background: '#ff4d4f', display: 'inline-block' }} /> 禁飞区</div>
                      <div style={{ fontSize: 12, display: 'flex', alignItems: 'center', gap: 6 }}><span style={{ width: 12, height: 12, borderRadius: 2, background: '#fa8c16', display: 'inline-block' }} /> 限飞区</div>
                      <div style={{ fontSize: 12, display: 'flex', alignItems: 'center', gap: 6 }}><span style={{ width: 12, height: 12, borderRadius: 2, background: '#722ed1', display: 'inline-block' }} /> 试飞空域</div>
                      <div style={{ fontSize: 12, display: 'flex', alignItems: 'center', gap: 6 }}><span style={{ width: 12, height: 12, borderRadius: 2, background: '#eb2f96', display: 'inline-block' }} /> 观光航线</div>
                    </div>
                  </div>
                </Card>
              </Col>
              <Col xs={24} lg={10}>
                <Card title={<span><WarningOutlined style={{ color: '#fa8c16', marginRight: 8 }} />临时管制通知</span>} style={{ borderRadius: 12, marginBottom: 24 }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {TEMPORARY_NOTICES.map(function (n) {
                      return (
                        <div key={n.key} style={{ padding: 12, borderRadius: 8, border: '1px solid #f0f0f0', background: n.status === '生效中' ? '#fff7e6' : '#fafafa', cursor: 'pointer', transition: 'box-shadow 0.2s' }} onClick={function () { handleNavigate(NOTICE_DETAIL_MAP[n.key]); }} onMouseEnter={function (e) { (e.currentTarget as HTMLDivElement).style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)'; }} onMouseLeave={function (e) { (e.currentTarget as HTMLDivElement).style.boxShadow = 'none'; }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                            <span style={{ fontWeight: 500, fontSize: 13 }}>{n.title}</span>
                            <Tag color={n.status === '生效中' ? 'red' : n.status === '即将生效' ? 'orange' : 'blue'}>{n.status}</Tag>
                          </div>
                          <p style={{ fontSize: 12, color: '#8c8c8c', margin: '4px 0' }}>{n.desc}</p>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontSize: 11, color: '#bfbfbf' }}>{n.time}</span>
                            <span style={{ fontSize: 12, color: '#1677ff' }}>查看详情 <ArrowRightOutlined style={{ fontSize: 10 }} /></span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </Card>
              </Col>
            </Row>

            <Card title="空域信息列表" style={{ borderRadius: 12, marginBottom: 24 }}>
              <div style={{ marginBottom: 16 }}>
                <Input
                  prefix={<SearchOutlined />}
                  placeholder="搜索空域名称、类型、关键词..."
                  value={searchText}
                  onChange={function (e) { setSearchText(e.target.value); }}
                  allowClear
                  style={{ maxWidth: 360 }}
                />
              </div>
              <Table columns={ZONE_COLUMNS} dataSource={filteredZones} pagination={{ pageSize: 5 }} size="middle" />
            </Card>

            {/* {false && <Card title={<span><CarOutlined style={{ color: '#13c2c2', marginRight: 8 }} />起降点查询</span>} style={{ borderRadius: 12 }}>
              <Table columns={TAKEOFF_COLUMNS} dataSource={TAKEOFF_POINTS} pagination={{ pageSize: 5 }} size="middle" />
            </Card>} */}
          </div>
      </div>

      <Modal title="空域详情" open={zoneDetailOpen} onCancel={function () { setZoneDetailOpen(false); }} width={680} footer={<Button onClick={function () { setZoneDetailOpen(false); }}>关闭</Button>}>
        {currentZone && (
          <div style={{ marginTop: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
              <EnvironmentOutlined style={{ fontSize: 20, color: currentZone.color }} />
              <span style={{ fontSize: 18, fontWeight: 600 }}>{currentZone.name}</span>
            </div>
            <Descriptions column={2} bordered>
              <Descriptions.Item label="空域类型"><Tag color={currentZone.color}>{currentZone.type}</Tag></Descriptions.Item>
              <Descriptions.Item label="运行状态"><Badge status={currentZone.status === '开放' ? 'success' : currentZone.status === '禁飞' ? 'error' : 'warning'} text={currentZone.status} /></Descriptions.Item>
              <Descriptions.Item label="高度范围">{currentZone.altitude}</Descriptions.Item>
              <Descriptions.Item label="开放时间">{currentZone.time}</Descriptions.Item>
              <Descriptions.Item label="面积/长度">{currentZone.area}</Descriptions.Item>
              <Descriptions.Item label="管理单位">{currentZone.manager}</Descriptions.Item>
              <Descriptions.Item label="联系电话"><span style={{ color: '#1677ff' }}><PhoneOutlined /> {currentZone.managerPhone}</span></Descriptions.Item>
              <Descriptions.Item label="描述" span={2}>{currentZone.desc}</Descriptions.Item>
            </Descriptions>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Component;
