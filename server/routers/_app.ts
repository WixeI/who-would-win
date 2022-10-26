import { z } from 'zod';
import { publicProcedure, router } from '../trpc';
import { prisma } from '../../utils/prisma';

//Endpoints are written here.
//Input validates input (use Zod) and query uses input's return and sends the data you want to send
// Check input in query to see how tRPC passes types by inference
export const appRouter = router({
  getCharacters: publicProcedure.query(async () => {
    const numberOfCharacters = await prisma.character.count();

    if (numberOfCharacters < 2) return { success: false };

    const id1 = Math.floor(Math.random() * numberOfCharacters) + 1;
    let id2 = Math.floor(Math.random() * numberOfCharacters) + 1;
    while (id2 === id1) {
      id2 = Math.floor(Math.random() * numberOfCharacters) + 1;
    }

    const char1 = await prisma.character.findFirst({ where: { id: id1 } });
    const char2 = await prisma.character.findFirst({ where: { id: id2 } });

    return {
      success: true,
      char1,
      char2
    };
  }),
  createCharacter: publicProcedure
    .input(
      z.object({
        name: z.string().min(1, { message: 'Must be 1 or more characters long' })
      })
    )
    .mutation(async ({ input }) => {
      const character = await prisma.character.create({ data: { name: input.name } });
      return { success: true, character: character };
    }),
  castVote: publicProcedure
    .input(
      z.object({
        victoriousId: z.number(),
        loserId: z.number()
      })
    )
    .mutation(async ({ input }) => {
      const match = await prisma.match.create({ data: { ...input } });
      return { success: true, match: match };
    }),
  getResults: publicProcedure
    .input(
      z
        .object({
          char1Id: z.number(),
          char2Id: z.number()
        })
        .nullish()
    )
    .query(async ({ input }) => {
      if (!input) return null;
      const matches = await prisma.match.findMany({
        where: {
          OR: [
            { AND: [{ victoriousId: input.char1Id }, { loserId: input.char2Id }] },
            { AND: [{ victoriousId: input.char2Id }, { loserId: input.char1Id }] }
          ]
        }
      });
      const numberOfMatches = matches.length;

      const numberOfVictories = {
        char1: matches.filter((item) => item.victoriousId === input.char1Id).length,
        char2: matches.filter((item) => item.victoriousId === input.char2Id).length
      };
      const percentages = {
        char1: (numberOfVictories.char1 / numberOfMatches) * 100,
        char2: (numberOfVictories.char2 / numberOfMatches) * 100
      };

      return { numberOfMatches, numberOfVictories, percentages };
    }),
  getTop20: publicProcedure.query(async () => {
    const list = await prisma.character.findMany({
      take: 20,
      orderBy: [
        {
          victories: { _count: 'desc' }
        }
      ]
    });
    return list;
  }),
  getBottom20: publicProcedure.query(async () => {
    const list = await prisma.character.findMany({
      take: 20,
      orderBy: [
        {
          losses: { _count: 'desc' }
        }
      ]
    });
    return list;
  })
});

// export type definition of API
export type AppRouter = typeof appRouter;
