<script setup>

import DomainComplexQuery from "./DomainComplexQuery.vue";

</script>

<template>
    <div class="index">
        <div style="flex: 1;">
            <a-tabs default-active-key="1" justify>
                <a-tab-pane key="1" title="域名历史查询(没有接口)">
                    <DomainComplexQuery />
                </a-tab-pane>
            </a-tabs>
        </div>
        <div style="height: 12px"></div>
        <div class="form_explain">
            <div class="form_explain_title">工具介绍：</div>
            <div>1、Kobetools域名综合査询工具支持高效率、大批量、查询域名的综合信息，包括域名注册信息、域名安全信息、域名评分信息、建站历史信息、备案信息、搜索引擎收录信息等。</div>
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