<template>
    <div style="display: flex; flex-direction: column; height: 100%;">
        <div style="height: 12px;"></div>
        <div style="display: flex; gap: 20px;">
            <div style="font-weight: bold">搜索引擎</div>
            <a-radio-group>
                <a-radio style="margin-left: 30px" v-for="sEngines in searchEngines" :disabled="sEngines.disabled"
                         :value="sEngines.code">{{ sEngines.name }}
                </a-radio>
            </a-radio-group>
        </div>
        <div style="height: 25px;"></div>
        <div style="display: flex; align-items: center">
            <span style="font-weight: bold; margin-right: 20px">端口选择</span>
            <a-radio-group>
                <a-radio style="margin-left: 30px">PC</a-radio>
                <a-radio style="margin-left: 30px">WAP</a-radio>
            </a-radio-group>
            <span style="font-weight: bold; margin-left: 80px; margin-right: 20px">查询模式</span>
            <a-radio-group>
                <a-radio style="margin-left: 30px">快速查询</a-radio>
                <a-radio style="margin-left: 30px">实时查询</a-radio>
            </a-radio-group>
            <span style="font-weight: bold; margin-left: 80px; margin-right: 20px">位置选择</span>
            <a-select style="width: 150px; margin-right: 5px" placeholder="选择国家">
                <a-option>中国</a-option>
            </a-select>
            <a-select style="width: 150px" placeholder="选择国家">
                <a-option>中国</a-option>
            </a-select>
        </div>
        <div style="height: 25px;"></div>
        <div style="flex: 1;">
            <XTextarea v-model="domains"
                       placeholder="请输入需要查询的域名信息，一行一个，单次最多提交10个，格式如：google.com"/>
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
        title: '排名',
        dataIndex: 'email',
        minWidth: 230
    },
    {
        title: '端口',
        dataIndex: 'creationDate',
        minWidth: 200
    },
    {
        title: '状态',
        dataIndex: 'expirationDate',
        minWidth: 200
    },
    {
        title: '地区节点',
        dataIndex: 'age',
        minWidth: 150
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
let isDownloadFile = ref(false);

function queryTableData() {
    if (domains.value.trim().length === 0) {
        showErrorNotification('请输入需要查询的域名信息！');
        return;
    }
    let data = domains.value.split("\n").filter(domain => domain.trim().length > 0).map(domain => domain.trim());
    xTable.value.queryTableData("/api/beian/query/intercept", data);
}

function exportToLocation() {
    if (xTable.value.table.tableCurrData.length === 0) {
        showErrorNotification('未获取到查询结果');
        return;
    }
    handleExport(xTable.value.table.tableCurrData, xTable.value.selectedKeys, columns, '', 'csv')
}

</script>

<style scoped>

</style>