import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: HomeView },
        { path: '/exercises', component: () => import('@/views/ExerciseView.vue') },
        { path: '/training', component: () => import('@/views/TrainingView.vue') },
        { path: '/schedule', component: () => import('@/views/ScheduleView.vue') },
    ],
})

export default router
