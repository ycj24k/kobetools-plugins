<template>
  <div class="container">
    <div class="container_box">
      <a-tabs>
        <a-tab-pane :key="1" :title="localeGet('type1')">
          <a-form class="form_box" ref="titleFormRef" layout="vertical" hide-label :model="titleForm" @submit="titleFormSubmit">
            <div>
              <div class="flex_box form_item">
                <div class="form_title"><span style="color: #ff0000">*</span>{{ localeGet('title1') }}</div>
                <a-form-item no-style field="taskId" :rules="[{ required: true, message: localeGet('message1') }]" :validate-trigger="['change', 'blur']">
                  <a-select v-model="titleForm.taskId" :options="taskList" :style="{ width: '40%' }" allow-search :placeholder="localeGet('placeholder1')"></a-select>
                </a-form-item>
              </div>
              <div class="flex_box form_item form_item_radio">
                <div class="form_title"><span style="color: #ff0000">*</span>{{ localeGet('title2') }}</div>
                <a-form-item no-style field="source" :rules="[{ required: true, message: localeGet('message2') }]" :validate-trigger="['change', 'blur']">
                  <a-radio-group v-model="titleForm.source" :options="supportOptions">
                    <!-- <template #label="{ data }">
                      <span>{{localeGet(data?.label)}}</span>
                    </template>
                    <template #option="{ data }">
                      <span>{{localeGet(data?.label)}}</span>
                    </template> -->
                  </a-radio-group>
                </a-form-item>
              </div>
              <div class="flex_box form_item form_item_radio">
                <div class="form_title"><span style="color: #ff0000">*</span>{{ localeGet('title3') }}</div>
                <a-form-item no-style field="option" :rules="[{ required: true, message: localeGet('message3') }]" :validate-trigger="['change', 'blur']">
                  <a-radio-group v-model="titleForm.option" :options="optionOptions">
                    <template #label="{ data }">
                      <span>{{ localeGet(data?.label) }}</span>
                    </template>
                    <template #option="{ data }">
                      <span>{{ localeGet(data?.label) }}</span>
                    </template>
                  </a-radio-group>
                </a-form-item>
              </div>
              <div class="flex_box form_item form_item_radio">
                <div class="form_title"><span style="color: #ff0000">*</span>{{ localeGet('title4') }}</div>
                <a-form-item no-style field="connector" :rules="[{ required: true, message: localeGet('message4') }]" :validate-trigger="['change', 'blur']">
                  <a-radio-group v-model="titleForm.connector" :options="connectorOptions">
                    <template #label="{ data }">
                      <span>{{ localeGet(data?.label) }}</span>
                    </template>
                    <template #option="{ data }">
                      <span>{{ localeGet(data?.label) }}</span>
                    </template>
                  </a-radio-group>
                </a-form-item>
              </div>
              <div class="flex_box form_item form_item_radio form_item_radio_max">
                <div class="form_title"><span style="color: #ff0000">*</span>{{ localeGet('title5') }}</div>
                <a-form-item no-style field="rule" :rules="[{ required: true, message: localeGet('message5') }]" :validate-trigger="['change', 'blur']">
                  <a-radio-group v-model="titleForm.rule" :options="ruleOptions">
                    <template #label="{ data }">
                      <span>{{ localeGet(data?.label) }}</span>
                    </template>
                    <template #option="{ data }">
                      <span>{{ localeGet(data?.label) }}</span>
                    </template>
                  </a-radio-group>
                </a-form-item>
              </div>
              <div class="flex_box form_item">
                <div class="form_title">{{ localeGet('title6') }}</div>
                <a-grid :col-gap="20" :row-gap="10" class="form_content">
                  <a-grid-item :span="4" class="flex_box form_option">
                    <div class="form_label">{{ localeGet('label1') }}</div>
                    <a-form-item no-style field="removal">
                      <a-space :size="20">
                        <a-switch v-model="titleForm.removal" :checked-value="1" :unchecked-value="0" />
                      </a-space>
                    </a-form-item>
                  </a-grid-item>
                  <a-grid-item :span="4" class="flex_box form_option">
                    <div class="form_label">{{ localeGet('label2') }}</div>
                    <a-form-item no-style field="auto">
                      <a-space :size="20">
                        <a-switch v-model="titleForm.auto" :checked-value="1" :unchecked-value="0" />
                      </a-space>
                    </a-form-item>
                  </a-grid-item>
                  <a-grid-item :span="16" class="flex_box form_option">
                    <div class="form_label">{{ localeGet('label3') }}</div>
                    <a-form-item no-style field="sensitiveFilter">
                      <a-space :size="20">
                        <a-switch v-model="titleForm.sensitiveFilter" :checked-value="1" :unchecked-value="0" />
                        <template v-if="titleForm.sensitiveFilter === 1">
                          <a-radio-group v-model="titleForm.sensitiveFilterVal" :options="sensitiveOptions">
                            <template #label="{ data }">
                              <span>{{ localeGet(data?.label) }}</span>
                            </template>
                            <template #option="{ data }">
                              <span>{{ localeGet(data?.label) }}</span>
                            </template>
                          </a-radio-group>
                        </template>
                        <template v-if="titleForm.sensitiveFilter === 1 && titleForm.sensitiveFilterVal === 2">
                          <a-select v-model="titleForm.sensitiveCustom" :options="customOptions" :style="{ width: '220px' }" allow-search :placeholder="localeGet('placeholder1')">
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
                  <a-grid-item :span="24" class="flex_box form_option">
                    <div class="form_label">{{ localeGet('label4') }}</div>
                    <a-form-item no-style field="lengthFilter">
                      <a-space :size="20">
                        <a-switch v-model="titleForm.lengthFilter" :checked-value="1" :unchecked-value="0" />
                        <template v-if="titleForm.lengthFilter === 1">
                          <a-space :size="20">
                            <span>{{ localeGet('label5') }}</span>
                            <a-select v-model="titleForm.lengthFilterVal.min" :options="lengthMinOptions" :style="{ width: '140px' }" :placeholder="localeGet('placeholder2')">
                              <template #label="{ data }">
                                <span>{{ localeGet(data?.label) }}</span>
                              </template>
                              <template #option="{ data }">
                                <span>{{ localeGet(data?.label) }}</span>
                              </template>
                            </a-select>
                            <span>-</span>
                            <span>{{ localeGet('label6') }}</span>
                            <a-select v-model="titleForm.lengthFilterVal.max" :options="lengthMaxOptions" :style="{ width: '140px' }" :placeholder="localeGet('placeholder3')">
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
                  <a-grid-item :span="24" class="flex_box form_option">
                    <div class="form_label">{{ localeGet('label7') }}</div>
                    <a-form-item no-style field="totalLengthFilter">
                      <a-space :size="20">
                        <a-switch v-model="titleForm.totalLengthFilter" :checked-value="1" :unchecked-value="0" />
                        <template v-if="titleForm.totalLengthFilter === 1">
                          <a-space :size="20">
                            <span>{{ localeGet('label5') }}</span>
                            <a-select v-model="titleForm.totalLengthFilterVal.min" :options="lengthMinOptions" :style="{ width: '140px' }" :placeholder="localeGet('placeholder2')">
                              <template #label="{ data }">
                                <span>{{ localeGet(data?.label) }}</span>
                              </template>
                              <template #option="{ data }">
                                <span>{{ localeGet(data?.label) }}</span>
                              </template>
                            </a-select>
                            <span>-</span>
                            <span>{{ localeGet('label6') }}</span>
                            <a-select v-model="titleForm.totalLengthFilterVal.max" :options="lengthMaxOptions" :style="{ width: '140px' }" :placeholder="localeGet('placeholder3')">
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
        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { Message } from '@arco-design/web-vue';
