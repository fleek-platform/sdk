import { vitestConfig } from '@fleek-platform/tester';
import { merge } from 'lodash';
import { defineConfig, UserConfig } from 'vitest/config';

export default defineConfig(
  merge(vitestConfig, {
    test: {
      setupFiles: ['vitest.setup.ts'],
    },
  } satisfies UserConfig)
);
