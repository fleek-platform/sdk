![](public/images/repo/banner.png?202409201714)

# ⚡️Fleek Platform SDK

[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-blue.svg)](https://conventionalcommits.org)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

The Fleek Platform SDK provides an unified interface to help you quickly build applications that leverage our Fleek Services.

It's distributed as an ESM module for Web browsers, or CJS module for NodeJs Server applications. The server version provides a wider range of features, as some features are dependent of Native NodeJs modules.

To learn more about it read our documentation available [here](https://fleek.xyz/docs).

## Requirements

- Nodejs as runtime
- NPM, Yarn to install the SDK, or PNPM for development
- Familiarity with Nodejs, Frontend/Client side development

## Installation

Install the package by executing:

```sh
npm i -g @fleek-platform/sdk
```

⚠️ If you're planning to contribute as a developer, you must install [pnpm](https://pnpm.io), otherwise most commands will fail.

For a quick start, learn the [basic usage](#basic-usage), or alternatively visit our [documentation](https://fleek.xyz/docs/sdk)

## Development

For developers looking to contribute to the `@fleek-platform/SDK`, [clone](https://github.com/fleekxyz/sdk) the repository and follow the [contribution guide](#contributing).

Once cloned, you'll have to set up the local development environment, e.g. to have access to the source-code, iterate, run tests and much more.

For runtime we utilize [Nodejs](https://nodejs.org/en/download) and [PNPM](https://pnpm.io/installation) as the package manager.

Create a new file named .env in the root directory of your project. This file will store environment variables needed for local development.

```sh
touch .env.production
```

Open the .env.production file in a text editor and add the following:

```sh
SDK__AUTH_APPS_URL="https://auth-apps.service.fleek.xyz"
SDK__IPFS__STORAGE_API_URL="https://storage-ipfs.service.fleek.xyz"
SDK__GRAPHQL_API_URL="https://graphql.service.fleek.xyz/graphql"
SDK__UPLOAD_PROXY_API_URL="https://uploads.service.fleek.xyz"
```

💡 The variables above point to our production environment, the same you interact with as an end-user.

Next, install the project dependencies:

```sh
pnpm i
```

Next, prepare your local changes and execute the commands to compute it.

Everytime you prepare and save a change, you have to rebuild the binary:

```sh
pnpm build
```

Learn the Fleek-platform SDK basic usage [here](#basic-usage). For extended documentation visit our [documentation site](https://fleek.xyz/docs/sdk).

## Basic usage

The following provides a basic example of how to import the web browser or node SDK versions into your project and run a few simple commands.

For a complete description, read our documentation [here](https://fleek.xyz/docs/sdk).

### Browser

The browser version is meant for applications that should run in a web browser and do not require NodeJs native modules.

Start by importing the web version from our SDK.

```ts
import { FleekSdk } from '@fleek-platform/sdk/browser';
const sdk = new FleekSdk({
  personalAccessToken: '<PERSONAL_ACCESS_TOKEN>',
});
```

Alternatively, omit the `/browser` path, as it'll default to the web version due to retroactive support. Although, it's recommended to specify the desired target for clarity.

```ts
import { FleekSdk }from '@fleek-platform/sdk';
```

💡The `<PERSONAL_ACCESS_TOKEN>` can be obtained by utilizing the `@fleek-platform/cli`, learn more about it [here](https://fleek.xyz/docs/cli).

### NodeJs

For NodeJs projects import the distribution under the path `@fleek-platform/sdk/node`. This is a commonjs distribution (CJS), suitable for NodeJs environments. The Nodejs version has a wider feature support due to some features requiring features such as the file system, etc.

Use the following import statement:

```ts
import { FleekSdk } from '@fleek-platform/sdk/node';
```

If you don't specify the `/node` path, it'll import the client version (web), that has a narrower feature set.

Here's an example where we import the `FleekSdk`, the `PersonalAccessTokenService` and get the applications list.

```ts
import { FleekSdk, PersonalAccessTokenService } from '@fleek-platform/sdk/node';

const personalAccessToken = '<PERSONAL_ACCESS_TOKEN>';
const projectId = '<FLEEK_PROJECT_ID>';

const accessTokenService = new PersonalAccessTokenService({
    personalAccessToken,
    projectId,
});

const fleekSdk = new FleekSdk({
  accessTokenService,
});

(async () => {
  const res = await fleekSdk.applications().list();
  console.log(res);
})();
```
