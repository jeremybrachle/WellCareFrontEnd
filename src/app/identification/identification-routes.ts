import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';
import { Route } from '@angular/router';

export const ID_ROUTES: Route[] = [
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'login',
    component: LoginComponent
  }
];
