// 关键词挖掘初始表单
export const correlationFormDefault = {
  // 关键词
  keyword: '',
  // 任务类型：1：智能挖掘，2：在线组合，3：手动录入，4：智能清洗
  type: 1,
  // 原始词
  reserveKeyword: '',
  // 挖掘来源
  support: '',
  // 挖掘深度
  depth: 1,
  // 包含关键字开关：0：关闭，1：开启
  include: 1,
  // 包含关键字
  includeKeyword: '',
  // 不含关键字开关：0：关闭，1：开启
  exclude: 1,
  // 不含关键字
  excludeKeyword: '',
  // 保留原始词开关：0：关闭，1：开启
  reserve: 0,
  // 关键词去重开关：0：关闭，1：开启
  removal: 1,
  // 关键词过滤开关：0：关闭，1：开启
  keyFilter: 0,
  // 关键词过滤
  keyFilterVal: 1,
  // 字符长度过滤开关：0：关闭，1：开启
  lengthFilter: 1,
  // 字符长度过滤
  lengthFilterVal: {
    min: 0,
    max: 0,
  },
  // 违禁词过滤开关：0：关闭，1：开启
  sensitiveFilter: 0,
  // 违禁词过滤
  sensitiveFilterVal: 0,
};

// 关键词组合初始表单
export const orderingFormDefault = {
  // 关键词
  keyword: [],
  // 任务类型：1：智能挖掘，2：在线组合，3：手动录入，4：智能清洗
  type: 2,
  // 组合方式
  orderSelect: [],
  // 是否智能加空格0：关闭，1：开启
  spaceCheck: 0,
  // 关键词去重开关：0：关闭，1：开启
  removal: 1,
  // 关键词过滤开关：0：关闭，1：开启
  keyFilter: 0,
  // 关键词过滤
  keyFilterVal: 1,
  // 字符长度过滤开关：0：关闭，1：开启
  lengthFilter: 1,
  // 字符长度过滤
  lengthFilterVal: {
    min: 0,
    max: 0,
  },
  // 违禁词过滤开关：0：关闭，1：开启
  sensitiveFilter: 0,
  // 违禁词过滤
  sensitiveFilterVal: 0,
};
// 相关搜索词初始表单
export const XGSSFormDefault = {
  // 关键词
  keyword: '',
  // 任务类型：1：智能挖掘，2：在线组合，3：手动录入，4：智能清洗
  type: 1,
  // 原始词
  reserveKeyword: '',
  // 挖掘来源
  support: '',
  // 挖掘深度
  depth: 1,
  // 包含关键字开关：0：关闭，1：开启
  include: 1,
  // 包含关键字
  includeKeyword: '',
  // 不含关键字开关：0：关闭，1：开启
  exclude: 1,
  // 不含关键字
  excludeKeyword: '',
  // 保留原始词开关：0：关闭，1：开启
  reserve: 0,
  // 关键词去重开关：0：关闭，1：开启
  removal: 1,
  // 关键词过滤开关：0：关闭，1：开启
  keyFilter: 0,
  // 关键词过滤
  keyFilterVal: 1,
  // 字符长度过滤开关：0：关闭，1：开启
  lengthFilter: 1,
  // 字符长度过滤
  lengthFilterVal: {
    min: 0,
    max: 0,
  },
  // 违禁词过滤开关：0：关闭，1：开启
  sensitiveFilter: 0,
  // 违禁词过滤
  sensitiveFilterVal: 0,
};
// 大家都在搜初始表单
export const DJDZSFormDefault = {
  // 关键词
  keyword: '',
  // 任务类型：1：智能挖掘，2：在线组合，3：手动录入，4：智能清洗
  type: 1,
  // 原始词
  reserveKeyword: '',
  // 挖掘来源
  support: '',
  // 挖掘深度
  depth: 1,
  // 包含关键字开关：0：关闭，1：开启
  include: 1,
  // 包含关键字
  includeKeyword: '',
  // 不含关键字开关：0：关闭，1：开启
  exclude: 1,
  // 不含关键字
  excludeKeyword: '',
  // 保留原始词开关：0：关闭，1：开启
  reserve: 0,
  // 关键词去重开关：0：关闭，1：开启
  removal: 1,
  // 关键词过滤开关：0：关闭，1：开启
  keyFilter: 0,
  // 关键词过滤
  keyFilterVal: 1,
  // 字符长度过滤开关：0：关闭，1：开启
  lengthFilter: 1,
  // 字符长度过滤
  lengthFilterVal: {
    min: 0,
    max: 0,
  },
  // 违禁词过滤开关：0：关闭，1：开启
  sensitiveFilter: 0,
  // 违禁词过滤
  sensitiveFilterVal: 0,
};

