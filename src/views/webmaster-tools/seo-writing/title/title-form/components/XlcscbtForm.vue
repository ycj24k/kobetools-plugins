<template>
  <a-form class="form_box" ref="XlTitleFormRef" layout="vertical" hide-label :model="XlTitleForm" @submit="XlTitleFormSubmit">
    <div>
      <a-grid :col-gap="20" :row-gap="10">
        <a-grid-item :span="12">
          <div class="flex_box form_item">
            <div class="form_title"><span style="color: #ff0000">*</span>{{ localeGet('title1') }}</div>
            <a-form-item no-style field="taskId" :rules="[{ required: true, message: localeGet('message1') }]" :validate-trigger="['change', 'blur']">
              <a-select v-model="XlTitleForm.taskId" :options="taskList" allow-search :placeholder="localeGet('placeholder1')"></a-select>
            </a-form-item>
          </div>
        </a-grid-item>
        <a-grid-item :span="12">
          <div class="flex_box form_item form_item_radio">
            <div class="form_title"><span style="color: #ff0000">*</span>{{ localeGet('dropdown.source') }}</div>
            <a-form-item no-style field="source" :rules="[{ required: true, message: localeGet('message2') }]" :validate-trigger="['change', 'blur']">
              <a-radio-group v-model="XlTitleForm.source" :options="XlSourceOptions">
                <!-- <template #label="{ data }">
                          <span>{{localeGet(data?.label)}}</span>
                        </template>
                        <template #option="{ data }">
                          <span>{{localeGet(data?.label)}}</span>
                        </template> -->
              </a-radio-group>
            </a-form-item>
          </div>
        </a-grid-item>
      </a-grid>
      <a-grid :col-gap="20" :row-gap="10">
        <a-grid-item :span="12">
          <div class="flex_box form_item form_item_radio" style="width: 40%;">
            <div class="form_title"><span style="color: #ff0000">*</span>{{ localeGet('dropdown.option') }}</div>
            <a-form-item no-style field="option" :rules="[{ required: true, message: localeGet('message3') }]" :validate-trigger="['change', 'blur']">
              <a-radio-group v-model="XlTitleForm.style" :options="XlStyleOptions">
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
        <a-grid-item :span="12" v-if="XlTitleForm.style === 2">
          <div class="flex_box form_item form_item_radio">
            <div class="form_title"><span style="color: #ff0000">*</span>{{ localeGet('dropdown.connector') }}</div>
            <a-form-item no-style field="connector" :rules="[{ required: true, message: localeGet('message4') }]" :validate-trigger="['change', 'blur']">
              <a-radio-group v-model="XlTitleForm.connector" :options="connectorOptions">
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
        <a-grid-item :span="12" v-if="XlTitleForm.style === 1">
          <div class="flex_box form_item form_item_radio" style="width: 50%;">
            <div class="form_title"><span style="color: #ff0000">*</span>{{ localeGet('dropdown.rule') }}</div>
            <a-form-item no-style field="rule" :rules="[{ required: true, message: localeGet('message5') }]" :validate-trigger="['change', 'blur']">
              <a-radio-group v-model="XlTitleForm.rule" :options="XlRuleOptions">
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
        <a-grid-item :span="12" v-if="(XlTitleForm.style === 1 && XlTitleForm.rule === 2) || XlTitleForm.style === 2">
          <div class="flex_box form_item form_item_radio">
            <div class="form_title"><span style="color: #ff0000">*</span>{{ localeGet('dropdown.pickword') }}</div>
            <a-form-item no-style field="xlrule" :rules="[{ required: true, message: localeGet('message4') }]" :validate-trigger="['change', 'blur']">
              <a-radio-group v-model="XlTitleForm.xlrule" :options="XlKeyRuleOptions">
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
        <a-grid-item :span="12" v-if="XlTitleForm.style === 2">
          <div class="flex_box form_item form_item_radio">
            <div class="form_title"><span style="color: #ff0000">*</span>{{ localeGet('dropdown.compose') }}</div>
            <a-form-item no-style field="order" :rules="[{ required: true, message: localeGet('message4') }]" :validate-trigger="['change', 'blur']">
              <a-radio-group v-model="XlTitleForm.order" :options="XlOrderOptions">
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
        <a-grid-item :span="12" v-if="(XlTitleForm.style === 1 && XlTitleForm.rule === 2) || XlTitleForm.style === 2">
          <div class="flex_box form_item form_item_radio">
            <div class="form_title"><span style="color: #ff0000">*</span>{{ localeGet('dropdown.length') }}</div>
            <a-form-item no-style field="lengthFilter">
              <a-space :size="20">
                <a-switch v-model="XlTitleForm.lengthFilter" :checked-value="1" :unchecked-value="0" />
                <template v-if="XlTitleForm.lengthFilter === 1">
                  <a-space :size="20">
                    <span>{{ localeGet('label.min') }}</span>
                    <a-select v-model="XlTitleForm.lengthFilterVal.min" :options="lengthMinOptions" :style="{ width: '140px' }" :placeholder="localeGet('placeholder2')">
                      <!-- <template #label="{ data }">
                        <span>{{ localeGet(data?.label) }}</span>
                      </template>
                      <template #option="{ data }">
                        <span>{{ localeGet(data?.label) }}</span>
                      </template> -->
                    </a-select>
                    <span>-</span>
                    <span>{{ localeGet('label.max') }}</span>
                    <a-select v-model="XlTitleForm.lengthFilterVal.max" :options="lengthMaxOptions" :style="{ width: '140px' }" :placeholder="localeGet('placeholder3')">
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
          </div>
        </a-grid-item>
        <a-grid-item :span="12" v-if="XlTitleForm.style === 2">
          <div class="flex_box form_item form_item_radio">
            <div class="form_title"><span style="color: #ff0000">*</span>{{ localeGet('dropdown.totalLength') }}</div>
            <a-form-item no-style field="totalLengthFilter">
              <a-space :size="20">
                <a-switch v-model="XlTitleForm.totalLengthFilter" :checked-value="1" :unchecked-value="0" />
                <template v-if="XlTitleForm.totalLengthFilter === 1">
                  <a-space :size="20">
                    <span>{{ localeGet('label.min') }}</span>
                    <a-select v-model="XlTitleForm.totalLengthFilterVal.min" :options="lengthMinOptions" :style="{ width: '140px' }" :placeholder="localeGet('placeholder2')">
                      <!-- <template #label="{ data }">
                        <span>{{ localeGet(data?.label) }}</span>
                      </template>
                      <template #option="{ data }">
                        <span>{{ localeGet(data?.label) }}</span>
                      </template> -->
                    </a-select>
                    <span>-</span>
                    <span>{{ localeGet('label.max') }}</span>
                    <a-select v-model="XlTitleForm.totalLengthFilterVal.max" :options="lengthMaxOptions" :style="{ width: '140px' }" :placeholder="localeGet('placeholder3')">
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
          </div>
        </a-grid-item>
      </a-grid>
      <div class="form_item">
        <a-grid :col-gap="20" :row-gap="10" class="form_content">
          <a-grid-item :span="12" class="flex_box form_content_item">
            <div class="form_title">{{ localeGet('filter.title') }}</div>
            <div class="flex_box form_content_top">
              <div class="form_label">{{ localeGet('filter.include') }}</div>
              <a-form-item no-style field="include">
                <a-radio-group v-model="XlTitleForm.include" :options="includeOptions">
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
              <div class="form_label">{{ localeGet('filter.exclude') }}</div>
              <a-form-item no-style field="exclude">
                <a-radio-group v-model="XlTitleForm.exclude" :options="excludeOptions">
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
              <a-textarea v-model="XlTitleForm.includeKeyword" class="form_area" :placeholder="localeGet('placeholder.keywordPerLine')" allow-clear />
            </div>
          </a-grid-item>
          <a-grid-item :span="12" class="form_content_item">
            <div class="form_content_input">
              <a-textarea v-model="XlTitleForm.excludeKeyword" class="form_area" :placeholder="localeGet('placeholder.keywordPerLine')" allow-clear />
            </div>
          </a-grid-item>
        </a-grid>
      </div>
      <div class="form_btn form_btnp">
        <a-button class="form_btn1" type="primary" html-type="submit" :loading="loading">{{ localeGet('btn1') }}</a-button>
      </div>
    </div>
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
import { XlTitleFormDefault, XlStyleOptions, connectorOptions, XlRuleOptions, XlKeyRuleOptions, XlOrderOptions, XlSourceOptions, includeOptions, excludeOptions, lengthMinOptions, lengthMaxOptions } from '../../utils/config';
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
// const XlSourceOptions = ref([]);
const taskList = ref([]);
const XlTitleForm = ref({ ...XlTitleFormDefault });

// 获取支持
// const getSupportList = async () => {
//   try {
//     const res = await supportList();
//     XlSourceOptions.value = res.data;
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
const XlTitleFormSubmit = async ({ errors, values }) => {
  if (loading.value) return;
  if (!errors) {
    loading.value = true;
    try {
      console.log(XlTitleForm.value)
      titleTaskAdd(XlTitleForm.value)
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
</style>
