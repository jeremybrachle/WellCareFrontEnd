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
        this.disableLogin = false;
        if ( disableLogin.kickedOut ) {
          this.disableLogin = true;
          let id = setTimeout(function() {
            this.disableLogin = false;
            // this.router.navigateByUrl(['/']);
            console.log('in timeout fxn');
          }, 20000);
        }
        console.log('out');
      });
  }

  ngOnInit() {

  }

}
