<template>
    <div style="display: flex; flex-direction: column; height: 100%;">
        <div style="flex: 1;">
            <XTextarea v-model="domains" :placeholder="localeGet('placeholder3')" />
        </div>
        <div style="height: 100px; display: flex; align-items: center;">
            <div style="width: 500px;">
                <XButton :loading="xTable?.table?.isLoadTable" @xClick="queryTableData" color="purple_blue_pink"
                    :text="localeGet('button1')" />
            </div>
            <div style="flex: 1; display: flex; gap: 12px; justify-content: flex-end">
                <XButton :loading="isDownloadFile" @xClick="exportRecordKeepingDomains" color="blue"
                    text="导出查询结果" />
                <XButton color="pink" :text="localeGet('button4')" />
            </div>
        </div>
        <div style="height: 400px;">
            <XTable ref="xTable" :columns="columns" :locales="localeData" />
        </div>
        <!-- 添加storage -->
        <a-modal :mask-closable="false" l :esc-to-close="false" class="modal_box" v-model:visible="tipVisible" width="600px">
        <template #title>
            <div class="flex_box modal_title">
            <div class="modal_title_icon">
                <icon-info-circle-fill />
            </div>
            <div class="modal_title_text">温馨提示</div>
            </div>
        </template>
        <div class="modal_content">您当前日查询额度上限为100个，当前已使用88，更多查询额度可通过升级VIP权限获取。</div>
        <template #footer>
            <div class="flex_box flex_row_center modal_footer">
            <a-button style="color: #333" @click="tipVisible = false">返回查询页面</a-button>
            <a-button class="form_btn3" @click="tipSubmit">升级VIP权限</a-button>
            </div>
        </template>
        </a-modal>
    </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { Message } from '@arco-design/web-vue';
import XButton from "@/components/common/XButton.vue";
import XTextarea from "@/components/common/XTextarea.vue";
import XTable from "@/components/common/XTable.vue";
import { showErrorNotification } from "@/hooks/useNotification";
import { handleExport, validateDomains } from '@/utils';

// 多语言
const props = defineProps({
    locales: {
        type: Object,
        default: {}
    }
});
const localeData = ref(props.locales);
const localeGet = (key) => {
    return localeData.value[key]
}
const columns = ref([]);
// 监听 props 的变化
watch(() => props.locales, (newVal) => {
    localeData.value = newVal;
    columns.value = [
        {
            title: localeGet('domainColumns.label1'),
            dataIndex: 'serialNumber',
            sortable: {
                sortDirections: ['ascend', 'descend']
            },
            width: 80
        },
        {
            title: localeGet('domainColumns.label2'),
            dataIndex: 'domain',
            sortable: {
                sortDirections: ['ascend', 'descend']
            },
            width: 150
        },
        {
            title: localeGet('domainColumns.label3'),
            dataIndex: 'company',
            width: 300,
            slotName: 'company'
        },
        {
            title: localeGet('domainColumns.label4'),
            dataIndex: 'type',
            sortable: {
                sortDirections: ['ascend', 'descend']
            },
            width: 100,
            slotName: 'type'
        },
        {
            title: localeGet('domainColumns.label5'),
            dataIndex: 'icp_main',
            width: 150,
            slotName: 'icp_main'
        },
        {
            title: localeGet('domainColumns.label6'),
            dataIndex: 'icp',
            sortable: {
                sortDirections: ['ascend', 'descend']
            },
            width: 150,
            slotName: 'icp'
        },
        {
            title: localeGet('domainColumns.label7'),
            dataIndex: 'main_id',
            width: 150,
            slotName: 'main_id'
        },
        {
            title: localeGet('domainColumns.label8'),
            dataIndex: 'icp_time',
            sortable: {
                sortDirections: ['ascend', 'descend']
            },
            width: 150,
            slotName: 'icp_time'
        },
    ]
});
// let domains = ref("0001mg.com \n zikaow.com \n qyhyn168.com \n duxufeng.com \n yiyebaofu.com.cn \n allshebei.com \n linkedin.com \n youtube.com \n jimdo.com \n vistaprint.com \n goodreads.com \n blogarama.com \n steinberg.net");
let domains = ref("");
let xTable = ref({});
let isDownloadFile = ref(false);
const tipVisible = ref(false);
function queryTableData() {
    let data = validateDomains(domains.value)
    domains.value = data.join("\n");
    if (domains.value.trim().length === 0) {
        showErrorNotification(localeGet('message1'));
        return;
    }
    
    xTable.value.queryTableData("/api/beian/query/domains", data, () => {
        tipVisible.value = true;
    });
}

function tipSubmit() {
    Message.info('已点击升级VIP权限');
    tipVisible.value = false;
}

function exportRecordKeepingDomains() {
    if (xTable.value.table.tableCurrData.length === 0) {
        showErrorNotification('未获取到查询结果');
        return;
    }
    handleExport(xTable.value.table.tableCurrData, xTable.value.selectedKeys, columns.value, '', 'csv')
}

</script>

<style lang="less" scoped>
@import '@/assets/style/table.less';
</style>