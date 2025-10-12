<template>
  <div class="container">
    <div class="container_box x-tabs-fill">
      <a-form class="form_box" ref="queryFormRef" layout="vertical" hide-label :model="queryForm">
        <a-grid :col-gap="24" :row-gap="24">
          <a-grid-item :span="4" class="flex_box">
            <a-form-item>
              <a-select @change="getList" v-model="queryForm.taskId" :options="taskList" allow-search
                :placeholder="localeGet('placeholder1')" />
            </a-form-item>
          </a-grid-item>
          <a-grid-item :span="4" class="flex_box">
            <a-form-item field="title">
              <a-input v-model="queryForm.title" :placeholder="localeGet('placeholder3')" />
            </a-form-item>
          </a-grid-item>
          <a-grid-item :span="16">
            <div class="flex_box form_btns">
              <a-button class="form_btn1" type="primary" @click="handleSearch">{{ localeGet('button1') }}</a-button>
              <a-button class="form_btn2" type="primary" @click="handleAdd">{{ localeGet('button2') }}</a-button>
              <a-button class="form_btn3" type="primary" @click="handleExport('txt')">{{ localeGet('button3') }}</a-button>
              <a-button class="form_btn4" type="primary" @click="handleExport('csv')">{{ localeGet('button4') }}</a-button>
              <a-button class="form_btn7" type="outline" @click="handleReset">{{ localeGet('button5') }}</a-button>
              <a-button type="outline" @click="handleRefresh">{{ localeGet('button6') }}</a-button>
            </div>
          </a-grid-item>
        </a-grid>
      </a-form>
      <div class="table_box">
        <a-table column-resizable :bordered="{ cell: true }" :loading="tableLoading || saveLoading"
          :columns="myTableColumns" :data="tableData" row-key="id" :row-selection="rowSelection"
          v-model:selectedKeys="selectedKeys" :pagination="false"
          :scroll="{ x: '100%', y: 'calc(100vh - 300px)' }">
          <template #header="{ column }">
            <div>{{ column.title === 'myTableColumns.title7' ? localeGet('myTableColumns.title7') : localeGet(column.title) }}</div>
          </template>
          <template #title="{ rowIndex }">
            <a-input @change="handleSaveChange(rowIndex, 'title')" v-model="tableData[rowIndex].title" />
          </template>
          <template #weight="{ rowIndex }">
            <template v-for="item in translatedWeightOptions" :key="item.value">
              <div v-if="item.value === tableData[rowIndex].weight">{{ item.label }}</div>
            </template>
          </template>
          <template #updateTime="{ rowIndex }">
            <div>{{ dayjs(tableData[rowIndex].updateTime * 1000).format('YYYY-MM-DD hh:mm') }}</div>
          </template>
          <template #actions="{ rowIndex }">
            <div class="flex_box flex_row_between table_btns">
              <a-popconfirm position="left" :content="localeGet('content1')" @ok="handleDelete(rowIndex)">
                <a-button size="mini" style="color: #333">{{ localeGet('button7') }}</a-button>
              </a-popconfirm>
            </div>
          </template>
        </a-table>
        <div class="table_footer">
          <a-space :size="20" class="table_save">
            <a-button :loading="saveLoading" class="form_btn5" type="primary" @click="handleSave">{{ localeGet('button8') }}</a-button>
            <a-button :loading="delLoading" class="form_btn8" type="primary" @click="handleDels">{{ localeGet('button10') }}</a-button>
            <a-button type="outline" @click="getListAll">{{ localeGet('button9') }}</a-button>
            <div class="table_save_total">{{ localeGet('total1') }}{{ tableDataAll.length }}{{ localeGet('total2') }}</div>
          </a-space>
          <div class="table_pagination">
            <a-pagination
              v-model:current="pagination.current"
              v-model:page-size="pagination.pageSize"
              :total="Math.max(1, pagination.total)"
              :page-size-options="[100, 200, 500, 1000, 2000]"
              show-page-size
              @page-size-change="handlePageSizeChange"
              @change="handlePageChange"
            />
          </div>
        </div>
      </div>
      <!-- 手动加词 -->
      <a-modal :mask-closable="false" l :esc-to-close="false" class="modal_box" v-model:visible="addVisible" width="85%">
        <template #title>
          <div class="flex_box modal_title">
            <div class="modal_title_icon">
              <icon-info-circle-fill />
            </div>
            <div class="modal_title_text">{{ localeGet('title1') }}</div>
          </div>
        </template>
        <a-spin :loading="addLoading" :tip="localeGet('tip1')" style="width: 100%;">
          <a-form class="form_box" ref="addFormRef" layout="vertical" hide-label :model="addForm">
            <a-grid class="form_main">
              <a-grid-item :span="6" class="form_left">
                <a-form-item no-style field="keyword">
                  <a-textarea v-model="keyword" class="form_area" :placeholder="localeGet('placeholder4')" allow-clear />
                </a-form-item>
              </a-grid-item>
              <a-grid-item :span="18" class="form_right">
                <div class="flex_box form_item">
                  <div class="form_title"><span style="color: #FF0000;">* </span>{{ localeGet('label1') }}</div>
                  <a-grid :col-gap="20" :row-gap="10" class="form_content">
                    <a-grid-item :span="12" class="flex_box form_option">
                      <a-form-item no-style field="type">
                        <a-space :size="20">
                          <a-radio @click="addForm.type = 1" :model-value="addForm.type === 1">{{ localeGet('label2') }}</a-radio>
                          <template v-if="addForm.type === 1">
                            <a-input style="width: 320px;" v-model="addForm.taskName" :placeholder="localeGet('placeholder5')" />
                          </template>
                        </a-space>
                      </a-form-item>
                    </a-grid-item>
                    <a-grid-item :span="12" class="flex_box form_option">
                      <a-form-item no-style field="type">
                        <a-space :size="20">
                          <a-radio @click="addForm.type = 2" :model-value="addForm.type === 2">{{ localeGet('label3') }}</a-radio>
                          <template v-if="addForm.type === 2">
                            <a-select style="width: 320px;" v-model="addForm.taskId" :options="taskList" :placeholder="localeGet('placeholder6')" allow-search></a-select>
                          </template>
                        </a-space>
                      </a-form-item>
                    </a-grid-item>
                  </a-grid>
                </div>
                <div class="form_item">
                  <a-grid :col-gap="20" :row-gap="10" class="form_content">
                    <a-grid-item :span="15" class="flex_box form_option">
                      <div class="form_title">{{ localeGet('title3') }}</div>
                      <div class="form_label">{{ localeGet('label4') }}</div>
                      <a-form-item no-style field="lengthFilter">
                        <a-space :size="20">
                          <a-switch v-model="addForm.lengthFilter" :checked-value="1" :unchecked-value="0" />
                          <template v-if="addForm.lengthFilter === 1">
                            <a-space :size="20">
                              <span>{{ localeGet('label6') }}</span>
                              <a-select v-model="addForm.lengthFilterVal.min" :options="translatedLengthMinOptions" :style="{ width: '140px' }" :placeholder="localeGet('placeholder8')"></a-select>
                              <span>-</span>
                              <span>{{ localeGet('label7') }}</span>
                              <a-select v-model="addForm.lengthFilterVal.max" :options="translatedLengthMaxOptions" :style="{ width: '140px' }" :placeholder="localeGet('placeholder9')"></a-select>
                            </a-space>
                          </template>
                        </a-space>
                      </a-form-item>
                    </a-grid-item>
                    <a-grid-item :span="9" class="flex_box form_option">
                      <div class="form_label">{{ localeGet('label5') }}</div>
                      <a-form-item no-style field="sensitiveFilter">
                        <a-space :size="20">
                          <a-switch v-model="addForm.sensitiveFilter" :checked-value="1" :unchecked-value="0" />
                          <template v-if="addForm.sensitiveFilter === 1">
                            <a-select v-model="addForm.sensitiveFilterVal" :options="translatedCustomOptions" :style="{ width: '220px' }" allow-search :placeholder="localeGet('placeholder7')"></a-select>
                          </template>
                        </a-space>
                      </a-form-item>
                    </a-grid-item>
                  </a-grid>
                </div>
                <div class="form_item">
                  <a-grid :col-gap="20" :row-gap="10" class="form_content">
                    <a-grid-item :span="12" class="flex_box form_content_item">
                      <div class="form_title">{{ localeGet('title4') }}</div>
                      <div class="flex_box form_content_top">
                        <div class="form_label">{{ localeGet('label8') }}</div>
                        <a-form-item no-style field="include">
                          <a-radio-group v-model="addForm.include" :options="translatedIncludeOptions"></a-radio-group>
                        </a-form-item>
                      </div>
                    </a-grid-item>
                    <a-grid-item :span="12" class="form_content_item">
                      <div class="flex_box form_content_top">
                        <div class="form_label">{{ localeGet('label9') }}</div>
                        <a-form-item no-style field="exclude">
                          <a-radio-group v-model="addForm.exclude" :options="translatedExcludeOptions"></a-radio-group>
                        </a-form-item>
                      </div>
                    </a-grid-item>
                  </a-grid>
                  <a-grid :col-gap="20" :row-gap="10" class="form_content">
                    <a-grid-item :span="12" class="flex_box form_content_item">
                      <div class="form_content_input">
                        <a-textarea v-model="addForm.includeKeyword" class="form_area" :placeholder="localeGet('placeholder10')" allow-clear />
                      </div>
                    </a-grid-item>
                    <a-grid-item :span="12" class="form_content_item">
                      <div class="form_content_input">
                        <a-textarea v-model="addForm.excludeKeyword" class="form_area" :placeholder="localeGet('placeholder10')" allow-clear />
                      </div>
                    </a-grid-item>
                  </a-grid>
                </div>
              </a-grid-item>
            </a-grid>
          </a-form>
        </a-spin>
        <template #footer>
          <div class="flex_box flex_row_center modal_footer">
            <a-button :loading="addLoading" style="color: #333" @click="addVisible = false">{{ localeGet('button11') }}</a-button>
            <a-button :loading="addLoading" class="form_btn3" @click="addSubmit">{{ localeGet('button12') }}</a-button>
          </div>
        </template>
      </a-modal>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { Message } from '@arco-design/web-vue';
