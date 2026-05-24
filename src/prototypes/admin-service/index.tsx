/**
 * @name 低空服务发布审核
 * @mode axure
 */
import './style.css';
import React, { useState } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { Card, Table, Tag, Button, Breadcrumb, Space, Modal, Input, Select, message, Tooltip, Descriptions, Tabs, Popconfirm, Divider, Timeline } from 'antd';
import { EyeOutlined, SearchOutlined, CheckCircleOutlined, RocketOutlined, AuditOutlined, CloseCircleOutlined, HistoryOutlined, EnvironmentOutlined, ClockCircleOutlined, ToolOutlined, FileDoneOutlined, UserOutlined, PhoneOutlined, PaperClipOutlined } from '@ant-design/icons';

var SERVICE_CATEGORIES = [
  { value: 'industry', label: '行业应用' },
  { value: 'photo', label: '航拍影像' },
  { value: 'training', label: '飞行培训' },
  { value: 'tourism', label: '低空旅游' },
  { value: 'service', label: '飞行器服务' },
  { value: 'other', label: '其它定制服务' }
];

var CATEGORY_MAP: Record<string, string> = {
  industry: '行业应用',
  photo: '航拍影像',
  training: '飞行培训',
  tourism: '低空旅游',
  service: '飞行器服务',
  other: '其它定制服务'
};

var CATEGORY_COLORS: Record<string, string> = {
  industry: 'cyan',
  photo: 'blue',
  training: 'purple',
  tourism: 'orange',
  service: 'green',
  other: 'magenta'
};

