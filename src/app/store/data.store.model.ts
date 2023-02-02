import { Order } from '../models/order.model';
import { ProductType } from '../models/product-type.model';
import { Product } from '../models/product.model';
import { User } from '../models/user.model';

export const DataFeatureKey = 'data';

export interface DataState {
  orders: {
    [key: number]: Order;
  };
  productTypes: {
    [key: number]: ProductType;
  };
  orderInEdit?: Order;
  productInEdit?: Product;
  currentUser: User;
  error: string[];
  isLoading: boolean;
}

export interface AppState {
  data: DataState;
}
