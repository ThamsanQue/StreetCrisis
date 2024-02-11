import getBillboard from "@/actions/get-billboard";
import getProducts from "@/actions/get-products";
import Billboard from "@/components/billboard ";
import ProductList from "@/components/product-list";
import Container from "@/components/ui/container";

export const revalidate = 0;

const Home = async () => {
  const products = await getProducts({ isFeatured: true });
  const billboard = await getBillboard("f01fb976-b624-4133-a870-0c4fd5a79cab");
  return (
    <div className="bg-[url('../Assets/monosc3.png')] bg-no-repeat bg-center bg-cover ">
      <Container>
        <div className="space-y-10 pb-10 z-10">
          <Billboard data={billboard} />
          <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
            <ProductList title="Featured Pieces" items={products} />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Home;
