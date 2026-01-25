import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
    root: 'src', // ソースディレクトリを指定
    publicDir: '../public', // 静的ファイルが必要な場合
    build: {
        outDir: '../dist',
        emptyOutDir: true,
        rollupOptions: {
            input: {
                // HTMLをエントリポイントとするのがViteの標準
                main: resolve(__dirname, 'src/index.html')
            },
            output: {
                // JS, CSS, Asset の出力先を整理
                entryFileNames: 'js/[name].js',
                chunkFileNames: 'js/[name].js',
                assetFileNames: (assetInfo) => {
                    if (/\.(css)$/.test(assetInfo.name)) {
                        return 'css/[name].[ext]';
                    }
                    return 'images/[name].[ext]';
                }
            }
        },
        minify: 'terser' // Webpackの挙動に合わせる場合はTerser（デフォルトはesbuild）
    },
    server: {
        port: 3000,
        open: true
    }
});
