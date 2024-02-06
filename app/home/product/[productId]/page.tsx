import getProduct from "@/actions/get-product";
import Gallery from "@/components/gallery";

// import Button from "@/components/ui/button2";
import Container from "@/components/ui/container";
import Currency from "@/components/ui/currency";
// import { ShoppingCart } from "lucide-react";

import TagDrawer from "@/components/drawers/tagDrawer";
import getProducts from "@/actions/get-products";
import ProductList from "@/components/product-list";
import AddToCart from "@/app/home/cart/components/add-to-cart";

interface ProductPageProps {
  params: {
    productId: string;
  };
}
export const revalidate = 0;

const ProductPage: React.FC<ProductPageProps> = async ({ params }) => {
  const product = await getProduct(params.productId);
  const suggestedProducts = await getProducts({
    lookId: product?.look?.id,
  });
  const filteredProducts = suggestedProducts.filter(
    (suggestedProduct) => suggestedProduct.id !== product.id
  );
  if (!product) {
    return null;
  }
  if (!suggestedProducts) {
    return null;
  }

  return (
    <div className="bg-[url('../Assets/monosc3.png')] bg-no-repeat bg-center bg-cover">
      <Container>
        <div className="px-4 py-10 sm:px-6 lg:px-8 ">
          <div className="lg:grid lg:grid-cols-3 lg:items-start lg:start lg:gap-x-8">
            <div className="flex flex-col justify-end h-full">
              <h1 className="text-3xl font-bold text-gray-900">
                {product.name}
              </h1>
            </div>
            <div className="mt-10 px-4 sm:mt-16  sm:px-0 lg:mt-0">
              <Gallery
                image={product?.image}
                className="object-scale-down h-full w-full"
              />
            </div>
            <div className="hidden lg:block">
              <div className="mt-10 flex flex-col items-center justify-between">
                <h1 className="text-3xl font-bold text-gray-900">Look 1</h1>
                <p className="text-center mt-4">{product?.description}</p>
                <div className="flex flex-row gap-x-6 mt-4 my-36">
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
                <div className="mt-3 flex items-end justify-between my-56">
                  <p className="text-2xl text-gray-900">
                    <Currency value={product.price} />
                  </p>
                </div>
                <div className="flex flex-col justify-end h-full">
                  <AddToCart product={product} />
                </div>
              </div>
            </div>
          </div>
          <hr className="my-10" />
          <div className="fixed right-0 top-1/2 transform -translate-y-1/2">
            <TagDrawer product={product} />
          </div>
          <ProductList title="Related Pieces" items={filteredProducts} />
        </div>
      </Container>
    </div>
  );
};

export default ProductPage;
