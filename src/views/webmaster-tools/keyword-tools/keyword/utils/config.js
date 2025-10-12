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
  include: 0,
  // 包含关键字
  includeKeyword: '',
  // 不含关键字开关：0：关闭，1：开启
  exclude: 0,
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
  include: 0,
  // 包含关键字
  includeKeyword: '',
  // 不含关键字开关：0：关闭，1：开启
  exclude: 0,
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
  include: 0,
  // 包含关键字
  includeKeyword: '',
  // 不含关键字开关：0：关闭，1：开启
  exclude: 0,
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
  include: 0,
  // 包含关键字
  includeKeyword: '',
  // 不含关键字开关：0：关闭，1：开启
  exclude: 0,
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
// 关键词裂变初始表单（与下拉关键词结构一致，按裂变场景复用）
export const LBFormDefault = {
  // 关键词
  keyword: '',
  // 任务类型：1：智能挖掘，2：在线组合，3：手动录入，4：智能清洗
  type: 1,
  // 原始词
  reserveKeyword: '',
  // 挖掘来源（裂变无需特定来源，保留字段备用）
  support: '',
  // 输出语言
  language: '',
  // 裂变数量（使用 LBDepthOptions）
  depth: 1,
  // 包含关键字开关：0：关闭，1：开启
  include: 0,
  // 包含关键字
  includeKeyword: '',
  // 不含关键字开关：0：关闭，1：开启
  exclude: 0,
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
// 关键词规划师初始表单
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
  include: 0,
  // 包含关键字
  includeKeyword: '',
  // 不含关键字开关：0：关闭，1：开启
  exclude: 0,
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
/**
 * 判断字符串是否只包含 {keyword}、{number}、{language} 三个通配符
 * @param {string} str
 * @returns {boolean}
 */
export function isPromptDefaultValid(str) {
  // 匹配所有 {xxx} 通配符
  const matches = str.match(/\{(.*?)\}/g) || [];
  // 提取通配符名
  const keys = matches.map(m => m.replace(/[{}]/g, ''));
  // 允许的通配符
  const allowed = ['keyword', 'number', 'language'];
  // 必须有且仅有这三个通配符
  if (keys.length !== 3) return false;
  // 检查是否包含且只包含这三个通配符
  return allowed.every(a => keys.includes(a)) && keys.every(k => allowed.includes(k));
}
export const promptDefault = 'promptDefault';
export const AIFormDefault = {
  // 关键词
  keywords: [],
  // AI提示词
  prompt: promptDefault,
  // 输出语言
  language: '',
  // 挖掘来源
  model: '',
  // 挖掘数量
  num: '',
  // 包含关键字开关：0：关闭，1：开启
  includeType: 0,
  // 包含关键字
  includeKeywords: [],
  // 不含关键字开关：0：关闭，1：开启
  excludeType: 0,
  // 不含关键字
  excludeKeywords: [],
};

// 站长平台词初始表单
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
  include: 0,
  // 包含关键字
  includeKeyword: '',
  // 不含关键字开关：0：关闭，1：开启
  exclude: 0,
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
    label: 'ZZSourceOptions.label1',
    value: 1,
  },
  {
    label: 'ZZSourceOptions.label2',
    value: 2,
  }
];
// 站长平台
export const ZZPlatformOptions1 = [
  {
    label: 'ZZPlatformOptions1.label1',
    value: 1,
  },
  {
    label: 'ZZPlatformOptions1.label2',
    value: 2,
  }
];
// 站长平台
export const ZZPlatformOptions2 = [
  {
    label: 'ZZPlatformOptions2.label1',
    value: 1,
  },
  {
    label: 'ZZPlatformOptions2.label2',
    value: 2,
  }
];

