import { relations } from 'drizzle-orm';
import { billboards } from './billboards';
import { stores } from './stores';
import { collections } from './collections';

export const billboardsRelations = relations(billboards, (helpers) => ({ store: helpers.one(stores, { relationName: 'StoreToBillboard', fields: [ billboards.storeId ], references: [ stores.id ] }), collections: helpers.many(collections, { relationName: 'BillboardsToCollection' }) }));