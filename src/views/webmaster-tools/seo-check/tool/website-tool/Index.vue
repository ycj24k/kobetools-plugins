<script setup>

import WebsiteWeightPromoteTool from "./WebsiteWeightPromoteTool.vue";
import WebsiteCollectPromoteTool from "./WebsiteCollectPromoteTool.vue";
import WebsiteCollectPromoteToolTaskList from "./WebsiteCollectPromoteToolTaskList.vue";
import WebsiteCollectPromoteToolTaskDetails from "./WebsiteCollectPromoteToolTaskDetails.vue";

</script>

<template>
    <div class="index">
        <div style="flex: 1;">
            <a-tabs default-active-key="1" justify>
                <a-tab-pane key="1" title="网站权重提升工具">
                    <WebsiteWeightPromoteTool />
                </a-tab-pane>
                <a-tab-pane key="2" title="网站收录提升工具">
                    <WebsiteCollectPromoteTool />
                </a-tab-pane>
                <a-tab-pane key="3" title="网站收录任务列表">
                    <WebsiteCollectPromoteToolTaskList />
                </a-tab-pane>
                <a-tab-pane key="4" title="网站收录任务详情">
                    <WebsiteCollectPromoteToolTaskDetails />
                </a-tab-pane>
            </a-tabs>
        </div>
        <div style="height: 12px"></div>
        <div class="form_explain">
            <div class="form_explain_title">工具介绍：</div>
            <div>1、Kobetools网站收录提升工具支持大批量、高效率提交网站收录提升任务，支持多个搜索引擎的多种促收录方式。</div>
            <div>2、Kobetools网站收录提升工具可持续监测站点收录状态，自动识别已收录站点或URL链接，避免已收录网页重复提交的情况。</div>
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