<template>
  <div :class="list && list.length !== 0 ? (mode === 1 ? 't-table t-table-image' : 't-table') : 't-table t-table-null'">
    <div class="t-modes">
      <a-checkbox style="top: 2px" :model-value="keys && keys.length !== 0 ? true : false" @change="aaa">全选</a-checkbox>
      <span class="t-line"
        >共
        <span class="t-tag">{{ keys.length }}</span>
        个项目
      </span>
      <a-button class="t-button-2" style="margin-right: 10px">移动</a-button>
      <a-button class="t-button-2" style="margin-right: 10px">复制</a-button>
      <a-button class="t-button-2" style="margin-right: 10px">下载</a-button>
      <a-button class="t-button" type="primary" style="margin-right: 10px" @click="onOpen('删除')">删除</a-button>
      <a-button @click="onMode" size="mini" style="min-width: auto !important; float: right">
        <template #icon>
          <icon-apps v-if="mode === 1" />
          <icon-unordered-list v-else />
        </template>
      </a-button>
    </div>
    <a-table
      :class="'t-mode-' + mode"
      :data="list"
      :bordered="false"
      row-key="key"
      v-model:selectedKeys="keys"
      :pagination="false"
      :row-selection="{
        type: 'checkbox',
        showCheckedAll: false,
      }"
      :scroll="{
        x: '100%',
        y: 680,
      }"
      ref="ttables"
    >
      <template #columns>
        <a-table-column :title="mode !== 1 ? '文件名' : ''">
          <template #cell="{ record }">
            <span @click="onInfo(record)" class="t-table-column" :style="mode === 1 ? `width: ${slider}px;height: ${slider}px;` : ''">
              <!-- <img class="t-table-img" :style="mode === 1 ? `max-width: ${slider}px;height: ${slider}px;` : ''" v-if="mode === 1 && record.fileExtension === 'image'" :src="record.url" /> -->
              <span class="t-table-icon" :style="mode === 1 ? `line-height: ${slider}px;height: ${slider}px;` : ''">
                <!-- <svg :width="slider" :height="slider" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" v-html="getFileIcon(record.fileExtension)"></svg> -->
                <img :width="slider" :height="slider" :src="getFileIcon(record.fileExtension)" />
              </span>
              <span :title="record.name" class="t-table-name" :style="mode === 1 ? `width: ${slider}px;` : ''">{{ record.name }} </span>
            </span>
          </template>
        </a-table-column>
        <a-table-column title="大小" :width="150" v-if="mode !== 1">
          <template #cell="{ record }">
            <template v-if="record.key">
              <span v-if="record.size"> {{ record.size / 1000 }}KB </span>
              <span v-else> - </span>
            </template>
          </template>
        </a-table-column>
        <a-table-column title="修改时间" :width="200" v-if="mode !== 1">
          <template #cell="{ record }">
            <template v-if="record.key">
              <span v-if="record.uptime">{{ getDateTime(record.uptime) }}</span>
              <span v-else> - </span>
            </template>
          </template>
        </a-table-column>
        <a-table-column :title="mode !== 1 ? '操作' : ''" :width="150">
          <template #cell="{ record }">
            <a-space v-if="record.key" class="t-table-open">
              <a-button type="text" size="mini" shape="circle" @click="onCopy(record.url)" v-if="mode !== 1">
                <icon-copy style="color: #86909c; cursor: pointer" />
              </a-button>
              <a-button type="text" size="mini" shape="circle" @click="onDownload(record.url)" v-if="mode !== 1">
                <icon-to-bottom style="color: #86909c; cursor: pointer" />
              </a-button>
              <a-dropdown>
                <a-button type="text" size="mini" shape="circle">
                  <icon-more style="color: #86909c; cursor: pointer" />
                </a-button>
                <template #content>
                  <a-doption v-if="record.fileExtension !== 'folder'" @click="onDetail(record)">
                    <template #icon>
                      <icon-unordered-list style="color: #86909c" />
                    </template>
                    <template #default>详情</template>
                  </a-doption>
                  <a-doption v-if="record.fileExtension !== 'folder'" @click="onDownload(record.url)">
                    <template #icon>
                      <icon-to-bottom style="color: #86909c" />
                    </template>
                    <template #default>下载</template>
                  </a-doption>
                  <a-doption v-if="record.fileExtension === 'image'" @click="onInfo(record)">
                    <template #icon>
                      <icon-eye style="color: #86909c" />
                    </template>
                    <template #default>预览</template>
                  </a-doption>
                  <a-doption v-if="record.fileExtension === 'code'" @click="onEdit(record)">
                    <template #icon>
                      <icon-code-square style="color: #86909c" />
                    </template>
                    <template #default>预览</template>
                  </a-doption>
                  <a-doption v-if="record.fileExtension !== 'folder'" @click="onRename(record)">
                    <template #icon>
                      <icon-edit style="color: #86909c" />
                    </template>
                    <template #default>重命名</template>
                  </a-doption>
                  <a-doption @click="onDelete(record)">
                    <template #icon>
                      <icon-delete style="color: #86909c" />
                    </template>
                    <template #default>删除</template>
                  </a-doption>
                </template>
              </a-dropdown>
            </a-space>
          </template>
        </a-table-column>
      </template>
    </a-table>

    <div style="padding: 20px">
      <a-space>
        <a-button :disabled="prevDisabled" @click="prev()">上一页</a-button>
        <a-button :disabled="nextDisabled" @click="next()">下一页</a-button>
      </a-space>
    </div>
  </div>
