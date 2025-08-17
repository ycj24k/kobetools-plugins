<script setup>

import { post } from "@/hooks/useHttp";
import { ref, reactive, watch } from "vue";
import { showErrorNotification } from "@/hooks/useNotification";

const props = defineProps({
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
    tableCurrData: [],
    total: 0,
    successCount: 0,
    failCount: 0
})
const columns = ref([])
const selectedKeys = ref([])

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
function queryTableData(url, data, callback = () => { }) {
    table.isLoadTable = true;
    selectedKeys.value = []
    post(url, data, (result) => {
        // let errorNum = 0
        // result.data.tableHeaders.forEach(item => {
        //     for (let key in item) {
        //          if (item[key].toString().indexOf('错误') > -1) {
        //             errorNum++;
        //          }
        //     }
        // });
        // if (errorNum) {
        //     showErrorNotification('余额不足或网络错误，请稍后再试')
        //     return
        // }
        setData(result, callback);
    }, () => {
        table.isLoadTable = false;
    });
}

/**
 * 网络请求到数据后，通过该方法解析数据到表里
 * @param result
 * @param callback
 */
function setData(result, callback = () => { }) {
    table.isLoadTable = false;
    columns.value = result.data.tableHeaders.map(item => {
        return {
            title: item,
            dataIndex: item,
        }
    })
    let list = []
    result.data.originalKeywords.forEach((item, index) => {
        let json = {}
        result.data.tableHeaders.forEach((child, idx) => {
            if (idx === 0) {
                json[child] = index+1
            } else if (idx === 1) {
                json[child] = item
            } else {
                json[child] = result.data.groupColumns[child][index]?result.data.groupColumns[child][index]:''
            }
        });
        list.push(json);
    });
    table.tableCurrData = list;
    // 外面可能要调整数据格式
    callback(result);
}

/**
 * 导出给父组件调用
 */
defineExpose({ queryTableData, table, setData, selectedKeys, columns })

</script>

<template>
    <div class="custom_table">
        <div class="table_box">
            <a-table column-resizable :loading="table.isLoadTable" :scroll="{ y: '100%' }" :scrollbar="true"
                :columns="columns" :data="table.tableCurrData" :bordered="{ cell: true }" row-key="serialNumber"
                :row-selection="rowSelection" :pagination="false" v-model:selectedKeys="selectedKeys">
                <template v-for="(slot, slotName) in $slots" :key="slotName" #[slotName]="slotProps">
                    <slot :name="slotName" v-bind="slotProps" />
                </template>
                <template #empty>
                    <div style="display: flex; align-items: center; justify-content: center; height: 295px;">暂无数据</div>
                </template>
            </a-table>
        </div>
        <!-- <div style="height: 32px; display: flex;" v-if="table.total">
            <div style="width: 400px; display: flex; align-items: center">
                查询数量：<span style="color: blue;font-weight: bold;">{{ table.total }}</span>&nbsp;条，
                成功：<span style="color: green;font-weight: bold;">{{ table.successCount }}</span>&nbsp;条，失败：<span
                    style="color: red;font-weight: bold;">{{ table.failCount }}</span>&nbsp;条
            </div>
            <div style="flex: 1; text-align: right">
                <a-pagination style="display: inline-block" v-model="table.pageIndex" :page-size="table.pageSize"
                    :total="table.total" show-page-size @change="onPageIndexChange"
                    @page-size-change="onPageSizeChange" />
            </div>
        </div> -->
    </div>
</template>

<style scoped lang="less">
.custom_table {
    height: 100%;
    padding: 20px;
    .table_box {
        height: 100%;
    }
}
</style>