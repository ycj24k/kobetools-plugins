<template>
    <div style="display: flex; flex-direction: column; height: 100%;">
        <div style="height: 12px;"></div>
        <div style="display: flex; gap: 20px;">
            <div style="font-weight: bold">搜索引擎</div>
            <a-radio-group>
                <a-radio style="margin-left: 30px" v-for="sEngines in searchEngines" :disabled="sEngines.disabled" :value="sEngines.code">{{ sEngines.name }}</a-radio>
            </a-radio-group>
        </div>
        <div style="height: 25px;"></div>
        <div style="display: flex; gap: 20px;">
            <div style="font-weight: bold">操作方式</div>
            <a-radio-group>
                <a-radio style="margin-left: 30px">无验证推送</a-radio>
                <a-radio style="margin-left: 30px">Sitemap推送</a-radio>
                <a-radio style="margin-left: 30px">蜘蛛池收录</a-radio>
                <a-radio style="margin-left: 30px">诊断推送</a-radio>
                <a-radio style="margin-left: 30px">外链推送</a-radio>
                <a-radio style="margin-left: 30px">AI推送</a-radio>
                <a-radio style="margin-left: 30px">代做包收录</a-radio>
            </a-radio-group>
        </div>
        <div style="height: 25px;"></div>
        <div>
                <span style="font-weight: bold; margin-right: 20px">百度站长资源平台TOKEN</span>
                <a-input style="width: 450px; margin-right: 100px" placeholder="输入百度站长资源平台的Token信息，如：p3U78zgbyGdVitR3" allow-clear />
                <span style="font-weight: bold; margin-right: 20px">已收录自动停止</span>
                <a-switch style="position: relative; top: -3px" />
        </div>
        <div style="height: 25px;"></div>
        <div style="color: rgb(148, 3, 184)">
            提示:1、请确保以下提交的站点均已通过站长平台验证，且以下所有站点均在同一百度资源平台账号下;  2、输入网址时注意https和http的区别。
        </div>
        <div style="height: 25px;"></div>
        <div style="flex: 1;">
            <XTextarea v-model="domains" placeholder="请输入需要查询的域名信息，一行一个，单次最多提交10个，格式如：google.com"/>
        </div>
        <div style="height: 100px; display: flex; align-items: center;">
            <div style="width: 500px;">
                <XButton :loading="xTable?.table?.isLoadTable" @xClick="queryTableData" color="purple_blue_pink" text="提交任务"/>
            </div>
            <div style="flex: 1; display: flex; gap: 12px; justify-content: flex-end">
                <XButton :loading="isDownloadFile" @xClick="exportToLocation" color="blue" text="查看任务列表"/>
                <XButton color="pink" text="VIP查询通道"/>
            </div>
        </div>

    </div>
</template>

<script setup>
import {ref} from "vue";
import XButton from "@/components/common/XButton.vue";
import XTextarea from "@/components/common/XTextarea.vue";
import {download} from "@/hooks/useHttp";
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

let domains = ref("");
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
    download("/api/beian/export/intercept", data, `KB-results-${Date.now()}.xlsx`, ()=>{
        isDownloadFile.value = false;
    });
}

</script>

<style scoped>

</style>