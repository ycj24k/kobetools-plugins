<template>
  <a-modal v-if="visible" v-model:visible="visible" :width="900" :hide-cancel="true" :ok-text="oktext" :on-before-ok="handleOk" @cancel="handleCancel">
    <template #title>上传文件到【 根目录/{{ prefix }} 】</template>
    <a-upload ref="uploadRef" :file-list="fileList" :auto-upload="false" :show-file-list="false" list-type="text" :directory="directory" accept="*" multiple @before-upload="beforeUpload" @change="onChange">
      <template #upload-button>
        <a-space>
          <a-button type="primary" @click="directory = false">选择文件</a-button>
          <a-button @click="directory = true">选择文件夹</a-button>
        </a-space>
      </template>
    </a-upload>
    <a-button style="float: right" @click="clearUpload()">清空列表</a-button>
    <a-alert v-if="tip" type="success" style="margin-top: 20px">{{ tip }}</a-alert>
    <a-table :data="fileList" style="margin-top: 20px" :pagination="false" :scroll="{ x: '100%', y: 340 }">
      <template #columns>
        <a-table-column title="文件/文件夹">
          <template #cell="{ record }">
            <img v-if="record.url && record.file.type.includes('image')" :src="record.url" style="width: 40px; height: 40px; margin-right: 10px; object-fit: cover; vertical-align: middle" />
            <icon-file v-else style="width: 40px" />
            <span v-if="record.file.webkitRelativePath">{{ record.file.webkitRelativePath }}</span>
            <span v-else>{{ record.name }}</span>
          </template>
        </a-table-column>
        <a-table-column title="大小" :width="150">
          <template #cell="{ record }">
            <span>{{ record.file.size / 1000 }} KB</span>
          </template>
        </a-table-column>
        <a-table-column title="状态" :width="100">
          <template #cell="{ record }">
            <icon-delete v-if="record.percent === 0" @click="onDel(record)" />
            <a-progress v-else type="circle" size="mini" :percent="record.percent" />
          </template>
        </a-table-column>
      </template>
    </a-table>
  </a-modal>
</template>

<script setup>
import { ref, watch, computed } from 'vue';
import { useAppStore } from '@/store';
import { Message } from '@arco-design/web-vue';
import useApp from '@/utils/composables/app';
import useOss from '@/utils/composables/oss';

const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(['update:visible']);
const visible = ref(false);
watch(
  () => props.visible,
  async (data) => {
    visible.value = data;
  }
);
const appStore = useAppStore();
const oss = useOss();
const tip = computed(() => appStore.tip);
const fileList = computed(() => appStore.fileList);
const prefix = computed(() => appStore.prefix);
const directory = ref(false);
const oktext = ref('确定上传');
const uploadRef = ref();

const clearUpload = async () => {
  await appStore.setTip('');
  await appStore.setPercent(0);
  await appStore.setFileList([]);
  oktext.value = '确定上传';
};

const handleCancel = async () => {
  emit('update:visible', false);
  await clearUpload();
};

const beforeUpload = (file) => {
  return new Promise((resolve, reject) => {
    resolve(true);
    // reject('cancel');
  });
};
const handleOk = async (done) => {
  if (appStore.percent === 1) {
    await clearUpload();
    done(false);
    return;
  }
  if (appStore.fileList.length === 0) {
    await clearUpload();
    Message.error('文件不能为空');
    done(false);
    return;
  }
  const code = await isUpload();
  if (code !== 200) {
    Message.error('空间已满！');
    done(false);
    return;
  }
  oktext.value = '上传中';
  await oss.upload();
  await onRefresh();
  oktext.value = '继续上传';
  done(false);
  return;
};

const onChange = async (file) => {
  await appStore.setFileList(file);
};

const onDel = (file) => {
  const index = fileList.value.findIndex((item) => item.uid === file.uid);
  fileList.value.splice(index, 1);
};

const { onRefresh, isUpload } = useApp();
</script>

<style scoped></style>
