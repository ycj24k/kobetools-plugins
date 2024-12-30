<template>
    <div style="display: flex; flex-direction: column; height: 100%;">
        <div style="flex: 1;">
            <XTextarea v-model="domains" placeholder="请输入需要查询的域名，一行一个，单词最多提交100个，格式如：google.com"/>
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
                    详情|未开发
                </template>
            </XTable>
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
        sortable: {
            sortDirections: ['ascend', 'descend']
        },
        width: 100
    },
    {
        title: '域名信息',
        dataIndex: 'domain',
        minWidth: 200
    },
    {
        title: '反链数量',
        dataIndex: 'backlink_count',
        width: 100
    },
    {
        title: 'Notfflow',
        dataIndex: 'nofollow',
        minWidth: 100
    },
    {
        title: '有回链',
        dataIndex: 'has_backlink',
        minWidth: 100
    },
    {
        title: '高权重数',
        dataIndex: 'pc_weight',
        minWidth: 100
    },
    {
        title: '发现时间',
        dataIndex: 'found_time',
        minWidth: 200
    },
    {
        title: '操作',
        slotName: 'option',
        minWidth: 200
    },
];

let domains = ref("");
let xTable = ref({});
let isDownloadFile = ref(false);

function queryTableData() {
    if (domains.value.trim().length === 0){
        Message.error("请输入需要查询的域名");
        return;
    }
    let data = domains.value.split("\n").filter(domain => domain.trim().length>0).map(domain => domain.trim());
    xTable.value.queryTableData("/api/sites/query/backlinks", data);
}

function exportTableData(){
    if (domains.value.trim().length === 0){
        Message.error("请输入需要查询的域名");
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