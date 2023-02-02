import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'productIcon',
})
export class ProductIconPipe implements PipeTransform {
  transform(productType: number): string {
    if (productType === 1) {
      return 'inventory_2';
    }
    if (productType === 2) {
      return 'local_shipping';
    }
    if (productType === 3) {
      return 'cleaning_services';
    }
    return 'Unknown';
  }
}
