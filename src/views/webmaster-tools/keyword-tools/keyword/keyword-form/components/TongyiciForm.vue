<template>
    <a-form class="form_box" ref="formRefExpose" layout="vertical" hide-label :model="model" @submit="onSubmit">
      <a-grid class="form_main">
        <a-grid-item :span="4">
          <a-form-item no-style field="keyword">
            <a-textarea v-model="keywordLocal" class="form_area" :placeholder="localeGet('placeholder13')" allow-clear />
          </a-form-item>
        </a-grid-item>
        <a-grid-item :span="20" class="form_middle">
          <div class="form_item">
            <a-space :size="20" class="flex_box form_option">
                <div class="form_btn">
                  <a-button class="form_btn1" type="primary" html-type="submit" :loading="loading">{{ localeGet('button9') }}</a-button>
                </div>
                <div class="form_btn">
                  <a-button class="form_btn1" type="primary" html-type="submit" :loading="loading">{{ localeGet('button10') }}</a-button>
                </div>
                <div class="form_btn">
                  <a-button class="form_btn1" type="primary" html-type="submit" :loading="loading">{{ localeGet('button11') }}</a-button>
                </div>
              </a-space>
          </div>
          <a-grid :col-gap="20" class="flex_box form_option">
            <a-grid-item :span="12" class="set_box">
              <div class="flex_box flex_row_between set_item" v-for="(item, index) in 10" :key="index">
                <div class="flex_box flex_wrap set_content">
                  <div class="set_text">10</div>
                  <div class="set_text">{{ localeGet('example.num') }}</div>
                  <div class="set_text">{{ localeGet('example.word1') }}</div>
                  <div class="set_text">{{ localeGet('example.word2') }}</div>
                  <div class="set_text">{{ localeGet('example.word3') }}</div>
                  <div class="set_text">{{ localeGet('example.word4') }}</div>
                  <div class="set_text">{{ localeGet('example.word5') }}</div>
                </div>
                <a-button shape="round" size="mini" class="set_btn" type="primary">{{ localeGet('example.btnConfig') }}</a-button>
              </div>
            </a-grid-item>
            <a-grid-item :span="12" class="set_box">
              <div class="flex_box flex_row_between set_item" v-for="(item, index) in 10" :key="index">
                <div class="flex_box flex_wrap set_content">
                  <div class="set_text">10</div>
                  <div class="set_text">{{ localeGet('example.num') }}</div>
                  <div class="set_text">{{ localeGet('example.word1') }}</div>
                  <div class="set_text">{{ localeGet('example.word2') }}</div>
                  <div class="set_text">{{ localeGet('example.word3') }}</div>
                  <div class="set_text">{{ localeGet('example.word4') }}</div>
                  <div class="set_text">{{ localeGet('example.word5') }}</div>
                </div>
                <a-button shape="round" size="mini" class="set_btn" type="primary">{{ localeGet('example.btnConfig') }}</a-button>
              </div>
            </a-grid-item>
          </a-grid>
          <div class="form_item">
              <a-grid :col-gap="20" :row-gap="10" class="form_content">
                  <a-grid-item :span="12" class="flex_box form_option">
                      <div class="form_title"><span style="color: #ff0000">*</span>{{ localeGet('outputLanguage') }}</div>
                      <a-form-item no-style field="language" :rules="[{ required: true, message: localeGet('message16') }]"
                          :validate-trigger="['change', 'blur']">
                          <a-select v-model="model.language" :options="translatedAILangOptions" :style="{ width: '220px' }"
                              :placeholder="localeGet('placeholder7')" allow-search></a-select>
                      </a-form-item>
                  </a-grid-item>
                  <a-grid-item :span="12" class="flex_box form_item_radio1">
                      <div class="form_title"><span style="color: #ff0000">*</span>{{ localeGet('sortOrder') }}</div>
                      <a-form-item no-style field="order" :rules="[{ required: true, message: localeGet('message17') }]"
                          :validate-trigger="['change', 'blur']">
                          <a-radio-group v-model="model.order" :options="translatedLBOrderOptions"></a-radio-group>
                      </a-form-item>
                  </a-grid-item>
              </a-grid>
          </div>
          <div class="form_btn form_btnp">
            <a-button class="form_btn1" type="primary" html-type="submit" :loading="loading">{{ localeGet('button8') }}</a-button>
          </div>
        </a-grid-item>
      </a-grid>
      <div class="form_explain">
        <div class="form_explain_title">{{ localeGet('introduce1') }}</div>
        <div>{{ localeGet('content1') }}</div>
      </div>
    </a-form>
  </template>
  
  <script setup>
