import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthService } from '../services/auth-guards';
import { KlikkComponent } from './klikk/klikk.component';
import { SonyLivComponent } from './sony-liv/sony-liv.component';
import { Zee5Component } from './zee5/zee5.component';

const routes: Routes = [
  {
    path: 'zee5',
    canActivate: [AuthService],
    component: Zee5Component
  },
  {
    path: 'sony',
    canActivate: [AuthService],
    component: SonyLivComponent
  },
  {
    path: 'klikk',
    canActivate: [AuthService],
    component: KlikkComponent
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OffersAndPlansRoutingModule { }
