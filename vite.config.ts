import { defineConfig } from 'vite'
import * as path from 'path'

import glsl from 'vite-plugin-glsl'

console.log('----', process.env.NODE_ENV)

export default defineConfig({
    base:  process.env.NODE_ENV === 'production' ? '/loong-year-2024/' : '/',
    server: {
        port: 2024
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src')
        }
    },
    plugins: [
        glsl({ watch: true })
    ]
})