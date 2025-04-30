<script setup>

import WebsiteCollectQuery from "./WebsiteCollectQuery.vue";
import BaiduCollectQuery from "./BaiduCollectQuery.vue";
import GoogleCollectQuery from "./GoogleCollectQuery.vue";
import BiyingCollectQuery from "./BiyingCollectQuery.vue";
import SougouCollectQuery from "./SougouCollectQuery.vue";
import ShenmaCollectQuery from "./ShenmaCollectQuery.vue";
import YandexCollectQuery from "./YandexCollectQuery.vue";
import HomeCollectQuery from "./HomeCollectQuery.vue";
import LinkCollectQuery from "./LinkCollectQuery.vue";
// import WebsiteDemotionCollectQuery from "./WebsiteDemotionCollectQuery.vue";

</script>

<template>
    <div class="index">
        <div style="flex: 1;">
            <a-tabs default-active-key="1" justify>
                <a-tab-pane key="1" title="网站收录查询">
                    <WebsiteCollectQuery />
                </a-tab-pane>
                <a-tab-pane key="2" title="百度收录查询">
                    <BaiduCollectQuery />
                </a-tab-pane>
                <a-tab-pane key="3" title="谷歌收录查询">
                    <GoogleCollectQuery />
                </a-tab-pane>
                <a-tab-pane key="4" title="必应收录查询">
                    <BiyingCollectQuery />
                </a-tab-pane>
                <a-tab-pane key="5" title="搜狗收录查询">
                    <SougouCollectQuery />
                </a-tab-pane>
                <a-tab-pane key="6" title="神马收录查询">
                    <ShenmaCollectQuery />
                </a-tab-pane>
                <a-tab-pane key="7" title="Yandex收录查询">
                    <YandexCollectQuery />
                </a-tab-pane>
                <a-tab-pane key="8" title="首页收录查询">
                    <HomeCollectQuery />
                </a-tab-pane>
                <a-tab-pane key="9" title="链接收录查询">
                    <LinkCollectQuery />
                </a-tab-pane>
                <!-- <a-tab-pane key="6" title="网站降权查询">
                    <WebsiteDemotionCollectQuery />
                </a-tab-pane> -->
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
</style>