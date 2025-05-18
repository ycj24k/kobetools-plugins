// 配图分组表格
export const storageTableColumns = [
  {
    title: 'storageTableColumns.title1',
    titleSlotName: 'header',
    dataIndex: 'id',
    slotName: 'id',
    width: 80,
  },
  {
    title: 'storageTableColumns.title2',
    titleSlotName: 'header',
    dataIndex: 'name',
    slotName: 'name',
    width: 400,
  },
  {
    title: 'storageTableColumns.title3',
    titleSlotName: 'header',
    dataIndex: 'update_time',
    slotName: 'update_time',
    width: 200,
  },
  {
    title: 'storageTableColumns.title4',
    titleSlotName: 'header',
    dataIndex: 'actions',
    slotName: 'actions',
    width: 150,
  },
];
// 配图分组表单
export const storageFormDefault = {
	id: '',
  data: {
    // 分组名称
	  name: '',
  }
};

// 内链分组表格
export const innerlinkTableColumns = [
  {
    title: 'innerlinkTableColumns.title1',
    titleSlotName: 'header',
    dataIndex: 'id',
    slotName: 'id',
    width: 80,
  },
  {
    title: 'innerlinkTableColumns.title2',
    titleSlotName: 'header',
    dataIndex: 'name',
    slotName: 'name',
    width: 400,
  },
  {
    title: 'innerlinkTableColumns.title3',
    titleSlotName: 'header',
    dataIndex: 'update_time',
    slotName: 'update_time',
    width: 200,
  },
  {
    title: 'innerlinkTableColumns.title4',
    titleSlotName: 'header',
    dataIndex: 'actions',
    slotName: 'actions',
    width: 150,
  },
];
// 内链分组表单
export const innerlinkFormDefault = {
	id: '',
  data: {
    // 分组名称
	  name: '',
  }
};


// 内链详情表格
export const innerlinkDetailTableColumns = [
  {
    title: 'innerlinkDetailTableColumns.title1',
    titleSlotName: 'header',
    dataIndex: 'id',
    slotName: 'id',
    width: 80,
  },
  {
    title: 'innerlinkDetailTableColumns.title2',
    titleSlotName: 'header',
    dataIndex: 'name',
    slotName: 'name',
    width: 300,
  },
  {
    title: 'innerlinkDetailTableColumns.title3',
    titleSlotName: 'header',
    dataIndex: 'strong',
    slotName: 'strong',
    width: 100,
  },
  {
    title: 'innerlinkDetailTableColumns.title4',
    titleSlotName: 'header',
    dataIndex: 'link',
    slotName: 'link',
    width: 400,
  },
  {
    title: 'innerlinkDetailTableColumns.title5',
    titleSlotName: 'header',
    dataIndex: 'sort',
    slotName: 'sort',
    width: 100,
  },
  {
    title: 'innerlinkDetailTableColumns.title6',
    titleSlotName: 'header',
    dataIndex: 'create_time',
    slotName: 'create_time',
    width: 160,
  },
  {
    title: 'innerlinkDetailTableColumns.title7',
    titleSlotName: 'header',
    dataIndex: 'actions',
    slotName: 'actions',
    width: 80,
  },
];
// 内链分组表单
export const innerlinkAddFormDefault = {
	tid: '',
  strong: '1',
  array: []
};
// 加粗
export const weightOptions = [
  {
    label: 'weightOptions.label1',
    value: '1',
  },
  {
    label: 'weightOptions.label2',
    value: '2',
  },
  {
    label: 'weightOptions.label3',
    value: '3',
  },
];

// AI配置表格
export const otherConfigTableColumns = [
  {
    title: 'otherConfigTableColumns.title1',
    titleSlotName: 'header',
    dataIndex: 'type',
    slotName: 'type',
  },
  {
    title: 'otherConfigTableColumns.title2',
    titleSlotName: 'header',
    dataIndex: 'username',
  },
  {
    title: 'otherConfigTableColumns.title3',
    titleSlotName: 'header',
    dataIndex: 'key',
  },
  {
    title: 'otherConfigTableColumns.title4',
    titleSlotName: 'header',
    dataIndex: 'actions',
    slotName: 'actions',
  },
];
// 内链分组表单
export const otherConfigAddFormDefault = {
	type: 1,
  username: '',
  key: '',
};
// AI类型
export const AIOptions = [
  {
    label: 'AIOptions.label1',
    value: 1,
  },
];