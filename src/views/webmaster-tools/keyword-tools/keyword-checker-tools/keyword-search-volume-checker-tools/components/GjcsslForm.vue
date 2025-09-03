<template>
  <div style="display: flex; flex-direction: column; height: 100%;">
    <div style="height: 12px;"></div>
    <div style="display: flex; gap: 12px;">
      <div style="display: flex; gap: 12px; width: 300px;">
        <a-radio-group v-model="queryParam.language">
          <a-radio v-for="language in languages" :key="language.code" :value="language.code">{{ language.name }}</a-radio>
        </a-radio-group>
      </div>
    </div>
    <div style="height: 25px;"></div>
    <div style="flex: 1;">
      <XTextarea v-model="queryParam.keywords" placeholder="请输入需要查询的关键字，一行一个，一次最多提交100个" />
    </div>
    <div style="height: 100px; display: flex; align-items: center;">
      <div style="width: 500px;">
        <XButton :loading="xTable?.table?.isLoadTable" @xClick="queryTableData" color="purple_blue_pink" text="立即查询" />
      </div>
      <div style="flex: 1; display: flex; gap: 12px; justify-content: flex-end">
        <XButton :loading="isDownloadFile" @xClick="exportTableData" color="blue" text="导出查询结果" />
        <XButton color="pink" text="VIP查询通道" />
      </div>
    </div>
    <div style="height: 400px;">
      <XTable ref="xTable" :columns="columns" :spanMethod="spanMethod">
        <template>
          详情|未开发
        </template>
      </XTable>
    </div>
  </div>
</template>

<script setup>
import { computed, reactive, ref } from "vue";
import XButton from "@/components/common/XButton.vue";
import XTextarea from "@/components/common/XTextarea.vue";
import { download } from "@/hooks/useHttp";
import XTable from "@/components/common/XTable.vue";
import { showErrorNotification } from "@/hooks/useNotification";

let languages = [
  { code: "en", name: "英语" },
  { code: "zh-cn", name: "简体中文" },
  { code: "cn", name: "繁体中文" },
];

let queryParam = reactive({
  language: '',
  keywords: ''
});

let columns = computed(() => {
  return [
    {
      title: '序号',
      dataIndex: 'serialNumber',
      width: 100,
    },
    {
      title: '搜索语音',
      dataIndex: 'language',
      width: 100,
    },
    {
      title: '关键字',
      dataIndex: 'keyword',
      sortable: {
        sortDirections: ['ascend', 'descend']
      },
      width: 300,
    },
    {
      title: '月搜索量',
      dataIndex: 'number',
      sortable: {
        sortDirections: ['ascend', 'descend']
      },
      width: 100,
    },
    {
      title: '地区',
      dataIndex: 'number',
      width: 100,
    },
    {
      title: '操作',
      slotName: 'option',
      width: 100
    },
  ]
});

let xTable = ref({});

let isDownloadFile = ref(false);


function queryTableData() {

  if (queryParam.languages.length === 0 || queryParam.keywords.trim().length === 0) {
    showErrorNotification('站长平台和搜索引擎分别至少选择一个，查询的网站域名不能为空！');
    return;
  }
  let data = queryParam.keywords.split("\n").filter(domain => domain.trim().length > 0).map(domain => domain.trim());

  // 是转换下结果
  xTable.value.queryTableData("/api/sites/query/weight", data, (result) => {
    let datas = result.data;
    let allDatas = [];
    for (let i = 0; i < datas.length; i++) {
      let data = datas[i];
      if (data.hasOwnProperty("domainAizhan")) {
        let domainAizhan = data.domainAizhan;
        domainAizhan.language = "爱站";
        domainAizhan.serialNumber = (i + 1);
        allDatas.push(domainAizhan);
      }
      if (data.hasOwnProperty("domainZ")) {
        let domainZ = data.domainZ;
        domainZ.language = "站长";
        domainZ.serialNumber = (i + 1);
        allDatas.push(domainZ);
      }
    }
    xTable.value.table.tableAllData = allDatas;
    xTable.value.table.total = allDatas.length;
    xTable.value.onPageIndexChange(1);
  });
}

function exportTableData() {
  if (queryParam.languages.length === 0 || queryParam.keywords.trim().length === 0) {
    showErrorNotification('站长平台和搜索引擎分别至少选择一个，查询的网站域名不能为空！');
    return;
  }
  let data = queryParam.keywords.split("\n").filter(domain => domain.trim().length > 0).map(domain => domain.trim());
  isDownloadFile.value = true;
  download("/api/sites/export/weight", data, `KB-results-${Date.now()}.xlsx`, () => {
    isDownloadFile.value = false;
  });
}

// 全选
function allSelect() {
  queryParam.languages = languages.map(language => language.code);
}

// 反选
function revoltSelect() {
  queryParam.languages = languages
    .filter(language => !queryParam.languages.includes(language.code))
    .map(language => language.code);
}

/**
 * 合并单元格逻辑
 */
function spanMethod({ record, column, rowIndex, columnIndex }) {
  if (!xTable.value.table.tableCurrData) {
    return { rowspan: 0, colspan: 0 };
  }
  if (column.dataIndex === 'domain') {
    if (rowIndex === 0 || (record.domain !== xTable.value.table.tableCurrData[rowIndex - 1].domain)) {
      const count = xTable.value.table.tableCurrData.filter((item) => item.domain === record.domain).length;
      return {
        rowspan: count,
        colspan: 1,
      };
    } else {
      return { rowspan: 0, colspan: 0 };
    }
  }
  if (column.dataIndex === 'serialNumber') {
    if (rowIndex === 0 || (record.serialNumber !== xTable.value.table.tableCurrData[rowIndex - 1].serialNumber)) {
      const count = xTable.value.table.tableCurrData.filter((item) => item.serialNumber === record.serialNumber).length;
      return {
        rowspan: count,
        colspan: 1,
      };
    } else {
      return { rowspan: 0, colspan: 0 };
    }
  }
  return { rowspan: 1, colspan: 1 }; // 默认不合并
}

</script>

<style scoped></style>