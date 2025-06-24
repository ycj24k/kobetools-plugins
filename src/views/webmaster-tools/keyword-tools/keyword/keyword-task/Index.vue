<template>
  <div class="container">
    <div class="container_box">
      <a-form class="form_box" ref="queryFormRef" layout="vertical" hide-label :model="queryForm">
        <a-grid :col-gap="24" :row-gap="12">
          <a-grid-item :span="4" class="flex_box">
            <a-form-item field="type">
              <a-select v-model="queryForm.type" :options="typeOptions" allow-search :placeholder="localeGet('placeholder1')">
                <template #label="{ data }">
                  <span>{{ localeGet(data?.label) }}</span>
                </template>
                <template #option="{ data }">
                  <span>{{ localeGet(data?.label) }}</span>
                </template>
              </a-select>
            </a-form-item>
          </a-grid-item>
          <a-grid-item :span="4" class="flex_box">
            <a-form-item field="name">
              <a-input v-model="queryForm.name" placeholder="输入任务名称关键字" />
            </a-form-item>
          </a-grid-item>
          <a-grid-item :span="4" class="flex_box">
            <a-form-item field="website">
              <a-input v-model="queryForm.website" placeholder="输入备注信息关键字" />
            </a-form-item>
          </a-grid-item>
          <a-grid-item :span="4">
            <div class="flex_box form_btns">
              <a-button class="form_btn1" type="primary" @click="handleSearch">{{ localeGet('button1') }}</a-button>
              <a-button class="form_btn7" type="outline" @click="handleReset">{{ localeGet('button2') }}</a-button>
              <a-button type="outline" @click="handleRefresh">{{ localeGet('button3') }}</a-button>
            </div>
          </a-grid-item>
        </a-grid>
      </a-form>
      <div class="table_box">
        <a-table column-resizable :bordered="{ cell: true }" :loading="tableLoading" :columns="taskTableColumns" :data="tableData" :row-selection="rowSelection" v-model:selectedKeys="selectedKeys" :pagination="pagination" @page-size-change="handlePageSizeChange" :scroll="{ x: '100%', y: 500 }">
          <template #header="{ column }">
            <div>{{ column.title === '备注信息' ? '备注信息' : localeGet(column.title) }}</div>
          </template>
          <template #name="{ rowIndex }">
            <a-input @change="handleSaveChange(rowIndex, 'name')" v-model="tableData[rowIndex].name" />
          </template>
          <template #website="{ rowIndex }">
            <a-input @change="handleSaveChange(rowIndex, 'website')" v-model="tableData[rowIndex].website" />
          </template>
          <template #type="{ rowIndex }">
            <template v-for="item in typeOptions" :key="item.value">
              <div v-if="item.value === tableData[rowIndex].type">{{ localeGet(item.label) }}</div>
            </template>
          </template>
          <template #update_time="{ rowIndex }">
            <div>{{ dayjs(tableData[rowIndex].update_time * 1000).format('YYYY-MM-DD hh:mm') }}</div>
          </template>
          <template #actions="{ rowIndex }">
            <div class="flex_box flex_row_between table_btns">
              <a-button size="mini" class="form_btn3" @click="handleDetail(rowIndex)">{{ localeGet('button4') }}</a-button>
              <a-button size="mini" class="form_btn4" @click="handleClear(rowIndex)">{{ localeGet('button5') }}</a-button>
              <a-popconfirm position="left" :content="localeGet('content1')" @ok="handlePause(rowIndex)">
                <a-button size="mini" class="form_btn5">{{ localeGet('button6') }}</a-button>
              </a-popconfirm>
              <a-popconfirm position="left" :content="localeGet('content2')" @ok="handleDelete(rowIndex)">
                <a-button size="mini" style="color: #333">{{ localeGet('button7') }}</a-button>
              </a-popconfirm>
            </div>
          </template>
        </a-table>
        <div class="table_save">
          <a-button class="form_btn5" type="primary" @click="handleSave">{{ localeGet('button8') }}</a-button>
        </div>
      </div>
    </div>
    <!-- 清洗 -->
    <a-modal :mask-closable="false" l :esc-to-close="false" class="modal_box" v-model:visible="clearVisible" width="80%">
      <template #title>
        <div class="flex_box modal_title">
          <div class="modal_title_icon">
            <icon-info-circle-fill />
          </div>
          <div class="modal_title_text">{{ localeGet('title1') }}{{ currentTask?.name }}</div>
        </div>
      </template>
      <a-form class="form_box" ref="clearFormRef" layout="vertical" hide-label :model="clearForm.form">
        <div class="form_item">
          <a-grid :col-gap="20" :row-gap="10" class="form_content">
            <a-grid-item :span="12" class="flex_box form_option">
              <div class="form_title">{{ localeGet('title2') }}</div>
              <div class="form_label">字符长度</div>
              <a-form-item no-style field="lengthFilter">
                <a-space :size="20">
                  <a-switch v-model="clearForm.form.lengthFilter" :checked-value="1" :unchecked-value="0" />
                  <template v-if="clearForm.form.lengthFilter === 1">
                    <a-space :size="20">
                      <span>最少</span>
                      <a-select v-model="clearForm.form.lengthFilterVal.min" :options="lengthMinOptions" :style="{ width: '140px' }" :placeholder="localeGet('placeholder3')">
                        <!-- <template #label="{ data }">
                          <span>{{ localeGet(data?.label) }}</span>
                        </template>
                        <template #option="{ data }">
                          <span>{{ localeGet(data?.label) }}</span>
                        </template> -->
                      </a-select>
                      <span>-</span>
                      <span>最多</span>
                      <a-select v-model="clearForm.form.lengthFilterVal.max" :options="lengthMaxOptions" :style="{ width: '140px' }" :placeholder="localeGet('placeholder4')">
                        <!-- <template #label="{ data }">
                          <span>{{ localeGet(data?.label) }}</span>
                        </template>
                        <template #option="{ data }">
                          <span>{{ localeGet(data?.label) }}</span>
                        </template> -->
                      </a-select>
                    </a-space>
                  </template>
                </a-space>
              </a-form-item>
            </a-grid-item>
            <a-grid-item :span="12" class="flex_box form_option">
              <div class="form_label">违禁词过滤</div>
              <a-form-item no-style field="sensitiveFilter">
                <a-space :size="20">
                  <a-switch v-model="clearForm.form.sensitiveFilter" :checked-value="1" :unchecked-value="0" />
                  <template v-if="clearForm.form.sensitiveFilter === 1">
                    <a-select v-model="clearForm.form.sensitiveFilterVal" :options="customOptions" :style="{ width: '220px' }" allow-search :placeholder="localeGet('placeholder2')">
                      <template #label="{ data }">
                        <span>{{ localeGet(data?.label) }}</span>
                      </template>
                      <template #option="{ data }">
                        <span>{{ localeGet(data?.label) }}</span>
                      </template>
                    </a-select>
                  </template>
                </a-space>
              </a-form-item>
            </a-grid-item>
          </a-grid>
        </div>
        <div class="form_item">
          <a-grid :col-gap="20" :row-gap="10" class="form_content">
            <a-grid-item :span="12" class="flex_box form_content_item">
              <div class="form_title">{{ localeGet('title3') }}</div>
              <div class="flex_box form_content_top">
                <div class="form_label">结果包含</div>
                <a-form-item no-style field="include">
                  <a-radio-group v-model="clearForm.form.include" :options="includeOptions">
                    <template #label="{ data }">
                      <span>{{ data?.label }}</span>
                    </template>
                    <template #option="{ data }">
                      <span>{{ data?.label }}</span>
                    </template>
                  </a-radio-group>
                </a-form-item>
              </div>
            </a-grid-item>
            <a-grid-item :span="12" class="form_content_item">
              <div class="flex_box form_content_top">
                <div class="form_label">结果不包含</div>
                <a-form-item no-style field="exclude">
                  <a-radio-group v-model="clearForm.form.exclude" :options="excludeOptions">
                    <template #label="{ data }">
                      <span>{{ data?.label }}</span>
                    </template>
                    <template #option="{ data }">
                      <span>{{ data?.label }}</span>
                    </template>
                  </a-radio-group>
                </a-form-item>
              </div>
            </a-grid-item>
          </a-grid>
          <a-grid :col-gap="20" :row-gap="10" class="form_content">
            <a-grid-item :span="12" class="flex_box form_content_item">
              <div class="form_content_input">
                <a-textarea v-model="clearForm.form.includeKeyword" class="form_area" placeholder="请输入关键词，每行一个关键词" allow-clear />
              </div>
            </a-grid-item>
            <a-grid-item :span="12" class="form_content_item">
              <div class="form_content_input">
                <a-textarea v-model="clearForm.form.excludeKeyword" class="form_area" placeholder="请输入关键词，每行一个关键词" allow-clear />
              </div>
            </a-grid-item>
          </a-grid>
        </div>
      </a-form>
      <template #footer>
        <div class="flex_box flex_row_center modal_footer">
          <a-button style="color: #333" @click="clearVisible = false">{{ localeGet('button9') }}</a-button>
          <a-button class="form_btn3" @click="clearSubmit">{{ localeGet('button10') }}</a-button>
        </div>
      </template>
    </a-modal>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { Message } from '@arco-design/web-vue';
