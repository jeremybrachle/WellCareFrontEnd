import { DocApptsComponent } from './_doc-appts/doc-appts.component';
import { Routes, RouterModule } from '@angular/router';
import {NgModule} from '@angular/core';
import { HomeComponent } from './_home/index';
import { LoginComponent } from './_login/index';
import { RegisterComponent } from './_register/index';
import { AuthenticationGuard } from './_guards/index';
import { DocProfileComponent} from './_doc-profile/index';
import { AppComponent } from './app.component';

const appRoutes: Routes = [
    { path: '', component: HomeComponent},
    { path: '_login', component: LoginComponent},
    { path: '_register', component: RegisterComponent},
    { path: '_doc-profile', component: DocProfileComponent, canActivate: [AuthenticationGuard]},
    { path: '_doc-profile/_doc-appts', component: DocApptsComponent},
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(appRoutes, {enableTracing: true })]// <-- debugging purposes only)]
})

export class AppRouting {}


