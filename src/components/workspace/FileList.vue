<template>
  <a-layout class="t-layout">
    <a-layout>
      <a-breadcrumb class="t-breadcrumb">
        <a-breadcrumb-item 
          style="cursor: pointer" 
          v-for="vo in breadcrumb" 
          :key="vo.prefix" 
          @click="handleBreadcrumbClick(vo.prefix)"
        >
          {{ vo.label }}
        </a-breadcrumb-item>
      </a-breadcrumb>
      <a-layout>
        <a-layout-content>
          <a-row class="t-open">
            <a-col flex="auto">
              <a-space>
                <t-search :file-type="fileType" :disabled="isLoading" @search="onSearch" @refresh="onRefresh" />
              </a-space>
            </a-col>
            <a-col flex="210px">
              <a-space>
                <a-dropdown @select="onAdd">
                  <a-button class="t-button-2" :disabled="isLoading">
                    新建<icon-down style="margin-left: 5px" />
                  </a-button>
                  <template #content>
                    <a-doption>新建文件夹</a-doption>
                    <a-doption>新建文件</a-doption>
                  </template>
                </a-dropdown>
                <a-button 
                  class="t-button" 
                  type="primary" 
                  :disabled="isLoading"
                  @click="() => (uploadVisible = true)" 
                  text="上传"
                >
                  <template #icon>
                    <icon-upload />
                  </template>
                  <template #default>上传</template>
                </a-button>
              </a-space>
            </a-col>
          </a-row>

          <div v-if="isLoading" class="loading-container">
            <a-spin size="large" />
            <div class="loading-text">{{ loadingMessage }}</div>
            <div class="loading-tips">首次加载可能需要几秒钟，请耐心等待</div>
          </div>
          <t-table v-else :file-type="fileType" @refresh="onRefresh" />
        </a-layout-content>
      </a-layout>
    </a-layout>
  </a-layout>

  <t-upload v-model:visible="uploadVisible" />
  <t-preview />
</template>

<script setup>
import tTable from '@/components/workspace/table.vue';
import tUpload from '@/components/workspace/upload.vue';
import tPreview from '@/components/workspace/preview.vue';
import tSearch from '@/components/workspace/search.vue';
import { ref, computed, onMounted, watch } from 'vue';
import { useAppStore } from '@/store';
import useApp from '@/utils/composables/app';
import useTxy from '@/utils/composables/ali';
import { Message } from '@arco-design/web-vue';

// 定义组件属性
const props = defineProps({
  fileType: {
    type: String,
    default: 'all', // 可选值: 'all', 'document', 'image', 'video', 'audio'
    validator: (value) => ['all', 'document', 'image', 'video', 'audio'].includes(value)
  }
});

const appStore = useAppStore();
const { fetchFileList, transformFileData } = useTxy();
const breadcrumb = computed(() => appStore.breadcrumb);
const uploadVisible = ref(false);

// 添加加载状态
const isLoading = ref(false);
const loadingMessage = computed(() => {
  const hasSts = !!appStore.sts && !!appStore.sts.stsToken;
  return hasSts ? '正在加载文件列表...' : '正在初始化存储服务...';
});

// 统一的数据获取和筛选方法
const fetchAndFilterList = async (prefix = '', searchQuery = '', fileType = 'all') => {
  try {
    // 先重置marker状态
    await onMarker();
    
    // 等待OSS初始化并获取完整的文件列表
    await getList(prefix, searchQuery, fileType);
    
    // 等待数据加载完成（给一点时间让数据完全加载）
    await new Promise(resolve => setTimeout(resolve, 100));
    
    // 如果是全部文件类型，直接返回，不需要筛选
    if (fileType === 'all') {
      return;
    }
    
    // 对分类页面进行类型筛选
    await filterListByType(fileType, searchQuery);
    
  } catch (error) {
    console.error('获取文件列表失败:', error);
    
    // 根据不同的错误类型给出不同的提示
    if (error.message && error.message.includes('访问权限不足')) {
      Message.error('访问权限不足，请检查账号权限配置或联系管理员');
    } else if (error.message && error.message.includes('OSS初始化')) {
      Message.error('正在初始化存储服务，请稍后重试');
    } else if (error.message && error.message.includes('SecurityToken')) {
      Message.warning('访问令牌已过期，正在重新获取...');
      // 对于token过期，可以尝试自动重试
      setTimeout(async () => {
        if (!isLoading.value) {
          await fetchAndFilterList(appStore.prefix, '', props.fileType);
        }
      }, 1000);
    } else {
      Message.error('获取文件列表失败，请检查网络连接');
    }
    
    // 不要自动回退，而是保持当前状态，让用户手动重试
    // await get();
  }
};

