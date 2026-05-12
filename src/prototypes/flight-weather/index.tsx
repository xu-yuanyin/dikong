/**
 * @name 气象信息
 * @mode axure
 * /Users/xu/Desktop/元引信息/Axhub-Make-main/skills/axure-export-workflow/SKILL.md
 *
 */

import './style.css';

import React, { useCallback } from 'react';
import { Card, Row, Col, Breadcrumb, Tabs, Tag, Progress } from 'antd';
import { HomeOutlined, RocketOutlined, CloudOutlined, ThunderboltOutlined, WarningOutlined } from '@ant-design/icons';

const WEATHER_CURRENT = {
  temp: '22°C',
  wind: '东南风 3级',
  humidity: '65%',
  visibility: '12km',
  pressure: '1013hPa',
  condition: '晴转多云',
  flightLevel: '适宜'
};

const HOURLY_FORECAST = [
  { time: '08:00', temp: '18°C', wind: '2级', condition: '晴', level: 'good' },
  { time: '10:00', temp: '20°C', wind: '3级', condition: '晴', level: 'good' },
  { time: '12:00', temp: '24°C', wind: '3级', condition: '多云', level: 'good' },
  { time: '14:00', temp: '25°C', wind: '4级', condition: '多云', level: 'caution' },
  { time: '16:00', temp: '23°C', wind: '3级', condition: '阴', level: 'good' },
  { time: '18:00', temp: '20°C', wind: '2级', condition: '小雨', level: 'bad' },
  { time: '20:00', temp: '18°C', wind: '2级', condition: '小雨', level: 'bad' },
  { time: '22:00', temp: '16°C', wind: '1级', condition: '阴', level: 'caution' }
];

const WARNINGS = [
  { type: '大风预警', level: '黄色', time: '明日 06:00-14:00', desc: '预计风力5-6级，阵风7级' },
  { type: '雷电预警', level: '蓝色', time: '明日 14:00-20:00', desc: '午后可能出现雷暴天气' }
];

