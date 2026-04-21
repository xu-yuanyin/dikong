/**
 * @name 资质查询
 *
 * 提供飞行资质查询服务
 */

import './style.css';
import React, { useState } from 'react';
import {
  Layout, Menu, Card, Row, Col, Button, Typography, Tag, Empty, Breadcrumb, Input, Select, Descriptions, Result, Divider, Space, Alert
} from 'antd';
import {
  HeartOutlined, CompassOutlined, BookOutlined, SafetyCertificateOutlined, ToolOutlined, MessageOutlined, ArrowLeftOutlined, SearchOutlined, CheckCircleOutlined, ExclamationCircleOutlined, IdcardOutlined
} from '@ant-design/icons';

const { Sider, Content } = Layout;
const { Title, Text, Paragraph } = Typography;

const SIDE_MENU = [
  { key: 'overview', label: '服务概览', icon: <HeartOutlined />, path: '/prototypes/public-service' },
  { key: 'tour', label: '低空旅游', icon: <CompassOutlined />, path: '/prototypes/public-tour' },
  { key: 'training', label: '培训服务', icon: <BookOutlined />, path: '/prototypes/public-training' },
  { key: 'query', label: '资质查询', icon: <SafetyCertificateOutlined />, path: '/prototypes/public-query' },
  { key: 'maintenance', label: '维修保险', icon: <ToolOutlined />, path: '/prototypes/public-maintenance' },
  { key: 'feedback', label: '意见反馈', icon: <MessageOutlined />, path: '/prototypes/public-feedback' }
];

const QUALIFICATION_TYPES = [
  { value: 'pilot', label: '无人机驾驶员证' },
  { value: 'operator', label: '无人机运营合格证' },
  { value: 'aircraft', label: '无人机登记证' },
  { value: 'insurance', label: '无人机保险凭证' }
];

const MOCK_RESULT = {
  name: '张三',
  idCard: '310***********1234',
  certNo: 'UAV-2024-001234',
  certType: '无人机驾驶员证',
  level: '多旋翼III类',
  issueDate: '2024-01-15',
  validDate: '2027-01-14',
  status: 'valid',
  issuer: '中国民航局'
};

