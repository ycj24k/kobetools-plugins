<script setup>

const props = defineProps({
    placeholder: String
});

</script>

<template>
    <a-textarea class="textarea" style="padding-top: 8px; height: 100%;" :placeholder="placeholder" allow-clear />
</template>

<style scoped>
.textarea{
    border-radius: .41667vw;
}
/deep/ .arco-textarea-clear-btn{
    bottom: 0 !important;
}
</style>