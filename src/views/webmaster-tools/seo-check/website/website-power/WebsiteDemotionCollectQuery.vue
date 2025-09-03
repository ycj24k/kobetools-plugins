<template>
    <div style="display: flex; flex-direction: column; height: 100%;">
        <div style="height: 12px;"></div>
        <div style="display: flex; gap: 20px;">
            <div style="font-weight: bold">搜索引擎</div>
            <a-checkbox-group v-model="queryParam.range">
                <a-checkbox style="margin-left: 30px" v-for="sEngines in searchEngines" :key="sEngines.code" :disabled="sEngines.disabled" :value="sEngines.code">{{ sEngines.name }}</a-checkbox>
            </a-checkbox-group>
        </div>
        <div style="height: 25px;"></div>
        <div style="flex: 1;">
            <XTextarea v-model="queryParam.domains"
                       placeholder="请输入需要查询的网站域名，一行一个，单词最多提交10个，格式如：www.google.com"/>
        </div>
        <div style="height: 100px; display: flex; align-items: center;">
            <div style="width: 500px;">
                <XButton :loading="xTable?.table?.isLoadTable" @xClick="queryTableData" color="purple_blue_pink"
                         text="立即查询"/>
            </div>
            <div style="flex: 1; display: flex; gap: 12px; justify-content: flex-end">
                <XButton :loading="isDownloadFile" @xClick="exportToLocation" color="blue" text="导出正常站点"/>
                <XButton :loading="isDownloadFile" @xClick="exportToLocation" color="yellow" text="导出降权站点"/>
                <XButton color="pink" text="VIP查询通道"/>
            </div>
        </div>
        <div style="height: 400px;">
            <XTable ref="xTable" :columns="columns" />
        </div>
    </div>
</template>

<script setup>
import {reactive, ref, toRaw, computed} from "vue";
import XButton from "@/components/common/XButton.vue";
import XTextarea from "@/components/common/XTextarea.vue";
import {download} from "@/hooks/useHttp";
import XTable from "@/components/common/XTable.vue";
import {showErrorNotification} from "@/hooks/useNotification";

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

let queryParam = reactive({
    domains: "",
    range: []
});

let columns = computed(()=>{
    return [
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
        ... searchEngines.filter(sEngines => queryParam.range.includes(sEngines.code)).map((sEngines) => {
            return {
                title: sEngines.name,
                dataIndex: sEngines.code,
                minWidth: 100
            }
        })
    ]
});

let xTable = ref({});
let isDownloadFile = ref(false);

// 全选
function allSelect() {
    queryParam.range = searchEngines.map(sEngines => sEngines.code);
}

// 反选
function revoltSelect() {
    queryParam.range = searchEngines
        .filter(sEngines => !queryParam.range.includes(sEngines.code))
        .map(sEngines => sEngines.code);
}

function queryTableData() {
    if (queryParam.range.length === 0) {
        showErrorNotification('请选择搜索引擎！');
        return;
    }
    if (queryParam.domains.trim().length === 0) {
        showErrorNotification('请输入需要查询的网站域名！');
        return;
    }
    let data = {
        domains: queryParam.domains.split("\n").filter(domain => domain.trim().length > 0).map(domain => domain.trim()),
        range: toRaw(queryParam.range)
    };
    xTable.value.queryTableData("/api/sites/query/indexhis", data);
}

function exportToLocation() {
    if (queryParam.range.length === 0) {
        showErrorNotification('请选择搜索引擎！');
        return;
    }
    if (queryParam.domains.trim().length === 0) {
        showErrorNotification('请输入需要查询的网站域名！');
        return;
    }
    let data = {
        domains: queryParam.domains.split("\n").filter(domain => domain.trim().length > 0).map(domain => domain.trim()),
        range: toRaw(queryParam.range)
    };
    isDownloadFile.value = true;
    download("/api/sites/export/indexhis", data, `KB-results-${Date.now()}.xlsx`, () => {
        isDownloadFile.value = false;
    });
}

</script>

<style scoped>

</style>