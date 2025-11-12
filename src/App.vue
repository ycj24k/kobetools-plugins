<template>
    <div class="kobe-embed-root" data-channel="kobetools">
        <div class="plugins-container">
            <div class="plugins-container-box">
                <router-view/>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount } from 'vue';

const CHANNEL = 'kobetools';

let ro = null;
let timer = 0;

const postHeight = (height) => {
    try {
        window.parent && window.parent.postMessage({ channel: CHANNEL, type: 'kobe:height', height: Math.max(0, Math.ceil(height)) }, '*');
    } catch (_) {}
};

onMounted(() => {
    const root = document.querySelector('.kobe-embed-root');
    if (!root) return;
    ro = new ResizeObserver((entries) => {
        const cr = entries[0]?.contentRect;
        if (!cr) return;
        clearTimeout(timer);
        timer = window.setTimeout(() => postHeight(cr.height), 80);
    });
    ro.observe(root);
    // 初次上报
    postHeight(root.getBoundingClientRect().height);
});

onBeforeUnmount(() => {
    if (ro) {
        try { ro.disconnect(); } catch (_) {}
        ro = null;
    }
    clearTimeout(timer);
});
</script>

<style>
@import '@/assets/style/global.less';

</style>