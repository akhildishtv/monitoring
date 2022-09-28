import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WatchoRoutingModule } from './watcho-routing.module';
import { ActiveSubscriptionComponent } from './active-subscription/active-subscription.component';
import { KalturaLoginComponent } from './kaltura-login/kaltura-login.component';
import { PlayerComponent } from './player/player.component';
import { WebSeriesComponent } from './web-series/web-series.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AppModule } from '../app.module';
import { ChartsModule } from 'ng2-charts';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HelpersModule } from '../helpers/helpers.module';

@NgModule({
  declarations: [
    PlayerComponent, 
    WebSeriesComponent, 
    ActiveSubscriptionComponent, 
    KalturaLoginComponent
  ],
  imports: [
    CommonModule ,
    WatchoRoutingModule,
    NgxSpinnerModule,
    ChartsModule,
    ReactiveFormsModule,
    HelpersModule
  ]
})
export class WatchoModule { }
