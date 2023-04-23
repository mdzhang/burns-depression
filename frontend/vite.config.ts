import * as path from 'path'
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import viteTsconfigPaths from 'vite-tsconfig-paths';
import svgrPlugin from 'vite-plugin-svgr';
import { createStyleImportPlugin, AntdResolve } from "vite-plugin-style-import";

// Grab NODE_ENV and REACT_APP_* environment variables and prepare them to be
// injected into the application via define in vite config.
// https://vitejs.dev/config/shared-options.html#define
function processEnvDefines() {
  const defines = {
    // Useful for determining whether we’re running in production mode.
    // Most importantly, it switches React into the correct mode.
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV) || 'development',
  };

  const reactAppEnvVars = Object.entries(process.env).filter(([key]) => /^REACT_APP_/i.test(key));

  reactAppEnvVars.forEach(([key, value]) => {
    defines[`process.env.${key}`] = JSON.stringify(value);
  });

  return defines;
}

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
  define: {
    ...processEnvDefines(),
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
