<template>
  <div class="container">
    <div class="container_box x-tabs-fill">
      <a-tabs v-model="activeKey">
        <a-tab-pane :key="1" title="关键词对比工具">
          <div class="x-pane-scroll">
            <GjcdbForm :locales="localeData" />
          </div>
        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import localeConfig from './zh-CN.js';
// 关键词对比工具
import GjcdbForm from './components/GjcdbForm.vue';
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
