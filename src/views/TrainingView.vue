<script setup lang="ts">
    import { computed, ref } from 'vue'

    import bgNormal from '@/assets/img/bg_normal.png'
    import { useDialogAddTraining } from '@/composables/useDialogAddTraining'
    import { useDialogDeleteConfirm } from '@/composables/useDialogDeleteConfirm'
    import { useDialogEditTraining } from '@/composables/useDialogEditTraining'
    import { useDialogMenu } from '@/composables/useDialogMenu'
    import { useExercises } from '@/composables/useExercises'
    import { useTrainingPlans } from '@/composables/useTrainingPlans'

    import type { TrainingPlan } from '@/composables/useTrainingPlans'

    const { open: openMenu } = useDialogMenu()
    const { openDeleteConfirm } = useDialogDeleteConfirm()

    const { exercises } = useExercises()
    const { plans, addTrainingPlan, editTrainingPlan, removeTrainingPlan } = useTrainingPlans()

    const { openAddTrainingDialog } = useDialogAddTraining({ exercises, addTrainingPlan })
    const { openEditTrainingDialog } = useDialogEditTraining({ exercises, editTrainingPlan })

    const searchQuery = ref('')

    const filteredPlans = computed(() => {
        if (!searchQuery.value) return plans.value
        return plans.value.filter(p =>
            p.name.toLowerCase().includes(searchQuery.value.toLowerCase()),
        )
    })

    function onClickDeleteTrainingHandler(plan: TrainingPlan) {
        openDeleteConfirm(() => removeTrainingPlan(plan.id))
    }
</script>

<template>
    <div class="training-page" :style="{ backgroundImage: `url(${bgNormal})` }">
        <div class="training-header">
            <span class="text-xl text-green-100">管理課表內容</span>
            <button class="absolute right-6" @click="openMenu">
                <SvgIcon name="icon_hamburger" class="w-6 h-6 text-green-100" />
            </button>
        </div>

        <div class="training-content">
            <CommonButton variant="solid" class="w-full" @click="openAddTrainingDialog">
                新增課表
            </CommonButton>

            <div class="search-bar mt-4">
                <input v-model="searchQuery" class="search-input" placeholder="請輸入" />
                <button class="search-btn">
                    <SvgIcon name="icon_search" class="w-5 h-5 text-white" />
                </button>
            </div>

            <div class="mt-5">
                <div class="text-sm text-gray-150 mb-3">目前課表</div>
                <ul class="flex flex-col gap-2">
                    <li v-for="(plan, i) in filteredPlans" :key="plan.id" class="plan-item">
                        <span class="text-sm text-gray-150">{{ i + 1 }}. {{ plan.name }}</span>
                        <div class="flex items-center gap-2">
                            <button class="action-btn" @click="openEditTrainingDialog(plan)">
                                <SvgIcon name="icon_edit" class="w-5 h-5 text-gray-150/60" />
                            </button>
                            <button
                                class="delete-btn"
                                @click="onClickDeleteTrainingHandler(plan)"
                            >
                                <SvgIcon name="icon_minus" class="w-5 h-5" />
                            </button>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<style scoped>
    @reference '#app.css';

    .training-page {
        @apply h-dvh w-full bg-cover bg-center bg-no-repeat overflow-y-auto;
    }

    .training-header {
        @apply relative flex items-center justify-center px-6 py-5;
    }

    .training-content {
        @apply px-6 pb-8;
    }

    .search-bar {
        @apply flex items-center rounded-2xl bg-white overflow-hidden;
        border: 1px solid rgba(0, 0, 0, 0.06);
    }

    .search-input {
        @apply flex-1 px-4 py-3 text-sm text-gray-150 outline-none bg-transparent;
    }

    .search-btn {
        @apply flex items-center justify-center w-12 h-12 bg-green-100 shrink-0;
    }

    .plan-item {
        @apply flex items-center justify-between bg-white rounded-2xl px-4 py-4;
        box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
    }

    .action-btn {
        @apply flex items-center justify-center w-7 h-7;
    }

    .delete-btn {
        @apply flex items-center justify-center w-7 h-7 rounded-full text-red-700;
    }
</style>
