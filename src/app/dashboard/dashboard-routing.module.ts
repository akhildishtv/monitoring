import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChannelsComponent } from './channels/channels.component';
import { LanguagesComponent } from './languages/languages.component';
import { ProgramsComponent } from './programs/programs.component';

const routes: Routes = [
  {
    path: 'channels',
    component: ChannelsComponent
  },
  {
    path: 'programs',
    component: ProgramsComponent
  },
  {
    path: 'languages',
    component: LanguagesComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
