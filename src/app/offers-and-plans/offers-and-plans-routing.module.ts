import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthService } from '../services/auth-guards';
import { KlikkComponent } from './CP APIs/klikk/klikk.component';
import { SonyLivComponent } from './CP APIs/sony-liv/sony-liv.component';
import { Zee5Component } from './CP APIs/zee5/zee5.component';
import { GetPrepaidBalanceComponent } from './IT APIs/get-prepaid-balance/get-prepaid-balance.component';
import { GetSubscriptionHistroyComponent } from './IT APIs/get-subscription-histroy/get-subscription-histroy.component';
import { GetSubscriptionWithLoginComponent } from './IT APIs/get-subscription-with-login/get-subscription-with-login.component';
import { GetSubscriptionWithoutLoginComponent } from './IT APIs/get-subscription-without-login/get-subscription-without-login.component';

const routes: Routes = [
  {
    path: 'zee5',
    canActivate: [AuthService],
    component: Zee5Component
  },
  {
    path: 'sony',
    canActivate: [AuthService],
    component: SonyLivComponent
  },
  {
    path: 'klikk',
    canActivate: [AuthService],
    component: KlikkComponent
  },
  {
    path: 'GetActiveSubscriptions',
    canActivate: [AuthService],
    component: GetSubscriptionWithoutLoginComponent
  },
  {
    path: 'GetActiveSubscriptionsLogin',
    canActivate: [AuthService],
    component: GetSubscriptionWithLoginComponent
  },
  {
    path: 'GetPrepaidBalance',
    canActivate: [AuthService],
    component: GetPrepaidBalanceComponent
  },
  {
    path: 'GetSubscriptionHistory',
    canActivate: [AuthService],
    component: GetSubscriptionHistroyComponent
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OffersAndPlansRoutingModule { }
