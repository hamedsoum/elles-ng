import {EDOResourceService} from './resource.service';
import {Injectable} from '@angular/core';
import {Subscription} from '../../core/domain/subscription';

@Injectable({providedIn: 'root'})
export class SubscriptionService extends  EDOResourceService<Subscription, Subscription> {
  constructor() {
    super('subscriptions')
  }
}
