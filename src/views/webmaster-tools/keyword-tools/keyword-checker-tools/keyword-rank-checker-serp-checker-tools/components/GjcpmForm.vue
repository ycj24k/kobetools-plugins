<template>
  <div class="gjcpm-form">
    <div class="gjcpm-form__section gjcpm-form__section--engines">
      <div class="gjcpm-form__label"><span class="gjcpm-form__mark">*</span>搜索引擎</div>
      <a-radio-group v-model="formState.searchEngine" class="gjcpm-form__radio-group">
        <a-radio
          v-for="sEngines in searchEngines"
          :key="sEngines.code"
          :disabled="sEngines.disabled"
          :value="sEngines.code"
          class="gjcpm-form__radio"
        >
          {{ sEngines.name }}
        </a-radio>
      </a-radio-group>
    </div>
    <div class="gjcpm-form__section gjcpm-form__section--filters">
      <div class="gjcpm-form__group">
        <span class="gjcpm-form__group-label"><span class="gjcpm-form__mark">*</span>端口选择</span>
        <a-radio-group v-model="formState.port" class="gjcpm-form__radio-group">
          <a-radio v-for="item in portOptions" :key="item.value" class="gjcpm-form__radio" :value="item.value">
            {{ item.label }}
          </a-radio>
        </a-radio-group>
      </div>
      <div class="gjcpm-form__group">
        <span class="gjcpm-form__group-label"><span class="gjcpm-form__mark">*</span>查询模式</span>
        <a-radio-group v-model="formState.mode" class="gjcpm-form__radio-group">
          <a-radio v-for="item in modeOptions" :key="item.value" class="gjcpm-form__radio" :value="item.value">
            {{ item.label }}
          </a-radio>
        </a-radio-group>
      </div>
      <div class="gjcpm-form__group gjcpm-form__group--location">
        <span class="gjcpm-form__group-label"><span class="gjcpm-form__mark">*</span>位置选择</span>
        <a-select
          v-model="formState.country"
          class="gjcpm-form__select"
          :options="countryOptions"
          placeholder="选择国家"
          allow-clear
        />
        <a-select
          v-model="formState.region"
          class="gjcpm-form__select"
          :options="regionOptions"
          placeholder="选择地区节点"
          allow-clear
        />
      </div>
    </div>
    <div class="gjcpm-form__textarea">
      <XTextarea
        v-model="formState.domains"
        placeholder="请输入需要查询的域名信息，一行一个，单次最多提交10个，格式如：google.com"
      />
    </div>
    <div class="gjcpm-form__actions">
      <div class="gjcpm-form__primary-action">
        <XButton
          :loading="xTable?.table?.isLoadTable"
          @xClick="queryTableData"
          color="purple_blue_pink"
          text="立即查询"
        />
      </div>
      <div class="gjcpm-form__extra-actions">
        <XButton :loading="isDownloadFile" @xClick="exportToLocation" color="blue" text="导出查询结果" />
        <XButton color="pink" text="VIP查询通道" />
      </div>
    </div>
    <div class="gjcpm-form__table-wrapper">
      <XTable ref="xTable" :columns="columns" />
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import XButton from "@/components/common/XButton.vue";
import XTextarea from "@/components/common/XTextarea.vue";
import {showErrorNotification} from "@/hooks/useNotification";
import XTable from "@/components/common/XTable.vue";
import { handleExport } from '@/utils';

const columns = [
  {
    title: "序号",
    dataIndex: "serialNumber",
    width: 80,
  },
  {
    title: "网站域名",
    dataIndex: "domain",
    minWidth: 180,
  },
  {
    title: "访问状态",
    dataIndex: "isBlocked",
    minWidth: 140,
  },
  {
    title: "查询状态",
    dataIndex: "successLabel",
    minWidth: 120,
  },
  {
    title: "微信检测",
    dataIndex: "wxRes",
    minWidth: 140,
  },
  {
    title: "QQ检测",
    dataIndex: "qqRes",
    minWidth: 140,
  },
  {
    title: "百度检测",
    dataIndex: "baRes",
    minWidth: 140,
  },
  {
    title: "移动DNS",
    dataIndex: "ydDnsMessage",
    minWidth: 180,
  },
  {
    title: "百度提示",
    dataIndex: "baiduMessage",
    minWidth: 180,
  },
  {
    title: "谷歌提示",
    dataIndex: "googleMessage",
    minWidth: 180,
  },
  {
    title: "360提示",
    dataIndex: "qh360Message",
    minWidth: 180,
  },
  {
    title: "搜狗提示",
    dataIndex: "sougouMessage",
    minWidth: 180,
  },
  {
    title: "头条提示",
    dataIndex: "toutiaoMessage",
    minWidth: 180,
  },
  {
    title: "抖音提示",
    dataIndex: "douyinMessage",
    minWidth: 180,
  },
  {
    title: "微软提示",
    dataIndex: "weiruanMessage",
    minWidth: 180,
  },
];

