import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// used to create fake backend
import { fakeBackendProvider } from './_helpers/index';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';

import { AlertComponent } from './_directives/index';
import { AuthenticationGuard } from './_guards/index';
import { JwtInterceptor } from './_helpers/index';
import { AlertService, AuthenticationService, UserService } from './_services/index';
import { HomeComponent } from './_home/index';
import { LoginComponent } from './_login/index';
import { RegisterComponent } from './_register/index';
import { DocProfileComponent } from './_doc-profile/profile.component';
import { AppRouting } from './app.routing';
import { RatingsComponent } from './_ratings/ratings.component';
import { DocReviewsComponent } from './_doc-reviews/doc-reviews.component';
import { DocApptsComponent } from './_doc-appts/doc-appts.component';
import { ApptPipe } from './_doc-appts/appt-pipe.pipe';
import { PatientProfileComponent } from './-patient-profile/-patient-profile.component';
import { PatientAppointmentsComponent } from './-patient-appointments/-patient-appointments.component';
import { PatientAddAppointmentComponent } from './patient-add-appointment/patient-add-appointment.component';


@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        HttpModule,
        RouterModule,
        AppRouting
    ],
    declarations: [
        AppComponent,
        AlertComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent,
        DocProfileComponent,
        RatingsComponent,
        DocReviewsComponent,
        DocApptsComponent,
        ApptPipe,
        PatientProfileComponent,
        PatientAppointmentsComponent,
        PatientAddAppointmentComponent
    ],
    providers: [
        AuthenticationGuard,
        AlertService,
        AuthenticationService,
        UserService,
        UserService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: JwtInterceptor,
            multi: true
        },

        // provider used to create fake backend
        fakeBackendProvider
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }

