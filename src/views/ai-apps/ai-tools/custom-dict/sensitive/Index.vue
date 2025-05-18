<template>
  <div class="container">
    <div class="container_box">
      <a-form class="form_box" ref="queryFormRef" layout="vertical" hide-label :model="queryForm">
        <a-grid :col-gap="24" :row-gap="12">
          <a-grid-item :span="4" class="flex_box">
            <a-form-item field="name">
              <a-input v-model="queryForm.name" :placeholder="localeGet('placeholder1')" />
            </a-form-item>
          </a-grid-item>
          <a-grid-item :span="4" class="flex_box">
            <a-form-item field="type">
              <a-select v-model="queryForm.type" :options="groupList" allow-search :placeholder="localeGet('placeholder2')" />
            </a-form-item>
          </a-grid-item>
          <a-grid-item :span="4">
            <div class="flex_box form_btns">
              <a-button class="form_btn1" type="primary" @click="handleSearch">{{ localeGet('btn1') }}</a-button>
              <a-button class="form_btn5" type="primary" @click="handleExport('txt')">{{ localeGet('btn2') }}</a-button>
              <a-button class="form_btn5" type="primary" @click="handleExport('csv')">{{ localeGet('btn3') }}</a-button>
              <a-button class="form_btn7" type="outline" @click="handleReset">{{ localeGet('btn4') }}</a-button>
              <a-button type="outline" @click="handleRefresh">{{ localeGet('btn5') }}</a-button>
            </div>
          </a-grid-item>
        </a-grid>
      </a-form>
      <div class="table_box">
        <a-table column-resizable :bordered="{ cell: true }" :loading="tableLoading" :columns="sensitiveTableColumns" :data="tableData" :row-selection="rowSelection" v-model:selectedKeys="selectedKeys" :pagination="pagination" @page-size-change="handlePageSizeChange" :scroll="{ x: '100%', y: 500 }">
          <template #header="{ column }">
            <div>{{ localeGet(column.title) }}</div>
          </template>
          <template #name="{ rowIndex }">
            <a-input @change="handleSaveChange(rowIndex, 'name')" v-model="tableData[rowIndex].name" />
          </template>
          <template #update_time="{ rowIndex }">
            <div>{{ dayjs(tableData[rowIndex].update_time * 1000).format('YYYY-MM-DD hh:mm') }}</div>
          </template>
          <template #actions="{ rowIndex }">
            <div class="flex_box flex_row_between table_btns">
              <a-popconfirm position="left" :content="localeGet('message1')" @ok="handleDelete(rowIndex)">
                <a-button size="mini" style="color: #333">{{ localeGet('btn6') }}</a-button>
              </a-popconfirm>
            </div>
          </template>
        </a-table>
        <div class="table_save">
          <a-button class="form_btn5" type="primary" @click="handleSave">{{ localeGet('btn7') }}</a-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { Message } from '@arco-design/web-vue';
import dayjs from 'dayjs';
import { wordList, wordSave, wordDel, wordGroupList } from '@/api/apps/tools/custom';
import { sensitiveTableColumns } from '../utils/config';
import { exportModal } from '@/utils';
import localeConfig from './zh-CN.js';
import { useRoute } from 'vue-router';

const route = useRoute();
// 多语言
const localeData = ref({});
localeData.value = localeConfig;
const localeGet = (key) => {
  return localeData.value[key];
};

// 监听函数
function dataListener(data) {
  console.log('来自主应用的数据', data);
  if (data&&data.locales) localeData.value = data.locales;
}
// 监听数据变化，初始化时如果有数据则主动触发一次
//@ts-ignore
if (window.microApp) window.microApp.addDataListener(dataListener, true);

// 词库组
const groupList = ref([]);
const getGroupList = async () => {
  try {
    const res = await wordGroupList({ type: 1 });
    groupList.value = res.data.data;
  } catch (error) {
    groupList.value = [];
  }
};
getGroupList();

const selectedKeys = ref([]);
const rowSelection = reactive({
  showCheckedAll: true,
  onlyCurrent: false,
});
const pagination = ref({ pageSize: 100, showPageSize: true, pageSizeOptions: [100, 200, 500, 1000, 2000] });
const queryFormRef = ref(null);
const queryForm = ref({
  type: '',
  name: '',
  page: 0,
  limit: 100,
});
const tableLoading = ref(false);
const tableData = ref([]);
const tableDataAll = ref([]);
// 保存数据
const saveForm = ref({
  data: [],
});
// 获取列表
const getList = async () => {
  tableLoading.value = true;
  try {
    const res = await wordList(queryForm.value);
    tableData.value = res.data.data;
    tableDataAll.value = res.data.data;
  } catch (error) {
    tableData.value = [];
    tableDataAll.value = [];
  }
  tableLoading.value = false;
  saveForm.value.data = [];
};
getList();
// 分页发生改变
const handlePageSizeChange = (pageSize) => {
  queryForm.value.page = 1;
  queryForm.value.limit = pageSize;
  pagination.value.pageSize = pageSize;
  getList();
};
// 搜索
const handleSearch = () => {
  const list = filteredData();
  tableData.value = list;
};
const filteredData = () => {
  return tableDataAll.value.filter((item) => {
    return (!queryForm.value.name || (queryForm.value.name && item.name.toLowerCase().includes(queryForm.value.name.toLowerCase()))) && (!queryForm.value.type || (queryForm.value.type && item.type.toString().includes(queryForm.value.type)));
  });
};
// 重置
const handleReset = () => {
  queryFormRef.value.resetFields();
};
// 刷新
const handleRefresh = async () => {
  await getList();
  handleSearch();
};
// 保存数据获取
const handleSaveChange = (rowIndex, type) => {
  let list = saveForm.value.data;
  const row = tableData.value[rowIndex];
  let index = list.findIndex((item) => item.id === row.id);
  if (index === -1) {
    let item = {
      id: row.id,
      [type]: row[type],
    };
    list.push(item);
  } else {
    list[index][type] = row[type];
  }
};
// 保存
const handleSave = () => {
  if (saveForm.value.data.length === 0) {
    return Message.warning(localeGet('message2'));
  }
  wordSave(saveForm.value)
    .then((res) => {
      Message.success(localeGet('message3'));
      getList();
    })
    .catch(() => {});
};

// 导出
const handleExport = (e) => {
  const selects = tableData.value.filter((item) => selectedKeys.value.includes(item.id));
  exportModal(tableData.value, selects, route.name, e);
};
// 删除
const handleDelete = (rowIndex) => {
  wordDel({
    id: tableData.value[rowIndex].id,
  })
    .then((res) => {
      Message.success(localeGet('message4'));
      getList();
    })
    .catch(() => {});
};
</script>

<script>
export default {
  name: 'CustomSensitive', // If you want the include property of keep-alive to take effect, you must name the component
};
</script>

<style lang="less" scoped>
@import '@/assets/style/table.less';
</style>
