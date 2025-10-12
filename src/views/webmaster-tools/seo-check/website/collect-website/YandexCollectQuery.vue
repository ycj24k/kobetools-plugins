<template>
    <div style="display: flex; flex-direction: column; height: 100%;">
        <div style="flex: 1;">
            <XTextarea v-model="domains" :placeholder="localeGet('placeholder1')"/>
        </div>
        <div style="height: 100px; display: flex; align-items: center;">
            <div style="width: 500px;">
                <XButton :loading="xTable?.table?.isLoadTable" @xClick="queryTableData" color="purple_blue_pink" :text="localeGet('button1')"/>
                <span v-if="isAutoQuery" style="margin-left: 12px;">{{ countdownQuerySecond }}{{ localeGet('countdown.text') }}</span>
                <span v-if="isAutoQuery" style="margin-left: 12px; cursor: pointer; color: #4c6ef0" @click="isAutoQuery=false">{{ localeGet('countdown.cancel') }}</span>
            </div>
            <div style="flex: 1; display: flex; gap: 12px; justify-content: flex-end">
                <XButton :loading="isDownloadFile" @xClick="exportRecordKeepingDomains" color="blue"
                    :text="localeGet('button2')" />
                <XButton color="pink" :text="localeGet('button3')"/>
            </div>
        </div>
        <div style="height: 400px;">
            <XTable ref="xTable" :columns="columns"></XTable>
        </div>
    </div>
</template>

<script setup>
import {ref, watch} from "vue";
import XButton from "@/components/common/XButton.vue";
import XTextarea from "@/components/common/XTextarea.vue";
import {post, download} from "@/hooks/useHttp";
import XTable from "@/components/common/XTable.vue";
import {showErrorNotification} from "@/hooks/useNotification";
import { handleExport } from '@/utils';

import { useI18n } from '../../../keyword-tools/keyword/utils/i18n';
import localZhCN from '../zh-CN.js';

const props = defineProps({
    locales: { type: Object, default: {} }
});

const { localeGet, updateLocales } = useI18n(localZhCN);

let columns = ref([]);

watch(() => props.locales, (newVal) => {
    if (newVal) updateLocales(newVal);
    columns.value = [
        { title: localeGet('googleColumns.label1'), dataIndex: 'serialNumber', width: 100 },
        { title: localeGet('googleColumns.label2'), dataIndex: 'domain', minWidth: 200 },
        { title: localeGet('googleColumns.label3'), dataIndex: 'baidusl', minWidth: 100 },
        { title: localeGet('googleColumns.label4'), dataIndex: 'baidu1d', minWidth: 100 },
        { title: localeGet('googleColumns.label5'), dataIndex: 'baidu7d', minWidth: 100 },
        { title: localeGet('googleColumns.label6'), dataIndex: 'baidu30d', minWidth: 100 },
        { title: localeGet('googleColumns.label7'), dataIndex: 'creationDate', minWidth: 200 },
        { title: localeGet('googleColumns.label8'), dataIndex: 'age', minWidth: 150 },
    ];
}, { immediate: true });

let domains = ref("");
let xTable = ref({});
let isDownloadFile = ref(false);
let isAutoQuery = ref(false); // 是否开启倒计时查询
let countdownQuerySecond = ref(0); // 倒计时查询

function queryTableData() {
    if (domains.value.trim().length === 0){
        showErrorNotification(localeGet('message2'));
        return;
    }
    let data = domains.value.split("\n").filter(domain => domain.trim().length>0).map(domain => domain.trim());
    post("/api/sites/query/baidutask/create", data, (result)=>{
        if (result.data.success.length === 0){
            showErrorNotification(localeGet('message4'));
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
        showErrorNotification(localeGet('message3'));
        return;
    }
    handleExport(xTable.value.table.tableCurrData, xTable.value.selectedKeys, columns.value, '', 'csv')
}


</script>

<style scoped>

</style>