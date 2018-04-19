
import { Injectable } from '@angular/core';
import { Http, HttpModule, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { HttpClientModule } from '@angular/common/http';
import { AuthenticationService } from '../_services/authentication.service';
import { Doctor } from '../_models/index';
import { Patient } from '../_models/index';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Users } from '../_models/index';

import 'rxjs/add/operator/map';

@Injectable()
export class UserService {
    public token: string;
    public accounts: Users;

    constructor(
        private http: HttpClient,
        private authenticationService: AuthenticationService) {
    }

    getAll() {
      // const headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token });
      // const options = new RequestOptions({ headers: headers });
      return this.http.get<any>('/assets/mock_data.json');
      // .map((response: Response) => response.json());
    }

    getById(id: number) {
      return this.http.get<any>('/assets/mock_data.json' + id);
    }

    createDoc(user: Doctor) {
      console.log('create doc');
      // const headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': 'my-auth-token'});
      // const options = new RequestOptions({ headers: headers });
      console.log(user);
      return this.http.post<any>('/assets/mock_data.json', user);
    }
    createPatient(user: Patient) {
      console.log('create patient');
      // const headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': 'my-auth-token'});
      // const options = new RequestOptions({ headers: headers });
      console.log(user);
      return this.http.post<any>('/assets/mock_data.json', user);
    }

    updateDoc(user: Doctor) {
      return this.http.put('/assets/mock-data.json' + user.id, user);
    }
    updatePatient(user: Patient) {
      return this.http.put('/assets/mock-data.json' + user.id, user);
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
