import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-patient-appts',
  templateUrl: './patient-appts.component.html',
  styleUrls: ['./patient-appts.component.css']
})
export class PatientAppointmentsComponent implements OnInit {
  public imagePath: string;
  public iconLeft: string;
  public iconRight: string;
  constructor() { }

  ngOnInit() {
    this.iconLeft = 'arrow-left';
    this.iconRight = 'arrow-right';
    this.imagePath = '../../assets/images/smu_logo.png';
  }

}
