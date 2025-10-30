<template>
  <div class="container">
    <div class="container_box x-tabs-fill">
      <a-tabs v-model="activeKey">
        <a-tab-pane :key="1" :title="localeGet('tabs.ai')">
          <div class="x-pane-scroll">
            <AIZnscbtForm :locales="localeData" />
          </div>
        </a-tab-pane>
        <!-- <a-tab-pane :key="2" title="关键词生成标题">
          <div class="x-pane-scroll">
            <GjcscbtForm :locales="localeData" />
          </div>
        </a-tab-pane> -->
        <a-tab-pane :key="3" :title="localeGet('tabs.dropdown')">
          <div class="x-pane-scroll">
            <XlcscbtForm :locales="localeData" />
          </div>
        </a-tab-pane>
        <a-tab-pane :key="4" :title="localeGet('tabs.textCompose')">
          <div class="x-pane-scroll">
            <WbzhscbtForm :locales="localeData" />
          </div>
        </a-tab-pane>
        <a-tab-pane :key="5" :title="localeGet('tabs.hot')">
          <div class="x-pane-scroll">
            <RsbtwjForm :locales="localeData" />
          </div>
        </a-tab-pane>
        <a-tab-pane :key="6" :title="localeGet('tabs.split')">
          <div class="x-pane-scroll">
            <BtlbscForm :locales="localeData" />
          </div>
        </a-tab-pane>
        <a-tab-pane :key="7" :title="localeGet('tabs.competitor')">
          <div class="x-pane-scroll">
            <JpbtgxForm :locales="localeData" />
          </div>
        </a-tab-pane>
        <a-tab-pane :key="8" :title="localeGet('tabs.serp')">
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
import { useI18n } from '../../../keyword-tools/keyword/utils/i18n';
import localZhCN from './zh-CN.js';
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
const { localeGet, initMicroApp, localeData } = useI18n(localZhCN);

// 微前端初始化
initMicroApp();

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
