

import { SettingsComponent } from './settings/settings.component';
import { ProfileComponent } from './profile/profile.component';
import { PatientAddAppointmentComponent } from './patient-add-appointment/patient-add-appointment.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { ManageAppointmentsComponent } from './manage-appointments/manage-appointments.component';
import { HippaComponent } from './hippa/hippa.component';
import { FooterComponent } from './footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  } from '';


@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [FooterComponent, HippaComponent, ManageAppointmentsComponent,
     NavBarComponent, PatientAddAppointmentComponent, ProfileComponent, SettingsComponent],
    exports: [ FooterComponent, HippaComponent, ManageAppointmentsComponent, NavBarComponent,
    PatientAddAppointmentComponent, ProfileComponent, SettingsComponent]
})
export class WellCareModule { }
