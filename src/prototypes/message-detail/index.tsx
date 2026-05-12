/**
 * @name 消息详情
 * @mode axure
 * /Users/xu/Desktop/元引信息/Axhub-Make-main/skills/axure-export-workflow/SKILL.md
 *
 */

import React, { useCallback } from 'react';
import { Card, Tag, Button, Descriptions, Divider, Timeline } from 'antd';
import { BellOutlined, CheckCircleFilled, CloseCircleFilled, WarningOutlined, RocketOutlined, HomeOutlined, ArrowLeftOutlined, EnvironmentOutlined, ClockCircleOutlined, UserOutlined, FileTextOutlined, SafetyCertificateOutlined } from '@ant-design/icons';

var PORTAL_NAV = [
  { key: 'home', label: '首页' },
  { key: 'news', label: '资讯公告' },
  { key: 'policy-national', label: '政策法规' },
  { key: 'service-list', label: '低空服务' },
  { key: 'mall-list', label: '低空商城' },
  { key: 'flight-airspace', label: '飞行服务' }
];

var APPROVAL_DETAIL = {
  type: 'approval',
  title: '飞行主体审批已通过',
  tag: '审批通过',
  tagColor: 'success',
  icon: <CheckCircleFilled style={{ color: '#52c41a', fontSize: 48 }} />,
  time: '2026-04-29 10:30',
  applicant: '张三',
  applicantType: '个人',
  applyTime: '2026-04-25 09:15',
  approveTime: '2026-04-29 10:30',
  approver: '管理员 李明',
  result: '通过',
  content: '您提交的飞行主体审批申请已通过审核。根据《无人驾驶航空器飞行管理暂行条例》相关规定，您的个人飞行主体资质已获批准，可进行下一步飞行器备案操作。',
  timeline: [
    { color: 'green', children: <div><div style={{ fontWeight: 500 }}>审批通过</div><div style={{ fontSize: 12, color: '#8c8c8c' }}>2026-04-29 10:30 · 管理员 李明</div></div> },
    { color: 'blue', children: <div><div style={{ fontWeight: 500 }}>审核中</div><div style={{ fontSize: 12, color: '#8c8c8c' }}>2026-04-25 14:20 · 已提交至审批部门</div></div> },
    { color: 'gray', children: <div><div style={{ fontWeight: 500 }}>已提交</div><div style={{ fontSize: 12, color: '#8c8c8c' }}>2026-04-25 09:15 · 提交飞行主体审批申请</div></div> }
  ]
};

var REJECT_DETAIL = {
  type: 'reject',
  title: '飞行器备案被驳回',
  tag: '审批驳回',
  tagColor: 'error',
  icon: <CloseCircleFilled style={{ color: '#ff4d4f', fontSize: 48 }} />,
  time: '2026-04-29 08:45',
  applicant: '张三',
  applicantType: '个人',
  applyTime: '2026-04-26 16:30',
  approveTime: '2026-04-29 08:45',
  approver: '管理员 王芳',
  result: '驳回',
  rejectReason: '飞行器型号信息不完整，缺少出厂编号与适航证明文件',
  content: '您提交的飞行器备案申请被驳回。请根据驳回原因补充完善相关信息后重新提交备案申请。如有疑问，请联系审批部门。',
  timeline: [
    { color: 'red', children: <div><div style={{ fontWeight: 500 }}>审批驳回</div><div style={{ fontSize: 12, color: '#8c8c8c' }}>2026-04-29 08:45 · 管理员 王芳</div><div style={{ fontSize: 12, color: '#ff4d4f', marginTop: 4 }}>驳回原因：飞行器型号信息不完整，缺少出厂编号与适航证明文件</div></div> },
    { color: 'blue', children: <div><div style={{ fontWeight: 500 }}>审核中</div><div style={{ fontSize: 12, color: '#8c8c8c' }}>2026-04-26 17:00 · 已提交至审批部门</div></div> },
    { color: 'gray', children: <div><div style={{ fontWeight: 500 }}>已提交</div><div style={{ fontSize: 12, color: '#8c8c8c' }}>2026-04-26 16:30 · 提交飞行器备案申请</div></div> }
  ]
};

