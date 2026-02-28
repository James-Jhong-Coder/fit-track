<script setup lang="ts">
    import { computed, ref } from 'vue'
    import { VueFinalModal } from 'vue-final-modal'

    import CommonInput from '@/components/common/CommonInput.vue'
    import CommonSelect from '@/components/common/CommonSelect.vue'

    interface ExerciseOption {
        id: number
        name: string
    }

    const props = defineProps<{
        exerciseOptions: ExerciseOption[]
    }>()

    const emit = defineEmits<{
        confirm: [{ name: string; exercises: ExerciseOption[] }]
        cancel: []
    }>()

    const planName = ref('')
    const selectedExercises = ref<ExerciseOption[]>([])
    const exerciseToAdd = ref<string | undefined>(undefined)

    const availableExercises = computed(() =>
        props.exerciseOptions
            .filter(e => !selectedExercises.value.some(s => s.id === e.id))
            .map(e => e.name),
    )

    function addExercise() {
        if (!exerciseToAdd.value) return
        const found = props.exerciseOptions.find(e => e.name === exerciseToAdd.value)
        if (!found) return
        selectedExercises.value.push({ id: found.id, name: found.name })
        exerciseToAdd.value = undefined
    }

    function removeExercise(index: number) {
        selectedExercises.value.splice(index, 1)
    }

    function submit() {
        if (!planName.value) return
        emit('confirm', { name: planName.value, exercises: selectedExercises.value })
    }
</script>

<template>
    <VueFinalModal
        class="flex items-center justify-center"
        content-class="w-[90%]"
        overlay-transition="vfm-fade"
        content-transition="vfm-fade"
    >
        <div class="training-dialog">
            <div class="training-dialog-header">
                <span class="text-base font-semibold text-gray-150">新增課表</span>
                <button class="dialog-close" @click="emit('cancel')">
                    <SvgIcon name="icon_close" class="w-5 h-5" />
                </button>
            </div>

            <div class="training-dialog-body">
                <CommonInput v-model="planName" title="課表名稱" />
                <div class="flex items-center mt-5">
                    <CommonSelect
                        v-model="exerciseToAdd"
                        title="選擇動作"
                        :options="availableExercises"
                        class="flex-1"
                    />
                    <SvgIcon
                        name="icon_plus"
                        class="w-6 h-6 text-green-100 ml-4"
                        @click="addExercise"
                    />
                </div>
                <ul v-if="selectedExercises.length" class="mt-6 flex flex-col gap-2">
                    <li v-for="ex in selectedExercises" :key="ex.id" class="exercise-item">
                        <span class="text-sm text-gray-150">動作：{{ ex.name }}</span>
                        <SvgIcon name="icon_minus" class="w-6 h-6 text-red-700" />
                    </li>
                </ul>
            </div>

            <div class="training-dialog-footer">
                <CommonButton variant="solid" class="w-full" @click="submit">新增課表</CommonButton>
                <button class="cancel-btn" @click="emit('cancel')">取消</button>
            </div>
        </div>
    </VueFinalModal>
</template>

<style scoped>
    @reference '#app.css';

    .training-dialog {
        @apply rounded-2xl bg-white flex flex-col w-full;
    }

    .training-dialog-header {
        @apply relative flex items-center justify-center px-6 py-4;
        border-bottom: 1px solid rgba(0, 0, 0, 0.08);
    }

    .dialog-close {
        @apply absolute right-5 text-gray-150/50 hover:text-gray-150 transition-colors;
    }

    .training-dialog-body {
        @apply px-6 py-5;
    }

    .exercise-item {
        @apply flex items-center justify-between rounded-xl px-4 py-3 bg-gray-300;
    }

    .training-dialog-footer {
        @apply flex flex-col items-center gap-3 px-6 pb-6;
    }

    .cancel-btn {
        @apply text-sm text-gray-150/60 hover:text-gray-150 transition-colors;
    }
</style>
