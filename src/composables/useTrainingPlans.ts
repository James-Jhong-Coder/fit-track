import { onMounted, ref } from 'vue'

import {
    createTrainingPlan,
    deleteTrainingPlan,
    fetchTrainingPlans,
    updateTrainingPlan,
} from '@/api/trainingPlans'

import type { TrainingPlanResponse } from '@/api/trainingPlans'

export interface TrainingPlanExercise {
    id: string
    name: string
}

export interface TrainingPlan {
    id: string
    name: string
    exercises: TrainingPlanExercise[]
}

export interface TrainingPlanPayload {
    name: string
    exercise_ids?: string[]
}

function toTrainingPlan(raw: TrainingPlanResponse): TrainingPlan {
    return {
        id: raw.id,
        name: raw.name,
        exercises: raw.training_plan_exercises.map(entry => ({
            id: entry.exercises.id,
            name: entry.exercises.name,
        })),
    }
}

export function useTrainingPlans() {
    const plans = ref<TrainingPlan[]>([])

    onMounted(async () => {
        const raw = await fetchTrainingPlans()
        plans.value = raw.map(toTrainingPlan)
    })

    async function addTrainingPlan(payload: TrainingPlanPayload) {
        const raw = await createTrainingPlan(payload)
        plans.value.push(toTrainingPlan(raw))
    }

    async function editTrainingPlan(id: string, payload: TrainingPlanPayload) {
        const raw = await updateTrainingPlan(id, payload)
        const index = plans.value.findIndex(p => p.id === id)
        if (index !== -1) plans.value[index] = toTrainingPlan(raw)
    }

    async function removeTrainingPlan(id: string) {
        await deleteTrainingPlan(id)
        plans.value = plans.value.filter(p => p.id !== id)
    }

    return { plans, addTrainingPlan, editTrainingPlan, removeTrainingPlan }
}
