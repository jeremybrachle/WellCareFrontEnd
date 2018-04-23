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
  public currDay: number;
  public currYear: '2018';
  public monthDays: number[];
  public weekDay1: number;
  public weekDayEnd: number;
  public prevMonthDays: number;
  public prevMonthFill: number[];
  public row1MonthDays: number[];
  public daysUntilCurr: number[];
  public daysPostCurr: number[];
  public fifthRow: number[];
  public imagePath: string;
  public iconLeft: string;
  public iconRight: string;

  constructor(private router: Router) { }

  ngOnInit() {
    this.doc = JSON.parse(localStorage.getItem('currentUser'));
    this.appointments = this.doc.appointments;
    console.log(this.appointments);
    this.iconLeft = 'arrow-left';
    this.iconRight = 'arrow-right';
    this.imagePath = '../../assets/images/smu_logo2.png';
    this.currMonthNum = 4;
    this.currMonthName = 'April';
    this.currDay = 20;
    this.monthDays = [];
    for (let i = 0; i < 30; i++) {
      this.monthDays.push(i + 1);
    }
    console.log('total days in month: ' + this.monthDays);
    this.weekDay1 = 1;
    this.weekDayEnd = 2;
    this.prevMonthDays = 31;
    this.prevMonthFill = [];
    this.row1MonthDays = [1, 2, 3, 4, 5, 6, 7];
    this.daysUntilCurr = [8, 9, 10, 11];
    this.daysPostCurr = [13, 14];
    this.buildFifthRow();
  }
  buildFifthRow() {
    const week4Day1 = this.weekDay1 + (7 * (4 - 1));
      const week4LastDay = week4Day1 + 6;
      this.fifthRow = [];
      if (week4LastDay < this.monthDays.length) {
        for (let j = week4LastDay + 1; j < this.monthDays.length + 1; j++) {
          this.fifthRow.push(j);
        }
      }
      console.log('fifth row: ' + this.fifthRow);
      console.log('weekXLastDay: ' + week4LastDay);
      console.log('total Days in month: ' + this.monthDays.length);
  }

  prevMonth() {
    (this.currMonthNum)--;
    this.currMonthName = this.getMonthName(this.currMonthNum);
    const numDays = this.getDays(this.currMonthNum);
    this.monthDays = [];
    for (let i = 0; i < numDays; i++) {
      this.monthDays.push(i + 1);
    }
    if (this.currMonthNum === 1) {
      this.prevMonthDays = this.getDays(12);
    } else {
      this.prevMonthDays = this.getDays(this.currMonthNum - 1);
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
      for (let k = 1; k < (this.weekDay1); k++) {
        this.prevMonthFill.push(k);
      }
      for (let l = this.weekDay1; l < 8; l++) {
        this.row1MonthDays.push(l);
      }

      this.buildFifthRow();
    }
  }
  nextMonth() {
    this.currMonthNum++;
    this.currMonthName = this.getMonthName(this.currMonthNum);
    this.prevMonthDays = this.monthDays.length;
    const numDays = this.getDays(this.currMonthNum);
    this.monthDays = [];
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
  checkCurrDay(rowNum: number) {
    const weekXDay1 = this.weekDay1 + (7 * (rowNum - 1));
    if ((this.currDay > weekXDay1) && (this.currDay < weekXDay1 + 7)) {
      this.daysUntilCurr = [];
      this.daysPostCurr = [];
      for (let i = weekXDay1; i < this.currDay; i++) {
        this.daysUntilCurr.push(i);
      }
      for (let i = (this.currDay + 1); i < (weekXDay1 + 7); i++) {
        this.daysPostCurr.push(i);
      }
      return true;
    } else {
      return false;
    }
  }

  getMonthName(monthNum: number) {
    if (monthNum === 1) { return 'January';
    }
    if (monthNum === 2) { return 'February';
    }
    if (monthNum === 3) { return 'March';
    }
    if (monthNum === 4) { return 'April';
    }
    if (monthNum === 5) { return 'May';
    }
    if (monthNum === 6) { return 'June';
    }
    if (monthNum === 7) { return 'July';
    }
    if (monthNum === 8) { return 'August';
    }
    if (monthNum === 9) { return 'September';
    }
    if (monthNum === 10) { return 'October';
    }
    if (monthNum === 11) {
      return 'November';
    } else { return 'December'; }
  }

  changeCurrDay(newCurrDay: number) {
    this.currDay = newCurrDay;
  }

  public logout() {
    this.router.navigate(['']);
  }
  private navigateToProfile() {
    console.log('UGH');
    this.router.navigateByUrl('/_doc-profile');
  }
}

