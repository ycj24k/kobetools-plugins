<template>
    <div class="">
        <a-form class="form_box" layout="vertical" hide-label>
            <div class="flex_box">
                <div class="form_title">{{ localeGet('title1') }}</div>
                <a-radio-group v-model="uploadType" :options="translatedUploadTypeOptions"></a-radio-group>
            </div>
            <div v-if="uploadType === 1" class="flex_box search_box">
                <div class="search_area">
                    <XTextarea v-model="group1Keywords" :placeholder="localeGet('placeholder1')" />
                </div>
                <div class="search_line1"></div>
                <div class="search_area">
                    <XTextarea v-model="group2Keywords" :placeholder="localeGet('placeholder2')" />
                </div>
                <div class="search_line1"></div>
                <div class="search_area">
                    <XTextarea v-model="group3Keywords" :placeholder="localeGet('placeholder3')" />
                </div>
            </div>
            <div v-if="uploadType === 2" class="upload_box">
                <div class="flex_box" style="gap: 20px;">
                    <a target="_blank"
                        href="https://kobetools-shenzhen.oss-cn-shenzhen.aliyuncs.com/res/template/keyword-categorization-tools.csv">{{ localeGet('tip1') }}</a>
                    <div class="upload_tip">{{ localeGet('tip2') }}</div>
                </div>
                <a-upload ref="uploadRef" :show-cancel-button="false" @change="uploadChange" draggable
                    :auto-upload="false" :limit="1" action="/" accept=".csv" :file-list="fileList"
                    :show-file-list="true" :show-upload-button="true" :custom-request="() => { }" />
            </div>
            <a-grid>
                <a-grid-item :span="24">
                    <div class="form_item">
                        <a-grid :col-gap="20">
                            <a-grid-item :span="8">
                                <div class="flex_box form_item_radio form_item_radio_flex">
                                    <div class="form_title"><span style="color: #ff0000">*</span>{{ localeGet('title2') }}</div>
                                    <a-form-item no-style>
                                        <a-checkbox-group v-model="compareGroups" :options="translatedGroupOptions">
                                        </a-checkbox-group>
                                    </a-form-item>
                                </div>
                            </a-grid-item>
                            <a-grid-item :span="16">
                                <div class="flex_box form_item_radio form_item_radio_flex">
                                    <div class="form_title"><span style="color: #ff0000">*</span>{{ localeGet('title3') }}</div>
                                    <a-form-item no-style>
                                        <a-radio-group v-model="compareType" :options="translatedTypeOptions">
                                        </a-radio-group>
                                    </a-form-item>
                                </div>
                            </a-grid-item>
                        </a-grid>
                    </div>
                    <div class="form_item" v-if="compareType === 'MUST_CONTAIN' || compareType === 'CANNOT_CONTAIN'">
                        <a-grid :col-gap="20" :row-gap="10" class="form_content">
                            <a-grid-item :span="24" class="flex_box form_content_item">
                                <div class="form_content_input">
                                    <a-textarea v-model="matchKeywords" class="form_area" :placeholder="localeGet('placeholder1')"
                                        allow-clear />
                                </div>
                            </a-grid-item>
                        </a-grid>
                    </div>
                </a-grid-item>
            </a-grid>
        </a-form>
        <div style="height: 100px; display: flex; align-items: center;">
            <div style="width: 500px;">
                <XButton @xClick="queryTableData" color="purple_blue_pink" :text="localeGet('button1')" />
            </div>
            <div style="flex: 1; display: flex; gap: 12px; justify-content: flex-end">
                <XButton :loading="isDownloadFile" @xClick="exportRecordKeepingDomains" color="blue" :text="localeGet('button2')" />
            </div>
        </div>
        <div style="height: 400px;">
            <x-custom-table ref="xCustomTable" />
        </div>
    </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { Message } from '@arco-design/web-vue';
import XButton from "@/components/common/XButton.vue";
import XTextarea from "@/components/common/XTextarea.vue";
import XCustomTable from "@/components/common/XCustomTable.vue";
import { showErrorNotification } from "@/hooks/useNotification";
import { handleExport } from '@/utils';
import { useI18n } from '../../../keyword/utils/i18n';
import localZhCN from '../zh-CN.js';

const props = defineProps({ locales: { type: Object, default: {} } });
const { localeGet, translateOptions, updateLocales } = useI18n(localZhCN);
watch(() => props.locales, (v) => { if (v) updateLocales(v); }, { immediate: true });

// let group1Keywords = ref("SEO优化\nAbout\n关键词");
// let group2Keywords = ref("seo优化\nABOUT\n推广");
// let group3Keywords = ref("广告\nSEO优化\n关键词");
let group1Keywords = ref("");
let group2Keywords = ref("");
let group3Keywords = ref("");
let compareGroups = ref([]);
let compareType = ref('');
let matchKeywords = ref('');
let xCustomTable = ref(null);
let isDownloadFile = ref(false);
const uploadType = ref(1);
const fileList = ref([]);
const uploadRef = ref(null);
const uploadTypeOptions = [{ label: 'uploadTypeOptions.label1', value: 1 }, { label: 'uploadTypeOptions.label2', value: 2 }];
const translatedUploadTypeOptions = translateOptions(uploadTypeOptions);
// 监听上传类型变化，清空文件列表
watch(uploadType, (newType) => {
    if (newType === 1) {
        fileList.value = [];
    }
});
// 上传改变
const uploadChange = (res) => {
    fileList.value = res;
    if (res[0]) {
        // 基础文件验证
        const file = res[0].file;
        if (!file) {
            Message.error(localeGet('message1'));
            fileList.value = [];
            return;
        }

        // 检查文件大小（限制为10MB）
        // const maxSize = 10 * 1024 * 1024; // 10MB
        // if (file.size > maxSize) {
        //   Message.error('文件大小不能超过10MB');
        //   fileList.value = [];
        //   return;
        // }

        // 检查文件类型
        const allowedTypes = ['.csv'];
        const fileName = file.name.toLowerCase();
        const isValidType = allowedTypes.some(type => fileName.endsWith(type));

        if (!isValidType) {
            Message.error(localeGet('message2'));
            fileList.value = [];
            return;
        }

        console.log('文件验证通过:', {
            name: file.name,
            size: file.size,
            type: file.type
        });
    }
};

