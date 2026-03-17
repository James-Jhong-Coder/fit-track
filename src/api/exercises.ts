import instance from './instance'

export interface ExerciseResponse {
    id: string
    name: string
    body_part_id?: string
    body_parts?: { id: string; name: string }
}

export async function fetchExercises(): Promise<ExerciseResponse[]> {
    const { data } = await instance.get<ExerciseResponse[]>('/exercises')
    return data
}

export async function createExercise(payload: {
    name: string
    body_part_id?: string
}): Promise<ExerciseResponse> {
    const { data } = await instance.post<ExerciseResponse>('/exercises', payload)
    return data
}

export async function updateExercise(
    id: string,
    payload: { name: string; body_part_id?: string },
): Promise<ExerciseResponse> {
    const { data } = await instance.patch<ExerciseResponse>(`/exercises/${id}`, payload)
    return data
}

export async function deleteExercise(id: string): Promise<void> {
    await instance.delete(`/exercises/${id}`)
}
