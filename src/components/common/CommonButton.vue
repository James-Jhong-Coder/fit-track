<script setup lang="ts">
    import { computed } from 'vue'

    type ButtonVariant = 'solid' | 'outline'

    const props = defineProps<{
        variant?: ButtonVariant
        disabled?: boolean
    }>()

    const emits = defineEmits<{
        click: []
    }>()
    const computedVariant = computed<ButtonVariant>(() => {
        return props.variant ?? 'outline'
    })
</script>

<template>
    <button
        class="btn"
        :class="[`btn--${computedVariant}`]"
        :disabled="disabled"
        @click="emits('click')"
    >
        <slot />
    </button>
</template>

<style scoped>
    @reference '#app.css';

    .btn {
        @apply flex cursor-pointer items-center justify-center rounded-4xl font-semibold;
        @apply p-4;
        transition: all 0.2s;
    }

    /* variant */
    .btn--solid {
        @apply bg-[#2D5A3D] text-white;
        @apply hover:bg-[#245033] active:scale-95;
    }
    .btn--outline {
        border: 1px solid white;
        box-shadow:
            -24.6px 24.6px 24.6px 0px #ffffff1a inset,
            24.6px -24.6px 24.6px 0px #2049311a inset;
        backdrop-filter: blur(49.20000076293945px);
        @apply text-white;
        @apply hover:bg-white/10 active:scale-95;
    }
</style>
