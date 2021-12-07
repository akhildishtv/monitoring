import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { ChannelsComponent } from './channels/channels.component';
import { ProgramsComponent } from './programs/programs.component';
import { LanguagesComponent } from './languages/languages.component';
import { NgxSpinnerModule } from 'ngx-spinner';


@NgModule({
  declarations: [ChannelsComponent, ProgramsComponent, LanguagesComponent],
  imports: [
    CommonModule,
    NgxSpinnerModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
