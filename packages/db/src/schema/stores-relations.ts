import { relations } from 'drizzle-orm';
import { stores } from './stores';
import { billboards } from './billboards';
import { collections } from './collections';
import { sizes } from './sizes';
import { colors } from './colors';
import { looks } from './looks';
import { products } from './products';
import { fullLooks } from './full-looks';
import { orders } from './orders';

export const storesRelations = relations(stores, (helpers) => ({ billboards: helpers.many(billboards, { relationName: 'StoreToBillboard' }), collection: helpers.many(collections, { relationName: 'StoreToCollection' }), sizes: helpers.many(sizes, { relationName: 'StoreToSize' }), colors: helpers.many(colors, { relationName: 'StoreToColor' }), looks: helpers.many(looks, { relationName: 'StoreToLook' }), products: helpers.many(products, { relationName: 'StoreToProduct' }), fullLooks: helpers.many(fullLooks, { relationName: 'StoreToFullLook' }), orders: helpers.many(orders, { relationName: 'StoreToOrder' }) }));