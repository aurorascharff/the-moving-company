import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../models/order.model';
import { ProductType } from '../models/product-type.model';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private httpClient: HttpClient) {}

  getOrders(): Observable<Order[]> {
    return this.httpClient.get(`${environment.apiURL}/orders`) as Observable<
      Order[]
    >;
  }

  getProducts(): Observable<ProductType[]> {
    return this.httpClient.get(`${environment.apiURL}/products`) as Observable<
      ProductType[]
    >;
  }

  deleteOrder(orderId: number) {
    return this.httpClient.delete(`${environment.apiURL}/orders/${orderId}`);
  }

  updateOrder(order: Order) {
    return this.httpClient.put(
      `${environment.apiURL}/orders/${order.id}`,
      order
    );
  }

  createOrder(order: Order) {
    return this.httpClient.post(`${environment.apiURL}/orders`, order);
  }

  getCurrentUser(): Observable<User> {
    return this.httpClient.get(environment.graphEndpoint) as Observable<User>;
  }
}