// 竟对关键词初始表单
export const jingduiFormDefault = {
  // 关键词
  keyword: '',
  // 任务类型：1：智能挖掘，2：在线组合，3：手动录入，4：智能清洗
  type: 1,
  // 原始词
  reserveKeyword: '',
  // 挖掘来源
  support: 1,
  // 搜索引擎
  engine: [],
  // 包含关键字开关：0：关闭，1：开启
  include: 1,
  // 包含关键字
  includeKeyword: '',
  // 不含关键字开关：0：关闭，1：开启
  exclude: 1,
  // 不含关键字
  excludeKeyword: '',
  // 保留原始词开关：0：关闭，1：开启
  reserve: 0,
  // 关键词去重开关：0：关闭，1：开启
  removal: 1,
  // 关键词过滤开关：0：关闭，1：开启
  keyFilter: 0,
  // 关键词过滤
  keyFilterVal: 1,
  // 字符长度过滤开关：0：关闭，1：开启
  lengthFilter: 1,
  // 字符长度过滤
  lengthFilterVal: {
    min: 0,
    max: 0,
  },
  // 违禁词过滤开关：0：关闭，1：开启
  sensitiveFilter: 0,
  // 违禁词过滤
  sensitiveFilterVal: 0,
  // 违禁词过滤自定义词库
  sensitiveCustom: '',
};
// SEM关键词初始表单
export const SEMFormDefault = {
  // 关键词
  keyword: '',
  // 任务类型：1：智能挖掘，2：在线组合，3：手动录入，4：智能清洗
  type: 1,
  // 原始词
  reserveKeyword: '',
  // 挖掘来源
  support: '',
  // 挖掘深度
  depth: 1,
  // 包含关键字开关：0：关闭，1：开启
  include: 1,
  // 包含关键字
  includeKeyword: '',
  // 不含关键字开关：0：关闭，1：开启
  exclude: 1,
  // 不含关键字
  excludeKeyword: '',
  // 保留原始词开关：0：关闭，1：开启
  reserve: 0,
  // 关键词去重开关：0：关闭，1：开启
  removal: 1,
  // 关键词过滤开关：0：关闭，1：开启
  keyFilter: 0,
  // 关键词过滤
  keyFilterVal: 1,
  // 字符长度过滤开关：0：关闭，1：开启
  lengthFilter: 1,
  // 字符长度过滤
  lengthFilterVal: {
    min: 0,
    max: 0,
  },
  // 违禁词过滤开关：0：关闭，1：开启
  sensitiveFilter: 0,
  // 违禁词过滤
  sensitiveFilterVal: 0,
};

// AI挖掘词初始表单
export const AIFormDefault = {
  // 关键词
  keyword: '',
  // 任务类型：1：智能挖掘，2：在线组合，3：手动录入，4：智能清洗
  type: 1,
  // 原始词
  reserveKeyword: '',
  // 输出语言
  lang: '',
  // 挖掘来源
  support: '',
  // 挖掘数量
  number: '',
  // 包含关键字开关：0：关闭，1：开启
  include: 1,
  // 包含关键字
  includeKeyword: '',
  // 不含关键字开关：0：关闭，1：开启
  exclude: 1,
  // 不含关键字
  excludeKeyword: '',
};

