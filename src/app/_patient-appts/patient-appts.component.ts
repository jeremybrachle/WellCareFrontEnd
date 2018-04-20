import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patient-appts',
  templateUrl: './patient-appts.component.html',
  styleUrls: ['./patient-appts.component.css']
})
export class PatientAppointmentsComponent implements OnInit {
  public imagePath: string;
  public iconLeft: string;
  public iconRight: string;
  constructor(private router: Router) { }

  ngOnInit() {
    this.iconLeft = 'arrow-left';
    this.iconRight = 'arrow-right';
    this.imagePath = '../../assets/images/smu_logo.png';
  }
  public logout() {
    console.log('hey');
    this.router.navigateByUrl('');
  }
  navigateToProfile() {
    this.router.navigateByUrl('/_patient-profile');
  }
  navigateToSettings() {
    this.router.navigate(['/_patient-settings']);
  }
}
