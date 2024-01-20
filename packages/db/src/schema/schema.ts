import * as auth from "./auth";
import * as billboards from "./billboards";
import * as billboardsRelations from "./billboards-relations";
import * as collections from "./collections";
import * as collectionsRelations from "./collections-relations";
import * as colors from "./colors";
import * as colorsRelations from "./colors-relations";
import * as fullLooks from "./full-looks";
import * as fullLooksRelations from "./full-looks-relations";
import * as images from "./images";
import * as imagesRelations from "./images-relations";
import * as looks from "./looks";
import * as looksRelations from "./looks-relations";
import * as orderItems from "./order-items";
import * as orderItemsRelations from "./order-items-relations";
import * as orders from "./orders";
import * as ordersRelations from "./orders-relations";
import * as products from "./products";
import * as productsRelations from "./products-relations";
import * as sizes from "./sizes";
import * as sizesRelations from "./sizes-relations";
import * as stores from "./stores";
import * as storesRelations from "./stores-relations";

export const schema = {
  ...auth,
  ...stores,
  ...billboards,
  ...collections,
  ...sizes,
  ...colors,
  ...products,
  ...fullLooks,
  ...looks,
  ...images,
  ...orders,
  ...orderItems,
  ...storesRelations,
  ...billboardsRelations,
  ...collectionsRelations,
  ...sizesRelations,
  ...colorsRelations,
  ...productsRelations,
  ...fullLooksRelations,
  ...looksRelations,
  ...imagesRelations,
  ...ordersRelations,
  ...orderItemsRelations,
};
