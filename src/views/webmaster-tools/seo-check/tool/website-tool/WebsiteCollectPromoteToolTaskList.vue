<template>
  <div class="website-collect-promote-tool-task-list">
    <div class="website-collect-promote-tool-task-list__filters">
      <a-select class="website-collect-promote-tool-task-list__select" placeholder="任务类型">
        <a-option>Beijing</a-option>
      </a-select>
      <a-select class="website-collect-promote-tool-task-list__select" placeholder="搜索引擎">
        <a-option>Beijing</a-option>
      </a-select>
      <a-select class="website-collect-promote-tool-task-list__select" placeholder="操作方式">
        <a-option>Beijing</a-option>
      </a-select>
      <a-select class="website-collect-promote-tool-task-list__select" placeholder="任务状态">
        <a-option>Beijing</a-option>
      </a-select>
      <a-input class="website-collect-promote-tool-task-list__input" placeholder="请输入任务名称" allow-clear />
      <XButton color="purple_blue_pink" size="small" text="搜索" />
      <XButtonOutline color="blue" size="small" text="重置" />
      <XButtonOutline color="blue" size="small" text="刷新" />
    </div>
    <div class="website-collect-promote-tool-task-list__table">
      <a-table :columns="columns" />
      <div class="website-collect-promote-tool-task-list__table-footer">
        <div class="website-collect-promote-tool-task-list__table-actions">
          <XButton color="yellow" size="small" text="批量删除" />
          <XButtonOutline color="blue" size="small" text="加载全部" />
          <span>共计：10 条</span>
        </div>
        <div class="website-collect-promote-tool-task-list__pagination">
          <a-pagination show-total :total="50" show-page-size />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref} from "vue";
import XButton from "@/components/common/XButton.vue";
import XTextarea from "@/components/common/XTextarea.vue";
import {download} from "@/hooks/useHttp";
import {showErrorNotification} from "@/hooks/useNotification";
import XTable from "@/components/common/XTable.vue";
import XButtonOutline from "@/components/common/XButtonOutline.vue";

let columns = [
    {
        title: '序号',
        dataIndex: 'serialNumber',
        width: 100
    },
    {
        title: '任务ID',
        dataIndex: 'domain',
        minWidth: 200
    },
    {
        title: '任务名称',
        dataIndex: 'bqRes',
        slotName: 'bqRes',
        width: 300
    },
    {
        title: '任务类型',
        dataIndex: 'qqRes',
        slotName: 'qqRes',
        minWidth: 150
    },
    {
        title: '搜索引擎',
        dataIndex: 'wxRes',
        slotName: 'wxRes',
        minWidth: 230
    },
    {
        title: '操作方式',
        dataIndex: 'bdMessage',
        slotName: 'bdMessage',
        minWidth: 200
    },
    {
        title: '任务数',
        dataIndex: 'baRes',
        slotName: 'baRes',
        minWidth: 200
    },
    {
        title: '已收录',
        dataIndex: 'baRes',
        slotName: 'baRes',
        minWidth: 200
    },
    {
        title: '收录率',
        dataIndex: 'baRes',
        slotName: 'baRes',
        minWidth: 200
    },
    {
        title: '任务状态',
        dataIndex: 'baRes',
        slotName: 'baRes',
        minWidth: 200
    },
    {
        title: '添加时间',
        dataIndex: 'baRes',
        slotName: 'baRes',
        minWidth: 200
    },
    {
        title: '操作',
        dataIndex: 'baRes',
        slotName: 'baRes',
        minWidth: 200
    },
];

</script>

<style lang="less" scoped>
.website-collect-promote-tool-task-list {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding-top: 12px;
  gap: 25px;

  &__filters {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    align-items: center;
  }

  &__select {
    width: 150px;
  }

  &__input {
    width: 300px;
  }

  &__table {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  &__table-footer {
    display: flex;
    align-items: center;
  }

  &__table-actions {
    display: flex;
    gap: 12px;
    align-items: center;
    flex: 1;
  }

  &__pagination {
    flex: 1;
    display: flex;
    justify-content: flex-end;
  }
}
</style>