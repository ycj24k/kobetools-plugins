<template>
  <div class="container">
    <div class="container_box x-tabs-fill">
      <a-form class="form_box" ref="queryFormRef" layout="vertical" hide-label :model="queryForm">
        <a-grid :col-gap="24" :row-gap="24">
          <a-grid-item :span="4" class="flex_box">
            <a-form-item>
              <a-select @change="getList" v-model="queryForm.tid" :options="taskList" allow-search :placeholder="localeGet('placeholder1')" />
            </a-form-item>
          </a-grid-item>
          <a-grid-item :span="4" class="flex_box">
            <a-form-item field="title">
              <a-input v-model="queryForm.title" :placeholder="localeGet('placeholder2')" />
            </a-form-item>
          </a-grid-item>
          <a-grid-item :span="4" class="flex_box">
            <a-form-item field="website">
              <a-input v-model="queryForm.website" :placeholder="localeGet('placeholder3')" />
            </a-form-item>
          </a-grid-item>
          <a-grid-item :span="6">
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
        <a-table column-resizable :bordered="{ cell: true }" :loading="tableLoading || saveLoading" :columns="myTableColumns" :data="tableData" row-key="id" :row-selection="rowSelection" v-model:selectedKeys="selectedKeys" :pagination="false" :scroll="{ x: '100%', y: 500 }">
          <template #header="{ column }">
            <div>{{ localeGet(column.title) }}</div>
          </template>
          <template #title="{ rowIndex }">
            <a-input @change="handleSaveChange(rowIndex, 'title')" v-model="tableData[rowIndex].title" />
          </template>
          <template #subtitle="{ rowIndex }">
            <a-input @change="handleSaveChange(rowIndex, 'subtitle')" v-model="tableData[rowIndex].subtitle" />
          </template>
          <template #update_time="{ rowIndex }">
            <div>{{ dayjs(tableData[rowIndex].update_time * 1000).format('YYYY-MM-DD hh:mm') }}</div>
          </template>
          <template #actions="{ rowIndex }">
            <div class="flex_box flex_row_between table_btns">
              <a-button size="mini" class="form_btn3" @click="handleEdit(rowIndex)">{{ localeGet('btn6') }}</a-button>
              <a-popconfirm position="left" :content="localeGet('message1')" @ok="handleDelete(rowIndex)">
                <a-button size="mini" style="color: #333">{{ localeGet('btn7') }}</a-button>
              </a-popconfirm>
            </div>
          </template>
        </a-table>
        <div class="table_footer">
          <a-space :size="20" class="table_save">
            <a-button :loading="saveLoading" class="form_btn5" type="primary" @click="handleSave">{{ localeGet('btn9') }}</a-button>
            <a-button type="outline" @click="getListAll">{{ localeGet('btn10') }}</a-button>
            <div class="table_save_total">{{ localeGet('message2') }}{{ tableDataAll.length }}{{ localeGet('message3') }}</div>
          </a-space>
          <div class="table_pagination">
            <a-pagination
              v-model:current="pagination.current"
              v-model:page-size="pagination.pageSize"
              :total="Math.max(1, pagination.total || tableDataAll.length)"
              :page-size-options="[100, 200, 500, 1000, 2000]"
              show-page-size
              @page-size-change="handlePageSizeChange"
              @change="handlePageChange"
            />
          </div>
        </div>
      </div>
      <!-- 编辑内容 -->
      <a-modal :mask-closable="false" :esc-to-close="false" class="modal_box" v-model:visible="editVisible" width="80%">
        <template #title>
          <div class="flex_box modal_title">
            <div class="modal_title_icon">
              <icon-info-circle-fill />
            </div>
            <div class="modal_title_text">{{ localeGet('message4') }}</div>
          </div>
        </template>
        <a-spin :loading="editLoading" :tip="localeGet('message5')">
          <div class="form_editor">
            <mavon-editor v-model="editForm.content" :toolbars="toolbars" @change="handleChange" />
          </div>
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
import { h, ref, reactive } from 'vue';
import { Message, Modal } from '@arco-design/web-vue';
import dayjs from 'dayjs';
import { articleTaskList, articleMyList, articleMyListAll, articleMyDel, articleMySave } from '@/api/apps/tools/article';
import { myTableColumns } from '../utils/config';
import { exportModal } from '@/utils';
// @ts-ignore
import { mavonEditor } from 'mavon-editor';
import 'mavon-editor/dist/css/index.css'; // 引入 mavon-editor 样式
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
    const res = await articleTaskList({
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
  }
  getList();
};
getTaskList();
// 获取列表
const getList = async () => {
  pagination.value.pageSize = 100;
  tableLoading.value = true;
  try {
    const res = await articleMyList(queryForm.value);
    tableData.value = res.data.data;
    tableDataAll.value = res.data.data;
    allForm.value.tid = queryForm.value.tid;
    allForm.value.pages = res.data.pages;
  } catch (error) {
  }
  tableLoading.value = false;
};

