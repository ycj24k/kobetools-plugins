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

const typeOptions = [
    {
        label: '完全相同',
        value: 'EXACT_SAME'
    },
    {
        label: '完全不同',
        value: 'COMPLETELY_DIFFERENT'
    },
    {
        label: '必须包含',
        value: 'MUST_CONTAIN'
    },
    {
        label: '不能包含',
        value: 'CANNOT_CONTAIN'
    },
    {
        label: '合并去重',
        value: 'MERGE_DEDUPLICATE'
    },
]

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
        setData(result, url, callback, data);
    }, () => {
        table.isLoadTable = false;
    });
}

/**
 * 网络请求到数据后，通过该方法解析数据到表里
 * @param result
 * @param callback
 */
function setData(result, url, callback = () => { }, data) {
    table.isLoadTable = false;
    let resData = result.data
    let list = []
    if (url === '/api/front/keyword/filter/text' || url === '/api/front/keyword/filter/file') {
        columns.value = [
            {
                title: '原始关键词',
                dataIndex: 'oldKeyword',
                width: 200,
                align: 'center'
            },
            {
                title: '过滤后关键词',
                dataIndex: 'newKeyword',
                width: 200,
                align: 'center'
            },
        ]
        let keywords = data.keywords || []
        list = keywords.map((item, index) => {
            return {
                oldKeyword: item,
                newKeyword: resData.filteredKeywords[index]?resData.filteredKeywords[index].keyword:''
            }
        })
    }
    if (url === '/api/front/keyword/filter/group' || url === '/api/front/keyword/filter/group/file') {
        columns.value = resData.tableHeaders.map(item => {
            return {
                title: item,
                dataIndex: item,
            }
        })
        resData.originalKeywords.forEach((item, index) => {
            let json = {}
            resData.tableHeaders.forEach((child, idx) => {
                if (idx === 0) {
                    json[child] = index+1
                } else if (idx === 1) {
                    json[child] = item
                } else {
                    json[child] = resData.groupColumns[child][index]?resData.groupColumns[child][index]:''
                }
            });
            list.push(json);
        });
    }
    if (url === '/api/front/keyword-compare/compare' || url === '/api/front/keyword-compare/compare-files') {
        let max = resData.compareResults.length
        if (resData.group1Words&&resData.group1Words.length > max) max = resData.group1Words.length
        if (resData.group2Words&&resData.group2Words.length > max) max = resData.group2Words.length
        if (resData.group3Words&&resData.group3Words.length > max) max = resData.group3Words.length
        let columnData = [
            {
                title: '序号',
                dataIndex: 'number',
                width: 80,
                align: 'center'
            },
        ]
        if (resData.compareGroups.includes(1)) {
            columnData = [...columnData,
                {
                    title: '第一组',
                    dataIndex: 'group1',
                    align: 'center'
                },
            ]
        }
        if (resData.compareGroups.includes(2)) {
            columnData = [...columnData,
                {
                    title: '第二组',
                    dataIndex: 'group2',
                    align: 'center'
                },
            ]
        }
        if (resData.compareGroups.includes(3)) {
            columnData = [...columnData,
                {
                    title: '第三组',
                    dataIndex: 'group3',
                    align: 'center'
                },
            ]
        }
        columns.value = [...columnData,
            {
                title: '对比结果',
                dataIndex: 'compare',
                align: 'center'
            },
        ]
        let columnsJson = columns.value.map(item => item.dataIndex)
        for (let i = 0; i < max; i++) {
            let json = {}
            columnsJson.forEach(item => {
                if (item === 'number') {
                    json[item] = i+1
                }
                if (item === 'group1') {
                    json[item] = resData.group1Words[i] || ''
                }
                if (item === 'group2') {
                    json[item] = resData.group2Words[i] || ''
                }
                if (item === 'group3') {
                    json[item] = resData.group3Words[i] || ''
                }
                if (item === 'sequence') {
                    json[item] = typeOptions.find(item => item.value === resData.compareType).label
                }
                if (item === 'compare') {
                    json[item] = resData.compareResults[i]
                }
            });
            list.push(json);
        }
    }
    
    table.tableAllData = list
    table.total = table.tableAllData.length;
    // 外面可能要调整数据格式
    callback(result);
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
        <div class="flex_box flex_row_end table_footer" v-if="table.total">
            <div class="table_page">
                <a-pagination show-total v-model="table.pageIndex" :page-size="table.pageSize"
                    :total="table.total" show-page-size @change="onPageIndexChange"
                    @page-size-change="onPageSizeChange" />
            </div>
        </div>
    </div>
</template>

<style scoped lang="less">
.custom_table {
    height: 100%;
    padding: 0 20px;
    .table_box {
        height: calc(100% - 60px);
    }
    .table_footer {
        height: 60px;
    }
}
</style>