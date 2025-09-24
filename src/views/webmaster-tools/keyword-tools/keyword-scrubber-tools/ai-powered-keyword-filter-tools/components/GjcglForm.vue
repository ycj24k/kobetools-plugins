<template>
  <a-form class="form_box" ref="GLFormRef" layout="vertical" hide-label :model="GLForm" @submit="GLFormSubmit">
    <a-grid class="form_main">
      <a-grid-item :span="6" class="form_left">
        <div class="flex_box">
          <div class="form_title">选择方式</div>
          <a-form-item no-style field="engineTypes">
            <a-radio-group v-model="uploadType" :options="uploadTypeOptions"></a-radio-group>
          </a-form-item>
        </div>
        <div v-if="uploadType === 1" style="height: calc(100% - 40px);">
          <a-form-item no-style field="keywords">
            <a-textarea v-model="keywords" class="form_area" placeholder="请输入需要过滤的关键词，一行一个" allow-clear />
          </a-form-item>
        </div>
        <div v-if="uploadType === 2" class="upload_box">
          <div class="flex_box flex_row_between">
              <a target="_blank" href="https://kobetools-shenzhen.oss-cn-shenzhen.aliyuncs.com/res/template/keyword-filter.csv">点击下载示例文件</a>
              <div class="upload_tip">支持 .csv 格式文件，每行一个关键词</div>
          </div>
          <a-upload 
            ref="uploadRef" 
            :show-cancel-button="false" 
            @change="uploadChange" 
            draggable 
            :auto-upload="false" 
            :limit="1" 
            action="/"
            accept=".csv"
            :file-list="fileList"
            :show-file-list="true"
            :show-upload-button="true"
            :custom-request="() => {}"
          />
        </div>
      </a-grid-item>
      <a-grid-item :span="18" class="form_right">
        <div class="flex_box form_item form_item_radio">
          <div class="form_title">AI过滤</div>
          <a-form-item no-style field="engineTypes">
            <a-checkbox-group v-model="GLForm.engineTypes" :options="GLEngineOptions"></a-checkbox-group>
          </a-form-item>
        </div>
        <div class="flex_box form_item">
          <div class="form_title">过滤设置</div>
          <a-grid :col-gap="20" :row-gap="10" class="form_content">
            <a-grid-item :span="14" class="flex_box form_option">
              <div class="form_label">字符长度</div>
              <a-form-item no-style field="lengthFilterEnabled">
                <a-space :size="20">
                  <a-switch v-model="GLForm.lengthFilterEnabled" :checked-value="true" :unchecked-value="false" />
                  <template v-if="GLForm.lengthFilterEnabled">
                    <a-space :size="20">
                      <span>最少</span>
                      <a-select v-model="GLForm.minLength" :options="lengthMinOptions" :style="{ width: '140px' }"
                        placeholder="请选择">
                        <!-- <template #label="{ data }">
                          <span>{{ localeGet(data?.label) }}</span>
                        </template>
