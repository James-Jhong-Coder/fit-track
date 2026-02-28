<script setup lang="ts">
    import Select from 'primevue/select'

    defineProps<{
        title: string
        options: string[]
        placeholder?: string
    }>()

    const modelValue = defineModel<string | undefined>()
</script>

<template>
    <div class="select-field" :class="{ 'select-field--active': modelValue }">
        <span class="select-field__label">{{ title }}</span>
        <Select
            v-model="modelValue"
            :options="options"
            :placeholder="placeholder ?? '請輸入'"
            :pt="{
                root: { class: 'w-full mt-1 border-none! shadow-none! bg-transparent! p-0!' },
                label: { class: 'text-sm! text-gray-150! p-0' },
                dropdown: { class: 'text-gray-400 w-auto' },
                overlay: {
                    class: 'bg-white! border! border-green-100! rounded-lg! shadow-lg! mt-4!',
                },
                option: { class: 'text-sm! text-gray-150!' },
            }"
        />
    </div>
</template>

<style scoped>
    @reference '#app.css';

    .select-field {
        @apply relative cursor-pointer rounded-lg border border-green-100;
        @apply h-12.5;
        transition: border-color 0.2s;
    }

    .select-field--active {
        @apply border-green-100;
    }

    .select-field__label {
        @apply absolute text-xs text-gray-400;
        top: -9px;
        left: 12px;
        background: white;
        padding: 0 4px;
        transition: color 0.2s;
    }

    .select-field--active .select-field__label {
        @apply text-green-100;
    }
</style>