</template>

<script setup>
import { h, ref, computed, watch } from 'vue';
import { useAppStore } from '@/store';
import { getFileIcon, getDateTime } from '@/utils';
import useApp from '@/utils/composables/app';

// 定义props
const props = defineProps({
  fileType: {
    type: String,
    default: 'all'
  }
});

// 定义emits
const emit = defineEmits(['refresh']);

const { onDelete, onOpen, onCopy, onDownload, onRename, getList, onInfo, onDetail, onEdit } = useApp();
const appStore = useAppStore();
const mode = computed(() => appStore.mode);
const keys = computed({
  get: () => {
    return appStore.keys;
  },
  set: (data) => {
    appStore.keys = data;
  },
});

const ttables = ref('');
const aaa = (e) => {
  ttables.value.selectAll(e);
};
const slider = computed(() => appStore.slider);
const list = computed(() => appStore.list);
const prevDisabled = computed(() => (appStore.markers.length >= 3 ? false : true));
const nextDisabled = computed(() => !appStore.isTruncated);
const prev = async () => {
  appStore.markers.splice(-2, 2);
  appStore.nextMarker = appStore.markers[appStore.markers.length - 1];
  // 通过事件通知父组件刷新数据，而不是直接调用getList
  emit('refresh');
};
const next = async () => {
  // 通过事件通知父组件刷新数据，而不是直接调用getList
  emit('refresh');
};
const onMode = () => {
  if (appStore.mode === 1) {
    appStore.mode = 0;
    appStore.slider = 40;
  } else {
    appStore.mode = 1;
    appStore.slider = 100;
  }
};
</script>

<style scoped>
.t-table {
  margin: 0px 20px 20px 20px;
  /* padding: 0 20px; */
  position: relative;
  border: 1px solid var(--color-fill-3);
  border-radius: 8px;
}
.t-table .t-table-img {
  width: 34px;
  height: 34px;
  object-fit: cover;
  margin-right: 8px;
  vertical-align: middle;
}
.t-table .t-table-icon {
  margin-right: 8px;
  vertical-align: middle;
}
.t-table-image :deep(.arco-table-body colgroup) {
  display: none;
}
.t-table-image :deep(.arco-table-body tbody .arco-table-tr) {
  height: 150px;
  width: 150px;
  float: left;
  position: relative;
  margin: 10px;
}
.t-table-image :deep(.arco-table-body tbody .arco-table-tr:hover) {
  background: #f2f3f5;
}
.t-table-image :deep(.arco-table-body tbody .arco-table-tr .arco-table-checkbox) {
  position: absolute;
  top: 6px;
  left: 6px;
  display: none;
}
.t-table-image :deep(.arco-table-body tbody .arco-table-tr:hover .arco-table-checkbox) {
  display: block;
}
.t-table-image :deep(.arco-table-body tbody .arco-table-tr-checked .arco-table-checkbox) {
  display: block;
}

.t-table-image :deep(.arco-table-body tbody .arco-table-tr .arco-table-checkbox .arco-checkbox-icon) {
  width: 12px;
  height: 12px;
}
.t-table-image :deep(.arco-table-body tbody .arco-table-tr .arco-table-checkbox .arco-checkbox-icon .arco-checkbox-icon-check) {
  width: 7px;
}
.t-table-image :deep(.arco-table-body tbody .arco-table-tr .arco-table-cell) {
  padding: 0;
}
.t-table-image :deep(.arco-table-body tbody .arco-table-tr .arco-table-td) {
  background-color: #fff !important;
  border-bottom: none;
}
.t-table-image :deep(.arco-table-cell) {
  padding: 9px 0;
}
.t-table-image .t-table-open {
  position: absolute;
  padding: 0;
  right: 0;
  top: 0;
}
.t-table-image .t-table-column {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  text-align: center;
  cursor: pointer;
}
.t-table-image .t-table-icon {
  display: block;
}
.t-table-image .t-table-name {
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 13px;
  text-align: center;
}
.t-table-image .t-table-img,
.t-table-image .t-table-icon {
  width: auto;
  margin-right: 0;
  text-align: center;
}
.t-table-image :deep(.arco-btn-shape-circle) {
  border-radius: 0 !important;
  background-color: rgb(255 255 255 / 0%) !important;
}
.t-table :deep(.arco-table-th) {
  background-color: #fff;
}
/* .t-table :deep(.arco-table-header .arco-table-tr .arco-table-checkbox) {
} */
.t-table :deep(.arco-table-header) {
  border-bottom: 1px solid var(--color-fill-3);
}
.t-table-image:deep(.arco-table-header) {
  border-bottom: none;
}
.t-table-null:deep(.arco-table-td) {
  border-bottom: none;
}
.t-table-null .t-mode-1 :deep(.arco-table-header) {
  border-bottom: none;
}
.t-modes {
  margin: 20px 10px;
}
.t-line {
  border-left: 1px solid var(--color-fill-4);
  height: 30px;
  margin: 0 20px 0 10px;
  padding: 0 0 0 10px;
}
.t-tag {
  text-align: center;
  color: var(--color-text-2);
  background-color: var(--color-secondary);
  padding: 0;
  line-height: 20px;
  width: 20px;
  height: 20px;
  position: relative;
  margin: 0 2px;
  display: inline-block;
  font-size: 12px;
  border-radius: 4px;
}
</style>
