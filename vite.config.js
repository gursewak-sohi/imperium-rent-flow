import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// charter
// imperium-rent-flow/
// https://vitejs.dev/config/
export default defineConfig({
    base: '',
    plugins: [vue()],
})