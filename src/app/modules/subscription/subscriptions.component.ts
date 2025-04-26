import {Component, OnInit} from '@angular/core';
import {finalize} from 'rxjs';
import {SubscriptionService} from '../../shared/services/subscription.service';
import {Subscription} from '../../core/domain/subscription';
import {Dialog} from 'primeng/dialog';
import {DatePipe, NgForOf, NgIf} from '@angular/common';
import {PrimeTemplate} from 'primeng/api';
import {ProductFormComponent} from '../product/form/product-form.component';
import {TableModule} from 'primeng/table';
import {SubscriptionFormComponent} from './form/subscription-form.component';

@Component({
  selector: 'subscriptions',
  imports: [
    Dialog,
    NgIf,
    PrimeTemplate,
    TableModule,
    DatePipe,
    SubscriptionFormComponent
  ],
  templateUrl: './subscriptions.component.html'
})
export class SubscriptionsComponent implements OnInit {

  subscriptions?: Subscription[];

  loading?: boolean;

  formVisible: boolean = false;

  constructor(private subscriptionService: SubscriptionService) {}

  ngOnInit(): void {
    this.findAll();
  }

  public handleSaveEvent(): void {
    this.formVisible = false;
    this.findAll();
  }
  private findAll(): void {
    this.loading = true
    this.subscriptionService.findAll()
      .pipe(finalize(() => this.loading = false))
      .subscribe(
        (subscriptions: Subscription[]) => {
          this.subscriptions = subscriptions;
          console.log("Subscriptions ===>", subscriptions);
        },
        error => console.log(error)
      )
  }
}
