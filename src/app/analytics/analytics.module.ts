import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnalyticsRoutingModule } from './analytics-routing.module';
import { ChannelsComponent } from './channels/channels.component';
import { LanguagesComponent } from './languages/languages.component';
import { LocationsComponent } from './locations/locations.component';
import { ProgramsComponent } from './programs/programs.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AppModule } from '../app.module';
import { ChartsModule } from 'ng2-charts';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    ChannelsComponent, 
    ProgramsComponent, 
    LanguagesComponent,
    LocationsComponent
  ],
  imports: [
    CommonModule,
    AppModule,
    AnalyticsRoutingModule,
    NgxSpinnerModule,
    AppModule,
    // MDBBootstrapModule.forRoot(),
    ChartsModule,
    ReactiveFormsModule,
  ]
})
export class AnalyticsModule { }
