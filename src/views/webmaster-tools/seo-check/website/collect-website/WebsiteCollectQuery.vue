<template>
    <div style="display: flex; flex-direction: column; height: 100%;">
        <div style="height: 12px;"></div>
        <div style="display: flex; gap: 20px;">
            <div style="font-weight: bold">搜索引擎</div>
            <div style="font-weight: bold; color: #6886f1; cursor: pointer" @click="allSelect">全选</div>
            <div style="font-weight: bold; color: #6886f1; cursor: pointer" @click="revoltSelect">反选</div>
            <div style="font-weight: bold; color: #6886f1; cursor: pointer" @click="queryParam.range=[]">清除</div>
            <a-checkbox-group v-model="queryParam.range">
                <a-checkbox style="margin-left: 30px" v-for="sEngines in searchEngines" :disabled="sEngines.disabled" :value="sEngines.code">{{ sEngines.name }}</a-checkbox>
            </a-checkbox-group>
        </div>
        <div style="height: 25px;"></div>
        <div style="flex: 1;">
            <XTextarea v-model="queryParam.domains"
                       placeholder="请输入需要查询的网站域名，一行一个，单词最多提交100个，格式如：www.google.com"/>
        </div>
        <div style="height: 100px; display: flex; align-items: center;">
            <div style="width: 500px;">
                <XButton :loading="xTable?.table?.isLoadTable" @xClick="queryTableData" color="purple_blue_pink"
                         text="立即查询"/>
            </div>
            <div style="flex: 1; display: flex; gap: 12px; justify-content: flex-end">
                <XButton :loading="isDownloadFile" @xClick="exportToLocation" color="blue" text="导出到本地"/>
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
import {useHttp} from "@/hooks/useHttp";
import {Message} from "@arco-design/web-vue";
import XTable from "@/components/common/XTable.vue";

let {download} = useHttp();

let searchEngines = [
    {code: "baidu", name: "百度", disabled: false},
    {code: "so", name: "360", disabled: false},
    {code: "sogou", name: "搜狗", disabled: false},
    {code: "sm", name: "神马", disabled: false},
    {code: "google", name: "谷歌-即将开放", disabled: true},
    {code: "toutiao", name: "头条-即将开放", disabled: true},
    {code: "bing", name: "必应-即将开放", disabled: true},
    {code: "yahu", name: "雅虎-即将开放", disabled: true}
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
        Message.error("请选择搜索引擎");
        return;
    }
    if (queryParam.domains.trim().length === 0) {
        Message.error("请输入需要查询的网站域名");
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
        Message.error("请选择搜索引擎");
        return;
    }
    if (queryParam.domains.trim().length === 0) {
        Message.error("请输入需要查询的网站域名");
        return;
    }
    let data = {
        domains: queryParam.domains.split("\n").filter(domain => domain.trim().length > 0).map(domain => domain.trim()),
        range: toRaw(queryParam.range)
    };
    isDownloadFile.value = true;
    download("/api/sites/export/indexhis", data, "导出文件.xlsx", () => {
        isDownloadFile.value = false;
    });
}

</script>

<style scoped>

</style>