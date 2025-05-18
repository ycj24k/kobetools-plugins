<template>
  <div class="container">
    <div class="container_box">
      <a-tabs>
        <a-tab-pane :key="1" :title="localeGet('type1')">
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
                <div class="flex_box form_item form_item_radio form_item_radio_flex">
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
                <div class="flex_box form_item">
                  <div class="form_title">{{ localeGet('title3') }}</div>
                  <a-grid :col-gap="20" :row-gap="10" class="form_content">
                    <a-grid-item :span="6" class="flex_box form_option">
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
                    </a-grid-item>
                    <a-grid-item :span="18" class="flex_box form_option">
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
                    <a-grid-item :span="24" class="flex_box form_option">
                      <div class="form_label">{{ localeGet('label5') }}</div>
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
                  </a-grid>
                </div>
                <div class="flex_box form_item">
                  <div class="form_title">{{ localeGet('title4') }}</div>
                  <div class="form_content">
                    <div class="form_content_item">
                      <div class="flex_box form_content_top">
                        <div class="form_label">{{ localeGet('label8') }}</div>
                        <a-form-item no-style field="include">
                          <a-radio-group v-model="correlationForm.include" :options="includeOptions">
                            <template #label="{ data }">
                              <span>{{ localeGet(data?.label) }}</span>
                            </template>
                            <template #option="{ data }">
                              <span>{{ localeGet(data?.label) }}</span>
                            </template>
                          </a-radio-group>
                        </a-form-item>
                      </div>
                      <div class="form_content_input">
                        <a-input-tag v-model="correlationForm.includeKeyword" :placeholder="localeGet('placeholder5')" allow-clear />
                      </div>
                    </div>
                    <div class="form_content_item">
                      <div class="flex_box form_content_top">
                        <div class="form_label">{{ localeGet('label9') }}</div>
                        <a-form-item no-style field="exclude">
                          <a-radio-group v-model="correlationForm.exclude" :options="excludeOptions">
                            <template #label="{ data }">
                              <span>{{ localeGet(data?.label) }}</span>
                            </template>
                            <template #option="{ data }">
                              <span>{{ localeGet(data?.label) }}</span>
                            </template>
                          </a-radio-group>
                        </a-form-item>
                      </div>
                      <div class="form_content_input">
                        <a-input-tag v-model="correlationForm.excludeKeyword" :placeholder="localeGet('placeholder5')" allow-clear />
                      </div>
                    </div>
                  </div>
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
        </a-tab-pane>
        <a-tab-pane :key="2" :title="localeGet('type2')">
          <a-form class="form_box" ref="orderingFormRef" layout="vertical" hide-label :model="orderingForm" @submit="orderingFormSubmit">
            <a-grid class="form_main">
              <a-grid-item :span="18" class="form_left">
                <a-grid :col-gap="20" class="form_left_areas">
                  <a-grid-item :span="6" class="form_left_area">
                    <a-form-item no-style field="keywordA">
                      <a-textarea v-model="keywordA" class="form_area" :placeholder="localeGet('placeholder7')" allow-clear />
                    </a-form-item>
                    <div class="form_left_area_text">A</div>
                  </a-grid-item>
                  <a-grid-item :span="6" class="form_left_area">
                    <a-form-item no-style field="keywordB">
                      <a-textarea v-model="keywordB" class="form_area" :placeholder="``" allow-clear />
                    </a-form-item>
                    <div class="form_left_area_text">B</div>
                  </a-grid-item>
                  <a-grid-item :span="6" class="form_left_area">
                    <a-form-item no-style field="keywordC">
                      <a-textarea v-model="keywordC" class="form_area" :placeholder="``" allow-clear />
                    </a-form-item>
                    <div class="form_left_area_text form_left_area_text1">C</div>
                  </a-grid-item>
                  <a-grid-item :span="6" class="form_left_area">
                    <a-form-item no-style field="keywordD">
                      <a-textarea v-model="keywordD" class="form_area" :placeholder="``" allow-clear />
                    </a-form-item>
                    <div class="form_left_area_text">D</div>
                  </a-grid-item>
                </a-grid>
                <div class="form_item">
                  <div class="flex_box flex_row_between">
                    <div class="form_title"><span style="color: #ff0000">*</span>{{ localeGet('title5') }}</div>
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
                    <a-grid-item :span="6" class="flex_box">
                      <div class="form_label">{{ localeGet('label1') }}</div>
                      <a-form-item no-style field="removal">
                        <a-space :size="20">
                          <a-switch v-model="orderingForm.removal" :checked-value="1" :unchecked-value="0" />
                        </a-space>
                      </a-form-item>
                    </a-grid-item>
                    <a-grid-item :span="18" class="flex_box">
                      <div class="form_label">{{ localeGet('label4') }}</div>
                      <a-form-item no-style field="sensitiveFilter">
                        <a-space :size="20">
                          <a-switch v-model="orderingForm.sensitiveFilter" :checked-value="1" :unchecked-value="0" />
                          <template v-if="orderingForm.sensitiveFilter === 1">
                            <a-radio-group v-model="orderingForm.sensitiveFilterVal" :options="sensitiveOptions">
                              <template #label="{ data }">
                                <span>{{ localeGet(data?.label) }}</span>
                              </template>
                              <template #option="{ data }">
                                <span>{{ localeGet(data?.label) }}</span>
                              </template>
                            </a-radio-group>
                          </template>
                          <template v-if="orderingForm.sensitiveFilter === 1 && orderingForm.sensitiveFilterVal === 2">
                            <a-select v-model="orderingForm.sensitiveCustom" :options="customOptions" :style="{ width: '220px' }" allow-search :placeholder="localeGet('placeholder2')">
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
                    <a-grid-item :span="24" class="flex_box">
                      <div class="form_label">{{ localeGet('label5') }}</div>
                      <a-form-item no-style field="lengthFilter">
                        <a-space :size="20">
                          <a-switch v-model="orderingForm.lengthFilter" :checked-value="1" :unchecked-value="0" />
                          <template v-if="orderingForm.lengthFilter === 1">
                            <a-space :size="20">
                              <span>{{ localeGet('label6') }}</span>
                              <a-select v-model="orderingForm.lengthFilterVal.min" :options="lengthMinOptions" :style="{ width: '140px' }" :placeholder="localeGet('placeholder3')">
                                <template #label="{ data }">
                                  <span>{{ localeGet(data?.label) }}</span>
                                </template>
                                <template #option="{ data }">
                                  <span>{{ localeGet(data?.label) }}</span>
                                </template>
                              </a-select>
                              <span>-</span>
                              <span>{{ localeGet('label7') }}</span>
                              <a-select v-model="orderingForm.lengthFilterVal.max" :options="lengthMaxOptions" :style="{ width: '140px' }" :placeholder="localeGet('placeholder4')">
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
                <div class="flex_box flex_row_between form_btn">
                  <a-button class="form_btn1" type="primary" :loading="loading" @click="orderingFormJoin">{{ localeGet('button2') }}</a-button>
                  <a-button class="form_btn2" type="primary" :loading="loading">{{ localeGet('button3') }}</a-button>
                  <a-button class="form_btn3" type="primary" :loading="loading" html-type="submit">{{ localeGet('button4') }}</a-button>
                  <a-button class="form_btn4" type="primary" :loading="loading" @click="downloadLocale">{{ localeGet('button5') }}</a-button>
                  <a-button class="form_btn5" type="primary" :loading="loading" @click="clearAll">{{ localeGet('button6') }}</a-button>
                  <a-button class="form_btn6" type="primary" :loading="loading" @click="copyKeywords">{{ localeGet('button7') }}</a-button>
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
        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { Message } from '@arco-design/web-vue';
