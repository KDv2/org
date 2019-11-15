import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ShowIncidencePopupPage } from './show-incidence-popup.page';

const routes: Routes = [
  {
    path: '',
    component: ShowIncidencePopupPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ShowIncidencePopupPage]
})
export class ShowIncidencePopupPageModule {}
