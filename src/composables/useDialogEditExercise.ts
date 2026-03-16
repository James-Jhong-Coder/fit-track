import { useModal } from 'vue-final-modal'

import DialogEditExercise from '@/components/dialogs/DialogEditExercise.vue'

export type ExerciseData = { name: string; body_part_id: string }
export type BodyPartOption = { id: string; name: string }

export function useDialogEditExercise() {
    const { open, close, patchOptions } = useModal({
        component: DialogEditExercise,
        attrs: {
            bodyPartOptions: [] as BodyPartOption[],
            body_part_id: '',
            name: '',
            onConfirm(_data: ExerciseData) {
                close()
            },
            onCancel() {
                close()
            },
        },
    })

    function openDialog(bodyPartOptions: BodyPartOption[], initial: ExerciseData, onConfirmed: (data: ExerciseData) => void) {
        patchOptions({
            attrs: {
                bodyPartOptions,
                body_part_id: initial.body_part_id,
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
