import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AddIncidencePopupPage } from './add-incidence-popup.page';

const routes: Routes = [
  {
    path: '',
    component: AddIncidencePopupPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AddIncidencePopupPage]
})
export class AddIncidencePopupPageModule {}
