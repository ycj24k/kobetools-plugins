<template>
  <div class="container">
    <a-card title="检索">
      <a-row :gutter="24">
        <a-col :flex="1">
          <a-form :model="table.form" label-align="left">
            <a-row :gutter="24">
              <a-col :span="8" v-for="index in 6">
                <a-form-item field="number" label="编号">
                  <a-input v-model="table.form.number" placeholder="请输入编号" />
                </a-form-item>
              </a-col>
            </a-row>
          </a-form>
        </a-col>
        <a-divider style="height: 84px" direction="vertical" />
        <a-col :flex="'86px'" style="text-align: right">
          <a-space direction="vertical" :size="18">
            <a-button type="primary">
              <template #icon>
                <icon-search />
              </template>
              查询
            </a-button>
            <a-button>
              <template #icon>
                <icon-refresh />
              </template>
              重置
            </a-button>
          </a-space>
        </a-col>
      </a-row>
      <a-divider style="margin-top: 0" />
      <a-row style="margin-bottom: 16px">
        <a-col :span="12">
          <a-space>
            <a-button type="primary">
              <template #icon>
                <icon-plus />
              </template>
              新增
            </a-button>
            <a-button>
              <template #icon>
                <icon-refresh />
              </template>
              刷新
            </a-button>
            <a-button>
              <template #icon>
                <icon-upload />
              </template>
              导入
            </a-button>
          </a-space>
        </a-col>
        <a-col :span="12" style="display: flex; justify-content: flex-end">
          <a-button>
            <template #icon>
              <icon-download />
            </template>
            导出
          </a-button>
        </a-col>
      </a-row>
      <a-table class="kb-table" :row-key="table.key" :columns="table.columns" :data="data" :loading="table.loading" v-model:selectedKeys="table.keys" :row-selection="table.row" :scroll="table.scroll" :pagination="table.pags" @page-change="onPageChange" @page-size-change="onPageSizeChange" @selection-change="onSelectionChange">
        <template #open="{ record }">
          <a-space>
            <a-button size="mini" type="primary">编辑</a-button>
            <a-popconfirm content="确定删除?">
              <a-button size="mini">删除</a-button>
            </a-popconfirm>
          </a-space>
        </template>
      </a-table>
    </a-card>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const table = ref({
  form: {
    number: '',
  },
  loading: false,
  key: 'id',
  keys: [],
  pags: {
    total: 20,
    current: 1,
    pageSize: 5,
    showPageSize: true,
    pageSizeOptions: [5, 30, 50, 100],
  },
  scroll: {
    x: '100%',
    y: 500,
  },
  row: {
    type: 'checkbox',
    showCheckedAll: true,
  },
  columns: [
    {
      title: 'ID',
      sortable: {
        sortDirections: ['ascend', 'descend'],
      },
      dataIndex: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Salary',
      dataIndex: 'salary',
    },
    {
      title: 'Address',
      dataIndex: 'address',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      fixed: 'right',
      title: '操作',
      width: '150',
      slotName: 'open',
    },
  ],
});

const data = ref([
  {
    id: 1,
    name: 'Jane Doe',
    salary: 23000,
    address: '32 Park Road, London',
    email: 'jane.doe@example.com',
  },
  {
    id: 2,
    name: 'Alisa Ross',
    salary: 25000,
    address: '35 Park Road, London',
    email: 'alisa.ross@example.com',
  },
  {
    id: 3,
    name: 'Kevin Sandra',
    salary: 22000,
    address: '31 Park Road, London',
    email: 'kevin.sandra@example.com',
  },
  {
    id: 4,
    name: 'Ed Hellen',
    salary: 17000,
    address: '42 Park Road, London',
    email: 'ed.hellen@example.com',
  },
  {
    id: 5,
    name: 'William Smith',
    salary: 27000,
    address: '62 Park Road, London',
    email: 'william.smith@example.com',
  },
]);

const getData = async () => {
  console.log(table.value.pags);
};

const onPageChange = async (page) => {
  console.log(page);
  table.value.pags.current = page;
  await getData();
};

const onPageSizeChange = (pageSize) => {
  console.log(pageSize);
  table.value.pags.pageSize = pageSize;
  onPageChange(1);
};

const onSelectionChange = (ids) => {
  console.log(ids);
};
</script>

<style scoped></style>
