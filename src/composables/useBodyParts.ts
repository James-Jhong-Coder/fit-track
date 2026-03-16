import { onMounted, ref } from 'vue'

import { createBodyPart, deleteBodyPart, fetchBodyParts } from '@/api/bodyParts'

export interface BodyPart {
    id: string
    name: string
}

export function useBodyParts() {
    const bodyParts = ref<BodyPart[]>([])

    onMounted(async () => {
        bodyParts.value = await fetchBodyParts()
    })

    async function addBodyPart(name: string) {
        const created = await createBodyPart(name)
        bodyParts.value.push(created)
    }

    async function removeBodyPart(id: string) {
        await deleteBodyPart(id)
        bodyParts.value = bodyParts.value.filter(bp => bp.id !== id)
    }

    return { bodyParts, addBodyPart, removeBodyPart }
}
