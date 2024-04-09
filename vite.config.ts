import { defineConfig, loadEnv } from 'vite'
import * as path from 'path'

import glsl from 'vite-plugin-glsl'

// console.log('----', import.meta.env.VITE_SUB_DOMAIN)

export default defineConfig(({ mode }) => {
    const root = process.cwd()
    const env = loadEnv(mode, root)

    return  {
        base:  env.VITE_SUB_DOMAIN || '/',
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
    }
})