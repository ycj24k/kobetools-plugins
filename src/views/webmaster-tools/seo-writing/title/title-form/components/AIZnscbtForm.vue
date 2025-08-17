<template>
  <a-form class="form_box" ref="AITitleFormRef" layout="vertical" hide-label :model="AITitleForm" @submit="AITitleFormSubmit">
    <a-grid class="form_main">
      <a-grid-item :span="6" class="form_left">
        <a-form-item no-style field="keyword">
          <a-textarea v-model="keyword" class="form_area" placeholder="请输入您的标题，一行一个" allow-clear />
        </a-form-item>
      </a-grid-item>
      <a-grid-item :span="18" class="form_right">
        <a-grid :col-gap="20" class="form_item form_item_radio">
          <a-grid-item :span="12">
            <div class="flex_box">
              <div class="form_title"><span style="color: #ff0000">*</span>AI提示词</div>
              <a-button type="outline" shape="round">
                <div>一键插入AI提示词</div>
                <div style="transform: rotate(15deg)">
                  <icon-arrow-down />
                </div>
              </a-button>
            </div>
          </a-grid-item>
          <a-grid-item :span="12" class="flex_box form_option">
            <div class="flex_box" style="width: 100%">
              <div class="form_title"><span style="color: #ff0000">*</span>输出语言</div>
              <a-select v-model="AITitleForm.lang" :options="AILangOptions" :style="{ width: '100%' }" placeholder="请选择标题生成语言">
                <!-- <template #label="{ data }">
                    <span>{{ localeGet(data?.label) }}</span>
                  </template>
                  <template #option="{ data }">
                    <span>{{ localeGet(data?.label) }}</span>
                  </template> -->
              </a-select>
            </div>
          </a-grid-item>
          <a-grid-item :span="24" class="ai_tip">
            <a-form-item no-style field="keyword">
              <a-textarea v-model="aiTip" class="form_area" placeholder="请输入AI提示词" allow-clear />
            </a-form-item>
          </a-grid-item>
        </a-grid>
        <div class="form_item">
          <a-grid :col-gap="20">
            <a-grid-item :span="8">
              <div class="flex_box form_item_radio form_item_radio_flex">
                <div class="form_title"><span style="color: #ff0000">*</span>AI模型</div>
                <a-form-item no-style field="model" :rules="[{ required: true, message: localeGet('message2') }]" :validate-trigger="['change', 'blur']">
                  <a-radio-group v-model="AITitleForm.model" :options="AIModelOptions">
                    <!-- <template #label="{ data }">
                      <span>{{ localeGet(data?.label) }}</span>
                    </template>
                    <template #option="{ data }">
                      <span>{{ localeGet(data?.label) }}</span>
                    </template> -->
                  </a-radio-group>
                </a-form-item>
              </div>
            </a-grid-item>
            <a-grid-item :span="11">
              <div class="flex_box form_item_radio">
                <div class="form_title"><span style="color: #ff0000">*</span>标题数量</div>
                <a-form-item no-style field="keyNum" :rules="[{ required: true, message: localeGet('message2') }]" :validate-trigger="['change', 'blur']">
                  <a-radio-group v-model="AITitleForm.keyNum" :options="AIKeyNumOptions">
                    <!-- <template #label="{ data }">
                      <span>{{ localeGet(data?.label) }}</span>
                    </template>
                    <template #option="{ data }">
                      <span>{{ localeGet(data?.label) }}</span>
                    </template> -->
                  </a-radio-group>
                </a-form-item>
              </div>
            </a-grid-item>
            <a-grid-item :span="5" class="flex_box form_option">
              <div class="form_label form_label1">同时生成关键词和描述</div>
              <a-form-item no-style field="isDesc">
                <a-space :size="20">
                  <a-switch v-model="AITitleForm.isDesc" :checked-value="1" :unchecked-value="0" />
                </a-space>
              </a-form-item>
            </a-grid-item>
          </a-grid>
        </div>
        <div class="form_item">
          <a-grid :col-gap="20">
            <a-grid-item :span="24">
              <div class="flex_box form_item_radio form_item_radio_flex">
                <div class="form_title"><span style="color: #ff0000">*</span>标题风格</div>
                <a-form-item no-style field="style" :rules="[{ required: true, message: localeGet('message2') }]" :validate-trigger="['change', 'blur']">
                  <a-radio-group v-model="AITitleForm.style" :options="AIStyleOptions">
                    <!-- <template #label="{ data }">
                      <span>{{ localeGet(data?.label) }}</span>
                    </template>
                    <template #option="{ data }">
                      <span>{{ localeGet(data?.label) }}</span>
                    </template> -->
                  </a-radio-group>
                </a-form-item>
              </div>
            </a-grid-item>
          </a-grid>
        </div>
        <div class="form_item">
          <a-grid :col-gap="20" :row-gap="10" class="form_content">
            <a-grid-item :span="12" class="flex_box form_content_item">
              <div class="form_title">条件筛选</div>
              <div class="flex_box form_content_top">
                <div class="form_label">结果包含</div>
                <a-form-item no-style field="include">
                  <a-radio-group v-model="AITitleForm.include" :options="includeOptions">
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
                  <a-radio-group v-model="AITitleForm.exclude" :options="excludeOptions">
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
                <a-textarea v-model="AITitleForm.includeKeyword" class="form_area" placeholder="请输入关键词，每行一个关键词" allow-clear />
              </div>
            </a-grid-item>
            <a-grid-item :span="12" class="form_content_item">
              <div class="form_content_input">
                <a-textarea v-model="AITitleForm.excludeKeyword" class="form_area" placeholder="请输入关键词，每行一个关键词" allow-clear />
              </div>
            </a-grid-item>
          </a-grid>
        </div>
        <div class="form_btn form_btnp">
          <a-button class="form_btn1" type="primary" html-type="submit" :loading="loading">AI生成标题</a-button>
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
import { AITitleFormDefault, includeOptions, excludeOptions, AIModelOptions, AILangOptions, AIKeyNumOptions, AIStyleOptions } from '../../utils/config';
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
// 标题生成
// const supportOptions = ref([]);
const AITitleFormRef = ref(null);
const keyword = ref('');
const aiTip = ref('请输入AI提示词进行标题生成，支持标题、数量、语言通配符，用法：{keyword}、{number}、{language}，用法示例如下\n\n请帮我找出与{keyword}有关的{number}个标题，标题要满足用户商业搜索需求，要有一定的搜索热度，尽可能简短；标题方向可以从价格、厂家、排行榜、推荐、费用、批发、热门地区、分类、使用场景等方向结合；只需要输入标题，一行一个，不需要其他任何文本信息，输出{language}');
const AITitleForm = ref({ ...AITitleFormDefault });
const loading = ref(false);

