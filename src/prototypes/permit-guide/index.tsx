/**
 * @name 办理指南
 *
 * 提供飞行许可办理相关的政策法规、办理流程、常见问题等指南信息
 */

import './style.css';
import React, { useState } from 'react';
import {
  Layout, Menu, Card, Row, Col, Button, Tabs, Typography, Tag, Collapse, Empty, Breadcrumb, Timeline, List, Steps
} from 'antd';
import {
  SafetyCertificateOutlined, FileTextOutlined, ClockCircleOutlined, CheckCircleOutlined, ArrowLeftOutlined, EnvironmentOutlined, QuestionCircleOutlined, BookOutlined, FileSearchOutlined, DownloadOutlined
} from '@ant-design/icons';

const { Sider, Content } = Layout;
const { Title, Text, Paragraph } = Typography;

const SIDE_MENU = [
  { key: 'list', label: '许可列表', icon: <FileTextOutlined />, path: '/prototypes/flight-permit' },
  { key: 'temporary', label: '临时报备', icon: <ClockCircleOutlined />, path: '/prototypes/temporary-report' },
  { key: 'cross-region', label: '跨区域审批', icon: <EnvironmentOutlined />, path: '/prototypes/cross-region-approval' },
  { key: 'guide', label: '办理指南', icon: <SafetyCertificateOutlined />, path: '/prototypes/permit-guide' }
];

const PROCESS_DATA = {
  general: [
    { title: '提交申请', description: '填写飞行许可申请表，上传相关材料' },
    { title: '材料审核', description: '工作人员审核申请材料的完整性和合规性' },
    { title: '空域评估', description: '评估飞行区域的安全性和可行性' },
    { title: '审批决定', description: '做出审批决定，通知申请人' },
    { title: '许可发放', description: '发放飞行许可证' }
  ],
  temporary: [
    { title: '在线报备', description: '填写临时飞行报备信息' },
    { title: '快速审核', description: '系统自动审核，人工复核' },
    { title: '报备确认', description: '发送报备确认通知' }
  ],
  crossRegion: [
    { title: '提交申请', description: '填写跨区域飞行审批申请' },
    { title: '区域一审核', description: '起飞区域管理部门审核' },
    { title: '区域二审核', description: '降落区域管理部门审核' },
    { title: '综合审批', description: '综合各方意见，做出审批决定' },
    { title: '许可发放', description: '发放跨区域飞行许可证' }
  ]
};

const FAQ_DATA = [
  { question: '飞行许可的有效期是多久？', answer: '一般飞行许可有效期为30天，临时报备有效期为当日，跨区域审批有效期根据航线距离和复杂程度确定，最长不超过15天。' },
  { question: '哪些情况需要办理跨区域审批？', answer: '当飞行活动涉及跨越两个及以上行政区域时，需要办理跨区域审批。例如：城东区飞往城西区、跨越不同空域管制区域等。' },
  { question: '临时报备和一般飞行许可有什么区别？', answer: '临时报备适用于紧急、临时性的飞行活动，审批流程简化，通常当日可完成；一般飞行许可适用于计划性飞行活动，审批流程更完整，有效期更长。' },
  { question: '申请被驳回后可以重新申请吗？', answer: '可以。申请被驳回后，请根据驳回原因修改申请材料，重新提交申请。建议在修改前咨询工作人员，确保材料符合要求。' },
  { question: '飞行许可可以延期吗？', answer: '可以申请延期。请在许可到期前3个工作日提交延期申请，说明延期原因和新的飞行计划。延期申请需重新审核。' }
];

const MATERIAL_DATA = [
  { type: '一般飞行许可', materials: ['飞行许可申请表', '飞行器适航证明', '操作人员资质证明', '飞行计划书', '空域使用申请', '保险证明'] },
  { type: '临时报备', materials: ['临时报备申请表', '飞行器信息', '操作人员信息', '飞行区域说明', '报备事由说明'] },
  { type: '跨区域审批', materials: ['跨区域审批申请表', '飞行器适航证明', '操作人员资质证明', '详细飞行计划', '各区域空域申请', '应急预案', '保险证明'] }
];

const POLICY_DATA = [
  { title: '低空飞行服务管理办法（试行）', date: '2024-01-01', type: '法规' },
  { title: '无人机飞行管理规定', date: '2023-12-15', type: '规定' },
  { title: '空域使用申请指南', date: '2023-11-20', type: '指南' },
  { title: '飞行许可办理流程说明', date: '2023-10-10', type: '说明' }
];

