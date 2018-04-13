
import { Component, OnInit, NgModule } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService, AuthenticationService } from '../_services/index';
import { User } from '../_models/user';
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

    constructor(
      private route: ActivatedRoute,
      private router: Router,
      private authenticationService: AuthenticationService,
      private alertService: AlertService
    ) {}

    ngOnInit() {
          // reset login status
          this.authenticationService.logout();

          // get return url from route parameters or default to '/'
          this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    login() {
          this.loading = true;
          this.authenticationService.login(this.model)
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
}

