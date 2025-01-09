<template>
    <div style="display: flex; flex-direction: column; height: 100%;">
        <div style="flex: 1;">
            <XTextarea v-model="domains" placeholder="请输入需要查询的域名信息，一行一个，单次最多提交100个，格式如：google.com"/>
        </div>
        <div style="height: 100px; display: flex; align-items: center;">
            <div style="width: 500px;">
                <XButton :loading="xTable?.table?.isLoadTable" @xClick="queryTableData" color="purple_blue_pink" text="立即查询"/>
            </div>
            <div style="flex: 1; display: flex; gap: 12px; justify-content: flex-end">
                <XButton :loading="isDownloadFile" @xClick="exportToLocation" color="blue" text="导出到本地"/>
                <XButton color="pink" text="VIP查询通道"/>
            </div>
        </div>
        <div style="height: 400px;">
            <XTable ref="xTable" :columns="columns">
                <template #bqRes="{ record }">
                    <div :style="{color: (record.bqRes==='是' ? 'red' : ''), fontWeight: (record.bqRes==='是' ? 700 : 500)}">
                        {{record.bqRes}}
                    </div>
                </template>
                <template #qqRes="{ record }">
                    <div :style="{color: (record.qqRes==='风险网站' ? 'red' : ''), fontWeight: (record.qqRes==='风险网站' ? 700 : 500)}">
                        {{record.qqRes}}
                    </div>
                </template>
                <template #wxRes="{ record }">
                    <div :style="{color: (record.wxRes==='风险网站' ? 'red' : ''), fontWeight: (record.wxRes==='风险网站' ? 700 : 500)}">
                        {{record.wxRes}}
                    </div>
                </template>
                <template #bdMessage="{ record }">
                    <div :style="{color: (record.bdMessage==='风险网站' ? 'red' : ''), fontWeight: (record.bdMessage==='风险网站' ? 700 : 500)}">
                        {{record.bdMessage}}
                    </div>
                </template>
                <template #baRes="{ record }">
                    <div :style="{color: (record.baRes==='黑名单' ? 'red' : ''), fontWeight: (record.baRes==='黑名单' ? 700 : 500)}">
                        {{record.baRes}}
                    </div>
                </template>
            </XTable>
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
        title: '是否被墙',
        dataIndex: 'bqRes',
        slotName: 'bqRes',
        width: 300
    },
    {
        title: 'QQ安全',
        dataIndex: 'qqRes',
        slotName: 'qqRes',
        sortable: {
            sortDirections: ['ascend', 'descend']
        },
        minWidth: 150
    },
    {
        title: '微信安全',
        dataIndex: 'wxRes',
        slotName: 'wxRes',
        minWidth: 230
    },
    {
        title: '百度安全',
        dataIndex: 'bdMessage',
        slotName: 'bdMessage',
        sortable: {
            sortDirections: ['ascend', 'descend']
        },
        minWidth: 200
    },
    {
        title: '备案安全',
        dataIndex: 'baRes',
        slotName: 'baRes',
        minWidth: 200
    },
];

let domains = ref("");
let xTable = ref(null);
let isDownloadFile = ref(false);

function queryTableData() {
    if (domains.value.trim().length === 0){
        showErrorNotification('请输入需要查询的域名信息！');
        return;
    }
    let data = domains.value.split("\n").filter(domain => domain.trim().length>0).map(domain => domain.trim());
    xTable.value.queryTableData("/api/beian/query/intercept", data);
}

function exportToLocation(){
    if (domains.value.trim().length === 0){
        showErrorNotification('请输入需要查询的域名信息！');
        return;
    }
    isDownloadFile.value = true;
    let data = domains.value.split("\n").filter(domain => domain.trim().length>0).map(domain => domain.trim());
    download("/api/beian/export/intercept", data, "导出文件.xlsx", ()=>{
        isDownloadFile.value = false;
    });
}

</script>

<style scoped>

</style>