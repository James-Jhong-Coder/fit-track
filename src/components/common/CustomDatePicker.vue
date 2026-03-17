<script setup lang="ts">
    import { computed, ref, watch } from 'vue'

    interface Plan {
        id: string
        name: string
    }

    interface Props {
        modelValue: Date
        plans?: Plan[]
        schedule?: Record<string, string[]>
    }

    const props = withDefaults(defineProps<Props>(), {
        plans: () => [],
        schedule: () => ({}),
    })

    const emit = defineEmits<{
        'update:modelValue': [date: Date]
    }>()

    const WEEKDAYS = ['日', '一', '二', '三', '四', '五', '六']
    const TAG_COLORS = ['tag--green', 'tag--orange', 'tag--blue', 'tag--purple']

    const cursor = ref(new Date(props.modelValue.getFullYear(), props.modelValue.getMonth(), 1))

    watch(
        () => props.modelValue,
        newValue => {
            cursor.value = new Date(newValue.getFullYear(), newValue.getMonth(), 1)
        },
    )

    function prevMonth() {
        cursor.value = new Date(cursor.value.getFullYear(), cursor.value.getMonth() - 1, 1)
    }
    function nextMonth() {
        cursor.value = new Date(cursor.value.getFullYear(), cursor.value.getMonth() + 1, 1)
    }

    interface DayCell {
        date: Date
        day: number
        currentMonth: boolean
        isToday: boolean
    }

    const today = new Date()

    const cells = computed<DayCell[]>(() => {
        const year = cursor.value.getFullYear()
        const month = cursor.value.getMonth()
        const firstDay = new Date(year, month, 1)
        const lastDay = new Date(year, month + 1, 0)
        const result: DayCell[] = []

        // 補前月空格
        for (let index = 0; index < firstDay.getDay(); index++) {
            const dayDate = new Date(year, month, index - firstDay.getDay() + 1)
            result.push({
                date: dayDate,
                day: dayDate.getDate(),
                currentMonth: false,
                isToday: false,
            })
        }

        // 本月
        for (let dayNumber = 1; dayNumber <= lastDay.getDate(); dayNumber++) {
            const date = new Date(year, month, dayNumber)
            result.push({
                date,
                day: dayNumber,
                currentMonth: true,
                isToday:
                    date.getFullYear() === today.getFullYear() &&
                    date.getMonth() === today.getMonth() &&
                    date.getDate() === today.getDate(),
            })
        }

        // 補後月空格（補滿最後一行）
        const tail = result.length % 7
        if (tail !== 0) {
            for (let index = 1; index <= 7 - tail; index++) {
                const dayDate = new Date(year, month + 1, index)
                result.push({
                    date: dayDate,
                    day: dayDate.getDate(),
                    currentMonth: false,
                    isToday: false,
                })
            }
        }

        return result
    })

    const weeks = computed(() => {
        const result: DayCell[][] = []
        for (let index = 0; index < cells.value.length; index += 7) {
            result.push(cells.value.slice(index, index + 7))
        }
        return result
    })

    function dateKey(date: Date) {
        const year = date.getFullYear()
        const month = String(date.getMonth() + 1).padStart(2, '0')
        const day = String(date.getDate()).padStart(2, '0')
        return `${year}-${month}-${day}`
    }

    function getPlansForDate(date: Date): Plan[] {
        const ids = props.schedule[dateKey(date)] ?? []
        return ids
            .map(planId => props.plans.find(plan => plan.id === planId))
            .filter(Boolean) as Plan[]
    }

    function isSelected(date: Date) {
        return (
            date.getFullYear() === props.modelValue.getFullYear() &&
            date.getMonth() === props.modelValue.getMonth() &&
            date.getDate() === props.modelValue.getDate()
        )
    }

    function selectDate(cell: DayCell) {
        emit('update:modelValue', cell.date)
        if (!cell.currentMonth) {
            cursor.value = new Date(cell.date.getFullYear(), cell.date.getMonth(), 1)
        }
    }

    const monthLabel = computed(() => {
        return `${cursor.value.getFullYear()} 年 ${cursor.value.getMonth() + 1} 月`
    })
