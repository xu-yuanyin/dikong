/**
 * @name 消息中心
 * @mode axure
 * /Users/xu/Desktop/元引信息/Axhub-Make-main/skills/axure-export-workflow/SKILL.md
 *
 */

import React, { useState, useCallback } from 'react';
import { Card, Tag, Row, Col, Button, Tabs, Empty, Badge } from 'antd';
import { BellOutlined, CheckCircleFilled, CloseCircleFilled, WarningOutlined, HomeOutlined, ShoppingOutlined, RocketOutlined } from '@ant-design/icons';

var NOTIFICATION_LIST = [
  { id: 0, type: 'reject', title: '您的商品被违规下架', desc: '您发布的商品《特价三无电池》因涉嫌违规宣传，已被系统运营人员强制下架。如有异议请联系客服。', time: '刚刚', date: '2026-05-12', read: false },
  { id: 1, type: 'approval', title: '飞行主体审批已通过', desc: '您提交的飞行主体审批申请已通过审核，可进行下一步飞行器备案。', time: '10分钟前', date: '2026-04-29', read: false },
  { id: 2, type: 'reject', title: '飞行器备案被驳回', desc: '您提交的飞行器备案申请被驳回，原因：飞行器型号信息不完整，请补充后重新提交。', time: '2小时前', date: '2026-04-29', read: false },
  { id: 3, type: 'control', title: '临时管制通知', desc: '4月30日08:00-18:00，部分空域实施临时管制，请注意调整飞行计划。', time: '3小时前', date: '2026-04-29', read: false },
  { id: 4, type: 'approval', title: '飞行计划备案已通过', desc: '您提交的4月28日飞行计划已通过审核，请按时执行。', time: '昨天 16:20', date: '2026-04-28', read: true },
  { id: 5, type: 'system', title: '系统维护通知', desc: '低空公共服务平台将于5月1日凌晨2:00-4:00进行系统维护，届时部分功能暂不可用。', time: '昨天 09:00', date: '2026-04-28', read: true },
  { id: 6, type: 'reject', title: '飞行主体审批被驳回', desc: '您提交的企业飞行主体审批被驳回，原因：营业执照扫描件不清晰，请重新上传。', time: '前天 14:30', date: '2026-04-27', read: true },
  { id: 7, type: 'approval', title: '飞行器备案已通过', desc: '您提交的DJI Matrice 350 RTK飞行器备案已通过审核。', time: '3天前 11:00', date: '2026-04-26', read: true },
  { id: 8, type: 'control', title: '临时管制解除通知', desc: '4月26日临时管制已解除，相关空域恢复正常使用。', time: '3天前 08:00', date: '2026-04-26', read: true }
];

var PORTAL_NAV = [
  { key: 'home', label: '首页' },
  { key: 'news', label: '资讯公告' },
  { key: 'policy-national', label: '政策法规' },
  { key: 'service-list', label: '低空服务' },
  { key: 'mall-list', label: '低空商城' },
  { key: 'flight-airspace', label: '飞行服务' }
];

