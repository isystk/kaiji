import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
    base: './',
    root: 'src',
    publicDir: resolve(__dirname, 'public'),
    build: {
        outDir: resolve(__dirname, 'dist'),
        emptyOutDir: true,
        rollupOptions: {
            input: {
                // メインサイト用 (index.html から参照される)
                main: resolve(__dirname, 'src/index.html'),
                // ブックマークレット等で単体利用するスクリプト用
                kaiji: resolve(__dirname, 'src/ts/kaiji.ts'),
            },
            output: {
                // エントリポイントの名前に応じてファイル名を決定
                entryFileNames: (chunkInfo) => {
                    return chunkInfo.name === 'kaiji' ? 'kaiji.js' : 'index.js';
                },
                // チャンク（共通パーツ）が出る場合は js フォルダへ
                chunkFileNames: 'js/[name].js',
                // CSSや画像などのアセット
                assetFileNames: 'assets/[name].[ext]',
            },
        },
    },
});
