<template>
    <div style="display: flex; flex-direction: column; height: 100%;">
        <div style="height: 12px;"></div>
        <div style="display: flex; gap: 12px;">
            <div style="display: flex; gap: 12px; width: 300px;">
                <div style="font-weight: bold">站长平台</div>
                <a-radio-group v-model="queryParam.platform">
                    <a-radio value="az">爱站</a-radio>
                    <a-radio value="zz">站长工具</a-radio>
                </a-radio-group>
            </div>
            <div style="display: flex; gap: 12px; flex: 1">
                <div style="font-weight: bold">搜索引擎</div>
                <a-radio-group v-model="queryParam.searchEngines">
                    <a-radio style="margin-left: 30px" v-for="sEngines in searchEngines" :value="sEngines.code">{{ sEngines.name }}</a-radio>
                </a-radio-group>
            </div>
        </div>
        <div style="height: 25px;"></div>
        <div style="flex: 1;">
            <XTextarea v-model="queryParam.domains"
                       placeholder="请输入需要查询的网站域名，一行一个，单词最多提交20个，格式如：www.google.com"/>
        </div>
        <div style="height: 100px; display: flex; align-items: center;">
            <div style="width: 500px;">
                <XButton :loading="xTable?.table?.isLoadTable" @xClick="queryTableData" color="purple_blue_pink"
                         text="立即查询"/>
            </div>
            <div style="flex: 1; display: flex; gap: 12px; justify-content: flex-end">
                <XButton :loading="isDownloadFile" @xClick="exportToLocation" color="blue" text="导出到本地"/>
                <XButton color="yellow" text="导出网站列表"/>
                <XButton color="pink" text="VIP查询通道"/>
            </div>
        </div>
        <div style="height: 400px;">
            <XTable ref="xTable" :columns="columns" :spanMethod="spanMethod">
                <template #weight="{ record }">
                    <XCapsuleTag :text="record.weight" />
                </template>
                <template #ip="{ record }">
                    <span style="font-weight: bold; color: #11a4f1">{{record.ip}}</span>
                </template>
                <template #sum="{ record }">
                    <span style="font-weight: bold; color: #6f1ef6">{{record.sum}}</span>
                </template>
                <template #option="{ record }">
                    详情|未开发
                </template>
            </XTable>
        </div>
    </div>
</template>

<script setup>
import {reactive, ref} from "vue";
import XButton from "@/components/common/XButton.vue";
import XTextarea from "@/components/common/XTextarea.vue";
import {download} from "@/hooks/useHttp";
import XTable from "@/components/common/XTable.vue";
import XCapsuleTag from "@/components/common/XCapsuleTag.vue";
import {showErrorNotification} from "@/hooks/useNotification";

let searchEngines = [
    {code: "baidu", name: "百度", disabled: false},
    {code: "google", name: "谷歌", disabled: false},
    {code: "bing", name: "必应", disabled: false},
    {code: "so", name: "360", disabled: false},
    {code: "sogou", name: "搜狗", disabled: false},
    {code: "sm", name: "神马", disabled: false},
    {code: "toutiao", name: "头条", disabled: false},
    {code: "yahu", name: "雅虎", disabled: false},
    {code: "yandex", name: "Yandex", disabled: false}
];

let columns = [
    {
        title: '序号',
        dataIndex: 'serialNumber',
        width: 100,
    },
    {
        title: '域名域名',
        dataIndex: 'domain',
        minWidth: 200
    },
    {
        title: '站长平台',
        dataIndex: 'platform',
        width: 100
    },
    {
        title: '权重',
        dataIndex: 'weight',
        slotName: 'weight',
        minWidth: 100
    },
    {
        title: '预估流量',
        dataIndex: 'ip',
        slotName: 'ip',
        width: 200
    },
    {
        title: '总词数',
        dataIndex: 'sum',
        slotName: 'sum',
        minWidth: 100
    },
    {
        title: '第一页',
        dataIndex: 't0',
        minWidth: 100
    },
    {
        title: '第二页',
        dataIndex: 't1',
        minWidth: 100
    },
    {
        title: '第三页',
        dataIndex: 't2',
        minWidth: 100
    },
    {
        title: '第四页',
        dataIndex: 't3',
        minWidth: 100
    },
    {
        title: '第五页',
        dataIndex: 't4',
        minWidth: 100
    },
    {
        title: '操作',
        slotName: 'option',
        minWidth: 100
    },
];

let xTable = ref({});

let isDownloadFile = ref(false);

let queryParam = reactive({
    platform: "az",
    searchEngines: "baidu",
    domains: ""
});

function queryTableData() {

    if (queryParam.domains.trim().length === 0) {
        showErrorNotification('请输入需要查询的网站域名！');
        return;
    }
    let data = {
        type: queryParam.searchEngines,
        domains: queryParam.domains.split("\n").filter(domain => domain.trim().length > 0).map(domain => domain.trim())
    };

    // 是转换下结果
    xTable.value.queryTableData("/api/sites/query/rank", data, (result) => {
        let datas = result.data;
        let allDatas = [];
        for (let i = 0; i < datas.length; i++) {
            let data = datas[i];
            if (data.hasOwnProperty("pc")){
                let pc = data.pc;
                pc.domain = data.domain;
                pc.platform = "pc";
                pc.serialNumber = (i+1);
                allDatas.push(pc);
            }
            if (data.hasOwnProperty("mobile")){
                let mobile = data.mobile;
                mobile.domain = data.domain;
                mobile.platform = "mobile";
                mobile.serialNumber = (i+1);
                allDatas.push(mobile);
            }
        }
        xTable.value.table.tableAllData = allDatas;
        xTable.value.table.total = allDatas.length;
        xTable.value.onPageIndexChange(1);
    });
}

function exportToLocation() {
    if (queryParam.domains.trim().length === 0) {
        showErrorNotification('请输入需要查询的网站域名！');
        return;
    }
    let data = {
        type: queryParam.searchEngines,
        domains: queryParam.domains.split("\n").filter(domain => domain.trim().length > 0).map(domain => domain.trim())
    };
    isDownloadFile.value = true;
    download("/api/sites/export/rank", data, "导出文件.xlsx", () => {
        isDownloadFile.value = false;
    });
}

/**
 * 合并单元格逻辑
 */
function spanMethod({record, column, rowIndex, columnIndex}) {
    if (!xTable.value.table.tableCurrData){
        return {rowspan: 0, colspan: 0};
    }
    if (column.dataIndex === 'domain') {
        if (rowIndex === 0 || (record.domain !== xTable.value.table.tableCurrData[rowIndex - 1].domain)){
            const count = xTable.value.table.tableCurrData.filter((item) => item.domain === record.domain).length;
            return {
                rowspan: count,
                colspan: 1,
            };
        }else {
            return {rowspan: 0, colspan: 0};
        }
    }
    if (column.dataIndex === 'serialNumber') {
        if (rowIndex === 0 || (record.serialNumber !== xTable.value.table.tableCurrData[rowIndex - 1].serialNumber)){
            const count = xTable.value.table.tableCurrData.filter((item) => item.serialNumber === record.serialNumber).length;
            return {
                rowspan: count,
                colspan: 1,
            };
        }else {
            return {rowspan: 0, colspan: 0};
        }
    }
    return {rowspan: 1, colspan: 1}; // 默认不合并
}

</script>

<style scoped>

</style>