<script setup lang="ts">
    import { VueFinalModal } from 'vue-final-modal'

    import { useDialogDeleteConfirm } from '@/composables/useDialogDeleteConfirm'

    const props = defineProps<{
        bodyParts: { id: string; name: string }[]
    }>()

    const emit = defineEmits<{
        delete: [id: string]
        cancel: []
    }>()

    const { openDeleteConfirm } = useDialogDeleteConfirm()

    function handleDelete(id: string) {
        openDeleteConfirm(() => {
            emit('delete', id)
        }, '注意！刪除此部位將同時刪除所有相關動作')
    }
</script>

<template>
    <VueFinalModal
        class="flex items-center justify-center"
        content-class="w-[90%]"
        overlay-transition="vfm-fade"
        content-transition="vfm-fade"
    >
        <div class="delete-body-part-dialog">
            <div class="dialog-header">
                <span class="text-base font-semibold text-gray-150">部位管理</span>
                <button class="dialog-close" @click="emit('cancel')">
                    <SvgIcon name="icon_close" class="w-5 h-5" />
                </button>
            </div>

            <div class="dialog-body">
                <ul class="parts-list">
                    <li v-for="part in bodyParts" :key="part.id" class="part-item">
                        <span class="text-sm text-gray-150 font-medium">{{ part.name }}</span>
                        <button class="delete-btn" @click="handleDelete(part.id)">
                            <SvgIcon name="icon_minus" class="w-4 h-4" />
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    </VueFinalModal>
</template>

<style scoped>
    @reference '#app.css';

    .delete-body-part-dialog {
        @apply rounded-2xl bg-white flex flex-col;
    }

    .dialog-header {
        @apply relative flex items-center justify-center px-6 py-4;
        @apply border-b border-black/[0.08];
    }

    .dialog-close {
        @apply absolute right-5 text-gray-150/50 hover:text-gray-150 transition-colors;
    }

    .dialog-body {
        @apply px-6 py-5;
    }

    .parts-list {
        @apply flex flex-col;
    }

    .part-item {
        @apply flex items-center justify-between py-3;
        @apply border-b border-black/5;

        &:last-child {
            border-bottom: none;
        }
    }

    .delete-btn {
        @apply text-green-100/60 hover:text-green-100 transition-colors;
    }
</style>
