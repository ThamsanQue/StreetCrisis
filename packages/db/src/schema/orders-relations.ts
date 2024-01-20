import { relations } from 'drizzle-orm';
import { orders } from './orders';
import { stores } from './stores';
import { orderItems } from './order-items';

export const ordersRelations = relations(orders, (helpers) => ({ store: helpers.one(stores, { relationName: 'StoreToOrder', fields: [ orders.storeId ], references: [ stores.id ] }), orderItems: helpers.many(orderItems, { relationName: 'OrderToOrderItem' }) }));