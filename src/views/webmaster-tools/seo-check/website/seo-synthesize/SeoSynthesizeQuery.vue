<template>
    <div style="display: flex; flex-direction: column; height: 100%;">
        <div style="height: 12px;"></div>
        <div style="display: flex; gap: 12px;">
            <div style="display: flex; gap: 12px; width: 150px;">
                <!-- <div style="font-weight: bold; color: #6886f1; cursor: pointer" @click="allSelect">全选</div>
                <div style="font-weight: bold; color: #6886f1; cursor: pointer" @click="revoltSelect">反选</div> -->
                <div style="font-weight: bold; color: #6886f1; cursor: pointer" @click="queryParam.platforms='';queryParam.searchEngines='';">清除</div>
            </div>
            <div style="display: flex; gap: 12px; width: 300px;">
                <div style="font-weight: bold">站长平台</div>
                <a-radio-group v-model="queryParam.platforms">
                    <a-radio v-for="platform in platforms" :key="platform.code" :value="platform.code">{{platform.name}}</a-radio>
                </a-radio-group>
            </div>
            <div style="display: flex; gap: 12px; flex: 1">
                <div style="font-weight: bold">搜索引擎</div>
                <a-radio-group v-model="queryParam.searchEngines">
                    <a-radio style="margin-left: 30px" v-for="sEngines in searchEngines" :key="sEngines.code" :value="sEngines.code">{{ sEngines.name }}</a-radio>
                </a-radio-group>
            </div>
        </div>
        <div style="height: 25px;"></div>
        <div style="flex: 1;">
            <XTextarea v-model="queryParam.domains"
                       placeholder="请输入需要查询的网址，单次最多10个网站，如：www.google.com，一行一个，请勿出现空行或空格"/>
        </div>
        <div style="height: 100px; display: flex; align-items: center;">
            <div style="width: 500px;">
                <XButton :loading="xTable?.table?.isLoadTable" @xClick="queryTableData" color="purple_blue_pink"
                         text="立即查询"/>
            </div>
            <div style="flex: 1; display: flex; gap: 12px; justify-content: flex-end">
                <XButton :loading="isDownloadFile" @xClick="exportTableData" color="blue" text="导出查询数据"/>
                <!-- <XButton color="yellow" text="导出详细数据"/> -->
                <XButton color="pink" text="VIP查询通道"/>
            </div>
        </div>
        <div style="height: 400px;">
            <XTable ref="xTable" :columns="columns" :spanMethod="spanMethod">
            </XTable>
        </div>
    </div>
</template>

<script setup>
import {computed, reactive, ref} from "vue";
import XButton from "@/components/common/XButton.vue";
import XTextarea from "@/components/common/XTextarea.vue";
import {download} from "@/hooks/useHttp";
import XTable from "@/components/common/XTable.vue";
import XCapsuleTag from "@/components/common/XCapsuleTag.vue";
import {showErrorNotification} from "@/hooks/useNotification";
import { getExportName } from "@/utils";

let platforms = [
    {code: "az", name: "爱站"},
    {code: "zz", name: "站长工具"},
];

let searchEngines = [
    {code: 'baidu', name: '百度', disabled: false},
    // {code: 'google', name: '谷歌', disabled: false},
    {code: 'bing', name: '必应', disabled: false},
    {code: '360', name: '360', disabled: false},
    {code: 'sogou', name: '搜狗', disabled: false},
    {code: 'sm', name: '神马', disabled: false},
    {code: 'toutiao', name: '头条', disabled: false},
    // {code: 'yahu', name: '雅虎', disabled: false},
    // {code: 'yandex', name: 'Yandex', disabled: false}
];


let queryParam = reactive({
    platforms: 'az',
    searchEngines: 'baidu',
    domains: ''
});

