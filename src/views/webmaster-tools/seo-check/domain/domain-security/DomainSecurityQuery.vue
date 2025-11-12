<template>
    <div class="domain-security">
        <div class="domain-security__filters">
            <div class="query_item">
                <div class="query_label"><span class="required-mark">*</span>{{ localeGet('title1') }}</div>
                <div class="query_value">
                    <a-checkbox-group v-model="querys" :options="translatedQueryOptions"></a-checkbox-group>
                </div>
            </div>
        </div>
        <div class="domain-security__textarea">
            <XTextarea v-model="domains" :placeholder="localeGet('placeholder1')" />
        </div>
        <div class="domain-security__actions">
            <div class="domain-security__primary">
                <XButton
                    :loading="xTable?.table?.isLoadTable"
                    @xClick="queryTableData"
                    color="purple_blue_pink"
                    :text="localeGet('button1')"
                />
            </div>
            <div class="domain-security__extra">
                <XButton
                    :loading="isDownloadFile"
                    @xClick="exportRecordKeepingDomains"
                    color="blue"
                    :text="localeGet('button2')"
                />
                <XButton color="pink" :text="localeGet('button5')" />
            </div>
        </div>
        <div class="domain-security__table">
            <XTable ref="xTable" :columns="resolvedColumns">
                <template #isBlocked="{ record }">
                    <div :class="['status-text', { 'status-text--danger': record.isBlocked === '是' }]">
                        {{ record.isBlocked }}
                    </div>
                </template>
                <template #qqRes="{ record }">
                    <div :class="['status-text', { 'status-text--danger': record.qqRes === localeGet('status.risk') }]">
                        {{ record.qqRes }}
                    </div>
                </template>
                <template #wxRes="{ record }">
                    <div :class="['status-text', { 'status-text--danger': record.wxRes === localeGet('status.risk') }]">
                        {{ record.wxRes }}
                    </div>
                </template>
                <template #baiduMessage="{ record }">
                    <div :class="['status-text', { 'status-text--danger': record.baiduMessage === localeGet('status.risk') }]">
                        {{ record.baiduMessage }}
                    </div>
                </template>
                <template #beianSecurity="{ record }">
                    <div :class="['status-text', { 'status-text--danger': record.beianSecurity === localeGet('status.blacklist') }]">
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
const localeData = ref(props.locales);
const { translateOptions } = useI18n(localZhCN);
watch(
    () => props.locales,
    (newVal) => {
        localeData.value = newVal || {};
    },
    { immediate: true }
);

const localeGet = (key) => localeData.value?.[key] ?? key;

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
    { title: 'securityColumns.label1', dataIndex: 'serialNumber', sortable: { sortDirections: ['ascend', 'descend'] }, width: 90 },
    { title: 'securityColumns.label2', dataIndex: 'domain', sortable: { sortDirections: ['ascend', 'descend'] }, width: 150 }
];

const columns = ref([]);

const rebuildColumns = () => {
    const base = [...getColumnsDefault()];
    queryOptions.forEach((option) => {
        if (querys.value.includes(option.value)) {
            base.push({
                title: option.label,
                dataIndex: option.column,
                slotName: option.column,
                sortable: { sortDirections: ['ascend', 'descend'] },
                width: 150
            });
        }
    });
    columns.value = base;
};

watch(querys, rebuildColumns, { immediate: true });
watch(localeData, rebuildColumns);

const resolvedColumns = computed(() =>
    columns.value.map((col) => ({
        ...col,
        title: localeGet(col.title)
    }))
);

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
@import '@/assets/style/domain.less';

.domain-security {
    display: flex;
    flex-direction: column;
    height: 100%;

    &__filters {
        padding: 10px 0 20px;

        .query_item {
            display: flex;
            gap: 12px;
            align-items: center;
        }

        .query_label {
            width: 90px;
            font-size: 14px;
            font-weight: bold;
        }

        .query_value {
            flex: 1;
            font-size: 14px;
        }
    }

    &__textarea {
        flex: 1;
        min-height: 200px;
    }

    &__actions {
        display: flex;
        align-items: center;
        gap: 12px;
        height: 100px;
        margin-top: 20px;
    }

    &__primary {
        width: 500px;
        flex-shrink: 0;
    }

    &__extra {
        flex: 1;
        display: flex;
        gap: 12px;
        justify-content: flex-end;
    }

    &__table {
        height: 400px;
    }
}
</style>
