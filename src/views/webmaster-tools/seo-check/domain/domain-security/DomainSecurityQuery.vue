<template>
    <div style="display: flex; flex-direction: column; height: 100%">
        <div class="query_box">
            <div class="flex_box query_item">
                <div class="query_label"><span style="color: red;">*</span>查询项</div>
                <div class="query_value">
                    <a-checkbox-group v-model="querys" :options="queryOptions"></a-checkbox-group>
                </div>
            </div>
        </div>
        <div style="flex: 1">
            <XTextarea v-model="domains" placeholder="请输入需要查询的域名信息，一行一个，单次最多提交20个，格式如：google.com" />
        </div>
        <div style="height: 100px; display: flex; align-items: center">
            <div style="width: 500px">
                <XButton :loading="xTable?.table?.isLoadTable" @xClick="queryTableData" color="purple_blue_pink"
                    text="立即查询" />
            </div>
            <div style="flex: 1; display: flex; gap: 12px; justify-content: flex-end">
                <XButton :loading="isDownloadFile" @xClick="exportRecordKeepingDomains" color="blue" text="导出查询结果" />
                <XButton color="pink" text="VIP查询通道" />
            </div>
        </div>
        <div style="height: 400px">
            <XTable ref="xTable" :columns="columns">
                <template #bqRes="{ record }">
                    <div
                        :style="{ color: record.bqRes === '是' ? 'red' : '', fontWeight: record.bqRes === '是' ? 700 : 500 }">
                        {{ record.bqRes }}
                    </div>
                </template>
                <template #qqRes="{ record }">
                    <div
                        :style="{ color: record.qqRes === '风险网站' ? 'red' : '', fontWeight: record.qqRes === '风险网站' ? 700 : 500 }">
                        {{ record.qqRes }}
                    </div>
                </template>
                <template #wxRes="{ record }">
                    <div
                        :style="{ color: record.wxRes === '风险网站' ? 'red' : '', fontWeight: record.wxRes === '风险网站' ? 700 : 500 }">
                        {{ record.wxRes }}
                    </div>
                </template>
                <template #bdMessage="{ record }">
                    <div
                        :style="{ color: record.bdMessage === '风险网站' ? 'red' : '', fontWeight: record.bdMessage === '风险网站' ? 700 : 500 }">
                        {{ record.bdMessage }}
                    </div>
                </template>
                <template #baRes="{ record }">
                    <div
                        :style="{ color: record.baRes === '黑名单' ? 'red' : '', fontWeight: record.baRes === '黑名单' ? 700 : 500 }">
                        {{ record.baRes }}
                    </div>
                </template>
            </XTable>
        </div>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import XButton from '@/components/common/XButton.vue';
import XTextarea from '@/components/common/XTextarea.vue';
import XTable from '@/components/common/XTable.vue';
import { showErrorNotification } from '@/hooks/useNotification';
import { handleExport } from '@/utils';
const querys = ref(['bqRes', 'wxRes', 'qqRes', 'bdMessage']);
const queryOptions = [
    {
        label: '是否被墙',
        value: 'bqRes',
    },
    {
        label: '微信安全',
        value: 'wxRes',
    },
    {
        label: 'QQ安全',
        value: 'qqRes',
    },
    {
        label: 'DNS污染',
        value: 'dnsRes',
    },
    {
        label: '备案安全',
        value: 'baRes',
    },
    {
        label: '百度拦截',
        value: 'bdMessage',
    },
    {
        label: '谷歌拦截',
        value: 'googleMessage',
    },
    {
        label: '360拦截',
        value: '360Message',
    },
    {
        label: '搜狗拦截',
        value: 'sougouMessage',
    },
    {
        label: '头条拦截',
        value: 'ttMessage',
    },
    {
        label: '抖音拦截',
        value: 'dyMessage',
    },
    {
        label: '微软Edge拦截',
        value: 'edgeMessage',
    },
];
let columnsDefault = [
    {
        title: '序号',
        dataIndex: 'serialNumber',
        sortable: {
            sortDirections: ['ascend', 'descend'],
        },
        width: 80,
    },
    {
        title: '域名信息',
        dataIndex: 'domain',
        sortable: {
            sortDirections: ['ascend', 'descend'],
        },
        width: 150,
    }
]
const columns = ref([
    ...columnsDefault,
    {
        title: '是否被墙',
        dataIndex: 'bqRes',
        slotName: 'bqRes',
        sortable: {
            sortDirections: ['ascend', 'descend'],
        },
        width: 150,
    },
    {
        title: '微信安全',
        dataIndex: 'wxRes',
        slotName: 'wxRes',
        sortable: {
            sortDirections: ['ascend', 'descend'],
        },
        width: 150,
    },
    {
        title: 'QQ安全',
        dataIndex: 'qqRes',
        slotName: 'qqRes',
        sortable: {
            sortDirections: ['ascend', 'descend'],
        },
        width: 150,
    },
    {
        title: '百度拦截',
        dataIndex: 'bdMessage',
        slotName: 'bdMessage',
        sortable: {
            sortDirections: ['ascend', 'descend'],
        },
        width: 150,
    },
]);

watch(querys, (newValue) => {
    console.log(newValue);
    let list = [...columnsDefault]
    for  (let i = 0; i < queryOptions.length; i++) {
        const element = queryOptions[i];
        if (querys.value.includes(element.value)) {
            list.push({
                title: element.label,
                dataIndex: element.value,
                slotName: element.value,
                sortable: {
                    sortDirections: ['ascend', 'descend'],
                },
                width: 150,
            });
        }
    }
    columns.value = [...list];
});

let domains = ref('');
let xTable = ref(null);
let isDownloadFile = ref(false);

function queryTableData() {
    if (querys.value.length === 0) {
        showErrorNotification('请选择查询项！');
        return;
    }
    if (domains.value.trim().length === 0) {
        showErrorNotification('请输入需要查询的域名信息！');
        return;
    }
    let data = domains.value
        .split('\n')
        .filter((domain) => domain.trim().length > 0)
        .map((domain) => domain.trim());
    xTable.value.queryTableData('/api/beian/query/intercept', {domains: data, checkFlag: querys.value});
}

function exportRecordKeepingDomains() {
    if (xTable.value.table.tableCurrData.length === 0) {
        showErrorNotification('未获取到查询结果');
        return;
    }
    handleExport(xTable.value.table.tableCurrData, xTable.value.selectedKeys, columns.value, '', 'csv');
}
</script>

<style lang="less" scoped>
.query_box {
    .query_item {
        padding: 10px 0 20px;

        .query_label {
            width: 80px;
            font-size: 14px;
            font-weight: bold;
        }

        .query_value {
            width: calc(100% - 100px);
            font-size: 14px;
        }
    }
}
</style>
