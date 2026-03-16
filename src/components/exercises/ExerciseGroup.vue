<script setup lang="ts">
    const props = defineProps<{
        bodyParts: { id: string; name: string }[]
    }>()

    const selectedFilter = defineModel<string | null>()

    const emit = defineEmits<{
        onOpenDeleteBodyPartDialog: []
    }>()
</script>

<template>
    <div class="filter-bar">
        <div class="filter-pills">
            <button
                class="filter-pill"
                :class="{ 'filter-pill--active': selectedFilter === null }"
                @click="selectedFilter = null"
            >
                全部
            </button>
            <button
                v-for="part in bodyParts"
                :key="part.id"
                class="filter-pill"
                :class="{ 'filter-pill--active': selectedFilter === part.id }"
                @click="selectedFilter = part.id"
            >
                {{ part.name }}
            </button>
        </div>
        <SvgIcon
            name="icon_filter_body_part"
            class="w-5 h-5 text-green-100 shrink-0 cursor-pointer"
            @click="emit('onOpenDeleteBodyPartDialog')"
        />
    </div>
</template>

<style scoped>
    @reference '#app.css';

    .filter-bar {
        @apply flex items-center justify-between;
        @apply bg-white p-2;
        border-radius: 8px;
    }

    .filter-pills {
        @apply flex items-center gap-2 flex-wrap;
    }

    .filter-pill {
        @apply text-sm text-gray-150/70 bg-white px-3 py-1 rounded-full cursor-pointer select-none;
        @apply transition-colors;
    }

    .filter-pill--active {
        @apply bg-green-100 text-white font-medium;
    }
</style>
