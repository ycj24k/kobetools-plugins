<template>
    <div style="display: flex; flex-direction: column; height: 100%;">
        <div style="height: 12px;"></div>
        <div style="display: flex; gap: 12px;">
            <div style="display: flex; gap: 12px; width: 150px;">
                <div style="font-weight: bold; color: #6886f1; cursor: pointer" @click="allSelect">全选</div>
                <div style="font-weight: bold; color: #6886f1; cursor: pointer" @click="revoltSelect">反选</div>
                <div style="font-weight: bold; color: #6886f1; cursor: pointer" @click="queryParam.platforms=[];queryParam.searchEngines=[];">清除</div>
            </div>
            <div style="display: flex; gap: 12px; width: 350px;">
                <div style="font-weight: bold">站长平台</div>
                <a-checkbox-group v-model="queryParam.platforms">
                    <a-checkbox v-for="platform in platforms" :value="platform.code">{{platform.name}}</a-checkbox>
                </a-checkbox-group>
            </div>
            <div style="display: flex; gap: 12px; flex: 1">
                <div style="font-weight: bold">搜索引擎</div>
                <a-checkbox-group v-model="queryParam.searchEngines">
                    <a-checkbox v-for="sEngines in searchEngines" :value="sEngines.code">{{ sEngines.name }}</a-checkbox>
                </a-checkbox-group>
            </div>
        </div>
        <div style="height: 8px;"></div>
        <div style="flex: 1;">
            <XTextarea v-model="queryParam.domains"
                       placeholder="请输入需要查询的网站域名，一行一个，单词最多提交100个，格式如：www.google.com"/>
        </div>
        <div style="height: 100px; display: flex; align-items: center;">
            <div style="width: 500px;">
                <XButton :loading="xTable?.table?.isLoadTable" @xClick="queryTableData" color="purple_blue_pink"
                         text="立即查询"/>
            </div>
            <div style="flex: 1; display: flex; gap: 12px; justify-content: flex-end">
                <XButton :loading="isDownloadFile" @xClick="exportTableData" color="blue" text="导出查询数据"/>
                <XButton color="yellow" text="导出详细数据"/>
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
import {useHttp} from "@/hooks/useHttp";
import {Message} from "@arco-design/web-vue";
import XTable from "@/components/common/XTable.vue";
import XCapsuleTag from "@/components/common/XCapsuleTag.vue";

let {download} = useHttp();

let platforms = [
    {code: "az", name: "爱站"},
    {code: "zz", name: "站长工具"},
];

let searchEngines = [
    {code: "baidu", name: "百度"},
    {code: "so", name: "360"},
    {code: "sogou", name: "搜狗"},
    {code: "sm", name: "神马"},
    {code: "toutiao", name: "头条"},
    {code: "bing", name: "必应"},
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
    platforms: ['az'],
    searchEngines: ['baidu'],
    domains: ""
});

function queryTableData() {

    /*xTable.value.setData({
        "code": 0,
        "status": "success",
        "data": [
            {
                "domain": "aizhan.com",
                "pc": {
                    "sum": 140806,
                    "weight": "6",
                    "ip": "91483 ~ 113386",
                    "t0": "30649",
                    "t1": "65118",
                    "t2": "90415",
                    "t3": "116467",
                    "t4": "140806"
                },
                "mobile": {
                    "sum": 130165,
                    "weight": "7",
                    "ip": "142297 ~ 196183",
                    "t0": "27132",
                    "t1": "49592",
                    "t2": "78335",
                    "t3": "105217",
                    "t4": "130165"
                }
            }
        ],
        "count": 1,
        "successCount": 1,
        "failCount": 0,
        "msg": "请求成功"
    }, (result) => {
        let datas = result.data;
        console.log(datas)
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
        console.log(allDatas)
        xTable.value.table.tableAllData = allDatas;
        xTable.value.table.total = allDatas.length;
        xTable.value.onPageIndexChange(1);
    })*/




    if (queryParam.platforms.length === 0 || queryParam.searchEngines.length === 0 || queryParam.domains.trim().length === 0) {
        Message.error("站长平台和搜索引擎分别至少选择一个，查询的网站域名不能为空");
        return;
    }
    let data = queryParam.domains.split("\n").filter(domain => domain.trim().length > 0).map(domain => domain.trim());

    // 是转换下结果
    xTable.value.queryTableData("/api/sites/query/weight", data, (result) => {
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

function exportTableData() {
    if (queryParam.platforms.length === 0 || queryParam.searchEngines.length === 0 || queryParam.domains.trim().length === 0) {
        Message.error("站长平台和搜索引擎分别至少选择一个，查询的网站域名不能为空");
        return;
    }
    let data = queryParam.domains.split("\n").filter(domain => domain.trim().length > 0).map(domain => domain.trim());
    isDownloadFile.value = true;
    download("/api/sites/export/weight", data, "导出文件.xlsx", () => {
        isDownloadFile.value = false;
    });
}

// 全选
function allSelect() {
    queryParam.platforms = platforms.map(platform => platform.code);
    queryParam.searchEngines = searchEngines.map(sEngines => sEngines.code);
}

// 反选
function revoltSelect() {
    queryParam.platforms = platforms
        .filter(platform => !queryParam.platforms.includes(platform.code))
        .map(platform => platform.code);

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