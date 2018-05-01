
import { Router } from '@angular/router';
import { Component, NgModule,  TemplateRef } from '@angular/core';
import { LoginComponent } from './_login/login.component';
import 'rxjs/add/operator/pairwise';
import { User } from './_models/index';
import {Http} from '@angular/http';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})


export class AppComponent {
  UserList: User[];
  title = 'app';
  modalRef: BsModalRef;
  constructor(private http: Http, private modalService: BsModalService) { }
  getUserData() {
    this.http.get('http://localhost:3004/users')
    .subscribe(res => this.UserList =
    res.json() as User[]);
  }
  openModal(template: TemplateRef<any>) {
      this.modalRef = this.modalService.show(template);
  }
}
