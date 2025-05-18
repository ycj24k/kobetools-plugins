// 添加词库表单
export const wordFormDefault = {
  keyword: [],
  type: 1,
  addType: 1,
  groupName: '',
  groupId: ''
};
// 添加类型
export const addOptions = [
  {
    label: 'addOptions.label1',
    value: 1,
  },
  {
    label: 'addOptions.label2',
    value: 2,
  },
];
// 词库类型
export const typeOptions = [
  {
    label: 'typeOptions.label1',
    value: 1,
  },
  {
    label: 'typeOptions.label2',
    value: 2,
  },
];
// 词库组表格
export const groupTableColumns = [
  {
    title: 'groupTableColumns.title1',
    titleSlotName: 'header',
    dataIndex: 'id',
    slotName: 'id',
  },
  {
    title: 'groupTableColumns.title2',
    titleSlotName: 'header',
    dataIndex: 'type',
    slotName: 'type',
  },
  {
    title: 'groupTableColumns.title3',
    titleSlotName: 'header',
    dataIndex: 'name',
    slotName: 'name',
  },
  {
    title: 'groupTableColumns.title4',
    titleSlotName: 'header',
    dataIndex: 'number',
  },
  {
    title: 'groupTableColumns.title5',
    titleSlotName: 'header',
    dataIndex: 'update_time',
    slotName: 'update_time',
  },
  {
    title: 'groupTableColumns.title6',
    titleSlotName: 'header',
    dataIndex: 'actions',
    slotName: 'actions',
    width: 280,
  },
];


// 敏感词表格
export const sensitiveTableColumns = [
  {
    title: 'sensitiveTableColumns.title1',
    titleSlotName: 'header',
    dataIndex: 'id',
    slotName: 'id',
  },
  {
    title: 'sensitiveTableColumns.title2',
    titleSlotName: 'header',
    dataIndex: 'name',
    slotName: 'name',
  },
  {
    title: 'sensitiveTableColumns.title3',
    titleSlotName: 'header',
    dataIndex: 'groupName',
  },
  {
    title: 'sensitiveTableColumns.title4',
    titleSlotName: 'header',
    dataIndex: 'update_time',
    slotName: 'update_time',
  },
  {
    title: 'sensitiveTableColumns.title5',
    titleSlotName: 'header',
    dataIndex: 'actions',
    slotName: 'actions',
    width: 280,
  },
];

// 同义词表格
export const synonymTableColumns = [
  {
    title: 'sensitiveTableColumns.title1',
    titleSlotName: 'header',
    dataIndex: 'id',
    slotName: 'id',
  },
  {
    title: 'sensitiveTableColumns.title2',
    titleSlotName: 'header',
    dataIndex: 'name',
    slotName: 'name',
  },
  {
    title: 'sensitiveTableColumns.title3',
    titleSlotName: 'header',
    dataIndex: 'replace',
    slotName: 'replace',
  },
  {
    title: 'sensitiveTableColumns.title4',
    titleSlotName: 'header',
    dataIndex: 'groupName',
  },
  {
    title: 'sensitiveTableColumns.title5',
    titleSlotName: 'header',
    dataIndex: 'update_time',
    slotName: 'update_time',
  },
  {
    title: 'sensitiveTableColumns.title6',
    titleSlotName: 'header',
    dataIndex: 'actions',
    slotName: 'actions',
    width: 280,
  },
];