import { Component, OnInit, Input, Directive } from '@angular/core';
import { User, Doctor, Patient} from '../_models/index';
// import { AppModule } from '../app.module';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';


@Component({
  selector: 'app-patient-profile',
  templateUrl: './patient-profile.component.html',
  styleUrls: ['./patient-profile.component.css']
})
export class PatientProfileComponent implements OnInit {
  
  
  // make a patient object
  public myPatient: Patient;
  
  
  @Input()
  public user: Patient;
  public imagePath: string;
  public userImage: string;
  public comment: string;
  public icon: string;
  public docsTabPane: boolean;
  public infoTabPane: boolean;
  public scripsTabPane: boolean;
  public docNotesTabPane: boolean;
  public notifsTabPane: boolean;
  public docNotesClass: string;
  public notifsClass: string;
  public docsClass: string;
  public infoClass: string;
  public scripsClass: string;


  constructor(private router: Router,
    // make an http client object for calling http requests
    protected httpClient: HttpClient
) {
  // this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.imagePath = '../../assets/images/smu_logo2.png';
    console.log('profile constructor!');
    this.docsTabPane = false;
    this.infoTabPane = true;
    this.scripsTabPane = false;
    this.docNotesTabPane = false;
    this.notifsTabPane = false;
  }

// http options with headers
protected httpOptions  = {
  headers: new HttpHeaders({
    'Content-Type' : 'application/json'
  })
};

  ngOnInit() {
    console.log(JSON.parse(localStorage.getItem('currentUser')));
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    console.log(this.user.firstName);
    this.userImage = this.user.profPic;
    this.icon = 'pencil';
    this.infoClass = 'btn nav-link activeTab';
    this.docsClass = 'btn nav-link inactiveTab';
    this.scripsClass = 'btn nav-link inactiveTab';
    this.notifsClass = 'btn nav-link inactiveTab';
    this.docNotesClass = 'btn nav-link inactiveTab';
    // this.user = JSON.parse(localStorage.getItem('currentUser'));



  }

  public logout() {
    console.log('woo');
    this.router.navigateByUrl('');
  }
  showMyDocs() {
    this.docsClass = 'btn nav-link activeTab';
    this.infoClass = 'btn nav-link inactiveTab';
    this.scripsClass = 'btn nav-link inactiveTab';
    this.notifsClass = 'btn nav-link inactiveTab';
    this.docNotesClass = 'btn nav-link inactiveTab';
    this.docsTabPane = true;
    this.infoTabPane = false;
    this.scripsTabPane = false;
    this.docNotesTabPane = false;
    this.notifsTabPane = false;
  }
  showMyScrips() {
    this.docsClass = 'btn nav-link inactiveTab';
    this.infoClass = 'btn nav-link inactiveTab';
    this.scripsClass = 'btn nav-link activeTab';
    this.notifsClass = 'btn nav-link inactiveTab';
    this.docNotesClass = 'btn nav-link inactiveTab';
    this.notifsTabPane = false;
    this.docsTabPane = false;
    this.infoTabPane = false;
    this.scripsTabPane = true;
    this.docNotesTabPane = false;
  }
  showMyInfo() {

    this.docsClass = 'btn nav-link inactiveTab';
    this.infoClass = 'btn nav-link activeTab';
    this.scripsClass = 'btn nav-link inactiveTab';
    this.notifsClass = 'btn nav-link inactiveTab';
    this.docNotesClass = 'btn nav-link inactiveTab';
    this.notifsTabPane = false;
    this.docsTabPane = false;
    this.infoTabPane = true;
    this.scripsTabPane = false;
    this.docNotesTabPane = false;

  }
  showMyDocNotes() {
    this.docsClass = 'btn nav-link inactiveTab';
    this.infoClass = 'btn nav-link inactiveTab';
    this.scripsClass = 'btn nav-link inactiveTab';
    this.notifsClass = 'btn nav-link inactiveTab';
    this.docNotesClass = 'btn nav-link activeTab';
    this.notifsTabPane = false;
    this.docsTabPane = false;
    this.infoTabPane = false;
    this.scripsTabPane = false;
    this.docNotesTabPane = true;
  }
  showMyNotifs() {
    this.docsClass = 'btn nav-link inactiveTab';
    this.infoClass = 'btn nav-link inactiveTab';
    this.scripsClass = 'btn nav-link inactiveTab';
    this.notifsClass = 'btn nav-link activeTab';
    this.docNotesClass = 'btn nav-link inactiveTab';
    this.notifsTabPane = true;
    this.docsTabPane = false;
    this.infoTabPane = false;
    this.scripsTabPane = false;
    this.docNotesTabPane = false;
    this.updateNotifs();
  }
  updateNotifs() {
    for (let k = 0; k < this.user.notifications.length; k++) {
      this.user.notifications[k].beenDisplayed = true;
    }
  }
}




