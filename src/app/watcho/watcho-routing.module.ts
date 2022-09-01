import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthService } from '../services/auth-guards';
import { ActiveSubscriptionComponent } from './active-subscription/active-subscription.component';
import { KalturaLoginComponent } from './kaltura-login/kaltura-login.component';
import { PlayerComponent } from './player/player.component';
import { WebSeriesComponent } from './web-series/web-series.component';

const routes: Routes = [
  {
    path: 'videoPlayer',
    canActivate: [AuthService],
    component: PlayerComponent
  },
  {
    path: 'webSeries',
    canActivate: [AuthService],
    component: WebSeriesComponent
  },
  {
    path: 'activeSubscriptions',
    canActivate: [AuthService],
    component: ActiveSubscriptionComponent,
  },
  {
    path: 'kalturaLogin',
    canActivate: [AuthService],
    component: KalturaLoginComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WatchoRoutingModule { }
