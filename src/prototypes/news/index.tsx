/**
 * @name 资讯公告
 * @mode axure
 * /Users/xu/Desktop/元引信息/Axhub-Make-main/skills/axure-export-workflow/SKILL.md
 *
 */

import './style.css';

import React, { useState, useCallback, forwardRef, useImperativeHandle } from 'react';
import { Card, Tag, Input, Row, Col, Pagination, Breadcrumb, Tabs, Empty } from 'antd';
import { SearchOutlined, CalendarOutlined, EyeOutlined, HomeOutlined, ReadOutlined, BellOutlined, NotificationOutlined, FileTextOutlined } from '@ant-design/icons';
import type { EventItem, Action, KeyDesc, ConfigItem, DataDesc, AxureProps, AxureHandle } from '../../common/axure-types';

const EVENT_LIST: EventItem[] = [
  { name: 'on_tab_change', desc: 'Tab 切换时触发，传递当前 tab 标识', payload: 'news | notice' },
  { name: 'on_news_click', desc: '点击新闻卡片时触发，传递新闻 ID', payload: 'string' },
  { name: 'on_notice_click', desc: '点击公告卡片时触发，传递公告 ID', payload: 'string' },
  { name: 'on_search', desc: '搜索时触发，传递当前搜索词和 tab', payload: 'JSON string' }
];

const ACTION_LIST: Action[] = [
  { name: 'switch_tab', desc: '切换 Tab，参数：news 或 notice', params: 'string' },
  { name: 'set_news_category', desc: '设置新闻分类筛选，参数：分类名称', params: 'string' },
  { name: 'set_notice_type', desc: '设置公告类型筛选，参数：类型 key', params: 'string' },
  { name: 'set_search_text', desc: '设置搜索关键词，参数格式：JSON 字符串 {"tab":"news|notice","text":"关键词"}', params: 'JSON string' },
  { name: 'reset_filter', desc: '重置所有筛选条件' }
];

const VAR_LIST: KeyDesc[] = [
  { name: 'active_tab', desc: '当前激活的 Tab（news / notice）' },
  { name: 'news_category', desc: '当前新闻分类筛选值' },
  { name: 'notice_type', desc: '当前公告类型筛选值' },
  { name: 'news_search_text', desc: '当前新闻搜索关键词' },
  { name: 'notice_search_text', desc: '当前公告搜索关键词' },
  { name: 'filtered_news_count', desc: '筛选后的新闻数量' },
  { name: 'filtered_notice_count', desc: '筛选后的公告数量' }
];

const CONFIG_LIST: ConfigItem[] = [];

const DATA_LIST: DataDesc[] = [
  {
    name: 'news_list',
    desc: '新闻资讯列表数据',
    keys: [
      { name: 'id', desc: '新闻唯一标识（数字）' },
      { name: 'title', desc: '新闻标题（字符串）' },
      { name: 'date', desc: '发布日期（字符串，YYYY-MM-DD）' },
      { name: 'category', desc: '新闻分类（字符串）' },
      { name: 'views', desc: '浏览量（数字）' },
      { name: 'summary', desc: '新闻摘要（字符串）' }
    ]
  },
  {
    name: 'notice_list',
    desc: '通知公告列表数据',
    keys: [
      { name: 'id', desc: '公告唯一标识（数字）' },
      { name: 'title', desc: '公告标题（字符串）' },
      { name: 'type', desc: '公告类型 key（字符串）' },
      { name: 'typeLabel', desc: '公告类型显示名称（字符串）' },
      { name: 'typeColor', desc: '类型标签颜色（字符串，十六进制色值）' },
      { name: 'publishDate', desc: '发布日期（字符串，YYYY-MM-DD）' },
      { name: 'effectiveDate', desc: '有效期（字符串）' },
      { name: 'isTop', desc: '是否置顶（布尔值）' },
      { name: 'content', desc: '公告正文内容（字符串）' }
    ]
  }
];

const NEWS_CATEGORIES = ['全部', '行业新闻', '技术前沿', '培训认证', '安全提示'];

