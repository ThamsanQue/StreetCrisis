"use client";

import type { RouterOutputs } from "@streetcrisis/api";
import { use } from "react";
import { cn } from "@streetcrisis/ui";
import { Button } from "@streetcrisis/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  useForm,
} from "@streetcrisis/ui/form";
import { Input } from "@streetcrisis/ui/input";
import { toast } from "@streetcrisis/ui/toast";
import { ProductSchema } from "@streetcrisis/validators";

import { api } from "~/trpc/react";

export function CreateProductsForm() {
  const form = useForm({
    schema: ProductSchema,
    defaultValues: {
      name: "",
      image: [],
      price: 0,
      categoryId: "",
      colorId: "",
      sizeId: "",
      isFeatured: false,
      isArchived: false,
    },
  });

  const utils = api.useUtils();
  const createProduct = api.products.create.useMutation({
    onSuccess: async () => {
      form.reset();
      await utils.products.invalidate();
    },
    onError: (err) => {
      toast.error(
        err?.data?.code === "UNAUTHORIZED"
          ? "You must be logged in to products"
          : "Failed to create products",
      );
    },
  });

  return (
    <Form {...form}>
      <form
        className="flex w-full max-w-2xl flex-col gap-4"
        onSubmit={form.handleSubmit(async (data) => {
          createProduct.mutate(data);
        })}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input {...field} placeholder="Name" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="categoryId"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input {...field} placeholder="Category" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button>Create</Button>
      </form>
    </Form>
  );
}

export function PostList(props: {
  products: Promise<RouterOutputs["products"]["all"]>;
}) {
  // TODO: Make `useSuspenseQuery` work without having to pass a promise from RSC
  const initialData = use(props.products);
  const { data: products } = api.products.all.useQuery(undefined, {
    initialData,
  });

  if (products.length === 0) {
    return (
      <div className="relative flex w-full flex-col gap-4">
        <PostCardSkeleton pulse={false} />
        <PostCardSkeleton pulse={false} />
        <PostCardSkeleton pulse={false} />

        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/10">
          <p className="text-2xl font-bold text-white">No products yet</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col gap-4">
      {products.map((p) => {
        return <PostCard key={p.id} products={p} />;
      })}
    </div>
  );
}

export function PostCard(props: {
  products: RouterOutputs["products"]["all"][number];
}) {
  const utils = api.useUtils();
  const deleteProduct = api.products.delete.useMutation({
    onSuccess: async () => {
      await utils.products.invalidate();
    },
    onError: (err) => {
      toast.error(
        err?.data?.code === "UNAUTHORIZED"
          ? "You must be logged in to delete a products"
          : "Failed to delete products",
      );
    },
  });

  return (
    <div className="flex flex-row rounded-lg bg-muted p-4">
      <div className="flex-grow">
        <h2 className="text-2xl font-bold text-primary">{props.products.title}</h2>
        <p className="mt-2 text-sm">{props.products.content}</p>
      </div>
      <div>
        <Button
          variant="ghost"
          className="cursor-pointer text-sm font-bold uppercase text-primary hover:bg-transparent hover:text-white"
          onClick={() => deleteProduct.mutate(props.products.id)}
        >
          Delete
        </Button>
      </div>
    </div>
  );
}

export function PostCardSkeleton(props: { pulse?: boolean }) {
  const { pulse = true } = props;
  return (
    <div className="flex flex-row rounded-lg bg-muted p-4">
      <div className="flex-grow">
        <h2
          className={cn(
            "w-1/4 rounded bg-primary text-2xl font-bold",
            pulse && "animate-pulse",
          )}
        >
          &nbsp;
        </h2>
        <p
          className={cn(
            "mt-2 w-1/3 rounded bg-current text-sm",
            pulse && "animate-pulse",
          )}
        >
          &nbsp;
        </p>
      </div>
    </div>
  );
}
