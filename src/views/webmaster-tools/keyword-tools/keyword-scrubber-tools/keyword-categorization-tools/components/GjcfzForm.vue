<template>
    <div>
        <div class="flex_box search_box">
            <div class="search_area1">
                <div class="flex_box">
                    <div class="form_title">{{ localeGet('title1') }}</div>
                    <a-radio-group v-model="uploadType" :options="translatedUploadTypeOptions"></a-radio-group>
                </div>
                <div v-if="uploadType === 1" style="height: calc(100% - 40px);">
                    <XTextarea v-model="allKeywords" :placeholder="localeGet('placeholder1')" />
                </div>
                <div v-if="uploadType === 2" class="upload_box">
                    <div class="flex_box flex_row_between">
                        <a target="_blank" href="https://kobetools-shenzhen.oss-cn-shenzhen.aliyuncs.com/res/template/keyword-comparison-tools.csv">{{ localeGet('tip1') }}</a>
                        <div class="upload_tip">{{ localeGet('tip2') }}</div>
                    </div>
                    <a-upload ref="uploadRef" :show-cancel-button="false" @change="uploadChange" draggable
                        :auto-upload="false" :limit="1" action="/" accept=".csv" :file-list="fileList"
                        :show-file-list="true" :show-upload-button="true" :custom-request="() => { }" />
                </div>
            </div>
            <div class="search_line1"></div>
            <div class="search_area2">
                <XTextarea v-model="singleMatchWords" :placeholder="localeGet('placeholder2')" />
            </div>
            <div class="search_line2"></div>
            <div class="search_area2">
                <XTextarea v-model="combinedMatchWords" :placeholder="localeGet('placeholder3')" />
            </div>
        </div>
        <div class="flex_box flex_row_between table_btns">
            <div>
                <XButton :loading="xCustomTable?.table?.isLoadTable" @xClick="queryTableData" color="purple_blue_pink"
                    :text="localeGet('button1')" />
            </div>
            <div>
                <XButton :loading="isDownloadFile" @xClick="exportRecordKeepingDomains" color="blue" :text="localeGet('button2')" />
            </div>
        </div>
        <div class="tableBox">
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

// 多语言
const props = defineProps({
  locales: {
    type: Object,
    default: {},
  },
});

const { localeGet, translateOptions, updateLocales } = useI18n(localZhCN);
watch(() => props.locales, (v) => { if (v) updateLocales(v); }, { immediate: true });

// 选择方式选项
const uploadTypeOptions = [
    { label: 'uploadTypeOptions.label1', value: 1 },
    { label: 'uploadTypeOptions.label2', value: 2 },
];
const translatedUploadTypeOptions = translateOptions(uploadTypeOptions);

let allKeywords = ref("");
let singleMatchWords = ref("");
let combinedMatchWords = ref("");
let xCustomTable = ref(null);
let isDownloadFile = ref(false);
const uploadType = ref(1);
const fileList = ref([]);
const uploadRef = ref(null);
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
    //   Message.error(localeGet('message3'));
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

function queryTableData() {
    // 准备基础数据
    const data = {
        allKeywords: [],
        singleMatchWords: [],
        combinedMatchWords: [],
    };
    
    // 处理关键词数据
    data.allKeywords = allKeywords.value.split("\n").filter(keyword => keyword.trim().length > 0).map(keyword => keyword.trim());
    data.singleMatchWords = singleMatchWords.value.split("\n").filter(keyword => keyword.trim().length > 0).map(keyword => keyword.trim());
    data.combinedMatchWords = combinedMatchWords.value.split("\n").filter(keyword => keyword.trim().length > 0).map(keyword => keyword.trim());
    
    if (uploadType.value === 1) {
        // 手动录入模式验证
        if (data.allKeywords.length === 0) {
            showErrorNotification(localeGet('message4'));
            return;
        }
        if (data.singleMatchWords.length === 0 && data.combinedMatchWords.length === 0) {
            showErrorNotification(localeGet('message5'));
            return;
        }
        console.log('开始手动录入查询:', data);
        xCustomTable.value.queryTableData("/api/front/keyword/filter/group", data);
    }
    
    if (uploadType.value === 2) {
        // 文件上传模式验证
        if (fileList.value.length === 0 || !fileList.value[0].file) {
            showErrorNotification(localeGet('message6'));
            return;
        }
        
        // 验证后两项至少填一个
        if (data.singleMatchWords.length === 0 && data.combinedMatchWords.length === 0) {
            showErrorNotification(localeGet('message5'));
            return;
        }
        
        // 构建FormData
        const formData = new FormData();
        formData.append('csvFile', fileList.value[0].file);
        // 后端按数组字段约定接收：singleMatchWords[]=a&singleMatchWords[]=b
        data.singleMatchWords.forEach((v) => formData.append('singleMatchWords', v));
        data.combinedMatchWords.forEach((v) => formData.append('combinedMatchWords', v));
        
        console.log('开始文件上传查询:', {
            fileName: fileList.value[0].file.name,
            fileSize: fileList.value[0].file.size,
            singleMatchWords: data.singleMatchWords,
            combinedMatchWords: data.combinedMatchWords
        });
        
        xCustomTable.value.queryTableData("/api/front/keyword/filter/group/file", formData);
    }
}

function exportRecordKeepingDomains() {
    if (xCustomTable.value.table.tableCurrData.length === 0) {
        showErrorNotification(localeGet('message7'));
        return;
    }
    handleExport(xCustomTable.value.table.tableCurrData, xCustomTable.value.selectedKeys, xCustomTable.value.columns, '', 'csv')
}

</script>

<style lang="less" scoped>
.search_box {
    height: 500px;
    align-items: stretch;

    .search_area1 {
        width: calc(50% - 40px);
    }

    .search_area2 {
        width: calc(25% - 40px);
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

.table_btns {
    height: 100px;
}

.tableBox {
    height: calc(100vh - 700px);
}
.form_item {
    height: 44px;
}
.form_title {
    width: 100px;
    line-height: 44px;
    font-size: 14px;
    font-weight: 500;
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