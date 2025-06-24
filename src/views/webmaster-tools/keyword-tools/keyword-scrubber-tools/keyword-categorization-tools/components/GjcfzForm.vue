<template>
    <div style="display: flex; flex-direction: column; height: 100%;">
        <div class="flex_box search_box">
            <div class="search_area1">
              <XTextarea v-model="domains" placeholder=""/>
            </div>
            <div class="search_line1"></div>
            <div class="search_area2">
              <XTextarea v-model="domains" placeholder="请输入单个关键词，一行一个"/>
            </div>
            <div class="search_line2"></div>
            <div class="search_area2">
              <XTextarea v-model="domains" placeholder="请输入需要同时包含的文字或单词，一行一组，关键词之间用英文逗号隔开"/>
            </div>
        </div>
        <div style="height: 100px; display: flex; align-items: center;">
            <div style="width: 500px;">
                <XButton :loading="xTable?.table?.isLoadTable" @xClick="queryTableData" color="purple_blue_pink" text="立即分组"/>
            </div>
            <div style="flex: 1; display: flex; gap: 12px; justify-content: flex-end">
                <XButton :loading="isDownloadFile" @xClick="exportRecordKeepingDomains" color="blue"
                    text="导出分组结果" />
            </div>
        </div>
        <div style="height: 400px;">
            <XTable ref="xTable" :columns="columns" />
        </div>
    </div>
</template>

<script setup>
import {ref} from "vue";
import XButton from "@/components/common/XButton.vue";
import XTextarea from "@/components/common/XTextarea.vue";
import XTable from "@/components/common/XTable.vue";
import {showErrorNotification} from "@/hooks/useNotification";
import { handleExport } from '@/utils';

let columns = [
    {
        title: '序号',
        dataIndex: 'serialNumber',
        sortable: {
            sortDirections: ['ascend', 'descend']
        },
        width: 100
    },
];

let domains = ref("");
let xTable = ref(null);
let isDownloadFile = ref(false);

function queryTableData() {
    let data = domains.value.split("\n").filter(domain => domain.trim().length>0).map(domain => domain.trim());
    // xTable.value.queryTableData("/api/beian/query/registers", data);
}

function exportRecordKeepingDomains() {
    if (xTable.value.table.tableCurrData.length === 0) {
        showErrorNotification('未获取到查询结果');
        return;
    }
    handleExport(xTable.value.table.tableCurrData, xTable.value.selectedKeys, columns.value, '', 'csv')
}

</script>

<style lang="less" scoped>
    .search_box {
        height: 500px;
        align-items: stretch;
        .search_area1 {
            width: calc(50% - 40px);
        }
        .search_area2 {
            width: calc(25% - 40px);
        }
        .search_line1 {
            width: 1px;
            background-color: #eee;
            margin: 0 40px;
        }
        .search_line2 {
            width: 1px;
            background-color: #eee;
            margin: 0 20px;
        }
    }
</style>