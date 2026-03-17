import type { Ref } from 'vue'
import { useModal } from 'vue-final-modal'

import DialogAddTraining from '@/components/dialogs/DialogAddTraining.vue'

import type { TrainingPlanExercise, TrainingPlanPayload } from './useTrainingPlans'

type TrainingFormData = { name: string; exercises: TrainingPlanExercise[] }

interface UseDialogAddTrainingParams {
    exercises: Ref<TrainingPlanExercise[]>
    addTrainingPlan: (payload: TrainingPlanPayload) => Promise<void>
}

export function useDialogAddTraining({ exercises, addTrainingPlan }: UseDialogAddTrainingParams) {
    const { open, close, patchOptions } = useModal({
        component: DialogAddTraining,
        attrs: {
            exerciseOptions: [],
            onConfirm() {
                close()
            },
            onCancel() {
                close()
            },
        },
    })

    function openAddTrainingDialog() {
        patchOptions({
            attrs: {
                exerciseOptions: exercises.value,
                async onConfirm(data: TrainingFormData) {
                    await addTrainingPlan({
                        name: data.name,
                        exercise_ids: data.exercises.map(ex => ex.id),
                    })
                    close()
                },
                onCancel() {
                    close()
                },
            },
        })
        open()
    }

    return { openAddTrainingDialog }
}
