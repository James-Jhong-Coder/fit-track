import { useModal } from 'vue-final-modal'

import DialogAddExercise from '@/components/dialogs/DialogAddExercise.vue'

export type ExerciseData = { name: string; body_part_id: string }
export type BodyPartOption = { id: string; name: string }

export function useDialogAddExercise() {
    const { open, close, patchOptions } = useModal({
        component: DialogAddExercise,
        attrs: {
            bodyPartOptions: [] as BodyPartOption[],
            onConfirm(_data: ExerciseData) {
                close()
            },
            onCancel() {
                close()
            },
        },
    })

    function openDialog(bodyPartOptions: BodyPartOption[], onConfirmed: (data: ExerciseData) => void) {
        patchOptions({
            attrs: {
                bodyPartOptions,
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
