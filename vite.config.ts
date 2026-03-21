import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  assetsInclude: ['**/*.png'],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './setup.js',
  },
});
