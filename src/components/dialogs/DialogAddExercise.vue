<script setup lang="ts">
    import { ref } from 'vue'
    import { VueFinalModal } from 'vue-final-modal'

    import CommonInput from '@/components/common/CommonInput.vue'
    import CommonSelect from '@/components/common/CommonSelect.vue'

    const emit = defineEmits<{
        confirm: [{ bodyPart: string; name: string }]
        cancel: []
    }>()

    const bodyParts = ['肩', '胸', '腿', '核心']
    const bodyPart = ref<string | undefined>(undefined)
    const name = ref('')

    function submit() {
        if (!bodyPart.value || !name.value) return
        emit('confirm', { bodyPart: bodyPart.value, name: name.value })
    }
</script>

<template>
    <VueFinalModal
        class="flex items-center justify-center"
        content-class="w-[80%]"
        overlay-transition="vfm-fade"
        content-transition="vfm-fade"
    >
        <div class="exercise-dialog">
            <div class="exercise-dialog-header">
                <span class="text-base font-semibold text-gray-150">新增動作</span>
                <button class="dialog-close" @click="emit('cancel')">
                    <SvgIcon name="icon_close" class="w-5 h-5" />
                </button>
            </div>

            <div class="exercise-dialog-body">
                <!-- 部位 -->
                <CommonSelect v-model="bodyPart" title="部位" :options="bodyParts" />

                <!-- 動作 -->
                <CommonInput v-model="name" title="動作" class="mt-4" />
            </div>

            <div class="exercise-dialog-footer">
                <CommonButton variant="solid" class="w-full" @click="submit">新增動作</CommonButton>
                <CommonButton variant="outline" class="w-full" @click="emit('cancel')"
                    >取消新增動作</CommonButton
                >
            </div>
        </div>
    </VueFinalModal>
</template>

<style scoped>
    @reference '#app.css';

    .exercise-dialog {
        @apply rounded-2xl bg-white flex flex-col;
        @apply w-full;
    }

    .exercise-dialog-header {
        @apply relative flex items-center justify-center px-6 py-4;
        border-bottom: 1px solid rgba(0, 0, 0, 0.08);
    }

    .dialog-close {
        @apply absolute right-5 text-gray-150/50 hover:text-gray-150 transition-colors;
    }

    .exercise-dialog-body {
        @apply px-6 py-5;
    }

    .exercise-dialog-footer {
        @apply flex flex-col items-center gap-3 px-6 pb-6;
    }
</style>
