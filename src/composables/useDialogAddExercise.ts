import type { Ref } from 'vue'
import { useModal } from 'vue-final-modal'

import DialogAddExercise from '@/components/dialogs/DialogAddExercise.vue'

import type { BodyPart } from './useBodyParts'
import type { ExercisePayload } from './useExercises'

type ExerciseFormData = { name: string; body_part_id: string }

interface UseDialogAddExerciseParams {
    bodyParts: Ref<BodyPart[]>
    addExercise: (data: ExercisePayload) => Promise<void>
}

export function useDialogAddExercise({ bodyParts, addExercise }: UseDialogAddExerciseParams) {
    const { open, close, patchOptions } = useModal({
        component: DialogAddExercise,
    })

    function openAddExerciseDialog() {
        patchOptions({
            attrs: {
                bodyPartOptions: bodyParts.value,
                async onConfirm(data: ExerciseFormData) {
                    await addExercise(data)
                    close()
                },
                onCancel() {
                    close()
                },
            },
        })
        open()
    }

    return { openAddExerciseDialog }
}
