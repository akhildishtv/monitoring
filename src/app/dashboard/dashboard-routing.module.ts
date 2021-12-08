import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChannelsComponent } from './analytics/channels/channels.component';
import { LanguagesComponent } from './analytics/languages/languages.component';
import { ProgramsComponent } from './analytics/programs/programs.component';
import { PlayerComponent } from './watcho/player/player.component';
import { WebSeriesComponent } from './watcho/web-series/web-series.component';


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
  {
    path: 'player',
    component: PlayerComponent
  },
  {
    path: 'webSeries',
    component: WebSeriesComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
