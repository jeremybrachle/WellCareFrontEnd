import { ApptPipe } from './appt-pipe.pipe';
import { Component, OnInit, Input, enableProdMode } from '@angular/core';
import { Doctor, Appointment } from '../_models/index';
import { Router } from '@angular/router';

@Component({
  selector: 'app-docappts',
  templateUrl: './doc-appts.component.html',
  styleUrls: ['./doc-appts.component.css']
})
export class DocApptsComponent implements OnInit {
  @Input()
  public doc: Doctor;
  public appointments: Appointment[];
  public currMonthNum: number;
  public currMonthName: string;
  public currDate: any = {};
  public currYear: '2018';
  public monthDays: number[];
  public imagePath: string;
  public iconLeft: string;
  public iconRight: string;

  constructor(private router: Router) { }

  ngOnInit() {
    this.doc = JSON.parse(localStorage.getItem('currentUser'));
    this.appointments = this.doc.appointments;
    let tmpDate = new Date();
    let currDate = tmpDate.toISOString();
    this.currDate = currDate.slice(0, 10);
    console.log(this.currDate);
    this.iconLeft = 'arrow-left';
    this.iconRight = 'arrow-right';
    this.imagePath = '../../assets/images/smu_logo2.png';
    this.currMonthNum = 4;
    this.currMonthName = 'April';
    this.monthDays = [];
    for (let i = 0; i < 30; i++) {
      this.monthDays.push(i + 1);
    }
  }

  public format(date: any) {
    if (date.length === 10) {
      console.log(date);
    } else {
      this.currDate = date.toISOString().slice(0, 10);
    }
  }

  public logout() {
    this.router.navigate(['']);
  }
  private navigateToProfile() {
    console.log('UGH');
    this.router.navigateByUrl('/_doc-profile');
  }
}

