<template>
    <div style="display: flex; flex-direction: column; height: 100%;">
        <div style="height: 12px;"></div>
        <div style="padding: 20px; background-color: rgb(240, 244, 255); border-radius: 12px">
            <div style="text-align: center; font-weight: bold; font-size: 16px; color: rgb(117, 119, 123);">任务名称：<span style="color: rgb(32,85,237)">xxxx</span></div>
            <div style="height: 20px;"></div>
            <div style="text-align: center;">
                <span style="margin-right: 20px">
                    添加时间：xxxx-xx-xx xx:xx:xx
                </span>
                <span style="margin-right: 20px">
                    任务类型：首页收录
                </span>
                <span style="margin-right: 20px">
                    搜索引擎：百度
                </span>
                <span style="margin-right: 20px">
                    操作方式：xxx
                </span>
            </div>
            <div style="height: 20px;"></div>
            <div style="text-align: center;">
                <span style="margin-right: 20px">
                    任务状态：进行中
                </span>
                <span style="margin-right: 20px">
                    任务数量：12345
                </span>
                <span style="margin-right: 20px">
                    已收录：123
                </span>
                <span style="margin-right: 20px">
                    收录率：80%
                </span>
            </div>
        </div>
        <div style="height: 25px;"></div>
        <div style="display: flex; gap: 12px">
            <a-select style="width: 150px" placeholder="收录状态">
                <a-option>Beijing</a-option>
            </a-select>
            <a-select style="width: 150px" placeholder="收录时效">
                <a-option>Beijing</a-option>
            </a-select>
            <a-input style="width: 300px" placeholder="请输入网址链接" allow-clear />
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
                    <a-pagination :total="50" show-page-size/>
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
        title: '搜索引擎',
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
        title: '任务状态',
        dataIndex: 'baRes',
        slotName: 'baRes',
        minWidth: 200
    },
    {
        title: '收录时效',
        dataIndex: 'baRes',
        slotName: 'baRes',
        minWidth: 200
    },
    {
        title: '收录时间',
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