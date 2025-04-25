import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {TableModule} from 'primeng/table';
import {finalize} from 'rxjs';
import {NgClass, NgIf} from '@angular/common';
import {UserService} from '../../../shared/services/user.service';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Role, User} from '../../../core/domain/user';
import {FloatLabel} from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import {ProgressSpinner} from 'primeng/progressspinner';
import { SelectModule } from 'primeng/select';
import {InputTextComponent} from '../../../shared/components/input/text/input-text.component';
import {InputSelectComponent} from '../../../shared/components/input/select/input-select.component';
import {ProductService} from '../../../shared/services/product.service';
import {Product, Warranty} from '../../../core/domain/product';
import {
  InputMultipleSelectComponent
} from '../../../shared/components/input/multiple-select/input-multiple-select.component';
import {VehicleCategory} from '../../../core/domain/vehicle';

@Component({
  selector: 'product-form',
  templateUrl: './product-form.component.html',

  imports: [
    TableModule,
    InputTextModule,
    NgClass,
    ReactiveFormsModule,
    ProgressSpinner,
    NgIf,
    SelectModule,
    InputTextComponent,
    InputMultipleSelectComponent
  ]
})
export class ProductFormComponent implements OnInit {

  loading?: boolean;

  formGroup!: FormGroup;

  error?: any;

  warranties = [
    { value: Warranty.COLLISION, label: 'COLLISION' },
    { value: Warranty.TIERCE_COLLISION, label: 'TIERCE COLLISION' },
    { value: Warranty.DOMMAGE, label: 'DOMMAGE' },
    { value: Warranty.RC, label: 'RC' },
    { value: Warranty.VOL, label: 'VOL' },
    { value: Warranty.INCENDIE, label: 'INCENDIE' },
    { value: Warranty.All, label: 'Toutes garanties ' },
  ]

  eligibleVehicles = [
    { value: VehicleCategory.CATEGORY_201, label: 'Usage personnel' },
    { value: VehicleCategory.CATEGORY_202, label: 'Motocycle, tricycles' },
    { value: VehicleCategory.CATEGORY_203, label: 'Véhicule transport de personnes' },
    { value: VehicleCategory.CATEGORY_204, label: 'Taxis' }
  ]

  @Output() cancelEvent = new EventEmitter();
  @Output() saveEvent = new EventEmitter<Product>();

  constructor(

    private productService: ProductService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.buildFields();
  }

  public save(): void {
    this.formGroup.markAllAsTouched();
    if (this.formGroup.valid) {
      this.loading = true;
      let formData = this.formGroup.value;
      formData = {
        ...formData,
        warranties: formData.warranties.value,
        eligibleVehicles: formData.eligibleVehicles.value
      }
      console.log("formData", formData);
      this.productService.save(formData)
        .pipe(finalize(() => this.loading = false))
        .subscribe(
          {
            next: userSaved => {
              this.formGroup.reset();
              this.saveEvent.emit(userSaved);
            },
            error: error => this.error = error
          }
        )
    }
  }

  private buildFields(): void {
    this.formGroup = this.formBuilder.group({
      name: ['', Validators.required],
      warranties: ['' , Validators.required],
      eligibleVehicles: ['', Validators.required],
    })
  }
}
