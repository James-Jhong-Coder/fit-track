import Aura from '@primevue/themes/aura'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import { createApp } from 'vue'
import { createVfm } from 'vue-final-modal'

import App from '@/App.vue'
import router from '@/router'

import 'virtual:svg-icons-register'
import 'vue-final-modal/style.css'
import '@/styles/all.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(createVfm())
app.use(PrimeVue, {
    theme: {
        preset: Aura,
    },
})
app.mount('#app')
