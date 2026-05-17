/**
 * @name 消息中心
 * @mode axure
 */

import './style.css';

import React, { useState, useCallback } from 'react';
import { Card, Tag, Row, Col, Button, Tabs, Empty, Badge, Breadcrumb, Avatar, Modal, message } from 'antd';
import { BellOutlined, CheckCircleFilled, CloseCircleFilled, WarningOutlined, HomeOutlined, RocketOutlined, SafetyCertificateOutlined, UserOutlined, NotificationOutlined, MessageOutlined, StopOutlined } from '@ant-design/icons';

var MENU_ITEMS = [
  { key: 'profile-certified', label: '我的信息', group: '账号管理' },
  { key: 'role-management', label: '角色管理' },
  { key: 'message-center', label: '消息中心' },
  { key: 'my-orders', label: '我的预约', group: '个人/需求方业务' },
  { key: 'my-aircraft', label: '我的飞行器', group: '飞行作业台' },
  { key: 'my-flight-plan', label: '我的飞行计划' },
  { key: 'my-service', label: '我的服务管理', group: '低空服务 (供给端)' },
  { key: 'service-publish', label: '发布服务项目' },
  { key: 'provider-orders', label: '服务受理单' },
  { key: 'my-goods', label: '我的商品', group: '低空商城 (供给端)' },
  { key: 'mall-publish', label: '发布商品' },
  { key: 'provider-intentions', label: '商品受理单' }
];

var NOTIFICATION_LIST = [
  { id: 1, type: 'direct', title: '【重要提醒】您的飞行执照即将过期', desc: '您的无人机飞行执照即将于下月底过期，请尽快前往认证管理更新您的资质材料，以免影响后续接单。', content: '尊敬的用户您好，经系统检测，您绑定的无人机飞行执照（CAAC）有效期至下月底。为保障您在平台的接单权益和正常作业，请尽快准备好最新的执照原件扫描件，并前往【账号管理】-【我的信息】中重新提交认证申请。如有疑问请联系客服。', time: '刚刚', sender: '系统运营中心', read: false },
  { id: 2, type: 'reject', title: '【违规下架】您的商品已被强制下架', desc: '您发布的商品《特价三无电池》已被违规下架。下架原因：商品描述含有违规高风险信息。', content: '您发布的商品《特价三无电池》因涉嫌销售违禁品、夸大宣传、未提供特种设备资质证明等，违反平台安全销售规范，已被系统巡检强制下架。请前往【我的商品】查看详情并进行整改，多次违规将面临封号处罚。', time: '10分钟前', sender: '系统自动通知', read: false },
  { id: 3, type: 'reject', title: '【违规屏蔽】您的服务已被强制屏蔽', desc: '您发布的服务《特价包机服务》已被强制屏蔽。屏蔽原因：涉嫌黑飞服务承诺。', content: '您发布的服务《特价包机服务》详情中公然承诺“黑飞免审”，严重违反国家空域管理法规及平台服务规范，现已被平台运营中心强制下架屏蔽。请严格遵守国家法律法规，规范服务内容。', time: '2小时前', sender: '系统自动通知', read: false },
  { id: 4, type: 'system', title: '【系统公告】关于全平台升级维护的通知', desc: '平台将于2026年5月20日凌晨2:00-6:00进行停机维护升级...', content: '平台将于2026年5月20日凌晨2:00-6:00进行停机维护升级，届时系统、网站及小程序端均将无法登录，请各位飞手、企业用户提前做好业务安排，给您带来的不便敬请谅解！', time: '昨天 10:00', sender: '低空公共服务中心', read: true },
  { id: 5, type: 'approval', title: '【审批通过】飞行主体资质已通过', desc: '您提交的飞行主体审批申请已通过审核，可进行下一步飞行器备案。', content: '恭喜！您提交的飞行主体（企业级）资质审批已通过审核，您的账号已获得相关作业权限，您现在可以前往【我的飞行器】进行飞行器的实名登记备案了。', time: '昨天 16:20', sender: '系统自动通知', read: true },
  { id: 6, type: 'control', title: '【空域预警】临时管制通知', desc: '部分空域实施临时管制，请注意调整飞行计划。', content: '接当地空管部门通知，5月18日 08:00-18:00，XX区域将实施临时航空管制，所有民用无人驾驶航空器禁止起飞，请您及时调整或取消相应的飞行计划。', time: '前天 09:00', sender: '系统自动通知', read: true }
];

