
import { Injectable } from '@angular/core';
import { Http, HttpModule, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { mergeMap } from 'rxjs/operators';
import { forkJoin } from 'rxjs/observable/forkJoin';


import { HttpClientModule } from '@angular/common/http';
import { AuthenticationService } from '../_services/authentication.service';
import { Doctor } from '../_models/index';
import { Patient } from '../_models/index';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import 'rxjs/add/operator/map';

@Injectable()
export class UserService {
    public token: string;
    public returnDoc: Doctor;
    public returnPatient: Patient;

    constructor(
        private http: HttpClient,
        private authenticationService: AuthenticationService) {
    }

    protected endPoint = 'http://0.0.0.0:5000';
    protected httpOptions = {
      headers: new HttpHeaders({
        'Content-Type' : 'application/json'
      })
    };

    getDocByUsername(u: string) {
        this.http.post<any>(`${this.endPoint}/_doc-profile`, { 'username': u }, this.httpOptions).subscribe(
          doc => {
            this.returnDoc.id = doc.id;
            this.returnDoc.username = doc.username;
            this.returnDoc.password = doc.password;
            this.returnDoc.firstName = doc.firstName;
            this.returnDoc.lastName = doc.lastName;
            this.returnDoc.specialty = doc.specialty;
            this.returnDoc.email = doc.email;
            this.returnDoc.address = doc.address;
            this.returnDoc.phone = doc.phone;
            this.returnDoc.rating = doc.rating;
            this.returnDoc.profPic = doc.profPic;
          },
          error => {
            console.log('sad for getting doc basic info');
          }
        );

        this.http.post<any>(`${this.endPoint}/appointments/doctor`, { 'username': u }, this.httpOptions).subscribe(
          appts => {
            if (appts !== []) {
              this.returnDoc.appointments = appts;
            } else {
              console.log('returned false for "appts !== []" when trying to get doc appts');
              this.returnDoc.appointments = appts;
            }
          },
          error => {
            console.log('sad for getting doc appts');
          }
        );

        this.http.post<any>(`${this.endPoint}/notifications/doctor`, { 'username': u }, this.httpOptions).subscribe(
          notifs => {
            this.returnDoc.notifications = notifs;
          },
          error => {
            console.log('sad for getting doc notifs');
          }
        );

        this.http.post<any>(`${this.endPoint}/perscription/doctor`, { 'username': u }, this.httpOptions).subscribe(
          scrips => {
            this.returnDoc.scrips = scrips;
          },
          error => {
            console.log('sad for getting doc scrips');
          }
        );

        this.http.post<any>(`${this.endPoint}/docnotes/doctor`, { 'username': u }, this.httpOptions).subscribe(
          notesForPatient => {
            this.returnDoc.notesForPatient = notesForPatient;
          },
          error => {
            console.log('sad for getting docs notes for patients');
          }
        );

        console.log('Loaded Doc obj after calling every post in getDocByUsername ' + this.returnDoc);
        return (this.returnDoc);
    }

    getFullPatient(u: string) {
      const basicPatient = this.http.post<any>(`${this.endPoint}/_patient-profile`, { 'username': u }, this.httpOptions);
      const patientAppts = this.http.post<any>(`${this.endPoint}/appointments/patient`, { 'username': u }, this.httpOptions);
      const patientScrips = this.http.post<any>(`${this.endPoint}/perscription/patient`, { 'username': u }, this.httpOptions);
      const patientNotifs = this.http.post<any>(`${this.endPoint}/notifications/patient`, { 'username': u }, this.httpOptions);
      const notesFromDoc = this.http.post<any>(`${this.endPoint}/docnotes/patient`, { 'username': u }, this.httpOptions);
      forkJoin([basicPatient, patientAppts, patientScrips, patientNotifs, notesFromDoc]).subscribe(
        patientAttribGroups => {
          this.returnPatient = patientAttribGroups[0];
          this.returnPatient.appointments = patientAttribGroups[1];
          this.returnPatient.scrips = patientAttribGroups[2];
          this.returnPatient.notifications = patientAttribGroups[3];
          this.returnPatient.docNotes = patientAttribGroups[4];
        },
        () => {
          return (this.returnPatient);
        }
      );
    }

    getBasicPatientByUsername(u: string) {
        return this.http.post<any>(`${this.endPoint}/_patient-profile`, { 'username': u }, this.httpOptions).map(
          pat => {
            this.returnPatient.id = pat.patient_id;
            this.returnPatient.username = pat.username;
            this.returnPatient.password = pat.password;
            this.returnPatient.firstName = pat.firstName;
            this.returnPatient.lastName = pat.lastName;
            this.returnPatient.gender = pat.gender;
            this.returnPatient.email = pat.email;
            this.returnPatient.address = pat.address;
            this.returnPatient.emergency_contact = pat.emergency_contact;
            this.returnPatient.dob = pat.dob;
            this.returnPatient.profPic = pat.profPic;
            return this.returnPatient;

          },
          error => {
            console.log('sad for getting patient basic info');
          }
        );
    }
    getPatientAppts(u: string) {
        return this.http.post<any>(`${this.endPoint}/appointments/patient`, { 'username': u }, this.httpOptions).map(
          appts => {
              this.returnPatient.appointments = appts;
              return this.returnPatient.appointments;

          },
          error => {
            console.log('sad for getting patient appts');
          }
        );
    }
    getPatientNotifs(u: string) {

        return this.http.post<any>(`${this.endPoint}/notifications/patient`, { 'username': u }, this.httpOptions).map(
          notifs => {
            this.returnPatient.notifications = notifs;
            return this.returnPatient.notifications;

          },
          error => {
            console.log('sad for getting patient notifs');
          }
        );
    }
    getPatientScrips(u: string) {
        return this.http.post<any>(`${this.endPoint}/perscription/patient`, { 'username': u }, this.httpOptions).map(
          scrips => {
            this.returnPatient.scrips = scrips;
            return this.returnPatient.scrips;

          },
          error => {
            console.log('sad for getting patient scrips');
          }
        );
    }
    getPatientDocNotes(u: string) {
        return this.http.post<any>(`${this.endPoint}/docnotes/patient`, { 'username': u }, this.httpOptions).map(
          docNotes => {
            this.returnPatient.docNotes = docNotes;
            return this.returnPatient.docNotes;
          },
          error => {
            console.log('sad for getting patient docNotes');
          }
        );
    }
    //     console.log('Loaded Patient obj after calling every post in getDocByUsername ' + this.returnPatient);
    //     return (this.returnPatient);
    // }

    getAll() {
      // const headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token });
      // const options = new RequestOptions({ headers: headers });
      return this.http.get<any>('/assets/mock_data.json');
      // .map((response: Response) => response.json());
    }

    getAllDocs() {
      this.http.get<any>('/getAllDoctors').subscribe(
        docIds => {}
      );
    }

    getById(id: number) {
      return this.http.get<any>('/assets/mock_data.json' + id);
    }

    createDoc(user: Doctor) {
      console.log('create doc');
      // const headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': 'my-auth-token'});
      // const options = new RequestOptions({ headers: headers });
      console.log(user);
      return this.http.post<any>('/assets/mock_data.json/doc', user);
    }
    createPatient(user: Patient) {
      console.log('create patient');
      // const headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': 'my-auth-token'});
      // const options = new RequestOptions({ headers: headers });
      console.log(user);
      return this.http.post<any>('/assets/mock_data.json/patient', user);
    }

    updateDoc(user: Doctor) {
      return this.http.put('/assets/mock_data.json' + user.id, user);
    }
    updatePatient(user: Patient) {
      return this.http.put('/assets/mock_data.json' + user.id, user);
    }

    delete(id: number) {
      return this.http.delete('/assets/mock-data.json' + id);
    }
    private extractData(res: Response) {
      const body = res.json();
      return body.data || {};
    }

    private handleError(error: Response) {
      console.error(error);
      return Observable.throw(error.json().error || 'Server Error');
    }
}
