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
  public docsTabPane: boolean;
  public infoTabPane: boolean;
  public scripsTabPane: boolean;
  public docsClass: string;
  public infoClass: string;
  public scripsClass: string;


  constructor(private router: Router) {
    this.imagePath = '../../assets/images/smu_logo2.png';
    console.log('profile constructor!');
    this.docsTabPane = false;
    this.infoTabPane = true;
    this.scripsTabPane = false;
  }

  ngOnInit() {
    console.log(JSON.parse(localStorage.getItem('currentUser')));
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.userImage = this.user.profPic;
    this.icon = 'pencil';
    this.infoClass = 'btn nav-link activeTab';
    this.docsClass = 'nav-link inactiveTab';
    this.scripsClass = 'nav-link inactiveTab';
  }

  public logout() {
    console.log('woo');
    this.router.navigateByUrl('');
  }
  showMyDocs() {
    this.docsClass = 'nav-link activeTab';
    this.infoClass = 'btn nav-link inactiveTab';
    this.scripsClass = 'nav-link inactiveTab';
    this.docsTabPane = true;
    this.infoTabPane = false;
    this.scripsTabPane = false;
  }
  showMyScrips() {
    this.docsClass = 'nav-link inactiveTab';
    this.infoClass = 'btn nav-link inactiveTab';
    this.scripsClass = 'nav-link activeTab';
    this.docsTabPane = false;
    this.infoTabPane = false;
    this.scripsTabPane = true;
  }
  showMyInfo() {
    this.docsClass = 'nav-link inactiveTab';
    this.infoClass = 'btn nav-link activeTab';
    this.scripsClass = 'nav-link inactiveTab';
    this.docsTabPane = false;
    this.infoTabPane = true;
    this.scripsTabPane = false;
  }
}




