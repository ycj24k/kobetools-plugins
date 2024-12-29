<script setup>

import {useTable} from "@/hooks/useTable";
import {useHttp} from "@/hooks/useHttp";

let {table, rowSelection, setData, onPageIndexChange, onPageSizeChange} = useTable();
let {post} = useHttp();

const props = defineProps({
    columns: Array,
    spanMethod: Function
});

function queryTableData(url, data, callback=(result)=>{}){
    table.isLoadTable = true;
    post(url, data, (result) => {
        table.isLoadTable = false;
        setData(result, callback);
    }, () => {
        table.isLoadTable = false;
    });
}

function dealColumns(columns){
    for (let i = 0; i < columns.length; i++) {
        if (!columns.hasOwnProperty('align')){
            columns[i].align = 'center';
        }
    }
    return columns;
}

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
            页面共计：{{ table.total }}条，
            成功：<span style="color: green">{{table.successCount}}</span>条，失败：<span style="color: red">{{table.failCount}}</span>条
        </div>
        <div style="flex: 1; justify-items: right">
            <a-pagination v-model="table.pageIndex" :page-size="table.pageSize" :total="table.total" show-page-size @change="onPageIndexChange" @page-size-change="onPageSizeChange"/>
        </div>
    </div>
</template>

<style scoped>

</style>