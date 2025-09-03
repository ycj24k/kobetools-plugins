<template>
    <div style="display: flex; flex-direction: column; height: 100%;">
        <div style="height: 12px;"></div>
        <div style="display: flex; gap: 8px; align-items: center">
            <div style="font-weight: bold">站点域名</div>
            <a-input v-model="domains" style="width: 320px; margin-right: 20px" placeholder="请输入站点域名，如：www.google.com" allow-clear />
            <div style="font-weight: bold">搜索引擎</div>
            <a-radio-group>
                <a-radio style="margin-left: 20px" v-for="sEngines in searchEngines" :key="sEngines.code" :disabled="sEngines.disabled" :value="sEngines.code">{{ sEngines.name }}</a-radio>
            </a-radio-group>
        </div>
        <div style="height: 25px;"></div>
        <div style="flex: 1;">
            <XTextarea v-model="keywords" placeholder="请输入需要查询索引的关键词，一行一个，一次最多提交100个"/>
        </div>
        <div style="height: 100px; display: flex; align-items: center;">
            <div style="width: 500px;">
                <XButton :loading="xTable?.table?.isLoadTable" @xClick="queryTableData" color="purple_blue_pink"
                         text="立即查询"/>
            </div>
            <div style="flex: 1; display: flex; gap: 12px; justify-content: flex-end">
                <XButton :loading="isDownloadFile" @xClick="exportToLocation" color="blue" text="导出查询结果"/>
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
import {showErrorNotification} from "@/hooks/useNotification";
import XTable from "@/components/common/XTable.vue";
import { handleExport } from '@/utils';

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
        title: '关键词',
        dataIndex: 'contactPerson',
        width: 300
    },
    {
        title: '搜索引擎',
        dataIndex: 'registrar',
        minWidth: 150
    },
    {
        title: '搜索状态',
        dataIndex: 'email',
        minWidth: 230
    },
    {
        title: '查询时间',
        dataIndex: 'creationDate',
        minWidth: 200
    },
    {
        title: '操作',
        dataIndex: 'age',
        minWidth: 150
    }
];

let searchEngines = [
    {code: "baidu", name: "百度", disabled: false},
    {code: "google", name: "谷歌", disabled: false},
    {code: "bing", name: "必应", disabled: false},
    {code: "so", name: "360", disabled: false},
    {code: "sogou", name: "搜狗", disabled: false},
    {code: "sm", name: "神马", disabled: false},
    {code: "toutiao", name: "头条", disabled: false},
    {code: "yahu", name: "雅虎", disabled: false},
    {code: "yandex", name: "Yandex", disabled: false}
];

let xTable = ref(null);
let domains = ref("");
let keywords = ref("");
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
    if (xTable.value.table.tableCurrData.length === 0) {
        showErrorNotification('未获取到查询结果');
        return;
    }
    handleExport(xTable.value.table.tableCurrData, xTable.value.selectedKeys, columns, '', 'csv')
}

</script>

<style scoped>

</style>