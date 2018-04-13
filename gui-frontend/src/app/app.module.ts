import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { WellCareModule } from './WellCare/WellCare.module';

import { AppComponent } from './app.component';
import { NavBarComponent } from './WellCare/nav-bar/nav-bar.component';
import { ProfileComponent } from './WellCare/profile/profile.component';
import { HippaComponent } from './WellCare/hippa/hippa.component';
import { FooterComponent } from './WellCare/footer/footer.component';
import { SettingsComponent } from './WellCare/settings/settings.component';
import { ManageAppointmentsComponent } from './WellCare/manage-appointments/manage-appointments.component';
import { PatientAddAppointmentComponent } from './WellCare/patient-add-appointment/patient-add-appointment.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, FormsModule, WellCareModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
