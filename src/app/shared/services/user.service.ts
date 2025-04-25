import {EDOResourceService} from './resource.service';
import {Product} from '../../core/domain/product';
import {ProductUseCase} from '../../core/use-case/product-use-case';
import {Injectable} from '@angular/core';
import {Subscription} from 'rxjs';
import {User} from '../../core/domain/user';

@Injectable({providedIn: 'root'})
export class UserService extends  EDOResourceService<User, User> {
  constructor() {
    super('users');
  }
}
