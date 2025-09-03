<template>
  <a-image-preview :src="imagePreview" v-model:visible="imagePreviewVisible" @close="imagePreview = ''" />
</template>

<script setup>
import { ref, computed } from 'vue';
import { useAppStore } from '@/store';

const appStore = useAppStore();
const imagePreviewVisible = ref(false);
const imagePreview = computed({
  get: () => {
    imagePreviewVisible.value = appStore.imagePreview ? true : false;
    return appStore.imagePreview;
  },
  set: () => {
    appStore.imagePreview = '';
    imagePreviewVisible.value = false;
  },
});
</script>

<style scoped></style>
