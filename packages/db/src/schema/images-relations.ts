import { relations } from 'drizzle-orm';
import { images } from './images';
import { products } from './products';
import { fullLooks } from './full-looks';

export const imagesRelations = relations(images, (helpers) => ({ product: helpers.one(products, { relationName: 'ImageToProduct', fields: [ images.productId ], references: [ products.id ] }), fullLook: helpers.one(fullLooks, { relationName: 'FullLookToImage', fields: [ images.fullLookId ], references: [ fullLooks.id ] }) }));