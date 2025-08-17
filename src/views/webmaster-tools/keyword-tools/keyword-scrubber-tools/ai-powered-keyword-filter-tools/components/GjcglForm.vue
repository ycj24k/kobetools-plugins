<template>
  <a-form class="form_box" ref="GLFormRef" layout="vertical" hide-label :model="GLForm" @submit="GLFormSubmit">
    <a-grid class="form_main">
      <a-grid-item :span="6" class="form_left">
        <a-form-item no-style field="keywords">
          <a-textarea v-model="keywords" class="form_area" placeholder="请输入需要过滤的关键词，一行一个" allow-clear />
        </a-form-item>
      </a-grid-item>
      <a-grid-item :span="18" class="form_right">
        <div class="flex_box form_item form_item_radio">
          <div class="form_title"><span style="color: #ff0000">*</span>搜索引擎</div>
          <a-space :size="0">
            <a-button type="text" @click="engineChange(0)">全选</a-button>
            <a-button type="text" @click="engineChange(1)">反选</a-button>
            <a-button type="text" @click="engineChange(2)">清除</a-button>
          </a-space>
          <a-form-item no-style field="engineTypes" :rules="[{ required: true, message: '请选择搜索引擎' }]" :validate-trigger="['change', 'blur']">
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
                      <a-select v-model="GLForm.minLength" :options="lengthMinOptions"
                        :style="{ width: '140px' }" placeholder="请选择">
                        <!-- <template #label="{ data }">
                          <span>{{ localeGet(data?.label) }}</span>
                        </template>
<template #option="{ data }">
                          <span>{{ localeGet(data?.label) }}</span>
                        </template> -->
                      </a-select>
                      <span>-</span>
                      <span>最多</span>
                      <a-select v-model="GLForm.maxLength" :options="lengthMaxOptions"
                        :style="{ width: '140px' }" placeholder="请选择">
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
                <a-textarea v-model="includeKeywords" class="form_area" placeholder="请输入关键词，每行一个关键词"
                  allow-clear />
              </div>
            </a-grid-item>
            <a-grid-item :span="12" class="form_content_item">
              <div class="form_content_input">
                <a-textarea v-model="excludeKeywords" class="form_area" placeholder="请输入关键词，每行一个关键词"
                  allow-clear />
              </div>
            </a-grid-item>
          </a-grid>
        </div>
        <div class="form_btn form_btnp">
          <a-button class="form_btn1" type="primary" html-type="submit" :loading="loading">提交关键词过滤</a-button>
        </div>
      </a-grid-item>
    </a-grid>
    <div class="form_explain">
      <div class="form_explain_title">工具介绍</div>
      <!-- <div>{{ localeGet('content1') }}</div>
      <div>{{ localeGet('content2') }}</div> -->
    </div>
    <!-- 弹出提示 -->
    <a-modal :mask-closable="false" l :esc-to-close="false" class="modal_box" v-model:visible="tipVisible"
      width="600px">
      <template #title>
        <div class="flex_box modal_title">
          <div class="modal_title_icon">
            <icon-info-circle-fill />
          </div>
          <div class="modal_title_text">温馨提示</div>
        </div>
      </template>
      <div class="modal_content">当前关键词清洗任务已在后台运行，请前往关键词任务列表查看进度。</div>
      <template #footer>
        <div class="flex_box flex_row_center modal_footer">
          <a-button style="color: #333" @click="tipVisible = false">继续过滤</a-button>
          <a-button class="form_btn3" @click="tipSubmit">查看进度</a-button>
        </div>
      </template>
    </a-modal>
  </a-form>
</template>

<script setup>
import { ref, watch, h } from 'vue';
import { Message, Modal } from '@arco-design/web-vue';
import { keywordfiltertext } from '@/api/apps/tools/keyword-scrubber-tools';
import { GLFormDefault, includeOptions, excludeOptions, GLEngineOptions, lengthMinOptions, lengthMaxOptions, customOptions } from '../../utils/config';
import { jumpPage, processTextArea } from '@/utils/index';

// 多语言
const props = defineProps({
  locales: {
    type: Object,
    default: {},
  },
});
const localeData = ref(props.locales);
const columns = ref([]);
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

function tipSubmit() {
    tipVisible.value = false;
    jumpPage('/webmaster-tools/keyword-tools/keyword/keyword-task');
}
// 引擎选择
function engineChange(value) {
  if (value === 0) {
    GLForm.value.engineTypes = GLEngineOptions.map(item => item.value);
  } else if (value === 1) {
    let list = GLEngineOptions.filter(item => !GLForm.value.engineTypes.includes(item.value));
    GLForm.value.engineTypes = list.map(item => item.value);
  } else if (value === 2) {
    GLForm.value.engineTypes = []
  }
}

// 关键词过滤提交
const GLFormSubmit = async ({ errors, values }) => {
  if (loading.value) return;
  if (!errors) {
    loading.value = true;
    try {
      GLForm.value.keywords = processTextArea(keywords.value);
      keywords.value = GLForm.value.keywords.join('\n')
      if (GLForm.value.keywords.length === 0) {
        Message.warning('请输入需要过滤的关键词，一行一个');
        return;
      }
      // 保留原始词
      if (GLForm.value.reserve) {
        GLForm.value.reserveKeyword = keywords.value;
      }
      // 字符长度过滤
      if (GLForm.value.lengthFilterEnabled) {
        const { minLength, maxLength } = GLForm.value;
        if (minLength > 0 || maxLength > 0) {
          GLForm.value.keywords = GLForm.value.keywords.filter((item) => (minLength === 0 && maxLength > 0 && item.length <= maxLength) || (minLength > 0 && maxLength === 0 && item.length >= minLength) || (minLength > 0 && maxLength > 0 && item.length >= minLength && item.length <= maxLength));
        }
      }
      // 包含关键词
      if (includeKeywords.value.length) {
        GLForm.value.includeKeywords = includeKeywords.value.split('\n');
        if (GLForm.value.include) {
          GLForm.value.keywords = GLForm.value.keywords.filter((item) => GLForm.value.includeKeywords.some((char) => item.includes(char)));
        } else {
          GLForm.value.keywords = GLForm.value.keywords.filter((item) => GLForm.value.includeKeywords.every((char) => item.includes(char)));
        }
      }
      // 不包含关键词
      if (excludeKeywords.value.length) {
        GLForm.value.excludeKeywords = excludeKeywords.value.split('\n');
        if (GLForm.value.exclude) {
          GLForm.value.keywords = GLForm.value.keywords.filter((item) => !GLForm.value.excludeKeywords.some((char) => item.includes(char)));
        } else {
          GLForm.value.keywords = GLForm.value.keywords.filter((item) => !GLForm.value.excludeKeywords.every((char) => item.includes(char)));
        }
      }
      console.log(GLForm.value.keywords);
      if (GLForm.value.keywords.length === 0) {
        Message.warning('过滤后关键词为空');
        return;
      }
      keywordfiltertext(GLForm.value)
        .then((res) => {
          Message.success('提交成功');
          GLForm.value = { ...GLFormDefault };
          keywords.value = '';
          includeKeywords.value = '';
          excludeKeywords.value = '';
          tipVisible.value = true;
        })
        .catch(() => {});
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
      Message.error(err.message);
    } finally {
      loading.value = false;
    }
  } else {
    const list = Object.keys(errors);
    if (list.length > 0) Message.error(errors[list[0]].message);
  }
};
</script>

<style lang="less" scoped>
@import '@/assets/style/form.less';
@import '@/assets/style/table.less';
</style>
