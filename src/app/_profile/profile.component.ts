import { Component, OnInit, Input } from '@angular/core';
import { User } from '../_models/user';
import { Doctor } from '../_models/index';
import { Patient } from '../_models/index';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  @Input()
  public user: Doctor;
  public imagePath: string;
  public userImage: string;
  public comment: string;

  constructor() {
    this.imagePath = '../../assets/images/smu_logo.png';
    console.log('profile constructor!');
    this.userImage = '../../assets/images/ted.jpg';

  }

  ngOnInit() {
    console.log(JSON.parse(localStorage.getItem('currentUser')));
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    if (this.user.reviews.length > 0) {
      this.comment = this.user.reviews[0].comment;
    }
  }

  public logout() {
    console.log('woo');
  }

}
