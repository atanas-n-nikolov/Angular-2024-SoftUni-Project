import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './user/register/register.component';
import { LoginComponent } from './user/login/login.component';
import { AdoptComponent } from './adopt/adopt.component';
import { LostFoundComponent } from './lost-found/lost-found.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { DonateComponent } from './donate/donate.component';
import { ProfileComponent } from './user/profile/profile.component';
import { AddAnimalComponent } from './add-animal/add-animal.component';
import { DetailsComponent } from './shared/details/details.component';
import { EditComponent } from './user/edit/edit.component';
import { AuthGuard } from './guards/auth.guard';
import { guestGuard } from './guards/guest.guard';

export const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'users/register', component: RegisterComponent, canActivate: [guestGuard]},
  {path: 'users/login', component: LoginComponent, canActivate: [guestGuard]},
  {path: 'users/profile', component: ProfileComponent, canActivate: [AuthGuard]},
  {path: 'animals/adopt', component: AdoptComponent},
  {path: 'animals/lostandfound', component: LostFoundComponent},
  {path: 'animals/create', component: AddAnimalComponent, canActivate: [AuthGuard]},
  {path: 'animals/:id/details', component: DetailsComponent},
  {path: 'animals/:id/edit', component: EditComponent, canActivate: [AuthGuard]},
  {path: 'about', component: AboutUsComponent},
  {path: 'contact', component: ContactUsComponent},
  {path: 'donate', component: DonateComponent},
];
