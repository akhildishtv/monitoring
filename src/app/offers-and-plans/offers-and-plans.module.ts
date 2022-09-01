import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OffersAndPlansRoutingModule } from './offers-and-plans-routing.module';
import { Zee5Component } from './zee5/zee5.component';


@NgModule({
  declarations: [Zee5Component],
  imports: [
    CommonModule,
    OffersAndPlansRoutingModule
  ]
})
export class OffersAndPlansModule { }
