<script setup lang="ts">
    defineProps<{
        name: string
    }>()
</script>

<template>
    <svg
        class="inline-block fill-current"
        width="1em"
        height="1em"
        aria-hidden="true"
    >
        <use :href="`#${name}`" />
    </svg>
</template>
