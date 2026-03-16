import type { Ref } from 'vue'
import { useModal } from 'vue-final-modal'

import DialogAddBodyPart from '@/components/dialogs/DialogAddBodyPart.vue'

import type { BodyPart } from './useBodyParts'

interface UseDialogAddBodyPartParams {
    bodyParts: Ref<BodyPart[]>
    addBodyPart: (name: string) => Promise<void>
}

export function useDialogAddBodyPart({ bodyParts, addBodyPart }: UseDialogAddBodyPartParams) {
    const { open, close, patchOptions } = useModal({
        component: DialogAddBodyPart,
        attrs: {
            existingNames: [],
            onConfirm(_name: string) {
                close()
            },
            onCancel() {
                close()
            },
        },
    })

    function openAddBodyPartDialog() {
        patchOptions({
            attrs: {
                existingNames: bodyParts.value.map(bp => bp.name),
                async onConfirm(name: string) {
                    await addBodyPart(name)
                    close()
                },
                onCancel() {
                    close()
                },
            },
        })
        open()
    }

    return { openAddBodyPartDialog }
}
