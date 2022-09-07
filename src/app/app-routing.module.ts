import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthService } from '../app/services/auth-guards';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },

  {
    path: 'dashboard',
    canActivate: [AuthService],
    component: DashboardComponent,
  },
  {
    path: 'Watcho',
    loadChildren: () => import('./watcho/watcho.module').then(m => m.WatchoModule)
  },
  {
    path: 'Analytics',
    loadChildren: () => import('./analytics/analytics.module').then(m => m.AnalyticsModule)
  },
  {
    path: 'WatchoOffersAndPlans',
    loadChildren: () => import('./offers-and-plans/offers-and-plans.module').then(m => m.OffersAndPlansModule)
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
