![](public/images/repo/banner.png?202409201714)

# ⚡️Fleek Platform SDK

[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-blue.svg)](https://conventionalcommits.org)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

The Fleek Platform SDK provides an unified interface to help you quickly build applications that leverage our Fleek Services.

It's distributed as an ESM module for Web browsers, or CJS module for NodeJs Server applications. The server version provides a wider range of features, as some features are dependent of Native NodeJs modules.

To learn more about it read our documentation available [here](https://fleek.xyz/docs).

## Overview

* [🤖 Install](#install)
* [👷‍♀️Development](#development)
  - [Code format](#code-format)
  - [Changeset](#changeset)
* [📖 Docs](https://fleek.xyz/docs/sdk)
* [🙏 Contributing](#contributing)
  - [Branching strategy](#branching-strategy)
  - [Contributing](#conventional-commits)
* [⏱️ Changelog](./CHANGELOG.md)

## Requirements

- Nodejs as runtime
- NPM, Yarn to install the SDK, or PNPM for development
- Familiarity with Nodejs, Frontend/Client side development

## Install

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

### Code Format

Formatting and linting are facilitated by [BiomeJS](https://biomejs.dev). Configuration details can be found in:

```
biome.json
```

To format source code and apply changes directly in the file:

```sh
pnpm format
```

For checking source code formatting only:

```sh
pnpm format:check
```

To lint and apply changes directly in the file:

```sh
pnpm lint
```

For lint checks only:

```sh
pnpm lint:check
```

To both format and lint source code (with writes):

```sh
pnpm format:unsafe
```

### Changeset

Manage the versioning of changelog entries.

Declare an intent to release by executing the command and answering the wizard's questions:

```sh
pnpm changeset:add
```

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

## Contributing

This section guides you through the process of contributing to our open-source project. From creating a feature branch to submitting a pull request, get started by:

1. Fork the project [here](https://github.com/fleekxyz/cli)
2. Create your feature branch using our [branching strategy](#branching-strategy), e.g. `git checkout -b feat/my-new-feature`
3. Run the tests: `pnpm test`
4. Commit your changes by following our [commit conventions](#conventional-commits), e.g. `git commit -m 'chore: 🤖 my contribution description'`
5. Push to the branch, e.g. `git push origin feat/my-new-feature`
6. Create new Pull Request following the corresponding template guidelines

### Branching strategy

The develop branch serves as the main integration branch for features, enhancements, and fixes. It is always in a deployable state and represents the latest development version of the application.

Feature branches are created from the develop branch and are used to develop new features or enhancements. They should be named according to the type of work being done and the scope of the feature and in accordance with conventional commits [here](#conventional-commits).

### Conventional commits

We prefer to commit our work following [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0) conventions. Conventional Commits are a simple way to write commit messages that both people and computers can understand. It help us keep track fo changes in a consistent manner, making it easier to see what was added, changed, or fixed in each commit or update.

The commit messages are formatted as **[type]/[scope]**
The **type** is a short descriptor indicating the nature of the work (e.g., feat, fix, docs, style, refactor, test, chore). This follows the conventional commit types.

The **scope** is a more detailed description of the feature or fix. This could be the component or part of the codebase affected by the change.

Here's an example of different conventional commits messages that you should follow:

```txt
test: 💍 Adding missing tests
feat: 🎸 A new feature
fix: 🐛 A bug fix
chore: 🤖 Build process or auxiliary tool changes
docs: 📝 Documentation only changes
refactor: 💡 A code change that neither fixes a bug or adds a feature
style: 💄 Markup, white-space, formatting, missing semi-colons...
```
