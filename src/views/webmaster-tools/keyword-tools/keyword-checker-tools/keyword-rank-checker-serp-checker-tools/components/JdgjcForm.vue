<template>
  <a-form class="form_box" ref="jingduiFormRef" layout="vertical" hide-label :model="jingduiForm" @submit="jingduiFormSubmit">
    <a-grid class="form_main">
      <!-- <a-grid-item :span="6" class="form_left">
        <a-form-item no-style field="keyword">
          <a-textarea v-model="keyword" class="form_area" :placeholder="localeGet('placeholder1')" allow-clear />
        </a-form-item>
      </a-grid-item> -->
      <a-grid-item :span="24" class="form_right">
        <div class="form_item form_item_radio">
          <a-grid  :col-gap="20" :row-gap="10" class="form_content">
            <a-grid-item :span="8" class="flex_box">
              <div class="form_title"><span style="color: #ff0000">*</span>{{ localeGet('title1') }}</div>
              <a-form-item no-style field="support" :rules="[{ required: true, message: localeGet('message1') }]" :validate-trigger="['change', 'blur']">
                <a-radio-group v-model="jingduiForm.support" :options="sourceOptions">
                  <!-- <template #label="{ data }">
                    <span>{{ localeGet(data?.label) }}</span>
                  </template>
                  <template #option="{ data }">
                    <span>{{ localeGet(data?.label) }}</span>
                  </template> -->
                </a-radio-group>
              </a-form-item>
            </a-grid-item>
            <a-grid-item :span="12" :offset="4" class="flex_box" v-if="jingduiForm.support === 2">
              <div class="form_title"><span style="color: #ff0000">*</span>搜索引擎</div>
              <a-form-item v-if="jingduiForm.support === 2" no-style field="engine" :rules="[{ required: true, message: '请选择搜索引擎' }]" :validate-trigger="['change', 'blur']">
                <a-checkbox-group v-model="jingduiForm.engine" :options="engineOptions1">
                  <!-- <template #label="{ data }">
                    <span>{{ localeGet(data?.label) }}</span>
                  </template>
                  <template #option="{ data }">
                    <span>{{ localeGet(data?.label) }}</span>
                  </template> -->
                </a-checkbox-group>
              </a-form-item>
            </a-grid-item>
            <a-grid-item :span="4" :offset="4" class="flex_box" v-if="jingduiForm.support === 3">
              <div class="form_title"><span style="color: #ff0000">*</span>搜索引擎</div>
              <a-form-item no-style field="engine" :rules="[{ required: true, message: '请选择搜索引擎' }]" :validate-trigger="['change', 'blur']">
                <a-radio-group v-model="jingduiForm.engine" :options="engineOptions2">
                  <!-- <template #label="{ data }">
                    <span>{{ localeGet(data?.label) }}</span>
                  </template>
                  <template #option="{ data }">
                    <span>{{ localeGet(data?.label) }}</span>
                  </template> -->
                </a-radio-group>
              </a-form-item>
            </a-grid-item>
          </a-grid>
        </div>
        <div class="flex_box form_item">
          <a-form-item no-style field="keyword">
            <a-textarea v-model="keyword" class="form_area" placeholder="请输入竞争对手的官方网址，如：https://www.google.com，一行一个，一次最多提交5个竞对网站" allow-clear />
          </a-form-item>
        </div>
        <div class="form_item">
          <a-grid :col-gap="20" :row-gap="10" class="form_content">
            <a-grid-item :span="12" class="flex_box form_content_item">
              <div class="form_title">{{ localeGet('title4') }}</div>
              <div class="flex_box form_content_top">
                <div class="form_label">结果包含</div>
                <a-form-item no-style field="include">
                  <a-radio-group v-model="jingduiForm.include" :options="includeOptions">
                    <template #label="{ data }">
                      <span>{{ data?.label }}</span>
                    </template>
                    <template #option="{ data }">
                      <span>{{ data?.label }}</span>
                    </template>
                  </a-radio-group>
                </a-form-item>
              </div>
            </a-grid-item>
            <a-grid-item :span="12" class="form_content_item">
              <div class="flex_box form_content_top">
                <div class="form_label">结果不包含</div>
                <a-form-item no-style field="exclude">
                  <a-radio-group v-model="jingduiForm.exclude" :options="excludeOptions">
                    <template #label="{ data }">
                      <span>{{ data?.label }}</span>
                    </template>
                    <template #option="{ data }">
                      <span>{{ data?.label }}</span>
                    </template>
                  </a-radio-group>
                </a-form-item>
              </div>
            </a-grid-item>
          </a-grid>
          <a-grid :col-gap="20" :row-gap="10" class="form_content">
            <a-grid-item :span="12" class="flex_box form_content_item">
              <div class="form_content_input">
                <a-textarea v-model="jingduiForm.includeKeyword" class="form_area" placeholder="请输入关键词，每行一个关键词" allow-clear />
              </div>
            </a-grid-item>
            <a-grid-item :span="12" class="form_content_item">
              <div class="form_content_input">
                <a-textarea v-model="jingduiForm.excludeKeyword" class="form_area" placeholder="请输入关键词，每行一个关键词" allow-clear />
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
import { jingduiFormDefault, includeOptions, excludeOptions, sourceOptions, engineOptions1, engineOptions2, sensitiveOptions, lengthMinOptions, lengthMaxOptions, customOptions } from '../../utils/config';
import { jumpPage } from '@/utils/index';

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
// 关键词挖掘
const jingduiFormRef = ref(null);
const keyword = ref('');
const jingduiForm = ref({ ...jingduiFormDefault });
const loading = ref(false);

