// import { AppComponent } from './../app.component';
// import { Injectable, Input } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/operator/map';
// import {Http} from '@angular/http';
// import { User, Doctor, Patient } from '../_models/index';
// import { catchError, filter, map } from 'rxjs/operators';
// // import { UserService } from './user.service';

// @Injectable()
// export class AuthenticationService {
//     public token: string;
//     public sampleDoc: Doctor;
//     public samplePatient: Patient;
//     title = 'app';
//     constructor(private http: HttpClient ) {
//         const currentUser = JSON.parse(localStorage.getItem('currentUser'));
//         this.token = currentUser && currentUser.token;
//     }
//     // private userService: UserService
//     /*
//     loginDoc(user: Doctor) {
//         console.log(user.username);
//         console.log(typeof user);
//           return this.http.post<any>('/api/authenticate/doc', { user: user })
//               .map(curr_user => {
//                   // login successful if there's a jwt token in the response
//                   if (curr_user && curr_user.token) {
//                     console.log(curr_user);
//                       // store user details and jwt token in local storage to keep user logged in between page refreshes
//                       localStorage.setItem('currentUser', JSON.stringify(curr_user));
//                   }

//                   return curr_user;
//               });
//     }*/

//     // backend endpoint
//     protected endPoint = 'http://0.0.0.0:5000';

//     // http options with headers
//   protected httpOptions  = {
//     headers: new HttpHeaders({
//       'Content-Type' : 'application/json'
//     })
//   };

//     public login(u: string, p: string) {
//         return this.http.post<any>(`${this.endPoint}/login`, {'username' : u, 'password' : p}, this.httpOptions)
//         .map(curr_user => {
//             // login successful if there's a jwt token in the response
//             console.log(curr_user, curr_user);
//             if (curr_user && curr_user.token) {
//               console.log(curr_user);
//                 // store user details and jwt token in local storage to keep user logged in between page refreshes
//                 localStorage.setItem('currentUser', JSON.stringify(curr_user));
//             }
//             // if (curr_user === 1) {
//             //   console.log(curr_user);
//             //     // store user details and jwt token in local storage to keep user logged in between page refreshes
//             //     localStorage.setItem('currentUser', JSON.stringify(curr_user));
//             // }

//             return curr_user;
//         });
        
//       }

//     loginPatient(user: Patient) {
//       console.log(user.username, "auth username");
//       // console.log(typeof user);
//         return this.http.post<any>(`${this.endPoint}/_patient-profile`, { 'user': user.username }, this.httpOptions)
//             .map(curr_user => {
//                 // login successful if there's a jwt token in the response
//                 console.log('this is the CURR USEr in login patient', curr_user)
//                 if (curr_user && curr_user.token) {
//                   console.log(curr_user);
//                     // store user details and jwt token in local storage to keep user logged in between page refreshes
//                     // check to see if second boolean from backend is 1 or 0, doctor or patient
//                     // if doctor, add "doctor": true
//                     localStorage.setItem('currentUser', JSON.stringify(curr_user));
//                 }

//                 return curr_user;
//             });
//     }


//     getPatientById(patient_id: number) {
//       console.log(patient_id, "auth username");
//       // console.log(typeof user);
//         return this.http.post<any>(`${this.endPoint}/_patient-profile`, { 'patient_id': patient_id }, this.httpOptions)
//             .map(curr_user => {
//                 // login successful if there's a jwt token in the response
//                 console.log('this is the CURR USEr in login patient', curr_user)
//                 if (curr_user && curr_user.token) {
//                   console.log(curr_user, "THIS IS CURR_USER");
//                     // store user details and jwt token in local storage to keep user logged in between page refreshes
//                     // check to see if second boolean from backend is 1 or 0, doctor or patient
//                     // if doctor, add "doctor": true
//                     localStorage.setItem('currentUser', JSON.stringify(curr_user));
//                 }

//                 return curr_user;
//             });
//     }


//     logout() {
//       this.token = null;
//         // remove user from local storage to log user out
//         localStorage.removeItem('currentUser');
//     }
//     getAllDocs() {
//       console.log('auth service get all docs');
//         return this.http.get<any>('/getAllDoctors')
//             .subscribe(curr_docs => {
//                 localStorage.setItem('currentDocs', JSON.stringify(curr_docs));
//                 return curr_docs;
//             });
//     }
// }

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
    public mock: {};
    public sampleDoc: Doctor;
    public samplePatient: Patient;
    title = 'app';
    constructor(private http: HttpClient) {
        // const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        // this.token = currentUser && currentUser.token;
        // console.log(this.token);
    }

    protected endPoint = 'http://0.0.0.0:5000';
    protected httpOptions = {
      headers: new HttpHeaders({
        'Content-Type' : 'application/json'
      })
    };

    // loginDoc(user: Doctor) {
    //     console.log(user.username);
    //     console.log(typeof user);
    //       return this.http.post<any>('/api/authenticate/doc', { user: user })
    //           .map(curr_user => {
    //               // login successful if there's a jwt token in the response
    //               if (curr_user && curr_user.token) {
    //                 console.log(curr_user);
    //                   // store user details and jwt token in local storage to keep user logged in between page refreshes
    //                   localStorage.setItem('currentUser', JSON.stringify(curr_user));
    //               }
    //               return curr_user;
    //           });
    // }
    login(u: string, p: string) {
      console.log('username: ' + u);
      console.log('password: ' + p);
        return this.http.post<any>(`${this.endPoint}/login`, { 'username': u, 'password': p} , this.httpOptions)
            .map(curr_user => {
                console.log(curr_user);
                // login successful if there's a jwt token in the response
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    // localStorage.setItem('currentUser', JSON.stringify(curr_user));
                if (curr_user == 0 || curr_user == 1) {
                    console.log(curr_user);

                    // localStorage.setItem('currentUser', JSON.stringify(this.mock));
                    return curr_user;
                }
                // if (curr_user && curr_user.token) {
                //   console.log(curr_user);
                //   // store user details and jwt token in local storage to keep user logged in between page refreshes

                //   localStorage.setItem('currentUser', JSON.stringify(curr_user));
                // }
                else {
                    console.log(curr_user);
                    return curr_user.isDoc;
                }
                // return curr_user;
            }
          );
    }

    logout() {
      console.log('hi');
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