const groupOptions = [
    { label: 'compareGroupOptions.label1', value: 1 },
    { label: 'compareGroupOptions.label2', value: 2 },
    { label: 'compareGroupOptions.label3', value: 3 },
];
const translatedGroupOptions = translateOptions(groupOptions);

const typeOptions = [
    { label: 'compareTypeOptions.label1', value: 'EXACT_SAME' },
    { label: 'compareTypeOptions.label2', value: 'COMPLETELY_DIFFERENT' },
    { label: 'compareTypeOptions.label3', value: 'MUST_CONTAIN' },
    { label: 'compareTypeOptions.label4', value: 'CANNOT_CONTAIN' },
    { label: 'compareTypeOptions.label5', value: 'MERGE_DEDUPLICATE' },
];
const translatedTypeOptions = translateOptions(typeOptions);

function queryTableData() {
    // 验证需求关键词
    if (compareType.value === 'MUST_CONTAIN' || compareType.value === 'CANNOT_CONTAIN') {
        if (!matchKeywords.value.trim()) {
            showErrorNotification(localeGet('message4'));
            return;
        }
    } else {
        matchKeywords.value = '';
    }

    // 准备基础数据
    const data = {
        group1Keywords: [],
        group2Keywords: [],
        group3Keywords: [],
        compareGroups: compareGroups.value,
        compareType: compareType.value,
        matchKeywords: [],
    };

    // 处理关键词数据
    data.group1Keywords = group1Keywords.value.split("\n").filter(keyword => keyword.trim().length > 0).map(keyword => keyword.trim());
    data.group2Keywords = group2Keywords.value.split("\n").filter(keyword => keyword.trim().length > 0).map(keyword => keyword.trim());
    data.group3Keywords = group3Keywords.value.split("\n").filter(keyword => keyword.trim().length > 0).map(keyword => keyword.trim());
    data.matchKeywords = matchKeywords.value.split("\n").filter(keyword => keyword.trim().length > 0).map(keyword => keyword.trim());

    if (uploadType.value === 1) {
        // 手动录入模式验证
        if (compareGroups.value.length < 2) {
            showErrorNotification(localeGet('message5'));
            return;
        }
        if (!compareType.value) {
            showErrorNotification(localeGet('message6'));
            return;
        }
        if (compareGroups.value.includes(1) && data.group1Keywords.length === 0) {
            showErrorNotification('请输入第一组关键词，一行一个');
            return;
        }
        if (compareGroups.value.includes(2) && data.group2Keywords.length === 0) {
            showErrorNotification('请输入第二组关键词，一行一个');
            return;
        }
        if (compareGroups.value.includes(3) && data.group3Keywords.length === 0) {
            showErrorNotification('请输入第三组关键词，一行一个');
            return;
        }

        console.log('开始手动录入对比:', data);
        xCustomTable.value.queryTableData("/api/front/keyword-compare/compare", data);
    }

    if (uploadType.value === 2) {
        // 文件上传模式验证
        if (fileList.value.length === 0 || !fileList.value[0].file) {
            showErrorNotification(localeGet('message7'));
            return;
        }

        if (!compareType.value) {
            showErrorNotification(localeGet('message6'));
            return;
        }

        // 构建FormData
        const formData = new FormData();
        formData.append('csvFile', fileList.value[0].file);
        formData.append('compareType', data.compareType);
        // matchKeywords 为数组，使用重复 key 传参
        data.matchKeywords.forEach((v) => formData.append('matchKeywords', v));

        console.log('开始文件上传对比:', {
            fileName: fileList.value[0].file.name,
            fileSize: fileList.value[0].file.size,
            compareType: data.compareType,
            matchKeywords: data.matchKeywords.length
        });

        xCustomTable.value.queryTableData("/api/front/keyword-compare/compare-files", formData);
    }
}

function exportRecordKeepingDomains() {
    if (xCustomTable.value.table.tableCurrData.length === 0) {
        showErrorNotification(localeGet('message8'));
        return;
    }
    handleExport(xCustomTable.value.table.tableCurrData, xCustomTable.value.selectedKeys, xCustomTable.value.columns, '', 'csv')
}

</script>

<style lang="less" scoped>
@import '@/assets/style/form.less';

.search_box {
    height: 500px;
    align-items: stretch;

    .search_area {
        width: calc(33% - 40px);
    }

    .search_line1 {
        width: 1px;
        background-color: #eee;
        margin: 0 40px;
    }

    .search_line2 {
        width: 1px;
        background-color: #eee;
        margin: 0 20px;
    }
}

.upload_box {

    :deep(.arco-upload-progress) {
        display: none;
    }

    .upload_tip {
        font-size: 13px;
        color: #999;
        text-align: center;
        line-height: 40px;
    }
}
</style>