import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OffersAndPlansRoutingModule } from './offers-and-plans-routing.module';
import { Zee5Component } from './zee5/zee5.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AppModule } from '../app.module';
import { ChartsModule } from 'ng2-charts';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HelpersModule } from '../helpers/helpers.module';
import { SonyLivComponent } from './sony-liv/sony-liv.component';
import { KlikkComponent } from './klikk/klikk.component';

@NgModule({
  declarations: [
    Zee5Component,
    SonyLivComponent,
    KlikkComponent
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
