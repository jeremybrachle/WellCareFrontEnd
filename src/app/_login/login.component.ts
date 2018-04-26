import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Component, OnInit, NgModule } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService, AuthenticationService } from '../_services/index';
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
    public loading = false;
    public returnUrl: string;
    public sampleDoc: Doctor;
    public samplePatient: Patient;
    public displayHelp: boolean;
    public str1: '#pwdModal';
    public str2: 'modal';
    public alertMsg: string;
    public count: number;
    constructor(
      private route: ActivatedRoute,
      private router: Router,
      private authenticationService: AuthenticationService,
      private alertService: AlertService,
      protected httpClient: HttpClient
    ) {}


    // http options with headers
  protected httpOptions  = {
    headers: new HttpHeaders({
      'Content-Type' : 'application/json'
    })
  };



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
    }

    loginDoc() {

      this.httpClient.post('http://0.0.0.0:5000/login', {
      // send the values as json
      'username': this.model.username.toString(),
      'password': this.model.password.toString()
      // 'UserId': 19,
      // 'Password': 'abe'
    },
    this.httpOptions
    ) // get the response:
    .subscribe(data => {

      console.log(data);

      console.log();
      if (data === 'Login Success') {
        console.log('User was logged in');
        // this.router.navigate(['_doc-profile'], { queryParams: this.model});
      } else {
        console.log('Wrong Password or something else... but connected!');
      }

    }, // get the error message
    err => {
      console.log('Error occured.');
      console.log(err);
    }
  );
          /*
          this.count++;
          this.loading = true;
          this.authenticationService.loginDoc(this.model, )
              .subscribe(
                  data => {
                    this.count = 0;
                    this.alertMsg = '';
                    this.router.navigate(['_doc-profile'], { queryParams: this.model});
                  },
                  error => {
                      if (this.count > 3) {
                        this.kickedOut();
                      }
                      this.alertMsg = 'Username or password incorrect!';
                      this.loading = false;
                  });
                  */

    }

    loginPatient() {
      this.count++;
      this.loading = true;
      this.authenticationService.loginPatient(this.model)
          .subscribe(
              data => {
                  this.count = 0;
                  this.alertMsg = '';
                  this.router.navigate(['_patient-profile'], { queryParams: this.model});
              },
              error => {
                  this.alertMsg = 'Username or password incorrect!';
                  if (this.count > 3) {
                    this.kickedOut();
                  }
                  this.loading = false;
              });
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

