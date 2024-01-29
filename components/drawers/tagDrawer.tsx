"use client";
import useMediaQuery from "@/hooks/useMediaQuery";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "../ui/button";
import { ShoppingCart, Tag } from "lucide-react";
import { Product } from "@/types";
import Currency from "../ui/currency";
import useCart from "@/hooks/use-cart";

interface TagDrawerProps {
  product: Product;
}

const TagDrawer: React.FC<TagDrawerProps> = ({ product }) => {
  const cart = useCart();

  const onAddToCart = () => {
    cart.addItem(product);
  };
  const isDesktop = useMediaQuery("(min-width: 768px)");
  return (
    <>
      {!isDesktop && (
        <Drawer>
          <DrawerTrigger>
            <Button className="flex items-center gap-x-2">
              <Tag />
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>{product.look.name}</DrawerTitle>
              <DrawerDescription>{product?.description}</DrawerDescription>
            </DrawerHeader>

            <div className="flex flex-row gap-x-6 mt-2  text-center justify-center">
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
            <div className="mt-3 flex items-center justify-center ">
              <p className="text-2xl text-gray-900">
                <Currency value={product.price} />
              </p>
            </div>

            <DrawerFooter>
              <Button
                className="flex items-center gap-x-2"
                onClick={onAddToCart}
              >
                Add To Cart
                <ShoppingCart size={20} />
              </Button>
              <DrawerClose>
                <Button variant="outline" className="w-full">
                  Cancel
                </Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      )}
    </>
  );
};

export default TagDrawer;
