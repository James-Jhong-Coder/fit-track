<script setup lang="ts">
    import { computed, ref } from 'vue'
    import { useRouter } from 'vue-router'

    import bgNormal from '@/assets/img/bg_normal.png'
    import { useMenuDialog } from '@/composables/useMenuDialog'

    interface SetRecord {
        reps: number
        weight: number
        rpe: number
        note: string
    }

    interface ExerciseSession {
        id: number
        name: string
        expanded: boolean
        activeSetIndex: number
        sets: SetRecord[]
        lastSets: SetRecord[]
    }

    const router = useRouter()
    const { open: openMenu } = useMenuDialog()

    const SESSION_SET_COUNT = 4

    const today = new Date()
    const dateLabel = today.toLocaleDateString('zh-TW', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
    })

    const bodyPart = '腿'

    function makeDefaultSet(reps = 4, weight = 80, rpe = 10): SetRecord {
        return { reps, weight, rpe, note: '' }
    }

    const exercises = ref<ExerciseSession[]>([
        {
            id: 1,
            name: '槓鈴深蹲',
            expanded: false,
            activeSetIndex: 0,
            sets: Array.from({ length: SESSION_SET_COUNT }, () => makeDefaultSet()),
            lastSets: Array.from({ length: SESSION_SET_COUNT }, () => makeDefaultSet()),
        },
        {
            id: 2,
            name: '槓鈴Rdl',
            expanded: false,
            activeSetIndex: 0,
            sets: Array.from({ length: SESSION_SET_COUNT }, () => makeDefaultSet(5, 70, 9)),
            lastSets: Array.from({ length: SESSION_SET_COUNT }, () => makeDefaultSet(5, 70, 9)),
        },
        {
            id: 3,
            name: '哈克深蹲',
            expanded: false,
            activeSetIndex: 0,
            sets: Array.from({ length: SESSION_SET_COUNT }, () => makeDefaultSet(8, 60, 8)),
            lastSets: Array.from({ length: SESSION_SET_COUNT }, () => makeDefaultSet(8, 60, 8)),
        },
        {
            id: 4,
            name: '腿勾',
            expanded: false,
            activeSetIndex: 0,
            sets: Array.from({ length: SESSION_SET_COUNT }, () => makeDefaultSet(10, 40, 8)),
            lastSets: Array.from({ length: SESSION_SET_COUNT }, () => makeDefaultSet(10, 40, 8)),
        },
    ])

    const totalSets = computed(() => exercises.value.length * SESSION_SET_COUNT)

    const REPS_OPTIONS = Array.from({ length: 20 }, (_, index) => index + 1)
    const RPE_OPTIONS = Array.from({ length: 10 }, (_, index) => index + 1)
    const WEIGHT_OPTIONS = Array.from({ length: 40 }, (_, index) => (index + 1) * 5)

    function toggleExercise(exercise: ExerciseSession) {
        exercise.expanded = !exercise.expanded
    }

    function setOrdinal(index: number): string {
        const labels = ['第一組', '第二組', '第三組', '第四組']
        return labels[index] ?? `第${index + 1}組`
    }

    function finishWorkout() {
        router.push('/')
    }
</script>

