import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AlertService, UserService } from '../_services/index';
import { Doctor } from '../_models/index';
import { Patient } from '../_models/index';
import { User } from '../_models/index';
import { Users } from '../_models/index';
declare var require: any;

@Component({
    selector: 'app-register',
    moduleId: module.id,
    templateUrl: 'register.component.html'
})

export class RegisterComponent {
    model: any = {};
    public loading = false;
    public imagePath: string;

    constructor(private router: Router, private userService: UserService, private alertService: AlertService) {
        this.imagePath = '../../assets/images/smu_logo.png';
    }
    registerPatient() {
      const editJsonFile = require('edit-json-file');
      const file = editJsonFile(`../../assets/mock-data.json`);
      this.loading = true;
      this.userService.createPatient(this.model)
          .subscribe(
              data => {
                  // console.log('yay');
                  this.alertService.success('Registration successful', true);

                  this.router.navigate(['/_login']);
              },
              error => {
                  this.alertService.error(error);
                  this.loading = false;
              });
    }
    registerDoc() {
      const editJsonFile = require('edit-json-file');
      const file = editJsonFile(`../../assets/mock-data.json`);
      this.loading = true;
      this.userService.createDoc(this.model)
          .subscribe(
              data => {
                  // console.log('yay');
                  this.alertService.success('Registration successful', true);

                  this.router.navigate(['/_login']);
              },
              error => {
                  this.alertService.error(error);
                  this.loading = false;
              });
    }
}


