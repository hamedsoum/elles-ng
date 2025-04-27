import {AfterViewInit, Component, EventEmitter, OnInit, Output, TemplateRef, ViewChild} from '@angular/core';
import {TableModule} from 'primeng/table';
import {finalize} from 'rxjs';
import {NgClass, NgIf, NgTemplateOutlet} from '@angular/common';
import {MultiSelectModule} from 'primeng/multiselect';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {InputTextModule} from 'primeng/inputtext';
import {ProgressSpinner} from 'primeng/progressspinner';
import {SelectModule} from 'primeng/select';
import {ProductService} from '../../../shared/services/product.service';
import {Vehicle, VehicleCategory} from '../../../core/domain/vehicle';
import {StepperModule} from 'primeng/stepper';
import {Button} from 'primeng/button';
import {InputSelectComponent} from '../../../shared/components/input/select/input-select.component';
import {InputTextComponent} from '../../../shared/components/input/text/input-text.component';
import {
  InputMultipleSelectComponent
} from '../../../shared/components/input/multiple-select/input-multiple-select.component';
import {DatePickerModule} from 'primeng/datepicker';
import {InputDateComponent} from '../../../shared/components/input/date/input-date.component';
import {Subscription, SubscriptionResponse, SubscriptionStatus} from '../../../core/domain/subscription';
import {AuthenticationService} from '../../../shared/services/authentication.service';
import {SubscriptionService} from '../../../shared/services/subscription.service';
import {Insured} from '../../../core/domain/insured';

@Component({
  selector: 'subscription-form',
  templateUrl: './subscription-form.component.html',

  imports: [
    TableModule,
    InputTextModule,
    NgClass,
    ReactiveFormsModule,
    ProgressSpinner,
    NgIf,
    SelectModule,
    StepperModule,
    MultiSelectModule,
    Button,
    InputSelectComponent,
    InputTextComponent,
    DatePickerModule,
    NgTemplateOutlet,
    InputDateComponent,
  ]
})
export class SubscriptionFormComponent implements OnInit {

  @Output() cancelEvent = new EventEmitter();
  @Output() saveEvent = new EventEmitter<SubscriptionResponse>();

  @ViewChild('content') stepperContentRef!: TemplateRef<any>;

  loading?: boolean;

  insuredFormGroup!: FormGroup;
  vehicleFormGroup!: FormGroup;

  error?: any;
  errorSubscription?: any;

  insured?: Insured;
  vehicle?: Vehicle;
  category?: { label: string, value: any };
  product?: { label: string, value: any };
  products?: { label: string, value: any }[];

  saveData?: Subscription;

  activeIndex: number = 1;

  eligibleVehicles = [
    { value: VehicleCategory.CATEGORY_201, label: 'Usage personnel' },
    { value: VehicleCategory.CATEGORY_202, label: 'Motocycle, tricycles' },
    { value: VehicleCategory.CATEGORY_203, label: 'Véhicule transport de personnes' },
    { value: VehicleCategory.CATEGORY_204, label: 'Taxis' }
  ]

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private subscriptionService: SubscriptionService,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.findProducts();
    this.buildInsuredFields();
    this.buildVehicleFields();
  }

  goToStepInsured() {
    this.vehicleFormGroup.markAllAsTouched();
    if (this.vehicleFormGroup.valid) {
      this.activeIndex = 2;
    }
  }

  goToStepVehicle() {
    this.activeIndex = 1;
  }

  goToStepRecap() {
    this.insuredFormGroup.markAllAsTouched();
    if (this.insuredFormGroup.valid) {

      this.insured = this.insuredFormGroup.value;
      this.vehicle = this.vehicleFormGroup.value;

      this.product = this.insuredFormGroup.get('product')?.value;
      this.category = this.vehicleFormGroup.get('category')?.value
      this.buildSaveData();
      this.activeIndex = 3;
    }
  }

  public save(): void {
    this.insuredFormGroup.markAllAsTouched();
    if (this.insuredFormGroup.valid) {
      this.buildSaveData();
      this.subscriptionService.save(this.saveData!)
        .pipe(finalize(() => this.loading = false))
        .subscribe(
          {
            next: subscriptionCreated => {
              this.insuredFormGroup.reset();
              this.saveEvent.emit(subscriptionCreated);
            },
            error: error => this.error = error
          }
        )
    }
  }

  private buildInsuredFields(): void {
    this.insuredFormGroup = this.formBuilder.group({
      product: ['', [Validators.required]],
      firstName: ['', Validators.required],
      lastName: ['' , Validators.required],
      phoneNumber: ['' , Validators.required],
      identityNumber: ['', Validators.required],
      city: ['', Validators.required],
      address: ['', Validators.required],
    })
  }

  private buildVehicleFields(): void {
    this.vehicleFormGroup = this.formBuilder.group({
      vehicleFirstRegistrationDate: ['', Validators.required],
      licenceNumber: ['' , Validators.required],
      color: ['', Validators.required],
      numberOfSeat: ['', Validators.required],
      numberOfDoor: ['', Validators.required],
      category: ['', Validators.required],
    })
  }

  private findProducts(): void {
    this.productService.findAll().subscribe(
      {
        next: products => {
          this.products = products.map((product) => ({value: product.id, label: product.name}));
        },
        error: error => this.error = error
      }
    )
  }

  private buildSaveData(): void {
    const formDataVehicle = this.vehicleFormGroup.value;
    const formDataInsured = this.insuredFormGroup.value;

    this.saveData = {
      productID: formDataInsured.product.value,
      insured: formDataInsured,
      vehicle: {
        ...formDataVehicle,
        category: formDataVehicle.category.value,
        vehicleFirstRegistrationDate: new Date(formDataVehicle.vehicleFirstRegistrationDate),
      },
      status: SubscriptionStatus.DRAFT,
      createdBy: this.authenticationService.getUser()!.id,
      createdAt: new Date().toISOString(),
    }
  }
}
