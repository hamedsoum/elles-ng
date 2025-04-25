import { Routes } from '@angular/router';
import {MainComponent} from './modules/main/main.component';
import {ProductsComponent} from './modules/product/products.component';
import {UsersComponent} from './modules/user/users.component';
import {SubscriptionsComponent} from './modules/subscription/subscriptions.component';
import {LoginComponent} from './modules/authentication/login/login.component';
import {AuthenticationGuard} from './shared/guard/authentication.guard';

export const routes: Routes = [
  {
    path: 'main',
    component: MainComponent,
    canActivate: [AuthenticationGuard],
  children: [
    {path: 'products', component: ProductsComponent},
    {path: 'users', component: UsersComponent},
    {path: 'subscriptions', component: SubscriptionsComponent},
  ]
  },
  {path: 'login', component: LoginComponent},
];
