<script setup>
import { ref, onMounted } from "vue";
import { useI18n } from '../../../keyword-tools/keyword/utils/i18n';
import localZhCN from './zh-CN.js';
import RecordKeepingInfoQuery from './RecordKeepingInfoQuery.vue'
import EnterpriseRecordKeepingQuery from './EnterpriseRecordKeepingQuery.vue'
import DomainRecordKeepingHistoryQuery from './DomainRecordKeepingHistoryQuery.vue'

// 多语言（使用本地配置）
const { localeGet, initMicroApp, localeData } = useI18n(localZhCN);

// 初始化微前端监听
onMounted(() => {
  initMicroApp();
});
</script>

<template>
    <div class="domain-page">
        <div class="domain-page__tabs">
            <a-tabs default-active-key="1" justify>
                <a-tab-pane key="1" :title="localeGet('type1')">
                    <RecordKeepingInfoQuery :locales="localeData" />
                </a-tab-pane>
                <a-tab-pane key="2" :title="localeGet('type2')">
                    <EnterpriseRecordKeepingQuery :locales="localeData" />
                </a-tab-pane>
                <a-tab-pane key="3" :title="localeGet('type3')">
                    <DomainRecordKeepingHistoryQuery :locales="localeData" />
                </a-tab-pane>
            </a-tabs>
        </div>
        <div class="domain-page__spacer"></div>
        <div class="form_explain">
            <div class="form_explain_title">{{ localeGet('introduce1') }}</div>
            <div>{{ localeGet('content1') }}</div>
            <div>{{ localeGet('content2') }}</div>
            <div>{{ localeGet('content3') }}</div>
        </div>
    </div>
</template>

<style lang="less" scoped>
@import '@/assets/style/domain.less';

:deep(.arco-tabs-tab-active) {
    font-weight: bold;
}

:deep(.arco-tabs-tab-active:hover) {
    font-weight: 500;
}
</style>
