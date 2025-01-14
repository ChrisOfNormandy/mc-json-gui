import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteConfigAliases } from '@chrisofnormandy/confetti/config';

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    base: '/mc-json-gui/',
    resolve: {
        alias: {
            ...viteConfigAliases()
        }
    },
    server: {
        port: 3000
    }
});
