<template>
  <a-form class="form_box" ref="AIFormRef" layout="vertical" hide-label :model="AIForm" @submit="AIFormSubmit">
    <a-grid class="form_main">
      <a-grid-item :span="6" class="form_left">
        <a-form-item no-style field="keywords">
          <a-textarea v-model="keywords" class="form_area" :placeholder="localeGet('placeholder14')" allow-clear />
        </a-form-item>
      </a-grid-item>
      <a-grid-item :span="18" class="form_right">
        <a-grid :col-gap="20" class="form_item form_item_radio">
          <a-grid-item :span="12">
            <div class="flex_box">
              <div class="form_title"><span style="color: #ff0000">*</span>{{ localeGet('aiPromptTitle') }}</div>
              <a-button @click="AIForm.prompt = localeGet(promptDefault)" type="outline" shape="round">
                <div>{{ localeGet('button7') }}</div>
                <div style="transform: rotate(15deg)">
                  <icon-arrow-down />
                </div>
              </a-button>
            </div>
          </a-grid-item>
          <a-grid-item :span="12" class="flex_box form_option">
            <a-form-item no-style field="language" :rules="[{ required: true, message: localeGet('placeholder7') }]" :validate-trigger="['change', 'blur']">
              <div class="flex_box" style="width: 100%">
                <div class="form_title"><span style="color: #ff0000">*</span>{{ localeGet('outputLanguage') }}</div>
                <a-select v-model="AIForm.language" :options="translatedAILangOptions" :style="{ width: '100%' }" :placeholder="localeGet('placeholder7')" allow-search></a-select>
              </div>
            </a-form-item>
          </a-grid-item>
          <a-grid-item :span="24" class="ai_tip">
            <a-form-item no-style field="prompt">
              <a-textarea v-model="AIForm.prompt" class="form_area" :placeholder="localeGet('placeholder8')" allow-clear />
            </a-form-item>
          </a-grid-item>
        </a-grid>
        <div class="form_item">
          <a-grid :col-gap="20">
            <a-grid-item :span="19">
              <div class="flex_box form_item_radio form_item_radio_flex">
                <div class="form_title"><span style="color: #ff0000">*</span>{{ localeGet('miningSource') }}</div>
                <a-form-item no-style field="model" :rules="[{ required: true, message: localeGet('message12') }]" :validate-trigger="['change', 'blur']">
                  <a-radio-group v-model="AIForm.model" :options="translatedAIModelOptions"></a-radio-group>
                </a-form-item>
              </div>
            </a-grid-item>
            <a-grid-item :span="5">
              <div class="flex_box form_item_radio form_item_radio_flex">
                <div class="form_title"><span style="color: #ff0000">*</span>{{ localeGet('miningCount') }}</div>
                <a-form-item no-style field="num" :rules="[{ required: true, message: localeGet('message12') }]" :validate-trigger="['change', 'blur']">
                  <a-select v-model="AIForm.num" :options="translatedAINumberOptions" :placeholder="localeGet('message12')"></a-select>
                </a-form-item>
              </div>
            </a-grid-item>
          </a-grid>
        </div>
        <div class="form_item">
          <a-grid :col-gap="20" :row-gap="10" class="form_content">
            <a-grid-item :span="12" class="flex_box form_content_item">
              <div class="form_title">{{ localeGet('title4') }}</div>
              <div class="flex_box form_content_top">
                <div class="form_label">{{ localeGet('label8') }}</div>
                <a-form-item no-style field="includeType">
                  <a-radio-group v-model="AIForm.includeType" :options="translatedIncludeOptions"></a-radio-group>
                </a-form-item>
              </div>
            </a-grid-item>
            <a-grid-item :span="12" class="form_content_item">
              <div class="flex_box form_content_top">
                <div class="form_label">{{ localeGet('label9') }}</div>
                <a-form-item no-style field="excludeType">
                  <a-radio-group v-model="AIForm.excludeType" :options="translatedExcludeOptions"></a-radio-group>
                </a-form-item>
              </div>
            </a-grid-item>
          </a-grid>
          <a-grid :col-gap="20" :row-gap="10" class="form_content">
            <a-grid-item :span="12" class="flex_box form_content_item">
              <div class="form_content_input">
                <a-textarea v-model="includeKeywords" class="form_area" :placeholder="localeGet('placeholder5')" allow-clear />
              </div>
            </a-grid-item>
            <a-grid-item :span="12" class="form_content_item">
              <div class="form_content_input">
                <a-textarea v-model="excludeKeywords" class="form_area" :placeholder="localeGet('placeholder5')" allow-clear />
              </div>
            </a-grid-item>
          </a-grid>
        </div>
        <div class="form_btn form_btnp">
          <a-button class="form_btn1" type="primary" html-type="submit" :loading="loading">{{ localeGet('button6') }}</a-button>
        </div>
      </a-grid-item>
    </a-grid>
    <div class="form_explain">
      <div class="form_explain_title">{{ localeGet('introduce1') }}</div>
      <div>{{ localeGet('content7') }}</div>
      <div>{{ localeGet('content8') }}</div>
    </div>
  </a-form>
