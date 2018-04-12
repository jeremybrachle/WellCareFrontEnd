import { Doctor } from './../_models/doctor';
import { Component, OnInit, Input, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { User } from '../_models/user';
import { Patient } from '../_models/index';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  @Input()
  public user: Patient;
  public oldPass: string;
  public newPass: string;
  public newPass2: string;

  constructor() {
  }

  ngOnInit() {
    this.user = {
      id: 0,
      username: '',
      password: 'something',
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      emergency_contact: '',
      dob: new Date(Date.now())
    };
    this.oldPass = '';
    this.newPass = '';
    this.newPass2 = '';

  }

  changePassword() {
    this.user.password = this.newPass2;
  }

}
