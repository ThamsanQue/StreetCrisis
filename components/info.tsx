"use client";

import { Product } from "@/types";
import Currency from "./ui/currency";
import useCart from "@/hooks/use-cart";
import AddToCart from "@/app/home/cart/components/add-to-cart";

interface InfoProps {
  product: Product;
}

const Info: React.FC<InfoProps> = ({ product }) => {
  return (
    <div className="">
      <h1 className="text-3xl font-bold text-gray-900">Look 1</h1>
      <div className="flex flex-row gap-x-6 mt-4">
        <div className="flex items-center gap-x-4">
          <h3 className="font-semibold text-black">Size:</h3>
          <div>{product?.size?.name}</div>
        </div>
        <div className="flex items-center gap-x-4">
          <h3 className="font-semibold text-black">Color:</h3>
          <div
            className="h-6 w-6 rounded-full border border-gray-600"
            style={{ backgroundColor: product?.color?.value }}
          />
        </div>
      </div>
      <hr className="my-4" />
      <div className="mt-3 flex items-end justify-between">
        <p className="text-2xl text-gray-900">
          <Currency value={product.price} />
        </p>
      </div>
      <div className="mt-10 flex items-center gap-x-3">
        <AddToCart product={product} />
      </div>
    </div>
  );
};

export default Info;
