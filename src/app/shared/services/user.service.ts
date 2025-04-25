import {EDOResourceService} from './resource.service';
import {Injectable} from '@angular/core';
import {User} from '../../core/domain/user';

@Injectable({providedIn: 'root'})
export class UserService extends  EDOResourceService<User, User> {
  constructor() {
    super('users');
  }
}
