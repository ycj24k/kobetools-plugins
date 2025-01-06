<script setup>

const props = defineProps({
    text: String,
    type: String,
});

</script>

<template>
<div>
    <div :class="type" style="width: 70px; height: 20px; border-radius: 4px; display: flex; ">
        <div style="width: 50%; height: 100%; background-color: white; display:flex; justify-content: center; align-items: center">
            <img v-if="type==='baidu_mobile'" alt="" style="width: 15px;" src="@/assets/baidu_mobile.png" />
            <img v-if="type==='baidu'" alt="" style="width: 15px;" src="@/assets/baidu.png" />
            <img v-if="type==='so'" alt="" style="width: 15px;" src="@/assets/so.png" />
            <img v-if="type==='sougou'" alt="" style="width: 15px;" src="@/assets/sougou.png" />
            <img v-if="type==='sm'" alt="" style="width: 15px;" src="@/assets/sm.png" />
            <img v-if="type==='toutiao'" alt="" style="width: 15px;" src="@/assets/toutiao.png" />
            <img v-if="type==='bing'" alt="" style="width: 15px;" src="@/assets/bing.png" />
            <img v-if="type==='aizhan'" alt="" style="width: 15px;" src="@/assets/aizhan.png" />
            <img v-if="type==='zhanzhang'" alt="" style="width: 15px;" src="@/assets/zhanzhang.png" />
        </div>
        <div style="width: 50%; height: 100%; color: white; display:flex; justify-content: center; align-items: center">
            {{ text }}
        </div>
    </div>
</div>
</template>

<style scoped>
    .baidu_mobile{
        background-color: #3388ff;
        border: 2px solid #3388ff
    }
    .baidu{
        background-color: #2b99ff;
        border: 2px solid #2b99ff
    }
    .so{
        background-color: #28b058;
        border: 2px solid #28b058
    }
    .sougou{
        background-color: #fd6853;
        border: 2px solid #fd6853
    }
    .sm{
        background-color: #f28300;
        border: 2px solid #f28300
    }
    .toutiao{
        background-color: #ff3d43;
        border: 2px solid #ff3d43
    }
    .bing{
        background-color: #2b99ff;
        border: 2px solid #2b99ff
    }
    .aizhan{
        background-color: #1bbf4f;
        border: 2px solid #1bbf4f
    }
    .zhanzhang{
        background-color: rgb(89,133,192);
        border: 2px solid rgb(89,133,192)
    }
</style>