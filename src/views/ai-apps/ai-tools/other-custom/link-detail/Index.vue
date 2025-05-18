<template>
  <div class="container">
    <div class="container_box">
      <a-form class="form_box" ref="queryFormRef" layout="vertical" hide-label :model="queryForm">
        <a-grid :col-gap="24" :row-gap="24">
          <a-grid-item :span="24">
            <div class="flex_box form_btns">
              <a-button class="form_btn2" type="primary" @click="handleAdd">{{ localeGet('btn1') }}</a-button>
              <a-button class="form_btn5" type="primary" @click="handleImport">{{ localeGet('btn2') }}</a-button>
              <a-button class="form_btn7" type="outline" @click="handleRefresh">{{ localeGet('btn3') }}</a-button>
              <a-button type="outline" @click="handleBack">{{ localeGet('btn4') }}</a-button>
            </div>
          </a-grid-item>
        </a-grid>
      </a-form>
      <div class="table_box">
        <a-table column-resizable :bordered="{ cell: true }" :loading="tableLoading || saveLoading" :columns="innerlinkDetailTableColumns" :data="tableData" row-key="id" :row-selection="rowSelection" v-model:selectedKeys="selectedKeys" :pagination="pagination" @page-size-change="handlePageSizeChange" @page-change="handlePageChange" :scroll="{ x: '100%', y: 500 }">
          <template #header="{ column }">
            <div>{{ localeGet(column.title) }}</div>
          </template>
          <template #name="{ rowIndex }">
            <a-input @change="handleSaveChange(rowIndex, 'name')" v-model="tableData[rowIndex].name" />
          </template>
          <template #link="{ rowIndex }">
            <a-input @change="handleSaveChange(rowIndex, 'link')" v-model="tableData[rowIndex].link" />
          </template>
          <template #sort="{ rowIndex }">
            <a-input-number :min="1" @change="handleSaveChange(rowIndex, 'sort')" v-model="tableData[rowIndex].sort" />
          </template>
          <template #strong="{ rowIndex }">
            <a-switch @change="handleSaveChange(rowIndex, 'strong')" v-model="tableData[rowIndex].strong" checked-value="1" unchecked-value="0" />
          </template>
          <template #create_time="{ rowIndex }">
            <div>{{ dayjs(tableData[rowIndex].create_time * 1000).format('YYYY-MM-DD hh:mm') }}</div>
          </template>
          <template #actions="{ rowIndex }">
            <div class="flex_box flex_row_between table_btns">
              <a-popconfirm position="left" :content="localeGet('message1')" @ok="handleDelete(rowIndex)">
                <a-button size="mini" style="color: #333">{{ localeGet('btn5') }}</a-button>
              </a-popconfirm>
            </div>
          </template>
        </a-table>
        <a-space :size="20" class="table_save">
          <a-button :loading="saveLoading" class="form_btn2" type="primary" @click="handleSave">{{ localeGet('btn6') }}</a-button>
          <a-button class="form_btn5" type="primary" @click="handleExport()">{{ localeGet('btn7') }}</a-button>
        </a-space>
      </div>
      <!-- 添加内链 -->
      <a-modal :mask-closable="false" l :esc-to-close="false" class="modal_box" v-model:visible="addVisible" width="1000px">
        <template #title>
          <div class="flex_box modal_title">
            <div class="modal_title_icon">
              <icon-info-circle-fill />
            </div>
            <div class="modal_title_text">{{ localeGet('title1') }}</div>
          </div>
        </template>
        <a-spin :loading="addLoading" tip="数据提交中">
          <a-form class="form_box" ref="addFormRef" layout="vertical" hide-label :model="addForm">
            <div class="form_main">
              <div class="form_label"><span style="color: #ff0000">*</span>{{ localeGet('label1') }}</div>
              <a-form-item no-style field="keyword">
                <a-textarea v-model="keyword" class="form_area" :placeholder="localeGet('placeholder1')" allow-clear />
              </a-form-item>
              <div class="form_item">
                <div class="form_content">
                  <div class="form_option">
                    <div class="form_label"><span style="color: #ff0000">*</span>{{ localeGet('label2') }}</div>
                    <a-form-item no-style field="type">
                      <a-radio-group v-model="addForm.strong" :options="weightOptions">
                        <template #label="{ data }">
                          <span>{{ localeGet(data?.label) }}</span>
                        </template>
                        <template #option="{ data }">
                          <span>{{ localeGet(data?.label) }}</span>
                        </template>
                      </a-radio-group>
                    </a-form-item>
                  </div>
                </div>
              </div>
            </div>
          </a-form>
        </a-spin>
        <template #footer>
          <div class="flex_box flex_row_center modal_footer">
            <a-button :loading="addLoading" style="color: #333" @click="addVisible = false">{{ localeGet('btn8') }}</a-button>
            <a-button :loading="addLoading" class="form_btn3" @click="addSubmit">{{ localeGet('btn9') }}</a-button>
          </div>
        </template>
      </a-modal>

      <!-- 导入内链 -->
      <a-modal :mask-closable="false" l :esc-to-close="false" class="modal_box" v-model:visible="importVisible" width="500px">
        <template #title>
          <div class="flex_box modal_title">
            <div class="modal_title_icon">
              <icon-info-circle-fill />
            </div>
            <div class="modal_title_text">{{ localeGet('title2') }}</div>
          </div>
        </template>
        <div>{{ localeGet('message2') }}</div>
        <template #footer>
          <div class="flex_box flex_row_center modal_footer">
            <a-button style="margin: 0" class="form_btn3" @click="importSubmit">{{ localeGet('btn10') }}</a-button>
          </div>
        </template>
      </a-modal>
      <a-modal :mask-closable="false" l :esc-to-close="false" class="modal_box" v-model:visible="progressVisible" width="360px">
        <template #title>
          <div class="flex_box modal_title">
            <div class="modal_title_icon">
              <icon-info-circle-fill />
            </div>
            <div class="modal_title_text">{{ localeGet('title2') }}</div>
          </div>
        </template>
        <div class="flex_box flex_row_center">
          <a-progress type="circle" :status="progressPercent === 1 ? 'success' : 'normal'" :percent="progressPercent" />
        </div>
        <template #footer>
          <div class="flex_box flex_row_center modal_footer">
            <a-button style="margin: 0" class="form_btn3" @click="importSubmit">{{ localeGet('btn11') }}</a-button>
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
import { innerlinkDetailEdit, innerlinkDetailList, innerlinkDetailSave, innerlinkDetailDelete, innerlinkDetailUpload } from '@/api/apps/tools/other';
import {
  weightOptions,
  innerlinkDetailTableColumns,
  innerlinkAddFormDefault,
} from '../utils/config';
import { exportExcel, getListFromExcel } from '@/utils';
import localeConfig from './zh-CN.js';
import { useRouter } from 'vue-router';
const router = useRouter();

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
const pagination = ref({ pageSize: 15, total: 0, showPageSize: true, pageSizeOptions: [15, 30, 50, 100] });
const queryFormRef = ref(null);
const queryForm = ref({
  tid: '',
  page: 1,
  limit: 15,
});
if (router.currentRoute.value.query.tid) {
  queryForm.value.tid = +router.currentRoute.value.query.tid;
}
const tableLoading = ref(false);
const tableData = ref([]);
// 获取列表
const getList = async () => {
  pagination.value.pageSize = 15;
  tableLoading.value = true;
  try {
    const res = await innerlinkDetailList(queryForm.value);
    tableData.value = res.data.data;
    pagination.value.total = res.data.total;
  } catch (error) {

  }
  tableLoading.value = false;
};
getList();

