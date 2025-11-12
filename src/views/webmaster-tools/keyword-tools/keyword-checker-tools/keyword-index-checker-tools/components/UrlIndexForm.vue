<template>
    <div class="keyword-index-form">
        <div class="keyword-index-form__spacer-xs"></div>
        <div class="keyword-index-form__filter-row">
            <div class="keyword-index-form__label">站点域名</div>
            <a-input
                class="keyword-index-form__input"
                placeholder="请输入站点域名，如：www.google.com"
                allow-clear
            />
            <div class="keyword-index-form__label">搜索引擎</div>
            <a-radio-group class="keyword-index-form__radio-group">
                <a-radio
                    v-for="sEngines in searchEngines"
                    :key="sEngines.code"
                    :disabled="sEngines.disabled"
                    :value="sEngines.code"
                    class="keyword-index-form__radio"
                >
                    {{ sEngines.name }}
                </a-radio>
            </a-radio-group>
        </div>
        <div class="keyword-index-form__spacer-md"></div>
        <div class="keyword-index-form__textarea">
            <XTextarea v-model="domains" placeholder="请输入需要查询索引的关键词，一行一个，一次最多提交100个"/>
        </div>
        <div class="keyword-index-form__actions">
            <div class="keyword-index-form__actions-left">
                <XButton :loading="xTable?.table?.isLoadTable" @xClick="queryTableData" color="purple_blue_pink"
                         text="立即查询"/>
            </div>
            <div class="keyword-index-form__actions-right">
                <XButton :loading="isDownloadFile" @xClick="exportToLocation" color="blue" text="导出查询结果"/>
                <XButton color="pink" text="VIP查询通道"/>
            </div>
        </div>
        <div class="keyword-index-form__table">
            <XTable ref="xTable" :columns="columns" />
        </div>
    </div>
</template>

<script setup>
import {ref} from "vue";
import XButton from "@/components/common/XButton.vue";
import XTextarea from "@/components/common/XTextarea.vue";
import {showErrorNotification} from "@/hooks/useNotification";
import XTable from "@/components/common/XTable.vue";
import { handleExport } from '@/utils';

let columns = [
    {
        title: '序号',
        dataIndex: 'serialNumber',
        width: 100
    },
    {
        title: '网站域名',
        dataIndex: 'domain',
        minWidth: 200
    },
    {
        title: '关键词',
        dataIndex: 'contactPerson',
        width: 300
    },
    {
        title: '搜索引擎',
        dataIndex: 'registrar',
        minWidth: 150
    },
    {
        title: '搜索状态',
        dataIndex: 'email',
        minWidth: 230
    },
    {
        title: '查询时间',
        dataIndex: 'creationDate',
        minWidth: 200
    },
    {
        title: '操作',
        dataIndex: 'age',
        minWidth: 150
    }
];

let searchEngines = [
    {code: "google", name: "谷歌", disabled: false},
    {code: "baidu", name: "百度", disabled: false},
    {code: "bing", name: "必应", disabled: false},
    {code: "yandex", name: "Yandex", disabled: false}
];

let xTable = ref(null);
let domains = ref("");
let isDownloadFile = ref(false);

function queryTableData() {
    if (domains.value.trim().length === 0){
        showErrorNotification('请输入需要查询的域名信息！');
        return;
    }
    let data = domains.value.split("\n").filter(domain => domain.trim().length>0).map(domain => domain.trim());
    xTable.value.queryTableData("/api/beian/query/intercept", data);
}

function exportToLocation(){
    if (xTable.value.table.tableCurrData.length === 0) {
        showErrorNotification('未获取到查询结果');
        return;
    }
    handleExport(xTable.value.table.tableCurrData, xTable.value.selectedKeys, columns, '', 'csv')
}

</script>

<style lang="less" scoped>
.keyword-index-form {
    display: flex;
    flex-direction: column;
    height: 100%;

    &__spacer-xs {
        height: 12px;
    }

    &__spacer-md {
        height: 25px;
    }

    &__filter-row {
        display: flex;
        align-items: center;
        gap: 8px;
        flex-wrap: wrap;
    }

    &__label {
        font-weight: 600;
    }

    &__input {
        width: 320px;
        margin-right: 20px;
    }

    &__radio-group {
        display: flex;
        flex-wrap: wrap;
        column-gap: 20px;
        row-gap: 12px;
        margin-left: 20px;
    }

    &__radio {
        font-weight: 400;
    }

    &__textarea {
        height: 200px;
    }

    &__actions {
        height: 100px;
        display: flex;
        align-items: center;
        gap: 12px;
    }

    &__actions-left {
        width: 500px;
    }

    &__actions-right {
        flex: 1;
        display: flex;
        gap: 12px;
        justify-content: flex-end;
    }

    &__table {
        height: 400px;
        display: flex;
        flex-direction: column;
    }
}
</style>