var CONTROL_DETAIL = {
  type: 'control',
  title: '临时管制通知',
  tag: '管制通知',
  tagColor: 'warning',
  icon: <WarningOutlined style={{ color: '#fa8c16', fontSize: 48 }} />,
  time: '2026-04-29 07:00',
  content: '根据空域管理需要，以下时段和区域将实施临时管制，请各飞行主体注意调整飞行计划，避免进入管制空域。管制期间未经批准不得在管制空域内飞行。',
  controlTime: '2026-04-30 08:00 至 2026-04-30 18:00',
  controlArea: '城东新区A3空域（东经116.40°-116.45°，北纬39.90°-39.95°）',
  controlReason: '重大活动保障',
  issuer: '市低空飞行服务中心',
  publishTime: '2026-04-29 07:00',
  effectStatus: '即将生效',
  timeline: [
    { color: 'orange', children: <div><div style={{ fontWeight: 500 }}>管制即将生效</div><div style={{ fontSize: 12, color: '#8c8c8c' }}>2026-04-30 08:00 生效</div></div> },
    { color: 'blue', children: <div><div style={{ fontWeight: 500 }}>通知已发布</div><div style={{ fontSize: 12, color: '#8c8c8c' }}>2026-04-29 07:00 · 市低空飞行服务中心</div></div> }
  ]
};

var SYSTEM_DETAIL = {
  type: 'system',
  title: '系统维护通知',
  tag: '系统通知',
  tagColor: 'processing',
  icon: <BellOutlined style={{ color: '#1677ff', fontSize: 48 }} />,
  time: '2026-04-28 09:00',
  content: '为提升平台服务质量和系统稳定性，低空公共服务平台将于2026年5月1日凌晨2:00-4:00进行系统维护升级。维护期间，以下功能将暂不可用：\n\n1. 飞行计划备案与审批\n2. 空域查询服务\n3. 飞行动态监控\n\n请各位用户提前做好相关安排，维护完成后将第一时间恢复服务。如有紧急需求，请联系客服热线：400-888-0000。',
  issuer: '平台运维部',
  publishTime: '2026-04-28 09:00'
};

var DETAIL_MAP: Record<string, typeof APPROVAL_DETAIL> = {
  approval: APPROVAL_DETAIL,
  reject: REJECT_DETAIL,
  control: CONTROL_DETAIL,
  system: SYSTEM_DETAIL
};

