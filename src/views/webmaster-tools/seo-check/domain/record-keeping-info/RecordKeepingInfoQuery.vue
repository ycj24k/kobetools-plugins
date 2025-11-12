<template>
    <div class="domain-layout">
        <div class="domain-layout__textarea">
            <XTextarea v-model="domains" :placeholder="localeGet('placeholder3')" />
        </div>
        <div class="domain-layout__actions">
            <div class="domain-layout__primary">
                <XButton
                    :loading="xTable?.table?.isLoadTable"
                    @xClick="queryTableData"
                    color="purple_blue_pink"
                    :text="localeGet('button1')"
                />
            </div>
            <div class="domain-layout__extra">
                <XButton
                    :loading="isDownloadFile"
                    @xClick="exportRecordKeepingDomains"
                    color="blue"
                    :text="localeGet('button2')"
                />
                <XButton color="pink" :text="localeGet('button5')" />
            </div>
        </div>
        <div class="domain-layout__table">
            <XTable ref="xTable" :columns="resolvedColumns" :locales="localeData" />
        </div>
        <!-- 弹出提示 -->
        <a-modal :mask-closable="false" l :esc-to-close="false" class="modal_box" v-model:visible="tipVisible"
            width="600px">
            <template #title>
                <div class="flex_box modal_title">
                    <div class="modal_title_icon">
                        <icon-info-circle-fill />
                    </div>
                    <div class="modal_title_text">{{ localeGet('title2') }}</div>
                </div>
            </template>
            <div class="modal_content">{{ localeGet('content4') }}</div>
            <template #footer>
                <div class="flex_box flex_row_center modal_footer">
                    <a-button class="modal_btn--plain" @click="tipVisible = false">{{ localeGet('button6') }}</a-button>
                    <a-button class="form_btn3" @click="tipSubmit">{{ localeGet('button7') }}</a-button>
                </div>
            </template>
        </a-modal>
    </div>
</template>

<script setup>
import { ref, watch, computed } from "vue";
import { Message } from '@arco-design/web-vue';
import XButton from "@/components/common/XButton.vue";
import XTextarea from "@/components/common/XTextarea.vue";
import XTable from "@/components/common/XTable.vue";
import { showErrorNotification } from "@/hooks/useNotification";
import { handleExport, validateDomains } from '@/utils';

const props = defineProps({
    locales: {
        type: Object,
        default: {}
    }
});

const localeData = ref(props.locales);
watch(() => props.locales, (newVal) => {
    localeData.value = newVal || {};
}, { immediate: true });

const localeGet = (key) => localeData.value?.[key] ?? key;

const columns = ref([
        {
            title: 'domainColumns.label1',
            dataIndex: 'serialNumber',
            sortable: {
                sortDirections: ['ascend', 'descend']
            },
            width: 80
        },
        {
            title: 'domainColumns.label2',
            dataIndex: 'domain',
            sortable: {
                sortDirections: ['ascend', 'descend']
            },
            width: 150
        },
        {
            title: 'domainColumns.label3',
            dataIndex: 'company',
            width: 300,
            slotName: 'company'
        },
        {
            title: 'domainColumns.label4',
            dataIndex: 'type',
            sortable: {
                sortDirections: ['ascend', 'descend']
            },
            width: 100,
            slotName: 'type'
        },
        {
            title: 'domainColumns.label5',
            dataIndex: 'icp_main',
            width: 150,
            slotName: 'icp_main'
        },
        {
            title: 'domainColumns.label6',
            dataIndex: 'icp',
            sortable: {
                sortDirections: ['ascend', 'descend']
            },
            width: 150,
            slotName: 'icp'
        },
        {
            title: 'domainColumns.label7',
            dataIndex: 'main_id',
            width: 150,
            slotName: 'main_id'
        },
        {
            title: 'domainColumns.label8',
            dataIndex: 'icp_time',
            sortable: {
                sortDirections: ['ascend', 'descend']
            },
            width: 150,
            slotName: 'icp_time'
        },
    ]);

const resolvedColumns = computed(() =>
    columns.value.map(col => ({
        ...col,
        title: localeGet(col.title),
    }))
);
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
    Message.info(localeGet('message4'));
    tipVisible.value = false;
}

function exportRecordKeepingDomains() {
    if (xTable.value.table.tableCurrData.length === 0) {
        showErrorNotification(localeGet('message3'));
        return;
    }
        handleExport(xTable.value.table.tableCurrData, xTable.value.selectedKeys, resolvedColumns.value, '', 'csv')
}

</script>

<style lang="less" scoped>
@import '@/assets/style/table.less';
@import '@/assets/style/domain.less';

.modal_btn--plain {
    color: #333;
    border-color: #e5e6eb;
}
</style>