import dayjs from 'dayjs';
import { keywordTaskList, keywordTaskClean, keywordTaskDel, keywordTaskOut, keywordTaskSave } from '@/api/apps/tools/keyword';
import { includeOptions, excludeOptions, keyOptions, sensitiveOptions, lengthMinOptions, lengthMaxOptions, customOptions, typeOptions, taskTableColumns, clearFormDefault } from '../utils/config';
import localeConfig from './zh-CN.js';
import { jumpPage } from '@/utils/index';
// 多语言
const localeData = ref({});
localeData.value = localeConfig;
console.log(localeData.value, lengthMinOptions)
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
  website: '',
  page: 1,
  limit: 100,
});
const tableLoading = ref(false);
const tableData = ref([]);
const tableDataAll = ref([]);
const currentTask = ref(null);
// 保存数据
const saveForm = ref({
  data: [],
});
// 获取列表
const getList = async () => {
  tableLoading.value = true;
  try {
    const res = await keywordTaskList(queryForm.value);
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
    return (!queryForm.value.name || (queryForm.value.name && item.name.toLowerCase().includes(queryForm.value.name.toLowerCase()))) && (!queryForm.value.type || (queryForm.value.type && item.type.toString().includes(queryForm.value.type))) && (!queryForm.value.website || (queryForm.value.website && item.website.toLowerCase().includes(queryForm.value.website.toLowerCase())));
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
    return Message.warning(localeGet('message1'));
  }
  keywordTaskSave(saveForm.value)
    .then((res) => {
      Message.success(localeGet('message2'));
      getList();
    })
    .catch(() => {});
};