// 获取支持
// const getSupportList = async () => {
//   try {
//     const res = await supportList();
//     supportOptions.value = res.data;
//   } catch (error) {}
// };
// getSupportList();
// 标题生成提交
const AITitleFormSubmit = async ({ errors, values }) => {
  if (loading.value) return;
  if (!errors) {
    loading.value = true;
    try {
      AITitleForm.value.keyword = processTextArea(keyword.value);
      keyword.value = AITitleForm.value.keyword.join('\n')
      if (AITitleForm.value.keyword.length === 0) {
        Message.warning('请输入您的产品或服务');
        return;
      }
      // 包含关键词
      if (AITitleForm.value.includeKeyword.length) {
        const includeKeyword = AITitleForm.value.includeKeyword.split('\n');
        if (AITitleForm.value.include) {
          AITitleForm.value.keyword = AITitleForm.value.keyword.filter((item) => includeKeyword.some((char) => item.includes(char)));
        } else {
          AITitleForm.value.keyword = AITitleForm.value.keyword.filter((item) => includeKeyword.every((char) => item.includes(char)));
        }
      }
      // 不包含关键词
      if (AITitleForm.value.excludeKeyword.length) {
        const excludeKeyword = AITitleForm.value.excludeKeyword.split('\n');
        if (AITitleForm.value.exclude) {
          AITitleForm.value.keyword = AITitleForm.value.keyword.filter((item) => !excludeKeyword.some((char) => item.includes(char)));
        } else {
          AITitleForm.value.keyword = AITitleForm.value.keyword.filter((item) => !excludeKeyword.every((char) => item.includes(char)));
        }
      }
      console.log(AITitleForm.value.keyword);
      if (AITitleForm.value.keyword.length === 0) {
        Message.warning(localeGet('message4'));
        return;
      }
      keywordTaskAdd(AITitleForm.value)
        .then((res) => {
          Message.success(localeGet('message5'));
          AITitleForm.value = { ...AITitleFormDefault };
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
.form_box .form_item_radio {
  :deep(.arco-radio) {
    width: auto;
    flex: 1;
  }
}
.ai_tip .form_area {
  height: 150px;
}
.form_label1 {
  width: auto!important;
  padding-right: 6px;
}
</style>
