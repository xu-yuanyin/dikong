/**
 * @name 低空服务与需求大厅
 * @mode axure
 */

import './style.css';

import React, { useState, useCallback } from 'react';
import { Card, Tag, Input, Row, Col, Pagination, Breadcrumb, Button, Avatar, Empty, Segmented } from 'antd';
import {
  SearchOutlined, HomeOutlined, SafetyCertificateOutlined, RightOutlined,
  CompassOutlined, ReadOutlined, EnvironmentOutlined, ToolOutlined, AppstoreOutlined,
  RocketOutlined, ExperimentOutlined, ThunderboltOutlined, CameraOutlined,
  VideoCameraOutlined, TrophyOutlined, SolutionOutlined, SettingOutlined,
  BulbOutlined, FormOutlined, UserOutlined, ClockCircleOutlined, DollarOutlined, MoreOutlined
} from '@ant-design/icons';

const CATEGORIES = [
  { key: '全部', icon: <AppstoreOutlined />, title: '全部服务', color: '#1677ff', bg: '#e6f4ff' },
  { key: '行业应用', icon: <SafetyCertificateOutlined />, title: '行业应用', color: '#fa8c16', bg: '#fff7e6' },
  { key: '航拍影像', icon: <EnvironmentOutlined />, title: '航拍影像', color: '#722ed1', bg: '#f9f0ff' },
  { key: '飞行培训', icon: <ReadOutlined />, title: '飞行培训', color: '#52c41a', bg: '#f6ffed' },
  { key: '低空旅游', icon: <CompassOutlined />, title: '低空旅游', color: '#1677ff', bg: '#e6f4ff' },
  { key: '飞行器服务', icon: <ToolOutlined />, title: '飞行器服务', color: '#13c2c2', bg: '#e6fffb' },
  { key: '其他服务', icon: <MoreOutlined />, title: '其他服务', color: '#8c8c8c', bg: '#f5f5f5' }
];

const SERVICE_COVERS: Record<number, { gradient: string; icon: React.ReactNode; label: string }> = {
  1: { gradient: 'linear-gradient(135deg, #e6f4ff 0%, #bae0ff 30%, #91caff 60%, #69b1ff 100%)', icon: <RocketOutlined style={{ fontSize: 40, color: '#fa8c16' }} />, label: '山地物资调运 · 无人机吊运' },
  2: { gradient: 'linear-gradient(135deg, #f6ffed 0%, #d9f7be 30%, #b7eb8f 60%, #95de64 100%)', icon: <ExperimentOutlined style={{ fontSize: 40, color: '#52c41a' }} />, label: '精准植保 · 智能喷洒' },
  3: { gradient: 'linear-gradient(135deg, #fff7e6 0%, #ffe7ba 30%, #ffd591 60%, #ffc069 100%)', icon: <ThunderboltOutlined style={{ fontSize: 40, color: '#fa8c16' }} />, label: '电力巡检 · 智能巡航' },
  4: { gradient: 'linear-gradient(135deg, #f9f0ff 0%, #efdbff 30%, #d3adf7 60%, #b37feb 100%)', icon: <CameraOutlined style={{ fontSize: 40, color: '#722ed1' }} />, label: '活动航拍 · 高清影像' },
  5: { gradient: 'linear-gradient(135deg, #e6fffb 0%, #b5f5ec 30%, #87e8de 60%, #5cdbd3 100%)', icon: <VideoCameraOutlined style={{ fontSize: 40, color: '#13c2c2' }} />, label: 'VR全景 · 沉浸体验' },
  6: { gradient: 'linear-gradient(135deg, #fff0f6 0%, #ffd6e7 30%, #ffadd2 60%, #ff85c0 100%)', icon: <TrophyOutlined style={{ fontSize: 40, color: '#eb2f96' }} />, label: '赛事拍摄 · 精彩瞬间' },
  7: { gradient: 'linear-gradient(135deg, #f6ffed 0%, #d9f7be 40%, #b7eb8f 70%, #73d13d 100%)', icon: <SolutionOutlined style={{ fontSize: 40, color: '#389e0d' }} />, label: '飞行培训 · 专业考证' },
  8: { gradient: 'linear-gradient(135deg, #e6fffb 0%, #b5f5ec 40%, #87e8de 70%, #36cfc9 100%)', icon: <SettingOutlined style={{ fontSize: 40, color: '#08979c' }} />, label: '适航检测 · 安全保障' }
};

