import { useModal } from 'vue-final-modal'

import DialogAddTraining from '@/components/dialogs/DialogAddTraining.vue'

interface ExerciseOption { id: number; name: string }
interface PlanData { name: string; exercises: ExerciseOption[] }

export function useAddTrainingDialog() {
    const { open, close, patchOptions } = useModal({
        component: DialogAddTraining,
        attrs: {
            exerciseOptions: [],
            onConfirm() { close() },
            onCancel() { close() },
        },
    })

    function openDialog(
        exerciseOptions: ExerciseOption[],
        onConfirmed: (data: PlanData) => void,
    ) {
        patchOptions({
            attrs: {
                exerciseOptions,
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