import { supportList } from '@/api/apps/tools/keyword';
import { keywordTaskList } from '@/api/apps/tools/keyword';
import { titleTaskAdd } from '@/api/apps/tools/title';
import { titleFormDefault, optionOptions, connectorOptions, ruleOptions, sensitiveOptions, lengthMinOptions, lengthMaxOptions, customOptions } from '../utils/config';
import localeConfig from './zh-CN.js';
import { jumpPage } from '@/utils/index';
// 多语言
const localeData = ref({});
localeData.value = localeConfig;
const localeGet = (key) => {
  return localeData.value[key];
};

// 监听函数
function dataListener(data) {
  console.log('来自主应用的数据', data);
  if (data&&data.locales) localeData.value = data.locales;
}
// 监听数据变化，初始化时如果有数据则主动触发一次
//@ts-ignore
if (window.microApp) window.microApp.addDataListener(dataListener, true);

const loading = ref(false);

// 智能双标题生成
const supportOptions = ref([]);
const taskList = ref([]);
const titleForm = ref({ ...titleFormDefault });

// 获取支持
const getSupportList = async () => {
  try {
    const res = await supportList();
    supportOptions.value = res.data;
  } catch (error)  {}
}
getSupportList()
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

<script>
export default {
  name: 'TitleForm', // If you want the include property of keep-alive to take effect, you must name the component
};
</script>

<style lang="less" scoped>
@import '@/assets/style/form.less';
</style>
