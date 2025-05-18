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
        <a-table :columns="tableColumns" :data="tableData" :row-selection="rowSelection" v-model:selectedKeys="selectedKeys" :pagination="pagination" :scroll="{ maxHeight: 500 }">
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
    <!-- 添加cms -->
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
                <a-radio-group v-model="addForm.type" :options="cmsOptions">
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
              <a-form-item no-style field="code">
                <a-input v-model="addForm.code" :placeholder="localeGet('placeholder1')" />
              </a-form-item>
            </a-grid-item>
            <a-grid-item :span="24" class="flex_box form_option">
              <div class="form_label"><span style="color: #ff0000">*</span>{{ localeGet('label3') }}</div>
              <a-form-item no-style field="website">
                <a-input v-model="addForm.website" :placeholder="localeGet('placeholder2')" />
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
import { cmsList, cmsAdd, cmsDel } from '@/api/apps/tools/cms';
import localeConfig from './zh-CN.js';
// 多语言
const localeData = ref({});
localeData.value = localeConfig
const localeGet = (key) => {
  return localeData.value[key];
};

// 监听函数
function dataListener(data) {
  console.log('来自主应用的数据', data);
  if (data&&data.locales) localeData.value = data.locales;
}
// 监听数据变化，初始化时如果有数据则主动触发一次
if (window.microApp) window.microApp.addDataListener(dataListener, true);

// CMS
const cmsOptions = [
  {
    label: 'cmsOptions.label1',
    value: 1,
  },
];
const selectedKeys = ref([]);
const rowSelection = reactive({
  showCheckedAll: true,
  onlyCurrent: false,
});
const pagination = { pageSize: 10 };
const queryForm = ref({
  page: 0,
  pageSize: 10,
});
const tableColumns = [
  {
    title: 'tableColumns.title1',
    titleSlotName: 'header',
    dataIndex: 'cms',
    slotName: 'cms',
  },
  {
    title: 'tableColumns.title2',
    titleSlotName: 'header',
    dataIndex: 'name',
    slotName: 'name',
  },
  {
    title: 'tableColumns.title3',
    titleSlotName: 'header',
    dataIndex: 'website',
  },
  {
    title: 'tableColumns.title4',
    titleSlotName: 'header',
    dataIndex: 'actions',
    slotName: 'actions',
  },
];
const tableLoading = ref(false);
const tableData = ref([]);
// 获取列表
const getList = async () => {
  tableLoading.value = true;
  try {
    const res = await cmsList(queryForm.value);
    tableData.value = res.data.data;
    tableLoading.value = false;
  } catch (error) {
    tableLoading.value = false;
  }
};
getList();
// 添加cms
const addFormRef = ref(null);
const addFormDefault = {
  type: 1,
  code: '',
  website: '',
};
const addForm = ref({ ...addFormDefault });
const addVisible = ref(false);
const handleAdd = () => {
  addForm.value = { ...addFormDefault };
  addVisible.value = true;
};
const addSubmit = () => {
  if (!addForm.value.code) {
    Message.warning(localeGet('message2'));
    return;
  }
  if (!addForm.value.website) {
    Message.warning(localeGet('message3'));
    return;
  }
  cmsAdd(addForm.value)
    .then((res) => {
      Message.success(localeGet('message4'));
      addVisible.value = false;
      getList();
    })
    .catch(() => {});
};
// 删除
const handleDelete = (rowIndex) => {
  cmsDel({
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
  name: 'CmsAdd', // If you want the include property of keep-alive to take effect, you must name the component
};
</script>

<style lang="less" scoped>
@import '@/assets/style/table.less';
</style>
