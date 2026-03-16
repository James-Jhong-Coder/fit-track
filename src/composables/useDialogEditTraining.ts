import { useModal } from 'vue-final-modal'

import DialogEditTraining from '@/components/dialogs/DialogEditTraining.vue'

interface ExerciseOption {
    id: number
    name: string
}
interface PlanData {
    name: string
    exercises: ExerciseOption[]
}

interface OpenEditTrainingParams {
    exerciseOptions: ExerciseOption[]
    initial: PlanData
    onConfirmed: (data: PlanData) => void
}

export function useDialogEditTraining() {
    const { open, close, patchOptions } = useModal({
        component: DialogEditTraining,
        attrs: {
            exerciseOptions: [],
            initialName: '',
            initialExercises: [],
            onConfirm() {
                close()
            },
            onCancel() {
                close()
            },
        },
    })

    function openDialog({ exerciseOptions, initial, onConfirmed }: OpenEditTrainingParams) {
        patchOptions({
            attrs: {
                exerciseOptions,
                initialName: initial.name,
                initialExercises: initial.exercises,
                onConfirm(data: PlanData) {
                    onConfirmed(data)
                    close()
                },
                onCancel() {
                    close()
                },
            },
        })
        open()
    }

    return { open: openDialog, close }
}
