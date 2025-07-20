<template>
  <div class="container">
    <div class="container_box">
      <a-form class="form_box" ref="queryFormRef" layout="vertical" hide-label :model="queryForm">
        <a-grid :col-gap="24" :row-gap="12">
          <a-grid-item :span="4">
            <div class="flex_box form_btns">
              <a-button class="form_btn1" type="primary" @click="handleAdd">{{ localeGet('btn1') }}</a-button>
              <a-button type="outline" @click="getList">{{ localeGet('btn2') }}</a-button>
            </div>
          </a-grid-item>
        </a-grid>
      </a-form>
      <div class="table_box">
        <a-table column-resizable :bordered="{ cell: true }" :loading="tableLoading" :columns="storageTableColumns" :data="tableData" :row-selection="rowSelection" v-model:selectedKeys="selectedKeys" :pagination="pagination" @page-size-change="handlePageSizeChange" :scroll="{ x: '100%', y: 500 }">
          <template #header="{ column }">
            <div>{{ localeGet(column.title) }}</div>
          </template>
          <template #update_time="{ rowIndex }">
            <div>{{ dayjs(tableData[rowIndex].update_time * 1000).format('YYYY-MM-DD hh:mm') }}</div>
          </template>
          <template #actions="{ rowIndex }">
            <div class="flex_box flex_row_between table_btns">
              <a-button size="mini" class="form_btn5" @click="handleDetail(rowIndex)">{{ localeGet('btn3') }}</a-button>
              <a-button size="mini" class="form_btn3" @click="handleEdit(rowIndex)">{{ localeGet('btn4') }}</a-button>
              <a-popconfirm position="left" :content="localeGet('message1')" @ok="handleDelete(rowIndex)">
                <a-button size="mini" style="color: #333">{{ localeGet('btn5') }}</a-button>
              </a-popconfirm>
            </div>
          </template>
        </a-table>
      </div>
    </div>
    <!-- 添加storage -->
    <a-modal :mask-closable="false" l :esc-to-close="false" class="modal_box" v-model:visible="addVisible" width="600px">
      <template #title>
        <div class="flex_box modal_title">
          <div class="modal_title_icon">
            <icon-info-circle-fill />
          </div>
          <div class="modal_title_text">{{ localeGet('title1') }}</div>
        </div>
      </template>
      <a-form class="form_box" ref="addFormRef" layout="vertical" hide-label :model="addForm">
        <div class="form_item">
          <a-grid :col-gap="20" :row-gap="10" class="form_content">
            <a-grid-item :span="24" class="flex_box form_option">
              <div class="form_label"><span style="color: #ff0000">*</span>{{ localeGet('label1') }}</div>
              <a-form-item no-style field="name">
                <a-input v-model="addForm.data.name" :placeholder="localeGet('placeholder1')" />
              </a-form-item>
            </a-grid-item>
          </a-grid>
        </div>
      </a-form>
      <template #footer>
        <div class="flex_box flex_row_center modal_footer">
          <a-button style="color: #333" @click="addVisible = false">{{ localeGet('btn6') }}</a-button>
          <a-button class="form_btn3" @click="addSubmit">{{ localeGet('btn7') }}</a-button>
        </div>
      </template>
    </a-modal>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import dayjs from 'dayjs';
import { Message } from '@arco-design/web-vue';
import { storageList, storageDel, storageEdit } from '@/api/apps/tools/other';
import { storageFormDefault, storageTableColumns } from '../utils/config';
import localeConfig from './zh-CN.js';
import { jumpPage, processTextArea } from '@/utils/index';
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

// 图片分组
const selectedKeys = ref([]);
const rowSelection = reactive({
  showCheckedAll: true,
  onlyCurrent: false,
});
const pagination = ref({ pageSize: 15, showPageSize: true, pageSizeOptions: [15, 30, 50, 100] });
const queryForm = ref({
  page: 1,
  limit: 15,
});
const tableLoading = ref(false);
const tableData = ref([]);
// 获取列表
const getList = async () => {
  tableLoading.value = true;
  try {
    const res = await storageList(queryForm.value);
    tableData.value = res.data.data;
  } catch (error) {}
  tableLoading.value = false;
};
// 分页发生改变
const handlePageSizeChange = (pageSize) => {
  queryForm.value.page = 1;
  queryForm.value.limit = pageSize;
  pagination.value.pageSize = pageSize;
  getList();
};
getList();
// 添加图片分组
const addFormRef = ref(null);
const addForm = ref({ ...storageFormDefault });
const addVisible = ref(false);
const handleAdd = () => {
  addForm.value = { ...storageFormDefault };
  addFormRef.value.resetFields();
  addVisible.value = true;
};
const addSubmit = () => {
  if (!addForm.value.data.name) {
    Message.warning(localeGet('message2'));
    return;
  }
  if (addForm.value.id) {
    storageEdit(addForm.value)
      .then((res) => {
        Message.success(localeGet('message3'));
        addVisible.value = false;
        getList();
      })
      .catch(() => {});
    return;
  }
  storageEdit(addForm.value)
    .then((res) => {
      Message.success(localeGet('message4'));
      addVisible.value = false;
      getList();
    })
    .catch(() => {});
};
// 删除
const handleDelete = (rowIndex) => {
  storageDel({
    id: tableData.value[rowIndex].id,
  })
    .then((res) => {
      Message.success(localeGet('message5'));
      getList();
    })
    .catch(() => {});
};
// 详情
const handleDetail = (rowIndex) => {
  console.log(tableData.value[rowIndex]);
  jumpPage('/ai-apps/ai-tools/other-custom/pic-detail', { tid: tableData.value[rowIndex].id })
};
// 编辑
const handleEdit = (rowIndex) => {
  addForm.value = {
    id: tableData.value[rowIndex].id,
    data: {
      // 分组名称
      name: tableData.value[rowIndex].name,
    },
  };
  addVisible.value = true;
};
</script>

<script>
export default {
  name: 'OtherIllustration', // If you want the include property of keep-alive to take effect, you must name the component
};
</script>

<style lang="less" scoped>
@import '@/assets/style/table.less';
</style>
