<template>
  <a-form class="form_box" ref="correlationFormRef" layout="vertical" hide-label :model="correlationForm" @submit="correlationFormSubmit">
    <a-grid class="form_main">
      <a-grid-item :span="6" class="form_left">
        <a-form-item no-style field="keyword">
          <a-textarea v-model="keyword" class="form_area" :placeholder="localeGet('placeholder1')" allow-clear />
        </a-form-item>
      </a-grid-item>
      <a-grid-item :span="18" class="form_right">
        <div class="flex_box form_item form_item_radio">
          <div class="form_title"><span style="color: #ff0000">*</span>{{ localeGet('title1') }}</div>
          <a-form-item no-style field="support" :rules="[{ required: true, message: localeGet('message1') }]" :validate-trigger="['change', 'blur']">
            <a-radio-group v-model="correlationForm.support" :options="supportOptions"></a-radio-group>
          </a-form-item>
        </div>
        <div class="form_item">
          <a-grid :col-gap="20">
            <a-grid-item :span="18">
              <div class="flex_box form_item_radio form_item_radio_flex">
                <div class="form_title"><span style="color: #ff0000">*</span>{{ localeGet('title2') }}</div>
                <a-form-item no-style field="depth" :rules="[{ required: true, message: localeGet('message2') }]" :validate-trigger="['change', 'blur']">
                  <a-radio-group v-model="correlationForm.depth" :options="depthOptions">
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
            <a-grid-item :span="6" class="flex_box form_option">
              <div class="form_label">{{ localeGet('label3') }}</div>
              <a-form-item no-style field="reserve">
                <a-space :size="20">
                  <a-switch v-model="correlationForm.reserve" :checked-value="1" :unchecked-value="0" />
                </a-space>
              </a-form-item>
            </a-grid-item>
          </a-grid>
        </div>
        <div class="flex_box form_item">
          <div class="form_title">{{ localeGet('title3') }}</div>
          <a-grid :col-gap="20" :row-gap="10" class="form_content">
            <!-- <a-grid-item :span="6" class="flex_box form_option">
              <div class="form_label">{{ localeGet('label1') }}</div>
              <a-form-item no-style field="removal">
                <a-space :size="20">
                  <a-switch v-model="correlationForm.removal" :checked-value="1" :unchecked-value="0" />
                </a-space>
              </a-form-item>
            </a-grid-item>
            <a-grid-item :span="18" class="flex_box form_option">
              <div class="form_label">{{ localeGet('label2') }}</div>
              <a-form-item no-style field="keyFilter">
                <a-space :size="20">
                  <a-switch v-model="correlationForm.keyFilter" :checked-value="1" :unchecked-value="0" />
                  <template v-if="correlationForm.keyFilter === 1">
                    <a-radio-group v-model="correlationForm.keyFilterVal" :options="keyOptions">
                      <template #label="{ data }">
                        <span>{{ localeGet(data?.label) }}</span>
                      </template>
                      <template #option="{ data }">
                        <span>{{ localeGet(data?.label) }}</span>
                      </template>
                    </a-radio-group>
                  </template>
                </a-space>
              </a-form-item>
            </a-grid-item>
            <a-grid-item :span="6" class="flex_box form_option">
              <div class="form_label">{{ localeGet('label3') }}</div>
              <a-form-item no-style field="reserve">
                <a-space :size="20">
                  <a-switch v-model="correlationForm.reserve" :checked-value="1" :unchecked-value="0" />
                </a-space>
              </a-form-item>
            </a-grid-item> -->
            <a-grid-item :span="12" class="flex_box form_option">
              <div class="form_label">字符长度</div>
              <a-form-item no-style field="lengthFilter">
                <a-space :size="20">
                  <a-switch v-model="correlationForm.lengthFilter" :checked-value="1" :unchecked-value="0" />
                  <template v-if="correlationForm.lengthFilter === 1">
                    <a-space :size="20">
                      <span>{{ localeGet('label6') }}</span>
                      <a-select v-model="correlationForm.lengthFilterVal.min" :options="lengthMinOptions" :style="{ width: '140px' }" :placeholder="localeGet('placeholder3')">
                        <template #label="{ data }">
                          <span>{{ localeGet(data?.label) }}</span>
                        </template>
                        <template #option="{ data }">
                          <span>{{ localeGet(data?.label) }}</span>
                        </template>
                      </a-select>
                      <span>-</span>
                      <span>{{ localeGet('label7') }}</span>
                      <a-select v-model="correlationForm.lengthFilterVal.max" :options="lengthMaxOptions" :style="{ width: '140px' }" :placeholder="localeGet('placeholder4')">
                        <template #label="{ data }">
                          <span>{{ localeGet(data?.label) }}</span>
                        </template>
                        <template #option="{ data }">
                          <span>{{ localeGet(data?.label) }}</span>
                        </template>
                      </a-select>
                    </a-space>
                  </template>
                </a-space>
              </a-form-item>
            </a-grid-item>
            <a-grid-item :span="12" class="flex_box form_option">
              <div class="form_label">{{ localeGet('label4') }}</div>
              <a-form-item no-style field="sensitiveFilter">
                <a-space :size="20">
                  <a-switch v-model="correlationForm.sensitiveFilter" :checked-value="1" :unchecked-value="0" />
                  <template v-if="correlationForm.sensitiveFilter === 1">
                    <a-radio-group v-model="correlationForm.sensitiveFilterVal" :options="sensitiveOptions">
                      <template #label="{ data }">
                        <span>{{ localeGet(data?.label) }}</span>
                      </template>
                      <template #option="{ data }">
                        <span>{{ localeGet(data?.label) }}</span>
                      </template>
                    </a-radio-group>
                  </template>
                  <template v-if="correlationForm.sensitiveFilter === 1 && correlationForm.sensitiveFilterVal === 2">
                    <a-select v-model="correlationForm.sensitiveCustom" :options="customOptions" :style="{ width: '220px' }" allow-search :placeholder="localeGet('placeholder2')">
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
                  <a-radio-group v-model="correlationForm.include" :options="includeOptions">
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
                  <a-radio-group v-model="correlationForm.exclude" :options="excludeOptions">
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
                <a-textarea v-model="correlationForm.includeKeyword" class="form_area" placeholder="请输入关键词，每行一个关键词" allow-clear />
              </div>
            </a-grid-item>
            <a-grid-item :span="12" class="form_content_item">
              <div class="form_content_input">
                <a-textarea v-model="correlationForm.excludeKeyword" class="form_area" placeholder="请输入关键词，每行一个关键词" allow-clear />
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
import { correlationFormDefault, includeOptions, excludeOptions, depthOptions, keyOptions, sensitiveOptions, lengthMinOptions, lengthMaxOptions, customOptions } from '../../utils/config';
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
const supportOptions = ref([]);
const correlationFormRef = ref(null);
const keyword = ref('');
const correlationForm = ref({ ...correlationFormDefault });
const loading = ref(false);

