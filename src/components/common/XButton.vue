<script setup>
const props = defineProps({
    color: String,
    text: String,
    loading: Boolean,
});

let emits = defineEmits(['xClick']);

function click(){
    emits('xClick')
}
</script>

<template>
    <div class="button">
        <a-button @click="click" :loading="loading" :class="props.color" type="primary" html-type="submit">{{props.text}}</a-button>
    </div>
</template>

<style scoped>
.purple_blue_pink {
    background: linear-gradient(to right, #6332f3, #4c6ef0,#F84DAB);
}
.blue {
    background: linear-gradient(to right, #1249ff, #5d82ff);
}
.yellow {
    background: linear-gradient(to right, #ab5109, #f09c3a);
}
.pink {
    background: linear-gradient(to right, #b50fa5, #ea61ef);
}
.button{
    display: inline;
    border: none;
    color: #fff;
}
.button{
    .arco-btn {
        width: 160px;
        height: 42px;
        border-radius: 30px;
        font-size: 16px;
        font-weight: 500;
        border: none;
    }
}
</style>