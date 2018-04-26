import { AppComponent } from './../app.component';
import { Injectable, Input } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {Http} from '@angular/http';
import { User, Doctor, Patient } from '../_models/index';


@Injectable()
export class AuthenticationService {
    public token: string;
    public sampleDoc: Doctor;
    public samplePatient: Patient;
    title = 'app';
    constructor(private http: HttpClient) {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
    }

    loginDoc(user: Doctor) {
        console.log(user.username);
        console.log(typeof user);
          return this.http.post<any>('/api/authenticate/doc', { user: user })
              .map(curr_user => {
                  // login successful if there's a jwt token in the response
                  if (curr_user && curr_user.token) {
                    console.log(curr_user);
                      // store user details and jwt token in local storage to keep user logged in between page refreshes
                      localStorage.setItem('currentUser', JSON.stringify(curr_user));
                  }

                  return curr_user;
              });
    }

    loginPatient(user: Patient) {
      console.log(user.username);
      console.log(typeof user);
        return this.http.post<any>('/api/authenticate/patient', { user: user })
            .map(curr_user => {
                // login successful if there's a jwt token in the response
                if (curr_user && curr_user.token) {
                  console.log(curr_user);
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(curr_user));
                }

                return curr_user;
            });
    }

    logout() {
      this.token = null;
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
    getAllDocs() {
      console.log('auth service get all docs');
        return this.http.get<any>('/getAllDoctors')
            .subscribe(curr_docs => {
                localStorage.setItem('currentDocs', JSON.stringify(curr_docs));
                return curr_docs;
            });
    }
}
