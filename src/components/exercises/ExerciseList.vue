<script setup lang="ts">
    interface ExerciseItem {
        id: number
        name: string
        originalIndex: number
    }

    defineProps<{
        exercises: ExerciseItem[]
    }>()

    const emit = defineEmits<{
        edit: [index: number]
        delete: [index: number]
    }>()
</script>

<template>
    <div class="exercise-card">
        <ul class="exercise-list">
            <li
                v-for="(ex, i) in exercises"
                :key="ex.id"
                class="exercise-item"
                @click="emit('edit', ex.originalIndex)"
            >
                <span class="exercise-name">{{ i + 1 }}. {{ ex.name }}</span>
                <button class="delete-btn" @click.stop="emit('delete', ex.originalIndex)">
                    <SvgIcon name="icon_minus" class="w-5 h-5 text-white" />
                </button>
            </li>
        </ul>
    </div>
</template>

<style scoped>
    @reference '#app.css';

    .exercise-card {
        @apply rounded-2xl overflow-hidden;
        @apply bg-green-100;
    }

    .exercise-list {
        @apply flex flex-col;
    }

    .exercise-item {
        @apply flex items-center justify-between px-5 py-3 cursor-pointer;
        @apply transition-colors;
        @apply border-b border-b-white/20;

        &:last-child {
            border-bottom: none;
        }

        &:active {
            @apply bg-white/10;
        }
    }

    .exercise-name {
        @apply text-sm text-white font-medium flex-1;
    }

    .delete-btn {
        @apply text-white active:text-white/60 transition-colors;
    }
</style>
