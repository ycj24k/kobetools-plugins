<template>
    <a-modal width="auto" v-model:visible="visible" title-align="start" :closable="false" :footer="false">
        <div :style="{width: '1800px', height: (innerHeight * 0.8)+'px'}">
            <div style="height: 65px; display: flex;">
                <div style="width: 500px;">
                    <XButton color="purple_blue_pink" text="返回列表页" @xClick="visible=false"/>
                </div>
                <div style="flex: 1; display: flex; gap: 12px; justify-content: flex-end">
                    <XButton :loading="isDownloadFile" @xClick="exportExcel" color="yellow" text="导出站点信息"/>
                    <XButton color="pink" text="查询站点信息"/>
                </div>
            </div>
            <div style="height: calc(100% - 65px)">
                <XTable ref="xTable" :columns="columns">
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
import XTable from "@/components/common/XTable.vue";
import XButton from "@/components/common/XButton.vue";
import {download} from "@/hooks/useHttp";
import XCapsuleTag from "@/components/common/XCapsuleTag.vue";

let visible = ref(false);
let columns = [
    {
        title: '序号',
        dataIndex: 'serialNumber',
        width: 50
    },
    {
        title: '域名信息',
        dataIndex: 'domain',
        width: 150
    },
    {
        title: '百度PC权重',
        slotName: 'baiduPCWeight',
        width: 123
    },
    {
        title: '百度移动权重',
        slotName: 'baiduMobileWeight',
        width: 123
    },
    {
        title: '搜狗PC权重',
        slotName: 'sogouPCWeight',
        width: 80
    },
    {
        title: '搜狗移动权重',
        slotName: 'sogouMobileWeight',
        width: 80
    },
    {
        title: '神马权重',
        slotName: 'smWeight',
        width: 80
    },
    {
        title: '必应权重',
        slotName: 'bingWeight',
        width: 80
    },
    {
        title: '首页标题',
        dataIndex: 'title',
        width: 300,
        ellipsis: true,
        tooltip: true
    },
];
let xTable = ref(null);
let isDownloadFile = ref(false);
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
    queryTableData();
}

/**
 * 查询表数据
 */
function queryTableData(){
    let data = {
        domain: rowData.value.domain
    };
    xTable.value.queryTableData("/api/sites/query/dnsinfo/detail", data);
}

/**
 * 导出数据
 */
function exportExcel(){
    isDownloadFile.value = true;
    let data = {
        domain: rowData.value.domain
    };
    download("/api/sites/export/dnsinfo/detail", data, "导出文件.xlsx", () => {
        isDownloadFile.value = false;
    });
}

defineExpose({show})

</script>

<style scoped>

</style>