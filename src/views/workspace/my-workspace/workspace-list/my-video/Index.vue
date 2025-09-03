<template>
  <FileList file-type="video" />
</template>

<script setup>
import FileList from '@/components/workspace/FileList.vue';
</script>

<script>
export default {
  name: 'MyVideo',
};
</script>

<style lang="less" scoped>
.container {
  padding: 20px;
}
</style>
