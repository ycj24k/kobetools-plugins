<script setup>

import OuterLinkWebsiteQuery from "./OuterLinkWebsiteQuery.vue";

</script>

<template>
    <div class="index">
        <div style="flex: 1;">
            <a-tabs default-active-key="1" justify>
                <a-tab-pane key="1" title="网站首页外链查询">
                    <OuterLinkWebsiteQuery />
                </a-tab-pane>
            </a-tabs>
        </div>
        <div style="height: 12px"></div>
        <div class="form_explain">
            <div class="form_explain_title">工具介绍：</div>
            <div>1、Koketools首页外链査询工具可高效率、大批量査询域名首页的外链情况，包含发现时间、链接权重、是否互链、是否nofollow等。</div>
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