// 站长关键词库初始表单
export const zhanzhangFormDefault = {
  // 关键词
  keyword: '',
  // 任务类型：1：智能挖掘，2：在线组合，3：手动录入，4：智能清洗
  type: 1,
  // 原始词
  reserveKeyword: '',
  // 挖掘来源
  support: 1,
  // 站长平台
  platform: '',
  // 月搜索量
  monthQuery: {
    min: 0,
    max: 0,
  },
  // 搜索指数
  queryIndex: {
    min: 0,
    max: 0,
  },
  // 难度级别
  diffLevel: {
    min: 0,
    max: 0,
  },
  // 包含关键字开关：0：关闭，1：开启
  include: 1,
  // 包含关键字
  includeKeyword: '',
  // 不含关键字开关：0：关闭，1：开启
  exclude: 1,
  // 不含关键字
  excludeKeyword: '',
  // 保留原始词开关：0：关闭，1：开启
  reserve: 0,
  // 关键词去重开关：0：关闭，1：开启
  removal: 1,
  // 关键词过滤开关：0：关闭，1：开启
  keyFilter: 0,
  // 关键词过滤
  keyFilterVal: 1,
  // 字符长度过滤开关：0：关闭，1：开启
  lengthFilter: 1,
  // 字符长度过滤
  lengthFilterVal: {
    min: 0,
    max: 0,
  },
  // 违禁词过滤开关：0：关闭，1：开启
  sensitiveFilter: 0,
  // 违禁词过滤
  sensitiveFilterVal: 0,
  // 违禁词过滤自定义词库
  sensitiveCustom: '',
};
// 站长挖掘来源
export const ZZSourceOptions = [
  {
    label: '百度',
    value: 1,
  },
  {
    label: '谷歌',
    value: 2,
  }
];
// 站长平台
export const ZZPlatformOptions1 = [
  {
    label: '爱站工具',
    value: 1,
  },
  {
    label: '站长工具',
    value: 2,
  }
];
// 站长平台
export const ZZPlatformOptions2 = [
  {
    label: 'SEMrush',
    value: 1,
  },
  {
    label: 'Ahrefs',
    value: 2,
  }
];

// 关键词生成语音
export const AILangOptions = [];
// 挖掘数量
export const AINumberOptions = [
  {
    label: '10',
    value: 10
  },
  {
    label: '20',
    value: 20
  },
  {
    label: '50',
    value: 50
  },
  {
    label: '100',
    value: 100
  },
  {
    label: '200',
    value: 200
  },
  {
    label: '500',
    value: 500
  }
];
// AI挖掘来源
export const AISourceOptions = [
  {
    label: 'ChatGPT',
    value: 1,
  },
  {
    label: 'DeepSeek',
    value: 2,
  },
  {
    label: 'Claude',
    value: 3,
  },
];

// 包含关键词
export const includeOptions = [
  {
    label: '任一项',
    value: 1,
  },
  {
    label: '所有项',
    value: 0,
  },
];

