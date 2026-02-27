<script setup lang="ts">
    import bgHome from '@/assets/img/bg_home.jpg'
    import imgHero from '@/assets/img/img_hero.png'
    import CommonCard from '@/components/common/CommonCard.vue'
    import { useDate } from '@/composables/useDate'
    import { useMenuDialog } from '@/composables/useMenuDialog'

    const { year, month, day } = useDate()
    const { open: openMenu } = useMenuDialog()
</script>

<template>
    <div class="home-page px-6" :style="{ backgroundImage: `url(${bgHome})` }">
        <div class="home-page-header">
            <span>開始你的訓練，不要偷懶 !</span>
            <SvgIcon
                name="icon_hamburger"
                class="w-6 h-6 text-white ml-auto cursor-pointer"
                @click="openMenu"
            />
        </div>

        <div class="hero-box">
            <div class="flex flex-col h-full ml-5">
                <div class="flex mt-4">
                    <div class="year-line"></div>
                    <div class="flex flex-col text-xl ml-1">
                        <span class="date-year">{{ year }}</span>
                        <span class="date-today mt-3">Today</span>
                    </div>
                </div>
                <div class="leading-none text-white mt-auto mb-5">
                    <div class="text-7xl font-bold">{{ month }}</div>
                    <div class="text-7xl font-bold">{{ day }}</div>
                </div>
            </div>
            <img :src="imgHero" class="ml-auto h-full object-contain" alt="hero" />
        </div>

        <div class="text-white text-base mt-6">上次訓練</div>
        <CommonCard class="mt-4">
            <div class="flex flex-col">
                <div class="flex items-center">
                    <span>訓練時間：</span>
                    <span>2024/11/27 (5天前)</span>
                </div>
                <div class="mt-2 flex items-center">
                    <span>訓練部位：</span>
                    <span>腿</span>
                </div>
            </div>
        </CommonCard>
        <CommonButton class="mt-4 w-full">開始訓練</CommonButton>
    </div>
</template>

<style scoped>
    @reference '#app.css';
    .home-page {
        @apply h-dvh w-full bg-cover bg-center bg-no-repeat;
    }

    .year-line {
        @apply self-stretch w-px shrink-0;
        @apply bg-white;
    }

    .date-year {
        @apply font-bold text-white;
        writing-mode: vertical-rl;
        letter-spacing: 0.1em;
    }

    .date-today {
        @apply text-white/60;
        writing-mode: vertical-rl;
    }

    .hero-box {
        @apply flex items-center;
        border: 2px solid;
        border-radius: 20px;
        border-image-source:
            linear-gradient(
                147.78deg,
                rgba(255, 255, 255, 0.8) -11.97%,
                rgba(255, 255, 255, 0.08) 94.18%
            ),
            linear-gradient(
                155.12deg,
                rgba(255, 255, 255, 0) 0.84%,
                rgba(255, 255, 255, 0.1) 96.62%
            );
        height: 25rem;
        box-shadow: -24.6px 24.6px 24.6px 0px #ffffff1a inset;
        box-shadow: 24.6px -24.6px 24.6px 0px #2049311a inset;
        backdrop-filter: blur(12px);
    }

    .home-page-header {
        @apply flex items-center;
        @apply text-white;
        @apply py-5;
    }

    .fade-enter-active,
    .fade-leave-active {
        transition: opacity 0.25s;
    }
    .fade-enter-from,
    .fade-leave-to {
        opacity: 0;
    }

    .slide-left-enter-active,
    .slide-left-leave-active {
        transition: all 0.25s ease;
    }
    .slide-left-enter-from,
    .slide-left-leave-to {
        opacity: 0;
        transform: translateX(-20px);
    }
</style>
