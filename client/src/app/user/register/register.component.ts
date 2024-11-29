import { Component, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { User } from '../../types/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  @ViewChild('registerForm') form: NgForm | undefined;

  constructor(private userService: UserService, private router: Router) {}

  registerSubmitHandler() {
    if(this.form?.invalid) {
      console.log('This form is invalid!');
      return;
    };

    const {
      firstName,
      lastName,
      email,
      password,
      rePassword
    } = this.form?.value;

    console.log(firstName,
      lastName,
      email,
      password,
      rePassword);

      if(password !== rePassword) {
        console.log('Password missmatch!');
        return;
      };

      const userData = { firstName, lastName, email, password };
      
      this.userService.register(userData).subscribe({
        next: (response: User) => {
          console.log('Register successfully');
          this.router.navigate(['/home'])
        },
        error: (err) => {
          console.error('Error registering:', err.error.message || err.message);
        }
      })
  }
}
