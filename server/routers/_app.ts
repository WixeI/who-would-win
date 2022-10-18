import { z } from 'zod';
import { publicProcedure, router } from '../trpc';

//Endpoints are written here.
//Input validates input (use Zod) and query uses input's return and sends the data you want to send
// Check input in query to see how tRPC passes types by inference
export const appRouter = router({
  obviously: publicProcedure
    .input(
      z.object({
        text: z.string().nullish()
      })
    )
    .query(({ input }) => {
      return {
        winnerMessage: `Obviously ${input?.text ?? 'world'}`
      };
    })
});

// export type definition of API
export type AppRouter = typeof appRouter;
