import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserService } from '../../user/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{
  userFirstName: string | undefined;

 constructor(private userService: UserService) {}

 ngOnInit(): void {
   this.userService.user$.subscribe((user) => {
    this.userFirstName = user?.firstName;
   })
 }
}
