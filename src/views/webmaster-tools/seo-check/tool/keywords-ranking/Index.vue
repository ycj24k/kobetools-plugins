<script setup>

import KeywordsRankingQuery from "./KeywordsRankingQuery.vue";

</script>

<template>
    <div class="index">
        <div style="flex: 1;">
            <a-tabs default-active-key="1" justify>
                <a-tab-pane key="1" title="关键词排名查询">
                    <KeywordsRankingQuery />
                </a-tab-pane>
            </a-tabs>
        </div>
        <div style="height: 12px"></div>
        <div class="form_explain">
            <div class="form_explain_title">工具介绍：</div>
            <div>1、Kobetools搜索引擎排名查询工具支持高效率、大批量查询各大搜索引擎关键词排名，可精准定位国家及城市节点查询实时排名。</div>
            <div>2、Kobetools搜索引擎排名查询工具还可以指定范围查询排名，支持单个站点查询、多站点混合查询以及本地文档上传查询。</div>
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