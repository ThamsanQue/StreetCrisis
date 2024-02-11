"use client";
import useCart from "@/hooks/use-cart";

export const DELIVERY_FEE = 100;
export const useTotalPrice = () => {
  const items = useCart((state) => state.items);
  if (items.length === 0) {
    return 0;
  }
  const totalPriceWithoutDelivery = items.reduce((total, item) => {
    return total + Number(item.price);
  }, 0);
  const totalPriceWithDelivery = totalPriceWithoutDelivery + DELIVERY_FEE;
  return totalPriceWithDelivery;
};
