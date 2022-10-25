## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

## How to Run Locally

- npm install it
- run your database
- change .env "DATABASE_URL" to yours
- npm run dev

## About

This is a web-app that allows users to vote, between two random characters, in who would win in a fight. Users can also submit characters and see statistics on the strongest and weakest characters.

The goal is for me to practice fullstack applications with one that doesn't require auth and has a simple UI.

## See it live

<!-- http://WixeI.github.io/focus-parkour -->

## Demonstration

![demonstration-gif](./demonstration.gif)

## New stuff I learned

- tRCP to abstract API layer between server and client and provide type-safety
- shortened paths with "@" by tsconfig
- Next.js with APIs
- Database communication and creation (using Postgre)
- Prisma as an ORM to utilize relational databases
- Tailwind setup in Next.js
-

## This project used:

- React Icons
- Tailwind Css
- Framer Motion
- Immer (and use-immer)
- Typescript
- Prettier and ESLint (ESLint Plugin Jest included)
- React Hook Form

## Folder Structure inside Global and Pages:

### Rules

- Folders must have category names or descriptive names
- Use index files for entry points of folders
- When next to index file, other files must have category names, otherwise they can be descriptive names
- Aggregator files gather contents to export as one

### Categories:

- components: holds React components
- constants: holds data that does not change
- contexts: holds React contexts
- hooks: holds React hooks
- resources: holds media files (images, vectors, videos, subtitles, music, sfx, 3d, rigs)
- styles: holds stylization files
- tests: holds test files
- types: holds type files
- utilities: holds pure functions
- animations: holds animation-related files
- services: holds request-related files
- translations: holds translation-related files

Ps: Group in folders based on functionality first, and then on categories inside these functionalities

## Reference Links

- https://nextjs.org/learn/basics/create-nextjs-app
- https://trpc.io/docs/v10/quickstart
- https://trpc.io/docs/v10/nextjs
