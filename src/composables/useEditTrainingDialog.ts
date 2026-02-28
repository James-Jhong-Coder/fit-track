import { useModal } from 'vue-final-modal'

import DialogEditTraining from '@/components/dialogs/DialogEditTraining.vue'

interface ExerciseOption { id: number; name: string }
interface PlanData { name: string; exercises: ExerciseOption[] }

export function useEditTrainingDialog() {
    const { open, close, patchOptions } = useModal({
        component: DialogEditTraining,
        attrs: {
            exerciseOptions: [],
            initialName: '',
            initialExercises: [],
            onConfirm() { close() },
            onCancel() { close() },
        },
    })

    function openDialog(
        exerciseOptions: ExerciseOption[],
        initial: { name: string; exercises: ExerciseOption[] },
        onConfirmed: (data: PlanData) => void,
    ) {
        patchOptions({
            attrs: {
                exerciseOptions,
                initialName: initial.name,
                initialExercises: initial.exercises,
                onConfirm(data: PlanData) {
                    onConfirmed(data)
                    close()
                },
                onCancel() { close() },
            },
        })
        open()
    }

    return { open: openDialog, close }
}
