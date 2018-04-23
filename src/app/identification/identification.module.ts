import { ProfileComponent } from './profile/profile.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ID_ROUTES } from './identification-routes';
import { LoginComponent } from './login/login.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(ID_ROUTES)
  ],
  declarations: [
    ProfileComponent,
    LoginComponent
  ],
    exports: [
      ProfileComponent,
      LoginComponent
    ]
})
export class IdentificationModule { }
