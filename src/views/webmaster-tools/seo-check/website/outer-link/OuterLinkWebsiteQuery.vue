<template>
    <div style="display: flex; flex-direction: column; height: 100%;">
        <div style="flex: 1;">
            <XTextarea v-model="domains" placeholder="请输入需要查询的域名，一行一个，单词最多提交10个，格式如：google.com"/>
        </div>
        <div style="height: 100px; display: flex; align-items: center;">
            <div style="width: 500px;">
                <XButton :loading="xTable?.table?.isLoadTable" @xClick="queryTableData" color="purple_blue_pink" text="立即查询"/>
            </div>
            <div style="flex: 1; display: flex; gap: 12px; justify-content: flex-end">
                <XButton :loading="isDownloadFile" @xClick="exportTableData" color="blue" text="导出查询列表"/>
                <XButton color="yellow" text="导出外链详情"/>
                <XButton color="pink" text="VIP查询通道"/>
            </div>
        </div>
        <div style="height: 400px;">
            <XTable ref="xTable" :columns="columns">
                <template #option="{ record }">
                    <XButton size="small" shape="square" text="详情" @xClick="outerLinkWebsiteQueryDetails.show(record)"/>
                </template>
            </XTable>
        </div>
    </div>

    <OuterLinkWebsiteQueryDetails ref="outerLinkWebsiteQueryDetails" />
</template>

<script setup>
import {ref} from "vue";
import XButton from "@/components/common/XButton.vue";
import XTextarea from "@/components/common/XTextarea.vue";
import {download} from "@/hooks/useHttp";
import XTable from "@/components/common/XTable.vue";
import OuterLinkWebsiteQueryDetails from "./OuterLinkWebsiteQueryDetails.vue";
import {showErrorNotification} from "@/hooks/useNotification";

let columns = [
    {
        title: '序号',
        dataIndex: 'serialNumber',
        width: 100
    },
    {
        title: '域名信息',
        dataIndex: 'domain',
        width: 150
    },
    {
        title: '反链数量',
        dataIndex: 'backlink_count',
        width: 150
    },
    {
        title: 'Notfflow',
        dataIndex: 'nofollow',
        width: 150
    },
    {
        title: '有回链',
        dataIndex: 'has_backlink',
        width: 150
    },
    {
        title: '高权重数',
        dataIndex: 'maxCount',
        width: 150
    },
    {
        title: '最高权重',
        dataIndex: 'maxBr',
        width: 150
    },
    {
        title: '发现时间',
        dataIndex: 'date',
        width: 150
    },
    {
        title: '操作',
        slotName: 'option',
        width: 100
    },
];

let domains = ref("");
let xTable = ref(null);
let outerLinkWebsiteQueryDetails = ref(null);
let isDownloadFile = ref(false);

function queryTableData() {
    if (domains.value.trim().length === 0){
        showErrorNotification('请输入需要查询的域名！');
        return;
    }
    let data = domains.value.split("\n").filter(domain => domain.trim().length>0).map(domain => domain.trim());
    xTable.value.queryTableData("/api/sites/query/backlinks", data);
}

function exportTableData(){
    if (domains.value.trim().length === 0){
        showErrorNotification('请输入需要查询的域名！');
        return;
    }
    isDownloadFile.value = true;
    let data = domains.value.split("\n").filter(domain => domain.trim().length>0).map(domain => domain.trim());
    download("/api/sites/export/backlinks", data, "导出文件.xlsx", () => {
        isDownloadFile.value = false;
    });
}

</script>

<style scoped>

</style>