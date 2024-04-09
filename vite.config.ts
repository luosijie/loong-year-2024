import { defineConfig } from 'vite'
import * as path from 'path'

import glsl from 'vite-plugin-glsl'

export default defineConfig({
    base: './',
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