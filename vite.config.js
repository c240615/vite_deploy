import 'dotenv/config'
import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import eslintPlugin from 'vite-plugin-eslint'
// import { sassPlugin } from 'vite-plugin-sass'

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/vite_deploy/' : '/',
  plugins: [
    vue(),
    eslintPlugin({
      include: ['src/**/*.js', 'src/**/*.vue', 'src/*.js', 'src/*.vue']
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
