import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    base: 'https://github.com/Sayoko123f/password-get/',
    build: {
        outDir: 'docs',
    },
});
