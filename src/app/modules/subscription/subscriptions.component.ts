import {Component, OnInit} from '@angular/core';
import {finalize} from 'rxjs';
import {SubscriptionService} from '../../shared/services/subscription.service';
import {Subscription, SubscriptionResponse, SubscriptionStatus} from '../../core/domain/subscription';
import {Dialog} from 'primeng/dialog';
import {DatePipe, NgIf} from '@angular/common';
import {MessageService, PrimeTemplate} from 'primeng/api';
import {TableModule} from 'primeng/table';
import {SubscriptionFormComponent} from './form/subscription-form.component';
import {Toast} from 'primeng/toast';
import {Tag} from 'primeng/tag';

@Component({
  selector: 'subscriptions',
  imports: [
    Dialog,
    NgIf,
    PrimeTemplate,
    TableModule,
    DatePipe,
    SubscriptionFormComponent,
    Toast,
    Tag
  ],
  templateUrl: './subscriptions.component.html',
  providers: [MessageService]
})
export class SubscriptionsComponent implements OnInit {

  subscriptions?: SubscriptionResponse[];

  loading?: boolean;

  formVisible: boolean = false;

  constructor(
    private messageService: MessageService,
    private subscriptionService: SubscriptionService) {}

  ngOnInit(): void {
    this.findAll();
  }

  public handleSaveEvent(subscription: SubscriptionResponse): void {
    this.formVisible = false;
    this.messageService.add({ severity: 'success', summary: `Souscription ajouté avec succès `, detail: `${subscription.insuredFirstName} ${subscription.insuredLastName} - ${subscription.vehicleCategory} - ${subscription.status}`});
    this.findAll();
  }

  public buildStatus(status: SubscriptionStatus): {severity: 'danger' | 'success' | 'warn', label: string} {
    switch (status) {
      case SubscriptionStatus.CANCELLED:
        return {severity: 'danger', label: 'Annullé'};
      case SubscriptionStatus.DRAFT:
        return {severity: 'warn', label: 'En attente'};
      case SubscriptionStatus.VALIDATED:
        return {severity: 'danger', label: 'Validé'};
    }
  }

  private findAll(): void {
    this.loading = true
    this.subscriptionService.findAll()
      .pipe(finalize(() => this.loading = false))
      .subscribe(
        (subscriptions: SubscriptionResponse[]) => {
          this.subscriptions = subscriptions;
        },
        error => console.log(error)
      )
  }
}
