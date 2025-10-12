<template>
    <a-form class="form_box" :ref="formRefExpose" layout="vertical" hide-label :model="model" @submit="onSubmit">
        <a-grid class="form_main">
            <a-grid-item :span="6" class="form_left">
                <a-form-item no-style field="keyword">
                    <a-textarea v-model="keywordLocal" class="form_area" :placeholder="localeGet('placeholder10')" allow-clear />
                </a-form-item>
            </a-grid-item>
            <a-grid-item :span="18" class="form_right">
                <div class="form_item">
                    <a-grid :col-gap="20" :row-gap="10" class="form_content">
                        <a-grid-item :span="14" class="flex_box form_item_radio1">
                            <div class="form_title"><span style="color: #ff0000">*</span>{{ localeGet('fissionCount') }}</div>
                            <a-form-item no-style field="depth" :rules="[{ required: true, message: localeGet('message12') }]"
                                :validate-trigger="['change', 'blur']">
                                <a-radio-group v-model="model.depth" :options="translatedLBDepthOptions"></a-radio-group>
                            </a-form-item>
                        </a-grid-item>
                        <a-grid-item :span="10" class="flex_box form_option">
                            <div class="form_label">{{ localeGet('outputLanguage') }}</div>
                            <a-form-item no-style field="language" :rules="[{ required: true, message: localeGet('message16') }]"
                                :validate-trigger="['change', 'blur']">
                                <a-select v-model="model.language" :options="translatedAILangOptions" :style="{ width: '220px' }"
                                    :placeholder="localeGet('placeholder7')" allow-search />
                            </a-form-item>
                        </a-grid-item>
                    </a-grid>
                </div>

                <div class="form_item">
                    <a-grid :col-gap="20" :row-gap="10" class="form_content">
                        <a-grid-item :span="14" class="flex_box form_option">
                            <div class="form_title">{{ localeGet('filterCondition') }}</div>
                            <div class="form_label">{{ localeGet('label5') }}</div>
                            <a-form-item no-style field="lengthFilter">
                                <a-space :size="20">
                                    <a-switch v-model="model.lengthFilter" :checked-value="1" :unchecked-value="0" />
                                    <template v-if="model.lengthFilter === 1">
                                        <a-space :size="20">
                                            <span>{{ localeGet('label6') }}</span>
                                            <a-select v-model="model.lengthFilterVal.min" :options="translatedLengthMinOptions"
                                                :style="{ width: '140px' }" :placeholder="localeGet('placeholder3')" />
                                            <span>-</span>
                                            <span>{{ localeGet('label7') }}</span>
                                            <a-select v-model="model.lengthFilterVal.max" :options="translatedLengthMaxOptions"
                                                :style="{ width: '140px' }" :placeholder="localeGet('placeholder4')" />
                                        </a-space>
                                    </template>
                                </a-space>
                            </a-form-item>
                        </a-grid-item>
                        <a-grid-item :span="10" class="flex_box form_option">
                            <div class="form_label">{{ localeGet('label4') }}</div>
                            <a-form-item no-style field="sensitiveFilter">
                                <a-space :size="20">
                                    <a-switch v-model="model.sensitiveFilter" :checked-value="1"
                                        :unchecked-value="0" />
                                    <template v-if="model.sensitiveFilter === 1">
                                        <a-select 
                                            v-model="model.sensitiveFilterVal" 
                                            :options="translatedCustomOptions"
                                            :style="{ width: '220px' }" 
                                            allow-search 
                                            :placeholder="localeGet('placeholder2')">
                                        </a-select>
                                    </template>
                                </a-space>
                            </a-form-item>
                        </a-grid-item>
                    </a-grid>
                </div>

                <div class="form_item">
                    <a-grid :col-gap="20" :row-gap="10" class="form_content">
                        <a-grid-item :span="12" class="flex_box form_content_item">
                            <div class="form_title">{{ localeGet('title4') }}</div>
                            <div class="flex_box form_content_top">
                                <div class="form_label">{{ localeGet('label8') }}</div>
                                <a-form-item no-style field="include">
                                    <a-radio-group v-model="model.include" :options="translatedIncludeOptions"></a-radio-group>
                                </a-form-item>
                            </div>
                        </a-grid-item>
                        <a-grid-item :span="12" class="form_content_item">
                            <div class="flex_box form_content_top">
                                <div class="form_label">{{ localeGet('label9') }}</div>
                                <a-form-item no-style field="exclude">
                                    <a-radio-group v-model="model.exclude" :options="translatedExcludeOptions"></a-radio-group>
                                </a-form-item>
                            </div>
                        </a-grid-item>
                    </a-grid>
                    <a-grid :col-gap="20" :row-gap="10" class="form_content">
                            <a-grid-item :span="12" class="flex_box form_content_item">
                                <div class="form_content_input">
                                    <a-textarea v-model="includeKeywordsLocal" class="form_area" :placeholder="localeGet('placeholder5')"
                                        allow-clear />
                                </div>
                            </a-grid-item>
                            <a-grid-item :span="12" class="form_content_item">
                                <div class="form_content_input">
                                    <a-textarea v-model="excludeKeywordsLocal" class="form_area" :placeholder="localeGet('placeholder5')"
                                        allow-clear />
                                </div>
                            </a-grid-item>
                    </a-grid>
                </div>

                <div class="form_btn form_btnp">
                    <a-button class="form_btn1" type="primary" html-type="submit" :loading="loading">{{ localeGet('button8') }}</a-button>
                </div>
            </a-grid-item>
        </a-grid>
        <div class="form_explain">
            <div class="form_explain_title">{{ localeGet('introduce2') }}</div>
            <div>{{ localeGet('content9') }}</div>
            <div>{{ localeGet('content10') }}</div>
        </div>
    </a-form>
</template>

<script setup>
import { ref, watch } from 'vue';
import { Message } from '@arco-design/web-vue';
import { keywordTaskAdd } from '@/api/apps/tools/keyword';
import { LBFormDefault, includeOptions, excludeOptions, LBDepthOptions, lengthMinOptions, lengthMaxOptions, customOptions, AILangOptions } from '../../utils/config';
import { processTextArea, filterByLength, filterByInclude, filterByExclude } from '@/utils/index';
import { useI18n } from '../../utils/i18n';

const props = defineProps({
    modelValue: { type: Object, default: () => ({ ...LBFormDefault }) },
    locales: { type: Object, default: () => ({}) }
});
const emit = defineEmits(['update:modelValue','submitted']);

const model = ref({ ...LBFormDefault, ...props.modelValue });
watch(() => props.modelValue, (v) => { model.value = { ...LBFormDefault, ...v }; });

const { localeGet, translateOptions, updateLocales } = useI18n();
watch(() => props.locales, (v) => { if (v) updateLocales(v); });

// 翻译选项配置
const translatedCustomOptions = translateOptions(customOptions);
const translatedIncludeOptions = translateOptions(includeOptions);
const translatedExcludeOptions = translateOptions(excludeOptions);
const translatedAILangOptions = translateOptions(AILangOptions);
const translatedLBDepthOptions = translateOptions(LBDepthOptions);
const translatedLengthMinOptions = translateOptions(lengthMinOptions);
const translatedLengthMaxOptions = translateOptions(lengthMaxOptions);

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
                Message.warning(localeGet('message3'));
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
                Message.warning(localeGet('message4'));
                return;
            }
            await keywordTaskAdd(model.value);
            Message.success(localeGet('message5'));
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
