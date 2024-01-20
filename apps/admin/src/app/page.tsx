import { Suspense } from "react";

import { api } from "~/trpc/server";
import { AuthShowcase } from "./_components/auth-showcase";
import {
  CreateProductsForm,
  PostCardSkeleton,
  PostList,
} from "./_components/products";

export default async function HomePage() {
  // You can await this here if you don't want to show Suspense fallback below
  const products = await api.products.all();

  return (
    <main className="container h-screen py-16">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          Create <span className="text-primary">T3</span> Turbo
        </h1>
        <AuthShowcase />

        <CreateProductsForm />
        <div className="w-full max-w-2xl overflow-y-scroll">
          <Suspense
            fallback={
              <div className="flex w-full flex-col gap-4">
                <PostCardSkeleton />
                <PostCardSkeleton />
                <PostCardSkeleton />
              </div>
            }
          >
            <PostList products={products} />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