var Component = function MessageDetailPage() {
  var urlType = typeof window !== 'undefined' ? (new URLSearchParams(window.location.search).get('type') || 'approval') : 'approval';
  var detail = DETAIL_MAP[urlType] || APPROVAL_DETAIL;

  var handleNavigate = useCallback(function (key: string) {
    window.location.href = '/prototypes/' + key;
  }, []);

  var isApproval = detail.type === 'approval' || detail.type === 'reject';
  var isControl = detail.type === 'control';

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

      <div style={{ maxWidth: 800, margin: '0 auto', padding: '24px 24px 48px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
          <a onClick={function () { handleNavigate('home'); }} style={{ color: '#8c8c8c', cursor: 'pointer', fontSize: 13 }}>
            <HomeOutlined /> 首页
          </a>
          <span style={{ color: '#bfbfbf', fontSize: 13 }}>/</span>
          <a onClick={function () { handleNavigate('message-center'); }} style={{ color: '#8c8c8c', cursor: 'pointer', fontSize: 13 }}>消息中心</a>
          <span style={{ color: '#bfbfbf', fontSize: 13 }}>/</span>
          <span style={{ color: 'rgba(0,0,0,0.88)', fontSize: 13 }}>消息详情</span>
        </div>

        <Card style={{ borderRadius: 10, marginBottom: 16 }}>
          <a onClick={function () { handleNavigate('message-center'); }} style={{ color: '#1677ff', cursor: 'pointer', fontSize: 13, display: 'inline-flex', alignItems: 'center', gap: 4, marginBottom: 20 }}>
            <ArrowLeftOutlined /> 返回消息中心
          </a>

          <div style={{ textAlign: 'center', padding: '20px 0 24px' }}>
            <div style={{ marginBottom: 12 }}>{detail.icon}</div>
            <h1 style={{ fontSize: 20, fontWeight: 600, color: 'rgba(0,0,0,0.88)', marginBottom: 8 }}>{detail.title}</h1>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 12 }}>
              <Tag color={detail.tagColor}>{detail.tag}</Tag>
              <span style={{ fontSize: 13, color: '#8c8c8c' }}>{detail.time}</span>
            </div>
          </div>

          <Divider />

          <div style={{ fontSize: 14, color: '#595959', lineHeight: 1.8, whiteSpace: 'pre-line', marginBottom: 24 }}>
            {detail.content}
          </div>

          {isApproval && (
            <>
              <Divider />
              <Descriptions column={2} size="small" bordered>
                <Descriptions.Item label="申请人"><UserOutlined style={{ marginRight: 4 }} />{(detail as typeof APPROVAL_DETAIL).applicant}（{(detail as typeof APPROVAL_DETAIL).applicantType}）</Descriptions.Item>
                <Descriptions.Item label="审批结果">
                  <Tag color={(detail as typeof APPROVAL_DETAIL).result === '通过' ? 'success' : 'error'}>{(detail as typeof APPROVAL_DETAIL).result}</Tag>
                </Descriptions.Item>
                <Descriptions.Item label="提交时间">{(detail as typeof APPROVAL_DETAIL).applyTime}</Descriptions.Item>
                <Descriptions.Item label="审批时间">{(detail as typeof APPROVAL_DETAIL).approveTime}</Descriptions.Item>
                <Descriptions.Item label="审批人">{(detail as typeof APPROVAL_DETAIL).approver}</Descriptions.Item>
                {(detail as typeof APPROVAL_DETAIL).rejectReason && (
                  <Descriptions.Item label="驳回原因" span={2}>
                    <span style={{ color: '#ff4d4f' }}>{(detail as typeof APPROVAL_DETAIL).rejectReason}</span>
                  </Descriptions.Item>
                )}
              </Descriptions>

              <Divider>审批进度</Divider>
              <Timeline items={(detail as typeof APPROVAL_DETAIL).timeline} />
            </>
          )}

          {isControl && (
            <>
              <Divider />
              <Descriptions column={1} size="small" bordered>
                <Descriptions.Item label={<span><ClockCircleOutlined style={{ marginRight: 4 }} />管制时段</span>}>
                  <span style={{ fontWeight: 500, color: '#fa8c16' }}>{(detail as typeof CONTROL_DETAIL).controlTime}</span>
                </Descriptions.Item>
                <Descriptions.Item label={<span><EnvironmentOutlined style={{ marginRight: 4 }} />管制空域</span>}>
                  {(detail as typeof CONTROL_DETAIL).controlArea}
                </Descriptions.Item>
                <Descriptions.Item label={<span><FileTextOutlined style={{ marginRight: 4 }} />管制原因</span>}>
                  {(detail as typeof CONTROL_DETAIL).controlReason}
                </Descriptions.Item>
                <Descriptions.Item label="发布单位">{(detail as typeof CONTROL_DETAIL).issuer}</Descriptions.Item>
                <Descriptions.Item label="发布时间">{(detail as typeof CONTROL_DETAIL).publishTime}</Descriptions.Item>
                <Descriptions.Item label="生效状态">
                  <Tag color="warning">{(detail as typeof CONTROL_DETAIL).effectStatus}</Tag>
                </Descriptions.Item>
              </Descriptions>

              <Divider>状态变更</Divider>
              <Timeline items={(detail as typeof CONTROL_DETAIL).timeline} />
            </>
          )}

          {detail.type === 'system' && (
            <>
              <Divider />
              <Descriptions column={1} size="small" bordered>
                <Descriptions.Item label="发布单位">{(detail as typeof SYSTEM_DETAIL).issuer}</Descriptions.Item>
                <Descriptions.Item label="发布时间">{(detail as typeof SYSTEM_DETAIL).publishTime}</Descriptions.Item>
              </Descriptions>
            </>
          )}
        </Card>

        <div style={{ display: 'flex', justifyContent: 'center', gap: 12 }}>
          {detail.type === 'approval' && (
            <Button type="primary" size="large" onClick={function () { handleNavigate('register-aircraft'); }}>
              去办理飞行器备案
            </Button>
          )}
          {detail.type === 'reject' && (
            <Button type="primary" size="large" onClick={function () { handleNavigate('profile-uncertified'); }}>
              重新提交申请
            </Button>
          )}
          {detail.type === 'control' && (
            <Button type="primary" size="large" onClick={function () { handleNavigate('flight-airspace'); }}>
              查看空域信息
            </Button>
          )}
        </div>

        <Card style={{ borderRadius: 10, marginTop: 16 }} styles={{ body: { padding: '16px 20px' } }}>
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>其他消息</div>
          {Object.keys(DETAIL_MAP).filter(function (t) { return t !== urlType; }).slice(0, 3).map(function (t) {
            var item = DETAIL_MAP[t];
            return (
              <div
                key={t}
                onClick={function () { window.location.href = '/prototypes/message-detail?type=' + t; }}
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #f5f5f5', cursor: 'pointer' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Tag color={item.tagColor} style={{ margin: 0 }}>{item.tag}</Tag>
                  <span style={{ fontSize: 13, color: 'rgba(0,0,0,0.85)' }}>{item.title}</span>
                </div>
                <span style={{ fontSize: 12, color: '#bfbfbf' }}>{item.time}</span>
              </div>
            );
          })}
        </Card>
      </div>
    </div>
  );
};

export default Component;