// 根据文件类型筛选列表
const filterListByType = async (fileType, searchQuery = '') => {
  try {
    // 解析搜索查询
    const parts = searchQuery.split(',');
    const searchType = parts[0];
    const searchKeyword = parts[1];
    const fileExtensions = parts[2] ? parts[2].split('|') : null;
    
    // 获取原始列表
    const originalList = [...appStore.list];
    let filteredList = [];
    
    // 处理文件夹
    const folders = originalList.filter(item => item.type === 'd');
    filteredList.push(...folders);
    
    // 处理文件，根据类型过滤
    const typeFilters = {
      'document': ['doc', 'docx', 'pdf', 'txt', 'xls', 'xlsx', 'ppt', 'pptx', 'md'],
      'image': ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp', 'svg'],
      'video': ['mp4', 'mov', 'avi', 'mkv', 'flv', 'wmv', 'webm'],
      'audio': ['mp3', 'wav', 'ogg', 'aac', 'flac']
    };
    
    const extensions = typeFilters[fileType] || [];
    let filteredCount = 0;
    
    // 对文件进行类型过滤
    for (let i = 0; i < originalList.length; i++) {
      const item = originalList[i];
      if (item.type === 'f') {
        // 兼容两种字段：优先使用原始后缀 extension，否则回退到分类字段 fileExtension
        const fileExtension = (item.extension || item.fileExtension || '').toLowerCase();
        
        // 根据类型过滤
        if (extensions.includes(fileExtension)) {
          // 如果指定了文件扩展名过滤，进一步过滤
          if (fileExtensions && fileExtensions.length > 0) {
            if (!fileExtensions.includes(fileExtension)) {
              continue;
            }
          }
          
          // 如果指定了搜索关键词，进行搜索过滤
          if (searchKeyword) {
            if (searchType === '1') { // 模糊搜索
              if (!item.name.toLowerCase().includes(searchKeyword.toLowerCase())) {
                continue;
              }
            } else if (searchType === '2') { // 精准搜索
              if (!item.name.toLowerCase().startsWith(searchKeyword.toLowerCase())) {
                continue;
              }
            }
          }
          
          filteredCount++;
          filteredList.push(item);
        }
      }
    }
    
    console.log(`${fileType}类型: 原始${originalList.filter(item => item.type === 'f').length}个文件，过滤后${filteredCount}个文件`);
    
    // 更新store中的列表
    await appStore.setList(filteredList);
    
  } catch (error) {
    console.error('筛选文件列表失败:', error);
    Message.error('筛选文件列表失败');
  }
};

// 搜索处理
const onSearch = async (searchQuery) => {
  if (isLoading.value) return;
  
  try {
    isLoading.value = true;
    await fetchAndFilterList(appStore.prefix, searchQuery, props.fileType);
  } catch (error) {
    console.error('搜索失败:', error);
    Message.error('搜索失败');
  } finally {
    isLoading.value = false;
  }
};

// 根据文件类型初始化
const initByFileType = async () => {
  if (isLoading.value) return;
  
  try {
    isLoading.value = true;
    
    // 首先设置store中的fileType
    await appStore.setFileType(props.fileType);
    
    // 使用统一的数据获取和筛选方法
    await fetchAndFilterList(appStore.prefix, '', props.fileType);
    
    // 根据文件类型设置breadcrumb标题
    await appStore.setBreadcrumb();
  } catch (error) {
    console.error('初始化失败:', error);
    
    // 根据不同错误类型处理
    if (error.message && error.message.includes('访问权限不足')) {
      Message.error('访问权限不足，请检查账号权限配置或联系管理员');
    } else if (error.message && error.message.includes('OSS初始化')) {
      Message.warning('存储服务初始化中，请稍等片刻');
      
      // 延迟重试一次
      setTimeout(async () => {
        if (!isLoading.value) {
          console.log('延迟重试初始化...');
          await initByFileType();
        }
      }, 2000);
    } else if (error.message && error.message.includes('SecurityToken')) {
      Message.warning('访问令牌已过期，正在重新获取...');
      
      // 对于token过期，延迟重试
      setTimeout(async () => {
        if (!isLoading.value) {
          await initByFileType();
        }
      }, 1000);
    } else {
      // 其他错误时回退到普通列表
      try {
        await get();
        await appStore.setBreadcrumb();
      } catch (fallbackError) {
        console.error('回退获取也失败:', fallbackError);
        Message.error('初始化失败，请刷新页面重试');
      }
    }
  } finally {
    isLoading.value = false;
  }
};

