import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './user/register/register.component';

export const routes: Routes = [
  {path: '/users/register', component: RegisterComponent}
];
