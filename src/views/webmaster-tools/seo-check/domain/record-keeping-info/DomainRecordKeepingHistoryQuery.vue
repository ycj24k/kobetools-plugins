<template>
    <div style="display: flex; flex-direction: column; height: 100%;">
        <div style="flex: 1;">
            <XTextarea v-model="domains" placeholder="请输入需要查询的域名，一行一个，单次最多提交100个，格式如：google.com"/>
        </div>
        <div style="height: 100px; display: flex; align-items: center;">
            <div style="width: 500px;">
                <XButton :loading="xTable?.table?.isLoadTable" @xClick="queryTableData" color="purple_blue_pink" text="立即查询"/>
            </div>
            <div style="flex: 1; display: flex; gap: 12px; justify-content: flex-end">
                <XButton :loading="isDownloadFile" @xClick="exportRecordKeepingDomains" color="blue" text="导出备案域名"/>
                <XButton color="yellow" text="导出未备案域名"/>
                <XButton color="pink" text="VIP查询通道"/>
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
import {download} from "@/hooks/useHttp";
import XTable from "@/components/common/XTable.vue";
import {showErrorNotification} from "@/hooks/useNotification";

let columns = [
    {
        title: '序号',
        dataIndex: 'serialNumber',
        sortable: {
            sortDirections: ['ascend', 'descend']
        },
        width: 100
    },
    {
        title: '域名信息',
        dataIndex: 'domain',
        sortable: {
            sortDirections: ['ascend', 'descend']
        },
        minWidth: 200
    },
    {
        title: '历史备案主体',
        dataIndex: 'company',
        width: 300
    },
    {
        title: '单位性质',
        dataIndex: 'type',
        sortable: {
            sortDirections: ['ascend', 'descend']
        },
        minWidth: 150
    },
    /*{
        title: '主备案号',
        dataIndex: 'icp_main',
        minWidth: 230
    },*/
    {
        title: '备案号',
        dataIndex: 'icp',
        sortable: {
            sortDirections: ['ascend', 'descend']
        },
        minWidth: 200
    },
    /*{
        title: '备案ID',
        dataIndex: 'main_id',
        minWidth: 200
    },*/
    {
        title: '审核时间',
        dataIndex: 'icp_time',
        sortable: {
            sortDirections: ['ascend', 'descend']
        },
        minWidth: 150
    },
];

let domains = ref("");
let xTable = ref(null);
let isDownloadFile = ref(false);

function queryTableData() {
    if (domains.value.trim().length === 0){
        showErrorNotification('请输入需要查询的域名！');
        return;
    }
    let data = domains.value.split("\n").filter(domain => domain.trim().length>0).map(domain => domain.trim());
    xTable.value.queryTableData("/api/beian/query/logs", data);
}

function exportRecordKeepingDomains(){
    if (domains.value.trim().length === 0){
        showErrorNotification('请输入需要查询的域名！');
        return;
    }
    isDownloadFile.value = true;
    let data = domains.value.split("\n").filter(domain => domain.trim().length>0).map(domain => domain.trim());
    download("/api/beian/export/logs", data, "导出文件.xlsx", () => {
        isDownloadFile.value = false
    });
}

</script>

<style scoped>

</style>