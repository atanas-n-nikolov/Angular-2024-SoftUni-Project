import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../user.service';
import { NotificationService } from '../../shared/notification.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(private userService: UserService, private router: Router, private notificationService: NotificationService) {}

  login(form: NgForm) {
    if (form.invalid) {
      this.notificationService.showMessage('Invalid Login Form!', 'error');
      return;
    }

    const { email, password } = form.value;
    this.userService.login(email, password).subscribe(() => {
      this.router.navigate(['/home']);
    });
  }
}
