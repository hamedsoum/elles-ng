import {EDOResourceService} from './resource.service';
import {Injectable} from '@angular/core';
import {Subscription, SubscriptionResponse} from '../../core/domain/subscription';

@Injectable({providedIn: 'root'})
export class SubscriptionService extends  EDOResourceService<SubscriptionResponse, Subscription> {
  constructor() {
    super('subscriptions')
  }
}
