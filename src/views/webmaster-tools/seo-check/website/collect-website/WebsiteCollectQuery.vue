<template>
    <div style="display: flex; flex-direction: column; height: 100%;">
        <div style="height: 12px;"></div>
        <div style="display: flex; gap: 20px;">
            <div style="font-weight: bold">{{ localeGet('label1') }}</div>
            <div style="font-weight: bold; color: #6886f1; cursor: pointer" @click="allSelect">{{ localeGet('button4') }}</div>
            <div style="font-weight: bold; color: #6886f1; cursor: pointer" @click="revoltSelect">{{ localeGet('button5') }}</div>
            <div style="font-weight: bold; color: #6886f1; cursor: pointer" @click="queryParam.range=[]">{{ localeGet('button6') }}</div>
            <a-checkbox-group v-model="queryParam.range">
                <a-checkbox style="margin-left: 30px" v-for="sEngines in searchEngines" :key="sEngines.code" :disabled="sEngines.disabled" :value="sEngines.code">{{ sEngines.label }}</a-checkbox>
            </a-checkbox-group>
        </div>
        <div style="height: 25px;"></div>
        <div style="flex: 1;">
            <XTextarea v-model="queryParam.domains"
                       :placeholder="localeGet('placeholder1')"/>
        </div>
        <div style="height: 100px; display: flex; align-items: center;">
            <div style="width: 500px;">
                <XButton :loading="xTable?.table?.isLoadTable" @xClick="queryTableData" color="purple_blue_pink"
                         :text="localeGet('button1')"/>
            </div>
            <div style="flex: 1; display: flex; gap: 12px; justify-content: flex-end">
                <XButton :loading="isDownloadFile" @xClick="exportRecordKeepingDomains" color="blue"
                    :text="localeGet('button2')" />
                <XButton color="pink" :text="localeGet('button3')"/>
            </div>
        </div>
        <div style="height: 400px;">
            <XTable ref="xTable" :columns="columns" />
        </div>
    </div>
</template>

<script setup>
import {reactive, ref, toRaw, computed, watch} from "vue";
import XButton from "@/components/common/XButton.vue";
import XTextarea from "@/components/common/XTextarea.vue";
import XTable from "@/components/common/XTable.vue";
import {showErrorNotification} from "@/hooks/useNotification";
import { handleExport } from '@/utils';

import { useI18n } from '../../../keyword-tools/keyword/utils/i18n';
import localZhCN from '../zh-CN.js';

const props = defineProps({
    locales: { type: Object, default: {} }
});

const { localeGet, updateLocales, translateOptions } = useI18n(localZhCN);

let searchEngines = ref([]);

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

let queryParam = reactive({
    domains: "",
    range: []
});

let columns = computed(()=>{
    return [
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
        ... searchEngines.value.filter(sEngines => queryParam.range.includes(sEngines.code)).map((sEngines) => {
            return {
                title: sEngines.label,
                dataIndex: sEngines.code,
                minWidth: 100
            }
        })
    ]
});
let xTable = ref({});
let isDownloadFile = ref(false);

// 全选
function allSelect() {
    queryParam.range = searchEngines.value.map(sEngines => sEngines.code);
}

// 反选
function revoltSelect() {
    queryParam.range = searchEngines.value
        .filter(sEngines => !queryParam.range.includes(sEngines.code))
        .map(sEngines => sEngines.code);
}

function queryTableData() {
    if (queryParam.range.length === 0) {
        showErrorNotification(localeGet('message1'));
        return;
    }
    if (queryParam.domains.trim().length === 0) {
        showErrorNotification(localeGet('message2'));
        return;
    }
    let data = {
        domains: queryParam.domains.split("\n").filter(domain => domain.trim().length > 0).map(domain => domain.trim()),
        range: toRaw(queryParam.range)
    };
    xTable.value.queryTableData("/api/sites/query/indexhis", data);
}

function exportRecordKeepingDomains() {
    if (xTable.value.table.tableCurrData.length === 0) {
        showErrorNotification(localeGet('message3'));
        return;
    }
    handleExport(xTable.value.table.tableCurrData, xTable.value.selectedKeys, columns.value, '', 'csv')
}

</script>

<style scoped>

</style>