<script setup>

import { post } from "@/hooks/useHttp";
import { ref, reactive, watch } from "vue";
import { showErrorNotification } from "@/hooks/useNotification";

const props = defineProps({
    columns: Array,
    spanMethod: Function,
    locales: {
        type: Object,
        default: {}
    }
});
const localeData = ref(props.locales);
// 监听 props 的变化
watch(() => props.locales, (newVal) => {
  localeData.value = newVal;
});
const localeGet = (key) => {
  return localeData.value[key]
}

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

const selectedKeys = ref([]);

/**
 * 表的网络查询
 * @param url
 * @param data
 * @param callback
 */
function queryTableData(url, data, callback = () => { }) {
    table.isLoadTable = true;
    selectedKeys.value = []
    post(url, data, (result) => {
        table.isLoadTable = false;
        if (url === '/api/beian/query/domains' || url === '/api/beian/query/logs' || url === '/api/beian/query/corps') {
            result.data = result.data.map((item) => {
                for (let key in props.columns) {
                    if (!item[props.columns[key].dataIndex] && item[props.columns[key].dataIndex] !== 0) item[props.columns[key].dataIndex] = '未备案'
                }
                return item;
            });
        }
        let errorNum = 0
        result.data.forEach(item => {
            for (let key in item) {
                 if (item[key]&&item[key].toString().indexOf('错误') > -1) {
                    errorNum++;
                 }
            }
        });
        if (errorNum) {
            showErrorNotification('余额不足或网络错误，请稍后再试')
            return
        }
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
function dealColumns(columns) {
    for (let i = 0; i < columns.length; i++) {
        if (!columns.hasOwnProperty('align')) {
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
function setData(result, callback = () => { }) {
    table.isLoadTable = false;
    table.tableAllData = result.data;
    for (let i = 0; i < table.tableAllData.length; i++) {
        table.tableAllData[i].serialNumber = (i + 1);
    }
    // 外面可能要调整数据格式
    callback(result);
    table.total = table.tableAllData.length;
    if (result.hasOwnProperty('successCount')) {
        table.successCount = result.successCount;
    }
    if (result.hasOwnProperty('failCount')) {
        table.failCount = result.failCount;
    }
    onPageIndexChange(1);
}

/**
 * 监听页码发生变化
 * @param pageIndex
 */
function onPageIndexChange(pageIndex) {
    table.pageIndex = pageIndex;
    table.tableCurrData.length = 0;
    const startIndex = (table.pageIndex - 1) * table.pageSize; // 当前页起始索引
    const endIndex = startIndex + table.pageSize; // 当前页结束索引
    table.tableCurrData.push(...table.tableAllData.slice(startIndex, endIndex));
}

/**
 * 监听每页大小发生变化
 * @param pageSize
 */
function onPageSizeChange(pageSize) {
    table.pageSize = pageSize;
    onPageIndexChange(table.pageIndex);
}

/**
 * 导出给父组件调用
 */
defineExpose({ queryTableData, table, setData, onPageIndexChange, selectedKeys })

</script>

<template>
    <div style="height: 100%; display: flex; flex-direction: column">
        <div style="flex: 1; overflow-y: auto">
            <a-table column-resizable :loading="table.isLoadTable" :scroll="{ y: '100%' }" :scrollbar="true"
                :columns="dealColumns(columns)" :data="table.tableCurrData" :bordered="{ cell: true }" row-key="serialNumber"
                :row-selection="rowSelection" :spanMethod="spanMethod" :pagination="false" v-model:selectedKeys="selectedKeys">
                <template v-for="(slot, slotName) in $slots" :key="slotName" #[slotName]="slotProps">
                    <slot :name="slotName" v-bind="slotProps" />
                </template>
                <template #empty>
                    <div style="display: flex; align-items: center; justify-content: center; height: 295px;">暂无数据</div>
                </template>
            </a-table>
        </div>
        <div style="height: 12px;"></div>
        <div style="height: 32px; display: flex;" v-if="table.total">
            <div style="width: 400px; display: flex; align-items: center">
                查询数量：<span style="color: blue;font-weight: bold;">{{ table.total }}</span>&nbsp;条，
                成功：<span style="color: green;font-weight: bold;">{{ table.successCount }}</span>&nbsp;条，失败：<span
                    style="color: red;font-weight: bold;">{{ table.failCount }}</span>&nbsp;条
            </div>
            <div style="flex: 1; text-align: right">
                <a-pagination show-total style="display: inline-block" v-model="table.pageIndex" :page-size="table.pageSize"
                    :total="table.total" show-page-size @change="onPageIndexChange"
                    @page-size-change="onPageSizeChange" />
            </div>
        </div>
    </div>
</template>

<style scoped></style>