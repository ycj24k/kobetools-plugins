<template>
  <FileList file-type="all" />
</template>

<script setup>
import FileList from '@/components/workspace/FileList.vue';
</script>

<script>
export default {
  name: 'OnlineFile',
};
</script>

<style lang="less" scoped>
.container {
  padding: 20px;
}
</style>
