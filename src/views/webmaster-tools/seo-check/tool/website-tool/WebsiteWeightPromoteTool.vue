<template>
    <div style="display: flex; flex-direction: column; height: 100%;">
        <div style="height: 12px;"></div>
        <div style="display: flex; gap: 20px;">
            <div style="font-weight: bold">{{ localeGet('label1') }}</div>
            <a-radio-group>
                <a-radio style="margin-left: 30px" v-for="sEngines in searchEngines" :key="sEngines.code" :disabled="sEngines.disabled" :value="sEngines.code">{{ sEngines.label }}</a-radio>
            </a-radio-group>
        </div>
        <div style="height: 25px;"></div>
        <div style="display: flex; gap: 20px;">
            <div style="font-weight: bold">{{ localeGet('label2') }}</div>
            <a-radio-group>
                <a-radio style="margin-left: 30px">{{ localeGet('weightOperationOptions.extract') }}</a-radio>
                <a-radio style="margin-left: 30px">{{ localeGet('weightOperationOptions.search') }}</a-radio>
            </a-radio-group>
        </div>
        <div style="height: 25px;"></div>
        <div style="flex: 1;">
            <XTextarea v-model="domains" :placeholder="localeGet('placeholder1')"/>
        </div>
        <div style="height: 100px; display: flex; align-items: center;">
            <div style="width: 500px;">
                <XButton :loading="xTable?.table?.isLoadTable" @xClick="queryTableData" color="purple_blue_pink" :text="localeGet('button1')"/>
            </div>
            <div style="flex: 1; display: flex; gap: 12px; justify-content: flex-end">
                <XButton :loading="isDownloadFile" @xClick="exportToLocation" color="blue" :text="localeGet('button2')"/>
                <XButton color="pink" :text="localeGet('button3')"/>
            </div>
        </div>

    </div>
</template>

<script setup>
import {ref, watch} from "vue";
import XButton from "@/components/common/XButton.vue";
import XTextarea from "@/components/common/XTextarea.vue";
import {download} from "@/hooks/useHttp";
import {showErrorNotification} from "@/hooks/useNotification";

import { useI18n } from '../../../keyword-tools/keyword/utils/i18n';
import localZhCN from '../zh-CN.js';

const props = defineProps({
    locales: { type: Object, default: {} }
});

const { localeGet, updateLocales, translateOptions } = useI18n(localZhCN);

watch(() => props.locales, (newVal) => {
    if (newVal) updateLocales(newVal);
    searchEngines.value = translateOptions([
        {code: "baidu", label: "searchEngines.baidu", disabled: false},
        {code: "google", label: "searchEngines.google", disabled: false},
        {code: "bing", label: "searchEngines.bing", disabled: false},
        {code: "so", label: "searchEngines.so", disabled: false},
        {code: "sogou", label: "searchEngines.sogou", disabled: false},
        {code: "sm", label: "searchEngines.sm", disabled: false},
        {code: "toutiao", label: "searchEngines.toutiao", disabled: false},
        {code: "yahu", label: "searchEngines.yahu", disabled: false},
        {code: "yandex", label: "searchEngines.yandex", disabled: false}
    ]);
}, { immediate: true });

let searchEngines = ref([]);
let domains = ref("");
let isDownloadFile = ref(false);
let xTable = ref(null);

function queryTableData() {
    if (domains.value.trim().length === 0){
        showErrorNotification(localeGet('message1'));
        return;
    }
    let data = domains.value.split("\n").filter(domain => domain.trim().length>0).map(domain => domain.trim());
    xTable.value.queryTableData("/api/beian/query/intercept", data);
}

function exportToLocation(){
    if (domains.value.trim().length === 0){
        showErrorNotification(localeGet('message1'));
        return;
    }
    isDownloadFile.value = true;
    let data = domains.value.split("\n").filter(domain => domain.trim().length>0).map(domain => domain.trim());
    download("/api/beian/export/intercept", data, `KB-results-${Date.now()}.xlsx`, ()=>{
        isDownloadFile.value = false;
    });
}

</script>

<style scoped>

</style>