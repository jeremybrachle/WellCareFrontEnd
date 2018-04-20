import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css']
})
export class ForgotComponent implements OnInit {
  @Input()
  public dataTarget: string;
  @Input()
  public dataToggle: string;
  public backToHome: boolean;
  constructor(private router: Router) { }

  ngOnInit() {
    this.backToHome = false;
  }

  reset() {
    this.backToHome = true;
    this.router.navigateByUrl('');
  }

}
