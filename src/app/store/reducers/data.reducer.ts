import { createReducer, on } from '@ngrx/store';
import { Order } from 'src/app/models/order.model';
import { ProductType } from 'src/app/models/product-type.model';
import { Product } from 'src/app/models/product.model';
import {
  ProductActions,
  OrderActions,
  UserActions,
} from '../actions/data.actions';
import { DataState } from '../data.store.model';

export const initialState: DataState = {
  orders: {},
  productTypes: {},
  orderInEdit: undefined,
  productInEdit: undefined,
  currentUser: {
    givenName: '',
    surname: '',
    userPrincipalName: '',
    id: '',
  },
  error: [],
  isLoading: false,
};

const _dataReducer = createReducer(
  initialState,
  on(UserActions.loadUserData, (state) => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(UserActions.userDataUpdated, (state, { data }) => {
    return {
      ...state,
      currentUser: data,
      isLoading: false,
    };
  }),
  on(OrderActions.loadOrderData, (state) => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(OrderActions.orderDataUpdated, (state, { data }) => {
    return {
      ...state,
      orders: formatOrderDataToEntity(data),
      isLoading: false,
    };
  }),
  on(ProductActions.productDataUpdated, (state, { data }) => {
    return {
      ...state,
      productTypes: formatProductDataToEntity(data),
    };
  }),
  on(OrderActions.setOrderInEdit, (state, { order }) => {
    return {
      ...state,
      orderInEdit: order,
    };
  }),
  on(OrderActions.clearOrderInEdit, (state) => {
    return {
      ...state,
      orderInEdit: undefined,
      productInEdit: undefined,
    };
  }),
  on(ProductActions.setProductInEdit, (state, { product }) => {
    return {
      ...state,
      productInEdit: product,
    };
  }),
  on(ProductActions.clearProductInEdit, (state) => {
    return {
      ...state,
      productInEdit: undefined,
    };
  }),
  on(OrderActions.loadDataError, (state, { message, error }) => {
    return {
      ...state,
      isLoading: false,
      error: [...state.error, message + ': ' + error],
    };
  }),
  on(OrderActions.removeDataError, (state) => {
    return {
      ...state,
      error: [],
    };
  }),
  on(OrderActions.createOrder, (state) => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(OrderActions.updateOrder, (state) => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(OrderActions.deleteOrder, (state) => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(ProductActions.createProduct, (state, { product }) => {
    let order: Order | undefined = state.orderInEdit;
    if (!state.orderInEdit) {
      order = {
        id: 0,
        customerName: '',
        customerId: 0,
        customerPhone: '',
        customerEmail: '',
        date: new Date(),
        note: '',
        products: [product],
      };
      return {
        ...state,
        productInEdit: undefined,
        orderInEdit: order,
      };
    }
    return {
      ...state,
      productInEdit: undefined,
      orderInEdit: {
        ...state.orderInEdit,
        products: [...state.orderInEdit.products, product],
      },
    };
  }),
  on(ProductActions.updateProduct, (state, { product }) => {
    if (!state.orderInEdit) return state;
    const filteredProducts: Product[] = state.orderInEdit.products.filter(
      (p) => p.id === state.productInEdit?.id
    );
    return {
      ...state,
      productInEdit: undefined,
      orderInEdit: {
        ...state.orderInEdit,
        products: [...filteredProducts, product],
      },
    };
  }),
  on(ProductActions.deleteProduct, (state, { id }) => {
    if (!state.orderInEdit) return state;
    return {
      ...state,
      orderInEdit: {
        ...state.orderInEdit,
        products: state.orderInEdit.products.filter((p) => p.id !== id),
      },
    };
  })
);

export function dataReducer(state: DataState, action: any) {
  return _dataReducer(state, action);
}

function formatOrderDataToEntity(data: Order[]) {
  return data.reduce((acc: { [key: number]: Order }, cur) => {
    acc[cur.id] = cur;
    return acc;
  }, {});
}

function formatProductDataToEntity(data: ProductType[]) {
  return data.reduce((acc: { [key: number]: ProductType }, cur) => {
    acc[cur.id] = cur;
    return acc;
  }, {});
}
