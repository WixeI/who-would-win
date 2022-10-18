import * as trpcNext from '@trpc/server/adapters/next';
import { appRouter } from '../../../server/routers/_app';

// export API handler
// You do not need to change anything in this file, it is boiler-plate for trcp to work with Next

// The final part of tRPC. Start to read from here and go by imports
// This is the bridge between tRPC and next's way of handling Apis trough the "api" folder
export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: () => ({})
});
