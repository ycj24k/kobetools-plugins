<script setup>
    import {ref} from "vue";
    let {download} = useHttp();
    import XTable from "@/components/common/XTable.vue";
    import XButton from "@/components/common/XButton.vue";
    import {useHttp} from "@/hooks/useHttp";

    let visible = ref(false);
    let columns = [
        {
            title: '序号',
            dataIndex: 'serialNumber',
            width: 100
        },
        {
            title: '域名信息',
            dataIndex: 'domain',
            width: 200
        },
        {
            title: 'PC权重',
            dataIndex: 'pc_br',
            width: 100
        },
        {
            title: '移动权重',
            dataIndex: 'm_br',
            width: 100
        },
        {
            title: '搜狗权重',
            dataIndex: 'sogou_pr',
            width: 100
        },
        {
            title: '谷歌权重',
            dataIndex: 'google_pr',
            width: 100
        },
        {
            title: '首页标题',
            dataIndex: 'title',
        },
    ];
    let xTable = ref(null);
    let isDownloadFile = ref(false);
    let rowData = ref({});

    /**
     * 打开详情窗口
     * @param record
     */
    function show(record){
        rowData.value = record;
        visible.value = true;
        setData();
    }

    /**
     * 设置表数据
     */
    function setData(){
        let domains = rowData.value.domains;
        if (!domains){
            return;
        }
        let result = {
            data: domains,
            total: domains.length,
            successCount: 0,
            failCount: 0,
        };
        xTable.value.setData(result);
    }

    /**
     * 导出数据
     */
    function exportExcel(){
        isDownloadFile.value = true;
        let data = [rowData.value.domain];
        download("/api/sites/export/dnsinfo", data, "导出文件.xlsx", () => {
            isDownloadFile.value = false;
        });
    }

    defineExpose({show})

</script>

<template>
    <a-modal width="auto" v-model:visible="visible" title-align="start" :closable="false" :footer="false">
        <div style="width: 1500px; height: 800px">
            <div style="height: 65px; display: flex;">
                <div style="width: 500px;">
                    <XButton color="purple_blue_pink" text="返回列表页" @xClick="visible=false"/>
                </div>
                <div style="flex: 1; display: flex; gap: 12px; justify-content: flex-end">
                    <XButton :loading="isDownloadFile" @xClick="exportExcel" color="yellow" text="导出站点信息"/>
                    <XButton color="pink" text="查询站点信息"/>
                </div>
            </div>
            <div style="height: calc(100% - 65px)">
                <XTable ref="xTable" :columns="columns"></XTable>
            </div>
        </div>
    </a-modal>
</template>

<style scoped>

</style>