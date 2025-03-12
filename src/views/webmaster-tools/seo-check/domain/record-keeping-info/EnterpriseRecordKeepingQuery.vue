<template>
    <div style="display: flex; flex-direction: column; height: 100%;">
        <div style="flex: 1;">
            <XTextarea v-model="domains" :placeholder="localeGet('placeholder2')" />
        </div>
        <div style="height: 100px; display: flex; align-items: center;">
            <div style="width: 500px;">
                <XButton :loading="xTable?.table?.isLoadTable" @xClick="queryTableData" color="purple_blue_pink"
                    :text="localeGet('button1')" />
            </div>
            <div style="flex: 1; display: flex; gap: 12px; justify-content: flex-end">
                <XButton :loading="isDownloadFile" @xClick="exportRecordKeepingDomains" color="blue"
                    :text="localeGet('button2')" />
                <XButton color="pink" :text="localeGet('button4')" />
            </div>
        </div>
        <div style="height: 400px;">
            <XTable ref="xTable" :columns="columns" :locales="localeData" />
        </div>
    </div>
</template>

<script setup>
import { ref, watch } from "vue";
import XButton from "@/components/common/XButton.vue";
import XTextarea from "@/components/common/XTextarea.vue";
import { download } from "@/hooks/useHttp";
import XTable from "@/components/common/XTable.vue";
import { showErrorNotification } from "@/hooks/useNotification";

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
            dataIndex: 'company',
            sortable: {
                sortDirections: ['ascend', 'descend']
            },
            minWidth: 200
        },
        {
            title: localeGet('domainColumns.label3'),
            dataIndex: 'domain',
            width: 300
        },
        {
            title: localeGet('domainColumns.label4'),
            dataIndex: 'type',
            sortable: {
                sortDirections: ['ascend', 'descend']
            },
            minWidth: 150
        },
        {
            title: localeGet('domainColumns.label5'),
            dataIndex: 'icp_main',
            minWidth: 230
        },
        {
            title: localeGet('domainColumns.label6'),
            dataIndex: 'icp',
            sortable: {
                sortDirections: ['ascend', 'descend']
            },
            minWidth: 200
        },
        {
            title: localeGet('domainColumns.label7'),
            dataIndex: 'main_id',
            minWidth: 200
        },
        {
            title: localeGet('domainColumns.label8'),
            dataIndex: 'icp_time',
            sortable: {
                sortDirections: ['ascend', 'descend']
            },
            minWidth: 150
        },
    ]
});
const localeGet = (key) => {
    return localeData.value[key]
}

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
    if (domains.value.trim().length === 0) {
        showErrorNotification(localeGet('message2'));
        return;
    }
    isDownloadFile.value = true;
    let data = domains.value.split("\n").filter(domain => domain.trim().length > 0).map(domain => domain.trim());
    download("/api/beian/export/corps", data, localeGet('title1') + ".xlsx", () => {
        isDownloadFile.value = false;
    });
}

</script>

<style scoped></style>