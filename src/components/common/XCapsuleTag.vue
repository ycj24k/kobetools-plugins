<script setup>
const props = defineProps({
    text: String,
});
</script>

<template>
<div>
    <div style="width: 70px; height: 20px; background-color: #3388ff; border-radius: 4px; display: flex; border: 2px solid #3388ff">
        <div style="width: 50%; height: 100%; background-color: white; display:flex; justify-content: center; align-items: center">
            <icon-qq style="color: #3388ff" />
        </div>
        <div style="width: 50%; height: 100%; color: white; display:flex; justify-content: center; align-items: center">
            {{ text }}
        </div>
    </div>
</div>
</template>

<style scoped>

</style>