var SERVICE_DATA = [
  { 
    key: '1', 
    id: 'SRV-2026-001', 
    name: '高精度无人机倾斜摄影与航拍测绘', 
    category: 'photo', 
    provider: 'XX测绘科技有限公司', 
    contact: '王经理', 
    phone: '13811112222', 
    time: '2026-04-20 14:00:00', 
    status: 'normal', 
    isFree: 'no', 
    price: '¥800/平方公里', 
    area: '浙江省全省', 
    duration: '3个月有效',
    equipment: '大疆 Matrice 300 RTK、飞马 D200',
    delivery: '高精度正射影像、三维模型文件、测绘成果报告',
    coverImage: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?w=500&auto=format&fit=crop&q=60',
    highlights: '行业顶尖设备、民航局认证飞手、双重保密安全协议',
    qualification: '中华人民共和国测绘航空摄影乙级资质、民用无人驾驶航空器运营合格证.pdf',
    desc: '<p>专业团队提供高精度无人机倾斜摄影与航拍测绘服务：</p><ul><li><b>厘米级精度：</b>采用大疆定制RTK设备，确保高精度定位与测量。</li><li><b>全景三维建模：</b>支持精细化三维场景重建，输出高画质模型。</li><li><b>专业报告：</b>提供国家标准测绘报告。</li></ul>',
    auditHistory: [{ time: '2026-04-20 14:00:00', action: 'approve', operator: '高级审核员', remark: '资质核验通过，服务内容符合发布规范。' }] 
  },
  { 
    key: '2', 
    id: 'SRV-2026-002', 
    name: '大面积农林植保喷洒作业', 
    category: 'industry', 
    provider: '蓝天农业服务部', 
    contact: '张总', 
    phone: '13911113333', 
    time: '2026-04-21 09:30:15', 
    status: 'normal', 
    isFree: 'no', 
    price: '¥10/亩', 
    area: '杭州市及周边区域', 
    duration: '随约随到，长期有效',
    equipment: '大疆 T40 农业无人机',
    delivery: '作业面积及喷洒量GPS轨迹报告',
    coverImage: 'https://images.unsplash.com/photo-1563514220747-a18737927bb9?w=500&auto=format&fit=crop&q=60',
    highlights: '高效大载重、精准喷雾无盲区、持证专业飞手',
    qualification: '民用无人驾驶航空器运营合格证.pdf',
    desc: '<p>采用大疆最新T40农业无人机，支持大面积果树、水稻、小麦等作物的喷洒和植保作业：</p><ul><li><b>超大载重：</b>40公斤载重，喷洒效率极高。</li><li><b>精准喷洒：</b>离心雾化喷洒系统，药液分布更均匀。</li><li><b>自主避障：</b>全向主动避障雷达，安全飞行更有保障。</li></ul>',
    auditHistory: [{ time: '2026-04-21 09:30:15', action: 'approve', operator: '系统自动审核', remark: '标准业务模板，合规条件通过。' }] 
  },
  { 
    key: '3', 
    id: 'SRV-2026-003', 
    name: '城市空中观光体验飞行', 
    category: 'tourism', 
    provider: '星图测绘航拍公司', 
    contact: '王工', 
    phone: '13800008888', 
    time: '2026-05-21 16:00:00', 
    status: 'pending', 
    isFree: 'no', 
    price: '¥299/人', 
    area: '郑州市核心城区（中原福塔及周边）', 
    duration: '30分钟/次',
    equipment: '阿若拉 SA60L 运动飞机 / 直升机',
    delivery: '飞行体验证书、首飞纪念影集',
    coverImage: 'https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=500&auto=format&fit=crop&q=60',
    highlights: '上帝视角瞰城市、双备份安全保障、赠送高清首飞纪念视频',
    qualification: '民用无人驾驶航空器运营合格证、低空旅游经营许可（试点）.pdf',
    desc: '<p>想体验飞上蓝天，俯瞰整座城市的震撼与魅力吗？</p><p>本空中观光体验服务提供专业飞行员带飞，安全可靠，视野绝佳！</p><ul><li><b>双人同行优惠：</b>两人以上享受85折优惠。</li><li><b>安全保障：</b>全包飞行责任险，双发动机配置直升机，多重安全冗余。</li><li><b>空中拍照：</b>赠送高空全景合影，提供第一人称视角的飞行录像。</li></ul>',
    auditHistory: [
      { time: '2026-05-10 10:00:00', action: 'approve', operator: '审核专员A', remark: '首次提交：资质与经营范围契合，核准通过。' },
      { time: '2026-05-18 14:00:00', action: 'offline', operator: '星图商户(前台自主下架)', remark: '下架原因：因直升机例行大修保养，暂停前台在线预约。' },
      { 
        time: '2026-05-19 09:00:00', 
        action: 'submit', 
        operator: '星图商户', 
        remark: '第一次申请重新发布：检修保养结束，申请重新发布上架。',
        details: [
          { label: '服务时长/有效期', oldVal: '例检保养暂停', newVal: '30分钟/次' },
          { label: '投入设备/作业机型', oldVal: '暂停例检中', newVal: '阿若拉 SA60L 运动飞机 / 直升机' }
        ]
      },
      { time: '2026-05-20 11:00:00', action: 'reject', operator: '特种运营审核员', remark: '第一次驳回原因：上架申请材料中，附加特种低空飞行经营合格证已过有效期，请重新上传最新年审资质文件。' },
      { 
        time: '2026-05-21 16:00:00', 
        action: 'submit', 
        operator: '星图商户(重新申请发布)', 
        remark: '第二次重新提交，重新上传了最新年检通过的特种飞行经营资质文件：',
        details: [
          { label: '资质/证书文件', oldVal: '低空旅游经营许可（已过期）', newVal: '低空旅游经营许可（最新年审合格版）.pdf' }
        ]
      }
    ] 
  },
  { 
    key: '4', 
    id: 'SRV-2026-004', 
    name: '无人机物流配送试点服务', 
    category: 'industry', 
    provider: '星图测绘航拍公司', 
    contact: '王工', 
    phone: '13800008888', 
    time: '2026-05-19 10:30:00', 
    status: 'pending', 
    isFree: 'no', 
    price: '¥50/单', 
    area: '郑州市高新区及指定配送航线', 
    duration: '单次配送，随约随到',
    equipment: '大疆 FlyCart 30 运输无人机',
    delivery: '货物安全送达签收凭证、配送轨迹数据',
    coverImage: 'https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=500&auto=format&fit=crop&q=60',
    highlights: '中短途秒级送达、全天候高可靠性、智能化无接触配送',
    qualification: '民用无人驾驶航空器运营合格证.pdf',
    desc: '<p>针对急件、生鲜或特殊地势的高效物流转运，提供无人机中短距离末端配送试点服务：</p><ul><li><b>快速响应：</b>10公里范围内最快15分钟送达。</li><li><b>超强抗风：</b>可抗8级风力，雨雪天气均可安全作业。</li><li><b>智能吊装：</b>支持索降和货箱双模式，无需降落即可完成收发货。</li></ul>',
    auditHistory: [{ time: '2026-05-19 10:30:00', action: 'submit', operator: '星图商户', remark: '首次发布服务上架。' }] 
  },
  { 
    key: '5', 
    id: 'SRV-2026-005', 
    name: '高空清洗无人机服务', 
    category: 'industry', 
    provider: '某清洁公司', 
    contact: '刘经理', 
    phone: '13912345678', 
    time: '2026-05-10 09:00:00', 
    status: 'rejected', 
    isFree: 'no', 
    price: '¥800/次', 
    area: '郑州市全域', 
    duration: '单次清洗，按天计费',
    equipment: '自研高空清洗专业无人机',
    delivery: '建筑外墙清洗完毕高清验收照片',
    coverImage: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=500&auto=format&fit=crop&q=60',
    highlights: '高效替代人工、高空作业零风险、物理环保无污染',
    qualification: '暂无资质证书文件',
    desc: '<p>高层玻璃幕墙、光伏板和公共建筑的高空无人物理清洗服务，大幅降低高空作业人员安全风险：</p><ul><li><b>超高效率：</b>单台设备清洗效率为人工擦窗的5-8倍。</li><li><b>水力增压：</b>配备大功率增压水枪与特质清洗剂，强力去污不伤玻璃。</li><li><b>绝对安全：</b>物理限位与高空防坠双保障。</li></ul>',
    rejectReason: '服务资质文件不清晰，请重新上传高清版营业执照与相关资质证明后再次提交。', 
    rejectTime: '2026-05-11 14:00:00', 
    auditHistory: [
      { time: '2026-05-10 09:00:00', action: 'submit', operator: '商户账号', remark: '首次提交发布申请。' },
      { time: '2026-05-11 14:00:00', action: 'reject', operator: '系统审核员', remark: '服务资质文件不清晰，请重新上传高清版营业执照与相关资质证明后再次提交。' }
    ] 
  }
];

