
import { Component, OnInit, NgModule } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService, AuthenticationService, UserService } from '../_services/index';
import { User, Doctor, Patient } from '../_models/index';
import { Location } from '@angular/common';

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
      private authenticationService: AuthenticationService,
      private alertService: AlertService,
      private userService: UserService
    ) {}

    ngOnInit() {
          // reset login status
          this.count = 0;
          this.displayHelp = false;
          this.authenticationService.logout();
          this.alertMsg = '';
          // get return url from route parameters or default to '/'
          this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
          let allDocs = this.authenticationService.getAllDocs();
          allDocs = JSON.parse(localStorage.getItem('currentDocs'));
          console.log(allDocs);
          this.smuPic = '../../assets/images/happy.jpg';
    }

    // loginDoc() {
    //       this.count++;
    //       this.loading = true;
    //       this.authenticationService.loginDoc(this.model, )
    //           .subscribe(
    //               data => {
    //                 this.count = 0;
    //                 this.alertMsg = '';
    //                 this.router.navigate(['_doc-profile'], { queryParams: this.model});
    //               },
    //               error => {
    //                   if (this.count > 3) {
    //                     this.kickedOut();
    //                   }
    //                   this.alertMsg = 'Username or password incorrect!';
    //                   this.loading = false;
    //               });
    // }

    login() {
      this.count++;
      this.loading = true;
      this.authenticationService.login(this.model.username, this.model.password)
          .subscribe(
              data => {

                if (data === -1) {
                  this.alertMsg = 'Username or password incorrect!';
                  if (this.count > 3) {
                    this.kickedOut();
                  }
                  this.loading = false;
                } else if (data === 1) {
                  this.count = 0;
                  this.alertMsg = '';
                  // this.doc = this.userService.getDocByUsername(this.model.username);
                  // this.makeDoctor();
                } else if (data === 0) {
                  this.count = 0;
                  this.alertMsg = '';
                  this.makePatient();
                }

              },
              error => {
                  this.alertMsg = 'Im scared why did the program enter this error block';
                  this.loading = false;
              });
    }

    makePatient() {
      this.userService.getBasicPatientByUsername(this.model.username).subscribe(
        patient => {
          this.patient = patient;
        },
        () => {
          this.userService.getPatientDocNotes(this.model.username).subscribe(
            myDocNotes => {
              this.patient.docNotes = myDocNotes;
            },
            error => {
              console.log('getPatientDocNotes error');
              this.loading = false;
            },
            () => {
              this.userService.getPatientNotifs(this.model.username).subscribe(
                notifs => {
                  this.patient.notifications = notifs;
                },
                error => {
                  console.log('getPatientNotifs error');
                  this.loading = false;
                },
                () => {
                  this.userService.getPatientScrips(this.model.username).subscribe(
                    scrips => {
                      this.patient.scrips = scrips;
                    },
                    error => {
                      console.log('getPatientScrips error');
                      this.loading = false;
                    },
                    () => {
                      this.userService.getPatientAppts(this.model.username).subscribe(
                        appts => {
                          this.patient.appointments = appts;
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

    makeDoctor() {
      // this.userService.getBasicPatientByUsername(this.model.username).subscribe(
      //   patient => {
      //     this.patient = patient;
      //   },
      //   () => {
      //     this.userService.getPatientDocNotes(this.model.username).subscribe(
      //       myDocNotes => {
      //         this.patient.docNotes = myDocNotes;
      //       },
      //       () => {
      //         this.userService.getPatientNotifs(this.model.username).subscribe(
      //           notifs => {
      //             this.patient.notifications = notifs;
      //           },
      //           () => {
      //             this.userService.getPatientScrips(this.model.username).subscribe(
      //               scrips => {
      //                 this.patient.scrips = scrips;
      //               },
      //               () => {
      //                 this.userService.getPatientAppts(this.model.username).subscribe(
      //                   appts => {
      //                     this.patient.appointments = appts;
      //                   },
      //                   () => {
      //                     localStorage.setItem('currentUser', JSON.stringify(this.patient));
      //                     this.router.navigate(['_patient-profile'], { queryParams: this.patient} );
      //                   }
      //                 );
      //               }
      //             );
      //           }
      //         );
      //       }
      //     );
      //   }
      // );
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

