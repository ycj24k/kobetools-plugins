// 标题初始表单
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
  sensitiveFilterVal: 1,
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
    width: 300,
    titleSlotName: 'header'
  },
];
// 清洗任务初始表单
export const clearFormDefault = {
  // 违禁词过滤开关：0：关闭，1：开启
  sensitiveFilter: 0,
  // 违禁词过滤
  sensitiveFilterVal: 1,
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
  include: 0,
  // 包含关键字
  includeKeyword: [],
  // 不含关键字开关：0：关闭，1：开启
  exclude: 0,
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
  sensitiveFilterVal: 1,
  // 违禁词过滤自定义词库
  sensitiveCustom: '',
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
