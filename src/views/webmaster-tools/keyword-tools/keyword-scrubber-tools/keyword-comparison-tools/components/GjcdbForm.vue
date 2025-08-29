<template>
    <div class="">
        <a-form class="form_box" layout="vertical" hide-label>
            <div class="flex_box form_item">
                <div class="form_title">选择方式</div>
                <a-radio-group v-model="uploadType" :options="uploadTypeOptions"></a-radio-group>
            </div>
            <div v-if="uploadType === 1" class="flex_box search_box">
                <div class="search_area">
                    <XTextarea v-model="group1Keywords" placeholder="请输入第一组关键词，一行一个" />
                </div>
                <div class="search_line1"></div>
                <div class="search_area">
                    <XTextarea v-model="group2Keywords" placeholder="请输入第二组关键词，一行一个" />
                </div>
                <div class="search_line1"></div>
                <div class="search_area">
                    <XTextarea v-model="group3Keywords" placeholder="请输入第三组关键词，一行一组" />
                </div>
            </div>
            <div v-if="uploadType === 2" class="upload_box">
                <div class="flex_box flex_row_between">
                    <a target="_blank" href="https://kobetools-shenzhen.oss-cn-shenzhen.aliyuncs.com/res/template/keyword-categorization-tools.csv">点击下载示例文件</a>
                    <div class="upload_tip">支持 .csv 格式文件，每行一个关键词</div>
                </div>
                <a-upload ref="uploadRef" :show-cancel-button="false" @change="uploadChange" draggable
                    :auto-upload="false" :limit="1" action="/" accept=".txt,.xlsx,.xls,.csv" :file-list="fileList"
                    :show-file-list="true" :show-upload-button="true" :custom-request="() => { }" />
            </div>
            <a-grid>
                <a-grid-item :span="24">
                    <div class="form_item">
                        <a-grid :col-gap="20">
                            <a-grid-item :span="8">
                                <div class="flex_box form_item_radio form_item_radio_flex">
                                    <div class="form_title"><span style="color: #ff0000">*</span>对比数据</div>
                                    <a-form-item no-style>
                                        <a-checkbox-group v-model="compareGroups" :options="groupOptions">
                                        </a-checkbox-group>
                                    </a-form-item>
                                </div>
                            </a-grid-item>
                            <a-grid-item :span="16">
                                <div class="flex_box form_item_radio form_item_radio_flex">
                                    <div class="form_title"><span style="color: #ff0000">*</span>需求选项</div>
                                    <a-form-item no-style>
                                        <a-radio-group v-model="compareType" :options="typeOptions">
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
                                    <a-textarea v-model="matchKeywords" class="form_area" placeholder="请输入关键词，每行一个关键词"
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
                <XButton @xClick="queryTableData" color="purple_blue_pink"
                    text="立即对比" />
            </div>
            <div style="flex: 1; display: flex; gap: 12px; justify-content: flex-end">
                <XButton :loading="isDownloadFile" @xClick="exportRecordKeepingDomains" color="blue" text="导出对比结果" />
            </div>
        </div>
        <div style="height: 400px;">
            <x-custom-table ref="xCustomTable" />
        </div>
    </div>
</template>

<script setup>
import { ref, watch } from "vue";
import XButton from "@/components/common/XButton.vue";
import XTextarea from "@/components/common/XTextarea.vue";
import XCustomTable from "@/components/common/XCustomTable.vue";
import { showErrorNotification } from "@/hooks/useNotification";
import { handleExport } from '@/utils';

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
// 选择方式
const uploadTypeOptions = [
    {
        label: '手动录入',
        value: 1,
    },
    {
        label: '文件上传',
        value: 2,
    },
];
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
    // 检查文件大小（限制为10MB）
    // const maxSize = 10 * 1024 * 1024; // 10MB
    // if (res[0].file && res[0].file.size > maxSize) {
    //   Message.error('文件大小不能超过10MB');
    //   fileList.value = [];
    //   GLForm.value.file = null;
    //   return;
    // }
    
    // 检查文件类型
    const allowedTypes = ['.csv'];
    const fileName = res[0].file.name.toLowerCase();
    const isValidType = allowedTypes.some(type => fileName.endsWith(type));
    
    if (!isValidType) {
      Message.error('只支持 .csv 格式的文件');
      fileList.value = [];
      return;
    }
    
  } else {
    
  }
};

const groupOptions = [
    {
        label: '第一组',
        value: 1
    },
    {
        label: '第二组',
        value: 2
    },
    {
        label: '第三组',
        value: 3
    },
]
const typeOptions = [
    {
        label: '完全相同',
        value: 'EXACT_SAME'
    },
    {
        label: '完全不同',
        value: 'COMPLETELY_DIFFERENT'
    },
    {
        label: '必须包含',
        value: 'MUST_CONTAIN'
    },
    {
        label: '不能包含',
        value: 'CANNOT_CONTAIN'
    },
    {
        label: '合并去重',
        value: 'MERGE_DEDUPLICATE'
    },
]

function queryTableData() {
    if (compareType.value === 'MUST_CONTAIN' || compareType.value === 'CANNOT_CONTAIN') {
        if (!matchKeywords.value.trim()) {
            showErrorNotification('请输入需求关键词');
            return
        }
    } else {
        matchKeywords.value = ''
    }
    let data = {
        group1Keywords: [],
        group2Keywords: [],
        group3Keywords: [],
        compareGroups: compareGroups.value,
        compareType: compareType.value,
        matchKeywords: [],
    }
    data.group1Keywords = group1Keywords.value.split("\n").filter(domain => domain.trim().length > 0).map(domain => domain.trim());
    data.group2Keywords = group2Keywords.value.split("\n").filter(domain => domain.trim().length > 0).map(domain => domain.trim());
    data.group3Keywords = group3Keywords.value.split("\n").filter(domain => domain.trim().length > 0).map(domain => domain.trim());
    data.matchKeywords = matchKeywords.value.split("\n").filter(domain => domain.trim().length > 0).map(domain => domain.trim());
    if (uploadType.value === 1) {
        if (compareGroups.value.length < 2) {
            showErrorNotification('请至少选择两组对比数据');
            return
        }
        if (!compareType.value) {
            showErrorNotification('请选择需求选项');
            return
        }
        if (compareGroups.value.includes(1)&&data.group1Keywords.length === 0) {
            showErrorNotification('请输入第一组关键词，一行一个');
            return
        }
        if (compareGroups.value.includes(2)&&data.group2Keywords.length === 0) {
            showErrorNotification('请输入第二组关键词，一行一个');
            return
        }
        if (compareGroups.value.includes(3)&&data.group3Keywords.length === 0) {
            showErrorNotification('请输入第三组关键词，一行一个');
            return
        }
        xCustomTable.value.queryTableData("/api/front/keyword-compare/compare", data);
    }
    if (uploadType.value === 2) {
        if (fileList.value.length === 0) {
            showErrorNotification('请选择文件');
            return
        }
        const formData = new FormData();
        formData.append('csvFile', fileList.value[0].file);
        formData.append('compareType', data.compareType);
        formData.append('matchKeywords', data.matchKeywords);
        xCustomTable.value.queryTableData("/api/front/keyword-compare/compare-files", formData);
    }
}

function exportRecordKeepingDomains() {
    if (xCustomTable.value.table.tableCurrData.length === 0) {
        showErrorNotification('未获取到查询结果');
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
    width: 50%;
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