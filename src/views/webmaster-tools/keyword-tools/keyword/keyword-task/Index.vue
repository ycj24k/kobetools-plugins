<template>
  <div class="container">
    <div class="container_box x-tabs-fill">
      <a-form class="form_box" ref="queryFormRef" layout="vertical" hide-label :model="queryForm">
        <a-grid :col-gap="24" :row-gap="12">
          <a-grid-item :span="4" class="flex_box">
            <a-form-item field="type">
              <a-select v-model="queryForm.type" :options="translatedTypeOptions" allow-search :placeholder="localeGet('placeholder1')"></a-select>
            </a-form-item>
          </a-grid-item>
          <a-grid-item :span="4" class="flex_box">
            <a-form-item field="name">
              <a-input v-model="queryForm.name" :placeholder="localeGet('placeholder6')" />
            </a-form-item>
          </a-grid-item>
          <a-grid-item :span="4" class="flex_box">
            <a-form-item field="remark">
              <a-input v-model="queryForm.remark" :placeholder="localeGet('placeholder7')" />
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
        <a-table column-resizable :bordered="{ cell: true }" :loading="tableLoading" :columns="taskTableColumns" :data="tableData" :row-selection="rowSelection" v-model:selectedKeys="selectedKeys" :pagination="false" :scroll="{ x: '100%', y: 500 }">
          <template #header="{ column }">
            <div>{{ column.title === 'taskTableColumns.title5' ? localeGet('taskTableColumns.title5') : localeGet(column.title) }}</div>
          </template>
          <template #name="{ rowIndex }">
            <a-input @change="handleSaveChange(rowIndex, 'name')" v-model="tableData[rowIndex].name" />
          </template>
          <template #website="{ rowIndex }">
            <a-input @change="handleSaveChange(rowIndex, 'website')" v-model="tableData[rowIndex].website" />
          </template>
          <template #number="{ rowIndex }">
            <div>{{ tableData[rowIndex].number == -1 ? localeGet('status.paused') : tableData[rowIndex].number == 0 ? localeGet('status.generating') : tableData[rowIndex].number }}</div>
          </template>
          <template #updateTime="{ rowIndex }">
            <div>{{ dayjs(tableData[rowIndex].updateTime * 1000).format('YYYY-MM-DD hh:mm') }}</div>
          </template>
          <template #type="{ rowIndex }">
            <template v-for="item in translatedTypeOptions" :key="item.value">
              <div v-if="item.value == tableData[rowIndex].type">{{ item.label }}</div>
            </template>
          </template>
          <template #actions="{ rowIndex }">
            <div class="flex_box table_btns">
              <a-button size="mini" class="form_btn3" @click="handleDetail(rowIndex)">{{ localeGet('button4') }}</a-button>
              <a-button size="mini" class="form_btn4" @click="handleClear(rowIndex)">{{ localeGet('button5') }}</a-button>
              <a-popconfirm v-if="tableData[rowIndex].number == 0" position="left" :content="localeGet('content1')" @ok="handlePause(rowIndex)">
                <a-button size="mini" class="form_btn5">{{ localeGet('button6') }}</a-button>
              </a-popconfirm>
              <a-popconfirm position="left" :content="localeGet('content2')" @ok="handleDelete(rowIndex)">
                <a-button size="mini" style="color: #333">{{ localeGet('button7') }}</a-button>
              </a-popconfirm>
            </div>
          </template>
        </a-table>
        <div class="table_footer">
          <div class="table_save">
            <a-button class="form_btn5" type="primary" @click="handleSave">{{ localeGet('button8') }}</a-button>
          </div>
          <div class="table_pagination">
            <a-pagination
              v-model:current="queryForm.page"
              v-model:page-size="queryForm.pageSize"
              :total="Math.max(1, totalCount)"
              :page-size-options="[100, 200, 500, 1000, 2000]"
              show-page-size
              @page-size-change="handlePageSizeChange"
              @change="handlePageChange"
            />
          </div>
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
              <div class="form_label">{{ localeGet('label1') }}</div>
              <a-form-item no-style field="lengthFilter">
                <a-space :size="20">
                  <a-switch v-model="clearForm.form.lengthFilter" :checked-value="1" :unchecked-value="0" />
                  <template v-if="clearForm.form.lengthFilter === 1">
                    <a-space :size="20">
                      <span>{{ localeGet('label3') }}</span>
                      <a-select v-model="clearForm.form.lengthFilterVal.min" :options="translatedLengthMinOptions" :style="{ width: '140px' }" :placeholder="localeGet('placeholder3')"></a-select>
                      <span>-</span>
                      <span>{{ localeGet('label4') }}</span>
                      <a-select v-model="clearForm.form.lengthFilterVal.max" :options="translatedLengthMaxOptions" :style="{ width: '140px' }" :placeholder="localeGet('placeholder4')"></a-select>
                    </a-space>
                  </template>
                </a-space>
              </a-form-item>
            </a-grid-item>
            <a-grid-item :span="12" class="flex_box form_option">
              <div class="form_label">{{ localeGet('label2') }}</div>
              <a-form-item no-style field="sensitiveFilter">
                <a-space :size="20">
                  <a-switch v-model="clearForm.form.sensitiveFilter" :checked-value="1" :unchecked-value="0" />
                  <template v-if="clearForm.form.sensitiveFilter === 1">
                    <a-select v-model="clearForm.form.sensitiveFilterVal" :options="translatedCustomOptions" :style="{ width: '220px' }" allow-search :placeholder="localeGet('placeholder2')"></a-select>
                  </template>
                </a-space>
              </a-form-item>
            </a-grid-item>
          </a-grid>
        </div>
        <div class="form_item">
          <a-grid :col-gap="20" :row-gap="10" class="form_content">
            <a-grid-item :span="24" class="flex_box form_content_item">
              <div class="form_title">{{ localeGet('title4') }}</div>
              <div class="flex_box form_content_top">
                <a-form-item no-style field="engineTypes">
                  <a-checkbox-group v-model="clearForm.form.engineTypes" :options="translatedGLEngineOptions"></a-checkbox-group>
                </a-form-item>
              </div>
            </a-grid-item>
          </a-grid>
        </div>
        <div class="form_item">
          <a-grid :col-gap="20" :row-gap="10" class="form_content">
            <a-grid-item :span="12" class="flex_box form_content_item">
              <div class="form_title">{{ localeGet('title3') }}</div>
              <div class="flex_box form_content_top">
                <div class="form_label">{{ localeGet('label5') }}</div>
                <a-form-item no-style field="include">
                  <a-radio-group v-model="clearForm.form.include" :options="translatedIncludeOptions"></a-radio-group>
                </a-form-item>
              </div>
            </a-grid-item>
            <a-grid-item :span="12" class="form_content_item">
              <div class="flex_box form_content_top">
                <div class="form_label">{{ localeGet('label6') }}</div>
                <a-form-item no-style field="exclude">
                  <a-radio-group v-model="clearForm.form.exclude" :options="translatedExcludeOptions"></a-radio-group>
                </a-form-item>
              </div>
            </a-grid-item>
          </a-grid>
          <a-grid :col-gap="20" :row-gap="10" class="form_content">
            <a-grid-item :span="12" class="flex_box form_content_item">
              <div class="form_content_input">
                <a-textarea v-model="includeKeyword" class="form_area" :placeholder="localeGet('placeholder5')" allow-clear />
              </div>
            </a-grid-item>
            <a-grid-item :span="12" class="form_content_item">
              <div class="form_content_input">
                <a-textarea v-model="excludeKeyword" class="form_area" :placeholder="localeGet('placeholder5')" allow-clear />
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
import { ref, reactive, onMounted, computed } from 'vue';
import { Message } from '@arco-design/web-vue';
import dayjs from 'dayjs';
import { keywordTaskList, keywordTaskClean, keywordTaskDel, keywordTaskOut, keywordTaskSave } from '@/api/apps/tools/keyword';
import { includeOptions, excludeOptions, keyOptions, sensitiveOptions, lengthMinOptions, lengthMaxOptions, customOptions, typeOptions, taskTableColumns, clearFormDefault, GLEngineOptions } from '../utils/config';
import { jumpPage, processTextArea } from '@/utils/index';
import { useI18n } from '../utils/i18n';
import localZhCN from './zh-CN.js';