var Component = function MessageCenterPage() {
  var [notifications, setNotifications] = useState(NOTIFICATION_LIST);
  var [activeTab, setActiveTab] = useState('all');
  var [detailRecord, setDetailRecord] = useState<any>(null);

  var handleNavigate = useCallback(function (key: string) {
    window.location.href = '/prototypes/' + key;
  }, []);

  var unreadCount = notifications.filter(function (n) { return !n.read; }).length;

  var markAllRead = useCallback(function () {
    setNotifications(function (prev) {
      return prev.map(function (n) { return Object.assign({}, n, { read: true }); });
    });
    message.success('已全部标记为已读');
  }, []);

  var markOneRead = useCallback(function (id: number) {
    setNotifications(function (prev) {
      return prev.map(function (n) { return n.id === id ? Object.assign({}, n, { read: true }) : n; });
    });
  }, []);

  var deleteOne = useCallback(function (e: React.MouseEvent, id: number) {
    e.stopPropagation();
    setNotifications(function (prev) {
      return prev.filter(function (n) { return n.id !== id; });
    });
    message.success('消息已删除');
  }, []);

  var openDetail = useCallback(function (record: any) {
    markOneRead(record.id);
    setDetailRecord(record);
  }, [markOneRead]);

  var getFiltered = useCallback(function () {
    if (activeTab === 'unread') return notifications.filter(function (n) { return !n.read; });
    if (activeTab === 'approval') return notifications.filter(function (n) { return n.type === 'approval'; });
    if (activeTab === 'reject') return notifications.filter(function (n) { return n.type === 'reject'; });
    if (activeTab === 'system') return notifications.filter(function (n) { return n.type === 'system' || n.type === 'direct'; });
    return notifications;
  }, [activeTab, notifications]);

  var getNotifIcon = useCallback(function (type: string) {
    if (type === 'approval') return <CheckCircleFilled style={{ color: '#52c41a', fontSize: 24 }} />;
    if (type === 'reject') return <StopOutlined style={{ color: '#ff4d4f', fontSize: 24 }} />;
    if (type === 'control') return <WarningOutlined style={{ color: '#fa8c16', fontSize: 24 }} />;
    if (type === 'system') return <NotificationOutlined style={{ color: '#1677ff', fontSize: 24 }} />;
    if (type === 'direct') return <MessageOutlined style={{ color: '#722ed1', fontSize: 24 }} />;
    return <BellOutlined style={{ color: '#1677ff', fontSize: 24 }} />;
  }, []);

  var getTypeTag = useCallback(function (type: string) {
    if (type === 'approval') return <Tag color="success">审批通过</Tag>;
    if (type === 'reject') return <Tag color="error">违规处罚</Tag>;
    if (type === 'control') return <Tag color="warning">空域预警</Tag>;
    if (type === 'direct') return <Tag color="purple">定向通知</Tag>;
    return <Tag color="processing">系统公告</Tag>;
  }, []);

  var filtered = getFiltered();

  return (
    <div style={{ minHeight: '100vh', background: '#f5f5f5' }}>
      {/* 顶部导航 */}
      <header style={{ background: 'linear-gradient(135deg, #0c4a6e 0%, #eb2f96 100%)', padding: '0 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }} onClick={() => handleNavigate('home')}>
            <SafetyCertificateOutlined style={{ fontSize: 20, color: '#fff' }} />
            <span style={{ fontSize: 16, fontWeight: 600, color: '#fff' }}>区域低空公共服务平台</span>
          </div>
          <div style={{ display: 'flex', gap: 16 }}>
            <a style={{ color: 'rgba(255,255,255,0.85)', cursor: 'pointer' }} onClick={() => handleNavigate('home')}>首页</a>
            <a style={{ color: 'rgba(255,255,255,0.85)', cursor: 'pointer' }} onClick={() => handleNavigate('service-list')}>低空服务</a>
            <a style={{ color: '#fff', fontWeight: 600, cursor: 'pointer' }}>个人中心</a>
          </div>
        </div>
      </header>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px 24px 48px' }}>
        <Breadcrumb items={[
          { title: <a onClick={() => handleNavigate('home')}><HomeOutlined /> 首页</a> },
          { title: '个人中心' },
          { title: '消息中心' }
        ]} style={{ marginBottom: 24 }} />

        <Row gutter={24}>
          {/* 左侧菜单 */}
          <Col xs={24} md={6}>
            <Card style={{ borderRadius: 12, marginBottom: 24 }}>
              <div style={{ textAlign: 'center', marginBottom: 16 }}>
                <Avatar size={80} icon={<UserOutlined />} style={{ backgroundColor: '#1890ff', marginBottom: 12 }} />
                <div style={{ fontSize: 18, fontWeight: 600, color: '#1f1f1f' }}>张明</div>
                <Tag color="green" style={{ marginTop: 8 }}>普通用户</Tag>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                {MENU_ITEMS.map((item) => (
                  <div key={item.key}>
                    {item.group ? <div style={{ fontSize: 11, color: '#bfbfbf', padding: '8px 16px 4px', fontWeight: 600, letterSpacing: 1 }}>{item.group}</div> : null}
                    <div
                      onClick={() => { if (item.key !== 'message-center') handleNavigate(item.key); }}
                      style={{
                        padding: '10px 16px',
                        borderRadius: 8,
                        cursor: 'pointer',
                        background: item.key === 'message-center' ? '#e6f4ff' : 'transparent',
                        color: item.key === 'message-center' ? '#1677ff' : '#595959',
                        fontWeight: item.key === 'message-center' ? 600 : 400,
                        fontSize: 14,
                        marginBottom: 4
                      }}
                    >
                      {item.label}
                      {item.key === 'message-center' && unreadCount > 0 && (
                        <Badge count={unreadCount} style={{ marginLeft: 8 }} />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </Col>

          {/* 右侧内容 */}
          <Col xs={24} md={18}>
            <Card style={{ borderRadius: 12, minHeight: 600 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <BellOutlined style={{ fontSize: 20, color: '#1677ff' }} />
                  <span style={{ fontSize: 18, fontWeight: 600 }}>消息中心</span>
                </div>
                {unreadCount > 0 && (
                  <Button type="link" onClick={markAllRead}>全部标记已读</Button>
                )}
              </div>

              <Tabs
                activeKey={activeTab}
                onChange={setActiveTab}
                items={[
                  { key: 'all', label: '全部' },
                  { key: 'unread', label: <Badge count={unreadCount} size="small" offset={[10, 0]}>未读</Badge> },
                  { key: 'system', label: '系统/公告通知' },
                  { key: 'reject', label: '违规处罚' },
                  { key: 'approval', label: '业务审批' }
                ]}
              />

              {filtered.length === 0 ? (
                <Empty description="暂无相关消息" style={{ padding: '60px 0' }} />
              ) : (
                <div style={{ marginTop: 12 }}>
                  {filtered.map(function (n) {
                    return (
                      <div
                        key={n.id}
                        style={{
                          display: 'flex',
                          gap: 16,
                          padding: '16px 20px',
                          borderRadius: 8,
                          marginBottom: 12,
                          background: n.read ? '#fafafa' : '#fff',
                          border: n.read ? '1px solid #f0f0f0' : '1px solid #bae0ff',
                          cursor: 'pointer',
                          transition: 'all 0.2s',
                          position: 'relative'
                        }}
                        onMouseEnter={function (e) {
                          (e.currentTarget as HTMLDivElement).style.boxShadow = '0 2px 8px rgba(0,0,0,0.06)';
                        }}
                        onMouseLeave={function (e) {
                          (e.currentTarget as HTMLDivElement).style.boxShadow = 'none';
                        }}
                        onClick={() => openDetail(n)}
                      >
                        {!n.read && (
                          <div style={{ position: 'absolute', top: 12, left: 12, width: 8, height: 8, borderRadius: 4, background: '#ff4d4f' }} />
                        )}
                        <div style={{ flexShrink: 0, marginTop: 4, marginLeft: 8 }}>{getNotifIcon(n.type)}</div>
                        <div style={{ flex: 1, minWidth: 0, marginLeft: 8 }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                              <span style={{ fontSize: 16, fontWeight: n.read ? 500 : 600, color: 'rgba(0,0,0,0.88)' }}>{n.title}</span>
                              {getTypeTag(n.type)}
                            </div>
                            <span style={{ fontSize: 13, color: '#bfbfbf', whiteSpace: 'nowrap', marginLeft: 16 }}>{n.time}</span>
                          </div>
                          <div style={{ fontSize: 14, color: '#595959', lineHeight: 1.6, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                            {n.desc}
                          </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', marginLeft: 16 }}>
                          <Button type="text" size="small" style={{ color: '#bfbfbf' }} onClick={(e) => deleteOne(e, n.id)}>删除</Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </Card>
          </Col>
        </Row>
      </div>

      {/* 消息阅读弹窗 */}
      <Modal
        title={
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {detailRecord && getNotifIcon(detailRecord.type)}
            <span>通知详情</span>
          </div>
        }
        open={!!detailRecord}
        onCancel={() => setDetailRecord(null)}
        footer={<Button type="primary" onClick={() => setDetailRecord(null)}>知道了</Button>}
        width={600}
      >
        {detailRecord && (
          <div style={{ marginTop: 16 }}>
            <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 12 }}>{detailRecord.title}</div>
            <div style={{ display: 'flex', gap: 16, color: '#8c8c8c', marginBottom: 20, paddingBottom: 16, borderBottom: '1px solid #f0f0f0' }}>
              <span>发件人：{detailRecord.sender}</span>
              <span>时间：{detailRecord.time}</span>
            </div>
            <div style={{ fontSize: 15, lineHeight: 1.8, color: '#1f1f1f', minHeight: 100 }}>
              {detailRecord.content}
            </div>
            
            {detailRecord.type === 'reject' && (
              <div style={{ marginTop: 24, textAlign: 'center' }}>
                <Button onClick={() => handleNavigate('my-goods')} style={{ marginRight: 12 }}>前往整改我的商品</Button>
                <Button onClick={() => handleNavigate('my-service')}>前往整改我的服务</Button>
              </div>
            )}
            {detailRecord.type === 'direct' && (
              <div style={{ marginTop: 24, textAlign: 'center' }}>
                <Button type="primary" onClick={() => handleNavigate('profile-certified')}>立即前往认证管理</Button>
              </div>
            )}
          </div>
        )}
      </Modal>

    </div>
  );
};

export default Component;
