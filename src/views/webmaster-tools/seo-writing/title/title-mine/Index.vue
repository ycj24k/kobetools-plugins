<template>
  <div class="container">
    <div class="container_box">
      <a-form class="form_box" ref="queryFormRef" layout="vertical" hide-label :model="queryForm">
        <a-grid :col-gap="24" :row-gap="24">
          <a-grid-item :span="4" class="flex_box">
            <a-form-item>
              <a-select @change="getList" v-model="queryForm.tid" :options="taskList" allow-search :placeholder="localeGet('placeholder1')"></a-select>
            </a-form-item>
          </a-grid-item>
          <a-grid-item :span="4" class="flex_box">
            <a-form-item field="title">
              <a-input v-model="queryForm.title" placeholder="请输入标题关键字" />
            </a-form-item>
          </a-grid-item>
          <a-grid-item :span="16">
            <div class="flex_box form_btns">
              <a-button class="form_btn1" type="primary" @click="getList">{{ localeGet('btn1') }}</a-button>
              <a-button class="form_btn2" type="primary" @click="handleAdd">{{ localeGet('btn2') }}</a-button>
              <a-button class="form_btn3" type="primary" @click="handleExport('txt')">导出TXT</a-button>
              <a-button class="form_btn4" type="primary" @click="handleExport('csv')">导出表格</a-button>
              <a-button class="form_btn7" type="outline" @click="handleReset">{{ localeGet('btn5') }}</a-button>
              <a-button type="outline" @click="handleRefresh">{{ localeGet('btn6') }}</a-button>
            </div>
          </a-grid-item>
        </a-grid>
      </a-form>
      <div class="table_box">
        <a-table column-resizable :bordered="{ cell: true }" :loading="tableLoading || saveLoading" :columns="myTableColumns" :data="tableData" row-key="id" :row-selection="rowSelection" v-model:selectedKeys="selectedKeys" :pagination="pagination" @page-size-change="handlePageSizeChange" :scroll="{ x: '100%', y: 500 }">
          <template #header="{ column }">
            <div>{{ column.title === '备注信息' ? '备注信息' : localeGet(column.title) }}</div>
          </template>
          <template #title="{ rowIndex }">
            <a-input @change="handleSaveChange(rowIndex, 'title')" v-model="tableData[rowIndex].title" />
          </template>
          <template #update_time="{ rowIndex }">
            <div>{{ dayjs(tableData[rowIndex].update_time * 1000).format('YYYY-MM-DD hh:mm') }}</div>
          </template>
          <template #actions="{ rowIndex }">
            <div class="flex_box flex_row_between table_btns">
              <a-button size="mini" class="form_btn3" @click="handleEdit(rowIndex)">{{ localeGet('btn7') }}</a-button>
              <a-popconfirm position="left" :content="localeGet('message1')" @ok="handleDelete(rowIndex)">
                <a-button size="mini" style="color: #333">{{ localeGet('btn8') }}</a-button>
              </a-popconfirm>
            </div>
          </template>
        </a-table>
        <a-space :size="20" class="table_save">
          <a-button :loading="saveLoading" class="form_btn5" type="primary" @click="handleSave">{{ localeGet('btn9') }}</a-button>
          <a-button :loading="saveLoading" class="form_btn8" type="primary">批量删除</a-button>
          <a-button :loading="saveLoading" class="form_btn1" type="primary">一键生成关键词描述</a-button>
          <a-button type="outline" @click="getListAll">{{ localeGet('btn10') }}</a-button>
          <div class="table_save_total">{{ localeGet('message2') }}{{ tableDataAll.length }}{{ localeGet('message3') }}</div>
        </a-space>
      </div>
      <!-- 手动加词 -->
      <a-modal :mask-closable="false" :esc-to-close="false" class="modal_box" v-model:visible="addVisible" width="65%">
        <template #title>
          <div class="flex_box modal_title">
            <div class="modal_title_icon">
              <icon-info-circle-fill />
            </div>
            <div class="modal_title_text">{{ localeGet('title1') }}</div>
          </div>
        </template>
        <a-spin :loading="addLoading" :tip="localeGet('message4')">
          <a-form class="form_box" ref="addFormRef" layout="vertical" hide-label :model="addForm">
            <a-grid class="form_main">
              <a-grid-item :span="24" class="form_right">
                <div class="flex_box form_item">
                  <div class="form_title">{{ localeGet('title2') }}</div>
                  <a-grid :col-gap="20" :row-gap="10" class="form_content">
                    <a-grid-item :span="8" class="flex_box form_option">
                      <a-form-item no-style field="type">
                        <a-space :size="20">
                          <a-radio @click="addForm.type = 1" :model-value="addForm.type === 1">新任务</a-radio>
                          <template v-if="addForm.type === 1">
                            <a-input v-model="addForm.taskName" :placeholder="localeGet('placeholder6')" />
                          </template>
                        </a-space>
                      </a-form-item>
                    </a-grid-item>
                    <a-grid-item :span="8" class="flex_box form_option">
                      <a-form-item no-style field="type">
                        <a-space :size="20">
                          <a-radio @click="addForm.type = 2" :model-value="addForm.type === 2">已有任务</a-radio>
                          <template v-if="addForm.type === 2">
                            <a-select v-model="addForm.tid" :options="taskList" placeholder="请选择任务" allow-search>
                                <!-- <template #label="{ data }">
                                  <span>{{ localeGet(data?.label) }}</span>
                                </template>
                                <template #option="{ data }">
                                  <span>{{ localeGet(data?.label) }}</span>
                                </template> -->
                              </a-select>
                          </template>
                        </a-space>
                      </a-form-item>
                    </a-grid-item>
                    <a-grid-item :span="8" class="flex_box form_option">
                      <div class="form_label">备注信息</div>
                      <a-form-item no-style field="type">
                        <a-input v-model="addForm.website" placeholder="请输入备注信息" />
                      </a-form-item>
                    </a-grid-item>
                  </a-grid>
                </div>
                <div class="flex_box form_item">
                  <div class="form_title">{{ localeGet('title3') }}</div>
                  <a-grid :col-gap="20" :row-gap="10" class="form_content">
                    <a-form-item no-style field="taskId" :rules="[{ required: true, message: localeGet('message5') }]" :validate-trigger="['change', 'blur']">
                      <a-space :style="{ width: '100%' }">
                        <a-upload :auto-upload="false" v-model="addFiles" @change="handleAddFileChange" :limit="1" accept=".xlsx,.xls" action="/"> </a-upload>
                      </a-space>
                    </a-form-item>
                  </a-grid>
                </div>
                <div class="form_item">
                  <a-grid :col-gap="20" :row-gap="10" class="form_content">
                    <a-grid-item :span="15" class="flex_box form_option">
                      <div class="form_title">{{ localeGet('title4') }}</div>
                      <div class="form_label">标题长度</div>
                      <a-form-item no-style field="lengthFilter">
                        <a-space :size="20">
                          <a-switch v-model="addForm.lengthFilter" :checked-value="1" :unchecked-value="0" />
                          <template v-if="addForm.lengthFilter === 1">
                            <a-space :size="20">
                              <span>最少</span>
                              <a-select v-model="addForm.lengthFilterVal.min" :options="lengthMinOptions" :style="{ width: '140px' }" :placeholder="localeGet('placeholder3')">
                                <!-- <template #label="{ data }">
                                  <span>{{ localeGet(data?.label) }}</span>
                                </template>
                                <template #option="{ data }">
                                  <span>{{ localeGet(data?.label) }}</span>
                                </template> -->
                              </a-select>
                              <span>-</span>
                              <span>最多</span>
                              <a-select v-model="addForm.lengthFilterVal.max" :options="lengthMaxOptions" :style="{ width: '140px' }" :placeholder="localeGet('placeholder4')">
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
                    <a-grid-item :span="9" class="flex_box form_option">
                      <div class="form_label">违禁词过滤</div>
                      <a-form-item no-style field="sensitiveFilter">
                        <a-space :size="20">
                          <a-switch v-model="addForm.sensitiveFilter" :checked-value="1" :unchecked-value="0" />
                          <template v-if="addForm.sensitiveFilter === 1">
                            <a-select v-model="addForm.sensitiveFilterVal" :options="customOptions" :style="{ width: '220px' }" allow-search :placeholder="localeGet('placeholder2')">
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
              </a-grid-item>
            </a-grid>
          </a-form>
        </a-spin>
        <template #footer>
          <div class="flex_box flex_row_center modal_footer">
            <a-button :loading="addLoading" style="color: #333" @click="addVisible = false">{{ localeGet('btn11') }}</a-button>
            <a-button :loading="addLoading" class="form_btn3" @click="addSubmit">{{ localeGet('btn12') }}</a-button>
          </div>
        </template>
      </a-modal>
      <!-- 编辑关键词 -->
      <a-modal :mask-closable="false" :esc-to-close="false" class="modal_box" v-model:visible="editVisible" width="40%">
        <template #title>
          <div class="flex_box modal_title">
            <div class="modal_title_icon">
              <icon-info-circle-fill />
            </div>
            <div class="modal_title_text">{{ localeGet('title5') }}</div>
          </div>
        </template>
        <a-spin :loading="editLoading" :tip="localeGet('message4')">
          <a-form class="form_box" ref="editFormRef" layout="vertical" hide-label :model="editForm">
            <a-grid class="form_main">
              <a-grid-item :span="24" class="form_right">
                <div class="form_content_input">
                  <a-input-tag v-model="editForm.keywords" :placeholder="localeGet('placeholder7')" allow-clear />
                </div>
              </a-grid-item>
            </a-grid>
          </a-form>
        </a-spin>
        <template #footer>
          <div class="flex_box flex_row_center modal_footer">
            <a-button :loading="editLoading" style="color: #333" @click="editVisible = false">{{ localeGet('btn11') }}</a-button>
            <a-button :loading="editLoading" class="form_btn3" @click="editSubmit">{{ localeGet('btn12') }}</a-button>
          </div>
        </template>
      </a-modal>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { Message } from '@arco-design/web-vue';