import dayjs from 'dayjs';
import { keywordMyAdd, keywordMyList, keywordMySave, keywordMyDel, keywordMyDels, keywordTaskList, keywordMyListAll } from '@/api/apps/tools/keyword';
import { includeOptions, excludeOptions, lengthMinOptions, lengthMaxOptions, customOptions, weightOptions, myTableColumns, addFormDefault } from '../utils/config';
import { exportModal, processTextArea } from '@/utils';
import { useRouter } from 'vue-router';
import { useI18n } from '../utils/i18n';
import localZhCN from './zh-CN.js';

// 多语言（使用本地配置）
const { localeGet, translateOptions, initMicroApp } = useI18n(localZhCN);

// 初始化微前端监听
onMounted(() => {
  initMicroApp();
});

// 翻译选项
const translatedWeightOptions = translateOptions(weightOptions);
const translatedIncludeOptions = translateOptions(includeOptions);
const translatedExcludeOptions = translateOptions(excludeOptions);
const translatedCustomOptions = translateOptions(customOptions);
const translatedLengthMinOptions = translateOptions(lengthMinOptions);
const translatedLengthMaxOptions = translateOptions(lengthMaxOptions);

const router = useRouter();
const selectedKeys = ref([]);
const rowSelection = reactive({
  showCheckedAll: true,
  onlyCurrent: false,
});
const pagination = ref({ current: 1, total: 0, pageSize: 100, showPageSize: true, pageSizeOptions: [100, 200, 500, 1000, 2000] });
const queryFormRef = ref(null);
const queryForm = ref({
  taskId: '',
  title: '',
  page: 1,
  loadAll: 0,
  limit: 100,
});
const allForm = ref({
  taskId: '',
  title: '',
  loadAll: 1,
});
if (router.currentRoute.value.query.taskId) {
  queryForm.value.taskId = +router.currentRoute.value.query.taskId;
}
const taskList = ref([]);
const taskMap = ref({});
const tableLoading = ref(false);
const isAll = ref(false);
const tableDataAll = ref([]);
const tableData = ref([]);
// 获取任务列表
const getTaskList = async () => {
  tableLoading.value = true;
  try {
    const res = await keywordTaskList({
      page: 1,
      limit: 100,
    });
    // 构建下拉选项与任务映射（用于统一显示所属任务与备注信息）
    taskList.value = res.data.list.map((item) => {
      // 记录映射：id -> { name, website }
      taskMap.value[item.id] = { name: item.name, website: item.website };
      return {
        label: item.name,
        value: item.id,
      };
    });
    if (res.data.list.length > 0 && !queryForm.value.taskId) queryForm.value.taskId = res.data.list[0].id;
  } catch (error) {
    taskList.value = [];
  }
  getList();
};
getTaskList();
// 获取列表
const getList = async () => {
  pagination.value.pageSize = pagination.value.pageSize || 100;
  tableLoading.value = true;
  try {
    const res = await keywordMyList({ ...queryForm.value, page: pagination.value.current, limit: pagination.value.pageSize });
    const currentTask = taskMap.value[queryForm.value.taskId] || { name: '', website: '' };
    // 覆盖每行的所属任务与备注信息
    tableData.value = res.data.list.map(row => ({
      ...row,
      taskName: currentTask.name,
      website: currentTask.website,
    }));
    tableDataAll.value = tableData.value;
    allForm.value.taskId = queryForm.value.taskId;
    allForm.value.pages = res.data.pages;
    pagination.value.total = res.data.total || res.data.pages * pagination.value.pageSize || tableData.value.length;
  } catch (error) {
    tableData.value = [];
    tableDataAll.value = [];
  }
  isAll.value = false;
  tableLoading.value = false;
};

