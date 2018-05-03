import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Component, OnInit, NgModule } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService, AuthenticationService, UserService } from '../_services/index';
import { User, Doctor, Patient } from '../_models/index';
import { Location } from '@angular/common';

// @Component({
//     selector: 'app-login',
//     moduleId: module.id,
//     templateUrl: 'login.component.html',
//     styleUrls: ['login.component.css', 'util.css']
// })

// export class LoginComponent implements OnInit {
//     public model: any = {};
//     public loading = false;
//     public returnUrl: string;
//     public sampleDoc: Doctor;
//     public samplePatient: Patient;
//     public displayHelp: boolean;
//     public str1: '#pwdModal';
//     public str2: 'modal';
//     public alertMsg: string;
//     public count: number;
//     constructor(
//       private route: ActivatedRoute,
//       private router: Router,
//       private authenticationService: AuthenticationService,
//       private alertService: AlertService,
//       protected httpClient: HttpClient
//     ) {}


//     // http options with headers
//   protected httpOptions  = {
//     headers: new HttpHeaders({
//       'Content-Type' : 'application/json'
//     })
//   };



//     ngOnInit() {
//           // reset login status
//           this.count = 0;
//           this.displayHelp = false;
//           this.authenticationService.logout();
//           this.alertMsg = '';
//           // get return url from route parameters or default to '/'
//           this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
//           // let allDocs = this.authenticationService.getAllDocs();
//           // allDocs = JSON.parse(localStorage.getItem('currentDocs'));
//           // console.log(allDocs);
//     }

//     login() {


//       this.authenticationService.login(this.model.username, this.model.password)
//           .subscribe(
//               data => {
//                   // this.count = 0;
//                   // this.alertMsg = '';
//                   // this.router.navigate(['_doc-profile'], { queryParams: this.model});
//                   if (data == 1) {
//                     console.log('user is a doctor');
//                     //RIGHT HERE
                    
//                     this.router.navigate(['/_doc-profile']);
//                   }
//                   else if (data == 0)
//                   {
//                     console.log('user is a patient');
//                     //RIGHT HERE
//                     // this.authenticationService.getPatientById(this.model.username);
//                     this.httpClient.post('http://0.0.0.0:5000/_patient-profile', {'patient_id': this.model.username}, this.httpOptions)
//                     .subscribe(curr_user => {
//                         localStorage.setItem('currentUser', JSON.stringify(curr_user));
//                     });
//                     localStorage.setItem('daUser', JSON.stringify("heyyoasdfboefbnwiefb"));
//                     console.log(this.model);
//                     // this.authenticationService.loginPatient(this.model);
//                     this.router.navigate(['/_patient-profile']);
//                   }
//                   else if (data == -1) {
//                     console.log('incorrect password');
//                   }
//                   else {
//                     console.log('unknown error');
//                   }
//               },
//               error => {
//                   this.alertMsg = 'Username or password incorrect!';
//                   console.log(error);
//                   /*
//                   if (this.count > 3) {
//                     this.kickedOut();
//                   }
//                   this.loading = false;
//                   */
//               });

//           /*
//           this.count++;
//           this.loading = true;
//           this.authenticationService.loginDoc(this.model, )
//               .subscribe(
//                   data => {
//                     this.count = 0;
//                     this.alertMsg = '';
//                     this.router.navigate(['_doc-profile'], { queryParams: this.model});
//                   },
//                   error => {
//                       if (this.count > 3) {
//                         this.kickedOut();
//                       }
//                       this.alertMsg = 'Username or password incorrect!';
//                       this.loading = false;
//                   });
//                   */

//     }

//     loginPatient() {
//       this.count++;
//       this.loading = true;
//       this.authenticationService.loginPatient(this.model)
//           .subscribe(
//               data => {
//                   this.count = 0;
//                   this.alertMsg = '';
//                   this.router.navigate(['_patient-profile'], { queryParams: this.model});
//               },
//               error => {
//                   this.alertMsg = 'Username or password incorrect!';
//                   if (this.count > 3) {
//                     this.kickedOut();
//                   }
//                   this.loading = false;
//               });
//     }

//     forgot() {
//       this.displayHelp = true;
//       console.log(this.displayHelp);
//     }

//     kickedOut() {
//       const kicked = {
//         'kickedOut' : true
//       };
//       this.router.navigate(['/'], { queryParams: kicked});
//     }
// }

@Component({
    selector: 'app-login',
    moduleId: module.id,
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.css', 'util.css']
})

export class LoginComponent implements OnInit {
    public model: any = {};
    public doc: Doctor;
    public patient: Patient;
    public isDoc: number;
    public loading = false;
    public returnUrl: string;
    // public sampleDoc: Doctor;
    // public samplePatient: Patient;
    public displayHelp: boolean;
    public str1: '#pwdModal';
    public str2: 'modal';
    public alertMsg: string;
    public count: number;
    public smuPic: string;
    constructor(
      private route: ActivatedRoute,
      private router: Router,
      public authenticationService: AuthenticationService,
      private alertService: AlertService,
      public userService: UserService,
      private http: HttpClient
    ) {}
        // http options with headers
    protected httpOptions  = {
      headers: new HttpHeaders({
        'Content-Type' : 'application/json'
      })
    };
    protected endPoint = 'http://0.0.0.0:5000';
    ngOnInit() {
          // reset login status
          console.log('login ngOnInit');
          this.count = 0;
          this.displayHelp = false;
          // this.authenticationService.logout();
          this.alertMsg = '';
          // get return url from route parameters or default to '/'
          this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
          // let allDocs = this.authenticationService.getAllDocs();
          // allDocs = JSON.parse(localStorage.getItem('currentDocs'));
          // console.log(allDocs);
          this.smuPic = '../../assets/images/happy.jpg';
    }
    login() {
      this.count++;
      this.loading = true;
      this.authenticationService.login(this.model.username, this.model.password)
          .subscribe(
              data => {

                if (data == -1) {
                  this.alertMsg = 'Username or password incorrect!';
                  if (this.count > 3) {
                    this.kickedOut();
                  }
                  this.loading = false;
                } else if (data == 1) {
                  this.count = 0;
                  this.alertMsg = '';
                  this.populateDoctor();
                } else if (data == 0) {
                  console.log('its a patient');
                  this.count = 0;
                  this.alertMsg = '';
                  this.populatePatient();
                }

              },
              error => {
                  this.alertMsg = 'Im scared why did the program enter this error block';
                  this.loading = false;
              });
    }

