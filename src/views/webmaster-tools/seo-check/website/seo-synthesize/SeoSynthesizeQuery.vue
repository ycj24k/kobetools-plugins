<template>
    <div style="display: flex; flex-direction: column; height: 100%;">
        <div style="height: 12px;"></div>
        <div style="display: flex; gap: 12px;">
            <div style="display: flex; gap: 12px; width: 150px;">
                <div style="font-weight: bold; color: #6886f1; cursor: pointer" @click="allSelect">{{ localeGet('button5') }}</div>
                <div style="font-weight: bold; color: #6886f1; cursor: pointer" @click="revoltSelect">{{ localeGet('button6') }}</div>
                <div style="font-weight: bold; color: #6886f1; cursor: pointer" @click="queryParam.platforms=[];queryParam.searchEngines=[];">{{ localeGet('button7') }}</div>
            </div>
            <div style="display: flex; gap: 12px; width: 300px;">
                <div style="font-weight: bold">{{ localeGet('label1') }}</div>
                <a-checkbox-group v-model="queryParam.platforms">
                    <a-checkbox v-for="platform in platforms" :key="platform.code" :value="platform.code">{{platform.label}}</a-checkbox>
                </a-checkbox-group>
            </div>
            <div style="display: flex; gap: 12px; flex: 1">
                <div style="font-weight: bold">{{ localeGet('label2') }}</div>
                <a-checkbox-group v-model="queryParam.searchEngines">
                    <a-checkbox style="margin-left: 30px" v-for="sEngines in searchEngines" :key="sEngines.code" :value="sEngines.code">{{ sEngines.label }}</a-checkbox>
                </a-checkbox-group>
            </div>
        </div>
        <div style="height: 25px;"></div>
        <div style="flex: 1;">
            <XTextarea v-model="queryParam.domains"
                       :placeholder="localeGet('placeholder1')"/>
        </div>
        <div style="height: 100px; display: flex; align-items: center;">
            <div style="width: 500px;">
                <XButton :loading="xTable?.table?.isLoadTable" @xClick="queryTableData" color="purple_blue_pink"
                         :text="localeGet('button1')"/>
            </div>
            <div style="flex: 1; display: flex; gap: 12px; justify-content: flex-end">
                <XButton :loading="isDownloadFile" @xClick="exportTableData" color="blue" :text="localeGet('button2')"/>
                <XButton color="yellow" :text="localeGet('button3')"/>
                <XButton color="pink" :text="localeGet('button4')"/>
            </div>
        </div>
        <div style="height: 400px;">
            <XTable ref="xTable" :columns="columns" :spanMethod="spanMethod">
                <template #BaidupcBr="{ record }">
                    <XCapsuleTag type="baidu" :text="record.BaidupcBr" />
                </template>
                <template #BaiduMobileBr="{ record }">
                    <XCapsuleTag type="baidu_mobile" :text="record.BaiduMobileBr" />
                </template>
                <template #SopcBr="{ record }">
                    <XCapsuleTag type="so" :text="record.SopcBr" />
                </template>
                <template #SoMobileBr="{ record }">
                    <XCapsuleTag type="so" :text="record.SoMobileBr" />
                </template>
                <template #SoGoupcBr="{ record }">
                    <XCapsuleTag type="sougou" :text="record.SoGoupcBr" />
                </template>
                <template #SoGouMobileBr="{ record }">
                    <XCapsuleTag type="sougou" :text="record.SoGouMobileBr" />
                </template>
                <template #SmBr="{ record }">
                    <XCapsuleTag type="sm" :text="record.SmBr" />
                </template>
                <template #TtBr="{ record }">
                    <XCapsuleTag type="toutiao" :text="record.TtBr" />
                </template>
                <template #BingBR="{ record }">
                    <XCapsuleTag type="bing" :text="record.BingBR" />
                </template>

                <template #option>
                    {{ localeGet('detail.text') }}
                </template>
            </XTable>
        </div>
    </div>
</template>

<script setup>
import {computed, reactive, ref, watch} from "vue";
import XButton from "@/components/common/XButton.vue";
import XTextarea from "@/components/common/XTextarea.vue";
import {download} from "@/hooks/useHttp";
import XTable from "@/components/common/XTable.vue";
import XCapsuleTag from "@/components/common/XCapsuleTag.vue";
import {showErrorNotification} from "@/hooks/useNotification";

import { useI18n } from '../../../keyword-tools/keyword/utils/i18n';
import localZhCN from '../zh-CN.js';