// 不包含关键词
export const excludeOptions = [
  {
    label: '任一项',
    value: 1,
  },
  {
    label: '所有项',
    value: 0,
  },
];
// 挖掘来源
export const supportOptions = [
  {
    label: '百度',
    value: 2,
  },
  {
    label: '谷歌',
    value: 3,
  },
  {
    label: '必应',
    value: 4,
  },
  {
    label: '头条',
    value: 5,
  },
  {
    label: '搜狗',
    value: 6,
  },
  {
    label: '360',
    value: 7,
  },
];
// 挖掘来源
export const xgssSupportOptions = [
  {
    label: '百度',
    value: 1,
  },
  {
    label: '谷歌',
    value: 2,
  },
  {
    label: '必应',
    value: 3,
  },
  {
    label: '头条',
    value: 4,
  },
  {
    label: '360',
    value: 5,
  },
  {
    label: '神马',
    value: 6,
  },
  {
    label: '搜狗',
    value: 7,
  },
  {
    label: '抖音',
    value: 8,
  },
  {
    label: '小红书',
    value: 9,
  },
];
// 挖掘来源
export const sourceOptions = [
  {
    label: '站长关键词库',
    value: 1,
  },
  {
    label: '竞价投放词',
    value: 2,
  },
  {
    label: '站内SEO设置',
    value: 3,
  },
];
// 竞对提示
export const JDPlaceholder = {
  1: '请输入需要提取关键词的竞争对手网址链接，一行一条url链接，需带https或http的网站链接地址',
  2: '请输入竞争对手的官方网址，如：https://www.google.com，一行一个，一次最多提交5个竞对网站'
};
// 搜索引擎
export const engineOptions1 = [
  {
    label: '百度',
    value: 1,
  },
  {
    label: '谷歌',
    value: 2,
  },
  {
    label: '必应',
    value: 3,
  },
  {
    label: '神马',
    value: 4,
  },
  {
    label: '搜狗',
    value: 5,
  },
  {
    label: '360',
    value: 6,
  },
];
// 搜索引擎
export const engineOptions2 = [
  {
    label: '百度',
    value: 1,
  },
  {
    label: '谷歌',
    value: 2,
  },
];
// 挖掘深度
export const depthOptions = [
  {
    label: 'depthOptions.label1',
    value: 1,
  },
  {
    label: 'depthOptions.label2',
    value: 2,
  },
  {
    label: 'depthOptions.label3',
    value: 3,
  },
  {
    label: 'depthOptions.label4',
    value: 4,
  },
  {
    label: 'depthOptions.label5',
    value: 5,
  },
];
// 特殊字符过滤
export const keyOptions = [
  {
    label: 'keyOptions.label1',
    value: 1,
  },
  {
    label: 'keyOptions.label2',
    value: 2,
  },
];
// 违禁词过滤
export const sensitiveOptions = [
  {
    label: 'sensitiveOptions.label1',
    value: 1,
  },
  {
    label: 'sensitiveOptions.label2',
    value: 2,
  },
];
// 违禁词定义
export const customOptions = [
  {
    label: 'sensitiveOptions.label1',
    value: 0,
  },
  {
    label: 'customOptions.label1',
    value: 1,
  },
  {
    label: 'customOptions.label2',
    value: 2,
  },
  {
    label: 'customOptions.label3',
    value: 3,
  },
];
// 字符过滤最小
export const lengthMinOptions = [
  {
    label: '不限制',
    value: 0,
  },
  {
    label: '2',
    value: 2,
  },
  {
    label: '3',
    value: 3,
  },
  {
    label: '4',
    value: 4,
  },
  {
    label: '5',
    value: 5,
  },
  {
    label: '6',
    value: 6,
  },
  {
    label: '7',
    value: 7,
  },
  {
    label: '8',
    value: 8,
  },
  {
    label: '9',
    value: 9,
  },
  {
    label: '10',
    value: 10,
  },
  {
    label: '11',
    value: 11,
  },
  {
    label: '12',
    value: 12,
  },
  {
    label: '13',
    value: 13,
  },
  {
    label: '14',
    value: 14,
  },
  {
    label: '15',
    value: 15,
  },
  {
    label: '16',
    value: 16,
  },
  {
    label: '17',
    value: 17,
  },
  {
    label: '18',
    value: 18,
  },
  {
    label: '19',
    value: 19,
  },
  {
    label: '20',
    value: 20,
  },
];
// 字符过滤最大
export const lengthMaxOptions = [
  {
    label: '不限制',
    value: 0,
  },
  {
    label: '5',
    value: 5,
  },
  {
    label: '10',
    value: 10,
  },
  {
    label: '15',
    value: 15,
  },
  {
    label: '20',
    value: 20,
  },
  {
    label: '25',
    value: 25,
  },
  {
    label: '30',
    value: 30,
  },
  {
    label: '35',
    value: 35,
  },
  {
    label: '40',
    value: 40,
  },
  {
    label: '45',
    value: 45,
  },
  {
    label: '50',
    value: 50,
  },
  {
    label: '55',
    value: 55,
  },
  {
    label: '60',
    value: 60,
  },
];
// 组合方式
export const orderOptions = [
  {
    label: 'C',
    value: 1,
  },
  {
    label: 'A + C',
    value: 2,
  },
  {
    label: 'B + C',
    value: 3,
  },
  {
    label: 'C + D',
    value: 4,
  },
  {
    label: 'B + C + D',
    value: 5,
  },
  {
    label: 'A + B + C',
    value: 6,
  },
  {
    label: 'A + C + D',
    value: 7,
  },
  {
    label: 'A + B + C + D',
    value: 8,
  },
];
// 任务类型
export const typeOptions = [
  {
    label: 'typeOptions.label1',
    value: 1,
  },
  {
    label: 'typeOptions.label2',
    value: 2,
  },
  {
    label: 'typeOptions.label3',
    value: 3,
  },
  {
    label: 'typeOptions.label4',
    value: 4,
  },
];
// 任务表格
export const taskTableColumns = [
  {
    title: 'taskTableColumns.title1',
    dataIndex: 'id',
    slotName: 'id',
    width: 80,
    titleSlotName: 'header'
  },
  {
    title: 'taskTableColumns.title2',
    dataIndex: 'name',
    slotName: 'name',
    width: 500,
    titleSlotName: 'header'
  },
  {
    title: 'taskTableColumns.title3',
    dataIndex: 'number',
    width: 100,
    titleSlotName: 'header'
  },
  {
    title: 'taskTableColumns.title4',
    dataIndex: 'type',
    slotName: 'type',
    width: 120,
    titleSlotName: 'header'
  },
  {
    title: '备注信息',
    dataIndex: 'website',
    slotName: 'website',
    width: 300,
    titleSlotName: 'header'
  },
  {
    title: 'taskTableColumns.title6',
    dataIndex: 'update_time',
    slotName: 'update_time',
    width: 160,
    titleSlotName: 'header'
  },
  {
    title: 'taskTableColumns.title7',
    dataIndex: 'actions',
    slotName: 'actions',
    fixed: 'right',
    width: 300,
    titleSlotName: 'header'
  },
];
// 清洗任务初始表单
export const clearFormDefault = {
  // 包含关键字开关：0：关闭，1：开启
  include: 1,
  // 包含关键字
  includeKeyword: '',
  // 不含关键字开关：0：关闭，1：开启
  exclude: 1,
  // 不含关键字
  excludeKeyword: '',
  // 关键词去重开关：0：关闭，1：开启
  removal: 0,
  // 关键词过滤开关：0：关闭，1：开启
  keyFilter: 0,
  // 关键词过滤
  keyFilterVal: 1,
  // 字符长度过滤开关：0：关闭，1：开启
  lengthFilter: 1,
  // 字符长度过滤
  lengthFilterVal: {
    min: 0,
    max: 0,
  },
  // 违禁词过滤开关：0：关闭，1：开启
  sensitiveFilter: 0,
  // 违禁词过滤
  sensitiveFilterVal: 0,
  // 违禁词过滤自定义词库
  sensitiveCustom: '',
};

