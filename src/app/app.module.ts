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
import { ChannelsComponent } from './analytics/channels/channels.component';
import { LanguagesComponent } from './analytics/languages/languages.component';
import { ProgramsComponent } from './analytics/programs/programs.component';
import { PlayerComponent } from './watcho/player/player.component';
import { WebSeriesComponent } from './watcho/web-series/web-series.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    FooterComponent,
    HeaderComponent,
    SidebarComponent,
    ChannelsComponent, 
    ProgramsComponent, 
    LanguagesComponent, 
    PlayerComponent, 
    WebSeriesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    ChartsModule,
    HttpClientModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
    MDBBootstrapModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
