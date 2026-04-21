/**
 * @name 应急概览
 *
 * 提供一键报警、救援调度、预警发布、数据留存等应急服务
 */

import './style.css';
import React, { useState } from 'react';
import {
  Layout,
  Menu,
  Card,
  Row,
  Col,
  Button,
  Typography,
  Tag,
  Space,
  Timeline,
  Statistic,
  Alert,
  Input,
  Modal
} from 'antd';
import {
  AlertOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  TeamOutlined,
  WarningOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  FileTextOutlined,
  SendOutlined
} from '@ant-design/icons';

const { Sider, Content } = Layout;
const { Title, Text, Paragraph } = Typography;

const SERVICE_MENU = [
  { key: 'overview', label: '应急概览', icon: <AlertOutlined />, path: '/prototypes/emergency-service' },
  { key: 'alarm', label: '一键报警', icon: <PhoneOutlined />, path: '/prototypes/emergency-alarm' },
  { key: 'rescue', label: '救援调度', icon: <TeamOutlined />, path: '/prototypes/emergency-rescue' },
  { key: 'warning', label: '预警发布', icon: <WarningOutlined />, path: '/prototypes/emergency-warning' },
  { key: 'record', label: '数据留存', icon: <FileTextOutlined />, path: '/prototypes/emergency-record' }
];

const RESCUE_RECORDS = [
  { id: 1, type: '紧急救援', location: '城东区A3空域', time: '2024-01-16 14:30', status: 'processing' },
  { id: 2, type: '设备故障', location: '城西区B2空域', time: '2024-01-15 10:15', status: 'completed' },
  { id: 3, type: '气象预警', location: '全市范围', time: '2024-01-14 08:00', status: 'completed' }
];

