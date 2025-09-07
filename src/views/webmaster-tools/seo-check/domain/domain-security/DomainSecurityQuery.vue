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
                <template #isBlocked="{ record }">
                    <div
                        :style="{ color: record.isBlocked === '是' ? 'red' : '', fontWeight: record.isBlocked === '是' ? 700 : 500 }">
                        {{ record.isBlocked }}
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
                <template #baiduMessage="{ record }">
                    <div
                        :style="{ color: record.baiduMessage === '风险网站' ? 'red' : '', fontWeight: record.baiduMessage === '风险网站' ? 700 : 500 }">
                        {{ record.baiduMessage }}
                    </div>
                </template>
                <template #beianSecurity="{ record }">
                    <div
                        :style="{ color: record.beianSecurity === '黑名单' ? 'red' : '', fontWeight: record.beianSecurity === '黑名单' ? 700 : 500 }">
                        {{ record.beianSecurity }}
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
const querys = ref(['isBlocked', 'wxSecurity', 'qqSecurity', 'baiduBlock']);
const queryOptions = [
    {
        label: '是否被墙',
        value: 'isBlocked',
        column: 'isBlocked',
    },
    {
        label: '微信安全',
        value: 'wxSecurity',
        column: 'wxRes',
    },
    {
        label: 'QQ安全',
        value: 'qqSecurity',
        column: 'qqRes',
    },
    {
        label: '移动DNS污染',
        value: 'ydDnsPollution',
        column: 'ydDnsMessage',
    },
    {
        label: '备案安全',
        value: 'beianSecurity',
        column: 'baRes',
    },
    {
        label: '百度拦截',
        value: 'baiduBlock',
        column: 'baiduMessage',
    },
    {
        label: '谷歌拦截',
        value: 'googleBlock',
        column: 'googleMessage',
    },
    {
        label: '360拦截',
        value: 'qihu360Block',
        column: 'qh360Message',
    },
    {
        label: '搜狗拦截',
        value: 'sougouBlock',
        column: 'sougouMessage',
    },
    {
        label: '头条拦截',
        value: 'toutiaoBlock',
        column: 'toutiaoMessage',
    },
    {
        label: '抖音拦截',
        value: 'douyinBlock',
        column: 'douyinMessage',
    },
    {
        label: '微软Edge拦截',
        value: 'microsoftEdgeBlock',
        column: 'weiruanMessage',
    },
];
let columnsDefault = [
    {
        title: '序号',
        dataIndex: 'serialNumber',
        sortable: {
            sortDirections: ['ascend', 'descend'],
        },
        width: 90,
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
        dataIndex: 'isBlocked',
        slotName: 'isBlocked',
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
        dataIndex: 'baiduMessage',
        slotName: 'baiduMessage',
        sortable: {
            sortDirections: ['ascend', 'descend'],
        },
        width: 150,
    },
]);

watch(querys, (newValue) => {
    let list = [...columnsDefault]
    for  (let i = 0; i < queryOptions.length; i++) {
        const element = queryOptions[i];
        if (querys.value.includes(element.value)) {
            list.push({
                title: element.label,
                dataIndex: element.column,
                slotName: element.column,
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
