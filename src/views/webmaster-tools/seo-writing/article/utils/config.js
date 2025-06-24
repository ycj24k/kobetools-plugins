// 标题生成文章
export const articleFormDefault = {
  //---洗稿字段
  // 格式过滤
  formatFilter: [],
  // 标题违禁词过滤开关：0：关闭，1：开启
  sensitiveTitleFilter: 0,
  // 标题违禁词过滤
  sensitiveTitleFilterVal: 0,
  // 标题违禁词过滤自定义词库
  sensitiveTitleCustom: '',
  // 原标题改写开关：0：关闭，1：开启
  rewrite: 0,
  // 包含文字开关：0：关闭，1：开启
  include: 0,
  // 包含文字
  includeKeyword: [],
  // 不含文字开关：0：关闭，1：开启
  exclude: 0,
  // 不含文字
  excludeKeyword: [],
  //---洗稿字段

  // 任务添加类型： 1: 标题生成文章，4: 本地文章在线洗稿
  type: 1,
  // 任务ID
  taskId: '',
  // 生成方式
  way: 1,
  // 当前标题任务语言类型
  titleLang: 1,
  // 文章语言类型
  articleLang: 1,
  // 文章素材源
  source: 1,
  // 字符长度过滤开关：0：关闭，1：开启
  lengthFilter: 1,
  // 字符长度过滤
  lengthFilterVal: {
    min: 800,
    max: 0,
  },
  // 正文智能开头结尾：0：关闭，1：开启
  intelligence: 0,
  // 正文小标题个数开关：0：关闭，1：开启
  titleNum: 1,
  // 正文小标题个数
  titleNumVal: 2,
  // 正文小标题个数多个
  titleNumMore: {
    min: 4,
    max: 7,
  },
  // 多个小标题自动生成目录：0：关闭，1：开启
  autoContent: 0,
  // 多个小标题自动生成目录
  autoContentVal: '',
  // 正文小标题前加序号开关：0：关闭，1：开启
  titleAddNum: 0,
  // 每个段落前加序号开关：0：关闭，1：开启
  paragraphAddNum: 0,
  // 段落缩进开关：0：关闭，1：开启
  paragraphIndent: 0,
  // 违禁词过滤开关：0：关闭，1：开启
  sensitiveFilter: 1,
  // 违禁词过滤
  sensitiveFilterVal: 0,
  // 违禁词过滤自定义词库
  sensitiveCustom: '',
  // 同义词替换开关：0：关闭，1：开启
  synonymFilter: 1,
  // 同义词替换
  synonymFilterVal: 1,
  // 同义词替换自定义词库
  synonymCustom: '',
  // 文章打乱
  disturb: 0,
  // 自动内链锚文本：0：关闭，1：开启
  autoLink: 0,
  autoLinkVal: '',
  // 文章自动配图：0：关闭，1：开启
  autoImg: 0,
  autoImgVal: '',
  // 图片对齐方式
  imgAlign: 1,
  // 自动标题配图：0：关闭，1：开启
  autoTitleImg: 0,
  // 自动图片Alt标签：0：关闭，1：开启
  autoImgAlt: 0,
  // 自动图片标题：0：关闭，1：开启
  autoImgTitle: 0,
  // 图片底部空行：0：关闭，1：开启
  imgSpace: 0,
  // 水印设置
  watermark: 1,
  // 小标题配图
  titleImg: '',
  // 小标题配图位置
  imgPosition: '',
};
// 本地文章在线洗稿
export const washDraftFormDefault = {
  //---生成文章字段
  // 字符长度过滤开关：0：关闭，1：开启
  lengthFilter: 0,
  // 字符长度过滤
  lengthFilterVal: {
    min: 0,
    max: 0,
  },
  // 正文智能开头结尾：0：关闭，1：开启
  intelligence: 0,
  // 正文小标题个数开关：0：关闭，1：开启
  titleNum: 0,
  // 正文小标题个数
  titleNumVal: 0,
  // 正文小标题个数多个
  titleNumMore: {
    min: 0,
    max: 0,
  },
  // 多个小标题自动生成目录：0：关闭，1：开启
  autoContent: 0,
  // 多个小标题自动生成目录
  autoContentVal: '',
  // 正文小标题前加序号开关：0：关闭，1：开启
  titleAddNum: 0,
  // 每个段落前加序号开关：0：关闭，1：开启
  paragraphAddNum: 0,
  // 段落缩进开关：0：关闭，1：开启
  paragraphIndent: 0,
  //---生成文章字段

  // 任务添加类型： 1: 标题生成文章，4: 本地文章在线洗稿
  type: 4,
  // 任务ID
  taskId: '',
  // 生成方式
  way: 1,
  // 原文语言类型
  titleLang: 1,
  // 输入语言类型
  articleLang: 1,
  // 洗稿设置
  source: 1,
  // 格式过滤
  formatFilter: [],
  // 正文违禁词过滤开关：0：关闭，1：开启
  sensitiveFilter: 1,
  // 正文违禁词过滤
  sensitiveFilterVal: 0,
  // 正文违禁词过滤自定义词库
  sensitiveCustom: '',
  // 标题违禁词过滤开关：0：关闭，1：开启
  sensitiveTitleFilter: 1,
  // 标题违禁词过滤
  sensitiveTitleFilterVal: 1,
  // 标题违禁词过滤自定义词库
  sensitiveTitleCustom: '',
  // 原标题改写开关：0：关闭，1：开启
  rewrite: 0,
  // 同义词替换开关：0：关闭，1：开启
  synonymFilter: 1,
  // 同义词替换
  synonymFilterVal: 1,
  // 同义词替换自定义词库
  synonymCustom: '',
  // 文章打乱
  disturb: 0,
  // 自动内链锚文本：0：关闭，1：开启
  autoLink: 0,
  autoLinkVal: '',
  // 文章自动配图：0：关闭，1：开启
  autoImg: 0,
  autoImgVal: '',
  // 图片对齐方式
  imgAlign: 1,
  // 自动标题配图：0：关闭，1：开启
  autoTitleImg: 0,
  // 自动图片Alt标签：0：关闭，1：开启
  autoImgAlt: 0,
  // 自动图片标题：0：关闭，1：开启
  autoImgTitle: 0,
  // 图片底部空行：0：关闭，1：开启
  imgSpace: 0,
  // 水印设置
  watermark: 1,
  // 小标题配图
  titleImg: '',
  // 小标题配图位置
  imgPosition: '',
  // 包含文字开关：0：关闭，1：开启
  include: 0,
  // 包含文字
  includeKeyword: [],
  // 不含文字开关：0：关闭，1：开启
  exclude: 0,
  // 不含文字
  excludeKeyword: [],
};

