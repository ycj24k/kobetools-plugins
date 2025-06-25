<template>
  <div class="container">
    <div class="container_box">
      <a-tabs v-model="activeKey">
        <a-tab-pane :key="1" title="单域名查询">
          <DymForm :locales="localeData" />
        </a-tab-pane>
        <a-tab-pane :key="2" title="多域名查询">
          <DymsForm :locales="localeData" />
        </a-tab-pane>
        <a-tab-pane :key="3" title="URL链接索引查询">
          <UrlIndexForm :locales="localeData" />
        </a-tab-pane>
      </a-tabs>
      <div class="form_explain">
          <div class="form_explain_title">工具介绍：</div>
          <div>1、Kobetools关键词索引査询工具支持高效率、大批量査询站点优化的关键词的索引状态，用于分析站内关键词的密度和相关性。</div>
          <div>2、没有关键词索引的站点，无法优化对应关键词的排名，需要检査关键词在站内的密度和相关性布局，以及对应相关内容的收录情况。</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import localeConfig from './zh-CN.js';
// 关键词指数查询
import DymForm from './components/DymForm.vue';
// 多域名查询
import DymsForm from './components/DymsForm.vue';
// URL链接索引查询
import UrlIndexForm from './components/UrlIndexForm.vue';
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
  name: 'keyword-index-checker-tools', // If you want the include property of keep-alive to take effect, you must name the component
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