</template>

<script setup>
import { ref, watch } from 'vue';
import { Message } from '@arco-design/web-vue';
import { keywordTaskAdddiscover, supportList } from '@/api/apps/tools/keyword';
import { isPromptDefaultValid, promptDefault, AIFormDefault, includeOptions, excludeOptions, AIModelOptions, AILangOptions, AINumberOptions } from '../../utils/config';
import { jumpPage, processTextArea } from '@/utils/index';
import { showErrorNotification } from "@/hooks/useNotification";
import { useI18n } from '../../utils/i18n';

// 多语言
const props = defineProps({
  locales: {
    type: Object,
    default: {},
  },
});
const { localeGet, translateOptions, updateLocales } = useI18n();
watch(
  () => props.locales,
  (newVal) => {
    if (newVal) updateLocales(newVal);
  },
  { immediate: true }
);

// 翻译选项
const translatedAILangOptions = translateOptions(AILangOptions);
const translatedIncludeOptions = translateOptions(includeOptions);
const translatedExcludeOptions = translateOptions(excludeOptions);
const translatedAINumberOptions = translateOptions(AINumberOptions);
const translatedAIModelOptions = translateOptions(AIModelOptions);
AIFormDefault.prompt = localeGet(AIFormDefault.prompt);
// 关键词挖掘
// const supportOptions = ref([]);
const AIFormRef = ref(null);
const keywords = ref('');
const includeKeywords = ref('');
const excludeKeywords = ref('');
const AIForm = ref({ ...AIFormDefault });
const loading = ref(false);

// 获取支持
// const getSupportList = async () => {
//   try {
//     const res = await supportList();
//     supportOptions.value = res.data;
//   } catch (error) {}
// };
// getSupportList();
// 关键词挖掘提交
const AIFormSubmit = async ({ errors, values }) => {
  if (loading.value) return;
  if (!errors) {
    loading.value = true;
    try {
      if (!isPromptDefaultValid(AIForm.value.prompt)) {
        showErrorNotification(localeGet('message15'))
        return
      }
      AIForm.value.keywords = processTextArea(keywords.value);
      keywords.value = AIForm.value.keywords.join('\n')
      if (AIForm.value.keywords.length === 0) {
        Message.warning(localeGet('message3'));
        return;
      }
      // 保留原始词
      if (AIForm.value.reserve) {
        AIForm.value.reserveKeyword = keywords.value;
      }
      // 包含关键词
      if (includeKeywords.value.length) {
        AIForm.value.includeKeywords = includeKeywords.value.split('\n');
        if (AIForm.value.include) {
          AIForm.value.keywords = AIForm.value.keywords.filter((item) => AIForm.value.includeKeywords.some((char) => item.includes(char)));
        } else {
          AIForm.value.keywords = AIForm.value.keywords.filter((item) => AIForm.value.includeKeywords.every((char) => item.includes(char)));
        }
      }
      // 不包含关键词
      if (excludeKeywords.value.length) {
        AIForm.value.excludeKeywords = excludeKeywords.value.split('\n');
        if (AIForm.value.exclude) {
          AIForm.value.keywords = AIForm.value.keywords.filter((item) => !AIForm.value.excludeKeywords.some((char) => item.includes(char)));
        } else {
          AIForm.value.keywords = AIForm.value.keywords.filter((item) => !AIForm.value.excludeKeywords.every((char) => item.includes(char)));
        }
      }
      console.log(AIForm.value.keywords);
      if (AIForm.value.keywords.length === 0) {
        Message.warning(localeGet('message4'));
        return;
      }
      keywordTaskAdddiscover(AIForm.value)
        .then((res) => {
          Message.success(localeGet('message5'));
          AIForm.value = { ...AIFormDefault };
          keywords.value = '';
          includeKeywords.value = '';
          excludeKeywords.value = '';
          jumpPage('/webmaster-tools/keyword-tools/keyword/keyword-task');
        })
        .catch(() => {});
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
.form_box .form_item_radio {
  :deep(.arco-radio) {
    width: auto;
    flex: 1;
  }
}
.ai_tip .form_area {
  height: 150px;
}
</style>
