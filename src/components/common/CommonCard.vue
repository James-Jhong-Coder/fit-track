<script setup lang="ts">
    defineProps<{
        padding?: string
    }>()
</script>

<template>
    <div class="common-card" :class="padding ?? 'px-5 py-4'">
        <slot />
    </div>
</template>

<style scoped>
    @reference '#app.css';

    .common-card {
        @apply rounded-2xl;
        @apply text-gray-150;
        box-shadow: -24.6px 24.6px 24.6px 0px #ffffff1a inset;
        box-shadow: 24.6px -55px 8.1px 0px #ffffff1a inset;
        backdrop-filter: blur(10px);
        border: 2px solid;
        border-image-source:
            linear-gradient(
                147.78deg,
                rgba(255, 255, 255, 0.8) -11.97%,
                rgba(255, 255, 255, 0.08) 94.18%
            ),
            linear-gradient(
                155.12deg,
                rgba(255, 255, 255, 0) 0.84%,
                rgba(255, 255, 255, 0.4) 96.62%
            );
        backdrop-filter: blur(8px);
        @apply bg-white/75;
    }
</style>
