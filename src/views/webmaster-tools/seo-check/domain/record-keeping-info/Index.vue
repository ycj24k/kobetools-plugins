<script setup>
import RecordKeepingInfoQuery from './RecordKeepingInfoQuery.vue'
import EnterpriseRecordKeepingQuery from './EnterpriseRecordKeepingQuery.vue'
import DomainRecordKeepingHistoryQuery from './DomainRecordKeepingHistoryQuery.vue'
</script>

<template>
    <div class="index">
        <div style="flex: 1;">
            <a-tabs default-active-key="1" justify>
                <a-tab-pane key="1" title="备案信息查询">
                    <RecordKeepingInfoQuery />
                </a-tab-pane>
                <a-tab-pane key="2" title="企业/个人备案查询">
                    <EnterpriseRecordKeepingQuery />
                </a-tab-pane>
                <a-tab-pane key="3" title="域名备案历史查询">
                    <DomainRecordKeepingHistoryQuery />
                </a-tab-pane>
            </a-tabs>
        </div>
        <div style="height: 12px"></div>
        <div class="form_explain">
            <div class="form_explain_title">工具介绍：</div>
            <div>1、Kobetools域名备案查询工具支持高效率、批量、查询域名ICP备案信息。</div>
            <div>2、Kobetools企业/个人ICP备案查询，可根据备案主体批量查询该企业下所有域名的ICP备案信息。</div>
            <div>3、Kobetools域名备案历史查询工具支持高效率、批量、查询域名历史ICP备案信息。</div>
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