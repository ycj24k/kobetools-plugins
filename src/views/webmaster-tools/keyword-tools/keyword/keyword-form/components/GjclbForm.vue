<template>
    <div class="x-tabs-fill">
        <a-tabs v-model="innerActiveKey" destroy-on-hide>
            <a-tab-pane :key="1" title="同语义裂变">
                <TongyuyiForm v-model="lbForm" :locales="localeData" @submitted="handleSubmitted" />
            </a-tab-pane>
            <a-tab-pane :key="2" title="同义词裂变">
                <TongyiciForm v-model="lbForm" :locales="localeData" @submitted="handleSubmitted" />
            </a-tab-pane>
        </a-tabs>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { LBFormDefault } from '../../utils/config';
import TongyuyiForm from './TongyuyiForm.vue';
import TongyiciForm from './TongyiciForm.vue';

// 多语言可选接入（当前页面中文为主，保留兼容）
const props = defineProps({
    locales: {
        type: Object,
        default: {},
    },
});
const localeData = ref(props.locales || {});
watch(
    () => props.locales,
    (val) => {
        if (val) localeData.value = val;
    }
);
const localeGet = (key) => localeData.value && localeData.value[key];

const lbForm = ref({ ...LBFormDefault });
const innerActiveKey = ref(1);

function handleSubmitted() {
    lbForm.value = { ...LBFormDefault };
}
</script>

<style lang="less" scoped>
@import '@/assets/style/form.less';
</style>
