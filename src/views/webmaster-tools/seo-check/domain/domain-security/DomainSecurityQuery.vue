<template>
    <div style="display: flex; flex-direction: column; height: 100%">
        <div class="query_box">
            <div class="flex_box query_item">
                <div class="query_label"><span style="color: red;">*</span>{{ localeGet('title1') }}</div>
                <div class="query_value">
                    <a-checkbox-group v-model="querys" :options="translatedQueryOptions"></a-checkbox-group>
                </div>
            </div>
        </div>
        <div style="flex: 1">
            <XTextarea v-model="domains" :placeholder="localeGet('placeholder1')" />
        </div>
        <div style="height: 100px; display: flex; align-items: center">
            <div style="width: 500px">
                <XButton :loading="xTable?.table?.isLoadTable" @xClick="queryTableData" color="purple_blue_pink"
                    :text="localeGet('button1')" />
            </div>
            <div style="flex: 1; display: flex; gap: 12px; justify-content: flex-end">
                <XButton :loading="isDownloadFile" @xClick="exportRecordKeepingDomains" color="blue" :text="localeGet('button2')" />
                <XButton color="pink" :text="localeGet('button5')" />
            </div>
        </div>
        <div style="height: 400px">
            <XTable ref="xTable" :columns="columns">
                <template #isBlocked="{ record }">
                    <div
                        :style="{ color: record.isBlocked === '是' ? 'red' : '', fontWeight: record.isBlocked === '是' ? 700 : 500 }">
                        {{ record.isBlocked }}
                    </div>
                </template>
                <template #qqRes="{ record }">
                    <div
                        :style="{ color: record.qqRes === localeGet('status.risk') ? 'red' : '', fontWeight: record.qqRes === localeGet('status.risk') ? 700 : 500 }">
                        {{ record.qqRes }}
                    </div>
                </template>
                <template #wxRes="{ record }">
                    <div
                        :style="{ color: record.wxRes === localeGet('status.risk') ? 'red' : '', fontWeight: record.wxRes === localeGet('status.risk') ? 700 : 500 }">
                        {{ record.wxRes }}
                    </div>
                </template>
                <template #baiduMessage="{ record }">
                    <div
                        :style="{ color: record.baiduMessage === localeGet('status.risk') ? 'red' : '', fontWeight: record.baiduMessage === localeGet('status.risk') ? 700 : 500 }">
                        {{ record.baiduMessage }}
                    </div>
                </template>
                <template #beianSecurity="{ record }">
                    <div
                        :style="{ color: record.beianSecurity === localeGet('status.blacklist') ? 'red' : '', fontWeight: record.beianSecurity === localeGet('status.blacklist') ? 700 : 500 }">
                        {{ record.beianSecurity }}
                    </div>
                </template>
            </XTable>
        </div>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import XButton from '@/components/common/XButton.vue';
import XTextarea from '@/components/common/XTextarea.vue';
import XTable from '@/components/common/XTable.vue';
import { showErrorNotification } from '@/hooks/useNotification';
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
const { localeGet, updateLocales, translateOptions } = useI18n(localZhCN);
watch(() => props.locales, (v) => { if (v) updateLocales(v); }, { immediate: true });

const querys = ref(['isBlocked', 'wxSecurity', 'qqSecurity', 'baiduBlock']);
const queryOptions = [
    { label: 'filter.label1', value: 'isBlocked', column: 'isBlocked' },
    { label: 'filter.label2', value: 'wxSecurity', column: 'wxRes' },
    { label: 'filter.label3', value: 'qqSecurity', column: 'qqRes' },
    { label: 'filter.label4', value: 'ydDnsPollution', column: 'ydDnsMessage' },
    { label: 'filter.label5', value: 'beianSecurity', column: 'baRes' },
    { label: 'filter.label6', value: 'baiduBlock', column: 'baiduMessage' },
    { label: 'filter.label7', value: 'googleBlock', column: 'googleMessage' },
    { label: 'filter.label8', value: 'qihu360Block', column: 'qh360Message' },
    { label: 'filter.label9', value: 'sougouBlock', column: 'sougouMessage' },
    { label: 'filter.label10', value: 'toutiaoBlock', column: 'toutiaoMessage' },
    { label: 'filter.label11', value: 'douyinBlock', column: 'douyinMessage' },
    { label: 'filter.label12', value: 'microsoftEdgeBlock', column: 'weiruanMessage' },
];
const translatedQueryOptions = translateOptions(queryOptions);

const getColumnsDefault = () => [
    { title: localeGet('securityColumns.label1'), dataIndex: 'serialNumber', sortable: { sortDirections: ['ascend', 'descend'] }, width: 90 },
    { title: localeGet('securityColumns.label2'), dataIndex: 'domain', sortable: { sortDirections: ['ascend', 'descend'] }, width: 150 }
];

const columns = ref([
    ...getColumnsDefault(),
    { title: localeGet('securityColumns.label3'), dataIndex: 'isBlocked', slotName: 'isBlocked', sortable: { sortDirections: ['ascend', 'descend'] }, width: 150 },
    { title: localeGet('securityColumns.label5'), dataIndex: 'wxRes', slotName: 'wxRes', sortable: { sortDirections: ['ascend', 'descend'] }, width: 150 },
    { title: localeGet('securityColumns.label4'), dataIndex: 'qqRes', slotName: 'qqRes', sortable: { sortDirections: ['ascend', 'descend'] }, width: 150 },
    { title: localeGet('securityColumns.label6'), dataIndex: 'baiduMessage', slotName: 'baiduMessage', sortable: { sortDirections: ['ascend', 'descend'] }, width: 150 },
]);

watch(querys, (newValue) => {
    let list = [...getColumnsDefault()]
    for  (let i = 0; i < queryOptions.length; i++) {
        const element = queryOptions[i];
        if (querys.value.includes(element.value)) {
            list.push({
                title: localeGet(element.label),
                dataIndex: element.column,
                slotName: element.column,
                sortable: {
                    sortDirections: ['ascend', 'descend'],
                },
                width: 150,
            });
        }
    }
    columns.value = [...list];
}, { immediate: true });

let domains = ref('');
let xTable = ref(null);
let isDownloadFile = ref(false);

function queryTableData() {
    if (querys.value.length === 0) {
        showErrorNotification(localeGet('message2'));
        return;
    }
    if (domains.value.trim().length === 0) {
        showErrorNotification(localeGet('message3'));
        return;
    }
    let data = domains.value
        .split('\n')
        .filter((domain) => domain.trim().length > 0)
        .map((domain) => domain.trim());
    xTable.value.queryTableData('/api/beian/query/intercept', {domains: data, checkFlag: querys.value});
}

function exportRecordKeepingDomains() {
    if (xTable.value.table.tableCurrData.length === 0) {
        showErrorNotification(localeGet('message1'));
        return;
    }
    handleExport(xTable.value.table.tableCurrData, xTable.value.selectedKeys, columns.value, '', 'csv');
}
</script>

<style lang="less" scoped>
.query_box {
    .query_item {
        padding: 10px 0 20px;

        .query_label {
            width: 80px;
            font-size: 14px;
            font-weight: bold;
        }

        .query_value {
            width: calc(100% - 100px);
            font-size: 14px;
        }
    }
}
</style>