// 过滤逻辑
const filteredData = () => {
  return tableDataAll.value.filter((item) => {
    return (!queryForm.value.title || (queryForm.value.title && item.title.toLowerCase().includes(queryForm.value.title.toLowerCase()))) && (!queryForm.value.weight || (queryForm.value.weight && item.weight.toString().includes(queryForm.value.weight))) && (!queryForm.value.website || (queryForm.value.website && item.website.toLowerCase().includes(queryForm.value.website.toLowerCase())));
  });
};
// 客户端分页（仅在 isAll 为 true 时使用）
const paginateAll = (sourceList) => {
  const start = (pagination.value.current - 1) * pagination.value.pageSize;
  const end = start + pagination.value.pageSize;
  tableData.value = sourceList.slice(start, end);
};

// 获取全部列表
const getListAll = async () => {
  tableLoading.value = true;
  allForm.value.title = queryForm.value.title;
  const res = await keywordMyList({ ...allForm.value });
  const currentTask = taskMap.value[allForm.value.taskId] || { name: '', website: '' };
  // 保存全量并覆盖列
  tableDataAll.value = res.data.list.map(row => ({
    ...row,
    taskName: currentTask.name,
    website: currentTask.website,
  }));
  // 初始化前端分页
  isAll.value = true;
  pagination.value.current = 1;
  pagination.value.total = tableDataAll.value.length;
  paginateAll(tableDataAll.value);
  tableLoading.value = false;
};
// 分页发生改变
const handlePageSizeChange = (pageSize) => {
  pagination.value.current = 1;
  pagination.value.pageSize = pageSize;
  if (isAll.value) {
    const list = filteredData();
    pagination.value.total = list.length;
    paginateAll(list);
  } else {
    getList();
  }
};
// 页码变化
const handlePageChange = (page) => {
  pagination.value.current = page;
  if (isAll.value) {
    const list = filteredData();
    paginateAll(list);
  } else {
    getList();
  }
};
// 搜索
const handleSearch = () => {
  const list = filteredData();
  if (isAll.value) {
    pagination.value.current = 1;
    pagination.value.total = list.length;
    paginateAll(list);
  } else {
    tableData.value = list;
  }
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
// 导出
const handleExport = (e) => {
  const selects = tableData.value.filter((item) => selectedKeys.value.includes(item.id));
  exportModal(tableData.value, selects, localeGet('name'), e);
};
// 删除
const handleDelete = (rowIndex) => {
  keywordMyDel(queryForm.value.taskId, tableData.value[rowIndex].id)
    .then((res) => {
      Message.success(localeGet('message2'));
      getList();
    })
    .catch(() => { });
};
// 保存数据
const saveForm = ref({
  data: [],
  taskId: '',
});
const saveLoading = ref(false);
const delLoading = ref(false);
// 批量删除
const handleDels = () => {
  if (selectedKeys.value.length === 0) {
    return Message.warning(localeGet('message9'));
  }
  delLoading.value = true;
  keywordMyDels(queryForm.value.taskId, selectedKeys.value)
    .then((res) => {
      Message.success(localeGet('message2'));
      getList();
      delLoading.value = false;
    })
    .catch(() => {
      delLoading.value = false;
    });
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
      page: row.page,
    };
    list.push(item);
  } else {
    list[index][type] = row[type];
  }
};
// 保存
const handleSave = () => {
  if (saveForm.value.data.length === 0) {
    return Message.warning(localeGet('message3'));
  }
  saveForm.value.taskId = queryForm.value.taskId;
  saveLoading.value = true;
  keywordMySave(saveForm.value.taskId, saveForm.value.data)
    .then((res) => {
      Message.success(localeGet('message4'));
      getList();
      saveLoading.value = false;
    })
    .catch(() => {
      saveLoading.value = false;
    });
};
// 手动加词
const addForm = ref({ ...addFormDefault });
const addVisible = ref(false);
const addLoading = ref(false);
const keyword = ref('');
const handleAdd = () => {
  addForm.value = { ...addFormDefault };
  keyword.value = '';
  addVisible.value = true;
};
const addSubmit = () => {
  addForm.value.keyword = processTextArea(keyword.value);
  keyword.value = addForm.value.keyword.join('\n')
  if (addForm.value.keyword.length === 0) {
    Message.warning(localeGet('placeholder4'));
    return;
  }
  if (addForm.value.type === 1 && !addForm.value.taskName.trim()) {
    Message.warning(localeGet('message6'));
    return;
  }
  if (addForm.value.type === 2 && !addForm.value.taskId) {
    Message.warning(localeGet('placeholder6'));
    return;
  }
  // 字符长度过滤
  if (addForm.value.lengthFilter) {
    const { min, max } = addForm.value.lengthFilterVal;
    if (min > 0 || max > 0) {
      addForm.value.keyword = addForm.value.keyword.filter((item) => (min === 0 && max > 0 && item.length <= max) || (min > 0 && max === 0 && item.length >= min) || (min > 0 && max > 0 && item.length >= min && item.length <= max));
    }
  }
  // 包含关键词
  if (addForm.value.includeKeyword.length) {
    if (addForm.value.include) {
      addForm.value.keyword = addForm.value.keyword.filter((item) => addForm.value.includeKeyword.some((char) => item.includes(char)));
    } else {
      addForm.value.keyword = addForm.value.keyword.filter((item) => addForm.value.includeKeyword.every((char) => item.includes(char)));
    }
  }
  // 不包含关键词
  if (addForm.value.excludeKeyword.length) {
    if (addForm.value.exclude) {
      addForm.value.keyword = addForm.value.keyword.filter((item) => !addForm.value.excludeKeyword.some((char) => item.includes(char)));
    } else {
      addForm.value.keyword = addForm.value.keyword.filter((item) => !addForm.value.excludeKeyword.every((char) => item.includes(char)));
    }
  }
  if (addForm.value.keyword.length === 0) {
    Message.warning(localeGet('message7'));
    return;
  }
  addLoading.value = true;
  keywordMyAdd(addForm.value)
    .then((res) => {
      Message.success(localeGet('message8'));
      addVisible.value = false;
      getList();
      addLoading.value = false;
    })
    .catch(() => {
      addLoading.value = false;
    });
};
</script>

<script>
export default {
  name: 'KeywordMine', // If you want the include property of keep-alive to take effect, you must name the component
};
</script>

<style lang="less" scoped>
@import '@/assets/style/table.less';
.table_footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 12px;
}
</style>
