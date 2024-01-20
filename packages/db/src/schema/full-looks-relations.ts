import { relations } from 'drizzle-orm';
import { fullLooks } from './full-looks';
import { stores } from './stores';
import { collections } from './collections';
import { sizes } from './sizes';
import { colors } from './colors';
import { looks } from './looks';
import { images } from './images';
import { orderItems } from './order-items';

export const fullLooksRelations = relations(fullLooks, (helpers) => ({ store: helpers.one(stores, { relationName: 'StoreToFullLook', fields: [ fullLooks.storeId ], references: [ stores.id ] }), collection: helpers.one(collections, { relationName: 'CollectionToFullLook', fields: [ fullLooks.collectionId ], references: [ collections.id ] }), size: helpers.one(sizes, { relationName: 'FullLookToSize', fields: [ fullLooks.sizeId ], references: [ sizes.id ] }), color: helpers.one(colors, { relationName: 'ColorToFullLook', fields: [ fullLooks.colorId ], references: [ colors.id ] }), look: helpers.one(looks, { relationName: 'FullLookToLook', fields: [ fullLooks.lookId ], references: [ looks.id ] }), image: helpers.many(images, { relationName: 'FullLookToImage' }), orderItems: helpers.many(orderItems, { relationName: 'FullLookToOrderItem' }) }));