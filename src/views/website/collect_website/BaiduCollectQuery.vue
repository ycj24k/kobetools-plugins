<template>
    <div style="display: flex; flex-direction: column; height: 100%;">
        <div style="flex: 1;">
            <XTextarea v-model="domains" placeholder="请输入需要查询的网站域名，一行一个，单词最多提交100个，格式如：www.google.com"/>
        </div>
        <div style="height: 100px; display: flex; align-items: center;">
            <div style="width: 500px;">
                <XButton :loading="xTable?.table?.isLoadTable" @xClick="queryTableData" color="purple_blue_pink" text="立即查询"/>
            </div>
            <div style="flex: 1; display: flex; gap: 12px; justify-content: flex-end">
                <XButton :loading="isDownloadFile" @xClick="exportTableData" color="blue" text="导出到本地"/>
                <XButton color="pink" text="VIP查询通道"/>
            </div>
        </div>
        <div style="height: 400px;">
            <XTable ref="xTable" :columns="columns"></XTable>
        </div>
    </div>
</template>

<script setup>
import {ref} from "vue";
import XButton from "@/components/common/XButton.vue";
import XTextarea from "@/components/common/XTextarea.vue";
import {useHttp} from "@/hooks/useHttp";
import {Message} from "@arco-design/web-vue";
import XTable from "@/components/common/XTable.vue";

let {download} = useHttp();

let columns = [
    {
        title: '序号',
        dataIndex: 'serialNumber',
        width: 100
    },
    {
        title: '网站域名',
        dataIndex: 'domain',
        minWidth: 200
    },
    {
        title: '首页位置',
        dataIndex: 'baidupos',
        width: 100
    },
    {
        title: '总收录',
        dataIndex: 'baidusl',
        minWidth: 100
    },
    {
        title: '总索引',
        dataIndex: 'baidusy',
        minWidth: 100
    },
    {
        title: '日收录',
        dataIndex: 'baidu1d',
        minWidth: 100
    },
    {
        title: '周收录',
        dataIndex: 'baidu7d',
        minWidth: 100
    },
    {
        title: '月收录',
        dataIndex: 'baidu30d',
        minWidth: 100
    },
];

let domains = ref("");
let xTable = ref({});
let isDownloadFile = ref(false);

function queryTableData() {
    if (domains.value.trim().length === 0){
        Message.error("请输入需要查询的网站域名");
        return;
    }
    let data = domains.value.split("\n").filter(domain => domain.trim().length>0).map(domain => domain.trim());
    xTable.value.queryTableData("/api/sites/query/baidutask/result", data);
}

function exportTableData(){
    if (domains.value.trim().length === 0){
        Message.error("请输入需要查询的网站域名");
        return;
    }
    isDownloadFile.value = true;
    let data = domains.value.split("\n").filter(domain => domain.trim().length>0).map(domain => domain.trim());
    download("/api/sites/export/baidutask/result", data, "导出文件.xlsx", () => {
        isDownloadFile.value = false;
    });
}

</script>

<style scoped>

</style>