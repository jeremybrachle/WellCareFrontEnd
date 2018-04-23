import { LoginUser } from './domain/login-user.service';

// modules:
import { IdentificationModule } from './identification/identification.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';



// components:
import { AppComponent } from './app.component';
import { LoginComponent } from './identification/login/login.component';
import { ProfileComponent } from './identification/profile/profile.component';


const defaultRoute = 'login';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      { path: '', redirectTo: defaultRoute, pathMatch: 'full' }
    ]),
    FormsModule,
    IdentificationModule,
    HttpClientModule,
    HttpClientJsonpModule
  ],
  providers: [
    LoginUser
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
