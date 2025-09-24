<template>
  <a-form class="form_box" ref="titleFormRef" layout="vertical" hide-label :model="titleForm" @submit="titleFormSubmit">
    <a-grid class="form_main">
      <a-grid-item :span="4">
        <a-form-item no-style field="keyword">
          <a-textarea v-model="keyword" class="form_area" placeholder="请输入简体中文标题，一行一个" allow-clear />
        </a-form-item>
      </a-grid-item>
      <a-grid-item :span="20" class="form_middle">
        <div class="flex_box flex_row_between form_item">
          <a-space :size="20" class="flex_box form_option">
            <div class="form_btn">
              <a-button class="form_btn1" type="primary" html-type="submit" :loading="loading">1、一键拆分标题</a-button>
            </div>
            <div class="form_btn">
              <a-button class="form_btn1" type="primary" html-type="submit" :loading="loading">2、提取所有词根</a-button>
            </div>
            <div class="form_btn">
              <a-button class="form_btn1" type="primary" html-type="submit" :loading="loading">3、同义词生成</a-button>
            </div>
          </a-space>
          <a-checkbox v-model="model.isDetail">生成关键词和描述</a-checkbox>
        </div>
        <a-grid :col-gap="20" class="flex_box form_option">
          <a-grid-item :span="12" class="set_box">
            <div class="flex_box flex_row_between set_item" v-for="(item, index) in 10" :key="index">
              <div class="flex_box flex_wrap set_content">
                <div class="set_text">10</div>
                <div class="set_text">个</div>
                <div class="set_text">谷歌</div>
                <div class="set_text">SEO</div>
                <div class="set_text">优化</div>
                <div class="set_text">的</div>
                <div class="set_text">技巧</div>
              </div>
              <a-button shape="round" size="mini" class="set_btn" type="primary">裂变配置</a-button>
            </div>
          </a-grid-item>
          <a-grid-item :span="12" class="set_box">
            <div class="flex_box flex_row_between set_item" v-for="(item, index) in 10" :key="index">
              <div class="flex_box flex_wrap set_content">
                <div class="set_text">10</div>
                <div class="set_text">个</div>
                <div class="set_text">谷歌</div>
                <div class="set_text">SEO</div>
                <div class="set_text">优化</div>
                <div class="set_text">的</div>
                <div class="set_text">技巧</div>
              </div>
              <a-button shape="round" size="mini" class="set_btn" type="primary">裂变配置</a-button>
            </div>
          </a-grid-item>
        </a-grid>
        <div class="form_item">
            <a-grid :col-gap="20" :row-gap="10" class="form_content">
                <a-grid-item :span="12" class="flex_box form_option">
                    <div class="form_title"><span style="color: #ff0000">*</span>输出语言</div>
                    <a-form-item no-style field="language" :rules="[{ required: true, message: '请选择输出语言' }]"
                        :validate-trigger="['change', 'blur']">
                        <a-select v-model="model.language" :options="AILangOptions" placeholder="请选择关键词生成语言" />
                    </a-form-item>
                </a-grid-item>
                <a-grid-item :span="12" class="flex_box form_item_radio1">
                    <div class="form_title"><span style="color: #ff0000">*</span>排列顺序</div>
                    <a-form-item no-style field="order" :rules="[{ required: true, message: '请选择排列顺序' }]"
                        :validate-trigger="['change', 'blur']">
                        <a-radio-group v-model="model.order" :options="LBOrderOptions">
                            <template #label="{ data }"><span>{{ data?.label }}</span></template>
                            <template #option="{ data }"><span>{{ data?.label }}</span></template>
                        </a-radio-group>
                    </a-form-item>
                </a-grid-item>
            </a-grid>
        </div>
        <div class="form_btn form_btnp">
          <a-button class="form_btn1" type="primary" html-type="submit" :loading="loading">立即生成标题</a-button>
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
import { LBFormDefault, LBOrderOptions, AILangOptions } from '../../utils/config';
import { processTextArea, filterByLength, filterByInclude, filterByExclude } from '@/utils/index';

const props = defineProps({
  modelValue: { type: Object, default: () => ({ ...LBFormDefault }) },
  locales: { type: Object, default: () => ({}) }
});
const emit = defineEmits(['update:modelValue','submitted']);

const model = ref({ ...LBFormDefault, ...props.modelValue });
watch(() => props.modelValue, (v) => { model.value = { ...LBFormDefault, ...v }; });

const localeData = ref(props.locales || {});
watch(() => props.locales, (v) => { if (v) localeData.value = v; });
const localeGet = (key) => localeData.value && localeData.value[key];

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
              Message.warning(localeGet('message3') || '请输入关键词');
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
              Message.warning(localeGet('message4') || '过滤后无关键词');
              return;
          }
          await keywordTaskAdd(model.value);
          Message.success(localeGet('message5') || '提交成功');
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