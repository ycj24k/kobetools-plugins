<template>
  <a-form class="form_box" ref="SEMFormRef" layout="vertical" hide-label :model="SEMForm" @submit="SEMFormSubmit">
    <a-grid class="form_main">
      <a-grid-item :span="6" class="form_left">
        <a-form-item no-style field="keyword">
          <a-textarea v-model="keyword" class="form_area" :placeholder="localeGet('placeholder10')" allow-clear />
        </a-form-item>
      </a-grid-item>
      <a-grid-item :span="18" class="form_right">
        <div class="flex_box form_item">
          <a-grid :col-gap="20" :row-gap="10" class="form_content">
            <a-grid-item :span="24" class="flex_box form_option">
              <div class="form_title"><span style="color: #ff0000">*</span>{{ localeGet('title1') }}</div>
              <a-form-item no-style field="support" :rules="[{ required: true, message: localeGet('message1') }]" :validate-trigger="['change', 'blur']">
                <a-radio-group v-model="SEMForm.support" :options="translatedZZSourceOptions"></a-radio-group>
              </a-form-item>
            </a-grid-item>
            <a-grid-item :span="14" class="flex_box form_option">
              <div class="form_title">{{ localeGet('monthSearch') }}</div>
              <a-form-item no-style field="lengthFilter">
                <a-space :size="20">
                  <a-switch v-model="SEMForm.lengthFilter" :checked-value="1" :unchecked-value="0" />
                  <template v-if="SEMForm.lengthFilter === 1">
                    <a-space :size="20">
                      <span>{{ localeGet('label6') }}</span>
                      <a-select v-model="SEMForm.lengthFilterVal.min" :options="translatedLengthMinOptions" :style="{ width: '140px' }" :placeholder="localeGet('placeholder3')"></a-select>
                      <span>-</span>
                      <span>{{ localeGet('label7') }}</span>
                      <a-select v-model="SEMForm.lengthFilterVal.max" :options="translatedLengthMaxOptions" :style="{ width: '140px' }" :placeholder="localeGet('placeholder4')"></a-select>
                    </a-space>
                  </template>
                </a-space>
              </a-form-item>
            </a-grid-item>
            <a-grid-item :span="10" class="flex_box form_option">
              <div class="form_label">{{ localeGet('label4') }}</div>
              <a-form-item no-style field="sensitiveFilter">
                <a-space :size="20">
                  <a-switch v-model="SEMForm.sensitiveFilter" :checked-value="1" :unchecked-value="0" />
                  <template v-if="SEMForm.sensitiveFilter === 1">
                    <a-select v-model="SEMForm.sensitiveFilterVal" :options="translatedCustomOptions" :style="{ width: '220px' }" allow-search :placeholder="localeGet('placeholder2')"></a-select>
                  </template>
                </a-space>
              </a-form-item>
            </a-grid-item>
          </a-grid>
        </div>
        <div class="form_item">
          <a-grid :col-gap="20" :row-gap="10" class="form_content">
            <a-grid-item :span="12" class="flex_box form_content_item">
              <div class="form_title">{{ localeGet('title4') }}</div>
              <div class="flex_box form_content_top">
                <div class="form_label">{{ localeGet('label8') }}</div>
                <a-form-item no-style field="include">
                  <a-radio-group v-model="SEMForm.include" :options="translatedIncludeOptions"></a-radio-group>
                </a-form-item>
              </div>
            </a-grid-item>
            <a-grid-item :span="12" class="form_content_item">
              <div class="flex_box form_content_top">
                <div class="form_label">{{ localeGet('label9') }}</div>
                <a-form-item no-style field="exclude">
                  <a-radio-group v-model="SEMForm.exclude" :options="translatedExcludeOptions"></a-radio-group>
                </a-form-item>
              </div>
            </a-grid-item>
          </a-grid>
          <a-grid :col-gap="20" :row-gap="10" class="form_content">
            <a-grid-item :span="12" class="flex_box form_content_item">
              <div class="form_content_input">
                <a-textarea v-model="SEMForm.includeKeyword" class="form_area" :placeholder="localeGet('placeholder5')" allow-clear />
              </div>
            </a-grid-item>
            <a-grid-item :span="12" class="form_content_item">
              <div class="form_content_input">
                <a-textarea v-model="SEMForm.excludeKeyword" class="form_area" :placeholder="localeGet('placeholder5')" allow-clear />
              </div>
            </a-grid-item>
          </a-grid>
        </div>
        <div class="form_btn form_btnp">
          <a-button class="form_btn1" type="primary" html-type="submit" :loading="loading">{{ localeGet('button1') }}</a-button>
        </div>
      </a-grid-item>
    </a-grid>
    <div class="form_explain">
      <div class="form_explain_title">{{ localeGet('introduce1') }}</div>
      <div>{{ localeGet('content1') }}</div>
      <div>{{ localeGet('content2') }}</div>
    </div>
  </a-form>