const SERVICES = [
  { id: 1, name: '山地物资调运', category: '行业应用', price: '¥1,200/架次', provider: '大疆通用航空' },
  { id: 2, name: '精准植保喷洒', category: '行业应用', price: '¥15/亩', provider: '极飞农业服务' },
  { id: 3, name: '电力通信巡检', category: '行业应用', price: '¥3,000/天', provider: '中科星图测绘' },
  { id: 4, name: '特色活动航拍', category: '航拍影像', price: '¥2,800/场', provider: '光影视觉传媒' },
  { id: 5, name: 'VR全景拍摄', category: '航拍影像', price: '¥4,500/组', provider: '光影视觉传媒' },
  { id: 6, name: '体育赛事拍摄', category: '航拍影像', price: '¥3,500/场', provider: '飞跃体育传媒' },
  { id: 7, name: '多旋翼驾驶员考证培训', category: '飞行培训', price: '¥8,500/人', provider: '中航航空飞行学院' },
  { id: 8, name: '大疆 M300 年度适航检测', category: '飞行器服务', price: '¥2,000/次', provider: '大疆官方售后(郑州)' }
];

const DEMAND_CATEGORIES = [
  { key: '全部', icon: <AppstoreOutlined />, title: '全部需求', color: '#1677ff', bg: '#e6f4ff' },
  { key: '航拍摄影', icon: <CameraOutlined />, title: '航拍摄影', color: '#722ed1', bg: '#f9f0ff' },
  { key: '巡检服务', icon: <SafetyCertificateOutlined />, title: '巡检服务', color: '#fa8c16', bg: '#fff7e6' },
  { key: '飞行培训', icon: <ReadOutlined />, title: '飞行培训', color: '#52c41a', bg: '#f6ffed' },
  { key: '物流配送', icon: <RocketOutlined />, title: '物流配送', color: '#1677ff', bg: '#e6f4ff' },
  { key: '其他需求', icon: <BulbOutlined />, title: '其他需求', color: '#13c2c2', bg: '#e6fffb' }
];

const DEMANDS = [
  { id: 1, title: '某产业园区需要航拍宣传片拍摄', category: '航拍摄影', budget: '¥5,000-10,000', area: '郑州市高新区', publisher: '张经理', date: '2026-05-10', deadline: '2026-06-01', status: '征集中', desc: '园区招商宣传需要，需航拍整体鸟瞰及重点楼宇特写镜头' },
  { id: 2, title: '光伏电站季度巡检服务采购', category: '巡检服务', budget: '¥20,000以上', area: '郑州市郊区', publisher: '李总', date: '2026-05-08', deadline: '2026-05-25', status: '征集中', desc: '约200亩光伏面板的无人机红外巡检，需出具专业检测报告' },
  { id: 3, title: '企业团建无人机驾驶体验培训', category: '飞行培训', budget: '¥8,000-15,000', area: '郑州市主城区', publisher: '王HR', date: '2026-05-06', deadline: '2026-05-30', status: '征集中', desc: '30人团队的半天无人机体验+基础飞行培训活动' },
  { id: 4, title: '山区应急物资运输服务长期合作', category: '物流配送', budget: '面议', area: '郑州市全域', publisher: '赵主任', date: '2026-05-03', deadline: '2026-06-15', status: '征集中', desc: '山区乡镇卫生院药品及医疗物资定期无人机配送，长期合作' },
  { id: 5, title: '婚礼跟拍航拍服务', category: '航拍摄影', budget: '¥3,000-5,000', area: '郑州市主城区', publisher: '刘女士', date: '2026-05-01', deadline: '2026-06-20', status: '征集中', desc: '户外婚礼仪式航拍跟拍，约2小时，需后期剪辑' },
  { id: 6, title: '高压输电线路无人机巡线', category: '巡检服务', budget: '¥10,000-20,000', area: '郑州市全域', publisher: '孙工', date: '2026-04-28', deadline: '2026-05-20', status: '已截止', desc: '35kV及以上输电线路约50公里的无人机精细化巡检' }
];

const DEMAND_GRADIENTS: Record<string, string> = {
  '航拍摄影': 'linear-gradient(135deg, #f9f0ff, #efdbff)',
  '巡检服务': 'linear-gradient(135deg, #fff7e6, #ffe7ba)',
  '飞行培训': 'linear-gradient(135deg, #f6ffed, #d9f7be)',
  '物流配送': 'linear-gradient(135deg, #e6f4ff, #bae0ff)',
  '其他需求': 'linear-gradient(135deg, #e6fffb, #b5f5ec)'
};

