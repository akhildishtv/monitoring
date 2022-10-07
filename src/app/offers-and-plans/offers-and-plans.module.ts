import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OffersAndPlansRoutingModule } from './offers-and-plans-routing.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AppModule } from '../app.module';
import { ChartsModule } from 'ng2-charts';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HelpersModule } from '../helpers/helpers.module';
import { GetSubscriptionWithoutLoginComponent } from './IT APIs/get-subscription-without-login/get-subscription-without-login.component';
import { GetSubscriptionWithLoginComponent } from './IT APIs/get-subscription-with-login/get-subscription-with-login.component';
import { GetPrepaidBalanceComponent } from './IT APIs/get-prepaid-balance/get-prepaid-balance.component';
import { GetSubscriptionHistroyComponent } from './IT APIs/get-subscription-histroy/get-subscription-histroy.component';
import { KlikkComponent } from './CP APIs/klikk/klikk.component';
import { SonyLivComponent } from './CP APIs/sony-liv/sony-liv.component';
import { Zee5Component } from './CP APIs/zee5/zee5.component';

@NgModule({
  declarations: [
    Zee5Component,
    SonyLivComponent,
    KlikkComponent,
    GetSubscriptionWithoutLoginComponent,
    GetSubscriptionWithLoginComponent,
    GetPrepaidBalanceComponent,
    GetSubscriptionHistroyComponent
  ],
  imports: [
    CommonModule ,
    OffersAndPlansRoutingModule,
    NgxSpinnerModule,
    ChartsModule,
    ReactiveFormsModule,
    HelpersModule
  ],
})
export class OffersAndPlansModule { }
