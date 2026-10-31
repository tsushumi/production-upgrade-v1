import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    include: ['tests/**/*.test.js'],
    env: {
      NODE_ENV: 'test',
      JWT_SECRET: 'ci-test-secret',
      LOG_LEVEL: 'silent',
    },
    coverage: {
      provider: 'v8',
      include: ['lib/**', 'routes/**', 'middleware/**', 'app.js'],
    },
  },
});
