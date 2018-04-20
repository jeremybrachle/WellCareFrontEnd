
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
    constructor(
      private route: ActivatedRoute,
      private router: Router,
      private authenticationService: AuthenticationService,
      private alertService: AlertService
    ) {}

    ngOnInit() {
          // reset login status
          this.displayHelp = false;
          this.authenticationService.logout();

          // get return url from route parameters or default to '/'
          this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    loginDoc() {
          this.loading = true;
          this.authenticationService.loginDoc(this.model)
              .subscribe(
                  data => {
                    console.log(this.returnUrl);
                    this.router.navigate(['_doc-profile'], { queryParams: this.model});
                  },
                  error => {
                      this.alertService.error(error);
                      this.loading = false;
                  });
    }

    loginPatient() {
      this.loading = true;
      this.authenticationService.loginPatient(this.model)
          .subscribe(
              data => {
                  console.log(this.returnUrl);
                  this.router.navigate(['_patient-profile'], { queryParams: this.model})
              },
              error => {
                  this.alertService.error(error);
                  this.loading = false;
              });
    }

    forgot() {
      this.displayHelp = true;
      console.log(this.displayHelp);
    }
}