const props = defineProps({
    locales: { type: Object, default: {} }
});

const { localeGet, updateLocales, translateOptions } = useI18n(localZhCN);

let platforms = ref([]);
let searchEngines = ref([]);

watch(() => props.locales, (newVal) => {
    if (newVal) updateLocales(newVal);
    platforms.value = translateOptions([
        {code: "az", label: "platforms.az"},
        {code: "zz", label: "platforms.zz"},
    ]);
    searchEngines.value = translateOptions([
        {code: "baidu", label: "searchEngines.baidu", disabled: false},
        {code: "google", label: "searchEngines.google", disabled: false},
        {code: "bing", label: "searchEngines.bing", disabled: false},
        {code: "so", label: "searchEngines.so", disabled: false},
        {code: "sogou", label: "searchEngines.sogou", disabled: false},
        {code: "sm", label: "searchEngines.sm", disabled: false},
        {code: "toutiao", label: "searchEngines.toutiao", disabled: false},
        {code: "yahu", label: "searchEngines.yahu", disabled: false},
        {code: "yandex", label: "searchEngines.yandex", disabled: false}
    ]);
}, { immediate: true });


let queryParam = reactive({
    platforms: ['az'],
    searchEngines: ['baidu'],
    domains: ""
});

const getAllSearchEngines = () => [
    { title: localeGet('columns.label5'), code: 'baidu', dataIndex: 'BaidupcBr', slotName: 'BaidupcBr', width: 100 },
    { title: localeGet('columns.label6'), code: 'baidu', dataIndex: 'BaiduMobileBr', slotName: 'BaiduMobileBr', minWidth: 100 },
    { title: localeGet('columns.label7'), code: 'so', dataIndex: 'SopcBr', slotName: 'SopcBr', minWidth: 100 },
    { title: localeGet('columns.label8'), code: 'so', dataIndex: 'SoMobileBr', slotName: 'SoMobileBr', minWidth: 100 },
    { title: localeGet('columns.label9'), code: 'sogou', dataIndex: 'SoGoupcBr', slotName: 'SoGoupcBr', minWidth: 100 },
    { title: localeGet('columns.label10'), code: 'sogou', dataIndex: 'SoGouMobileBr', slotName: 'SoGouMobileBr', minWidth: 100 },
    { title: localeGet('columns.label11'), code: 'sm', dataIndex: 'SmBr', slotName: 'SmBr', minWidth: 100 },
    { title: localeGet('columns.label12'), code: 'toutiao', dataIndex: 'TtBr', slotName: 'TtBr', minWidth: 100 },
    { title: localeGet('columns.label13'), code: 'bing', dataIndex: 'BingBR', slotName: 'BingBR', minWidth: 100 },
];

let columns = computed(()=>{
    return [
        { title: localeGet('columns.label1'), dataIndex: 'serialNumber', width: 100 },
        { title: localeGet('columns.label2'), dataIndex: 'domain', minWidth: 200 },
        { title: localeGet('columns.label3'), dataIndex: 'platform', width: 100 },
        { title: localeGet('columns.label4'), dataIndex: 'weight', minWidth: 100 },
        ... getAllSearchEngines().filter(sEngines => queryParam.searchEngines.includes(sEngines.code)),
        { title: localeGet('columns.label14'), slotName: 'option', minWidth: 100 },
    ]
});

let xTable = ref({});

let isDownloadFile = ref(false);


function queryTableData() {

    if (queryParam.platforms.length === 0 || queryParam.searchEngines.length === 0 || queryParam.domains.trim().length === 0) {
        showErrorNotification(localeGet('message1'));
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
        showErrorNotification(localeGet('message1'));
        return;
    }
    let data = queryParam.domains.split("\n").filter(domain => domain.trim().length > 0).map(domain => domain.trim());
    isDownloadFile.value = true;
    download("/api/sites/export/weight", data, `KB-results-${Date.now()}.xlsx`, () => {
        isDownloadFile.value = false;
    });
}

// 全选
function allSelect() {
    queryParam.platforms = platforms.value.map(platform => platform.code);
    queryParam.searchEngines = searchEngines.value.map(sEngines => sEngines.code);
}

// 反选
function revoltSelect() {
    queryParam.platforms = platforms.value
        .filter(platform => !queryParam.platforms.includes(platform.code))
        .map(platform => platform.code);

    queryParam.searchEngines = searchEngines.value
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