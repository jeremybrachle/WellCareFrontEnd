import { Routes, RouterModule } from '@angular/router';
import {NgModule} from '@angular/core';
import { HomeComponent } from './_home/index';
import { LoginComponent } from './_login/index';
import { RegisterComponent } from './_register/index';
import { AuthenticationGuard } from './_guards/index';
import { ProfileComponent} from './_profile/index';
import { AppComponent } from './app.component';

const appRoutes: Routes = [
    { path: '', component: AppComponent},
    { path: '_login', component: LoginComponent},
    { path: '_register', component: RegisterComponent},
    { path: '_profile', component: ProfileComponent, canActivate: [AuthenticationGuard]},
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(appRoutes, {enableTracing: true })]// <-- debugging purposes only)]
})

export class AppRouting {}


