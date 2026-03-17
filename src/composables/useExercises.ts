import { computed, onMounted, ref } from 'vue'

import { createExercise, deleteExercise, fetchExercises, updateExercise } from '@/api/exercises'

import type { BodyPart } from './useBodyParts'

export interface ExercisePayload {
    name: string
    body_part_id?: string
}

export interface Exercise {
    id: string
    name: string
    body_part_id?: string
    body_parts?: BodyPart
}

export function useExercises() {
    const exercises = ref<Exercise[]>([])

    const selectedFilter = ref<string | null>(null)

    const filteredExercises = computed(() => {
        if (selectedFilter.value === null) return exercises.value
        return exercises.value.filter(ex => ex.body_part_id === selectedFilter.value)
    })

    onMounted(async () => {
        exercises.value = await fetchExercises()
    })

    async function addExercise(data: ExercisePayload) {
        const created = await createExercise(data)
        exercises.value.push(created)
    }

    async function editExercise(id: string, data: ExercisePayload) {
        const updated = await updateExercise(id, data)
        const index = exercises.value.findIndex(ex => ex.id === id)
        if (index !== -1) exercises.value[index] = updated
    }

    async function removeExercise(id: string) {
        await deleteExercise(id)
        exercises.value = exercises.value.filter(ex => ex.id !== id)
    }

    async function refreshExercises() {
        exercises.value = await fetchExercises()
    }

    return {
        exercises,
        selectedFilter,
        filteredExercises,
        addExercise,
        editExercise,
        removeExercise,
        refreshExercises,
    }
}