// 关键词生成语言
export const AILangOptions = [
  { label: 'AILangOptions.label1', value: '简体中文' },
  { label: 'AILangOptions.label2', value: '英文' },
  { label: 'AILangOptions.label3', value: '繁体中文' },
  { label: 'AILangOptions.label4', value: '俄语' },
  { label: 'AILangOptions.label5', value: '日语' },
  { label: 'AILangOptions.label6', value: '法语' },
  { label: 'AILangOptions.label7', value: '德语' },
  { label: 'AILangOptions.label8', value: '葡萄牙语' },
  { label: 'AILangOptions.label9', value: '阿拉伯语' },
  { label: 'AILangOptions.label10', value: '西班牙语' },
  { label: 'AILangOptions.label11', value: '意大利语' },
  { label: 'AILangOptions.label12', value: '越南语' },
  { label: 'AILangOptions.label13', value: '韩语' },
  { label: 'AILangOptions.label14', value: '印地语' },
  { label: 'AILangOptions.label15', value: '孟加拉语' },
  { label: 'AILangOptions.label16', value: '印尼语' },
  { label: 'AILangOptions.label17', value: '土耳其语' },
  { label: 'AILangOptions.label18', value: '泰语' },
  { label: 'AILangOptions.label19', value: '泰卢固语' },
  { label: 'AILangOptions.label20', value: '泰米尔语' },
  { label: 'AILangOptions.label21', value: '马来语' },
  { label: 'AILangOptions.label22', value: '捷克语' },
  { label: 'AILangOptions.label23', value: '荷兰语' },
  { label: 'AILangOptions.label24', value: '菲律宾语' },
  { label: 'AILangOptions.label25', value: '芬兰语' },
  { label: 'AILangOptions.label26', value: '瑞典语' },
  { label: 'AILangOptions.label27', value: '希腊语' },
  { label: 'AILangOptions.label28', value: '印度尼西亚语' },
  { label: 'AILangOptions.label29', value: '匈牙利语' },
  { label: 'AILangOptions.label30', value: '乌克兰语' },
];
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
// AI模型
export const AIModelOptions = [
  {
    label: 'ChatGPT',
    value: 'ChatGPT'
  },
  {
    label: 'DeepSeek',
    value: 'DeepSeek'
  },
  {
    label: 'Claude',
    value: 'Claude'
  },
  {
    label: ' Gemini',
    value: ' Gemini'
  },
  {
    label: 'Qwen',
    value: 'Qwen'
  },
  {
    label: 'BaiduAI',
    value: 'BaiduAI'
  },
  {
    label: 'DouBao',
    value: 'DouBao'
  },
  {
    label: 'Kimi',
    value: 'Kimi'
  },
];

// 包含关键词
export const includeOptions = [
  {
    label: 'includeOptions.label1',
    value: 0,
  },
  {
    label: 'includeOptions.label2',
    value: 1,
  },
];

