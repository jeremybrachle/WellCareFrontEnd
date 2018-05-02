import { Component, OnInit, Input, Directive } from '@angular/core';
import { User, Doctor, Patient} from '../_models/index';
// import { AppModule } from '../app.module';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { UserService } from '../_services/user.service';

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
  public myDocs: Doctor[];


  constructor(private router: Router,
    // make an http client object for calling http requests
    protected httpClient: HttpClient,
    private userService: UserService
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
    console.log(this.user.appointments.length);
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
    console.log('in the patient profile showMyDocs() fxn')
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
    this.myDocs = [];
    console.log(this.user.appointments);
    console.log(this.user.appointments.length);
    for (let k = 0; k < this.user.appointments.length; k++) {
      console.log('in for loop for iterating through this users appts');
      this.userService.getBasicDocByUsername(this.user.appointments[k].doctor.username).subscribe(
        doc => {
          console.log('this current doc obj being iterated over: ' + doc);
          this.myDocs.push(doc);
        },
        error => {
          console.log('getDocByUsername fxn error in for loop error of patient profile ts');
        },
        () => {
          console.log(this.myDocs);
        }
      );
    }
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




