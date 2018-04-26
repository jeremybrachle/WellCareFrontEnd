import { Component, OnInit, Input, TemplateRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { User } from '../_models/user';
import { Patient } from '../_models/index';
import { Doctor } from './../_models/doctor';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-patient-settings',
  templateUrl: './patient-settings.component.html',
  styleUrls: ['./patient-settings.component.css']
})

export class PatientSettingsComponent implements OnInit {
  @Input()
  public user: Patient;
  public oldPass: string;
  public newPass: string;
  public newPass2: string;
  public imagePath: string;
  public modalRef: BsModalRef;
  constructor(private router: Router, private modalService: BsModalService) {
    this.imagePath = '../../assets/images/smu_logo.png';
  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.oldPass = '';
    this.newPass = '';
    this.newPass2 = '';
  }
  public changePassword() {
    this.user.password = this.newPass2;
  }
  public logout() {
    console.log('woo');
    this.router.navigateByUrl('');
  }
  public navigateToProfile() {
    console.log('ugh frusterated');
    this.router.navigateByUrl('/_patient-profile');
  }
  public openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
}




