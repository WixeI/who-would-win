## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

## About

This is a web-app that...

The goal is to...

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

- https://...
