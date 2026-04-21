/**
 * @name 安全知识
 *
 * 提供低空飞行相关的安全知识服务
 */

import './style.css';
import React, { useState } from 'react';
import {
  Layout, Menu, Card, Row, Col, Button, Tabs, Typography, Tag, List, Empty, Breadcrumb, Collapse, Alert, Divider
} from 'antd';
import {
  FileTextOutlined, CloudOutlined, NotificationOutlined, LineChartOutlined, SafetyOutlined, ArrowLeftOutlined, CheckCircleOutlined, WarningOutlined, InfoCircleOutlined, QuestionCircleOutlined, BookOutlined
} from '@ant-design/icons';

const { Sider, Content } = Layout;
const { Title, Text, Paragraph } = Typography;

const SIDE_MENU = [
  { key: 'overview', label: '服务概览', icon: <FileTextOutlined />, path: '/prototypes/info-service' },
  { key: 'policy', label: '政策法规', icon: <FileTextOutlined />, path: '/prototypes/info-policy' },
  { key: 'weather', label: '气象服务', icon: <CloudOutlined />, path: '/prototypes/info-weather' },
  { key: 'notice', label: '通知公告', icon: <NotificationOutlined />, path: '/prototypes/info-notice' },
  { key: 'news', label: '行业资讯', icon: <LineChartOutlined />, path: '/prototypes/info-news' },
  { key: 'safety', label: '安全知识', icon: <SafetyOutlined />, path: '/prototypes/info-safety' }
];

const CATEGORY_DATA = [
  { key: 'flight', label: '飞行安全', icon: <CheckCircleOutlined /> },
  { key: 'equipment', label: '设备安全', icon: <WarningOutlined /> },
  { key: 'emergency', label: '应急处置', icon: <InfoCircleOutlined /> },
  { key: 'regulation', label: '安全规范', icon: <BookOutlined /> }
];

const SAFETY_TIPS = [
  { title: '飞行前检查', content: '每次飞行前必须检查飞行器状态，包括电池电量、螺旋桨、机身结构等。' },
  { title: '天气确认', content: '飞行前确认天气状况，避免在大风、雷雨、大雾等恶劣天气下飞行。' },
  { title: '空域确认', content: '飞行前确认飞行区域是否在禁飞区或限飞区，遵守空域管理规定。' },
  { title: '保持视距', content: '飞行时保持飞行器在视距范围内，避免超视距飞行带来的安全风险。' }
];

const KNOWLEDGE_DATA: Record<string, Array<{ title: string; content: string }>> = {
  flight: [
    { title: '起飞前准备工作', content: '检查飞行器各部件是否完好，电池电量是否充足，遥控器是否正常工作。确认飞行区域无障碍物，地面平整稳固。' },
    { title: '飞行中的注意事项', content: '保持飞行器在视距范围内，注意观察周围环境，避免碰撞建筑物、树木等障碍物。控制飞行高度，不要超过规定限制。' },
    { title: '降落时的安全要求', content: '选择平坦开阔的降落地点，缓慢下降，避免急速降落。降落后及时关闭电源，检查飞行器状态。' }
  ],
  equipment: [
    { title: '电池安全使用', content: '使用原装或认证电池，避免过充过放。存放时保持适当电量，远离高温环境。定期检查电池外观，发现鼓包、变形应停止使用。' },
    { title: '螺旋桨维护', content: '定期检查螺旋桨是否有裂纹、变形或磨损。更换时使用同型号产品，确保安装牢固。' },
    { title: '遥控器保养', content: '保持遥控器干燥清洁，避免摔落碰撞。定期校准摇杆，确保控制精准。' }
  ],
  emergency: [
    { title: '失控应急处置', content: '如飞行器失控，立即切换到返航模式。如无法返航，选择空旷区域紧急降落。保持冷静，记录事故情况。' },
    { title: '低电量应急', content: '低电量报警时立即返航。如无法返航，选择安全地点降落。避免在水域、人群上方降落。' },
    { title: '信号丢失处理', content: '信号丢失时飞行器通常会自动返航。如未返航，尝试更换位置重新连接。记录最后已知位置，必要时进行搜索。' }
  ],
  regulation: [
    { title: '禁飞区域规定', content: '机场周边、军事禁区、政府机关、大型活动场所等为禁飞区域。违反规定将承担法律责任。' },
    { title: '飞行高度限制', content: '一般飞行高度不超过120米。特殊区域可能有更严格的限制，请提前了解当地规定。' },
    { title: '夜间飞行要求', content: '夜间飞行需配备导航灯，能见度良好。部分区域禁止夜间飞行，请提前确认。' }
  ]
};

