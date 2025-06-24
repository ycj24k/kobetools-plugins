<template>
    <div style="display: flex; flex-direction: column; height: 100%;">
        <div style="flex: 1;">
            <XTextarea v-model="domains" placeholder="请输入需要查询的网站域名，一行一个，单词最多提交10个，格式如：www.google.com"/>
        </div>
        <div style="height: 100px; display: flex; align-items: center;">
            <div style="width: 500px;">
                <XButton :loading="xTable?.table?.isLoadTable" @xClick="queryTableData" color="purple_blue_pink" text="立即查询"/>
                <span v-if="isAutoQuery" style="margin-left: 12px;">{{ countdownQuerySecond }}秒后自动查询</span>
                <span v-if="isAutoQuery" style="margin-left: 12px; cursor: pointer; color: #4c6ef0" @click="isAutoQuery=false">取消</span>
            </div>
            <div style="flex: 1; display: flex; gap: 12px; justify-content: flex-end">
                <XButton :loading="isDownloadFile" @xClick="exportRecordKeepingDomains" color="blue"
                    text="导出查询结果" />
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
import {post, download} from "@/hooks/useHttp";
import XTable from "@/components/common/XTable.vue";
import {showErrorNotification} from "@/hooks/useNotification";
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
let isAutoQuery = ref(false); // 是否开启倒计时查询
let countdownQuerySecond = ref(0); // 倒计时查询

function queryTableData() {
    if (domains.value.trim().length === 0){
        showErrorNotification('请输入需要查询的网站域名！');
        return;
    }
    let data = domains.value.split("\n").filter(domain => domain.trim().length>0).map(domain => domain.trim());
    post("/api/sites/query/baidutask/create", data, (result)=>{
        if (result.data.success.length === 0){
            showErrorNotification('未取到任务ID！');
            return;
        }
        let taskIds = result.data.success.map(task => task.taskid);
        // 开始自动查询
        isAutoQuery.value = true;
        countdownQuerySecond.value = 10;
        countdownAutoQuery(taskIds);
    })
}

// 倒计时自动查询
function countdownAutoQuery(taskIds){
    if (!isAutoQuery.value){
        return;
    }
    if (countdownQuerySecond.value > 0){
        countdownQuerySecond.value--;
        setTimeout(countdownAutoQuery, 1000, taskIds);
    }else{
        xTable.value.queryTableData("/api/sites/query/baidutask/result", taskIds, ()=>{
            countdownQuerySecond.value = 10;
            setTimeout(countdownAutoQuery, 1000, taskIds);
        });
    }
}

function exportRecordKeepingDomains() {
    if (xTable.value.table.tableCurrData.length === 0) {
        showErrorNotification('未获取到查询结果');
        return;
    }
    handleExport(xTable.value.table.tableCurrData, xTable.value.selectedKeys, columns.value, '', 'csv')
}


</script>

<style scoped>

</style>