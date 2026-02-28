<script setup lang="ts">
    defineProps<{
        title: string
        placeholder?: string
    }>()

    const modelValue = defineModel<string>()
</script>

<template>
    <div class="input-field" :class="{ 'input-field--active': modelValue }">
        <span class="input-field__label">{{ title }}</span>
        <input
            v-model="modelValue"
            class="input-field__input"
            :placeholder="placeholder ?? '請輸入'"
        />
    </div>
</template>

<style scoped>
    @reference '#app.css';

    .input-field {
        @apply relative rounded-lg px-4 py-3 border-[1.5px] border-green-100;
        transition: border-color 0.2s;
    }

    .input-field--active {
        @apply border-green-100;
    }

    .input-field__label {
        @apply absolute text-xs text-gray-400;
        top: -9px;
        left: 12px;
        background: white;
        padding: 0 4px;
        transition: color 0.2s;
    }

    .input-field--active .input-field__label {
        @apply text-green-100;
    }

    .input-field__input {
        @apply block w-full text-sm text-gray-150 mt-1 outline-none bg-transparent;
    }
</style>