// 详情
const handleDetail = (rowIndex) => {
  jumpPage('/webmaster-tools/keyword-tools/keyword/keyword-mine', { tid: tableData.value[rowIndex].id })
};
// 清洗
const clearVisible = ref(false);
const clearForm = ref({
  id: '',
  form: { ...clearFormDefault },
});

const handleClear = (rowIndex) => {
  clearForm.value = {
    id: tableData.value[rowIndex].id,
    form: { ...clearFormDefault },
  };
  currentTask.value = tableData.value[rowIndex];
  clearVisible.value = true;
};

const clearSubmit = () => {
  let params = {...clearForm.value}
  params.form.includeKeyword = clearForm.value.form.includeKeyword ? clearForm.value.form.includeKeyword.split('\n') : [];
  params.form.excludeKeyword = clearForm.value.form.excludeKeyword ? clearForm.value.form.excludeKeyword.split('\n') : [];
  keywordTaskClean(params)
    .then((res) => {
      Message.success(localeGet('message3'));
      clearVisible.value = false;
      getList();
    })
    .catch(() => {});
};
// 暂停
const handlePause = (rowIndex) => {
  keywordTaskOut({
    id: tableData.value[rowIndex].id,
  })
    .then((res) => {
      Message.success(localeGet('message4'));
      getList();
    })
    .catch(() => {});
};
// 删除
const handleDelete = (rowIndex) => {
  keywordTaskDel({
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
  name: 'KeywordTask', // If you want the include property of keep-alive to take effect, you must name the component
};
</script>

<style lang="less" scoped>
@import '@/assets/style/table.less';
</style>
