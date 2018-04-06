import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthenticationGuard implements CanActivate {

    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (localStorage.getItem('currentUser')) {
            // logged in so return true
            console.log(RouterStateSnapshot);
            return true;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['../_login'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}

// import { Injectable } from '@angular/core';
// import { Router, CanActivate } from '@angular/router';
// import { AuthenticationService } from '../_services/authentication.service';
// @Injectable()
// export class AuthenticationGuard implements CanActivate {
//   constructor(public auth: AuthenticationService, public router: Router) {}
//   canActivate(): boolean {
//     if (!this.auth.isAuthenticated()) {
//       this.router.navigate(['../_login/index']);
//       return false;
//     }
//     return true;
//   }
// }