// 不包含关键词
export const excludeOptions = [
  {
    label: 'excludeOptions.label1',
    value: 0,
  },
  {
    label: 'excludeOptions.label2',
    value: 1,
  },
];
// 挖掘来源
export const supportOptions = [
  {
    label: 'supportOptions.label1',
    value: 2,
  },
  {
    label: 'supportOptions.label2',
    value: 3,
  },
  {
    label: 'supportOptions.label3',
    value: 4,
  },
  {
    label: 'supportOptions.label4',
    value: 5,
  },
  {
    label: 'supportOptions.label5',
    value: 6,
  },
  {
    label: 'supportOptions.label6',
    value: 7,
  },
];
// 挖掘来源(相关搜索)
export const xgssSupportOptions = [
  {
    label: 'xgssSupportOptions.label1',
    value: 1,
  },
  {
    label: 'xgssSupportOptions.label2',
    value: 2,
  },
  {
    label: 'xgssSupportOptions.label3',
    value: 3,
  },
  {
    label: 'xgssSupportOptions.label4',
    value: 4,
  },
  {
    label: 'xgssSupportOptions.label5',
    value: 5,
  },
  {
    label: 'xgssSupportOptions.label6',
    value: 6,
  },
  {
    label: 'xgssSupportOptions.label7',
    value: 7,
  },
  {
    label: 'xgssSupportOptions.label8',
    value: 8,
  },
  {
    label: 'xgssSupportOptions.label9',
    value: 9,
  },
];
// 挖掘来源
export const sourceOptions = [
  {
    label: 'sourceOptions.label1',
    value: 1,
  },
  {
    label: 'sourceOptions.label2',
    value: 2,
  },
  {
    label: 'sourceOptions.label3',
    value: 3,
  },
];
// 竞对提示
export const JDPlaceholder = {
  1: 'placeholder12',
  2: 'placeholder11'
};
// 搜索引擎
export const engineOptions1 = [
  {
    label: 'engineOptions.label1',
    value: 1,
  },
  {
    label: 'engineOptions.label2',
    value: 2,
  },
  {
    label: 'engineOptions.label3',
    value: 3,
  },
  {
    label: 'engineOptions.label4',
    value: 4,
  },
  {
    label: 'engineOptions.label5',
    value: 5,
  },
  {
    label: 'engineOptions.label6',
    value: 6,
  },
];
// 搜索引擎
export const engineOptions2 = [
  {
    label: 'engineOptions.label1',
    value: 1,
  },
  {
    label: 'engineOptions.label2',
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
    label: 'customOptions.label0',
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
    label: 'lengthOptions.unlimited',
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
    label: 'lengthOptions.unlimited',
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
// 裂变数量选项（页面直显中文）
export const LBDepthOptions = [
  { label: 'LBDepthOptions.label1', value: 2 },
  { label: 'LBDepthOptions.label2', value: 3 },
  { label: 'LBDepthOptions.label3', value: 4 },
  { label: 'LBDepthOptions.label4', value: 5 },
];
// 排列顺序
export const LBOrderOptions = [
  { label: 'LBOrderOptions.label1', value: 1 },
  { label: 'LBOrderOptions.label2', value: 2 },
  { label: 'LBOrderOptions.label3', value: 3 },
];
// 组合方式
export const orderOptions = [
  {
    label: 'orderOptions.label1',
    value: 1,
  },
  {
    label: 'orderOptions.label2',
    value: 2,
  },
  {
    label: 'orderOptions.label3',
    value: 3,
  },
  {
    label: 'orderOptions.label4',
    value: 4,
  },
  {
    label: 'orderOptions.label5',
    value: 5,
  },
  {
    label: 'orderOptions.label6',
    value: 6,
  },
  {
    label: 'orderOptions.label7',
    value: 7,
  },
  {
    label: 'orderOptions.label8',
    value: 8,
  },
];
// 任务类型
export const typeOptions = [
  {
    label: 'typeOptions.label0',
    value: 0,
  },
  {
    label: 'typeOptions.label-1',
    value: -1,
  },
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
  {
    label: 'typeOptions.label5',
    value: 5,
  },
  {
    label: 'typeOptions.label6',
    value: 6,
  },
  {
    label: 'typeOptions.label7',
    value: 7,
  },
  {
    label: 'typeOptions.label8',
    value: 8,
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
    slotName: 'number',
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
    title: 'taskTableColumns.title5',
    dataIndex: 'website',
    slotName: 'website',
    width: 300,
    titleSlotName: 'header'
  },
  {
    title: 'taskTableColumns.title6',
    dataIndex: 'updateTime',
    slotName: 'updateTime',
    width: 160,
    titleSlotName: 'header'
  },
  {
    title: 'taskTableColumns.title7',
    dataIndex: 'actions',
    slotName: 'actions',
    fixed: 'right',
    width: 260,
    titleSlotName: 'header'
  },
];

// AI过滤选项
export const GLEngineOptions = [
  {
    label: 'GLEngineOptions.label1',
    value: 1,
  },
  {
    label: 'GLEngineOptions.label2',
    value: 2,
  },
  {
    label: 'GLEngineOptions.label3',
    value: 3,
  },
  {
    label: 'GLEngineOptions.label4',
    value: 4,
  },
  {
    label: 'GLEngineOptions.label5',
    value: 5,
  },
  {
    label: 'GLEngineOptions.label6',
    value: 6,
  },
  {
    label: 'GLEngineOptions.label7',
    value: 7,
  },
  {
    label: 'GLEngineOptions.label8',
    value: 8,
  },
];
// 清洗任务初始表单
export const clearFormDefault = {
  // 包含关键字开关：0：关闭，1：开启
  include: 0,
  // 包含关键字
  includeKeyword: '',
  // 不含关键字开关：0：关闭，1：开启
  exclude: 0,
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
  // AI过滤
  engineTypes: []
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
  include: 0,
  // 包含关键字
  includeKeyword: '',
  // 不含关键字开关：0：关闭，1：开启
  exclude: 0,
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
    label: 'weightOptions.label0',
    value: 0,
  },
  {
    label: 'weightOptions.label1',
    value: 1,
  },
  {
    label: 'weightOptions.label2',
    value: 2,
  },
  {
    label: 'weightOptions.label3',
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
    title: 'myTableColumns.title2',
    dataIndex: 'taskName',
    width: 200,
    titleSlotName: 'header'
  },
  {
    title: 'myTableColumns.title3',
    dataIndex: 'website',
    slotName: 'website',
    width: 300,
    titleSlotName: 'header'
  },
  {
    title: 'myTableColumns.title4',
    dataIndex: 'updateTime',
    slotName: 'updateTime',
    width: 160,
    titleSlotName: 'header'
  },
  {
    title: 'myTableColumns.title5',
    dataIndex: 'actions',
    slotName: 'actions',
    fixed: 'right',
    width: 70,
    titleSlotName: 'header'
  },
];
