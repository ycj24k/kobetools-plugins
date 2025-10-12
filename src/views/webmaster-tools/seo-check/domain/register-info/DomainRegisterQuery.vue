<template>
    <div style="display: flex; flex-direction: column; height: 100%;">
        <div style="flex: 1;">
            <XTextarea v-model="domains" :placeholder="localeGet('placeholder1')"/>
        </div>
        <div style="height: 100px; display: flex; align-items: center;">
            <div style="width: 500px;">
                <XButton :loading="xTable?.table?.isLoadTable" @xClick="queryTableData" color="purple_blue_pink" :text="localeGet('button1')"/>
            </div>
            <div style="flex: 1; display: flex; gap: 12px; justify-content: flex-end">
                <XButton :loading="isDownloadFile" @xClick="exportRecordKeepingDomains" color="blue"
                    :text="localeGet('button2')" />
                <XButton color="pink" :text="localeGet('button5')"/>
            </div>
        </div>
        <div style="height: 400px;">
            <XTable ref="xTable" :columns="columns">
                <template #age="{ record }">
                    <div>{{ record.age }}</div>
                </template>
            </XTable>
        </div>
    </div>
</template>

<script setup>
import {ref, watch} from "vue";
import XButton from "@/components/common/XButton.vue";
import XTextarea from "@/components/common/XTextarea.vue";
import XTable from "@/components/common/XTable.vue";
import {showErrorNotification} from "@/hooks/useNotification";
import { handleExport } from '@/utils';
import { useI18n } from '../../../keyword-tools/keyword/utils/i18n';
import localZhCN from './zh-CN.js';

// 多语言
const props = defineProps({
    locales: {
        type: Object,
        default: {},
    },
});
const { localeGet, updateLocales } = useI18n(localZhCN);
watch(() => props.locales, (v) => { if (v) updateLocales(v); }, { immediate: true });

let columns = [
    { title: 'registerColumns.label1', dataIndex: 'serialNumber', sortable: { sortDirections: ['ascend', 'descend'] }, width: 100 },
    { title: 'registerColumns.label2', dataIndex: 'domain', sortable: { sortDirections: ['ascend', 'descend'] }, width: 150 },
    { title: 'registerColumns.label3', dataIndex: 'contactPerson', width: 300 },
    { title: 'registerColumns.label4', dataIndex: 'registrar', sortable: { sortDirections: ['ascend', 'descend'] }, width: 150 },
    { title: 'registerColumns.label5', dataIndex: 'email', width: 150 },
    { title: 'registerColumns.label6', dataIndex: 'creationDate', sortable: { sortDirections: ['ascend', 'descend'] }, width: 150 },
    { title: 'registerColumns.label7', dataIndex: 'expirationDate', width: 150 },
    { title: 'registerColumns.label8', dataIndex: 'age', slotName: 'age', sortable: { sortDirections: ['ascend', 'descend'] }, width: 100 },
];

let domains = ref("");
let xTable = ref(null);
let isDownloadFile = ref(false);

function queryTableData() {
    if (domains.value.trim().length === 0){
        showErrorNotification(localeGet('message2'));
        return;
    }
    let data = domains.value.split("\n").filter(domain => domain.trim().length>0).map(domain => domain.trim());
    xTable.value.queryTableData("/api/beian/query/registers", data);
}

function exportRecordKeepingDomains() {
    if (xTable.value.table.tableCurrData.length === 0) {
        showErrorNotification(localeGet('message1'));
        return;
    }
    handleExport(xTable.value.table.tableCurrData, xTable.value.selectedKeys, columns, '', 'csv')
}

</script>

<style scoped>

</style>