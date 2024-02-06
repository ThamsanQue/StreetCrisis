"use client";

import Container from "@/components/ui/container";
import NoResults from "@/components/ui/no-results";
import useCart from "@/hooks/use-cart";
import { FC, useEffect, useState } from "react";
import CartItem from "./components/cart-items";
import Summary from "./components/summary";
interface CartPageProps {}

const CartPage: FC<CartPageProps> = (props) => {
  const cart = useCart();

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="bg-[url('../Assets/monosc3.png')] bg-no-repeat bg-center bg-cover h-screen">
      <Container>
        <div className="px-4  py-16 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-black">Shopping Cart</h1>
          <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start gap-x-12">
            <div className="lg:col-span-7 ">
              {cart.items.length === 0 && (
                <p className="text-neutral-500">No Items added to cart</p>
              )}
              <ul>
                {cart.items.map((item) => (
                  <CartItem key={item.id} data={item} />
                ))}
              </ul>
            </div>
            <Summary />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CartPage;