// 手动加词初始表单
export const addFormDefault = {
  // 添加方式 1：新任务，2：已有任务
  type: 1,
  // 任务名称
  taskName: '',
  // 关键词
  keyword: [],
  // 预计应用站点
  website: '',
  // 包含关键字开关：0：关闭，1：开启
  include: 1,
  // 包含关键字
  includeKeyword: '',
  // 不含关键字开关：0：关闭，1：开启
  exclude: 1,
  // 不含关键字
  excludeKeyword: '',
  // 关键词去重开关：0：关闭，1：开启
  removal: 0,
  // 关键词过滤开关：0：关闭，1：开启
  keyFilter: 0,
  // 关键词过滤
  keyFilterVal: 1,
  // 字符长度过滤开关：0：关闭，1：开启
  lengthFilter: 1,
  // 字符长度过滤
  lengthFilterVal: {
    min: 0,
    max: 0,
  },
  // 违禁词过滤开关：0：关闭，1：开启
  sensitiveFilter: 1,
  // 违禁词过滤
  sensitiveFilterVal: 0,
  // 违禁词过滤自定义词库
  sensitiveCustom: '',
};
// 关键词层级
export const weightOptions = [
  {
    label: 'weightOptions.label1',
    value: 0,
  },
  {
    label: 'weightOptions.label2',
    value: 1,
  },
  {
    label: 'weightOptions.label3',
    value: 2,
  },
  {
    label: 'weightOptions.label4',
    value: 3,
  },
];
// 添加任务方式
export const addTypeOptions = [
  {
    label: 'addTypeOptions.label1',
    value: 1,
  },
  {
    label: 'addTypeOptions.label2',
    disabled: true,
    value: 2,
  },
];
// 我的关键词列表
export const myTableColumns = [
  {
    title: 'myTableColumns.title1',
    dataIndex: 'title',
    slotName: 'title',
    width: 400,
    titleSlotName: 'header'
  },
  {
    title: 'myTableColumns.title3',
    dataIndex: 'taskName',
    width: 200,
    titleSlotName: 'header'
  },
  {
    title: '备注信息',
    dataIndex: 'website',
    slotName: 'website',
    width: 300,
    titleSlotName: 'header'
  },
  {
    title: 'myTableColumns.title5',
    dataIndex: 'update_time',
    slotName: 'update_time',
    width: 160,
    titleSlotName: 'header'
  },
  {
    title: 'myTableColumns.title6',
    dataIndex: 'actions',
    slotName: 'actions',
    fixed: 'right',
    width: 70,
    titleSlotName: 'header'
  },
];
