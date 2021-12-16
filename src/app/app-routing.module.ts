import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthService } from '../app/services/auth-guards';
import { ChannelsComponent } from './analytics/channels/channels.component';
import { LanguagesComponent } from './analytics/languages/languages.component';
import { LocationsComponent } from './analytics/locations/locations.component';
import { ProgramsComponent } from './analytics/programs/programs.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { ActiveSubscriptionComponent } from './watcho/active-subscription/active-subscription.component';
import { KalturaLoginComponent } from './watcho/kaltura-login/kaltura-login.component';
import { PlayerComponent } from './watcho/player/player.component';
import { WebSeriesComponent } from './watcho/web-series/web-series.component';

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
    path: 'channels',
    canActivate: [AuthService],
    component: ChannelsComponent
  },
  {
    path: 'programs',
    canActivate: [AuthService],
    component: ProgramsComponent
  },
  {
    path: 'languages',
    canActivate: [AuthService],
    component: LanguagesComponent
  },
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
    path: 'dashboard',
    canActivate: [AuthService],
    component: DashboardComponent,
  },
  {
    path: 'locations',
    canActivate: [AuthService],
    component: LocationsComponent,
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
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
