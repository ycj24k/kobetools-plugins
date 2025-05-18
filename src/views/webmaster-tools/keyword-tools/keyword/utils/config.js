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
  depth: '',
  // 包含关键字开关：0：关闭，1：开启
  include: 0,
  // 包含关键字
  includeKeyword: [],
  // 不含关键字开关：0：关闭，1：开启
  exclude: 0,
  // 不含关键字
  excludeKeyword: [],
  // 保留原始词开关：0：关闭，1：开启
  reserve: 0,
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
  sensitiveFilterVal: 1,
  // 违禁词过滤自定义词库
  sensitiveCustom: '',
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
  sensitiveFilterVal: 1,
  // 违禁词过滤自定义词库
  sensitiveCustom: '',
};

// 包含关键词
export const includeOptions = [
  {
    label: 'includeOptions.label1',
    value: 1,
  },
  {
    label: 'includeOptions.label2',
    value: 0,
  },
];

// 不包含关键词
export const excludeOptions = [
  {
    label: 'includeOptions.label1',
    value: 1,
  },
  {
    label: 'includeOptions.label2',
    value: 0,
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
    label: 'lengthMinOptions.label1',
    value: 0,
  },
  {
    label: 'lengthMinOptions.label2',
    value: 4,
  },
  {
    label: 'lengthMinOptions.label3',
    value: 5,
  },
  {
    label: 'lengthMinOptions.label4',
    value: 6,
  },
  {
    label: 'lengthMinOptions.label5',
    value: 7,
  },
  {
    label: 'lengthMinOptions.label6',
    value: 8,
  },
];
// 字符过滤最大
export const lengthMaxOptions = [
  {
    label: 'lengthMaxOptions.label1',
    value: 0,
  },
  {
    label: 'lengthMaxOptions.label2',
    value: 10,
  },
  {
    label: 'lengthMaxOptions.label3',
    value: 15,
  },
  {
    label: 'lengthMaxOptions.label4',
    value: 20,
  },
  {
    label: 'lengthMaxOptions.label5',
    value: 25,
  },
  {
    label: 'lengthMaxOptions.label6',
    value: 30,
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
    title: 'taskTableColumns.title5',
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
  include: 0,
  // 包含关键字
  includeKeyword: [],
  // 不含关键字开关：0：关闭，1：开启
  exclude: 0,
  // 不含关键字
  excludeKeyword: [],
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
  sensitiveFilterVal: 1,
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
  include: 0,
  // 包含关键字
  includeKeyword: [],
  // 不含关键字开关：0：关闭，1：开启
  exclude: 0,
  // 不含关键字
  excludeKeyword: [],
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
  sensitiveFilterVal: 1,
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
    title: 'myTableColumns.title2',
    dataIndex: 'weight',
    slotName: 'weight',
    width: 100,
    titleSlotName: 'header'
  },
  {
    title: 'myTableColumns.title3',
    dataIndex: 'taskName',
    width: 200,
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
    fixed: 'right',
    width: 70,
    titleSlotName: 'header'
  },
];
