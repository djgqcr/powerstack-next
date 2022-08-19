# PowerStack NextJS Starter

NextJS application starter for rapid development of multi-chain applications.

⚡️ [PowerStack: a powerful fullstack development framework](https://powerstack.xyz).

_Disclaimer: This is a work in progress. Will be finalized soon._

Demo https://powerstack-next.vercel.app/

## Architecture

![](./_docs/mvvm-architecture.png)

## Features

- [ ] Web2 and Web3 authentication ( EVM, Solana, EOSIO, Web3Auth ).
- [ ] Wallet integration: sign messages and transactions.
- [ ] Upload to Arweave using Blundr.
- [ ] Upload to IPFS using Pinata.
- [ ] GraphQL client with support for multiple indexers.
- [ ] Portable vanillajs core logic store with Zustand.
- [ ] Utilities for decimal precision, math and trigonometry in js.
- [ ] Utilities library for common web2 and web3 tasks.
- [ ] Lighthouse CI web vitals performance reports.
- [ ] CSS-in-JS design system Stitches.
- [ ] Import design tokens from Toolabs Design Manager.
- [ ] Autogenerate TypeScript types from GraphQL schema.
- [ ] Crash reporting and web analytics.
- [ ] Base ui components with forms validation.
- [ ] Internationalization with i18next.
- [ ] TypeScript, ESLint, Prettier and Husky for code quality.

## Tech Stack

- NextJS https://nextjs.org
- Zustand store https://github.com/pmndrs/zustand
- Stitches styling https://stitches.dev
- Ethers https://docs.ethers.io/v5
- Solana Web3 https://solana-labs.github.io/solana-web3.js
- TweetNaCl.js https://github.com/dchest/tweetnacl-js
- Eosio Core https://github.com/greymass/eosio-core
- Decimal.js https://github.com/MikeMcl/decimal.js
- Iron Session https://github.com/vvo/iron-session
- Lodash tools https://lodash.com/docs
- Zod validator https://github.com/colinhacks/zod
- React-use hooks https://github.com/streamich/react-use
- Sentry reporting https://sentry.io/
- Next i18next https://github.com/i18next/next-i18next

## State Management

Core logic in presentation components is general problem in react, the solution is zustand, a portable agnostic store in vanillajs.
By putting all core logic on zustand store we prevent render logic hell (no complicated useEffect functions) and we remove duplication and reduce complexity.

In the current setup Zustand only runs on the browser, this is important to understand, if you need server side rendering you have to write a query in [getServerSideProps](https://nextjs.org/docs/basic-features/data-fetching/get-server-side-props), Currently we dont have synchronization server/client, you get an empty store on the server. dont use zustand inside `getServerSideProps`. We are explorating ways to sync them, right now we prefer to keep it simple.

### GraphQL Client

PowerStack leverages open source Hasura GraphQL engine in conjunction with GraphQL codegen to genere common typescript types generated from the graph schema. We love prisma and we use it on nodejs services, however for client applications we prefer to keep a single form of data fetching and prevent duplicated types for the data structures.

more https://github.com/blockmatic/powerstack-hasura

endpoint: https://powerstack-hasura-atgjsg75cq-uc.a.run.app/v1/graphql  
graphiql: https://graphiql-online.com

- https://hasura.io/docs/latest/graphql/core/databases/postgres/queries/index/
- https://hasura.io/docs/latest/graphql/core/databases/postgres/queries/query-filters/
- https://hasura.io/blog/postgres-json-and-jsonb-type-support-on-graphql-41f586e47536/

### File Structure

```
.
├── _docs.....................................# documentation files and media
├── _scripts..................................# utility devops scripts
├── app-config................................# environment variables and secrets
|   ├── app-arguments.ts..................... # application arguments
|   └── server-secrets.ts ................... # server side secrets
|
├── app-engine................................# portable vanillajs core logic ( app engine )
|   ├── graphql...............................# graphql module
|   |   ├── schema.graphql....................# client app schema ( app-engine )
|   |   ├── generated-sdk.ts..................# autogenerated ts types and graphql apis
|   |   ├── graphql-client.ts.................# multi-link multi-indexer graphql client
|   |   ├── codegen.yml.......................# codegen configuration
|   |   └── index.ts..........................# main module entry and api exports
|   |
|   ├── library...............................# collection of pure utlity functions and objects
|   |   ├── encoding.ts...................... # encoding functions
|   |   ├── eosio.ts......................... # eosio and anchor wallet uitls
|   |   ├── errors.ts........................ # app-engine error classes
|   |   ├── ethers.ts........................ # evm utils
|   |   ├── exec-env.ts...................... # execution environment variables
|   |   ├── fetch.ts......................... # window fetch wrapper
|   |   ├── logger.ts........................ # logger object
|   |   ├── solana.ts........................ # solana and phantom wallet utils
|   |   └── uiux.ts.......................... # utils for better ux
|   |
|   ├── services............................. # abstractions for external apis
|   |   ├── logger.ts........................ # configurable app logger
|   |   ├── sentry.ts........................ # crash reporting instance
|   |   └── cloudinary.ts.................... # image optimization and cdn
|   |
|   └── store................................ # portable vanillajs state machine
|       ├── engine-slice.ts.................. # app-engine state flags
|       ├── eosio-slice.ts................... # eosio and anchor wallet logic
|       ├── ethers-slice.ts.................. # evm and metamask wallet logic
|       ├── graphql-slice.ts................. # graphql frontend client instance
|       ├── network-slice.ts................. # multi-chain and network switching logic
|       ├── solana-slice.ts.................. # solana and phantom wallet logic
|       ├── user-slice.ts.................... # app user data and functions
|       ├── view-slice.ts.................... # app view / ui state
|       └── web3auth-slice.ts................ # web3auth and torus logic
|
├── app-server ...............................# server side logic
|
├── app-view .................................# presentation logic, jsx, animations
|   ├── components............................# reactjs components
|   |   ├── base..............................# default base/primitive components
|   |   ├── modules...........................# standalone modular components
|   |   ├── layout............................# structure focused components
|   |   └── icons
|   ├── pages.................................# standard nextjs page components
|   └── styles................................# stitches configuration
|       ├── themes............................# theme generated for Stitches to consume
|       ├── global.ts.........................# global styles
|       ├── index.ts..........................# export of stitches and global stylesstitches.config.ts
|       ├── stitches.config.ts................# stitches config
|       └── styles.context.ts.................# stitches app context
|
├── Dockerfile................................# docker container definition
└── Taskfile.yml..............................# utility tasks for docker based dev
```

## Getting Started

First, run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Commands

- `dev`: runs your application on `localhost:3000`
- `build`: creates the production build version
- `start`: starts a simple server with the build production code

## Docker

```
# Build the image
docker build -t powerstack-next:local .

# Start a container
docker run --name powerstack-next --env-file .env -p 3000:3303 -d powerstack-next:local

# Get container ID
docker ps -aqf "name=^powerstack-next$"

# Print app output
docker logs -f powerstack-next

# Stop, start, restart, kill
docker stop powerstack-next
docker start powerstack-next
docker restart powerstack-next
docker kill powerstack-next
```

## Contributing

We use a [Discussions Board](https://github.com/blockmatic/powerstack-docs/discussions/1) to gather thoughts, bug reports and feature requests from the community.

Follow the standard Github Flow for PRs. [Contributing Guidelines](https://docs.powerstack.xyz/powerstack/other-resources/contributing-guidelines).

## Blockmatic

Blockmatic is building a robust ecosystem of people and tools for the development of blockchain applications.

[blockmatic.io](https://blockmatic.io)

<!-- Please don't remove this: Grab your social icons from https://github.com/carlsednaoui/gitsocial -->

<!-- display the social media buttons in your README -->

[![Blockmatic Twitter][1.1]][1]
[![Blockmatic Facebook][2.1]][2]
[![Blockmatic Github][3.1]][3]

<!-- links to social media icons -->
<!-- no need to change these -->

<!-- icons with padding -->

[1.1]: http://i.imgur.com/tXSoThF.png 'twitter icon with padding'
[2.1]: http://i.imgur.com/P3YfQoD.png 'facebook icon with padding'
[3.1]: http://i.imgur.com/0o48UoR.png 'github icon with padding'

<!-- icons without padding -->

[1.2]: http://i.imgur.com/wWzX9uB.png 'twitter icon without padding'
[2.2]: http://i.imgur.com/fep1WsG.png 'facebook icon without padding'
[3.2]: http://i.imgur.com/9I6NRUm.png 'github icon without padding'

<!-- links to your social media accounts -->
<!-- update these accordingly -->

[1]: http://www.twitter.com/blockmatic_io
[2]: http://fb.me/blockmatic.io
[3]: http://www.github.com/blockmatic

<!-- Please don't remove this: Grab your social icons from https://github.com/carlsednaoui/gitsocial -->
