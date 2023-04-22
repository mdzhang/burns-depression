import * as path from 'path'
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteTsconfigPaths from 'vite-tsconfig-paths';
import svgrPlugin from 'vite-plugin-svgr';
import { createStyleImportPlugin, AntdResolve } from "vite-plugin-style-import";

// https://vitejs.dev/config/
export default defineConfig({
  root: '.',
  resolve: {
    alias: {
      '@burns-depression': path.resolve(__dirname, 'src'),
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
      },
    },
  },
  plugins: [
    react(),
    viteTsconfigPaths(),
    svgrPlugin(),
    createStyleImportPlugin({
      resolves: [
        AntdResolve(),
      ],
    }),
  ],
  base: './',
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
});
