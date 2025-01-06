<script setup>

import {useHttp} from "@/hooks/useHttp";
import {reactive} from "vue";

let {post} = useHttp();

const props = defineProps({
    columns: Array,
    spanMethod: Function
});

/**
 * 表的基本数据
 */
let table = reactive({
    isLoadTable: false,
    tableAllData: [],
    tableCurrData: [],
    pageIndex: 1,
    pageSize: 20,
    total: 0,
    successCount: 0,
    failCount: 0
})

/**
 * 表格可勾选行
 */
const rowSelection = reactive({
    type: 'checkbox',
    showCheckedAll: true,
    onlyCurrent: false,
});

/**
 * 表的网络查询
 * @param url
 * @param data
 * @param callback
 */
function queryTableData(url, data, callback=(result)=>{}){
    table.isLoadTable = true;
    post(url, data, (result) => {
        table.isLoadTable = false;
        setData(result, callback);
    }, () => {
        table.isLoadTable = false;
    });
}

/**
 * 批量设置表字段内容居中
 * @param columns
 * @returns {*}
 */
function dealColumns(columns){
    for (let i = 0; i < columns.length; i++) {
        if (!columns.hasOwnProperty('align')){
            columns[i].align = 'center';
        }
    }
    return columns;
}

/**
 * 网络请求到数据后，通过该方法解析数据到表里
 * @param result
 * @param callback
 */
function setData(result, callback=(result)=>{}){
    table.isLoadTable = false;
    table.tableAllData = result.data;
    for (let i = 0; i < table.tableAllData.length; i++) {
        table.tableAllData[i].serialNumber = (i+1);
    }
    // 外面可能要调整数据格式
    callback(result);
    table.total = table.tableAllData.length;
    if (result.hasOwnProperty('successCount')){
        table.successCount = result.successCount;
    }
    if (result.hasOwnProperty('failCount')){
        table.failCount = result.failCount;
    }
    onPageIndexChange(1);
}

/**
 * 监听页码发生变化
 * @param pageIndex
 */
function onPageIndexChange(pageIndex){
    table.pageIndex = pageIndex;
    table.tableCurrData.length = 0;
    const startIndex = (table.pageIndex - 1) * table.pageSize; // 当前页起始索引
    const endIndex = startIndex + table.pageSize; // 当前页结束索引
    table.tableCurrData.push(... table.tableAllData.slice(startIndex, endIndex));
}

/**
 * 监听每页大小发生变化
 * @param pageSize
 */
function onPageSizeChange(pageSize){
    table.pageSize = pageSize;
    onPageIndexChange(table.pageIndex);
}

/**
 * 导出给父组件调用
 */
defineExpose({queryTableData, table, setData, onPageIndexChange})

</script>

<template>
    <a-table style="height: calc(100% - 44px);" :loading="table.isLoadTable"
             :scroll="{y: '100%'}"
             :scrollbar="true"
             :columns="dealColumns(columns)"
             :data="table.tableCurrData"
             :bordered="{cell:true}"
             :row-selection="rowSelection"
             :spanMethod="spanMethod"
             :pagination="false">
        <template v-for="(slot, slotName) in $slots" #[slotName]="slotProps">
            <slot :name="slotName" v-bind="slotProps" />
        </template>
    </a-table>
    <div style="height: 12px;"></div>
    <div style="display: flex; height: 32px;">
        <div style="width: 400px; display: flex; align-items: center">
            页面共计：{{ table.total }}&nbsp;条，
            成功：<span style="color: green">{{table.successCount}}</span>&nbsp;条，失败：<span style="color: red">{{table.failCount}}</span>&nbsp;条
        </div>
        <div style="flex: 1; justify-items: right">
            <a-pagination v-model="table.pageIndex" :page-size="table.pageSize" :total="table.total" show-page-size @change="onPageIndexChange" @page-size-change="onPageSizeChange"/>
        </div>
    </div>
</template>

<style scoped>

</style>