const NEWS_LIST = [
  { id: 1, title: '低空经济示范区建设方案正式发布', date: '2026-04-20', effectDate: '2026-05-01', category: '行业新闻', isTop: true, views: 1280, summary: '为加快推进低空经济高质量发展，经国务院同意，现印发《低空经济示范区建设方案》。方案明确了未来三年低空经济示范区建设的总体目标、重点任务和保障措施，到2028年建设20个示范区，低空飞行器保有量达10万架以上，产业规模突破5000亿元。' },
  { id: 2, title: '全国首条城市低空物流航线开通运营', date: '2026-04-19', effectDate: '2026-05-15', category: '行业新闻', isTop: true, views: 956, summary: '今日上午，全国首条城市低空物流航线正式开通运营，标志着低空物流进入商业化阶段。该航线连接城市中心与周边产业园区，全长15公里，单程飞行时间约8分钟，可载重5公斤货物，日均执飞30架次，有效提升城市末端配送效率。' },
  { id: 3, title: '无人机驾驶员培训标准体系升级', date: '2026-04-18', effectDate: '2026-07-01', category: '培训认证', isTop: false, views: 743, summary: '民航局发布新版无人机驾驶员培训标准，新增城市低空飞行操作规范、复杂气象条件飞行、应急处理等培训模块，要求所有持证驾驶员在2026年底前完成补充培训并通过考核，全面提升飞手安全操作能力。' },
  { id: 4, title: '新型eVTOL完成适航审定首飞', date: '2026-04-17', effectDate: '2026-06-01', category: '技术前沿', isTop: false, views: 2105, summary: '国内首款载人eVTOL完成适航审定首次试飞，飞行时长45分钟，最大航程200公里，巡航速度250km/h，可搭载2名乘客。预计2027年投入商业运营，将率先在粤港澳大湾区开展城际空中出行服务试点。' },
  { id: 5, title: '低空空域安全管控系统上线', date: '2026-04-16', effectDate: '2026-04-16', category: '安全提示', isTop: false, views: 634, summary: '全国低空空域安全管控系统正式上线运行，实现空域动态监控与预警、飞行器实时追踪、电子围栏告警等功能，覆盖全国80%以上低空空域，日均处理飞行数据超过100万条，为低空飞行安全提供有力保障。' },
  { id: 6, title: '多城市低空交通规划获批', date: '2026-04-15', effectDate: '2026-06-01', category: '行业新闻', isTop: false, views: 892, summary: '交通运输部批复同意15个城市低空交通发展规划，总投资超200亿元，涵盖低空起降场建设、航线网络规划、飞行服务保障体系等内容，预计到2028年建成覆盖主要城市群的低空交通网络。' }
];

const NOTICE_TYPES = [
  { key: 'all', label: '全部' },
  { key: 'airspace', label: '空域通知' },
  { key: 'weather', label: '气象预警' },
  { key: 'activity', label: '活动通知' },
  { key: 'system', label: '系统公告' },
  { key: 'maintenance', label: '维护通知' }
];

const NOTICE_LIST = [
  {
    id: 1,
    title: '关于开展2026年第二季度飞行计划集中审批的通知',
    type: 'system',
    typeLabel: '系统公告',
    typeColor: '#1677ff',
    publishDate: '2026-04-21',
    effectiveDate: '2026-04-25 ~ 2026-05-10',
    isTop: true,
    content: '为做好2026年第二季度飞行计划的审批工作，现将有关事项通知如下：一、审批时间安排；二、申报材料要求；三、注意事项...'
  },
  {
    id: 2,
    title: '【气象预警】明日午后有雷暴天气，请合理安排飞行计划',
    type: 'weather',
    typeLabel: '气象预警',
    typeColor: '#fa8c16',
    publishDate: '2026-04-21',
    effectiveDate: '2026-04-22 14:00~20:00',
    isTop: true,
    content: '据市气象台预报，明日（4月22日）午后至傍晚时段可能出现雷暴天气，阵风可达7级。请各飞行主体提前调整计划。'
  },
  {
    id: 3,
    title: '南区训练空域临时管制通告（4月23日-25日）',
    type: 'airspace',
    typeLabel: '空域通知',
    typeColor: '#f5222d',
    publishDate: '2026-04-20',
    effectiveDate: '2026-04-23 00:00 ~ 2026-04-25 24:00',
    isTop: false,
    content: '因重大活动保障需要，南区训练空域将于4月23日至25日实施临时管制，期间禁止一切非授权飞行活动。'
  },
  {
    id: 4,
    title: '平台系统升级维护公告（4月26日凌晨）',
    type: 'maintenance',
    typeLabel: '维护通知',
    typeColor: '#8c8c8c',
    publishDate: '2026-04-19',
    effectiveDate: '2026-04-26 02:00 ~ 06:00',
    isTop: false,
    content: '为提升系统性能和用户体验，本平台将于4月26日凌晨2:00-6:00进行系统升级维护，届时服务将暂停访问。'
  },
  {
    id: 5,
    title: '关于举办"低空经济发展论坛"活动的通知',
    type: 'activity',
    typeLabel: '活动通知',
    typeColor: '#722ed1',
    publishDate: '2026-04-18',
    effectiveDate: '2026-05-08 09:00 ~ 17:00',
    isTop: false,
    content: '由市发改委主办的"区域低空经济发展论坛"将于5月8日在国际会展中心举行，诚邀各相关单位及个人报名参加。'
  },
  {
    id: 6,
    title: '东区巡检航线调整通知',
    type: 'airspace',
    typeLabel: '空域通知',
    typeColor: '#f5222d',
    publishDate: '2026-04-16',
    effectiveDate: '2026-05-01起长期有效',
    isTop: false,
    content: '因城市基础设施建设需要，东区巡检航线部分航段将于5月1日起进行调整，请相关用户注意查看新航线图。'
  }
];

