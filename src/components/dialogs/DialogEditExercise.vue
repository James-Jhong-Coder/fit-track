<script setup lang="ts">
    import { computed, ref } from 'vue'
    import { VueFinalModal } from 'vue-final-modal'

    import CommonInput from '@/components/common/CommonInput.vue'
    import CommonSelect from '@/components/common/CommonSelect.vue'

    const props = defineProps<{
        bodyPartOptions: { id: string; name: string }[]
        body_part_id: string
        name: string
    }>()

    const emit = defineEmits<{
        confirm: [{ name: string; body_part_id: string }]
        cancel: []
    }>()

    const body_part_id = ref(props.body_part_id)
    const name = ref(props.name)

    const bodyPartNames = computed(() => props.bodyPartOptions.map(bp => bp.name))
    const selectedBodyPartName = computed({
        get() { return props.bodyPartOptions.find(bp => bp.id === body_part_id.value)?.name },
        set(val: string | undefined) {
            body_part_id.value = props.bodyPartOptions.find(bp => bp.name === val)?.id ?? ''
        },
    })

    function submit() {
        if (!body_part_id.value || !name.value) return
        emit('confirm', { name: name.value, body_part_id: body_part_id.value })
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
                <span class="text-base font-semibold text-gray-150">編輯動作</span>
                <button class="dialog-close" @click="emit('cancel')">
                    <SvgIcon name="icon_close" class="w-5 h-5" />
                </button>
            </div>

            <div class="exercise-dialog-body">
                <!-- 部位 -->
                <CommonSelect v-model="selectedBodyPartName" title="部位" :options="bodyPartNames" />

                <!-- 動作 -->
                <CommonInput v-model="name" title="動作" class="mt-4" />
            </div>

            <div class="exercise-dialog-footer">
                <CommonButton variant="solid" class="w-full" @click="submit">儲存動作</CommonButton>
                <button class="cancel-btn" @click="emit('cancel')">取消編輯</button>
            </div>
        </div>
    </VueFinalModal>
</template>

<style scoped>
    @reference '#app.css';

    .exercise-dialog {
        @apply rounded-2xl bg-white flex flex-col w-full;
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

    .cancel-btn {
        @apply text-sm text-gray-150/60 hover:text-gray-150 transition-colors;
    }
</style>
