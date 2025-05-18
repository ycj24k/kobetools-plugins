<script setup>
import { ref } from "vue";
import RecordKeepingInfoQuery from './RecordKeepingInfoQuery.vue'
import EnterpriseRecordKeepingQuery from './EnterpriseRecordKeepingQuery.vue'
import DomainRecordKeepingHistoryQuery from './DomainRecordKeepingHistoryQuery.vue'
const localeData = ref({})
const localeGet = (key) => {
    return localeData.value[key]
}
// 监听函数
function dataListener(data) {
    console.log('来自主应用的数据', data)
    if (data&&data.locales) localeData.value = data.locales;
}
// 监听数据变化，初始化时如果有数据则主动触发一次
if (window.microApp) window.microApp.addDataListener(dataListener, true)
</script>

<template>
    <div class="index">
        <div style="flex: 1;">
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
        <div style="height: 12px"></div>
        <div class="form_explain">
            <div class="form_explain_title">{{ localeGet('introduce1') }}</div>
            <div>{{ localeGet('content1') }}</div>
            <div>{{ localeGet('content2') }}</div>
            <div>{{ localeGet('content3') }}</div>
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