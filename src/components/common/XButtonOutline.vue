<script setup>
const props = defineProps({
    text: String,
    loading: Boolean,
    size: {
        default: 'normal'
    },
});

let emits = defineEmits(['xClick']);

function click(){
    emits('xClick')
}
</script>

<template>
    <div class="round">
        <a-button @click="click" :loading="loading" :class="size" type="outline" html-type="submit">{{props.text}}</a-button>
    </div>
</template>

<style scoped>
.round{
    display: inline;
    border: none;
    color: #fff;
}
.round .arco-btn {
    border-radius: 30px;
    font-size: 16px;
    font-weight: 500;
}
.normal{
    width: 160px;
    height: 42px;
}
.small{
    padding: 0 25px;
}

</style>