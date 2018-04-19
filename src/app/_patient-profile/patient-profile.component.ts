import { Component, OnInit, Input, Directive } from '@angular/core';
import { User, Doctor, Patient} from '../_models/index';
// import { AppModule } from '../app.module';


@Component({
  selector: 'app-patient-profile',
  templateUrl: './patient-profile.component.html',
  styleUrls: ['./patient-profile.component.css']
})
export class PatientProfileComponent implements OnInit {
  @Input()
  public user: Patient;
  public imagePath: string;
  public userImage: string;
  public comment: string;
  public icon: string;

  constructor() {
    this.imagePath = '../../assets/images/smu_logo.png';
    console.log('profile constructor!');
  }

  ngOnInit() {
    console.log(JSON.parse(localStorage.getItem('currentUser')));
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.userImage = this.user.profPic;
    this.icon = 'pencil';
  }

  public logout() {
    console.log('woo');
  }
}




