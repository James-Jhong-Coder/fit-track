<script setup lang="ts">
    import { ref } from 'vue'
    import { VueFinalModal } from 'vue-final-modal'

    import { useDialogDeleteConfirm } from '@/composables/useDialogDeleteConfirm'

    const props = defineProps<{
        bodyParts: { id: string; name: string }[]
    }>()

    const emit = defineEmits<{
        add: [name: string]
        delete: [id: string]
        cancel: []
    }>()

    const { openDeleteConfirm } = useDialogDeleteConfirm()

    const newBodyPart = ref('')

    function addBodyPart() {
        const val = newBodyPart.value.trim()
        if (!val || props.bodyParts.some(bp => bp.name === val)) return
        emit('add', val)
        newBodyPart.value = ''
    }

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
        <div class="body-parts-dialog">
            <div class="body-parts-dialog-header">
                <span class="text-base font-semibold text-gray-150">部位管理</span>
                <button class="dialog-close" @click="emit('cancel')">
                    <SvgIcon name="icon_close" class="w-5 h-5" />
                </button>
            </div>

            <div class="body-parts-dialog-body">
                <!-- 新增輸入區 -->
                <div class="add-row">
                    <div
                        class="field-outlined flex-1"
                        :class="{ 'field-outlined--active': newBodyPart }"
                    >
                        <span class="field-label">部位名稱</span>
                        <input
                            v-model="newBodyPart"
                            class="field-input"
                            placeholder="請輸入"
                            @keyup.enter="addBodyPart"
                        />
                    </div>
                    <button class="add-btn" @click="addBodyPart">新增</button>
                </div>

                <!-- 現有部位列表 -->
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

    .body-parts-dialog {
        @apply rounded-2xl bg-white flex flex-col;
    }

    .body-parts-dialog-header {
        @apply relative flex items-center justify-center px-6 py-4;
        @apply border-b border-black/[0.08];
    }

    .dialog-close {
        @apply absolute right-5 text-gray-150/50 hover:text-gray-150 transition-colors;
    }

    .body-parts-dialog-body {
        @apply px-6 py-5 flex flex-col gap-4;
    }

    .add-row {
        @apply flex items-center gap-3;
    }

    .field-outlined {
        @apply relative rounded-lg px-4 py-3;
        @apply border-[1.5px] border-solid border-gray-300;
        transition: border-color 0.2s;
    }

    .field-outlined--active {
        @apply border-green-100;
    }

    .field-label {
        @apply absolute text-xs text-gray-400 bg-white px-1;
        top: -9px;
        left: 12px;
    }

    .field-outlined--active .field-label {
        @apply text-green-100;
    }

    .field-input {
        @apply block w-full text-sm text-gray-150 outline-none bg-transparent mt-1;
    }

    .add-btn {
        @apply text-sm font-semibold text-green-100 whitespace-nowrap;
        @apply hover:text-green-100/70 transition-colors;
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
