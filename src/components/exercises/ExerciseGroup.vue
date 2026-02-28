<script setup lang="ts">
    import { computed } from 'vue'

    const props = defineProps<{
        bodyParts: string[]
    }>()

    const selectedFilter = defineModel<string>()

    const filterOptions = computed(() => [...props.bodyParts, '全部'])
</script>

<template>
    <div class="filter-bar">
        <div class="filter-pills">
            <button
                v-for="part in filterOptions"
                :key="part"
                class="filter-pill"
                :class="{ 'filter-pill--active': selectedFilter === part }"
                @click="selectedFilter = part"
            >
                {{ part }}
            </button>
        </div>
        <SvgIcon name="icon_filter_body_part" class="w-5 h-5 text-green-100 shrink-0" />
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
