<template>
  <a-form class="form_box" ref="AIFormRef" layout="vertical" hide-label :model="AIForm" @submit="AIFormSubmit">
    <a-grid class="form_main">
      <a-grid-item :span="6" class="form_left">
        <a-form-item no-style field="keyword">
          <a-textarea v-model="keyword" class="form_area" placeholder="请输入需要挖掘关键词的产品或服务名称，一行一个，如：SEO公司" allow-clear />
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
              <a-select v-model="AIForm.lang" :options="AILangOptions" :style="{ width: '100%' }" placeholder="请选择关键词生成语言">
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
            <a-grid-item :span="12">
              <div class="flex_box form_item_radio form_item_radio_flex">
                <div class="form_title"><span style="color: #ff0000">*</span>挖掘来源</div>
                <a-form-item no-style field="depth" :rules="[{ required: true, message: localeGet('message2') }]" :validate-trigger="['change', 'blur']">
                  <a-radio-group v-model="AIForm.support" :options="AISourceOptions">
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
            <a-grid-item :span="12">
              <div class="flex_box form_item_radio form_item_radio_flex">
                <div class="form_title"><span style="color: #ff0000">*</span>挖掘数量</div>
                <a-form-item no-style field="depth" :rules="[{ required: true, message: localeGet('message2') }]" :validate-trigger="['change', 'blur']">
                  <a-radio-group v-model="AIForm.number" :options="AINumberOptions">
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
              <div class="form_title">{{ localeGet('title4') }}</div>
              <div class="flex_box form_content_top">
                <div class="form_label">结果包含</div>
                <a-form-item no-style field="include">
                  <a-radio-group v-model="AIForm.include" :options="includeOptions">
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
                  <a-radio-group v-model="AIForm.exclude" :options="excludeOptions">
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
                <a-textarea v-model="AIForm.includeKeyword" class="form_area" placeholder="请输入关键词，每行一个关键词" allow-clear />
              </div>
            </a-grid-item>
            <a-grid-item :span="12" class="form_content_item">
              <div class="form_content_input">
                <a-textarea v-model="AIForm.excludeKeyword" class="form_area" placeholder="请输入关键词，每行一个关键词" allow-clear />
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
import { AIFormDefault, includeOptions, excludeOptions, AISourceOptions, AILangOptions, AINumberOptions } from '../../utils/config';
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
// 关键词挖掘
// const supportOptions = ref([]);
const AIFormRef = ref(null);
const keyword = ref('');
const aiTip = ref('请输入AI提示词进行关键词挖掘，支持关键词、数量、语言通配符，用法：{keyword}、{number}、{language}，用法示例如下\n\n请帮我找出与{keyword}有关的{number}个关键词，关键词要满足用户商业搜索需求，要有一定的搜索热度，尽可能简短；关键词方向可以从价格、厂家、排行榜、推荐、费用、批发、热门地区、分类、使用场景等方向结合；只需要输入关键词，一行一个，不需要其他任何文本信息，输出{language}');
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
      AIForm.value.keyword = processTextArea(keyword.value);
      keyword.value = AIForm.value.keyword.join('\n')
      if (AIForm.value.keyword.length === 0) {
        Message.warning(localeGet('message3'));
        return;
      }
      // 保留原始词
      if (AIForm.value.reserve) {
        AIForm.value.reserveKeyword = keyword.value;
      }
      // 字符长度过滤
      if (AIForm.value.lengthFilter) {
        const { min, max } = AIForm.value.lengthFilterVal;
        if (min > 0 || max > 0) {
          AIForm.value.keyword = AIForm.value.keyword.filter((item) => (min === 0 && max > 0 && item.length <= max) || (min > 0 && max === 0 && item.length >= min) || (min > 0 && max > 0 && item.length >= min && item.length <= max));
        }
      }
      // 包含关键词
      if (AIForm.value.includeKeyword.length) {
        const includeKeyword = AIForm.value.includeKeyword.split('\n');
        if (AIForm.value.include) {
          AIForm.value.keyword = AIForm.value.keyword.filter((item) => includeKeyword.some((char) => item.includes(char)));
        } else {
          AIForm.value.keyword = AIForm.value.keyword.filter((item) => includeKeyword.every((char) => item.includes(char)));
        }
      }
      // 不包含关键词
      if (AIForm.value.excludeKeyword.length) {
        const excludeKeyword = AIForm.value.excludeKeyword.split('\n');
        if (AIForm.value.exclude) {
          AIForm.value.keyword = AIForm.value.keyword.filter((item) => !excludeKeyword.some((char) => item.includes(char)));
        } else {
          AIForm.value.keyword = AIForm.value.keyword.filter((item) => !excludeKeyword.every((char) => item.includes(char)));
        }
      }
      console.log(AIForm.value.keyword);
      if (AIForm.value.keyword.length === 0) {
        Message.warning(localeGet('message4'));
        return;
      }
      keywordTaskAdd(AIForm.value)
        .then((res) => {
          Message.success(localeGet('message5'));
          AIForm.value = { ...AIFormDefault };
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
</style>
