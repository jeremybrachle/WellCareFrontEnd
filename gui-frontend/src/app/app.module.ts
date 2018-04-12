import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { ProfileComponent } from './profile/profile.component';
import { HippaComponent } from './hippa/hippa.component';
import { FooterComponent } from './footer/footer.component';
import { SettingsComponent } from './settings/settings.component';
import { ManageAppointmentsComponent } from './manage-appointments/manage-appointments.component';
import { PatientAddAppointmentComponent } from './patient-add-appointment/patient-add-appointment.component';


@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    ProfileComponent,
    HippaComponent,
    FooterComponent,
    SettingsComponent,
    ManageAppointmentsComponent,
    PatientAddAppointmentComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
