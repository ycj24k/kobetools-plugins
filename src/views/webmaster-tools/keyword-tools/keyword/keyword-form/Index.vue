<template>
  <div class="container">
    <div class="container_box x-tabs-fill">
      <a-tabs v-model="activeKey">
        <a-tab-pane :key="1" :title="localeGet('tab1')">
          <GjcwjForm :locales="localeData" />
        </a-tab-pane>
        <a-tab-pane :key="2" :title="localeGet('tab2')">
          <GjczhForm :locales="localeData" />
        </a-tab-pane>
        <a-tab-pane :key="3" :title="localeGet('tab3')">
          <XgsscForm :locales="localeData" />
        </a-tab-pane>
        <a-tab-pane :key="4" :title="localeGet('tab4')">
          <DjdzsForm :locales="localeData" />
        </a-tab-pane>
        <a-tab-pane :key="5" :title="localeGet('tab5')">
          <JdgjcForm :locales="localeData" />
        </a-tab-pane>
        <a-tab-pane :key="6" :title="localeGet('tab6')">
          <SEMGjcForm :locales="localeData" />
        </a-tab-pane>
        <a-tab-pane :key="7" :title="localeGet('tab7')">
          <AIWjcForm :locales="localeData" />
        </a-tab-pane>
        <a-tab-pane :key="8" :title="localeGet('tab8')">
          <ZzgjckForm :locales="localeData" />
        </a-tab-pane>
        <a-tab-pane :key="9" :title="localeGet('tab9')">
          <GjclbForm :locales="localeData" />
        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useI18n } from '../utils/i18n';
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
// 关键词规划师
import SEMGjcForm from './components/SEMGjcForm.vue';
// AI挖掘词
import AIWjcForm from './components/AIWjcForm.vue';
// 站长平台词
import ZzgjckForm from './components/ZzgjckForm.vue';
// 关键词裂变
import GjclbForm from './components/GjclbForm.vue';

// 多语言
const { localeData, localeGet, initMicroApp } = useI18n();

// 初始化微前端监听
onMounted(() => {
  initMicroApp();
});

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
