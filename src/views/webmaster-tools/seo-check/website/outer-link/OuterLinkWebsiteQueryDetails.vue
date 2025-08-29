<template>
    <a-modal width="auto" v-model:visible="visible" title-align="start" :closable="false" :footer="false">
        <div :style="{width: '1800px', height: (innerHeight * 0.8)+'px'}">
            <div style="height: 65px; display: flex;">
                <div style="width: 500px;">
                    <XButton color="purple_blue_pink" text="返回列表页" @xClick="visible=false"/>
                </div>
                <div style="flex: 1; display: flex; gap: 12px; justify-content: flex-end">
                    <XButton :loading="isDownloadFile" @xClick="exportExcel" color="yellow" text="导出站点信息"/>
                    <XButton :loading="isQuery" @xClick="handleQuery" color="pink" text="查询站点权重"/>
                </div>
            </div>
            <div style="height: calc(100% - 65px)">
                <XTable ref="xTable" :columns="columns">
                    <template #aizhanPcBr="{ record }">
                        <XCapsuleTag type="aizhan" :text="record.aizhanPcBr" />
                    </template>
                    <template #aizhanMobileBr="{ record }">
                        <XCapsuleTag type="aizhan" :text="record.aizhanMobileBr" />
                    </template>
                    <template #chinazPcBr="{ record }">
                        <XCapsuleTag type="zhanzhang" :text="record.chinazPcBr" />
                    </template>
                    <template #chinazMobileBr="{ record }">
                        <XCapsuleTag type="zhanzhang" :text="record.chinazMobileBr" />
                    </template>
                    <template #link_count="{ record }">
                        <span style="font-weight: bold; color: rgb(190,125,20)">{{record.link_count}}</span>
                    </template>
                    <template #link_text="{ record }">
                        <span style="font-weight: bold;">{{record.link_text}}</span>
                    </template>
                    <template #nofollow="{ record }">
                        <span :style="{fontWeight: 'bold', color: (record.nofollow==='1')?'rgb(76,184,106)':'red'}">{{record.nofollow==='1'?'是':'否'}}</span>
                    </template>
                    <template #is_back_link="{ record }">
                        <span :style="{fontWeight: 'bold', color: (record.is_back_link==='1')?'rgb(76,184,106)':'red'}">{{record.is_back_link==='1'?'是':'否'}}</span>
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

let visible = ref(false);
let columns = [
    {
        title: '序号',
        dataIndex: 'serialNumber',
        width: 80
    },
    {
        title: '域名',
        dataIndex: 'url',
        width: 200,
        ellipsis: true,
        tooltip: true
    },
    {
        title: 'PC权重',
        slotName: 'aizhanPcBr',
        width: 100
    },
    {
        title: '移动权重',
        slotName: 'aizhanMobileBr',
        width: 100
    },
    {
        title: 'PC权重',
        slotName: 'chinazPcBr',
        width: 100
    },
    {
        title: '移动权重',
        slotName: 'chinazMobileBr',
        width: 100
    },
    {
        title: '反链数',
        slotName: 'link_count',
        width: 100
    },
    {
        title: '链接名称',
        slotName: 'link_text',
        width: 200,
        ellipsis: true,
        tooltip: true
    },
    {
        title: '链接地址',
        dataIndex: 'link_url',
        ellipsis: true,
        tooltip: true
    },
    {
        title: 'Nofflow',
        slotName: 'nofollow',
        width: 100
    },
    {
        title: '是否回链',
        slotName: 'is_back_link',
        width: 100
    },
    {
        title: '发现时间',
        dataIndex: 'date',
        width: 150
    },
];
let xTable = ref(null);
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
    queryTableData();
}

/**
 * 查询表数据
 */
function queryTableData(){
    let data = rowData.value.items;
    xTable.value.queryTableData("/api/sites/query/backlinks/detail", data);
}

/**
 * 导出数据
 */
function exportExcel(){
    isDownloadFile.value = true;
    let data = rowData.value.items;
    download("/api/sites/export/backlinks/detail", data, `KB-results-${Date.now()}.xlsx`, () => {
        isDownloadFile.value = false;
    });
}
// 查询权重
function handleQuery(){
    if (!xTable.value.table.tableAllData.length) {
        showErrorNotification('请选择需要查询的域名！');
        return
    }
    isQuery.value = true;
    let data = []
    if (xTable.value.selectedKeys.length) {
        data = xTable.value.table.tableAllData.filter((item, index) => xTable.value.selectedKeys.includes(index+1)).map(item => item.domain)
    } else {
        data = xTable.value.table.tableAllData.map(item => item.domain)
    }
    post("/api/sites/query/backlinks/weight", data, (result) => {
        isQuery.value = false;
        data.forEach((item, index) => {
            let idx = xTable.value.selectedKeys.length ? xTable.value.selectedKeys[index] - 1 : index
            xTable.value.table.tableAllData[idx] = { ...xTable.value.table.tableAllData[idx], ...result.data[index] }
        })
        xTable.value.onPageIndexChange(xTable.value.table.pageIndex)
    }, () => {
        isQuery.value = false;
    });
}

defineExpose({show})

</script>

<style scoped>

</style>