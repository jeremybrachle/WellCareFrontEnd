import { User } from './models/user';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Verification } from './verification.service';


@Injectable()
export class LoginUser extends Verification<User> {

  // establish the endpoint
  // postman endpoint
  // protected endPoint = 'https://1fb74158-a7a1-4843-9291-7ac88a0a36c8.mock.pstmn.io/login';

  // json placeholder endpoint
  // protected endPoint = 'http://jsonplaceholder.typicode.com/posts';

  // github endpoint
  protected endPoint = 'https://api.github.com/users/jeremybrachle';

  constructor(protected httpClient: HttpClient) {
    super(httpClient);
  }
}