const Component = function FlightWeatherPage() {
  const handleNavigate = useCallback(function (key: string) {
    const baseUrl = window.location.origin;
    window.location.href = '/prototypes/' + key;
  }, []);

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
          { title: '气象信息' }
        ]} style={{ marginBottom: 24 }} />

        <Card style={{ borderRadius: 12, marginBottom: 24 }}>
          <Tabs
            defaultActiveKey="weather"
            items={[
              { key: 'dynamic', label: <span onClick={function () { handleNavigate('flight-dynamic'); }}>本地动态</span> },
              { key: 'airspace', label: <span onClick={function () { handleNavigate('flight-airspace'); }}>空域地图</span> },
              { key: 'weather', label: '气象信息' },
              { key: 'plan', label: <span onClick={function () { handleNavigate('flight-plan'); }}>提交飞行计划</span> }
            ]}
          />
        </Card>

        {WARNINGS.length > 0 && (
          <Card style={{ borderRadius: 12, marginBottom: 24, borderLeft: '4px solid #faad14' }}>
            <div style={{ display: 'flex', gap: 24 }}>
              {WARNINGS.map(function (w) {
                return (
                  <div key={w.type} style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                      <WarningOutlined style={{ color: '#faad14' }} />
                      <span style={{ fontWeight: 600, fontSize: 15 }}>{w.type}</span>
                      <Tag color={w.level === '黄色' ? 'gold' : 'blue'}>{w.level}预警</Tag>
                    </div>
                    <div style={{ fontSize: 13, color: '#595959' }}>{w.desc}</div>
                    <div style={{ fontSize: 12, color: '#8c8c8c', marginTop: 4 }}>⏰ {w.time}</div>
                  </div>
                );
              })}
            </div>
          </Card>
        )}

        <Row gutter={[24, 24]}>
          <Col xs={24} lg={10}>
            <Card title="🌤️ 当前天气" style={{ borderRadius: 12 }}>
              <div style={{ textAlign: 'center', marginBottom: 24 }}>
                <CloudOutlined style={{ fontSize: 56, color: '#1677ff', marginBottom: 12 }} />
                <div style={{ fontSize: 36, fontWeight: 700, color: '#1f1f1f' }}>{WEATHER_CURRENT.temp}</div>
                <div style={{ fontSize: 16, color: '#595959', marginTop: 4 }}>{WEATHER_CURRENT.condition}</div>
                <Tag color={WEATHER_CURRENT.flightLevel === '适宜' ? 'green' : 'orange'} style={{ marginTop: 8, fontSize: 14, padding: '4px 16px' }}>
                  飞行适宜度：{WEATHER_CURRENT.flightLevel}
                </Tag>
              </div>
              <Row gutter={16}>
                <Col span={12}>
                  <div style={{ padding: 12, background: '#f6ffed', borderRadius: 8, textAlign: 'center', marginBottom: 12 }}>
                    <div style={{ fontSize: 12, color: '#8c8c8c' }}>风力</div>
                    <div style={{ fontSize: 16, fontWeight: 600, color: '#389e0d' }}>{WEATHER_CURRENT.wind}</div>
                  </div>
                </Col>
                <Col span={12}>
                  <div style={{ padding: 12, background: '#e6f7ff', borderRadius: 8, textAlign: 'center', marginBottom: 12 }}>
                    <div style={{ fontSize: 12, color: '#8c8c8c' }}>湿度</div>
                    <div style={{ fontSize: 16, fontWeight: 600, color: '#0958d9' }}>{WEATHER_CURRENT.humidity}</div>
                  </div>
                </Col>
                <Col span={12}>
                  <div style={{ padding: 12, background: '#fff7e6', borderRadius: 8, textAlign: 'center', marginBottom: 12 }}>
                    <div style={{ fontSize: 12, color: '#8c8c8c' }}>能见度</div>
                    <div style={{ fontSize: 16, fontWeight: 600, color: '#d46b08' }}>{WEATHER_CURRENT.visibility}</div>
                  </div>
                </Col>
                <Col span={12}>
                  <div style={{ padding: 12, background: '#f9f0ff', borderRadius: 8, textAlign: 'center', marginBottom: 12 }}>
                    <div style={{ fontSize: 12, color: '#8c8c8c' }}>气压</div>
                    <div style={{ fontSize: 16, fontWeight: 600, color: '#531dab' }}>{WEATHER_CURRENT.pressure}</div>
                  </div>
                </Col>
              </Row>
            </Card>
          </Col>
          <Col xs={24} lg={14}>
            <Card title="⏰ 逐时预报" style={{ borderRadius: 12 }}>
              <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 8 }}>
                {HOURLY_FORECAST.map(function (h) {
                  var levelColor = h.level === 'good' ? '#52c41a' : h.level === 'caution' ? '#faad14' : '#ff4d4f';
                  var levelText = h.level === 'good' ? '适宜' : h.level === 'caution' ? '注意' : '不宜';
                  return (
                    <div key={h.time} style={{ minWidth: 90, padding: '12px 8px', borderRadius: 8, border: '1px solid #f0f0f0', textAlign: 'center', flexShrink: 0 }}>
                      <div style={{ fontSize: 13, color: '#8c8c8c', marginBottom: 4 }}>{h.time}</div>
                      <div style={{ fontSize: 16, fontWeight: 600, color: '#1f1f1f', marginBottom: 4 }}>{h.temp}</div>
                      <div style={{ fontSize: 12, color: '#595959', marginBottom: 4 }}>{h.condition}</div>
                      <div style={{ fontSize: 11, color: '#8c8c8c', marginBottom: 4 }}>{h.wind}</div>
                      <Tag color={levelColor} style={{ fontSize: 11 }}>{levelText}</Tag>
                    </div>
                  );
                })}
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Component;