let allSearchEngines = [
    {
        title: 'PC权重',
        code: ['baidu', 'bing', '360', 'sogou'],
        dataIndex: 'weight',
        slotName: 'weight',
        minWidth: 100
    },
    {
        title: '移动权重',
        code: ['baidu', '360', 'sogou', 'sm', 'toutiao'],
        dataIndex: 'weight',
        slotName: 'weight',
        minWidth: 100
    },
    {
        title: 'PC词库',
        code: ['baidu', 'bing', '360', 'sogou'],
        dataIndex: 'weight',
        slotName: 'weight',
        minWidth: 100
    },
    {
        title: '移动词库',
        code: ['baidu', '360', 'sogou', 'sm', 'toutiao'],
        dataIndex: 'weight',
        slotName: 'weight',
        minWidth: 100
    },
    {
        title: 'PC预估流量',
        code: ['baidu', 'bing', '360', 'sogou'],
        dataIndex: 'weight',
        slotName: 'weight',
        minWidth: 100
    },
    {
        title: '移动预估流量',
        code: ['baidu', '360', 'sogou', 'sm', 'toutiao'],
        dataIndex: 'weight',
        slotName: 'weight',
        minWidth: 100
    },
    {
        title: '网站收录',
        code: ['baidu', 'bing', '360', 'sogou'],
        dataIndex: 'weight',
        slotName: 'weight',
        minWidth: 100
    },
    {
        title: '日收录',
        code: ['baidu'],
        dataIndex: 'weight',
        slotName: 'weight',
        minWidth: 100
    },
    {
        title: '周收录',
        code: ['baidu'],
        dataIndex: 'weight',
        slotName: 'weight',
        minWidth: 100
    },
    {
        title: '月收录',
        code: ['baidu'],
        dataIndex: 'weight',
        slotName: 'weight',
        minWidth: 100
    },
];

let columns = computed(()=>{
    return [
        {
            title: '序号',
            dataIndex: 'serialNumber',
            width: 100,
        },
        {
            title: '网址',
            dataIndex: 'domain',
            minWidth: 200
        },
        // {
        //     title: '站长平台',
        //     dataIndex: 'platform',
        //     width: 100
        // },
        ... allSearchEngines.filter(sEngines => sEngines.code.includes(queryParam.searchEngines)),
        {
            title: '备案信息',
            dataIndex: 'icp',
            minWidth: 200
        },
        {
            title: '域名年龄',
            dataIndex: 'age',
            width: 100
        },
        {
            title: '首页标题',
            dataIndex: 'title',
            minWidth: 100
        },
    ]
});

let xTable = ref({});

let isDownloadFile = ref(false);


function queryTableData() {

    if (queryParam.platforms.length === 0 || queryParam.searchEngines.length === 0 || queryParam.domains.trim().length === 0) {
        showErrorNotification('站长平台和搜索引擎分别至少选择一个，查询的网站域名不能为空！');
        return;
    }
    let data = queryParam.domains.split("\n").filter(domain => domain.trim().length > 0).map(domain => domain.trim());

    // 是转换下结果
    xTable.value.queryTableData("/api/sites/query/weight", data, (result) => {
        let datas = result.data;
        let allDatas = [];
        for (let i = 0; i < datas.length; i++) {
            let data = datas[i];
            if (data.hasOwnProperty("domainAizhan")){
                let domainAizhan = data.domainAizhan;
                domainAizhan.platform = "爱站";
                domainAizhan.serialNumber = (i+1);
                allDatas.push(domainAizhan);
            }
            if (data.hasOwnProperty("domainZ")){
                let domainZ = data.domainZ;
                domainZ.platform = "站长";
                domainZ.serialNumber = (i+1);
                allDatas.push(domainZ);
            }
        }
        xTable.value.table.tableAllData = allDatas;
        xTable.value.table.total = allDatas.length;
        xTable.value.onPageIndexChange(1);
    });
}

function exportTableData() {
    if (queryParam.platforms.length === 0 || queryParam.searchEngines.length === 0 || queryParam.domains.trim().length === 0) {
        showErrorNotification('站长平台和搜索引擎分别至少选择一个，查询的网站域名不能为空！');
        return;
    }
    let data = queryParam.domains.split("\n").filter(domain => domain.trim().length > 0).map(domain => domain.trim());
    isDownloadFile.value = true;
    const name = getExportName('seoall')
    download("/api/sites/export/weight", data, name + ".xlsx", () => {
        isDownloadFile.value = false;
    });
}

// 全选
function allSelect() {
    queryParam.platforms = 'az'
    queryParam.searchEngines = searchEngines.map(sEngines => sEngines.code);
}

// 反选
function revoltSelect() {
    queryParam.platforms = queryParam.platforms === 'az' ? 'zz' : 'az'
    queryParam.searchEngines = searchEngines
        .filter(sEngines => !queryParam.searchEngines.includes(sEngines.code))
        .map(sEngines => sEngines.code);
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