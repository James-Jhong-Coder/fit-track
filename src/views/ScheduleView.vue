<script setup lang="ts">
    import { computed, ref } from 'vue'

    import bgNormal from '@/assets/img/bg_normal.png'
    import CustomDatePicker from '@/components/common/CustomDatePicker.vue'
    import { useDialogMenu } from '@/composables/useDialogMenu'
    import { useSchedules } from '@/composables/useSchedules'
    import { useTrainingPlans } from '@/composables/useTrainingPlans'

    const { open: openMenu } = useDialogMenu()

    const { plans } = useTrainingPlans()
    const { scheduleItems, scheduleRecord, addSchedule, removeSchedule } = useSchedules()

    const selectedDate = ref<Date>(new Date())

    function dateKey(date: Date) {
        const y = date.getFullYear()
        const m = String(date.getMonth() + 1).padStart(2, '0')
        const d = String(date.getDate()).padStart(2, '0')
        return `${y}-${m}-${d}`
    }

    const assignedItems = computed(() => {
        if (!selectedDate.value) return []
        const key = dateKey(selectedDate.value)
        return scheduleItems.value.filter(item => item.date === key)
    })

    const planNames = computed(() => plans.value.map(p => p.name))

    const selectedPlanName = computed({
        get() {
            return undefined
        },
        set(name: string | undefined) {
            if (!selectedDate.value || !name) return
            const plan = plans.value.find(p => p.name === name)
            if (!plan) return
            addSchedule(dateKey(selectedDate.value), plan)
        },
    })
</script>

<template>
    <div class="arrange-page" :style="{ backgroundImage: `url(${bgNormal})` }">
        <div class="arrange-header">
            <span class="text-xl text-green-100">安排訓練時間</span>
            <button class="absolute right-6" @click="openMenu">
                <SvgIcon name="icon_hamburger" class="w-6 h-6 text-green-100" />
            </button>
        </div>

        <div class="arrange-content">
            <CustomDatePicker
                v-model="selectedDate"
                :plans="plans"
                :schedule="scheduleRecord"
            />

            <!-- 當日課表 -->
            <div class="day-plan mt-5">
                <div class="text-sm text-gray-150 font-medium mb-3">
                    {{
                        selectedDate?.toLocaleDateString('zh-TW', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                        })
                    }}
                    的課表
                </div>

                <template v-if="assignedItems.length">
                    <div v-for="item in assignedItems" :key="item.scheduleId" class="plan-card">
                        <div class="flex items-center justify-between mb-3">
                            <span class="text-sm font-semibold text-gray-150">
                                {{ item.plan.name }}
                            </span>
                            <button
                                class="text-xs text-gray-150/50 hover:text-gray-150 transition-colors"
                                @click="removeSchedule(item.scheduleId)"
                            >
                                取消安排
                            </button>
                        </div>
                        <ul class="flex flex-col gap-2">
                            <li
                                v-for="ex in item.plan.exercises"
                                :key="ex.id"
                                class="exercise-row"
                            >
                                <span class="text-sm text-gray-150">動作：{{ ex.name }}</span>
                            </li>
                        </ul>
                    </div>
                </template>

                <div v-else class="empty-plan">
                    <span class="text-sm text-gray-150/50">本日尚未安排課表</span>
                </div>

                <CommonSelect
                    v-model="selectedPlanName"
                    title="新增課表"
                    :options="planNames"
                    class="mt-4"
                />
            </div>
        </div>
    </div>
</template>

<style scoped>
    @reference '#app.css';

    .arrange-page {
        @apply h-dvh w-full bg-cover bg-center bg-no-repeat overflow-y-auto;
    }

    .arrange-header {
        @apply relative flex items-center justify-center px-6 py-5;
    }

    .arrange-content {
        @apply px-6 pb-8;
    }

    /* ── day plan ── */
    .day-plan {
        @apply bg-white rounded-2xl px-5 py-4;
        box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
    }

    .plan-card {
        @apply mb-2;
    }

    .exercise-row {
        @apply flex items-center rounded-xl px-4 py-3 bg-gray-50;
    }

    .empty-plan {
        @apply flex items-center justify-center py-6;
    }
</style>
