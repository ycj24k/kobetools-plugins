<template>
    <div style="display: flex; flex-direction: column; height: 100%;">
        <div class="flex_box search_box">
            <div class="search_area1">
              <XTextarea v-model="allKeywords" placeholder="请输入关键词，一行一个"/>
            </div>
            <div class="search_line1"></div>
            <div class="search_area2">
              <XTextarea v-model="singleMatchWords" placeholder="请输入单个关键词，一行一个"/>
            </div>
            <div class="search_line2"></div>
            <div class="search_area2">
              <XTextarea v-model="combinedMatchWords" placeholder="请输入需要同时包含的文字或单词，一行一组，关键词之间用英文逗号隔开"/>
            </div>
        </div>
        <div style="height: 100px; display: flex; align-items: center;">
            <div style="width: 500px;">
                <XButton :loading="xCustomTable?.table?.isLoadTable" @xClick="queryTableData" color="purple_blue_pink" text="立即分组"/>
            </div>
            <div style="flex: 1; display: flex; gap: 12px; justify-content: flex-end">
                <XButton :loading="isDownloadFile" @xClick="exportRecordKeepingDomains" color="blue"
                    text="导出分组结果" />
            </div>
        </div>
        <div style="height: 400px;">
            <x-custom-table ref="xCustomTable" />
        </div>
    </div>
</template>

<script setup>
import {ref} from "vue";
import XButton from "@/components/common/XButton.vue";
import XTextarea from "@/components/common/XTextarea.vue";
import XCustomTable from "@/components/common/XCustomTable.vue";
import {showErrorNotification} from "@/hooks/useNotification";
import { handleExport } from '@/utils';

// let allKeywords = ref("谷歌SEO公司\n谷歌SEO公司哪家好\n谷歌推广公司\n谷歌优化\n谷歌优化公司");
// let singleMatchWords = ref("seo\n优化");
// let combinedMatchWords = ref("谷歌,seo\n谷歌,哪家好");
let allKeywords = ref("");
let singleMatchWords = ref("");
let combinedMatchWords = ref("");
let xCustomTable = ref(null);
let isDownloadFile = ref(false);

function queryTableData() {
    let data = {
        allKeywords: [],
        singleMatchWords: [],
        combinedMatchWords: [],
    }
    data.allKeywords = allKeywords.value.split("\n").filter(domain => domain.trim().length>0).map(domain => domain.trim());
    data.singleMatchWords = singleMatchWords.value.split("\n").filter(domain => domain.trim().length>0).map(domain => domain.trim());
    data.combinedMatchWords = combinedMatchWords.value.split("\n").filter(domain => domain.trim().length>0).map(domain => domain.trim());
    if (data.allKeywords.length === 0) {
        showErrorNotification('请输入关键词，一行一个');
        return
    }
    if (data.singleMatchWords.length === 0) {
        showErrorNotification('请输入单个关键词，一行一个');
        return
    }
    if (data.combinedMatchWords.length === 0) {
        showErrorNotification('请输入需要同时包含的文字或单词，一行一组');
        return
    }
    xCustomTable.value.queryTableData("/api/front/keyword/filter/group", data);
}

function exportRecordKeepingDomains() {
    if (xCustomTable.value.table.tableCurrData.length === 0) {
        showErrorNotification('未获取到查询结果');
        return;
    }
    handleExport(xCustomTable.value.table.tableCurrData, xCustomTable.value.selectedKeys, xCustomTable.value.columns, '', 'csv')
}

</script>

<style lang="less" scoped>
    .search_box {
        height: 500px;
        align-items: stretch;
        .search_area1 {
            width: calc(50% - 40px);
        }
        .search_area2 {
            width: calc(25% - 40px);
        }
        .search_line1 {
            width: 1px;
            background-color: #eee;
            margin: 0 40px;
        }
        .search_line2 {
            width: 1px;
            background-color: #eee;
            margin: 0 20px;
        }
    }
</style>