import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import {
  ProductActions,
  OrderActions,
  UserActions,
} from '../actions/data.actions';
import { ApiService } from '../api.service';

@Injectable()
export class DataEffects {
  loadUserData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loadUserData),
      switchMap(() =>
        this.dataService.getCurrentUser().pipe(
          map((data) => {
            return UserActions.userDataUpdated({ data });
          }),
          catchError((e) =>
            of(
              OrderActions.loadDataError({
                message: 'Error loading user data',
                error: e.message,
              })
            )
          )
        )
      )
    )
  );

  loadOrderData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrderActions.loadOrderData),
      switchMap(() =>
        this.dataService.getOrders().pipe(
          map((data) => {
            return OrderActions.orderDataUpdated({ data });
          }),
          catchError((e) =>
            of(
              OrderActions.loadDataError({
                message: 'Error loading customer data',
                error: e.message,
              })
            )
          )
        )
      )
    )
  );

  loadProductData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.loadProductData),
      switchMap(() =>
        this.dataService.getProducts().pipe(
          map((data) => {
            return ProductActions.productDataUpdated({ data });
          }),
          catchError((e) =>
            of(
              OrderActions.loadDataError({
                message: 'Error loading product data',
                error: e.message,
              })
            )
          )
        )
      )
    )
  );

  createOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrderActions.createOrder),
      switchMap((action) =>
        this.dataService.createOrder(action.order).pipe(
          switchMap(() => [OrderActions.loadOrderData()]),
          catchError((e) =>
            of(
              OrderActions.loadDataError({
                message: 'Error creating order',
                error: e.message,
              })
            )
          )
        )
      )
    )
  );

  updateOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrderActions.updateOrder),
      switchMap((action) =>
        this.dataService.updateOrder(action.order).pipe(
          switchMap(() => [OrderActions.loadOrderData()]),
          catchError((e) =>
            of(
              OrderActions.loadDataError({
                message: 'Error updating order',
                error: e.message,
              })
            )
          )
        )
      )
    )
  );

  deleteOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrderActions.deleteOrder),
      switchMap((action) =>
        this.dataService.deleteOrder(action.orderId).pipe(
          switchMap(() => [OrderActions.loadOrderData()]),
          catchError((e) =>
            of(
              OrderActions.loadDataError({
                message: 'Error deleting order',
                error: e.message,
              })
            )
          )
        )
      )
    )
  );

  constructor(private actions$: Actions, private dataService: ApiService) {}
}
