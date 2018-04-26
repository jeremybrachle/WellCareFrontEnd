import { ProfileComponent } from './../identification/profile/profile.component';
import { LoginUser } from './login-user.service';
import { User } from './models/user';
import { Doctor } from './models/doctor';



import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [],
  exports: [
    User,
    Doctor,
    LoginUser
  ]
})

export class DomainModule {  }
