import { vitestConfig } from '@fleek-platform/tester';
import { merge } from 'lodash';
import { defineConfig, UserConfig } from 'vitest/config';

export default defineConfig(
  merge(vitestConfig, {
    test: {
      setupFiles: ['vitest.setup.ts'],
      globalSetup: ['vitest.globalSetup.ts'],
      sequence: {
        shuffle: true,
        hooks: 'list',
      },
    },
    resolve: {
      // Because vitest cannot mock modules if they are called via `require()`
      mainFields: ['module'],
    },
  } satisfies UserConfig)
);
