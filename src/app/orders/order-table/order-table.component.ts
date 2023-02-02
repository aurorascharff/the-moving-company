import { Component, Input, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { OrderActions } from 'src/app/store/actions/data.actions';
import { selectOrders } from 'src/app/store/selectors/data.selectors';
import { Store } from '@ngrx/store';
import { Order } from 'src/app/models/order.model';
import { ProductType } from 'src/app/models/product-type.model';

@Component({
  selector: 'app-order-table',
  templateUrl: './order-table.component.html',
  styleUrls: ['./order-table.component.scss'],
})
export class OrderTableComponent implements OnInit {
  @Input() productTypes: ProductType[] = [];

  orderData$: Observable<Order[]> = this.store.select(selectOrders);
  displayedColumns: string[] = [
    'orderDate',
    'orderId',
    'customerName',
    'customerId',
    'products',
    'note',
    'edit',
    'delete',
  ];

  constructor(private store: Store) {}

  ngOnInit(): void {}

  updateOrder(order: Order): void {
    this.store.dispatch(OrderActions.setOrderInEdit({ order }));
  }

  deleteOrder(orderId: number): void {
    this.store.dispatch(OrderActions.deleteOrder({ orderId }));
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.orderData$ = this.store
      .select(selectOrders)
      .pipe(
        map((orders) =>
          orders.filter((o) =>
            o.customerPhone
              .toString()
              .toLowerCase()
              .includes(filterValue.toLowerCase())
          )
        )
      );
  }
}
