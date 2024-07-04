import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import eslintPlugin from 'vite-plugin-eslint';

// https://vitejs.dev/config/
export default defineConfig((mode) => ({
  plugins: [
    react(),
    eslintPlugin({
      lintOnStart: true,
      failOnError: mode === 'production',
    }),
  ],
  server: {
    open: true,
    proxy: {
      '/api': 'http://127.0.0.1:8000',
    },
  },
}));
