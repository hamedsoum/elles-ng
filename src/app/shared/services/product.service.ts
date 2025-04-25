import {EDOResourceService} from './resource.service';
import {Product} from '../../core/domain/product';
import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class ProductService extends  EDOResourceService<Product, Product>{
  constructor() {
    super('products');
  }

}
