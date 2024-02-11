"use client";

import { Button } from "@/components/ui/button";
import useCart from "@/hooks/use-cart";
import { Product } from "@/types";
import { ShoppingCart } from "lucide-react";

export default function AddToCart({ product }: { product: Product }) {
  const cart = useCart();
  const onAddToCart = () => {
    cart.addItem(product);
  };

  return (
    <Button
      className="flex items-center gap-x-2 text-slate-900"
      onClick={onAddToCart}
    >
      Add To Cart
      <ShoppingCart size={20} />
    </Button>
  );
}