import { keywordTaskAdd, supportList } from '@/api/apps/tools/keyword';
import useClipboard from 'vue-clipboard3';
import { correlationFormDefault, orderingFormDefault, includeOptions, excludeOptions, depthOptions, keyOptions, sensitiveOptions, lengthMinOptions, lengthMaxOptions, customOptions, orderOptions } from '../utils/config'
import { exportExcel } from '@/utils';
import localeConfig from './zh-CN.js';
import { useRouter } from 'vue-router';
// 多语言
const localeData = ref({});
localeData.value = localeConfig;
const localeGet = (key) => {
  return localeData.value[key];
};

// 监听函数
function dataListener(data) {
  console.log('来自主应用的数据', data);
  if (data) localeData.value = data;
}
// 监听数据变化，初始化时如果有数据则主动触发一次
//@ts-ignore
if (window.microApp) window.microApp.addDataListener(dataListener, true);

const { toClipboard } = useClipboard();

const router = useRouter();
const loading = ref(false);

// 关键词挖掘
const supportOptions = ref([]);
const correlationFormRef = ref(null)
const keyword = ref('');
const correlationForm = ref({ ...correlationFormDefault });

// 获取支持
const getSupportList = async () => {
  try {
    const res = await supportList();
    supportOptions.value = res.data;
  } catch (error) {}
}
getSupportList()
// 关键词挖掘提交
const correlationFormSubmit = async ({ errors, values }) => {
  if (loading.value) return;
  if (!errors) {
    loading.value = true;
    try {
      correlationForm.value.keyword = keyword.value ? keyword.value.split('\n') : [];
      if (correlationForm.value.keyword.length === 0) {
        Message.warning(localeGet('message3'));
        return
      }
      // 关键词去重
      if (correlationForm.value.removal) correlationForm.value.keyword = [...new Set(correlationForm.value.keyword)]
      // 特殊字符过滤
      if (correlationForm.value.keyFilter) {
        if (correlationForm.value.keyFilterVal === 1) {
          correlationForm.value.keyword = correlationForm.value.keyword.map((item) => item.replace(/[^\u4e00-\u9fa5a-zA-Z0-9]/g, ''))
        } else if (correlationForm.value.keyFilterVal === 2) {
          correlationForm.value.keyword = correlationForm.value.keyword.map((item) => item.replace(/\s/g, ''))
        }
      }
      // 保留原始词
      if (correlationForm.value.reserve) {
        correlationForm.value.reserveKeyword = keyword.value
      }
      // 字符长度过滤
      if (correlationForm.value.lengthFilter) {
        const { min, max } = correlationForm.value.lengthFilterVal
        if (min >0 || max > 0) {
          correlationForm.value.keyword = correlationForm.value.keyword.filter(item => (min === 0 && max > 0 && item.length <= max)||(min > 0 && max === 0 && item.length >= min)||(min > 0 && max > 0 && item.length >= min && item.length <= max))
        }
      }
      // 包含关键词
      if (correlationForm.value.includeKeyword.length) {
        if (correlationForm.value.include) {
          correlationForm.value.keyword = correlationForm.value.keyword.filter(item => correlationForm.value.includeKeyword.some(char => item.includes(char)))
        } else {
          correlationForm.value.keyword = correlationForm.value.keyword.filter(item => correlationForm.value.includeKeyword.every(char => item.includes(char)))
        }
      }
      // 不包含关键词
      if (correlationForm.value.excludeKeyword.length) {
        if (correlationForm.value.exclude) {
          correlationForm.value.keyword = correlationForm.value.keyword.filter(item => !correlationForm.value.excludeKeyword.some(char => item.includes(char)))
        } else {
          correlationForm.value.keyword = correlationForm.value.keyword.filter(item => !correlationForm.value.excludeKeyword.every(char => item.includes(char)))
        }
      }
      console.log(correlationForm.value.keyword)
      if (correlationForm.value.keyword.length === 0) {
        Message.warning(localeGet('message4'));
        return
      }
      keywordTaskAdd(correlationForm.value)
        .then((res) => {
          Message.success(localeGet('message5'));
          correlationForm.value = { ...correlationFormDefault };
          keyword.value = '';
          router.push({
            path: '/webmaster-tools/keyword-tools/keyword/keyword-task'
          });
        })
        .catch(() => {

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
// 关键词在线组合
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
  spaceCheck.value = value
};
// 组合方式
const orderIndeterminate = ref(false);
const orderCheckedAll = ref(true);
const orderSelect = ref([1,2,3,4,5,6,7,8]);

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
  let list = []
  switch (type) {
    case 2:
      list = [listA, listC].reduce((acc, curr) => {
        return acc.flatMap(d => curr.map(e => spaceCheck.value ? d + ' ' + e : d + e));
      }, ['']);
      break;
    case 3:
      list = [listB, listC].reduce((acc, curr) => {
        return acc.flatMap(d => curr.map(e => spaceCheck.value ? d + ' ' + e : d + e));
      }, ['']);
      break;
    case 4:
      list = [listC, listD].reduce((acc, curr) => {
        return acc.flatMap(d => curr.map(e => spaceCheck.value ? d + ' ' + e : d + e));
      }, ['']);
      break;
    case 5:
      list = [listB, listC, listD].reduce((acc, curr) => {
        return acc.flatMap(d => curr.map(e => spaceCheck.value ? d + ' ' + e : d + e));
      }, ['']);
      break;
    case 6:
      list = [listA, listB, listC].reduce((acc, curr) => {
        return acc.flatMap(d => curr.map(e => spaceCheck.value ? d + ' ' + e : d + e));
      }, ['']);
      break;
    case 7:
      list = [listA, listC, listD].reduce((acc, curr) => {
        return acc.flatMap(d => curr.map(e => spaceCheck.value ? d + ' ' + e : d + e));
      }, ['']);
      break;
    case 8:
      list = [listA, listB, listC, listD].reduce((acc, curr) => {
        return acc.flatMap(d => curr.map(e => spaceCheck.value ? d + ' ' + e : d + e));
      }, ['']);
      break;
    default:
      list = [...listC]
  }
  return list
}
// 快速在线组合
const orderingFormJoin = () => {
  if (!keywordC.value) {
    Message.warning(localeGet('message6'));
    return
  }
  if (!orderSelect.value.length) {
    Message.warning(localeGet('message7'));
    return
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
      const list = getKeywords(orderSelect.value[i], listA, listB, [listC[j]], listD)
      keyword = [...keyword, ...list]
      keywordlists = [...keywordlists, ...list]
    }
    // 关键词去重
    if (orderingForm.removal) {
      keyword = [...new Set(keyword)]
      keywordlists = [...new Set(keywordlists)]
    }
    // 字符长度过滤
    if (orderingForm.lengthFilter) {
      const { min, max } = orderingForm.lengthFilterVal
      if (min >0 || max > 0) {
        keyword = keyword.filter(item => (min === 0 && max > 0 && item.length <= max)||(min > 0 && max === 0 && item.length >= min)||(min > 0 && max > 0 && item.length >= min && item.length <= max))
        keywordlists = keywordlists.filter(item => (min === 0 && max > 0 && item.length <= max)||(min > 0 && max === 0 && item.length >= min)||(min > 0 && max > 0 && item.length >= min && item.length <= max))
      }
    }
    keywords.push({
      name: listC[j],
      value: keyword
    })
  }

  if (keywordlists.length === 0) {
    keywordList.value = []
    orderingResult.value = ''
    Message.warning(localeGet('message4'));
    return
  }
  keywordList.value = keywords
  orderingResult.value = keywordlists.join('\n')
  Message.success(localeGet('message8'));
};
// 在线组合提交
const orderingFormSubmit = () => {
  let keywords = keywordList.value
  if (!orderingResult.value) {
    Message.warning(localeGet('message9'));
    return
  }
  if (!orderSelect.value.length) {
    Message.warning(localeGet('message7'));
    return
  }
  orderingForm.keyword = keywords
  orderingForm.orderSelect = orderSelect.value
  orderingForm.spaceCheck = spaceCheck.value ? 1 : 0
  keywordTaskAdd(orderingForm)
    .then((res) => {
      Message.success(localeGet('message5'));
      router.push({
        name: 'KeywordTask'
      });
    })
    .catch(() => {

    });
};
// 下载本地
const downloadLocale = () => {
  if (!orderingResult.value) {
    Message.warning(localeGet('message9'));
    return
  }
  let list = orderingResult.value.split('\n')
  let lists = []
  list.forEach(item => {
    lists.push([item])
  })
  exportExcel(lists, '')
};
// 清空关键词
const clearAll = () => {
  keywordA.value = '';
  keywordB.value = '';
  keywordC.value = '';
  keywordD.value = '';
  orderingResult.value = '';
  keywordList.value = []
}
// 复制关键词
const copyKeywords = async () => {
  if (!orderingResult.value) {
    Message.warning(localeGet('message9'));
    return
  }
  try {
    await toClipboard(orderingResult.value);
    Message.success(localeGet('message10'));
  } catch (e) {
    Message.error(localeGet('message11'));
  }
}
</script>

<script>
export default {
  name: 'KeywordForm', // If you want the include property of keep-alive to take effect, you must name the component
};
</script>

<style lang="less" scoped>
@import '@/assets/style/form.less';
</style>