    populatePatient() {
      this.userService.getBasicPatientByUsername(this.model.username).subscribe(
        patient => {
          // console.log(patient);
          this.patient = patient;
          console.log(this.patient);
          // console.log(this.patient.patient_id);

        },
        error => {
          console.log(this.patient);
        },
        () => {
          // console.log(this.patient.patient_id);
          this.userService.getPatientDocNotes(this.patient.patient_id).subscribe(
            myDocNotes => {
              // console.log(myDocNotes);
              this.patient.docNotes = myDocNotes;
              console.log(this.patient.docNotes);

            },
            error => {
              console.log('getPatientDocNotes error');
              this.loading = false;
            },
            () => {
              console.log(this.patient.patient_id);
              this.userService.getPatientNotifs(this.patient.patient_id).subscribe(
                notifs => {
                  this.patient.notifications = notifs;
                },
                error => {
                  console.log('getPatientNotifs error');
                  this.loading = false;
                },
                () => {
                  console.log(this.patient.patient_id);
                  this.userService.getPatientScrips(this.patient.patient_id).subscribe(
                    scrips => {
                      console.log(scrips);
                      this.patient.scrips = scrips;
                      console.log(this.patient.scrips);

                    },
                    error => {
                      console.log('getPatientScrips error');
                      this.loading = false;
                    },
                    () => {
                      console.log(this.patient.patient_id);
                      this.userService.getPatientAppts(this.patient.patient_id).subscribe(
                        appts => {
                          console.log(appts);
                          this.patient.appointments = appts;
                          console.log(this.patient.appointments);

                        },
                        error => {
                          console.log('getPatientAppts error');
                          this.loading = false;
                        },
                        () => {
                          localStorage.setItem('currentUser', JSON.stringify(this.patient));
                          this.router.navigate(['_patient-profile'], { queryParams: this.patient} );
                        }
                      );
                    }
                  );
                }
              );
            }
          );
        }
      );
    }

    populateDoctor() {
      this.userService.getBasicDocByUsername(this.model.username).subscribe(
        doc => {
          console.log(doc);
          this.doc = doc;
          console.log(this.doc);
          console.log(this.doc.doc_id);

        },
        error => {
          console.log(this.doc);
        },
        () => {
          console.log(this.doc.doc_id);
          this.userService.getDocsNotesForPatients(this.doc.doc_id).subscribe(
            myDocNotes => {
              console.log(myDocNotes);
              this.doc.notesForPatient = myDocNotes;
              console.log(this.doc.notesForPatient);

            },
            error => {
              console.log('getDocsNotesForPatients error');
              this.loading = false;
            },
            () => {
              console.log(this.doc.doc_id);
              this.userService.getDocNotifs(this.doc.doc_id).subscribe(
                notifs => {
                  this.doc.notifications = notifs;
                },
                error => {
                  console.log('getDocNotifs error');
                  this.loading = false;
                },
                () => {
                  console.log(this.doc.doc_id);
                  this.userService.getDocScrips(this.doc.doc_id).subscribe(
                    scrips => {
                      console.log(scrips);
                      this.doc.scrips = scrips;
                      console.log(this.doc.scrips);

                    },
                    error => {
                      console.log('getDocScrips error');
                      this.loading = false;
                    },
                    () => {
                      console.log(this.doc.doc_id);
                      this.userService.getDocAppts(this.doc.doc_id).subscribe(
                        appts => {
                          console.log(appts);
                          this.doc.appointments = appts;
                          console.log(this.doc.appointments);

                        },
                        error => {
                          console.log('getDocAppts error');
                          this.loading = false;
                        },
                        () => {
                          console.log(this.doc.doc_id);
                          this.userService.getDocReviews(this.doc.doc_id).subscribe(
                            reviews => {
                              console.log(reviews);
                              this.doc.reviews = reviews;
                              console.log(this.doc.reviews);
    
                            },
                            error => {
                              console.log('getDocReviews error');
                              this.loading = false;
                            },
                            () => {
                              console.log(this.doc);
                              localStorage.setItem('currentUser', JSON.stringify(this.doc));
                              this.router.navigate(['_doc-profile'], { queryParams: this.doc} );
                            }
                          );
                        }
                      );
                    }
                  );
                }
              );
            }
          );
        }
      );
    }

    forgot() {
      this.displayHelp = true;
      console.log(this.displayHelp);
    }

    kickedOut() {
      const kicked = {
        'kickedOut' : true
      };
      this.router.navigate(['/'], { queryParams: kicked});
    }
}



