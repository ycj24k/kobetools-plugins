import {reactive} from "vue";

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

const rowSelection = reactive({
    type: 'checkbox',
    showCheckedAll: true,
    onlyCurrent: false,
});

function setData(result, callback=(result)=>{}){
    table.isLoadTable = false;
    table.tableAllData = result.data;
    for (let i = 0; i < table.tableAllData.length; i++) {
        table.tableAllData[i].serialNumber = (i+1);
    }
    // 外面可能要调整数据格式
    callback(result);
    table.total = result.total;
    table.successCount = result.successCount;
    table.failCount = result.failCount;
    onPageIndexChange(1);
}

function onPageIndexChange(pageIndex){
    table.pageIndex = pageIndex;
    table.tableCurrData.length = 0;
    const startIndex = (table.pageIndex - 1) * table.pageSize; // 当前页起始索引
    const endIndex = startIndex + table.pageSize; // 当前页结束索引
    table.tableCurrData.push(... table.tableAllData.slice(startIndex, endIndex));
}

function onPageSizeChange(pageSize){
    table.pageSize = pageSize;
    onPageIndexChange(table.pageIndex);
}

export function useTable(){

    return {
        table, rowSelection, setData, onPageIndexChange, onPageSizeChange
    }

}