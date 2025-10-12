<template>
    <div class="x-tabs-fill">
        <a-tabs v-model="innerActiveKey" destroy-on-hide>
            <a-tab-pane :key="1" :title="localeGet('tab9_1')">
                <TongyuyiForm v-model="lbForm" :locales="localeData" @submitted="handleSubmitted" />
            </a-tab-pane>
            <a-tab-pane :key="2" :title="localeGet('tab9_2')">
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
import { useI18n } from '../../utils/i18n';

// 多语言
const props = defineProps({
    locales: {
        type: Object,
        default: {},
    },
});
const { localeData, localeGet, updateLocales } = useI18n();
watch(
    () => props.locales,
    (val) => {
        if (val) updateLocales(val);
    },
    { immediate: true }
);

const lbForm = ref({ ...LBFormDefault });
const innerActiveKey = ref(1);

function handleSubmitted() {
    lbForm.value = { ...LBFormDefault };
}
</script>

<style lang="less" scoped>
@import '@/assets/style/form.less';
</style>