<template #option="{ data }">
                          <span>{{ localeGet(data?.label) }}</span>
                        </template> -->
                      </a-select>
                      <span>-</span>
                      <span>最多</span>
                      <a-select v-model="GLForm.maxLength" :options="lengthMaxOptions" :style="{ width: '140px' }"
                        placeholder="请选择">
                        <!-- <template #label="{ data }">
                          <span>{{ localeGet(data?.label) }}</span>
                        </template>
                        <template #option="{ data }">
                          <span>{{ localeGet(data?.label) }}</span>
                        </template> -->
                      </a-select>
                    </a-space>
                  </template>
                </a-space>
              </a-form-item>
            </a-grid-item>
            <a-grid-item :span="10" class="flex_box form_option">
              <div class="form_label">违禁词词库</div>
              <a-form-item no-style field="sensitiveFilterEnabled">
                <a-space :size="20">
                  <a-switch v-model="GLForm.sensitiveFilterEnabled" :checked-value="true" :unchecked-value="false" />
                  <template v-if="GLForm.sensitiveFilterEnabled">
                    <a-select v-model="GLForm.sensitiveFilterVal" :options="customOptions" :style="{ width: '220px' }"
                      allow-search placeholder="请选择">
                      <!-- <template #label="{ data }">
                        <span>{{ localeGet(data?.label) }}</span>
                      </template>
      <template #option="{ data }">
                        <span>{{ localeGet(data?.label) }}</span>
                      </template> -->
                    </a-select>
                  </template>
                </a-space>
              </a-form-item>
            </a-grid-item>
          </a-grid>
        </div>
        <div class="form_item">
          <a-grid :col-gap="20" :row-gap="10" class="form_content">
            <a-grid-item :span="12" class="flex_box form_content_item">
              <div class="form_title">条件筛选</div>
              <div class="flex_box form_content_top">
                <div class="form_label">结果包含</div>
                <a-form-item no-style field="includeType">
                  <a-radio-group v-model="GLForm.includeType" :options="includeOptions">
                    <!-- <template #label="{ data }">
                      <span>{{ data?.label }}</span>
                    </template>
                    <template #option="{ data }">
                      <span>{{ data?.label }}</span>
                    </template> -->
                  </a-radio-group>
                </a-form-item>
              </div>
            </a-grid-item>
            <a-grid-item :span="12" class="form_content_item">
              <div class="flex_box form_content_top">
                <div class="form_label">结果不包含</div>
                <a-form-item no-style field="excludeType">
                  <a-radio-group v-model="GLForm.excludeType" :options="excludeOptions">
                    <!-- <template #label="{ data }">
                      <span>{{ data?.label }}</span>
                    </template>
                    <template #option="{ data }">
                      <span>{{ data?.label }}</span>
                    </template> -->
                  </a-radio-group>
                </a-form-item>
              </div>
            </a-grid-item>
          </a-grid>
          <a-grid :col-gap="20" :row-gap="10" class="form_content">
            <a-grid-item :span="12" class="flex_box form_content_item">
              <div class="form_content_input">
                <a-textarea v-model="includeKeywords" class="form_area" placeholder="请输入关键词，每行一个关键词" allow-clear />
              </div>
            </a-grid-item>
            <a-grid-item :span="12" class="form_content_item">
              <div class="form_content_input">
                <a-textarea v-model="excludeKeywords" class="form_area" placeholder="请输入关键词，每行一个关键词" allow-clear />
              </div>
            </a-grid-item>
          </a-grid>
        </div>
        <div class="form_btn form_btnp">
          <a-button class="form_btn1" type="primary" html-type="submit" :loading="loading">
            {{ loading ? '正在提交...' : '提交关键词过滤' }}
          </a-button>
        </div>
      </a-grid-item>
    </a-grid>
    <div style="height: 100px; display: flex; align-items: center;">
        <div style="width: 500px;">
            <!-- <XButton @xClick="queryTableData" color="purple_blue_pink" text="立即对比" /> -->
        </div>
        <div style="flex: 1; display: flex; gap: 12px; justify-content: flex-end">
            <XButton :loading="isDownloadFile" @xClick="exportRecordKeepingDomains" color="blue" text="导出过滤结果" />
        </div>
    </div>
    <div style="height: 400px;">
        <x-custom-table ref="xCustomTable" />
    </div>
  </a-form>
</template>

<script setup>
import { ref, watch, h } from 'vue';
import { Message, Modal } from '@arco-design/web-vue';
import { GLFormDefault, includeOptions, excludeOptions, GLEngineOptions, lengthMinOptions, lengthMaxOptions, customOptions, uploadTypeOptions } from '../../utils/config';
import { processTextArea } from '@/utils/index';
import XCustomTable from "@/components/common/XCustomTable.vue";
import { showErrorNotification } from "@/hooks/useNotification";
import { handleExport } from '@/utils';

// 多语言
const props = defineProps({
  locales: {
    type: Object,
    default: {},
  },
});
const localeData = ref(props.locales);
const columns = ref([]);
let xCustomTable = ref(null);
// 监听 props 的变化
watch(
  () => props.locales,
  (newVal) => {
    console.log(newVal);
    localeData.value = newVal;
  }
);
const localeGet = (key) => {
  return localeData.value[key];
};
// 关键词过滤
const GLFormRef = ref(null);
const keywords = ref('');
const includeKeywords = ref('');
const excludeKeywords = ref('');
const GLForm = ref({ ...GLFormDefault });
const loading = ref(false);
const tipVisible = ref(false);
const uploadType = ref(1);
const fileList = ref([]);
const uploadRef = ref(null);


