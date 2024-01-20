import { relations } from 'drizzle-orm';
import { sizes } from './sizes';
import { stores } from './stores';
import { products } from './products';
import { fullLooks } from './full-looks';

export const sizesRelations = relations(sizes, (helpers) => ({ store: helpers.one(stores, { relationName: 'StoreToSize', fields: [ sizes.storeId ], references: [ stores.id ] }), products: helpers.many(products, { relationName: 'ProductToSize' }), fullLook: helpers.many(fullLooks, { relationName: 'FullLookToSize' }) }));