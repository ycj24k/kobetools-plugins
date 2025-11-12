<template>
  <div class="website-collect-promote-tool-task-details">
    <div class="website-collect-promote-tool-task-details__summary">
      <div class="website-collect-promote-tool-task-details__summary-title">
        任务名称：<span class="website-collect-promote-tool-task-details__summary-highlight">xxxx</span>
      </div>
      <div class="website-collect-promote-tool-task-details__summary-row">
        <span class="website-collect-promote-tool-task-details__summary-item">
          添加时间：xxxx-xx-xx xx:xx:xx
        </span>
        <span class="website-collect-promote-tool-task-details__summary-item">
          任务类型：首页收录
        </span>
        <span class="website-collect-promote-tool-task-details__summary-item">
          搜索引擎：百度
        </span>
        <span class="website-collect-promote-tool-task-details__summary-item">
          操作方式：xxx
        </span>
      </div>
      <div class="website-collect-promote-tool-task-details__summary-row">
        <span class="website-collect-promote-tool-task-details__summary-item">
          任务状态：进行中
        </span>
        <span class="website-collect-promote-tool-task-details__summary-item">
          任务数量：12345
        </span>
        <span class="website-collect-promote-tool-task-details__summary-item">
          已收录：123
        </span>
        <span class="website-collect-promote-tool-task-details__summary-item">
          收录率：80%
        </span>
      </div>
    </div>
    <div class="website-collect-promote-tool-task-details__filters">
      <a-select class="website-collect-promote-tool-task-details__select" placeholder="收录状态">
        <a-option>Beijing</a-option>
      </a-select>
      <a-select class="website-collect-promote-tool-task-details__select" placeholder="收录时效">
        <a-option>Beijing</a-option>
      </a-select>
      <a-input class="website-collect-promote-tool-task-details__input" placeholder="请输入网址链接" allow-clear />
      <XButton color="purple_blue_pink" size="small" text="搜索" />
      <XButtonOutline color="blue" size="small" text="重置" />
      <XButtonOutline color="blue" size="small" text="刷新" />
    </div>
    <div class="website-collect-promote-tool-task-details__table">
      <a-table :columns="columns" />
      <div class="website-collect-promote-tool-task-details__table-footer">
        <div class="website-collect-promote-tool-task-details__table-actions">
          <XButton color="yellow" size="small" text="批量删除" />
          <XButtonOutline color="blue" size="small" text="加载全部" />
          <span>共计：10 条</span>
        </div>
        <div class="website-collect-promote-tool-task-details__pagination">
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
        title: '搜索引擎',
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
        title: '任务状态',
        dataIndex: 'baRes',
        slotName: 'baRes',
        minWidth: 200
    },
    {
        title: '收录时效',
        dataIndex: 'baRes',
        slotName: 'baRes',
        minWidth: 200
    },
    {
        title: '收录时间',
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
.website-collect-promote-tool-task-details {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding-top: 12px;
  gap: 25px;

  &__summary {
    padding: 20px;
    background-color: rgb(240, 244, 255);
    border-radius: 12px;
    text-align: center;
    color: rgb(117, 119, 123);
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  &__summary-title {
    font-weight: bold;
    font-size: 16px;
  }

  &__summary-highlight {
    color: rgb(32, 85, 237);
  }

  &__summary-row {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: center;
  }

  &__summary-item {
    white-space: nowrap;
  }

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