<template>
  <div class="gjcssl-form">
    <div class="gjcssl-form__language-row">
      <div class="gjcssl-form__language-options">
        <a-radio-group v-model="queryParam.language">
          <a-radio v-for="language in languages" :key="language.code" :value="language.code">{{ language.name }}</a-radio>
        </a-radio-group>
      </div>
    </div>
    <div class="gjcssl-form__textarea">
      <XTextarea v-model="queryParam.keywords" placeholder="请输入需要查询的关键字，一行一个，一次最多提交100个" />
    </div>
    <div class="gjcssl-form__actions">
      <div class="gjcssl-form__primary-action">
        <XButton :loading="xTable?.table?.isLoadTable" @xClick="queryTableData" color="purple_blue_pink" text="立即查询" />
      </div>
      <div class="gjcssl-form__extra-actions">
        <XButton :loading="isDownloadFile" @xClick="exportTableData" color="blue" text="导出查询结果" />
        <XButton color="pink" text="VIP查询通道" />
      </div>
    </div>
    <div class="gjcssl-form__table-wrapper">
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
  language: languages[0]?.code ?? '',
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

  if (!queryParam.language || queryParam.keywords.trim().length === 0) {
    showErrorNotification('站长平台和搜索引擎分别至少选择一个，查询的网站域名不能为空！');
    return;
  }
  let data = queryParam.keywords.split("\n").filter(domain => domain.trim().length > 0).map(domain => domain.trim());

  // 是转换下结果
  xTable.value.queryTableData("/api/sites/query/weight", data, (result) => {
    const transformed = (result.data || []).reduce((acc, item, index) => {
      const serialNumber = index + 1;
      const keyword = item.domain || "";
      if (item.domainAizhan) {
        acc.push({
          ...item.domainAizhan,
          language: "爱站",
          keyword,
          serialNumber,
        });
      }
      if (item.domainZ) {
        acc.push({
          ...item.domainZ,
          language: "站长",
          keyword,
          serialNumber,
        });
      }
      return acc;
    }, []);

    const meta = {
      data: transformed,
      total: typeof result.total === "number" ? result.total : transformed.length,
    };
    if (typeof result.successCount === "number") {
      meta.successCount = result.successCount;
    }
    if (typeof result.failCount === "number") {
      meta.failCount = result.failCount;
    }
    return meta;
  });
}

function exportTableData() {
  if (!queryParam.language || queryParam.keywords.trim().length === 0) {
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
  queryParam.language = languages[0]?.code ?? '';
}

// 反选
function revoltSelect() {
  queryParam.language = '';
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

<style lang="less" scoped>
.gjcssl-form {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding-top: 12px;

  &__language-row {
    display: flex;
    gap: 12px;
    margin-bottom: 25px;
  }

  &__language-options {
    display: flex;
    gap: 12px;
    width: 300px;
  }

  &__textarea {
    height: 200px;
  }

  &__actions {
    display: flex;
    align-items: center;
    height: 100px;
    margin-top: 25px;
  }

  &__primary-action {
    width: 500px;
  }

  &__extra-actions {
    flex: 1;
    display: flex;
    gap: 12px;
    justify-content: flex-end;
  }

  &__table-wrapper {
    margin-top: 16px;
  }
}
</style>