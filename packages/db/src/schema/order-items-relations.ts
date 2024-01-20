import { relations } from 'drizzle-orm';
import { orderItems } from './order-items';
import { orders } from './orders';
import { products } from './products';
import { fullLooks } from './full-looks';

export const orderItemsRelations = relations(orderItems, (helpers) => ({ order: helpers.one(orders, { relationName: 'OrderToOrderItem', fields: [ orderItems.orderId ], references: [ orders.id ] }), product: helpers.one(products, { relationName: 'OrderItemToProduct', fields: [ orderItems.productId ], references: [ products.id ] }), fullLook: helpers.one(fullLooks, { relationName: 'FullLookToOrderItem', fields: [ orderItems.fullLookId ], references: [ fullLooks.id ] }) }));