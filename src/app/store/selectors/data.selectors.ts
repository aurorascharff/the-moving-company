import { createSelector, createFeatureSelector } from '@ngrx/store';
import { Order } from 'src/app/models/order.model';
import { ProductType } from 'src/app/models/product-type.model';
import { DataFeatureKey, DataState } from '../data.store.model';

export const getDataState = createFeatureSelector<DataState>(DataFeatureKey);

export const selectOrderEntities = createSelector(
  getDataState,
  (state: DataState) => state.orders
);

export const selectOrders = createSelector(
  selectOrderEntities,
  (orderEntities: { [key: string]: Order }) => Object.values(orderEntities)
);

export const selectProductEntities = createSelector(
  getDataState,
  (state: DataState) => state.productTypes
);

export const selectProducts = createSelector(
  selectProductEntities,
  (productEntities: { [key: string]: ProductType }) =>
    Object.values(productEntities)
);

export const selectProductInEdit = createSelector(
  getDataState,
  (state: DataState) => state.productInEdit
);

export const selectOrderInEdit = createSelector(
  getDataState,
  (state: DataState) => state.orderInEdit
);

export const selectActiveOrders = createSelector(
  selectOrders,
  (orders: Order[]) => orders.length
);

export const selectError = createSelector(
  getDataState,
  (state: DataState) => state.error
);

export const selectIsLoading = createSelector(
  getDataState,
  (state: DataState) => state.isLoading
);

export const selectCurrentUser = createSelector(
  getDataState,
  (state: DataState) => state.currentUser
);
