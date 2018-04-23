import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { Directive, Input, OnInit, ElementRef, Renderer2 } from '@angular/core';

import * as octicons from 'octicons';
// used to create fake backend
import { fakeBackendProvider } from './_helpers/index';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';

import { AlertComponent } from './_directives/index';
import { AuthenticationGuard } from './_guards/index';
import { JwtInterceptor } from './_helpers/index';
import { AlertService, AuthenticationService, UserService } from './_services/index';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './_login/index';
import { RegisterComponent } from './_register/index';
import { DocProfileComponent } from './_doc-profile/profile.component';
import { AppRouting } from './app.routing';
import { RatingsComponent } from './_ratings/ratings.component';
import { DocReviewsComponent } from './_doc-reviews/doc-reviews.component';
import { DocApptsComponent } from './_doc-appts/doc-appts.component';
import { ApptPipe } from './_doc-appts/appt-pipe.pipe';
import { PatientProfileComponent } from './_patient-profile/patient-profile.component';
import { DocSettingsComponent } from './_doc-settings/doc-settings.component';
import { FooterComponent } from './_footer/footer.component';
import { OcticonDirective } from './_patient-profile/octicon.directive';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { DemoUtilsModule } from '../../demo-utils/module';
import { PatientAppointmentsComponent } from './_patient-appts/patient-appts.component';
import { ForgotComponent } from './forgot/forgot.component';
import { PatientSettingsComponent } from './_patient-settings/patient-settings.component';
import { MyDoctorsComponent } from './_my-doctors/my-doctors.component';
import { ModalModule } from 'ngx-bootstrap';
import { BsModalService } from 'ngx-bootstrap/modal';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        HttpModule,
        RouterModule,
        AppRouting,
        BrowserAnimationsModule,
        NgbModalModule.forRoot(),
        DemoUtilsModule,
        ModalModule.forRoot()
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
        FooterComponent,
        OcticonDirective,
        PatientAppointmentsComponent,
        ForgotComponent,
        DocSettingsComponent,
        PatientSettingsComponent,
        MyDoctorsComponent
    ],
    providers: [
        AuthenticationGuard,
        AlertService,
        AuthenticationService,
        UserService,
        BsModalService,
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
