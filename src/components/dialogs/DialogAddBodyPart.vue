<script setup lang="ts">
    import { ref } from 'vue'
    import { VueFinalModal } from 'vue-final-modal'

    import CommonButton from '@/components/common/CommonButton.vue'
    import CommonInput from '@/components/common/CommonInput.vue'

    const props = defineProps<{
        existingNames: string[]
    }>()

    const emit = defineEmits<{
        confirm: [name: string]
        cancel: []
    }>()

    const name = ref('')

    function submit() {
        const val = name.value.trim()
        if (!val || props.existingNames.includes(val)) return
        emit('confirm', val)
    }
</script>

<template>
    <VueFinalModal
        class="flex items-center justify-center"
        content-class="w-[90%]"
        overlay-transition="vfm-fade"
        content-transition="vfm-fade"
    >
        <div class="add-body-part-dialog">
            <div class="dialog-header">
                <span class="text-base font-semibold text-gray-150">新增部位</span>
                <button class="dialog-close" @click="emit('cancel')">
                    <SvgIcon name="icon_close" class="w-5 h-5" />
                </button>
            </div>

            <div class="dialog-body">
                <CommonInput v-model="name" title="部位名稱" />
                <CommonButton variant="solid" @click="submit">新增</CommonButton>
            </div>
        </div>
    </VueFinalModal>
</template>

<style scoped>
    @reference '#app.css';

    .add-body-part-dialog {
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
        @apply px-6 py-5 flex flex-col gap-4;
    }
</style>
