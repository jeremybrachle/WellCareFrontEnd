import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public disableLogin: boolean;

  constructor(private route: ActivatedRoute,
    private router: Router) {
      this.route.queryParams.subscribe(disableLogin => {
        console.log(disableLogin); // {order: "popular"}
        if ( disableLogin !== {} ) {
          this.disableLogin = true;
        } else { this.disableLogin = false; }
      });
      console.log('landing page constructor');
  }

  ngOnInit() {
    this.route.queryParams.subscribe(disableLogin => {
      console.log(disableLogin); // {order: "popular"}
      if ( disableLogin !== {} ) {
        this.disableLogin = true;
      } else { this.disableLogin = false; }
    });
  }

}
