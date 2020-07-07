import { AppointmentDetailPage } from '../appointment-detail/appointment-detail.page';
import { ReviewDetailsPage } from '../review-details/review-details.page';
import { DoctorPage } from './doctor.page';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';


const routes: Routes = [
  {
    path: '',
    component: DoctorPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DoctorPage, AppointmentDetailPage, ReviewDetailsPage],
  entryComponents: [AppointmentDetailPage, ReviewDetailsPage],
})
export class DoctorPageModule {}