// 生成方式
export const wayOptions = [
  {
    label: 'wayOptions.label1',
    value: 1,
  },
  {
    label: 'wayOptions.label2',
    value: 2,
  },
];
// 语言类型
export const langOptions = [
  {
    label: 'langOptions.label1',
    value: 1,
  },
  {
    label: 'langOptions.label2',
    value: 2,
  },
  {
    label: 'langOptions.label3',
    value: 3,
  },
  {
    label: 'langOptions.label4',
    value: 4,
  },
  {
    label: 'langOptions.label5',
    value: 5,
  },
  {
    label: 'langOptions.label6',
    value: 6,
  },
  {
    label: 'langOptions.label7',
    value: 7,
  },
  {
    label: 'langOptions.label8',
    value: 8,
  },
  {
    label: 'langOptions.label9',
    value: 9,
  },
  {
    label: 'langOptions.label10',
    value: 10,
  },
  {
    label: 'langOptions.label11',
    value: 11,
  },
  {
    label: 'langOptions.label12',
    value: 12,
  },
  {
    label: 'langOptions.label13',
    value: 13,
  },
  {
    label: 'langOptions.label14',
    value: 14,
  },
  {
    label: 'langOptions.label15',
    value: 15,
  },
];
// 文章素材源
export const sourceOptions = [
  {
    label: 'sourceOptions.label1',
    value: 1,
  },
  {
    label: 'sourceOptions.label2',
    value: 2,
  },
];
// 素材长度过滤
export const lengthOptions = [
  {
    label: 'lengthOptions.label1',
    value: 0,
  },
  {
    label: 'lengthOptions.label2',
    value: 100,
  },
  {
    label: 'lengthOptions.label3',
    value: 200,
  },
  {
    label: 'lengthOptions.label4',
    value: 500,
  },
  {
    label: 'lengthOptions.label5',
    value: 800,
  },
  {
    label: 'lengthOptions.label6',
    value: 1000,
  },
  {
    label: 'lengthOptions.label7',
    value: 2000,
  },
];
// 正文小标题个数
export const titleNumOptions = [
  {
    label: 'titleNumOptions.label1',
    value: 3,
  },
  {
    label: 'titleNumOptions.label2',
    value: 1,
  },
  {
    label: 'titleNumOptions.label3',
    value: 2,
  },
];