var STATUS_LABEL: Record<string, string> = { normal: '已通过', pending: '待审核', rejected: '已驳回' };
var STATUS_COLOR: Record<string, string> = { normal: 'green', pending: 'orange', rejected: 'red' };

var Component = function AdminServicePage() {
  var [serviceData, setServiceData] = useState(SERVICE_DATA);
  var [activeTab, setActiveTab] = useState('all');
  var [viewOpen, setViewOpen] = useState(false);
  var [currentRecord, setCurrentRecord] = useState<any>(null);
  var [rejectReason, setRejectReason] = useState('');

  var [searchText, setSearchText] = useState('');
  var [searchStatus, setSearchStatus] = useState<string | undefined>(undefined);
  var [filterQuery, setFilterQuery] = useState({ text: '', status: undefined as string | undefined });

  var handleSearch = function () {
    setFilterQuery({ text: searchText, status: searchStatus });
  };

  var handleReset = function () {
    setSearchText('');
    setSearchStatus(undefined);
    setFilterQuery({ text: '', status: undefined });
  };

  var handleApprove = function () {
    if (currentRecord) {
      var auditTime = '2026-05-22 09:47:00';
      setServiceData(function (prev) {
        return prev.map(function (item) {
          if (item.key === currentRecord.key) {
            var history = item.auditHistory ? [].concat(item.auditHistory) : [];
            history.push({
              time: auditTime,
              action: 'approve',
              operator: '当前管理员',
              remark: '运营审核通过，同意发布上线。'
            });
            var updated = Object.assign({}, item, { status: 'normal', auditHistory: history });
            setCurrentRecord(updated);
            return updated;
          }
          return item;
        });
      });
      message.success('审核通过！该服务已上架展示。');
      setViewOpen(false);
    }
  };

  var handleReject = function () {
    if (!rejectReason.trim()) { message.warning('请输入驳回原因'); return; }
    if (currentRecord) {
      var auditTime = '2026-05-22 09:47:00';
      setServiceData(function (prev) {
        return prev.map(function (item) {
          if (item.key === currentRecord.key) {
            var history = item.auditHistory ? [].concat(item.auditHistory) : [];
            history.push({
              time: auditTime,
              action: 'reject',
              operator: '当前管理员',
              remark: rejectReason
            });
            var updated = Object.assign({}, item, {
              status: 'rejected',
              rejectReason: rejectReason,
              rejectTime: auditTime,
              auditHistory: history
            });
            setCurrentRecord(updated);
            return updated;
          }
          return item;
        });
      });
      message.success('已驳回该服务申请。');
      setViewOpen(false);
      setRejectReason('');
    }
  };

  var columns = [
    { title: '服务编号', dataIndex: 'id', key: 'id', width: 130, render: function (id: string) { return <code style={{ color: '#595959', fontWeight: 600 }}>{id}</code>; } },
    { title: '服务名称', dataIndex: 'name', key: 'name', width: 240, render: function (t: string, record: any) { 
      return <a style={{ fontWeight: 500, color: '#1677ff' }} onClick={function () { setCurrentRecord(record); setViewOpen(true); }}>{t}</a>; 
    } },
    { title: '服务类别', dataIndex: 'category', key: 'category', width: 120, render: function (cat: string) { 
      return <Tag color={CATEGORY_COLORS[cat] || 'blue'}>{CATEGORY_MAP[cat] || cat}</Tag>; 
    } },
    { title: '是否免费', dataIndex: 'isFree', key: 'isFree', width: 100, render: function (free: string) { 
      return free === 'yes' ? <Tag color="green">免费服务</Tag> : <Tag color="orange">收费服务</Tag>;
    } },
    { title: '服务价格', dataIndex: 'price', key: 'price', width: 130, render: function (t: string) { 
      return <span style={{ color: '#ff4d4f', fontWeight: 600 }}>{t}</span>; 
    } },
    { title: '发布方', dataIndex: 'provider', key: 'provider', width: 160 },
    { title: '发布时间', dataIndex: 'time', key: 'time', width: 160 },
    { title: '审核状态', dataIndex: 'status', key: 'status', width: 100, render: function (s: string) { return <Tag color={STATUS_COLOR[s] || 'default'}>{STATUS_LABEL[s] || s}</Tag>; } },
    { title: '操作', key: 'action', width: 120, fixed: 'right' as const, render: function (_: any, record: any) {
      return (<Space size={4}>
        <Tooltip title="查看详情"><Button type="text" size="small" icon={<EyeOutlined />} style={{ color: '#1677ff' }} onClick={function () { setCurrentRecord(record); setViewOpen(true); }} /></Tooltip>
        {record.status === 'pending' && (<Tooltip title="审核处理"><Button type="text" size="small" icon={<AuditOutlined />} style={{ color: '#722ed1' }} onClick={function () { setCurrentRecord(record); setRejectReason(''); setViewOpen(true); }} /></Tooltip>)}
      </Space>);
    }}
  ];

  var tabItems = [
    { key: 'all', label: '全部 (' + serviceData.length + ')' },
    { key: 'pending', label: '待审核 (' + serviceData.filter(function (d) { return d.status === 'pending'; }).length + ')' },
    { key: 'normal', label: '已通过 (' + serviceData.filter(function (d) { return d.status === 'normal'; }).length + ')' },
    { key: 'rejected', label: '已驳回 (' + serviceData.filter(function (d) { return d.status === 'rejected'; }).length + ')' }
  ];

  var filteredData = serviceData.filter(function (d) {
    var matchTab = activeTab === 'all' || d.status === activeTab;
    var matchSearchStatus = !filterQuery.status || d.status === filterQuery.status;
    var matchText = !filterQuery.text || 
      d.name.toLowerCase().indexOf(filterQuery.text.toLowerCase()) > -1 || 
      d.id.toLowerCase().indexOf(filterQuery.text.toLowerCase()) > -1 || 
      d.provider.toLowerCase().indexOf(filterQuery.text.toLowerCase()) > -1;
    return matchTab && matchSearchStatus && matchText;
  });

  return (
    <AdminLayout activeKey="admin-service">
      <div style={{ maxWidth: 1400, margin: '0 auto', padding: 24 }}>
        <Breadcrumb items={[{ title: '业务审核' }, { title: '低空服务发布审核' }]} style={{ marginBottom: 16 }} />
        <Card style={{ borderRadius: 12 }}>
          <div style={{ display: 'flex', gap: 12, marginBottom: 16, flexWrap: 'wrap' }}>
            <Input prefix={<SearchOutlined />} placeholder="搜索服务名称/编号/发布方" style={{ width: 240 }} value={searchText} onChange={function (e) { setSearchText(e.target.value); }} onPressEnter={handleSearch} allowClear />
            <Select placeholder="审核状态" style={{ width: 120 }} options={[{ value: 'pending', label: '待审核' }, { value: 'normal', label: '已通过' }, { value: 'rejected', label: '已驳回' }]} value={searchStatus} onChange={setSearchStatus} allowClear />
            <Button type="primary" icon={<SearchOutlined />} onClick={handleSearch}>检索</Button>
            <Button onClick={handleReset}>重置</Button>
          </div>
          <Tabs activeKey={activeTab} onChange={setActiveTab} items={tabItems} style={{ marginBottom: 0 }} />
          <Table columns={columns} dataSource={filteredData} pagination={{ pageSize: 10, total: filteredData.length, showTotal: function(t){return '共 '+t+' 项';} }} scroll={{ x: 1200 }} />
        </Card>
      </div>

      <Modal
        title={
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <RocketOutlined style={{ color: '#1677ff' }} />
            <span>低空服务详情监管</span>
          </div>
        }
        open={viewOpen}
        onCancel={function () { setViewOpen(false); }}
        width={850}
        footer={
          currentRecord && currentRecord.status === 'pending' ? [
            <Button key="close" onClick={function () { setViewOpen(false); }}>关闭</Button>,
            <Button key="reject" danger onClick={handleReject} icon={<CloseCircleOutlined />}>驳回申请</Button>,
            <Popconfirm key="approve" title="确认审核通过？" onConfirm={handleApprove}>
              <Button type="primary" style={{ background: '#52c41a', borderColor: '#52c41a' }} icon={<CheckCircleOutlined />}>审核通过</Button>
            </Popconfirm>
          ] : [
            <Button key="close" onClick={function () { setViewOpen(false); }}>关闭</Button>
          ]
        }
      >
        {currentRecord && (
          <div style={{ marginTop: 16 }}>
            <div style={{ display: 'flex', gap: 16, marginBottom: 24, padding: 16, background: currentRecord.status === 'normal' ? '#f6ffed' : currentRecord.status === 'pending' ? '#fffbe6' : '#fff1f0', border: '1px solid', borderColor: currentRecord.status === 'normal' ? '#b7eb8f' : currentRecord.status === 'pending' ? '#ffe58f' : '#ffccc7', borderRadius: 8 }}>
              {currentRecord.coverImage ? (
                <img src={currentRecord.coverImage} alt={currentRecord.name} style={{ width: 120, height: 80, objectFit: 'cover', borderRadius: 6, border: '1px solid #d9d9d9' }} />
              ) : (
                <RocketOutlined style={{ fontSize: 40, color: currentRecord.status === 'normal' ? '#52c41a' : currentRecord.status === 'pending' ? '#fa8c16' : '#ff4d4f', padding: 8 }} />
              )}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 4 }}>
                  {currentRecord.name}
                  <Tag color={STATUS_COLOR[currentRecord.status]} style={{ marginLeft: 12 }}>{STATUS_LABEL[currentRecord.status]}</Tag>
                </div>
                <div style={{ color: '#595959', fontSize: 13 }}>服务编号: <code>{currentRecord.id}</code> | 发布时间: {currentRecord.time}</div>
              </div>
              <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{ fontSize: 12, color: '#8c8c8c' }}>服务价格</div>
                <div style={{ fontSize: 22, fontWeight: 600, color: '#ff4d4f' }}>{currentRecord.price}</div>
                <div>{currentRecord.isFree === 'yes' ? <Tag color="green" style={{ marginRight: 0, marginTop: 4 }}>免费服务</Tag> : <Tag color="orange" style={{ marginRight: 0, marginTop: 4 }}>收费服务</Tag>}</div>
              </div>
            </div>

            <Descriptions column={2} bordered size="small" style={{ marginBottom: 16 }}>
              <Descriptions.Item label="服务类别">
                <Tag color={CATEGORY_COLORS[currentRecord.category] || 'blue'}>{CATEGORY_MAP[currentRecord.category] || currentRecord.category}</Tag>
              </Descriptions.Item>
              <Descriptions.Item label="服务区域">
                <span><EnvironmentOutlined style={{ color: '#1677ff', marginRight: 4 }} />{currentRecord.area}</span>
              </Descriptions.Item>
              <Descriptions.Item label="服务时长/有效期">
                <span><ClockCircleOutlined style={{ color: '#fa8c16', marginRight: 4 }} />{currentRecord.duration}</span>
              </Descriptions.Item>
              <Descriptions.Item label="投入设备/作业机型">
                <span><ToolOutlined style={{ color: '#722ed1', marginRight: 4 }} />{currentRecord.equipment}</span>
              </Descriptions.Item>
              <Descriptions.Item label="交付标准/成果物" span={2}>
                <span><FileDoneOutlined style={{ color: '#52c41a', marginRight: 4 }} />{currentRecord.delivery}</span>
              </Descriptions.Item>
              <Descriptions.Item label="服务亮点" span={2}>
                {currentRecord.highlights ? (
                  currentRecord.highlights.split('、').map(function(hl: string, idx: number) {
                    return <Tag color="processing" key={idx} style={{ marginBottom: 2 }}>{hl}</Tag>;
                  })
                ) : '无'}
              </Descriptions.Item>
              <Descriptions.Item label="发布主体/单位">
                {currentRecord.provider}
              </Descriptions.Item>
              <Descriptions.Item label="联系人及方式">
                <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <span><UserOutlined style={{ color: '#8c8c8c', marginRight: 4 }} />{currentRecord.contact}</span>
                  <span><PhoneOutlined style={{ color: '#8c8c8c', marginRight: 4 }} />{currentRecord.phone}</span>
                </div>
              </Descriptions.Item>
              <Descriptions.Item label="资质/证书文件" span={2}>
                {currentRecord.qualification ? (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: '#f5f5f5', padding: '6px 12px', borderRadius: 4, border: '1px solid #d9d9d9', maxWidth: 'fit-content' }}>
                    <PaperClipOutlined style={{ color: '#8c8c8c' }} />
                    <span style={{ fontSize: 13, color: '#262626' }}>{currentRecord.qualification}</span>
                    {currentRecord.qualification !== '暂无资质证书文件' && currentRecord.qualification !== '无相关资质证明' && (
                      <a style={{ fontSize: 12, marginLeft: 8 }} onClick={function () { message.success('正在模拟下载资质证明文件...'); }}>下载查看</a>
                    )}
                  </div>
                ) : '暂无'}
              </Descriptions.Item>
              <Descriptions.Item label="服务详细描述" span={2}>
                <div 
                  className="rich-text-container" 
                  style={{ maxHeight: 200, overflowY: 'auto', background: '#fafafa', padding: 12, borderRadius: 6, border: '1px solid #f0f0f0', lineHeight: 1.8 }}
                  dangerouslySetInnerHTML={{ __html: currentRecord.desc }}
                />
              </Descriptions.Item>
            </Descriptions>

            {currentRecord.auditHistory && currentRecord.auditHistory.length > 0 && (
              <div style={{ marginTop: 24, marginBottom: 24, padding: 16, background: '#f5f7fa', border: '1px solid #e4e7ed', borderRadius: 8 }}>
                <div style={{ fontWeight: 600, color: '#002c8c', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 6, fontSize: 14 }}>
                  <HistoryOutlined /> 历史审批与重新提交记录
                </div>
                <Timeline
                  style={{ marginTop: 8 }}
                  items={currentRecord.auditHistory.map(function (hist: any, idx: number) {
                    var color = hist.action === 'approve' ? 'green' : hist.action === 'reject' ? 'red' : hist.action === 'offline' ? 'gray' : 'blue';
                    
                    var firstSubmitIdx = currentRecord.auditHistory.findIndex(function (h: any) {
                      return h.action === 'submit';
                    });
                    
                    var submitTotalIndex = currentRecord.auditHistory.slice(0, idx + 1).filter(function (h: any) {
                      return h.action === 'submit';
                    }).length;
                    
                    var isResubmit = hist.action === 'submit' && idx !== firstSubmitIdx;
                    
                    var label = hist.action === 'approve'
                      ? '审批通过'
                      : hist.action === 'reject'
                        ? '审批驳回'
                        : hist.action === 'offline'
                          ? '自主下架'
                          : (isResubmit ? ('第' + submitTotalIndex + '次提交') : '首次提交');
                    
                    var showRemark = hist.remark && !isResubmit;
                    
                    return {
                      color: color,
                      children: (
                        <div style={{ paddingBottom: 2 }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 500, fontSize: 13 }}>
                            <span>{label} <span style={{ color: '#8c8c8c', fontWeight: 'normal', fontSize: 12 }}>({hist.operator})</span></span>
                            <span style={{ color: '#8c8c8c', fontWeight: 'normal', fontSize: 12 }}>{hist.time}</span>
                          </div>
                          {showRemark && (
                            <div style={{ color: '#595959', marginTop: 4, fontSize: 12, background: '#ffffff', padding: '8px 12px', borderRadius: 6, border: '1px dashed #e8e8e8' }}>
                              <div style={{ fontWeight: 500 }}>{hist.remark}</div>
                              {hist.details && hist.details.length > 0 && (
                                <div style={{ marginTop: 6, borderTop: '1px solid #f0f0f0', paddingTop: 6 }}>
                                  <div style={{ color: '#8c8c8c', marginBottom: 4, fontWeight: 500 }}>修改对比明细：</div>
                                  <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                                    {hist.details.map(function (det: any, dIdx: number) {
                                      return (
                                        <div key={dIdx} style={{ padding: '2px 0', display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
                                          <Tag color="blue" style={{ margin: 0, fontSize: '10px', height: '18px', lineHeight: '16px' }}>{det.label}</Tag>
                                          <span style={{ textDecoration: 'line-through', color: '#8c8c8c' }}>{det.oldVal}</span>
                                          <span style={{ color: '#8c8c8c' }}>➜</span>
                                          <span style={{ color: '#52c41a', fontWeight: 600 }}>{det.newVal}</span>
                                        </div>
                                      );
                                    })}
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      )
                    };
                  })}
                />
              </div>
            )}

            {currentRecord.status === 'pending' && (
              <div style={{ marginTop: 24, padding: 16, background: '#fafafa', border: '1px solid #f0f0f0', borderRadius: 8 }}>
                <div style={{ fontWeight: 600, color: '#722ed1', marginBottom: 12 }}>
                  <AuditOutlined style={{ marginRight: 6 }} /> 审批意见
                </div>
                <div style={{ marginBottom: 8, fontSize: 13, color: '#595959' }}>如需驳回该服务申请，请在此处填写驳回原因：</div>
                <Input.TextArea placeholder="例如：资质证书文件模糊，或者服务内容描述含有违规宣传字眼" rows={3} value={rejectReason} onChange={function (e) { setRejectReason(e.target.value); }} />
              </div>
            )}
          </div>
        )}
      </Modal>
    </AdminLayout>
  );
};
export default Component;

