import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ChartsModule } from 'ng2-charts';
import { ChannelsComponent } from './analytics/channels/channels.component';
import { LanguagesComponent } from './analytics/languages/languages.component';
import { ProgramsComponent } from './analytics/programs/programs.component';
import { PlayerComponent } from './watcho/player/player.component';
import { WebSeriesComponent } from './watcho/web-series/web-series.component';

@NgModule({
  declarations: [ChannelsComponent, ProgramsComponent, LanguagesComponent, PlayerComponent, WebSeriesComponent],
  imports: [
    CommonModule,
    NgxSpinnerModule,
    DashboardRoutingModule,
    ChartsModule,
  ]
})
export class DashboardModule { }
