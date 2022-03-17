import { UserConfig, defineConfig } from 'vite';
import { resolve } from 'path';
import { viteCommonjs } from '@originjs/vite-plugin-commonjs';
import timeReporter from 'vite-plugin-time-reporter';

const production = process.env.NODE_ENV === 'production';

const configuration: UserConfig = {
    base: '/dist/',

    plugins: [
        viteCommonjs(),
        timeReporter(),
    ],

    build: {
        ssr: false,
        cssCodeSplit: true,
        minify: production ? 'terser' : false,
        outDir: resolve(__dirname, '../../public/dist'),
        target: 'esnext',
        emptyOutDir: true,
        manifest: true,
        sourcemap: true,
        watch: {
            include: './src/Libs/**'
        },
        rollupOptions: {
            input: ['./src/Libs/Cookiebox/index.ts'],
            output: {
                entryFileNames: 'cookiebox.[hash].js',
                chunkFileNames: 'cookiebox.[hash].js',
                assetFileNames: ({ name }) => {
                    if (name && name.endsWith('.css')) {
                        return 'css/[name].[hash].[ext]';
                    }

                    return 'media/[name].[hash].[ext]';
                },
            },
        },
    },

    // HMR server-port which is exposed by ddev-local in .ddev/docker-compose.hmr.yaml
    server: {
        port: 3000,

        // WSL2 support
        watch: {
            usePolling: true,
        },

        // Avoid browser caches CSS/JS files
        headers: {
            'Cache-Control': 'no-store'
        },
    },
};

export default defineConfig(configuration);
