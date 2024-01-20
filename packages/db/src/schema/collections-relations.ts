import { relations } from 'drizzle-orm';
import { collections } from './collections';
import { stores } from './stores';
import { billboards } from './billboards';
import { looks } from './looks';
import { products } from './products';
import { fullLooks } from './full-looks';

export const collectionsRelations = relations(collections, (helpers) => ({ store: helpers.one(stores, { relationName: 'StoreToCollection', fields: [ collections.storeId ], references: [ stores.id ] }), billboard: helpers.one(billboards, { relationName: 'BillboardsToCollection', fields: [ collections.billboardId ], references: [ billboards.id ] }), looks: helpers.many(looks, { relationName: 'CollectionToLook' }), products: helpers.many(products, { relationName: 'CollectionToProduct' }), fullLooks: helpers.many(fullLooks, { relationName: 'CollectionToFullLook' }) }));