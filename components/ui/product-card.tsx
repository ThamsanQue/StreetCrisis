"use client";
import Image from "next/image";

import { Product } from "@/types";
import IconButton from "./icon-button";
import { Expand, Link, ShoppingCart } from "lucide-react";
import Currency from "./currency";
import { MouseEventHandler } from "react";
import usePreviewModal from "@/hooks/use-preview";
import useCart from "@/hooks/use-cart";

interface ProductCard {
  product: Product;
}

const ProductCard: React.FC<ProductCard> = ({ product }) => {
  const cart = useCart();
  const previewModal = usePreviewModal();

  const onPreview: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();

    previewModal.onOpen(product);
  };

  const onAddToCart: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();

    cart.addItem(product);
  };

  return (
    <Link href={`/home/product/${product?.id}`}>
      <div className="bg-white group cursor-pointer rounded-xl border p-3 space-y-4 shadow-lg">
        <div className="aspect-square rounded-xl bg-gray-100 relative">
          <Image
            className="aspect-square object-scale-down rounded-md"
            src={product?.image?.[0]?.url}
            alt="Product Image"
            fill
          />
          <div className="opacity-0 group-hover:opacity-100 transition absolute w-full px-6 bottom-5">
            <div className="flex gap-x-6 justify-center">
              <IconButton
                onClick={onPreview}
                icon={<Expand size={20} className="text-gray-600" />}
              />
              <IconButton
                onClick={onAddToCart}
                icon={<ShoppingCart size={20} className="text-gray-600" />}
              />
            </div>
          </div>
        </div>
        <div>
          <p className="font-semibold text-lg">{product.name}</p>
          <p className="text-sm text-gray-500">{product.collection?.name}</p>
          <div className="flex  items-center justify-between">
            <Currency value={product?.price} />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
