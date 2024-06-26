import { createTRPCRouter } from "@/server/api/trpc";

import { billboardRouter } from "./routers/billboard";
import { storeRouter } from "./routers/store";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  store: storeRouter,
  billboard: billboardRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