const Component: React.FC = () => {
  const [selectedMenu, setSelectedMenu] = useState('overview');
  const [alarmModalVisible, setAlarmModalVisible] = useState(false);

  const menuItems = SERVICE_MENU.map(item => ({
    key: item.key,
    label: item.label,
    icon: item.icon
  }));

  const getStatusConfig = (status: string) => {
    const config: Record<string, { color: string; text: string }> = {
      processing: { color: 'processing', text: '处理中' },
      completed: { color: 'success', text: '已完成' }
    };
    return config[status] || { color: 'default', text: status };
  };

  return (
    <Layout style={{ minHeight: '100vh', background: '#f5f7fa' }}>
      <Sider
        width={220}
        style={{ background: '#fff', borderRight: '1px solid #f0f0f0' }}
        theme="light"
      >
        <div style={{ padding: '20px 16px', borderBottom: '1px solid #f0f0f0' }}>
          <Title level={4} style={{ margin: 0, color: '#ff4d4f' }}>
            <AlertOutlined style={{ marginRight: 8 }} />
            低空应急服务
          </Title>
          <Text type="secondary" style={{ fontSize: 12 }}>
            应急响应与救援
          </Text>
        </div>
        <Menu
          mode="inline"
          selectedKeys={[selectedMenu]}
          items={menuItems}
          onClick={(e) => {
            const item = SERVICE_MENU.find(m => m.key === e.key);
            if (item && item.path && e.key !== 'overview') {
              window.location.href = item.path;
            }
            setSelectedMenu(e.key);
          }}
          style={{ borderRight: 0, marginTop: 8 }}
        />
      </Sider>

      <Content style={{ padding: 24 }}>
        <div style={{ maxWidth: 1200 }}>
          <Row gutter={[24, 24]}>
            <Col span={24}>
              <Alert
                message="应急服务热线：400-XXX-XXXX（24小时）"
                description="如遇紧急情况，请立即拨打应急热线或使用一键报警功能"
                type="warning"
                showIcon
                icon={<PhoneOutlined />}
                style={{ borderRadius: 8 }}
              />
            </Col>

            <Col span={24}>
              <Card style={{ borderRadius: 8, background: '#fff1f0', borderColor: '#ffccc7' }}>
                <div style={{ textAlign: 'center', padding: '20px 0' }}>
                  <Title level={3} style={{ color: '#ff4d4f', marginBottom: 16 }}>
                    <AlertOutlined /> 一键报警
                  </Title>
                  <Paragraph style={{ color: '#666', marginBottom: 24 }}>
                    遇到紧急情况？点击下方按钮立即报警，系统将自动上报您的位置信息
                  </Paragraph>
                  <Button
                    type="primary"
                    danger
                    size="large"
                    icon={<AlertOutlined />}
                    style={{ height: 56, paddingInline: 48, fontSize: 18, borderRadius: 8 }}
                    onClick={() => setAlarmModalVisible(true)}
                  >
                    立即报警
                  </Button>
                </div>
              </Card>
            </Col>

            <Col xs={24} sm={8}>
              <Card style={{ borderRadius: 8 }}>
                <Statistic
                  title="今日报警"
                  value={12}
                  prefix={<AlertOutlined style={{ color: '#ff4d4f' }} />}
                  valueStyle={{ color: '#ff4d4f' }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={8}>
              <Card style={{ borderRadius: 8 }}>
                <Statistic
                  title="处理中"
                  value={3}
                  prefix={<ClockCircleOutlined style={{ color: '#faad14' }} />}
                  valueStyle={{ color: '#faad14' }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={8}>
              <Card style={{ borderRadius: 8 }}>
                <Statistic
                  title="已完成"
                  value={156}
                  prefix={<CheckCircleOutlined style={{ color: '#52c41a' }} />}
                  valueStyle={{ color: '#52c41a' }}
                />
              </Card>
            </Col>

            <Col xs={24} lg={12}>
              <Card
                title={<span style={{ fontWeight: 600 }}>救援记录</span>}
                extra={<Button type="link">查看全部</Button>}
                style={{ borderRadius: 8 }}
              >
                {RESCUE_RECORDS.map((record) => {
                  const statusConfig = getStatusConfig(record.status);
                  return (
                    <div
                      key={record.id}
                      style={{
                        padding: '12px 0',
                        borderBottom: '1px solid #f0f0f0'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text strong>{record.type}</Text>
                        <Tag color={statusConfig.color}>{statusConfig.text}</Tag>
                      </div>
                      <Space style={{ marginTop: 4 }}>
                        <Text type="secondary" style={{ fontSize: 12 }}>
                          <EnvironmentOutlined /> {record.location}
                        </Text>
                      </Space>
                      <br />
                      <Text type="secondary" style={{ fontSize: 12 }}>
                        <ClockCircleOutlined /> {record.time}
                      </Text>
                    </div>
                  );
                })}
              </Card>
            </Col>

            <Col xs={24} lg={12}>
              <Card
                title={<span style={{ fontWeight: 600 }}>应急流程</span>}
                style={{ borderRadius: 8 }}
              >
                <Timeline
                  items={[
                    { color: 'red', children: <span><Text strong>报警</Text><br /><Text type="secondary">一键报警或拨打热线</Text></span> },
                    { color: 'orange', children: <span><Text strong>定位</Text><br /><Text type="secondary">自动获取位置信息</Text></span> },
                    { color: 'blue', children: <span><Text strong>调度</Text><br /><Text type="secondary">联动救援力量</Text></span> },
                    { color: 'green', children: <span><Text strong>救援</Text><br /><Text type="secondary">现场处置与救助</Text></span> }
                  ]}
                />
              </Card>
            </Col>
          </Row>
        </div>
      </Content>

      <Modal
        title={<span><AlertOutlined style={{ color: '#ff4d4f' }} /> 确认报警</span>}
        open={alarmModalVisible}
        onCancel={() => setAlarmModalVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setAlarmModalVisible(false)}>
            取消
          </Button>,
          <Button key="submit" type="primary" danger icon={<SendOutlined />}>
            确认报警
          </Button>
        ]}
      >
        <Alert
          message="报警将自动上报您的位置信息"
          type="warning"
          showIcon
          style={{ marginBottom: 16 }}
        />
        <Text>当前位置：</Text>
        <Input
          prefix={<EnvironmentOutlined />}
          defaultValue="城东区A3空域（自动定位）"
          style={{ marginTop: 8 }}
        />
        <div style={{ marginTop: 16 }}>
          <Text>情况描述：</Text>
          <Input.TextArea
            rows={3}
            placeholder="请简要描述紧急情况..."
            style={{ marginTop: 8 }}
          />
        </div>
      </Modal>
    </Layout>
  );
};

export default Component;
