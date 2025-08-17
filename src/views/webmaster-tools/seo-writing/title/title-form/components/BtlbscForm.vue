<template>
  <a-form class="form_box" ref="titleFormRef" layout="vertical" hide-label :model="titleForm" @submit="titleFormSubmit">
    <a-grid class="form_main">
      <a-grid-item :span="4">
        <a-form-item no-style field="keyword">
          <a-textarea v-model="keyword" class="form_area" placeholder="请输入标题，一行一个" allow-clear />
        </a-form-item>
      </a-grid-item>
      <a-grid-item :span="14" class="form_middle">
        <div class="form_item">
          <a-grid :col-gap="20">
            <a-grid-item :span="12" class="form_option">
              <div class="form_btn">
                <a-button class="form_btn1" type="primary" html-type="submit" :loading="loading">一键拆分标题</a-button>
              </div>
            </a-grid-item>
            <a-grid-item :span="5" class="flex_box form_option">
              <div class="form_label form_label1 text_blue">保留原始标题</div>
              <a-form-item no-style field="isSave">
                <a-space :size="20">
                  <a-switch v-model="titleForm.isSave" :checked-value="1" :unchecked-value="0" />
                </a-space>
              </a-form-item>
            </a-grid-item>
            <a-grid-item :span="5" class="flex_box form_option">
              <div class="form_label form_label1 text_blue">同时生成关键词和描述</div>
              <a-form-item no-style field="isDesc">
                <a-space :size="20">
                  <a-switch v-model="titleForm.isDesc" :checked-value="1" :unchecked-value="0" />
                </a-space>
              </a-form-item>
            </a-grid-item>
          </a-grid>
        </div>
        <div class="set_box">
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
        </div>
        <div class="form_btn form_btnp">
          <a-button class="form_btn1" type="primary" html-type="submit" :loading="loading">标题裂变生成</a-button>
        </div>
      </a-grid-item>
      <a-grid-item :span="6">
        <a-form-item no-style field="keyword">
          <a-textarea v-model="keyword" class="form_area" placeholder="" allow-clear />
        </a-form-item>
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
import { supportList } from '@/api/apps/tools/keyword';
import { keywordTaskList } from '@/api/apps/tools/keyword';
import { titleTaskAdd } from '@/api/apps/tools/title';
import { titleFormDefault, optionOptions, connectorOptions, ruleOptions, sensitiveOptions, lengthMinOptions, lengthMaxOptions, customOptions, supportOptions } from '../../utils/config';
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
const loading = ref(false);

// 智能双标题生成
// const supportOptions = ref([]);
const taskList = ref([]);
const titleForm = ref({ ...titleFormDefault });

// 获取支持
// const getSupportList = async () => {
//   try {
//     const res = await supportList();
//     supportOptions.value = res.data;
//   } catch (error)  {}
// }
// getSupportList()
// 获取任务列表
const getTaskList = async () => {
  try {
    const res = await keywordTaskList({
      type: '',
      name: '',
      site: '',
      page: 0,
      pageSize: 10,
    });
    taskList.value = res.data.data.map((item) => {
      return {
        label: item.name,
        value: item.id,
      };
    });
  } catch (error) {}
}
getTaskList()
// 智能双标题生成提交
const titleFormSubmit = async ({ errors, values }) => {
  if (loading.value) return;
  if (!errors) {
    loading.value = true;
    try {
      console.log(titleForm.value)
      titleTaskAdd(titleForm.value)
        .then((res) => {
          Message.success(localeGet('message6'));
          jumpPage('/webmaster-tools/seo-writing/title/title-task')
        })
        .catch(() => {

        });
    } catch (err) {
      Message.error((err).message);
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
.form_box {
  .form_main {
    .form_area {
      height: calc(100vh - 520px);
    }
    .form_item {
      .form_btn {
        padding: 0;
      }
    }
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
  }
}
</style>
