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
                        <XButton size="small" shape="square" :text="localeGet('button4')" @xClick="outerLinkWebsiteQueryDetails.show(record)"/>
                        <XButton color="yellow" size="small" shape="square" :text="localeGet('button5')" @xClick="exportDetail(record)"/>
                    </a-space>
                </template>
            </XTable>
        </div>
    </div>

    <OuterLinkWebsiteQueryDetails ref="outerLinkWebsiteQueryDetails" />
</template>

<script setup>
import {ref} from "vue";
import XButton from "@/components/common/XButton.vue";
import XTextarea from "@/components/common/XTextarea.vue";
import {download} from "@/hooks/useHttp";
import XTable from "@/components/common/XTable.vue";
import OuterLinkWebsiteQueryDetails from "./OuterLinkWebsiteQueryDetails.vue";
import {showErrorNotification} from "@/hooks/useNotification";

import { useI18n } from '../../../keyword-tools/keyword/utils/i18n';
import localZhCN from './zh-CN.js';

const props = defineProps({
    locales: { type: Object, default: {} }
});

const { localeGet, updateLocales, translateOptions } = useI18n(localZhCN);

let columns = ref([]);

watch(() => props.locales, (newVal) => {
    if (newVal) updateLocales(newVal);
    columns.value = [
        { title: localeGet('columns.label1'), dataIndex: 'serialNumber', width: 100 },
        { title: localeGet('columns.label2'), dataIndex: 'domain', width: 150 },
        { title: localeGet('columns.label3'), dataIndex: 'backlink_count', width: 150 },
        { title: 'Notfflow', dataIndex: 'nofollow', width: 150 },
        { title: localeGet('columns.label4'), dataIndex: 'has_backlink', width: 150 },
        { title: localeGet('columns.label5'), dataIndex: 'maxCount', width: 150 },
        { title: localeGet('columns.label6'), dataIndex: 'maxBr', width: 150 },
        { title: localeGet('columns.label7'), dataIndex: 'date', width: 150 },
        { title: localeGet('columns.label8'), slotName: 'option', width: 180 },
    ];
}, { immediate: true });

let domains = ref("");
let xTable = ref(null);
let outerLinkWebsiteQueryDetails = ref(null);
let isDownloadFile = ref(false);

function queryTableData() {
    if (domains.value.trim().length === 0){
        showErrorNotification(localeGet('message1'));
        return;
    }
    let data = domains.value.split("\n").filter(domain => domain.trim().length>0).map(domain => domain.trim());
    xTable.value.queryTableData("/api/sites/query/backlinks", data);
}

function exportTableData(){
    if (domains.value.trim().length === 0){
        showErrorNotification(localeGet('message1'));
        return;
    }
    isDownloadFile.value = true;
    let data = domains.value.split("\n").filter(domain => domain.trim().length>0).map(domain => domain.trim());
    download("/api/sites/export/backlinks", data, `KB-results-${Date.now()}.xlsx`, () => {
        isDownloadFile.value = false;
    });
}
function exportDetail(record) {
    let data = record.items;
    download("/api/sites/export/backlinks/detail", data, `KB-results-${Date.now()}.xlsx`, () => {
        
    });
}

</script>

<style scoped>

</style>