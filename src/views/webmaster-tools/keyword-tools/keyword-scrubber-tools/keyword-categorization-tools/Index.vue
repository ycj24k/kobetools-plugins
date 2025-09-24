<template>
  <div class="container">
    <div class="container_box x-tabs-fill">
      <a-tabs v-model="activeKey">
        <a-tab-pane :key="1" title="关键词分组工具">
          <GjcfzForm :locales="localeData" />
        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import localeConfig from './zh-CN.js';
// 关键词分组工具
import GjcfzForm from './components/GjcfzForm.vue';
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
const activeKey = ref(1);
</script>

<script>
export default {
  name: 'keyword-categorization-tools', // If you want the include property of keep-alive to take effect, you must name the component
};
</script>

<style lang="less" scoped>
@import '@/assets/style/form.less';
::v-deep {
  .form_box .form_title {
    width: 100px;
  }
}
</style>
