<script setup lang="ts">
    import { VueFinalModal } from 'vue-final-modal'
    import { useRouter } from 'vue-router'

    const emit = defineEmits<{
        confirm: []
        cancel: []
    }>()

    const router = useRouter()

    function navigate(path: string) {
        emit('confirm')
        router.push(path)
    }
</script>

<template>
    <VueFinalModal
        class="flex justify-end"
        content-class="h-full w-[80%]"
        overlay-transition="vfm-fade"
        content-transition="vfm-slide-right"
    >
        <div class="menu-dialog">
            <div class="menu-dialog-header">
                <span class="text-3xl">Menu</span>
                <button class="menu-close" @click="emit('cancel')">
                    <SvgIcon name="icon_close" class="w-8 h-8" />
                </button>
            </div>
            <div class="menu-dialog-body">
                <ul class="menu-list mt-20">
                    <li @click="navigate('/')">首頁</li>
                    <li @click="navigate('/exercises')">動作庫</li>
                    <li @click="navigate('/training')">新增課表</li>
                    <li @click="navigate('/schedule')">課表安排</li>
                </ul>
            </div>
        </div>
    </VueFinalModal>
</template>

<style scoped>
    @reference '#app.css';

    .menu-dialog {
        @apply flex flex-col;
        @apply h-full;
        background: linear-gradient(0deg, #2a6041, #2a6041);
    }

    .menu-dialog-header {
        @apply relative flex items-center justify-center px-7 py-5;
    }

    .menu-close {
        @apply absolute right-7 transition-colors;
        @apply text-white/70;
    }

    .menu-dialog-body {
        @apply flex flex-1;
    }

    .menu-list {
        @apply grid;
        @apply mx-auto w-full;
        grid-template-columns: 1fr;
        grid-template-rows: min-content;
        grid-auto-rows: min-content;
        gap: 1rem 0;
    }

    .menu-list li {
        @apply text-white text-xl font-medium cursor-pointer;
        @apply active:text-white/60 transition-colors select-none;
        @apply py-3 text-center;
    }
</style>