import { ref, watch } from 'vue';
import { Message } from '@arco-design/web-vue';
import { keywordTaskAdd } from '@/api/apps/tools/keyword';
import { LBFormDefault, LBOrderOptions, AILangOptions, lengthMinOptions, lengthMaxOptions } from '../../utils/config';
import { processTextArea, filterByLength, filterByInclude, filterByExclude } from '@/utils/index';
import { useI18n } from '../../utils/i18n';

const props = defineProps({
    modelValue: { type: Object, default: () => ({ ...LBFormDefault }) },
    locales: { type: Object, default: () => ({}) }
});
const emit = defineEmits(['update:modelValue','submitted']);

const model = ref({ ...LBFormDefault, ...props.modelValue });
watch(() => props.modelValue, (v) => { model.value = { ...LBFormDefault, ...v }; });

const { localeGet, translateOptions, updateLocales } = useI18n();
watch(() => props.locales, (v) => { if (v) updateLocales(v); }, { immediate: true });

// 翻译选项
const translatedAILangOptions = translateOptions(AILangOptions);
const translatedLBOrderOptions = translateOptions(LBOrderOptions);
const translatedLengthMinOptions = translateOptions(lengthMinOptions);
const translatedLengthMaxOptions = translateOptions(lengthMaxOptions);

const loading = ref(false);
const formRefExpose = ref(null);

const keywordLocal = ref('');
const includeKeywordsLocal = ref('');
const excludeKeywordsLocal = ref('');

const onSubmit = async ({ errors }) => {
    if (loading.value) return;
    if (!errors) {
        loading.value = true;
        try {
            model.value.keyword = processTextArea(keywordLocal.value);
            keywordLocal.value = model.value.keyword.join('\n');
            if (model.value.keyword.length === 0) {
                Message.warning(localeGet('message3'));
                return;
            }
            if (model.value.lengthFilter) {
                const { min, max } = model.value.lengthFilterVal;
                if (min > 0 || max > 0) {
                    model.value.keyword = filterByLength(model.value.keyword, min, max);
                }
            }
            if (includeKeywordsLocal.value.length) {
                model.value.includeKeywords = processTextArea(includeKeywordsLocal.value);
                includeKeywordsLocal.value = model.value.includeKeywords.join('\n');
                model.value.keyword = filterByInclude(model.value.keyword, model.value.includeKeywords, model.value.include);
            }
            if (excludeKeywordsLocal.value.length) {
                model.value.excludeKeywords = processTextArea(excludeKeywordsLocal.value);
                excludeKeywordsLocal.value = model.value.excludeKeywords.join('\n');
                model.value.keyword = filterByExclude(model.value.keyword, model.value.excludeKeywords, model.value.exclude);
            }
            if (model.value.keyword.length === 0) {
                Message.warning(localeGet('message4'));
                return;
            }
            await keywordTaskAdd(model.value);
            Message.success(localeGet('message5'));
            emit('update:modelValue', { ...LBFormDefault });
            emit('submitted');
            keywordLocal.value = '';
            includeKeywordsLocal.value = '';
            excludeKeywordsLocal.value = '';
            model.value = { ...LBFormDefault };
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
.set_box {
  height: calc(100vh - 680px);
  overflow-y: scroll;
  .set_item {
    padding: 0 10px;
    height: 58px;
    border-bottom: 1px solid #f1f1f1;
    .set_content {
      column-gap: 16px;
      row-gap: 10px;
      .set_text {
        font-size: 14px;
        color: #333;
        border: 1px solid #1249FE;
        border-radius: 10px;
        padding: 0 10px;
        height: 24px;
        line-height: 22px;
      }
    }
  }
}
</style>