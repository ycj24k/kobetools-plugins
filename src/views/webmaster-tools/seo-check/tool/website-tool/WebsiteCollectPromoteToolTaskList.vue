<template>
    <div style="display: flex; flex-direction: column; height: 100%;">
        <div style="height: 12px;"></div>
        <div style="display: flex; gap: 12px">
            <a-select style="width: 150px" placeholder="任务类型">
                <a-option>Beijing</a-option>
            </a-select>
            <a-select style="width: 150px" placeholder="搜索引擎">
                <a-option>Beijing</a-option>
            </a-select>
            <a-select style="width: 150px" placeholder="操作方式">
                <a-option>Beijing</a-option>
            </a-select>
            <a-select style="width: 150px" placeholder="任务状态">
                <a-option>Beijing</a-option>
            </a-select>
            <a-input style="width: 300px" placeholder="请输入任务名称" allow-clear />
            <XButton color="purple_blue_pink" size="small" text="搜索" />
            <XButtonOutline color="blue" size="small" text="重置" />
            <XButtonOutline color="blue" size="small" text="刷新" />
        </div>
        <div style="height: 25px;"></div>
        <div style="flex: 1;">
            <a-table :columns="columns" />
            <div style="height: 12px;"></div>
            <div style="display: flex;">
                <div style="display: flex; gap: 12px; align-items: center; flex: 1">
                    <XButton color="yellow" size="small" text="批量删除" />
                    <XButtonOutline color="blue" size="small" text="加载全部" />
                    <span>共计：10 条</span>
                </div>
                <div style="flex: 1; justify-items: right">
                    <a-pagination show-total :total="50" show-page-size/>
                </div>
            </div>
        </div>

    </div>
</template>

<script setup>
import {ref} from "vue";
import XButton from "@/components/common/XButton.vue";
import XTextarea from "@/components/common/XTextarea.vue";
import {download} from "@/hooks/useHttp";
import {showErrorNotification} from "@/hooks/useNotification";
import XTable from "@/components/common/XTable.vue";
import XButtonOutline from "@/components/common/XButtonOutline.vue";

let columns = [
    {
        title: '序号',
        dataIndex: 'serialNumber',
        width: 100
    },
    {
        title: '任务ID',
        dataIndex: 'domain',
        minWidth: 200
    },
    {
        title: '任务名称',
        dataIndex: 'bqRes',
        slotName: 'bqRes',
        width: 300
    },
    {
        title: '任务类型',
        dataIndex: 'qqRes',
        slotName: 'qqRes',
        minWidth: 150
    },
    {
        title: '搜索引擎',
        dataIndex: 'wxRes',
        slotName: 'wxRes',
        minWidth: 230
    },
    {
        title: '操作方式',
        dataIndex: 'bdMessage',
        slotName: 'bdMessage',
        minWidth: 200
    },
    {
        title: '任务数',
        dataIndex: 'baRes',
        slotName: 'baRes',
        minWidth: 200
    },
    {
        title: '已收录',
        dataIndex: 'baRes',
        slotName: 'baRes',
        minWidth: 200
    },
    {
        title: '收录率',
        dataIndex: 'baRes',
        slotName: 'baRes',
        minWidth: 200
    },
    {
        title: '任务状态',
        dataIndex: 'baRes',
        slotName: 'baRes',
        minWidth: 200
    },
    {
        title: '添加时间',
        dataIndex: 'baRes',
        slotName: 'baRes',
        minWidth: 200
    },
    {
        title: '操作',
        dataIndex: 'baRes',
        slotName: 'baRes',
        minWidth: 200
    },
];

</script>

<style scoped>

</style>