import dayjs from 'dayjs';
import { titleMyAdd, titleMyList, titleMySave, titleMyDel, titleTaskList, titleMyListAll } from '@/api/apps/tools/title';
import { sensitiveOptions, lengthMinOptions, lengthMaxOptions, customOptions, myTableColumns, addTypeOptions, addFormDefault } from '../utils/config';
import { exportModal, getListFromExcel } from '@/utils';
import localeConfig from './zh-CN.js';
import { useRouter } from 'vue-router';
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
const router = useRouter();

const selectedKeys = ref([]);
const rowSelection = reactive({
  showCheckedAll: true,
  onlyCurrent: false,
});
const pagination = ref({ pageSize: 100, showPageSize: true, pageSizeOptions: [100, 200, 500, 1000, 2000] });
const queryFormRef = ref(null);
const queryForm = ref({
  tid: '',
  title: '',
  weight: '',
  website: '',
  page: 1,
  limit: 100,
});
const allForm = ref({
  tid: '',
  pages: 1,
});
if (router.currentRoute.value.query.tid) {
  queryForm.value.tid = +router.currentRoute.value.query.tid;
}
const taskList = ref([]);
const tableLoading = ref(false);
const tableDataAll = ref([]);
const tableData = ref([]);
// 获取任务列表
const getTaskList = async () => {
  try {
    const res = await titleTaskList({
      page: 1,
      limit: 100,
    });
    taskList.value = res.data.data.map((item) => {
      return {
        label: item.name,
        value: item.id,
      };
    });
    if (res.data.data.length > 0 && !queryForm.value.tid) queryForm.value.tid = res.data.data[0].id;
  } catch (error) {
    console.log(error);
  }
  getList();
};
getTaskList();
// 获取列表
const getList = async () => {
  pagination.value.pageSize = 100;
  tableLoading.value = true;
  try {
    const res = await titleMyList(queryForm.value);
    tableData.value = res.data.data;
    tableDataAll.value = res.data.data;
    allForm.value.tid = queryForm.value.tid;
    allForm.value.pages = res.data.pages;
  } catch (error) {
    console.log(error);
  }
  tableLoading.value = false;
};

