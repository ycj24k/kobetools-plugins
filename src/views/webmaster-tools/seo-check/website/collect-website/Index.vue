<script setup>
import { ref, onMounted } from "vue";
import { useI18n } from '../../../keyword-tools/keyword/utils/i18n';
import localZhCN from './zh-CN.js';
import WebsiteCollectQuery from "./WebsiteCollectQuery.vue";
import BaiduCollectQuery from "./BaiduCollectQuery.vue";
import GoogleCollectQuery from "./GoogleCollectQuery.vue";
import BiyingCollectQuery from "./BiyingCollectQuery.vue";
import SougouCollectQuery from "./SougouCollectQuery.vue";
import ShenmaCollectQuery from "./ShenmaCollectQuery.vue";
import YandexCollectQuery from "./YandexCollectQuery.vue";
import HomeCollectQuery from "./HomeCollectQuery.vue";
import LinkCollectQuery from "./LinkCollectQuery.vue";

// 多语言（使用本地配置）
const { localeGet, initMicroApp, localeData } = useI18n(localZhCN);

// 初始化微前端监听
onMounted(() => {
  initMicroApp();
});
</script>

<template>
    <div class="index">
        <div style="flex: 1;">
            <a-tabs default-active-key="1" justify>
                <a-tab-pane key="1" :title="localeGet('type1')">
                    <WebsiteCollectQuery :locales="localeData" />
                </a-tab-pane>
                <a-tab-pane key="2" :title="localeGet('type2')">
                    <BaiduCollectQuery :locales="localeData" />
                </a-tab-pane>
                <a-tab-pane key="3" :title="localeGet('type3')">
                    <GoogleCollectQuery :locales="localeData" />
                </a-tab-pane>
                <a-tab-pane key="4" :title="localeGet('type4')">
                    <BiyingCollectQuery :locales="localeData" />
                </a-tab-pane>
                <a-tab-pane key="5" :title="localeGet('type5')">
                    <SougouCollectQuery :locales="localeData" />
                </a-tab-pane>
                <a-tab-pane key="6" :title="localeGet('type6')">
                    <ShenmaCollectQuery :locales="localeData" />
                </a-tab-pane>
                <a-tab-pane key="7" :title="localeGet('type7')">
                    <YandexCollectQuery :locales="localeData" />
                </a-tab-pane>
                <a-tab-pane key="8" :title="localeGet('type8')">
                    <HomeCollectQuery :locales="localeData" />
                </a-tab-pane>
                <a-tab-pane key="9" :title="localeGet('type9')">
                    <LinkCollectQuery :locales="localeData" />
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