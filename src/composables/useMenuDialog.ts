import { useModal } from 'vue-final-modal'

import DialogMenu from '@/components/dialogs/DialogMenu.vue'

export function useMenuDialog() {
    const { open, close } = useModal({
        component: DialogMenu,
        attrs: {
            onConfirm() {
                close()
            },
            onCancel() {
                close()
            },
        },
    })

    return { open, close }
}
