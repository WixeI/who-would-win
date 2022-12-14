## How to Run Locally

- npm install it
- run your database
- change .env "DATABASE_URL" to yours
- npm run dev

## External Sources

- Vercel (project hosting)
- Cloudinary (image hosting)
- Planet Scale (SQL database)

## About

This is a web-app that allows users to vote, between two random characters, in who would win in a fight. Users can also submit characters and see statistics on the strongest and weakest characters.

The goal is for me to practice fullstack applications with one that doesn't require auth and has a simple UI.

## See it live

https://who-would-win-puce.vercel.app/

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

## Commit Rules

- Categories: fix, feat, refac, config, docs
- Location of changes in parenthesis before ":" when possible
- "!" before ":" for breaking changes
  - If has it, must specify in body of commit what the Breaking Change is

## To-do

- Image Filter to filter NSFW images
- Filter to deny non-image files (client-side)
- Find a way to compress images to store
- Option to create rooms
  - Change how database is structure
  - Add custom paths to rooms
  - Main screen will be to create (create endpoint) or join a room

## Reference Links

- https://nextjs.org/learn/basics/create-nextjs-app
- https://trpc.io/docs/v10/quickstart
- https://trpc.io/docs/v10/nextjs
