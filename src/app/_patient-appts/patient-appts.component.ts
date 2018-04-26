
import { Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Appointment } from '../_models/appt';
import { Patient } from '../_models/index';
import { FilterPipe} from './filter-by-name.pipe';

import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  TemplateRef,
  Host,
  Inject,
  OnDestroy
} from '@angular/core';
import {FormControl} from '@angular/forms';
import { Doctor } from '../_models/doctor';
import { DateAdapter } from '@angular/material';

@Component({
  selector: 'app-patient-appts',
  templateUrl: './patient-appts.component.html',
  styleUrls: ['./patient-appts.component.css'],

})

export class PatientAppointmentsComponent implements OnInit {
  public imagePath: string;
  public iconLeft: string;
  public iconRight: string;
  public modalRef: BsModalRef;
  public fakeDocs: Doctor[];
  public available: string[];
  public newAppt: Appointment;
  public user: Patient;
  public docSearchText: string;
  public loading: boolean;
  public apptTimeRange: string[];
  constructor(private router: Router, private modalService: BsModalService) { }


  ngOnInit() {
    this.loading = false;
    this.fakeDocs = JSON.parse(localStorage.getItem('currentDocs'));

    this.apptTimeRange = [
      '9AM-9:30AM',
      '10AM-10:30AM',
      '10:30AM-11AM',
      '11AM-11:30AM',
      '12PM-12:30PM',
      '12:30PM-1PM',
      '1PM-1:30PM',
      '1:30PM-2PM',
      '2PM-2:30PM',
      '2:30PM-3PM',
      '3PM-3:30PM',
      '3:30PM-4PM',
      '4PM-4:30PM',
      '4:30PM-5PM',
    ];
    this.available = [];
    this.newAppt = new Appointment;
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.iconLeft = 'arrow-left';
    this.iconRight = 'arrow-right';
    this.imagePath = '../../assets/images/smu_logo2.png';
  }
  public setDoc(docObj) {
    console.log(docObj);
    this.newAppt.doctor = docObj;
  }
  public logout() {
    console.log('hey');
    this.router.navigateByUrl('');
  }
  public setSearch() {
    console.log(this.docSearchText);
  }
  navigateToProfile() {
    this.router.navigateByUrl('/_patient-profile');
  }
  navigateToSettings() {
    this.router.navigate(['/_patient-settings']);
  }

  public addNewAppt() {
    console.log('in add appt fxn');
    this.loading = true;
    console.log(this.newAppt);
    this.newAppt.status = 'requested';
    this.user.appointments.push(this.newAppt);
    this.loading = false;
    this.modalRef.hide();
  }
  public checkAvailability() {
    this.available = [];
    const newAppt = this.convert(this.newAppt.date);
    let toBeChecked = [];
    let docApptDate = this.newAppt.doctor.appointments[0].date.toString();
    for (let j = 0; j < this.newAppt.doctor.appointments.length; j++) {
      docApptDate = this.newAppt.doctor.appointments[j].date.toString();
      // console.log('Dr has an appt on: ' + docApptDate);
      // console.log('were looking at date: ' + newAppt);

      if (docApptDate === newAppt) {
        // console.log('dr has other appts on that day but lets keep lookin..');
        toBeChecked.push(docApptDate);
      }

    }
    for (let k = 0; k < this.apptTimeRange.length; k++) {
      for (let i = 0; i < toBeChecked.length; i++) {
        if (this.apptTimeRange[k] !== toBeChecked[k]) {
          console.log('available');
          this.available.push(this.apptTimeRange[k]);
        } else {
          console.log('we gotta match');
        }
      }
    }
    if (this.available !== []) { return true; } else { return false; }
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  closeModal(template: TemplateRef<any>) {
    this.modalService.hide(1);
  }

  public convert(date: Date) {
    let tmp = date.toDateString();

    for (let k = 0; k < tmp.length; k++) {
      if (tmp[k] === ' ') {
        tmp = tmp.slice(k);
      }
    }
    console.log(tmp);
    let retStr = '';
    // console.log(tmp.slice(0, 2));
    // if (tmp.slice(0, 2) === 'Ap') {
    //   retStr = '04/';
    // }
    retStr = '04/';
    for (let k = 0; k < tmp.length; k++) {
      if (tmp[k] === ' ') {
        tmp = tmp.slice( k + 1 );
      }
    }
    retStr = retStr + tmp.slice(0, 2) + '/';
    for (let k = 0; k < tmp.length; k++) {
      if (tmp[k] === ' ') {
        tmp = tmp.slice( k + 1 );
      }
    }
    retStr = retStr + tmp.slice(tmp.length - 2);
    console.log(retStr);
    return retStr;
  }
}
