import { createBuildOptions, initFreePortCarousel, prepareMockDatabase, serveOptions, prepareMockRedis } from '@fleek-platform/tester';
import * as esbuild from 'esbuild';

export default async () => {
  await initFreePortCarousel({ portRange: [3100, 3300] });
  await prepareMockDatabase();
  await prepareMockRedis();

  console.log('Starting local server...');

  const buildOptions = createBuildOptions({
    platform: 'browser',
    defined: {
      SDK__AUTH_APPS_URL: 'Not used',
      SDK__IPFS__STORAGE_API_URL: 'Inject value before related test',
      SDK__GRAPHQL_API_URL: 'Inject value before each test',
    },
    outdir: 'www',
  });

  const context = await esbuild.context(buildOptions);
  const { host, port } = await context.serve(serveOptions);

  console.info(`Started local server at ${host}:${port}`);

  return async () => {
    console.log('Stopping local server...');
    await context.dispose();
  };
};
