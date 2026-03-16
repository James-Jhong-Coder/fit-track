import { useModal } from 'vue-final-modal'

import DialogManageBodyParts from '@/components/dialogs/DialogManageBodyParts.vue'

export type BodyPartOption = { id: string; name: string }

export function useDialogManageBodyParts() {
    const { open, close, patchOptions } = useModal({
        component: DialogManageBodyParts,
        attrs: {
            bodyParts: [] as BodyPartOption[],
            onAdd(_name: string) {},
            onDelete(_id: string) {},
            onCancel() {
                close()
            },
        },
    })

    function openDialog(
        bodyParts: BodyPartOption[],
        onAdded: (name: string) => void,
        onDeleted: (id: string) => void,
    ) {
        patchOptions({
            attrs: {
                bodyParts,
                onAdd: onAdded,
                onDelete: onDeleted,
                onCancel() {
                    close()
                },
            },
        })
        open()
    }

    return { open: openDialog, close }
}
