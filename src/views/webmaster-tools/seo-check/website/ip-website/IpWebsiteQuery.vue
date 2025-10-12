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
                <XButton :loading="isDownloadFile" @xClick="exportTableData" color="blue" :text="localeGet('button2')"/>
                <XButton color="pink" :text="localeGet('button3')"/>
            </div>
        </div>
        <div style="height: 400px;">
            <XTable ref="xTable" :columns="columns">
                <template #option="{ record }">
                    <a-space :size="15">
                        <XButton size="small" shape="square" :text="localeGet('button4')" @xClick="showDetail(record)"/>
                        <XButton color="yellow" size="small" shape="square" :text="localeGet('button5')" @xClick="exportDetail(record)"/>
                    </a-space>
                </template>
            </XTable>
        </div>
    </div>

    <IpWebsiteQueryDetails ref="ipWebsiteQueryDetails" />
</template>

<script setup>
import {ref} from "vue";
import XButton from "@/components/common/XButton.vue";
import XTextarea from "@/components/common/XTextarea.vue";
import {download} from "@/hooks/useHttp";
import XTable from "@/components/common/XTable.vue";
import IpWebsiteQueryDetails from "./IpWebsiteQueryDetails.vue";
import {showErrorNotification} from "@/hooks/useNotification";

import { useI18n } from '../../../keyword-tools/keyword/utils/i18n';
import localZhCN from '../zh-CN.js';

const props = defineProps({
    locales: { type: Object, default: {} }
});

const { localeGet, updateLocales, translateOptions } = useI18n(localZhCN);

let columns = ref([]);

watch(() => props.locales, (newVal) => {
    if (newVal) updateLocales(newVal);
    columns.value = [
        { title: localeGet('columns.label1'), dataIndex: 'serialNumber', width: 80 },
        { title: localeGet('columns.label2'), dataIndex: 'domain', width: 150 },
        { title: localeGet('columns.label3'), dataIndex: 'ip', width: 150 },
        { title: localeGet('columns.label4'), dataIndex: 'address', width: 200 },
        { title: localeGet('columns.label5'), dataIndex: 'siteNum', width: 100 },
        { title: localeGet('columns.label6'), dataIndex: 'date', width: 150 },
        { title: localeGet('columns.label7'), slotName: 'option', width: 180 },
    ];
}, { immediate: true });

let domains = ref("");
let xTable = ref(null);
let ipWebsiteQueryDetails = ref(null);
let isDownloadFile = ref(false);

function queryTableData() {
    if (domains.value.trim().length === 0){
        showErrorNotification(localeGet('message1'));
        return;
    }
    let data = domains.value.split("\n").filter(domain => domain.trim().length>0).map(domain => domain.trim());
    xTable.value.queryTableData("/api/sites/query/dnsinfo", data);

    /*for (let i = 0; i < 3; i++) {
        xTable.value.table.tableAllData.push({serialNumber: i});
    }
    xTable.value.table.pageSize = xTable.value.table.tableAllData.length;
    xTable.value.table.pageIndex = 1;*/
}

function exportTableData(){
    if (domains.value.trim().length === 0){
        showErrorNotification(localeGet('message2'));
        return;
    }
    isDownloadFile.value = true;
    let data = domains.value.split("\n").filter(domain => domain.trim().length>0).map(domain => domain.trim());
    download("/api/sites/export/dnsinfo", data, `KB-results-${Date.now()}.xlsx`, () => {
        isDownloadFile.value = false;
    });
}

function showDetail(record) {
    ipWebsiteQueryDetails.value.show(record)
}
function exportDetail(record) {
    let data = {
        domain: record.domain
    };
    download("/api/sites/export/dnsinfo/detail", data, `KB-results-${Date.now()}.xlsx`, () => {
        
    });
}

</script>

<style scoped>

</style>