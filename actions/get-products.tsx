import { Product } from "@/types";
import qs from "query-string";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/products`;

interface Query {
  collectionId?: string;
  colorId?: string;
  sizeId?: string;
  isFeatured?: boolean;
  lookId?: string;
}
const getProducts = async (query: Query): Promise<Product[]> => {
  const url = qs.stringifyUrl({
    url: URL,
    query: {
      colorId: query.colorId,
      sizeId: query.sizeId,
      collectionId: query.collectionId,
      isFeatured: query.isFeatured,
      lookId: query.lookId,
    },
  });
  const res = await fetch(url);

  return res.json();
};

export default getProducts;
