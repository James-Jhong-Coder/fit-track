import { useModal } from 'vue-final-modal'

import DialogManageBodyParts from '@/components/dialogs/DialogManageBodyParts.vue'

export function useManageBodyPartsDialog() {
    const { open, close } = useModal({
        component: DialogManageBodyParts,
        attrs: {
            onCancel() {
                close()
            },
        },
    })

    return { open, close }
}
