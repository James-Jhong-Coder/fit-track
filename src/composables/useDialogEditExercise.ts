import type { Ref } from 'vue'
import { useModal } from 'vue-final-modal'

import DialogEditExercise from '@/components/dialogs/DialogEditExercise.vue'

import type { BodyPart } from './useBodyParts'
import type { Exercise, ExercisePayload } from './useExercises'

type ExerciseFormData = { name: string; body_part_id: string }

interface UseDialogEditExerciseParams {
    bodyParts: Ref<BodyPart[]>
    editExercise: (id: string, data: ExercisePayload) => Promise<void>
}

export function useDialogEditExercise({ bodyParts, editExercise }: UseDialogEditExerciseParams) {
    const { open, close, patchOptions } = useModal({
        component: DialogEditExercise,
        attrs: {
            bodyPartOptions: [],
            body_part_id: '',
            name: '',
            onConfirm(_data: ExerciseFormData) {
                close()
            },
            onCancel() {
                close()
            },
        },
    })

    function openEditExerciseDialog(exercise: Exercise) {
        patchOptions({
            attrs: {
                bodyPartOptions: bodyParts.value,
                name: exercise.name,
                body_part_id: exercise.body_part_id ?? '',
                async onConfirm(data: ExerciseFormData) {
                    await editExercise(exercise.id, data)
                    close()
                },
                onCancel() {
                    close()
                },
            },
        })
        open()
    }

    return { openEditExerciseDialog }
}
