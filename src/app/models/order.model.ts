import { Product } from './product.model';

export interface Order {
  id: number;
  customerId: number;
  customerEmail: string;
  customerName: string;
  customerPhone: string;
  date: Date;
  note: string;
  products: Product[];
}
