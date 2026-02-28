import { useModal } from 'vue-final-modal'

import DialogEditExercise from '@/components/dialogs/DialogEditExercise.vue'

type ExerciseData = { bodyPart: string; name: string }

export function useEditExerciseDialog() {
    const { open, close, patchOptions } = useModal({
        component: DialogEditExercise,
        attrs: {
            bodyPart: '',
            name: '',
            onConfirm(_data: ExerciseData) {
                close()
            },
            onCancel() {
                close()
            },
        },
    })

    function openDialog(initial: ExerciseData, onConfirmed: (data: ExerciseData) => void) {
        patchOptions({
            attrs: {
                bodyPart: initial.bodyPart,
                name: initial.name,
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
