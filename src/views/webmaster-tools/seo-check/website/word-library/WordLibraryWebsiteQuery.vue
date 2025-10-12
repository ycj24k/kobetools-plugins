<template>
    <div style="display: flex; flex-direction: column; height: 100%;">
        <div style="height: 12px;"></div>
        <div style="display: flex; gap: 12px;">
            <div style="display: flex; gap: 12px; width: 300px;">
                <div style="font-weight: bold">站长平台</div>
                <a-radio-group v-model="queryParam.platform">
                    <a-radio value="az">爱站</a-radio>
                    <a-radio value="zz">站长工具</a-radio>
                </a-radio-group>
            </div>
            <div style="display: flex; gap: 12px; flex: 1">
                <div style="font-weight: bold">{{ localeGet('label1') }}</div>
                <a-radio-group v-model="queryParam.searchEngines">
                    <a-radio style="margin-left: 30px" v-for="sEngines in searchEngines" :key="sEngines.code" :value="sEngines.code">{{ sEngines.label }}</a-radio>
                </a-radio-group>
            </div>
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
                <XButton :loading="isDownloadFile" @xClick="exportToLocation" color="blue" :text="localeGet('button2')"/>
                <XButton color="yellow" :text="localeGet('button3')"/>
                <XButton color="pink" :text="localeGet('button4')"/>
            </div>
        </div>
        <div style="height: 400px;">
            <XTable ref="xTable" :columns="columns" :spanMethod="spanMethod">
                <template #weight="{ record }">
                    <XCapsuleTag :text="record.weight" />
                </template>
                <template #ip="{ record }">
                    <span style="font-weight: bold; color: #11a4f1">{{record.ip}}</span>
                </template>
                <template #sum="{ record }">
                    <span style="font-weight: bold; color: #6f1ef6">{{record.sum}}</span>
                </template>
                <template #option>
                    {{ localeGet('detail.text') }}
                </template>
            </XTable>
        </div>
    </div>
</template>

<script setup>
import {reactive, ref, watch} from "vue";
import XButton from "@/components/common/XButton.vue";
import XTextarea from "@/components/common/XTextarea.vue";
import {download} from "@/hooks/useHttp";
import XTable from "@/components/common/XTable.vue";
import XCapsuleTag from "@/components/common/XCapsuleTag.vue";
import {showErrorNotification} from "@/hooks/useNotification";

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

let columns = ref([]);

watch(() => props.locales, (newVal) => {
    if (newVal) updateLocales(newVal);
    columns.value = [
        { title: localeGet('columns.label1'), dataIndex: 'serialNumber', width: 100 },
        { title: localeGet('columns.label2'), dataIndex: 'domain', minWidth: 200 },
        { title: localeGet('columns.label3'), dataIndex: 'platform', width: 100 },
        { title: localeGet('columns.label4'), dataIndex: 'weight', slotName: 'weight', minWidth: 100 },
        { title: localeGet('columns.label5'), dataIndex: 'ip', slotName: 'ip', width: 200 },
        { title: localeGet('columns.label6'), dataIndex: 'sum', slotName: 'sum', minWidth: 100 },
        { title: localeGet('columns.label7'), dataIndex: 't0', minWidth: 100 },
        { title: localeGet('columns.label8'), dataIndex: 't1', minWidth: 100 },
        { title: localeGet('columns.label9'), dataIndex: 't2', minWidth: 100 },
        { title: localeGet('columns.label10'), dataIndex: 't3', minWidth: 100 },
        { title: localeGet('columns.label11'), dataIndex: 't4', minWidth: 100 },
        { title: localeGet('columns.label12'), slotName: 'option', minWidth: 100 },
    ];
}, { immediate: true });

let xTable = ref({});

let isDownloadFile = ref(false);

let queryParam = reactive({
    platform: "az",
    searchEngines: "baidu",
    domains: ""
});

function queryTableData() {

    if (queryParam.domains.trim().length === 0) {
        showErrorNotification(localeGet('message2'));
        return;
    }
    let data = {
        type: queryParam.searchEngines,
        domains: queryParam.domains.split("\n").filter(domain => domain.trim().length > 0).map(domain => domain.trim())
    };

    // 是转换下结果
    xTable.value.queryTableData("/api/sites/query/rank", data, (result) => {
        let datas = result.data;
        let allDatas = [];
        for (let i = 0; i < datas.length; i++) {
            let data = datas[i];
            if (data.hasOwnProperty("pc")){
                let pc = data.pc;
                pc.domain = data.domain;
                pc.platform = "pc";
                pc.serialNumber = (i+1);
                allDatas.push(pc);
            }
            if (data.hasOwnProperty("mobile")){
                let mobile = data.mobile;
                mobile.domain = data.domain;
                mobile.platform = "mobile";
                mobile.serialNumber = (i+1);
                allDatas.push(mobile);
            }
        }
        xTable.value.table.tableAllData = allDatas;
        xTable.value.table.total = allDatas.length;
        xTable.value.onPageIndexChange(1);
    });
}

function exportToLocation() {
    if (queryParam.domains.trim().length === 0) {
        showErrorNotification(localeGet('message2'));
        return;
    }
    let data = {
        type: queryParam.searchEngines,
        domains: queryParam.domains.split("\n").filter(domain => domain.trim().length > 0).map(domain => domain.trim())
    };
    isDownloadFile.value = true;
    download("/api/sites/export/rank", data, `KB-results-${Date.now()}.xlsx`, () => {
        isDownloadFile.value = false;
    });
}

/**
 * 合并单元格逻辑
 */
function spanMethod({record, column, rowIndex, columnIndex}) {
    if (!xTable.value.table.tableCurrData){
        return {rowspan: 0, colspan: 0};
    }
    if (column.dataIndex === 'domain') {
        if (rowIndex === 0 || (record.domain !== xTable.value.table.tableCurrData[rowIndex - 1].domain)){
            const count = xTable.value.table.tableCurrData.filter((item) => item.domain === record.domain).length;
            return {
                rowspan: count,
                colspan: 1,
            };
        }else {
            return {rowspan: 0, colspan: 0};
        }
    }
    if (column.dataIndex === 'serialNumber') {
        if (rowIndex === 0 || (record.serialNumber !== xTable.value.table.tableCurrData[rowIndex - 1].serialNumber)){
            const count = xTable.value.table.tableCurrData.filter((item) => item.serialNumber === record.serialNumber).length;
            return {
                rowspan: count,
                colspan: 1,
            };
        }else {
            return {rowspan: 0, colspan: 0};
        }
    }
    return {rowspan: 1, colspan: 1}; // 默认不合并
}

</script>

<style scoped>

</style>