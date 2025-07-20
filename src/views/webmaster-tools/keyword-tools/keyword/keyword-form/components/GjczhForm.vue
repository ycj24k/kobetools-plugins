<template>
  <a-form class="form_box" ref="orderingFormRef" layout="vertical" hide-label :model="orderingForm" @submit="orderingFormSubmit">
    <a-grid class="form_main">
      <a-grid-item :span="18" class="form_left">
        <a-grid :col-gap="20" class="form_left_areas">
          <a-grid-item :span="6" class="form_left_area">
            <a-form-item no-style field="keywordA">
              <a-textarea v-model="keywordA" class="form_area" placeholder="一行一个，请输入组合项" allow-clear />
            </a-form-item>
            <div class="form_left_area_text">A</div>
          </a-grid-item>
          <a-grid-item :span="6" class="form_left_area">
            <a-form-item no-style field="keywordB">
              <a-textarea v-model="keywordB" class="form_area" placeholder="一行一个，请输入组合项" allow-clear />
            </a-form-item>
            <div class="form_left_area_text">B</div>
          </a-grid-item>
          <a-grid-item :span="6" class="form_left_area">
            <a-form-item no-style field="keywordC">
              <a-textarea v-model="keywordC" class="form_area" placeholder="一行一个，请输入组合项" allow-clear />
            </a-form-item>
            <div class="form_left_area_text form_left_area_text1">C</div>
          </a-grid-item>
          <a-grid-item :span="6" class="form_left_area">
            <a-form-item no-style field="keywordD">
              <a-textarea v-model="keywordD" class="form_area" placeholder="一行一个，请输入组合项" allow-clear />
            </a-form-item>
            <div class="form_left_area_text">D</div>
          </a-grid-item>
        </a-grid>
        <div class="form_item">
          <div class="flex_box flex_row_between">
            <div class="form_title" style="width: 400px;"><span style="color: #ff0000">*</span>{{ localeGet('title5') }}<span style="color: #ff0000;">（C列为核心关键词不可为空）</span></div>
            <div class="form_title_right">
              <a-checkbox :model-value="spaceCheck" @change="spaceChange">{{ localeGet('title6') }}</a-checkbox>
              <a-checkbox :model-value="orderCheckedAll" :indeterminate="orderIndeterminate" @change="orderHandleChangeAll">{{ localeGet('title7') }}</a-checkbox>
            </div>
          </div>
          <a-form-item no-style field="order">
            <a-checkbox-group @change="orderHandleChange" v-model="orderSelect" :options="orderOptions"></a-checkbox-group>
          </a-form-item>
        </div>
        <div class="form_item">
          <div class="form_title">{{ localeGet('title4') }}</div>
          <a-grid :col-gap="20" :row-gap="10">
            <a-grid-item :span="12" class="flex_box">
              <div class="form_label">字符长度</div>
              <a-form-item no-style field="lengthFilter">
                <a-space :size="20">
                  <a-switch v-model="orderingForm.lengthFilter" :checked-value="1" :unchecked-value="0" />
                  <template v-if="orderingForm.lengthFilter === 1">
                    <a-space :size="20">
                      <span>最少</span>
                      <a-select v-model="orderingForm.lengthFilterVal.min" :options="lengthMinOptions" :style="{ width: '140px' }" :placeholder="localeGet('placeholder3')">
                        <!-- <template #label="{ data }">
                          <span>{{ localeGet(data?.label) }}</span>
                        </template>
                        <template #option="{ data }">
                          <span>{{ localeGet(data?.label) }}</span>
                        </template> -->
                      </a-select>
                      <span>-</span>
                      <span>最多</span>
                      <a-select v-model="orderingForm.lengthFilterVal.max" :options="lengthMaxOptions" :style="{ width: '140px' }" :placeholder="localeGet('placeholder4')">
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
            <a-grid-item :span="12" class="flex_box">
              <div class="form_label">{{ localeGet('label4') }}</div>
              <a-form-item no-style field="sensitiveFilter">
                <a-space :size="20">
                  <a-switch v-model="orderingForm.sensitiveFilter" :checked-value="1" :unchecked-value="0" />
                  <template v-if="orderingForm.sensitiveFilter === 1">
                    <a-select v-model="orderingForm.sensitiveFilterVal" :options="customOptions" :style="{ width: '220px' }" allow-search :placeholder="localeGet('placeholder2')">
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
        <div class="flex_box flex_row_between form_btn">
          <a-button class="form_btn1" type="primary" :loading="loading" @click="orderingFormJoin">组合关键词</a-button>
          <a-button class="form_btn2" type="primary" :loading="loading">组合项插入</a-button>
          <a-button class="form_btn5" type="primary" :loading="loading" @click="clearAll">清空组合项</a-button>
          <a-button class="form_btn3" type="primary" :loading="loading" html-type="submit">保存到空间</a-button>
          <a-button class="form_btn4" type="primary" :loading="loading" @click="downloadLocale">下载到本地</a-button>
          <a-button class="form_btn6" type="primary" :loading="loading" @click="copyKeywords">复制组合词</a-button>
        </div>
      </a-grid-item>
      <a-grid-item :span="6" class="form_right">
        <a-form-item no-style>
          <a-textarea v-model="orderingResult" class="form_area" disabled />
        </a-form-item>
      </a-grid-item>
    </a-grid>
    <div class="form_explain">
      <div class="form_explain_title">{{ localeGet('introduce1') }}</div>
      <div>{{ localeGet('content3') }}</div>
      <div>{{ localeGet('content4') }}</div>
    </div>
  </a-form>
