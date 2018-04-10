
import { Router } from '@angular/router';
import { Component, NgModule } from '@angular/core';
import { LoginComponent } from './_login/login.component';
import 'rxjs/add/operator/pairwise';
import { User } from './_models/index';
import {Http} from '@angular/http';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})


export class AppComponent {
  UserList: User[];
  title = 'app';
  constructor(private http: Http) { }

  getUserData() {
    this.http.get('http://localhost:3004/users')
    .subscribe(res => this.UserList =
    res.json() as User[]);
  }

}
