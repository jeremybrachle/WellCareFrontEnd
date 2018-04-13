import { ApptPipe } from './appt-pipe.pipe';
import { Component, OnInit, Input } from '@angular/core';
import { Doctor } from '../_models/index';

@Component({
  selector: 'app-docappts',
  templateUrl: './doc-appts.component.html',
  styleUrls: ['./doc-appts.component.css']
})
export class DocApptsComponent implements OnInit {
  @Input()
  public doc: Doctor;
  public currMonth: number;
  public currDay: number;
  public monthDays: number[];
  public weekDay1: number;
  public weekDayEnd: number;
  public prevMonthDays: number;
  public prevMonthFill: number[];
  public row1MonthDays: number[];
  public fills: number[];
  public hide: boolean;

  constructor() { }

  ngOnInit() {
    this.currMonth = 4;
    this.currDay = 12;
    this.monthDays = new Array(30);
    for (let i = 0; i < 30; i++) {
      this.monthDays.push(i + 1);
    }
    this.weekDay1 = 1;
    this.weekDayEnd = 2;
    this.prevMonthDays = 31;
    this.prevMonthFill = [];
    this.hide = true;
    this.row1MonthDays = [1, 2, 3, 4, 5, 6, 7];
  }

  prevMonth() {
    (this.currMonth)--;
    const numDays = this.getDays(this.currMonth);
    this.monthDays = new Array(numDays);
    for (let i = 0; i < numDays; i++) {
      this.monthDays.push(i + 1);
    }
    if (this.currMonth === 1) {
      this.prevMonthDays = this.getDays(12);
    } else {
      this.prevMonthDays = this.getDays(this.currMonth - 1);
    }
    if (this.weekDay1 === 1) {
      this.weekDayEnd = 7;
    } else {
      this.weekDayEnd = this.weekDay1 - 1;
    }
    this.weekDay1 =  this.weekDayEnd - ((this.monthDays.length % 7) - 1);
    if (this.weekDay1 === 1) {
      this.prevMonthFill = [];
      this.row1MonthDays = [1, 2, 3, 4, 5, 6, 7];
    } else {
      this.hide = false;
      for (let k = 1; k < (this.weekDay1); k++) {
        this.prevMonthFill.push(k);
      }
      for (let l = this.weekDay1; l < 8; l++) {
        this.row1MonthDays.push(l);
      }
      // for (let j = 0; j < (this.weekDay1 - 1); j++) {
      //   this.fills.push(j);
      // }
      // for (let k = 0; k < (this.prevMonthDays - (this.weekDay1 - 2)); k++){
      //   this.prevMonthFill.push(k);
      // }
    }
  }
  nextMonth() {
    this.currMonth++;
    this.prevMonthDays = this.monthDays.length;
    const numDays = this.getDays(this.currMonth);
    this.monthDays = new Array(numDays);
    for (let i = 0; i < numDays; i++) {
      this.monthDays.push(i + 1);
    }
    this.currDay = 1;
    if (this.weekDayEnd === 7) {
      this.weekDay1 = 1;
    } else {
      this.weekDay1 = this.weekDayEnd + 1;
    }
    this.weekDayEnd = ((this.monthDays.length % 7) - 1) + this.weekDay1;
    if (this.weekDay1 === 1) {
      this.prevMonthFill = [];
      this.row1MonthDays = [1, 2, 3, 4, 5, 6, 7];
    } else {
      this.hide = false;
      for (let k = 1; k < (this.weekDay1); k++) {
        this.prevMonthFill.push(k);
      }
      for (let l = this.weekDay1; l < 8; l++) {
        this.row1MonthDays.push(l);
      }
    }
  }
  getDays(monthArg: number) {
    if ( (monthArg === 1) || (monthArg === 3) || (monthArg === 5)
      || (monthArg === 7) || (monthArg === 8) || (monthArg === 10)
      || (monthArg === 12) ) {
        return 31;
    } else if (monthArg === 2) {
        return 28;
    } else {
        return 30;
    }
  }
}
