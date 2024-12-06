import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../user/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  userId: string | undefined;
  isLoading: boolean = true;


  get isLoogedIn(): boolean {
    return this.userService.isLogged;
  };

  get firstName(): string {
    return this.userService.user?.firstName || '';
  }
  constructor(private userService: UserService, private router: Router) {}

  logout() {
    this.userService.logout().subscribe(() => {
      this.router.navigate(['/users/login']);
    })
  }
  ngOnInit(): void {
    
  }
}
