/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-nocheck
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  publicDir: 'src/assets',
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './setup.js',
  },
});
