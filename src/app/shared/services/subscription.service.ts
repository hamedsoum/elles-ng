import {EDOResourceService} from './resource.service';
import {Product} from '../../core/domain/product';
import {ProductUseCase} from '../../core/use-case/product-use-case';
import {Injectable} from '@angular/core';
import {Subscription} from 'rxjs';

@Injectable({providedIn: 'root'})
export class SubscriptionService extends  EDOResourceService<Subscription, Subscription> {
}
