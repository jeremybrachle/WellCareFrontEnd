import { Component, OnInit, Input } from '@angular/core';
import { User } from '../_models/user';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  @Input()
  public user: User;

  constructor() { }

  ngOnInit() {
  }

}
