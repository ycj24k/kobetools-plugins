<template>
  <a-form class="form_box" ref="GLFormRef" layout="vertical" hide-label :model="GLForm" @submit="GLFormSubmit">
    <a-grid class="form_main">
      <a-grid-item :span="6" class="form_left">
        <a-form-item no-style field="keyword">
          <a-textarea v-model="keyword" class="form_area" placeholder="请输入需要过滤的关键词，一行一个" allow-clear />
        </a-form-item>
      </a-grid-item>
      <a-grid-item :span="18" class="form_right">
        <div class="flex_box form_item form_item_radio">
          <div class="form_title"><span style="color: #ff0000">*</span>搜索引擎</div>
          <a-space :size="0">
            <a-button type="text" @click="engineChange(0)">全选</a-button>
            <a-button type="text" @click="engineChange(1)">反选</a-button>
            <a-button type="text" @click="engineChange(2)">清除</a-button>
          </a-space>
          <a-form-item no-style>
            <a-checkbox-group v-model="engineList" :options="GLEngineOptions"></a-checkbox-group>
          </a-form-item>
        </div>
        <div class="flex_box form_item">
          <div class="form_title">过滤设置</div>
          <a-grid :col-gap="20" :row-gap="10" class="form_content">
            <a-grid-item :span="14" class="flex_box form_option">
              <div class="form_label">字符长度</div>
              <a-form-item no-style field="lengthFilter">
                <a-space :size="20">
                  <a-switch v-model="GLForm.lengthFilter" :checked-value="1" :unchecked-value="0" />
                  <template v-if="GLForm.lengthFilter === 1">
                    <a-space :size="20">
                      <span>最少</span>
                      <a-select v-model="GLForm.lengthFilterVal.min" :options="lengthMinOptions" :style="{ width: '140px' }" placeholder="请选择">
                        <!-- <template #label="{ data }">
                          <span>{{ localeGet(data?.label) }}</span>
                        </template>
                        <template #option="{ data }">
                          <span>{{ localeGet(data?.label) }}</span>
                        </template> -->
                      </a-select>
                      <span>-</span>
                      <span>最多</span>
                      <a-select v-model="GLForm.lengthFilterVal.max" :options="lengthMaxOptions" :style="{ width: '140px' }" placeholder="请选择">
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
            <a-grid-item :span="10" class="flex_box form_option">
              <div class="form_label">违禁词词库</div>
              <a-form-item no-style field="sensitiveFilter">
                <a-space :size="20">
                  <a-switch v-model="GLForm.sensitiveFilter" :checked-value="1" :unchecked-value="0" />
                  <template v-if="GLForm.sensitiveFilter === 1">
                    <a-select v-model="GLForm.sensitiveFilterVal" :options="customOptions" :style="{ width: '220px' }" allow-search placeholder="请选择">
                      <!-- <template #label="{ data }">
                        <span>{{ localeGet(data?.label) }}</span>
                      </template>
                      <template #option="{ data }">
                        <span>{{ localeGet(data?.label) }}</span>
                      </template> -->
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
              <div class="form_title">条件筛选</div>
              <div class="flex_box form_content_top">
                <div class="form_label">结果包含</div>
                <a-form-item no-style field="include">
                  <a-radio-group v-model="GLForm.include" :options="includeOptions">
                    <!-- <template #label="{ data }">
                      <span>{{ data?.label }}</span>
                    </template>
                    <template #option="{ data }">
                      <span>{{ data?.label }}</span>
                    </template> -->
                  </a-radio-group>
                </a-form-item>
              </div>
            </a-grid-item>
            <a-grid-item :span="12" class="form_content_item">
              <div class="flex_box form_content_top">
                <div class="form_label">结果不包含</div>
                <a-form-item no-style field="exclude">
                  <a-radio-group v-model="GLForm.exclude" :options="excludeOptions">
                    <!-- <template #label="{ data }">
                      <span>{{ data?.label }}</span>
                    </template>
                    <template #option="{ data }">
                      <span>{{ data?.label }}</span>
                    </template> -->
                  </a-radio-group>
                </a-form-item>
              </div>
            </a-grid-item>
          </a-grid>
          <a-grid :col-gap="20" :row-gap="10" class="form_content">
            <a-grid-item :span="12" class="flex_box form_content_item">
              <div class="form_content_input">
                <a-textarea v-model="GLForm.includeKeyword" class="form_area" placeholder="请输入关键词，每行一个关键词" allow-clear />
              </div>
            </a-grid-item>
            <a-grid-item :span="12" class="form_content_item">
              <div class="form_content_input">
                <a-textarea v-model="GLForm.excludeKeyword" class="form_area" placeholder="请输入关键词，每行一个关键词" allow-clear />
              </div>
            </a-grid-item>
          </a-grid>
        </div>
        <div class="form_btn form_btnp">
          <a-button class="form_btn1" type="primary" html-type="submit" :loading="loading">提交关键词过滤</a-button>
        </div>
      </a-grid-item>
    </a-grid>
    <div class="form_explain">
      <div class="form_explain_title">工具介绍</div>
      <!-- <div>{{ localeGet('content1') }}</div>
      <div>{{ localeGet('content2') }}</div> -->
    </div>
  </a-form>
