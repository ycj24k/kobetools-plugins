<template>
  <a-form class="form_box" ref="DJDZSFormRef" layout="vertical" hide-label :model="DJDZSForm" @submit="DJDZSFormSubmit">
    <a-grid class="form_main">
      <a-grid-item :span="6" class="form_left">
        <a-form-item no-style field="keyword">
          <a-textarea v-model="keyword" class="form_area" placeholder="请输入需要挖掘的关键词，每行只输入一个关键词" allow-clear />
        </a-form-item>
      </a-grid-item>
      <a-grid-item :span="18" class="form_right">
        <div class="form_item">
          <a-grid :col-gap="20">
            <a-grid-item :span="6">
              <div class="flex_box form_item_radio">
                <div class="form_title"><span style="color: #ff0000">*</span>{{ localeGet('title1') }}</div>
                <a-form-item no-style field="support" :rules="[{ required: true, message: localeGet('message1') }]" :validate-trigger="['change', 'blur']">
                  <a-radio-group v-model="DJDZSForm.support" :options="ZZSourceOptions"></a-radio-group>
                </a-form-item>
              </div>
            </a-grid-item>
            <a-grid-item :span="12">
              <div class="flex_box form_item_radio">
                <div class="form_title"><span style="color: #ff0000">*</span>{{ localeGet('title2') }}</div>
                <a-form-item no-style field="depth" :rules="[{ required: true, message: localeGet('message2') }]" :validate-trigger="['change', 'blur']">
                  <a-radio-group v-model="DJDZSForm.depth" :options="depthOptions">
                    <template #label="{ data }">
                      <span>{{ localeGet(data?.label) }}</span>
                    </template>
                    <template #option="{ data }">
                      <span>{{ localeGet(data?.label) }}</span>
                    </template>
                  </a-radio-group>
                </a-form-item>
              </div>
            </a-grid-item>
            <a-grid-item :offset="2" :span="4" class="flex_box form_option">
              <div class="form_label">{{ localeGet('label3') }}</div>
              <a-form-item no-style field="reserve">
                <a-space :size="20">
                  <a-switch v-model="DJDZSForm.reserve" :checked-value="1" :unchecked-value="0" />
                </a-space>
              </a-form-item>
            </a-grid-item>
          </a-grid>
        </div>
        <div class="flex_box form_item">
          <div class="form_title">{{ localeGet('title3') }}</div>
          <a-grid :col-gap="20" :row-gap="10" class="form_content">
            <a-grid-item :span="14" class="flex_box form_option">
              <div class="form_label">字符长度</div>
              <a-form-item no-style field="lengthFilter">
                <a-space :size="20">
                  <a-switch v-model="DJDZSForm.lengthFilter" :checked-value="1" :unchecked-value="0" />
                  <template v-if="DJDZSForm.lengthFilter === 1">
                    <a-space :size="20">
                      <span>最少</span>
                      <a-select v-model="DJDZSForm.lengthFilterVal.min" :options="lengthMinOptions" :style="{ width: '140px' }" :placeholder="localeGet('placeholder3')">
                        <!-- <template #label="{ data }">
                          <span>{{ localeGet(data?.label) }}</span>
                        </template>
                        <template #option="{ data }">
                          <span>{{ localeGet(data?.label) }}</span>
                        </template> -->
                      </a-select>
                      <span>-</span>
                      <span>最多</span>
                      <a-select v-model="DJDZSForm.lengthFilterVal.max" :options="lengthMaxOptions" :style="{ width: '140px' }" :placeholder="localeGet('placeholder4')">
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
            <a-grid-item :offset="1" :span="9" class="flex_box form_option">
              <div class="form_label">{{ localeGet('label4') }}</div>
              <a-form-item no-style field="sensitiveFilter">
                <a-space :size="20">
                  <a-switch v-model="DJDZSForm.sensitiveFilter" :checked-value="1" :unchecked-value="0" />
                  <template v-if="DJDZSForm.sensitiveFilter === 1">
                    <a-select v-model="DJDZSForm.sensitiveFilterVal" :options="customOptions" :style="{ width: '220px' }" allow-search :placeholder="localeGet('placeholder2')">
                      <template #label="{ data }">
                        <span>{{ localeGet(data?.label) }}</span>
                      </template>
                      <template #option="{ data }">
                        <span>{{ localeGet(data?.label) }}</span>
                      </template>
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
              <div class="form_title">{{ localeGet('title4') }}</div>
              <div class="flex_box form_content_top">
                <div class="form_label">结果包含</div>
                <a-form-item no-style field="include">
                  <a-radio-group v-model="DJDZSForm.include" :options="includeOptions">
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
                  <a-radio-group v-model="DJDZSForm.exclude" :options="excludeOptions">
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
                <a-textarea v-model="DJDZSForm.includeKeyword" class="form_area" placeholder="请输入关键词，每行一个关键词" allow-clear />
              </div>
            </a-grid-item>
            <a-grid-item :span="12" class="form_content_item">
              <div class="form_content_input">
                <a-textarea v-model="DJDZSForm.excludeKeyword" class="form_area" placeholder="请输入关键词，每行一个关键词" allow-clear />
              </div>
            </a-grid-item>
          </a-grid>
        </div>
        <div class="form_btn form_btnp">
          <a-button class="form_btn1" type="primary" html-type="submit" :loading="loading">挖掘关键词</a-button>
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
import { DJDZSFormDefault, includeOptions, excludeOptions, depthOptions, ZZSourceOptions, sensitiveOptions, lengthMinOptions, lengthMaxOptions, customOptions } from '../../utils/config';
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
// const ZZSourceOptions = ref([]);
const DJDZSFormRef = ref(null);
const keyword = ref('');
const DJDZSForm = ref({ ...DJDZSFormDefault });
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
const DJDZSFormSubmit = async ({ errors, values }) => {
  if (loading.value) return;
  if (!errors) {
    loading.value = true;
    try {
      DJDZSForm.value.keyword = keyword.value ? keyword.value.split('\n') : [];
      if (DJDZSForm.value.keyword.length === 0) {
        Message.warning(localeGet('message3'));
        return;
      }
      // 关键词去重
      if (DJDZSForm.value.removal) DJDZSForm.value.keyword = [...new Set(DJDZSForm.value.keyword)];
      // 特殊字符过滤
      if (DJDZSForm.value.keyFilter) {
        if (DJDZSForm.value.keyFilterVal === 1) {
          DJDZSForm.value.keyword = DJDZSForm.value.keyword.map((item) => item.replace(/[^\u4e00-\u9fa5a-zA-Z0-9]/g, ''));
        } else if (DJDZSForm.value.keyFilterVal === 2) {
          DJDZSForm.value.keyword = DJDZSForm.value.keyword.map((item) => item.replace(/\s/g, ''));
        }
      }
      // 保留原始词
      if (DJDZSForm.value.reserve) {
        DJDZSForm.value.reserveKeyword = keyword.value;
      }
      // 字符长度过滤
      if (DJDZSForm.value.lengthFilter) {
        const { min, max } = DJDZSForm.value.lengthFilterVal;
        if (min > 0 || max > 0) {
          DJDZSForm.value.keyword = DJDZSForm.value.keyword.filter((item) => (min === 0 && max > 0 && item.length <= max) || (min > 0 && max === 0 && item.length >= min) || (min > 0 && max > 0 && item.length >= min && item.length <= max));
        }
      }
      // 包含关键词
      if (DJDZSForm.value.includeKeyword.length) {
        const includeKeyword = DJDZSForm.value.includeKeyword.split('\n');
        if (DJDZSForm.value.include) {
          DJDZSForm.value.keyword = DJDZSForm.value.keyword.filter((item) => includeKeyword.some((char) => item.includes(char)));
        } else {
          DJDZSForm.value.keyword = DJDZSForm.value.keyword.filter((item) => includeKeyword.every((char) => item.includes(char)));
        }
      }
      // 不包含关键词
      if (DJDZSForm.value.excludeKeyword.length) {
        const excludeKeyword = DJDZSForm.value.excludeKeyword.split('\n');
        if (DJDZSForm.value.exclude) {
          DJDZSForm.value.keyword = DJDZSForm.value.keyword.filter((item) => !excludeKeyword.some((char) => item.includes(char)));
        } else {
          DJDZSForm.value.keyword = DJDZSForm.value.keyword.filter((item) => !excludeKeyword.every((char) => item.includes(char)));
        }
      }
      console.log(DJDZSForm.value.keyword);
      if (DJDZSForm.value.keyword.length === 0) {
        Message.warning(localeGet('message4'));
        return;
      }
      keywordTaskAdd(DJDZSForm.value)
        .then((res) => {
          Message.success(localeGet('message5'));
          DJDZSForm.value = { ...DJDZSFormDefault };
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