// 监听上传类型变化，清空文件列表
watch(uploadType, (newType) => {
  if (newType === 1) {
    fileList.value = [];
    GLForm.value.file = null;
  }
});

// 上传改变
const uploadChange = (res) => {
  fileList.value = res;
  if (res[0]) {
    // 基础文件验证
    const file = res[0].file;
    if (!file) {
      Message.error('文件读取失败，请重新选择');
      fileList.value = [];
      GLForm.value.file = null;
      return;
    }

    // 检查文件类型
    const allowedTypes = ['.csv'];
    const fileName = file.name.toLowerCase();
    const isValidType = allowedTypes.some(type => fileName.endsWith(type));
    
    if (!isValidType) {
      Message.error('只支持 .csv 格式的文件');
      fileList.value = [];
      GLForm.value.file = null;
      return;
    }
    
    GLForm.value.file = res[0];
  } else {
    GLForm.value.file = null;
  }
};
// 关键词过滤提交
const GLFormSubmit = async ({ errors, values }) => {
  if (loading.value) return;
  if (!errors) {
    loading.value = true;
    try {
      GLForm.value.keywords = processTextArea(keywords.value);
      keywords.value = GLForm.value.keywords.join('\n')
      if (uploadType.value === 1 && GLForm.value.keywords.length === 0) {
        Message.warning('请输入需要过滤的关键词，一行一个');
        loading.value = false;
        return;
      }
      
      if (uploadType.value === 2 && !GLForm.value.file) {
        Message.warning('请上传关键词文件');
        loading.value = false;
        return;
      }
      // // 保留原始词
      // if (GLForm.value.reserve) {
      //   GLForm.value.reserveKeyword = keywords.value;
      // }
      // // 字符长度过滤
      // if (GLForm.value.lengthFilterEnabled) {
      //   const { minLength, maxLength } = GLForm.value;
      //   if (minLength > 0 || maxLength > 0) {
      //     GLForm.value.keywords = GLForm.value.keywords.filter((item) => (minLength === 0 && maxLength > 0 && item.length <= maxLength) || (minLength > 0 && maxLength === 0 && item.length >= minLength) || (minLength > 0 && maxLength > 0 && item.length >= minLength && item.length <= maxLength));
      //   }
      // }
      // // 包含关键词
      // if (includeKeywords.value.length) {
      //   GLForm.value.includeKeywords = includeKeywords.value.split('\n');
      //   if (GLForm.value.include) {
      //     GLForm.value.keywords = GLForm.value.keywords.filter((item) => GLForm.value.includeKeywords.some((char) => item.includes(char)));
      //   } else {
      //     GLForm.value.keywords = GLForm.value.keywords.filter((item) => GLForm.value.includeKeywords.every((char) => item.includes(char)));
      //   }
      // }
      // // 不包含关键词
      // if (excludeKeywords.value.length) {
      //   GLForm.value.excludeKeywords = excludeKeywords.value.split('\n');
      //   if (GLForm.value.exclude) {
      //     GLForm.value.keywords = GLForm.value.keywords.filter((item) => !GLForm.value.excludeKeywords.some((char) => item.includes(char)));
      //   } else {
      //     GLForm.value.keywords = GLForm.value.keywords.filter((item) => !GLForm.value.excludeKeywords.every((char) => item.includes(char)));
      //   }
      // }
      // if (uploadType.value === 1 && GLForm.value.keywords.length === 0) {
      //   Message.warning('过滤后关键词为空');
      //   loading.value = false;
      //   return;
      // }
      console.log(GLForm.value)
      if (uploadType.value === 1) {
        xCustomTable.value.queryTableData("/api/front/keyword/filter/text", GLForm.value);
        // keywordfiltertext(GLForm.value)
        //   .then((res) => {
        //     Message.success('提交成功');
        //     GLForm.value = { ...GLFormDefault };
        //     keywords.value = '';
        //     includeKeywords.value = '';
        //     excludeKeywords.value = '';
        //     fileList.value = [];
        //     tipVisible.value = true;
        //   })
        //   .catch((error) => { 
        //     console.error('关键词过滤失败:', error);
        //     // 错误信息已经在拦截器中处理，这里不需要重复显示
        //   })
        //   .finally(() => {
        //     loading.value = false;
        //   });
      }
      if (uploadType.value === 2) {
        // 验证文件
        if (!GLForm.value.file || !GLForm.value.file.file) {
          Message.error('请选择要上传的文件');
          loading.value = false;
          return;
        }

        // 检查文件大小（限制为10MB）
        // const maxSize = 10 * 1024 * 1024; // 10MB
        // if (GLForm.value.file.file.size > maxSize) {
        //   Message.error('文件大小不能超过10MB');
        //   loading.value = false;
        //   return;
        // }

        // 检查文件类型
        const allowedTypes = ['.csv'];
        const fileName = GLForm.value.file.file.name.toLowerCase();
        const isValidType = allowedTypes.some(type => fileName.endsWith(type));
        
        if (!isValidType) {
          Message.error('只支持 .csv 格式的文件');
          loading.value = false;
          return;
        }

        // 创建 FormData 对象用于文件上传
        const formData = new FormData();
        
        // 添加文件
        formData.append('file', GLForm.value.file.file);
        
        // 添加其他表单数据（数组用重复 key 方式 append）
        const { engineTypes, includeKeywords: incKw = [], excludeKeywords: excKw = [] } = GLForm.value;
        if (Array.isArray(engineTypes)) {
          engineTypes.forEach(v => formData.append('engineTypes[]', v));
        }
        if (Array.isArray(incKw)) {
          incKw.forEach(v => formData.append('includeKeywords[]', v));
        }
        if (Array.isArray(excKw)) {
          excKw.forEach(v => formData.append('excludeKeywords[]', v));
        }
        // 其余标量字段
        formData.append('includeType', GLForm.value.includeType ?? '');
        formData.append('excludeType', GLForm.value.excludeType ?? '');
        formData.append('lengthFilterEnabled', String(!!GLForm.value.lengthFilterEnabled));
        if (GLForm.value.minLength !== undefined && GLForm.value.minLength !== null) formData.append('minLength', GLForm.value.minLength);
        if (GLForm.value.maxLength !== undefined && GLForm.value.maxLength !== null) formData.append('maxLength', GLForm.value.maxLength);
        formData.append('sensitiveFilterEnabled', String(!!GLForm.value.sensitiveFilterEnabled));
        if (GLForm.value.sensitiveFilterVal !== undefined && GLForm.value.sensitiveFilterVal !== null) formData.append('sensitiveFilterVal', GLForm.value.sensitiveFilterVal);
        
        xCustomTable.value.queryTableData("/api/front/keyword/filter/file", formData);
        
        // keywordfiltertextfile(formData)
        //   .then((res) => {
        //     Message.success('文件上传成功');
        //     // 重置表单
        //     GLForm.value = { ...GLFormDefault };
        //     keywords.value = '';
        //     includeKeywords.value = '';
        //     excludeKeywords.value = '';
        //     fileList.value = [];
        //     tipVisible.value = true;
        //   })
        //   .catch((error) => { 
        //     console.error('文件上传失败:', error);
        //     // 错误信息已经在拦截器中处理，这里不需要重复显示
        //   })
        //   .finally(() => {
        //     loading.value = false;
        //   });
      }
      // 弹出提示
      // Modal.info({
      //   title: '温馨提示',
      //   width: '400px',
      //   hideCancel: false,
      //   cancelText: '继续过滤',
      //   okText: '查看进度',
      //   content: () =>
      //     h({
      //       setup() {
      //         return () =>
      //           h('div', { class: 'info-modal-content' }, [
      //             h('div', {}, '当前关键词清洗任务已在后台运行，请前往关键词任务列表查看进度。'),
      //           ]);
      //       },
      //     }),
      //   onOk: async () => {

      //   },
      // });
    } catch (err) {
      Message.error(err.message || '提交失败，请重试');
    } finally {
      loading.value = false;
    }
  } else {
    const list = Object.keys(errors);
    if (list.length > 0) Message.error(errors[list[0]].message);
  }
  function exportRecordKeepingDomains() {
      if (xCustomTable.value.table.tableCurrData.length === 0) {
          showErrorNotification('未获取到查询结果');
          return;
      }
      handleExport(xCustomTable.value.table.tableCurrData, xCustomTable.value.selectedKeys, xCustomTable.value.columns, '', 'csv')
  }
};
</script>

<style lang="less" scoped>
@import '@/assets/style/form.less';
@import '@/assets/style/table.less';
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
