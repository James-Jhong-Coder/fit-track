import type { Ref } from 'vue'
import { useModal } from 'vue-final-modal'

import DialogEditTraining from '@/components/dialogs/DialogEditTraining.vue'

import type { TrainingPlan, TrainingPlanExercise, TrainingPlanPayload } from './useTrainingPlans'

type TrainingFormData = { name: string; exercises: TrainingPlanExercise[] }

interface UseDialogEditTrainingParams {
    exercises: Ref<TrainingPlanExercise[]>
    editTrainingPlan: (id: string, payload: TrainingPlanPayload) => Promise<void>
}

export function useDialogEditTraining({ exercises, editTrainingPlan }: UseDialogEditTrainingParams) {
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

    function openEditTrainingDialog(plan: TrainingPlan) {
        patchOptions({
            attrs: {
                exerciseOptions: exercises.value,
                initialName: plan.name,
                initialExercises: plan.exercises,
                async onConfirm(data: TrainingFormData) {
                    await editTrainingPlan(plan.id, {
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

    return { openEditTrainingDialog }
}
