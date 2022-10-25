import { z } from 'zod';
import { publicProcedure, router } from '../trpc';
import { prisma } from '../../utils/prisma';

//Endpoints are written here.
//Input validates input (use Zod) and query uses input's return and sends the data you want to send
// Check input in query to see how tRPC passes types by inference
export const appRouter = router({
  getCharacters: publicProcedure.query(async () => {
    const numberOfCharacters = await prisma.character.count();

    if (numberOfCharacters < 2) return;

    const id1 = Math.floor(Math.random() * numberOfCharacters) + 1;
    let id2 = Math.floor(Math.random() * numberOfCharacters) + 1;
    while (id2 === id1) {
      id2 = Math.floor(Math.random() * numberOfCharacters) + 1;
    }

    const char1 = await prisma.character.findFirst({ where: { id: id1 } });
    const char2 = await prisma.character.findFirst({ where: { id: id2 } });

    return {
      char1,
      char2
    };
  }),
  createCharacter: publicProcedure
    .input(
      z.object({
        name: z.string()
      })
    )
    .mutation(async ({ input }) => {
      const character = await prisma.character.create({ data: { name: input.name } });
      return { success: true, character: character };
    }),
  castVote: publicProcedure.input(z.object({})).mutation(async ({ input }) => {})
});

// export type definition of API
export type AppRouter = typeof appRouter;
