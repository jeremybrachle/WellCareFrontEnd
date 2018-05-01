import { PatientProfileComponent } from './_patient-profile/patient-profile.component';
import { DocApptsComponent } from './_doc-appts/doc-appts.component';
import { Routes, RouterModule } from '@angular/router';
import {NgModule} from '@angular/core';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './_login/index';
import { RegisterComponent } from './_register/index';
import { AuthenticationGuard } from './_guards/index';
import { DocProfileComponent} from './_doc-profile/index';
import { AppComponent } from './app.component';
import { DocSettingsComponent } from './_doc-settings/doc-settings.component';
import { PatientAppointmentsComponent } from './_patient-appts/patient-appts.component';
import { ForgotComponent } from './forgot/forgot.component';
import { PatientSettingsComponent } from './_patient-settings/patient-settings.component';
import { RegisterDocComponent } from './register-doc/register-doc.component';
import { RegisterPatComponent } from './register-pat/register-pat.component';

const appRoutes: Routes = [
    { path: '', component: HomeComponent},
    { path: '_login', component: LoginComponent},
    { path: '_register', component: RegisterComponent},
    { path: '_doc-profile', component: DocProfileComponent},
    { path: '_doc-profile/_doc-appts', component: DocApptsComponent},
    { path: '_patient-profile/_patient-appts', component: PatientAppointmentsComponent},
    { path: '_patient-profile', component: PatientProfileComponent, canActivate: [AuthenticationGuard]},
    { path: '_loginHelp', component: ForgotComponent},
    { path: '_doc-profile/_doc-settings', component: DocSettingsComponent},
    { path: '_patient-profile/_patient-settings', component: PatientSettingsComponent},
    { path: '_register-doc', component: RegisterDocComponent},
    { path: '_register-pat', component: RegisterPatComponent}
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(appRoutes, {enableTracing: true })]// <-- debugging purposes only)]
})

export class AppRouting {}


