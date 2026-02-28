<script setup lang="ts">
    import { VueFinalModal } from 'vue-final-modal'

    defineProps<{
        message?: string
    }>()

    const emit = defineEmits<{
        confirm: []
        cancel: []
    }>()
</script>

<template>
    <VueFinalModal
        class="flex items-center justify-center"
        content-class="w-[80%]"
        overlay-transition="vfm-fade"
        content-transition="vfm-fade"
    >
        <div class="delete-dialog">
            <div class="delete-dialog-header">
                <span class="text-base font-semibold text-gray-150">刪除確認</span>
                <button class="dialog-close" @click="emit('cancel')">
                    <SvgIcon name="icon_close" class="w-5 h-5" />
                </button>
            </div>

            <div class="delete-dialog-body">
                <span class="warning-icon">&#9888;</span>
                <p class="text-sm text-gray-150 mt-2">{{ message ?? '注意！請確認是否刪除' }}</p>
            </div>

            <div class="delete-dialog-footer">
                <CommonButton variant="solid" class="w-full" @click="emit('confirm')">
                    刪除
                </CommonButton>
                <button class="cancel-btn" @click="emit('cancel')">取消</button>
            </div>
        </div>
    </VueFinalModal>
</template>

<style scoped>
    @reference '#app.css';

    .delete-dialog {
        @apply rounded-2xl bg-white flex flex-col w-full;
    }

    .delete-dialog-header {
        @apply relative flex items-center px-6 py-4;
        border-bottom: 1px solid rgba(0, 0, 0, 0.08);
    }

    .dialog-close {
        @apply absolute right-5 text-gray-150/50 hover:text-gray-150 transition-colors;
    }

    .delete-dialog-body {
        @apply flex flex-col items-center px-6 py-6 text-center;
    }

    .warning-icon {
        @apply text-3xl text-gray-150;
    }

    .delete-dialog-footer {
        @apply flex flex-col items-center gap-3 px-6 pb-6;
    }

    .cancel-btn {
        @apply text-sm text-gray-150/60 hover:text-gray-150 transition-colors;
    }
</style>
