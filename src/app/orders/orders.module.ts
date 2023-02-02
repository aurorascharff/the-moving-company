import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OrdersComponent } from './orders.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EditOrderComponent } from './edit-create-order/edit-create-order.component';
import { MaterialModule } from '../material.module';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { DataFeatureKey } from '../store/data.store.model';
import { dataReducer } from '../store/reducers/data.reducer';
import { DataEffects } from '../store/effects/data.effects';
import { OrderTableComponent } from './order-table/order-table.component';
import { LetDirective } from '../directives/ng-let';
import { ProductIconPipe } from '../pipes/product-icon.pipe';

@NgModule({
  declarations: [
    OrdersComponent,
    EditOrderComponent,
    OrderTableComponent,
    LetDirective,
    ProductIconPipe,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    StoreModule.forFeature(DataFeatureKey, dataReducer),
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    EffectsModule.forFeature([DataEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: false,
      features: {
        pause: false,
        lock: true,
        persist: true,
      },
    }),
  ],
  exports: [OrdersComponent],
})
export class OrdersModule {}
