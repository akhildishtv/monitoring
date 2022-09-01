import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthService } from '../services/auth-guards';
import { ChannelsComponent } from './channels/channels.component';
import { LanguagesComponent } from './languages/languages.component';
import { LocationsComponent } from './locations/locations.component';
import { ProgramsComponent } from './programs/programs.component';

const routes: Routes = [
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
    path: 'locations',
    canActivate: [AuthService],
    component: LocationsComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnalyticsRoutingModule { }
