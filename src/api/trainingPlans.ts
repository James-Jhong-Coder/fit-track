import instance from './instance'

interface TrainingPlanExerciseEntry {
    id: string
    sort_order: number
    exercises: {
        id: string
        name: string
        body_parts?: { id: string; name: string }
    }
}

export interface TrainingPlanResponse {
    id: string
    name: string
    training_plan_exercises: TrainingPlanExerciseEntry[]
}

export async function fetchTrainingPlans(): Promise<TrainingPlanResponse[]> {
    const { data } = await instance.get<TrainingPlanResponse[]>('/training-plans')
    return data
}

export async function createTrainingPlan(payload: {
    name: string
    exercise_ids?: string[]
}): Promise<TrainingPlanResponse> {
    const { data } = await instance.post<TrainingPlanResponse>('/training-plans', payload)
    return data
}

export async function updateTrainingPlan(
    id: string,
    payload: { name?: string; exercise_ids?: string[] },
): Promise<TrainingPlanResponse> {
    const { data } = await instance.patch<TrainingPlanResponse>(`/training-plans/${id}`, payload)
    return data
}

export async function deleteTrainingPlan(id: string): Promise<void> {
    await instance.delete(`/training-plans/${id}`)
}
