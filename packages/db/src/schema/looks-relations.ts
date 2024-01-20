import { relations } from 'drizzle-orm';
import { looks } from './looks';
import { stores } from './stores';
import { collections } from './collections';
import { products } from './products';
import { fullLooks } from './full-looks';

export const looksRelations = relations(looks, (helpers) => ({ store: helpers.one(stores, { relationName: 'StoreToLook', fields: [ looks.storeId ], references: [ stores.id ] }), collection: helpers.one(collections, { relationName: 'CollectionToLook', fields: [ looks.collectionId ], references: [ collections.id ] }), products: helpers.many(products, { relationName: 'LookToProduct' }), fullLook: helpers.many(fullLooks, { relationName: 'FullLookToLook' }) }));