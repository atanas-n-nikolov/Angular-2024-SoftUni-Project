import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../user/user.service';
import { CommonModule } from '@angular/common';
import { User } from '../../types/user';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  user: User | null = null;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.userService.getUser().subscribe({
      next: (user) => {
        this.user = user;
      },
      error: (err) => {
        this.user = null;
      }
    });
  }

  get firstName(): string {
    return this.user?.firstName || '';
  }

  logout() {
    this.userService.logout().subscribe();
  }
}
