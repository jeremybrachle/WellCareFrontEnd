import { Component, OnInit, Input, Directive } from '@angular/core';
import { User, Doctor, Patient} from '../_models/index';
// import { AppModule } from '../app.module';
import { Router } from '@angular/router';

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
  public myDocsCard: boolean;

  constructor(private router: Router) {
    this.imagePath = '../../assets/images/smu_logo.png';
    console.log('profile constructor!');
    this.myDocsCard = false;
  }

  ngOnInit() {
    console.log(JSON.parse(localStorage.getItem('currentUser')));
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.userImage = this.user.profPic;
    this.icon = 'pencil';
  }

  public logout() {
    console.log('woo');
    this.router.navigateByUrl('');
  }
  showMyDocs() {
    this.myDocsCard = true;
  }
}




