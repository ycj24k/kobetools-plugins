import { file } from "jszip";

// 关键词过滤初始表单
export const GLFormDefault = {
  // 文件
  file: null,
  // 关键词
  keywords: '',
  // 搜索引擎
  engineTypes: [],
  // 包含关键字开关：0：任一项，1：所有项
  includeType: 0,
  // 包含关键字
  includeKeywords: [],
  // 不含关键字开关：0：任一项，1：所有项
  excludeType: 0,
  // 不含关键字
  excludeKeywords: [],
  // 字符长度过滤开关：false：关闭，true：开启
  lengthFilterEnabled: true,
  // 字符长度过滤
  minLength: 0,
  maxLength: 0,
  // 违禁词过滤开关：false：关闭，true：开启
  sensitiveFilter: false,
  // 违禁词过滤
  sensitiveFilterVal: 0,
};

// 包含关键词
export const includeOptions = [
  {
    label: '任一项',
    value: 0,
  },
  {
    label: '所有项',
    value: 1,
  },
];

// 不包含关键词
export const excludeOptions = [
  {
    label: '任一项',
    value: 0,
  },
  {
    label: '所有项',
    value: 1,
  },
];
// 选择方式
export const uploadTypeOptions = [
  {
    label: '手动录入',
    value: 1,
  },
  {
    label: '文件上传',
    value: 2,
  },
];
// 搜索引擎
export const GLEngineOptions = [
  {
    label: '无效关键词',
    value: 1,
  },
  {
    label: '疑似品牌词',
    value: 2,
  },
  {
    label: '联系方式词',
    value: 3,
  },
  {
    label: '违禁敏感词',
    value: 4,
  },
  {
    label: '知识科普词',
    value: 5,
  },
  {
    label: '疑问解答词',
    value: 6,
  },
  {
    label: '图片视频词',
    value: 7,
  },
  {
    label: '低价值词',
    value: 8,
  },
];
// 违禁词过滤
export const customOptions = [
  {
    label: '公有词库',
    value: 0,
  },
  {
    label: '政治类',
    value: 1,
  },
  {
    label: '公共词库别删',
    value: 2,
  },
  {
    label: '公共正文过滤别删',
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
