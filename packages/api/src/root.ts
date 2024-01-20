import { authRouter } from "./router/auth";
import { productsRouter } from "./router/products";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  auth: authRouter,
  products: productsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
