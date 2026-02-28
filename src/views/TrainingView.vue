<script setup lang="ts">
    import { computed, ref } from 'vue'

    import bgNormal from '@/assets/img/bg_normal.png'
    import { useAddTrainingDialog } from '@/composables/useAddTrainingDialog'
    import { useDeleteConfirmDialog } from '@/composables/useDeleteConfirmDialog'
    import { useEditTrainingDialog } from '@/composables/useEditTrainingDialog'
    import { useMenuDialog } from '@/composables/useMenuDialog'

    interface ExerciseOption {
        id: number
        name: string
    }
    interface WorkoutPlan {
        id: number
        name: string
        exercises: ExerciseOption[]
    }

    const { open: openMenu } = useMenuDialog()
    const { open: openDeleteConfirm } = useDeleteConfirmDialog()
    const { open: openAddTrainingDialog } = useAddTrainingDialog()
    const { open: openEditTrainingDialog } = useEditTrainingDialog()

    const searchQuery = ref('')

    const exerciseOptions = ref<ExerciseOption[]>([
        { id: 1, name: '槓鈴臥推' },
        { id: 2, name: '啞鈴肩推' },
        { id: 3, name: '槓鈴深蹲' },
        { id: 4, name: '哈克深蹲' },
        { id: 5, name: '槓鈴Rdl' },
        { id: 6, name: '三頭下壓' },
    ])

    const plans = ref<WorkoutPlan[]>([
        { id: 1, name: '課表1：槓鈴深蹲', exercises: [{ id: 3, name: '槓鈴深蹲' }] },
        { id: 2, name: '課表2：槓鈴Rdl', exercises: [{ id: 5, name: '槓鈴Rdl' }] },
        { id: 3, name: '課表3：哈克深蹲', exercises: [{ id: 4, name: '哈克深蹲' }] },
    ])

    const filteredPlans = computed(() => {
        if (!searchQuery.value) return plans.value
        return plans.value.filter(p =>
            p.name.toLowerCase().includes(searchQuery.value.toLowerCase()),
        )
    })

    function onClickAddNewTrainingHandler() {
        openAddTrainingDialog(exerciseOptions.value, data => {
            plans.value.push({ id: Date.now(), ...data })
        })
    }

    function handleEdit(plan: WorkoutPlan) {
        openEditTrainingDialog(
            exerciseOptions.value,
            { name: plan.name, exercises: plan.exercises },
            data => {
                const idx = plans.value.findIndex(p => p.id === plan.id)
                if (idx !== -1) plans.value[idx] = { id: plan.id, ...data }
            },
        )
    }

    function handleDelete(plan: WorkoutPlan) {
        openDeleteConfirm(() => {
            const idx = plans.value.findIndex(p => p.id === plan.id)
            if (idx !== -1) plans.value.splice(idx, 1)
        })
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
            <CommonButton variant="solid" class="w-full" @click="onClickAddNewTrainingHandler">
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
                            <button class="action-btn" @click="handleEdit(plan)">
                                <SvgIcon name="icon_edit" class="w-4 h-4 text-gray-150/60" />
                            </button>
                            <button class="delete-btn" @click="handleDelete(plan)">
                                <SvgIcon name="icon_minus" class="w-4 h-4 text-white" />
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
        @apply flex items-center justify-center w-7 h-7 rounded-full bg-green-100;
    }
</style>
