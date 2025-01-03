<script setup>

import WeightWebsiteQuery from "./WeightWebsiteQuery.vue";

</script>

<template>
    <div class="index">
        <div style="flex: 1;">
            <a-tabs default-active-key="1" justify>
                <a-tab-pane key="1" title="网站权重查询">
                    <WeightWebsiteQuery />
                </a-tab-pane>
            </a-tabs>
        </div>
        <div style="height: 12px"></div>
        <div class="form_explain">
            <div class="form_explain_title">工具介绍：</div>
            <div>1、Kobetools网站权重查询工具可批量査询网站在爱站和站长工具的权重信息，支持主流搜索引擎的域名权重查询。</div>
            <div>2、Kobetools网站权重查询工具同时可查询站点在各个搜索引擎在PC和WAP端的网站预估流量。</div>
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