const Component: React.FC = () => {
  const [selectedMenu, setSelectedMenu] = useState('query');
  const [queryType, setQueryType] = useState('pilot');
  const [queryNo, setQueryNo] = useState('');
  const [queryResult, setQueryResult] = useState<typeof MOCK_RESULT | null>(null);
  const [hasQueried, setHasQueried] = useState(false);

  const menuItems = SIDE_MENU.map(item => ({ key: item.key, label: item.label, icon: item.icon }));

  const handleQuery = () => {
    if (queryNo) {
      setQueryResult(MOCK_RESULT);
      setHasQueried(true);
    }
  };

  const handleReset = () => {
    setQueryNo('');
    setQueryResult(null);
    setHasQueried(false);
  };

  return (
    <Layout style={{ minHeight: '100vh', background: '#f5f7fa' }}>
      <Sider width={220} style={{ background: '#fff', borderRight: '1px solid #f0f0f0' }} theme="light">
        <div style={{ padding: '20px 16px', borderBottom: '1px solid #f0f0f0' }}>
          <Title level={4} style={{ margin: 0, color: '#52c41a' }}><SafetyCertificateOutlined style={{ marginRight: 8 }} />低空便民服务</Title>
          <Text type="secondary" style={{ fontSize: 12 }}>便民服务与咨询</Text>
        </div>
        <Menu mode="inline" selectedKeys={[selectedMenu]} items={menuItems} onClick={(e) => { const item = SIDE_MENU.find(m => m.key === e.key); if (item?.path) window.location.href = item.path; setSelectedMenu(e.key); }} style={{ borderRight: 0, marginTop: 8 }} />
        <div style={{ padding: 16, borderTop: '1px solid #f0f0f0', marginTop: 'auto' }}>
          <Button block icon={<ArrowLeftOutlined />} href="/prototypes/home">返回</Button>
        </div>
      </Sider>

      <Content style={{ padding: 24 }}>
        <div style={{ maxWidth: 1200 }}>
          <Card style={{ borderRadius: 8, marginBottom: 24 }}>
            <Breadcrumb items={[{ title: <a href="/prototypes/home">门户首页</a> }, { title: <a href="/prototypes/public-service">低空便民服务</a> }, { title: '资质查询' }]} />
            <Title level={4} style={{ margin: '8px 0 0' }}>资质查询</Title>
          </Card>

          <Row gutter={[24, 24]}>
            <Col xs={24} lg={8}>
              <Card style={{ borderRadius: 8, textAlign: 'center', padding: 24 }}>
                <IdcardOutlined style={{ fontSize: 64, color: '#52c41a', marginBottom: 24 }} />
                <Title level={4} style={{ marginBottom: 8 }}>资质查询</Title>
                <Paragraph type="secondary" style={{ marginBottom: 24 }}>输入证件编号查询资质信息</Paragraph>
                <Select style={{ width: '100%', marginBottom: 16 }} value={queryType} onChange={setQueryType} options={QUALIFICATION_TYPES} />
                <Input.Search placeholder="请输入证件编号" value={queryNo} onChange={(e) => setQueryNo(e.target.value)} onSearch={handleQuery} enterButton={<><SearchOutlined /> 查询</>} style={{ marginBottom: 16 }} />
                <Button block onClick={handleReset}>重置</Button>
              </Card>

              <Card style={{ borderRadius: 8, marginTop: 24 }} title="查询说明">
                <ul style={{ paddingLeft: 20, margin: 0 }}>
                  <li><Text>支持查询无人机驾驶员证、运营合格证等</Text></li>
                  <li><Text>请输入完整的证件编号</Text></li>
                  <li><Text>查询结果仅供参考</Text></li>
                  <li><Text>如有疑问请联系客服</Text></li>
                </ul>
              </Card>
            </Col>

            <Col xs={24} lg={16}>
              <Card style={{ borderRadius: 8, minHeight: 400 }}>
                {!hasQueried ? (
                  <Empty description="请输入证件编号进行查询" image={Empty.PRESENTED_IMAGE_SIMPLE} style={{ marginTop: 100 }} />
                ) : queryResult ? (
                  <div>
                    <Result
                      status="success"
                      title="查询成功"
                      subTitle="以下为资质信息"
                      icon={<CheckCircleOutlined style={{ color: '#52c41a' }} />}
                    />
                    <Divider />
                    <Descriptions bordered column={{ xs: 1, sm: 2 }}>
                      <Descriptions.Item label="姓名">{queryResult.name}</Descriptions.Item>
                      <Descriptions.Item label="身份证号">{queryResult.idCard}</Descriptions.Item>
                      <Descriptions.Item label="证件编号">{queryResult.certNo}</Descriptions.Item>
                      <Descriptions.Item label="证件类型">{queryResult.certType}</Descriptions.Item>
                      <Descriptions.Item label="资质等级">{queryResult.level}</Descriptions.Item>
                      <Descriptions.Item label="状态"><Tag color="success">有效</Tag></Descriptions.Item>
                      <Descriptions.Item label="发证日期">{queryResult.issueDate}</Descriptions.Item>
                      <Descriptions.Item label="有效期至">{queryResult.validDate}</Descriptions.Item>
                      <Descriptions.Item label="发证机关" span={2}>{queryResult.issuer}</Descriptions.Item>
                    </Descriptions>
                    <div style={{ marginTop: 24, textAlign: 'center' }}>
                      <Space>
                        <Button type="primary">下载电子证书</Button>
                        <Button>打印证书</Button>
                      </Space>
                    </div>
                  </div>
                ) : (
                  <Result
                    status="error"
                    title="未查询到相关信息"
                    subTitle="请检查证件编号是否正确"
                    icon={<ExclamationCircleOutlined style={{ color: '#ff4d4f' }} />}
                  />
                )}
              </Card>
            </Col>
          </Row>
        </div>
      </Content>
    </Layout>
  );
};

export default Component;