// 获取支持
const getSupportList = async () => {
  try {
    const res = await supportList();
    supportOptions.value = res.data;
  } catch (error) {}
};
getSupportList();
// 关键词挖掘提交
const correlationFormSubmit = async ({ errors, values }) => {
  if (loading.value) return;
  if (!errors) {
    loading.value = true;
    try {
      correlationForm.value.keyword = keyword.value ? keyword.value.split('\n') : [];
      if (correlationForm.value.keyword.length === 0) {
        Message.warning(localeGet('message3'));
        return;
      }
      // 关键词去重
      if (correlationForm.value.removal) correlationForm.value.keyword = [...new Set(correlationForm.value.keyword)];
      // 特殊字符过滤
      if (correlationForm.value.keyFilter) {
        if (correlationForm.value.keyFilterVal === 1) {
          correlationForm.value.keyword = correlationForm.value.keyword.map((item) => item.replace(/[^\u4e00-\u9fa5a-zA-Z0-9]/g, ''));
        } else if (correlationForm.value.keyFilterVal === 2) {
          correlationForm.value.keyword = correlationForm.value.keyword.map((item) => item.replace(/\s/g, ''));
        }
      }
      // 保留原始词
      if (correlationForm.value.reserve) {
        correlationForm.value.reserveKeyword = keyword.value;
      }
      // 字符长度过滤
      if (correlationForm.value.lengthFilter) {
        const { min, max } = correlationForm.value.lengthFilterVal;
        if (min > 0 || max > 0) {
          correlationForm.value.keyword = correlationForm.value.keyword.filter((item) => (min === 0 && max > 0 && item.length <= max) || (min > 0 && max === 0 && item.length >= min) || (min > 0 && max > 0 && item.length >= min && item.length <= max));
        }
      }
      // 包含关键词
      if (correlationForm.value.includeKeyword.length) {
        const includeKeyword = correlationForm.value.includeKeyword.split('\n');
        if (correlationForm.value.include) {
          correlationForm.value.keyword = correlationForm.value.keyword.filter((item) => includeKeyword.some((char) => item.includes(char)));
        } else {
          correlationForm.value.keyword = correlationForm.value.keyword.filter((item) => includeKeyword.every((char) => item.includes(char)));
        }
      }
      // 不包含关键词
      if (correlationForm.value.excludeKeyword.length) {
        const excludeKeyword = correlationForm.value.excludeKeyword.split('\n');
        if (correlationForm.value.exclude) {
          correlationForm.value.keyword = correlationForm.value.keyword.filter((item) => !excludeKeyword.some((char) => item.includes(char)));
        } else {
          correlationForm.value.keyword = correlationForm.value.keyword.filter((item) => !excludeKeyword.every((char) => item.includes(char)));
        }
      }
      console.log(correlationForm.value.keyword);
      if (correlationForm.value.keyword.length === 0) {
        Message.warning(localeGet('message4'));
        return;
      }
      keywordTaskAdd(correlationForm.value)
        .then((res) => {
          Message.success(localeGet('message5'));
          correlationForm.value = { ...correlationFormDefault };
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