const Component = forwardRef(function NewsPage(
  innerProps: AxureProps,
  ref: React.ForwardedRef<AxureHandle>,
) {
  const onEventHandler = typeof innerProps.onEvent === 'function'
    ? innerProps.onEvent
    : function () { return undefined; };

  const [activeTab, setActiveTab] = useState(function () {
    var params = new URLSearchParams(window.location.search);
    return params.get('tab') === 'notice' ? 'notice' : 'news';
  });
  const [selectedNewsCategory, setSelectedNewsCategory] = useState('全部');
  const [selectedNoticeType, setSelectedNoticeType] = useState('all');
  const [newsSearchText, setNewsSearchText] = useState('');
  const [noticeSearchText, setNoticeSearchText] = useState('');

  const handleNavigate = useCallback(function (key: string) {
    window.location.href = '/prototypes/' + key;
  }, []);

  const emitEvent = useCallback(function (eventName: string, payload?: string) {
    try { onEventHandler(eventName, payload); } catch (e) { /* noop */ }
  }, [onEventHandler]);

  var filteredNews = NEWS_LIST.filter(function (n) {
    var matchCategory = selectedNewsCategory === '全部' || n.category === selectedNewsCategory;
    var matchSearch = !newsSearchText || n.title.includes(newsSearchText);
    return matchCategory && matchSearch;
  });

  var filteredNotices = NOTICE_LIST.filter(function (n) {
    var matchType = selectedNoticeType === 'all' || n.type === selectedNoticeType;
    var matchSearch = !noticeSearchText || n.title.includes(noticeSearchText);
    return matchType && matchSearch;
  });

  useImperativeHandle(ref, function () {
    return {
      getVar: function (name: string) {
        var vars: Record<string, any> = {
          active_tab: activeTab,
          news_category: selectedNewsCategory,
          notice_type: selectedNoticeType,
          news_search_text: newsSearchText,
          notice_search_text: noticeSearchText,
          filtered_news_count: filteredNews.length,
          filtered_notice_count: filteredNotices.length
        };
        return vars[name];
      },
      fireAction: function (name: string, params?: string) {
        switch (name) {
          case 'switch_tab':
            if (params === 'news' || params === 'notice') setActiveTab(params);
            break;
          case 'set_news_category':
            if (params) setSelectedNewsCategory(params);
            break;
          case 'set_notice_type':
            if (params) setSelectedNoticeType(params);
            break;
          case 'set_search_text':
            if (params) {
              try {
                var parsed = JSON.parse(params);
                if (parsed.tab === 'news') setNewsSearchText(parsed.text || '');
                else if (parsed.tab === 'notice') setNoticeSearchText(parsed.text || '');
              } catch (e) { /* noop */ }
            }
            break;
          case 'reset_filter':
            setSelectedNewsCategory('全部');
            setSelectedNoticeType('all');
            setNewsSearchText('');
            setNoticeSearchText('');
            break;
          default:
            console.warn('未知的动作:', name);
        }
      },
      eventList: EVENT_LIST,
      actionList: ACTION_LIST,
      varList: VAR_LIST,
      configList: CONFIG_LIST,
      dataList: DATA_LIST
    };
  }, [activeTab, selectedNewsCategory, selectedNoticeType, newsSearchText, noticeSearchText, filteredNews.length, filteredNotices.length]);

  return (
    <div style={{ minHeight: '100vh', background: '#f5f5f5' }}>
      <header style={{ background: 'linear-gradient(135deg, #0c4a6e 0%, #1677ff 100%)', padding: '0 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }} onClick={function () { handleNavigate('home'); }}>
            <ReadOutlined style={{ fontSize: 20, color: '#fff' }} />
            <span style={{ fontSize: 16, fontWeight: 600, color: '#fff' }}>区域低空公共服务平台</span>
          </div>
          <div style={{ display: 'flex', gap: 16 }}>
            <a style={{ color: 'rgba(255,255,255,0.85)', cursor: 'pointer' }} onClick={function () { handleNavigate('home'); }}>首页</a>
            <a style={{ color: '#fff', fontWeight: 600, cursor: 'pointer' }}>资讯公告</a>
            <a style={{ color: 'rgba(255,255,255,0.85)', cursor: 'pointer' }} onClick={function () { handleNavigate('policy-national'); }}>政策法规</a>
            <a style={{ color: 'rgba(255,255,255,0.85)', cursor: 'pointer' }} onClick={function () { handleNavigate('service-list'); }}>低空服务</a>
            <a style={{ color: 'rgba(255,255,255,0.85)', cursor: 'pointer' }} onClick={function () { handleNavigate('mall-list'); }}>低空商城</a>
            <a style={{ color: 'rgba(255,255,255,0.85)', cursor: 'pointer' }} onClick={function () { handleNavigate('flight-dynamic'); }}>飞行服务</a>
            <a style={{ color: 'rgba(255,255,255,0.85)', cursor: 'pointer' }} onClick={function () { handleNavigate('login'); }}>登录</a>
          </div>
        </div>
      </header>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px 24px 48px' }}>
        <Breadcrumb items={[
          { title: '资讯公告' },
          { title: activeTab === 'news' ? '新闻资讯' : '通知公告' }
        ]} style={{ marginBottom: 24 }} />

        <Card style={{ borderRadius: 12, marginBottom: 24 }}>
          <Tabs
            activeKey={activeTab}
            onChange={setActiveTab}
            size="large"
            items={[
              {
                key: 'news',
                label: <span style={{ fontSize: 15, fontWeight: 500 }}><FileTextOutlined style={{ marginRight: 6 }} /> 新闻资讯</span>,
                children: (
                  <div>
                    <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap', marginTop: 12, marginBottom: 16 }}>
                      <Input
                        prefix={<SearchOutlined />}
                        placeholder="搜索新闻..."
                        value={newsSearchText}
                        onChange={function (e) { setNewsSearchText(e.target.value); }}
                        style={{ width: 280 }}
                        allowClear
                      />
                      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                        {NEWS_CATEGORIES.map(function (cat) {
                          return (
                            <Tag
                              key={cat}
                              color={selectedNewsCategory === cat ? '#1677ff' : undefined}
                              style={{ cursor: 'pointer', padding: '4px 14px', fontSize: 13, borderRadius: 16 }}
                              onClick={function () { setSelectedNewsCategory(cat); }}
                            >
                              {cat}
                            </Tag>
                          );
                        })}
                      </div>
                    </div>

                    {filteredNews.length > 0 ? (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                        {filteredNews.map(function (news) {
                          return (
                            <Card
                              key={news.id}
                              hoverable
                              onClick={function () { handleNavigate('news-detail'); }}
                              style={{ borderRadius: 10, borderLeft: '3px solid #1677ff', cursor: 'pointer', position: 'relative' }}
                            >
                              {news.isTop && (
                                <Tag color="red" style={{ position: 'absolute', top: -8, right: 16, zIndex: 1 }}>置顶</Tag>
                              )}
                              <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                                <div style={{
                                  flexShrink: 0,
                                  width: 44,
                                  height: 44,
                                  borderRadius: '50%',
                                  background: '#1677ff15',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center'
                                }}>
                                  <FileTextOutlined style={{ fontSize: 20, color: '#1677ff' }} />
                                </div>
                                <div style={{ flex: 1, minWidth: 0 }}>
                                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 6 }}>
                                    <Tag color="blue" style={{ fontSize: 12 }}>{news.category}</Tag>
                                    <h3 style={{ fontSize: 15, fontWeight: 600, color: '#1f1f1f', margin: 0, flex: 1, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{news.title}</h3>
                                  </div>
                                  <p style={{ fontSize: 13, color: '#595959', lineHeight: 1.7, marginBottom: 8 }}>{news.summary}</p>
                                  <div style={{ display: 'flex', gap: 16, fontSize: 12, color: '#bfbfbf' }}>
                                    <span><CalendarOutlined /> 实施日期：{news.effectDate}</span>
                                  </div>
                                </div>
                              </div>
                            </Card>
                          );
                        })}
                      </div>
                    ) : (
                      <Empty description="暂无相关新闻" style={{ padding: '48px 0' }} />
                    )}

                    <div style={{ textAlign: 'center', marginTop: 32 }}>
                      <Pagination defaultCurrent={1} total={50} />
                    </div>
                  </div>
                )
              },
              {
                key: 'notice',
                label: <span style={{ fontSize: 15, fontWeight: 500 }}><BellOutlined style={{ marginRight: 6 }} /> 通知公告</span>,
                children: (
                  <div>
                    <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap', marginTop: 12, marginBottom: 16 }}>
                      <Input
                        prefix={<SearchOutlined />}
                        placeholder="搜索公告..."
                        value={noticeSearchText}
                        onChange={function (e) { setNoticeSearchText(e.target.value); }}
                        style={{ width: 280 }}
                        allowClear
                      />
                      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                        {NOTICE_TYPES.map(function (t) {
                          return (
                            <Tag
                              key={t.key}
                              color={selectedNoticeType === t.key ? '#eb2f96' : undefined}
                              style={{ cursor: 'pointer', padding: '4px 14px', fontSize: 13, borderRadius: 16 }}
                              onClick={function () { setSelectedNoticeType(t.key); }}
                            >
                              {t.label}
                            </Tag>
                          );
                        })}
                      </div>
                    </div>

                    {filteredNotices.length > 0 ? (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                        {filteredNotices.map(function (notice) {
                          return (
                            <Card
                              key={notice.id}
                              hoverable
                              onClick={function () { handleNavigate('notice-detail'); }}
                              style={{
                                borderRadius: 10,
                                borderLeft: '3px solid ' + notice.typeColor,
                                position: 'relative',
                                cursor: 'pointer'
                              }}
                            >
                              {notice.isTop && (
                                <Tag color="red" style={{ position: 'absolute', top: -8, right: 16, zIndex: 1 }}>置顶</Tag>
                              )}
                              <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                                <div style={{
                                  flexShrink: 0,
                                  width: 44,
                                  height: 44,
                                  borderRadius: '50%',
                                  background: notice.typeColor + '15',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center'
                                }}>
                                  <NotificationOutlined style={{ fontSize: 20, color: notice.typeColor }} />
                                </div>
                                <div style={{ flex: 1, minWidth: 0 }}>
                                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 6 }}>
                                    <Tag color={notice.typeColor} style={{ fontSize: 12 }}>{notice.typeLabel}</Tag>
                                    <h3 style={{ fontSize: 15, fontWeight: 600, color: '#1f1f1f', margin: 0, flex: 1, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{notice.title}</h3>
                                  </div>
                                  <p style={{ fontSize: 13, color: '#595959', lineHeight: 1.7, marginBottom: 8, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{notice.content}</p>
                                  <div style={{ display: 'flex', gap: 16, fontSize: 12, color: '#bfbfbf' }}>
                                    <span><CalendarOutlined /> 发布时间：{notice.publishDate}</span>
                                  </div>
                                </div>
                              </div>
                            </Card>
                          );
                        })}
                      </div>
                    ) : (
                      <Empty description="暂无相关公告" style={{ padding: '48px 0' }} />
                    )}

                    <div style={{ textAlign: 'center', marginTop: 32 }}>
                      <Pagination defaultCurrent={1} total={30} />
                    </div>
                  </div>
                )
              }
            ]}
          />
        </Card>
      </div>
    </div>
  );
});

export default Component;
