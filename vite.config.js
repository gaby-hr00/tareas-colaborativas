// vite.config.js or vitest.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: "/tareas-colaborativas/",
  test: {
    globals: true,
    environment: 'jsdom', // ⬅️ This is crucial
    setupFiles: './src/setupTests.js', // ⬅️ This is crucial
  },
});