</template>

<script setup>
import { ref, watch, reactive } from 'vue';
import { Message } from '@arco-design/web-vue';
import { keywordTaskAdd } from '@/api/apps/tools/keyword';
import useClipboard from 'vue-clipboard3';
import { orderingFormDefault, sensitiveOptions, lengthMinOptions, lengthMaxOptions, customOptions, orderOptions } from '../../utils/config';
import { exportExcel } from '@/utils';
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
// 关键词在线组合

const { toClipboard } = useClipboard();

const loading = ref(false);
const keywordA = ref('');
const keywordB = ref('');
const keywordC = ref('');
const keywordD = ref('');
const orderingForm = reactive({ ...orderingFormDefault });
const orderingResult = ref('');
const keywordList = ref([]);
// 智能加空格
const spaceCheck = ref(false);
const spaceChange = (value) => {
  spaceCheck.value = value;
};
// 组合方式
const orderIndeterminate = ref(false);
const orderCheckedAll = ref(true);
const orderSelect = ref([1, 2, 3, 4, 5, 6, 7, 8]);

const orderHandleChangeAll = (value) => {
  orderIndeterminate.value = false;
  if (value) {
    orderCheckedAll.value = true;
    orderSelect.value = orderOptions.map((item) => item.value);
  } else {
    orderCheckedAll.value = false;
    orderSelect.value = [];
  }
};

