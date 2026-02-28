import { useModal } from 'vue-final-modal'

import DialogAddExercise from '@/components/dialogs/DialogAddExercise.vue'

type ExerciseData = { bodyPart: string; name: string }

export function useAddExerciseDialog() {
    const { open, close, patchOptions } = useModal({
        component: DialogAddExercise,
        attrs: {
            onConfirm(_data: ExerciseData) {
                close()
            },
            onCancel() {
                close()
            },
        },
    })

    function openDialog(onConfirmed: (data: ExerciseData) => void) {
        patchOptions({
            attrs: {
                onConfirm(data: ExerciseData) {
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
