import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AlertService, UserService } from '../_services/index';
import { Doctor } from '../_models/index';
import { Patient } from '../_models/index';
import { User } from '../_models/index';
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
    protected httpClient: HttpClient;

    constructor(private router: Router, private userService: UserService, private alertService: AlertService) {
        this.imagePath = '../../assets/images/smu_logo.png';
    }

    protected httpOptions  = {
        headers: new HttpHeaders({
          'Content-Type' : 'application/json'
        })
    };
    registerPatient() {
    //   const editJsonFile = require('edit-json-file');
    //   const file = editJsonFile(`../../assets/mock-data.json`);
    //   //'_register/patient'
    //   this.loading = true;
    //   this.userService.createPatient(this.model)
    //       .subscribe(
    //           data => {
    //               // console.log('yay');
    //               this.alertService.success('Registration successful', true);

    //               this.router.navigate(['']);
    //           },
    //           error => {
    //               this.alertService.error(error);
    //               this.loading = false;
    //           });

    this.httpClient.post('http://0.0.0.0/_register/patient', {'allData' : this.model}, this.httpOptions);

    // DO WE NEED TO SEND A RESPONSE BACK

    }
    registerDoc() {
    //   const editJsonFile = require('edit-json-file');
    //   const file = editJsonFile(`../../assets/mock-data.json`);
    //       //'_register/doc'
    //   this.loading = true;
    //   this.userService.createDoc(this.model)
    //       .subscribe(
    //           data => {
    //               // console.log('yay');
    //               this.alertService.success('Registration successful', true);

    //               this.router.navigate(['']);
    //           },
    //           error => {
    //               this.alertService.error(error);
    //               this.loading = false;
    //           });


    this.httpClient.post('http://0.0.0.0/', {'allData' : this.model}, this.httpOptions);
    // .map(curr_user => {

    // });


    }
}


