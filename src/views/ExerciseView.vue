<script setup lang="ts">
    import bgHome from '@/assets/img/bg_home.jpg'
    import bgNormal from '@/assets/img/bg_normal.png'
    import ExerciseGroup from '@/components/exercises/ExerciseGroup.vue'
    import ExerciseList from '@/components/exercises/ExerciseList.vue'
    import { useBodyParts } from '@/composables/useBodyParts'
    import { useDialogAddBodyPart } from '@/composables/useDialogAddBodyPart'
    import { useDialogAddExercise } from '@/composables/useDialogAddExercise'
    import { useDialogDeleteBodyPart } from '@/composables/useDialogDeleteBodyPart'
    import { useDialogDeleteConfirm } from '@/composables/useDialogDeleteConfirm'
    import { useDialogEditExercise } from '@/composables/useDialogEditExercise'
    import { useDialogMenu } from '@/composables/useDialogMenu'
    import { useExercises } from '@/composables/useExercises'

    const { open: openMenu } = useDialogMenu()

    const { bodyParts, addBodyPart, removeBodyPart } = useBodyParts()
    const { openAddBodyPartDialog } = useDialogAddBodyPart({ bodyParts, addBodyPart })
    const {
        exercises,
        selectedFilter,
        filteredExercises,
        addExercise,
        editExercise,
        removeExercise,
        refreshExercises,
    } = useExercises()

    const { openDeleteBodyPartDialog } = useDialogDeleteBodyPart({
        bodyParts,
        removeBodyPart,
        onAfterDelete: refreshExercises,
    })
    const { openAddExerciseDialog } = useDialogAddExercise({ bodyParts, addExercise })
    const { openEditExerciseDialog } = useDialogEditExercise({ bodyParts, editExercise })
    const { openDeleteConfirm } = useDialogDeleteConfirm()

    function handleEdit(id: string) {
        const exercise = exercises.value.find(ex => ex.id === id)
        if (exercise) openEditExerciseDialog(exercise)
    }

    function handleDelete(id: string) {
        openDeleteConfirm(() => removeExercise(id))
    }
</script>

<template>
    <div class="exercise-page px-6" :style="{ backgroundImage: `url(${bgNormal})` }">
        <div class="exercise-page-header">
            <span class="text-xl text-green-100">動作庫</span>
            <SvgIcon
                name="icon_hamburger"
                class="absolute right-0 w-6 h-6 text-green-100 cursor-pointer"
                @click="openMenu"
            />
        </div>

        <div class="exercise-hero" :style="{ backgroundImage: `url(${bgHome})` }">
            <div class="flex flex-col justify-end h-full pb-6 pl-6">
                <div class="text-4xl font-bold text-white">動作庫</div>
                <div class="text-sm text-white/70 mt-1">Action Library</div>
            </div>
        </div>

        <div class="flex gap-3 mt-4">
            <CommonButton variant="solid" class="flex-1" @click="openAddBodyPartDialog">
                新增部位
            </CommonButton>
            <CommonButton variant="solid" class="flex-1" @click="openAddExerciseDialog">
                新增動作
            </CommonButton>
        </div>

        <div class="mt-5">
            <div class="text-sm text-gray-150 mb-3">目前動作</div>
            <ExerciseGroup
                v-model="selectedFilter"
                :body-parts="bodyParts"
                class="mb-3"
                @on-open-delete-body-part-dialog="openDeleteBodyPartDialog"
            />
            <ExerciseList
                :exercises="filteredExercises"
                @edit="handleEdit"
                @delete="handleDelete"
            />
        </div>
    </div>
</template>

<style scoped>
    @reference '#app.css';

    .exercise-page {
        @apply h-dvh w-full bg-cover bg-center bg-no-repeat overflow-y-auto;
    }

    .exercise-page-header {
        @apply relative flex items-center justify-center;
        @apply py-5;
    }

    .exercise-hero {
        @apply rounded-2xl overflow-hidden bg-cover bg-center;
        height: 180px;
    }
</style>