const Component = function ServiceListPage() {
  const [activeTab, setActiveTab] = useState<string>('服务大厅');
  const [selectedCategory, setSelectedCategory] = useState('全部');
  const [demandCategory, setDemandCategory] = useState('全部');
  const [searchText, setSearchText] = useState('');

  const handleNavigate = useCallback(function (key: string) {
    window.location.href = '/prototypes/' + key;
  }, []);

  const filteredServices = SERVICES.filter(function (s) {
    const matchCategory = selectedCategory === '全部' || s.category === selectedCategory;
    const matchSearch = !searchText || s.name.includes(searchText) || s.provider.includes(searchText);
    return matchCategory && matchSearch;
  });

  const filteredDemands = DEMANDS.filter(function (d) {
    const matchCat = demandCategory === '全部' || d.category === demandCategory;
    const matchSearch = !searchText || d.title.includes(searchText) || d.desc.includes(searchText);
    return matchCat && matchSearch;
  });

  return (
    <div style={{ minHeight: '100vh', background: '#f5f5f5' }}>
      <header style={{ background: 'linear-gradient(135deg, #0c4a6e 0%, #1677ff 100%)', padding: '0 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }} onClick={() => handleNavigate('home')}>
            <SafetyCertificateOutlined style={{ fontSize: 20, color: '#fff' }} />
            <span style={{ fontSize: 16, fontWeight: 600, color: '#fff' }}>区域低空公共服务平台</span>
          </div>
          <div style={{ display: 'flex', gap: 16 }}>
            <a style={{ color: 'rgba(255,255,255,0.85)', cursor: 'pointer' }} onClick={() => handleNavigate('home')}>首页</a>
            <a style={{ color: 'rgba(255,255,255,0.85)', cursor: 'pointer' }} onClick={() => handleNavigate('news')}>资讯公告</a>
            <a style={{ color: 'rgba(255,255,255,0.85)', cursor: 'pointer' }} onClick={() => handleNavigate('policy-national')}>政策法规</a>
            <a style={{ color: '#fff', fontWeight: 600, cursor: 'pointer' }}>低空服务</a>
            <a style={{ color: 'rgba(255,255,255,0.85)', cursor: 'pointer' }} onClick={() => handleNavigate('mall-list')}>低空商城</a>
            <a style={{ color: 'rgba(255,255,255,0.85)', cursor: 'pointer' }} onClick={() => handleNavigate('flight-dynamic')}>飞行服务</a>
            <a style={{ color: 'rgba(255,255,255,0.85)', cursor: 'pointer' }} onClick={() => handleNavigate('login')}>登录</a>
          </div>
        </div>
      </header>

      {/* Banner Area */}
      <div style={{ background: 'linear-gradient(135deg, #0c4a6e 0%, #1677ff 100%)', padding: '24px 24px 72px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          {/* 顶部白色面包屑 */}
          <Breadcrumb 
            separator={<span style={{ color: 'rgba(255,255,255,0.4)' }}>/</span>}
            items={[
              { title: <a style={{ color: 'rgba(255,255,255,0.85)' }} onClick={() => handleNavigate('home')}><HomeOutlined /> 首页</a> },
              { title: <span style={{ color: '#fff', fontWeight: 500 }}>低空服务大厅</span> }
            ]} 
            style={{ marginBottom: 24 }} 
          />

          <div style={{ textAlign: 'center', marginTop: 16 }}>
            <CompassOutlined style={{ fontSize: 48, color: '#fff', marginBottom: 16 }} />
            <h1 style={{ fontSize: 32, fontWeight: 700, color: '#fff', marginBottom: 12 }}>{activeTab === '服务大厅' ? '低空服务大厅' : '低空需求大厅'}</h1>
            <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.85)', marginBottom: 20 }}>{activeTab === '服务大厅' ? '汇聚优质低空服务资源，为您提供专业、安全、高效的一站式低空服务解决方案' : '发布您的低空服务需求，让优质服务商主动为您提供解决方案'}</p>

            {/* Tab 切换 */}
            <div style={{ marginBottom: 20 }}>
              <Segmented
                options={[
                  { label: <span style={{ padding: '0 16px' }}><CompassOutlined /> 服务大厅</span>, value: '服务大厅' },
                  { label: <span style={{ padding: '0 16px' }}><FormOutlined /> 需求大厅</span>, value: '需求大厅' }
                ]}
                value={activeTab}
                onChange={(v) => { setActiveTab(v as string); setSearchText(''); }}
                size="large"
                style={{ background: 'rgba(255,255,255,0.15)', borderRadius: 8 }}
              />
            </div>
          
          <div style={{ maxWidth: 600, margin: '0 auto', display: 'flex', gap: 12 }}>
            <Input.Search 
              size="large" 
              placeholder={activeTab === '服务大厅' ? '搜索航拍、植保、测绘等低空服务...' : '搜索航拍、巡检、培训等服务需求...'} 
              enterButton={activeTab === '服务大厅' ? '搜索服务' : '搜索需求'} 
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              style={{ flex: 1 }}
            />
            {activeTab === '服务大厅' ? (
              <Button size="large" type="primary" style={{ background: '#52c41a', borderColor: '#52c41a', fontWeight: 600, whiteSpace: 'nowrap' }} onClick={() => handleNavigate('service-publish')}>
                我要发布服务
              </Button>
            ) : (
              <Button size="large" type="primary" style={{ background: '#fa8c16', borderColor: '#fa8c16', fontWeight: 600, whiteSpace: 'nowrap' }} onClick={() => handleNavigate('demand-publish')}>
                我要发布需求
              </Button>
            )}
          </div>
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', marginTop: 8 }}>{activeTab === '服务大厅' ? '* 仅飞行服务商和飞手可发布服务' : '* 已完成认证的用户均可发布服务需求'}</p>
        </div>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: '-40px auto 0', padding: '0 24px 48px', position: 'relative', zIndex: 10 }}>

        {/* ========== 服务大厅 ========== */}
        {activeTab === '服务大厅' && (<>
        {/* 分类图标卡片 */}
        <Row gutter={[12, 12]} style={{ marginBottom: 24 }}>
          {CATEGORIES.map((cat) => (
            <Col xs={8} sm={4} key={cat.key}>
              <div
                onClick={() => setSelectedCategory(cat.key)}
                style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
                  padding: '16px 8px', borderRadius: 12, cursor: 'pointer',
                  background: selectedCategory === cat.key ? cat.bg : '#fff',
                  border: selectedCategory === cat.key ? `2px solid ${cat.color}` : '2px solid transparent',
                  boxShadow: selectedCategory === cat.key ? `0 4px 12px ${cat.color}22` : '0 2px 8px rgba(0,0,0,0.04)',
                  transition: 'all 0.25s ease'
                }}
              >
                <div style={{
                  width: 44, height: 44, borderRadius: '50%',
                  background: selectedCategory === cat.key ? cat.color : cat.bg,
                  color: selectedCategory === cat.key ? '#fff' : cat.color,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22,
                  transition: 'all 0.25s ease'
                }}>
                  {cat.icon}
                </div>
                <span style={{
                  fontSize: 13, fontWeight: selectedCategory === cat.key ? 600 : 400,
                  color: selectedCategory === cat.key ? cat.color : '#595959'
                }}>
                  {cat.title}
                </span>
              </div>
            </Col>
          ))}
        </Row>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <span style={{ fontSize: 16, fontWeight: 600, color: '#1f1f1f' }}>
            {selectedCategory === '全部' ? '全部服务' : selectedCategory}
          </span>
        </div>

        {filteredServices.length > 0 ? (
          <Row gutter={[24, 24]}>
            {filteredServices.map((service) => (
              <Col key={service.id} xs={24} sm={12} lg={8}>
                <Card
                  hoverable
                  style={{ borderRadius: 16, overflow: 'hidden', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}
                  styles={{ body: { padding: 0 } }}
                  onClick={() => handleNavigate('service-detail')}
                >
                  {(() => {
                    var cover = SERVICE_COVERS[service.id] || SERVICE_COVERS[1];
                    return (
                      <div style={{ width: '100%', paddingTop: '56.25%', position: 'relative' }}>
                        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: cover.gradient, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 8 }}>
                          {cover.icon}
                          <span style={{ fontSize: 12, color: 'rgba(0,0,0,0.45)' }}>{cover.label}</span>
                        </div>
                        <div style={{ position: 'absolute', bottom: 12, left: 12, background: 'rgba(255,255,255,0.9)', padding: '4px 8px', borderRadius: 4, fontSize: 12, fontWeight: 500, display: 'flex', alignItems: 'center', gap: 4 }}>
                          <Avatar size={16} style={{ background: '#1677ff', fontSize: 10 }}>{service.provider.slice(0, 1)}</Avatar>
                          {service.provider}
                        </div>
                      </div>
                    );
                  })()}
                  <div style={{ padding: '20px' }}>
                    <h4 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8, color: '#1f1f1f', display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {service.name}
                    </h4>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 16 }}>
                      <span style={{ fontSize: 16, color: service.price.startsWith('¥') ? '#ff4d4f' : '#52c41a', fontWeight: 600 }}>{service.price}</span>
                      <Tag color="blue">{service.category}</Tag>
                    </div>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        ) : (
          <Card style={{ borderRadius: 12, textAlign: 'center', padding: '48px 0' }}>
            <Empty description="暂无符合条件的服务" />
          </Card>
        )}

        <div style={{ textAlign: 'center', marginTop: 32 }}>
          <Pagination defaultCurrent={1} total={filteredServices.length * 3} />
        </div>
        </>)}

        {/* ========== 需求大厅 ========== */}
        {activeTab === '需求大厅' && (<>
        <Row gutter={[12, 12]} style={{ marginBottom: 24 }}>
          {DEMAND_CATEGORIES.map((cat) => (
            <Col xs={8} sm={4} key={cat.key}>
              <div
                onClick={() => setDemandCategory(cat.key)}
                style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
                  padding: '16px 8px', borderRadius: 12, cursor: 'pointer',
                  background: demandCategory === cat.key ? cat.bg : '#fff',
                  border: demandCategory === cat.key ? `2px solid ${cat.color}` : '2px solid transparent',
                  boxShadow: demandCategory === cat.key ? `0 4px 12px ${cat.color}22` : '0 2px 8px rgba(0,0,0,0.04)',
                  transition: 'all 0.25s ease'
                }}
              >
                <div style={{
                  width: 44, height: 44, borderRadius: '50%',
                  background: demandCategory === cat.key ? cat.color : cat.bg,
                  color: demandCategory === cat.key ? '#fff' : cat.color,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22,
                  transition: 'all 0.25s ease'
                }}>
                  {cat.icon}
                </div>
                <span style={{
                  fontSize: 13, fontWeight: demandCategory === cat.key ? 600 : 400,
                  color: demandCategory === cat.key ? cat.color : '#595959'
                }}>
                  {cat.title}
                </span>
              </div>
            </Col>
          ))}
        </Row>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <span style={{ fontSize: 16, fontWeight: 600, color: '#1f1f1f' }}>
            {demandCategory === '全部' ? '全部需求' : demandCategory}
          </span>
          <span style={{ fontSize: 13, color: '#8c8c8c' }}>共 {filteredDemands.length} 条需求</span>
        </div>

        {filteredDemands.length > 0 ? (
          <Row gutter={[24, 24]}>
            {filteredDemands.map((demand) => (
              <Col key={demand.id} xs={24} sm={12} lg={8}>
                <Card
                  hoverable
                  style={{ borderRadius: 16, overflow: 'hidden', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}
                  styles={{ body: { padding: 0 } }}
                  onClick={() => handleNavigate('service-demand-detail')}
                >
                  {/* 顶部渐变条 */}
                  <div style={{ height: 6, background: DEMAND_GRADIENTS[demand.category] || DEMAND_GRADIENTS['其他需求'] }} />
                  <div style={{ padding: 20 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                      <h4 style={{ fontSize: 16, fontWeight: 700, color: '#1f1f1f', margin: 0, flex: 1, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        {demand.title}
                      </h4>
                      <Tag color={demand.status === '征集中' ? 'green' : 'default'} style={{ marginLeft: 8, flexShrink: 0 }}>{demand.status}</Tag>
                    </div>
                    <p style={{ fontSize: 13, color: '#8c8c8c', lineHeight: 1.6, margin: '0 0 12px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {demand.desc}
                    </p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, fontSize: 13, color: '#595959', marginBottom: 12 }}>
                      <span><DollarOutlined style={{ color: '#fa8c16', marginRight: 4 }} />{demand.budget}</span>
                      <span><EnvironmentOutlined style={{ color: '#1677ff', marginRight: 4 }} />{demand.area}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 12, borderTop: '1px solid #f0f0f0' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <Avatar size={20} style={{ background: '#fa8c16', fontSize: 10 }}>{demand.publisher.slice(0, 1)}</Avatar>
                        <span style={{ fontSize: 12, color: '#8c8c8c' }}>{demand.publisher}</span>
                      </div>
                      <div style={{ fontSize: 12, color: '#bfbfbf' }}>
                        <ClockCircleOutlined style={{ marginRight: 4 }} />截止 {demand.deadline}
                      </div>
                    </div>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        ) : (
          <Card style={{ borderRadius: 12, textAlign: 'center', padding: '48px 0' }}>
            <Empty description="暂无符合条件的需求" />
          </Card>
        )}

        <div style={{ textAlign: 'center', marginTop: 32 }}>
          <Pagination defaultCurrent={1} total={filteredDemands.length * 3} />
        </div>
        </>)}
      </div>
    </div>
  );
};

export default Component;