// 关键词挖掘提交
const jingduiFormSubmit = async ({ errors, values }) => {
  if (loading.value) return;
  if (!errors) {
    loading.value = true;
    try {
      jingduiForm.value.keyword = keyword.value ? keyword.value.split('\n') : [];
      if (jingduiForm.value.keyword.length === 0) {
        Message.warning(localeGet('message3'));
        return;
      }
      // 关键词去重
      if (jingduiForm.value.removal) jingduiForm.value.keyword = [...new Set(jingduiForm.value.keyword)];
      // 特殊字符过滤
      if (jingduiForm.value.keyFilter) {
        if (jingduiForm.value.keyFilterVal === 1) {
          jingduiForm.value.keyword = jingduiForm.value.keyword.map((item) => item.replace(/[^\u4e00-\u9fa5a-zA-Z0-9]/g, ''));
        } else if (jingduiForm.value.keyFilterVal === 2) {
          jingduiForm.value.keyword = jingduiForm.value.keyword.map((item) => item.replace(/\s/g, ''));
        }
      }
      // 保留原始词
      if (jingduiForm.value.reserve) {
        jingduiForm.value.reserveKeyword = keyword.value;
      }
      // 字符长度过滤
      if (jingduiForm.value.lengthFilter) {
        const { min, max } = jingduiForm.value.lengthFilterVal;
        if (min > 0 || max > 0) {
          jingduiForm.value.keyword = jingduiForm.value.keyword.filter((item) => (min === 0 && max > 0 && item.length <= max) || (min > 0 && max === 0 && item.length >= min) || (min > 0 && max > 0 && item.length >= min && item.length <= max));
        }
      }
      // 包含关键词
      if (jingduiForm.value.includeKeyword.length) {
        const includeKeyword = jingduiForm.value.includeKeyword.split('\n');
        if (jingduiForm.value.include) {
          jingduiForm.value.keyword = jingduiForm.value.keyword.filter((item) => includeKeyword.some((char) => item.includes(char)));
        } else {
          jingduiForm.value.keyword = jingduiForm.value.keyword.filter((item) => includeKeyword.every((char) => item.includes(char)));
        }
      }
      // 不包含关键词
      if (jingduiForm.value.excludeKeyword.length) {
        const excludeKeyword = jingduiForm.value.excludeKeyword.split('\n');
        if (jingduiForm.value.exclude) {
          jingduiForm.value.keyword = jingduiForm.value.keyword.filter((item) => !excludeKeyword.some((char) => item.includes(char)));
        } else {
          jingduiForm.value.keyword = jingduiForm.value.keyword.filter((item) => !excludeKeyword.every((char) => item.includes(char)));
        }
      }
      console.log(jingduiForm.value.keyword);
      if (jingduiForm.value.keyword.length === 0) {
        Message.warning(localeGet('message4'));
        return;
      }
      keywordTaskAdd(jingduiForm.value)
        .then((res) => {
          Message.success(localeGet('message5'));
          jingduiForm.value = { ...jingduiFormDefault };
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
.form_box .form_area {
  height: 200px;
}
</style>
