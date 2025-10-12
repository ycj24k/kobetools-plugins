<template>
    <div style="display: flex; flex-direction: column; height: 100%;">
        <div style="height: 12px;"></div>
        <div style="display: flex; gap: 8px; align-items: center">
            <div style="font-weight: bold">{{ localeGet('label1') }}</div>
            <a-input style="width: 320px; margin-right: 20px" :placeholder="localeGet('placeholder1')" allow-clear />
            <div style="font-weight: bold">{{ localeGet('label2') }}</div>
            <a-radio-group>
                <a-radio style="margin-left: 20px" v-for="sEngines in searchEngines" :key="sEngines.code" :disabled="sEngines.disabled" :value="sEngines.code">{{ sEngines.label }}</a-radio>
            </a-radio-group>
        </div>
        <div style="height: 25px;"></div>
        <div style="flex: 1;">
            <XTextarea v-model="domains" :placeholder="localeGet('placeholder2')"/>
        </div>
        <div style="height: 100px; display: flex; align-items: center;">
            <div style="width: 500px;">
                <XButton :loading="xTable?.table?.isLoadTable" @xClick="queryTableData" color="purple_blue_pink"
                         :text="localeGet('button1')"/>
            </div>
            <div style="flex: 1; display: flex; gap: 12px; justify-content: flex-end">
                <XButton :loading="isDownloadFile" @xClick="exportToLocation" color="blue" :text="localeGet('button2')"/>
                <XButton color="pink" :text="localeGet('button3')"/>
            </div>
        </div>
        <div style="height: 400px;">
            <XTable ref="xTable" :columns="columns" />
        </div>
    </div>
</template>

<script setup>
import {ref, watch} from "vue";
import XButton from "@/components/common/XButton.vue";
import XTextarea from "@/components/common/XTextarea.vue";
import {download} from "@/hooks/useHttp";
import {showErrorNotification} from "@/hooks/useNotification";
import XTable from "@/components/common/XTable.vue";

import { useI18n } from '../../../keyword-tools/keyword/utils/i18n';
import localZhCN from '../zh-CN.js';

// 多语言
const props = defineProps({
    locales: {
        type: Object,
        default: {}
    }
});

const { localeGet, updateLocales, translateOptions } = useI18n(localZhCN);

// 监听 props 的变化
watch(() => props.locales, (newVal) => {
    if (newVal) updateLocales(newVal);
    columns.value = [
        {
            title: localeGet('columns.label1'),
            dataIndex: 'serialNumber',
            width: 100
        },
        {
            title: localeGet('columns.label2'),
            dataIndex: 'domain',
            minWidth: 200
        },
        {
            title: localeGet('columns.label3'),
            dataIndex: 'contactPerson',
            width: 300
        },
        {
            title: localeGet('columns.label4'),
            dataIndex: 'registrar',
            minWidth: 150
        },
        {
            title: localeGet('columns.label5'),
            dataIndex: 'email',
            minWidth: 230
        },
        {
            title: localeGet('columns.label6'),
            dataIndex: 'creationDate',
            minWidth: 200
        },
        {
            title: localeGet('columns.label7'),
            dataIndex: 'age',
            minWidth: 150
        }
    ];
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

let columns = ref([]);
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