const orderHandleChange = (values) => {
  console.log(values);
  if (values.length === orderOptions.length) {
    orderCheckedAll.value = true;
    orderIndeterminate.value = false;
  } else if (values.length === 0) {
    orderCheckedAll.value = false;
    orderIndeterminate.value = false;
  } else {
    orderCheckedAll.value = false;
    orderIndeterminate.value = true;
  }
};
// 组合关键词
const getKeywords = (type, listA, listB, listC, listD) => {
  let list = [];
  switch (type) {
    case 2:
      list = [listA, listC].reduce(
        (acc, curr) => {
          return acc.flatMap((d) => curr.map((e) => (spaceCheck.value ? d + ' ' + e : d + e)));
        },
        ['']
      );
      break;
    case 3:
      list = [listB, listC].reduce(
        (acc, curr) => {
          return acc.flatMap((d) => curr.map((e) => (spaceCheck.value ? d + ' ' + e : d + e)));
        },
        ['']
      );
      break;
    case 4:
      list = [listC, listD].reduce(
        (acc, curr) => {
          return acc.flatMap((d) => curr.map((e) => (spaceCheck.value ? d + ' ' + e : d + e)));
        },
        ['']
      );
      break;
    case 5:
      list = [listB, listC, listD].reduce(
        (acc, curr) => {
          return acc.flatMap((d) => curr.map((e) => (spaceCheck.value ? d + ' ' + e : d + e)));
        },
        ['']
      );
      break;
    case 6:
      list = [listA, listB, listC].reduce(
        (acc, curr) => {
          return acc.flatMap((d) => curr.map((e) => (spaceCheck.value ? d + ' ' + e : d + e)));
        },
        ['']
      );
      break;
    case 7:
      list = [listA, listC, listD].reduce(
        (acc, curr) => {
          return acc.flatMap((d) => curr.map((e) => (spaceCheck.value ? d + ' ' + e : d + e)));
        },
        ['']
      );
      break;
    case 8:
      list = [listA, listB, listC, listD].reduce(
        (acc, curr) => {
          return acc.flatMap((d) => curr.map((e) => (spaceCheck.value ? d + ' ' + e : d + e)));
        },
        ['']
      );
      break;
    default:
      list = [...listC];
  }
  return list;
};
// 快速在线组合
const orderingFormJoin = () => {
  if (!keywordC.value) {
    Message.warning(localeGet('message6'));
    return;
  }
  if (!orderSelect.value.length) {
    Message.warning(localeGet('message7'));
    return;
  }
  const listA = keywordA.value ? keywordA.value.split('\n') : [];
  const listB = keywordB.value ? keywordB.value.split('\n') : [];
  const listC = keywordC.value ? keywordC.value.split('\n') : [];
  const listD = keywordD.value ? keywordD.value.split('\n') : [];
  let keywords = [];
  let keywordlists = [];
  for (let j = 0; j < listC.length; j++) {
    let keyword = [];
    for (let i = 0; i < orderSelect.value.length; i++) {
      const list = getKeywords(orderSelect.value[i], listA, listB, [listC[j]], listD);
      keyword = [...keyword, ...list];
      keywordlists = [...keywordlists, ...list];
    }
    // 关键词去重
    if (orderingForm.removal) {
      keyword = [...new Set(keyword)];
      keywordlists = [...new Set(keywordlists)];
    }
    // 字符长度过滤
    if (orderingForm.lengthFilter) {
      const { min, max } = orderingForm.lengthFilterVal;
      if (min > 0 || max > 0) {
        keyword = keyword.filter((item) => (min === 0 && max > 0 && item.length <= max) || (min > 0 && max === 0 && item.length >= min) || (min > 0 && max > 0 && item.length >= min && item.length <= max));
        keywordlists = keywordlists.filter((item) => (min === 0 && max > 0 && item.length <= max) || (min > 0 && max === 0 && item.length >= min) || (min > 0 && max > 0 && item.length >= min && item.length <= max));
      }
    }
    keywords.push({
      name: listC[j],
      value: keyword,
    });
  }

  if (keywordlists.length === 0) {
    keywordList.value = [];
    orderingResult.value = '';
    Message.warning(localeGet('message4'));
    return;
  }
  keywordList.value = keywords;
  orderingResult.value = keywordlists.join('\n');
  Message.success(localeGet('message8'));
};
// 在线组合提交
const orderingFormSubmit = () => {
  let keywords = keywordList.value;
  if (!orderingResult.value) {
    Message.warning(localeGet('message9'));
    return;
  }
  if (!orderSelect.value.length) {
    Message.warning(localeGet('message7'));
    return;
  }
  orderingForm.keyword = keywords;
  orderingForm.orderSelect = orderSelect.value;
  orderingForm.spaceCheck = spaceCheck.value ? 1 : 0;
  keywordTaskAdd(orderingForm)
    .then((res) => {
      Message.success(localeGet('message5'));
      jumpPage('/webmaster-tools/keyword-tools/keyword/keyword-task');
    })
    .catch(() => {});
};
// 下载本地
const downloadLocale = () => {
  if (!orderingResult.value) {
    Message.warning(localeGet('message9'));
    return;
  }
  let list = orderingResult.value.split('\n');
  let lists = [];
  list.forEach((item) => {
    lists.push([item]);
  });
  exportExcel(lists, '');
};
// 清空关键词
const clearAll = () => {
  keywordA.value = '';
  keywordB.value = '';
  keywordC.value = '';
  keywordD.value = '';
  orderingResult.value = '';
  keywordList.value = [];
};
// 复制关键词
const copyKeywords = async () => {
  if (!orderingResult.value) {
    Message.warning(localeGet('message9'));
    return;
  }
  try {
    await toClipboard(orderingResult.value);
    Message.success(localeGet('message10'));
  } catch (e) {
    Message.error(localeGet('message11'));
  }
};
</script>

<style lang="less" scoped>
@import '@/assets/style/form.less';
</style>
