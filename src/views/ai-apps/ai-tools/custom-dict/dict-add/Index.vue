<template>
  <div class="container">
    <div class="container_box">
      <a-form class="form_box" ref="titleFormRef" layout="vertical" hide-label :model="wordForm" @submit="wordFormSubmit">
        <a-grid :col-gap="20" :row-gap="30" class="form_content">
          <a-grid-item :span="24">
            <a-tabs @change="tabChange">
              <a-tab-pane :key="1" :title="localeGet('title1')">
                <a-form-item no-style field="keyword">
                  <a-textarea v-model="keyword" class="form_area" :placeholder="localeGet('placeholder1')" allow-clear />
                </a-form-item>
              </a-tab-pane>
              <a-tab-pane :key="2" :title="localeGet('title2')">
                <a-form-item no-style field="keyword">
                  <a-textarea v-model="keyword" class="form_area" :placeholder="localeGet('placeholder2')" allow-clear />
                </a-form-item>
              </a-tab-pane>
            </a-tabs>
          </a-grid-item>
          <a-grid-item :span="24" class="flex_box form_option">
            <div class="form_label">{{ localeGet('label1') }}</div>
            <a-form-item no-style field="addType">
              <a-radio-group @change="addChange" v-model="wordForm.addType" :options="addOptions">
                <template #label="{ data }">
                  <span>{{ localeGet(data?.label) }}</span>
                </template>
                <template #option="{ data }">
                  <span>{{ localeGet(data?.label) }}</span>
                </template>
              </a-radio-group>
            </a-form-item>
          </a-grid-item>
          <a-grid-item :span="24" class="flex_box form_option">
            <div class="form_label">{{ localeGet('label2') }}</div>
            <a-form-item no-style field="groupName">
              <a-input v-if="wordForm.addType === 1" v-model="wordForm.groupName" :style="{ width: '520px' }" :placeholder="localeGet('placeholder3')"></a-input>
              <a-select @change="groupChange" v-if="wordForm.addType === 2" v-model="wordForm.groupId" :options="groupList" :style="{ width: '520px' }" allow-search :placeholder="localeGet('placeholder4')"></a-select>
            </a-form-item>
          </a-grid-item>
          <a-grid-item :span="24">
            <div class="form_btn form_btnp">
              <a-button class="form_btn1" type="primary" html-type="submit" :loading="loading">{{ localeGet('btn1') }}</a-button>
            </div>
          </a-grid-item>
        </a-grid>
      </a-form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { Message } from '@arco-design/web-vue';
import { wordAdd, wordGroupList } from '@/api/apps/tools/custom';
import { addOptions, wordFormDefault } from '../utils/config';
import { useRouter } from 'vue-router';
import localeConfig from './zh-CN.js';
const router = useRouter();
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

const groupList = ref([]);
const keyword = ref('');
const wordForm = ref({ ...wordFormDefault });

function getGroupList() {
  wordGroupList({})
    .then((res) => {
      groupList.value = res.data;
    })
    .catch(() => {});
}
getGroupList();
const tabChange = (key) => {
  if (key === '1') {
    wordForm.value.type = 1;
  } else {
    wordForm.value.type = 2;
  }
  wordForm.value.keyword = [];
  keyword.value = '';
};

const addChange = (val) => {
  wordForm.value.addType = val;
  wordForm.value.groupName = '';
  wordForm.value.groupId = '';
};
const groupChange = (val) => {
  wordForm.value.groupName = groupList.value.find((item) => item.value === val).label;
};
const wordFormSubmit = async ({ errors, values }) => {
  if (loading.value) return;
  if (!errors) {
    loading.value = true;
    try {
      if (keyword.value.trim() === '') {
        Message.warning(wordForm.value.type === 1 ? localeGet('message1') : localeGet('message2'));
        return;
      }
      if (wordForm.value.addType === 1 && wordForm.value.groupName.trim() === '') {
        Message.warning(localeGet('message3'));
        return;
      }
      if (wordForm.value.addType === 2 && wordForm.value.groupId === '') {
        Message.warning(localeGet('message4'));
        return;
      }
      wordForm.value.keyword = keyword.value ? keyword.value.split('\n') : [];
      wordAdd(wordForm)
        .then((res) => {
          Message.success(localeGet('message5'));
          if (wordForm.value.type === 1) {
            jumpPage('/ai-apps/ai-tools/custom-dict/sensitive')
          } else {
            jumpPage('/ai-apps/ai-tools/custom-dict/synonym')
          }
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

<script>
export default {
  name: 'CustomForm', // If you want the include property of keep-alive to take effect, you must name the component
};
</script>

<style lang="less" scoped>
@import '@/assets/style/form.less';
.form_area {
  height: 300px !important;
}
</style>
