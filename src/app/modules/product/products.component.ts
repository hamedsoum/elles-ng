import {Component, OnInit} from '@angular/core';
import {User} from '../../core/domain/user';
import {UserService} from '../../shared/services/user.service';
import {finalize} from 'rxjs';
import {Product} from '../../core/domain/product';
import {ProductService} from '../../shared/services/product.service';
import {Dialog} from 'primeng/dialog';
import {NgForOf, NgIf} from '@angular/common';
import {PrimeTemplate} from 'primeng/api';
import {TableModule} from 'primeng/table';
import {UserFormComponent} from '../user/form/user-form.component';
import {ProductFormComponent} from './form/product-form.component';

@Component({
  selector: 'products',
  imports: [
    Dialog,
    NgIf,
    PrimeTemplate,
    TableModule,
    NgForOf,
    ProductFormComponent
  ],
  templateUrl: './products.component.html'
})
export class ProductsComponent implements OnInit {

  products?: Product[];

  loading?: boolean;

  formVisible: boolean = false;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.findAll();
  }

  public handleSaveEvent(): void {
    this.formVisible = false;
    this.findAll();
  }
  private findAll(): void {
    this.loading = true
    this.productService.findAll()
      .pipe(finalize(() => this.loading = false))
      .subscribe(
        (products: Product[]) => {
          this.products = products;
          console.log("Products ===>", this.products);
        },
        error => console.log(error)
      )
  }
}
