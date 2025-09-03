<template>
  <FileList file-type="image" />
</template>

<script setup>
import FileList from '@/components/workspace/FileList.vue';
</script>

<script>
export default {
  name: 'MyImage',
};
</script>

<style lang="less" scoped>
.container {
  padding: 20px;
}
</style>
