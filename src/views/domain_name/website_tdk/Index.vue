<script setup>

import WebsiteTdkQuery from "@/views/domain_name/website_tdk/WebsiteTdkQuery.vue";

</script>

<template>
    <div style="padding: 12px; display: flex; flex-direction: column; height: 100%; min-height: 955px;">
        <div style="flex: 1;">
            <a-tabs default-active-key="1" justify>
                <a-tab-pane key="1" title="网站TDK查询">
                    <WebsiteTdkQuery />
                </a-tab-pane>
            </a-tabs>
        </div>
        <div style="height: 12px"></div>
        <div class="form_explain">
            <div class="form_explain_title">工具介绍：</div>
            <div>1、Kobetools网站TDK查询工具支持高效率、大批量、查询网站标题、关键词、描述三大SEO要素。</div>
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

.form_explain {
    border-radius: 10px;
    background-color: #f0f4ff;
    font-size: 13px;
    color: #333;
    padding: 16px;
    font-weight: 500;
    line-height: 32px;
    .form_explain_title {
        color: #6235F4;
        font-size: 16px;
        padding: 0 0 10px;
    }
}
</style>