import { relations } from 'drizzle-orm';
import { colors } from './colors';
import { stores } from './stores';
import { products } from './products';
import { fullLooks } from './full-looks';

export const colorsRelations = relations(colors, (helpers) => ({ store: helpers.one(stores, { relationName: 'StoreToColor', fields: [ colors.storeId ], references: [ stores.id ] }), products: helpers.many(products, { relationName: 'ColorToProduct' }), fullLook: helpers.many(fullLooks, { relationName: 'ColorToFullLook' }) }));