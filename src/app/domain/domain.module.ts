import { ProfileComponent } from './../identification/profile/profile.component';
import { LoginUser } from './login-user.service';
import { User } from './models/user';



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
    LoginUser
  ]
})

export class DomainModule {  }
