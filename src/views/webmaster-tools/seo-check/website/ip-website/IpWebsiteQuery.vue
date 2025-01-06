<template>
    <div style="display: flex; flex-direction: column; height: 100%;">
        <div style="flex: 1;">
            <XTextarea v-model="domains" placeholder="请输入需要查询的域名或IP地址，一行一个，单词最多提交10个，格式如：www.google.com，192.168.1.13"/>
        </div>
        <div style="height: 100px; display: flex; align-items: center;">
            <div style="width: 500px;">
                <XButton :loading="xTable?.table?.isLoadTable" @xClick="queryTableData" color="purple_blue_pink" text="立即查询"/>
            </div>
            <div style="flex: 1; display: flex; gap: 12px; justify-content: flex-end">
                <XButton :loading="isDownloadFile" @xClick="exportTableData" color="blue" text="导出查询列表"/>
                <XButton color="yellow" text="导出网站列表"/>
                <XButton color="pink" text="VIP查询通道"/>
            </div>
        </div>
        <div style="height: 400px;">
            <XTable ref="xTable" :columns="columns">
                <template #option="{ record }">
                    <XButton shape="square" text="详情" @xClick="ipWebsiteQueryDetails.show(record)"/>
                </template>
            </XTable>
        </div>
    </div>

    <IpWebsiteQueryDetails ref="ipWebsiteQueryDetails" />
</template>

<script setup>
import {ref} from "vue";
import XButton from "@/components/common/XButton.vue";
import XTextarea from "@/components/common/XTextarea.vue";
import {useHttp} from "@/hooks/useHttp";
import {Message} from "@arco-design/web-vue";
import XTable from "@/components/common/XTable.vue";
import IpWebsiteQueryDetails from "./IpWebsiteQueryDetails.vue";
import XCapsuleTag from "@/components/common/XCapsuleTag.vue";

let {download} = useHttp();

let columns = [
    {
        title: '序号',
        dataIndex: 'serialNumber',
        width: 100
    },
    {
        title: '域名',
        dataIndex: 'domain',
        width: 200
    },
    {
        title: '百度PC权重',
        dataIndex: 'ip',
        width: 300
    },
    {
        title: '百度移动权重',
        dataIndex: 'address',
        width: 150
    },
    {
        title: '搜狗PC权重',
        dataIndex: 'siteNum',
        width: 230
    },
    {
        title: '搜狗移动权重',
        dataIndex: 'date',
        width: 200
    },
    {
        title: '神马权重',
        dataIndex: 'date',
        width: 200
    },
    {
        title: '必应权重',
        dataIndex: 'date',
        width: 200
    },
    {
        title: '首页标题',
        dataIndex: 'date',
        width: 200
    },
    {
        title: '操作',
        slotName: 'option',
        minWidth: 200
    },
];

let domains = ref("");
let xTable = ref(null);
let ipWebsiteQueryDetails = ref(null);
let isDownloadFile = ref(false);

function queryTableData() {
    if (domains.value.trim().length === 0){
        Message.error("请输入需要查询的域名或IP地址");
        return;
    }
    let data = domains.value.split("\n").filter(domain => domain.trim().length>0).map(domain => domain.trim());
    xTable.value.queryTableData("/api/sites/query/dnsinfo", data);
}

function exportTableData(){
    if (domains.value.trim().length === 0){
        Message.error("请输入需要查询的域名或IP地址");
        return;
    }
    isDownloadFile.value = true;
    let data = domains.value.split("\n").filter(domain => domain.trim().length>0).map(domain => domain.trim());
    download("/api/sites/export/dnsinfo", data, "导出文件.xlsx", () => {
        isDownloadFile.value = false;
    });
}

</script>

<style scoped>

</style>