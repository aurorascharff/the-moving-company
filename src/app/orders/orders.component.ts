import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ProductActions, OrderActions } from '../store/actions/data.actions';
import {
  selectError,
  selectOrderInEdit,
  selectProducts,
  selectIsLoading,
} from '../store/selectors/data.selectors';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ProductType } from '../models/product-type.model';
import { Order } from '../models/order.model';

@Component({
  selector: 'app-pages',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrdersComponent implements OnInit {
  productTypes$: Observable<ProductType[]> = this.store.select(selectProducts);

  orderInEdit$: Observable<Order | undefined> =
    this.store.select(selectOrderInEdit);

  error$: Observable<string[]> = this.store.select(selectError);
  isLoading$: Observable<boolean> = this.store.select(selectIsLoading);

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(OrderActions.loadOrderData());
    this.store.dispatch(ProductActions.loadProductData());
  }
  removeError() {
    this.store.dispatch(OrderActions.removeDataError());
  }
}
