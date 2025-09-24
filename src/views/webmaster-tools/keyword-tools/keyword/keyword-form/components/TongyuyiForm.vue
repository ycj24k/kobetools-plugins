<template>
    <a-form class="form_box" :ref="formRefExpose" layout="vertical" hide-label :model="model" @submit="onSubmit">
        <a-grid class="form_main">
            <a-grid-item :span="6" class="form_left">
                <a-form-item no-style field="keyword">
                    <a-textarea v-model="keywordLocal" class="form_area" placeholder="请输入简体中文关键词，一行一个" allow-clear />
                </a-form-item>
            </a-grid-item>
            <a-grid-item :span="18" class="form_right">
                <div class="form_item">
                    <a-grid :col-gap="20" :row-gap="10" class="form_content">
                        <a-grid-item :span="14" class="flex_box form_item_radio1">
                            <div class="form_title"><span style="color: #ff0000">*</span>裂变数量</div>
                            <a-form-item no-style field="depth" :rules="[{ required: true, message: '请选择裂变数量' }]"
                                :validate-trigger="['change', 'blur']">
                                <a-radio-group v-model="model.depth" :options="LBDepthOptions">
                                    <template #label="{ data }"><span>{{ data?.label }}</span></template>
                                    <template #option="{ data }"><span>{{ data?.label }}</span></template>
                                </a-radio-group>
                            </a-form-item>
                        </a-grid-item>
                        <a-grid-item :span="10" class="flex_box form_option">
                            <div class="form_label">输出语言</div>
                            <a-form-item no-style field="language" :rules="[{ required: true, message: '请选择输出语言' }]"
                                :validate-trigger="['change', 'blur']">
                                <a-select v-model="model.language" :options="AILangOptions" :style="{ width: '220px' }"
                                    placeholder="请选择关键词生成语言" />
                            </a-form-item>
                        </a-grid-item>
                    </a-grid>
                </div>

                <div class="form_item">
                    <a-grid :col-gap="20" :row-gap="10" class="form_content">
                        <a-grid-item :span="14" class="flex_box form_option">
                            <div class="form_title">过滤设置</div>
                            <div class="form_label">字符长度</div>
                            <a-form-item no-style field="lengthFilter">
                                <a-space :size="20">
                                    <a-switch v-model="model.lengthFilter" :checked-value="1" :unchecked-value="0" />
                                    <template v-if="model.lengthFilter === 1">
                                        <a-space :size="20">
                                            <span>最少</span>
                                            <a-select v-model="model.lengthFilterVal.min" :options="lengthMinOptions"
                                                :style="{ width: '140px' }" :placeholder="localeGet('placeholder3')" />
                                            <span>-</span>
                                            <span>最多</span>
                                            <a-select v-model="model.lengthFilterVal.max" :options="lengthMaxOptions"
                                                :style="{ width: '140px' }" :placeholder="localeGet('placeholder4')" />
                                        </a-space>
                                    </template>
                                </a-space>
                            </a-form-item>
                        </a-grid-item>
                        <a-grid-item :span="10" class="flex_box form_option">
                            <div class="form_label">违禁词过滤</div>
                            <a-form-item no-style field="sensitiveFilter">
                                <a-space :size="20">
                                    <a-switch v-model="model.sensitiveFilter" :checked-value="1"
                                        :unchecked-value="0" />
                                    <template v-if="model.sensitiveFilter === 1">
                                        <a-select v-model="model.sensitiveFilterVal" :options="customOptions"
                                            :style="{ width: '220px' }" allow-search
                                            :placeholder="localeGet('placeholder2')" />
                                    </template>
                                </a-space>
                            </a-form-item>
                        </a-grid-item>
                    </a-grid>
                </div>

                <div class="form_item">
                    <a-grid :col-gap="20" :row-gap="10" class="form_content">
                        <a-grid-item :span="12" class="flex_box form_content_item">
                            <div class="form_title">条件筛选</div>
                            <div class="flex_box form_content_top">
                                <div class="form_label">结果包含</div>
                                <a-form-item no-style field="include">
                                    <a-radio-group v-model="model.include" :options="includeOptions">
                                        <template #label="{ data }">
                                            <span>{{ data?.label }}</span>
                                        </template>
                                        <template #option="{ data }">
                                            <span>{{ data?.label }}</span>
                                        </template>
                                    </a-radio-group>
                                </a-form-item>
                            </div>
                        </a-grid-item>
                        <a-grid-item :span="12" class="form_content_item">
                            <div class="flex_box form_content_top">
                                <div class="form_label">结果不包含</div>
                                <a-form-item no-style field="exclude">
                                    <a-radio-group v-model="model.exclude" :options="excludeOptions">
                                        <template #label="{ data }">
                                            <span>{{ data?.label }}</span>
                                        </template>
                                        <template #option="{ data }">
                                            <span>{{ data?.label }}</span>
                                        </template>
                                    </a-radio-group>
                                </a-form-item>
                            </div>
                        </a-grid-item>
                    </a-grid>
                    <a-grid :col-gap="20" :row-gap="10" class="form_content">
                        <a-grid-item :span="12" class="flex_box form_content_item">
                            <div class="form_content_input">
                                <a-textarea v-model="includeKeywordsLocal" class="form_area" placeholder="请输入关键词，每行一个关键词"
                                    allow-clear />
                            </div>
                        </a-grid-item>
                        <a-grid-item :span="12" class="form_content_item">
                            <div class="form_content_input">
                                <a-textarea v-model="excludeKeywordsLocal" class="form_area" placeholder="请输入关键词，每行一个关键词"
                                    allow-clear />
                            </div>
                        </a-grid-item>
                    </a-grid>
                </div>

                <div class="form_btn form_btnp">
                    <a-button class="form_btn1" type="primary" html-type="submit" :loading="loading">立即挖掘关键词</a-button>
                </div>
            </a-grid-item>
        </a-grid>
        <div class="form_explain">
            <div class="form_explain_title">使用说明</div>
            <div>请输入关键词并设置裂变条件</div>
            <div>支持包含/不包含/长度/违禁词过滤</div>
        </div>
    </a-form>
