<template>
  <div class="container">
    <div class="container_box">
      <a-tabs v-model="activeKey">
        <a-tab-pane :key="1" title="下拉关键词">
          <GjcwjForm :locales="localeData" />
        </a-tab-pane>
        <a-tab-pane :key="2" title="关键词组合">
          <GjczhForm :locales="localeData" />
        </a-tab-pane>
        <a-tab-pane :key="3" title="相关搜素词">
          <XgsscForm :locales="localeData" />
        </a-tab-pane>
        <a-tab-pane :key="4" title="大家都在搜">
          <DjdzsForm :locales="localeData" />
        </a-tab-pane>
        <a-tab-pane :key="5" title="竟对关键词">
          <JdgjcForm :locales="localeData" />
        </a-tab-pane>
        <a-tab-pane :key="6" title="SEM关键词">
          <SEMGjcForm :locales="localeData" />
        </a-tab-pane>
        <a-tab-pane :key="7" title="AI挖掘词">
          <AIWjcForm :locales="localeData" />
        </a-tab-pane>
        <a-tab-pane :key="8" title="站长关键词库">
          <ZzgjckForm :locales="localeData" />
        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import localeConfig from './zh-CN.js';
// 下拉关键词
import GjcwjForm from './components/GjcwjForm.vue';
// 关键词组合
import GjczhForm from './components/GjczhForm.vue';
// 相关搜素词
import XgsscForm from './components/XgsscForm.vue';
// 大家都在搜
import DjdzsForm from './components/DjdzsForm.vue';
// 竟对关键词
import JdgjcForm from './components/JdgjcForm.vue';
// SEM关键词
import SEMGjcForm from './components/SEMGjcForm.vue';
// AI挖掘词
import AIWjcForm from './components/AIWjcForm.vue';
// 站长关键词库
import ZzgjckForm from './components/ZzgjckForm.vue';
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
  name: 'KeywordForm', // If you want the include property of keep-alive to take effect, you must name the component
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
