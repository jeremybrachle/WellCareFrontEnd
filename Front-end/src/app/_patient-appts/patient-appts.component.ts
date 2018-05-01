
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
import { UserService } from '../_services/user.service';

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
  public newApptDate: Date;
  public user: Patient;
  public docSearchText: string;
  public loading: boolean;
  public apptTimeRange: string[];
  constructor(
    private router: Router,
    private modalService: BsModalService,
    private userService: UserService
  ) { }


  ngOnInit() {
    this.loading = false;
    this.fakeDocs = JSON.parse(localStorage.getItem('currentDocs'));

    this.apptTimeRange = [
      '9AM',
      '10AM',
      '11AM',
      '12PM',
      '1PM',
      '2PM',
      '3PM',
      '4PM',
      '5PM'
    ];
    this.available = [];
    this.newAppt = new Appointment;
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.iconLeft = 'arrow-left';
    this.iconRight = 'arrow-right';
    this.imagePath = '../../assets/images/smu_logo2.png';
  }

  public setDoc(docObj) {
    this.newAppt.doctor = docObj;
  }

  public formatDateObj() {
    const newApptDate = this.newApptDate.toISOString();
    if (newApptDate.length === 10) {
      // console.log('newApptDate is already formatted after toISOString()' + newApptDate);
      this.newAppt.date = newApptDate;
    } else {
      this.newAppt.date = newApptDate.slice(0, 10);
      // console.log('newApptDate after slicing it ' + this.newAppt.date);
    }
  }

  public addNewAppt() {
    this.loading = true;
    this.newAppt.status = 'requested';
    this.user.appointments.push(this.newAppt);
    this.newAppt.doctor.appointments.push(this.newAppt);
    this.loading = false;
    this.modalRef.hide();
    this.updateFakeBackend();
  }

  public updateFakeBackend() {
    this.userService.updatePatient(this.user);
    this.userService.updateDoc(this.newAppt.doctor);
  }

  public setAvailableTimes() {
      this.formatDateObj();
      this.available = [];
      let toBeChecked = [];
      let docApptDate = this.newAppt.doctor.appointments[0].date;

      // go through the list of the selected doctor's appointments and
      // check if he/she has any scheduled on the selected day
      for (let j = 0; j < this.newAppt.doctor.appointments.length; j++) {
          docApptDate = this.newAppt.doctor.appointments[j].date;
          // if the date of this appointment matches the selected date
          // of the proposed appointment, then add it to our array toBeChecked so
          // that we can identify unavilable times on this day in the next for loop
          if (docApptDate === this.newAppt.date) {
              console.log('dr has other appts on that day but lets keep lookin..');
              toBeChecked.push(this.newAppt.doctor.appointments[j]);
              console.log(toBeChecked);
          }

      }
      // if doctor doesnt have any appointments on the selected day
      // no need to check for already taken times
      // otherwise doctor has other appointments on the selected day, stored in
      // our toBeChecked array, then we need to check for already taken times

      if (toBeChecked.length === 0) {
        this.available = this.apptTimeRange;
        return true;
      } else {
        // check which times are taken by the doctor's already scheduled appts
        // stored in toBeChecked array
        for (let k = 0; k < this.apptTimeRange.length; k++) {
          let add = true;
          // check if any of the already scheduled appointments on this date
          // are at (apptTimeRange[k]) time
          for (let i = 0; i < toBeChecked.length; i++) {
            // if any appointment in the toBeChecked array is scheduled at
            // the current time were looking at in apptTimeRange, we will
            // set our boolean add to false so that we know not to add the
            // time to the available array when we exit this inner for loop
            if (this.apptTimeRange[k] === toBeChecked[i].time) {
              add = false;
            }
          }
          // if none of the appointments in the toBeChecked array conflicted
          // with the current time at index k of apptTimeRange array,
          // then add the time to our available array
          if ( add ) {
            this.available.push(this.apptTimeRange[k]);
          }
        }
      }

      if (this.available !== []) {
        console.log('there is at least one available time on this day!' + this.available);
        return true;
      } else {
        console.log('no available times on this day');
        return false;
      }
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  closeModal(template: TemplateRef<any>) {
    this.modalService.hide(1);
  }
  navigateToProfile() {
    this.router.navigateByUrl('/_patient-profile');
  }
  navigateToSettings() {
    this.router.navigate(['/_patient-settings']);
  }
  public logout() {
    this.router.navigateByUrl('');
  }


}