// 分页发生改变
const handlePageSizeChange = (pageSize) => {
  queryForm.value.page = 1;
  queryForm.value.limit = pageSize;
  pagination.value.pageSize = pageSize;
  getList();
};
const handlePageChange = (page) => {
  queryForm.value.page = page;
  getList();
};
// 返回
const handleBack = () => {
  router.back()
};
// 刷新
const handleRefresh = async () => {
  await getList();
};
// 导出
const handleExport = () => {
  exportExcel(tableData.value, route.name);
};
// 导入
const importVisible = ref(false);
const progressVisible = ref(false);
const progressPercent = ref(0);
let progress
const handleImport = () => {
  importVisible.value = true;
};
const importSubmit = () => {
  progressPercent.value = 0;
  const input = document.createElement('input');
  input.type = 'file';
  input.onchange = async (event) => {
    importVisible.value = false;
    progressVisible.value = true;
    clearInterval(progress);
    addProgress();
    let list = []
    // @ts-ignore
    list = await getListFromExcel(event.target.files[0]);
    if (list.length === 0) {
      clearInterval(progress);
      progressVisible.value = false;
      Message.warning(localeGet('message3'));
      return;
    }
    if (isNaN(parseInt(list[0].strong))) list.splice(0, 1);
    if (list.length === 0) {
      clearInterval(progress);
      progressVisible.value = false;
      Message.warning(localeGet('message3'));
      return;
    }
    let params = {
      data: list,
      tid: queryForm.value.tid,
    }
    innerlinkDetailUpload(params)
      .then((res) => {
        Message.success(localeGet('message4'));
        getList();
      })
      .catch(() => {});
  };
  input.click();
};
function addProgress() {
  let percent = 0;
  progress = setInterval(() => {
    percent += 1;
    progressPercent.value = percent/10;
    if (percent === 10) {
      clearInterval(progress);
    }
  }, 100);
}
// 删除
const handleDelete = (rowIndex) => {
  innerlinkDetailDelete({
    id: tableData.value[rowIndex].id,
    tid: queryForm.value.tid,
    page: tableData.value[rowIndex].page,
  })
    .then((res) => {
      Message.success(localeGet('message5'));
      getList();
    })
    .catch(() => {});
};
// 保存数据
const saveForm = ref({
  data: [],
  tid: '',
});
const saveLoading =ref(false);
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
    return Message.warning(localeGet('message6'));
  }
  saveForm.value.tid = queryForm.value.tid;
  saveLoading.value = true;
  innerlinkDetailSave(saveForm.value)
    .then((res) => {
      Message.success(localeGet('message7'));
      getList();
      saveLoading.value = false;
    })
    .catch(() => {
      saveLoading.value = false;
    });
};
// 添加内链
const addForm = ref({ ...innerlinkAddFormDefault });
const addVisible = ref(false);
const addLoading = ref(false);
const keyword = ref('');
const handleAdd = () => {
  addForm.value = { ...innerlinkAddFormDefault };
  keyword.value = '';
  addVisible.value = true;
};
const addSubmit = () => {
  if (keyword.value.trim() === '') {
    Message.warning(localeGet('message8'));
    return;
  }
  let keywords = keyword.value.split('\n');
  let list = []
  keywords.forEach((item) => {
    let itemArr = item.split('|');
    if (itemArr.length !== 2) {
      Message.warning(localeGet('message9'));
      return;
    }
    list.push(itemArr);
  });
  addForm.value.array = list
  addForm.value.tid = queryForm.value.tid;
  addLoading.value = true
  innerlinkDetailEdit({data: addForm.value})
    .then((res) => {
      Message.success(localeGet('message10'));
      addVisible.value = false;
      getList();
      addLoading.value = false
    })
    .catch(() => {
      addLoading.value = false
    });
};
</script>

<script>
export default {
  name: 'OtherInnerDetail', // If you want the include property of keep-alive to take effect, you must name the component
};
</script>

<style lang="less" scoped>
@import '@/assets/style/table.less';
.arco-spin {
  display: block;
}
.modal_box .form_box .form_area {
  height: 200px;
}

.form_label {
  line-height: 40px;
}
</style>