const Component: React.FC = () => {
  const [selectedMenu, setSelectedMenu] = useState('guide');
  const [activeTab, setActiveTab] = useState('process');

  const menuItems = SIDE_MENU.map(item => ({ key: item.key, label: item.label, icon: item.icon }));

  const tabItems = [
    { key: 'process', label: '办理流程', icon: <CheckCircleOutlined /> },
    { key: 'materials', label: '材料清单', icon: <FileSearchOutlined /> },
    { key: 'faq', label: '常见问题', icon: <QuestionCircleOutlined /> },
    { key: 'policy', label: '政策法规', icon: <BookOutlined /> }
  ];

  return (
    <Layout style={{ minHeight: '100vh', background: '#f5f7fa' }}>
      <Sider width={220} style={{ background: '#fff', borderRight: '1px solid #f0f0f0' }} theme="light">
        <div style={{ padding: '20px 16px', borderBottom: '1px solid #f0f0f0' }}>
          <Title level={4} style={{ margin: 0, color: '#1677ff' }}><SafetyCertificateOutlined style={{ marginRight: 8 }} />飞行许可办理</Title>
          <Text type="secondary" style={{ fontSize: 12 }}>在线办理飞行许可</Text>
        </div>
        <Menu mode="inline" selectedKeys={[selectedMenu]} items={menuItems} onClick={(e) => { const item = SIDE_MENU.find(m => m.key === e.key); if (item?.path) window.location.href = item.path; setSelectedMenu(e.key); }} style={{ borderRight: 0, marginTop: 8 }} />
        <div style={{ padding: 16, borderTop: '1px solid #f0f0f0', marginTop: 'auto' }}>
          <Button block icon={<ArrowLeftOutlined />} href="/prototypes/flight-service">返回</Button>
        </div>
      </Sider>

      <Content style={{ padding: 24 }}>
        <div style={{ maxWidth: 1200 }}>
          <Card style={{ borderRadius: 8, marginBottom: 24 }}>
            <Breadcrumb items={[{ title: <a href="/prototypes/home">门户首页</a> }, { title: <a href="/prototypes/flight-service">低空飞行服务</a> }, { title: <a href="/prototypes/flight-permit">飞行许可办理</a> }, { title: '办理指南' }]} />
            <Title level={4} style={{ margin: '8px 0 0' }}>办理指南</Title>
          </Card>

          <Card style={{ borderRadius: 8 }}>
            <Tabs activeKey={activeTab} onChange={setActiveTab} items={tabItems.map(item => ({ key: item.key, label: <>{item.icon}<span style={{ marginLeft: 8 }}>{item.label}</span></> }))} />

            {activeTab === 'process' && (
              <div style={{ marginTop: 24 }}>
                <Title level={5}>一般飞行许可办理流程</Title>
                <Steps current={-1} items={PROCESS_DATA.general} style={{ marginTop: 16, marginBottom: 32 }} />

                <Title level={5}>临时报备办理流程</Title>
                <Steps current={-1} items={PROCESS_DATA.temporary} style={{ marginTop: 16, marginBottom: 32 }} size="small" />

                <Title level={5}>跨区域审批办理流程</Title>
                <Steps current={-1} items={PROCESS_DATA.crossRegion} style={{ marginTop: 16 }} size="small" />
              </div>
            )}

            {activeTab === 'materials' && (
              <div style={{ marginTop: 24 }}>
                <Row gutter={[24, 24]}>
                  {MATERIAL_DATA.map((item) => (
                    <Col xs={24} lg={8} key={item.type}>
                      <Card title={item.type} size="small" style={{ borderRadius: 8 }}>
                        <List
                          dataSource={item.materials}
                          renderItem={(material) => (
                            <List.Item>
                              <CheckCircleOutlined style={{ color: '#52c41a', marginRight: 8 }} />
                              {material}
                            </List.Item>
                          )}
                        />
                      </Card>
                    </Col>
                  ))}
                </Row>
              </div>
            )}

            {activeTab === 'faq' && (
              <div style={{ marginTop: 24 }}>
                <Collapse accordion items={FAQ_DATA.map((item, index) => ({
                  key: index.toString(),
                  label: <><QuestionCircleOutlined style={{ marginRight: 8, color: '#1677ff' }} />{item.question}</>,
                  children: <Paragraph style={{ marginBottom: 0 }}>{item.answer}</Paragraph>
                }))} />
              </div>
            )}

            {activeTab === 'policy' && (
              <div style={{ marginTop: 24 }}>
                <List
                  itemLayout="horizontal"
                  dataSource={POLICY_DATA}
                  renderItem={(item) => (
                    <List.Item actions={[<Button type="link" icon={<DownloadOutlined />}>下载</Button>]}>
                      <List.Item.Meta
                        avatar={<BookOutlined style={{ fontSize: 24, color: '#1677ff' }} />}
                        title={item.title}
                        description={<><Tag>{item.type}</Tag><Text type="secondary">{item.date}</Text></>}
                      />
                    </List.Item>
                  )}
                />
              </div>
            )}
          </Card>
        </div>
      </Content>
    </Layout>
  );
};

export default Component;
