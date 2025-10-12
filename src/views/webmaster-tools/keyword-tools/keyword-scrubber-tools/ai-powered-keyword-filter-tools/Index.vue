<template>
  <div class="container">
    <div class="container_box x-tabs-fill">
      <a-tabs v-model="activeKey">
        <a-tab-pane :key="1" :title="localeGet('tabName')">
          <div class="x-pane-scroll">
            <GjcglForm :locales="localeData" />
          </div>
        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useI18n } from '../../keyword/utils/i18n';
import localZhCN from './zh-CN.js';
// 关键词过滤
import GjcglForm from './components/GjcglForm.vue';

// 多语言（使用本地配置）
const { localeGet, initMicroApp, localeData } = useI18n(localZhCN);

// 初始化微前端监听
onMounted(() => {
  initMicroApp();
});

const activeKey = ref(1);
</script>

<script>
export default {
  name: 'ai-powered-keyword-filter-tools', // If you want the include property of keep-alive to take effect, you must name the component
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