</template>

<script setup>
import { ref, watch, h } from 'vue';
import { Message, Modal } from '@arco-design/web-vue';
import { keywordTaskAdd, supportList } from '@/api/apps/tools/keyword';
import { GLFormDefault, includeOptions, excludeOptions, GLEngineOptions, lengthMinOptions, lengthMaxOptions, customOptions } from '../../utils/config';
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
// 关键词过滤
const GLFormRef = ref(null);
const keyword = ref('');
const GLForm = ref({ ...GLFormDefault });
const loading = ref(false);
const engineList = ref([]);

// 引擎选择
function engineChange(value) {
  if (value === 0) {
    engineList.value = GLEngineOptions.map(item => item.value);
  } else if (value === 1) {
    let list = GLEngineOptions.filter(item => !engineList.value.includes(item.value));
    engineList.value = list.map(item => item.value);
  } else if (value === 2) {
    engineList.value = []
  }
}

// 获取支持
// const getSupportList = async () => {
//   try {
//     const res = await supportList();
//     supportOptions.value = res.data;
//   } catch (error) {}
// };
// getSupportList();
// 关键词过滤提交
const GLFormSubmit = async ({ errors, values }) => {
  if (loading.value) return;
  if (!errors) {
    loading.value = true;
    try {
      GLForm.value.engine = engineList.value.length ? engineList.value.join(',') : '';
      // GLForm.value.keyword = processTextArea(keyword.value);
      // keyword.value = GLForm.value.keyword.join('\n')
      // if (GLForm.value.keyword.length === 0) {
      //   Message.warning(localeGet('message3'));
      //   return;
      // }
      // // 保留原始词
      // if (GLForm.value.reserve) {
      //   GLForm.value.reserveKeyword = keyword.value;
      // }
      // // 字符长度过滤
      // if (GLForm.value.lengthFilter) {
      //   const { min, max } = GLForm.value.lengthFilterVal;
      //   if (min > 0 || max > 0) {
      //     GLForm.value.keyword = GLForm.value.keyword.filter((item) => (min === 0 && max > 0 && item.length <= max) || (min > 0 && max === 0 && item.length >= min) || (min > 0 && max > 0 && item.length >= min && item.length <= max));
      //   }
      // }
      // // 包含关键词
      // if (GLForm.value.includeKeyword.length) {
      //   const includeKeyword = GLForm.value.includeKeyword.split('\n');
      //   if (GLForm.value.include) {
      //     GLForm.value.keyword = GLForm.value.keyword.filter((item) => includeKeyword.some((char) => item.includes(char)));
      //   } else {
      //     GLForm.value.keyword = GLForm.value.keyword.filter((item) => includeKeyword.every((char) => item.includes(char)));
      //   }
      // }
      // // 不包含关键词
      // if (GLForm.value.excludeKeyword.length) {
      //   const excludeKeyword = GLForm.value.excludeKeyword.split('\n');
      //   if (GLForm.value.exclude) {
      //     GLForm.value.keyword = GLForm.value.keyword.filter((item) => !excludeKeyword.some((char) => item.includes(char)));
      //   } else {
      //     GLForm.value.keyword = GLForm.value.keyword.filter((item) => !excludeKeyword.every((char) => item.includes(char)));
      //   }
      // }
      // console.log(GLForm.value.keyword);
      // if (GLForm.value.keyword.length === 0) {
      //   Message.warning(localeGet('message4'));
      //   return;
      // }
      // keywordTaskAdd(GLForm.value)
      //   .then((res) => {
      //     Message.success(localeGet('message5'));
      //     GLForm.value = { ...GLFormDefault };
      //     keyword.value = '';
      //     jumpPage('/webmaster-tools/keyword-tools/keyword/keyword-task');
      //   })
      //   .catch(() => {});
      // 弹出提示
      Modal.info({
        title: '温馨提示',
        width: '400px',
        hideCancel: false,
        cancelText: '继续过滤',
        okText: '查看进度',
        content: () =>
          h({
            setup() {
              return () =>
                h('div', { class: 'info-modal-content' }, [
                  h('div', {}, '当前关键词清洗任务已在后台运行，请前往关键词任务列表查看进度。'),
                ]);
            },
          }),
        onOk: async () => {
          
        },
      });
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
