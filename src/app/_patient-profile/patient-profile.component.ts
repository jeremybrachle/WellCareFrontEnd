import { Component, OnInit, Input, Directive } from '@angular/core';
import { User, Doctor, Patient, DoctorNote, Notification} from '../_models/index';
// import { AppModule } from '../app.module';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { UserService } from '../_services/user.service';
import { Prescription } from '../_models/scrip';
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
  public tempDoc: Doctor;
  public myScrips: Prescription[];
  public myDocNotes: DoctorNote[];
  public myNotifs: any= {};
  public alerts: Notification[];

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
    console.log(this.user.notifications);
    this.user.profPic = this.imagePath;
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
    this.myDocs = this.loadDocs();
  
  }

  loadDocs() {
    console.log(this.user.appointments);
    console.log(this.user.appointments.length);
    this.userService.getPatientsDocs(this.user.patient_id).subscribe(
      docs => {
        this.myDocs = docs;
        // console.log(docs);
      },
      error => {
        console.log('shoot, error getting the doctors for this patient');
        this.myDocs = [];
      },
      () => {
        console.log(this.myDocs);
        return this.myDocs;
      }
    );
    return this.myDocs;
  }

  
  showMyScrips() {
    console.log('in the patient profile showMyScripts() fxn');
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
    this.loadMyScrips();
  }

  loadMyScrips() {
    // console.log(this.user.scrips);
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
    console.log('in the patient profile showMyDocNotes() fxn');
    // this.myDocNotes = 
    console.log(this.user.docNotes[0]);

    console.log('after calling trying to load the user doc notes');
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
    // load the doctor notes
    this.myDocNotes = [];
    this.myDocNotes = this.loadDocNotes();
  }

  loadDocNotes() {
    this.userService.getPatientDocNotes(this.user.patient_id).subscribe(
      notes => {
        this.myDocNotes = notes;
      },
      error => {
        console.log('shoot, error getting the doctor notes for this patient');
        this.myDocNotes = [];
      },
      () => {
        console.log(this.myDocNotes);
        return this.myDocNotes;
      }
    );
    return this.myDocNotes;
  }

  showMyNotifs() {
    console.log('in the patient profile showMyNotifs() fxn');
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
    // this.updateNotifs();
    // load the notifications
    // this.myNotifications = [];
    // this.myNotifications = this.loadNotifications();
    this.alerts = [];
    this.myNotifs = [];
    this.myNotifs = this.loadAlerts();
    return this.myNotifs
  }

  loadAlerts() {
    this.userService.getPatientNotifs(this.user.patient_id).subscribe(
      notifications => {
        // this.user.notifications = notifications;
        console.log(notifications);
        this.myNotifs.push(notifications);
      },
      error => {
        console.log('shoot, error getting the doctor notifications for this patient');
        this.myNotifs = [];
      },
      () => {
        console.log(this.myNotifs);
        return this.myNotifs;
        // return this.alerts;
      }
    );
    console.log(this.myNotifs);
    // console.log(this.myNotifs[0].DocFirstName);
    return this.myNotifs;
  }

  format(date: string) {
    return date.slice(0,10);
  }


  updateNotifs() {
    for (let k = 0; k < this.user.notifications.length; k++) {
      this.user.notifications[k].beenDisplayed = true;
    }
  }

  // load the notfications
  /*
  loadNotifications() {
    // call the service for notifications
    this.userService.getPatientNotifs(this.user.patient_id).subscribe(
      notifs => {
        console.log(notifs);
        this.myNotifications = notifs;
      },
      error => {
        console.log('shoot, error getting the doctor notifications for this patient');
        this.myNotifications = [];
      },
      () => {
        console.log(this.myNotifications);
        return this.myNotifications;
      }
    );
    return this.myNotifications;
  }
  */



}