</template>

<script setup>
import { ref, watch } from 'vue';
import { Message } from '@arco-design/web-vue';
import { keywordTaskAdd } from '@/api/apps/tools/keyword';
import { LBFormDefault, includeOptions, excludeOptions, LBDepthOptions, lengthMinOptions, lengthMaxOptions, customOptions, AILangOptions } from '../../utils/config';
import { processTextArea, filterByLength, filterByInclude, filterByExclude } from '@/utils/index';

const props = defineProps({
    modelValue: { type: Object, default: () => ({ ...LBFormDefault }) },
    locales: { type: Object, default: () => ({}) }
});
const emit = defineEmits(['update:modelValue','submitted']);

const model = ref({ ...LBFormDefault, ...props.modelValue });
watch(() => props.modelValue, (v) => { model.value = { ...LBFormDefault, ...v }; });

const localeData = ref(props.locales || {});
watch(() => props.locales, (v) => { if (v) localeData.value = v; });
const localeGet = (key) => localeData.value && localeData.value[key];

const loading = ref(false);
const formRefExpose = ref(null);

const keywordLocal = ref('');
const includeKeywordsLocal = ref('');
const excludeKeywordsLocal = ref('');

const onSubmit = async ({ errors }) => {
    if (loading.value) return;
    if (!errors) {
        loading.value = true;
        try {
            model.value.keyword = processTextArea(keywordLocal.value);
            keywordLocal.value = model.value.keyword.join('\n');
            if (model.value.keyword.length === 0) {
                Message.warning(localeGet('message3') || '请输入关键词');
                return;
            }
            if (model.value.lengthFilter) {
                const { min, max } = model.value.lengthFilterVal;
                if (min > 0 || max > 0) {
                    model.value.keyword = filterByLength(model.value.keyword, min, max);
                }
            }
            if (includeKeywordsLocal.value.length) {
                model.value.includeKeywords = processTextArea(includeKeywordsLocal.value);
                includeKeywordsLocal.value = model.value.includeKeywords.join('\n');
                model.value.keyword = filterByInclude(model.value.keyword, model.value.includeKeywords, model.value.include);
            }
            if (excludeKeywordsLocal.value.length) {
                model.value.excludeKeywords = processTextArea(excludeKeywordsLocal.value);
                excludeKeywordsLocal.value = model.value.excludeKeywords.join('\n');
                model.value.keyword = filterByExclude(model.value.keyword, model.value.excludeKeywords, model.value.exclude);
            }
            if (model.value.keyword.length === 0) {
                Message.warning(localeGet('message4') || '过滤后无关键词');
                return;
            }
            await keywordTaskAdd(model.value);
            Message.success(localeGet('message5') || '提交成功');
            emit('update:modelValue', { ...LBFormDefault });
            emit('submitted');
            keywordLocal.value = '';
            includeKeywordsLocal.value = '';
            excludeKeywordsLocal.value = '';
            model.value = { ...LBFormDefault };
        } catch (err) {
            Message.error(err.message);
        } finally {
            loading.value = false;
        }
    } else {
        const list = Object.keys(errors);
        if (list.length > 0) Message.error(errors[list[0]].message);
    }
};
</script>

<style lang="less" scoped>
@import '@/assets/style/form.less';
</style>
