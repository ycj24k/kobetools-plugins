<template>
  <a-select class="t-select" v-model="searchType" style="width: 120px; margin-right: 10px">
    <a-option style="font-size: 13px" value="1">模糊搜索</a-option>
    <a-option style="font-size: 13px" value="2">精准搜索</a-option>
  </a-select>
  <a-input class="t-select" v-model="search" placeholder="名称" style="width: 200px; margin-right: 10px">
    <template #prefix>
      <icon-search />
    </template>
  </a-input>
  <a-select class="t-select" v-model="searchType2" placeholder="类型" style="width: 120px; margin-right: 10px">
    <a-option style="font-size: 13px" value="">全部类型</a-option>
    
    <!-- 文档页面类型筛选 -->
    <template v-if="fileType === 'document'">
      <a-option style="font-size: 13px" value="doc">Word文档</a-option>
      <a-option style="font-size: 13px" value="pdf">PDF文件</a-option>
      <a-option style="font-size: 13px" value="txt">文本文件</a-option>
      <a-option style="font-size: 13px" value="xls">Excel表格</a-option>
      <a-option style="font-size: 13px" value="ppt">PPT演示</a-option>
      <a-option style="font-size: 13px" value="md">Markdown</a-option>
    </template>
    
    <!-- 图片页面类型筛选 -->
    <template v-if="fileType === 'image'">
      <a-option style="font-size: 13px" value="jpg">JPG图片</a-option>
      <a-option style="font-size: 13px" value="png">PNG图片</a-option>
      <a-option style="font-size: 13px" value="gif">GIF动图</a-option>
      <a-option style="font-size: 13px" value="svg">SVG矢量图</a-option>
    </template>
    
    <!-- 视频页面类型筛选 -->
    <template v-if="fileType === 'video'">
      <a-option style="font-size: 13px" value="mp4">MP4视频</a-option>
      <a-option style="font-size: 13px" value="mov">MOV视频</a-option>
      <a-option style="font-size: 13px" value="avi">AVI视频</a-option>
      <a-option style="font-size: 13px" value="mkv">MKV视频</a-option>
    </template>
    
    <!-- 音频页面类型筛选 -->
    <template v-if="fileType === 'audio'">
      <a-option style="font-size: 13px" value="mp3">MP3音频</a-option>
      <a-option style="font-size: 13px" value="wav">WAV音频</a-option>
      <a-option style="font-size: 13px" value="ogg">OGG音频</a-option>
      <a-option style="font-size: 13px" value="aac">AAC音频</a-option>
    </template>
    
    <!-- 在线文件页面类型筛选 -->
    <template v-if="fileType === 'all'">
      <a-option style="font-size: 13px" value="3">图片</a-option>
      <a-option style="font-size: 13px" value="4">文档</a-option>
      <a-option style="font-size: 13px" value="5">视频</a-option>
      <a-option style="font-size: 13px" value="6">音频</a-option>
    </template>
  </a-select>

  <a-range-picker class="t-select" style="width: 250px; margin-right: 10px" />

  <a-button class="t-button" type="primary" :disabled="disabled" @click="onSearch" style="margin-right: 10px">查询</a-button>
  <a-button class="t-button-2" :disabled="disabled" @click="onRefresh">刷新</a-button>
</template>

<script setup>
import { ref, watch, computed } from 'vue';
import { useAppStore } from '@/store';
import { Message } from '@arco-design/web-vue';
import useApp from '@/utils/composables/app';

// 定义props
const props = defineProps({
  fileType: {
    type: String,
    default: 'all'
  },
  disabled: {
    type: Boolean,
    default: false
  }
});

// 定义emits
const emit = defineEmits(['search', 'refresh']);

const appStore = useAppStore();
const search = ref('');
const searchType = ref('1');
const searchType2 = ref('');

// 根据文件类型获取对应的扩展名映射
const getExtensionMap = computed(() => {
  const extensionMaps = {
    'document': {
      'doc': ['doc', 'docx'],
      'pdf': ['pdf'],
      'txt': ['txt'],
      'xls': ['xls', 'xlsx'],
      'ppt': ['ppt', 'pptx'],
      'md': ['md']
    },
    'image': {
      'jpg': ['jpg', 'jpeg'],
      'png': ['png'],
      'gif': ['gif'],
      'svg': ['svg', 'bmp', 'webp']
    },
    'video': {
      'mp4': ['mp4'],
      'mov': ['mov'],
      'avi': ['avi'],
      'mkv': ['mkv', 'flv', 'wmv', 'webm']
    },
    'audio': {
      'mp3': ['mp3'],
      'wav': ['wav'],
      'ogg': ['ogg'],
      'aac': ['aac', 'flac']
    }
  };
  
  return extensionMaps[props.fileType] || {};
});

watch(
  () => appStore.search,
  async (data) => {
    if (data) {
      const arr = data.split(',');
      if (arr.length >= 2 && arr[1]) {
        searchType.value = arr[0];
        search.value = arr[1];
        return;
      }
    }
    searchType.value = '1';
    search.value = '';
  }
);

const onSearch = async () => {
  //   if (!search.value) {
  //     return Message.error('搜索关键词不能为空');
  //   }
  
  let searchQuery = searchType.value + ',' + search.value;
  
  // 如果选择了具体类型，添加类型过滤
  if (searchType2.value && props.fileType !== 'all') {
    const extensionMap = getExtensionMap.value;
    if (extensionMap[searchType2.value]) {
      searchQuery += ',' + extensionMap[searchType2.value].join('|');
    }
  }
  
  console.log(`搜索查询: ${searchQuery}, fileType: ${props.fileType}`);
  console.log(`搜索类型: ${searchType.value}, 关键词: ${search.value}, 文件类型: ${searchType2.value}`);
  
  // 通过事件通知父组件进行搜索，而不是直接调用getList
  emit('search', searchQuery);
};

const onRefresh = async () => {
  // 通过事件通知父组件进行刷新，而不是直接调用onRefresh
  emit('refresh');
};
</script>

<style scoped>
.t-select :deep(.arco-input-prefix) {
  padding-right: 5px;
}
.t-select :deep(.arco-select-view-value) {
  color: var(--color-text-2);
}
</style>
