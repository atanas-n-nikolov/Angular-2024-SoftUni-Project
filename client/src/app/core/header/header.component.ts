import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserService } from '../../user/user.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(private userService: UserService, private router: Router) {}

  get isLogged():boolean {
    return this.userService.isLogged;
  };

  get firstName():string | null {
    return this.userService.user?.firstName || null;
  };

  logout() {
    this.userService.logout().subscribe(() => {
      this.router.navigate(['users/login']);
    })
  }
}
