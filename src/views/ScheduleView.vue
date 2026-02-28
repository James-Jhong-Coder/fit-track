<script setup lang="ts">
    import DatePicker from 'primevue/datepicker'
    import { computed, ref } from 'vue'

    import bgNormal from '@/assets/img/bg_normal.png'
    import { useMenuDialog } from '@/composables/useMenuDialog'

    type ExerciseOption = { id: number; name: string }
    type WorkoutPlan = { id: number; name: string; exercises: ExerciseOption[] }

    const { open: openMenu } = useMenuDialog()

    const selectedDate = ref<Date>(new Date())

    // 課表列表（之後可串 store）
    const plans = ref<WorkoutPlan[]>([
        { id: 1, name: '課表1：槓鈴深蹲', exercises: [{ id: 3, name: '槓鈴深蹲' }] },
        { id: 2, name: '課表2：槓鈴Rdl', exercises: [{ id: 5, name: '槓鈴Rdl' }] },
        { id: 3, name: '課表3：哈克深蹲', exercises: [{ id: 4, name: '哈克深蹲' }] },
    ])

    // 日期 → 課表 id 的對應 (以 YYYY-MM-DD 為 key)
    const schedule = ref<Record<string, number>>({})

    function dateKey(date: Date) {
        return date.toISOString().slice(0, 10)
    }

    const assignedPlan = computed(() => {
        if (!selectedDate.value) return null
        const id = schedule.value[dateKey(selectedDate.value)]
        return plans.value.find(p => p.id === id) ?? null
    })

    const planNames = computed(() => plans.value.map(p => p.name))

    const selectedPlanName = computed({
        get() {
            return assignedPlan.value?.name ?? undefined
        },
        set(name: string | undefined) {
            if (!selectedDate.value) return
            const plan = plans.value.find(p => p.name === name)
            if (plan) {
                schedule.value[dateKey(selectedDate.value)] = plan.id
            }
        },
    })

    function clearSchedule() {
        if (!selectedDate.value) return
        delete schedule.value[dateKey(selectedDate.value)]
    }
</script>

<template>
    <div class="arrange-page" :style="{ backgroundImage: `url(${bgNormal})` }">
        <div class="arrange-header">
            <div class="flex flex-col">
                <span class="text-xs text-gray-150/60">Hello</span>
                <span class="text-lg font-bold text-gray-150">Welcome Back!</span>
            </div>
            <button @click="openMenu">
                <SvgIcon name="icon_hamburger" class="w-6 h-6 text-green-100" />
            </button>
        </div>

        <div class="arrange-content">
            <!-- 日期選擇器 -->
            <DatePicker
                v-model="selectedDate"
                inline
                :pt="{
                    root: { class: 'w-full! rounded-2xl! bg-white! shadow-sm! border-none!' },
                    title: { class: 'text-sm! font-semibold! text-gray-150!' },
                    dayLabel: { class: 'text-sm! text-gray-150!' },
                    today: { class: 'bg-green-100! text-white! rounded-full!' },
                    selected: { class: 'bg-green-100! text-white! rounded-full!' },
                }"
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

                <div v-if="assignedPlan" class="plan-card">
                    <div class="flex items-center justify-between mb-3">
                        <span class="text-sm font-semibold text-gray-150">
                            {{ assignedPlan.name }}
                        </span>
                        <button
                            class="text-xs text-gray-150/50 hover:text-gray-150 transition-colors"
                            @click="clearSchedule"
                        >
                            取消安排
                        </button>
                    </div>
                    <ul class="flex flex-col gap-2">
                        <li
                            v-for="ex in assignedPlan.exercises"
                            :key="ex.id"
                            class="exercise-row"
                        >
                            <span class="text-sm text-gray-150">動作：{{ ex.name }}</span>
                        </li>
                    </ul>
                </div>

                <div v-else class="empty-plan">
                    <span class="text-sm text-gray-150/50">本日尚未安排課表</span>
                </div>

                <!-- 選擇課表 -->
                <CommonSelect
                    v-model="selectedPlanName"
                    title="選擇課表"
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
        @apply flex items-center justify-between px-6 py-5;
    }

    .arrange-content {
        @apply px-6 pb-8;
    }

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
