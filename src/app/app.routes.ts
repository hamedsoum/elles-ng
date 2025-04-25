import { Routes } from '@angular/router';
import {MainComponent} from './modules/main/main.component';
import {ProductsComponent} from './modules/product/products.component';
import {UsersComponent} from './modules/user/users.component';
import {SubscriptionsComponent} from './modules/subscription/subscriptions.component';

export const routes: Routes = [
  {path: '', component: MainComponent,
  children: [
    {path: 'products', component: ProductsComponent},
    {path: 'users', component: UsersComponent},
    {path: 'subscriptions', component: SubscriptionsComponent},
  ]}
];