<template>
    <div class="session-page" :style="{ backgroundImage: `url(${bgNormal})` }">
        <!-- 標頭 -->
        <div class="session-header">
            <div class="flex flex-col">
                <span class="text-xs text-gray-400">{{ dateLabel }}</span>
                <span class="text-sm text-gray-150 font-medium">總組數：{{ totalSets }}</span>
            </div>
            <span class="text-xl text-green-100 absolute left-1/2 -translate-x-1/2">今日訓練</span>
            <button class="absolute right-6" @click="openMenu">
                <SvgIcon name="icon_hamburger" class="w-6 h-6 text-green-100" />
            </button>
        </div>

        <div class="session-content">
            <!-- 訓練部位 -->
            <div class="body-part-badge">訓練部位：{{ bodyPart }}</div>

            <!-- 動作列表 -->
            <ul class="flex flex-col gap-3 mt-4">
                <li
                    v-for="exercise in exercises"
                    :key="exercise.id"
                    class="exercise-card"
                >
                    <!-- 標題列 -->
                    <div
                        class="exercise-header"
                        @click="toggleExercise(exercise)"
                    >
                        <span class="text-sm font-medium text-gray-150">{{ exercise.name }}</span>
                        <SvgIcon
                            name="icon_filter_body_part"
                            class="w-4 h-4 text-gray-150 transition-transform"
                            :class="{ 'rotate-180': exercise.expanded }"
                        />
                    </div>

                    <!-- 展開內容 -->
                    <div v-if="exercise.expanded && exercise.sets[exercise.activeSetIndex]" class="exercise-body">
                        <!-- 組別按鈕 -->
                        <div class="set-tabs">
                            <button
                                v-for="(_, setIndex) in exercise.sets"
                                :key="setIndex"
                                class="set-tab"
                                :class="{ 'set-tab--active': exercise.activeSetIndex === setIndex }"
                                @click="exercise.activeSetIndex = setIndex"
                            >
                                {{ setOrdinal(setIndex) }}
                            </button>
                        </div>

                        <!-- 當前組別資料 -->
                        <div class="set-content">
                            <!-- 欄位標頭 -->
                            <div class="set-row set-row--header">
                                <span class="set-label"></span>
                                <span class="set-col-label">次數</span>
                                <span class="set-col-label">重量</span>
                                <span class="set-col-label">RPE</span>
                            </div>

                            <!-- 目前訓練 -->
                            <div class="set-row">
                                <span class="set-label">目前訓練</span>
                                <select
                                    v-model="exercise.sets[exercise.activeSetIndex].reps"
                                    class="set-select"
                                >
                                    <option v-for="rep in REPS_OPTIONS" :key="rep" :value="rep">{{ rep }}</option>
                                </select>
                                <select
                                    v-model="exercise.sets[exercise.activeSetIndex].weight"
                                    class="set-select"
                                >
                                    <option v-for="w in WEIGHT_OPTIONS" :key="w" :value="w">{{ w }} kg</option>
                                </select>
                                <select
                                    v-model="exercise.sets[exercise.activeSetIndex].rpe"
                                    class="set-select"
                                >
                                    <option v-for="rpe in RPE_OPTIONS" :key="rpe" :value="rpe">{{ rpe }}</option>
                                </select>
                            </div>

                            <!-- 上次訓練 -->
                            <div class="set-row set-row--last">
                                <span class="set-label">上次訓練</span>
                                <span class="set-value">{{ exercise.lastSets[exercise.activeSetIndex].reps }}</span>
                                <span class="set-value">{{ exercise.lastSets[exercise.activeSetIndex].weight }} kg</span>
                                <span class="set-value">{{ exercise.lastSets[exercise.activeSetIndex].rpe }}</span>
                            </div>

                            <!-- 備註 -->
                            <div class="note-row">
                                <div class="note-badge">備註</div>
                                <input
                                    v-model="exercise.sets[exercise.activeSetIndex].note"
                                    class="note-input"
                                    placeholder="新增備註..."
                                />
                            </div>
                        </div>
                    </div>
                </li>
            </ul>

            <!-- 完成訓練 -->
            <CommonButton variant="solid" class="w-full mt-6" @click="finishWorkout">
                完成訓練
            </CommonButton>
        </div>
    </div>
</template>

<style scoped>
    @reference '#app.css';

    .session-page {
        @apply h-dvh w-full bg-cover bg-center bg-no-repeat overflow-y-auto;
    }

    .session-header {
        @apply relative flex items-center px-6 py-5;
    }

    .session-content {
        @apply px-6 pb-10;
    }

    /* ── 訓練部位 ── */
    .body-part-badge {
        @apply w-full text-center text-white text-sm font-semibold py-4 rounded-2xl bg-green-200;
    }

    /* ── 動作卡片 ── */
    .exercise-card {
        @apply bg-white rounded-2xl overflow-hidden;
        box-shadow: 0px 2px 4px 0px #00000026;
    }

    .exercise-header {
        @apply flex items-center justify-between px-5 py-4 cursor-pointer;
    }

    .exercise-body {
        @apply px-5 pb-5;
    }

    /* ── 組別切換 ── */
    .set-tabs {
        @apply flex gap-2 mb-4;
    }

    .set-tab {
        @apply flex-1 text-xs py-2 rounded-xl text-gray-400 bg-gray-300 cursor-pointer transition-colors;
    }

    .set-tab--active {
        @apply bg-green-200 text-white font-semibold;
    }

    /* ── 訓練資料表格 ── */
    .set-content {
        @apply flex flex-col gap-3;
    }

    .set-row {
        @apply grid items-center gap-2;
        grid-template-columns: 4rem 1fr 1fr 1fr;
    }

    .set-row--header {
        @apply mb-0;
    }

    .set-row--last {
        @apply bg-gray-300/40 rounded-xl px-2 py-2;
    }

    .set-col-label {
        @apply text-xs text-gray-400 text-center;
    }

    .set-label {
        @apply text-xs text-gray-400;
    }

    .set-select {
        @apply text-sm text-gray-150 text-center bg-gray-300/50 rounded-xl py-2 px-1 cursor-pointer outline-none;
    }

    .set-value {
        @apply text-sm text-gray-400 text-center;
    }

    /* ── 備註 ── */
    .note-row {
        @apply flex items-center gap-3 mt-1;
    }

    .note-badge {
        @apply text-xs text-white bg-green-100 rounded-xl px-3 py-1.5 shrink-0;
    }

    .note-input {
        @apply flex-1 text-sm text-gray-150 bg-gray-300/40 rounded-xl px-3 py-1.5 outline-none;
    }
</style>
