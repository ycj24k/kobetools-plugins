<script setup>

import WebsiteCollectQuery from "@/views/website/collect_website/WebsiteCollectQuery.vue";
import BaiduCollectQuery from "@/views/website/collect_website/BaiduCollectQuery.vue";
import GoogleCollectQuery from "@/views/website/collect_website/GoogleCollectQuery.vue";

</script>

<template>
    <div style="padding: 12px; display: flex; flex-direction: column; height: 100%; min-height: 955px;">
        <div style="flex: 1;">
            <a-tabs default-active-key="1" justify>
                <a-tab-pane key="1" title="网站收录查询">
                    <WebsiteCollectQuery />
                </a-tab-pane>
                <a-tab-pane key="2" title="百录收录查询(接口问题)">
                    <BaiduCollectQuery />
                </a-tab-pane>
                <a-tab-pane key="3" title="谷歌收录查询(没有接口)">
                    <GoogleCollectQuery />
                </a-tab-pane>
            </a-tabs>
        </div>
        <div style="height: 12px"></div>
        <div class="form_explain">
            <div class="form_explain_title">工具介绍：</div>
            <div>1、Kobetools网站收录查询工具支持高效率、大批量查询网站在各个搜索引擎的收录数据。</div>
            <div>2、Kobetools网站收录查询工具还支持百度、谷歌搜索引擎的详细收录数据查询，如总收录，日收录，周收录，月收录等。</div>
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