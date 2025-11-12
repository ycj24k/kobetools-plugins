<template>
    <div class="domain-layout">
        <div class="domain-layout__textarea">
            <XTextarea v-model="domains" :placeholder="localeGet('placeholder2')" />
        </div>
        <div class="domain-layout__actions">
            <div class="domain-layout__primary">
                <XButton
                    :loading="xTable?.table?.isLoadTable"
                    @xClick="queryTableData"
                    color="purple_blue_pink"
                    :text="localeGet('button1')"
                />
            </div>
            <div class="domain-layout__extra">
                <XButton
                    :loading="isDownloadFile"
                    @xClick="exportRecordKeepingDomains"
                    color="blue"
                    :text="localeGet('button2')"
                />
                <XButton color="pink" :text="localeGet('button4')" />
            </div>
        </div>
        <div class="domain-layout__table">
            <XTable ref="xTable" :columns="resolvedColumns" :locales="localeData" />
        </div>
    </div>
</template>

<script setup>
import { ref, watch, computed } from "vue";
import XButton from "@/components/common/XButton.vue";
import XTextarea from "@/components/common/XTextarea.vue";
import XTable from "@/components/common/XTable.vue";
import { showErrorNotification } from "@/hooks/useNotification";
import { handleExport } from '@/utils';
const props = defineProps({
    locales: {
        type: Object,
        default: {}
    }
});

const localeData = ref(props.locales);
watch(() => props.locales, (newVal) => {
    localeData.value = newVal || {};
}, { immediate: true });

const localeGet = (key) => localeData.value?.[key] ?? key;

const columns = ref([
        {
            title: 'domainColumns.label1',
            dataIndex: 'serialNumber',
            sortable: {
                sortDirections: ['ascend', 'descend']
            },
            width: 100
        },
        {
            title: 'domainColumns.label2',
            dataIndex: 'domain',
            sortable: {
                sortDirections: ['ascend', 'descend']
            },
            width: 150
        },
        {
            title: 'domainColumns.label3',
            dataIndex: 'company',
            width: 300
        },
        {
            title: 'domainColumns.label4',
            dataIndex: 'type',
            sortable: {
                sortDirections: ['ascend', 'descend']
            },
            width: 100
        },
        {
            title: 'domainColumns.label5',
            dataIndex: 'icp_main',
            width: 150
        },
        {
            title: 'domainColumns.label6',
            dataIndex: 'icp',
            sortable: {
                sortDirections: ['ascend', 'descend']
            },
            width: 150
        },
        {
            title: 'domainColumns.label7',
            dataIndex: 'main_id',
            width: 150
        },
        {
            title: 'domainColumns.label8',
            dataIndex: 'icp_time',
            sortable: {
                sortDirections: ['ascend', 'descend']
            },
            width: 150
        },
    ]
);

const resolvedColumns = computed(() =>
    columns.value.map(col => ({
        ...col,
        title: localeGet(col.title)
    }))
);

let domains = ref("");
let xTable = ref(null);
let isDownloadFile = ref(false);

function queryTableData() {
    if (domains.value.trim().length === 0) {
        showErrorNotification(localeGet('message2'));
        return;
    }
    let data = domains.value.split("\n").filter(domain => domain.trim().length > 0).map(domain => domain.trim());
    xTable.value.queryTableData("/api/beian/query/corps", data);
}

function exportRecordKeepingDomains() {
    if (xTable.value.table.tableCurrData.length === 0) {
        showErrorNotification(localeGet('message3'));
        return;
    }
    handleExport(xTable.value.table.tableCurrData, xTable.value.selectedKeys, columns.value, '', 'csv')
}

</script>

<style lang="less" scoped>
@import '@/assets/style/domain.less';
</style>