<script setup lang="ts">
    import { computed, ref } from 'vue'

    import bgHome from '@/assets/img/bg_home.jpg'
    import bgNormal from '@/assets/img/bg_normal.png'
    import ExerciseGroup from '@/components/exercises/ExerciseGroup.vue'
    import ExerciseList from '@/components/exercises/ExerciseList.vue'
    import { useAddExerciseDialog } from '@/composables/useAddExerciseDialog'
    import { useDeleteConfirmDialog } from '@/composables/useDeleteConfirmDialog'
    import { useEditExerciseDialog } from '@/composables/useEditExerciseDialog'
    import { useManageBodyPartsDialog } from '@/composables/useManageBodyPartsDialog'
    import { useMenuDialog } from '@/composables/useMenuDialog'

    type Exercise = { id: number; bodyPart: string; name: string }

    const { open: openMenu } = useMenuDialog()
    const { open: openAdd } = useAddExerciseDialog()
    const { open: openEdit } = useEditExerciseDialog()
    const { open: openDeleteConfirm } = useDeleteConfirmDialog()
    const { open: openManageBodyParts } = useManageBodyPartsDialog()

    const bodyParts = ref(['胸', '肩', '腿', '核心'])
    const selectedFilter = ref('全部')

    const exercises = ref<Exercise[]>([
        { id: 1, bodyPart: '胸', name: '槓鈴臥推' },
        { id: 2, bodyPart: '肩', name: '啞鈴肩推' },
        { id: 3, bodyPart: '腿', name: '機械推（隨意儘量固定）' },
        { id: 4, bodyPart: '肩', name: '機械肩推' },
        { id: 5, bodyPart: '核心', name: '滑輪過頭三頭' },
        { id: 6, bodyPart: '核心', name: '三頭下壓' },
    ])

    const filteredExercises = computed(() => {
        const list = exercises.value.map((ex, i) => ({ ...ex, originalIndex: i }))
        if (selectedFilter.value === '全部') return list
        return list.filter(ex => ex.bodyPart === selectedFilter.value)
    })

    function handleAdd() {
        openAdd(data => {
            exercises.value.push({ id: Date.now(), ...data })
        })
    }

    function handleEdit(index: number) {
        const ex = exercises.value[index]
        if (!ex) return
        openEdit({ bodyPart: ex.bodyPart, name: ex.name }, data => {
            exercises.value[index] = { id: ex.id, ...data }
        })
    }

    function handleDelete(index: number) {
        openDeleteConfirm(() => {
            exercises.value.splice(index, 1)
        })
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
            <CommonButton variant="solid" class="flex-1" @click="openManageBodyParts">
                新增部位
            </CommonButton>
            <CommonButton variant="solid" class="flex-1" @click="handleAdd">
                新增動作
            </CommonButton>
        </div>

        <div class="mt-5">
            <div class="text-sm text-gray-150 mb-3">目前動作</div>
            <ExerciseGroup v-model="selectedFilter" :body-parts="bodyParts" class="mb-3" />
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
