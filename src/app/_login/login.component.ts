
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
    public smuPic: string;
    constructor(
      private route: ActivatedRoute,
      private router: Router,
      private authenticationService: AuthenticationService,
      private alertService: AlertService
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

    loginDoc() {
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
    }

    loginPatient() {
      this.count++;
      this.loading = true;
      this.authenticationService.loginPatient(this.model)
          .subscribe(
              data => {
                  this.count = 0;
                  this.alertMsg = '';
                  this.router.navigate(['_patient-profile'], { queryParams: this.model} );
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

