<template>
  <div class="container">
    <div class="container_box">
      <a-tabs v-model="activeKey">
        <a-tab-pane :key="1" title="关键词排名查询">
          <GjcpmForm :locales="localeData" />
        </a-tab-pane>
      </a-tabs>
      <div class="form_explain">
          <div class="form_explain_title">工具介绍：</div>
          <div>1、Kobetools搜索引擎排名查询工具支持高效率、大批量查询各大搜索引擎关键词排名，可精准定位国家及城市节点查询实时排名。</div>
          <div>2、Kobetools搜索引擎排名查询工具还可以指定范围查询排名，支持单个站点查询、多站点混合查询以及本地文档上传查询。</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import localeConfig from './zh-CN.js';
// 下拉关键词
import GjcpmForm from './components/GjcpmForm.vue';
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
  name: 'keyword-rank-checker-serp-checker-tools', // If you want the include property of keep-alive to take effect, you must name the component
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
