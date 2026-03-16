import { computed, ref } from 'vue'

import type { Ref } from 'vue'

import { useDialogAddExercise } from '@/composables/useDialogAddExercise'
import { useDialogDeleteConfirm } from '@/composables/useDialogDeleteConfirm'
import { useDialogEditExercise } from '@/composables/useDialogEditExercise'

import type { BodyPart } from './useBodyParts'

export interface Exercise {
    id: string
    name: string
    body_part_id?: string
    body_parts?: BodyPart
}

export function useExercises(bodyParts: Ref<BodyPart[]>) {
    const exercises = ref<Exercise[]>([
        { id: '1', name: '槓鈴臥推', body_part_id: 'bp-1', body_parts: { id: 'bp-1', name: '胸' } },
        { id: '2', name: '啞鈴肩推', body_part_id: 'bp-2', body_parts: { id: 'bp-2', name: '肩' } },
        {
            id: '3',
            name: '機械推（隨意儘量固定）',
            body_part_id: 'bp-3',
            body_parts: { id: 'bp-3', name: '腿' },
        },
        { id: '4', name: '機械肩推', body_part_id: 'bp-2', body_parts: { id: 'bp-2', name: '肩' } },
        {
            id: '5',
            name: '滑輪過頭三頭',
            body_part_id: 'bp-4',
            body_parts: { id: 'bp-4', name: '核心' },
        },
        {
            id: '6',
            name: '三頭下壓',
            body_part_id: 'bp-4',
            body_parts: { id: 'bp-4', name: '核心' },
        },
    ])

    const selectedFilter = ref<string | null>(null)

    const filteredExercises = computed(() => {
        const list = exercises.value.map((ex, i) => ({ ...ex, originalIndex: i }))
        if (selectedFilter.value === null) return list
        return list.filter(ex => ex.body_part_id === selectedFilter.value)
    })

    const { open: openAdd } = useDialogAddExercise()
    const { open: openEdit } = useDialogEditExercise()
    const { open: openDeleteConfirm } = useDialogDeleteConfirm()

    function handleAdd() {
        openAdd(bodyParts.value, data => {
            const bodyPart = bodyParts.value.find(bp => bp.id === data.body_part_id)
            exercises.value.push({
                id: String(Date.now()),
                name: data.name,
                body_part_id: data.body_part_id,
                body_parts: bodyPart,
            })
        })
    }

    function handleEdit(index: number) {
        const ex = exercises.value[index]
        if (!ex) return
        openEdit(bodyParts.value, { name: ex.name, body_part_id: ex.body_part_id ?? '' }, data => {
            const bodyPart = bodyParts.value.find(bp => bp.id === data.body_part_id)
            exercises.value[index] = {
                id: ex.id,
                name: data.name,
                body_part_id: data.body_part_id,
                body_parts: bodyPart,
            }
        })
    }

    function handleDelete(index: number) {
        openDeleteConfirm(() => {
            exercises.value.splice(index, 1)
        })
    }

    return {
        exercises,
        selectedFilter,
        filteredExercises,
        handleAdd,
        handleEdit,
        handleDelete,
    }
}
