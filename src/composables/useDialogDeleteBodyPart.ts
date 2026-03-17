import type { Ref } from 'vue'
import { useModal } from 'vue-final-modal'

import DialogDeleteBodyPart from '@/components/dialogs/DialogDeleteBodyPart.vue'

import type { BodyPart } from './useBodyParts'

interface UseDialogDeleteBodyPartParams {
    bodyParts: Ref<BodyPart[]>
    removeBodyPart: (id: string) => Promise<void>
    onAfterDelete?: () => Promise<void>
}

export function useDialogDeleteBodyPart({
    bodyParts,
    removeBodyPart,
    onAfterDelete,
}: UseDialogDeleteBodyPartParams) {
    const { open, close, patchOptions } = useModal({
        component: DialogDeleteBodyPart,
        attrs: {
            bodyParts: [],
            onDelete(_id: string) {},
            onCancel() {
                close()
            },
        },
    })

    function openDeleteBodyPartDialog() {
        patchOptions({
            attrs: {
                bodyParts: bodyParts.value,
                async onDelete(id: string) {
                    await removeBodyPart(id)
                    await onAfterDelete?.()
                    close()
                },
                onCancel() {
                    close()
                },
            },
        })
        open()
    }

    return { openDeleteBodyPartDialog }
}
