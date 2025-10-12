<template>
    <a-modal width="auto" v-model:visible="visible" title-align="start" :closable="false" :footer="false">
        <div :style="{width: '1800px', height: (innerHeight * 0.8)+'px'}">
            <div style="height: 65px; display: flex;">
                <div style="width: 500px;">
                    <XButton color="purple_blue_pink" :text="localeGet('button6')" @xClick="visible=false"/>
                </div>
                <div style="flex: 1; display: flex; gap: 12px; justify-content: flex-end">
                    <XButton :loading="isDownloadFile" @xClick="exportExcel" color="yellow" :text="localeGet('button7')"/>
                    <XButton :loading="isQuery" @xClick="handleQuery" color="pink" :text="localeGet('button8')"/>
                </div>
            </div>
            <div style="height: calc(100% - 65px)" v-if="visible">
                <XTable ref="detailTable" :columns="columns">
                    <template #baiduPCWeight="{ record }">
                        <div style="display:flex;">
                            <XCapsuleTag type="aizhan" :text="record.aizhanPcBr" />
                            <div style="width: 8px"/>
                            <XCapsuleTag type="zhanzhang" :text="record.chinazPcBr" />
                        </div>
                    </template>
                    <template #baiduMobileWeight="{ record }">
                        <div style="display:flex;">
                            <XCapsuleTag type="aizhan" :text="record.aizhanMobileBr" />
                            <div style="width: 8px"/>
                            <XCapsuleTag type="zhanzhang" :text="record.chinazMobileBr" />
                        </div>
                    </template>
                    <template #sogouPCWeight="{ record }">
                        <XCapsuleTag type="aizhan" :text="record.aizhanSougouBr" />
                    </template>
                    <template #sogouMobileWeight="{ record }">
                        <XCapsuleTag type="aizhan" :text="record.aizhanSogouMobileBr" />
                    </template>
                    <template #smWeight="{ record }">
                        <XCapsuleTag type="aizhan" :text="record.aizhanSmBr" />
                    </template>
                    <template #bingWeight="{ record }">
                        <XCapsuleTag type="aizhan" :text="record.aizhanBingBr" />
                    </template>
                </XTable>
            </div>
        </div>
    </a-modal>
</template>

<script setup>
import {ref} from "vue";
import { post } from "@/hooks/useHttp";
import XTable from "@/components/common/XTable.vue";
import XButton from "@/components/common/XButton.vue";
import {download} from "@/hooks/useHttp";
import XCapsuleTag from "@/components/common/XCapsuleTag.vue";
import {showErrorNotification} from "@/hooks/useNotification";

import { useI18n } from '../../../keyword-tools/keyword/utils/i18n';
import localZhCN from './zh-CN.js';

const props = defineProps({
    locales: { type: Object, default: {} }
});

const { localeGet, updateLocales, translateOptions } = useI18n(localZhCN);

let visible = ref(false);
let columns = ref([]);

watch(() => props.locales, (newVal) => {
    if (newVal) updateLocales(newVal);
    columns.value = [
        { title: localeGet('detailColumns.label1'), dataIndex: 'serialNumber', width: 50 },
        { title: localeGet('detailColumns.label2'), dataIndex: 'domain', width: 150 },
        { title: localeGet('detailColumns.label3'), slotName: 'baiduPCWeight', width: 123 },
        { title: localeGet('detailColumns.label4'), slotName: 'baiduMobileWeight', width: 123 },
        { title: localeGet('detailColumns.label5'), slotName: 'sogouPCWeight', width: 80 },
        { title: localeGet('detailColumns.label6'), slotName: 'sogouMobileWeight', width: 80 },
        { title: localeGet('detailColumns.label7'), slotName: 'smWeight', width: 80 },
        { title: localeGet('detailColumns.label8'), slotName: 'bingWeight', width: 80 },
        { title: localeGet('detailColumns.label9'), dataIndex: 'title', width: 300, ellipsis: true, tooltip: true },
    ];
}, { immediate: true });

let detailTable = ref(null);
let isDownloadFile = ref(false);
let isQuery = ref(false);
let rowData = ref({});
let innerHeight = ref(0);

/**
 * 打开详情窗口
 * @param record
 */
function show(record){
    innerHeight.value = window.innerHeight;
    rowData.value = record;
    visible.value = true;
    setTimeout(() => {
        queryTableData();
    }, 200);
}

/**
 * 查询表数据
 */
function queryTableData(){
    let data = {
        domain: rowData.value.domain
    };
    detailTable.value.queryTableData("/api/sites/query/dnsinfo/detail", data);
}

/**
 * 导出数据
 */
function exportExcel(){
    isDownloadFile.value = true;
    let data = {
        domain: rowData.value.domain
    };
    download("/api/sites/export/dnsinfo/detail", data, `KB-results-${Date.now()}.xlsx`, () => {
        isDownloadFile.value = false;
    });
}
// 查询权重
function handleQuery(){
    if (!detailTable.value.table.tableAllData.length) {
        showErrorNotification(localeGet('message2'));
        return
    }
    isQuery.value = true;
    let data = []
    if (detailTable.value.selectedKeys.length) {
        data = detailTable.value.table.tableAllData.filter((item, index) => detailTable.value.selectedKeys.includes(index+1)).map(item => item.domain)
    } else {
        data = detailTable.value.table.tableAllData.map(item => item.domain)
    }
    post("/api/sites/query/dnsinfo/weight", data, (result) => {
        isQuery.value = false;
        data.forEach((item, index) => {
            let idx = detailTable.value.selectedKeys.length ? detailTable.value.selectedKeys[index] - 1 : index
            detailTable.value.table.tableAllData[idx] = { ...detailTable.value.table.tableAllData[idx], ...result.data[index] }
        })
        detailTable.value.onPageIndexChange(detailTable.value.table.pageIndex)
    }, () => {
        isQuery.value = false;
    });
}
defineExpose({show})

</script>

<style scoped>

</style>