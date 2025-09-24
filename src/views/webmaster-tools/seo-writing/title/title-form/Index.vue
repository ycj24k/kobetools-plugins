<template>
  <div class="container">
    <div class="container_box x-tabs-fill">
      <a-tabs v-model="activeKey">
        <a-tab-pane :key="1" title="AI智能生成标题">
          <div class="x-pane-scroll">
            <AIZnscbtForm :locales="localeData" />
          </div>
        </a-tab-pane>
        <!-- <a-tab-pane :key="2" title="关键词生成标题">
          <div class="x-pane-scroll">
            <GjcscbtForm :locales="localeData" />
          </div>
        </a-tab-pane> -->
        <a-tab-pane :key="3" title="下拉词生成标题">
          <div class="x-pane-scroll">
            <XlcscbtForm :locales="localeData" />
          </div>
        </a-tab-pane>
        <a-tab-pane :key="4" title="文本组合生成标题">
          <div class="x-pane-scroll">
            <WbzhscbtForm :locales="localeData" />
          </div>
        </a-tab-pane>
        <a-tab-pane :key="5" title="热搜标题挖掘">
          <div class="x-pane-scroll">
            <RsbtwjForm :locales="localeData" />
          </div>
        </a-tab-pane>
        <a-tab-pane :key="6" title="标题裂变生成">
          <div class="x-pane-scroll">
            <BtlbscForm :locales="localeData" />
          </div>
        </a-tab-pane>
        <a-tab-pane :key="7" title="竞品标题改写">
          <div class="x-pane-scroll">
            <JpbtgxForm :locales="localeData" />
          </div>
        </a-tab-pane>
        <a-tab-pane :key="8" title="SERP排名标题改写">
          <div class="x-pane-scroll">
            <SERPPmbtgxForm :locales="localeData" />
          </div>
        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import localeConfig from './zh-CN.js';
// AI智能生成标题
import AIZnscbtForm from './components/AIZnscbtForm.vue';
// 关键词生成标题
import GjcscbtForm from './components/GjcscbtForm.vue';
// 下拉词生成标题
import XlcscbtForm from './components/XlcscbtForm.vue';
// 文本组合生成标题
import WbzhscbtForm from './components/WbzhscbtForm.vue';
// 热搜标题挖掘
import RsbtwjForm from './components/RsbtwjForm.vue';
// 标题裂变生成
import BtlbscForm from './components/BtlbscForm.vue';
// 竞品标题改写
import JpbtgxForm from './components/JpbtgxForm.vue';
// SERP排名标题改写
import SERPPmbtgxForm from './components/SERPPmbtgxForm.vue';
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

const activeKey = ref(1)
</script>

<script>
export default {
  name: 'TitleForm', // If you want the include property of keep-alive to take effect, you must name the component
};
</script>

<style lang="less" scoped>
@import '@/assets/style/form.less';
</style>