const Component: React.FC = () => {
  const [selectedMenu, setSelectedMenu] = useState('safety');
  const [activeCategory, setActiveCategory] = useState('flight');

  const menuItems = SIDE_MENU.map(item => ({ key: item.key, label: item.label, icon: item.icon }));

  return (
    <Layout style={{ minHeight: '100vh', background: '#f5f7fa' }}>
      <Sider width={220} style={{ background: '#fff', borderRight: '1px solid #f0f0f0' }} theme="light">
        <div style={{ padding: '20px 16px', borderBottom: '1px solid #f0f0f0' }}>
          <Title level={4} style={{ margin: 0, color: '#52c41a' }}><SafetyOutlined style={{ marginRight: 8 }} />低空信息服务</Title>
          <Text type="secondary" style={{ fontSize: 12 }}>信息查询与服务</Text>
        </div>
        <Menu mode="inline" selectedKeys={[selectedMenu]} items={menuItems} onClick={(e) => { const item = SIDE_MENU.find(m => m.key === e.key); if (item?.path) window.location.href = item.path; setSelectedMenu(e.key); }} style={{ borderRight: 0, marginTop: 8 }} />
        <div style={{ padding: 16, borderTop: '1px solid #f0f0f0', marginTop: 'auto' }}>
          <Button block icon={<ArrowLeftOutlined />} href="/prototypes/home">返回</Button>
        </div>
      </Sider>

      <Content style={{ padding: 24 }}>
        <div style={{ maxWidth: 1400 }}>
          <Card style={{ borderRadius: 8, marginBottom: 24 }}>
            <Breadcrumb items={[{ title: <a href="/prototypes/home">门户首页</a> }, { title: <a href="/prototypes/info-service">低空信息服务</a> }, { title: '安全知识' }]} />
            <Title level={4} style={{ margin: '8px 0 0' }}>安全知识</Title>
          </Card>

          <Row gutter={[24, 24]}>
            <Col xs={24} lg={16}>
              <Card style={{ borderRadius: 8 }}>
                <Tabs activeKey={activeCategory} onChange={setActiveCategory} items={CATEGORY_DATA.map(item => ({ key: item.key, label: <>{item.icon}<span style={{ marginLeft: 8 }}>{item.label}</span></> }))} />
                <Collapse accordion style={{ marginTop: 16 }} items={KNOWLEDGE_DATA[activeCategory].map((item, index) => ({
                  key: index.toString(),
                  label: <><QuestionCircleOutlined style={{ marginRight: 8, color: '#1677ff' }} />{item.title}</>,
                  children: <Paragraph style={{ marginBottom: 0 }}>{item.content}</Paragraph>
                }))} />
              </Card>
            </Col>

            <Col xs={24} lg={8}>
              <Card title={<><WarningOutlined style={{ marginRight: 8 }} />安全提示</>} style={{ borderRadius: 8, marginBottom: 24 }}>
                <List
                  dataSource={SAFETY_TIPS}
                  renderItem={(item) => (
                    <List.Item style={{ padding: '12px 0', borderBottom: '1px solid #f0f0f0' }}>
                      <List.Item.Meta
                        avatar={<CheckCircleOutlined style={{ color: '#52c41a', fontSize: 16 }} />}
                        title={<Text strong>{item.title}</Text>}
                        description={<Text type="secondary" style={{ fontSize: 12 }}>{item.content}</Text>}
                      />
                    </List.Item>
                  )}
                />
              </Card>

              <Card title="紧急联系方式" style={{ borderRadius: 8 }}>
                <Alert message="如遇紧急情况，请立即联系：" type="info" showIcon style={{ marginBottom: 16 }} />
                <Paragraph><Text strong>空管部门：</Text>12345</Paragraph>
                <Paragraph><Text strong>应急救援：</Text>110 / 119 / 120</Paragraph>
                <Paragraph><Text strong>平台客服：</Text>400-XXX-XXXX</Paragraph>
                <Divider />
                <Text type="secondary" style={{ fontSize: 12 }}>请牢记以上联系方式，确保飞行安全</Text>
              </Card>
            </Col>
          </Row>
        </div>
      </Content>
    </Layout>
  );
};

export default Component;
