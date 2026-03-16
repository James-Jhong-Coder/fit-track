import instance from './instance'

export interface BodyPart {
    id: string
    name: string
}

export async function fetchBodyParts(): Promise<BodyPart[]> {
    const { data } = await instance.get<BodyPart[]>('/body-parts')
    return data
}

export async function createBodyPart(name: string): Promise<BodyPart> {
    const { data } = await instance.post<BodyPart>('/body-parts', { name })
    return data
}

export async function deleteBodyPart(id: string): Promise<void> {
    await instance.delete(`/body-parts/${id}`)
}