const { get, onOpen, onAdd, getList, onMarker } = useApp();

// 重写刷新函数，确保加载状态正确
const onRefresh = async () => {
  if (isLoading.value) return;
  
  try {
    isLoading.value = true;
    // 使用统一的数据获取和筛选方法
    await fetchAndFilterList(appStore.prefix, '', props.fileType);
  } catch (error) {
    console.error('刷新失败:', error);
    await get();
  } finally {
    isLoading.value = false;
  }
};

// 重写breadcrumb点击事件，确保分类页面保持正确的标题
const handleBreadcrumbClick = async (prefix) => {
  if (isLoading.value) return;
  
  try {
    isLoading.value = true;
    await appStore.setPrefix(prefix);
    
    // 使用统一的数据获取和筛选方法
    await fetchAndFilterList(prefix, '', props.fileType);
    
    // 设置breadcrumb
    await appStore.setBreadcrumb();
  } catch (error) {
    console.error('面包屑导航失败:', error);
    // 出错时回退到普通列表
    await get();
    await appStore.setBreadcrumb();
  } finally {
    isLoading.value = false;
  }
};

// 监听prefix变化，确保在进入文件夹后能正确应用类型筛选
watch(() => appStore.prefix, async (newPrefix, oldPrefix) => {
  if (newPrefix !== oldPrefix && props.fileType !== 'all' && !isLoading.value) {
    try {
      isLoading.value = true;
      console.log(`Prefix变化: ${oldPrefix} -> ${newPrefix}, 重新应用类型筛选`);
      // 使用统一的数据获取和筛选方法
      await fetchAndFilterList(newPrefix, '', props.fileType);
    } catch (error) {
      console.error('Prefix变化处理失败:', error);
      // 出错时回退到普通列表
      await get();
    } finally {
      isLoading.value = false;
    }
  }
});

// 组件挂载时初始化
onMounted(() => {
  initByFileType();
});
</script>

<style>
.arco-table-body {
  min-height: 680px !important;
}
.arco-empty-image {
  margin-top: 100px;
}
.arco-dropdown-option {
  font-size: 12px !important;
  line-height: 32px !important;
}
</style>

<style scoped>
.t-layout :deep(.arco-layout-header) {
  height: 60px;
  background: var(--color-bg-3);
  font-size: 16px;
  color: var(--color-text-2);
}
.t-layout :deep(.arco-layout-footer) {
  height: 48px;
  color: var(--color-text-2);
  font-weight: 400;
  font-size: 14px;
  line-height: 48px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-stretch: condensed;
  text-align: center;
}
.t-layout :deep(.arco-layout-content) {
  color: var(--color-text-2);
  font-weight: 400;
  font-size: 14px;
  background: #fff;
  border-radius: 8px;
}
.t-layout :deep(.arco-layout-sider-children) {
  overflow: hidden;
}
.t-layout :deep(.arco-layout) {
  overflow: hidden;
}
.t-layout :deep(.arco-menu-vertical .arco-menu-inner) {
  padding: 0px 15px 15px 15px;
}
.t-layout :deep(.arco-menu-collapsed .arco-menu-inner) {
  padding: 0 5px 5px 5px;
}
.t-menu-button {
  position: absolute;
  right: 12px;
  bottom: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: var(--border-radius-small);
  cursor: pointer;
  color: var(--color-text-3);
  background-color: var(--color-fill-1);
}
.t-breadcrumb {
  height: 40px;
  font-size: 16px;
  color: var(--color-text-2);
  margin: 0 0 10px 0;
}
.t-open {
  color: var(--color-text-2);
  padding: 20px;
}
.t-breadcrumb :deep(.arco-breadcrumb-item) {
  padding: 0;
}

.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  padding: 40px;
}

.loading-text {
  margin-top: 16px;
  color: var(--color-text-2);
  font-size: 14px;
  font-weight: 500;
}

.loading-tips {
  margin-top: 8px;
  color: var(--color-text-3);
  font-size: 12px;
}
</style>
