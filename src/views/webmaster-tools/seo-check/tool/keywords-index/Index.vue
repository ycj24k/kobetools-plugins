<script setup>

import KeywordsIndexQuery from "./KeywordsIndexQuery.vue";

</script>

<template>
    <div class="index">
        <div style="flex: 1;">
            <a-tabs default-active-key="1" justify>
                <a-tab-pane key="1" title="关键词索引查询">
                    <KeywordsIndexQuery />
                </a-tab-pane>
            </a-tabs>
        </div>
        <div style="height: 12px"></div>
        <div class="form_explain">
            <div class="form_explain_title">工具介绍：</div>
            <div>1、Kobetools关键词索引査询工具支持高效率、大批量査询站点优化的关键词的索引状态，用于分析站内关键词的密度和相关性。</div>
            <div>2、没有关键词索引的站点，无法优化对应关键词的排名，需要检査关键词在站内的密度和相关性布局，以及对应相关内容的收录情况。</div>
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