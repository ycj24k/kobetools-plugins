<script setup>
const props = defineProps({
    color: String,
    text: String,
    loading: Boolean,
    shape: String,
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
    <!--方形按钮-->
    <div v-if="shape==='square'" class="square">
        <a-button @click="click" :loading="loading" :class="[props.color, size]" type="primary" html-type="submit">{{props.text}}</a-button>
    </div>
    <!--圆形按钮-->
    <div v-else class="round">
        <a-button @click="click" :loading="loading" :class="[props.color, size]" type="primary" html-type="submit">{{props.text}}</a-button>
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
.round{
    display: inline;
    border: none;
    color: #fff;
}
.round .arco-btn {
    border-radius: 30px;
    font-size: 16px;
    font-weight: 500;
    border: none;
}
.normal{
    width: 160px;
    height: 42px;
}
.small{
    padding: 0 25px;
}

</style>