// 获取全部列表
const getListAll = async () => {
  if (allForm.value.pages === 1) {
    Message.success(localeGet('message6'));
    return
  }
  tableLoading.value = true;
  const res = await titleMyListAll(allForm.value);
  tableData.value = res.data;
  tableDataAll.value = res.data;
  tableLoading.value = false;
};
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
    return (
      (!queryForm.value.title || (queryForm.value.title && item.title.toLowerCase().includes(queryForm.value.title.toLowerCase()))) &&
      (!queryForm.value.weight || (queryForm.value.weight && item.weight.toString().includes(queryForm.value.weight))) &&
      (!queryForm.value.website || (queryForm.value.website && item.website.toLowerCase().includes(queryForm.value.website.toLowerCase())))
    );
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
// 导出
const handleExport = (e) => {
  const selects = tableData.value.filter((item) => selectedKeys.value.includes(item.id));
  exportModal(tableData.value, selects, localeGet('name'), e);
};
// 删除
const handleDelete = (rowIndex) => {
  titleMyDel({
    id: tableData.value[rowIndex].id,
    tid: queryForm.value.tid,
    page: tableData.value[rowIndex].page,
  })
    .then((res) => {
      Message.success(localeGet('message7'));
      getList();
    })
    .catch(() => {});
};
// 保存数据
const saveForm = ref({
  data: [],
  tid: '',
});
const saveLoading = ref(false);
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
    return Message.warning(localeGet('message8'));
  }
  saveForm.value.tid = queryForm.value.tid;
  saveLoading.value = true;
  titleMySave(saveForm.value)
    .then((res) => {
      Message.success(localeGet('message9'));
      getList();
      saveLoading.value = false;
    })
    .catch(() => {
      saveLoading.value = false;
    });
};
// 添加标题
const addForm = ref({ ...addFormDefault });
const addVisible = ref(false);
const addLoading = ref(false);
const addFiles = ref([]);
const handleAdd = () => {
  addForm.value = { ...addFormDefault };
  addVisible.value = true;
};
const handleAddFileChange = async (fileList) => {
  let list;
  if (fileList.length === 0) {
    addForm.value.keywords = [];
    return;
  }
  list = await getListFromExcel(fileList[0].file);
  if (list.length === 0) {
    Message.warning(localeGet('message10'));
    return;
  } else {
    list = list.filter((item) => item.title !== localeGet('message11'));
  }
  addForm.value.keywords = list.map((item) => item.title);
};
const addSubmit = () => {
  if (!addForm.value.taskName) {
    Message.warning(localeGet('message12'));
    return;
  }
  // if (!addForm.value.website) {
  //   Message.warning('请输入应用站点');
  //   return;
  // }
  addLoading.value = true
  titleMyAdd(addForm.value)
    .then((res) => {
      Message.success(localeGet('message13'));
      addVisible.value = false;
      getList();
      addLoading.value = false
    })
    .catch(() => {
      addLoading.value = false
    });
};
// 编辑标题
const editForm = ref({
  page: '',
  id: '',
  keywords: [],
});
const editVisible = ref(false);
const editLoading = ref(false);
const handleEdit = (rowIndex) => {
  editForm.value = {
    page: tableData.value[rowIndex].page,
    id: tableData.value[rowIndex].id,
    keywords: tableData.value[rowIndex].keywords,
  };
  editVisible.value = true;
};
const editSubmit = () => {
  if (!editForm.value.keywords.length) {
    Message.warning(localeGet('message14'));
    return;
  }
  editLoading.value = true
  titleMySave({ data: [editForm.value], tid: queryForm.value.tid })
    .then((res) => {
      Message.success(localeGet('message15'));
      editVisible.value = false;
      getList();
      editLoading.value = false
    })
    .catch(() => {
      editLoading.value = false
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
.form_content {
  :deep(.arco-upload-progress) {
    display: none;
  }
}
</style>
