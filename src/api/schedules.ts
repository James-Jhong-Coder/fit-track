import instance from './instance'

interface ScheduleTrainingPlanExerciseEntry {
    id: string
    sort_order: number
    exercises: { id: string; name: string }
}

interface ScheduleTrainingPlan {
    id: string
    name: string
    training_plan_exercises: ScheduleTrainingPlanExerciseEntry[]
}

export interface ScheduleResponse {
    id: string
    date: string
    training_plan_id: string
    training_plans: ScheduleTrainingPlan
}

export async function fetchSchedules(): Promise<ScheduleResponse[]> {
    const { data } = await instance.get<ScheduleResponse[]>('/schedules')
    return data
}

export async function createSchedule(payload: {
    date: string
    training_plan_id: string
}): Promise<ScheduleResponse> {
    const { data } = await instance.post<ScheduleResponse>('/schedules', payload)
    return data
}

export async function deleteSchedule(id: string): Promise<void> {
    await instance.delete(`/schedules/${id}`)
}
