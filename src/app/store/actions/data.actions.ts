import { createAction, props } from '@ngrx/store';
import { Order } from 'src/app/models/order.model';
import { ProductType } from 'src/app/models/product-type.model';
import { Product } from 'src/app/models/product.model';
import { User } from 'src/app/models/user.model';

enum ActionType {
  LoadOrderData = '[Order page] Load order data',
  LoadUserData = '[Order page] Load user data',
  UserDataUpdated = '[Order page] User data updated',
  OrderDataUpdated = '[Order page] Order data updated',
  LoadProductData = '[Order page] Load customer data',
  productDataUpdated = '[Order page] Product data updated',
  RemoveDataError = '[Order page] Remove data Error',
  LoadDataError = '[Order page] Error loading data',
  UpdateOrder = '[Order page] Update order',
  CreateOrder = '[Order page] Create order',
  DeleteOrder = '[Order page] Delete order',
  SetOrderInEdit = '[Order page] Set order in edit',
  ClearOrderInEdit = '[Order page] Clear order in edit',
  SetProductInEdit = '[Order page] Set product in edit',
  ClearProductInEdit = '[Order page] Clear product in edit',
  UpdateProduct = '[Order page] Update product',
  CreateProduct = '[Order page] Create product',
  DeleteProduct = '[Order page] Delete product',
}

export const UserActions = {
  loadUserData: createAction(ActionType.LoadUserData),
  userDataUpdated: createAction(
    ActionType.UserDataUpdated,
    props<{ data: User }>()
  ),
};

export const OrderActions = {
  loadDataError: createAction(
    ActionType.LoadDataError,
    props<{ message: string; error?: string }>()
  ),
  removeDataError: createAction(ActionType.RemoveDataError),
  loadOrderData: createAction(ActionType.LoadOrderData),
  orderDataUpdated: createAction(
    ActionType.OrderDataUpdated,
    props<{ data: Order[] }>()
  ),
  updateOrder: createAction(ActionType.UpdateOrder, props<{ order: Order }>()),
  createOrder: createAction(ActionType.CreateOrder, props<{ order: Order }>()),
  deleteOrder: createAction(
    ActionType.DeleteOrder,
    props<{ orderId: number }>()
  ),
  setOrderInEdit: createAction(
    ActionType.SetOrderInEdit,
    props<{ order: Order }>()
  ),
  clearOrderInEdit: createAction(ActionType.ClearOrderInEdit),
};

export const ProductActions = {
  loadProductData: createAction(ActionType.LoadProductData),
  productDataUpdated: createAction(
    ActionType.productDataUpdated,
    props<{ data: ProductType[] }>()
  ),
  updateProduct: createAction(
    ActionType.UpdateProduct,
    props<{ product: Product }>()
  ),
  createProduct: createAction(
    ActionType.CreateProduct,
    props<{ product: Product }>()
  ),
  deleteProduct: createAction(
    ActionType.DeleteProduct,
    props<{ id: number }>()
  ),
  setProductInEdit: createAction(
    ActionType.SetProductInEdit,
    props<{ product: Product }>()
  ),
  clearProductInEdit: createAction(ActionType.ClearProductInEdit),
};