// 正文小标题多个长度
export const titleNumMinOptions = [
  {
    label: 'titleNumMinOptions.label1',
    value: 3,
  },
  {
    label: 'titleNumMinOptions.label2',
    value: 4,
  },
  {
    label: 'titleNumMinOptions.label3',
    value: 5,
  },
  {
    label: 'titleNumMinOptions.label4',
    value: 6,
  },
];
export const titleNumMaxOptions = [
  {
    label: 'titleNumMaxOptions.label1',
    value: 3,
  },
  {
    label: 'titleNumMaxOptions.label2',
    value: 4,
  },
  {
    label: 'titleNumMaxOptions.label3',
    value: 5,
  },
  {
    label: 'titleNumMaxOptions.label4',
    value: 6,
  },
  {
    label: 'titleNumMaxOptions.label5',
    value: 7,
  },
  {
    label: 'titleNumMaxOptions.label6',
    value: 8,
  },
  {
    label: 'titleNumMaxOptions.label7',
    value: 9,
  },
  {
    label: 'titleNumMaxOptions.label8',
    value: 10,
  },
];
// 多个小标题自动生成目录
export const autoContentOptions = [
  {
    label: 'autoContentOptions.label1',
    value: 1,
  },
  {
    label: 'autoContentOptions.label2',
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

// 同义词替换
export const synonymOptions = [
  {
    label: 'synonymOptions.label1',
    value: 1,
  },
  {
    label: 'synonymOptions.label2',
    value: 2,
  },
];
// 同义词替换定义
export const synonymCustomOptions = [
  {
    label: 'synonymCustomOptions.label1',
    value: 1,
  },
  {
    label: 'synonymCustomOptions.label2',
    value: 2,
  },
  {
    label: 'synonymCustomOptions.label3',
    value: 3,
  },
];

// 文章打乱
export const disturbOptions = [
  {
    label: 'disturbOptions.label1',
    value: 0,
  },
  {
    label: 'disturbOptions.label2',
    value: 2,
  },
  {
    label: 'disturbOptions.label3',
    value: 3,
  },
  {
    label: 'disturbOptions.label4',
    value: 4,
  },
];

// 自动内链锚文本
export const autoLinkOptions = [
  {
    label: 'autoLinkOptions.label1',
    value: 1,
  },
  {
    label: 'autoLinkOptions.label2',
    value: 2,
  },
];

// 自动配图
export const autoImgOptions = [
  {
    label: 'autoImgOptions.label',
    value: 1,
  },
];

// 图片对齐方式
export const imgAlignOptions = [
  {
    label: 'imgAlignOptions.label1',
    value: 1,
  },
  {
    label: 'imgAlignOptions.label2',
    value: 2,
  },
  {
    label: 'imgAlignOptions.label3',
    value: 3,
  },
];

// 水印设置
export const watermarkOptions = [
  {
    label: 'watermarkOptions.label1',
    value: 1,
  },
  {
    label: 'watermarkOptions.label2',
    value: 2,
  },
];

// 正文小标题配图
export const titleImgOptions = [
  {
    label: 'titleImgOptions.label1',
    value: 1,
  },
  {
    label: 'titleImgOptions.label2',
    value: 2,
  },
];

// 小标题配图位置
export const imgPositionOptions = [
  {
    label: 'imgPositionOptions.label1',
    value: 1,
  },
  {
    label: 'imgPositionOptions.label2',
    value: 2,
  },
  {
    label: 'imgPositionOptions.label3',
    value: 3,
  },
  {
    label: 'imgPositionOptions.label4',
    value: 4,
  },
];
// 文章格式过滤
export const formatOptions = [
  {
    label: 'formatOptions.label1',
    value: 1,
  },
  {
    label: 'formatOptions.label2',
    value: 2,
  },
  {
    label: 'formatOptions.label3',
    value: 3,
  },
  {
    label: 'formatOptions.label4',
    value: 4,
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
    titleSlotName: 'header',
    dataIndex: 'id',
    slotName: 'id',
    width: 80,
  },
  {
    title: 'taskTableColumns.title2',
    titleSlotName: 'header',
    dataIndex: 'name',
    slotName: 'name',
    width: 500,
  },
  {
    title: 'taskTableColumns.title3',
    titleSlotName: 'header',
    dataIndex: 'number',
    width: 100,
  },
  {
    title: 'taskTableColumns.title4',
    titleSlotName: 'header',
    dataIndex: 'type',
    slotName: 'type',
    width: 120,
  },
  {
    title: 'taskTableColumns.title5',
    titleSlotName: 'header',
    dataIndex: 'website',
    slotName: 'website',
    width: 300,
  },
  {
    title: 'taskTableColumns.title6',
    titleSlotName: 'header',
    dataIndex: 'update_time',
    slotName: 'update_time',
    width: 160,
  },
  {
    title: 'taskTableColumns.title7',
    titleSlotName: 'header',
    dataIndex: 'actions',
    slotName: 'actions',
    width: 210,
  },
];
// 我的任务
export const myTableColumns = [
  {
    title: 'taskTableColumns.title1',
    titleSlotName: 'header',
    dataIndex: 'title',
    slotName: 'title',
    width: 300,
  },
  {
    title: 'taskTableColumns.title2',
    titleSlotName: 'header',
    dataIndex: 'subtitle',
    slotName: 'subtitle',
    width: 300,
  },
  {
    title: 'taskTableColumns.title3',
    titleSlotName: 'header',
    dataIndex: 'taskName',
    width: 200,
  },
  {
    title: 'taskTableColumns.title4',
    titleSlotName: 'header',
    dataIndex: 'website',
    slotName: 'website',
    width: 300,
  },
  {
    title: 'taskTableColumns.title5',
    titleSlotName: 'header',
    dataIndex: 'update_time',
    slotName: 'update_time',
    width: 160,
  },
  {
    title: 'taskTableColumns.title6',
    titleSlotName: 'header',
    dataIndex: 'actions',
    slotName: 'actions',
    fixed: 'right',
    width: 150,
  },
];
