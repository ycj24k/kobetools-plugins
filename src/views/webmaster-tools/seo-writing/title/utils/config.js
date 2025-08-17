// AI智能生成标题初始表单
export const AITitleFormDefault = {
  // 产品或服务
  keyword: '',
  // 输出语言
  lang: '',
  // AI提示词
  keyContent: '',
  // AI模型
  model: '',
  // 标题数量
  keyNum: '',
  // 生成关键词描述信息开关：0：关闭，1：开启
  isDesc: 0,
  // 标题风格
  style: '',
  // 包含关键字开关：0：关闭，1：开启
  include: 1,
  // 包含关键字
  includeKeyword: '',
  // 不含关键字开关：0：关闭，1：开启
  exclude: 1,
  // 不含关键字
  excludeKeyword: '',
};
export const titleFormDefault = {
  // 任务id
  taskId: '',
  // 标题来源
  source: '',
  // 标题选项
  option: '',
  // 标题连接符
  connector: '',
  // 标题规则选项
  rule: '',
  // 无结果自动过滤开关：0：关闭，1：开启
  auto: 0,
  // 标题去重开关：0：关闭，1：开启
  removal: 0,
  // 违禁词过滤开关：0：关闭，1：开启
  sensitiveFilter: 0,
  // 违禁词过滤
  sensitiveFilterVal: 0,
  // 违禁词过滤自定义词库
  sensitiveCustom: '',
  // 生成词长度过滤开关：0：关闭，1：开启
  lengthFilter: 1,
  // 生成词长度过滤
  lengthFilterVal: {
    min: 0,
    max: 0,
  },
  // 标题总长度过滤开关：0：关闭，1：开启
  totalLengthFilter: 1,
  // 标题总长度过滤
  totalLengthFilterVal: {
    min: 0,
    max: 0,
  },
};
// 下拉词生成标题初始表单
export const XlTitleFormDefault = {
  // 任务id
  taskId: '',
  // 标题来源
  source: '',
  // 标题风格
  style: 1,
  // 标题连接符
  connector: '',
  // 标题规则选项
  rule: 1,
  // 下拉规则选项
  xlrule: '',
  // 下拉组合选项
  order: '',
  // 生成词长度过滤开关：0：关闭，1：开启
  lengthFilter: 1,
  // 生成词长度过滤
  lengthFilterVal: {
    min: 0,
    max: 0,
  },
  // 标题总长度过滤开关：0：关闭，1：开启
  totalLengthFilter: 1,
  // 标题总长度过滤
  totalLengthFilterVal: {
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
};
// 标题组合初始表单
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
// 挖掘来源
export const supportOptions = [
  {
    label: '百度',
    value: 1,
  },
  {
    label: '手机百度',
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
    label: '360',
    value: 6,
  },
  {
    label: '1688',
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
  {
    label: '搜狗',
    value: 10,
  },
  {
    label: '淘宝',
    value: 11,
  },
  {
    label: '一淘',
    value: 12,
  },
];
// 挖掘来源
export const XlSourceOptions = [
  {
    label: '谷歌',
    value: 1,
  },
  {
    label: '必应',
    value: 2,
  },
  {
    label: '百度',
    value: 3,
  },
  {
    label: '360',
    value: 4,
  },
  {
    label: '搜狗',
    value: 5,
  },
  {
    label: '头条',
    value: 6,
  },
];
// 关键词生成语言
export const AILangOptions = [
  {
    label: '中文',
    value: '中文'
  },
  {
    label: '英文',
    value: '英文'
  },
];
// AI标题模型
export const AIModelOptions = [
  {
    label: 'ChatGPT',
    value: 1
  },
  {
    label: 'DeepSeek',
    value: 2
  },
  {
    label: 'Claude',
    value: 3
  },
];
// AI标题关键词数
export const AIKeyNumOptions = [
  {
    label: '2',
    value: 2
  },
  {
    label: '3',
    value: 3
  },
  {
    label: '4',
    value: 4
  },
  {
    label: '5',
    value: 5
  },
  {
    label: '6',
    value: 6
  },
  {
    label: '7',
    value: 7
  },
  {
    label: '随机',
    value: 0
  },
];
// AI标题风格
export const AIStyleOptions = [
  {
    label: '时效性',
    value: 1
  },
  {
    label: '疑问式',
    value: 2
  },
  {
    label: '总结式',
    value: 3
  },
  {
    label: '对比式',
    value: 4
  },
  {
    label: '数字型',
    value: 5
  },
  {
    label: '随即风格',
    value: 0
  },
];
// 下拉标题风格
export const XlStyleOptions = [
  {
    label: '单标题风格',
    value: 1,
  },
  {
    label: '双标题风格',
    value: 2,
  },
];

// 标题选项
export const optionOptions = [
  {
    label: 'optionOptions.label1',
    value: 1,
  },
  {
    label: 'optionOptions.label2',
    value: 2,
  },
  {
    label: 'optionOptions.label3',
    value: 3,
  },
];
// 标题连接符
export const connectorOptions = [
  {
    label: 'connectorOptions.label1',
    value: 1,
  },
  {
    label: 'connectorOptions.label2',
    value: 2,
  },
  {
    label: 'connectorOptions.label3',
    value: 3,
  },
  {
    label: 'connectorOptions.label4',
    value: 4,
  },
  {
    label: 'connectorOptions.label5',
    value: 5,
  },
  {
    label: 'connectorOptions.label6',
    value: 6,
  },
  {       
    label: 'connectorOptions.label7',
    value: 7,
  },
];
// 标题规则选项
export const ruleOptions = [
  {
    label: 'ruleOptions.label1',
    value: 1,
  },
  {
    label: 'ruleOptions.label2',
    value: 2,
  },
  {
    label: 'ruleOptions.label3',
    value: 3,
  },
  {
    label: 'ruleOptions.label4',
    value: 4,
  },
  {
    label: 'ruleOptions.label5',
    value: 5,
  },
  {
    label: 'ruleOptions.label6',
    value: 6,
  },
];
// 下拉标题规则选项
export const XlRuleOptions = [
  {
    label: '原始词作为标题',
    value: 1,
  },
  {
    label: '下拉词作为标题',
    value: 2,
  },
];
// 下拉词规则选项
export const XlKeyRuleOptions = [
  {
    label: '首位下拉词',
    value: 1,
  },
  {
    label: '末位下拉词',
    value: 2,
  },
  {
    label: ' 最长下拉词',
    value: 3,
  },
  {
    label: '随机下拉词',
    value: 4,
  },
];
// 下拉词组合选项
export const XlOrderOptions = [
  {
    label: '原始词+下拉词',
    value: 1,
  },
  {
    label: '下拉词+原始词',
    value: 2,
  },
  {
    label: '下拉词+下拉词',
    value: 3,
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
    width: 300,
    titleSlotName: 'header'
  },
];
// 清洗任务初始表单
export const clearFormDefault = {
  // 违禁词过滤开关：0：关闭，1：开启
  sensitiveFilter: 0,
  // 违禁词过滤
  sensitiveFilterVal: 0,
  // 违禁词过滤自定义词库
  sensitiveCustom: '',
  // 生成词长度过滤开关：0：关闭，1：开启
  lengthFilter: 1,
  // 生成词长度过滤
  lengthFilterVal: {
    min: 0,
    max: 0,
  },
  // 包含关键字开关：0：关闭，1：开启
  include: 1,
  // 包含关键字
  includeKeyword: [],
  // 不含关键字开关：0：关闭，1：开启
  exclude: 1,
  // 不含关键字
  excludeKeyword: [],
};

// 手动标题初始表单
export const addFormDefault = {
  // 添加方式 1：新任务，2：已有任务
  type: 1,
  // 任务名称
  taskName: '',
  // 预计应用站点
  website: '',
  // 上传文档
  keywords: [],
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

export const AIMakeFormDefault = {
  // 输出语言
  lang: '',
  // AI提示词
  keyContent: '',
  // AI模型
  model: '',
  // 关键词数
  keyNum: '',
  // 生成描述信息开关：0：关闭，1：开启
  isDesc: 0,
  // 包含关键字开关：0：关闭，1：开启
  include: 1,
  // 包含关键字
  includeKeyword: '',
  // 不含关键字开关：0：关闭，1：开启
  exclude: 1,
  // 不含关键字
  excludeKeyword: '',
};

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
// 我的标题列表
export const myTableColumns = [
  {
    title: 'myTableColumns.title1',
    dataIndex: 'title',
    slotName: 'title',
    width: 400,
    titleSlotName: 'header'
  },
  {
    title: 'myTableColumns.title2',
    dataIndex: 'number',
    width: 100,
    titleSlotName: 'header'
  },
  {
    title: 'myTableColumns.title3',
    dataIndex: 'taskName',
    width: 250,
    titleSlotName: 'header'
  },
  {
    title: 'myTableColumns.title4',
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
    width: 140,
    titleSlotName: 'header'
  },
];
