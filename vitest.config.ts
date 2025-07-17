import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@/features': path.resolve(__dirname, './src/features'),
      '@/shared': path.resolve(__dirname, './src/shared'),
    },
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./setupTests.ts'],
    globals: true,
    include: [
      'tests/unit/**/*.{test,spec}.{ts,tsx}',
      'src/features/**/*.{test,spec}.{ts,tsx}',
      'src/shared/**/*.{test,spec}.{ts,tsx}'
    ],
    exclude: ['node_modules', 'dist', '.next', '.storybook'],
  },
});
