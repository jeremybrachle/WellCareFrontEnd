import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { User } from '../_models/user';
import { Patient } from '../_models/index';
import { Doctor } from './../_models/doctor';

@Component({
  selector: 'app-doc-settings',
  templateUrl: './doc-settings.component.html',
  styleUrls: ['./doc-settings.component.css']
})

export class DocSettingsComponent implements OnInit {
  @Input()
  public user: Patient;
  public oldPass: string;
  public newPass: string;
  public newPass2: string;
  public imagePath: string;
  constructor(private router: Router) {
    this.imagePath = '../../assets/images/smu_logo2.png';
   }

  ngOnInit() {
    this.user = {
      id: 0,
      gender: '',
      username: '',
      password: 'something',
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      emergency_contact: '',
      dob: new Date(Date.now()),
      profPic: ''
    };
    this.oldPass = '';
    this.newPass = '';
    this.newPass2 = '';
  }
  changePassword() {
    this.user.password = this.newPass2;
  }
  public logout() {
    console.log('woo');
    this.router.navigateByUrl('');
  }
  private navigateToProfile() {
    this.router.navigateByUrl('/_doc-profile');
  }

}




