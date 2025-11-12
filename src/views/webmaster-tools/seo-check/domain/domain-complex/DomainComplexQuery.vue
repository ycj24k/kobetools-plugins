<template>
    <div class="domain-query">
        <div class="domain-query__textarea">
            <XTextarea v-model="domains" :placeholder="localeGet('placeholder1')" />
        </div>
        <div class="domain-query__actions">
            <div class="domain-query__primary">
                <XButton
                    :loading="xTable?.table?.isLoadTable"
                    @xClick="queryTableData"
                    color="purple_blue_pink"
                    :text="localeGet('button1')"
                />
            </div>
            <div class="domain-query__extra">
                <XButton
                    :loading="isDownloadFile"
                    @xClick="exportRecordKeepingDomains"
                    color="blue"
                    :text="localeGet('button2')"
                />
                <XButton color="pink" :text="localeGet('button5')" />
            </div>
        </div>
        <div class="domain-query__table">
            <XTable ref="xTable" :columns="columns" />
        </div>
    </div>
</template>

<script setup>
import {ref, watch} from "vue";
import XButton from "@/components/common/XButton.vue";
import XTextarea from "@/components/common/XTextarea.vue";
import { showErrorNotification } from "@/hooks/useNotification";
import XTable from "@/components/common/XTable.vue";
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
    { title: 'complexColumns.label1', dataIndex: 'serialNumber', width: 80 },
    { title: 'complexColumns.label2', dataIndex: 'domain', sortable: { sortDirections: ['ascend', 'descend'] }, width: 150 },
    { title: 'complexColumns.label3', dataIndex: 'contactPerson', width: 300 },
    { title: 'complexColumns.label4', dataIndex: 'registrar', sortable: { sortDirections: ['ascend', 'descend'] }, width: 150 },
    { title: 'complexColumns.label5', dataIndex: 'email', width: 150 },
    { title: 'complexColumns.label6', dataIndex: 'creationDate', sortable: { sortDirections: ['ascend', 'descend'] }, width: 150 },
    { title: 'complexColumns.label7', dataIndex: 'expirationDate', width: 150 },
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
    xTable.value.queryTableData("/api/beian/query/intercept", data);
}

function exportRecordKeepingDomains() {
    if (xTable.value.table.tableCurrData.length === 0) {
        showErrorNotification(localeGet('message1'));
        return;
    }
    handleExport(xTable.value.table.tableCurrData, xTable.value.selectedKeys, columns, '', 'csv')
}

</script>

<style lang="less" scoped>
@import '@/assets/style/domain.less';
</style>