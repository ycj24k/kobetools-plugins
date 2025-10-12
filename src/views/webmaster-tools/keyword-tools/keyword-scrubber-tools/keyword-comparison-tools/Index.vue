<template>
  <div class="container">
    <div class="container_box x-tabs-fill">
      <a-tabs v-model="activeKey">
        <a-tab-pane :key="1" :title="localeGet('tabName')">
          <div class="x-pane-scroll">
            <GjcdbForm :locales="localeData" />
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
// 关键词对比工具
import GjcdbForm from './components/GjcdbForm.vue';

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
/* 父容器高度已为 100%，本组件跟随父容器填满并禁止外层滚动 */
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.container_box {
  flex: 1;
  min-height: 0;
}
</style>
