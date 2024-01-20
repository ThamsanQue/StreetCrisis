import { relations } from 'drizzle-orm';
import { products } from './products';
import { stores } from './stores';
import { collections } from './collections';
import { sizes } from './sizes';
import { colors } from './colors';
import { looks } from './looks';
import { images } from './images';
import { orderItems } from './order-items';

export const productsRelations = relations(products, (helpers) => ({ store: helpers.one(stores, { relationName: 'StoreToProduct', fields: [ products.storeId ], references: [ stores.id ] }), collection: helpers.one(collections, { relationName: 'CollectionToProduct', fields: [ products.collectionId ], references: [ collections.id ] }), size: helpers.one(sizes, { relationName: 'ProductToSize', fields: [ products.sizeId ], references: [ sizes.id ] }), color: helpers.one(colors, { relationName: 'ColorToProduct', fields: [ products.colorId ], references: [ colors.id ] }), look: helpers.one(looks, { relationName: 'LookToProduct', fields: [ products.lookId ], references: [ looks.id ] }), image: helpers.many(images, { relationName: 'ImageToProduct' }), orderItems: helpers.many(orderItems, { relationName: 'OrderItemToProduct' }) }));