const searchEngines = [
    {code: "baidu", name: "百度", disabled: false},
    {code: "google", name: "谷歌", disabled: false},
    {code: "bing", name: "必应", disabled: false},
    {code: "so", name: "360", disabled: false},
    {code: "sogou", name: "搜狗", disabled: false},
    {code: "sm", name: "神马", disabled: false},
    {code: "toutiao", name: "头条", disabled: false},
    {code: "yahu", name: "雅虎", disabled: false},
    {code: "yandex", name: "Yandex", disabled: false}
];

const portOptions = [
    { label: 'PC', value: 'pc' },
    { label: 'WAP', value: 'wap' }
];

const modeOptions = [
    { label: '快速查询', value: 'fast' },
    { label: '实时查询', value: 'realtime' }
];

const countryOptions = [
    { label: '中国', value: 'CN' },
    { label: '美国', value: 'US' },
    { label: '英国', value: 'GB' }
];

const regionOptions = [
    { label: '默认节点', value: 'default' },
    { label: '北京', value: 'beijing' },
    { label: '上海', value: 'shanghai' }
];

const xTable = ref(null);
const isDownloadFile = ref(false);
const formState = reactive({
    searchEngine: searchEngines[0]?.code || '',
    port: 'pc',
    mode: 'fast',
    country: 'CN',
    region: 'default',
    domains: ''
});

function queryTableData() {
    if (!formState.domains.trim()) {
        showErrorNotification('请输入需要查询的域名信息！');
        return;
    }
    const list = formState.domains
        .split('\n')
        .map(item => item.trim())
        .filter(item => item);
    if (list.length === 0) {
        showErrorNotification('请输入合法的域名信息！');
        return;
    }
    if (list.length > 10) {
        showErrorNotification('单次最多提交 10 个域名');
        return;
    }
    const payload = {
        domains: list,
        searchEngine: formState.searchEngine,
        port: formState.port,
        mode: formState.mode,
        country: formState.country,
        region: formState.region
    };
    xTable.value.queryTableData("/api/beian/query/intercept", payload, (result = {}) => {
        const source = Array.isArray(result.data) ? result.data : [];
        const transformed = source.map((item, index) => ({
            serialNumber: index + 1,
            domain: item.domain || "-",
            successLabel: item.success ? "查询成功" : "查询失败",
            isBlocked: item.isBlocked ?? "-",
            wxRes: item.wxRes ?? "-",
            qqRes: item.qqRes ?? "-",
            baRes: item.baRes ?? "-",
            ydDnsMessage: item.ydDnsMessage ?? "-",
            baiduMessage: item.baiduMessage ?? "-",
            googleMessage: item.googleMessage ?? "-",
            qh360Message: item.qh360Message ?? "-",
            sougouMessage: item.sougouMessage ?? "-",
            toutiaoMessage: item.toutiaoMessage ?? "-",
            douyinMessage: item.douyinMessage ?? "-",
            weiruanMessage: item.weiruanMessage ?? "-"
        }));
        return {
            data: transformed,
            total: typeof result.total === "number" ? result.total : transformed.length,
            successCount: typeof result.successCount === "number" ? result.successCount : 0,
            failCount: typeof result.failCount === "number" ? result.failCount : 0
        };
    });
}

function exportToLocation() {
    if (xTable.value.table.tableCurrData.length === 0) {
        showErrorNotification('未获取到查询结果');
        return;
    }
    handleExport(xTable.value.table.tableCurrData, xTable.value.selectedKeys, columns, '', 'csv')
}

</script>

<style lang="less" scoped>
.gjcpm-form {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding-top: 12px;

  &__section {
    display: flex;
    align-items: center;
    gap: 20px;
    margin-bottom: 25px;
  }

  &__section--filters {
    gap: 40px;
    flex-wrap: wrap;

    .gjcpm-form__group {
      display: flex;
      align-items: center;
      gap: 20px;
    }
  }

  &__label,
  &__group-label {
    font-weight: bold;
    white-space: nowrap;
    display: flex;
    align-items: center;
    gap: 4px;
  }

  &__mark {
    color: #ff4d4f;
  }

  &__radio-group {
    display: flex;
    flex-wrap: wrap;
    gap: 30px;
  }

  &__radio {
    padding: 0;
  }

  &__group--location {
    gap: 20px;

    .gjcpm-form__select {
      width: 150px;
    }

    .gjcpm-form__select:first-of-type {
      margin-right: 5px;
    }
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
    height: 400px;
  }
}
</style>