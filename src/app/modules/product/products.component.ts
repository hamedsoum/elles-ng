import {Component, OnInit} from '@angular/core';
import {finalize} from 'rxjs';
import {Product} from '../../core/domain/product';
import {ProductService} from '../../shared/services/product.service';
import {Dialog} from 'primeng/dialog';
import {NgForOf, NgIf} from '@angular/common';
import {MessageService, PrimeTemplate} from 'primeng/api';
import {TableModule} from 'primeng/table';
import {ProductFormComponent} from './form/product-form.component';
import {Toast} from 'primeng/toast';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'products',
  imports: [
    Dialog,
    NgIf,
    PrimeTemplate,
    TableModule,
    ToastModule,
    NgForOf,
    ProductFormComponent,
    Toast
  ],
  templateUrl: './products.component.html',
  providers: [MessageService]
})
export class ProductsComponent implements OnInit {

  products?: Product[];

  loading?: boolean;

  formVisible: boolean = false;

  constructor(
    private messageService: MessageService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.findAll();
  }

  public handleSaveEvent(product: Product): void {
    this.formVisible = false;
    this.messageService.add({ severity: 'success', summary: product.name, detail: 'Produit ajouté avec succès'});
    this.findAll();
  }

  private findAll(): void {
    this.loading = true
    this.productService.findAll()
      .pipe(finalize(() => this.loading = false))
      .subscribe(
        (products: Product[]) => {
          this.products = products;
        },
        error => console.log(error)
      )
  }
}
