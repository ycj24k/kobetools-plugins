<template>
  <div class="container">
    <div class="container_box">
      <a-form class="form_box" ref="queryFormRef" layout="vertical" hide-label :model="queryForm">
        <a-grid :col-gap="24" :row-gap="24">
          <a-grid-item :span="4" class="flex_box">
            <a-form-item>
              <a-select @change="getList" v-model="queryForm.tid" :options="taskList" allow-search :placeholder="localeGet('placeholder1')" />
            </a-form-item>
          </a-grid-item>
          <a-grid-item :span="4" class="flex_box">
            <a-form-item field="weight">
              <a-select v-model="queryForm.weight" :options="weightOptions" allow-search :placeholder="localeGet('placeholder2')">
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
            <a-form-item field="title">
              <a-input v-model="queryForm.title" :placeholder="localeGet('placeholder3')" />
            </a-form-item>
          </a-grid-item>
          <a-grid-item :span="4" class="flex_box">
            <a-form-item field="website">
              <a-input v-model="queryForm.website" :placeholder="localeGet('placeholder4')" />
            </a-form-item>
          </a-grid-item>
          <a-grid-item :span="24">
            <div class="flex_box form_btns">
              <a-button class="form_btn1" type="primary" @click="handleSearch">{{ localeGet('button1') }}</a-button>
              <a-button class="form_btn2" type="primary" @click="handleAdd">{{ localeGet('button2') }}</a-button>
              <a-button class="form_btn5" type="primary" @click="handleExport('txt')">{{ localeGet('button3') }}</a-button>
              <a-button class="form_btn5" type="primary" @click="handleExport('csv')">{{ localeGet('button4') }}</a-button>
              <a-button class="form_btn7" type="outline" @click="handleReset">{{ localeGet('button5') }}</a-button>
              <a-button type="outline" @click="handleRefresh">{{ localeGet('button6') }}</a-button>
            </div>
          </a-grid-item>
        </a-grid>
      </a-form>
      <div class="table_box">
        <a-table column-resizable :bordered="{ cell: true }" :loading="tableLoading || saveLoading" :columns="myTableColumns" :data="tableData" row-key="id" :row-selection="rowSelection" v-model:selectedKeys="selectedKeys" :pagination="pagination" @page-size-change="handlePageSizeChange" :scroll="{ x: '100%', y: 500 }">
          <template #header="{ column }">
            <div>{{ localeGet(column.title) }}</div>
          </template>
          <template #title="{ rowIndex }">
            <a-input @change="handleSaveChange(rowIndex, 'title')" v-model="tableData[rowIndex].title" />
          </template>
          <template #weight="{ rowIndex }">
            <template v-for="item in weightOptions" :key="item.value">
              <div v-if="item.value === tableData[rowIndex].weight">{{ localeGet(item.label) }}</div>
            </template>
          </template>
          <template #update_time="{ rowIndex }">
            <div>{{ dayjs(tableData[rowIndex].update_time * 1000).format('YYYY-MM-DD hh:mm') }}</div>
          </template>
          <template #actions="{ rowIndex }">
            <div class="flex_box flex_row_between table_btns">
              <a-popconfirm position="left" :content="localeGet('content1')" @ok="handleDelete(rowIndex)">
                <a-button size="mini" style="color: #333">{{ localeGet('button7') }}</a-button>
              </a-popconfirm>
            </div>
          </template>
        </a-table>
        <a-space :size="20" class="table_save">
          <a-button :loading="saveLoading" class="form_btn5" type="primary" @click="handleSave">{{ localeGet('button8') }}</a-button>
          <a-button type="outline" @click="getListAll">{{ localeGet('button9') }}</a-button>
          <div class="table_save_total">{{ localeGet('total1') }}{{ tableDataAll.length }}{{ localeGet('total2') }}</div>
        </a-space>
      </div>
      <!-- 手动加词 -->
      <a-modal :mask-closable="false" l :esc-to-close="false" class="modal_box" v-model:visible="addVisible" width="80%">
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
                  <a-textarea v-model="keyword" class="form_area" :placeholder="localeGet('placeholder5')" allow-clear />
                </a-form-item>
              </a-grid-item>
              <a-grid-item :span="18" class="form_right">
                <div class="flex_box form_item">
                  <div class="form_title">{{ localeGet('title2') }}</div>
                  <a-grid :col-gap="20" :row-gap="10" class="form_content">
                    <a-grid-item :span="24" class="flex_box form_option">
                      <div class="form_label"><span style="color: #ff0000">*</span>{{ localeGet('label1') }}</div>
                      <a-form-item no-style field="type">
                        <a-space :size="20">
                          <a-radio-group v-model="addForm.type" :options="addTypeOptions">
                            <template #label="{ data }">
                              <span>{{ localeGet(data?.label) }}</span>
                            </template>
                            <template #option="{ data }">
                              <span>{{ localeGet(data?.label) }}</span>
                            </template>
                          </a-radio-group>
                          <template v-if="addForm.type === 1">
                            <a-input v-model="addForm.taskName" :placeholder="localeGet('placeholder6')" />
                          </template>
                        </a-space>
                      </a-form-item>
                    </a-grid-item>
                  </a-grid>
                </div>
                <div class="flex_box form_item">
                  <div class="form_title">{{ localeGet('title3') }}</div>
                  <a-grid :col-gap="20" :row-gap="10" class="form_content">
                    <a-grid-item :span="18" class="flex_box form_option">
                      <div class="form_label">{{ localeGet('label6') }}</div>
                      <a-form-item no-style field="sensitiveFilter">
                        <a-space :size="20">
                          <a-switch v-model="addForm.sensitiveFilter" :checked-value="1" :unchecked-value="0" />
                          <template v-if="addForm.sensitiveFilter === 1">
                            <a-radio-group v-model="addForm.sensitiveFilterVal" :options="sensitiveOptions">
                              <template #label="{ data }">
                                <span>{{ localeGet(data?.label) }}</span>
                              </template>
                              <template #option="{ data }">
                                <span>{{ localeGet(data?.label) }}</span>
                              </template>
                            </a-radio-group>
                          </template>
                          <template v-if="addForm.sensitiveFilter === 1 && addForm.sensitiveFilterVal === 2">
                            <a-select v-model="addForm.sensitiveCustom" :options="customOptions" :style="{ width: '220px' }" allow-search :placeholder="localeGet('placeholder7')">
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
                    <a-grid-item :span="24" class="flex_box form_option">
                      <div class="form_label">{{ localeGet('label7') }}</div>
                      <a-form-item no-style field="lengthFilter">
                        <a-space :size="20">
                          <a-switch v-model="addForm.lengthFilter" :checked-value="1" :unchecked-value="0" />
                          <template v-if="addForm.lengthFilter === 1">
                            <a-space :size="20">
                              <span>{{ localeGet('label10') }}</span>
                              <a-select v-model="addForm.lengthFilterVal.min" :options="lengthMinOptions" :style="{ width: '140px' }" :placeholder="localeGet('placeholder8')">
                                <template #label="{ data }">
                                  <span>{{ localeGet(data?.label) }}</span>
                                </template>
                                <template #option="{ data }">
                                  <span>{{ localeGet(data?.label) }}</span>
                                </template>
                              </a-select>
                              <span>-</span>
                              <span>{{ localeGet('label11') }}</span>
                              <a-select v-model="addForm.lengthFilterVal.max" :options="lengthMaxOptions" :style="{ width: '140px' }" :placeholder="localeGet('placeholder9')">
                                <template #label="{ data }">
                                  <span>{{ localeGet(data?.label) }}</span>
                                </template>
                                <template #option="{ data }">
                                  <span>{{ localeGet(data?.label) }}</span>
                                </template>
                              </a-select>
                            </a-space>
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
                        <div class="form_label">结果包含</div>
                        <a-form-item no-style field="include">
                          <a-radio-group v-model="addForm.include" :options="includeOptions">
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
                          <a-radio-group v-model="addForm.exclude" :options="excludeOptions">
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
                        <a-textarea v-model="addForm.includeKeyword" class="form_area" placeholder="请输入关键词，每行一个关键词" allow-clear />
                      </div>
                    </a-grid-item>
                    <a-grid-item :span="12" class="form_content_item">
                      <div class="form_content_input">
                        <a-textarea v-model="addForm.excludeKeyword" class="form_area" placeholder="请输入关键词，每行一个关键词" allow-clear />
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
            <a-button :loading="addLoading" style="color: #333" @click="addVisible = false">{{ localeGet('button10') }}</a-button>
            <a-button :loading="addLoading" class="form_btn3" @click="addSubmit">{{ localeGet('button11') }}</a-button>
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
import { keywordMyAdd, keywordMyList, keywordMySave, keywordMyDel, keywordTaskList, keywordMyListAll } from '@/api/apps/tools/keyword';
import { includeOptions, excludeOptions, keyOptions, sensitiveOptions, lengthMinOptions, lengthMaxOptions, customOptions, weightOptions, myTableColumns, addTypeOptions, addFormDefault } from '../utils/config';
import { exportModal } from '@/utils';
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
  tableLoading.value = true;
  try {
    const res = await keywordTaskList({
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
    taskList.value = [];
  }
  getList();
};
getTaskList();
// 获取列表
const getList = async () => {
  pagination.value.pageSize = 100;
  tableLoading.value = true;
  try {
    const res = await keywordMyList(queryForm.value);
    tableData.value = res.data.data;
    tableDataAll.value = res.data.data;
    allForm.value.tid = queryForm.value.tid;
    allForm.value.pages = res.data.pages;
  } catch (error) {
    tableData.value = [];
    tableDataAll.value = [];
  }
  tableLoading.value = false;
};

// 获取全部列表
const getListAll = async () => {
  if (allForm.value.pages === 1) {
    Message.success(localeGet('message1'));
    return;
  }
  tableLoading.value = true;
  const res = await keywordMyListAll(allForm.value);
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
    return (!queryForm.value.title || (queryForm.value.title && item.title.toLowerCase().includes(queryForm.value.title.toLowerCase()))) && (!queryForm.value.weight || (queryForm.value.weight && item.weight.toString().includes(queryForm.value.weight))) && (!queryForm.value.website || (queryForm.value.website && item.website.toLowerCase().includes(queryForm.value.website.toLowerCase())));
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
  keywordMyDel({
    id: tableData.value[rowIndex].id,
    tid: queryForm.value.tid,
    page: tableData.value[rowIndex].page,
  })
    .then((res) => {
      Message.success(localeGet('message2'));
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
    return Message.warning(localeGet('message3'));
  }
  saveForm.value.tid = queryForm.value.tid;
  saveLoading.value = true;
  keywordMySave(saveForm.value)
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
  addForm.value.keyword = keyword.value ? keyword.value.split('\n') : [];
  if (addForm.value.keyword.length === 0) {
    Message.warning(localeGet('message5'));
    return;
  }
  if (!addForm.value.taskName) {
    Message.warning(localeGet('message6'));
    return;
  }
  // if (!addForm.value.website) {
  //   Message.warning('请输入应用站点');
  //   return;
  // }
  // 关键词去重
  if (addForm.value.removal) addForm.value.keyword = [...new Set(addForm.value.keyword)];
  // 特殊字符过滤
  if (addForm.value.keyFilter) {
    if (addForm.value.keyFilterVal === 1) {
      addForm.value.keyword = addForm.value.keyword.map((item) => item.replace(/[^\u4e00-\u9fa5a-zA-Z0-9]/g, ''));
    } else if (addForm.value.keyFilterVal === 2) {
      addForm.value.keyword = addForm.value.keyword.map((item) => item.replace(/\s/g, ''));
    }
  }
  // 保留原始词
  if (addForm.value.reserve) {
    addForm.value.reserveKeyword = keyword.value;
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
.modal_box .form_box .form_item .form_title {
  width: 100px;
}
.modal_box .form_box .form_item .form_label {
  width: 100px;
}
</style>
