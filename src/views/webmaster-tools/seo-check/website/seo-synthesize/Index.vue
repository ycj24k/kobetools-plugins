<script setup>
import { ref, onMounted } from "vue";
import { useI18n } from '../../../keyword-tools/keyword/utils/i18n';
import localZhCN from './zh-CN.js';
import SeoSynthesizeQuery from "./SeoSynthesizeQuery.vue";

const { localeGet, initMicroApp, localeData } = useI18n(localZhCN);

onMounted(() => {
  initMicroApp();
});
</script>

<template>
    <div class="index">
        <div style="flex: 1;">
            <a-tabs default-active-key="1" justify>
                <a-tab-pane key="1" :title="localeGet('type1')">
                    <SeoSynthesizeQuery />
                </a-tab-pane>
            </a-tabs>
        </div>
        <div style="height: 12px"></div>
        <div class="form_explain">
            <div class="form_explain_title">{{ localeGet('introduce1') }}</div>
            <div>{{ localeGet('content1') }}</div>
            <div>{{ localeGet('content2') }}</div>
        </div>
    </div>
</template>

<style lang="less" scoped>
:deep(.arco-tabs-tab-active) {
    font-weight: bold;
}

:deep(.arco-tabs-tab-active:hover) {
    font-weight: 500;
}
</style>