// 多语言（使用本地配置）
const { localeGet, translateOptions, initMicroApp, updateLocales } = useI18n(localZhCN);

// 初始化微前端监听
onMounted(() => {
  initMicroApp();
});

// 翻译选项
const translatedTypeOptions = translateOptions(typeOptions);
const translatedIncludeOptions = translateOptions(includeOptions);
const translatedExcludeOptions = translateOptions(excludeOptions);
const translatedCustomOptions = translateOptions(customOptions);
const translatedGLEngineOptions = translateOptions(GLEngineOptions);
const translatedLengthMinOptions = translateOptions(lengthMinOptions);
const translatedLengthMaxOptions = translateOptions(lengthMaxOptions);

const selectedKeys = ref([]);
const rowSelection = reactive({
  showCheckedAll: true,
  onlyCurrent: false,
});
const pagination = ref({ 
  pageSize: 100, 
  showPageSize: true, 
  pageSizeOptions: [100, 200, 500, 1000, 2000]
});
const totalCount = ref(0);
const queryFormRef = ref(null);
const queryForm = ref({
  type: '',
  name: '',
  remark: '',
  page: 1,
  pageSize: 100,
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
    tableData.value = res.data.list;
    tableDataAll.value = res.data.list;
    totalCount.value = (res.data && (res.data.total || res.data.count)) ? (res.data.total || res.data.count) : tableDataAll.value.length;
  } catch (error) {
    tableData.value = [];
    tableDataAll.value = [];
    totalCount.value = 0;
  }
  tableLoading.value = false;
  saveForm.value.data = [];
};
getList();
// 分页发生改变
const handlePageSizeChange = (pageSize) => {
  queryForm.value.page = 1;
  queryForm.value.pageSize = pageSize;
  getList();
};
// 页码改变
const handlePageChange = (page) => {
  queryForm.value.page = page;
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
  keywordTaskSave(saveForm.value.data)
    .then((res) => {
      Message.success(localeGet('message2'));
      getList();
    })
    .catch(() => {});
};

// 详情
const handleDetail = (rowIndex) => {
  jumpPage('/webmaster-tools/keyword-tools/keyword/keyword-mine', { taskId: tableData.value[rowIndex].id })
};
// 清洗
const clearVisible = ref(false);
const clearForm = ref({
  id: '',
  form: { ...clearFormDefault },
});
const includeKeyword = ref('');
const excludeKeyword = ref('');

const handleClear = (rowIndex) => {
  clearForm.value = {
    id: tableData.value[rowIndex].id,
    form: { ...clearFormDefault },
  };
  currentTask.value = tableData.value[rowIndex];
  clearVisible.value = true;
};

const clearSubmit = () => {
  clearForm.value.form.includeKeyword = processTextArea(includeKeyword.value);
  clearForm.value.form.excludeKeyword = processTextArea(excludeKeyword.value);
  keywordTaskClean(clearForm.value)
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
    .catch(() => {
      getList();
    });
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
.table_footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 12px;
}
</style>