// 获取全部列表
const getListAll = async () => {
  if (allForm.value.pages === 1) {
    Message.success(localeGet('message6'));
    return;
  }
  tableLoading.value = true;
  const res = await articleMyListAll(allForm.value);
  tableData.value = res.data;
  tableDataAll.value = res.data;
  tableLoading.value = false;
};
// 分页发生改变
const handlePageSizeChange = (pageSize) => {
  pagination.value.pageSize = pageSize;
  pagination.value.current = 1;
  queryForm.value.page = 1;
  queryForm.value.limit = pageSize;
  getList();
};
// 页码改变
const handlePageChange = (page) => {
  pagination.value.current = page;
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
  articleMyDel({
    id: tableData.value[rowIndex].id,
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
  articleMySave(saveForm.value)
    .then((res) => {
      Message.success(localeGet('message9'));
      getList();
      saveLoading.value = false;
    })
    .catch(() => {
      saveLoading.value = false;
    });
};

// 编辑标题
const editForm = ref({
  page: '',
  id: '',
  content: '',
});
const editVisible = ref(false);
const editLoading = ref(false);
const toolbars = ref({
  bold: true, // 粗体
  italic: true, // 斜体
  header: true, // 标题
  underline: true, // 下划线
  strikethrough: true, // 中划线
  mark: true, // 标记
  superscript: true, // 上角标
  subscript: true, // 下角标
  quote: true, // 引用
  ol: true, // 有序列表
  ul: true, // 无序列表
  link: true, // 链接
  code: true, // code
  table: true, // 表格
  htmlcode: true, // 展示html源码
  undo: true, // 上一步
  redo: true, // 下一步
  trash: true, // 清空
  alignleft: true, // 左对齐
  aligncenter: true, // 居中
  alignright: true, // 右对齐
  subfield: true, // 单双栏模式
  preview: true, // 预览
});
const handleChange = (value, render) => {
  // value： 变化后的值
  // render： 当前的内容渲染成html后的内容
};
const handleEdit = (rowIndex) => {
  editForm.value = {
    page: tableData.value[rowIndex].page,
    id: tableData.value[rowIndex].id,
    content: tableData.value[rowIndex].content,
  };
  editVisible.value = true;
};
const editSubmit = () => {
  if (!editForm.value.content) {
    Message.warning(localeGet('message10'));
    return;
  }
  editLoading.value = true;
  articleMySave({ data: [editForm.value], tid: queryForm.value.tid })
    .then((res) => {
      Message.success(localeGet('message11'));
      editVisible.value = false;
      getList();
      editLoading.value = false;
    })
    .catch(() => {
      editLoading.value = false;
    });
};
</script>

<script>
export default {
  name: 'ArticleMine',
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
.form_editor {
  height: 600px;
}
</style>