var Component = function MessageCenterPage() {
  var [notifications, setNotifications] = useState(NOTIFICATION_LIST);
  var [activeTab, setActiveTab] = useState('all');

  var handleNavigate = useCallback(function (key: string) {
    window.location.href = '/prototypes/' + key;
  }, []);

  var unreadCount = notifications.filter(function (n) { return !n.read; }).length;

  var markAllRead = useCallback(function () {
    setNotifications(function (prev) {
      return prev.map(function (n) { return Object.assign({}, n, { read: true }); });
    });
  }, []);

  var markOneRead = useCallback(function (id: number) {
    setNotifications(function (prev) {
      return prev.map(function (n) { return n.id === id ? Object.assign({}, n, { read: true }) : n; });
    });
  }, []);

  var deleteOne = useCallback(function (id: number) {
    setNotifications(function (prev) {
      return prev.filter(function (n) { return n.id !== id; });
    });
  }, []);

  var getFiltered = useCallback(function () {
    if (activeTab === 'unread') return notifications.filter(function (n) { return !n.read; });
    if (activeTab === 'read') return notifications.filter(function (n) { return n.read; });
    if (activeTab === 'approval') return notifications.filter(function (n) { return n.type === 'approval'; });
    if (activeTab === 'reject') return notifications.filter(function (n) { return n.type === 'reject'; });
    if (activeTab === 'control') return notifications.filter(function (n) { return n.type === 'control'; });
    if (activeTab === 'system') return notifications.filter(function (n) { return n.type === 'system'; });
    return notifications;
  }, [activeTab, notifications]);

  var getNotifIcon = useCallback(function (type: string) {
    if (type === 'approval') return <CheckCircleFilled style={{ color: '#52c41a', fontSize: 20 }} />;
    if (type === 'reject') return <CloseCircleFilled style={{ color: '#ff4d4f', fontSize: 20 }} />;
    if (type === 'control') return <WarningOutlined style={{ color: '#fa8c16', fontSize: 20 }} />;
    return <BellOutlined style={{ color: '#1677ff', fontSize: 20 }} />;
  }, []);

  var getTypeTag = useCallback(function (type: string) {
    if (type === 'approval') return <Tag color="success">审批通过</Tag>;
    if (type === 'reject') return <Tag color="error">审批驳回</Tag>;
    if (type === 'control') return <Tag color="warning">管制通知</Tag>;
    return <Tag color="processing">系统通知</Tag>;
  }, []);

  var filtered = getFiltered();

  return (
    <div style={{ minHeight: '100vh', background: '#f5f5f5' }}>
      <header style={{ background: 'linear-gradient(135deg, #0c4a6e 0%, #722ed1 100%)', padding: '0 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }} onClick={function () { handleNavigate('home'); }}>
            <RocketOutlined style={{ fontSize: 20, color: '#fff' }} />
            <span style={{ fontSize: 16, fontWeight: 600, color: '#fff' }}>区域低空公共服务平台</span>
          </div>
          <div style={{ display: 'flex', gap: 16 }}>
            {PORTAL_NAV.map(function (nav) {
              return <a key={nav.key} style={{ color: 'rgba(255,255,255,0.85)', cursor: 'pointer' }} onClick={function () { handleNavigate(nav.key); }}>{nav.label}</a>;
            })}
          </div>
        </div>
      </header>

      <div style={{ maxWidth: 1000, margin: '0 auto', padding: '24px 24px 48px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
          <a onClick={function () { handleNavigate('home'); }} style={{ color: '#8c8c8c', cursor: 'pointer', fontSize: 13 }}>
            <HomeOutlined /> 首页
          </a>
          <span style={{ color: '#bfbfbf', fontSize: 13 }}>/</span>
          <span style={{ color: 'rgba(0,0,0,0.88)', fontSize: 13 }}>消息中心</span>
        </div>

        <Card style={{ borderRadius: 10 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <BellOutlined style={{ fontSize: 20, color: '#1677ff' }} />
              <span style={{ fontSize: 18, fontWeight: 600 }}>消息中心</span>
              {unreadCount > 0 && <Badge count={unreadCount} style={{ marginLeft: 4 }} />}
            </div>
            {unreadCount > 0 && (
              <Button type="link" size="small" onClick={markAllRead}>全部标记已读</Button>
            )}
          </div>

          <Tabs
            activeKey={activeTab}
            onChange={setActiveTab}
            items={[
              { key: 'all', label: '全部' },
              { key: 'unread', label: <Badge count={unreadCount} size="small" offset={[6, -2]}>未读</Badge> },
              { key: 'read', label: '已读' },
              { key: 'approval', label: '审批通过' },
              { key: 'reject', label: '审批驳回' },
              { key: 'control', label: '管制通知' },
              { key: 'system', label: '系统通知' }
            ]}
          />

          {filtered.length === 0 ? (
            <Empty description="暂无消息" style={{ padding: '60px 0' }} />
          ) : (
            <div>
              {filtered.map(function (n) {
                return (
                  <div
                    key={n.id}
                    style={{
                      display: 'flex',
                      gap: 16,
                      padding: '16px 20px',
                      borderRadius: 8,
                      marginBottom: 8,
                      background: n.read ? '#fafafa' : '#fff',
                      border: n.read ? '1px solid #f0f0f0' : '1px solid #e6f4ff',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={function (e) {
                      (e.currentTarget as HTMLDivElement).style.boxShadow = '0 2px 8px rgba(0,0,0,0.06)';
                    }}
                    onMouseLeave={function (e) {
                      (e.currentTarget as HTMLDivElement).style.boxShadow = 'none';
                    }}
                    onClick={function () { markOneRead(n.id); window.location.href = '/prototypes/message-detail?type=' + n.type; }}
                  >
                    <div style={{ flexShrink: 0, marginTop: 2 }}>{getNotifIcon(n.type)}</div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <span style={{ fontSize: 15, fontWeight: n.read ? 400 : 600, color: 'rgba(0,0,0,0.88)' }}>{n.title}</span>
                          {getTypeTag(n.type)}
                          {!n.read && <div style={{ width: 8, height: 8, borderRadius: 4, background: '#ff4d4f' }} />}
                        </div>
                        <span style={{ fontSize: 12, color: '#bfbfbf', whiteSpace: 'nowrap', marginLeft: 16 }}>{n.time}</span>
                      </div>
                      <div style={{ fontSize: 13, color: '#8c8c8c', lineHeight: 1.6 }}>{n.desc}</div>
                    </div>
                    <Button
                      type="text"
                      size="small"
                      style={{ color: '#bfbfbf', flexShrink: 0, marginTop: 2 }}
                      onClick={function (e) {
                        e.stopPropagation();
                        deleteOne(n.id);
                      }}
                    >
                      删除
                    </Button>
                  </div>
                );
              })}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Component;
