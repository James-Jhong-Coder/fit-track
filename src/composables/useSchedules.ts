import { computed, onMounted, ref } from 'vue'

import { createSchedule, deleteSchedule, fetchSchedules } from '@/api/schedules'

export interface ScheduleItem {
    scheduleId: string
    date: string
    plan: {
        id: string
        name: string
        exercises: { id: string; name: string }[]
    }
}

export function useSchedules() {
    const scheduleItems = ref<ScheduleItem[]>([])

    // Record<date, planId[]> — for CustomDatePicker
    const scheduleRecord = computed(() => {
        const record: Record<string, string[]> = {}
        for (const item of scheduleItems.value) {
            ;(record[item.date] ??= []).push(item.plan.id)
        }
        return record
    })

    onMounted(async () => {
        const raw = await fetchSchedules()
        scheduleItems.value = raw.map(entry => ({
            scheduleId: entry.id,
            date: entry.date,
            plan: {
                id: entry.training_plans.id,
                name: entry.training_plans.name,
                exercises: entry.training_plans.training_plan_exercises.map(e => ({
                    id: e.exercises.id,
                    name: e.exercises.name,
                })),
            },
        }))
    })

    async function addSchedule(
        date: string,
        plan: { id: string; name: string; exercises: { id: string; name: string }[] },
    ) {
        const raw = await createSchedule({ date, training_plan_id: plan.id })
        scheduleItems.value.push({
            scheduleId: raw.id,
            date: raw.date,
            plan,
        })
    }

    async function removeSchedule(scheduleId: string) {
        await deleteSchedule(scheduleId)
        scheduleItems.value = scheduleItems.value.filter(
            item => item.scheduleId !== scheduleId,
        )
    }

    return { scheduleItems, scheduleRecord, addSchedule, removeSchedule }
}
