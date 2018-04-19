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
import { HomeComponent } from './_home/index';
import { LoginComponent } from './_login/index';
import { RegisterComponent } from './_register/index';
import { DocProfileComponent } from './_doc-profile/profile.component';
import { AppRouting } from './app.routing';
import { RatingsComponent } from './_ratings/ratings.component';
import { DocReviewsComponent } from './_doc-reviews/doc-reviews.component';
import { DocApptsComponent } from './_doc-appts/doc-appts.component';
import { ApptPipe } from './_doc-appts/appt-pipe.pipe';
import { PatientProfileComponent } from './_patient-profile/patient-profile.component';
import { DocSettingsComponent } from './_settings/settings.component';
import { FooterComponent } from './_footer/footer.component';
import { OcticonDirective } from './_patient-profile/octicon.directive';
import { CalendarComponent } from './calendar/calendar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule } from 'angular-calendar';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { DemoUtilsModule } from '../../demo-utils/module';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        HttpModule,
        RouterModule,
        AppRouting,
        BrowserAnimationsModule,
        CalendarModule.forRoot(),
        NgbModalModule.forRoot(),
        DemoUtilsModule
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
        DocSettingsComponent,
        FooterComponent,
        OcticonDirective,
        CalendarComponent
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
