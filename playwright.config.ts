import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: { headless: true },
  retries: 1,
  reporter: [['list'], ['html', { open: 'never' }]],
});
