<template>
    <div style="display: flex; flex-direction: column; height: 100%;">
        <div style="flex: 1;">
            <XTextarea v-model="domains" :placeholder="localeGet('placeholder1')" />
        </div>
        <div style="height: 100px; display: flex; align-items: center;">
            <div style="width: 500px;">
                <XButton :loading="xTable?.table?.isLoadTable" @xClick="queryTableData" color="purple_blue_pink"
                    :text="localeGet('button1')" />
            </div>
            <div style="flex: 1; display: flex; gap: 12px; justify-content: flex-end">
                <XButton :loading="isDownloadFile" @xClick="exportRecordKeepingDomains" color="blue"
                    text="导出查询结果" />
                <XButton color="pink" :text="localeGet('button4')" />
            </div>
        </div>
        <div style="height: 400px;">
            <XTable ref="xTable" :columns="columns" :locales="localeData" />
        </div>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import XButton from "@/components/common/XButton.vue";
import XTextarea from "@/components/common/XTextarea.vue";
import { download } from "@/hooks/useHttp";
import XTable from "@/components/common/XTable.vue";
import { showErrorNotification } from "@/hooks/useNotification";
import { handleExport } from '@/utils';
// 多语言
const props = defineProps({
    locales: {
        type: Object,
        default: {}
    }
});
const localeData = ref(props.locales);
const columns = ref([]);
console.log(localeData.value)
// 监听 props 的变化
watch(() => props.locales, (newVal) => {
    console.log(newVal)
    localeData.value = newVal;
    columns.value = [
        {
            title: localeGet('domainColumns.label1'),
            dataIndex: 'serialNumber',
            sortable: {
                sortDirections: ['ascend', 'descend']
            },
            width: 100
        },
        {
            title: localeGet('domainColumns.label2'),
            dataIndex: 'domain',
            sortable: {
                sortDirections: ['ascend', 'descend']
            },
            width: 150
        },
        {
            title: localeGet('domainColumns.label3'),
            dataIndex: 'company',
            width: 300
        },
        {
            title: localeGet('domainColumns.label4'),
            dataIndex: 'type',
            sortable: {
                sortDirections: ['ascend', 'descend']
            },
            width: 100
        },
        /*{
            title: localeGet('domainColumns.label5'),
            dataIndex: 'icp_main',
            width: 230
        },*/
        {
            title: localeGet('domainColumns.label6'),
            dataIndex: 'icp',
            sortable: {
                sortDirections: ['ascend', 'descend']
            },
            width: 150
        },
        {
            title: '网站名称',
            dataIndex: 'website_name',
            width: 150
        },
        {
            title: localeGet('domainColumns.label8'),
            dataIndex: 'icp_time',
            sortable: {
                sortDirections: ['ascend', 'descend']
            },
            width: 150
        },
    ]
});
const localeGet = (key) => {
    return localeData.value[key]
}

// let domains = ref("0001mg.com \n zikaow.com \n qyhyn168.com \n duxufeng.com \n yiyebaofu.com.cn \n allshebei.com \n linkedin.com \n youtube.com \n jimdo.com \n vistaprint.com \n goodreads.com \n blogarama.com \n steinberg.net");
let domains = ref("");
let xTable = ref(null);
let isDownloadFile = ref(false);

function queryTableData() {
    if (domains.value.trim().length === 0) {
        showErrorNotification(localeGet('message1'));
        return;
    }
    let data = domains.value.split("\n").filter(domain => domain.trim().length > 0).map(domain => domain.trim());
    xTable.value.queryTableData("/api/beian/query/logs", data);
}

function exportRecordKeepingDomains() {
    if (xTable.value.table.tableCurrData.length === 0) {
        showErrorNotification('未获取到查询结果');
        return;
    }
    handleExport(xTable.value.table.tableCurrData, xTable.value.selectedKeys, columns.value, '', 'csv')
}

</script>

<style scoped></style>