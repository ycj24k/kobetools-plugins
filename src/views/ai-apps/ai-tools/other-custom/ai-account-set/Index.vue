<template>
  <div class="container">
    <div class="container_box">
      <a-form class="form_box" ref="queryFormRef" layout="vertical" hide-label :model="queryForm">
        <a-grid :col-gap="24" :row-gap="12">
          <a-grid-item :span="4">
            <div class="flex_box form_btns">
              <a-button class="form_btn1" type="primary" @click="handleAdd">{{ localeGet('btn1') }}</a-button>
            </div>
          </a-grid-item>
        </a-grid>
      </a-form>
      <div class="table_box">
        <a-table column-resizable :bordered="{ cell: true }" :loading="tableLoading" :columns="otherConfigTableColumns" :data="tableData" :row-selection="rowSelection" v-model:selectedKeys="selectedKeys" :pagination="pagination" @page-size-change="handlePageSizeChange" :scroll="{ x: '100%', y: 500 }">
          <template #header="{ column }">
            <div>{{ localeGet(column.title) }}</div>
          </template>
          <template #actions="{ rowIndex }">
            <div class="flex_box flex_row_between table_btns">
              <a-popconfirm position="left" :content="localeGet('message1')" @ok="handleDelete(rowIndex)">
                <a-button size="mini" style="color: #333">{{ localeGet('btn2') }}</a-button>
              </a-popconfirm>
            </div>
          </template>
        </a-table>
      </div>
    </div>
    <!-- 添加AI -->
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
              <a-form-item no-style field="type">
                <a-radio-group v-model="addForm.type" :options="AIOptions">
                  <template #label="{ data }">
                    <span>{{ localeGet(data?.label) }}</span>
                  </template>
                  <template #option="{ data }">
                    <span>{{ localeGet(data?.label) }}</span>
                  </template>
                </a-radio-group>
              </a-form-item>
            </a-grid-item>
            <a-grid-item :span="24" class="flex_box form_option">
              <div class="form_label"><span style="color: #ff0000">*</span>{{ localeGet('label2') }}</div>
              <a-form-item no-style field="username">
                <a-input v-model="addForm.username" :placeholder="localeGet('placeholder1')" />
              </a-form-item>
            </a-grid-item>
            <a-grid-item :span="24" class="flex_box form_option">
              <div class="form_label"><span style="color: #ff0000">*</span>{{ localeGet('label3') }}</div>
              <a-form-item no-style field="key">
                <a-input v-model="addForm.key" :placeholder="localeGet('placeholder2')" />
              </a-form-item>
            </a-grid-item>
          </a-grid>
        </div>
      </a-form>
      <template #footer>
        <div class="flex_box flex_row_center modal_footer">
          <a-button style="color: #333" @click="addVisible = false">{{ localeGet('btn3') }}</a-button>
          <a-button class="form_btn3" @click="addSubmit">{{ localeGet('btn4') }}</a-button>
        </div>
      </template>
    </a-modal>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { Message } from '@arco-design/web-vue';
import { AIList, AIAdd, AIDel } from '@/api/apps/tools/other';
import { AIOptions, otherConfigTableColumns, otherConfigAddFormDefault } from '../utils/config';
import localeConfig from './zh-CN.js';
// 多语言
const localeData = ref({});
localeData.value = localeConfig;
const localeGet = (key) => {
  return localeData.value[key];
};

// 监听函数
function dataListener(data) {
  console.log('来自主应用的数据', data);
  if (data) localeData.value = data;
}
// 监听数据变化，初始化时如果有数据则主动触发一次
//@ts-ignore
if (window.microApp) window.microApp.addDataListener(dataListener, true);

const selectedKeys = ref([]);
const rowSelection = reactive({
  showCheckedAll: true,
  onlyCurrent: false,
});
const pagination = ref({ pageSize: 100, showPageSize: true, pageSizeOptions: [100, 200, 500, 1000, 2000] });
const queryFormRef = ref(null);
const queryForm = ref({
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
    const res = await AIList(queryForm.value);
    tableData.value = res.data.data;
    tableDataAll.value = res.data.data;
  } catch (error) {
    
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

// 添加AI
const addFormRef = ref(null);
const addForm = ref({ ...otherConfigAddFormDefault });
const addVisible = ref(false);
const handleAdd = () => {
  addForm.value = { ...otherConfigAddFormDefault };
  addVisible.value = true;
};
const addSubmit = () => {
  if (!addForm.value.username) {
    Message.warning(localeGet('message2'));
    return;
  }
  if (!addForm.value.key) {
    Message.warning(localeGet('message3'));
    return;
  }
  AIAdd(addForm.value)
    .then((res) => {
      Message.success(localeGet('message4'));
      addVisible.value = false;
      getList();
    })
    .catch(() => {});
};
// 删除
const handleDelete = (rowIndex) => {
  AIDel({
    id: tableData.value[rowIndex].id,
  })
    .then((res) => {
      Message.success(localeGet('message5'));
      getList();
    })
    .catch(() => {});
};
</script>

<script>
export default {
  name: 'OtherAI', // If you want the include property of keep-alive to take effect, you must name the component
};
</script>

<style lang="less" scoped>
@import '@/assets/style/table.less';
</style>
