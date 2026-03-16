import { useModal } from 'vue-final-modal'

import DialogDeleteConfirm from '@/components/dialogs/DialogDeleteConfirm.vue'

export function useDialogDeleteConfirm() {
    const { open, close, patchOptions } = useModal({
        component: DialogDeleteConfirm,
        attrs: {
            onConfirm() {
                close()
            },
            onCancel() {
                close()
            },
        },
    })

    function openConfirm(onConfirmed: () => void, message?: string) {
        patchOptions({
            attrs: {
                message,
                onConfirm() {
                    onConfirmed()
                    close()
                },
                onCancel() {
                    close()
                },
            },
        })
        open()
    }

    return { open: openConfirm, close }
}
