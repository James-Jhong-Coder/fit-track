import { resolve } from 'path'

import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        tailwindcss(),
        vue(),
        Components({
            dirs: ['src/components/common'],
            dts: 'src/components.d.ts',
        }),
        createSvgIconsPlugin({
            iconDirs: [resolve(__dirname, 'src/assets/icons')],
            symbolId: '[name]',
        }),
    ],
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src'),
        },
    },
})
