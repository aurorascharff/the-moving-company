import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import {
  ProductActions,
  OrderActions,
} from 'src/app/store/actions/data.actions';
import {
  selectOrderInEdit,
  selectProductInEdit,
} from 'src/app/store/selectors/data.selectors';
import { Observable, tap } from 'rxjs';
import { ProductType } from 'src/app/models/product-type.model';
import { Order } from 'src/app/models/order.model';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-edit-create-order',
  templateUrl: './edit-create-order.component.html',
  styleUrls: ['./edit-create-order.component.scss'],
})
export class EditOrderComponent implements OnInit {
  @Input() productTypes: ProductType[] = [];
  @Input() isLoading: boolean = false;

  orderForm = new FormGroup({
    customerName: new FormControl('', [Validators.required]),
    customerPhone: new FormControl('', [Validators.required]),
    customerEmail: new FormControl('', [Validators.required]),
    note: new FormControl(''),
    products: new FormControl('', [Validators.required]),
  });

  productForm = new FormGroup({
    productType: new FormControl('', [Validators.required]),
    fromAddress: new FormControl('', [Validators.required]),
    toAddress: new FormControl('', [Validators.required]),
    date: new FormControl('', [Validators.required]),
  });

  products = this.orderForm.get('products') as FormArray;
  showProductForm = false;

  orderInEdit$: Observable<Order | undefined> = this.store
    .select(selectOrderInEdit)
    .pipe(
      tap((orderInEdit) => {
        if (!!orderInEdit) {
          this.orderForm.patchValue({
            customerName: orderInEdit.customerName,
            customerPhone: orderInEdit.customerPhone,
            customerEmail: orderInEdit.customerEmail,
            note: orderInEdit.note,
            products: orderInEdit.products,
          });
        }
      })
    );

  productInEdit$: Observable<Product | undefined> = this.store
    .select(selectProductInEdit)
    .pipe(
      tap((productInEdit) => {
        if (!!productInEdit) {
          this.productForm.patchValue({
            productType: this.productTypes.find(
              (p) => p.id === productInEdit.productTypeId
            ),
            fromAddress: productInEdit.fromAddress,
            toAddress: productInEdit.toAddress,
            date: productInEdit.date,
          });
        }
      })
    );

  constructor(private store: Store) {}

  ngOnInit(): void {}

  addProduct() {
    this.showProductForm = true;
  }

  editProduct(product: Product) {
    this.showProductForm = true;
    this.store.dispatch(
      ProductActions.setProductInEdit({
        product,
      })
    );
  }

  clearOrderInEdit() {
    this.store.dispatch(OrderActions.clearOrderInEdit());
    this.clearProductInEdit();
  }

  clearProductInEdit() {
    this.store.dispatch(ProductActions.clearProductInEdit());
    this.showProductForm = false;
    this.productForm.reset();
  }

  onSubmitOrder(orderInEdit: Order): void {
    const order: Order = {
      id: orderInEdit?.id,
      customerName: this.orderForm.value.customerName,
      customerPhone: this.orderForm.value.customerPhone,
      customerEmail: this.orderForm.value.customerEmail,
      date: orderInEdit?.date ? orderInEdit?.date : new Date(),
      customerId: orderInEdit?.customerId,
      note: this.orderForm.value.note,
      products: this.products.value.map((p: any) => ({
        id: p.id,
        productTypeId: p.productTypeId,
        fromAddress: p.fromAddress,
        toAddress: p.toAddress,
        date: p.date,
      })),
    };
    if (!!orderInEdit) {
      this.store.dispatch(OrderActions.updateOrder({ order }));
    } else {
      this.store.dispatch(OrderActions.createOrder({ order }));
    }
    this.store.dispatch(OrderActions.clearOrderInEdit());
    this.orderForm.reset();
  }

  onSubmitProduct(productInEdit: Product): void {
    const product: Product = {
      id: productInEdit?.id,
      productTypeId: this.productForm.value.productType.id,
      fromAddress: this.productForm.value.fromAddress,
      toAddress: this.productForm.value.toAddress,
      date: this.productForm.value.date,
    };
    if (!!productInEdit) {
      const filteredProducts = this.products.value.filter(
        (p: any) => p.id !== productInEdit.id
      );
      this.orderForm.patchValue({
        products: [...filteredProducts, product],
      });
    } else {
      this.orderForm.patchValue({
        products: this.products.value
          ? [...this.products.value, product]
          : [product],
      });
    }
    this.store.dispatch(ProductActions.clearProductInEdit());
    this.showProductForm = false;
    this.productForm.reset();
  }

  onDeleteProduct(product: Product): void {
    this.showProductForm = false;
    this.orderForm.patchValue({
      products: this.products.value.filter((p: any) => p.id !== product.id),
    });
  }
}
