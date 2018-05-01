import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../_services/index';
import { AuthenticationService } from '../_services/authentication.service';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css']
})
export class ForgotComponent implements OnInit {
  public user: any = {};
  public isDoc: boolean;
  @Input()
  public dataTarget: string;
  @Input()
  public dataToggle: string;
  public backToHome: boolean;
  constructor(private router: Router, private userService: UserService, private authService: AuthenticationService) { }

  ngOnInit() {
    this.backToHome = false;
  }

  reset() {
    this.backToHome = true;
    // this.authService.login(this.user);
    // if (this.isDoc === true){
    //   this.userService.updateDoc(this.user);
    // } else{
    //   this.userService.updatePatient(this.user);
    // }
    this.router.navigateByUrl('');
  }
  backHome() {
    this.backToHome = true;
    this.router.navigateByUrl('/_login');
  }

}
