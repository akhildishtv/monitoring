import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// MDB Angular Free
import { CheckboxModule, WavesModule, ButtonsModule, InputsModule, IconsModule, CardsModule } from 'angular-bootstrap-md'
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FooterComponent } from './helpers/footer/footer.component';
import { HeaderComponent } from './helpers/header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { SidebarComponent } from './helpers/sidebar/sidebar.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ChartsModule } from 'ng2-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { WatchoModule } from './watcho/watcho.module';
import { AnalyticsModule } from './analytics/analytics.module';
import { OffersAndPlansModule } from './offers-and-plans/offers-and-plans.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    FooterComponent,
    HeaderComponent,
    SidebarComponent, 
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
    MDBBootstrapModule.forRoot(),
  ],
  exports:[HeaderComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
