<template>
  <FileList file-type="audio" />
</template>

<script setup>
import FileList from '@/components/workspace/FileList.vue';
</script>

<script>
export default {
  name: 'MyAudio',
};
</script>

<style lang="less" scoped>
.container {
  padding: 20px;
}
</style>
