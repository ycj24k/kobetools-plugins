<script setup>

import { post } from "@/hooks/useHttp";
import { ref, reactive, watch, onMounted, onUnmounted, computed, useSlots } from "vue";
import { showErrorNotification } from "@/hooks/useNotification";

const props = defineProps({
    columns: Array,
    spanMethod: Function,
    locales: {
        type: Object,
        default: {}
    },
    // 是否启用动态高度计算
    enableDynamicHeight: {
        type: Boolean,
        default: true
    },
    // 固定高度偏移量（用于减去头部、分页等固定元素的高度）
    heightOffset: {
        type: Number,
        default: 200
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

const slots = useSlots();
const forwardedSlots = computed(() => {
    const slotObj = slots || {};
    return Object.keys(slotObj)
        .filter((key) => key !== 'default' && typeof slotObj[key] === 'function')
        .reduce((acc, key) => {
            acc[key] = slotObj[key];
            return acc;
        }, {});
});
const hasEmptySlot = computed(() => typeof (slots || {}).empty === 'function');

// 动态高度计算
const windowHeight = ref(window.innerHeight);
const dynamicHeight = computed(() => Math.max(windowHeight.value - props.heightOffset, 300));
const scrollConfig = computed(() => {
    if (!props.enableDynamicHeight) {
        return {};
    }
    return { y: dynamicHeight.value };
});
const dynamicHeightPx = computed(() => `${dynamicHeight.value}px`);
const scrollContainerStyle = computed(() => {
    if (!props.enableDynamicHeight) {
        return {};
    }
    return {
        "--x-table-max-height": dynamicHeightPx.value,
        maxHeight: dynamicHeightPx.value
    };
});

// 监听窗口大小变化
const handleResize = () => {
    windowHeight.value = window.innerHeight;
};

onMounted(() => {
    if (props.enableDynamicHeight) {
        window.addEventListener('resize', handleResize);
    }
});

onUnmounted(() => {
    if (props.enableDynamicHeight) {
        window.removeEventListener('resize', handleResize);
    }
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
        table.isLoadTable = false;
        if (url === '/api/beian/query/domains' || url === '/api/beian/query/logs' || url === '/api/beian/query/corps') {
            result.data = result.data.map((item) => {
                for (let key in props.columns) {
                    if (!item[props.columns[key].dataIndex] && item[props.columns[key].dataIndex] !== 0) item[props.columns[key].dataIndex] = '未备案'
                }
                return item;
            });
        }
        // let errorNum = 0
        // result.data.forEach(item => {
        //     for (let key in item) {
        //          if (item[key]&&(item[key]+'').indexOf('错误') > -1) {
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
 * 批量设置表字段内容居中
 * @param columns
 * @returns {*}
 */
function setDefaultAlign(column) {
    if (!Object.prototype.hasOwnProperty.call(column, "align")) {
        column.align = "center";
    }
    if (Array.isArray(column.children)) {
        column.children.forEach(setDefaultAlign);
    }
}

function dealColumns(columns = []) {
    columns.forEach(setDefaultAlign);
    return columns;
}

function normalizeTableData(source = [], options = {}) {
    const { keepExistingSerial = false } = options;
    if (!Array.isArray(source)) {
        return [];
    }
    return source.map((item, index) => {
        if (item && typeof item === "object") {
            const normalized = { ...item };
            if (!keepExistingSerial || !Object.prototype.hasOwnProperty.call(normalized, "serialNumber")) {
                normalized.serialNumber = index + 1;
            }
            return normalized;
        }
        return item;
    });
}

/**
 * 网络请求到数据后，通过该方法解析数据到表里
 * @param result
 * @param callback
 */
function setData(result, callback = () => { }) {
    table.isLoadTable = false;

    const rawData = Array.isArray(result?.data) ? result.data : [];
    let normalizedData = normalizeTableData(rawData);
    table.tableAllData = normalizedData;

    const callbackResult = callback(result);
    let metaInfo = {};
    let customData;

    if (Array.isArray(callbackResult)) {
        customData = callbackResult;
    } else if (callbackResult && typeof callbackResult === "object") {
        metaInfo = { ...callbackResult };
        if (Array.isArray(metaInfo.data)) {
            customData = metaInfo.data;
            delete metaInfo.data;
        }
    }

    if (!customData && table.tableAllData !== normalizedData) {
        customData = table.tableAllData;
    }

    if (customData) {
        normalizedData = normalizeTableData(customData, { keepExistingSerial: true });
        table.tableAllData = normalizedData;
    }

    const totalFromMeta = typeof metaInfo.total === "number" ? metaInfo.total : undefined;
    const totalFromResult = typeof result.total === "number" ? result.total : undefined;
    table.total = totalFromMeta ?? totalFromResult ?? normalizedData.length;

    if (Object.prototype.hasOwnProperty.call(metaInfo, "successCount")) {
        table.successCount = metaInfo.successCount;
    } else if (result && result.hasOwnProperty("successCount")) {
        table.successCount = result.successCount;
    }

    if (Object.prototype.hasOwnProperty.call(metaInfo, "failCount")) {
        table.failCount = metaInfo.failCount;
    } else if (result && result.hasOwnProperty("failCount")) {
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
    <div class="x-table">
        <div
            class="x-table__scroll"
            :class="{ 'x-table__scroll--dynamic': enableDynamicHeight }"
            :style="scrollContainerStyle"
        >
            <a-table column-resizable :loading="table.isLoadTable" :scroll="scrollConfig" :scrollbar="true"
                v-slots="forwardedSlots"
                :columns="dealColumns(columns)" :data="table.tableCurrData" :bordered="{ cell: true }" row-key="serialNumber"
                :row-selection="rowSelection" :spanMethod="spanMethod" :pagination="false" v-model:selectedKeys="selectedKeys">
                <template v-if="!hasEmptySlot" #empty>
                    <div class="x-table__empty">暂无数据</div>
                </template>
            </a-table>
        </div>
        <div class="x-table__spacer"></div>
        <div class="x-table__footer" v-if="table.total">
            <div class="x-table__stats">
                查询数量：<span class="x-table__number x-table__number--total">{{ table.total }}</span>条，
                成功：<span class="x-table__number x-table__number--success">{{ table.successCount }}</span>条，失败：<span
                    class="x-table__number x-table__number--fail">{{ table.failCount }}</span>条
            </div>
            <div class="x-table__pager">
                <a-pagination show-total v-model="table.pageIndex" :page-size="table.pageSize"
                    :total="table.total" show-page-size @change="onPageIndexChange"
                    @page-size-change="onPageSizeChange" />
            </div>
        </div>
    </div>
</template>

<style lang="less" scoped>
.x-table {
    display: flex;
    flex-direction: column;
    height: 100%;
}

.x-table__scroll {
    flex: 1;
    overflow-y: auto;
    max-height: var(--x-table-max-height, none);
    min-height: 0;
}

.x-table__scroll--dynamic {
    :deep(.arco-table-body) {
        max-height: inherit;
        overflow-y: auto;
    }
}

.x-table__empty {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 295px;
    color: #999;
}

.x-table__spacer {
    height: 12px;
}

.x-table__footer {
    display: flex;
    align-items: center;
    min-height: 32px;
}

.x-table__stats {
    width: 400px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 4px;
    color: #333;
}

.x-table__number {
    font-weight: bold;
}

.x-table__number--total {
    color: #165dff;
}

.x-table__number--success {
    color: #00b42a;
}

.x-table__number--fail {
    color: #f53f3f;
}

.x-table__pager {
    flex: 1;
    display: flex;
    justify-content: flex-end;
}

.x-table__pager :deep(.arco-pagination) {
    display: inline-flex;
}
</style>