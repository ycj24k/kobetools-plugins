import { ref, computed } from 'vue';
import zhCN from '../keyword-form/zh-CN.js';

/**
 * 多语言管理工具
 * 支持从主应用获取多语言数据，本地数据作为兜底
 */
export function useI18n(localConfig = {}) {
  // 合并本地配置和默认中文配置
  const localeData = ref({ ...zhCN, ...localConfig });
  
  /**
   * 获取翻译文本
   * @param {string} key - 翻译key
   * @param {string} defaultText - 默认文本（可选）
   * @returns {string} 翻译后的文本
   */
  const localeGet = (key, defaultText = '') => {
    return localeData.value[key] || defaultText || key;
  };

  /**
   * 翻译选项数组（用于 a-select, a-radio-group 等组件）
   * @param {Array} options - 原始选项数组
   * @returns {ComputedRef} 翻译后的选项数组
   */
  const translateOptions = (options) => {
    return computed(() => 
      options.map(item => ({
        ...item,
        label: localeGet(item.label)
      }))
    );
  };

  /**
   * 监听主应用数据变化
   * @param {Object} data - 主应用传递的数据
   */
  const dataListener = (data) => {
    console.log('来自主应用的数据', data);
    if (data && data.locales) {
      localeData.value = { ...localeData.value, ...data.locales };
    }
  };

  /**
   * 初始化微前端监听
   */
  const initMicroApp = () => {
    if (window.microApp) {
      window.microApp.addDataListener(dataListener, true);
    }
  };

  /**
   * 更新语言数据
   * @param {Object} newLocales - 新的语言数据
   */
  const updateLocales = (newLocales) => {
    if (newLocales) {
      localeData.value = { ...localeData.value, ...newLocales };
    }
  };

  return {
    localeData,
    localeGet,
    translateOptions,
    dataListener,
    initMicroApp,
    updateLocales
  };
}

