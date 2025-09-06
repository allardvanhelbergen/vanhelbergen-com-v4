import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./tests/setup/test-env.ts'],
    coverage: {
      provider: 'v8',
      reports: ['text', 'lcov'],
      thresholds: { lines: 85 },
    },
  },
});