</template>

<script setup>
import { ref, watch } from 'vue';
import { Message } from '@arco-design/web-vue';
import { keywordTaskAdd, supportList } from '@/api/apps/tools/keyword';
import { SEMFormDefault, includeOptions, excludeOptions, depthOptions, ZZSourceOptions, sensitiveOptions, lengthMinOptions, lengthMaxOptions, customOptions } from '../../utils/config';
import { jumpPage, processTextArea } from '@/utils/index';
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
const translatedZZSourceOptions = translateOptions(ZZSourceOptions);
const translatedIncludeOptions = translateOptions(includeOptions);
const translatedExcludeOptions = translateOptions(excludeOptions);
const translatedCustomOptions = translateOptions(customOptions);
const translatedLengthMinOptions = translateOptions(lengthMinOptions);
const translatedLengthMaxOptions = translateOptions(lengthMaxOptions);
// 关键词挖掘
// const ZZSourceOptions = ref([]);
const SEMFormRef = ref(null);
const keyword = ref('');
const SEMForm = ref({ ...SEMFormDefault });
const loading = ref(false);

// 获取支持
// const getSupportList = async () => {
//   try {
//     const res = await supportList();
//     ZZSourceOptions.value = res.data;
//   } catch (error) {}
// };
// getSupportList();
// 关键词挖掘提交
const SEMFormSubmit = async ({ errors, values }) => {
  if (loading.value) return;
  if (!errors) {
    loading.value = true;
    try {
      SEMForm.value.keyword = processTextArea(keyword.value);
      keyword.value = SEMForm.value.keyword.join('\n')
      if (SEMForm.value.keyword.length === 0) {
        Message.warning(localeGet('message3'));
        return;
      }
      // 保留原始词
      if (SEMForm.value.reserve) {
        SEMForm.value.reserveKeyword = keyword.value;
      }
      // 字符长度过滤
      if (SEMForm.value.lengthFilter) {
        const { min, max } = SEMForm.value.lengthFilterVal;
        if (min > 0 || max > 0) {
          SEMForm.value.keyword = SEMForm.value.keyword.filter((item) => (min === 0 && max > 0 && item.length <= max) || (min > 0 && max === 0 && item.length >= min) || (min > 0 && max > 0 && item.length >= min && item.length <= max));
        }
      }
      // 包含关键词
      if (SEMForm.value.includeKeyword.length) {
        const includeKeyword = SEMForm.value.includeKeyword.split('\n');
        if (SEMForm.value.include) {
          SEMForm.value.keyword = SEMForm.value.keyword.filter((item) => includeKeyword.some((char) => item.includes(char)));
        } else {
          SEMForm.value.keyword = SEMForm.value.keyword.filter((item) => includeKeyword.every((char) => item.includes(char)));
        }
      }
      // 不包含关键词
      if (SEMForm.value.excludeKeyword.length) {
        const excludeKeyword = SEMForm.value.excludeKeyword.split('\n');
        if (SEMForm.value.exclude) {
          SEMForm.value.keyword = SEMForm.value.keyword.filter((item) => !excludeKeyword.some((char) => item.includes(char)));
        } else {
          SEMForm.value.keyword = SEMForm.value.keyword.filter((item) => !excludeKeyword.every((char) => item.includes(char)));
        }
      }
      console.log(SEMForm.value.keyword);
      if (SEMForm.value.keyword.length === 0) {
        Message.warning(localeGet('message4'));
        return;
      }
      keywordTaskAdd(SEMForm.value)
        .then((res) => {
          Message.success(localeGet('message5'));
          SEMForm.value = { ...SEMFormDefault };
          keyword.value = '';
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
</style>