</script>

<template>
    <div class="calender-box">
        <!-- 月份導覽 -->
        <div class="calender-navigator">
            <SvgIcon
                name="icon_calender_navigator_arrow_left"
                class="calender-navigator-icon"
                @click="prevMonth"
            />
            <div class="calender-navigator-center">
                <span class="calender-navigator-label">{{ monthLabel }}</span>
                <span class="calender-navigator-subtitle">Class Schedule</span>
            </div>
            <SvgIcon
                name="icon_calender_navigator_arrow_left"
                class="calender-navigator-icon rotate-180"
                @click="nextMonth"
            />
        </div>

        <!-- 星期標頭 -->
        <div class="calender-header">
            <div v-for="weekday in WEEKDAYS" :key="weekday" class="calender-header-cell">
                {{ weekday }}
            </div>
        </div>

        <!-- 日期格 -->
        <div class="calender-body">
            <div v-for="(week, wi) in weeks" :key="wi" class="calender-row">
                <div
                    v-for="cell in week"
                    :key="dateKey(cell.date)"
                    class="calender-cell"
                    :class="{ 'calender-cell--selected': isSelected(cell.date) }"
                    @click="selectDate(cell)"
                >
                    <span
                        class="calender-day-num"
                        :class="{
                            'calender-day-num--other': !cell.currentMonth,
                            'calender-day-num--today': cell.isToday,
                            'calender-day-num--selected': isSelected(cell.date),
                        }"
                    >
                        {{ cell.day }}
                    </span>

                    <template v-if="cell.currentMonth">
                        <span
                            v-for="(plan, pi) in getPlansForDate(cell.date)"
                            :key="plan.id"
                            class="calender-tag"
                            :class="TAG_COLORS[pi % TAG_COLORS.length]"
                        >
                            {{ plan.name }}
                        </span>
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
    @reference '#app.css';

    .calender-box {
        @apply bg-white rounded-2xl overflow-hidden leading-none;
        box-shadow: 0px 2px 4px 0px #00000026;
    }

    /* ── 月份導覽 ── */
    .calender-navigator {
        @apply flex items-center justify-between px-5 py-4;
    }

    .calender-navigator-center {
        @apply flex flex-col items-center gap-0.5;
    }

    .calender-navigator-label {
        @apply text-3xl font-bold text-gray-150;
    }

    .calender-navigator-subtitle {
        @apply text-sm text-gray-400;
    }

    .calender-navigator-icon {
        @apply w-3 h-3 text-gray-150 cursor-pointer;
    }

    /* ── 星期標頭 ── */
    .calender-header {
        @apply grid grid-cols-7 bg-green-100 rounded-xl mx-2 mb-1;
    }

    .calender-header-cell {
        @apply text-sm font-medium text-white text-center py-2.5;
    }

    /* ── 日期主體 ── */
    .calender-body {
        @apply flex flex-col px-2 pb-2;
    }

    .calender-row {
        @apply grid grid-cols-7 border-b border-gray-300 last:border-b-0;
    }

    .calender-cell {
        @apply flex flex-col items-start gap-1 px-1 py-2 min-h-14 cursor-pointer
               transition-colors;
    }

    .calender-cell--selected {
        @apply bg-gray-50;
    }

    /* ── 日期數字 ── */
    .calender-day-num {
        @apply text-sm font-medium text-gray-150 w-6 h-6 flex items-center justify-center
               rounded-full shrink-0 self-center;
    }

    .calender-day-num--other {
        @apply text-gray-400 font-normal;
    }

    .calender-day-num--today {
        @apply bg-black text-white font-semibold;
    }

    .calender-day-num--selected {
        @apply font-semibold;
    }

    /* ── 課表 Tag ── */
    .calender-tag {
        @apply text-[10px] rounded px-1.5 py-0.5 w-full text-center truncate text-white font-medium;
    }

    .tag--green {
        @apply bg-green-100;
    }

    .tag--orange {
        @apply bg-orange-400;
    }

    .tag--blue {
        @apply bg-blue-400;
    }

    .tag--purple {
        @apply bg-purple-400;
    }
</style>
